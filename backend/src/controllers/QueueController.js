import Queue from '../models/Queue.js';
import Streamer from '../models/Streamer.js';
import User from '../models/User.js';
import UserQueue from '../models/UserQueue.js';
import { errorHandler } from '../services/handler.js';
import { validateChessName } from './client/index.js';

export default {
  list: async (req, res) => {
    try {
      const { queueId } = req.query;
      const queue = await Queue.findOne({ _id: queueId }).populate('mode');
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

      const formatQueue = (queue) => {
        return queue.map((q, index) => {
          const position = index + 1;
          const { mode } = q.queue.mode;
          const liveStatus =
            index === 0 ? '[LIVE 🔴]' : index === 1 ? '[NEXT 🟡]' : '';
          const chessUsername = q.user.chessUsername;
          const rating = q.user.rating[mode.toLowerCase()];

          return {
            chat: `${position}. ${chessUsername} (${rating}) ${liveStatus}`,
            queue: {
              id: q._id,
              username: chessUsername,
              position,
              rating,
            },
          };
        });
      };

      let formattedMode = `${queue.mode.mode} (${queue.mode.formattedTime})`;

      const formattedQueue = userQueue.length !== 0 && formatQueue(userQueue);
      const playersList =
        formattedQueue && formattedQueue.map((item) => item.chat);

      const usersOnQueueMessage =
        userQueue.length > 0
          ? `⏱️ ${formattedMode} Queue (${userQueue.length} ${
              userQueue.length === 1 ? 'player' : 'players'
            }): ${playersList.join(', ')}`
          : '';

      const queueOptions = formattedQueue
        ? formattedQueue.map((item) => item.queue)
        : [];

      return res.json({
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
  show: async (req, res) => {},
  create: async (req, res) => {
    try {
      const { twitchUsername, chessUsername, streamerChannel } = req.body;

      const {
        chess_bullet: {
          last: { rating: bulletRating },
        },
        chess_blitz: {
          last: { rating: blitzRating },
        },
        chess_rapid: {
          last: { rating: rapidRating },
        },
      } = await validateChessName(chessUsername);

      const streamer = await Streamer.findOne({
        twitchUsername: streamerChannel,
      });

      const queue = await Queue.findOne({ streamer: streamer._id }).populate(
        'streamer mode'
      );

      if (!streamer) {
        return res.status(404).json({ message: 'Streamer does not exist' });
      }

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

      if (queue.length === queue.size) {
        return res.status(404).json({ message: 'The queue is currently full' });
      }

      const user = await User.findOneAndUpdate(
        { twitchUsername },
        {
          chessUsername,
          rating: {
            bullet: bulletRating,
            blitz: blitzRating,
            rapid: rapidRating,
          },
        }
      );

      if (!user) {
        const newUser = await User.create({
          twitchUsername,
          chessUsername,
          rating: {
            bullet: bulletRating,
            blitz: blitzRating,
            rapid: rapidRating,
          },
        });

        await UserQueue.create({
          user: newUser._id,
          queue: queue._id,
        });

        const rating = newUser.rating[queue.mode.mode.toLowerCase()];

        return res.json({
          message: 'User added to queue',
          user: {
            id: newUser._id,
            username: newUser.chessUsername,
            rating,
          },
        });
      }

      const userOnQueue = await UserQueue.findOne({
        user: user._id,
        queue: queue._id,
      });

      // if (userOnQueue) {
      //   return res.status(400).json({ message: 'User already on queue' });
      // }

      await UserQueue.create({
        user: user._id,
        queue: queue._id,
      });

      const rating = user.rating[queue.mode.mode.toLowerCase()];

      return res.json({
        message: 'User added to queue',
        user: {
          id: user._id,
          username: user.chessUsername,
          rating,
        },
      });
    } catch (err) {
      console.error('Error adding user to queue:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  removeFromQueue: async (req, res) => {
    try {
      const { userId } = req.params;

      const removedUserQueue = await UserQueue.findByIdAndRemove(userId);

      if (!removedUserQueue) {
        return res.status(404).json({ message: 'UserQueue not found' });
      }

      return res.json({ message: 'User removed from the queue' });
    } catch (err) {
      console.error('Error removing user from queue:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  update: async (req, res) => {
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
  delete: async (req, res) => {
    try {
      await UserQueue.deleteMany({});

      return res.json({ message: 'Queue cleared successfully' });
    } catch (err) {
      console.error('Error clearing queue:', err);
      return res
        .status(500)
        .json({ message: 'Internal server error', error: err });
    }
  },
};
