import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import UserProfileHeader from "./user-profile";
import {
  adminHeaderData,
  publicHeaderData,
  superHeaderData,
  userHeaderData,
} from "../../../utils/commin-utils/header-data";
import { useAppContext } from "../../../context/app-context";
import LocationDataModal from "../modal/location-data-modal";

const Header = () => {
  const routes = all_routes;
  const location = useLocation();
  const { userLocation, setUserLocation } = useAppContext();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const superAdminLoggedIn = localStorage.getItem("superAdminToken");
  const adminLoggedIn = localStorage.getItem("adminToken");
  const userLoggedIn = localStorage.getItem("userToken");

  useEffect(() => {
    if (userLocation) {
      setUserLocation(userLocation);
    }
  }, [userLocation]);

  const customStyle = {
    background: location.pathname.includes(routes.home)
      ? "rgb(23, 124, 130)"
      : "#ffffff",
  };
  return (
    <>
      {toggleModal && <LocationDataModal />}
      <header
        className={
          location.pathname.includes("#")
            ? "header header-trans"
            : "header header-sticky"
        }
        style={customStyle}
      >
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg header-nav">
            <div className="navbar-header">
              <Link
                onClick={() => {
                  setToggleMenu((prev) => !prev);
                }}
                id="mobile_btn"
                to="#"
              >
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </Link>
              <Link to={routes.home} className="navbar-brand logo">
                {location.pathname.includes("#") ? (
                  <ImageWithBasePath
                    src="assets/img/logo.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                ) : (
                  <ImageWithBasePath
                    src="assets/img/logo-black.svg"
                    className="img-fluid"
                    alt="Another Image"
                  />
                )}
              </Link>
            </div>
            <div
              className={`main-menu-wrapper ${toggleMenu ? "menu-opened" : ""}`}
            >
              <div className="menu-header">
                <Link to={routes.home} className="menu-logo">
                  <ImageWithBasePath
                    src="assets/img/logo-black.svg"
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
                <Link id="menu_close" className="menu-close" to="#">
                  {" "}
                  <i className="fas fa-times" />
                </Link>
              </div>
              <ul className="main-nav">
                {adminLoggedIn &&
                  adminHeaderData.map((mainMenus, mainIndex) => (
                    <React.Fragment key={mainIndex}>
                      {mainMenus.separateRoute && mainMenus.routes ? (
                        <li
                          key={mainIndex}
                          className={
                            location.pathname.includes(mainMenus.routes)
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            style={{ color: "white" }}
                            to={mainMenus.routes}
                          >
                            {mainMenus.tittle}
                          </Link>
                        </li>
                      ) : (
                        <li
                          className={`has-submenu ${mainMenus?.menu?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
                        >
                          <Link style={{ color: "white" }} to="#">
                            {mainMenus.tittle}{" "}
                            <i className="fas fa-chevron-down"></i>
                          </Link>
                          <ul
                            className={`submenu ${mainMenus.showAsTab ? "d-block" : ""}`}
                          >
                            {mainMenus.menu?.map((menu, menuIndex) => (
                              <li
                                key={menuIndex}
                                className={`${menu.hasSubRoute ? "has-submenu" : ""}`}
                              >
                                {menu.hasSubRoute ? (
                                  // We can add subroute logic in here if exists
                                  <></>
                                ) : (
                                  <li
                                    className={
                                      location.pathname.includes(menu.routes)
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link to={menu.routes}>
                                      {menu.menuValue}
                                    </Link>
                                  </li>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                {userLoggedIn &&
                  userHeaderData.map((mainMenus, mainIndex) => (
                    <React.Fragment key={mainIndex}>
                      {mainMenus.separateRoute && mainMenus.routes ? (
                        <li
                          key={mainIndex}
                          className={
                            location.pathname.includes(mainMenus.routes)
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            style={{ color: "white" }}
                            to={mainMenus.routes}
                          >
                            {mainMenus.tittle}
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  ))}
                {superAdminLoggedIn &&
                  superHeaderData.map((mainMenus, mainIndex) => (
                    <React.Fragment key={mainIndex}>
                      {mainMenus.separateRoute && mainMenus.routes ? (
                        <li
                          key={mainIndex}
                          className={
                            location.pathname.includes(mainMenus.routes)
                              ? "active"
                              : ""
                          }
                        >
                          <Link
                            style={{ color: "white" }}
                            to={mainMenus.routes}
                          >
                            {mainMenus.tittle}
                          </Link>
                        </li>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  ))}
                {!userLoggedIn &&
                  !adminLoggedIn &&
                  !superAdminLoggedIn &&
                  publicHeaderData.map((mainMenus, mainIndex) => (
                    <React.Fragment key={mainIndex}>
                      {/* {mainMenus.separateRoute && mainMenus.routes ? (
                      <li
                        key={mainIndex}
                        className={
                          location.pathname.includes(mainMenus.routes) ? "" : ""
                        }
                      >
                        <Link style={{ color: "white" }} to={mainMenus.routes}>
                          {mainMenus.tittle}
                        </Link>
                      </li>
                    ) : (
                      <></>
                    )} */}
                    </React.Fragment>
                  ))}
              </ul>
            </div>
            <ul className="nav header-navbar-rht gap-2">
              {userLocation && (
                <Link
                  to="#"
                  onClick={() => setToggleModal(true)}
                  className="d-flex align-items-center gap-1 text-white header-nav-location-comp"
                >
                  <i className="feather-map-pin" />
                  <p className="mb-0 text-capitalize">{userLocation}</p>
                </Link>
              )}
              {adminLoggedIn && (
                <>
                  <li className="nav-item p-0">
                    <div className="nav-link btn btn-primary log-register">
                      <Link to={routes.addCourt}>
                        <span>
                          <i className="feather-plus" />
                        </span>
                        Add Court
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <UserProfileHeader />
                  </li>
                </>
              )}
              {(userLoggedIn || superAdminLoggedIn) && (
                <li className="nav-item">
                  <UserProfileHeader />
                </li>
              )}
              {!userLoggedIn && !adminLoggedIn && !superAdminLoggedIn && (
                <li className="nav-item gap-2">
                  <Link to={routes.ListingList} className="btn btn-primary">
                    Book A Court
                  </Link>
                  <div className="nav-link btn btn-white log-register">
                    <Link to={routes.login}>
                      <span>
                        <i className="feather-users" />
                      </span>
                      Login
                    </Link>{" "}
                    / <Link to={routes.register}>Register</Link>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
