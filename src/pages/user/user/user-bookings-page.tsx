import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
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
import { useAppContext } from "../../../context/app-context";
import { fetchUserBookings } from "../../../utils/user-utils/fetchUserBookings";

const UserBookingsPage = () => {
  const routes = all_routes;
  const userId = localStorage.getItem("userId");
  const [toggle, setToggle] = useState<boolean>(false);
  const [adminSelected, setAdminSelected] = useState<SuccessBookingData>();
  const [offset, setOffset] = useState<number>(0);
  const { loading } = useAppContext();
  const observerTarget = useRef(null);

  const { previousBooking, upcomingBooking, totalPrevCount } =
    fetchUserBookings(userId, offset);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          previousBooking.length < Number(totalPrevCount)
        ) {
          setOffset((prevData) => prevData + 20);
        }
      },
      { threshold: 0.5 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, totalPrevCount, previousBooking]);
  const userBookingsSliderData = getUserBookingSliderData(
    upcomingBooking.length
  );
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
                      <Slider
                        {...userBookingsSliderData}
                        className="venue-space"
                      >
                        {upcomingBooking?.map(
                          (booking: SuccessBookingData, idx: number) => {
                            const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${booking.admin_id}/${booking.court_info.court_id}/${booking.court_details.images[0]}`;
                            return (
                              <div key={idx} className="h-6 mb-4 px-2">
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
                          {previousBooking.length > 0 ? (
                            previousBooking.map(
                              (bookingData: SuccessBookingData, index) => {
                                const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${bookingData.admin_id}/${bookingData.court_info.court_id}/${bookingData.court_details.images[0]}`;
                                return (
                                  <div
                                    key={index}
                                    className="col-lg-12 col-md-12 mb-2"
                                  >
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
                  <div ref={observerTarget} />
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
