import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    queue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Queue',
    },
    winner: String,
    moves: Number
  },
  {
    timestamps: true,
  }
);

const UserGame = mongoose.model('UserGame', gameSchema);

export default UserGame;
