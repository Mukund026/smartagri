import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, userRole }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
