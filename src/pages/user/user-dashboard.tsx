import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../router/all_routes";
import UserMenuComponent from "../../components/user/userMenu";
import LocationDataModal from "../../components/common/location-data-modal";
import { citiesList } from "../../utils/citiesList";

const UserDashboard = () => {
  const routes = all_routes;
  const [userLocation, setUserLocation] = useState<string | null>(
    localStorage.getItem("userLocation")
  );

  useEffect(() => {
    userLocation && localStorage.setItem("userLocation", userLocation);
  }, [userLocation]);

  return (
    <div>
      {!userLocation && <LocationDataModal setUserLocation={setUserLocation} />}
      {/* Dashboard Menu */}
      <UserMenuComponent />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Appointment */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card dashboard-card">
                <div className="card-header">
                  <h4>Todays Appointment</h4>
                  <p>Your Personal Badminton Schedule</p>
                </div>
                <div className="appointment-info">
                  <ul>
                    <li>
                      <div className="appointment-item">
                        <div className="appointment-img">
                          <ImageWithBasePath
                            src="assets/img/booking/booking-01.jpg"
                            alt="Appointment"
                          />
                        </div>
                        <div className="appointment-content">
                          <h6>Court Name</h6>
                          <p>Standard Synthetic Court 1</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <h6>Appointment Date</h6>
                      <p>Mon, Jul 11</p>
                    </li>
                    <li>
                      <h6>Start Time</h6>
                      <p>05:25 AM</p>
                    </li>
                    <li>
                      <h6>Appointment End Time</h6>
                      <p>06:25 AM</p>
                    </li>
                    <li>
                      <h6>Additional Guests</h6>
                      <p>4</p>
                    </li>
                    <li>
                      <h6>Location</h6>
                      <p>Sant Marco</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* /Appointment */}
          {/* Dashboard Table */}
          <div className="row">
            <div className="col-xl-7 col-lg-12 d-flex">
              <div className="card dashboard-card flex-fill">
                <div className="card-header card-header-info">
                  <div className="card-header-inner">
                    <h4>My Bookings</h4>
                    <p>Court Reservations Made Easy</p>
                  </div>
                  <div className="card-header-btns">
                    <nav>
                      <div className="nav nav-tabs" role="tablist">
                        <button
                          className="nav-link active"
                          id="nav-Court-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-Court"
                          type="button"
                          role="tab"
                          aria-controls="nav-Court"
                          aria-selected="true"
                        >
                          Court
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="nav-Court"
                    role="tabpanel"
                    aria-labelledby="nav-Court-tab"
                    tabIndex={0}
                  >
                    <div className="table-responsive dashboard-table-responsive">
                      <table className="table dashboard-card-table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/booking/booking-02.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6>
                                    <Link
                                      to="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-court"
                                    >
                                      Leap Sports Academy
                                    </Link>
                                  </h6>
                                  <span>Court 1</span>
                                  <ul>
                                    <li>Guests : 4</li>
                                    <li>2 Hrs</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Mon, Jul 11</p>
                              <p>06:00 PM - 08:00 PM</p>
                            </td>
                            <td>
                              <h4>$400</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/booking/booking-03.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-court"
                                      to={""}
                                    >
                                      Wing Sports Academy
                                    </Link>
                                  </h6>
                                  <span>Court 2</span>
                                  <ul>
                                    <li>Guests : 3</li>
                                    <li>1 Hr</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Tue, Jul 12</p>
                              <p>07:00 PM - 08:00 PM</p>
                            </td>
                            <td>
                              <h4>$240</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/booking/booking-04.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-court"
                                      to={""}
                                    >
                                      Feather Badminton
                                    </Link>
                                  </h6>
                                  <span>Court 1</span>
                                  <ul>
                                    <li>Guests : 1</li>
                                    <li>4 Hrs</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Wen, Jul 13</p>
                              <p>10:00 PM - 11:00 PM</p>
                            </td>
                            <td>
                              <h4>$320</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/booking/booking-05.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-court"
                                      to={""}
                                    >
                                      Bwing Sports Academy
                                    </Link>
                                  </h6>
                                  <span>Court 3</span>
                                  <ul>
                                    <li>Guests : 5</li>
                                    <li>6 Hrs</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Thu, Jul 14</p>
                              <p>09:00 AM - 10:00 AM</p>
                            </td>
                            <td>
                              <h4>$710</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/booking/booking-06.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-court"
                                      to={""}
                                    >
                                      Marsh Academy
                                    </Link>
                                  </h6>
                                  <span>Court 2</span>
                                  <ul>
                                    <li>Guests : 3</li>
                                    <li>2 Hrs</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Fri, Jul 15</p>
                              <p>11:00 AM - 12:00 PM</p>
                            </td>
                            <td>
                              <h4>$820</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-Coaching"
                    role="tabpanel"
                    aria-labelledby="nav-Coaching-tab"
                    tabIndex={0}
                  >
                    <div className="table-responsive dashboard-table-responsive">
                      <table className="table dashboard-card-table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/featured/featured-05.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6 className="mb-1">
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-coach"
                                      to={""}
                                    >
                                      Kevin Anderson
                                    </Link>
                                  </h6>
                                  <span className="mb-0">Onetime</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Mon, Jul 11</p>
                              <p>06:00 PM - 08:00 PM</p>
                            </td>
                            <td>
                              <h4>$400</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/featured/featured-06.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6 className="mb-1">
                                    {" "}
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-coach"
                                      to={""}
                                    >
                                      Angela Roudrigez
                                    </Link>
                                  </h6>
                                  <span className="mb-0">Single Lesson</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Tue, Jul 12</p>
                              <p>07:00 PM - 08:00 PM</p>
                            </td>
                            <td>
                              <h4>$240</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/featured/featured-07.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6 className="mb-1">
                                    {" "}
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-coach"
                                      to={""}
                                    >
                                      Evon Raddick
                                    </Link>
                                  </h6>
                                  <span className="mb-0">Onetime</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Wen, Jul 13</p>
                              <p>10:00 PM - 11:00 PM</p>
                            </td>
                            <td>
                              <h4>$320</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/featured/featured-08.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6 className="mb-1">
                                    {" "}
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-coach"
                                      to={""}
                                    >
                                      Harry Richardson
                                    </Link>
                                  </h6>
                                  <span className="mb-0">Onetime</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Thu, Jul 14</p>
                              <p>09:00 AM - 10:00 AM</p>
                            </td>
                            <td>
                              <h4>$710</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/featured/featured-09.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6 className="mb-1">
                                    {" "}
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-coach"
                                      to={""}
                                    >
                                      Pete Hill
                                    </Link>
                                  </h6>
                                  <span className="mb-0">Onetime</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <h6>Date &amp; Time</h6>
                              <p>Fri, Jul 15</p>
                              <p>11:00 AM - 12:00 PM</p>
                            </td>
                            <td>
                              <h4>$820</h4>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-12 d-flex flex-column">
              <div className="card dashboard-card upcoming-card">
                <div className="card-header card-header-info">
                  <div className="card-header-inner">
                    <h4>Upcoming Appointment</h4>
                    <p>Manage all your upcoming court bookings.</p>
                  </div>
                  <div className="card-header-btns">
                    <nav>
                      <div className="nav nav-tabs" role="tablist">
                        <button
                          className="nav-link active"
                          id="nav-Appointment-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-Appointment"
                          type="button"
                          role="tab"
                          aria-controls="nav-Appointment"
                          aria-selected="true"
                        >
                          Court
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="nav-Appointment"
                    role="tabpanel"
                    aria-labelledby="nav-Appointment-tab"
                    tabIndex={0}
                  >
                    <div className="table-responsive dashboard-table-responsive">
                      <table className="table dashboard-card-table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="academy-info academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/booking/booking-02.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-court"
                                      to={""}
                                    >
                                      Leap Sports Academy
                                    </Link>
                                  </h6>
                                  <ul>
                                    <li>Court 1</li>
                                    <li>
                                      <i className="feather-clock" /> 06:00 PM
                                      to 08:00 PM
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-AppointmentCoaching"
                    role="tabpanel"
                    aria-labelledby="nav-AppointmentCoaching-tab"
                    tabIndex={0}
                  >
                    <div className="table-responsive dashboard-table-responsive">
                      <table className="table dashboard-card-table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="academy-info academy-info">
                                <Link className="academy-img" to={""}>
                                  <ImageWithBasePath
                                    src="assets/img/featured/featured-05.jpg"
                                    alt="Booking"
                                  />
                                </Link>
                                <div className="academy-content">
                                  <h6>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#upcoming-coach"
                                      to={""}
                                    >
                                      Kevin Anderson
                                    </Link>
                                  </h6>
                                  <ul>
                                    <li>Single Lesson</li>
                                    <li>
                                      <i className="feather-clock" /> 06:00 PM
                                      to 08:00 PM
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <Link
                                  to="#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis" />
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                  <Link className="dropdown-item" to="#">
                                    <i className="feather-x-circle" /> Cancel
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
