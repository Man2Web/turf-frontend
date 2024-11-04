import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import AdminMenuComponent from "../../../components/admin/profile/adminMenu";
import LocationDataModal from "../../../components/common/modal/location-data-modal";
import { useAppContext } from "../../../context/app-context";

const AdminDashboard = () => {
  const { userLocation, setUserLocation } = useAppContext();

  return (
    <div>
      {!userLocation && <LocationDataModal />}
      {/* Dashboard Menu */}
      <AdminMenuComponent />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content court-bg">
        <div className="container">
          {/* Statistics Card */}
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="card dashboard-card statistic-simply">
                <div className="card-header">
                  <h4>Statistics</h4>
                  <p>Track progress and improve coaching performance </p>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>78</h3>
                        <p>Total Courts Booked</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath
                          src="assets/img/icons/statistics-01.svg"
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>06</h3>
                        <p>Upcoming Bookings</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath
                          src="assets/img/icons/statistics-03.svg"
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>45</h3>
                        <p>Total Lessons Taken</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath
                          src="assets/img/icons/statistics-02.svg"
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
                    <div className="statistics-grid flex-fill">
                      <div className="statistics-content">
                        <h3>$45,056</h3>
                        <p>Payments</p>
                      </div>
                      <div className="statistics-icon">
                        <ImageWithBasePath
                          src="assets/img/icons/statistics-04.svg"
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-flex">
              <div className="card dashboard-card statistic-simply">
                <div className="card-header">
                  <h4>Profile</h4>
                  <p>Impress potential students with an interesting profile </p>
                </div>
                <div className="dash-coach-profile">
                  <div className="track-statistics">
                    <div className="statistic-head">
                      <h5>Today</h5>
                      <p>100%</p>
                    </div>
                    <div className="progress mb-0">
                      <div
                        className="progress-bar bg-today"
                        role="progressbar"
                        style={{ width: "72.17%" }}
                        aria-valuenow={72.17}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                  <div className="progress-titles">
                    <h5>Completed </h5>
                    <ul>
                      <li>
                        <i className="fa-solid fa-check-double" />
                        Basic Details
                      </li>
                      <li>
                        <i className="fa-solid fa-check-double" />
                        Payment Setup
                      </li>
                      <li>
                        <i className="fa-solid fa-check-double" />
                        Availability
                      </li>
                    </ul>
                  </div>
                  <div className="progress-titles">
                    <h5>Need to Complete </h5>
                    <ul className="need-complete">
                      <li>
                        <i className="feather-x-circle" />
                        Setup level for your Profile
                      </li>
                      <li>
                        <i className="feather-x-circle" />
                        Add Lesson type
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Statistics Card */}
          {/* Appointment */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card dashboard-card">
                <div className="card-header going-appoinment">
                  <div className="on-going-blk">
                    <h4>Ongoing Appointment</h4>
                    <p>
                      Manage appointments with our convenient scheduling system
                    </p>
                  </div>
                  <div className="complete-btn">
                    <Link to="#" className="btn btn-primary">
                      <i className="feather-user-check" />
                      Complete
                    </Link>
                  </div>
                </div>
                <div className="appointment-info">
                  <ul>
                    <li>
                      <div className="appointment-item">
                        <div className="appointment-img">
                          <ImageWithBasePath
                            src="assets/img/booking/booking-01.jpg"
                            alt="User"
                          />
                        </div>
                        <div className="appointment-content">
                          <h6>Leap Sports Academy</h6>
                          <p>Standard Synthetic Court 1</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="appointment-item">
                        <div className="appointment-img">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-01.jpg"
                            alt="User"
                          />
                        </div>
                        <div className="appointment-content">
                          <h6 className="mb-0">Harry</h6>
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
                      <h6>End Time</h6>
                      <p>06:25 AM</p>
                    </li>
                    <li>
                      <h6>Additional Guests</h6>
                      <p>4</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* /Appointment */}
          {/* Dashboard Table */}
          <div className="row">
            <div className="col-xl-12 col-lg-12 d-flex">
              <div className="card dashboard-card flex-fill">
                <div className="card-header card-header-info">
                  <div className="card-header-inner">
                    <h4>My Bookings</h4>
                    <p>Expertly manage court bookings </p>
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
                        <button
                          className="nav-link"
                          id="nav-Coaching-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-Coaching"
                          type="button"
                          role="tab"
                          aria-controls="nav-Coaching"
                          aria-selected="false"
                        >
                          Coaching
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
                                <Link
                                  to="coach-booking"
                                  className="academy-img"
                                >
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
          </div>
          {/* /Dashboard Table */}
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default AdminDashboard;
