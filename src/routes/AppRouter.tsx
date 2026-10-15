// Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import SecondaryLayout from '@/layouts/SecondaryLayout';

import TrackerPage from '@/pages/tracker/TrackerPage';
import InfoPage from '@/pages/info/InfoPage';

/**
 * AppRouter: Gestor de rutas de la aplicación Single Page (SPA).
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página de inicio con SecondaryLayout */}
        <Route element={<SecondaryLayout />}>
          <Route index element={<InfoPage />} />
        </Route>

        {/* Tracker con MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="tracker" element={<TrackerPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;