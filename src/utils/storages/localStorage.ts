import {
  EntitiesManager,
  EntityFilterFn,
  StorageEntityRepository,
} from '../storage';

import { v4 as uuid } from 'uuid';

export enum AppLocalStorageKeys {
  APP = 'dragon-maker-app',
  SESSION = 'dragon-maker-session',
}

export const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return undefined;
  }
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const initiateAppLocalStorage = () => {
  if (typeof window === 'undefined') return;

  const initialized =
    localStorage.getItem(AppLocalStorageKeys.APP) || undefined;

  if (initialized) return;

  localStorage.setItem(AppLocalStorageKeys.APP, new Date().toISOString());
  localStorage.setItem(AppLocalStorageKeys.SESSION, '');
};

export const initiateStorage = () => {
  const initialized =
    localStorage.getItem(EntitiesManager.STORAGE) || undefined;

  if (initialized) return;

  localStorage.setItem(EntitiesManager.STORAGE, uuid());
  localStorage.setItem(EntitiesManager.USER, '{}');
  localStorage.setItem(EntitiesManager.CONTACT, '{}');
  localStorage.setItem(EntitiesManager.CONTACT_LIST, '[]');
  localStorage.setItem(EntitiesManager.USER_LIST, '[]');
};

export const localStorageProvider: StorageEntityRepository = {
  connect: function (): Promise<void> {
    initiateStorage();
    return Promise.resolve();
  },

  storeEntity: function <T>(key: EntitiesManager, value: T): Promise<boolean> {
    saveToLocalStorage(key, value);
    return Promise.resolve(true);
  },

  appendEntity: function <T>(key: EntitiesManager, value: T): Promise<boolean> {
    let entities: T | T[];

    const item = getFromLocalStorage(key) || undefined;

    if (!item) Promise.resolve(false);

    if (Array.isArray(item)) {
      entities = [...item, value];
    } else {
      entities = item;
    }

    saveToLocalStorage(key, entities);

    return Promise.resolve(true);
  },

  popEntity: function <T>(
    key: EntitiesManager,
    filterFn: EntityFilterFn<T>
  ): Promise<boolean> {
    const item = getFromLocalStorage(key) || undefined;

    if (!item) return Promise.resolve(false);

    if (Array.isArray(item)) {
      const filtered = item.filter(it => !filterFn(it));
      saveToLocalStorage(key, filtered);
    } else {
      removeFromLocalStorage(key);
    }

    return Promise.resolve(true);
  },

  getEntity: function <T>(key: EntitiesManager): Promise<T | undefined> {
    const item = (getFromLocalStorage(key) as T) || undefined;
    return Promise.resolve(item);
  },

  searchEntity: async function <T>(
    key: EntitiesManager,
    filterFn?: EntityFilterFn<T>
  ): Promise<T[]> {
    let searched: T[] = [];

    const item = (getFromLocalStorage(key) as T) || undefined;

    if (item && filterFn) {
      if (Array.isArray(item)) {
        searched = item.filter(filterFn);
      } else {
        searched = filterFn(item) ? [item] : [];
      }
    }

    return Promise.resolve(searched);
  },

  removeEntity: function (key: EntitiesManager): Promise<boolean> {
    removeFromLocalStorage(key);
    return Promise.resolve(true);
  },
};
