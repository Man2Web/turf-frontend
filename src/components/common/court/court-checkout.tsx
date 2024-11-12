import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserDetailsComponent from "./user-details-component";
import AdminDetailsComponent from "./admin-details-component";
import BookingConfirmModal from "../modal/booking-confirm";
import CheckOutForm from "./checkout-form";
import { couponDiscount } from "../../../utils/court-utils/coupon-discount";

interface CheckoutForm {
  policy: boolean;
  dataConfirmation: boolean;
  adminDetailsForm: any;
  userDetailsForm: any;
}

const CourtCheckout = ({
  courtData,
  userDetails,
  selectedDate,
  selectedSlots,
  courtId,
  setUserDetails,
  courtDuration,
}: {
  courtData: CourtsData;
  userDetails: any;
  selectedDate: any;
  selectedSlots: any;
  setUserDetails: any;
  courtId: any;
  courtDuration: any;
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    mode: "onTouched",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [adminLoading, setAdminLoading] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isCourtAdmin, setIsCourtAdmin] = useState<boolean>(false);
  const [adminBookingData, setAdminBookingData] =
    useState<SuccessBookingData>();
  const [userSelectedCoupon, setUserSelectedCoupon] = useState<Coupon>();

  const policy = watch("policy");
  const dataConfirmation = watch("dataConfirmation");

  useEffect(() => {
    getCourtPrice();
  }, [userSelectedCoupon]);

  const getCourtPrice = () => {
    const gstCharge = Number(process.env.REACT_APP_GST_CHARGE) || 0; // Assume this is a percentage like 18 for 18%
    const baseFee = Number(process.env.REACT_APP_BASE_FEE) || 0; // Ensure base fee defaults to 0 if not set
    const additionalUserCharge =
      (Number(userDetails?.additionalNumberOfGuests) || 0) *
      (Number(courtData?.pricing?.price_of_additional_guests) || 0);
    const startingPrice = Number(courtData.pricing.starting_price) || 0;
    const selectedSlotCount = selectedSlots.length || 0;

    const totalPriceWithoutGST =
      startingPrice * selectedSlotCount + additionalUserCharge;

    // Calculate GST and base amount
    const gstAmount = (gstCharge / 100) * totalPriceWithoutGST;
    const baseAmount = (baseFee / 100) * startingPrice * selectedSlotCount;

    let totalPrice: number;
    let discountedPrice: number;

    // Calculate the total price
    if (userSelectedCoupon) {
      const result = couponDiscount(
        totalPriceWithoutGST + gstAmount + baseAmount,
        userSelectedCoupon
      );
      totalPrice = result.totalPrice;
      discountedPrice = result.discountedPrice;
    } else {
      totalPrice = totalPriceWithoutGST + gstAmount + baseAmount;
      discountedPrice = 0;
    }

    // Calculate advance amount
    const advanceAmount =
      (Number(courtData.pricing.advance_pay) / 100) * totalPrice;

    return {
      gstAmount,
      baseAmount,
      additionalUserCharge,
      totalPrice,
      advanceAmount,
      discountedPrice,
    };
  };

  const checkIfCourtIsAdminCourt = async (adminId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/court/fetch/${adminId}/${courtData.court_id}`
      );
      response.status === 404 ? setIsCourtAdmin(false) : setIsCourtAdmin(true);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      checkIfCourtIsAdminCourt(adminId);
    }
  }, []);

  const { totalPrice, advanceAmount } = getCourtPrice();

  // Function to handle API call for default payment method
  const onlinePay = async () => {
    const updatedData = {
      amount: advanceAmount,
      amountTobePaid: Number(Math.round(totalPrice - advanceAmount)),
      courtDuration: courtDuration,
      MID: nanoid(10),
      transactionId: nanoid(10),
      userDetails,
      selectedDate,
      selectedSlots,
      courtId,
      user_id:
        localStorage.getItem("adminId") ||
        localStorage.getItem("userId") ||
        null,
      dataConfirmation,
    };
    if (policy && isValid) {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    }
  };

  // Function to handle API call for CASH payment method
  const onCashPayment = async () => {
    const cashData = {
      courtDuration: courtDuration,
      amount: totalPrice,
      paymentMethod: "CASH",
      transactionId: nanoid(10),
      userDetails,
      selectedDate,
      selectedSlots,
      courtId,
      user_id:
        localStorage.getItem("adminId") ||
        localStorage.getItem("userId") ||
        null,
    };
    if (policy && isValid) {
      try {
        setAdminLoading(true);
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
        setAdminLoading(false);
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      {toggleModal && (
        <BookingConfirmModal
          toggleModal={toggleModal}
          bookingData={adminBookingData}
          closeModal={false}
        />
      )}
      <div className="container">
        <section>
          <div className="row checkout">
            <div className="d-md-flex">
              {/* Form Data collection */}
              <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                {isCourtAdmin ? (
                  <AdminDetailsComponent
                    setIsValid={setIsValid}
                    courtData={courtData}
                    setUserDetails={setUserDetails}
                  />
                ) : (
                  <UserDetailsComponent
                    setIsValid={setIsValid}
                    courtData={courtData}
                    setUserDetails={setUserDetails}
                  />
                )}
              </div>
              <div>
                {/* Original CheckOut */}
                <CheckOutForm
                  courtData={courtData}
                  selectedSlots={selectedSlots}
                  userDetails={userDetails}
                  isCourtAdmin={isCourtAdmin}
                  getCourtPrice={getCourtPrice}
                  onlinePay={onlinePay}
                  onCashPayment={onCashPayment}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  loading={loading}
                  adminLoading={adminLoading}
                  trigger={trigger}
                  control={control}
                  policy={policy}
                  setValue={setValue}
                  setUserSelectedCoupon={setUserSelectedCoupon}
                  userSelectedCoupon={userSelectedCoupon}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourtCheckout;
