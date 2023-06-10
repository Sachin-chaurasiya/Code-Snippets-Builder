import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constants/common';
import Loader from 'components/Common/Loader/Loader';

const HomePage = lazy(async () => await import('pages/Home/Home'));
const EditorPage = lazy(
  async () => await import('pages/EditorPage/EditorPage')
);
const NotFound = lazy(async () => await import('pages/NotFound/NotFound'));

const LoginPage = lazy(async () => await import('pages/LoginPage/LoginPage'));

const SignUpPage = lazy(
  async () => await import('pages/SignUpPage/SignUpPage')
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EDITOR} element={<EditorPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
