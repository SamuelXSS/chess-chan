import { chessApi } from '../../services/api.js';
import axios from 'axios';
import { getLatestEvent } from '../functions/index.js';

const validateChessName = async (username) => {
  try {
    const request = await chessApi.get(`/pub/player/${username}/stats`);
    const requestProfile = await chessApi.get(`/pub/player/${username}`);

    return { ...request.data, ...requestProfile.data };
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

const getGameArchieves = async (username, streamerUserId, rivalUsername) => {
  const { data } = await axios.get(
    `https://www.chess.com/callback/user/games?locale=en_US&userId=${streamerUserId}`
  );

  const filteredGames = data.filter((game) => {
    const { user1: white, user2: black } = game;
    const isUserWhite = white.username === username;
    const isUserBlack = black.username === username;
    const isRivalWhite = white.username === rivalUsername;
    const isRivalBlack = black.username === rivalUsername;

    return (isUserWhite || isUserBlack) && (isRivalWhite || isRivalBlack);
  });

  const latestGames = getLatestEvent(filteredGames);

  return latestGames || 'No games found';
};

export { validateChessName, getGameArchieves };
