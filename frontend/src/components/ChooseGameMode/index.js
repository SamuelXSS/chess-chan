import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import QueueOnOfSwitch from '../QueueOnOfSwitch';
import SettingsIcon from '@mui/icons-material/Settings';
import SelectGameMode from './SelectGameMode';

const ChooseGameMode = ({
  setQueue,
  selectedGameMode,
  setSelectedGameMode,
  queueModes,
  queueId,
}) => {
  const [isQueueOpened, setIsQueueOpened] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangeQueue = (e) => {
    setIsQueueOpened(e.target.checked);
  };

  const handleClearQueue = () => {
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
