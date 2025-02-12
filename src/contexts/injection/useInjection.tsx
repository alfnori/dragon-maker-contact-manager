import { createContext, useContext } from 'react';
import { InjectionContextType } from './InjectionContext';

export const InjectionContext = createContext<InjectionContextType | undefined>(
  undefined
);

export const useInjection = (): InjectionContextType => {
  const context = useContext(InjectionContext);
  if (!context) {
    throw new Error('useInjection must be used within an InjectionProvider');
  }
  return context;
};
