import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../router/all_routes";
import { Modal } from "react-bootstrap";

const BookingConfirmModal = ({ toggleModal }: { toggleModal: boolean }) => {
  const routes = all_routes;
  return (
    <Modal
      show={toggleModal}
      onHide={() => {
        return;
      }}
      backdrop="static"
      keyboard={false}
      centered
      className="modal fade"
      id="bookingconfirmModal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-center d-inline-block">
            <ImageWithBasePath
              src="assets/img/icons/booking-confirmed.svg"
              alt="Icon"
            />
          </div>
          <div className="modal-body text-center">
            <h3 className="mb-3">Booking has been Confirmed</h3>
            {/* <p>Check your email on the booking confirmation</p> */}
          </div>
          <div
            className="modal-footer text-center d-inline-block"
            data-bs-dismiss="modal"
          >
            <Link to={routes.adminDashboard} className="btn btn-primary">
              <i className="feather-arrow-left-circle me-1" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingConfirmModal;
