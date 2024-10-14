import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
// import { bookingCompletedData } from "../../../core/data/json/booking_completed";
import { all_routes } from "../../router/all_routes";
import axios from "axios";
import Loader from "../../components/common/Loader";
import { dateFormat } from "../../utils/dateFormat";
import AdminBookingDetails from "../../components/admin/admin-booking-details";
import UserMenuComponent from "../../components/user/userMenu";
import { formatTime } from "../../utils/formatTime";
import { formatEndTime } from "../../utils/formatEndTime";
import ButtonLoader from "../../components/common/button-loader";
import Slider from "react-slick";
import GridCard from "../../components/common/courts-list/grid-card";
import { decimalNumber } from "../../utils/decimalNumber";
import { getIconBySport } from "../../components/common/courts-list/list-card";
import { getSlotDurationInHrs } from "../../utils/slotDuration";

const UserBookingsPage = () => {
  const routes = all_routes;
  const userId = localStorage.getItem("userId");
  const [todaysBooking, setTodaysBooking] = useState<BookingData[]>([]);
  const [previousBooking, setPreviousBooking] = useState<BookingData[]>([]);
  const [upcomingBooking, setUpcomingBooking] = useState<BookingData[]>([]);
  const [images, setImages] = useState<any>();
  const [currentData, setCurrentData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [infiniteLoading, setInfiniteLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [dataToggle, setDataToggle] = useState<number>(1);
  const [adminSelected, setAdminSelected] = useState<BookingData>();
  const [searchInput, setSearchInput] = useState("");
  const [totalPrevCount, setTotalPrevCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);

  // Reference for the element that will trigger the loading when it appears in view
  const loadMoreRef = useRef(null);

  const getBookingData = async () => {
    try {
      setInfiniteLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/booking/${userId}`,
        {
          params: {
            limit: limit,
            offset: offset,
          },
        }
      );
      console.log(response.data);
      if (response.data.upcomingBookings) {
        setUpcomingBooking(response.data.upcomingBookings);
      }
      if (response.data.previousBookings) {
        setPreviousBooking((prev) => {
          const mergedBookings = [...prev, ...response.data.previousBookings];

          // Create a Map to filter duplicates based on the booking.id
          const uniqueBookings = new Map(
            mergedBookings.map((booking) => [booking.id, booking])
          );

          return Array.from(uniqueBookings.values());
        });

        setTotalPrevCount(Number(response.data.totalCount)); // Convert totalCount to number
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInfiniteLoading(false);
    }
  };

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting && previousBooking.length < totalPrevCount) {
        setOffset((prevOffset) => prevOffset + limit); // Load more data when the target is in view
      }
    },
    [previousBooking.length, totalPrevCount, limit]
  );

  useEffect(() => {
    setLoading(true);
    getBookingData().finally(() => setLoading(false)); // Initial load
  }, []); // Only run on mount

  useEffect(() => {
    if (offset > 0) {
      getBookingData(); // Fetch more data when offset changes
    }
  }, [offset]); // Fetch more when offset changes

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Observe the entire viewport
      rootMargin: "200px", // Load data 200px before reaching the element
      threshold: 1.0, // Trigger when the element is fully in view
    });

    const currentLoadMoreRef = loadMoreRef.current;

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef); // Start observing the target element
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef); // Stop observing on unmount
      }
    };
  }, [handleObserver]);

  const fetchImages = async () => {
    const imagesData = upcomingBooking.map(async (bookingData) => {
      try {
        const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${bookingData.courtDetails.user_id}/${bookingData.courtDetails.id}/${bookingData.imagesData.image_url}`;
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        const blob = new Blob([response.data], { type: "image/webp" });
        const imgSrc = URL.createObjectURL(blob);
        return imgSrc;
      } catch (error) {
        console.error(error);
        return null;
      }
    });
    const resolvedImages = await Promise.all(imagesData);
    setImages(resolvedImages);
  };

  useEffect(() => {
    fetchImages();
  }, [upcomingBooking]);

  const sliderOptions = {
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2, // Scroll one slide at a time for smoother experience
    responsive: [
      {
        breakpoint: 1200, // For larger screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992, // For medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For small mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Disable arrows on smaller screens
        },
      },
    ],
  };

  return (
    <div>
      {/* Dashboard Menu */}
      <UserMenuComponent />
      {/* /Dashboard Menu */}
      {/* Page Content */}
      <div className="content court-bg">
        <div className="container">
          {upcomingBooking.length > 0 && (
            <div className="row mb-4">
              <div className="col-sm-12">
                <div className="court-tab-content">
                  <div className="card card-tableset">
                    <div className="card-body">
                      <div className="court-table-head mb-4">
                        <h4>Upcoming Bookings</h4>
                        <p>
                          Effortlessly track and manage your upcoming bookings
                        </p>
                      </div>
                      <Slider {...sliderOptions} className="venue-space">
                        {upcomingBooking?.map(
                          (booking: BookingData, idx: number) => {
                            return (
                              <div key={idx} className="h-6 mb-4 px-2">
                                <div className="wrapper">
                                  <div className="listing-item listing-item-grid">
                                    <div className="listing-img">
                                      <Link
                                        to={`${routes.courtDetailsLink}/${booking.courtDetails.id}`}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={images && images[idx]}
                                          alt="court img"
                                        />
                                      </Link>
                                      <div className="fav-item-venues">
                                        {booking.courtDetails.featured && (
                                          <span className="tag tag-blue">
                                            Featured
                                          </span>
                                        )}
                                        <h5 className="tag tag-primary">
                                          ₹{decimalNumber(10000)}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="listing-content">
                                      <div className="list-reviews d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <h5 className="listing-title d-flex align-items-center m-0">
                                            <Link
                                              to={`${routes.courtDetailsLink}/${booking.courtDetails.id}`}
                                            >
                                              {booking.courtDetails.court_name}
                                            </Link>
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="listing-details-group">
                                        <ul
                                          style={{ fontWeight: "200" }}
                                          className="listing-details-info"
                                        >
                                          <li className="mb-2">
                                            <span>
                                              <i>
                                                {getIconBySport(
                                                  booking.courtDetails
                                                    .court_type
                                                )}
                                              </i>
                                              {`${booking.courtDetails.court_type}`}
                                            </span>
                                            <span>
                                              <i className="feather-clock" />
                                              {`${dateFormat(booking.booking_date)}`}
                                            </span>
                                            <span>
                                              <i className="feather-sun" />
                                              {`${formatTime(booking.booking_time)} - ${formatTime(getSlotDurationInHrs(booking.booking_time, booking.duration))}`}
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="listing-button d-flex gap-2">
                                        <Link
                                          to={`${routes.courtDetailsLink}/${booking.courtDetails.id}/booking`}
                                          className="user-book-now btn btn-primary text-white w-100 justify-content-center"
                                        >
                                          <span>
                                            <i className="feather-calendar me-2 text-white" />
                                          </span>
                                          Reschedule
                                        </Link>
                                        <Link
                                          to={`${routes.courtDetailsLink}/${booking.courtDetails.id}/booking`}
                                          className="user-book-now btn btn-red text-white w-100 justify-content-center"
                                        >
                                          <span>
                                            <i className="feather-x me-2 text-white" />
                                          </span>
                                          Cancel
                                        </Link>
                                      </div>
                                      <div className="listing-button"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prev Bookings Data */}
          <div className="row">
            <div className="col-sm-12">
              <div className="court-tab-content">
                <div className="card card-tableset">
                  <div className="card-body">
                    <div className="coache-head-blk">
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="court-table-head">
                            <h4>Completed Bookings</h4>
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
                          {!loading && previousBooking.length !== 0 ? (
                            <DataTable
                              value={previousBooking}
                              className="table table-borderless datatable"
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
                                          {rowData.bookingDetails.phone_number}
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
                                    <h4>{dateFormat(rowData.booking_date)}</h4>
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
                          ) : (
                            <div className="d-flex justify-content-between align-items-center">
                              <h3 className="mb-0">No Bookings found</h3>
                              <Link
                                to={routes.ListingList}
                                className="btn btn-primary"
                              >
                                Book A Court
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div ref={loadMoreRef}>
                    {infiniteLoading && <p>Loading more bookings...</p>}
                  </div>
                </div>
                <div className="tab-footer">
                  <div className="row">
                    <div className="col-md-6">
                      <div id="tablelength" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* complete Modal */}
      {adminSelected && (
        <AdminBookingDetails
          dataToggle={dataToggle}
          bookingData={adminSelected}
          setToggle={setToggle}
          toggle={toggle}
        />
      )}
      {/* /complete Modal */}
    </div>
  );
};

export default UserBookingsPage;
