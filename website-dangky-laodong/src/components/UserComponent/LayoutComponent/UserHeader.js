import React from 'react';
import logo from '../../../assets/sv_logo_dashboard.png';
import noAvatar from '../../../assets/no_avatar.png';

const UserHeader = () => {
  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Search bar */}
        <div className="search">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm..."
            aria-label="Tìm kiếm"
          />
        </div>

        {/* User info dropdown */}
        <div className="user-info dropdown d-flex align-items-center">
          <span
            className="dropdown-toggle"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Lại Lâm Vũ
            <img
              src={noAvatar}
              alt="Ảnh Profile"
              className="rounded-circle ms-2"
              style={{ width: '30px', height: '30px' }}
            />
          </span>
          <ul className="dropdown-menu" aria-labelledby="userDropdown">
            <li>
              <a className="dropdown-item" href="#">
                Thông tin cá nhân
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
