import React from 'react';
import image from '../../assets/images';
import ChooseGameMode from '../ChooseGameMode';
import { Grid, Skeleton, Tooltip, Typography } from '@mui/material';

const PanelHeader = ({
  gameModeName,
  isLoading,
  queue,
  queueSize,
  isStreamer,
  setQueue,
  selectedGameMode,
  setSelectedGameMode,
  queueModes,
  queueId,
  isQueueOpened,
  setIsQueueOpened,
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
            className="image"
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
            sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}
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
          <Grid item style={{marginRight: 10}}>
            <Grid container alignItems="center" style={{ cursor: 'default' }}>
              <Tooltip title="Queue size">
                <Typography
                  color="#fff"
                  fontSize={12}
                  style={{ marginRight: 5 }}
                >
                  {queue && queue.length} /
                </Typography>
              </Tooltip>
              {queueSize === null ? (
                <img src={image.infinity} alt="infinity" className="image" />
              ) : (
                <Typography
                  color="#fff"
                  fontSize={12}
                  style={{ marginRight: 5 }}
                >
                  {queueSize}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item>
            {isStreamer && (
              <ChooseGameMode
                setQueue={setQueue}
                selectedGameMode={selectedGameMode}
                setSelectedGameMode={setSelectedGameMode}
                queueModes={queueModes}
                queueId={queueId}
                isQueueOpened={isQueueOpened}
                setIsQueueOpened={setIsQueueOpened}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <Skeleton variant="rounded" width={90} height={40} />
      )}
    </Grid>
  </Grid>
);

export default PanelHeader;
