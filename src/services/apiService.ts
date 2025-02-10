import axios from 'axios';

export const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export const getAddressByCEP = async (cep: string) => {
  try {
    const response = await viaCepApi.get(`${cep}/json/`);
    return response.data;
  } catch (error) {
    console.error('CEP lookup error', error);
    return null;
  }
};
