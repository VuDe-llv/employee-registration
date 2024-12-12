import React, { useState, useEffect } from "react";
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
  
        const formattedData = laoDongLopResponse.data.map(item => ({
          ...item,
          tenNguoiDung: nguoiDungMap[item.maNguoiDung]?.tenNguoiDung || "N/A",
          soDienThoai: nguoiDungMap[item.maNguoiDung]?.soDienThoai || "N/A",
          tenLop: lopMap[item.maLop] || "N/A",
          ngayLaoDong: formatDate(item.ngayLaoDong),
          thoiGianDangKy: formatDateTime(item.thoiGianDangKy),
        }));        
  
        setLaoDongLop(formattedData);
        setFilteredLaoDongLop(formattedData);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    };
  
    fetchData();
  }, []);  

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

  const filterFunction = (item) => {
    const matchesDate = filters.date ? item.ngayLaoDong === filters.date : true;
    const matchesSession = filters.session ? item.buoiLaoDong === filters.session : true;
    return matchesDate && matchesSession;
  };

  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setFilteredLaoDongLop(laodonglop.filter(filterFunction));
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };
  
  const formatDateTime = (dateTimeString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateTimeString).toLocaleString('vi-VN', options);
  };  

  return (
    <div className="row mb-3">
      <div className="col-md-3">
        <label htmlFor="filterDate" className="form-label">Chọn ngày</label>
        <select id="filterDate" className="form-select" onChange={(e) => handleFilterChange(e, 'date')}>
          <option value="">Tất cả</option>
          {/* Thêm các ngày có sẵn */}
          <option value="28/10/2024">28/10/2024</option>
          <option value="29/10/2024">29/10/2024</option>
          <option value="30/10/2024">30/10/2024</option>
          <option value="31/10/2024">31/10/2024</option>
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="filterSession" className="form-label">Chọn buổi</label>
        <select id="filterSession" className="form-select" onChange={(e) => handleFilterChange(e, 'session')}>
          <option value="">Tất cả</option>
          <option value="Sáng">Sáng</option>
          <option value="Chiều">Chiều</option>
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
