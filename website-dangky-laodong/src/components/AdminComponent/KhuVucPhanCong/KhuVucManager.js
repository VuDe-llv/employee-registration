import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../../context/SearchContext";
import KhuVucList from "./KhuVucList";
import KhuVucForm from "./KhuVucForm";
import KhuVucModal from "./KhuVucModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx';

const KhuVucManager = () => {
  const [khuvucphancong, setKhuVucPhanCong] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7086/api/KhuVucPhanCong');
        setKhuVucPhanCong(response.data);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi lấy dữ liệu!");
      }
    };
    fetchData();
  }, []);

  const handleExportExcel = () => {
    if (!khuvucphancong || khuvucphancong.length === 0) {
      toast.error("Không có dữ liệu để xuất!");
      return;
    }
  
    // Dữ liệu bạn muốn xuất
    const dataToExport = khuvucphancong.map((item) => ({
      "Mã khu vực": item.maKhuVuc,
      "Tên khu vực": item.tenKhuVuc,
      "Mô tả khu vực": item.moTaKhuVuc,
    }));
  
    // Tạo bảng tính Excel
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Khu vực phân công");
  
    // Đặt tên file
    const fileName = "Khu vực phân công.xlsx";
  
    // Xuất file Excel
    XLSX.writeFile(wb, fileName);
  };  

  const handleEdit = (item) => {
    setEditingData(item);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    return axios.delete(`https://localhost:7086/api/KhuVucPhanCong/${id}`)
      .then(() => {
        setKhuVucPhanCong(khuvucphancong.filter(item => item.maKhuVuc !== id));
        toast.success("Xóa khu vực thành công!");
      })
      .catch(error => {
        toast.error("Có lỗi xảy ra khi xóa khu vực!");
      });
  };

  const handleSave = (data) => {
    if (editingData) {
      // Cập nhật khu vực
      axios
        .put(`https://localhost:7086/api/KhuVucPhanCong/${editingData.maKhuVuc}`, {
          maKhuVuc: editingData.maKhuVuc,
          tenKhuVuc: data.tenKhuVuc,
          moTaKhuVuc: data.moTaKhuVuc,
        })
        .then(() => {
          setKhuVucPhanCong((prevData) =>
            prevData.map((item) =>
              item.maKhuVuc === editingData.maKhuVuc ? { ...item, ...data } : item
            )
          );
          toast.success("Cập nhật khu vực thành công!");
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi cập nhật khu vực!");
        });
    } else {
      // Thêm mới khu vực
      axios
        .post("https://localhost:7086/api/KhuVucPhanCong", data)
        .then((response) => {
          setKhuVucPhanCong([...khuvucphancong, response.data]);
          toast.success("Thêm mới khu vực thành công!");
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi thêm khu vực!");
        });
    }
  };
  
  const handleCancel = () => {
    setEditingData(null);
    setModalVisible(false);
  };

  const filteredData = khuvucphancong.filter((item) => {
    const matchesSearchTerm = searchTerm
      ? Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    return matchesSearchTerm;
  });

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>QUẢN LÝ KHU VỰC PHÂN CÔNG</h5>
        <div>
          <button
            className="btn btn-outline-success btn-sm me-2"
            onClick={handleExportExcel}
          >
            <i className="fas fa-file-excel"></i> Xuất File
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => setModalVisible(true)}
          >
            Thêm khu vực
          </button>
        </div>
      </div>
      <hr />

      <div className="row mb-3">
        <KhuVucList
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {modalVisible && (
          <KhuVucModal title={editingData ? "Chỉnh sửa thông tin" : "Thêm khu vực"} isVisible={modalVisible} onClose={handleCancel}>
            <KhuVucForm
              selectedItem={editingData}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </KhuVucModal>
        )}
      </div>
    </div>
  );
};
export default KhuVucManager;
