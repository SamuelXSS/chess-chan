import mongoose from 'mongoose';

const queueModeSchema = new mongoose.Schema(
  {
    mode: String,
    time: String,
    formattedTime: String,
  },
  {
    timestamps: true,
  }
);

const QueueMode = mongoose.model('QueueMode', queueModeSchema);

export default QueueMode;
