/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContacts } from '../contexts/contact/useContacts';
import { Contact } from '../types/Contact';

export const useContactService = () => {
  const context = useContacts();

  const addContact = async (
    userId: string,
    contact: Omit<Contact, 'id' | 'userId'>
  ): Promise<boolean> => {
    try {
      await context.addContact({
        ...contact,
        userId: userId,
      });
      return true;
    } catch (error) {
      console.error('Error adding contact:', error);
      return false;
    }
  };

  const getContacts = async (userId: string): Promise<Contact[]> => {
    try {
      return await context.listContact(
        (contact: Partial<Contact>) => contact.userId === userId
      );
    } catch (error) {
      console.error('Error fetch contacts:', error);
      return [];
    }
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

  const deleteContact = async (contactId: string): Promise<boolean> => {
    try {
      return await context.deleteContact(contactId);
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  };

  return {
    addContact,
    getContacts,
    updateContact,
    deleteContact,
  };
};
