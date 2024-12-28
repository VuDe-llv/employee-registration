import React, { useState, useEffect } from "react";

const LopForm = ({ selectedItem, onSave, onCancel, khoas }) => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    tenLop: "",
    maKhoa: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setData({
        tenLop: selectedItem.tenLop,
        maKhoa: selectedItem.maKhoa,
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
    if (!data.maKhoa) {
      setError("Vui lòng chọn khoa.");
      return;
    }
    setError("");
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tenLop" className="form-label">Tên lớp</label>
        <input
          type="text"
          className="form-control"
          id="tenLop"
          name="tenLop"
          value={data.tenLop}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maKhoa" className="form-label">Tên khoa</label>
        <select
          className="form-select"
          id="maKhoa"
          name="maKhoa"
          value={data.maKhoa}
          onChange={handleChange}
        >
          <option className="form-select-option" value="">Chọn khoa</option>
          {khoas.map((khoa) => (
            <option key={khoa.maKhoa} value={khoa.maKhoa}>
              {khoa.tenKhoa}
            </option>
          ))}
        </select>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Hủy</button>
        <button type="submit" className="btn btn-primary">Lưu</button>
      </div>
    </form>
  );
};

export default LopForm;
