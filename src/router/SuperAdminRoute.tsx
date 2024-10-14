import React from "react";
import { Navigate } from "react-router-dom";
import { all_routes } from "./all_routes";

const SuperAdminRoute = ({ element }: { element: JSX.Element }) => {
  const route = all_routes;
  const isAuthenticated = !!localStorage.getItem("superAdminToken"); // Check if the token exists

  return isAuthenticated ? element : <Navigate to={route.superAdminLogin} />;
};

export default SuperAdminRoute;
