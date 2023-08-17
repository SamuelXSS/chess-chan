import mongoose from 'mongoose';

const streamerSchema = new mongoose.Schema(
  {
    userId: String,
    channelId: String,
    twitchUsername: String,
    chessUsername: String,
    chessUserId: String,
    avatar: String,
    language: String,
    rating: {
      bullet: Number,
      blitz: Number,
      rapid: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Streamer = mongoose.model('Streamer', streamerSchema);

export default Streamer;
