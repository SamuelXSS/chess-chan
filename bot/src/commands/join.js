import { getQueue } from '../methods/index.js';
import { addToQueue, getPlayer } from '../methods/index.js';

const joinCommand = async (message, client, channel, username) => {
  try {
    const chessDotComName = message.split(' ')[1];

    const { queue, size, isClosed } = await getQueue(channel);

    if (isClosed) {
      return client.say(
        channel,
        `@${username}, the queue is currently closed!`
      );
    }

    const isQueueFull = queue.length === size;

    if (isQueueFull && size !== null) {
      return client.say(channel, `@${username}, the queue is currently full!`);
    }

    if (chessDotComName) {
      await getPlayer(chessDotComName);

      const streamerChannel = channel.split('#')[1];

      await addToQueue(username, chessDotComName, streamerChannel);

      client.say(
        channel,
        `You entered the queue, @${username}! Hit !queue to see your position.`
      );
    } else {
      client.say(
        channel,
        `@${username}, you need to provide your Chess.com username to join the queue.`
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default joinCommand;
