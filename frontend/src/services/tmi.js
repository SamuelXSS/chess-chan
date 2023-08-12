import tmi from 'tmi.js';

const getTmiClient = (channel) => {
  return new tmi.Client({
    channels: [channel],
  });
};

export default getTmiClient;
