import React, { useEffect, useState } from 'react';
import QueueList from './QueueList';
import ChooseGameMode from './ChooseGameMode';
import {
  Container,
  Typography,
  Grid,
  Divider,
  Tooltip,
  Skeleton,
} from '@mui/material';
import { decodeToken } from '../utils/authentication.js';
import { api } from '../services/api';
import { socket } from '../services/socket';
import './styles.css';
import '../App.css';
import '../index.css';
import ErrorPage from './Error';
import image from '../assets/images';
import PanelHeader from './PanelHeader';

const PanelPage = () => {
  const [streamer, setStreamer] = useState(null);
  const [gameModeName, setGameModeName] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [isStreamer, setIsStreamer] = useState(false);
  const [queueId, setQueueId] = useState('');
  const [queueSize, setQueueSize] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queueModes, setQueueModes] = useState(null);
  const [twitch] = useState(window.Twitch.ext);

  const fetchAuthentication = async () => {
    try {
      const authentication = await new Promise((resolve) => {
        twitch.onAuthorized(resolve);
      });

      const { role } = decodeToken(authentication.token);
      const {
        data: { streamer: streamerData },
      } = await api.get(`/streamer?channelId=${authentication.channelId}`);
      console.log(streamerData);

      setQueueId(streamerData.queueId);
      setStreamer(streamerData);
      setIsStreamer(role === 'broadcaster');
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching authentication:', error);
      setIsLoading(false);
    }
  };

  const fetchQueue = async () => {
    try {
      setIsLoading(true);
      const {
        data: { queue, mode, formattedMode, queueModeId: id, size },
      } = await api.get(`/queue?queueId=${queueId}`);

      setQueue(queue);
      setGameMode(mode);
      setQueueSize(size);
      setGameModeName(formattedMode);
      setSelectedGameMode(id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchGameModes = async () => {
    try {
      const response = await api.get('/queueMode');
      setQueueModes(response.data.modes);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleNewUser = (data) => {
    console.log(data);
    setQueue((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    fetchAuthentication();
    fetchQueue();
    fetchGameModes();
  }, [twitch, queueId, selectedGameMode]);

  useEffect(() => {
    socket.emit('queue:join', streamer?.twitchUsername);
    socket.on('queue:update', handleNewUser);

    return () => {
      socket.off('queue:update', handleNewUser);
    };
  }, [streamer?.twitchUsername]);

  return (
    <Container className="panelContainer">
      {streamer ? (
        <>
          <PanelHeader
            gameModeName={gameModeName}
            isLoading={isLoading}
            queue={queue}
            queueSize={queueSize}
            isStreamer={isStreamer}
            setQueue={setQueue}
            selectedGameMode={selectedGameMode}
            setSelectedGameMode={setSelectedGameMode}
            setGameMode={setGameMode}
            queueModes={queueModes}
            queueId={queueId}
          />
          <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
          <QueueList
            queue={queue}
            setQueue={setQueue}
            gameModeName={gameModeName}
            gameMode={gameMode}
            selectedGameMode={selectedGameMode}
            isStreamer={isStreamer}
            isLoading={isLoading}
          />
          <footer>
            <img src={image.logo} className="logo" alt="logo" width={80} />
            <a href="https://chess.com/home" target="_blank" rel="noreferrer">
              <img
                src={image.chessLogo}
                className="chesslogo"
                alt="logo"
                width={80}
              />
            </a>
          </footer>
        </>
      ) : (
        <ErrorPage />
      )}
    </Container>
  );
};

export default PanelPage;
