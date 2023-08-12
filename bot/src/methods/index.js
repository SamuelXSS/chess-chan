import { api, chessApi } from '../services/api.js';

const getPlayer = async (username) => {
  try {
    const request = await chessApi.get(`/pub/player/${username}`);

    return request.data;
  } catch (err) {
    throw new Error(
      JSON.stringify({
        message: err.response.data.message,
        statusCode: err.response.status,
      })
    );
  }
};

const getPlayerStats = async (username) => {
  try {
    const request = await chessApi.get(`/pub/player/${username}/stats`);

    return request.data;
  } catch (err) {
    throw new Error(
      JSON.stringify({
        message: err.response.data.message,
        statusCode: err.response.status,
      })
    );
  }
};

const addToQueue = async (twitchUsername, chessUsername, streamerChannel) => {
  try {
    const queue = await api.post('/queue', {
      twitchUsername,
      chessUsername,
      streamerChannel,
    });

    return queue.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const getQueue = async (channel) => {
  try {
    const {
      data: { streamer },
    } = await api.get(`/streamer?twitchUsername=${channel.split('#')[1]}`);

    const {
      data: { usersOnQueue, queue, size },
    } = await api.get(`/queue?queueId=${streamer.queueId}`);

    return { usersOnQueue, queue, size };
  } catch (err) {
    console.log(err);
  }
};

const getStreamersChannels = async () => {
  try {
    const {
      data: { streamers },
    } = await api.get('/streamers');

    const channels = streamers.map((streamer) => streamer.twitchUsername);

    return channels;
  } catch (err) {
    console.log(err);
  }
};

export {
  getPlayer,
  getPlayerStats,
  addToQueue,
  getQueue,
  getStreamersChannels,
};
