import { addToQueue, getQueue } from '../methods/index.js';
import socket from '../services/socket.js';

const joinCommand = async (message, client, channel, username) => {
  const chessDotComName = message.split(' ')[1];

  const { queue, size } = await getQueue(channel);

  const isQueueFull = queue.length === size;

  if (isQueueFull && size !== null) {
    return client.say(channel, `@${username}, the queue is currently full!`);
  }

  if (chessDotComName) {
    await getPlayer(chessDotComName);

    const streamerChannel = channel.split('#')[1];

    const { user } = await addToQueue(
      username,
      chessDotComName,
      streamerChannel
    );

    socket.emit('queue:join', streamerChannel);
    socket.emit('queue:update', streamerChannel, user);

    client.say(
      channel,
      `You entered on queue @${username}! Hit !queue to see your position`
    );
  } else {
    client.say(
      channel,
      `@${username}, you need to provide your Chess.com username to join the queue.`
    );
  }
};

export default joinCommand;
