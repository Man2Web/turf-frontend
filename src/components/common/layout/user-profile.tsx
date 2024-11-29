import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { useAppContext } from "../../../context/app-context";
import Loader from "../loader/Loader";

export const UserProfileHeader = () => {
  const { setUserLocation } = useAppContext();
  const { setLoading } = useAppContext();
  const navigate = useNavigate();
  const routes = all_routes;

  const logout = () => {
    try {
      setLoading({ status: true, description: "Logging Out..." });
      localStorage.clear();
      setUserLocation(null);
      setTimeout(() => {
        navigate(routes.home);
      }, 1000);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Logging Out..." });
    }
  };

  const profilePage = () => {
    if (localStorage.getItem("userId")) {
      return routes.userProfile;
    } else if (localStorage.getItem("adminId")) {
      return routes.adminProfile;
    } else {
      return routes.SuperAdminDashboard;
    }
  };

  return (
    <div className="dropdown dropdown-action table-drop-action btn btn-primary">
      <Link
        to="#"
        className="action-item dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="feather-user" />
      </Link>
      <div className="dropdown-menu dropdown-menu-end">
        <Link className="dropdown-item" to={profilePage()}>
          <i className="feather-user-x" />
          Profile
        </Link>
        <Link
          className="dropdown-item"
          to="#"
          onClick={() => {
            logout();
          }}
        >
          <i className="feather-log-out" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default UserProfileHeader;
