import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../../context/SearchContext";
import LopList from "./LopList";
import LopForm from "./LopForm";
import LopModal from "./LopModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx';

const LopManager = () => {
  const [lop, setLop] = useState([]);
  const [khoas, setKhoas] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { searchTerm } = useContext(SearchContext);

  const fetchData = async () => {
    try {
      const [lopResponse, khoaResponse] = await Promise.all([
        axios.get('https://localhost:7086/api/Lop'),
        axios.get('https://localhost:7086/api/Khoa'),
      ]);

      const khoaMap = khoaResponse.data.reduce((acc, khoa) => {
        acc[khoa.maKhoa] = khoa.tenKhoa;
        return acc;
      }, {});

      const formattedData = lopResponse.data.map((item) => ({
        ...item,
        tenKhoa: khoaMap[item.maKhoa] || "",
      }));

      setLop(formattedData);
      setKhoas(khoaResponse.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportExcel = () => {
    if (!lop || lop.length === 0) {
      toast.error("Không có dữ liệu để xuất!");
      return;
    }
      
    // Dữ liệu bạn muốn xuất
    const dataToExport = lop.map((item) => ({
      "Mã lớp": item.maLop,
      "Tên lớp": item.tenLop,
      "Tên khoa": item.tenKhoa,
    }));
      
    // Tạo bảng tính Excel
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Lớp");
      
    // Đặt tên file
    const fileName = "Lớp.xlsx";
      
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
  //       tenLop: item["Tên lớp"],
  //     }));

  //     // Gửi dữ liệu lên backend
  //     axios.post("https://localhost:7086/api/Lop/BulkInsert", newLopData)
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
    return axios.delete(`https://localhost:7086/api/Lop/${id}`)
      .then(() => {
        setLop(lop.filter(item => item.maLop !== id));
        toast.success("Xóa lớp thành công!");
      })
      .catch(error => {
        toast.error("Có lỗi xảy ra khi xóa lớp!");
      });
  };

  const handleSave = (data) => {
    const isDuplicate = lop.some(
      (item) => item.tenLop.toLowerCase() === data.tenLop.toLowerCase() && 
                (!editingData || item.maLop !== editingData.maLop)
    );
  
    if (isDuplicate) {
      toast.error("Lớp đã tồn tại, vui lòng chọn tên khác!");
      return;
    }
  
    if (editingData) {
      axios
        .put(`https://localhost:7086/api/Lop/${editingData.maLop}`, {
          maLop: editingData.maLop,
          tenLop: data.tenLop,
          maKhoa: data.maKhoa,
        })
        .then(() => {
          toast.success("Cập nhật lớp thành công!");
          fetchData();
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi cập nhật lớp!");
        });
    } else {
      // Thêm mới lớp
      axios
        .post("https://localhost:7086/api/Lop", data)
        .then(() => {
          toast.success("Thêm mới lớp thành công!");
          fetchData();
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi thêm lớp!");
        });
    }
  };  

  const handleCancel = () => {
    setEditingData(null);
    setModalVisible(false);
  };

  const filteredData = lop.filter((item) => {
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
        <h5>QUẢN LÝ LỚP</h5>
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
            Thêm lớp
          </button>
        </div>
      </div>
      <hr />

      <div className="row mb-3">
        <LopList data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />

        {modalVisible && (
          <LopModal title={editingData ? "Chỉnh sửa thông tin" : "Thêm lớp"} isVisible={modalVisible} onClose={handleCancel}>
            <LopForm
              selectedItem={editingData}
              onSave={handleSave}
              onCancel={handleCancel}
              khoas={khoas}
            />
          </LopModal>
        )}
      </div>
    </div>
  );
};

export default LopManager;
