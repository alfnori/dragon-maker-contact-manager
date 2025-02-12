import {
  Button,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth/useAuth';
import { ContactService } from '../../services/contactService';
import { Contact } from '../../types/Contact';
import { ContactMap } from '../Maps/ContactMap';
import { ContactForm } from './ContactForm';

export const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTerm, _setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const userContacts = ContactService.getContacts(user.id!);
      setContacts(userContacts);
      setFilteredContacts(userContacts);
    }
  }, [user]);

  useEffect(() => {
    const filtered = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.cpf.includes(searchTerm)
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleDelete = (contactId: string) => {
    if (user) {
      ContactService.deleteContact(user.id!, contactId);
      setContacts(prev => prev.filter(c => c.id !== contactId));
    }
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setOpenForm(true);
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2>
        <Typography sx={{ marginBottom: 2 }}>Google Maps Here!</Typography>
        <ContactMap contacts={user?.contacts || []} />
      </Grid2>
      <Grid2>
        <Typography variant="h4" sx={{ my: 2 }}>
          Contacts
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
          sx={{ mb: 2, mr: 2 }}
        >
          Add Contact
        </Button>
        <Divider />
        <List>
          {filteredContacts.map(contact => (
            <ListItem key={contact.id}>
              <ListItemText
                primary={contact.name}
                secondary={`CPF: ${contact.cpf} | Phone: ${contact.phone}`}
              />
              <Button onClick={() => handleEdit(contact)}>Edit</Button>
              <Button color="error" onClick={() => handleDelete(contact.id)}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
        {openForm && (
          <ContactForm
            open={openForm}
            onClose={() => {
              setOpenForm(false);
              setSelectedContact(undefined);
              const userContacts = ContactService.getContacts(user!.id!);
              setContacts(userContacts);
            }}
            initialContact={selectedContact}
          />
        )}
      </Grid2>
    </Grid2>
  );
};
