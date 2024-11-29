import axios from "axios";
import { diffDateFormat } from "../commin-utils/dateFormat";
import { useEffect, useState } from "react";
import { getCourtSlotsForSelectedDate } from "./getCourtSlotsForSelectedDate";

export const getCourtBookedSlots = (
  courtData: CourtsData,
  selectedDate: Date,
  setSelectedSlots: any
) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlotInterface[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

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
          isActive:
            currentTime < new Date() &&
            selectedDate.getDate() === new Date().getDate()
              ? false
              : true,
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
      setTimeSlots((prevTimeSlots: any) =>
        prevTimeSlots.map((slot: TimeSlotInterface) => {
          if (bookedSlots.includes(`${slot.time}:00`)) {
            return {
              ...slot,
              isActive: false, // Assuming the slot should not be active when booked
              isBooked: true, // The slot is booked
            };
          } else {
            return {
              ...slot,
            };
          }
        })
      );
    }
  }, [bookedSlots]);
  return { timeSlots, handleTimeSlotClick };
};
