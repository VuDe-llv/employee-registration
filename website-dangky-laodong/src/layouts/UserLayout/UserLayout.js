import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import UserSidebar from '../../components/UserComponent/LayoutComponent/UserSidebar';
import UserHeader from '../../components/UserComponent/LayoutComponent/UserHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

const UserLayout = () => {
  return (
    <UserContext.Consumer>
      {({ user, logout }) => (
        <div>
          {/* Header */}
          <UserHeader user={user} logout={logout} />

          <div className="container">
            <div className="row justify-content-between" style={{ marginTop: '70px' }}>
              {/* Sidebar */}
              <UserSidebar user={user} />

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

export default UserLayout;
