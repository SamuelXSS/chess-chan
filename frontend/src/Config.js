import React from 'react';
import ConfigPage from './components/ConfigPage';
import theme from './assets/theme';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
