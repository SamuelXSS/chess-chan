import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import {
  socketLogger,
  joinQueue,
  newChannelInserted,
  newPlayerOnQueue,
  handleSendBotMessage,
  userRemovedFromQueue,
} from './services/socket.js';
import { Server } from 'socket.io';
import connectToDB from './database/connection.js';
import routes from './routes.js';
import morgan from 'morgan';
import { env } from 'custom-env';
import User from './models/User.js';
import { totalUsersMetric } from './services/metrics.js';
env();

export const app = express();

const server = http.createServer(app);
const { MONGODB_URL, MONGODB_DATABASE } = process.env;

connectToDB(MONGODB_URL, MONGODB_DATABASE);

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(routes);

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:8080',
      'https://twitch.tv',
      'https://dev.twitch.tv',
      'https://api.twitch.tv',
      'https://chess-chan.com',
    ],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socketLogger(socket);
  newChannelInserted(socket);
  newPlayerOnQueue(socket);
  userRemovedFromQueue(socket);
  joinQueue(socket);
  handleSendBotMessage(socket);
});

app.use(async (err, req, res, next) => {
  const users = await User.countDocuments();

  totalUsersMetric.set(users);
});

const port = 3000;

server.listen(port, () => {
  console.log(`Listening server on ${port}`);
});

export { io };
