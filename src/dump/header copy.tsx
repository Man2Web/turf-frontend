// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { all_routes } from "../router/all_routes";
// import ImageWithBasePath from "../core/data/img/ImageWithBasePath";
// import { UserLocationContext } from "..";
// import UserProfileHeader from "../components/common/layout/user-profile";

// const Header = () => {
//   const routes = all_routes;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [userLocation, setUserLocation] = useState(
//     localStorage.getItem("userLocation") || undefined
//   );
//   const superAdminLoggedIn = localStorage.getItem("superAdminToken");
//   const adminLoggedIn = localStorage.getItem("adminToken");
//   const userLoggedIn = localStorage.getItem("userToken");

//   const context = useContext(UserLocationContext);

//   // Check if the context is undefined
//   if (!context) {
//     throw new Error("SomeComponent must be used within a UserLocationProvider");
//   }

//   // Destructure properties from the context
//   const { userLocationInContext } = context;

//   // console.log(userLocationInContext, setUserLocationInContext);

//   useEffect(() => {
//     if (userLocation) {
//       setUserLocation(userLocation);
//     }
//   }, [userLocation]);

//   const superHeaderData = [
//     {
//       tittle: "Home",
//       showAsTab: false,
//       separateRoute: true,
//       routes: routes.SuperAdminDashboard,
//       hasSubRoute: false,
//       showSubRoute: false,
//     },
//     {
//       tittle: "Booking",
//       showAsTab: false,
//       separateRoute: false,
//       menu: [
//         {
//           menuValue: "Book A Court",
//           routes: routes.ListingList,
//           hasSubRoute: false,
//           showSubRoute: false,
//           subMenus: [],
//         },
//       ],
//     },
//   ];

//   const adminHeaderData = [
//     {
//       tittle: "Home",
//       showAsTab: false,
//       separateRoute: true,
//       routes: routes.adminDashboard,
//       hasSubRoute: false,
//       showSubRoute: false,
//     },
//     {
//       tittle: "Courts",
//       showAsTab: false,
//       separateRoute: false,
//       menu: [
//         {
//           menuValue: "Add Court",
//           routes: routes.addCourt,
//           hasSubRoute: false,
//           showSubRoute: false,
//           subMenus: [],
//         },
//         {
//           menuValue: "Courts List",
//           routes: routes.allCourt,
//           hasSubRoute: false,
//           showSubRoute: false,
//           subMenus: [],
//         },
//       ],
//     },
//     {
//       tittle: "Booking",
//       showAsTab: false,
//       separateRoute: false,
//       menu: [
//         {
//           menuValue: "Book A Court",
//           routes: routes.ListingList,
//           hasSubRoute: false,
//           showSubRoute: false,
//           subMenus: [],
//         },
//       ],
//     },
//   ];

//   const userHeaderData = [
//     {
//       tittle: "Home",
//       showAsTab: false,
//       separateRoute: true,
//       routes: routes.userDashboard,
//       hasSubRoute: false,
//       showSubRoute: false,
//     },
//     {
//       tittle: "Booking",
//       showAsTab: false,
//       separateRoute: false,
//       menu: [
//         {
//           menuValue: "Book A Court",
//           routes: routes.ListingList,
//           hasSubRoute: false,
//           showSubRoute: false,
//           subMenus: [],
//         },
//       ],
//     },
//   ];

//   const publicHeaderData = [
//     {
//       tittle: "Home",
//       showAsTab: false,
//       separateRoute: true,
//       routes: routes.home,
//       hasSubRoute: false,
//       showSubRoute: false,
//     },
//     {
//       tittle: "Booking",
//       showAsTab: false,
//       separateRoute: false,
//       menu: [
//         {
//           menuValue: "Book A Court",
//           routes: routes.ListingList,
//           hasSubRoute: false,
//           showSubRoute: false,
//           subMenus: [],
//         },
//       ],
//     },
//   ];

//   const customStyle = {
//     background: location.pathname.includes(routes.home)
//       ? "rgb(23, 124, 130)"
//       : "#ffffff",
//   };

