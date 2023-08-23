import User from '../models/User.js';

export default {
  async show(req, res) {
    const { username } = req.query;

    const user = await User.findOne({ twitchUsername: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  },
};
