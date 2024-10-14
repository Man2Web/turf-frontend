import React from "react";
import { formatEndTime } from "../../../utils/formatEndTime";
import { decimalNumber } from "../../../utils/decimalNumber";
import { RupeeIcon } from "../../../utils/icons";
import { formatTime } from "../../../utils/formatTime";

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

const CourtBookingSummaryComponent = ({
  progress,
  setProgress,
  date,
  slots,
  totalPrice,
  courtDuration,
}: {
  progress: number;
  setProgress: any;
  date: any;
  slots: any[]; // Array of slot objects
  totalPrice: number;
  courtDuration: string;
}) => {
  console.log(progress);
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
          <button onClick={() => setProgress(1)} className="btn btn-secondary">
            Proceed
          </button>
        )}
      </aside>
    </div>
  );
};

export default CourtBookingSummaryComponent;
