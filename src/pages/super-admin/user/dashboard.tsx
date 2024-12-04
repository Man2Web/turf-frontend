import React from "react";
import { all_routes } from "../../../router/all_routes";
import LocationDataModal from "../../../components/common/modal/location-data-modal";
import StatsCardComponent from "../../../components/super-admin/stats-card";
import CourtsDataComponent from "../../../components/super-admin/coupons/courts-data-component";
import SuperAdminMenu from "../../../components/super-admin/profile/super-admin-menu";
import { useAppContext } from "../../../context/app-context";

const SuperAdminDashboard = () => {
  const { userLocation } = useAppContext();

  return (
    <div>
      {!userLocation && <LocationDataModal />}
      <SuperAdminMenu />
      <div className="content court-bg">
        {/* <div className="container">
          <StatsCardComponent />
        </div> */}
        <CourtsDataComponent />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
