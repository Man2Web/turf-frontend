import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import ReactApexChart from "react-apexcharts";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../../router/all_routes";
import AdminMenuComponent from "../../components/admin/adminMenu";
import { citiesList } from "../../utils/citiesList";
import LocationDataModal from "../../components/common/location-data-modal";
import StatsCardComponent from "../../components/super-admin/stats-card";
import CourtsDataComponent from "../../components/super-admin/courts-data-component";
import { UserLocationContext } from "../..";
import SuperAdminMenu from "../../components/super-admin/super-admin-menu";

const SuperAdminDashboard = () => {
  const routes = all_routes;

  const locationContext = useContext(UserLocationContext);

  if (!locationContext) {
    throw new Error("Error getting user location");
  }

  const { userLocationInContext } = locationContext;

  return (
    <div>
      {!userLocationInContext && <LocationDataModal />}
      {/* Dashboard Menu */}
      <SuperAdminMenu />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content court-bg">
        <div className="container">
          {/* Statistics Card */}
          <StatsCardComponent />
          {/* /Statistics Card */}
        </div>
        {/* Data Card */}
        <CourtsDataComponent />
        {/* /Data Card */}
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default SuperAdminDashboard;
