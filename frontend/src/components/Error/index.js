import { Grid, Link, Typography } from '@mui/material';
import React from 'react';
import image from '../../assets/images';

const ErrorPage = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <img
        src={image.maintenance}
        alt="maintenance"
        width={200}
        style={{ marginTop: 50, marginBottom: 30 }}
      />
      <Typography
        color="#fff"
        fontSize={20}
        fontWeight="bold"
        marginBottom={10}
      >
        Oh no! Something went wrong :(
      </Typography>
      <Typography color="#fff">
        You must connect to a{' '}
        <Link
          target="_blank"
          rel="noreferrer"
          color="secondary"
          href="https://twitch.tv"
        >
          twitch.tv
        </Link>{' '}
        account to use chess-chan!
      </Typography>
    </Grid>
  );
};

export default ErrorPage;
