import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import LaoDongCaNhan from '../pages/AdminPage/LaoDongCaNhan';
import LaoDongLop from '../pages/AdminPage/LaoDongLop';
import KhuVucPhanCong from '../pages/AdminPage/KhuVucPhanCong';
import Khoa from '../pages/AdminPage/Khoa';
import Lop from '../pages/AdminPage/Lop';
import TaiKhoan from '../pages/AdminPage/TaiKhoan';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="lao-dong-ca-nhan"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <LaoDongCaNhan />
          </ProtectedRoute>
        }
      />
      <Route
        path="lao-dong-lop"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <LaoDongLop />
          </ProtectedRoute>
        }
      />
      <Route
        path="khu-vuc-phan-cong"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <KhuVucPhanCong />
          </ProtectedRoute>
        }
      />
      <Route
        path="quan-ly-khoa"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <Khoa />
          </ProtectedRoute>
        }
      />
      <Route
        path="quan-ly-lop"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <Lop />
          </ProtectedRoute>
        }
      />
      <Route
        path="quan-ly-tai-khoan"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <TaiKhoan />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute requiredRole={["admin"]}>
            <LaoDongCaNhan />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
