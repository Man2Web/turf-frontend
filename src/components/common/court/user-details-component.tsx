import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserDetailsFormData } from "../../../utils/types/user/userDetailsBookingForm";
import { Dropdown } from "primereact/dropdown";
import { statesList } from "../../../utils/data-list/statesList";
import { countriesList } from "../../../utils/data-list/countriesList";
import { updateGuestCount } from "../../../utils/commin-utils/updateGuestCount";
import { autoFillFormData } from "../../user/form/auto-fill-form";
import UserAutofillForm from "../booking-page/user-autofill-form";
import { useBookingContext } from "../../../context/booking-context";

const UserDetailsComponent = ({ courtData }: { courtData: CourtsData }) => {
  const { setUserDetails, setIsValid } = useBookingContext();
  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    reset,
    setValue,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<UserDetailsFormData>({
    mode: "onTouched",
    defaultValues: {
      numberOfGuests: Number(courtData.pricing.guests),
      additionalNumberOfGuests: 0,
      country: countriesList[102],
    },
  }); // Validation on field touch
  const [userDataExists, setUserDataExists] = useState<boolean>(false);

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
    isValid,
  ]);

  useEffect(() => {
    const getUserData = async () => {
      const isTrue = await autoFillFormData(reset, courtData);
      if (isTrue) setUserDataExists(isTrue);
    };
    getUserData();
  }, []);

  return (
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
        {!userDataExists ? (
          <form
            id="user-form"
            autoComplete="off"
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
                {errors.fName?.type === "minLength" && (
                  <p className="text-danger">{errors.fName.message}</p>
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
            <div className="d-md-flex gap-2">
              {/* Email */}
              <div className="mb-3 col-md-6 col-12">
                <input
                  type="email"
                  className={`form-control ${errors.email?.message ? "border border-danger" : ""}`}
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email?.type === "pattern" && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              {/* Phone */}
              <div className="mb-3 col-md-6 col-12">
                <input
                  type="text"
                  className={`form-control ${errors.phonenumber?.message ? "border border-danger" : ""}`}
                  id="phonenumber"
                  placeholder="Phone Number"
                  {...register("phonenumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                />
                {errors.phonenumber?.type === "pattern" && (
                  <p className="text-danger">{errors.phonenumber.message}</p>
                )}
              </div>
            </div>
            {/* City Country */}
            <div className="d-md-flex gap-2">
              {/* Address */}
              <div className="mb-3 col-md-6 col-12">
                <input
                  type="text"
                  className={`form-control ${errors.address?.message ? "border border-danger" : ""}`}
                  id="address"
                  placeholder="Your Address"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Address must be at least 5 characters",
                    },
                  })}
                />
                {errors.address?.type === "minLength" && (
                  <p className="text-danger">{errors.address.message}</p>
                )}
              </div>
              {/* City */}
              <div className="mb-3 col-md-6 col-12">
                <input
                  type="text"
                  className={`form-control ${errors.city?.message ? "border border-danger" : ""}`}
                  id="city"
                  placeholder="City"
                  {...register("city", {
                    required: "City name is required",
                    minLength: {
                      value: 5,
                      message: "City must be at least 5 characters",
                    },
                  })}
                />
                {errors.city?.type === "minLength" && (
                  <p className="text-danger">{errors.city.message}</p>
                )}
              </div>
            </div>
            <div className="d-md-flex gap-2">
              {/* Pincode */}
              <div className="mb-3 col-md-4 col-12">
                <input
                  type="text"
                  className={`form-control ${errors.pincode?.message ? "border border-danger" : ""}`}
                  id="pincode"
                  placeholder="Pincode"
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
                {(errors.pincode?.type === "minLength" ||
                  errors.pincode?.type === "maxLength" ||
                  errors.pincode?.type === "pattern") && (
                  <p className="text-danger">{errors.pincode.message}</p>
                )}
              </div>

              {/* State */}
              <div className="mb-3 col-md-4 col-12">
                <Controller
                  name="state"
                  rules={{ required: "State is required" }}
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={statesList}
                      filter
                      optionLabel="name"
                      placeholder="State"
                      className={`select-bg w-100 list-sidebar-select ${errors.state?.message ? "border border-danger" : ""}`}
                    />
                  )}
                />
                {errors.pincode?.type === "minLength" && (
                  <p className="text-danger">{errors.state?.message}</p>
                )}
              </div>

              {/* State */}
              <div className="mb-3 col-md-4 col-12">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      value={field.value}
                      disabled
                      onChange={(e) => field.onChange(e.value)}
                      options={countriesList}
                      filter
                      optionLabel="name"
                      placeholder="Country"
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
        ) : (
          <div>
            <UserAutofillForm
              getValues={getValues}
              setUserDataExists={setUserDataExists}
            />
            {/* Guests */}
            <form
              id="user-form"
              autoComplete="off"
              onSubmit={handleSubmit(() => {
                trigger();
              })}
            >
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
        )}
      </div>
    </section>
  );
};

export default UserDetailsComponent;
