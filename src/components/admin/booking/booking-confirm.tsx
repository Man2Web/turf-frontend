import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { Modal } from "react-bootstrap";
import { dateFormat } from "../../../utils/dateFormat";
import { formatTime } from "../../../utils/formatTime";
import { formatEndTime } from "../../../utils/formatEndTime";
import { decimalNumber } from "../../../utils/decimalNumber";
import axios from "axios";
import { saveAs } from "file-saver";
import ButtonLoader from "../../common/loader/button-loader";

const BookingConfirmModal = ({
  toggleModal,
  bookingData,
  setToggleModal,
}: {
  toggleModal: boolean;
  bookingData: SuccessBookingData | undefined;
  setToggleModal?: any;
}) => {
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const routes = all_routes;
  const getPdf = async (transaction_id: string) => {
    try {
      setButtonLoader(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}booking/download/${transaction_id}`,
        {
          responseType: "blob", // Important to handle the response as binary
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, `booking-confirmation-${transaction_id}.pdf`);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoader(false);
    }
  };
  return (
    <Modal
      show={toggleModal}
      onHide={() => {
        setToggleModal(false);
      }}
      backdrop="static"
      keyboard={false}
      centered
      className="modal fade w-100 modal-xl"
      id="bookingconfirmModal"
    >
      <div className="modal-content w-100">
        <div className="modal-header d-flex justify-content-between">
          <div className="form-header modal-header-title">
            <h4 className="">
              Court Booking Details
              <span
                className="badge ms-2"
                style={{ backgroundColor: "grey", color: "white" }}
              >{`ID: ${bookingData?.transaction_id}`}</span>
              <span className="badge bg-success ms-2">Paid</span>
            </h4>
          </div>
          {setToggleModal && (
            <button
              onClick={() => {
                setToggleModal(false);
              }}
              className="btn btn-red"
            >
              X
            </button>
          )}
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
                      <p>{bookingData?.court_info.court_id}</p>
                    </li>
                    <li>
                      <h6>Court Name</h6>
                      <p>{bookingData?.court_info.court_name}</p>
                    </li>
                  </ul>
                </div>
                <div className="appointment-info appoin-border double-row">
                  <ul className="appointmentset">
                    <li>
                      <h6>Court Email</h6>
                      <a
                        className="text-success"
                        href={`mailto: ${bookingData?.court_details.email}`}
                      >
                        {`${bookingData?.court_details.email}`}
                      </a>
                    </li>
                    <li>
                      <h6>Court Number</h6>
                      <a
                        className="text-success"
                        href={`tel:+91${bookingData?.court_details.phone_number}`}
                      >
                        {`+91${bookingData?.court_details.phone_number}`}
                      </a>
                    </li>
                    <li>
                      <h6>Court Location</h6>
                      <a
                        className="text-success"
                        target="_blank"
                        rel="noreferrer"
                        href={bookingData?.court_details?.location_link}
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
                      <p>{`${bookingData?.booking_info.fname} ${bookingData?.booking_info.lname}`}</p>
                    </li>
                    {bookingData?.booking_info.phone_number && (
                      <li>
                        <h6>Phone Number</h6>
                        <p>{bookingData?.booking_info.phone_number}</p>
                      </li>
                    )}
                    <li>
                      <h6>Guests</h6>
                      <p>{bookingData?.booking_info.guests}</p>
                    </li>
                    <li>
                      <h6>Additional Guests</h6>
                      <p>{bookingData?.booking_info.add_guests}</p>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Booking Details */}
              <div className="card dashboard-card court-information">
                <div className="card-header">
                  <h4>Booking Information</h4>
                </div>
                {bookingData?.booking_time?.map((time, index) => (
                  <div
                    key={index}
                    className="appointment-info appoin-border double-row"
                  >
                    <ul className="appointmentset">
                      <li>
                        <h6>Booking Date</h6>
                        <p>{dateFormat(bookingData.booking_date)}</p>
                      </li>
                      <li>
                        <h6>Booking Start Time</h6>
                        <p>{formatTime(time)}</p>
                      </li>
                      <li>
                        <h6>Booking End Time</h6>
                        <p>{formatEndTime(time, bookingData.duration)}</p>
                      </li>
                      <li>
                        <h6>Booked On</h6>
                        <p>{dateFormat(bookingData.booked_on)}</p>
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
                          Number(bookingData?.amount_paid) +
                            Number(bookingData?.pay_required)
                        )}
                      </p>
                    </li>
                    <li>
                      <h6>Total Amount Paid</h6>
                      <p className="color-green">
                        ₹{decimalNumber(Number(bookingData?.amount_paid))}
                      </p>
                    </li>
                    <li>
                      <h6>Need to pay at Venue</h6>
                      <p className="color-green">
                        ₹{decimalNumber(Number(bookingData?.pay_required))}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="appointment-info appoin-border double-row">
                  <ul className="appointmentset">
                    <li>
                      <h6>Transaction ID</h6>
                      <p>{bookingData?.transaction_id}</p>
                    </li>
                    {bookingData?.booking_info.pg_tid && (
                      <li>
                        <h6>PG Transaction ID</h6>
                        <p>{bookingData?.booking_info.pg_tid}</p>
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
                    {bookingData?.booking_info.payment_type && (
                      <li>
                        <h6>Payment Type</h6>
                        <p>{bookingData?.booking_info?.payment_type}</p>
                      </li>
                    )}
                    {bookingData?.booking_info.card_type && (
                      <li>
                        <h6>Card Type</h6>
                        <p>
                          {bookingData?.booking_info?.card_type.toLocaleLowerCase()}
                        </p>
                      </li>
                    )}
                    {bookingData?.booking_info.bank_id && (
                      <li>
                        <h6>Bank ID</h6>
                        <p>{bookingData?.booking_info?.bank_id}</p>
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
                bookingData?.transaction_id &&
                  getPdf(bookingData?.transaction_id);
              }}
              className="btn btn-primary btn-icon"
            >
              {buttonLoader ? (
                <ButtonLoader />
              ) : (
                <>
                  <i className="feather-mail me-1" />
                  Download PDF
                </>
              )}
            </button>
            <Link
              to={routes.adminDashboard}
              className="btn btn-primary btn-icon"
            >
              <i className="feather-arrow-left-circle me-1" />
              Back to Dashboard
            </Link>
            {bookingData?.review_details === null ||
            bookingData?.review_details === undefined ? (
              <Link
                target="_blank"
                to={`/user/court/${bookingData?.court_info.court_id}/${bookingData?.transaction_id}/${bookingData?.booking_detail_id}`}
                className="btn btn-primary"
              >
                {bookingData?.review_details === null
                  ? "Add Review"
                  : "Update Review"}
              </Link>
            ) : (
              <Link target="_blank" to="#" className="btn btn-red">
                <i className="feather-x me-1" />
                Cancel
              </Link>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingConfirmModal;
