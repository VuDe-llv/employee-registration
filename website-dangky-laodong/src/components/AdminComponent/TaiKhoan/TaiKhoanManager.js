import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../../context/SearchContext";
import TaiKhoanList from "./TaiKhoanList";
import TaiKhoanForm from "./TaiKhoanForm";
import TaiKhoanModal from "./TaiKhoanModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaiKhoanManager = () => {
  const [nguoidung, setNguoiDung] = useState([]);
  const [lops, setLops] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { searchTerm } = useContext(SearchContext);

  const fetchData = async () => {
    try {
      const [nguoidungResponse, lopResponse] = await Promise.all([
        axios.get('https://localhost:7086/api/NguoiDung'),
        axios.get('https://localhost:7086/api/Lop'),
      ]);

      const lopMap = lopResponse.data.reduce((acc, lop) => {
        acc[lop.maLop] = lop.tenLop;
        return acc;
      }, {});

      const formattedData = nguoidungResponse.data.map((item) => ({
        ...item,
        tenLop: lopMap[item.maLop] || "",
      }));

      setNguoiDung(formattedData);
      setLops(lopResponse.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingData(item);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    return axios.delete(`https://localhost:7086/api/NguoiDung/${id}`)
      .then(() => {
        setNguoiDung(nguoidung.filter(item => item.maNguoiDung !== id));
        toast.success("Xóa người dùng thành công!");
      })
      .catch(error => {
        toast.error("Có lỗi xảy ra khi xóa người dùng!");
      });
  };

  const handleSave = (data) => {
    // Kiểm tra định dạng mã tài khoản
    const isValidMaNguoiDung = /^\d+$/.test(data.maNguoiDung);
    if (!isValidMaNguoiDung) {
      toast.error("Mã tài khoản không hợp lệ!");
      return;
    }

    // Kiểm tra định dạng số điện thoại
    const isValidSoDienThoai = /^\d{10}$/.test(data.soDienThoai);
    if (!isValidSoDienThoai) {
      toast.error("Số điện thoại không hợp lệ!");
      return;
    }

    // Kiểm tra trùng mã tài khoản
    const isDuplicateMaNguoiDung = nguoidung.some(
    (item) => item.maNguoiDung.toLowerCase() === data.maNguoiDung.toLowerCase() &&
              (!editingData || item.maNguoiDung !== editingData.maNguoiDung)
    );

    if (isDuplicateMaNguoiDung) {
      toast.error("Mã tài khoản đã tồn tại!");
      return;
    }

    // Kiểm tra trùng số điện thoại
    const isDuplicateSoDienThoai = nguoidung.some(
      (item) => item.soDienThoai.toLowerCase() === data.soDienThoai.toLowerCase() &&
                (!editingData || item.maNguoiDung !== editingData.maNguoiDung)
    );

    if (isDuplicateSoDienThoai) {
      toast.error("Số điện thoại đã tồn tại!");
      return;
    }

    // Kiểm tra trùng email
    const isDuplicateEmail = nguoidung.some(
      (item) => item.email.toLowerCase() === data.email.toLowerCase() &&
                (!editingData || item.maNguoiDung !== editingData.maNguoiDung)
    );

    if (isDuplicateEmail) {
      toast.error("Email đã tồn tại!");
      return;
    }
  
    const payload = {
      ...data,
      matKhau: data.maNguoiDung
    };
  
    if (editingData) {
      axios
        .put(`https://localhost:7086/api/NguoiDung/${editingData.maNguoiDung}`, payload)
        .then(() => {
          toast.success("Cập nhật tài khoản thành công!");
          fetchData();
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi cập nhật tài khoản!");
        });
    } else {
      axios
        .post("https://localhost:7086/api/NguoiDung", payload)
        .then(() => {
          toast.success("Thêm mới tài khoản thành công!");
          fetchData();
          setModalVisible(false);
        })
        .catch((error) => {
          console.error(error.response?.data || "Có lỗi xảy ra!");
          toast.error("Có lỗi xảy ra khi thêm tài khoản!");
        });
    }
  };  

  const handleCancel = () => {
    setEditingData(null);
    setModalVisible(false);
  };

  const roleMapping = {
    admin: "Quản trị viên",
    user: "Người dùng",
    represent: "Cán bộ lớp",
  };
  
  const filteredData = nguoidung.filter((item) => {
    const mappedItem = { ...item, vaiTro: roleMapping[item.vaiTro] || item.vaiTro };
    const matchesSearchTerm = searchTerm
      ? Object.values(mappedItem).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    return matchesSearchTerm;
  });
  
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>QUẢN LÝ TÀI KHOẢN</h5>
        <button
          className="btn btn-success btn-sm"
          onClick={() => setModalVisible(true)}
        >
          Thêm tài khoản
        </button>
      </div>
      <hr />

      <div className="row mb-3">
        <TaiKhoanList data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />

        {modalVisible && (
          <TaiKhoanModal title={editingData ? "Chỉnh sửa thông tin" : "Thêm tài khoản"} isVisible={modalVisible} onClose={handleCancel}>
            <TaiKhoanForm
              selectedItem={editingData}
              onSave={handleSave}
              onCancel={handleCancel}
              lops={lops}
            />
          </TaiKhoanModal>
        )}
      </div>
    </div>
  );
};

export default TaiKhoanManager;
