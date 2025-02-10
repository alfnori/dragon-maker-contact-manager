import { Box, Card, Container, Grid2, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Common/Logo';

export const AuthenticateLayout: React.FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Grid2
        size={{ xs: 10, sm: 8, md: 6 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            marginTop: 8,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: '600px',
            maxWidth: '600px',
          }}
          variant="outlined"
        >
          <Logo />
          <Typography variant="h5" component="h1" gutterBottom>
            Contact Manager
          </Typography>
          <Typography variant="body2" gutterBottom>
            An easy-to-use contact manager made by cute dragons!
          </Typography>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Outlet />
          </Box>
        </Card>
      </Grid2>
    </Container>
  );
};
