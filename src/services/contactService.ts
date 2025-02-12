/* eslint-disable @typescript-eslint/no-unused-vars */

import { Contact } from '../types/Contact';

export const ContactService = {
  addContact: (_userId: string, _contact: Contact): boolean => {
    // if (!validateCPF(contact.cpf)) return false;

    // const users = getEntity('users') || [];
    // const userIndex = users.findIndex((u: any) => u.id === userId);

    // if (userIndex === -1) return false;

    // const existingCPF = users[userIndex].contacts?.some(
    //   (c: Contact) => c.cpf === contact.cpf
    // );
    // if (existingCPF) return false;

    // if (!users[userIndex].contacts) users[userIndex].contacts = [];
    // users[userIndex].contacts.push({ ...contact, id: Date.now().toString() });

    // storeEntity('users', users);
    return true;
  },

  getContacts: (_userId: string): Contact[] => {
    // const users = getEntity('users') || [];
    // const user = users.find((u: any) => u.id === userId);
    // return user ? user.contacts || [] : [];
    return [];
  },

  updateContact: (
    _userId: string,
    _contactId: string,
    _updatedContact: Contact
  ): boolean => {
    // const users = getEntity('users') || [];
    // const userIndex = users.findIndex((u: any) => u.id === userId);

    // if (userIndex === -1) return false;

    // const contactIndex = users[userIndex].contacts.findIndex(
    //   (c: Contact) => c.id === contactId
    // );
    // if (contactIndex === -1) return false;

    // users[userIndex].contacts[contactIndex] = {
    //   ...updatedContact,
    //   id: contactId,
    // };
    // storeEntity('users', users);
    return true;
  },

  deleteContact: (_userId: string, _contactId: string): boolean => {
    // const users = getEntity('users') || [];
    // const userIndex = users.findIndex((u: any) => u.id === userId);

    // if (userIndex === -1) return false;

    // users[userIndex].contacts = users[userIndex].contacts.filter(
    //   (c: Contact) => c.id !== contactId
    // );
    // storeEntity('users', users);
    return true;
  },
};
