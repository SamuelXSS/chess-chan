import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  Link,
  IconButton,
  Badge,
  Skeleton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';
import { api } from '../services/api';

const QueueList = ({ queue, isLoading, gameMode, setQueue, isStreamer }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [whoIsHovered, setWhoIsHovered] = useState(0);

  const handleMouseOver = (e, index) => {
    setWhoIsHovered(index);
    setIsHovering(true);
  };

  const handleMouseOut = (e, index) => {
    setWhoIsHovered(index);
    setIsHovering(false);
  };

  const handleRemoveFromQueue = async (userId) => {
    try {
      await api.delete(`/queue/${userId}/remove`);

      const newQueue = queue.filter((item) => item.id !== userId);

      setQueue(newQueue);
    } catch (err) {}
  };

  return (
    <Box height={310} overflow="auto" display="flex" flexDirection="column">
      {!isLoading && queue && queue.length === 0 && (
        <Typography variant="body1" className="queueEmpty">
          The queue is currently empty! 😓
          <br />
          <br />
          <span style={{ fontWeight: 'bold' }}>
            !join [chess.com_username]
          </span>{' '}
          to play!
        </Typography>
      )}
      {!isLoading ? (
        queue &&
        queue.map((q, index) => {
          return (
            <Grid
              container
              flexDirection="row"
              alignItems="center"
              key={index}
              className="queueContent"
              justifyContent="space-between"
              sx={{
                backgroundColor: '#fff',
                border: '1px solid transparent',
                borderRadius: 2,
                fontSize: 14,
                margin: 0.2,
                width: '96%',
              }}
              onMouseOver={(e) => handleMouseOver(e, index)}
              onMouseOut={(e) => handleMouseOut(e, index)}
            >
              <Grid item xs={9}>
                <Grid container alignItems="center">
                  <b style={{ marginRight: 10, marginLeft: 10 }}>
                    {index + 1}.{' '}
                  </b>
                  {q.title && <span className="playerTitle"> {q.title} </span>}
                  {isStreamer && isHovering && index === whoIsHovered ? (
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={`https://www.chess.com/play/online/new?isInvited=1&opponent=${q.username}&time=${gameMode}`}
                    >
                      {`${q.username}`}
                      <span style={{ fontSize: 12, marginLeft: 3 }}>
                        ({q.rating})
                      </span>
                    </Link>
                  ) : (
                    <>
                      {`${q.username}`}
                      <span style={{ fontSize: 12, marginLeft: 3 }}>
                        {' '}
                        ({q.rating})
                      </span>
                    </>
                  )}
                </Grid>
              </Grid>
              {index === 0 ? (
                <Grid item xs={3}>
                  <Grid container alignItems="center" justifyContent="end">
                    <Grid item>
                      <Badge badgeContent="LIVE" color="error" />
                    </Grid>
                    {isStreamer && (
                      <Grid item sx={{ marginLeft: 2 }}>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleRemoveFromQueue(q.id)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              ) : isStreamer ? (
                <Grid item>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveFromQueue(q.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              ) : null}
            </Grid>
          );
        })
      ) : (
        <Grid container>
          {[...Array(7)].map((_, index) => (
            <Skeleton
              style={{ margin: 2 }}
              key={index}
              variant="rounded"
              width="95%"
              height={40}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default QueueList;
