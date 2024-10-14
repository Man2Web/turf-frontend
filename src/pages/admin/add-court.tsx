import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { all_routes } from "../../router/all_routes";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/common/Loader";
import { courtOptions } from "../../utils/courtOptions";

const daysOfWeek = [
  { id: 1, label: "Mon" },
  { id: 2, label: "Tues" },
  { id: 3, label: "Wed" },
  { id: 4, label: "Thur" },
  { id: 5, label: "Fri" },
  { id: 6, label: "Sat" },
  { id: 7, label: "Sun" },
];

const hoursOptions = ["1 Hrs", "2 Hrs", "3 Hrs"];

const AddCourt = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CourtFormDataType>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [selectedHours, setSelectedHours] = useState<any>({
    monday: { duration: "", startTime: null, endTime: null },
    tuesday: { duration: "", startTime: null, endTime: null },
    wednesday: { duration: "", startTime: null, endTime: null },
    thursday: { duration: "", startTime: null, endTime: null },
    friday: { duration: "", startTime: null, endTime: null },
    saturday: { duration: "", startTime: null, endTime: null },
    sunday: { duration: "", startTime: null, endTime: null },
  });
  const [images, setImages] = useState<any>([]);
  // State to store calculated time slots for each day
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: string[] }>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const [selectedDays, setSelectedDays] = useState(
    Array(daysOfWeek.length).fill(false)
  );

  // useEffect to recalculate time slots whenever selectedHours changes
  useEffect(() => {
    // Loop through all days and calculate slots
    Object.keys(selectedHours).forEach((day) => {
      calculateTimeSlots(day);
    });
  }, [selectedHours]);

  // Function to calculate time slots dynamically based on the day
  const calculateTimeSlots = (day: string) => {
    const slots: string[] = [];
    const dayHours = selectedHours[day];

    if (
      !dayHours ||
      !dayHours.duration ||
      !dayHours.startTime ||
      !dayHours.endTime
    ) {
      return; // Don't calculate if any value is missing
    }

    const durationInMinutes = parseInt(dayHours.duration.split(" ")[0]) * 60; // convert "1 Hrs" to 60 minutes
    let currentTime = moment(dayHours.startTime, "HH:mm");
    const endTime = moment(dayHours.endTime, "HH:mm");

    while (currentTime.isBefore(endTime)) {
      slots.push(currentTime.format("HH:mm A")); // e.g., "06:00 AM"
      currentTime = currentTime.add(durationInMinutes, "minutes"); // move to next slot
    }

    setTimeSlots((prevState) => ({ ...prevState, [day]: slots })); // update the time slots for the specific day
  };

  const onSubmit = async (data: CourtFormDataType) => {
    const userId = localStorage.getItem("adminId");
    setLoading(true);

    if (data.location && data.location.city) {
      data.location.city = data.location.city.toLowerCase().trim();
    }

    const formData = new FormData();

    // Append images to FormData
    images.forEach(async (image: { file: string | Blob }) => {
      formData.append("files", image.file);
    });

    // Append other form data
    formData.append("courtName", data.courtName);
    formData.append("courtType", data.courtType);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("email", data.email);
    formData.append("venuePrice", JSON.stringify(data.venuePrice));
    formData.append("venueOverview", data.venueOverview);
    formData.append("courtIncludes", JSON.stringify(data.courtIncludes));
    formData.append("rulesOfVenue", data.rulesOfVenue);
    formData.append("amenities", JSON.stringify(data.amenities));
    formData.append("location", JSON.stringify(data.location));
    formData.append("courtAvailability", JSON.stringify(selectedHours));
    if (userId) {
      formData.append("userId", userId);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}court/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // Important header for file uploads
      );
      console.log(response);
      response.status === 201
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
    } catch (error) {
      toast.error("Failed to add court");
      console.error(error);
    } finally {
      setLoading(false);
    }

    // Optionally reset form or navigate
    // reset();
    // setTimeout(() => {
    //   navigate(routes.adminDashboard);
    // }, 3000);
  };

  const handleDayChange = (index: number) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  dayjs.extend(customParseFormat);

  const updateDayHours = (day: string | number, field: string, value: any) => {
    setSelectedHours((prevState: any) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [field]: value,
      },
    }));
  };

  const handleStartTimeChange = (
    day: string,
    time: Dayjs,
    timeString: string | string[]
  ) => {
    updateDayHours(day.toLowerCase(), "startTime", timeString);
  };

  const handleEndTimeChange = (
    day: string,
    time: Dayjs,
    timeString: string | string[]
  ) => {
    updateDayHours(day.toLowerCase(), "endTime", timeString);
  };

  const scrollContent = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  const routes = all_routes;

  // Function to handle file input change
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);

    // Convert files to Blob format and generate object URLs
    const newImages = files.map((file: any) => {
      return {
        file,
        url: URL.createObjectURL(file), // Create a local URL for preview
      };
    });

    setImages((prevImages: any) => [...prevImages, ...newImages]);
  };

  // Function to remove an image
  const removeImg = (index: any) => {
    setImages(images.filter((_: any, i: number) => i !== index));
  };

  return (
    <div>
      <ToastContainer />
      {/* Page Content */}
      {loading ? (
        <Loader />
      ) : (
        <div className="content">
          <div className="container">
            {/* Row */}
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="venue-options option-list-court white-bg">
                  <ul className="clearfix">
                    <li className="active">
                      <Link to="#" onClick={() => scrollContent("basic-info")}>
                        Basic Info
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => scrollContent("venue-price")}>
                        Venue Price
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        onClick={() => scrollContent("availability")}
                      >
                        Availability
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => scrollContent("overview")}>
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => scrollContent("includes")}>
                        Includes
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => scrollContent("rules")}>
                        Rules
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => scrollContent("amenities")}>
                        Amenities
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => scrollContent("gallery")}>
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => scrollContent("location")}>
                        Locations
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Accordian Contents */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="accordion"
                  id="accordionPanel"
                >
                  {/* basic info */}
                  <div className="accordion-item mb-4" id="basic-info">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-basic-info"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Basic Info
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-basic-info"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space mb-0">
                              <label
                                htmlFor="court-name"
                                className="form-label"
                              >
                                Court Name <span>*</span>
                              </label>
                              <input
                                {...register("courtName", {
                                  required: "Court Name is required",
                                })}
                                type="text"
                                className="form-control"
                                id="court-name"
                                placeholder="Enter Court Name"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.courtName?.message as string}
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space mb-0">
                              <label className="form-label">
                                Court Type <span>*</span>
                              </label>
                              <Controller
                                name="courtType"
                                control={control}
                                rules={{ required: "Court Type is required" }}
                                render={({ field }) => (
                                  <Dropdown
                                    value={field.value} // Since courtOptions is now an array of strings
                                    onChange={(e) => field.onChange(e.value)} // Directly update the selected value
                                    options={courtOptions} // Pass the array of strings
                                    placeholder="Select Court Type"
                                    className="select-bg w-100"
                                  />
                                )}
                              />
                            </div>
                            <p className="text-danger">
                              {errors.courtType?.message as string}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Venue Price */}
                  <div className="accordion-item mb-4" id="venue-price">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-venue-price"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Venue Price <span>(INR)</span>
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-venue-price"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label
                                htmlFor="starting-price"
                                className="form-label"
                              >
                                Starting Price (Per Hour)
                              </label>
                              <input
                                {...register("venuePrice.startingPrice", {
                                  required: "Venue Price is required",
                                })}
                                type="text"
                                className="form-control"
                                id="starting-price"
                                placeholder="Enter Price"
                              />
                            </div>
                            <p className="text-danger">
                              {
                                errors.venuePrice?.startingPrice
                                  ?.message as string
                              }
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label htmlFor="name" className="form-label">
                                Max Guests
                              </label>
                              <input
                                {...register("venuePrice.maxGuests", {
                                  required: "Max Guests is required",
                                })}
                                type="text"
                                className="form-control"
                                id="max-guests"
                                placeholder="Enter Max Number of Guests"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.venuePrice?.maxGuests?.message as string}
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space mb-0">
                              <label
                                htmlFor="additional-guests"
                                className="form-label"
                              >
                                Additional Guests
                              </label>
                              <input
                                {...register("venuePrice.additionalGuests", {
                                  required: "Additional Guests is required",
                                })}
                                type="text"
                                className="form-control"
                                id="additional-guests"
                                placeholder="No Additional Guests"
                              />
                            </div>
                            <p className="text-danger">
                              {
                                errors.venuePrice?.additionalGuests
                                  ?.message as string
                              }
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space mb-0">
                              <label htmlFor="name" className="form-label">
                                Price of Extra Guest (Per Hour)
                              </label>
                              <input
                                {...register(
                                  "venuePrice.priceOfAdditionalGuests",
                                  {
                                    required:
                                      "Additional Guests Price is required",
                                  }
                                )}
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter Price of Extra Guests"
                              />
                            </div>
                            <p className="text-danger">
                              {
                                errors.venuePrice?.priceOfAdditionalGuests
                                  ?.message as string
                              }
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space mb-0">
                              <label
                                htmlFor="advancePay"
                                className="form-label"
                              >
                                Advance Payment
                              </label>
                              <input
                                {...register("venuePrice.advancePay", {
                                  required: "Advance Payment is required",
                                  min: {
                                    value: 25,
                                    message:
                                      "Advance Payment must be at least 25",
                                  },
                                  max: {
                                    value: 100,
                                    message:
                                      "Advance Payment must be at most 100",
                                  },
                                })}
                                type="number" // Using number type for better control over min/max values
                                className="form-control"
                                id="advancePay"
                                placeholder="Enter Advance Payment"
                                defaultValue={25} // Setting the default value to 25
                              />
                            </div>
                            <p className="text-danger">
                              {errors.venuePrice?.advancePay?.message as string}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Availability */}
                  <div className="accordion-item mb-4" id="availability">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-availability"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        Availability
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-availability"
                    >
                      <div className="accordion-body">
                        {/* Profile Availability */}
                        <div className="row">
                          <div className="col-md-12">
                            <div className="profile-availability">
                              <div className="select-days">
                                <h4>Select Days</h4>
                                <ul className="day-list">
                                  {daysOfWeek.map((day, index) => (
                                    <li key={day.id}>
                                      <div className="day-selection">
                                        <input
                                          type="checkbox"
                                          id={`select_days_${day.id}`}
                                          checked={selectedDays[index]}
                                          onChange={() =>
                                            handleDayChange(index)
                                          }
                                          name="day"
                                        />
                                        <label
                                          htmlFor={`select_days_${day.id}`}
                                        >
                                          {day.label}
                                        </label>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="accordion setting-accordion">
                                {/* Monday */}
                                <div
                                  className="accordion-item"
                                  id="day-monday"
                                  style={{
                                    display: selectedDays[0] ? "block" : "none",
                                  }}
                                >
                                  <div className="accordion-header">
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#monday"
                                    >
                                      <div className="interset-btn empty-space">
                                        <div className="status-toggle d-inline-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            id="status_1"
                                            className="check"
                                          />
                                          <label
                                            htmlFor="status_1"
                                            className="checktoggle"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </div>
                                      <span className="accord-title">
                                        Monday
                                      </span>
                                      <Link to="#">Edit</Link>
                                    </div>
                                  </div>
                                  <div
                                    id="monday"
                                    className="accordion-collapse collapse"
                                  >
                                    <div className="accordion-body">
                                      <div className="row gx-2">
                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Duration{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Dropdown
                                              value={
                                                selectedHours.monday.duration
                                              }
                                              onChange={(e) =>
                                                updateDayHours(
                                                  "monday",
                                                  "duration",
                                                  e.target.value
                                                )
                                              }
                                              options={hoursOptions}
                                              optionLabel="name"
                                              placeholder="Select Hours"
                                              className="select-bg w-100"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Start Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleStartTimeChange(
                                                    "Monday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              End Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleEndTimeChange(
                                                    "Monday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <h4>Available Timings</h4>
                                          <div className="token-slot mt-2">
                                            {timeSlots["monday"]?.map(
                                              (slot, index) => (
                                                <div
                                                  className="form-check-inline visits me-1"
                                                  key={index}
                                                >
                                                  <label className="visit-btns">
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      value={slot}
                                                    />
                                                    <span
                                                      className="visit-rsn"
                                                      data-bs-toggle="tooltip"
                                                      title={slot}
                                                    >
                                                      {slot}
                                                    </span>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /Monday */}
                                {/* Tuesday */}
                                <div
                                  className="accordion-item"
                                  id="day-tuesday"
                                  style={{
                                    display: selectedDays[1] ? "block" : "none",
                                  }}
                                >
                                  <div className="accordion-header">
                                    <div
                                      className="accordion-button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#tuesday"
                                    >
                                      <div className="interset-btn empty-space">
                                        <div className="status-toggle d-inline-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            id="status_2"
                                            className="check"
                                          />
                                          <label
                                            htmlFor="status_2"
                                            className="checktoggle"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </div>
                                      <span className="accord-title">
                                        Tuesday
                                      </span>
                                      <Link to="#">Edit</Link>
                                    </div>
                                  </div>
                                  <div
                                    id="tuesday"
                                    className="accordion-collapse collapse show"
                                  >
                                    <div className="accordion-body">
                                      <div className="row gx-2">
                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Duration{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Dropdown
                                              value={
                                                selectedHours.tuesday.duration
                                              }
                                              onChange={(e) =>
                                                updateDayHours(
                                                  "tuesday",
                                                  "duration",
                                                  e.target.value
                                                )
                                              }
                                              options={hoursOptions}
                                              optionLabel="name"
                                              placeholder="Select Hours"
                                              className="select-bg w-100"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Start Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleStartTimeChange(
                                                    "Tuesday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              End Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleEndTimeChange(
                                                    "Tuesday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <h4>Available Timings</h4>
                                          <div className="token-slot mt-2">
                                            {timeSlots["tuesday"]?.map(
                                              (slot, index) => (
                                                <div
                                                  className="form-check-inline visits me-1"
                                                  key={index}
                                                >
                                                  <label className="visit-btns">
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      value={slot}
                                                    />
                                                    <span
                                                      className="visit-rsn"
                                                      data-bs-toggle="tooltip"
                                                      title={slot}
                                                    >
                                                      {slot}
                                                    </span>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /Tuesday */}
                                {/* Wednessday */}
                                <div
                                  className="accordion-item"
                                  id="day-wednesday"
                                  style={{
                                    display: selectedDays[2] ? "block" : "none",
                                  }}
                                >
                                  <div className="accordion-header">
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#wednesday"
                                    >
                                      <div className="interset-btn empty-space">
                                        <div className="status-toggle d-inline-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            id="status_3"
                                            className="check"
                                          />
                                          <label
                                            htmlFor="status_3"
                                            className="checktoggle"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </div>
                                      <span className="accord-title">
                                        Wednesday
                                      </span>
                                      <Link to="#">Edit</Link>
                                    </div>
                                  </div>
                                  <div
                                    id="wednesday"
                                    className="accordion-collapse collapse"
                                  >
                                    <div className="accordion-body">
                                      <div className="row gx-2">
                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Duration{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Dropdown
                                              value={
                                                selectedHours.wednesday.duration
                                              }
                                              onChange={(e) =>
                                                updateDayHours(
                                                  "wednesday",
                                                  "duration",
                                                  e.target.value
                                                )
                                              }
                                              options={hoursOptions}
                                              optionLabel="name"
                                              placeholder="Select Hours"
                                              className="select-bg w-100"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Start Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleStartTimeChange(
                                                    "Wednesday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              End Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleEndTimeChange(
                                                    "Wednesday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <h4>Available Timings</h4>
                                          <div className="token-slot mt-2">
                                            {timeSlots["wednesday"]?.map(
                                              (slot, index) => (
                                                <div
                                                  className="form-check-inline visits me-1"
                                                  key={index}
                                                >
                                                  <label className="visit-btns">
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      value={slot}
                                                    />
                                                    <span
                                                      className="visit-rsn"
                                                      data-bs-toggle="tooltip"
                                                      title={slot}
                                                    >
                                                      {slot}
                                                    </span>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /Wednessday */}
                                {/* Thursday */}
                                <div
                                  className="accordion-item"
                                  id="day-thursday"
                                  style={{
                                    display: selectedDays[3] ? "block" : "none",
                                  }}
                                >
                                  <div className="accordion-header">
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#thursday"
                                    >
                                      <div className="interset-btn empty-space">
                                        <div className="status-toggle d-inline-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            id="status_4"
                                            className="check"
                                          />
                                          <label
                                            htmlFor="status_4"
                                            className="checktoggle"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </div>
                                      <span className="accord-title">
                                        Thursday
                                      </span>
                                      <Link to="#">Edit</Link>
                                    </div>
                                  </div>
                                  <div
                                    id="thursday"
                                    className="accordion-collapse collapse"
                                  >
                                    <div className="accordion-body">
                                      <div className="row gx-2">
                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Duration{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Dropdown
                                              value={
                                                selectedHours.thursday.duration
                                              }
                                              onChange={(e) =>
                                                updateDayHours(
                                                  "thursday",
                                                  "duration",
                                                  e.target.value
                                                )
                                              }
                                              options={hoursOptions}
                                              optionLabel="name"
                                              placeholder="Select Hours"
                                              className="select-bg w-100"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Start Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleStartTimeChange(
                                                    "Thursday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              End Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleEndTimeChange(
                                                    "Thursday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <h4>Available Timings</h4>
                                          <div className="token-slot mt-2">
                                            {timeSlots["thursday"]?.map(
                                              (slot, index) => (
                                                <div
                                                  className="form-check-inline visits me-1"
                                                  key={index}
                                                >
                                                  <label className="visit-btns">
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      value={slot}
                                                    />
                                                    <span
                                                      className="visit-rsn"
                                                      data-bs-toggle="tooltip"
                                                      title={slot}
                                                    >
                                                      {slot}
                                                    </span>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /Thursday */}
                                {/* Friday */}
                                <div
                                  className="accordion-item"
                                  id="day-friday"
                                  style={{
                                    display: selectedDays[4] ? "block" : "none",
                                  }}
                                >
                                  <div className="accordion-header">
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#friday"
                                    >
                                      <div className="interset-btn empty-space">
                                        <div className="status-toggle d-inline-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            id="status_5"
                                            className="check"
                                          />
                                          <label
                                            htmlFor="status_5"
                                            className="checktoggle"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </div>
                                      <span className="accord-title">
                                        Friday
                                      </span>
                                      <Link to="#">Edit</Link>
                                    </div>
                                  </div>
                                  <div
                                    id="friday"
                                    className="accordion-collapse collapse"
                                  >
                                    <div className="accordion-body">
                                      <div className="row gx-2">
                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Duration{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Dropdown
                                              value={
                                                selectedHours.friday.duration
                                              }
                                              onChange={(e) =>
                                                updateDayHours(
                                                  "friday",
                                                  "duration",
                                                  e.target.value
                                                )
                                              }
                                              options={hoursOptions}
                                              optionLabel="name"
                                              placeholder="Select Hours"
                                              className="select-bg w-100"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Start Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleStartTimeChange(
                                                    "Friday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              End Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleEndTimeChange(
                                                    "Friday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <h4>Available Timings</h4>
                                          <div className="token-slot mt-2">
                                            {timeSlots["friday"]?.map(
                                              (slot, index) => (
                                                <div
                                                  className="form-check-inline visits me-1"
                                                  key={index}
                                                >
                                                  <label className="visit-btns">
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      value={slot}
                                                    />
                                                    <span
                                                      className="visit-rsn"
                                                      data-bs-toggle="tooltip"
                                                      title={slot}
                                                    >
                                                      {slot}
                                                    </span>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /Friday */}
                                {/* Saturday */}
                                <div
                                  className="accordion-item"
                                  id="day-saturday"
                                  style={{
                                    display: selectedDays[5] ? "block" : "none",
                                  }}
                                >
                                  <div className="accordion-header">
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#saturday"
                                    >
                                      <div className="interset-btn empty-space">
                                        <div className="status-toggle d-inline-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            id="status_6"
                                            className="check"
                                          />
                                          <label
                                            htmlFor="status_6"
                                            className="checktoggle"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </div>
                                      <span className="accord-title">
                                        Saturday
                                      </span>
                                      <Link to="#">Edit</Link>
                                    </div>
                                  </div>
                                  <div
                                    id="saturday"
                                    className="accordion-collapse collapse"
                                  >
                                    <div className="accordion-body">
                                      <div className="row gx-2">
                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Duration{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Dropdown
                                              value={
                                                selectedHours.saturday.duration
                                              }
                                              onChange={(e) =>
                                                updateDayHours(
                                                  "saturday",
                                                  "duration",
                                                  e.target.value
                                                )
                                              }
                                              options={hoursOptions}
                                              optionLabel="name"
                                              placeholder="Select Hours"
                                              className="select-bg w-100"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Start Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleStartTimeChange(
                                                    "Saturday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              End Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleEndTimeChange(
                                                    "Saturday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <h4>Available Timings</h4>
                                          <div className="token-slot mt-2">
                                            {timeSlots["saturday"]?.map(
                                              (slot, index) => (
                                                <div
                                                  className="form-check-inline visits me-1"
                                                  key={index}
                                                >
                                                  <label className="visit-btns">
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      value={slot}
                                                    />
                                                    <span
                                                      className="visit-rsn"
                                                      data-bs-toggle="tooltip"
                                                      title={slot}
                                                    >
                                                      {slot}
                                                    </span>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /Saturday */}
                                {/* Sunday */}
                                <div
                                  className="accordion-item"
                                  id="day-sunday"
                                  style={{
                                    display: selectedDays[6] ? "block" : "none",
                                  }}
                                >
                                  <div className="accordion-header">
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#sunday"
                                    >
                                      <div className="interset-btn empty-space">
                                        <div className="status-toggle d-inline-flex align-items-center">
                                          <input
                                            type="checkbox"
                                            id="status_7"
                                            className="check"
                                          />
                                          <label
                                            htmlFor="status_7"
                                            className="checktoggle"
                                          >
                                            checkbox
                                          </label>
                                        </div>
                                      </div>
                                      <span className="accord-title">
                                        Sunday
                                      </span>
                                      <Link to="#">Edit</Link>
                                    </div>
                                  </div>
                                  <div
                                    id="sunday"
                                    className="accordion-collapse collapse"
                                  >
                                    <div className="accordion-body">
                                      <div className="row gx-2">
                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Duration{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <Dropdown
                                              value={
                                                selectedHours.sunday.duration
                                              }
                                              onChange={(e) =>
                                                updateDayHours(
                                                  "sunday",
                                                  "duration",
                                                  e.target.value
                                                )
                                              }
                                              options={hoursOptions}
                                              optionLabel="name"
                                              placeholder="Select Hours"
                                              className="select-bg w-100"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              Start Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleStartTimeChange(
                                                    "Sunday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="duration-blk">
                                            <label className="form-control-label">
                                              End Time{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <div className="form-icon">
                                              <TimePicker
                                                placeholder="Select Time"
                                                className="form-control datetimepicker1"
                                                onChange={(time, timeString) =>
                                                  handleEndTimeChange(
                                                    "Sunday",
                                                    time,
                                                    timeString
                                                  )
                                                }
                                                defaultOpenValue={dayjs(
                                                  "00:00",
                                                  "HH:mm"
                                                )}
                                                format="HH:mm"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <h4>Available Timings</h4>
                                          <div className="token-slot mt-2">
                                            {timeSlots["sunday"]?.map(
                                              (slot, index) => (
                                                <div
                                                  className="form-check-inline visits me-1"
                                                  key={index}
                                                >
                                                  <label className="visit-btns">
                                                    <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      value={slot}
                                                    />
                                                    <span
                                                      className="visit-rsn"
                                                      data-bs-toggle="tooltip"
                                                      title={slot}
                                                    >
                                                      {slot}
                                                    </span>
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* /Sunday */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /Profile Availability */}
                      </div>
                    </div>
                  </div>
                  {/* overview */}
                  <div className="accordion-item mb-4" id="overview">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-overview"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFour"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseFour"
                      >
                        Venue Overview
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseFour"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-overview"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-12">
                            <div className="">
                              <label
                                htmlFor="venueOverview"
                                className="form-label"
                              >
                                Overview of Venue <span>*</span>
                              </label>
                              {/* Controller for ReactQuill */}
                              <Controller
                                name="venueOverview"
                                control={control}
                                rules={{
                                  required: "Venue Overview is required",
                                }}
                                render={({ field }) => (
                                  <ReactQuill
                                    {...field}
                                    placeholder="Enter Overview"
                                    modules={{
                                      toolbar: [
                                        [{ header: [false] }],
                                        [
                                          "bold",
                                          "italic",
                                          "underline",
                                          "strike",
                                        ],
                                      ],
                                    }}
                                    className="form-control"
                                  />
                                )}
                              />
                              {/* Error message */}
                              {errors.venueOverview && (
                                <p className="text-danger">
                                  {errors.venueOverview.message as string}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* includes */}
                  <div className="accordion-item mb-4" id="includes">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-includes"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFive"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFive"
                      >
                        Includes
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseFive"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-includes"
                    >
                      <div className="accordion-body">
                        <ul className="clearfix">
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  {...register("courtIncludes.badmintonRacket")}
                                  id="includes1"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="includes1"
                              >
                                Badminton Racket Unlimited
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  {...register("courtIncludes.bats")}
                                  id="includes2"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="includes2"
                              >
                                Bats
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  {...register("courtIncludes.hittingMachines")}
                                  id="includes3"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="includes3"
                              >
                                Hitting Machines
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  {...register("courtIncludes.multipleCourts")}
                                  id="includes4"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="includes4"
                              >
                                Multiple Courts
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  {...register("courtIncludes.sparePlayers")}
                                  id="includes5"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="includes5"
                              >
                                Spare Players
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  {...register("courtIncludes.instantRacket")}
                                  id="includes6"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="includes6"
                              >
                                Instant Racket
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  {...register("courtIncludes.greenTurfs")}
                                  id="includes7"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="includes7"
                              >
                                Green Turfs
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Rules */}
                  <div className="accordion-item mb-4" id="rules">
                    <h4 className="accordion-header" id="panelsStayOpen-rules">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseSix"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseSix"
                      >
                        Venue Rules
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseSix"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-rules"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-12">
                            <div className="">
                              <label
                                htmlFor="rulesOfVenue"
                                className="form-label"
                              >
                                Rules of Venue <span>*</span>
                              </label>
                              {/* Controller for ReactQuill */}
                              <Controller
                                name="rulesOfVenue"
                                control={control}
                                rules={{ required: "Venue Rules are required" }}
                                render={({ field }) => (
                                  <ReactQuill
                                    {...field}
                                    placeholder="Enter Rules"
                                    modules={{
                                      toolbar: [[{ list: "bullet" }]],
                                    }}
                                    className="form-control"
                                  />
                                )}
                              />
                              {/* Error message */}
                              {errors.rulesOfVenue && (
                                <p className="text-danger">
                                  {errors.rulesOfVenue.message as string}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Amenities */}
                  <div className="accordion-item mb-4" id="amenities">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-amenities"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseSeven"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseSeven"
                      >
                        Amenities
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseSeven"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-amenities"
                    >
                      <div className="accordion-body">
                        <ul className="d-md-flex align-items-center">
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="amenities1"
                                  {...register("amenities.parking")}
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="amenities1"
                              >
                                Parking
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="amenities2"
                                  {...register("amenities.drinkingWater")}
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="amenities2"
                              >
                                Drinking Water
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="amenities3"
                                  {...register("amenities.firstAid")}
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="amenities3"
                              >
                                First Aid
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="amenities4"
                                  {...register("amenities.changeRoom")}
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="amenities4"
                              >
                                Change Room
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="form-check d-flex justify-content-start align-items-center">
                              <div className="d-inline-block">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="amenities5"
                                  {...register("amenities.shower")}
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="amenities5"
                              >
                                Shower
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Gallery */}
                  <div className="accordion-item mb-4" id="gallery">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-gallery"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseEight"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseEight"
                      >
                        Gallery
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseEight"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-gallery"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="file-upload-text appointment-upload">
                              <div className="input-space">
                                <label className="form-label">
                                  Your Venue Images
                                </label>
                                <div className="file-upload">
                                  <input
                                    type="file"
                                    id="file-input"
                                    className="image-upload"
                                    multiple
                                    onChange={handleFileChange}
                                  />
                                  <p>Upload Court Images</p>
                                </div>
                              </div>
                              <div className="upload-show-img">
                                {images.map(
                                  (
                                    imgObj: { file: File; url: string },
                                    index: React.Key | null | undefined
                                  ) => (
                                    <div key={index} className="upload-images">
                                      <img
                                        src={imgObj.url}
                                        className="img-fluid"
                                        alt={`Preview ${index}`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeImg(index)}
                                        className="btn btn-icon btn-sm"
                                      >
                                        <i className="far fa-trash-alt" />
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                              <h5>
                                Put the main picture as the first Image <br />
                                Image Should be minimum 152 * 152 Supported File
                                formats JPG, PNG, SVG
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="accordion-item" id="location">
                    <h4
                      className="accordion-header"
                      id="panelsStayOpen-location"
                    >
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseNine"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseNine"
                      >
                        Location
                      </button>
                    </h4>
                    <div
                      id="panelsStayOpen-collapseNine"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-location"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label htmlFor="country" className="form-label">
                                Country
                              </label>
                              <input
                                readOnly
                                {...register("location.country", {
                                  required: "Country is required",
                                })}
                                type="text"
                                className="form-control"
                                id="country"
                                placeholder="Enter Country"
                                defaultValue="India"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.location?.country?.message as string}
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label htmlFor="city" className="form-label">
                                City
                              </label>
                              <input
                                {...register("location.city", {
                                  required: "City is required",
                                })}
                                type="text"
                                className="form-control"
                                id="city"
                                placeholder="Enter City"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.location?.city?.message as string}
                            </p>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label
                                htmlFor="phone-number"
                                className="form-label"
                              >
                                Phone Number <span>*</span>
                              </label>
                              <input
                                {...register("phoneNumber", {
                                  required: "Phone number is required",
                                  pattern: {
                                    value: /^[0-9]{10}$/, // Regular expression for 10 digit phone numbers
                                    message:
                                      "Please enter a valid 10-digit phone number",
                                  },
                                })}
                                type="text"
                                className="form-control"
                                id="phone-number"
                                placeholder="Enter Phone Number"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.phoneNumber?.message as string}
                            </p>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label htmlFor="email" className="form-label">
                                Email <span>*</span>
                              </label>
                              <input
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for a valid email address
                                    message:
                                      "Please enter a valid email address",
                                  },
                                })}
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.email?.message as string}
                            </p>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label
                                htmlFor="street-address"
                                className="form-label"
                              >
                                Google Maps Location Link <span>*</span>
                              </label>
                              <input
                                {...register("location.locationLink", {
                                  required: "Google Maps Link is required",
                                })}
                                type="text"
                                className="form-control"
                                id="street-address"
                                placeholder="Enter Link"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.location?.locationLink?.message as string}
                            </p>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="input-space">
                              <label
                                htmlFor="google-maps-link"
                                className="form-label"
                              >
                                Google Maps Embed Link <span>*</span>
                              </label>
                              <input
                                {...register("location.embedLink", {
                                  required: "Google Maps Link is required",
                                })}
                                type="text"
                                className="form-control"
                                id="google-maps-link"
                                placeholder="Enter Google Maps Embed Link"
                              />
                            </div>
                            <p className="text-danger">
                              {errors.location?.locationLink?.message as string}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Save form button */}
                  <button className="text-center btn-row btn btn-secondary save-profile">
                    Add Court <i className="feather-arrow-right-circle ms-1" />
                  </button>
                </form>
                {/* Accordian Contents */}
              </div>
            </div>
            {/* /Row */}
          </div>
          {/* /Container */}
        </div>
      )}
      {/* /Page Content */}
    </div>
  );
};

export default AddCourt;
