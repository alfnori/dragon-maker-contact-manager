/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contact } from '../types/Contact';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';
import { validateCPF } from '../utils/validation';

export const ContactService = {
  addContact: (userId: string, contact: Contact): boolean => {
    if (!validateCPF(contact.cpf)) return false;

    const users = getFromLocalStorage('users') || [];
    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) return false;

    const existingCPF = users[userIndex].contacts?.some(
      (c: Contact) => c.cpf === contact.cpf
    );
    if (existingCPF) return false;

    if (!users[userIndex].contacts) users[userIndex].contacts = [];
    users[userIndex].contacts.push({ ...contact, id: Date.now().toString() });

    saveToLocalStorage('users', users);
    return true;
  },

  getContacts: (userId: string): Contact[] => {
    const users = getFromLocalStorage('users') || [];
    const user = users.find((u: any) => u.id === userId);
    return user ? user.contacts || [] : [];
  },

  updateContact: (
    userId: string,
    contactId: string,
    updatedContact: Contact
  ): boolean => {
    const users = getFromLocalStorage('users') || [];
    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) return false;

    const contactIndex = users[userIndex].contacts.findIndex(
      (c: Contact) => c.id === contactId
    );
    if (contactIndex === -1) return false;

    users[userIndex].contacts[contactIndex] = {
      ...updatedContact,
      id: contactId,
    };
    saveToLocalStorage('users', users);
    return true;
  },

  deleteContact: (userId: string, contactId: string): boolean => {
    const users = getFromLocalStorage('users') || [];
    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) return false;

    users[userIndex].contacts = users[userIndex].contacts.filter(
      (c: Contact) => c.id !== contactId
    );
    saveToLocalStorage('users', users);
    return true;
  },
};
