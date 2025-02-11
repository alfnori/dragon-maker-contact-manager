import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Grid2,
  TextField,
  Typography,
  Container,
  Divider,
} from '@mui/material';
import { ContactForm } from './ContactForm';
import { ContactService } from '../../services/contactService';
import { useAuth } from '../../contexts/useAuth';
import { Contact } from '../../types/Contact';
import MiniDrawer from '../../layouts/ContactsLayout';

export const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState('');
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
    <Container sx={{ width: '75vw', minHeight: '100vh' }}>
      <MiniDrawer />
      <Grid2>
        <Typography variant="h4" sx={{ my: 2 }}>
          Contacts
        </Typography>
        <TextField
          fullWidth
          label="Search Contacts"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
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
    </Container>
  );
};
