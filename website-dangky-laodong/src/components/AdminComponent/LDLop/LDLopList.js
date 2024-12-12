import React, { useState } from 'react';
import LDLopModal from './LDLopModal';

const LDLopList = ({ data, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedRow.id);
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  // Nhóm dữ liệu theo Ngày và Buổi
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.ngayLaoDong]) {
      acc[item.ngayLaoDong] = {};
    }
    if (!acc[item.ngayLaoDong][item.buoiLaoDong]) {
      acc[item.ngayLaoDong][item.buoiLaoDong] = [];
    }
    acc[item.ngayLaoDong][item.buoiLaoDong].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Thứ - Ngày</th>
              <th>Buổi</th>
              <th>Tên lớp</th>
              <th>Người đăng ký</th>
              <th>Số điện thoại</th>
              <th>Thời gian đăng ký</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).length > 0 ? (
              Object.entries(groupedData).map(([ngayLaoDong, sessions], groupIndex) =>
                Object.entries(sessions).map(([buoiLaoDong, rows], sessionIndex) =>
                  rows.map((row, rowIndex) => (
                    <tr key={`${groupIndex}-${sessionIndex}-${rowIndex}`}>
                      {rowIndex === 0 && sessionIndex === 0 && (
                        <td rowSpan={Object.values(sessions).flat().length}>
                          {ngayLaoDong}
                        </td>
                      )}
                      {rowIndex === 0 && (
                        <td rowSpan={rows.length}>{buoiLaoDong}</td>
                      )}
                      <td>{row.tenLop}</td>
                      <td>{row.tenNguoiDung}</td>
                      <td>{row.soDienThoai}</td>
                      <td>{row.thoiGianDangKy}</td>
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
                  ))
                )
              )
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Không có dữ liệu để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal xác nhận xóa */}
      <LDLopModal
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
      </LDLopModal>
    </>
  );
};

export default LDLopList;
