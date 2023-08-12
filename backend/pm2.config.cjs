module.exports = {
  apps: [
    {
      name: 'chesschan-api-prod',
      script: 'src/server.js',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
