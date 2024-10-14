import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { all_routes } from "../../../router/all_routes";
import CourtDetailsComponent from "./court-details-component";
import axios from "axios";
import { ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../Loader";
import CourtBookingSummaryComponent from "./court-booking-summary-component";
import { formatTime } from "../../../utils/formatTime";
import { formatEndTime } from "../../../utils/formatEndTime";
import { dayNames, monthNames } from "../../../utils/calenderData";

const timeSlotsContent = {
  title: "Time & Date",
  description:
    "Book your training session at a time and date that suits your needs.",
};

const featuredVenuesSlider = {
  dots: false,
  autoplay: false,
  slidesToShow: 4,
  margin: 20,
  speed: 100,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 776,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
interface TimeSlotInterface {
  day: string; // Represents the day of the week
  time: string; // The time slot in a string format
  isChecked: boolean; // Whether the time slot is selected or not
  isActive: boolean; // Whether the time slot is available/active
  isBooked?: boolean; // Optional - Whether the time slot is already booked
}

const CourtTimeSlotsComponent = ({
  progress,
  setProgress,
  courtData,
  courtImage,
  selectedDate,
  setSelectedDate,
  selectedSlots,
  setSetselectedSlots,
  courtDuration,
}: {
  progress: number;
  setProgress: any;
  courtData: CourtDataType;
  courtImage: any;
  selectedDate: any;
  setSelectedDate: any;
  selectedSlots: any;
  setSetselectedSlots: any;
  courtDuration: string;
}) => {
  const routes = all_routes;
  //   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlotInterface[]>([]);
  //   const [selectedSlots, setSetselectedSlots] = useState<any>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Create a function to compare two dates (ignoring time)
    const isSameDate = (date1: Date, date2: Date) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    const today = new Date();

    // Check if today and selectedDate are not the same
    if (!isSameDate(today, selectedDate)) {
      setSetselectedSlots([]); // Reset selectedSlots
    }
    const updatedTimeSlots = timeSlots.map((slot) => ({
      ...slot,
      isChecked: false, // Set isChecked to false for every slot
    }));
    console.log(updatedTimeSlots);
    setTimeSlots(updatedTimeSlots);
  }, [selectedDate]);

  // Handle time slot click (toggles isChecked only if the slot is active)
  const handleTimeSlotClick = (index: number) => {
    const updatedTimeSlots = [...timeSlots];

    // Only allow checking if the slot is active
    if (!updatedTimeSlots[index].isActive) {
      return;
    }

    // Toggle the `isChecked` state
    updatedTimeSlots[index].isChecked = !updatedTimeSlots[index].isChecked;

    // If the slot is not booked, update the selected slots
    if (!updatedTimeSlots[index].isBooked) {
      setSetselectedSlots((prevData: any) => {
        // Convert selectedDate to a comparable string (e.g., YYYY-MM-DD)
        const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

        // Check if the slot already exists in selectedSlots to avoid duplicates
        const slotExists = prevData.some(
          (slotObj: any) =>
            new Date(slotObj.date).toISOString().split("T")[0] ===
              formattedSelectedDate &&
            slotObj.slot.time === updatedTimeSlots[index].time &&
            slotObj.slot.day === updatedTimeSlots[index].day
        );

        if (slotExists) {
          // If the slot is unchecked, remove it from selected slots
          const filteredSlots = prevData.filter(
            (slotObj: any) =>
              !(
                new Date(slotObj.date).toISOString().split("T")[0] ===
                  formattedSelectedDate &&
                slotObj.slot.time === updatedTimeSlots[index].time &&
                slotObj.slot.day === updatedTimeSlots[index].day
              )
          );

          // Also uncheck the slot in updatedTimeSlots
          updatedTimeSlots[index].isChecked = false;

          // Return the updated selected slots after removal
          return filteredSlots;
        } else {
          // If the slot is checked, add it to selected slots
          const newSelectedSlot = {
            date: selectedDate,
            slot: updatedTimeSlots[index],
          };

          // Return the updated selected slots after addition
          return [...prevData, newSelectedSlot];
        }
      });
    }

    // Update the time slots state after modifying the check status
    setTimeSlots(updatedTimeSlots);

    // Log the updated states for debugging
    // console.log("Selected Slots:", selectedSlots);
  };

  // Generate time slots based on the provided data
  const generateTimeSlots = (
    timeSlotsData: {
      day_of_week: any;
      start_time: any;
      end_time: any;
      duration: any;
    }[]
  ) => {
    const allTimeSlots: {
      day: any;
      time: string;
      isChecked: boolean;
      isActive: boolean;
    }[] = [];
    const today = selectedDate;

    timeSlotsData.forEach(({ day_of_week, start_time, end_time, duration }) => {
      if (start_time && end_time) {
        const durationInMins = duration ? parseInt(duration) * 60 : 60; // Default to 60 mins if duration is empty
        const startTimeParts = start_time.split(":");
        const endTimeParts = end_time.split(":");
        const startTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          startTimeParts[0],
          startTimeParts[1]
        );
        const endTime = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          endTimeParts[0],
          endTimeParts[1]
        );

        for (
          let time = startTime;
          time < endTime;
          time.setMinutes(time.getMinutes() + durationInMins)
        ) {
          allTimeSlots.push({
            day: day_of_week,
            time: time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Use 24-hour format here
            }),
            isChecked: false,
            isActive: true,
          });
        }
      } else {
        // If start_time or end_time is null, set isActive to false for that day
        allTimeSlots.push({
          day: day_of_week,
          time: "No available slots",
          isChecked: false,
          isActive: false,
        });
      }
    });

    return allTimeSlots;
  };

  const updateTimeSlots = async () => {
    const dayIndex = selectedDate.getDay();
    const dayName = dayNames[dayIndex].toLowerCase(); // Get the corresponding day name in lowercase
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format the selected date

    console.log(formattedDate);
    console.log(courtData);

    try {
      setSlotsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/availability/${courtData.court_id}/${formattedDate}`
      );

      const bookedTimeSlots = response.data.bookedTimeSlots;

      // Find the time slot for the selected day in `courtData`
      const timeSlotsForDay = courtData.time_Slots.find(
        (slot) => slot.day_of_week === dayName
      );

      // Check if timeSlotsForDay is defined
      if (timeSlotsForDay) {
        // Generate available time slots
        const availableTimeSlots = generateTimeSlots([timeSlotsForDay]);

        // Compare the available time slots with the booked time slots and mark them
        const updatedTimeSlots = availableTimeSlots.map((slot) => {
          const isBooked =
            Array.isArray(bookedTimeSlots) &&
            bookedTimeSlots.some(
              (bookedSlot: { booking_time: string }) =>
                bookedSlot.booking_time.split(":").slice(0, 2).join(":") ===
                slot.time
            );

          // Check if this slot is already in selectedSlots for the selectedDate
          const isChecked = selectedSlots.some(
            (selectedSlot: any) =>
              new Date(selectedSlot.date).toISOString().split("T")[0] ===
                formattedDate &&
              selectedSlot.slot.time === slot.time &&
              selectedSlot.slot.day === slot.day
          );

          return {
            ...slot,
            isBooked, // Add an `isBooked` property to indicate if the time slot is already booked
            isChecked, // Set isChecked based on whether the slot is in selectedSlots
            isActive: !isBooked, // If booked, make it inactive
          };
        });

        // Update the time slots state with the newly updated time slots
        setTimeSlots(updatedTimeSlots);
      } else {
        setTimeSlots([]); // Set to empty if there are no slots for the selected day
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleDateChange = (idx: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + idx);
    setSelectedDate(newDate);
    updateTimeSlots();
  };

  // Initial load or whenever courtData or selectedDate changes
  useEffect(() => {
    updateTimeSlots();
  }, [courtData, selectedDate]);

  console.log(timeSlots);

  return (
    <div>
      <>
        <ToastContainer />
        {/* Page Content */}
        <div className="container pt-0">
          {/* <CourtDetailsComponent
            courtData={courtData}
            courtImage={courtImage}
            contentTitle={timeSlotsContent.title}
            contentDescription={timeSlotsContent.description}
          /> */}
          <div className="row text-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              <div className="card time-date-card">
                <section className="booking-date">
                  <div className="list-unstyled owl-carousel date-slider owl-theme mb-40">
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
                            <h6>{day}</h6>
                            <p>
                              {month} {date}
                            </p>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                  <div className="row">
                    {slotsLoading && <Loader />}
                    {!slotsLoading &&
                    (timeSlots.length == 0 ||
                      timeSlots[0].time !== "No available slots") ? (
                      timeSlots.map((slot, index) => (
                        <div key={index} className="col-12 col-sm-4 col-md-3">
                          <div
                            className={`time-slot ${slot.isChecked ? "checked" : ""} ${slot.isActive ? "active" : ""} ${slot.isBooked ? "cursor-none" : ""}`}
                            onClick={() => handleTimeSlotClick(index)}
                          >
                            <span>
                              {`${formatTime(slot.time)} - ${formatEndTime(slot.time, courtDuration)}`}
                            </span>
                            <i className="fa-regular fa-check-circle" />
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
            <CourtBookingSummaryComponent
              date={selectedDate}
              totalPrice={
                courtData.pricing.starting_price * selectedSlots.length
              }
              slots={selectedSlots}
              courtDuration={courtDuration}
              progress={progress}
              setProgress={setProgress}
            />
          </div>
        </div>
        {/* /Container */}
        {/* /Page Content */}
      </>
    </div>
  );
};

export default CourtTimeSlotsComponent;
