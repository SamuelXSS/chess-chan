import axios from 'axios';
import getTwitchToken from './twitchAuth.js';

const twitchApi = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});

const chessApi = axios.create({
  baseURL: 'https://api.chess.com',
});

twitchApi.interceptors.request.use(async (config) => {
  const { access_token } = await getTwitchToken();
  config.headers.Authorization = `Bearer ${access_token}`;
  config.headers['Client-Id'] = process.env.TWITCH_CLIENT_ID;
  return config;
});

export { twitchApi, chessApi };
