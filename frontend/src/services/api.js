import axios from 'axios';

const { NODE_ENV: env } = process.env;

const api = axios.create({
  baseURL:
    env === 'development'
      ? 'http://localhost:3000'
      : 'https://api.chess-chan.com',
});

const twitchApi = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});

export { api, twitchApi };
