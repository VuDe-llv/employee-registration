import React, { useState, useContext } from 'react';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import LDLopModal from "./LDLopModal";
import { UserContext } from "../../../context/UserContext";

const LDLopList = ({ data, onEdit, onDelete }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const { user } = useContext(UserContext);

  const handleDeleteClick = (item) => {
    setDeleteData(item);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteData) {
      onDelete(deleteData);
      setDeleteData(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleViewDetail = (item) => {
    setDetailData(item);
    setIsDetailModalVisible(true);
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

  // Kiểm tra xem tài khoản đã đăng ký buổi nào trong ngày chưa
  const hasRegisteredInSession = (ngayLaoDong, buoiLaoDong) => {
    return data.some(
      (item) =>
        item.ngayLaoDong === ngayLaoDong &&
        item.buoiLaoDong === buoiLaoDong &&
        item.maNguoiDung === user.maNguoiDung &&
        item.trangThai === "Đã đăng ký"
    );
  };

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
                  rows.map((row, rowIndex) => {
                    const isRegisteredByUser =
                      row.maNguoiDung === user.maNguoiDung && row.trangThai === "Đã đăng ký";
                    const isRegisteredInDayAndSession = hasRegisteredInSession(
                      ngayLaoDong,
                      buoiLaoDong
                    );

                    return (
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
                          <button
                            type="button"
                            className="btn btn-outline-info btn-sm"
                            data-tooltip-id="info-tooltip"
                            data-tooltip-content="Xem chi tiết"
                            onClick={() => handleViewDetail(row)}
                          >
                            <i className="fas fa-info-circle"></i>
                          </button>

                          {user.vaiTro !== "user" && (
                            <>
                              {row.trangThai === "Chưa đăng ký" && !isRegisteredInDayAndSession && (
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm ms-2"
                                  data-tooltip-id="edit-tooltip"
                                  data-tooltip-content="Đăng ký"
                                  onClick={() => onEdit(row)}
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              )}

                              {row.trangThai === "Chưa đăng ký" && isRegisteredInDayAndSession && (
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-sm ms-2"
                                  disabled
                                  data-tooltip-id="edit-tooltip"
                                  data-tooltip-content="Đã đăng ký"
                                >
                                  <i className="fas fa-pen"></i>
                                </button>
                              )}

                              {row.trangThai === "Đã đăng ký" &&
                                row.maNguoiDung !== user.maNguoiDung && (
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm ms-2"
                                    disabled
                                    data-tooltip-id="edit-tooltip"
                                    data-tooltip-content="Đăng ký (Bị khóa)"
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                )}

                              {isRegisteredByUser && (
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm ms-2"
                                  data-tooltip-id="delete-tooltip"
                                  data-tooltip-content="Hủy đăng ký"
                                  onClick={() => handleDeleteClick(row)}
                                >
                                  <i className="fas fa-circle-xmark"></i>
                                </button>
                              )}
                            </>
                          )}

                          <Tooltip id="info-tooltip" place="right" />
                          <Tooltip id="edit-tooltip" place="right" />
                          <Tooltip id="delete-tooltip" place="right" />
                        </td>
                      </tr>
                    );
                  })
                )
              )
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Không có dữ liệu để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị chi tiết */}
      {isDetailModalVisible && detailData && (
        <LDLopModal
        title="Chi tiết đăng ký lao động"
        isVisible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
      >
        <table className="table table-bordered">
          <tbody>
            <tr><td><strong>Tên tuần</strong></td><td>{detailData.tenTuan}</td></tr>
            <tr><td><strong>Ngày</strong></td><td>{detailData.ngayLaoDong}</td></tr>
            <tr><td><strong>Buổi</strong></td><td>{detailData.buoiLaoDong}</td></tr>
            <tr><td><strong>Tên lớp</strong></td><td>{detailData.tenLop}</td></tr>
            <tr><td><strong>Người đăng ký</strong></td><td>{detailData.tenNguoiDung}</td></tr>
            <tr><td><strong>Số điện thoại</strong></td><td>{detailData.soDienThoai}</td></tr>
            <tr><td><strong>Thời gian đăng ký</strong></td><td>{detailData.thoiGianDangKy}</td></tr>
            <tr><td><strong>Khu vực phân công</strong></td><td>{detailData.tenKhuVuc}</td></tr>
            <tr><td><strong>Mô tả khu vực</strong></td><td>{detailData.moTaKhuVuc}</td></tr>
            <tr><td><strong>Trạng thái</strong></td><td>{detailData.trangThai}</td></tr>
          </tbody>
        </table>
      </LDLopModal>         
      )}

      {/* Modal xác nhận xóa */}
      <LDLopModal
        title="Xác nhận hủy đăng ký"
        isVisible={isDeleteModalVisible}
        onClose={handleCancelDelete}
      >
        <p>
          Bạn có chắc chắn muốn hủy đăng ký lao động không? Thông tin đăng ký
          của bạn sẽ bị xóa.
        </p>
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
      </LDLopModal>
    </>
  );
};

export default LDLopList;
