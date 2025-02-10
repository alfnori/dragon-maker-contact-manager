import {
  Box,
  Container,
  Fade,
  Grid2,
  Link,
  Paper,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import React from 'react';
import Logo from '../Common/Logo';

import SmartToyIcon from '@mui/icons-material/SmartToy';
import ForwardIcon from '@mui/icons-material/Forward';

export const Error: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <Box
        sx={{
          m: 4,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Fade in={true} timeout={1000}>
          <Grid2
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              ml: 2,
            }}
          >
            <Logo link="/" />
            <Link
              variant="h1"
              component="a"
              underline="hover"
              align="center"
              alignSelf="end"
              gutterBottom
              href="/"
              sx={{
                mb: 0,
                fontSize: { xs: '2rem', sm: '2.5rem' },
                textAlign: { xs: 'center', sm: 'left' },
                alignSelf: 'center',
              }}
            >
              Sorry, even dragons make mistakes!
            </Link>
          </Grid2>
        </Fade>

        <Paper
          elevation={3}
          sx={{
            display: 'inline-grid',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 4,
            mt: 4,
            mb: 4,
            borderRadius: 2,
            ':hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
              cursor: 'pointer',
            },
          }}
        >
          <Grid2 container spacing={2}>
            <Grid2
              display={'flex'}
              justifyContent={'center'}
              justifyItems={'center'}
              alignItems={'center'}
              size={12}
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <SmartToyIcon
                color="error"
                sx={{ mr: { xs: 0, sm: 2 } }}
                fontSize="large"
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ textAlign: 'center' }}
              >
                Hi, we surfer an critical error and we are working on it. Please
                try again later.
              </Typography>
            </Grid2>

            <Grid2
              display={'flex'}
              justifyContent={'center'}
              justifyItems={'center'}
              alignItems={'center'}
              size={12}
              gap={2}
              sx={{
                flexDirection: 'column',
              }}
            >
              <ForwardIcon
                fontSize="large"
                sx={{ width: '100%', mx: 1, rotate: '90deg', justifySelf: '' }}
              />
              <Button
                variant="contained"
                href="/contacts"
                size="large"
                sx={{
                  color: theme.palette.secondary.contrastText,
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  alignContent: 'center',
                  textAlign: 'center',
                }}
              >
                Restart the Quest
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
    </Container>
  );
};

export default Error;
