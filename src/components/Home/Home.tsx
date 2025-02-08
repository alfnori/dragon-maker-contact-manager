import CodeIcon from '@mui/icons-material/Code';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StorageIcon from '@mui/icons-material/Storage';
import {
  Box,
  Card,
  CardContent,
  Container,
  Fade,
  Grid2 as Grid,
  Grid2,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import Logo from '../Common/Logo';

export const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        maxHeight: '100vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <Box sx={{ m: 4, mb: 8 }}>
        <Fade in={true} timeout={1000}>
          <Grid2
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid2
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Logo size={120} />
            </Grid2>
            <Grid2
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ml: 2,
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                align="center"
                alignSelf="end"
                gutterBottom
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  mb: 0,
                  fontSize: { xs: '2rem', sm: '3rem' },
                }}
              >
                The Tale of the Dragon Maker
              </Typography>
            </Grid2>
          </Grid2>
        </Fade>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            mb: 4,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" paragraph>
            Once upon a time, in the bustling realm of software development,
            there lived an aspiring developer who dreamed of joining the
            legendary clan known as the Dragon Makers at UEX Technology.
          </Typography>

          <Typography variant="body1" paragraph>
            One day, a magical scroll appeared in their inbox - a technical test
            that would determine if they were worthy of joining this prestigious
            group.
          </Typography>
        </Paper>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonAddIcon
                    sx={{ mr: 2, color: theme.palette.primary.main }}
                  />
                  <Typography variant="h6">The Sacred Gateway</Typography>
                </Box>
                <Typography variant="body2">
                  Users would need to create their own magical portal, securing
                  their presence in the realm with a special login enchantment.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StorageIcon
                    sx={{ mr: 2, color: theme.palette.secondary.main }}
                  />
                  <Typography variant="h6">The Mystical Scroll</Typography>
                </Box>
                <Typography variant="body2">
                  A magical scroll that could store information about contacts,
                  complete with their secret identification numbers (known as
                  CPF in the mystic tongue).
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon sx={{ mr: 2, color: theme.palette.error.main }} />
                  <Typography variant="h6">The Ancient Via Cep</Typography>
                </Box>
                <Typography variant="body2">
                  Ancient magic that could instantly reveal the location of any
                  address in the kingdom just by uttering its postal code.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MapIcon sx={{ mr: 2, color: theme.palette.success.main }} />
                  <Typography variant="h6">The Google Maps Oracle</Typography>
                </Box>
                <Typography variant="body2">
                  A mystical map that would show the exact location of each
                  contact with a magical pin.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom color="primary">
            The Developer's Tools
          </Typography>

          <Typography variant="body1" paragraph>
            Armed with the mighty React.js sword, protected by the Material
            Design V3 shield, guided by the LocalStorage spell book, and
            equipped with various magical npm scrolls, our hero began their
            quest.
          </Typography>

          <Typography variant="body1" paragraph>
            The wise words from the scroll echoed: "Even if you face
            difficulties, do not let despair overcome you. Your effort in trying
            to complete the quest will be valued greatly by the Dragon Makers."
          </Typography>

          <Typography
            variant="body1"
            sx={{ fontStyle: 'italic', mt: 4, textAlign: 'center' }}
          >
            (To be continued... after npm install finishes running)
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
