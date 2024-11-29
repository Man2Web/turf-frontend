import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import AdminMenuComponent from "../../../components/admin/profile/adminMenu";
import { dateFormat } from "../../../utils/commin-utils/dateFormat";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { formatEndTime } from "../../../utils/commin-utils/formatEndTime";
import BookingConfirmModal from "../../../components/common/modal/booking-confirm";
import { fetchAdminBookings } from "../../../utils/admin-utils/fetchAdminBookings";

const BookingCompleted = () => {
  const adminId = localStorage.getItem("adminId");
  const [dataToggle, setDataToggle] = useState<number>(1);
  const [searchInput, setSearchInput] = useState("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [adminSelected, setAdminSelected] = useState<SuccessBookingData>();
  const observerTarget = useRef(null);
  const currentData = fetchAdminBookings(adminId, dataToggle, observerTarget);
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
                            <DataTable
                              value={currentData}
                              className="table table-borderless datatable"
                            >
                              <Column
                                sortable
                                field="courtName"
                                header="CourtName"
                                body={(rowData: SuccessBookingData) => (
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
                                          {rowData.court_info.court_name}
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
                                body={(rowData: SuccessBookingData) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      <span className="table-head-name table-name-user flex-grow-1">
                                        <Link to={"routes.myProfile"}>
                                          {`${rowData.booking_info.fname} ${rowData.booking_info.lname}`}
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
                                body={(rowData: SuccessBookingData) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      <span className="table-head-name table-name-user flex-grow-1">
                                        <Link to={"routes.myProfile"}>
                                          {rowData.booking_info.phone_number}
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
                                body={(rowData: SuccessBookingData) => (
                                  <td className="table-date-time">
                                    <h4>{dateFormat(rowData.booking_date)}</h4>
                                  </td>
                                )}
                              />
                              <Column
                                sortable
                                field="sTime"
                                header="Start Time"
                                body={(rowData: SuccessBookingData) => (
                                  <td className="table-date-time">
                                    <h4>
                                      <span>
                                        {formatTime(rowData.booking_time[0])}
                                      </span>
                                    </h4>
                                  </td>
                                )}
                              />
                              <Column
                                sortable
                                field="eTime"
                                header="End Time"
                                body={(rowData: SuccessBookingData) => (
                                  <td className="table-date-time">
                                    <h4>
                                      <span>
                                        {formatEndTime(
                                          rowData.booking_time[
                                            rowData.booking_time.length - 1
                                          ],
                                          rowData.duration
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
                                body={(rowData: SuccessBookingData) => (
                                  <>
                                    {rowData.payment_mode ? (
                                      <td className="table-date-time">
                                        <h4 className="text-success">Online</h4>
                                      </td>
                                    ) : (
                                      <td className="table-date-time">
                                        <h4 className="text-danger">Offline</h4>
                                      </td>
                                    )}
                                  </>
                                )}
                              />
                              <Column
                                sortable
                                field="transaction_id"
                                header="Transaction ID"
                                body={(rowData: SuccessBookingData) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      <span className="table-head-name table-name-user flex-grow-1">
                                        <Link to="#">
                                          {rowData.transaction_id}
                                        </Link>
                                      </span>
                                    </h2>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                sortable
                                field="details"
                                header="Details"
                                body={(rowData: SuccessBookingData) => (
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div ref={observerTarget} />
                  {/* <div className="tab-footer">
                    <div className="row">
                      <div className="col-md-6">
                        <div id="tablelength" />
                      </div>
                      <div className="col-md-6">
                        <div id="tablepage" />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* /Page Content */}
        <>
          {/* complete Modal */}
          {toggle && (
            <BookingConfirmModal
              toggleModal={toggle}
              bookingData={adminSelected}
              setToggleModal={setToggle}
            />
          )}
          {/* /complete Modal */}
        </>
      </>
    </div>
  );
};

export default BookingCompleted;
