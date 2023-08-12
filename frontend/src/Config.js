import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import ConfigPage from './components/ConfigPage';
import theme from './assets/theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <ThemeProvider theme={theme}>
    <ConfigPage />
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="dark"
    />
  </ThemeProvider>
);
