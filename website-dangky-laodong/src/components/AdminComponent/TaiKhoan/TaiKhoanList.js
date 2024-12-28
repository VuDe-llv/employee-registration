import React, { useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import TaiKhoanModal from './TaiKhoanModal';

const TaiKhoanList = ({ data, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const mapRoleToDisplayName = {
    user: "Người dùng",
    represent: "Cán bộ lớp",
    admin: "Quản trị viên"
  };
  
  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedRow.maNguoiDung)
    .then(() => {
      setIsModalVisible(false);
    })
    .catch(error => {
      toast.error("Có lỗi xảy ra khi xóa tài khoản!");
    });
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Họ và Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Lớp</th>
              <th>Vai trò</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.maNguoiDung}>
                <td>{row.tenNguoiDung}</td>
                <td>{row.soDienThoai}</td>
                <td>{row.email}</td>
                <td>{row.tenLop}</td>
                <td>{mapRoleToDisplayName[row.vaiTro] || "Không xác định"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm me-2"
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Chỉnh sửa"
                    onClick={() => onEdit(row)}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    data-tooltip-id="delete-tooltip"
                    data-tooltip-content="Xóa"
                    onClick={() => handleDeleteClick(row)}
                    disabled={row.vaiTro === "admin"}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <Tooltip id="info-tooltip" place="right" />
                  <Tooltip id="edit-tooltip" place="right" />
                  <Tooltip id="delete-tooltip" place="right" />
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  Không có dữ liệu để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TaiKhoanModal
        title="Xác nhận xóa"
        isVisible={isModalVisible}
        onClose={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handleCancelDelete}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirmDelete}
          >
            Xác nhận
          </button>
        </div>
      </TaiKhoanModal>
    </>
  );
};

export default TaiKhoanList;