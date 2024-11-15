import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import Loader from "../../../components/common/loader/Loader";
import CourtTimeSlotsComponent from "../../../components/common/court/court-timeslots-component";
import CourtCheckout from "../../../components/common/court/court-checkout";
import { UserDetailsFormData } from "../../../utils/types/user/userDetailsBookingForm";
import BookingHeader from "../../../components/common/booking-page/booking-header";
import { getCourtDuration } from "../../../utils/court-utils/getCourtDuration";

const CourtBooking = () => {
  const { courtId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courtData, setCourtData] = useState<CourtsData>();
  const [progress, setProgress] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<any>([]);
  const [courtDuration, setCourtDuration] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetailsFormData>();

  useEffect(() => {
    try {
      setLoading(true);
      const getCourtInfo = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}court/fetch/${courtId}`
        );
        const fetchedCourtData = response.data.courtData;
        setCourtData(fetchedCourtData);
      };
      getCourtInfo();
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (courtData && courtData.availability && selectedDate) {
      const matchedSlot = getCourtDuration(
        courtData.availability,
        selectedDate
      );
      if (matchedSlot) {
        setCourtDuration(matchedSlot.duration || "N/A");
      } else {
        setCourtDuration("N/A");
      }
    }
  }, [courtData, selectedDate]);

  dayjs.extend(customParseFormat);

  return (
    <div>
      <Loader loader={loading} loadingDescription="Fetching Court Data..." />
      {courtData && (
        <React.Fragment>
          <BookingHeader
            progress={progress}
            setProgress={setProgress}
            courtDuration={courtDuration}
            courtData={courtData}
            selectedSlots={selectedSlots}
            selectedDate={selectedDate}
            userDetails={userDetails}
          />
          {/* Page Content */}
          <div className="mt-4 book-cage">
            <div className="container">
              {courtData && progress === 0 && (
                <CourtTimeSlotsComponent
                  progress={progress}
                  setProgress={setProgress}
                  courtData={courtData}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedSlots={selectedSlots}
                  setSelectedSlots={setSelectedSlots}
                  courtDuration={courtDuration}
                />
              )}
              {selectedDate && selectedSlots && progress === 1 && (
                <CourtCheckout
                  courtData={courtData}
                  userDetails={userDetails}
                  selectedDate={selectedDate}
                  selectedSlots={selectedSlots}
                  setUserDetails={setUserDetails}
                  courtDuration={courtDuration}
                  courtId={courtId}
                />
              )}
            </div>
            {/* /Container */}
          </div>
          {/* /Page Content */}
        </React.Fragment>
      )}
    </div>
  );
};

export default CourtBooking;
