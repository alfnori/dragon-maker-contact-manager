export interface Contact {
  id: string;
  userId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: {
    cep: string;
    street: string;
    number: string;
    city: string;
    state: string;
    complement?: string;
    latitude?: number;
    longitude?: number;
  };
}
