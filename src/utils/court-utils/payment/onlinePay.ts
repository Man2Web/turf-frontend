import { toast } from "react-toastify";
import { useAppContext } from "../../../context/app-context";
import { useBookingContext } from "../../../context/booking-context";
import { getCourtPrice } from "./getCourtPrice";
import { nanoid } from "nanoid";
import axios from "axios";
import { UserDetailsFormData } from "../../types/user/userDetailsBookingForm";
import { AdminDetailsFormData } from "../../types/admin/adminDetailsBookingForm";

export const onlinePay = async (
  courtData: CourtsData,
  setLoading: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      description: string;
    }>
  >,
  userDetails: UserDetailsFormData | AdminDetailsFormData | undefined,
  selectedSlots: any,
  courtDuration: string,
  selectedDate: Date,
  isValid: boolean | undefined,
  policy: boolean,
  dataConfirmation: boolean | undefined
) => {
  const { totalPrice, advanceAmount } = getCourtPrice(
    userDetails,
    courtData,
    selectedSlots
  );
  const updatedData = {
    amount: advanceAmount,
    amountTobePaid: Number(Math.round(totalPrice - advanceAmount)),
    courtDuration: courtDuration,
    MID: nanoid(10),
    transactionId: nanoid(10),
    userDetails,
    selectedDate,
    selectedSlots,
    courtId: courtData.court_id,
    user_id:
      localStorage.getItem("adminId") || localStorage.getItem("userId") || null,
    dataConfirmation,
  };
  if (policy && isValid) {
    try {
      setLoading({ status: true, description: "Processing Booking..." });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}payment`,
        updatedData
      );

      const redirectUrl =
        response.data?.data?.instrumentResponse?.redirectInfo?.url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.error("Error booking slot");
      }
    } catch (error) {
      console.error("Error during payment:", error);
    } finally {
      setLoading({ status: false, description: "Processing Booking..." });
    }
  }
};
