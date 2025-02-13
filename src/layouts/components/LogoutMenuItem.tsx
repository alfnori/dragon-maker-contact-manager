import LogoutIcon from '@mui/icons-material/Logout';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/useAuth';
import { ListMenuItem } from './ListMenuItem';

export const LogoutMenuItem = ({ parentOpen }: { parentOpen: boolean }) => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <ListMenuItem
      parentOpen={parentOpen}
      title="Logout"
      MenuIcon={<LogoutIcon />}
      onClick={handleToggle}
    >
      <Dialog
        open={open}
        onClose={handleToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Leaving already?'}</DialogTitle>
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
    </ListMenuItem>
  );
};
