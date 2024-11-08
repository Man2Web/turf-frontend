import React from "react";
import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";

import Signin from "../pages/auth/register";
import Login from "../pages/auth/login";

import AdminDashboard from "../pages/admin/admin-dashboard";
import AddCourt from "../pages/admin/add-court";
import EditCourt from "../pages/admin/edit-court";
import AllCourt from "../pages/admin/all-court";
import CourtDetails from "../pages/common/court-details";
import ListingList from "../pages/common/listing-list";
import CourtBooking from "../pages/common/court-booking";
import BookingSuccess from "../components/common/court/booking-success";
import BookingFailure from "../components/common/court/booking-failure";
import BookingCompleted from "../pages/admin/booking-completed";
import AdminProfile from "../pages/admin/admin-profile";
import UserDashboard from "../pages/user/user-dashboard";
import UserBookingsPage from "../pages/user/user-bookings-page";
import UserProfile from "../pages/user/user-profile";
import HomePage from "../pages/public/home";
import SuperAdminLoginPage from "../pages/auth/super-admin/login";
import SuperAdminDashboard from "../pages/super-admin/dashboard";
import ViewCourt from "../pages/super-admin/view-court";
import CourtReview from "../pages/user/court-review";

const routes = all_routes;

const superAdminRoutes = [
  {
    path: routes.SuperAdminDashboard,
    element: <SuperAdminDashboard />,
    route: Route,
  },
  {
    path: routes.ViewCourt,
    element: <ViewCourt />,
    route: Route,
  },
];

const superAdminAuthRoute = [
  {
    path: routes.superAdminLogin,
    element: <SuperAdminLoginPage />,
    route: Route,
  },
  {
    path: routes.SuperAdminDashboard,
    element: <SuperAdminDashboard />,
    route: Route,
  },
];

const adminRoutes = [
  {
    path: routes.adminDashboard,
    element: <AdminDashboard />,
    route: Route,
  },
  {
    path: routes.addCourt,
    element: <AddCourt />,
    route: Route,
  },
  {
    path: routes.editCourt,
    element: <EditCourt />,
    route: Route,
  },
  {
    path: routes.allCourt,
    element: <AllCourt />,
    route: Route,
  },
  {
    path: routes.bookingCompleted,
    element: <BookingCompleted />,
    route: Route,
  },
  {
    path: routes.adminProfile,
    element: <AdminProfile />,
    route: Route,
  },
];

const authenticationRoutes = [
  {
    path: routes.register,
    element: <Signin />,
    route: Route,
  },
  {
    path: routes.login,
    element: <Login />,
    route: Route,
  },
];

const publicRoutes = [
  {
    path: routes.home,
    element: <HomePage />,
    route: Route,
  },
  {
    path: routes.courtDetails,
    element: <CourtDetails />,
    route: Route,
  },
  {
    path: routes.ListingList,
    element: <ListingList />,
    route: Route,
  },
  {
    path: routes.bookingSuccess,
    element: <BookingSuccess />,
    route: Route,
  },
  {
    path: routes.bookingFailure,
    element: <BookingFailure />,
    route: Route,
  },
];

const noHeaderRoutes = [
  {
    path: routes.courtBooking,
    element: <CourtBooking />,
    route: Route,
  },
];

const userRoutes = [
  {
    path: routes.userDashboard,
    element: <UserDashboard />,
    route: Route,
  },
  {
    path: routes.userProfile,
    element: <UserProfile />,
    route: Route,
  },
  {
    path: routes.courtDetails,
    element: <CourtDetails />,
    route: Route,
  },
  {
    path: routes.ListingList,
    element: <ListingList />,
    route: Route,
  },
  {
    path: routes.courtBooking,
    element: <CourtBooking />,
    route: Route,
  },
  {
    path: routes.bookingSuccess,
    element: <BookingSuccess />,
    route: Route,
  },
  {
    path: routes.bookingFailure,
    element: <BookingFailure />,
    route: Route,
  },
  {
    path: routes.userBookingsPage,
    element: <UserBookingsPage />,
    route: Route,
  },
  {
    path: routes.userCourtReview,
    element: <CourtReview />,
    route: Route,
  },
];

export {
  authenticationRoutes,
  superAdminAuthRoute,
  adminRoutes,
  publicRoutes,
  userRoutes,
  noHeaderRoutes,
  superAdminRoutes,
};
