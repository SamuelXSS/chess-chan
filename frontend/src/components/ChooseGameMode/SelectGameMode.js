import React from 'react';
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material';
import { api } from '../../services/api';
import '../../App.css';
import '../../index.css';
import '../styles.css';

const SelectGameMode = ({
  selectedGameMode,
  setSelectedGameMode,
  handleMenuClose,
  origin,
  queueModes,
  queueId,
}) => {
  const updateQueue = async (e) => {
    try {
      await api.put('/queue', {
        queueId,
        mode: e.target.value,
      });
      setSelectedGameMode(e.target.value);
      handleMenuClose && handleMenuClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 225 }}>
      <InputLabel htmlFor="grouped-select">Game mode</InputLabel>
      <Select
        defaultValue=""
        id="grouped-select"
        label="Game mode"
        value={selectedGameMode}
        onChange={updateQueue}
      >
        <ListSubheader
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <img
            src="https://uploads.chess-chan.com/images/bullet.png"
            alt="bullet"
            width={16}
            height={16}
            style={{ marginRight: 5 }}
          />
          Bullet
        </ListSubheader>
        {queueModes.bullet.map((qm, index) => (
          <MenuItem
            key={index}
            sx={{
              display: 'inline-flex',
              width: '27%',
              justifyContent: 'center',
              margin: 1,
            }}
            value={qm._id}
          >
            {qm.formattedTime}
          </MenuItem>
        ))}
        <ListSubheader
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <img
            src="https://uploads.chess-chan.com/images/blitz.png"
            alt="blitz"
            width={10}
            height={16}
            style={{ marginRight: 5 }}
          />
          Blitz
        </ListSubheader>
        {queueModes.blitz.map((qm, index) => (
          <MenuItem
            key={index}
            sx={{
              display: 'inline-flex',
              width: '27%',
              justifyContent: 'center',
              margin: 1,
            }}
            value={qm._id}
          >
            {qm.formattedTime}
          </MenuItem>
        ))}
        <ListSubheader
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <img
            src="https://uploads.chess-chan.com/images/rapid.png"
            alt="rapid"
            width={14}
            height={16}
            style={{ marginRight: 5 }}
          />
          Rapid
        </ListSubheader>
        {queueModes.rapid.map((qm, index) => (
          <MenuItem
            key={index}
            sx={{
              display: 'inline-flex',
              width: '27%',
              justifyContent: 'center',
              margin: 1,
            }}
            value={qm._id}
          >
            {qm.formattedTime}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectGameMode;
