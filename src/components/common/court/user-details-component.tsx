import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserDetailsFormData } from "../../../utils/types/userDetailsBookingForm";
import { Dropdown } from "primereact/dropdown";
import { statesList } from "../../../utils/statesList";
import { countriesList } from "../../../utils/countriesList";

const UserDetailsComponent = ({
  courtData,
  setUserDetails,
  setIsValid,
  setErrors,
}: {
  setUserDetails: (data: UserDetailsFormData) => void;
  courtData: CourtDataType;
  setIsValid: any;
  setErrors: any;
}) => {
  const {
    register,
    trigger,
    setValue,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<UserDetailsFormData>({
    mode: "onTouched",
    defaultValues: {
      numberOfGuests: courtData.pricing.max_guests,
      additionalNumberOfGuests: 0,
    },
  }); // Validation on field touch

  // Watch form fields for changes
  const fName = watch("fName");
  const lName = watch("lName");
  const email = watch("email");
  const phonenumber = watch("phonenumber");
  const address = watch("address");
  const city = watch("city");
  const state = watch("state");
  const country = watch("country");
  const pincode = watch("pincode");

  const numberOfGuests = watch("numberOfGuests");
  const additionalNumberOfGuests = watch("additionalNumberOfGuests");

  // Update user details when any of these fields change
  useEffect(() => {
    setUserDetails({
      fName,
      lName,
      email,
      phonenumber,
      address,
      city,
      state,
      country,
      pincode,
      numberOfGuests,
      additionalNumberOfGuests,
    });
    setErrors(errors);
    setIsValid(isValid);
  }, [
    fName,
    lName,
    email,
    phonenumber,
    address,
    city,
    state,
    country,
    pincode,
    numberOfGuests,
    additionalNumberOfGuests,
    setUserDetails,
  ]);

  const updateGuestCount = (movement: number, direction: number) => {
    if (movement === 0) {
      if (direction === 0) {
        if (numberOfGuests > 1) {
          setValue("numberOfGuests", numberOfGuests - 1, {
            shouldValidate: true,
          });
        }
      } else {
        if (numberOfGuests < courtData.pricing.max_guests) {
          setValue("numberOfGuests", numberOfGuests + 1, {
            shouldValidate: true,
          });
        }
      }
    } else if (movement === 1) {
      if (direction === 0) {
        if (additionalNumberOfGuests > 0) {
          setValue("additionalNumberOfGuests", additionalNumberOfGuests - 1, {
            shouldValidate: true,
          });
        }
      } else {
        if (additionalNumberOfGuests < courtData.pricing.additional_guests) {
          setValue("additionalNumberOfGuests", additionalNumberOfGuests + 1, {
            shouldValidate: true,
          });
        }
      }
    }
  };

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
            <form autoComplete="false">
              {/* Names */}
              <div className="d-flex gap-2">
                <div className="my-3 col-lg-6 col-md-12">
                  <label htmlFor="fName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fName"
                    placeholder="Enter Name"
                    {...register("fName", {
                      required: "First name is required",
                      minLength: {
                        value: 5,
                        message: "Name must be at least 5 characters",
                      },
                    })}
                  />
                  {errors.fName && (
                    <p className="text-danger">{errors.fName.message}</p>
                  )}
                </div>
                <div className="my-3 col-lg-6 col-md-12 flex-wrap">
                  <label htmlFor="lName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lName"
                    placeholder="Enter Last Name"
                    {...register("lName")}
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                {/* Email */}
                <div className="mb-3 col-lg-6 col-md-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email Address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>
                {/* Phone */}
                <div className="mb-3 col-lg-6 col-md-12">
                  <label htmlFor="phonenumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phonenumber"
                    placeholder="Enter Phone Number"
                    {...register("phonenumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be exactly 10 digits",
                      },
                    })}
                  />
                  {errors.phonenumber && (
                    <p className="text-danger">{errors.phonenumber.message}</p>
                  )}
                </div>
              </div>
              {/* City Country */}
              <div className="d-flex gap-2">
                {/* Address */}
                <div className="col-lg-6 col-md-12">
                  <label htmlFor="address" className="form-label">
                    Your Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className="text-danger">{errors.address.message}</p>
                  )}
                </div>
                {/* City */}
                <div className="mb-3 col-lg-6 col-md-12">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter City"
                    {...register("city", {
                      required: "City name is required",
                      minLength: {
                        value: 5,
                        message: "City must be at least 5 characters",
                      },
                    })}
                  />
                  {errors.city && (
                    <p className="text-danger">{errors.city.message}</p>
                  )}
                </div>
              </div>
              <div className="d-flex gap-2">
                {/* Pincode */}
                <div className="col-lg-4 col-md-12">
                  <label htmlFor="pincode" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    placeholder="Enter pincode"
                    {...register("pincode", {
                      required: "Pincode is required",
                      minLength: {
                        value: 6,
                        message: "Pincode must be exactly 6 digits",
                      },
                      maxLength: {
                        value: 6,
                        message: "Pincode must be exactly 6 digits",
                      },
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Pincode must contain only digits",
                      },
                    })}
                  />
                  {errors.pincode && (
                    <p className="text-danger">{errors.pincode.message}</p>
                  )}
                </div>

                {/* State */}
                <div className="col-lg-4 col-md-12">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={statesList}
                        filter
                        optionLabel="name"
                        placeholder="Select State"
                        className="select-bg w-100 list-sidebar-select"
                      />
                    )}
                  />
                  {errors.pincode && (
                    <p className="text-danger">{errors.pincode.message}</p>
                  )}
                </div>

                {/* State */}
                <div className="col-lg-4 col-md-12">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue="{countriesList[103]}"
                    render={({ field }) => (
                      <Dropdown
                        value={countriesList[102]}
                        disabled
                        onChange={(e) => field.onChange(e.value)}
                        options={countriesList}
                        filter
                        optionLabel="name"
                        placeholder="Select Country"
                        className="select-bg w-100 list-sidebar-select"
                      />
                    )}
                  />
                  {errors.country && (
                    <p className="text-danger">{errors.country.message}</p>
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
                        updateGuestCount(0, 0);
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
                          value: courtData.pricing.max_guests,
                          message: `Max guests of ${courtData.pricing.max_guests} allowed`,
                        },
                      })}
                      name="qty"
                      id="adults"
                    />
                    <Link
                      to="#"
                      onClick={() => {
                        updateGuestCount(0, 1);
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
                        updateGuestCount(1, 0);
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
                        updateGuestCount(1, 1);
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

export default UserDetailsComponent;
