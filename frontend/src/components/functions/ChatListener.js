import React, { useEffect } from 'react';

const ChatListener = () => {
  useEffect(() => {
    const twitch = window.Twitch.ext;

    const handleChatMessage = (target, contentType, message) => {
      const chatMessage = JSON.parse(message);
      console.log(`Received chat message: ${chatMessage.message}`);
      console.log(`Target: ${target}`);
      console.log(`AllMessage: ${chatMessage}`);
    };

    twitch.listen('broadcast', handleChatMessage);

    return () => {
      twitch.unlisten('broadcast', handleChatMessage);
    };
  }, []);

  return <div>Listening to chat messages...</div>;
};

export default ChatListener;
