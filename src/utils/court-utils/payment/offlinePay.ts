import { toast } from "react-toastify";
import { useAppContext } from "../../../context/app-context";
import { nanoid } from "nanoid";
import { getCourtPrice } from "./getCourtPrice";
import axios from "axios";
import { useBookingContext } from "../../../context/booking-context";
import { UserDetailsFormData } from "../../types/user/userDetailsBookingForm";
import { AdminDetailsFormData } from "../../types/admin/adminDetailsBookingForm";

export const onCashPayment = async (
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
  setAdminBookingData: React.Dispatch<
    React.SetStateAction<SuccessBookingData | undefined>
  >,
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { totalPrice, advanceAmount } = getCourtPrice(
    userDetails,
    courtData,
    selectedSlots
  );

  const cashData = {
    courtDuration: courtDuration,
    amount: totalPrice,
    paymentMethod: "CASH",
    transactionId: nanoid(10),
    userDetails,
    selectedDate,
    selectedSlots,
    courtId: courtData.court_id,
    user_id:
      localStorage.getItem("adminId") || localStorage.getItem("userId") || null,
  };
  if (policy && isValid) {
    try {
      setLoading({ status: true, description: "Proccessing Booking" });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}payment/admin`,
        cashData
      );
      if (response.status === 200) {
        const transaction_id = response.data.transaction_id;

        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}booking/get/${transaction_id}`
          );
          setAdminBookingData(response.data);
        } catch (error) {
          // console.error(error);
        }
        setToggleModal(true);
      } else {
        toast.error("Error processing cash booking.");
      }
    } catch (error) {
      // console.error("Error during CASH payment:", error);
      toast.error("Error processing cash booking.");
    } finally {
      setLoading({ status: false, description: "Proccessing Booking" });
    }
  }
};
