import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import AdminMenuComponent from "../../../components/admin/profile/adminMenu";
import axios from "axios";
import Loader from "../../../components/common/loader/Loader";
import { dateFormat } from "../../../utils/commin-utils/dateFormat";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { formatEndTime } from "../../../utils/commin-utils/formatEndTime";
import BookingConfirmModal from "../../../components/common/modal/booking-confirm";
import { useAppContext } from "../../../context/app-context";

interface countData {
  todaysBookingsCount: string;
  previousBookingsCount: string;
  upcomingBookingsCount: string;
}

const BookingCompleted = () => {
  const adminId = localStorage.getItem("adminId");
  const [todaysBooking, setTodaysBooking] = useState<SuccessBookingData[]>([]);
  const [previousBooking, setPreviousBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [upcomingBooking, setUpcomingBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [currentData, setCurrentData] = useState<SuccessBookingData[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [dataToggle, setDataToggle] = useState<number>(1);
  const [adminSelected, setAdminSelected] = useState<SuccessBookingData>();
  const [bookingDataOffsets, setBookingDataOffsets] = useState({
    previousBookingSettings: 0,
    todayBookingSettings: 0,
    upcomingBookingSettings: 0,
  });
  const [countData, setCountData] = useState<countData>();
  const [searchInput, setSearchInput] = useState("");
  const { loading, setLoading } = useAppContext();

  const limit = 18;

  const loadMoreRef = useRef(null);

  const checkOffset = () => {
    if (dataToggle === 0) {
      return previousBooking.length < Number(countData?.previousBookingsCount);
    } else if (dataToggle === 1) {
      return todaysBooking.length < Number(countData?.todaysBookingsCount);
    } else {
      return upcomingBooking.length < Number(countData?.upcomingBookingsCount);
    }
  };

  const setOffset = () => {
    if (dataToggle === 0) {
      setBookingDataOffsets((prevData) => ({
        ...prevData,
        previousBookingSettings: prevData.previousBookingSettings + limit,
      }));
    } else if (dataToggle === 1) {
      setBookingDataOffsets((prevData) => ({
        ...prevData,
        todayBookingSettings: prevData.todayBookingSettings + limit,
      }));
    } else {
      setBookingDataOffsets((prevData) => ({
        ...prevData,
        upcomingBookingSettings: prevData.upcomingBookingSettings + limit,
      }));
    }
  };

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting && checkOffset()) {
        setOffset();
      }
    },
    [bookingDataOffsets, countData, dataToggle]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px",
      threshold: 1.0,
    });
    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }
    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [handleObserver, dataToggle]);

  const getBookingData = useCallback(async () => {
    const data = {
      todayBookingSettings: bookingDataOffsets.todayBookingSettings,
      upcomingBookingSettings: bookingDataOffsets.upcomingBookingSettings,
      previousBookingSettings: bookingDataOffsets.previousBookingSettings,
      limit,
    };
    try {
      setLoading({ status: true, description: "Fetching Bookings Data..." });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/booking/${adminId}`,
        { params: data }
      );

      const filterNewBookings = (
        prevData: SuccessBookingData[],
        newData: SuccessBookingData[]
      ) => {
        if (newData.length > 0) {
          return newData?.filter(
            (newBooking) =>
              !prevData.some(
                (prevBooking) =>
                  prevBooking.transaction_id === newBooking.transaction_id
              )
          );
        } else {
          return [];
        }
      };

      if (dataToggle === 1 && response.data.todaysBookings.length > 0) {
        setCurrentData((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.todaysBookings),
        ]);
      }
      setCountData(response.data.countData);

      if (response.data.todaysBookings.length > 0) {
        setTodaysBooking((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.todaysBookings),
        ]);
      }

      if (response.data.previousBookings.length > 0) {
        setPreviousBooking((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.previousBookings),
        ]);
      }

      if (response.data.upcomingBookings.length > 0) {
        setUpcomingBooking((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.upcomingBookings),
        ]);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading({ status: true, description: "Fetching Booking Data..." });
    }
  }, [adminId, bookingDataOffsets, limit, dataToggle]);

  useEffect(() => {
    getBookingData();
  }, [bookingDataOffsets]);

  useEffect(() => {
    if (dataToggle === 0) {
      setCurrentData(previousBooking);
    } else if (dataToggle === 1) {
      setCurrentData(todaysBooking);
    } else if (dataToggle === 2) {
      setCurrentData(upcomingBooking);
    }
  }, [dataToggle, todaysBooking, previousBooking, upcomingBooking]);

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
                            {!loading && (
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
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div ref={loadMoreRef}></div>
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
