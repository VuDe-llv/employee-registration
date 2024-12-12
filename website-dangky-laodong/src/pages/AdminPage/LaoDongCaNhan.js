import React from 'react';
import LDCaNhanManager from '../../components/AdminComponent/LDCaNhan/LDCaNhanManager';

const LaoDongCaNhan = () => {
    return (
      <div className="container p-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>QUẢN LÝ LAO ĐỘNG</h5>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => window.location.href = '../tuanlaodong/lao-dong-lop.html'}
          >
            Tuần lao động
          </button>
        </div>
        <hr />
        <LDCaNhanManager />
      </div>
    );
  };
  
  export default LaoDongCaNhan;