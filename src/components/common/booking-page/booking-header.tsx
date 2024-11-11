import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { formatEndTime } from "../../../utils/commin-utils/formatEndTime";
import { monthNames } from "../../../utils/data-list/monthNames";
import { weekNames } from "../../../utils/data-list/weekNames";

const getCourtSlotsForSelectedDate = (
  data: string[][] | undefined,
  selectedDate: Date
) => {
  if (!data) return null; // Handle undefined data

  const dayOfWeek = selectedDate.getDay(); // Get day index from the selected date (0 for Sunday, 1 for Monday, etc.)

  // Find the data for the selected day index
  const dayData = data.find((slot: string[]) => {
    const dayIndex = parseInt(slot[0], 10); // Convert the first element to number (day index)
    return dayIndex === dayOfWeek; // Check if it matches the selected day's index
  });

  // If data for the selected day is found, return the corresponding slots
  if (dayData) {
    const day = dayData[0]; // Day of the week (e.g., 0 for Sunday)
    const duration = dayData[1]; // Duration between slots (in hours)
    const startTime = dayData[2]; // Start time for slots
    const endTime = dayData[3]; // End time for slots

    return { start_time: startTime, end_time: endTime, duration, day };
  }

  return null; // Return null if no data found for the selected day
};

const BookingHeader = ({
  progress,
  setProgress,
  courtData,
  selectedSlots,
  courtDuration,
  selectedDate,
  userDetails,
}: {
  progress: number;
  setProgress: any;
  courtData: CourtsData;
  selectedSlots: any;
  courtDuration: any;
  selectedDate: any;
  userDetails: any;
}) => {
  const routes = all_routes;
  const year = selectedDate.getFullYear();
  const month = monthNames[selectedDate.getMonth()];
  const userSelectedDate = selectedDate.getDate();
  const currentDay = weekNames[selectedDate.getDay()];

  const [showAllSlots, setShowAllSlots] = useState(false);
  const slotsToShow = showAllSlots ? selectedSlots : selectedSlots.slice(0, 3); // Display up to 3 slots

  const customStyle = {
    background: location.pathname.includes(routes.home) ? "#ffffff" : "#ffffff",
    borderBottom: "solid 2px #097E52",
  };

  const timeSlots = getCourtSlotsForSelectedDate(
    courtData.availability,
    selectedDate
  );

  return (
    <header className="header-sticky" style={customStyle}>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="main-menu-wrapper d-flex justify-content-between align-items-center w-100">
            {progress > 0 && (
              <button
                className="btn btn-icon btn-secondary px-2 py-2 me-3 d-none d-md-block"
                onClick={() => setProgress(0)}
              >
                <i
                  style={{ fontSize: "20px" }}
                  className="feather-arrow-left-circle me-1"
                />
              </button>
            )}

            {/* Court Details */}
            <div className="court-info d-flex flex-column flex-lg-row justify-content-between w-100">
              {/* Court Name & Location */}
              <div className="me-3 court-details">
                <h4>{courtData.court_name}</h4>
                <div className="d-flex flex-wrap gap-2 fw-semibold location-info">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={courtData.location.location_link}
                  >
                    <p className="mb-1 text-capitalize">
                      <i className="feather-map-pin me-2 fw-bold" />
                      {courtData.location.city}, {courtData.location.country}
                    </p>
                  </Link>

                  {/* Time Slots */}
                  <p className="mb-1">
                    <i className="feather-clock me-2 fw-bold" />
                    {`${formatTime(timeSlots?.start_time)} - ${formatTime(timeSlots?.end_time)}`}
                  </p>

                  {/* Date Info */}
                  <p className="mb-1">
                    <i className="feather-calendar me-2 fw-bold" />
                    {userSelectedDate} {month}, {year}
                  </p>

                  {/* Booking Slots */}
                  <div className="booking-info d-flex flex-wrap">
                    {selectedSlots.length > 0 && (
                      <p className="mb-0 d-flex align-items-center gap-1">
                        <i className="feather-sun me-2 fw-bold" />
                        {slotsToShow.map(
                          (
                            slot: { time: string },
                            index: React.Key | null | undefined
                          ) => (
                            <span key={index}>
                              {`${formatTime(slot.time)} - ${formatEndTime(slot.time, courtDuration)}`}
                              {index !== slotsToShow.length - 1 && " | "}
                            </span>
                          )
                        )}
                        {selectedSlots.length > 3 && (
                          <button
                            className="btn btn-link p-0"
                            onClick={() => setShowAllSlots((prev) => !prev)}
                          >
                            {showAllSlots ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="text-end check d-flex gap-2 align-items-center pricing-details mt-3 mt-lg-0">
                {userDetails && (
                  <>
                    <div className="d-flex align-items-center gap-1">
                      <i className="feather-user" />
                      <p className="mb-0">{userDetails.numberOfGuests}</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <i className="feather-users" />
                      <p className="mb-0">
                        {userDetails.additionalNumberOfGuests}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default BookingHeader;
