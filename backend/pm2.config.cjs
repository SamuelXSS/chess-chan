export default {
  apps: [
    {
      name: 'chesschan-api-dev',
      script: 'src/server.js',
      env: {
        NODE_ENV: 'dev',
      },
    },
    {
      name: 'chesschan-api-prod',
      script: 'src/server.js',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
