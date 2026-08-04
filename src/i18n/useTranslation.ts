import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import type { LanguageContextType } from './types';

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  
  return context;
};
