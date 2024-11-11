import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";

interface FormInterface {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const BulkBookingModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInterface>();
  const routes = all_routes;

  // Form submission handler
  const onSubmit = (data: FormInterface) => {
    // Handle form submission here (e.g., send data to backend)
  };

  return (
    <div>
      {/* Bulk Booking Enquiry Modal */}
      <div
        className="modal fade"
        id="bulkBookingModal"
        tabIndex={-1}
        aria-labelledby="bulkBookingModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h4>Bulk Booking Enquiry Form</h4>
              <div data-bs-dismiss="modal">X</div>
            </div>

            <div className="modal-body">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-danger">{errors.phone.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={3}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      maxLength: {
                        value: 500,
                        message: "Message must not exceed 500 characters",
                      },
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="text-danger">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit and Back to Dashboard Buttons */}
                <div className="modal-footer">
                  <button
                    data-bs-dismiss="modal"
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {/* /Form */}
            </div>
          </div>
        </div>
      </div>
      {/* /Bulk Booking Enquiry Modal */}
    </div>
  );
};

export default BulkBookingModal;
