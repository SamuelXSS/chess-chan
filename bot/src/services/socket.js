import { io } from 'socket.io-client';

const { NODE_ENV: env } = process.env;

const socket = io(
  env === 'dev' ? 'http://localhost:3000' : 'https://api.chess-chan.com'
);

export default socket;
