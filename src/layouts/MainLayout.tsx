// Imports
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FiActivity } from 'react-icons/fi';

import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import styles from './MainLayout.module.css';

// Componente principal

/**
 * MainLayout: Estructura contenedora principal de la aplicación Single Page (SPA).
 * Gestiona el marco visual general, ahora como un dashboard de pantalla completa (HUD).
 */
const MainLayout = () => {
  // Valores derivados
  const location = useLocation();

  // Estados
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Estados de simulación de arranque (Boot Sequence)
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  // Effects

  /**
   * Efecto de simulación de arranque inicial del sistema (Boot Sequence).
   */
  useEffect(() => {
    const logs = [
      '[SYSTEM] Initializing kernel module ARISS-OS v9.2...',
      '[SATLINK] Uplink established with NORAD TLE database...',
      '[TLE-ENG] SGP4 orbital propagator synchronized...',
      '[GROUND] Handshake complete: 10 active SDR ground stations...',
      '[MAPS] Rendering 3D Earth topology projection...',
      '[ISS] Telemetry datalink active: Alt ~420km...',
      '[MISSION] Connection secure. Welcome to Mission Control.'
    ];

    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < logs.length) {
        setBootLogs((prev) => [...prev, logs[currentStep]]);
        setBootProgress(Math.round(((currentStep + 1) / logs.length) * 100));
        currentStep++;
      } else {
        clearInterval(interval);
        
        const timeout = setTimeout(() => {
          setIsBooting(false);
        }, 800);
        
        return () => clearTimeout(timeout);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  // Render

  if (isBooting) {
    return (
      <div className={styles.bootOverlay}>
        <div className={styles.bootTerminal}>
          <header className={styles.bootHeader}>
            <FiActivity className={styles.bootLogo} />
            
            <div className={styles.bootTitleContainer}>
              <span className={styles.bootTitle}>ARISS-TRACKER-OS</span>
              <span className={styles.bootSubtitle}>Mission Control v9.2</span>
            </div>
          </header>

          <div className={styles.bootConsole}>
            {bootLogs.map((log, idx) => {
              const isSuccess =
                typeof log === 'string' &&
                (log.includes('secure') || log.includes('active') || log.includes('synchronized') || log.includes('complete'));
                
              return (
                <div
                  key={idx}
                  className={`${styles.consoleLine} ${isSuccess ? styles.consoleLineSuccess : ''}`}
                >
                  {log}
                </div>
              );
            })}
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.progressBarTrack}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            
            <div className={styles.progressText}>
              <span>System Initialization</span>
              <span className={styles.progressVal}>{bootProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layoutContainer}>
      
      {/* Contenido Dinámico Principal (Debajo del HUD) */}
      <main className={styles.mainContent}>
        <div key={location.pathname} className={styles.pageTransition}>
          <Outlet />
        </div>
      </main>

      {/* Navegación y HUD (Flotando sobre el contenido) */}
      <Navbar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <Footer />
    </div>
  );
};

export default MainLayout;
