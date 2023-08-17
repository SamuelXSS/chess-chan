const createWinnerMessage = (
  game,
  streamerChessUsername,
  userChessUsername,
  userTwitchUsername
) => {
  const { user1, user2, user1Result, user2Result, moves } = game;
  let winnerUsername, loserUsername, winnerPiece, loserPiece;

  if (user1Result === 1) {
    winnerUsername = user1.username;
    winnerPiece = '⬜';
    loserPiece = '⬛';
    loserUsername = user2.username;
  } else if (user2Result === 1) {
    winnerUsername = user2.username;
    winnerPiece = '⬛';
    loserPiece = '⬜';
    loserUsername = user1.username;
  } else {
    return "@${userTwitchUsername} it's a draw! Nice game!";
  }
  if (winnerUsername === userChessUsername) {
    return `@${userTwitchUsername}, you won in ${moves} moves, congratulations! 🏆 ${winnerPiece} ${winnerUsername} x ${loserUsername} ${loserPiece}`;
  } else {
    return `${streamerChessUsername} won in ${moves} moves! Good luck next time, @${userTwitchUsername}! 🏆 ${winnerPiece} ${winnerUsername} x ${loserUsername} ${loserPiece}`;
  }
};

const getLatestEvent = (events) => {
  let latestEvent = null;
  let latestDate = new Date(0); // Data mínima

  for (const event of events) {
    const gameEndTime = new Date(event.gameEndTime);
    if (gameEndTime > latestDate) {
      latestDate = gameEndTime;
      latestEvent = event;
    }
  }

  return latestEvent;
};

const formatQueue = (queue) => {
  return queue.map((q, index) => {
    const position = index + 1;
    const { mode } = q.queue.mode;
    const liveStatus =
      index === 0 ? '[LIVE 🔴]' : index === 1 ? '[NEXT 🟡]' : '';
    const chessUsername = q.user.chessUsername;
    const rating = q.user.rating[mode.toLowerCase()];

    return {
      chat: `${position}. ${chessUsername} (${rating}) ${liveStatus}`,
      queue: {
        avatar: q.user.avatar,
        id: q.user._id,
        username: chessUsername,
        position,
        rating,
        title: q.user.title,
      },
    };
  });
};

export { createWinnerMessage, getLatestEvent, formatQueue };
