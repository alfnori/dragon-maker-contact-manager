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
import { useAuth } from '../contexts/useAuth';

import {
  Container,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { DeleteMenuItem } from './components/DeleteMenuItem';
import { AppBar, Drawer, DrawerHeader } from './components/DrawerAppBar';
import { LogoutMenuItem } from './components/LogoutMenuItem';
import { SearchBar } from './components/SearchBar';

export default function ContactLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user } = useAuth();
  const handleSearchToggle = (searchOpen: boolean) => {
    console.log('searchOpen', searchOpen);
    if (searchOpen) {
      handleDrawerClose();
    }
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
                    searchOpen && {
                      visibility: 'hidden',
                    },
                  ],
                },
              ]}
            >
              Dragon Maker Contact Manager
            </Typography>
          </Box>
          <SearchBar onSearchToggle={handleSearchToggle} />
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
          <ListItem key={'Contact List'} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Contact List'} />
            </ListItemButton>
          </ListItem>
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
            return {
              width: '75vw',
              minHeight: `calc(100vh - ${+theme.mixins.toolbar.minHeight! * 2}px)`,
            };
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
