export const all_routes = {
  // Super Admin
  superAdminLogin: "/auth/super-admin",
  SuperAdminDashboard: "/super-admin/dashboard",
  ViewCourt: "/super-admin/court/:courtId",

  // Admin Routes
  adminDashboard: "/admin/admin-dashboard",
  addCourt: "/admin/add-court",
  editCourt: "/admin/edit-court/:courtId",
  allCourt: "/admin/all-court",
  bookingCompleted: "/admin/booking-dashboard",
  adminProfile: "/admin/profile",

  // User Routes
  userDashboard: "/user/user-dashboard",
  userProfile: "/user/profile",
  userBookingsPage: "/user/booking-dashboard",
  userCourtReview: "/user/court/:courtId/:transaction_id/:booking_details_id",

  // Auth Routes
  register: "/auth/register",
  login: "/auth/login",

  // Public Routes
  home: "/",
  courtDetails: "/court/:courtId",
  ListingList: "/courts",
  // ListingListWithCity: "/courts/:requestedLocation",
  courtBooking: "/court/:courtId/booking",

  // Booking Routes
  bookingSuccess: "/booking/success/:t_id",
  bookingFailure: "/booking/failure",

  // connecting routes
  courtDetailsLink: "/court",
};
