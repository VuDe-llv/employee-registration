import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LDCaNhanManager from '../../components/AdminComponent/LDCaNhan/LDCaNhanManager';
import ThemTuanLDModal from '../../components/AdminComponent/LDCaNhan/ThemTuanLDModal';

const LaoDongCaNhan = () => {
  const [isThemTuanLDModalVisible, setThemTuanLDModalVisible] = useState(false);

  const handleThemTuanLD = (weekData) => {
    axios.post("https://localhost:7086/api/TuanLaoDong", weekData)
      .then(response => {
        const { ngayBatDau, ngayKetThuc, maTuanLaoDong } = response.data;
        
        return axios.post("https://localhost:7086/api/LaoDongCaNhan/bulk-insert", null, {
          params: { 
            ngayBatDau,
            ngayKetThuc,
            maTuanLaoDong
          }
        });
      })
      .then(() => {
        setThemTuanLDModalVisible(false);
        window.location.reload();
      })
      .catch(error => {
        console.error("Có lỗi xảy ra:", error);
        toast.error("Có lỗi xảy ra khi thêm dữ liệu!");
      });
  };  

  return (
    <div className="container p-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>QUẢN LÝ LAO ĐỘNG</h5>
        <button
          className="btn btn-success btn-sm"
          onClick={() => setThemTuanLDModalVisible(true)}
        >
          Thêm tuần mới
        </button>
      </div>
      <hr />
      <LDCaNhanManager />

      {/* Modal thêm tuần lao động */}
      <ThemTuanLDModal
        isVisible={isThemTuanLDModalVisible}
        onClose={() => setThemTuanLDModalVisible(false)}
        onSave={handleThemTuanLD}
      />
    </div>
  );
};

export default LaoDongCaNhan;
