import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.chess-chan.com',
});

const twitchApi = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
});

export { api, twitchApi };
