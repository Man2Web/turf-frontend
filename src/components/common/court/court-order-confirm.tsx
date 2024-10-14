import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../../router/all_routes";
import CourtDetailsComponent from "./court-details-component";

interface UserDetailsFormData {
  name: string;
  email: string;
  phonenumber: string;
  address: string;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const OrderConfirmationPage = ({
  courtData,
  userDetails,
  selectedDate,
  selectedSlots,
}: {
  courtData: CourtDataType;
  userDetails: UserDetailsFormData;
  selectedDate: any;
  selectedSlots: any;
}) => {
  const routes = all_routes;
  const month = monthNames[selectedDate.getMonth()];
  const date = selectedDate.getDate();
  const week = dayNames[selectedDate.getDay()];

  // Helper to format time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    return `${formattedHour}:${minutes} ${suffix}`;
  };

  // Get the start and end times based on selectedSlots
  const sortedSlots = selectedSlots
    .map((slotData: any) => slotData.slot.time)
    .sort(); // Sort times to get the earliest and latest

  const bookingStartTime = formatTime(sortedSlots[0]);
  const bookingEndTime = formatTime(sortedSlots[sortedSlots.length - 1]);

  return (
    <div>
      <>
        {/* Page Content */}
        <div className="content">
          <div className="container">
            <section className="card booking-order-confirmation">
              <h5 className="mb-3">Booking Details</h5>
              <ul className="booking-info d-lg-flex gap-4 justify-content-start align-items-center">
                <li>
                  <h6>Booking Date</h6>
                  <p>
                    {week}, {month} {date}
                  </p>
                </li>
                <li>
                  <h6>Booking Start time</h6>
                  <p>{bookingStartTime}</p>
                </li>
                <li>
                  <h6>Booking End time</h6>
                  <p>{bookingEndTime}</p>
                </li>
              </ul>
              <h5 className="mb-3">Contact Information</h5>
              <ul className="contact-info d-lg-flex justify-content-start align-items-center">
                <li>
                  <h6>Name</h6>
                  <p>{userDetails.name}</p>
                </li>
                <li>
                  <h6>Contact Email Address</h6>
                  <p>{userDetails.email}</p>
                </li>
                <li>
                  <h6>Phone Number</h6>
                  <p>+91 {userDetails.phonenumber}</p>
                </li>
              </ul>
              <h5 className="mb-3">Payment Information</h5>
              <ul className="payment-info d-lg-flex justify-content-start align-items-center">
                <li>
                  <h6>Coach Price</h6>
                  <p className="primary-text">
                    (₹{courtData.pricing.starting_price} *{" "}
                    {selectedSlots.length} hours)
                  </p>
                </li>
                <li>
                  <h6>Subtotal</h6>
                  <p className="primary-text">
                    ₹{courtData.pricing.starting_price * selectedSlots.length}
                    .00
                  </p>
                </li>
              </ul>
            </section>
          </div>
          {/* /Container */}
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default OrderConfirmationPage;
