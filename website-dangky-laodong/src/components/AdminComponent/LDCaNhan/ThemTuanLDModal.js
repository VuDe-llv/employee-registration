import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getWeekDays = (startDate) => {
  const start = new Date(startDate);
  const days = [];
  for (let i = 0; i < 6; i++) {
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
    loaiLaoDong: "Lao động cá nhân",
  });

  const [existingWeeks, setExistingWeeks] = useState([]);
  const [ , setErrorMessage] = useState("");

  useEffect(() => {
    const fetchLatestWeek = async () => {
      try {
        const response = await axios.get("https://localhost:7086/api/TuanLaoDong");
        const weeks = response.data.filter((week) => week.loaiLaoDong === "Lao động cá nhân");
        setExistingWeeks(weeks);
  
        if (weeks.length === 0) {
          // Không có tuần trong cơ sở dữ liệu với loại "Lao động lớp"
          setFormData((prevFormData) => ({
            ...prevFormData,
            tenTuan: "Tuần 1",
            ngayBatDau: "",
            ngayKetThuc: "",
          }));
        } else {
          // Có tuần trong cơ sở dữ liệu với loại "Lao động lớp"
          const latestWeek = weeks
            .sort((a, b) => {
              const weekNumberA = parseInt(a.tenTuan.replace("Tuần", "").trim(), 10);
              const weekNumberB = parseInt(b.tenTuan.replace("Tuần", "").trim(), 10);
              return weekNumberB - weekNumberA;
            })[0];
  
          const latestStartDate = new Date(latestWeek.ngayBatDau);
          const nextWeekStartDate = new Date(latestStartDate);
          nextWeekStartDate.setDate(latestStartDate.getDate() + 8);
  
          const nextWeekEndDate = new Date(nextWeekStartDate);
          nextWeekEndDate.setDate(nextWeekStartDate.getDate() + 5);
  
          setFormData((prevFormData) => ({
            ...prevFormData,
            tenTuan: `Tuần ${parseInt(latestWeek.tenTuan.replace("Tuần", "").trim(), 10) + 1}`,
            ngayBatDau: nextWeekStartDate.toISOString().split("T")[0],
            ngayKetThuc: nextWeekEndDate.toISOString().split("T")[0],
          }));
        }
      } catch (error) {
        console.error("Có lỗi khi lấy tuần lao động:", error);
      }
    };
  
    if (isVisible) {
      fetchLatestWeek();
    }
  }, [isVisible]);

  const handleDateChange = (e) => {
    const { value, name } = e.target;
    if (!existingWeeks.length) {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameExist = existingWeeks.some((week) => week.tenTuan === formData.tenTuan);
    if (isNameExist) {
      toast.error("Tên tuần lao động đã tồn tại. Vui lòng chọn tên khác.");
      return;
    } else {
      setErrorMessage("");
    }

    if (!formData.loaiLaoDong) {
      formData.loaiLaoDong = "Lao động cá nhân";
    }
    onSave(formData);
    toast.success("Thêm tuần lao động thành công !");
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
                        readOnly
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
                        readOnly={existingWeeks.length > 0}
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
                    <button type="button" className="btn btn-secondary btn-sm me-2" onClick={onClose}>
                      Hủy
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm">
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
