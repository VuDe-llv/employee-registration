import React, { useState, useEffect } from "react";

const KhuVucForm = ({ selectedItem, onSave, onCancel }) => {
  const [data, setData] = useState({
    tenKhuVuc: "",
    moTaKhuVuc: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setData({
        tenKhuVuc: selectedItem.tenKhuVuc,
        moTaKhuVuc: selectedItem.moTaKhuVuc,
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
        <label htmlFor="tenKhuVuc" className="form-label">Tên khu vực</label>
        <input
          type="text"
          className="form-control"
          id="tenKhuVuc"
          name="tenKhuVuc"
          value={data.tenKhuVuc}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="moTaKhuVuc" className="form-label">Mô tả công việc</label>
        <input
          type="text"
          className="form-control"
          id="moTaKhuVuc"
          name="moTaKhuVuc"
          value={data.moTaKhuVuc}
          onChange={handleChange}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Hủy</button>
        <button type="submit" className="btn btn-primary">Lưu</button>
      </div>
    </form>
  );
};

export default KhuVucForm;
