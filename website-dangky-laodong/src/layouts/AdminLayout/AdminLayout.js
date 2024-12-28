import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import AdminSidebar from '../../components/AdminComponent/LayoutComponent/AdminSidebar';
import AdminHeader from '../../components/AdminComponent/LayoutComponent/AdminHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AdminLayout = () => {
  return (
    <UserContext.Consumer>
      {({ user, logout }) => (
        <div>
          {/* Header */}
          <AdminHeader user={user} logout={logout} />

          <div className="container">
            <div className="row justify-content-between" style={{ marginTop: '70px' }}>
              {/* Sidebar */}
              <AdminSidebar user={user} />

              {/* Main content */}
              <div className="col-md-10 main-content">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default AdminLayout;
