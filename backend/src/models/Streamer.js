import mongoose from 'mongoose';

const streamerSchema = new mongoose.Schema({
  userId: String,
  channelId: String,
  twitchUsername: String,
  chessUsername: String,
  language: String,
  rating: {
    bullet: Number,
    blitz: Number,
    rapid: Number,
  },
});

const Streamer = mongoose.model('Streamer', streamerSchema);

export default Streamer;
