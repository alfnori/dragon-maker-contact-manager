export interface Contact {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  address: {
    cep: string;
    street: string;
    number: string;
    city: string;
    state: string;
    complement?: string;
    latitude: number;
    longitude: number;
  };
}
