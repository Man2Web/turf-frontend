import React, { useState } from "react";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import { RupeeIcon } from "../../../utils/icons/icons";

const CourtBookingSummaryComponent = ({
  progress,
  setProgress,
  slots,
  totalPrice,
  courtDuration,
}: {
  progress: number;
  setProgress: any;
  slots: string[]; // Array of slot objects
  totalPrice: number;
  courtDuration: string;
}) => {
  const [slotsError, setSlotsError] = useState<boolean>(false);
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
      <aside className="card booking-details">
        <h3 className="border-bottom">Booking Details</h3>
        <ul>
          <li>
            <i className="feather-clock me-2" />
            Total Hours : {Number(courtDuration) * slots.length} Hrs
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
              slots && slots.length !== 0
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
    </div>
  );
};

export default CourtBookingSummaryComponent;
