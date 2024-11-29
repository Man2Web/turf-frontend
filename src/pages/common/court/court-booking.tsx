import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import CourtTimeSlotsComponent from "../../../components/common/court/court-timeslots-component";
import CourtCheckout from "../../../components/common/court/court-checkout";
import BookingHeader from "../../../components/common/booking-page/booking-header";
import { getCourtDuration } from "../../../utils/court-utils/getCourtDuration";
import { getCourtInfo } from "../../../utils/court-utils/getCourtInfo";
import {
  BookingContextProvider,
  useBookingContext,
} from "../../../context/booking-context";

const CourtBooking = () => {
  const { courtId } = useParams();
  const { selectedDate, setCourtDuration, progress, selectedSlots } =
    useBookingContext();

  const courtData = getCourtInfo(courtId);

  useEffect(() => {
    if (courtData && courtData.availability && selectedDate) {
      const matchedSlot = getCourtDuration(
        courtData.availability,
        selectedDate
      );
      matchedSlot
        ? setCourtDuration(matchedSlot.duration || "N/A")
        : setCourtDuration("N/A");
    }
  }, [courtData, selectedDate]);

  dayjs.extend(customParseFormat);

  return (
    <div>
      {courtData && (
        <>
          <BookingHeader courtData={courtData} />
          <div className="mt-4 book-cage">
            <div className="container">
              {courtData && progress === 0 && (
                <CourtTimeSlotsComponent courtData={courtData} />
              )}
              {selectedDate && selectedSlots && progress === 1 && courtData && (
                <CourtCheckout courtData={courtData} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourtBooking;
