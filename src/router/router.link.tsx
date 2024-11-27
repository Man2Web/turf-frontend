import React from "react";
import { Route } from "react-router";
import { all_routes } from "./all_routes";

import Signin from "../pages/auth/register";
import Login from "../pages/auth/login";
import AdminDashboard from "../pages/admin/profile/admin-dashboard";
import AddCourt from "../pages/admin/court/add-court";
import EditCourt from "../pages/admin/court/edit-court";
import AllCourt from "../pages/admin/court/all-court";
import CourtDetails from "../pages/common/court/court-details";
import ListingList from "../pages/common/listing/listing-list";
import CourtBooking from "../pages/common/court/court-booking";
import BookingSuccess from "../dump/booking-success";
import BookingFailure from "../components/common/court/booking-failure";
import BookingCompleted from "../pages/admin/booking/booking-completed";
import AdminProfile from "../pages/admin/profile/admin-profile";
import UserDashboard from "../pages/user/user/user-dashboard";
import UserBookingsPage from "../pages/user/user/user-bookings-page";
import UserProfile from "../pages/user/user/user-profile";
import HomePage from "../pages/public/home";
import SuperAdminLoginPage from "../pages/auth/super-admin/login";
import SuperAdminDashboard from "../pages/super-admin/user/dashboard";
import ViewCourt from "../pages/super-admin/court/view-court";
import CourtReview from "../pages/user/court/court-review";
import AdminCoupon from "../pages/admin/coupon/admin-coupon";
import SuperAdminCoupon from "../pages/super-admin/coupon/super-admin-coupon";
import ForgotPassword from "../pages/auth/forgot-password";
import ChangePassword from "../pages/auth/change-password";
import Error404 from "../pages/common/error-404";
import AboutUs from "../pages/common/about-us";
import ContactUs from "../pages/common/contact-us";
import Faq from "../pages/common/faq";
import PrivacyPolicy from "../pages/common/privacy-policy";
import TermsCondition from "../pages/common/terms-condition";

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
  {
    path: routes.superAdminCouponsPage,
    element: <SuperAdminCoupon />,
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
  {
    path: routes.couponsPage,
    element: <AdminCoupon />,
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
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
    route: Route,
  },
  {
    path: routes.resetPassword,
    element: <ChangePassword />,
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
    path: routes.ListingListWithSport,
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
  {
    path: routes.aboutUs,
    element: <AboutUs />,
    route: Route,
  },
  {
    path: routes.contactUs,
    element: <ContactUs />,
    route: Route,
  },
  {
    path: routes.faq,
    element: <Faq />,
    route: Route,
  },
  {
    path: routes.privacyPolicy,
    element: <PrivacyPolicy />,
    route: Route,
  },
  {
    path: routes.termsCondition,
    element: <TermsCondition />,
    route: Route,
  },
];

const noHeaderRoutes = [
  {
    path: routes.courtBooking,
    element: <CourtBooking />,
    route: Route,
  },
  {
    path: routes.error404,
    element: <Error404 />,
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
