import React, { useState } from "react";
import LDCaNhanList from "./LDCaNhanList";
import LDCaNhanForm from "./LDCaNhanForm";
import LDCaNhanModal from "./LDCaNhanModal";

const LDCaNhanManager = () => {
  const [categories, setCategories] = useState([
        { id: 1, date: '28/10/2024', session: 'Sáng', className: 'ĐHGDTH23G', name: 'Hà Hoàng Mỹ', phone: '0365634775', registrationTime: '19/10/2024 19:00:45' },
        { id: 2, date: '28/10/2024', session: 'Sáng', className: 'ĐHGDTH23H', name: 'Nguyễn Minh Tuấn', phone: '0375634786', registrationTime: '20/10/2024 12:30:45' },
        { id: 3, date: '28/10/2024', session: 'Sáng', className: 'ĐHGDTH24A', name: 'Trần Thị Lan', phone: '0395634797', registrationTime: '21/10/2024 08:15:30' },
        { id: 4, date: '28/10/2024', session: 'Sáng', className: 'ĐHGDTH24B', name: 'Phan Thị Lệ', phone: '0385634708', registrationTime: '22/10/2024 16:45:20' },
        { id: 5, date: '28/10/2024', session: 'Chiều', className: 'ĐHGDTH24C', name: 'Nguyễn Hữu Thắng', phone: '0375634799', registrationTime: '23/10/2024 10:00:00' },
        { id: 6, date: '28/10/2024', session: 'Chiều', className: 'ĐHGDTH24D', name: 'Lê Minh Sơn', phone: '0365634788', registrationTime: '24/10/2024 14:20:10' },
        { id: 7, date: '28/10/2024', session: 'Chiều', className: 'ĐHGDTH25A', name: 'Đặng Thị Hương', phone: '0355634777', registrationTime: '25/10/2024 09:00:00' },
        { id: 8, date: '28/10/2024', session: 'Chiều', className: 'ĐHGDTH25B', name: 'Bùi Hoàng Anh', phone: '0375634788', registrationTime: '26/10/2024 11:00:00' },
        { id: 9, date: '29/10/2024', session: 'Sáng', className: 'ĐHGDTH25C', name: 'Hoàng Minh Quân', phone: '0395634796', registrationTime: '27/10/2024 13:30:30' },
        { id: 10, date: '29/10/2024', session: 'Sáng', className: 'ĐHGDTH25D', name: 'Trần Hoài Nam', phone: '0385634797', registrationTime: '28/10/2024 15:00:10' }
  ]);

  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({ date: "", session: "" });

  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    setFilteredCategories(filteredCategories.filter((category) => category.id !== id));
  };

  const handleSave = (data) => {
    if (selectedItem) {
      const updatedCategories = categories.map((item) =>
        item.id === selectedItem.id ? { ...item, ...data } : item
      );
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories.filter(filterFunction));
    } else {
      const newItem = { ...data, id: categories.length + 1 };
      const updatedCategories = [...categories, newItem];
      setCategories(updatedCategories);
      setFilteredCategories(updatedCategories.filter(filterFunction));
    }
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const filterFunction = (item) => {
    const matchesDate = filters.date ? item.date === filters.date : true;
    const matchesSession = filters.session ? item.session === filters.session : true;
    return matchesDate && matchesSession;
  };

  // Handle filter changes
  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setFilteredCategories(categories.filter(filterFunction));
  };

  return (
    <div className="row mb-3">
      <div className="col-md-3">
        <label htmlFor="filterDate" className="form-label">
          Chọn ngày
        </label>
        <div className="select-container">
          <select
            id="filterDate"
            className="form-select"
            onChange={(e) => handleFilterChange(e, 'date')}
          >
            <option value="">Tất cả</option>
            <option value="28/10/2024">28/10/2024</option>
            <option value="29/10/2024">29/10/2024</option>
            <option value="30/10/2024">30/10/2024</option>
            <option value="31/10/2024">31/10/2024</option>
            <option value="01/10/2024">01/10/2024</option>
            <option value="02/10/2024">02/10/2024</option>
          </select>
        </div>
      </div>

      <div className="col-md-3">
        <label htmlFor="filterSession" className="form-label">
          Chọn buổi
        </label>
        <div className="select-container">
          <select
            id="filterSession"
            className="form-select"
            onChange={(e) => handleFilterChange(e, 'session')}
          >
            <option value="">Tất cả</option>
            <option value="Sáng">Sáng</option>
            <option value="Chiều">Chiều</option>
          </select>
        </div>
      </div>

      <LDCaNhanList
        data={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalVisible && (
        <LDCaNhanModal
        title="Chỉnh sửa thông tin"
        isVisible={modalVisible}
        onClose={handleCancel}
      >
        <LDCaNhanForm
          selectedItem={selectedItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </LDCaNhanModal>      
      )}
    </div>
  );
};

export default LDCaNhanManager;
