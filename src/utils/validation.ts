import { cpf } from 'cpf-cnpj-validator';

export const validateCPF = (value: string): boolean => {
  return cpf.isValid(value);
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
