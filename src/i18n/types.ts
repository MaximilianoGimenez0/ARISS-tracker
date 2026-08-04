import type { es } from './locales/es';

export type Language = 'es' | 'en' | 'pt';

export type TranslationDictionary = typeof es;

// Mapeo recursivo para obtener las claves como strings ('navbar.home', etc.)
export type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
    ? `${TKey}`
    : TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

export type TranslationKey = RecursiveKeyOf<TranslationDictionary>;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}
