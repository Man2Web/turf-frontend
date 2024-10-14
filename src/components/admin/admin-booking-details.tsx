import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../utils/dateFormat";
import { formatTime } from "../../utils/formatTime";
import { getSlotDurationInHrs } from "../../utils/slotDuration";
import { decimalNumber } from "../../utils/decimalNumber";
import { all_routes } from "../../router/all_routes";

const AdminBookingDetails = ({
  bookingData,
  setToggle,
  toggle,
  dataToggle,
}: {
  bookingData: BookingData | undefined;
  setToggle: any;
  toggle: boolean;
  dataToggle?: number;
}) => {
  const routes = all_routes;
  const [slotEndTime, setSlotEndTime] = useState<string>();
  const serviceCharge = Number(process.env.REACT_APP_SERVICE_CHARGE) || 0;

  const isUser = localStorage.getItem("userId");

  useEffect(() => {
    if (bookingData?.booking_time) {
      const endTime = getSlotDurationInHrs(
        bookingData?.booking_time,
        bookingData?.duration
      );
      setSlotEndTime(endTime);
    }
  }, [bookingData]);

  console.log(dataToggle);

  // Remove the curly braces from around the return statement
  return bookingData ? (
    <div
      className={`modal custom-modal fade request-modal ${toggle ? "show" : ""}`}
      style={{ display: toggle ? "block" : "none" }}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <div className="form-header modal-header-title">
              <h4 className="mb-0">
                Court Booking Details
                <span
                  className="badge ms-2"
                  style={{ backgroundColor: "grey", color: "white" }}
                >{`ID: ${bookingData.id}`}</span>
                <span className="badge bg-success ms-2">Paid</span>
              </h4>
            </div>
            <Link
              className="close"
              onClick={() => setToggle(false)}
              aria-label="Close"
              to={""}
            >
              <span className="align-center" aria-hidden="true">
                <i className="feather-x" />
              </span>
            </Link>
          </div>

          <div className="modal-body">
            {/* Court Request */}
            <div className="row">
              <div className="col-lg-12">
                {/* Court Details */}
                <div className="card dashboard-card court-information">
                  <div className="card-header">
                    <h4>Court Information</h4>
                  </div>
                  <div className="appointment-info appoin-border double-row">
                    <ul className="appointmentset">
                      <li>
                        <h6>Court ID</h6>
                        <p>{bookingData?.courtDetails.id}</p>
                      </li>
                      <li>
                        <h6>Court Name</h6>
                        <p>{bookingData?.courtDetails.court_name}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="appointment-info appoin-border double-row">
                    <ul className="appointmentset">
                      <li>
                        <h6>Court Email</h6>
                        <a
                          className="text-success"
                          href={`mailto: ${bookingData.courtDetails.email}`}
                        >
                          {`${bookingData.courtDetails.email}`}
                        </a>
                      </li>
                      <li>
                        <h6>Court Number</h6>
                        <a
                          className="text-success"
                          href={`tel:+91${bookingData.courtDetails.phone_number}`}
                        >
                          {`+91${bookingData.courtDetails.phone_number}`}
                        </a>
                      </li>
                      <li>
                        <h6>Court Location</h6>
                        <a
                          className="text-success"
                          target="_blank"
                          rel="noreferrer"
                          href={bookingData?.locationDetails?.location_link}
                        >
                          Open in Maps
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Bookie Details */}
                <div className="card dashboard-card court-information">
                  <div className="card-header">
                    <h4>Player Information</h4>
                  </div>
                  <div className="appointment-info appoin-border">
                    <ul className="appointmentset">
                      <li>
                        <h6>Player Name</h6>
                        <p>{`${bookingData.bookingDetails.fname} ${bookingData.bookingDetails.lname}`}</p>
                      </li>
                      {bookingData.bookingDetails.phone_number && (
                        <li>
                          <h6>Phone Number</h6>
                          <p>{bookingData.bookingDetails.phone_number}</p>
                        </li>
                      )}
                      <li>
                        <h6>Guests</h6>
                        <p>{bookingData.bookingDetails.guests}</p>
                      </li>
                      <li>
                        <h6>Additional Guests</h6>
                        <p>{bookingData.bookingDetails.add_guests}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Booking Details */}
                <div className="card dashboard-card court-information">
                  <div className="card-header">
                    <h4>Booking Information</h4>
                  </div>
                  <div className="appointment-info appoin-border">
                    <ul className="appointmentset">
                      <li>
                        <h6>Booking Date</h6>
                        <p>{dateFormat(bookingData?.booking_date)}</p>
                      </li>
                      <li>
                        <h6>Booking Start Time</h6>
                        <p>{formatTime(bookingData?.booking_time)}</p>
                      </li>
                      {slotEndTime && (
                        <li>
                          <h6>Booking End Time</h6>
                          <p>{formatTime(slotEndTime)}</p>
                        </li>
                      )}
                      <li>
                        <h6>Booked On</h6>
                        <p>{dateFormat(bookingData?.booked_on)}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Payment Details */}
                <div className="card dashboard-card court-information">
                  <div className="card-header">
                    <h4>Payment Details</h4>
                  </div>
                  <div className="appointment-info appoin-border double-row">
                    <ul className="appointmentset">
                      <li>
                        <h6>Total Amount Paid</h6>
                        <p className="color-green">
                          ₹{decimalNumber(bookingData?.amount_paid)}
                        </p>
                      </li>
                      <li>
                        <h6>Need to pay at Venue</h6>
                        <p className="color-green">
                          ₹{decimalNumber(bookingData?.pay_required)}
                        </p>
                      </li>
                      <li>
                        <h6>Service Charge</h6>
                        <p>₹{decimalNumber(serviceCharge)}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="appointment-info appoin-border double-row">
                    <ul className="appointmentset">
                      <li>
                        <h6>Transaction ID</h6>
                        <p>{bookingData?.transaction_id}</p>
                      </li>
                      {bookingData?.bookingDetails.pg_tid && (
                        <li>
                          <h6>PG Transaction ID</h6>
                          <p>{bookingData?.bookingDetails.pg_tid}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="appointment-info appoin-border">
                    <ul className="appointmentsetview">
                      <li>
                        <h6>Payment type</h6>
                        {bookingData?.payment_mode ? (
                          <p>Online</p>
                        ) : (
                          <p>Offline</p>
                        )}
                      </li>
                      {!bookingData?.payment_mode && (
                        <li>
                          <h6>Payment Mode</h6>
                          <p>Cash</p>
                        </li>
                      )}
                      {bookingData.bookingDetails.payment_type && (
                        <li>
                          <h6>Payment Type</h6>
                          <p>{bookingData?.bookingDetails?.payment_type}</p>
                        </li>
                      )}
                      {bookingData.bookingDetails.card_type && (
                        <li>
                          <h6>Card Type</h6>
                          <p>
                            {bookingData?.bookingDetails?.card_type.toLocaleLowerCase()}
                          </p>
                        </li>
                      )}
                      {bookingData.bookingDetails.bank_id && (
                        <li>
                          <h6>Bank ID</h6>
                          <p>{bookingData?.bookingDetails?.bank_id}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Court Request */}
            </div>
            <div className="d-flex justify-content-center mt-2">
              {isUser && dataToggle === 0 && (
                <Link
                  target="_blank"
                  to={`/user/court/${bookingData.court_id}/${bookingData.transaction_id}/${bookingData.bookingDetails.id}`}
                  className="btn btn-secondary"
                >
                  {bookingData.reviewDetails === null
                    ? "Add Review"
                    : "Update Review"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null; // Use null instead of empty fragment
};

export default AdminBookingDetails;
