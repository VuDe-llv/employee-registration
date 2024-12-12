import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminComponent/LayoutComponent/AdminSidebar';
import AdminHeader from '../../components/AdminComponent/LayoutComponent/AdminHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AdminLayout = () => {
  return (
    <div>
      {/* Header */}
      <AdminHeader />

      <div className="container">
        <div className="row justify-content-between" style={{ marginTop: '70px' }}>
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main content */}
          <div className="col-md-10 main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
