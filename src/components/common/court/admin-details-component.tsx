import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserDetailsFormData } from "../../../utils/types/user/userDetailsBookingForm";
import { AdminDetailsFormData } from "../../../utils/types/admin/adminDetailsBookingForm";
import { updateGuestCount } from "../../../utils/commin-utils/updateGuestCount";

const AdminDetailsComponent = ({
  courtData,
  setUserDetails,
  setIsValid,
}: {
  setUserDetails: (data: AdminDetailsFormData) => void;
  courtData: CourtsData;
  setIsValid: any;
}) => {
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<AdminDetailsFormData>({
    mode: "onTouched",
    defaultValues: {
      numberOfGuests: Number(courtData.pricing.guests),
      additionalNumberOfGuests: 0,
    },
  }); // Validation on field touch

  // Watch form fields for changes
  const fName = watch("fName");
  const lName = watch("lName");
  const email = watch("email");
  const phonenumber = watch("phonenumber");

  const numberOfGuests = watch("numberOfGuests");
  const additionalNumberOfGuests = watch("additionalNumberOfGuests");

  // Update user details when any of these fields change
  useEffect(() => {
    setUserDetails({
      fName,
      lName,
      email,
      phonenumber,
      numberOfGuests,
      additionalNumberOfGuests,
    });
    setIsValid(isValid);
  }, [
    fName,
    lName,
    email,
    phonenumber,
    numberOfGuests,
    additionalNumberOfGuests,
    setUserDetails,
    isValid,
  ]);
  return (
    <div>
      <div className="container">
        <section className="mb-40">
          <div className="card booking-form">
            <div className="border-bottom">
              <h3>Personal Information</h3>
              <p>
                Ensure accurate and complete information for a smooth booking
                process.
              </p>
            </div>
            {/* Form with react-hook-form */}
            <form
              autoComplete="false"
              id="admin-form"
              onSubmit={handleSubmit(() => {
                trigger();
              })}
            >
              {/* Names */}
              <div className="d-md-flex gap-2">
                <div className="my-3 col-md-6 col-12">
                  <input
                    type="text"
                    className={`form-control ${errors.fName?.message ? "border border-danger" : ""}`}
                    id="fName"
                    placeholder="First Name"
                    {...register("fName", {
                      required: "First name is required",
                      minLength: {
                        value: 5,
                        message: "Name must be at least 5 characters",
                      },
                    })}
                  />
                  {errors.fName?.type !== "required" && (
                    <p className="text-danger">{errors.fName?.message}</p>
                  )}
                </div>
                <div className="my-3 col-md-6 col-12">
                  <input
                    type="text"
                    className="form-control"
                    id="lName"
                    placeholder="Last Name"
                    {...register("lName")}
                  />
                </div>
              </div>
              {/* Email & Phone */}
              <div className="d-md-flex gap-2">
                {/* Email */}
                <div className="mb-3 col-md-6 col-12">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email?.type !== "required" && (
                    <p className="text-danger">{errors.email?.message}</p>
                  )}
                </div>
                {/* Phone */}
                <div className="mb-3 col-lg-6 col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    id="phonenumber"
                    placeholder="Phone Number"
                    {...register("phonenumber", {
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be exactly 10 digits",
                      },
                    })}
                  />
                  {errors.phonenumber?.type !== "required" && (
                    <p className="text-danger">{errors.phonenumber?.message}</p>
                  )}
                </div>
              </div>

              {/* Guests */}
              <div className="select-guest">
                <h5>Select Guest</h5>
                <div className="d-md-flex gap-4 align-items-center">
                  {/* Guests limit */}
                  <div className="qty-item text-center">
                    <Link
                      onClick={() => {
                        updateGuestCount(
                          0,
                          0,
                          numberOfGuests,
                          additionalNumberOfGuests,
                          courtData,
                          setValue
                        );
                      }}
                      to="#"
                      className="dec d-flex justify-content-center align-items-center"
                    >
                      <i className="feather-minus-circle" />
                    </Link>
                    <input
                      type="number"
                      readOnly={true}
                      className="form-control text-center"
                      {...register("numberOfGuests", {
                        required: "Number of Guests is required",
                        min: {
                          value: 1,
                          message: "At least 1 guest is required",
                        },
                        max: {
                          value: courtData.pricing.guests,
                          message: `Max guests of ${courtData.pricing.guests} allowed`,
                        },
                      })}
                      name="qty"
                      id="adults"
                    />
                    <Link
                      to="#"
                      onClick={() => {
                        updateGuestCount(
                          0,
                          1,
                          numberOfGuests,
                          additionalNumberOfGuests,
                          courtData,
                          setValue
                        );
                      }}
                      className="inc d-flex justify-content-center align-items-center"
                    >
                      <i className="feather-plus-circle" />
                    </Link>
                    <label htmlFor="adults">
                      <span className="dark-text">Guests</span>
                    </label>
                    {errors.numberOfGuests && (
                      <p className="text-danger">
                        {errors.numberOfGuests.message}
                      </p>
                    )}
                  </div>
                  {/* Additional guests limit */}
                  <div className="qty-item text-center">
                    <Link
                      to="#"
                      onClick={() => {
                        updateGuestCount(
                          1,
                          0,
                          numberOfGuests,
                          additionalNumberOfGuests,
                          courtData,
                          setValue
                        );
                      }}
                      className="dec d-flex justify-content-center align-items-center"
                    >
                      <i className="feather-minus-circle" />
                    </Link>
                    <input
                      type="number"
                      readOnly={true}
                      className="form-control text-center"
                      {...register("additionalNumberOfGuests", {
                        min: {
                          value: 0,
                          message: "",
                        },
                        max: {
                          value: courtData.pricing.additional_guests,
                          message: `Max additional guests of ${courtData.pricing.additional_guests} allowed`,
                        },
                      })}
                      name="qty"
                      id="children"
                    />
                    <Link
                      to="#"
                      onClick={() => {
                        updateGuestCount(
                          1,
                          1,
                          numberOfGuests,
                          additionalNumberOfGuests,
                          courtData,
                          setValue
                        );
                      }}
                      className="inc d-flex justify-content-center align-items-center"
                    >
                      <i className="feather-plus-circle" />
                    </Link>
                    <label htmlFor="children">
                      <span className="dark-text">Additional Guests</span>
                    </label>
                    {errors.additionalNumberOfGuests && (
                      <p className="text-danger">
                        {errors.additionalNumberOfGuests.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDetailsComponent;
