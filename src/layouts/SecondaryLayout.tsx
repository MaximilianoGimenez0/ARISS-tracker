import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer_2/Footer';
import styles from './SecondaryLayout.module.css';

const SecondaryLayout = () => {
  const location = useLocation();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className={styles.layoutContainer}>

      {/* Navegación y HUD (Flotando sobre el contenido) */}
      <Navbar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Área de scroll que contiene las páginas y el footer */}
      <div className={styles.scrollArea}>
        {/* Contenido Dinámico Principal */}
        <main className={styles.mainContent}>
          <div key={location.pathname} className={styles.pageTransition}>
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>

    </div>
  );
};

export default SecondaryLayout;