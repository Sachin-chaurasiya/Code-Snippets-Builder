import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constant';
import Loader from 'components/Loader';

const HomePage = lazy(() => import('Pages/Home/Home'));
const EditorPage = lazy(() => import('Pages/EditorPage/EditorPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EDITOR} element={<EditorPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
