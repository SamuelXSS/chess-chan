import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    twitchUsername: String,
    chessUsername: String,
    chessUserId: String,
    avatar: String,
    title: String,
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

const User = mongoose.model('User', userSchema);

export default User;
