import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="col-md-2 sidebar">
      <ul>
        <li>
          <NavLink 
            to="/quanlylaodong/lao-dong-ca-nhan"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-user-large"></i> LAO ĐỘNG CÁ NHÂN
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/quanlylaodong/lao-dong-lop"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-users"></i> LAO ĐỘNG LỚP
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/quanlylaodong/khu-vuc-phan-cong"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-chart-area"></i> KHU VỰC PHÂN CÔNG
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/quanlylaodong/quan-ly-khoa"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-folder-open"></i> QUẢN LÝ KHOA
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/quanlylaodong/quan-ly-lop"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-layer-group"></i> QUẢN LÝ LỚP
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/quanlylaodong/quan-ly-tai-khoan"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <i className="fas fa-circle-user"></i> QUẢN LÝ TÀI KHOẢN
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
