import React from "react";
import {
  adminRoutes,
  authenticationRoutes,
  noHeaderRoutes,
  publicRoutes,
  superAdminAuthRoute,
  userRoutes,
  superAdminRoutes,
} from "./router.link";
import { Outlet, Route, Routes } from "react-router-dom";
import PrivateAdminRoute from "./PrivateAdminRoute";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import AuthRoute from "./AuthRoute";
import UserAuthRoute from "./UserRoute";
import SuperAdminRoute from "./SuperAdminRoute";

const AllRoutes = () => {
  const HeaderLayout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <Loader/> */}
    </>
  );

  return (
    <>
      <Routes>
        {noHeaderRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
        <Route path={"/"} element={<HeaderLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
          {superAdminRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<SuperAdminRoute element={route.element} />}
              key={idx}
            />
          ))}
          {adminRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<PrivateAdminRoute element={route.element} />}
              key={idx}
            />
          ))}
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<UserAuthRoute element={route.element} />}
              key={idx}
            />
          ))}
        </Route>
        <Route path={"/"}>
          {authenticationRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<AuthRoute element={route.element} />}
              key={idx}
            />
          ))}
          {superAdminAuthRoute.map((route, idx) => (
            <Route
              path={route.path}
              element={<AuthRoute element={route.element} />}
              key={idx}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};
export default AllRoutes;
