import React from 'react';
import { Grid, Skeleton, Tooltip, Typography } from '@mui/material';
import image from '../../assets/images';
import ChooseGameMode from '../ChooseGameMode';

const PanelHeader = ({
  gameModeName,
  isLoading,
  queue,
  queueSize,
  isStreamer,
  setQueue,
  selectedGameMode,
  setSelectedGameMode,
  setGameMode,
  queueModes,
  queueId,
}) => (
  <Grid
    container
    alignItems="center"
    justifyContent="space-between"
    sx={{ padding: 1 }}
  >
    <Grid item sx={{ marginTop: 2 }}>
      {!isLoading ? (
        <Grid container alignItems="center">
          <img
            style={{ marginRight: 10 }}
            alt="headerImg"
            src={
              gameModeName.includes('Blitz')
                ? image.blitz
                : gameModeName.includes('Bullet')
                ? image.bullet
                : image.rapid
            }
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#fff' }}
          >
            {gameModeName}
          </Typography>
        </Grid>
      ) : (
        <Skeleton variant="rounded" width={130} height={40} />
      )}
    </Grid>
    <Grid item sx={{ marginTop: 2 }}>
      {!isLoading ? (
        <Grid container alignItems="center" style={{ cursor: 'default' }}>
          <Tooltip title="Queue size">
            <Typography color="#fff" fontSize={12} style={{ marginRight: 5 }}>
              {queue && queue.length} /
            </Typography>
          </Tooltip>
          {queueSize === null ? (
            <img src={image.infinity} alt="infinity" />
          ) : (
            <Typography color="#fff" fontSize={12} style={{ marginRight: 5 }}>
              {queueSize}
            </Typography>
          )}
          {isStreamer && (
            <ChooseGameMode
              setQueue={setQueue}
              selectedGameMode={selectedGameMode}
              setSelectedGameMode={setSelectedGameMode}
              setGameMode={setGameMode}
              queueModes={queueModes}
              queueId={queueId}
            />
          )}
        </Grid>
      ) : (
        <Skeleton variant="rounded" width={90} height={40} />
      )}
    </Grid>
  </Grid>
);

export default PanelHeader;
