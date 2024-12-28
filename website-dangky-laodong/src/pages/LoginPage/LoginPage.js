import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import { UserContext } from "../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    maNguoiDung: "",
    matKhau: "",
    vaiTro: "",
  });
  
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [showPassword, setShowPassword] = useState(false); // Hiển thị mật khẩu hay không
  const navigate = useNavigate(); // Sử dụng để điều hướng
  const { setUser } = React.useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("https://localhost:7086/api/NguoiDung/login", formData);
      const { user } = response.data;
  
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
  
        if (user.vaiTro === "admin") {
          navigate("/quanlylaodong/lao-dong-ca-nhan");
        } else if (user.vaiTro === "represent" || user.vaiTro === "user") {
          navigate("/dangkylaodong/lao-dong-ca-nhan");
        }
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setError("Tài khoản hoặc mật khẩu không đúng.");
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false); 
    }
  };  

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#e7ecf0",
        position: "relative",
      }}
    >
      <div
        className="main-content"
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "4px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h5 className="text-center mb-3">ĐĂNG NHẬP</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="maNguoiDung">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="maNguoiDung"
              name="maNguoiDung"
              className="form-control"
              value={formData.maNguoiDung}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="matKhau">
              Mật khẩu
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="matKhau"
                name="matKhau"
                className="form-control"
                value={formData.matKhau}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPasswordCheckbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPasswordCheckbox">
                Hiển thị mật khẩu
              </label>
            </div>
          </div>
          {error && <p style={{ color: "#dc3545" }}>{error}</p>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
