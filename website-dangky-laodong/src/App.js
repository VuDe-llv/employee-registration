import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import UserLayout from './layouts/UserLayout/UserLayout';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin layout and routes */}
        <Route path="/quanlylaodong" element={<AdminLayout />}>
          <Route path="*" element={<AdminRoutes />} />
        </Route>

        {/* User layout and routes */}
        <Route path="/dangkylaodong" element={<UserLayout />}>
          <Route path="*" element={<UserRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
