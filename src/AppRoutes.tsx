import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from 'constant';
import Home from 'pages/Home/Home';
import EditorPage from 'pages/EditorPage/EditorPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.EDITOR} element={<EditorPage />} />
    </Routes>
  );
};

export default AppRoutes;
