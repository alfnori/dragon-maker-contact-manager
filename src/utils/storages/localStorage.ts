import {
  EntitiesManager,
  EntityFilterFn,
  StorageEntityRepository,
} from '../storage';

const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return undefined;
  }
};

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const initiateStorage = () => {
  const appInitialized = localStorage.getItem(EntitiesManager.APP);

  if (appInitialized) return;

  localStorage.setItem(EntitiesManager.APP, new Date().toISOString());
  localStorage.setItem(EntitiesManager.CURRENT_USER, '{}');
  localStorage.setItem(EntitiesManager.CURRENT_CONTACT, '{}');
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
