const handleErrorMessage = (client, channel, userstate, err) => {
  try {
    let errData;

    try {
      errData = JSON.parse(err);
    } catch (parseError) {
      // If parsing fails, assume the error message is not in JSON format
      errData = { message: err };
    }
    if (errData.message === 'User already on queue') {
      return client.say(
        channel,
        `@${userstate.username}, you're already on the queue!`
      );
    } else if (errData.message === 'Queue full') {
      return client.say(
        channel,
        `@${userstate.username}, the queue is currently full. Please try again when the next game finishes.`
      );
    } else if (errData.statusCode === 404) {
      return client.say(
        channel,
        `@${userstate.username}, I could not find your Chess.com username, please try again!`
      );
    } else {
      console.error('wtf', err);
    }
  } catch (parseError) {
    console.error('Error handling error message:', parseError);
  }
};

export { handleErrorMessage };
