import React, { ReactNode, use, useState } from 'react';
import { User } from '../../types/User';

import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { useInjection } from '../injection/useInjection';
import { AuthContext } from './useAuth';
import {
  AppLocalStorageKeys,
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/storages/localStorage';

export interface AuthContextType {
  user: User | null;
  sessionUser: () => User | undefined;
  checkUser: () => Promise<User | undefined>;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  deleteAccount: (password: string) => Promise<boolean>;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { usersRepository } = useInjection();

  const sessionUser = () => {
    const sessionUser = getFromLocalStorage(AppLocalStorageKeys.SESSION);
    if (!sessionUser) return undefined;

    return sessionUser as User;
  };

  async function fetchCurrentUser() {
    const currentUser = await usersRepository.currentUser();
    return currentUser || null;
  }

  let currentUser = null;

  if (import.meta.env.SSR) {
    currentUser = use(fetchCurrentUser());
  }

  const [user, setUser] = useState<User | null>(sessionUser() || currentUser);

  const checkUser = async (): Promise<User | undefined> => {
    const currentUser = await fetchCurrentUser();

    if ((currentUser && !user) || user?.id !== currentUser?.id) {
      setUser(currentUser);
    }

    return currentUser || undefined;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = await usersRepository.search(
      (u: Partial<User>) => u.email === email
    );

    if (!users || users.length === 0) return false;

    const foundUser = users[0];

    if (!bcrypt.compareSync(password, foundUser.hash!)) {
      return false;
    }

    setUser(foundUser);
    saveToLocalStorage(AppLocalStorageKeys.SESSION, foundUser);
    return await usersRepository.setCurrentUser(foundUser);
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const existingUser = await usersRepository.search(
      (u: Partial<User>) => u.email === email
    );

    if (existingUser?.length) return false;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser: User = {
      id: uuid(),
      name,
      email,
      hash,
      password: undefined,
      contacts: [],
    };

    const saved = await usersRepository.save(newUser);

    return !!saved.id;
  };

  const logout = async () => {
    setUser(null);
    removeFromLocalStorage(AppLocalStorageKeys.SESSION);
    return await usersRepository.setCurrentUser(undefined);
  };

  const deleteAccount = async (password: string): Promise<boolean> => {
    const currentUser = await usersRepository.currentUser();

    if (currentUser) {
      if (!bcrypt.compareSync(password, currentUser.hash!)) {
        return false;
      }

      const deleted = await usersRepository.delete(currentUser.id!);
      if (!deleted) return false;

      logout();
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionUser,
        checkUser,
        login,
        signUp,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
