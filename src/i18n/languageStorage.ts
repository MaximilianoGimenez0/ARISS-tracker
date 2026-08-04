import type { Language } from './types';

const STORAGE_KEY = 'ariss_tracker_language';

export const getStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en' || stored === 'pt') {
      return stored;
    }
  } catch (error) {
    console.error('Error reading language from localStorage', error);
  }
  return 'es'; // default
};

export const setStoredLanguage = (language: Language): void => {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.error('Error setting language in localStorage', error);
  }
};
