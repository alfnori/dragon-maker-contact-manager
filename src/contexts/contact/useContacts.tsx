import { createContext, useContext } from 'react';
import { ContactsContextType } from './ContactsContext';

export const ContactsContext = createContext<ContactsContextType | undefined>(
  undefined
);

export const useContacts = (): ContactsContextType => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useAuth must be used within an ContactsProvider');
  }
  return context;
};
