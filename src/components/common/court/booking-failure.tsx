import React from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";

const BookingFailure = () => {
  return (
    <div
      // className="modal fade"
      id="bookingconfirmModal"
      tabIndex={-1}
      aria-labelledby="bookingconfirmModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-center d-inline-block">
            <ImageWithBasePath
              src="assets/img/icons/booking-failure.png"
              alt="User"
            />
          </div>
          <div className="modal-body text-center">
            <h3 className="mb-3">Booking has not been Confirmed</h3>
            <p>
              There was an issue while trying to book the slot, Please try again
            </p>
          </div>
          <div className="modal-footer text-center d-inline-block">
            <Link
              to={"routes.userDashboard"}
              className="btn btn-primary btn-icon"
            >
              <i className="feather-arrow-left-circle me-1" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFailure;
