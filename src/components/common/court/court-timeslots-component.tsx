import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { all_routes } from "../../../router/all_routes";
import axios from "axios";
import { ToastContainer } from "react-bootstrap";
import Loader from "../loader/Loader";
import CourtBookingSummaryComponent from "./court-booking-summary-component";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { formatEndTime } from "../../../utils/commin-utils/formatEndTime";
import { dayNames, monthNames } from "../../../utils/data-list/calenderData";
import { featuredVenuesSlider } from "../../../utils/data-list/slidersData";
import {
  dateFormat,
  diffDateFormat,
} from "../../../utils/commin-utils/dateFormat";

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

const CourtTimeSlotsComponent = ({
  progress,
  setProgress,
  courtData,
  selectedDate,
  setSelectedDate,
  selectedSlots,
  setSelectedSlots,
  courtDuration,
}: {
  progress: number;
  setProgress: any;
  courtData: CourtsData;
  selectedDate: any;
  setSelectedDate: any;
  selectedSlots: any;
  setSelectedSlots: any;
  courtDuration: string;
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlotInterface[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeSlots([]);
    generateTimeSlots();
    setSelectedSlots([]);
  }, [selectedDate]);

  useEffect(() => {
    if (timeSlots.length > 0) {
      checkBookedSlots();
    }
  }, [timeSlots.length]); // Only trigger on length change

  const generateTimeSlots = () => {
    const timeSlots = getCourtSlotsForSelectedDate(
      courtData.availability,
      selectedDate
    );

    const generateTimeSlots = (
      startTime: string,
      endTime: string,
      duration: number
    ) => {
      const allTimeSlots: {
        time: string;
        isChecked: boolean;
        isActive: boolean;
      }[] = [];

      // Split the start and end time into hours and minutes
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      // Create Date objects for start and end times
      const startDate = new Date();
      startDate.setHours(startHour, startMinute, 0, 0);

      const endDate = new Date();
      endDate.setHours(endHour, endMinute, 0, 0);

      // Set the duration in minutes
      const durationInMinutes = duration * 60;

      // Loop through the time range and generate slots
      for (
        let currentTime = new Date(startDate);
        currentTime < endDate;
        currentTime.setMinutes(currentTime.getMinutes() + durationInMinutes)
      ) {
        allTimeSlots.push({
          time: currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          isChecked: false,
          isActive: true,
        });
      }
      return allTimeSlots;
    };
    if (timeSlots?.start_time && timeSlots?.end_time && timeSlots?.duration) {
      const timeSlotsData = generateTimeSlots(
        timeSlots.start_time,
        timeSlots.end_time,
        Number(timeSlots.duration)
      );
      setTimeSlots(timeSlotsData);
    } else {
      // console.error("Time slots data is missing or incomplete");
    }
  };

  const handleDateChange = (idx: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + idx);
    setSelectedDate(newDate);
  };

  const handleTimeSlotClick = (idx: number) => {
    const updatedTimeSlots = [...timeSlots];

    if (!updatedTimeSlots[idx].isBooked && updatedTimeSlots[idx].isActive) {
      updatedTimeSlots[idx].isChecked = !updatedTimeSlots[idx].isChecked;

      setTimeSlots(updatedTimeSlots);

      setSelectedSlots((prevSelectedSlots: any) => {
        if (updatedTimeSlots[idx].isChecked) {
          return [...prevSelectedSlots, updatedTimeSlots[idx]];
        }
        return prevSelectedSlots.filter(
          (slot: any) => slot.time !== updatedTimeSlots[idx].time
        );
      });
    }
  };

  const checkBookedSlots = async () => {
    try {
      const date = diffDateFormat(selectedDate);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/availability/${courtData.court_id}/${date}`
      );

      const bookedTimeSlots = response.data.bookedTimeSlots;

      if (
        bookedTimeSlots &&
        response.data.message === "Fetched the booked slots"
      ) {
        // Update booked slots state instead of directly updating timeSlots
        setBookedSlots(bookedTimeSlots);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  // Update timeSlots based on booked slots
  useEffect(() => {
    if (bookedSlots.length > 0) {
      setTimeSlots((prevTimeSlots) =>
        prevTimeSlots.map((slot) => ({
          ...slot,
          isActive: !bookedSlots.includes(`${slot.time}:00`),
          isBooked: bookedSlots.includes(`${slot.time}:00`),
        }))
      );
    }
  }, [bookedSlots]);
  return (
    <div>
      <ToastContainer />
      {/* Page Content */}
      <div className="container pt-0">
        <div className="row text-center">
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="card time-date-card">
              <section className="booking-date">
                {/* Date Slider */}
                <div className="date-slider owl-carousel owl-theme mb-4 px-2">
                  <Slider {...featuredVenuesSlider}>
                    {Array.from({ length: 30 }).map((_, idx) => {
                      const newDate = new Date();
                      newDate.setDate(newDate.getDate() + idx);
                      const date = newDate.getDate();
                      const month = monthNames[newDate.getMonth()];
                      const day = dayNames[newDate.getDay()];
                      return (
                        <div
                          key={idx}
                          className={`booking-date-item ${selectedDate.getDate() === date && selectedDate.getMonth() === newDate.getMonth() ? "selected" : ""}`}
                          onClick={() => handleDateChange(idx)}
                        >
                          <p>{day}</p>
                          <p>
                            {month} {date}
                          </p>
                        </div>
                      );
                    })}
                  </Slider>
                </div>

                {/* Time Slots */}
                <div className="row">
                  <Loader
                    loader={slotsLoading}
                    loadingDescription="Fetching Slots..."
                  />
                  {timeSlots.length > 0 ? (
                    timeSlots.map((slot, index) => (
                      <div key={index} className="col-6 col-md-3 col-sm-4">
                        <div
                          className={`time-slot p-2 ${slot.isChecked ? "checked" : ""} ${slot.isActive ? "active" : ""} ${slot.isBooked ? "cursor-none" : ""}`}
                          onClick={() => handleTimeSlotClick(index)}
                        >
                          <span>{`${formatTime(slot.time)} - ${formatEndTime(slot.time, courtDuration)}`}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 py-4">No time slots available</div>
                  )}
                </div>
              </section>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-4 mt-lg-0">
            <CourtBookingSummaryComponent
              totalPrice={
                Number(courtData.pricing.starting_price) * selectedSlots.length
              }
              slots={selectedSlots}
              courtDuration={courtDuration}
              progress={progress}
              setProgress={setProgress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtTimeSlotsComponent;
