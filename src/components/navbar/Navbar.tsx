// Imports
import { NavLink, Link } from 'react-router-dom';
import { FiGlobe, FiInfo, FiActivity, FiCpu, FiMenu } from 'react-icons/fi';
import { useTranslation } from '@/i18n';
import LanguageSelector from '@/components/language-selector/LanguageSelector';

import styles from './Navbar.module.css';

// Tipos e interfaces
interface NavbarProps {
  isExpanded?: boolean;
  setIsExpanded?: (expanded: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

// Componente principal
/**
 * Navbar: Command bar superior estilo HUD (Heads-Up Display).
 */
const Navbar = ({ isMobileOpen, setIsMobileOpen }: NavbarProps) => {
  const { t } = useTranslation();

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.linkActive : ''}`;

  return (
    <header className={styles.topbar}>
      <button 
        className={styles.burgerButton}
        onClick={() => setIsMobileOpen?.(!isMobileOpen)}
        aria-label="Menu"
      >
        <FiMenu />
      </button>

      <Link to="/tracker" className={styles.brandContainer}>
        <div className={styles.logoWrapper}>
          <FiActivity className={styles.logoIcon} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>{t('navbar.brandTitle')}</span>
          <span className={styles.brandSubtitle}>{t('navbar.brandSubtitle')}</span>
        </div>
      </Link>

      <nav className={`${styles.navContainer} ${isMobileOpen ? styles.navContainerOpen : ''}`}>
        <NavLink to="/tracker" className={linkClassName} onClick={() => setIsMobileOpen?.(false)}>
          <FiGlobe className={styles.linkIcon} />
          <span className={styles.linkText}>{t('navbar.tracker')}</span>
        </NavLink>

        <NavLink to="/" className={linkClassName} onClick={() => setIsMobileOpen?.(false)}>
          <FiInfo className={styles.linkIcon} />
          <span className={styles.linkText}>{t('navbar.missionInfo')}</span>
        </NavLink>
      </nav>

      <LanguageSelector />

      <div className={styles.systemStatus}>
        <FiCpu className={styles.cpuIcon} />
        <span className={styles.statusText}>{t('navbar.systemOnline')}</span>
      </div>
    </header>
  );
};

export default Navbar;
