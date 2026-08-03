// Imports
import { NavLink } from 'react-router-dom';
import { FiGlobe, FiInfo, FiActivity, FiCpu } from 'react-icons/fi';

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
const Navbar = ({ }: NavbarProps) => {

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.linkActive : ''}`;

  return (
    <header className={styles.topbar}>
      <div className={styles.brandContainer}>
        <div className={styles.logoWrapper}>
          <FiActivity className={styles.logoIcon} />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>ARISS-TRACKER</span>
          <span className={styles.brandSubtitle}>SYSTEM.CTRL</span>
        </div>
      </div>

      <nav className={styles.navContainer}>
        <NavLink to="/tracker" className={linkClassName}>
          <FiGlobe className={styles.linkIcon} />
          <span className={styles.linkText}>TRACKER</span>
        </NavLink>

        <NavLink to="/" className={linkClassName}>
          <FiInfo className={styles.linkIcon} />
          <span className={styles.linkText}>MISSION INFO</span>
        </NavLink>
      </nav>

      <div className={styles.systemStatus}>
        <FiCpu className={styles.cpuIcon} />
        <span className={styles.statusText}>SYS.ONLINE</span>
      </div>
    </header>
  );
};

export default Navbar;
