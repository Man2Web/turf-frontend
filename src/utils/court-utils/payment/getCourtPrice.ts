import { AdminDetailsFormData } from "../../types/admin/adminDetailsBookingForm";
import { UserDetailsFormData } from "../../types/user/userDetailsBookingForm";
import { couponDiscount } from "../coupon-discount";

export const getCourtPrice = (
  userDetails: UserDetailsFormData | AdminDetailsFormData | undefined,
  courtData: CourtsData,
  selectedSlots: any,
  userSelectedCoupon?: Coupon | undefined
) => {
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
