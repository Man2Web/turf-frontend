import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// import { bookingCompletedData } from "../../../core/data/json/booking_completed";
import { bookingCompletedData } from "../../core/data/json/booking_completed";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../../router/all_routes";
import AdminMenuComponent from "../../components/admin/adminMenu";
import axios from "axios";
import Loader from "../../components/common/Loader";
import { dateFormat } from "../../utils/dateFormat";
import AdminBookingDetails from "../../components/admin/admin-booking-details";
import { formatTime } from "../../utils/formatTime";
import { formatEndTime } from "../../utils/formatEndTime";

const BookingCompleted = () => {
  const routes = all_routes;
  const adminId = localStorage.getItem("adminId");
  const [todaysBooking, setTodaysBooking] = useState<BookingData[]>([]);
  const [previousBooking, setPreviousBooking] = useState<BookingData[]>([]);
  const [upcomingBooking, setUpcomingBooking] = useState<BookingData[]>([]);
  const [currentData, setCurrentData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [dataToggle, setDataToggle] = useState<number>(1);
  const [adminSelected, setAdminSelected] = useState<BookingData>();
  const [searchInput, setSearchInput] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState();
  const timeframeOptions = [{ name: "This Week" }, { name: "One Day" }];

  const getBookingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/booking/${adminId}`
      );
      if (dataToggle === 1) {
        setCurrentData(response.data.todaysBookings);
      }
      setTodaysBooking(response.data.todaysBookings);
      setPreviousBooking(response.data.previousBookings);
      setUpcomingBooking(response.data.upcomingBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookingData();

    if (dataToggle === 0) {
      setCurrentData(previousBooking);
    } else if (dataToggle === 1) {
      setCurrentData(todaysBooking);
    } else if (dataToggle === 2) {
      setCurrentData(upcomingBooking);
    }
  }, [dataToggle]);
  console.log(adminSelected);
  return (
    <div>
      <>
        {/* Dashboard Menu */}
        <AdminMenuComponent />
        {/* /Dashboard Menu */}
        {/* Page Content */}
        <div className="content court-bg">
          <div className="container">
            {/* Sort By */}
            <div className="row">
              <div className="col-lg-12">
                <div className="sortby-section court-sortby-section">
                  <div className="sorting-info">
                    <div className="row d-flex align-items-center">
                      <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
                        <div className="coach-court-list">
                          <ul className="nav">
                            <li>
                              <Link
                                className={`${dataToggle === 0 ? "active" : ""}`}
                                onClick={() => setDataToggle(0)}
                                to={""}
                              >
                                Completed
                              </Link>
                            </li>
                            <li>
                              <Link
                                className={`${dataToggle === 1 ? "active" : ""}`}
                                onClick={() => setDataToggle(1)}
                                to={""}
                              >
                                Today
                              </Link>
                            </li>
                            <li>
                              <Link
                                className={`${dataToggle === 2 ? "active" : ""}`}
                                onClick={() => setDataToggle(2)}
                                to={""}
                              >
                                Upcoming
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sort By */}

            <div className="row">
              <div className="col-sm-12">
                <div className="court-tab-content">
                  <div className="card card-tableset">
                    <div className="card-body">
                      <div className="coache-head-blk">
                        <div className="row align-items-center">
                          <div className="col-lg-6">
                            <div className="court-table-head">
                              <h4>Bookings</h4>
                              <p>
                                Effortlessly track and manage your completed
                                bookings
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="coach-active-blk">
                              <div className="dataTables_filter">
                                <label>
                                  <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) =>
                                      setSearchInput(e.target.value)
                                    }
                                    placeholder="Search"
                                    className="form-control"
                                  />
                                </label>
                              </div>
                              <div className="card-header-btns">
                                <nav>
                                  <div className="nav nav-tabs" role="tablist">
                                    <button
                                      className="nav-link active"
                                      id="nav-Recent-tab"
                                      data-bs-toggle="tab"
                                      data-bs-target="#nav-Recent"
                                      type="button"
                                      role="tab"
                                      aria-controls="nav-Recent"
                                      aria-selected="true"
                                    >
                                      Court
                                    </button>
                                  </div>
                                </nav>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="nav-Recent"
                          role="tabpanel"
                          aria-labelledby="nav-Recent-tab"
                          tabIndex={0}
                        >
                          <div className="table-responsive">
                            {loading && <Loader />}
                            {!loading && (
                              <DataTable
                                value={currentData}
                                className="table table-borderless datatable"
                                paginator
                                rows={10}
                                rowsPerPageOptions={[10, 25, 50]}
                                currentPageReportTemplate="{first}"
                              >
                                <Column
                                  sortable
                                  field="courtName"
                                  header="CourtName"
                                  body={(rowData: BookingData) => (
                                    <td>
                                      <h2 className="table-avatar">
                                        {/* <Link
                                          to="#"
                                          className="avatar avatar-sm flex-shrink-0"
                                        >
                                          <ImageWithBasePath
                                            className="avatar-img"
                                            src={rowData.img1}
                                            alt="User"
                                          />
                                        </Link> */}
                                        <span className="table-head-name flex-grow-1">
                                          <Link to="#">{}</Link>
                                          <span>
                                            {rowData.courtDetails.court_name}
                                            {/* <span className="book-on-date">
                                              {rowData.bookingTime}
                                            </span> */}
                                          </span>
                                        </span>
                                      </h2>
                                    </td>
                                  )}
                                ></Column>
                                <Column
                                  sortable
                                  field="playerName"
                                  header="PlayerName"
                                  body={(rowData: BookingData) => (
                                    <td>
                                      <h2 className="table-avatar">
                                        <span className="table-head-name table-name-user flex-grow-1">
                                          <Link to={"routes.myProfile"}>
                                            {`${rowData.bookingDetails.fname} ${rowData.bookingDetails.lname}`}
                                          </Link>
                                        </span>
                                      </h2>
                                    </td>
                                  )}
                                ></Column>
                                <Column
                                  sortable
                                  field="playerPhoneNumber"
                                  header="PlayerPhone"
                                  body={(rowData: BookingData) => (
                                    <td>
                                      <h2 className="table-avatar">
                                        <span className="table-head-name table-name-user flex-grow-1">
                                          <Link to={"routes.myProfile"}>
                                            {
                                              rowData.bookingDetails
                                                .phone_number
                                            }
                                          </Link>
                                        </span>
                                      </h2>
                                    </td>
                                  )}
                                ></Column>
                                <Column
                                  sortable
                                  field="date"
                                  header="Date"
                                  body={(rowData: BookingData) => (
                                    <td className="table-date-time">
                                      <h4>
                                        {dateFormat(rowData.booking_date)}
                                      </h4>
                                    </td>
                                  )}
                                />
                                <Column
                                  sortable
                                  field="sTime"
                                  header="Start Time"
                                  body={(rowData: BookingData) => (
                                    <td className="table-date-time">
                                      <h4>
                                        <span>
                                          {formatTime(rowData.booking_time)}
                                        </span>
                                      </h4>
                                    </td>
                                  )}
                                />
                                <Column
                                  sortable
                                  field="eTime"
                                  header="End Time"
                                  body={(rowData: BookingData) => (
                                    <td className="table-date-time">
                                      <h4>
                                        <span>
                                          {formatEndTime(
                                            rowData.booking_time,
                                            rowData.duration.toString()
                                          )}
                                        </span>
                                      </h4>
                                    </td>
                                  )}
                                />
                                <Column
                                  sortable
                                  field="payment"
                                  header="Payment"
                                  body={(rowData: BookingData) => (
                                    <>
                                      {rowData.payment_mode ? (
                                        <td className="table-date-time">
                                          <h4 className="text-success">
                                            Online
                                          </h4>
                                        </td>
                                      ) : (
                                        <td className="table-date-time">
                                          <h4 className="text-danger">
                                            Offline
                                          </h4>
                                        </td>
                                      )}
                                    </>
                                  )}
                                />
                                <Column
                                  sortable
                                  field="details"
                                  header="Details"
                                  body={(rowData: BookingData) => (
                                    <td className="text-pink view-detail-pink">
                                      <Link
                                        onClick={() => {
                                          setAdminSelected(rowData);
                                          setToggle(true);
                                        }}
                                        to="#"
                                      >
                                        <i className="feather-eye"></i>View
                                        Details
                                      </Link>
                                    </td>
                                  )}
                                />
                              </DataTable>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-footer">
                    <div className="row">
                      <div className="col-md-6">
                        <div id="tablelength" />
                      </div>
                      <div className="col-md-6">
                        <div id="tablepage" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* /Page Content */}
        <>
          {/* complete Modal */}
          {toggle && (
            <AdminBookingDetails
              bookingData={adminSelected}
              setToggle={setToggle}
              toggle={toggle}
            />
          )}
          {/* /complete Modal */}
        </>
      </>
    </div>
  );
};

export default BookingCompleted;
