import React, { FC, ReactNode, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constants/common';
import Loader from 'components/Common/Loader/Loader';
import { useAppProvider } from 'AppProvider';

const HomePage = lazy(async () => await import('pages/Home/Home'));
const EditorPage = lazy(
  async () => await import('pages/EditorPage/EditorPage')
);
const NotFound = lazy(async () => await import('pages/NotFound/NotFound'));

const SignInPage = lazy(
  async () => await import('pages/SignInPage/SignInPage')
);

const SignUpPage = lazy(
  async () => await import('pages/SignUpPage/SignUpPage')
);

const ProfilePage = lazy(
  async () => await import('pages/ProfilePage/ProfilePage')
);

const AuthCallback = lazy(async () => await import('components/AuthCallback'));

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { session } = useAppProvider();

  if (!session) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        <Route
          path={ROUTES.EDITOR}
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.CALLBACK} element={<AuthCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
