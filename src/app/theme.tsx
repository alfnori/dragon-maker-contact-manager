import { ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2ec7d6',
    },
    secondary: {
      main: '#db404b',
    },
  },
  typography: {
    h1: {
      color: 'Primary.main',
      alignSelf: 'center',
      fontWeight: 'bold',
    },
  },
  spacing: 8,
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1266,
      xl: 1440,
    },
    unit: 'px',
  },
  direction: 'ltr',
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          background: 'linear-gradient(45deg, #2ec7d6 30%, #db404b 90%)',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundAttachment: 'fixed',
        },
        body: {
          background: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'inline-grid',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          backgroundColor: 'Background',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          maxWidth: '100vw',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        anchorLeft: {
          background: 'none',
        },
      },
    },
  },
};

export default themeOptions;
