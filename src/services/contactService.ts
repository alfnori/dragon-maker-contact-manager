/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContacts } from '../contexts/contact/useContacts';
import { Contact } from '../types/Contact';

export const useContactService = () => {
  const context = useContacts();

  const addContact = async (
    _userId: string,
    _contact: Omit<Contact, 'id' | 'userId'>
  ): Promise<boolean> => {
    try {
      await context.addContact({
        ..._contact,
        userId: _userId,
      });
      return true;
    } catch (error) {
      console.error('Error adding contact:', error);
      return false;
    }
  };

  const getContacts = (_userId: string): Contact[] => {
    // const users = getEntity('users') || [];
    // const user = users.find((u: any) => u.id === userId);
    // return user ? user.contacts || [] : [];
    return [];
  };

  const updateContact = (
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
  };

  const deleteContact = (_userId: string, _contactId: string): boolean => {
    // const users = getEntity('users') || [];
    // const userIndex = users.findIndex((u: any) => u.id === userId);

    // if (userIndex === -1) return false;

    // users[userIndex].contacts = users[userIndex].contacts.filter(
    //   (c: Contact) => c.id !== contactId
    // );
    // storeEntity('users', users);
    return true;
  };

  return {
    addContact,
    getContacts,
    updateContact,
    deleteContact,
  };
};
