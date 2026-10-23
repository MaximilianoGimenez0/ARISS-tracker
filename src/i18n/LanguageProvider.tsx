import { createContext, useState, useCallback, useMemo } from 'react';
import type { Language, LanguageContextType } from './types';
import { getStoredLanguage, setStoredLanguage } from './languageStorage';
import { es } from './locales/es';
import { en } from './locales/en';
import { pt } from './locales/pt';

const dictionaries = { es, en, pt };

export const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage());

  const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((acc, part) => {
      if (acc && typeof acc === 'object') {
        return acc[part];
      }
      return undefined;
    }, obj);
  };

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const fallbacks: Language[] = [language, 'en', 'es'];
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
      return key;
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
    // Cast to any in internal context; useTranslation enforces strict TranslationKey typing
    t: t as any
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
