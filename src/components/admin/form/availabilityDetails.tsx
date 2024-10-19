import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TimePicker } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { formatTime } from "../../../utils/formatTime";

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

const AvailabilityDetails = ({
  errors,
  control,
  register,
  timeSlots,
  setTimeSlots,
  selectedHours,
  setSelectedHours,
}: {
  errors: any;
  control: any;
  register: any;
  timeSlots: any;
  setTimeSlots: any;
  selectedHours: any;
  setSelectedHours: any;
}) => {
  const [selectedDays, setSelectedDays] = useState(
    Array(daysOfWeek.length).fill(false)
  );
  const handleDayChange = (index: number) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

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

    setTimeSlots((prevState: any) => ({ ...prevState, [day]: slots })); // update the time slots for the specific day
  };

  // useEffect to recalculate time slots whenever selectedHours changes
  useEffect(() => {
    // Loop through all days and calculate slots
    Object.keys(selectedHours).forEach((day) => {
      calculateTimeSlots(day);
    });
  }, [selectedHours]);

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

  dayjs.extend(customParseFormat);
  return (
    <div className="accordion-item mb-4" id="availability">
      <h4 className="accordion-header" id="panelsStayOpen-availability">
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
                            onChange={() => handleDayChange(index)}
                            name="day"
                          />
                          <label htmlFor={`select_days_${day.id}`}>
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
                            <label htmlFor="status_1" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </div>
                        <span className="accord-title">Monday</span>
                        <Link to="#">Edit</Link>
                      </div>
                    </div>
                    <div id="monday" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <div className="row gx-2">
                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                Duration <span className="text-danger">*</span>
                              </label>
                              <Dropdown
                                value={selectedHours.monday.duration}
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
                                <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                End Time <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <h4>Available Timings</h4>
                            <div className="token-slot mt-2">
                              {timeSlots["monday"]?.map(
                                (
                                  slot: string,
                                  index: React.Key | null | undefined
                                ) => (
                                  <div
                                    className="form-check-inline visits me-1"
                                    key={index}
                                  >
                                    <label className="visit-btns">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value={slot && slot}
                                      />
                                      <span
                                        className="visit-rsn"
                                        data-bs-toggle="tooltip"
                                        title={slot}
                                      >
                                        {formatTime(slot)}
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
                            <label htmlFor="status_2" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </div>
                        <span className="accord-title">Tuesday</span>
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
                                Duration <span className="text-danger">*</span>
                              </label>
                              <Dropdown
                                value={selectedHours.tuesday.duration}
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
                                <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                End Time <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <h4>Available Timings</h4>
                            <div className="token-slot mt-2">
                              {timeSlots["tuesday"]?.map(
                                (
                                  slot: string,
                                  index: React.Key | null | undefined
                                ) => (
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
                                        {formatTime(slot)}
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
                            <label htmlFor="status_3" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </div>
                        <span className="accord-title">Wednesday</span>
                        <Link to="#">Edit</Link>
                      </div>
                    </div>
                    <div id="wednesday" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <div className="row gx-2">
                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                Duration <span className="text-danger">*</span>
                              </label>
                              <Dropdown
                                value={selectedHours.wednesday.duration}
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
                                <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                End Time <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <h4>Available Timings</h4>
                            <div className="token-slot mt-2">
                              {timeSlots["wednesday"]?.map(
                                (
                                  slot: string,
                                  index: React.Key | null | undefined
                                ) => (
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
                                        {formatTime(slot)}
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
                            <label htmlFor="status_4" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </div>
                        <span className="accord-title">Thursday</span>
                        <Link to="#">Edit</Link>
                      </div>
                    </div>
                    <div id="thursday" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <div className="row gx-2">
                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                Duration <span className="text-danger">*</span>
                              </label>
                              <Dropdown
                                value={selectedHours.thursday.duration}
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
                                <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                End Time <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <h4>Available Timings</h4>
                            <div className="token-slot mt-2">
                              {timeSlots["thursday"]?.map(
                                (
                                  slot: string,
                                  index: React.Key | null | undefined
                                ) => (
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
                                        {formatTime(slot)}
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
                            <label htmlFor="status_5" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </div>
                        <span className="accord-title">Friday</span>
                        <Link to="#">Edit</Link>
                      </div>
                    </div>
                    <div id="friday" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <div className="row gx-2">
                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                Duration <span className="text-danger">*</span>
                              </label>
                              <Dropdown
                                value={selectedHours.friday.duration}
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
                                <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                End Time <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <h4>Available Timings</h4>
                            <div className="token-slot mt-2">
                              {timeSlots["friday"]?.map(
                                (
                                  slot: string,
                                  index: React.Key | null | undefined
                                ) => (
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
                                        {formatTime(slot)}
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
                            <label htmlFor="status_6" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </div>
                        <span className="accord-title">Saturday</span>
                        <Link to="#">Edit</Link>
                      </div>
                    </div>
                    <div id="saturday" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <div className="row gx-2">
                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                Duration <span className="text-danger">*</span>
                              </label>
                              <Dropdown
                                value={selectedHours.saturday.duration}
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
                                <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                End Time <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <h4>Available Timings</h4>
                            <div className="token-slot mt-2">
                              {timeSlots["saturday"]?.map(
                                (
                                  slot: string,
                                  index: React.Key | null | undefined
                                ) => (
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
                                        {formatTime(slot)}
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
                            <label htmlFor="status_7" className="checktoggle">
                              checkbox
                            </label>
                          </div>
                        </div>
                        <span className="accord-title">Sunday</span>
                        <Link to="#">Edit</Link>
                      </div>
                    </div>
                    <div id="sunday" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        <div className="row gx-2">
                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                Duration <span className="text-danger">*</span>
                              </label>
                              <Dropdown
                                value={selectedHours.sunday.duration}
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
                                <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-3">
                            <div className="duration-blk">
                              <label className="form-control-label">
                                End Time <span className="text-danger">*</span>
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
                                  defaultOpenValue={dayjs("00:00", "HH:mm")}
                                  format="HH:mm"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <h4>Available Timings</h4>
                            <div className="token-slot mt-2">
                              {timeSlots["sunday"]?.map(
                                (
                                  slot: string,
                                  index: React.Key | null | undefined
                                ) => (
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
                                        {formatTime(slot)}
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
  );
};

export default AvailabilityDetails;
