import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" />;
  }
  if (location.pathname === "/some-non-existing-path") {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PrivateRoute;
