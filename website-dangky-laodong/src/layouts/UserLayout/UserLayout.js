import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../../components/UserComponent/LayoutComponent/UserSidebar';
import UserHeader from '../../components/UserComponent/LayoutComponent/UserHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const UserLayout = () => {
  return (
    <div>
      {/* Header */}
      <UserHeader />

      <div className="container">
        <div className="row justify-content-between" style={{ marginTop: '70px' }}>
          {/* Sidebar */}
          <UserSidebar />

          {/* Main content */}
          <div className="col-md-10 main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
