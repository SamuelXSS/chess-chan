import React from 'react';
import PanelPage from './components/PanelPage';
import theme from './assets/theme';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <ThemeProvider theme={theme}>
    <PanelPage />
  </ThemeProvider>
);
