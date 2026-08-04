// Imports
import { useTranslation } from '@/i18n';
import styles from './Footer.module.css';

// Componente principal
/**
 * Footer: Barra de estado del sistema (Bottom HUD).
 * Muestra el estado operativo de los subsistemas y los datalinks de la ISS.
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.bottomBar}>
      <div className={styles.statusGroup}>
        <div className={styles.statusItem}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusLabel}>{t('footer.uplink')}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statusItem}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusLabel}>{t('footer.datalink')}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statusItem}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusLabel}>{t('footer.sgp4')}</span>
        </div>
      </div>
      
      <div className={styles.statusGroup}>
        <div className={styles.versionLabel}>{t('footer.version')}</div>
      </div>
    </footer>
  );
};

export default Footer;
