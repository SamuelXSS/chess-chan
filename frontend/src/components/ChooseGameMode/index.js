import React, { useState } from 'react';
import QueueOnOfSwitch from '../QueueOnOfSwitch';
import SettingsIcon from '@mui/icons-material/Settings';
import SelectGameMode from './SelectGameMode';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { api } from '../../services/api';

const ChooseGameMode = ({
  setQueue,
  selectedGameMode,
  setSelectedGameMode,
  queueModes,
  queueId,
  isQueueOpened,
  setIsQueueOpened,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangeQueue = async (e) => {
    try {
      await api.put('/queue', {
        queueId,
        isClosed: e.target.checked === true ? false : true,
      });
      setIsQueueOpened(!isQueueOpened);
    } catch (err) {}
  };

  const handleClearQueue = async () => {
    await api.delete(`/queue/${queueId}/clear`);
    setQueue([]);
    handleMenuClose();
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleSettingsClick}>
        <SettingsIcon htmlColor="#ccc" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontSize: 14 }}>
              {isQueueOpened ? 'Close queue' : 'Queue closed'}
            </Typography>
            <QueueOnOfSwitch
              checked={isQueueOpened}
              onChange={handleChangeQueue}
            />
            <Typography sx={{ fontSize: 14 }}>
              {isQueueOpened ? 'Queue opened' : 'Open queue'}
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem>
          <SelectGameMode
            selectedGameMode={selectedGameMode}
            setSelectedGameMode={setSelectedGameMode}
            handleMenuClose={handleMenuClose}
            queueModes={queueModes}
            queueId={queueId}
          />
        </MenuItem>
        <MenuItem onClick={handleClearQueue}>
          <Typography sx={{ fontSize: 14 }}>Clear queue</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ChooseGameMode;
