import mongoose from 'mongoose';

const userQueueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  queue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Queue',
  },
});

const UserQueue = mongoose.model('UserQueue', userQueueSchema);

export default UserQueue;
