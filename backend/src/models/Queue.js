import mongoose from 'mongoose';

const queueSchema = new mongoose.Schema(
  {
    streamer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Streamer',
    },
    mode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QueueMode',
    },
    size: Number,
    usersOnQueue: Number,
    isClosed: Boolean,
  },
  {
    timestamps: true,
  }
);

const Queue = mongoose.model('Queue', queueSchema);

export default Queue;
