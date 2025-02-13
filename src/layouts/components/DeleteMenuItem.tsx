import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/auth/useAuth';
import { ListMenuItem } from './ListMenuItem';

export const DeleteMenuItem = ({ parentOpen }: { parentOpen: boolean }) => {
  const { deleteAccount } = useAuth();

  const navigate = useNavigate();

  const [passwordToast, setPasswordToast] = useState('');
  const [open, setOpen] = useState(false);

  const handleToggle = (force = false) => {
    if ((open && force) || !open) setOpen(!open);
    setPasswordToast('');
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const password = `${formJson.password}`;

    if (password) {
      handleToggle();
      const deleted = await deleteAccount(password);
      if (deleted) {
        navigate('/');
      } else {
        setPasswordToast(
          'Error deleting account. Verify it the password is correct!'
        );
      }
    }
  };

  return (
    <ListMenuItem
      parentOpen={parentOpen}
      title={'Delete account'}
      onClick={handleToggle}
      MenuIcon={<PersonRemoveIcon />}
    >
      <>
        <Snackbar open={!!passwordToast} autoHideDuration={5000}>
          <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
            {passwordToast}
          </Alert>
        </Snackbar>
        <Dialog
          open={open}
          onClose={(_event, reason) => {
            if (reason !== 'backdropClick') {
              handleToggle();
            }
          }}
          aria-labelledby="alert-delete-dialog-title"
          aria-describedby="alert-delete-dialog-description"
          slotProps={{
            paper: {
              component: 'form',
              onSubmit,
            },
          }}
        >
          <DialogTitle id="alert-delete-dialog-title">
            {'Delete account?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-dialog-description">
              Are you sure you want to delete this account? Deleting the account
              not only will remove your access, but you will lose all of ours
              contacts. To proceed, insert your password and click on delete
              button.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Confirm your password"
              type="password"
              fullWidth
              error={!!passwordToast}
              helperText={passwordToast ? 'Invalid password!' : ''}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleToggle(true);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" type="submit" autoFocus>
              Delete account
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </ListMenuItem>
  );
};
