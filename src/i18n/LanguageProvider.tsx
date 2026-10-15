import { createContext, useState, useCallback, useMemo } from 'react';
import type { Language, LanguageContextType } from './types';
import { getStoredLanguage, setStoredLanguage } from './languageStorage';
import { es } from './locales/es';
import { en } from './locales/en';
import { pt } from './locales/pt';

// Diccionarios por idioma
const dictionaries = { es, en, pt };

// Contexto inicializado en null (debe ser usado dentro del provider)
export const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage());

  // Función para obtener el valor anidado desde la clave (ej: 'navbar.brandTitle')
  const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((acc, part) => {
      if (acc && typeof acc === 'object') {
        return acc[part];
      }
      return undefined;
    }, obj);
  };

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const fallbacks: Language[] = [language, 'en', 'es']; // Graceful fallback
    let translated: string | undefined = undefined;

    for (const lang of fallbacks) {
      const dictionary = dictionaries[lang];
      if (dictionary) {
        translated = getNestedValue(dictionary, key);
        if (translated !== undefined) {
          break;
        }
      }
    }

    if (translated === undefined) {
      console.warn(`[i18n] Missing translation for key: "${key}"`);
      return key; // Fallback al mismo string de la clave
    }

    if (params) {
      Object.keys(params).forEach(paramKey => {
        translated = translated!.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(params[paramKey]));
      });
    }

    return translated;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  }, []);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: t as any // Se castea a any aquí internamente, la inferencia de tipos la provee el hook
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
