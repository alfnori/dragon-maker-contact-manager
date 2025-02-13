import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import themeOptions from './app/theme';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router';
import { initiateAppLocalStorage } from './utils/storages/localStorage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme(themeOptions);

initiateAppLocalStorage();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
