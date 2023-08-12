import { handleErrorMessage } from './functions/index.js';
import { getQueue } from './methods/index.js';
import { client } from './services/tmi.js';
import joinCommand from './commands/join.js';

client.on('connected', (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});

client.on('message', async (channel, userstate, message, self) => {
  if (self) return;

  try {
    if (message.startsWith('!join')) {
      await joinCommand(message, client, channel, userstate.username);
    } else if (message.startsWith('!queue')) {
      const { usersOnQueue } = await getQueue(channel);

      client.say(channel, usersOnQueue);
    }
  } catch (err) {
    handleErrorMessage(client, channel, userstate, err);
  }
});
