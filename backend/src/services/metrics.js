import pm2 from '@pm2/io';

const usersOnQueuesMetric = pm2.metric({ name: 'Users on queues' });

const totalUsersMetric = pm2.metric({ name: 'Total Users' });

const streamersConnectedMetric = pm2.metric({ name: 'Total Streamers' });

const streamersLiveMetric = pm2.metric({ name: 'Streamers live' });

export {
  usersOnQueuesMetric,
  totalUsersMetric,
  streamersConnectedMetric,
  streamersLiveMetric,
};
