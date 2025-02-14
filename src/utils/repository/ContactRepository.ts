import { Contact } from '../../types/Contact';
import { User } from '../../types/User';
import {
  EntityFilterFn,
  EntitiesManager,
  StorageEntityRepository,
} from '../storage';

export interface IContactsRepository {
  getAll: (user: User) => Promise<Contact[]>;
  findByID: (user: User, id: string) => Promise<Contact | undefined>;
  search: (user: User, filter: EntityFilterFn<Contact>) => Promise<Contact[]>;
  save: (user: User, contact: Contact) => Promise<Contact>;
  delete: (user: User, id: string) => Promise<boolean>;
}

export const ContactsRepository = (
  storageRepository: StorageEntityRepository
): IContactsRepository => {
  const connect = async () => {
    await storageRepository.connect();
  };

  const userContacts = async (
    user: User,
    filterFn?: EntityFilterFn<Contact>
  ) => {
    return await storageRepository.searchEntity<Contact>(
      EntitiesManager.CONTACT_LIST,
      contact => {
        const filterByUser = contact.userId === user.id;
        return filterByUser && (!filterFn || filterFn(contact));
      }
    );
  };

  return {
    getAll: async (user: User) => {
      await connect();
      return await userContacts(user);
    },

    findByID: async (user: User, id: string) => {
      await connect();
      const findId = (contact: Partial<Contact>) => contact.id === id;
      const contacts = await userContacts(user, findId);

      return contacts && contacts.length > 0 ? contacts[0] : undefined;
    },

    search: async (user: User, filter: EntityFilterFn<Contact>) => {
      await connect();
      const contacts = await userContacts(user, filter);

      return contacts || [];
    },

    save: async (user: User, contact: Contact) => {
      await connect();

      const uniqueFn = (existingContact: Partial<Contact>) => {
        const sameCpf = existingContact.cpf === contact.cpf;
        const sameId = existingContact.id === contact.id;
        return sameCpf || sameId;
      };

      const existingContact = await userContacts(user, uniqueFn);
      if (existingContact.length) {
        throw new Error('CONTACT_ALREADY_EXISTS');
      }

      const stored = await storageRepository.appendEntity(
        EntitiesManager.CONTACT_LIST,
        contact
      );

      if (!stored) {
        throw new Error('CONTACT_NOT_SAVED');
      }

      return contact;
    },
    delete: async (user: User, id: string) => {
      const findId = (contact: Partial<Contact>) => contact.id === id;
      const existingContact = await userContacts(user, findId);
      if (!existingContact.length) {
        throw new Error('CONTACT_NOT_EXISTS');
      }

      const removed = await storageRepository.popEntity(
        EntitiesManager.CONTACT_LIST,
        findId
      );

      if (!removed) {
        throw new Error('CONTACT_NOT_REMOVED');
      }

      return true;
    },
  };
};
