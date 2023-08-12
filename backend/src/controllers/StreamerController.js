import Streamer from '../models/Streamer.js';
import { twitchApi } from '../services/api.js';
import { errorHandler } from '../services/handler.js';
import getTwitchToken from '../services/twitchAuth.js';
import { io } from '../server.js';
import Queue from '../models/Queue.js';
import { validateChessName } from './client/index.js';

export default {
  list: async (req, res) => {
    try {
      const streamers = await Streamer.find();
      const formattedStreamers = [];

      for (const streamer of streamers) {
        console.log(streamer);
        const { size: queueSize } = await Queue.findOne({
          streamer: streamer._id,
        });
        console.log(queueSize);

        formattedStreamers.push({
          ...streamer._doc,
          queueSize,
        });
      }

      return res.json({ streamers: formattedStreamers });
    } catch (err) {
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  show: async (req, res) => {
    try {
      const { userId, twitchUsername, channelId } = req.query;
      const streamer = await Streamer.findOne({
        $or: [{ userId }, { twitchUsername }, { channelId }],
      });
      const { size: queueSize, _id: queueId } = await Queue.findOne({
        streamer: streamer._id,
      });

      return res.json({ streamer: { ...streamer._doc, queueSize, queueId } });
    } catch (err) {
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  create: async (req, res) => {
    try {
      const { chessUsername, userId, channelId, language, queueSize } =
        req.body;

      const { access_token } = await getTwitchToken();

      const {
        data: { data },
      } = await twitchApi.get(`/users?id=${channelId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

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

      console.log(bulletRating, blitzRating, rapidRating);

      const hasStreamer = await Streamer.find({
        twitchUsername: data[0].display_name,
      });

      if (hasStreamer.length > 0) {
        return res
          .status(400)
          .json({ message: 'Streamer already exists in database' });
      }

      const streamer = await Streamer.create({
        chessUsername,
        userId,
        channelId,
        twitchUsername: data[0].display_name,
        language,
        rating: {
          bullet: bulletRating,
          blitz: blitzRating,
          rapid: rapidRating,
        },
      });

      await Queue.create({
        streamer: streamer._id,
        size: queueSize,
        mode: '64d3f7a821d7f83d87642d79',
        isClosed: false,
      });

      io.emit('newChannelInserted', data[0].display_name);

      return res.json({ message: 'New streamer and queue inserted to db.' });
    } catch (err) {
      const errData = JSON.parse(err.message);
      if (errData.error === 'chess.com user not found') {
        return res.status(404).json({ message: 'Chess.com user not found' });
      }
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  update: async (req, res) => {
    try {
      const { chessUsername, userId, channelId, language, queueSize } =
        req.body;

      await validateChessName(chessUsername);

      const updatedStreamer = await Streamer.findOneAndUpdate(
        { userId },
        {
          chessUsername,
          channelId,
          language,
        },
        { new: true }
      );

      if (!updatedStreamer) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (queueSize || queueSize == '') {
        await Queue.findOneAndUpdate(
          { streamer: updatedStreamer._id },
          { size: queueSize }
        );
      }

      return res.json({ message: 'Streamer updated' });
    } catch (err) {
      const errData = JSON.parse(err.message);
      if (errData.error === 'chess.com user not found') {
        return res.status(404).json({ message: 'Chess.com user not found' });
      }
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  destroy: async (req, res) => {},
};
