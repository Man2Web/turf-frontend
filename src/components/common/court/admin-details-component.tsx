import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AdminDetailsFormData } from "../../../utils/types/admin/adminDetailsBookingForm";
import { updateGuestCount } from "../../../utils/commin-utils/updateGuestCount";
import { useBookingContext } from "../../../context/booking-context";

const AdminDetailsComponent = ({ courtData }: { courtData: CourtsData }) => {
  const { setUserDetails, setIsValid } = useBookingContext();
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
              <div className="select-guest mt-4">
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
                      value={
                        watch("numberOfGuests") +
                        watch("additionalNumberOfGuests")
                      }
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
