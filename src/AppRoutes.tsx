import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants';
import Home from './Pages/Home/Home';
import EditorPage from './Pages/EditorPage/EditorPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.EDITOR} element={<EditorPage />} />
    </Routes>
  );
};

export default AppRoutes;
