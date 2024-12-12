import React, { useState } from 'react';
import LDCaNhanModal from './LDCaNhanModal';

const LDCaNhanList = ({ data, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedRow.id); // Thực hiện xóa
    setIsModalVisible(false); // Đóng modal
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false); // Đóng modal
  };

  return (
    <>
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Buổi</th>
              <th>Tên lớp</th>
              <th>Người đăng ký</th>
              <th>Số điện thoại</th>
              <th>Thời gian đăng ký</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.session}</td>
                <td>{row.className}</td>
                <td>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.registrationTime}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEdit(row)}
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteClick(row)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal xác nhận xóa */}
      <LDCaNhanModal
        title="Xác nhận xóa"
        isVisible={isModalVisible}
        onClose={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa lớp học này không?</p>
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
      </LDCaNhanModal>
    </>
  );
};

export default LDCaNhanList;