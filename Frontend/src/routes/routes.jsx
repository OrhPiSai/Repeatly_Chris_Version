import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../api/userApi";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Project from "../pages/Projects/Project";
import Cycle from "../pages/Cycles/Cycle";
import ForgetPassword from "../pages/Login/ForgetPassword";
import ChangePassword from "../pages/Login/ChangePassword";
import PasswordResetConfirmation from "../pages/Login/PasswordResetConfirmation";

/** Protected Route Wrapper */
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        await getUserProfile(); // Fetch user data
        setIsAuthenticated(true);
      } catch (error) {
        console.error("User not authenticated:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state while checking auth
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/password-reset-confirmation" element={<PasswordResetConfirmation />} />

      {/* Protected Routes (Requires Login) */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Project /></ProtectedRoute>} />
      <Route path="/cycles" element={<ProtectedRoute><Cycle /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;
