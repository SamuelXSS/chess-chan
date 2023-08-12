import { io } from 'socket.io-client';
const SOCKET_URL = 'https://api.chess-chan.com';

export const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log(`connect ${socket.id}`);
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on('disconnect', (reason) => {
  console.log(`disconnect due to ${reason}`);
});
