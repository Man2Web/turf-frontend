import React, { useEffect, useRef, useState } from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import jsPDF from "jspdf";
import { Link, useParams } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import axios from "axios";
import { dateFormat } from "../../../utils/dateFormat";
import { formatTime } from "../../../utils/formatTime";
import { decimalNumber } from "../../../utils/decimalNumber";
import { formatEndTime } from "../../../utils/formatEndTime";
import Loader from "../Loader";

const BookingSuccess = () => {
  const routes = all_routes;
  const { t_id } = useParams();
  const [bookingData, setBookingData] = useState<SuccessBookingData>();

  const pdfRef = useRef<HTMLDivElement>(null);

  const getBookingData = async (id: string) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}booking/get/${id}`
    );
    console.log(response.data);
    setBookingData(response.data);
  };

  useEffect(() => {
    if (t_id) {
      getBookingData(t_id);
    }
  }, []);

  const isAdmin = localStorage.getItem("adminId");

  const isUser = localStorage.getItem("userId");

  const redirectUrl = () => {
    if (isAdmin) {
      return routes.adminDashboard;
    } else if (isUser) {
      return routes.userDashboard;
    } else {
      return routes.home;
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });
    if (pdfRef.current) {
      doc.html(pdfRef.current, {
        async callback(doc) {
          await doc.save("document");
        },
      });
    }
  };

  return (
    <>
      {!bookingData && <Loader />}
      {bookingData && (
        <div
          ref={pdfRef}
          style={{ maxWidth: "80%" }}
          className="modal-dialog modal-dialog-centered modal-md mt-4"
        >
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <div className="form-header modal-header-title">
                <h4 className="">
                  Court Booking Details
                  <span
                    className="badge ms-2"
                    style={{ backgroundColor: "grey", color: "white" }}
                  >{`ID: ${bookingData.booking[0].transaction_id}`}</span>
                  <span className="badge bg-success ms-2">Paid</span>
                </h4>
              </div>
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
                    {bookingData.booking.map((data, index) => (
                      <div
                        key={index}
                        className="appointment-info appoin-border double-row"
                      >
                        <ul className="appointmentset">
                          <li>
                            <h6>Booking Date</h6>
                            <p>{dateFormat(data.booking_date)}</p>
                          </li>
                          <li>
                            <h6>Booking Start Time</h6>
                            <p>{formatTime(data.booking_time)}</p>
                          </li>
                          <li>
                            <h6>Booking End Time</h6>
                            <p>
                              {formatEndTime(data.booking_time, data.duration)}
                            </p>
                          </li>
                          <li>
                            <h6>Booked On</h6>
                            <p>{dateFormat(data.booked_on)}</p>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* Payment Details */}
                  <div className="card dashboard-card court-information">
                    <div className="card-header">
                      <h4>Payment Details</h4>
                    </div>
                    <div className="appointment-info appoin-border double-row">
                      <ul className="appointmentset">
                        <li>
                          <h6>Total </h6>
                          <p className="color-green">
                            ₹
                            {decimalNumber(
                              Number(bookingData?.booking[0].amount_paid) +
                                Number(bookingData?.booking[0].pay_required)
                            )}
                          </p>
                        </li>
                        <li>
                          <h6>Total Amount Paid</h6>
                          <p className="color-green">
                            ₹
                            {decimalNumber(bookingData?.booking[0].amount_paid)}
                          </p>
                        </li>
                        <li>
                          <h6>Need to pay at Venue</h6>
                          <p className="color-green">
                            ₹
                            {decimalNumber(
                              bookingData?.booking[0].pay_required
                            )}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="appointment-info appoin-border double-row">
                      <ul className="appointmentset">
                        <li>
                          <h6>Transaction ID</h6>
                          <p>{bookingData?.booking[0].transaction_id}</p>
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
                          {bookingData?.booking[0].payment_mode ? (
                            <p>Online</p>
                          ) : (
                            <p>Offline</p>
                          )}
                        </li>
                        {!bookingData?.booking[0].payment_mode && (
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
              </div>
              {/* /Court Request */}
              <div className="d-flex justify-content-center my-4 gap-2">
                <button
                  onClick={() => {
                    generatePdf();
                  }}
                  className="btn btn-primary btn-icon"
                >
                  <i className="feather-mail me-1" />
                  Download PDF
                </button>
                <Link to={redirectUrl()} className="btn btn-primary btn-icon">
                  <i className="feather-arrow-left-circle me-1" />
                  {`Back to ${!isAdmin && !isUser ? "Home" : "Dashboard"}`}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingSuccess;
