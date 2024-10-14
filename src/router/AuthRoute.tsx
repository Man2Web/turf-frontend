import React from "react";
import { Navigate } from "react-router-dom";
import { all_routes } from "./all_routes";

const AuthRoute = ({ element }: { element: JSX.Element }) => {
  const routes = all_routes;
  const adminId = localStorage.getItem("adminId");
  return adminId ? <Navigate to={routes.adminDashboard} /> : element;
};

export default AuthRoute;
