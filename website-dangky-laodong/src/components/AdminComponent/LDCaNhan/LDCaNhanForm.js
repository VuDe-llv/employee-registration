import React, { useState, useEffect } from 'react';

const LDCaNhanForm = ({ selectedItem, onSave, onCancel, khuvucs }) => {
  const [formData, setFormData] = useState({
    ngayLaoDong: '',
    buoiLaoDong: '',
    tenLop: '',
    tenNguoiDung: '',
    soDienThoai: '',
    thoiGianDangKy: '',
    tenKhuVuc: '',
    trangThai: '',
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
        maKhuVuc: selectedItem.maKhuVuc,
        trangThai: selectedItem.trangThai,
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

  const isTrangThaiDisabled = formData.trangThai === "Chưa đăng ký" || formData.trangThai === "Hoàn thành";

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tenLop" className="form-label">Khu vực phân công</label>
        <select
          className="form-select"
          id="maKhuVuc"
          name="maKhuVuc"
          value={formData.maKhuVuc || ""}
          onChange={handleChange}
          disabled={isTrangThaiDisabled}
        >
          <option value="">Chọn khu vực</option>
          {khuvucs.map((khuvuc) => (
            <option key={khuvuc.maKhuVuc} value={khuvuc.maKhuVuc}>
              {khuvuc.tenKhuVuc}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="trangThai" className="form-label">Trạng thái công việc</label>
        <select
          className="form-select"
          id="trangThai"
          name="trangThai"
          value={formData.trangThai || ""}
          onChange={handleChange}
          disabled={isTrangThaiDisabled}
        >
          <option value="Chưa đăng ký">Chưa đăng ký</option>
          <option value="Đã đăng ký">Đã đăng ký</option>
          <option value="Đang thực hiện">Đang thực hiện</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Hoãn">Hoãn</option>
        </select>
      </div>
      <div className="d-flex justify-content-end mb-3">
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

export default LDCaNhanForm;
