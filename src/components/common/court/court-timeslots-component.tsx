import React, { useEffect } from "react";
import Slider from "react-slick";
import CourtBookingSummaryComponent from "./court-booking-summary-component";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { formatEndTime } from "../../../utils/commin-utils/formatEndTime";
import { dayNames, monthNames } from "../../../utils/data-list/calenderData";
import { featuredVenuesSlider } from "../../../utils/data-list/slidersData";
import { getCourtBookedSlots } from "../../../utils/court-utils/getCourtBookedSlots";
import { useBookingContext } from "../../../context/booking-context";

const CourtTimeSlotsComponent = ({ courtData }: { courtData: CourtsData }) => {
  const {
    selectedDate,
    setSelectedSlots,
    setSelectedDate,
    courtDuration,
    selectedSlots,
  } = useBookingContext();
  const { timeSlots, handleTimeSlotClick } = getCourtBookedSlots(
    courtData,
    selectedDate,
    setSelectedSlots
  );
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);
  const handleDateChange = (idx: number) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + idx);
    setSelectedDate(newDate);
  };
  return (
    <div>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtTimeSlotsComponent;
