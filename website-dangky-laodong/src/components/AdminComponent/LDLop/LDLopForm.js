import React, { useState, useEffect } from 'react';

const LDLopForm = ({ selectedItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ngayLaoDong: '',
    buoiLaoDong: '',
    tenLop: '',
    tenNguoiDung: '',
    soDienThoai: '',
    thoiGianDangKy: '',
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        ngayLaoDong: selectedItem.ngayLaoDong,
        buoiLaoDong: selectedItem.buoiLaoDong,
        tenLop: selectedItem.tenLop,
        tenNguoiDung: selectedItem.tenNguoiDung,
        soDienThoai: selectedItem.soDienThoai,
        thoiGianDangKy: selectedItem.thoiGianDangKy,
      });
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
        <label className="form-label">Ngày</label>
        <input
          type="text"
          className="form-control"
          name="ngayLaoDong"
          value={formData.ngayLaoDong}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Buổi</label>
        <select
          className="form-select"
          name="buoiLaoDong"
          value={formData.buoiLaoDong}
          onChange={handleChange}
        >
          <option value="Sáng">Sáng</option>
          <option value="Chiều">Chiều</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Tên lớp</label>
        <input
          type="text"
          className="form-control"
          name="tenLop"
          value={formData.tenLop}
          onChange={handleChange}
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
      <div className="mb-3">
        <label className="form-label">Thời gian đăng ký</label>
        <input
          type="text"
          className="form-control"
          name="thoiGianDangKy"
          value={formData.thoiGianDangKy}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default LDLopForm;
