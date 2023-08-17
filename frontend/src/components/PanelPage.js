import React, { useEffect, useState } from 'react';
import QueueList from './QueueList';
import ErrorPage from './Error';
import image from '../assets/images';
import PanelHeader from './PanelHeader';
import { Grid, Divider, Tooltip } from '@mui/material';
import { decodeToken } from '../utils/authentication.js';
import { api } from '../services/api';
import { socket } from '../services/socket';
import './styles.css';
import '../App.css';
import '../index.css';

const PanelPage = () => {
  const [queue, setQueue] = useState([]);
  const [gameModeName, setGameModeName] = useState('');
  const [queueId, setQueueId] = useState('');
  const [streamer, setStreamer] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [queueModes, setQueueModes] = useState(null);
  const [isStreamer, setIsStreamer] = useState(false);
  const [queueSize, setQueueSize] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isQueueOpened, setIsQueueOpened] = useState(true);
  const [twitch] = useState(window.Twitch.ext);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const authentication = await new Promise((resolve) => {
        twitch.onAuthorized(resolve);
      });

      const { role } = decodeToken(authentication.token);
      const {
        data: { streamer: streamerData },
      } = await api.get(`/streamer?channelId=${authentication.channelId}`);
      !streamerData && setStreamer(false);

      setQueueId(streamerData.queueId);
      setStreamer(streamerData);
      setIsStreamer(role === 'broadcaster');

      const {
        data: { queue, mode, formattedMode, queueModeId: id, size, isClosed },
      } = await api.get(`/queue?queueId=${streamerData.queueId}`);

      setQueue(queue);
      setGameMode(mode);
      setQueueSize(size);
      setGameModeName(formattedMode);
      setIsQueueOpened(!isClosed);
      setSelectedGameMode(id);

      const response = await api.get('/queueMode');
      setQueueModes(response.data.modes);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleNewUser = (data) => {
    console.log(data);
    setQueue((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    fetchData();
  }, [twitch, streamer?.twitchUsername, selectedGameMode]);

  useEffect(() => {
    socket.emit('queue:join', streamer?.twitchUsername);
    socket.on('queue:update', handleNewUser);

    return () => {
      socket.off('queue:update', handleNewUser);
    };
  }, [streamer?.twitchUsername]);

  const handleNextPlayer = async () => {
    try {
      await api.delete(
        `/queue/${queueId}/player/${queue[0].id}/remove?isNext=true${
          queue[1] ? `&nextUserId=${queue[1].id}` : ''
        }`
      );

      const newQueue = queue.filter((item) => item.id !== queue[0].id);

      setQueue(newQueue);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#45753c',
        paddingLeft: 10,
      }}
    >
      {streamer || isLoading ? (
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
            isQueueOpened={isQueueOpened}
            setIsQueueOpened={setIsQueueOpened}
          />
          <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
          <QueueList
            queue={queue}
            setQueue={setQueue}
            queueId={queueId}
            gameMode={gameMode}
            isStreamer={isStreamer}
            isLoading={isLoading}
          />
          <Grid container alignItems="end" justifyContent="space-between">
            <img
              src={image.logo}
              className="logo image"
              alt="logo"
              width={80}
            />
            {isStreamer && !isLoading && queue.length > 0 && (
              <Tooltip
                title="Next player"
                placement="bottom"
                onClick={handleNextPlayer}
              >
                <Grid
                  item
                  justifyContent="center"
                  className="buttonNext"
                  alignItems="center"
                  style={{
                    border: '3px solid #fff',
                    borderRadius: 200,
                    padding: 13,
                    marginBottom: 30,
                    backgroundColor: '#31542b',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={image.next}
                    className="next image"
                    alt="next"
                    width={30}
                    height={30}
                  />
                </Grid>
              </Tooltip>
            )}
            <a
              href="https://chess.com/home"
              target="_blank"
              rel="noreferrer"
              className="image"
              style={{ marginRight: 20 }}
            >
              <img
                src={image.chessLogo}
                className="image"
                alt="logo"
                width={80}
              />
            </a>
          </Grid>
        </>
      ) : streamer === false ? (
        <ErrorPage />
      ) : (
        ''
      )}
    </Grid>
  );
};

export default PanelPage;
