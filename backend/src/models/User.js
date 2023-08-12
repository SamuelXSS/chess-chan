import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  twitchUsername: String,
  chessUsername: String,
  rating: {
    bullet: Number,
    blitz: Number,
    rapid: Number,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
