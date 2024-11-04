import React from "react";
import { Navigate } from "react-router-dom";
import { all_routes } from "./all_routes";

const PrivateAdminRoute = ({ element }: { element: JSX.Element }) => {
  const route = all_routes;
  const isAuthenticated = !!localStorage.getItem("adminToken"); // Check if the token exists
  console.log(isAuthenticated);
  console.log(localStorage.getItem("adminToken"));
  return isAuthenticated ? element : <Navigate to={route.login} />;
};

export default PrivateAdminRoute;
