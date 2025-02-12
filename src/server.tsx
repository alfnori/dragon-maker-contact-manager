import React from 'react';
import App from './app/App';
import themeOptions from './app/theme';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StaticRouter } from 'react-router';

const theme = createTheme(themeOptions);

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={'/'}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StaticRouter>
    </React.StrictMode>
  );
  return { html };
}
