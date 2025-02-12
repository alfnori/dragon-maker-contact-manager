import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useTheme } from '@mui/material/styles';

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

export const ListMenuItem = ({ parentOpen }: { parentOpen?: boolean }) => {
  const { logout } = useAuth();
  const theme = useTheme();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <ListItem
      key={'logout-menu'}
      disablePadding
      title="Delete account"
      sx={{ display: 'block' }}
    >
      <ListItemButton
        onClick={handleToggle}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
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
          <DialogTitle id="alert-dialog-title">{'Delete account?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this account? Deleting the account
              not only will remove your access, but you will lose all of ours
              contacts. Do you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleToggle}>
              Cancel
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
              Delete account
            </Button>
          </DialogActions>
        </Dialog>
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
              color: theme.palette.secondary.main,
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
          <PersonRemoveIcon />
        </ListItemIcon>
        <ListItemText
          primary={'Delete account'}
          sx={[
            {
              color: theme.palette.secondary.main,
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
