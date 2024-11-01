import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../../../router/all_routes";
import AdminMenuComponent from "../../../components/admin/profile/adminMenu";
import AdminProfileForm from "../../../components/admin/profile/admin-profile-form";
import ChangePasswordComponent from "../../../components/common/auth/change-password";
import PaymentSettingsForm from "../../../components/admin/profile/payment-settings-form";
import UserMenuComponent from "../../../components/user/profile/userMenu";
import UserProfileForm from "../../../components/user/profile/user-profile-form";

const UserProfile = () => {
  const routes = all_routes;
  const location = useLocation();
  const [userSelected, setUserSelected] = useState<number>(0);
  const isLinkActive = (route: string) => {
    // Check if the current location matches the given route
    return location.pathname === route;
  };
  return (
    <div>
      <>
        {/* Dashboard Menu */}
        <UserMenuComponent />
        {/* /Dashboard Menu */}
        {/* Page Content */}
        <div className="content court-bg">
          <div className="container">
            <div className="coach-court-list profile-court-list">
              <ul className="nav">
                <li>
                  <Link
                    onClick={() => setUserSelected(0)}
                    to={"#"}
                    className={userSelected === 0 ? "active" : ""}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setUserSelected(1)}
                    to={"#"}
                    className={userSelected === 1 ? "active" : ""}
                  >
                    Change Password
                  </Link>
                </li>
              </ul>
            </div>
            {userSelected === 0 && <UserProfileForm />}
            {userSelected === 1 && <ChangePasswordComponent />}
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default UserProfile;
