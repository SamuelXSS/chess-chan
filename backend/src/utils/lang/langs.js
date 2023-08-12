const langs = {
  pt_br: {},
  en: {
    enteredQueue: (username) =>
      `You have joined the queue, @${username}! Type !queue to see your position.`,
    leftQueue: (username) =>
      `You have left the queue, @${username}! See you later.`,
    provideChessUsername: (username) =>
      `@${username}, you need to provide your Chess.com username to join the queue.`,
    cantDoThis: (username) => `@${username}, you can't do this, sorry.`,
    maxQueueSizeSetted: (username, maxQueueSize) =>
      `@${username}, the queue size has been set to ${maxQueueSize}.`,
    provideMaxQueue: (username) =>
      `@${username}, you need to provide the maximum queue size.`,
    alreadyOnQueue: (username, chessDotComName, queuePosition) =>
      `@${username} (${chessDotComName}), you're already on queue! Your position: ${queuePosition}.`,
    queueFull: (username) =>
      `@${username}, the queue is currently full. Please try again when the next game finishes.`,
    couldntFindChessUser: (username) =>
      `@${username}, I could not find your Chess.com username, try again!`,
  },
  es: {},
  fr: {},
  de: {},
  zh_cn: {},
  ja: {},
  ko: {},
  ru: {},
  ar: {},
  hi: {},
};

export default langs;
