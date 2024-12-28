import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import LaoDongCaNhan from '../pages/UserPage/LaoDongCaNhan';
import LaoDongLop from '../pages/UserPage/LaoDongLop';

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="lao-dong-ca-nhan"
        element={
          <ProtectedRoute requiredRole={["admin", "user", "represent"]}>
            <LaoDongCaNhan />
          </ProtectedRoute>
        }
      />
      <Route
        path="lao-dong-lop"
        element={
          <ProtectedRoute requiredRole={["admin", "user", "represent"]}>
            <LaoDongLop />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute requiredRole={["admin", "user", "represent"]}>
            <LaoDongCaNhan />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
