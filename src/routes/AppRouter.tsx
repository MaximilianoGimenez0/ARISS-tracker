import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import SecondaryLayout from '@/layouts/SecondaryLayout';

import TrackerPage from '@/pages/tracker/TrackerPage';
import InfoPage from '@/pages/info/InfoPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SecondaryLayout />}>
          <Route index element={<InfoPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="tracker" element={<TrackerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;