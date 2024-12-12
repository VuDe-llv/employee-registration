import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <div className="col-md-2 sidebar">
      <ul>
        <li>
          <Link to="/dangkylaodong/lao-dong-ca-nhan">
            <i className="fas fa-user-large"></i> LAO ĐỘNG CÁ NHÂN
          </Link>
        </li>
        <li>
          <Link to="/dangkylaodong/lao-dong-lop">
            <i className="fas fa-users"></i> LAO ĐỘNG LỚP
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
