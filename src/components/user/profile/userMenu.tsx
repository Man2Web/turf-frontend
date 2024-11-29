import React from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";

const UserMenuComponent = () => {
  const routes = all_routes;
  const location = useLocation();

  return (
    <div className="dashboard-section coach-dash-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-menu coaurt-menu-dash">
              <ul>
                {/* <li>
                  <Link
                    to={routes.userDashboard}
                    className={
                      location.pathname === routes.userDashboard ? "active" : ""
                    }
                  >
                    <ImageWithBasePath
                      src="assets/img/icons/dashboard-icon.svg"
                      alt="Icon"
                    />
                    <span>Dashboard</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to={routes.userBookingsPage}
                    className={
                      location.pathname === routes.userBookingsPage
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
                      location.pathname === routes.userProfile ? "active" : ""
                    }
                    to={routes.userProfile}
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

export default UserMenuComponent;
