import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true); // Trạng thái để chờ kiểm tra user

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Cập nhật `user` từ localStorage
      }
    }
    setIsChecking(false); // Hoàn tất kiểm tra
  }, [user, setUser]);

  if (isChecking) {
    return <div>Loading...</div>; // Hiển thị trạng thái chờ
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && !requiredRole.includes(user.vaiTro)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
