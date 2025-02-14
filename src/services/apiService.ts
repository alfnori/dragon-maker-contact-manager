import axios from 'axios';

export const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export interface CepAddress {
  cep: string;
  logradouro: string;
  complemento?: string;
  unidade?: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao?: string;
  ibge?: string;
  gia?: string;
  ddd: string;
  siafi?: string;
}

export const getAddressByCEP = async (cep: string) => {
  try {
    const response = await viaCepApi.get<CepAddress>(`${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error('CEP lookup error', error);
    return null;
  }
};
