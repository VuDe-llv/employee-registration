import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import LDCaNhanModal from './LDCaNhanModal';

const LDCaNhanList = ({ data, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const handleDeleteClick = (item) => {
    setDeleteData(item);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteData) {
      onDelete(deleteData);
      setDeleteData(null);
      setIsModalVisible(false);
    }
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
              <th>Khu vực phân công</th>
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
                      <td>{row.tenKhuVuc}</td>
                      <td>
                        {/* <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm me-2"
                          data-tooltip-id="info-tooltip"
                          data-tooltip-content="Chi tiết"
                          onClick={() => onEdit(row)}
                        >
                          <i className="fas fa-circle-info"></i>
                        </button> */}
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          data-tooltip-id="edit-tooltip"
                          data-tooltip-content="Chỉnh sửa"
                          onClick={() => onEdit(row)}
                        >
                          <i className="fas fa-pen"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-2"
                          data-tooltip-id="delete-tooltip"
                          data-tooltip-content="Xóa"
                          onClick={() => handleDeleteClick(row)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <Tooltip id="info-tooltip" place="right" />
                        <Tooltip id="edit-tooltip" place="right" />
                        <Tooltip id="delete-tooltip" place="right" />
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
      <LDCaNhanModal
        title="Xác nhận xóa dữ liệu"
        isVisible={isModalVisible}
        onClose={handleCancelDelete}
      >
        <p>Bạn có chắc chắn muốn xóa thông tin này không ? Thông tin sẽ được đặt lại về trạng thái ban đầu.</p>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary btn-sm me-2"
            onClick={handleCancelDelete}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
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
