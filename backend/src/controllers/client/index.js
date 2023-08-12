import { chessApi } from '../../services/api.js';

const validateChessName = async (username) => {
  try {
    const request = await chessApi.get(`/pub/player/${username}/stats`);

    return request.data;
  } catch (err) {
    throw new Error(
      JSON.stringify({
        error: 'chess.com user not found',
        message: err.response.data.message,
        statusCode: err.response.status,
      })
    );
  }
};

export { validateChessName };
