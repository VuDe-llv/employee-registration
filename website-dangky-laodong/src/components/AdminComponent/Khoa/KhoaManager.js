import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../../context/SearchContext";
import KhoaList from "./KhoaList";
import KhoaForm from "./KhoaForm";
import KhoaModal from "./KhoaModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx';

const KhoaManager = () => {
  const [khoa, setKhoa] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { searchTerm } = useContext(SearchContext);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7086/api/Khoa');
      setKhoa(response.data);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lấy dữ liệu!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportExcel = () => {
    if (!khoa || khoa.length === 0) {
      toast.error("Không có dữ liệu để xuất!");
      return;
    }
    
    // Dữ liệu bạn muốn xuất
    const dataToExport = khoa.map((item) => ({
      "Mã khoa": item.maKhoa,
      "Tên khoa": item.tenKhoa,
    }));
    
    // Tạo bảng tính Excel
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Khoa");
    
    // Đặt tên file
    const fileName = "Khoa.xlsx";
    
    // Xuất file Excel
    XLSX.writeFile(wb, fileName);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const data = new Uint8Array(event.target.result);
  //     const workbook = XLSX.read(data, { type: "array" });
  //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //     const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //     // Cấu trúc dữ liệu cần khớp với backend
  //     const newLopData = jsonData.map((item) => ({
  //       tenLop: item["Tên Khoa"],
  //     }));

  //     // Gửi dữ liệu lên backend
  //     axios.post("https://localhost:7086/api/Kho/BulkInsert", newLopData)
  //       .then(() => {
  //         toast.success("Nhập dữ liệu thành công!");
  //         fetchData();
  //       })
  //       .catch((error) => {
  //         console.error("Có lỗi xảy ra:", error);
  //         toast.error("Có lỗi xảy ra khi nhập dữ liệu!");
  //       });
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  const handleEdit = (item) => {
    setEditingData(item);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    return axios.delete(`https://localhost:7086/api/Khoa/${id}`)
      .then(() => {
        setKhoa(khoa.filter(item => item.maKhoa !== id));
        toast.success("Xóa khoa thành công!");
      })
      .catch(error => {
        toast.error("Có lỗi xảy ra khi xóa khoa!");
      });
  };

  const handleSave = (data) => {
    const isDuplicate = khoa.some(
      (item) => item.tenKhoa.toLowerCase() === data.tenKhoa.toLowerCase() && 
                (!editingData || item.maKhoa !== editingData.maKhoa)
    );
      
    if (isDuplicate) {
      toast.error("Khoa đã tồn tại, vui lòng nhập tên khác!");
      return;
    }

    if (editingData) {
      // Cập nhật khoa
      axios
        .put(`https://localhost:7086/api/Khoa/${editingData.maKhoa}`, {
          maKhoa: editingData.maKhoa,
          tenKhoa: data.tenKhoa,
        })
        .then(() => {
            setKhoa((prevData) =>
            prevData.map((item) =>
              item.maKhoa === editingData.maKhoa ? { ...item, ...data } : item
            )
          );
          toast.success("Cập nhật khoa thành công!");
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi cập nhật khoa!");
        });
    } else {
      // Thêm mới khoa
      axios
        .post("https://localhost:7086/api/Khoa", data)
        .then((response) => {
            setKhoa([...khoa, response.data]);
          toast.success("Thêm mới khoa thành công!");
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi thêm khoa!");
        });
    }
  };
  
  const handleCancel = () => {
    setEditingData(null);
    setModalVisible(false);
  };

  const filteredData = khoa.filter((item) => {
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
        <h5>QUẢN LÝ KHOA</h5>
        <div>
          {/* <label className="btn btn-outline-primary btn-sm me-2">
          <i className="fas fa-file-excel"></i> Nhập File
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label> */}
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
            Thêm khoa
          </button>
        </div>
      </div>
      <hr />

      <div className="row mb-3">
        <KhoaList
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {modalVisible && (
          <KhoaModal title={editingData ? "Chỉnh sửa thông tin" : "Thêm khoa"} isVisible={modalVisible} onClose={handleCancel}>
            <KhoaForm
              selectedItem={editingData}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </KhoaModal>
        )}
      </div>
    </div>
  );
};
export default KhoaManager;
