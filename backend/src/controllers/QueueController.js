import Queue from '../models/Queue.js';
import Streamer from '../models/Streamer.js';
import User from '../models/User.js';
import UserQueue from '../models/UserQueue.js';
import UserGame from '../models/UserGame.js';
import { io } from '../server.js';
import { errorHandler } from '../services/handler.js';
import { validateChessName, getGameArchieves } from './client/index.js';
import {
  createWinnerMessage,
  emitBotMessage,
  emitNextQueuePlayer,
  formatQueue,
  getUserQueue,
} from './functions/index.js';
import { usersOnQueuesMetric } from '../services/metrics.js';

export default {
  async list(req, res) {
    try {
      const { queueId } = req.query;
      const queue = await Queue.findOne({ _id: queueId }).populate('mode');

      if (!queue) {
        return res.status(404).json({ message: 'This queue does not exist' });
      }

      const userQueue = await UserQueue.find({ queue: queueId })
        .populate({
          path: 'user',
          model: 'User',
        })
        .populate({
          path: 'queue',
          model: 'Queue',
          populate: {
            path: 'mode',
            model: 'QueueMode',
          },
        })
        .exec();

      let formattedMode = `${queue.mode.mode} (${queue.mode.formattedTime})`;

      const formattedQueue = userQueue.length !== 0 && formatQueue(userQueue);
      const playersList =
        formattedQueue && formattedQueue.map((item) => item.chat);

      const usersOnQueueMessage =
        userQueue.length > 0
          ? `⏱️ ${formattedMode} (${userQueue.length} ${
              userQueue.length === 1 ? 'player' : 'players'
            }): ${playersList.join(', ')}`
          : '';

      const queueOptions = formattedQueue
        ? formattedQueue.map((item) => item.queue)
        : [];

      return res.json({
        isClosed: queue.isClosed,
        mode: queue.mode.time,
        formattedMode,
        queueModeId: queue.mode._id,
        size: queue.size,
        queue: queueOptions,
        usersOnQueue: usersOnQueueMessage,
      });
    } catch (err) {
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  async addToQueue(req, res) {
    try {
      const { twitchUsername, chessUsername, streamerChannel } = req.body;

      const chessData = await validateChessName(chessUsername);
      const {
        chess_bullet: { last: { rating: bulletRating = 0 } } = {},
        chess_blitz: { last: { rating: blitzRating = 0 } } = {},
        chess_rapid: { last: { rating: rapidRating = 0 } } = {},
        avatar,
        url,
        player_id: chessUserId,
        title,
      } = chessData;

      const chessFormattedUsername = url.split('member/')[1];

      const streamer = await Streamer.findOne({
        twitchUsername: streamerChannel,
      });

      if (!streamer) {
        return res.status(404).json({ message: 'Streamer does not exist' });
      }

      const queue = await Queue.findOne({ streamer: streamer._id })
        .populate('streamer mode')
        .exec();

      if (!queue) {
        return res
          .status(404)
          .json({ message: 'Streamer has no queue set up' });
      }

      if (queue.isClosed) {
        return res
          .status(400)
          .json({ message: 'The queue is currently closed' });
      }

      if (queue.usersOnQueue === queue.size) {
        return res.status(404).json({ message: 'The queue is currently full' });
      }

      const userExists = await User.findOne({ twitchUsername });

      const userData = {
        avatar,
        twitchUsername,
        chessUsername: chessFormattedUsername,
        chessUserId,
        title: title || null,
        rating: {
          bullet: bulletRating || 0,
          blitz: blitzRating || 0,
          rapid: rapidRating || 0,
        },
      };

      let userResponse;

      if (!userExists) {
        const newUser = await User.create(userData);

        await UserQueue.create({
          user: newUser._id,
          queue: queue._id,
        });

        const rating = newUser.rating[queue.mode.mode.toLowerCase()];

        userResponse = {
          id: newUser._id,
          username: chessFormattedUsername,
          chessUserId,
          rating,
          title,
          avatar,
        };
      } else {
        const userOnQueue = await UserQueue.findOne({
          user: userExists._id,
          queue: queue._id,
        });

        if (userOnQueue) {
          return res.status(400).json({ message: 'User already on queue' });
        }

        await UserQueue.create({
          user: userExists._id,
          queue: queue._id,
        });

        const userRating = {
          blitz: blitzRating,
          bullet: bulletRating,
          rapid: rapidRating,
        };
        const rating = userRating[queue.mode.mode.toLowerCase()];

        userResponse = {
          id: userExists._id,
          username: chessFormattedUsername,
          chessUserId,
          rating,
          title,
          avatar,
        };
      }

      io.to(streamerChannel).emit('queue:update', userResponse);

      usersOnQueuesMetric.set(queue.usersOnQueue);

      return res.json({
        message: 'User added to queue',
        user: userResponse,
      });
    } catch (err) {
      console.error('Error adding user to queue:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async removeFromQueue(req, res) {
    try {
      const { userId, queueId } = req.params;
      const { isNext, nextUserId, isDeleting } = req.query;

      if (isNext && JSON.parse(isNext)) {
        const userQueue = await getUserQueue(queueId, userId);

        if (!userQueue) {
          return res.status(404).json({ message: 'Users on queue not found' });
        }

        const {
          user: {
            chessUsername: userChessUsername,
            twitchUsername: userTwitchUsername,
          },
          queue: {
            streamer: {
              twitchUsername,
              chessUsername: streamerChessUsername,
              chessUserId,
            },
          },
        } = userQueue;

        const game = await getGameArchieves(
          streamerChessUsername,
          chessUserId,
          userChessUsername
        );

        if (game === 'No games found') {
          return res.status(404).json({ message: 'No games found' });
        }

        const { resultGameMessage, winner, moves } = createWinnerMessage(
          game,
          streamerChessUsername,
          userChessUsername,
          userTwitchUsername
        );

        await UserQueue.findOneAndRemove({ user: userId, queue: queueId });
        await UserGame.create({
          user: userId,
          queue: queueId,
          winner,
          moves,
        });

        if (nextUserId) {
          const nextPlayerQueue = await getUserQueue();

          emitNextQueuePlayer(nextPlayerQueue, resultGameMessage);

          return res.json({
            message: 'Last user removed from queue and next called',
          });
        }

        emitNextQueuePlayer(null, resultGameMessage);

        return res.json({
          message: 'Last user removed from queue and next called',
        });
      } else {
        const removedUserQueue = await UserQueue.findOneAndRemove({
          user: userId,
          queue: queueId,
        }).populate(populateOptions);

        if (!removedUserQueue) {
          return res.status(404).json({ message: 'UserQueue not found' });
        }

        if (isDeleting && JSON.parse(isDeleting) && nextUserId) {
          const nextPlayerQueue = await getUserQueue();

          emitBotMessage(nextPlayerQueue);
        }

        return res.json({ message: 'User removed from the queue' });
      }
    } catch (err) {
      console.error('Error removing user from queue:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async update(req, res) {
    try {
      const { queueId, mode, size, isClosed } = req.body;

      await Queue.findOneAndUpdate({ _id: queueId }, { mode, size, isClosed });

      return res.json({ message: 'Queue updated' });
    } catch (err) {
      console.error('Error updating queue:', err);
      return res
        .status(500)
        .json({ message: 'Internal server error', error: err });
    }
  },
  async delete(req, res) {
    const { queueId } = req.params;
    try {
      await UserQueue.deleteMany({ queue: queueId });
      await Queue.findOneAndUpdate({ queue: queueId }, { usersOnQueue: 0 });
      return res.json({ message: 'Queue cleared successfully' });
    } catch (err) {
      console.error('Error clearing queue:', err);
      return res
        .status(500)
        .json({ message: 'Internal server error', error: err });
    }
  },
};
