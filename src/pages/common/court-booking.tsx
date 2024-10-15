import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import Loader from "../../components/common/Loader";
import CourtTimeSlotsComponent from "../../components/common/court/court-timeslots-component";
import CourtCheckout from "../../components/common/court/court-checkout";
import { UserDetailsFormData } from "../../utils/types/userDetailsBookingForm";
import BookingHeader from "../../components/common/booking-header";

const CourtBooking = () => {
  const { courtId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courtData, setCourtData] = useState<CourtDataType>();
  const [images, setImages] = useState<any>();
  const [progress, setProgress] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSetselectedSlots] = useState<any>([]);
  const [courtDuration, setCourtDuration] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetailsFormData>();

  useEffect(() => {
    try {
      setLoading(true);
      const getCourtInfo = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}court/fetch/${courtId}`
        );
        const fetchedCourtData = response.data.court;

        // const fetchedImages = [];
        const fetchedImages = await Promise.all(
          fetchedCourtData.images.map(async (image: { image_url: string }) => {
            const imageBlob = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}court/uploads/${fetchedCourtData?.user_id}/${fetchedCourtData?.id}/${image.image_url}`,
              {
                responseType: "blob",
              }
            );
            const objectUrl = URL.createObjectURL(imageBlob.data);
            return { url: objectUrl };
          })
        );
        setImages(fetchedImages);
        setCourtData(fetchedCourtData);
      };
      getCourtInfo();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (courtData && courtData.time_Slots && selectedDate) {
      const dayOfWeek = selectedDate
        .toLocaleString("en-US", { weekday: "long" })
        .toLowerCase();

      // Find the time slot for the selected day
      const matchedSlot = courtData.time_Slots.find(
        (slot: { day_of_week: string }) =>
          slot.day_of_week.toLowerCase() === dayOfWeek
      );

      if (matchedSlot) {
        setCourtDuration(matchedSlot.duration.replace(" Hrs", "") || "N/A");
      } else {
        setCourtDuration("N/A");
      }
    }
  }, [courtData, selectedDate]);

  dayjs.extend(customParseFormat);

  return (
    <div>
      {loading && <Loader />}
      {courtData && (
        <React.Fragment>
          <BookingHeader
            progress={progress}
            setProgress={setProgress}
            courtDuration={courtDuration}
            courtData={courtData}
            courtImage={images[0].url}
            selectedSlots={selectedSlots}
            selectedDate={selectedDate}
            userDetails={userDetails}
          />
          {/* Page Content */}
          <div className="content book-cage">
            <div className="container">
              {courtData && progress === 0 && (
                <CourtTimeSlotsComponent
                  progress={progress}
                  setProgress={setProgress}
                  courtData={courtData}
                  courtImage={images[0].url}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedSlots={selectedSlots}
                  setSetselectedSlots={setSetselectedSlots}
                  courtDuration={courtDuration}
                />
              )}
              {selectedDate && selectedSlots && progress === 1 && (
                <>
                  <CourtCheckout
                    courtData={courtData}
                    courtImage={images[0].url}
                    userDetails={userDetails}
                    selectedDate={selectedDate}
                    selectedSlots={selectedSlots}
                    setUserDetails={setUserDetails}
                    courtDuration={courtDuration}
                    courtId={courtId}
                  />
                </>
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
