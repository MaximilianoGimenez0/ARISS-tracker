import { useState, useRef, useEffect } from 'react';
import { useTranslation, type Language } from '@/i18n';
import { FiGlobe, FiChevronDown, FiCheck } from "react-icons/fi";
import styles from './LanguageSelector.module.css';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' }
];

const LanguageSelector = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLang = LANGUAGES.find(lang => lang.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <FiGlobe className={styles.icon} />
        <span className={styles.code}>{activeLang.code.toUpperCase()}</span>
        <FiChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.list}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`${styles.option} ${language === lang.code ? styles.active : ''}`}
                onClick={() => handleSelect(lang.code)}
              >
                <span className={styles.optionFlag}>{lang.flag}</span>
                <span className={styles.optionLabel}>{lang.label}</span>
                {language === lang.code && (
                  <FiCheck className={styles.check} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
