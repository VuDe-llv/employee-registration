import React from 'react';
import LDCaNhanManager from '../../components/UserComponent/LDCaNhan/LDCaNhanManager';

const LaoDongCaNhan = () => {
    return (
      <div className="container p-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>ĐĂNG KÝ LAO ĐỘNG</h5>
        </div>
        <hr />
        <LDCaNhanManager />
      </div>
    );
  };
  
  export default LaoDongCaNhan;