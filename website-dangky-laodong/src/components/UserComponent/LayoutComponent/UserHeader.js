import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { SearchContext } from '../../../context/SearchContext';
import logo from '../../../assets/sv_logo_dashboard.png';
import noAvatar from '../../../assets/no_avatar.png';

const UserHeader = () => {
  const { user, logout } = useContext(UserContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="fas fa-search"></i>
        </div>

        {/* User info dropdown */}
        <div className="user-info dropdown d-flex align-items-center">
          <span
            className="dropdown-toggle"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user?.tenNguoiDung || 'Không xác định'}
            <img
              src={user?.avatar || noAvatar}
              alt="Ảnh Profile"
              className="rounded-circle ms-2"
              style={{ width: '30px', height: '30px' }}
            />
          </span>
          <ul className="dropdown-menu" aria-labelledby="userDropdown">
            {user?.vaiTro === "admin" && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/quanlylaodong/lao-dong-ca-nhan")}
                >
                  Trang quản lý
                </button>
              </li>
            )}
            <li>
              <button className="dropdown-item" onClick={logout}>
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
