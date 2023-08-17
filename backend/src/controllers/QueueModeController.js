import QueueMode from '../models/QueueMode.js';
import { errorHandler } from '../services/handler.js';

export default {
  async list(req, res) {
    try {
      const modes = await QueueMode.find();

      const formattedModes = {
        bullet: [],
        blitz: [],
        rapid: [],
      };

      modes.forEach((mode) => {
        const formattedMode = {
          _id: mode._id,
          time: mode.time,
          formattedTime: mode.formattedTime,
          __v: mode.__v,
        };

        if (mode.mode === 'Bullet') {
          formattedModes.bullet.push(formattedMode);
        } else if (mode.mode === 'Blitz') {
          formattedModes.blitz.push(formattedMode);
        } else if (mode.mode === 'Rapid') {
          formattedModes.rapid.push(formattedMode);
        }
      });

      return res.json({ modes: formattedModes });
    } catch (err) {
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  async show(req, res) {
    try {
      const { mode } = req.query;
      const queryMode = await QueueMode.findOne({ mode });

      return res.json({ mode: queryMode });
    } catch (err) {
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  async create(req, res) {
    try {
      const { mode, time, formattedTime } = req.body;

      const queueMode = await QueueMode.find({ time });

      if (queueMode.length > 0) {
        return res.status(400).json({ message: 'Queue mode already exists' });
      }

      const newQueueMode = await QueueMode.create({
        mode,
        time,
        formattedTime,
      });

      return res.json({ message: 'Queue added', queueMode: newQueueMode });
    } catch (err) {
      return errorHandler(500, `Internal server error: ${err}`, res);
    }
  },
  async update(req, res) {},
  async delete(req, res) {},
};
