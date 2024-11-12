import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TimePicker } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { formatTime } from "../../../utils/commin-utils/formatTime";

const daysOfWeek = [
  { id: 1, label: "Mon" },
  { id: 2, label: "Tues" },
  { id: 3, label: "Wed" },
  { id: 4, label: "Thur" },
  { id: 5, label: "Fri" },
  { id: 6, label: "Sat" },
  { id: 7, label: "Sun" },
];

const fullDaysOfWeek = [
  { name: "Sunday", key: "sunday", index: 0 },
  { name: "Monday", key: "monday", index: 1 },
  { name: "Tuesday", key: "tuesday", index: 2 },
  { name: "Wednesday", key: "wednesday", index: 3 },
  { name: "Thursday", key: "thursday", index: 4 },
  { name: "Friday", key: "friday", index: 5 },
  { name: "Saturday", key: "saturday", index: 6 },
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

  // Function to handle day checkbox changes
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
                            checked={selectedDays[index + 1]}
                            onChange={() => {
                              if (index === 6) {
                                handleDayChange(0);
                              } else {
                                handleDayChange(index + 1);
                              }
                            }}
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
                  {fullDaysOfWeek.map(({ name, key, index }) => (
                    <div
                      className="accordion-item"
                      id={`day-${key}`}
                      style={{
                        display: selectedDays[index] ? "block" : "none",
                      }}
                      key={key}
                    >
                      <div className="accordion-header">
                        <div
                          className="accordion-button collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${key}`}
                        >
                          <div className="interset-btn empty-space">
                            <div className="status-toggle d-inline-flex align-items-center">
                              <input
                                type="checkbox"
                                id={`status_${index + 1}`} // Status IDs starting from 1
                                className="check"
                              />
                              <label
                                htmlFor={`status_${index + 1}`}
                                className="checktoggle"
                              >
                                checkbox
                              </label>
                            </div>
                          </div>
                          <span className="accord-title">{name}</span>
                          <Link to="#">Edit</Link>
                        </div>
                      </div>
                      <div id={key} className="accordion-collapse collapse">
                        <div className="accordion-body">
                          <div className="row gx-2">
                            <div className="col-md-3">
                              <div className="duration-blk">
                                <label className="form-control-label">
                                  Duration{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Dropdown
                                  value={selectedHours[key].duration}
                                  onChange={(e) =>
                                    updateDayHours(
                                      key,
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
                                        name,
                                        time,
                                        timeString
                                      )
                                    }
                                    value={
                                      selectedHours[key].startTime &&
                                      dayjs(
                                        selectedHours[key].startTime,
                                        "HH:mm"
                                      )
                                    }
                                    defaultOpenValue={
                                      selectedHours[key].startTime
                                        ? dayjs(
                                            selectedHours[key].startTime,
                                            "HH:mm"
                                          )
                                        : dayjs("00:00", "HH:mm")
                                    }
                                    format="HH:mm"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="duration-blk">
                                <label className="form-control-label">
                                  End Time{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="form-icon">
                                  <TimePicker
                                    placeholder="Select Time"
                                    className="form-control datetimepicker1"
                                    onChange={(time, timeString) =>
                                      handleEndTimeChange(
                                        name,
                                        time,
                                        timeString
                                      )
                                    }
                                    value={
                                      selectedHours[key].endTime &&
                                      dayjs(selectedHours[key].endTime, "HH:mm")
                                    }
                                    defaultOpenValue={
                                      selectedHours[key].endTime
                                        ? dayjs(
                                            selectedHours[key].endTime,
                                            "HH:mm"
                                          )
                                        : dayjs("00:00", "HH:mm")
                                    }
                                    format="HH:mm"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <h4>Available Timings</h4>
                              <div className="token-slot mt-2">
                                {timeSlots[key]?.map(
                                  (slot: string, index: number) => {
                                    const processedSlot = slot.includes(":")
                                      ? slot.split(" ")[0] // If it contains ":", remove AM/PM if present
                                      : slot; // Otherwise, use the slot as is

                                    return (
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
                                            {formatTime(processedSlot)}
                                          </span>
                                        </label>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
