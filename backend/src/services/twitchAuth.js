import axios from 'axios';

const getTwitchToken = async () => {
  const config = {
    url: 'https://id.twitch.tv/oauth2/token',
    method: 'post',
    data: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  };
  const request = await axios(config);

  return request.data;
};

export default getTwitchToken;
