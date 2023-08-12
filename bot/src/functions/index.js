const handleErrorMessage = (client, channel, userstate, err) => {
  const errData = JSON.parse(err.message);

  if (errData.message == 'Already on queue') {
    client.say(
      channel,
      `@${userstate.username} (${errData.chessDotComName}), you're already on queue! Your position: ${errData.queuePosition}`
    );
  } else if (errData.message == 'Queue full') {
    client.say(
      channel,
      `@${userstate.username}, the queue is currently full. Please try again when the next game finishes.`
    );
  } else if (errData.statusCode == 404) {
    client.say(
      channel,
      `@${userstate.username}, I could not find your Chess.com username, try again!`
    );
  }
};

export { handleErrorMessage };
