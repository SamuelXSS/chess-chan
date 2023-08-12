import { io } from '../server.js';

const joinQueue = (socket) =>
  socket.on('queue:join', (streamerId) => {
    console.log('Joined: ', streamerId);
    socket.join(streamerId);
  });

const newChannelInserted = (socket) =>
  socket.on('newChannelInserted', (data) =>
    io.emit('newChannelInserted', data)
  );

const newPlayerOnQueue = (socket) =>
  socket.on('queue:update', (streamerId, queue) => {
    console.log('New user', streamerId, queue);
    io.to(streamerId).emit('queue:update', queue);
  });

const socketLogger = (socket) => {
  let interval;
  socket.on('connect', (data) => {
    console.log(data.id);
  });
  socket.on('disconnect', (reason) => {
    clearInterval(interval);
  });
};

export { socketLogger, joinQueue, newChannelInserted, newPlayerOnQueue };
