import React, { useState } from "react";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import { RupeeIcon } from "../../../utils/icons/icons";
import { useBookingContext } from "../../../context/booking-context";

const CourtBookingSummaryComponent = ({
  totalPrice,
}: {
  totalPrice: number;
}) => {
  const { progress, selectedSlots, courtDuration, setProgress } =
    useBookingContext();
  const [slotsError, setSlotsError] = useState<boolean>(false);
  return (
    <aside className="card booking-details">
      <h3 className="border-bottom">Booking Details</h3>
      <ul>
        <li>
          <i className="feather-clock me-2" />
          Total Hours : {Number(courtDuration) * selectedSlots.length} Hrs
        </li>
        <li>
          <i className="text-success me-2">
            <RupeeIcon />
          </i>
          Sub Total : ₹{decimalNumber(totalPrice)}
        </li>
      </ul>
      {progress === 0 && (
        <button
          onClick={() => {
            selectedSlots && selectedSlots.length !== 0
              ? setProgress(1)
              : setSlotsError(true);
          }}
          className="btn btn-primary"
        >
          Proceed
        </button>
      )}
      {slotsError && (
        <p className="text-danger mb-0">
          You need to select atleaast one slots to book
        </p>
      )}
    </aside>
  );
};

export default CourtBookingSummaryComponent;
