import React, { ReactNode, useState } from 'react';
import { User } from '../types/User';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage';

import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { AuthContext } from './useAuth';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  deleteAccount: (password: string) => boolean;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(getFromLocalStorage('user'));

  const login = (email: string, password: string): boolean => {
    const users = (getFromLocalStorage('users') as User[]) || [];
    const foundUser = users.find((u: User) => u.email === email);

    if (!foundUser) return false;

    if (!bcrypt.compareSync(password, foundUser.hash!)) {
      return false;
    }

    setUser(foundUser);
    saveToLocalStorage('user', foundUser);
    return true;
  };

  const signUp = (name: string, email: string, password: string): boolean => {
    const users = getFromLocalStorage('users') || [];
    const existingUser = users.find((u: User) => u.email === email);

    if (existingUser) return false;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser: User = {
      id: uuid(),
      name,
      email,
      password: undefined,
      contacts: [],
    };

    users.push({ ...newUser, hash });

    saveToLocalStorage('users', users);
    saveToLocalStorage('user', newUser);

    return true;
  };

  const logout = () => {
    setUser(null);
    removeFromLocalStorage('user');
  };

  const deleteAccount = (password: string): boolean => {
    const currentUser = getFromLocalStorage('user') as User;
    if (currentUser) {
      if (!bcrypt.compareSync(password, currentUser.hash!)) {
        return false;
      }

      const users = getFromLocalStorage('users') || [];
      const updatedUsers = users.filter((u: User) => u.id !== currentUser.id);

      saveToLocalStorage('users', updatedUsers);
      logout();
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
