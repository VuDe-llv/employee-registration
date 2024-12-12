import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LaoDongCaNhan from '../pages/AdminPage/LaoDongCaNhan';
import LaoDongLop from '../pages/AdminPage/LaoDongLop';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="lao-dong-ca-nhan" element={<LaoDongCaNhan />} />
      <Route path="lao-dong-lop" element={<LaoDongLop />} />
      <Route path="*" element={<LaoDongCaNhan />} />
    </Routes>
  );
};

export default AdminRoutes;
