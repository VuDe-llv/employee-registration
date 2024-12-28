import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../../context/SearchContext";
import LDCaNhanList from "./LDCaNhanList";
import LDCaNhanForm from "./LDCaNhanForm";
import LDCaNhanModal from "./LDCaNhanModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('vi-VN', options);
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${dayOfWeek} - ${formattedDate}`;
};

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString || isNaN(Date.parse(dateTimeString))) {
    return "";
  }
  const options = {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit",
  };
  return new Date(dateTimeString).toLocaleString("vi-VN", options);
};

const LDCaNhanManager = () => {
  const [laodongcanhan, setLaoDongCaNhan] = useState([]);
  const [filteredLaoDongCaNhan, setFilteredLaoDongCaNhan] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({ date: "", session: "" });
  const [, setAvailableDates] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentWeek, setCurrentWeek] = useState("");
  const [filteredDates, setFilteredDates] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [khuvucs, setKhuVucs] = useState([]);
  const { searchTerm } = useContext(SearchContext);
  
  const fetchData = async () => {
    try {
      const [laoDongCaNhanResponse, lopResponse, nguoiDungResponse, tuanldResponse, khuvucResponse] = await Promise.all([
        axios.get('https://localhost:7086/api/LaoDongCaNhan'),
        axios.get('https://localhost:7086/api/Lop'),
        axios.get('https://localhost:7086/api/NguoiDung'),
        axios.get('https://localhost:7086/api/TuanLaoDong'),
        axios.get('https://localhost:7086/api/KhuVucPhanCong'),
      ]);
    
      const nguoiDungMap = nguoiDungResponse.data.reduce((acc, nguoidung) => {
        acc[nguoidung.maNguoiDung] = { tenNguoiDung: nguoidung.tenNguoiDung, soDienThoai: nguoidung.soDienThoai };
        return acc;
      }, {});
    
      const lopMap = lopResponse.data.reduce((acc, lop) => {
        acc[lop.maLop] = lop.tenLop;
        return acc;
      }, {});
    
      const khuvucMap = khuvucResponse.data.reduce((acc, khuvuc) => {
        acc[khuvuc.maKhuVuc] = khuvuc.tenKhuVuc;
        return acc;
      }, {});
    
      const tuanldFiltered = tuanldResponse.data.filter(tuan => tuan.loaiLaoDong === "Lao động cá nhân");
    
      const tuanldMap = tuanldFiltered.reduce((acc, tuan) => {
        acc[tuan.maTuanLaoDong] = { 
          tenTuan: tuan.tenTuan, 
          ngayBatDau: tuan.ngayBatDau, 
          ngayKetThuc: tuan.ngayKetThuc 
        };
        return acc;
      }, {});
    
      const sortedWeeks = tuanldFiltered
        .sort((a, b) => new Date(b.ngayBatDau) - new Date(a.ngayBatDau))
        .map(tuan => tuan.tenTuan);
    
      const formattedData = laoDongCaNhanResponse.data.map((item) => ({
        ...item,
        tenNguoiDung: nguoiDungMap[item.maNguoiDung]?.tenNguoiDung || "",
        soDienThoai: nguoiDungMap[item.maNguoiDung]?.soDienThoai || "",
        tenLop: lopMap[item.maLop] || "",
        ngayLaoDong: formatDate(item.ngayLaoDong),
        buoiLaoDong: item.buoiLaoDong || "",
        thoiGianDangKy: formatDateTime(item.thoiGianDangKy),
        tenTuan: tuanldMap[item.maTuanLaoDong]?.tenTuan || "Không có dữ liệu",
        ngayBatDauTuan: tuanldMap[item.maTuanLaoDong]?.ngayBatDau || "",
        ngayKetThucTuan: tuanldMap[item.maTuanLaoDong]?.ngayKetThuc || "",
        tenKhuVuc: khuvucMap[item.maKhuVuc] || "",
      }));
    
      setLaoDongCaNhan(formattedData);
      setFilteredLaoDongCaNhan(formattedData);
      setAvailableWeeks(sortedWeeks);
      setKhuVucs(khuvucResponse.data);
      setAvailableSessions(Array.from(new Set(formattedData.map(item => item.buoiLaoDong))));
      setAvailableDates(Array.from(new Set(formattedData.map(item => item.ngayLaoDong))));
      
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lọc lại dữ liệu cho tuần hiện tại
  useEffect(() => {
    if (!filters.date && !filters.session) {
      const weekIndex = currentPage;
      const currentWeekName = availableWeeks[weekIndex] || "Không có dữ liệu";
      setCurrentWeek(currentWeekName);
    }
  }, [currentPage, availableWeeks, filters]);

  useEffect(() => {
    if (currentWeek) {
      const datesForCurrentWeek = laodongcanhan
        .filter(item => item.tenTuan === currentWeek)
        .map(item => item.ngayLaoDong);
      const uniqueDates = Array.from(new Set(datesForCurrentWeek));
      setFilteredDates(uniqueDates);
    } else {
      setFilteredDates([]);
    }
  }, [currentWeek, laodongcanhan]);

  const filterFunction = useCallback((item) => {
    const matchesDate = filters.date ? item.ngayLaoDong === filters.date : true;
    const matchesSession = filters.session ? item.buoiLaoDong === filters.session : true;
    return matchesDate && matchesSession;
  }, [filters]);

  useEffect(() => {
    const filteredByWeek = laodongcanhan.filter(item => item.tenTuan === currentWeek);
    const finalFiltered = filteredByWeek.filter((item) => {
      const matchesDate = filters.date ? item.ngayLaoDong === filters.date : true;
      const matchesSession = filters.session ? item.buoiLaoDong === filters.session : true;
      const matchesSearchTerm = searchTerm
        ? Object.values(item).some(value =>
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;
      return matchesDate && matchesSession && matchesSearchTerm;
    });
  
    setFilteredLaoDongCaNhan(finalFiltered);
  }, [currentWeek, filters, laodongcanhan, searchTerm]);  

  const handleExportExcel = () => {
    if (!currentWeek) {
      toast.error("Không có dữ liệu tuần hiện tại để xuất!");
      return;
    }
    
    // Dữ liệu bạn muốn xuất (ở đây lấy từ paginatedData)
    const dataToExport = paginatedData.map((item) => ({
      "Tuần": item.tenTuan,
      "Ngày lao động": item.ngayLaoDong,
      "Buổi": item.buoiLaoDong,
      "Mã sinh viên": item.maNguoiDung,
      "Họ và Tên": item.tenNguoiDung,
      "Số điện thoại": item.soDienThoai,
      "Lớp": item.tenLop,
      "Khu vực phân công": item.tenKhuVuc,
      "Thời gian đăng ký": item.thoiGianDangKy,
    }));
    
    // Tạo bảng tính Excel
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lao động cá nhân");
    
    // Đặt tên file theo tên tuần hiện tại
    const sanitizedWeekName = currentWeek.replace(/[<>:"/\\|?*]+/g, "");
    const fileName = `Lao động cá nhân - ${sanitizedWeekName}.xlsx`;
    
    // Xuất file Excel
    XLSX.writeFile(wb, fileName);
  };

  const handleConfirmDelete = (deleteData) => {
    axios
      .put(`https://localhost:7086/api/LaoDongCaNhan/deleteinfo/${deleteData.maLDCaNhan}`, {
        maLDCaNhan: deleteData.maLDCaNhan,
      })
      .then(() => {
        toast.success("Xóa thông tin thành công !");
        fetchData();
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật dữ liệu:", error);
        toast.error("Xóa thông tin thất bại !");
      });
  };

  const handleEdit = (item) => {
    setEditingData(item);
    setModalVisible(true);
  }; 

  const handleSave = (data) => {
    if (editingData) {
      axios
      .put(`https://localhost:7086/api/LaoDongCaNhan/info/${editingData.maLDCaNhan}`, {
        maLDCaNhan: editingData.maLDCaNhan,
        buoiLaoDong: data.buoiLaoDong || editingData.buoiLaoDong,
        thoiGianDangKy: new Date().toISOString(),
        maLop: data.maLop || editingData.maLop,
        maNguoiDung: data.maNguoiDung || editingData.maNguoiDung,
        trangThai: data.trangThai || editingData.trangThai,
        maTuanLaoDong: data.maTuanLaoDong || editingData.maTuanLaoDong,
        maKhuVuc: data.maKhuVuc || editingData.maKhuVuc,
      })
      .then(() => {
        toast.success("Cập nhật thành công!");
        fetchData();
        setEditingData(null);
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật dữ liệu:", error);
        toast.error("Cập nhật thất bại!");
      });
    }
  };

  const handleCancel = () => {
    setEditingData(null);
    setModalVisible(false);
  };  

  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    const filtered = laodongcanhan
      .filter(item => item.tenTuan === currentWeek)
      .filter(filterFunction);
  
    setFilteredLaoDongCaNhan(filtered);
  };  

  const handlePageChange = (direction) => {
    let newPage = currentPage;
    if (direction === "next" && currentPage < availableWeeks.length - 1) {
      newPage = currentPage + 1;
    } else if (direction === "prev" && currentPage > 0) {
      newPage = currentPage - 1;
    }
    const newWeek = availableWeeks[newPage] || "Không có dữ liệu";
    setCurrentPage(newPage);
    setCurrentWeek(newWeek);
    const updatedFiltered = laodongcanhan.filter(item => item.tenTuan === newWeek);
    setFilteredLaoDongCaNhan(updatedFiltered);
  };

  const paginatedData = filteredLaoDongCaNhan;

  return (
    <div className="row mb-3">
      <div className="col-md-3">
        <label htmlFor="filterDate" className="form-label">Chọn ngày</label>
        <select
          id="filterDate"
          className="form-select"
          onChange={(e) => handleFilterChange(e, "date")}
        >
          <option value="">Tất cả</option>
          {filteredDates.map((date, index) => (
            <option key={index} value={date}>{date}</option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <label htmlFor="filterSession" className="form-label">Chọn buổi</label>
        <select id="filterSession" className="form-select" onChange={(e) => handleFilterChange(e, 'session')}>
          <option value="">Tất cả</option>
          {availableSessions.map((session, index) => (
            <option key={index} value={session}>{session}</option>
          ))}
        </select>
      </div>

      <div className="col-md-6 d-flex flex-column align-items-end mb-3">
        <label className="week-name mb-2">{currentWeek || "Không có dữ liệu"}</label>

        <div className="d-flex align-items-end">
          <button
            className="btn btn-outline-success btn-sm me-2"
            onClick={handleExportExcel}
          >
            <i className="fas fa-file-excel"></i> Xuất File
          </button>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === availableWeeks.length - 1}
          >
            <i className="fas fa-angle-left"></i> Trước
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
          >
            Sau <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>

      <LDCaNhanList data={paginatedData} onEdit={handleEdit} onDelete={handleConfirmDelete} />

      {modalVisible && (
        <LDCaNhanModal title="Chỉnh sửa thông tin" isVisible={modalVisible} onClose={handleCancel}>
          <LDCaNhanForm
            selectedItem={editingData}
            onSave={handleSave}
            onCancel={handleCancel}
            khuvucs={khuvucs}
          />
        </LDCaNhanModal>
      )}
    </div>
  );
};

export default LDCaNhanManager;
