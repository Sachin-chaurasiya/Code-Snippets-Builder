import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constants/common';
import Loader from 'components/Common/Loader/Loader';

const HomePage = lazy(async () => await import('Pages/Home/Home'));
const EditorPage = lazy(
  async () => await import('Pages/EditorPage/EditorPage')
);
const NotFound = lazy(async () => await import('Pages/NotFound/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EDITOR} element={<EditorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
