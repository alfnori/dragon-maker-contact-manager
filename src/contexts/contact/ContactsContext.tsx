import React, { ReactNode } from 'react';

import { Contact } from '../../types/Contact';
import { EntityFilterFn } from '../../utils/storage';
import { useAuth } from '../auth/useAuth';
import { useInjection } from '../injection/useInjection';
import { ContactsContext } from './useContacts';

export interface ContactsContextType {
  listContact: (contact?: EntityFilterFn<Contact>) => Promise<Contact[]>;
  getContact: (id: string) => Promise<Contact | undefined>;
  addContact: (contact: Omit<Contact, 'id'>) => Promise<Contact>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<boolean>;
  deleteContact: (id: string) => Promise<boolean>;
}

export const ContactsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { user: currentUser, checkUser } = useAuth();
  const { contactsRepository } = useInjection();

  const getUser = async () => {
    if (currentUser) return currentUser;

    const user = await checkUser();

    return user!;
  };

  const listContact = async (
    contact?: EntityFilterFn<Contact>
  ): Promise<Contact[]> => {
    const user = await getUser();

    if (!contact) return await contactsRepository.getAll(user);

    return await contactsRepository.search(user, contact);
  };

  const getContact = async (id: string): Promise<Contact | undefined> => {
    const user = await getUser();
    return await contactsRepository.findByID(user, id);
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    const user = await getUser();
    return await contactsRepository.save(user, {
      ...contact,
      id: crypto.randomUUID(),
    });
  };

  const updateContact = async (id: string, contact: Partial<Contact>) => {
    const user = await getUser();
    const contactStored = await contactsRepository.findByID(user, id);

    if (!contactStored) return false;

    const updatedContact: Contact = {
      ...contactStored,
      ...contact,
    };

    await contactsRepository.save(user, updatedContact);

    return true;
  };

  const deleteContact = async (id: string) => {
    const user = await getUser();
    const contactStored = await contactsRepository.findByID(user, id);

    if (!contactStored) return false;

    return await contactsRepository.delete(user, contactStored.id);
  };

  return (
    <ContactsContext.Provider
      value={{
        listContact,
        getContact,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
