import React, { useState } from "react";

// Hàm tính ngày thứ 2 của tuần dựa trên ngày bắt đầu
const getWeekDays = (startDate) => {
  const start = new Date(startDate);
  const days = [];
  for (let i = 0; i < 6; i++) { // Tính từ thứ 2 đến thứ 7
    const nextDay = new Date(start);
    nextDay.setDate(start.getDate() + i);
    days.push(nextDay);
  }
  return days;
};

const ThemTuanLDModal = ({ isVisible, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tenTuan: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    loaiLaoDong: "Lao động lớp",
  });

  // Cập nhật ngày bắt đầu và ngày kết thúc
  const handleDateChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };

      if (name === "ngayBatDau") {
        const startDate = new Date(value);
        const days = getWeekDays(startDate);

        updatedFormData.ngayKetThuc = days[days.length - 1].toISOString().split("T")[0];
      }

      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.loaiLaoDong) {
      formData.loaiLaoDong = "Lao động lớp";
    }
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    isVisible && (
      <>
        {/* Overlay */}
        <div className="modal-overlay"></div>

        {/* Modal */}
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm tuần lao động</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3">
                      <label className="form-label">Tên tuần</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tenTuan"
                        value={formData.tenTuan}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ngày bắt đầu</label>
                      <input
                        type="date"
                        className="form-control"
                        name="ngayBatDau"
                        value={formData.ngayBatDau}
                        onChange={handleDateChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ngày kết thúc</label>
                      <input
                        type="date"
                        className="form-control"
                        name="ngayKetThuc"
                        value={formData.ngayKetThuc}
                        onChange={handleChange}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                      Hủy
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ThemTuanLDModal;
