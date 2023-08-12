import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#45753c',
    },
    secondary: {
      main: '#ccc',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
});

export default theme;
