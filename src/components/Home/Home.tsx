import CodeIcon from '@mui/icons-material/Code';
import ForwardIcon from '@mui/icons-material/Forward';
import MapIcon from '@mui/icons-material/Map';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StorageIcon from '@mui/icons-material/Storage';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Fade,
  Grid2 as Grid,
  Grid2,
  Link,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import Logo from '../Common/Logo';

export const Home: React.FC = () => {
  const theme = useTheme();

  const MyPaper = (props: { children: React.ReactNode }) => (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
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
      {props.children}
    </Paper>
  );

  const MyCard = (props: { children: React.ReactNode }) => (
    <Card
      sx={{
        height: '100%',
        ':hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.3s ease-in-out',
          cursor: 'pointer',
        },
      }}
    >
      {props.children}
    </Card>
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'inline-grid',
        maxHeight: '100vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <Box sx={{ m: 4, mb: 4, display: 'flex', flexDirection: 'column' }}>
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
                alignContent: 'center',
                justifyContent: 'center',
                ml: 2,
              }}
            >
              <Logo size={120} link="/contacts" />
              <Link
                variant="h2"
                component="a"
                underline="hover"
                align="center"
                alignSelf="end"
                gutterBottom
                href="/contacts"
                sx={{
                  color: theme.palette.primary.main,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  mb: 0,
                  fontSize: { xs: '2rem', sm: '3rem' },
                }}
              >
                The Tale of the Dragon Maker
              </Link>
            </Grid2>
          </Grid2>
        </Fade>

        <MyPaper>
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
        </MyPaper>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <MyCard>
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
            </MyCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MyCard>
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
            </MyCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MyCard>
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
            </MyCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <MyCard>
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
            </MyCard>
          </Grid>
        </Grid>

        <MyPaper>
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

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontStyle: 'italic', textAlign: 'center' }}
            >
              Are you ready?
            </Typography>

            <ForwardIcon fontSize="large" sx={{ mx: 1 }} />

            <Button
              variant="contained"
              href="/contacts"
              size="large"
              sx={{
                color: theme.palette.secondary.contrastText,
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Start the Quest
            </Button>
          </Box>
        </MyPaper>
      </Box>
    </Container>
  );
};

export default Home;
