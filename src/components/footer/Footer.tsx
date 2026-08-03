// Imports
import styles from './Footer.module.css';

// Componente principal
/**
 * Footer: Barra de estado del sistema (Bottom HUD).
 * Muestra el estado operativo de los subsistemas y los datalinks de la ISS.
 */
const Footer = () => {

  return (
    <footer className={styles.bottomBar}>
      <div className={styles.statusGroup}>
        <div className={styles.statusItem}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusLabel}>UPLINK: SECURE</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statusItem}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusLabel}>DATALINK: ACTIVE</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statusItem}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusLabel}>SGP4 PROPAGATOR: NOMINAL</span>
        </div>
      </div>
      
      <div className={styles.statusGroup}>
        <div className={styles.versionLabel}>ARISS-TRACKER-OS v9.2</div>
      </div>
    </footer>
  );
};

export default Footer;
