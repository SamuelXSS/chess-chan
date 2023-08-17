import mongoose from 'mongoose';

const userQueueSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    queue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Queue',
    },
  },
  {
    timestamps: true,
  }
);

userQueueSchema.post('save', async function () {
  const Queue = mongoose.model('Queue');

  await Queue.findByIdAndUpdate(this.queue, {
    $inc: { usersOnQueue: 1 },
  });
});

userQueueSchema.post('remove', async function () {
  const Queue = mongoose.model('Queue');

  await Queue.findByIdAndUpdate(this.queue, {
    $inc: { usersOnQueue: -1 },
  });
});

const UserQueue = mongoose.model('UserQueue', userQueueSchema);

export default UserQueue;
