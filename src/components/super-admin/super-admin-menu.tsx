import React from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const SuperAdminMenu = () => {
  const routes = all_routes;
  const location = useLocation();

  return (
    <div className="dashboard-section coach-dash-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-menu coaurt-menu-dash">
              <ul>
                <li>
                  <Link
                    to={routes.SuperAdminDashboard}
                    className={
                      location.pathname === routes.SuperAdminDashboard
                        ? "active"
                        : ""
                    }
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/dashboard-icon.svg"
                      alt="Icon"
                    />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.superAdminCouponsPage}
                    className={
                      location.pathname === routes.superAdminCouponsPage
                        ? "active"
                        : ""
                    }
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/invoice-icon.svg"
                      alt="Icon"
                    />
                    <span>Coupon Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminMenu;
