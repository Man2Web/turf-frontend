import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { Avatar } from "primereact/avatar";
import { UserLocationContext } from "../..";

export const UserProfileHeader = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  const context = useContext(UserLocationContext);

  if (!context) {
    throw new Error("Error getting user Location");
  }

  const { setUserLocationInContext } = context;

  const logout = () => {
    navigate(routes.home);
    localStorage.clear();
    setUserLocationInContext(null);
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
        <Link className="dropdown-item" to="#" onClick={() => logout()}>
          <i className="feather-log-out" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default UserProfileHeader;
