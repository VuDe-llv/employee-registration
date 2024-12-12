import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import LDLopList from "./LDLopList";
import LDLopForm from "./LDLopForm";
import LDLopModal from "./LDLopModal";

const LDLopManager = () => {
  const [laodonglop, setLaoDongLop] = useState([]);
  const [filteredLaoDongLop, setFilteredLaoDongLop] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({ date: "", session: "" });
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const laoDongLopResponse = await axios.get('https://localhost:7086/api/LaoDongLop');
        const lopResponse = await axios.get('https://localhost:7086/api/Lop');
        const nguoiDungResponse = await axios.get('https://localhost:7086/api/NguoiDung');

        const nguoiDungMap = nguoiDungResponse.data.reduce((acc, nguoidung) => {
          acc[nguoidung.maNguoiDung] = {
            tenNguoiDung: nguoidung.tenNguoiDung,
            soDienThoai: nguoidung.soDienThoai
          };
          return acc;
        }, {});        
        
        const lopMap = lopResponse.data.reduce((acc, lop) => {
          acc[lop.maLop] = lop.tenLop;
          return acc;
        }, {});
  
        // Định dạng dữ liệu
        const formattedData = laoDongLopResponse.data.map((item) => ({
          ...item,
          tenNguoiDung: nguoiDungMap[item.maNguoiDung]?.tenNguoiDung || "",
          soDienThoai: nguoiDungMap[item.maNguoiDung]?.soDienThoai || "",
          tenLop: lopMap[item.maLop] || "",
          ngayLaoDong: formatDate(item.ngayLaoDong),
          thoiGianDangKy: formatDateTime(item.thoiGianDangKy),
        }));                      
  
        // Cập nhật state
        setLaoDongLop(formattedData);
        setFilteredLaoDongLop(formattedData);
        
        // Lấy các ngày và buổi từ dữ liệu
        const dates = Array.from(new Set(formattedData.map(item => item.ngayLaoDong)));
        const sessions = Array.from(new Set(formattedData.map(item => item.buoiLaoDong)));

        setAvailableDates(dates);
        setAvailableSessions(sessions);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    };
  
    fetchData();
  }, []);

  // Khai báo filterFunction sử dụng useCallback
  const filterFunction = useCallback((item) => {
    const matchesDate = filters.date ? item.ngayLaoDong === filters.date : true;
    const matchesSession = filters.session ? item.buoiLaoDong === filters.session : true;
    return matchesDate && matchesSession;
  }, [filters]);

  useEffect(() => {
    // Lọc lại dữ liệu mỗi khi filters thay đổi
    const filtered = laodonglop.filter(filterFunction);
    setFilteredLaoDongLop(filtered);
  }, [filters, laodonglop, filterFunction]);
  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7086/api/LaoDongLop/${id}`)
      .then(() => {
        setLaoDongLop(laodonglop.filter((ldlop) => ldlop.MaLDLop !== id));
        setFilteredLaoDongLop(filteredLaoDongLop.filter((ldlop) => ldlop.MaLDLop !== id));
      })
      .catch(error => {
        console.error("Có lỗi xảy ra khi xóa dữ liệu:", error);
      });
  };

  const handleSave = (data) => {
    if (selectedItem) {
      // Cập nhật dữ liệu
      axios.put(`https://localhost:7086/api/LaoDongLop/${selectedItem.MaLDLop}`, data)
        .then(() => {
          const updatedLaoDongLop = laodonglop.map((item) =>
            item.MaLDLop === selectedItem.MaLDLop ? { ...item, ...data } : item
          );
          setLaoDongLop(updatedLaoDongLop);
          setFilteredLaoDongLop(updatedLaoDongLop.filter(filterFunction));
          setSelectedItem(null);
          setModalVisible(false);
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi cập nhật dữ liệu:", error);
        });
    } else {
      // Tạo mới dữ liệu
      axios.post("https://localhost:7086/api/LaoDongLop", data)
        .then((response) => {
          setLaoDongLop([...laodonglop, response.data]);
          setFilteredLaoDongLop([...filteredLaoDongLop, response.data]);
          setModalVisible(false);
        })
        .catch(error => {
          console.error("Có lỗi xảy ra khi thêm mới dữ liệu:", error);
        });
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
  
    // Lọc ngay lập tức theo ngày và buổi khi thay đổi
    const filtered = laodonglop.filter(filterFunction);
    setFilteredLaoDongLop(filtered);
  };  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('vi-VN', options);
    
    // Lấy thứ trong tuần
    const dayOfWeek = daysOfWeek[date.getDay()];
    
    // Trả về ngày theo định dạng "Thứ <x> - dd/mm/yyyy"
    return `${dayOfWeek} - ${formattedDate}`;
  };  
  
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString || isNaN(Date.parse(dateTimeString))) {
      return ""; // Trả về rỗng nếu giá trị không hợp lệ
    }
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString("vi-VN", options);
  };  

  return (
    <div className="row mb-3">
      <div className="col-md-3">
        <label htmlFor="filterDate" className="form-label">Chọn ngày</label>
        <select id="filterDate" className="form-select" onChange={(e) => handleFilterChange(e, 'date')}>
          <option value="">Tất cả</option>
          {availableDates.map((date, index) => (
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

      <LDLopList data={filteredLaoDongLop} onEdit={handleEdit} onDelete={handleDelete} />

      {modalVisible && (
        <LDLopModal title="Chỉnh sửa thông tin" isVisible={modalVisible} onClose={handleCancel}>
          <LDLopForm selectedItem={selectedItem} onSave={handleSave} onCancel={handleCancel} />
        </LDLopModal>
      )}
    </div>
  );
};

export default LDLopManager;
