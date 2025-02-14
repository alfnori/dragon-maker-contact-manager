import React, { useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Contact } from '../../types/Contact';
import { ContactService } from '../../services/contactService';
import { useAuth } from '../../contexts/auth/useAuth';
import { getAddressByCEP } from '../../services/apiService';
import { validateCPF } from '../../utils/validation';

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  initialContact?: Contact;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  open,
  onClose,
  initialContact,
}) => {
  const [contact, setContact] = useState<Contact>(
    initialContact || {
      id: '',
      name: '',
      userId: '',
      cpf: '',
      phone: '',
      address: {
        cep: '',
        street: '',
        number: '',
        city: '',
        state: '',
        complement: '',
        latitude: 0,
        longitude: 0,
      },
    }
  );

  const { user } = useAuth();
  const [, setError] = useState('');

  const handleCEPLookup = async () => {
    const addressData = await getAddressByCEP(contact.address.cep);
    if (addressData) {
      setContact(prev => ({
        ...prev,
        address: {
          ...prev.address,
          street: addressData.logradouro,
          city: addressData.localidade,
          state: addressData.uf,
        },
      }));
    }
  };

  const handleSubmit = () => {
    if (user) {
      const success = initialContact
        ? ContactService.updateContact(user.id!, contact.id, contact)
        : ContactService.addContact(user.id!, contact);

      if (success) {
        onClose();
      } else {
        setError('Failed to save contact');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialContact ? 'Edit Contact' : 'New Contact'}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={contact.name}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <TextField
          margin="dense"
          label="CPF"
          fullWidth
          value={contact.cpf}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              cpf: e.target.value,
            }))
          }
        />
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          value={contact.phone}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />
        <TextField
          margin="dense"
          label="CEP"
          fullWidth
          value={contact.address.cep}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              address: { ...prev.address, cep: e.target.value },
            }))
          }
          onBlur={handleCEPLookup}
        />
        <TextField
          margin="dense"
          label="Street"
          fullWidth
          value={contact.address.street}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value },
            }))
          }
        />
        <TextField
          margin="dense"
          label="Number"
          fullWidth
          value={contact.address.number}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              address: { ...prev.address, number: e.target.value },
            }))
          }
        />
        <TextField
          margin="dense"
          label="City"
          fullWidth
          value={contact.address.city}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value },
            }))
          }
        />
        <TextField
          margin="dense"
          label="State"
          fullWidth
          value={contact.address.state}
          onChange={e =>
            setContact(prev => ({
              ...prev,
              address: { ...prev.address, state: e.target.value },
            }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
