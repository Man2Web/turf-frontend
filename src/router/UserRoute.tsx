import React from "react";
import { Navigate } from "react-router-dom";
import { all_routes } from "./all_routes";

const UserAuthRoute = ({ element }: { element: JSX.Element }) => {
  const route = all_routes;
  const isAuthenticated = !!localStorage.getItem("userToken"); // Check if the token exists

  return isAuthenticated ? element : <Navigate to={route.login} />;
};

export default UserAuthRoute;
