import React from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const AdminMenuComponent = () => {
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
                    to={routes.adminDashboard}
                    className={
                      location.pathname === routes.adminDashboard
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
                    to={routes.allCourt}
                    className={
                      location.pathname === routes.allCourt ? "active" : ""
                    }
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/court-icon.svg"
                      alt="Icon"
                    />
                    <span> Courts</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.bookingCompleted}
                    className={
                      location.pathname === routes.bookingCompleted
                        ? "active"
                        : ""
                    }
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/booking-icon.svg"
                      alt="Icon"
                    />
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === routes.adminProfile ? "active" : ""
                    }
                    to={routes.adminProfile}
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/profile-icon.svg"
                      alt="Icon"
                    />
                    <span>Profile Setting</span>
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

export default AdminMenuComponent;
