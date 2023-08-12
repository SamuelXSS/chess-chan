import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import PanelPage from './components/PanelPage';
import theme from './assets/theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <ThemeProvider theme={theme}>
    <PanelPage />
  </ThemeProvider>
);
