import { getQueue, getUser } from '../methods/index.js';
import { removeFromQueue } from '../methods/index.js';

const leaveCommand = async (channel, username) => {
  try {
    const { _id: userId } = await getUser(username);
    const { queueId } = await getQueue(channel);

    await removeFromQueue(queueId, userId);
  } catch (error) {
    throw new Error(error);
  }
};

export default leaveCommand;
