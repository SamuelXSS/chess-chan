import { io } from '../server.js';

const joinQueue = (socket) =>
  socket.on('queue:join', (streamerId) => {
    socket.join(streamerId);
  });

const newChannelInserted = (socket) =>
  socket.on('newChannelInserted', (data) =>
    io.emit('newChannelInserted', data)
  );

const userRemovedFromQueue = (socket) =>
  socket.on('userRemovedFromQueue', (data) =>
    io.emit('userRemovedFromQueue', data)
  );

const handleSendBotMessage = (socket) =>
  socket.on('handleSendBotMessage', (data) =>
    io.emit('handleSendBotMessage', data)
  );

const newPlayerOnQueue = (socket) =>
  socket.on('queue:update', (streamerId, queue) => {
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

export {
  socketLogger,
  joinQueue,
  newChannelInserted,
  userRemovedFromQueue,
  newPlayerOnQueue,
  handleSendBotMessage,
};
