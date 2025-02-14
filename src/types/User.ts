import { Contact } from './Contact';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  hash?: string;
  contacts: Contact[];
}
