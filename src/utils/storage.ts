import { localStorageProvider } from './storages/localStorage';

export enum StorageType {
  LOCAL_STORAGE = 'localStorage',
  SHARED_PREFERENCES = 'SharedPreferences',
  SQLITE = 'Sqlite',
}

export enum EntitiesManager {
  APP = 'dragon-maker-app',
  USER_LIST = 'dragon-maker-user-list',
  CONTACT_LIST = `dragon-maker-contact-list`,
  CURRENT_USER = 'dragon-maker-user',
  CURRENT_CONTACT = 'dragon-maker-contact',
}

export type EntityFilterFn<T> = (terms: Partial<T>) => boolean;

export interface StorageEntityRepository {
  connect: () => Promise<void>;
  storeEntity: <T>(key: EntitiesManager, value: T) => Promise<boolean>;
  appendEntity: <T>(key: EntitiesManager, value: T) => Promise<boolean>;
  popEntity: <T>(
    key: EntitiesManager,
    match: EntityFilterFn<T>
  ) => Promise<boolean>;
  getEntity: <T>(key: EntitiesManager) => Promise<T | undefined>;
  searchEntity: <T>(
    key: EntitiesManager,
    filterFn?: EntityFilterFn<T>
  ) => Promise<T[]>;
  removeEntity: (key: EntitiesManager) => Promise<boolean>;
}

export const StorageRepository = (): StorageEntityRepository => {
  const appStorage = import.meta.env.VITE_APP_STORAGE_TYPE || '';

  switch (appStorage) {
    case StorageType.LOCAL_STORAGE:
      return localStorageProvider;
    // case StorageType.SHARED_PREFERENCES:
    // return sharedPreferencesProvider();
    // case StorageType.SQLITE:
    //   return sqliteProvider();
    default:
      throw new Error(
        'Invalid storage type specified in VITE_APP_STORAGE_TYPE'
      );
  }
};
