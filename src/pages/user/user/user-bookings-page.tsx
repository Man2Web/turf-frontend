import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import axios from "axios";
import Loader from "../../../components/common/loader/Loader";
import { dateFormat } from "../../../utils/commin-utils/dateFormat";
import UserMenuComponent from "../../../components/user/profile/userMenu";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import Slider from "react-slick";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import { getSlotDurationInHrs } from "../../../utils/court-utils/slotDuration";
import { getUserBookingSliderData } from "../../../utils/data-list/slidersData";
import BookingConfirmModal from "../../../components/common/modal/booking-confirm";
import { Badge, Button, Card, List } from "antd";
import Meta from "antd/es/card/Meta";
import {
  ClockIcon,
  IndianRupee,
  LocationPin,
} from "../../../utils/icons/icons";
import { getIconsBySport } from "../../../utils/icons/getIconsBySport";

const UserBookingsPage = () => {
  const routes = all_routes;
  const userId = localStorage.getItem("userId");
  const [previousBooking, setPreviousBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [upcomingBooking, setUpcomingBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [infiniteLoading, setInfiniteLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [adminSelected, setAdminSelected] = useState<SuccessBookingData>();
  const [totalPrevCount, setTotalPrevCount] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const limit = 20;

  // Reference for the element that will trigger the loading when it appears in view
  const loadMoreRef = useRef(null);

  const getBookingData = async () => {
    const filterNewBookings = (
      prevData: SuccessBookingData[],
      newData: SuccessBookingData[],
      upcoming: boolean
    ) => {
      if (!upcoming) {
        return newData.filter(
          (newBooking) =>
            !prevData.some(
              (prevBooking) =>
                prevBooking.transaction_id === newBooking.transaction_id
            )
        );
      } else {
        return newData.filter(
          (newBooking) =>
            !prevData.some(
              (prevBooking) =>
                prevBooking.transaction_id === newBooking.transaction_id
            )
        );
      }
    };
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
      if (response.data.upcomingBookings) {
        setUpcomingBooking(response.data.upcomingBookings);
      }
      if (response.data.previousBookings) {
        setPreviousBooking((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.previousBookings, false),
        ]);
        setTotalPrevCount(Number(response.data.totalCount)); // Convert totalCount to number
      }
    } catch (error) {
      // console.error(error);
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

  const userBookingsSliderData = getUserBookingSliderData(
    upcomingBooking.length
  );
  return (
    <div>
      {/* Dashboard Menu */}
      <UserMenuComponent />
      <Loader
        loader={loading}
        loadingDescription="Fetching User Bookings Data..."
      />
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
                      <Slider
                        {...userBookingsSliderData}
                        className="venue-space"
                      >
                        {upcomingBooking?.map(
                          (booking: SuccessBookingData, idx: number) => {
                            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${booking.admin_id}/${booking.court_info.court_id}/${booking.court_details.images[0]}`;
                            return (
                              <div key={idx} className="h-6 mb-4 px-2">
                                {/* <div className="wrapper">
                                  <div className="listing-item listing-item-grid">
                                    <div className="listing-img">
                                      <Link
                                        to={`${routes.courtDetailsLink}/${booking.court_info.court_id}`}
                                      >
                                        <img
                                          className="card-img-top"
                                          src={imageUrl}
                                          alt="court img"
                                        />
                                      </Link>
                                      <div className="fav-item-venues">
                                        {booking.court_info.featured && (
                                          <span className="tag tag-blue">
                                            Featured
                                          </span>
                                        )}
                                        <h5 className="tag tag-primary">
                                          ₹{decimalNumber(booking.pay_required)}
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="listing-content">
                                      <div className="list-reviews d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <h5 className="listing-title d-flex align-items-center m-0">
                                            <Link
                                              to={`${routes.courtDetailsLink}/${booking.court_info.court_id}`}
                                            >
                                              {booking.court_info.court_name}
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
                                                  booking.court_info.court_type
                                                )}
                                              </i>
                                              {`${booking.court_info.court_type}`}
                                            </span>
                                            <span>
                                              <i className="feather-clock" />
                                              {`${dateFormat(booking.booking_date)}`}
                                            </span>
                                            <span>
                                              <i className="feather-sun" />
                                              {`${formatTime(booking.booking_time[0])} - ${formatTime(getSlotDurationInHrs(booking.booking_time[booking.booking_time.length - 1], Number(booking.duration)))}`}
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="listing-button d-flex flex-column gap-2">
                                        <Link
                                          to={`${routes.courtDetailsLink}/${booking.court_info.court_id}/booking`}
                                          className="user-book-now btn btn-primary text-white justify-content-center w-100"
                                        >
                                          <span>
                                            <i className="feather-calendar me-2 text-white" />
                                          </span>
                                          Reschedule
                                        </Link>
                                        <button
                                          onClick={() => {
                                            setAdminSelected(booking);
                                            setToggle(true);
                                          }}
                                          className="user-book-now btn btn-secondary text-white justify-content-center w-100"
                                        >
                                          <i className="feather-search me-2 text-white" />
                                          View Details
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                <Card
                                  hoverable
                                  actions={[
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        setAdminSelected(booking);
                                        setToggle(true);
                                      }}
                                      key={idx}
                                    >
                                      <Button className="w-100" type="primary">
                                        View Details
                                      </Button>
                                    </Link>,
                                  ]}
                                  cover={
                                    <Link
                                      to={`${routes.courtDetailsLink}/${booking.court_id}`}
                                      className="position-relative"
                                    >
                                      {booking.court_info.featured && (
                                        <Badge.Ribbon
                                          text="Featured"
                                          color="primary"
                                        />
                                      )}
                                      <img
                                        alt="example"
                                        src={imageUrl}
                                        className="rounded-top"
                                      />
                                    </Link>
                                  }
                                >
                                  <Meta
                                    title={
                                      <div className="d-flex justify-content-between align-items-center">
                                        <Link
                                          to={`${routes.courtDetailsLink}/${booking.court_id}`}
                                          className="mb-0"
                                        >
                                          <p className="text-black">
                                            {booking.court_info.court_name}
                                          </p>
                                        </Link>
                                      </div>
                                    }
                                    description={
                                      <div>
                                        <p className="mb-0 d-flex align-items-center gap-2">
                                          {getIconsBySport(
                                            booking.court_info.court_type
                                          )}
                                          {booking.court_info.court_type}
                                        </p>
                                        <p className="mb-0 d-flex align-items-center gap-2">
                                          <IndianRupee />
                                          {decimalNumber(
                                            booking.pay_required
                                          )}{" "}
                                          /- Payment Due
                                        </p>
                                        <p className="mb-0 d-flex align-items-center gap-2">
                                          <ClockIcon />
                                          {`${dateFormat(booking.booking_date)}, `}
                                          {`${formatTime(booking.booking_time[0])} - ${formatTime(getSlotDurationInHrs(booking.booking_time[booking.booking_time.length - 1], Number(booking.duration)))}`}
                                        </p>
                                        <p className="text-capitalize mb-0 d-flex align-items-center gap-2">
                                          <LocationPin />
                                          {`${booking.court_details.city}`}
                                        </p>
                                      </div>
                                    }
                                  />
                                </Card>
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
                          {!loading && previousBooking.length !== 0 ? (
                            previousBooking.map(
                              (bookingData: SuccessBookingData, index) => {
                                const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${bookingData.admin_id}/${bookingData.court_info.court_id}/${bookingData.court_details.images[0]}`;
                                return (
                                  <div
                                    key={index}
                                    className="col-lg-12 col-md-12 mb-2"
                                  >
                                    {/* <div className="featured-venues-item venue-list-item">
                                      <div className="listing-item listing-item-grid">
                                        <div className="listing-img d-none d-md-block">
                                          <Link
                                            to={`${routes.courtDetailsLink}/${bookingData.court_info.court_id}`}
                                          >
                                            <img
                                              style={{
                                                height: "200px",
                                                width: "360px",
                                              }}
                                              src={imageUrl}
                                              alt="court img"
                                            />
                                          </Link>
                                          <div className="fav-item-venues">
                                            {bookingData.court_info
                                              .featured && (
                                              <span className="tag tag-blue">
                                                Featured
                                              </span>
                                            )}
                                            <h5 className="tag tag-primary">
                                              ₹
                                              {decimalNumber(
                                                bookingData.amount_paid
                                              )}
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="listing-content">
                                          <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="listing-title m-0">
                                              <Link
                                                to={`${routes.courtDetailsLink}/${bookingData.court_info.court_id}`}
                                              >
                                                {
                                                  bookingData.court_info
                                                    .court_name
                                                }
                                              </Link>
                                            </h5>
                                            <div className="list-reviews"></div>
                                          </div>
                                          <div
                                            style={{ fontWeight: "200" }}
                                            className="listing-details-group"
                                          >
                                            <ul
                                              style={{ fontWeight: "200" }}
                                              className="listing-details-info"
                                            >
                                              <li className="mb-2">
                                                <span>
                                                  <i>
                                                    {getIconBySport(
                                                      bookingData.court_info
                                                        .court_type
                                                    )}
                                                  </i>
                                                  {`${
                                                    bookingData.court_info
                                                      .court_type
                                                  }`}
                                                </span>
                                                <span>
                                                  <i className="feather-clock" />
                                                  {`${dateFormat(bookingData.booked_on)}`}
                                                </span>
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="d-flex justify-content-end gap-2 flex-column flex-lg-row">
                                            <Link
                                              to={`${routes.courtDetailsLink}/${bookingData.court_info.court_id}/booking`}
                                              className="user-book-now btn btn-primary text-white"
                                            >
                                              <span>
                                                <i className="feather-calendar me-2 text-white" />
                                              </span>
                                              Book Again
                                            </Link>
                                            <Link
                                              to="#"
                                              onClick={() => {
                                                setAdminSelected(bookingData);
                                                setToggle(true);
                                              }}
                                              className="user-book-now btn btn-secondary text-white"
                                            >
                                              <span>
                                                <i className="feather-search me-2 text-white" />
                                              </span>
                                              View Details
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                    <List
                                      className="shadow-sm hover-shadow-lg rounded"
                                      itemLayout="horizontal"
                                    >
                                      <List.Item>
                                        <List.Item.Meta
                                          avatar={
                                            <Link
                                              to={`${routes.courtDetailsLink}/${bookingData.court_info.court_id}`}
                                              className="position-relative d-none d-md-block"
                                            >
                                              {bookingData.court_info
                                                .featured && (
                                                <Badge.Ribbon
                                                  text="Featured"
                                                  color="primary"
                                                />
                                              )}
                                              <img
                                                alt="example"
                                                src={imageUrl}
                                                className="object-fit-cover"
                                                style={{
                                                  width: "250px",
                                                  borderTopLeftRadius: "5px",
                                                  borderBottomLeftRadius: "5px",
                                                }}
                                              />
                                            </Link>
                                          }
                                          title={
                                            <div className="d-flex justify-content-between align-items-center py-2">
                                              <Link
                                                to={`${routes.courtDetailsLink}/${bookingData.court_info.court_id}`}
                                                className="mb-0"
                                              >
                                                <p className="text-black">
                                                  {
                                                    bookingData.court_info
                                                      .court_name
                                                  }
                                                </p>
                                              </Link>
                                            </div>
                                          }
                                          description={
                                            <div>
                                              <p className="mb-0 d-flex align-items-center gap-2">
                                                {getIconsBySport(
                                                  bookingData.court_info
                                                    .court_type
                                                )}
                                                {`${
                                                  bookingData.court_info
                                                    .court_type
                                                }`}
                                              </p>
                                              <p className="mb-0 d-flex align-items-center gap-2">
                                                <IndianRupee />
                                                {decimalNumber(
                                                  Number(
                                                    bookingData.amount_paid
                                                  ) +
                                                    Number(
                                                      bookingData.pay_required
                                                    )
                                                )}{" "}
                                                /- Paid
                                              </p>
                                              <p className="mb-0 d-flex align-items-center gap-2">
                                                <ClockIcon />
                                                {`${dateFormat(bookingData.booking_date)}, `}
                                                {`${formatTime(bookingData.booking_time[0])} - ${formatTime(getSlotDurationInHrs(bookingData.booking_time[bookingData.booking_time.length - 1], Number(bookingData.duration)))}`}
                                              </p>
                                              <p className="text-capitalize mb-0 d-flex align-items-center gap-2">
                                                <LocationPin />
                                                {`${bookingData.court_details.city}`}
                                              </p>
                                              <div className="py-2 d-flex justify-content-end">
                                                <Link
                                                  style={{
                                                    paddingRight: "10px",
                                                  }}
                                                  className="justify-content-end"
                                                  onClick={() => {
                                                    setAdminSelected(
                                                      bookingData
                                                    );
                                                    setToggle(true);
                                                  }}
                                                  to="#"
                                                >
                                                  <Button
                                                    className="w-100"
                                                    type="default"
                                                  >
                                                    View Details
                                                  </Button>
                                                </Link>
                                                <Link
                                                  style={{
                                                    paddingRight: "10px",
                                                  }}
                                                  className="justify-content-end"
                                                  to={`${routes.courtDetailsLink}/${bookingData.court_info.court_id}/booking`}
                                                >
                                                  <Button
                                                    className="w-100"
                                                    type="primary"
                                                  >
                                                    Book Again
                                                  </Button>
                                                </Link>
                                              </div>
                                            </div>
                                          }
                                        />
                                      </List.Item>
                                    </List>
                                  </div>
                                );
                              }
                            )
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* complete Modal */}
      {adminSelected && (
        <BookingConfirmModal
          toggleModal={toggle}
          bookingData={adminSelected}
          setToggleModal={setToggle}
        />
      )}
      {/* /complete Modal */}
    </div>
  );
};

export default UserBookingsPage;
