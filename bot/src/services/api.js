import axios from 'axios';

const { NODE_ENV: env } = process.env;

const chessApi = axios.create({
  baseURL: 'https://api.chess.com',
});

const api = axios.create({
  baseURL:
    env === 'dev' ? 'http://localhost:3000' : 'https://api.chess-chan.com',
});

export { api, chessApi };
