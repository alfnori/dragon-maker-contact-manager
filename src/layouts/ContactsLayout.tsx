import AllInboxIcon from '@mui/icons-material/AllInbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../components/Common/Logo';
import { useAuth } from '../contexts/auth/useAuth';

import ContactsIcon from '@mui/icons-material/Contacts';

import { Container } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { DeleteMenuItem } from './components/DeleteMenuItem';
import { AppBar, Drawer, DrawerHeader } from './components/DrawerAppBar';
import { ListMenuItem } from './components/ListMenuItem';
import { LogoutMenuItem } from './components/LogoutMenuItem';
import { SearchBar } from './components/SearchBar';

export default function ContactLayout() {
  const theme = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleDrawerOpen = () => {
    setSearchOpen(false);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    if (searchOpen) setSearchOpen(false);
    setOpen(false);
  };

  const handleSearchToggle = (searchOpen: boolean) => {
    if (searchOpen) handleDrawerClose();
    setSearchOpen(searchOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: { xs: 1, sm: 2 },
                },
                open && { display: 'none' },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={[
                {
                  fontSize: { xs: '1rem', sm: '1.5rem' },
                  [theme.breakpoints.down('sm')]: [
                    (searchOpen || open) && {
                      visibility: 'hidden',
                    },
                  ],
                },
              ]}
            >
              Dragon Maker Contact Manager
            </Typography>
          </Box>
          <SearchBar onSearchToggle={handleSearchToggle} parentOpen={open} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Logo size={'sm'} />
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              ':hover': {
                overflow: 'visible',
                whiteSpace: 'normal',
              },
            }}
          >
            Welcome {user?.name}!
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListMenuItem
            parentOpen={open}
            onClick={() => navigate('/contacts/add')}
            title={'Add Contact'}
            MenuIcon={<ContactsIcon />}
          />
        </List>
        <Divider />
        <List>
          <ListMenuItem
            parentOpen={open}
            onClick={() => navigate('/contacts')}
            title={'List all Contacts'}
            MenuIcon={<AllInboxIcon />}
          />
        </List>
        <Divider />
        <List>
          <DeleteMenuItem parentOpen={open} />
          <LogoutMenuItem parentOpen={open} />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, py: 3, minHeight: '100vh' }}>
        <Toolbar />
        <Container
          sx={theme => {
            const openProps = open
              ? {
                  [theme.breakpoints.down('sm')]: [
                    {
                      width: '50vw',
                    },
                  ],
                  [theme.breakpoints.down('xs')]: [
                    {
                      display: 'none',
                    },
                  ],
                }
              : {
                  [theme.breakpoints.down('xs')]: [
                    {
                      width: '100vw',
                    },
                  ],
                };
            return {
              width: '75vw',
              display: 'inline-flex',
              minHeight: `calc(100vh - ${+theme.mixins.toolbar.minHeight! * 2}px)`,
              ...openProps,
            };
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
