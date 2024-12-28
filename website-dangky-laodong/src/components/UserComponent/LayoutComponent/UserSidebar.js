import React from 'react';
import { NavLink } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="col-md-2 sidebar">
      <ul>
        <li>
          <NavLink 
            to="/dangkylaodong/lao-dong-ca-nhan"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-user-large"></i> LAO ĐỘNG CÁ NHÂN
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dangkylaodong/lao-dong-lop"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-users"></i> LAO ĐỘNG LỚP
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
