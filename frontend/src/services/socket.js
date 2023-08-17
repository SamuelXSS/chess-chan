import { io } from 'socket.io-client';

const { NODE_ENV: env } = process.env;

const SOCKET_URL =
  env === 'development'
    ? 'http://localhost:3000'
    : 'https://api.chess-chan.com';

export const socket = io(SOCKET_URL);