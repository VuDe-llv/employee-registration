import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LaoDongCaNhan from '../pages/UserPage/LaoDongCaNhan';
import LaoDongLop from '../pages/UserPage/LaoDongLop';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="lao-dong-ca-nhan" element={<LaoDongCaNhan />} />
      <Route path="lao-dong-lop" element={<LaoDongLop />} />
      <Route path="*" element={<LaoDongCaNhan />} />
    </Routes>
  );
};

export default UserRoutes;
