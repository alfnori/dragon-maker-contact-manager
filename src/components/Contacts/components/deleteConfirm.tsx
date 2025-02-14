import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Contact } from '../../../types/Contact';

export interface DeleteConfirmDialog {
  contact?: Contact;
  open: boolean;
  handleClose: (confirm: boolean) => void;
}

export const DeleteContactConfirm = ({
  open,
  contact,
  handleClose,
}: DeleteConfirmDialog) => {
  if (!contact) return <></>;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-alert-dialog-title"
      aria-describedby="delete-alert-dialog-description"
    >
      <DialogTitle id="delete-alert-dialog-title">
        Delete an contact?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-alert-dialog-description">
          Deleting a contact is a no way out! Are you sure you want to delete{' '}
          {contact.name} from your list?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleClose(false)}>
          Disagree
        </Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
