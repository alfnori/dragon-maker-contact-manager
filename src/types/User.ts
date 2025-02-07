import { Contact } from './Contact';

export interface User {
  id?: string;
  email: string;
  password?: string;
  hash?: string;
  contacts: Contact[];
}
