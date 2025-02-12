import LogoutIcon from '@mui/icons-material/Logout';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/useAuth';

export const LogoutMenuItem = ({ parentOpen }: { parentOpen?: boolean }) => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <ListItem
      key={'logout-menu'}
      disablePadding
      title="Logout"
      sx={{ display: 'block' }}
    >
      <ListItemButton
        onClick={handleToggle}
        sx={[
          {
            minHeight: 48,
          },
          parentOpen
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <Dialog
          open={open}
          onClose={handleToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Leaving already?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to leave? If it was a mistake click on go
              back, otherwise, like on logout.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleToggle}>
              Go back!
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                await logout();
                handleToggle();
                navigate('/');
              }}
              autoFocus
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
            },
            parentOpen
              ? {
                  mr: 3,
                }
              : {
                  mr: 'auto',
                },
          ]}
        >
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText
          primary={'Logout'}
          sx={[
            {
              fontWeight: 'bold',
            },
            parentOpen
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  );
};