//   return (
//     <header
//       className={
//         location.pathname.includes("#")
//           ? "header header-trans"
//           : "header header-sticky"
//       }
//       style={customStyle}
//     >
//       <div className="container-fluid">
//         <nav className="navbar navbar-expand-lg header-nav">
//           <div className="navbar-header">
//             <Link id="mobile_btn" to="#">
//               <span className="bar-icon">
//                 <span />
//                 <span />
//                 <span />
//               </span>
//             </Link>
//             <Link to="index" className="navbar-brand logo">
//               {/* <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="Logo" /> */}

//               {location.pathname.includes("#") ? (
//                 <ImageWithBasePath
//                   src="assets/img/logo.svg"
//                   className="img-fluid"
//                   alt="Logo"
//                 />
//               ) : (
//                 <ImageWithBasePath
//                   src="assets/img/logo-black.svg"
//                   className="img-fluid"
//                   alt="Another Image"
//                 />
//               )}
//             </Link>
//           </div>
//           <div className="main-menu-wrapper">
//             <div className="menu-header">
//               <Link to="index" className="menu-logo">
//                 <ImageWithBasePath
//                   src="assets/img/logo-black.svg"
//                   className="img-fluid"
//                   alt="Logo"
//                 />
//               </Link>
//               <Link id="menu_close" className="menu-close" to="#">
//                 {" "}
//                 <i className="fas fa-times" />
//               </Link>
//             </div>
//             <ul className="main-nav">
//               {adminLoggedIn &&
//                 adminHeaderData.map((mainMenus, mainIndex) => (
//                   <React.Fragment key={mainIndex}>
//                     {mainMenus.separateRoute ? (
//                       <li
//                         key={mainIndex}
//                         className={
//                           location.pathname.includes(mainMenus.routes)
//                             ? "active"
//                             : ""
//                         }
//                       >
//                         <Link style={{ color: "white" }} to={mainMenus.routes}>
//                           {mainMenus.tittle}
//                         </Link>
//                       </li>
//                     ) : (
//                       <li
//                         className={`has-submenu ${mainMenus?.menu?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                       >
//                         <Link style={{ color: "white" }} to="#">
//                           {mainMenus.tittle}{" "}
//                           <i className="fas fa-chevron-down"></i>
//                         </Link>
//                         <ul
//                           className={`submenu ${mainMenus.showAsTab ? "d-block" : ""}`}
//                         >
//                           {mainMenus.menu?.map((menu, menuIndex) => (
//                             <li
//                               key={menuIndex}
//                               className={`${menu.hasSubRoute ? "has-submenu" : ""} ${menu?.subMenus?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                             >
//                               {menu.hasSubRoute ? (
//                                 <React.Fragment>
//                                   <Link to="#">{menu.menuValue}</Link>
//                                   <ul
//                                     className={`submenu ${menu.showSubRoute ? "d-block" : ""}`}
//                                   >
//                                     {menu.subMenus?.map(
//                                       (subMenu, subMenuIndex) => (
//                                         <li key={subMenuIndex}>
//                                           <Link to={subMenu.routes}>
//                                             {subMenu.menuValue}
//                                           </Link>
//                                         </li>
//                                       )
//                                     )}
//                                   </ul>
//                                 </React.Fragment>
//                               ) : (
//                                 <li
//                                   className={
//                                     location.pathname.includes(menu.routes)
//                                       ? "active"
//                                       : ""
//                                   }
//                                 >
//                                   <Link to={menu.routes}>{menu.menuValue}</Link>
//                                 </li>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     )}
//                   </React.Fragment>
//                 ))}
//               {userLoggedIn &&
//                 userHeaderData.map((mainMenus, mainIndex) => (
//                   <React.Fragment key={mainIndex}>
//                     {mainMenus.separateRoute ? (
//                       <li
//                         key={mainIndex}
//                         className={
//                           location.pathname.includes(mainMenus.routes)
//                             ? "active"
//                             : ""
//                         }
//                       >
//                         <Link style={{ color: "white" }} to={mainMenus.routes}>
//                           {mainMenus.tittle}
//                         </Link>
//                       </li>
//                     ) : (
//                       <li
//                         className={`has-submenu ${mainMenus?.menu?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                       >
//                         <Link style={{ color: "white" }} to="#">
//                           {mainMenus.tittle}{" "}
//                           <i className="fas fa-chevron-down"></i>
//                         </Link>
//                         <ul
//                           className={`submenu ${mainMenus.showAsTab ? "d-block" : ""}`}
//                         >
//                           {mainMenus.menu?.map((menu, menuIndex) => (
//                             <li
//                               key={menuIndex}
//                               className={`${menu.hasSubRoute ? "has-submenu" : ""} ${menu?.subMenus?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                             >
//                               {menu.hasSubRoute ? (
//                                 <React.Fragment>
//                                   <Link to="#">{menu.menuValue}</Link>
//                                   <ul
//                                     className={`submenu ${menu.showSubRoute ? "d-block" : ""}`}
//                                   >
//                                     {menu.subMenus?.map(
//                                       (subMenu, subMenuIndex) => (
//                                         <li key={subMenuIndex}>
//                                           <Link to={subMenu.routes}>
//                                             {subMenu.menuValue}
//                                           </Link>
//                                         </li>
//                                       )
//                                     )}
//                                   </ul>
//                                 </React.Fragment>
//                               ) : (
//                                 <li
//                                   className={
//                                     location.pathname.includes(menu.routes)
//                                       ? "active"
//                                       : ""
//                                   }
//                                 >
//                                   <Link to={menu.routes}>{menu.menuValue}</Link>
//                                 </li>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     )}
//                   </React.Fragment>
//                 ))}
//               {superAdminLoggedIn &&
//                 superHeaderData.map((mainMenus, mainIndex) => (
//                   <React.Fragment key={mainIndex}>
//                     {mainMenus.separateRoute ? (
//                       <li
//                         key={mainIndex}
//                         className={
//                           location.pathname.includes(mainMenus.routes)
//                             ? "active"
//                             : ""
//                         }
//                       >
//                         <Link style={{ color: "white" }} to={mainMenus.routes}>
//                           {mainMenus.tittle}
//                         </Link>
//                       </li>
//                     ) : (
//                       <li
//                         className={`has-submenu ${mainMenus?.menu?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                       >
//                         <Link style={{ color: "white" }} to="#">
//                           {mainMenus.tittle}{" "}
//                           <i className="fas fa-chevron-down"></i>
//                         </Link>
//                         <ul
//                           className={`submenu ${mainMenus.showAsTab ? "d-block" : ""}`}
//                         >
//                           {mainMenus.menu?.map((menu, menuIndex) => (
//                             <li
//                               key={menuIndex}
//                               className={`${menu.hasSubRoute ? "has-submenu" : ""} ${menu?.subMenus?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                             >
//                               {menu.hasSubRoute ? (
//                                 <React.Fragment>
//                                   <Link to="#">{menu.menuValue}</Link>
//                                   <ul
//                                     className={`submenu ${menu.showSubRoute ? "d-block" : ""}`}
//                                   >
//                                     {menu.subMenus?.map(
//                                       (subMenu, subMenuIndex) => (
//                                         <li key={subMenuIndex}>
//                                           <Link to={subMenu.routes}>
//                                             {subMenu.menuValue}
//                                           </Link>
//                                         </li>
//                                       )
//                                     )}
//                                   </ul>
//                                 </React.Fragment>
//                               ) : (
//                                 <li
//                                   className={
//                                     location.pathname.includes(menu.routes)
//                                       ? "active"
//                                       : ""
//                                   }
//                                 >
//                                   <Link to={menu.routes}>{menu.menuValue}</Link>
//                                 </li>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     )}
//                   </React.Fragment>
//                 ))}
//               {!userLoggedIn &&
//                 !adminLoggedIn &&
//                 !superAdminLoggedIn &&
//                 publicHeaderData.map((mainMenus, mainIndex) => (
//                   <React.Fragment key={mainIndex}>
//                     {mainMenus.separateRoute ? (
//                       <li
//                         key={mainIndex}
//                         className={
//                           location.pathname.includes(mainMenus.routes) ? "" : ""
//                         }
//                       >
//                         <Link style={{ color: "white" }} to={mainMenus.routes}>
//                           {mainMenus.tittle}
//                         </Link>
//                       </li>
//                     ) : (
//                       <li
//                         className={`has-submenu ${mainMenus?.menu?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                       >
//                         <Link style={{ color: "white" }} to="#">
//                           {mainMenus.tittle}{" "}
//                           <i className="fas fa-chevron-down"></i>
//                         </Link>
//                         <ul
//                           className={`submenu ${mainMenus.showAsTab ? "d-block" : ""}`}
//                         >
//                           {mainMenus.menu?.map((menu, menuIndex) => (
//                             <li
//                               key={menuIndex}
//                               className={`${menu.hasSubRoute ? "has-submenu" : ""} ${menu?.subMenus?.map((item) => item?.routes).includes(location.pathname) ? "active" : ""}`}
//                             >
//                               {menu.hasSubRoute ? (
//                                 <React.Fragment>
//                                   <Link to="#">{menu.menuValue}</Link>
//                                   <ul
//                                     className={`submenu ${menu.showSubRoute ? "d-block" : ""}`}
//                                   >
//                                     {menu.subMenus?.map(
//                                       (subMenu, subMenuIndex) => (
//                                         <li key={subMenuIndex}>
//                                           <Link to={subMenu.routes}>
//                                             {subMenu.menuValue}
//                                           </Link>
//                                         </li>
//                                       )
//                                     )}
//                                   </ul>
//                                 </React.Fragment>
//                               ) : (
//                                 <li
//                                   className={
//                                     location.pathname.includes(menu.routes)
//                                       ? "active"
//                                       : ""
//                                   }
//                                 >
//                                   <Link to={menu.routes}>{menu.menuValue}</Link>
//                                 </li>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </li>
//                     )}
//                   </React.Fragment>
//                 ))}
//             </ul>
//           </div>
//           <ul className="nav header-navbar-rht gap-2">
//             {userLocationInContext && (
//               <li className="d-flex align-items-center gap-1 text-white header-nav-location-comp">
//                 <i className="feather-map-pin" />
//                 <p className="mb-0 text-capitalize">{userLocationInContext}</p>
//               </li>
//             )}
//             {adminLoggedIn && (
//               <>
//                 <li className="nav-item p-0">
//                   <div className="nav-link btn btn-primary log-register">
//                     <Link to={routes.addCourt}>
//                       <span>
//                         <i className="feather-plus" />
//                       </span>
//                       Add Court
//                     </Link>
//                   </div>
//                 </li>
//                 <li className="nav-item">
//                   <UserProfileHeader />
//                 </li>
//               </>
//             )}
//             {(userLoggedIn || superAdminLoggedIn) && (
//               <>
//                 <li className="nav-item">
//                   <div className="nav-link btn btn-primary log-register">
//                     <Link to={routes.ListingList}>Book A Court</Link>
//                   </div>
//                 </li>
//                 <li className="nav-item">
//                   <UserProfileHeader />
//                 </li>
//               </>
//             )}
//             {!userLoggedIn && !adminLoggedIn && !superAdminLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <div className="nav-link btn btn-white log-register">
//                     <Link to={routes.login}>
//                       <span>
//                         <i className="feather-users" />
//                       </span>
//                       Login
//                     </Link>{" "}
//                     / <Link to={routes.register}>Register</Link>
//                   </div>
//                 </li>
//                 <li className="nav-item">
//                   <div className="nav-link btn btn-primary log-register">
//                     <Link to={routes.ListingList}>Book A Court</Link>
//                   </div>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
