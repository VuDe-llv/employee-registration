import React, { useState, useEffect } from "react";

const KhoaForm = ({ selectedItem, onSave, onCancel }) => {
  const [data, setData] = useState({
    tenKhoa: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setData({
        tenKhoa: selectedItem.tenKhoa,
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
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tenKhoa" className="form-label">Tên khoa</label>
        <input
          type="text"
          className="form-control"
          id="tenKhoa"
          name="tenKhoa"
          value={data.tenKhoa}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Hủy</button>
        <button type="submit" className="btn btn-primary">Lưu</button>
      </div>
    </form>
  );
};

export default KhoaForm;
