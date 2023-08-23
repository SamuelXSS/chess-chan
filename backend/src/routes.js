import express from 'express';
import StreamerController from './controllers/StreamerController.js';
import QueueController from './controllers/QueueController.js';
import QueueModeController from './controllers/QueueModeController.js';
import UserController from './controllers/UserController.js';

const routes = express.Router();
routes.get('/user', UserController.show);

routes.get('/streamers', StreamerController.list);
routes.get('/streamer', StreamerController.show);
routes.post('/streamers', StreamerController.create);
routes.put('/streamers', StreamerController.update);

routes.get('/queue', QueueController.list);
routes.post('/queue', QueueController.addToQueue);
routes.put('/queue', QueueController.update);
routes.delete('/queue/:queueId/clear', QueueController.delete);
routes.delete(
  '/queue/:queueId/player/:userId/remove',
  QueueController.removeFromQueue
);
routes.delete('/queue/:queueId/player/:userId/leave', QueueController.leave);

routes.get('/queueMode', QueueModeController.list);
routes.get('/queueMode', QueueModeController.show);
routes.post('/queueMode', QueueModeController.create);

export default routes;
