import { User } from '../../types/User';
import {
  EntitiesManager,
  EntityFilterFn,
  StorageEntityRepository,
} from '../storage';

export interface IUsersRepository {
  currentUser: () => Promise<User | undefined>;
  setCurrentUser: (user: User | undefined) => Promise<boolean>;
  getAll: () => Promise<User[]>;
  findByID: (id: string) => Promise<User | undefined>;
  search: (filter: EntityFilterFn<User>) => Promise<User[]>;
  save: (user: User) => Promise<User>;
  delete: (id: string) => Promise<boolean>;
}

export const UsersRepository = (
  storageRepository: StorageEntityRepository
): IUsersRepository => {
  const connect = async () => {
    await storageRepository.connect();
  };

  const userList = async (filterFn?: EntityFilterFn<User>) => {
    return await storageRepository.searchEntity<User>(
      EntitiesManager.USER_LIST,
      user => {
        return !filterFn || filterFn(user);
      }
    );
  };

  return {
    currentUser: async () => {
      await connect();
      return await storageRepository.getEntity<User>(
        EntitiesManager.CURRENT_USER
      );
    },

    setCurrentUser: async (user: User | undefined) => {
      await connect();
      if (!user) {
        return await storageRepository.removeEntity(
          EntitiesManager.CURRENT_USER
        );
      }

      return await storageRepository.storeEntity<User>(
        EntitiesManager.CURRENT_USER,
        user as User
      );
    },

    getAll: async () => {
      await connect();
      return await userList();
    },

    findByID: async (id: string) => {
      await connect();

      const findId = (user: Partial<User>) => user.id === id;
      const users = await userList(findId);

      return users && users.length > 0 ? users[0] : undefined;
    },

    search: async (filter: EntityFilterFn<User>) => {
      await connect();

      const users = await userList(filter);

      return users || [];
    },

    save: async (user: User) => {
      await connect();

      const uniqueFn = (existingUser: Partial<User>) => {
        const sameEmail = existingUser.email === user.email;
        const sameId = existingUser.id === user.id;
        return sameEmail || sameId;
      };

      const existingUser = await userList(uniqueFn);

      if (existingUser?.length) {
        throw new Error('USER_ALREADY_EXISTS');
      }

      const stored = await storageRepository.appendEntity(
        EntitiesManager.USER_LIST,
        user
      );

      if (!stored) {
        throw new Error('USER_NOT_SAVED');
      }

      return user;
    },

    delete: async (id: string) => {
      await connect();

      const findId = (user: Partial<User>) => user.id === id;
      const existingUser = await userList(findId);

      if (!existingUser?.length) {
        throw new Error('USER_NOT_EXISTS');
      }

      const removed = await storageRepository.popEntity(
        EntitiesManager.USER_LIST,
        findId
      );

      if (!removed) {
        throw new Error('USER_NOT_REMOVED');
      }

      return true;
    },
  };
};
