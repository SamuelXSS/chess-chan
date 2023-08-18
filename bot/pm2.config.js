module.exports = {
  apps: [
    {
      name: 'chesschan-bot-prod',
      script: 'src/index.js',
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
