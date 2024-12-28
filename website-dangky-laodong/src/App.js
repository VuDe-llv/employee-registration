import React from 'react';
import UserProvider from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import UserLayout from './layouts/UserLayout/UserLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <SearchProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Admin layout */}
          <Route 
            path="/quanlylaodong" 
            element={
              <ProtectedRoute requiredRole={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="lao-dong-ca-nhan" />} />
            <Route path="*" element={<AdminRoutes />} />
          </Route>

          {/* User layout */}
          <Route 
            path="/dangkylaodong" 
            element={
              <ProtectedRoute requiredRole={["admin", "user", "represent"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="lao-dong-ca-nhan" />} />
            <Route path="*" element={<UserRoutes />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          {/* Page not found */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        </SearchProvider>
      </UserProvider>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
    </Router>
  );
}

export default App;
