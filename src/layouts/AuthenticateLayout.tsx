import { Card, Container, Grid2, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Common/Logo';

export const AuthenticateLayout: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'none',
      }}
    >
      <Card
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '90vw',
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
        <Grid2
          container
          spacing={2}
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
        </Grid2>
      </Card>
    </Container>
  );
};
