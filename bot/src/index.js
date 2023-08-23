import 'dotenv/config';
import { handleErrorMessage } from './functions/index.js';
import { getQueue } from './methods/index.js';
import { client } from './services/tmi.js';
import joinCommand from './commands/join.js';
import socket from './services/socket.js';
import leaveCommand from './commands/leave.js';

const handleJoinCommand = async (channel, userstate, message) => {
  try {
    await joinCommand(message, client, channel, userstate.username);
  } catch (error) {
    const nestedErrorMessage = error.message.match(/Error: (.+)/);
    const errorMessage = nestedErrorMessage
      ? nestedErrorMessage[1]
      : error.message;

    handleErrorMessage(client, channel, userstate, errorMessage);
  }
};

const handleLeaveCommand = async (channel, userstate) => {
  try {
    await leaveCommand(channel, userstate.username);
    client.say(channel, `@${userstate.username}, you left the queue!`);
  } catch (error) {
    const nestedErrorMessage = error.message.match(/Error: (.+)/);
    const errorMessage = nestedErrorMessage
      ? nestedErrorMessage[1]
      : error.message;

    handleErrorMessage(client, channel, userstate, errorMessage);
  }
};

const handleQueueCommand = async (channel) => {
  try {
    const { usersOnQueue } = await getQueue(channel);

    if (!usersOnQueue) {
      client.say(
        channel,
        'The queue is currently empty. Type !join [chess_com_username] to play!'
      );
    } else {
      client.say(channel, usersOnQueue);
    }
  } catch (error) {
    const nestedErrorMessage = error.message.match(/Error: (.+)/);
    const errorMessage = nestedErrorMessage
      ? nestedErrorMessage[1]
      : error.message;

    handleErrorMessage(client, channel, userstate, errorMessage);
  }
};

client.on('connected', (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});

client.on('message', async (channel, userstate, message, self) => {
  if (self) return;

  if (message.startsWith('!join')) {
    await handleJoinCommand(channel, userstate, message);
  } else if (message.startsWith('!queue')) {
    await handleQueueCommand(channel);
  } else if (message.startsWith('!leave')) {
    await handleLeaveCommand(channel, userstate);
  }
});

socket.on(
  'handleNextQueuePlayer',
  ({ channelId, resultGameMessage, nextPlayerMessage }) => {
    client.say(
      channelId == 'codacarter' ? 'CodaCarter' : channelId,
      resultGameMessage
    );
    if (nextPlayerMessage) {
      client.say(
        channelId == 'codacarter' ? 'CodaCarter' : channelId,
        nextPlayerMessage
      );
    }
  }
);

socket.on('handleSendBotMessage', ({ channelId, message }) =>
  client.say(channelId == 'codacarter' ? 'CodaCarter' : channelId, message)
);
