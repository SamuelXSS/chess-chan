import tmi from 'tmi.js';
import socket from './socket.js';
import { getStreamersChannels } from '../methods/index.js';

const BOT_USERNAME = 'chesschanbot';
const BOT_OAUTH_TOKEN = 'oauth:4j6kaeznpq8if75q4ic4o8f1tf5we1';

const client = new tmi.Client({
  identity: {
    username: BOT_USERNAME,
    password: BOT_OAUTH_TOKEN,
  },
  channels: [],
});

const whitelist = [];

socket.on('newChannelInserted', async () => {
  try {
    const channels = await getStreamersChannels();
    if (channels !== null) {
      client.opts.channels = channels;

      await client.disconnect();
      await client.connect();
      console.log('Bot connected to updated channels:', channels);
    } else {
      console.log('Failed to fetch updated channels list.');
    }
  } catch (err) {}
});

(async () => {
  try {
    const channels = await getStreamersChannels();

    if (channels !== null) {
      client.opts.channels = channels;
      whitelist.push(channels);
      try {
        await client.connect();
        console.log('Bot connected to channels:', channels);
      } catch (error) {
        console.error('Error connecting bot:', error);
      }
    } else {
      console.log('Failed to fetch channels list.');
    }
  } catch (err) {}
})();

export { client, whitelist };
