import React, { ReactNode } from 'react';

import {
  ContactsRepository,
  IContactsRepository,
  IUsersRepository,
  UsersRepository,
} from '../../utils/repository';
import {
  StorageEntityRepository,
  StorageRepository,
} from '../../utils/storage';
import { InjectionContext } from './useInjection';

export interface InjectionContextType {
  storageRepository: StorageEntityRepository;
  contactsRepository: IContactsRepository;
  usersRepository: IUsersRepository;
}

export const InjectionProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const storageRepository = StorageRepository();

  const contactsRepository = ContactsRepository(storageRepository);
  const usersRepository = UsersRepository(storageRepository);

  return (
    <InjectionContext.Provider
      value={{
        storageRepository,
        contactsRepository,
        usersRepository,
      }}
    >
      {children}
    </InjectionContext.Provider>
  );
};
