import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { all_routes } from "../../router/all_routes";
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
          fetchedCourtData.images.map(async (imageUrl: string) => {
            const imageBlob = await axios.get(imageUrl, {
              responseType: "blob",
            });
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
        (slot) => slot.day_of_week.toLowerCase() === dayOfWeek
      );

      if (matchedSlot) {
        setCourtDuration(matchedSlot.duration.replace(" Hrs", "") || "N/A");
      } else {
        setCourtDuration("N/A");
      }
    }
  }, [courtData, selectedDate]);

  // console.log(selectedSlots);

  // // console.log(courtData);

  const routes = all_routes;

  const updateProgress = (movement: string) => {
    if (movement === "next") {
      if (progress < 4) {
        setProgress(progress + 1);
      }
    } else {
      if (progress > 0) {
        setProgress(progress - 1);
      }
    }
  };

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
              {/* {
                <div
                  style={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    backgroundColor: "#fff", // Optional: Add background color to ensure it's visible
                    padding: "10px", // Optional: Add padding for spacing
                    // zIndex: 1000, // Optional: Ensure it's above other elements
                  }}
                  className="text-center btn-row"
                >
                  <button
                    className={`btn btn-secondary btn-icon me-3 ${progress === 0 ? "pe-none" : ""}`}
                    // className="btn btn-primary me-3 btn-icon"
                    onClick={() => updateProgress("prev")}
                    disabled={progress === 0}
                  >
                    <i className="feather-arrow-left-circle me-1" /> Back
                  </button>
                  <button
                    type={`${progress === 1 ? "submit" : "button"}`}
                    disabled={progress === 1 || selectedSlots.length === 0}
                    className={`btn btn-secondary btn-icon ${progress === 1 ? "pe-none" : ""}`}
                    onClick={() => updateProgress("next")}
                  >
                    Next <i className="feather-arrow-right-circle ms-1" />
                  </button>
                </div>
              } */}
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
