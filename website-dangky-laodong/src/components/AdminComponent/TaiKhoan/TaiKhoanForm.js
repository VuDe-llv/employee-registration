import React, { useState, useEffect } from "react";

const TaiKhoan = ({ selectedItem, onSave, onCancel, lops }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    maNguoiDung: "",
    tenNguoiDung: "",
    soDienThoai: "",
    email: "",
    vaiTro: "user",
    matKhau: "",
    maLop: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setData({
        maNguoiDung: selectedItem.maNguoiDung,
        tenNguoiDung: selectedItem.tenNguoiDung,
        soDienThoai: selectedItem.soDienThoai,
        email: selectedItem.email,
        vaiTro: selectedItem.vaiTro,
        maLop: selectedItem.maLop,
      });
    }
  }, [selectedItem]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.maLop) {
      setError("Vui lòng chọn lớp.");
      return;
    }
    setError("");
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="maNguoiDung" className="form-label">Mã tài khoản</label>
        <input
          type="text"
          className="form-control"
          id="maNguoiDung"
          name="maNguoiDung"
          value={data.maNguoiDung}
          onChange={handleChange}
          disabled={!!selectedItem}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maNguoiDung" className="form-label">Tên tài khoản</label>
        <input
          type="text"
          className="form-control"
          id="tenNguoiDung"
          name="tenNguoiDung"
          value={data.tenNguoiDung}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maNguoiDung" className="form-label">Số điện thoại</label>
        <input
          type="text"
          className="form-control"
          id="soDienThoai"
          name="soDienThoai"
          value={data.soDienThoai}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maNguoiDung" className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maKhoa" className="form-label">Tên lớp</label>
        <select
          className="form-select"
          id="maLop"
          name="maLop"
          value={data.maLop}
          onChange={handleChange}
        >
          <option className="form-select-option" value="">Chọn lớp</option>
          {lops.map((lop) => (
            <option key={lop.maLop} value={lop.maLop}>
              {lop.tenLop}
            </option>
          ))}
        </select>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="vaiTro" className="form-label">Vai trò</label>
        <select
          className="form-select"
          id="vaiTro"
          name="vaiTro"
          value={data.vaiTro}
          onChange={handleChange}
          required
        >
          <option value="user">Người dùng</option>
          <option value="represent">Cán bộ lớp</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Hủy</button>
        <button type="submit" className="btn btn-primary">Lưu</button>
      </div>
    </form>
  );
};

export default TaiKhoan;
