import { api, chessApi } from '../services/api.js';

const getPlayer = async (username) => {
  try {
    const response = await chessApi.get(`/pub/player/${username}`);
    return response.data;
  } catch (error) {
    const { message, status } = error.response.data;
    throw new Error(JSON.stringify({ message, statusCode: status }));
  }
};

const getPlayerStats = async (username) => {
  try {
    const response = await chessApi.get(`/pub/player/${username}/stats`);
    return response.data;
  } catch (error) {
    const { message, status } = error.response.data;
    throw new Error(JSON.stringify({ message, statusCode: status }));
  }
};

const addToQueue = async (twitchUsername, chessUsername, streamerChannel) => {
  try {
    const response = await api.post('/queue', {
      twitchUsername,
      chessUsername,
      streamerChannel,
    });
    return response.data;
  } catch (error) {
    const { message, status } = error.response.data;
    throw new Error(JSON.stringify({ message, statusCode: status }));
  }
};

const getQueue = async (channel) => {
  try {
    const twitchUsername = channel.split('#')[1];
    const {
      data: { streamer },
    } = await api.get(`/streamer?twitchUsername=${twitchUsername}`);
    const {
      data: { usersOnQueue, queue, size, isClosed },
    } = await api.get(`/queue?queueId=${streamer.queueId}`);
    return { usersOnQueue, queue, size, isClosed };
  } catch (error) {
    const { message, status } = error.response.data;
    throw new Error(JSON.stringify({ message, statusCode: status }));
  }
};

const getStreamersChannels = async () => {
  try {
    const {
      data: { streamers },
    } = await api.get('/streamers');
    const channels = streamers.map((streamer) => streamer.twitchUsername);
    return channels;
  } catch (error) {
    const { message, status } = error.response.data;
    throw new Error(JSON.stringify({ message, statusCode: status }));
  }
};

export {
  getPlayer,
  getPlayerStats,
  addToQueue,
  getQueue,
  getStreamersChannels,
};
