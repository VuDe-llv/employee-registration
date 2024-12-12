import React, { useState, useEffect } from 'react';

const LDCaNhanForm = ({ selectedItem, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: '',
    session: '',
    className: '',
    name: '',
    phone: '',
    registrationTime: '',
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        date: selectedItem.date,
        session: selectedItem.session,
        className: selectedItem.className,
        name: selectedItem.name,
        phone: selectedItem.phone,
        registrationTime: selectedItem.registrationTime,
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
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Buổi</label>
        <select
          className="form-select"
          name="session"
          value={formData.session}
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
          name="className"
          value={formData.className}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Người đăng ký</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Số điện thoại</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Thời gian đăng ký</label>
        <input
          type="text"
          className="form-control"
          name="registrationTime"
          value={formData.registrationTime}
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

export default LDCaNhanForm;
