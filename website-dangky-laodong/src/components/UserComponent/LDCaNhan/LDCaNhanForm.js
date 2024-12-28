import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LDCaNhanForm = ({ selectedItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ngayLaoDong: '',
    buoiLaoDong: '',
    tenLop: '',
    tenNguoiDung: '',
    soDienThoai: '',
    thoiGianDangKy: '',
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setFormData((prevData) => ({
        ...prevData,
        maLop: storedUser.maLop || '',
        maNguoiDung: storedUser.maNguoiDung || '',
        tenNguoiDung: storedUser.tenNguoiDung || '',
        soDienThoai: storedUser.soDienThoai || '',
      }));

      const fetchLop = async () => {
        try {
          const response = await axios.get(`https://localhost:7086/api/Lop/${storedUser.maLop}`);
          setFormData((prevData) => ({
            ...prevData,
            tenLop: response.data.tenLop || '',
          }));
        } catch (error) {
          console.error("Có lỗi xảy ra khi lấy thông tin lớp:", error);
        }
      };
      if (storedUser.maLop) {
        fetchLop();
      }
    }

    if (selectedItem) {
      setFormData((prevData) => ({
        ...prevData,
        ngayLaoDong: selectedItem.ngayLaoDong,
        buoiLaoDong: selectedItem.buoiLaoDong,
        tenLop: selectedItem.tenLop,
        thoiGianDangKy: selectedItem.thoiGianDangKy,
      }));
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Buổi</label>
        <input
          className="form-control"
          name="buoiLaoDong"
          value={formData.buoiLaoDong}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tên lớp</label>
        <input
          type="tenLop"
          className="form-control"
          name="tenLop"
          value={formData.tenLop}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Người đăng ký</label>
        <input
          type="text"
          className="form-control"
          name="tenNguoiDung"
          value={formData.tenNguoiDung}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input
          type="text"
          className="form-control"
          name="soDienThoai"
          value={formData.soDienThoai}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary me-2">
          Lưu
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default LDCaNhanForm;
