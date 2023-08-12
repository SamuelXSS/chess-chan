import { twitchApi } from '../../services/api';

const getStreamerName = async (id, token) => {
  try {
    const request = await twitchApi.get(`/users?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return request.data;
  } catch (err) {
    return err;
  }
};

export { getStreamerName };
