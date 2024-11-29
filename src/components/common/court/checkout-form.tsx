import React, { useEffect, useState } from "react";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { Collapse, Input } from "antd";
import CouponsModal from "../../admin/coupons/coupons-modal";
import { all_routes } from "../../../router/all_routes";
import { getCourtPrice } from "../../../utils/court-utils/payment/getCourtPrice";
import { useBookingContext } from "../../../context/booking-context";
import { onCashPayment } from "../../../utils/court-utils/payment/offlinePay";
import { onlinePay } from "../../../utils/court-utils/payment/onlinePay";
import { useAppContext } from "../../../context/app-context";

// interface CourtPrice {
//   gstAmount: number;
//   baseAmount: number;
//   additionalUserCharge: number;
//   totalPrice: number;
//   advanceAmount: number;
//   discountedPrice: number;
// }

const CheckOutForm = ({
  courtData,
  register,
  handleSubmit,
  errors,
  trigger,
  policy,
  control,
  setValue,
}: {
  courtData: CourtsData;
  register: any;
  handleSubmit: any;
  errors: any;
  trigger: any;
  policy: boolean;
  control: any;
  setValue: any;
}) => {
  const [courtCoupons, setcourtCoupons] = useState<Coupon[]>([]);
  const [couponError, setCouponError] = useState<string>();
  const [couponsModal, setCouponsModal] = useState<boolean>(false);
  const { setLoading } = useAppContext();
  const { Search } = Input;
  const {
    userDetails,
    selectedSlots,
    userSelectedCoupon,
    isCourtAdmin,
    setUserSelectedCoupon,
    courtDuration,
    selectedDate,
    isValid,
    dataConfirmation,
    setAdminBookingData,
    setToggleModal,
  } = useBookingContext();
  const {
    gstAmount,
    baseAmount,
    additionalUserCharge,
    totalPrice,
    advanceAmount,
    discountedPrice,
  } = getCourtPrice(userDetails, courtData, selectedSlots, userSelectedCoupon);
  useEffect(() => {
    getCoupons();
  }, [courtData]);

  const getCoupons = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/coupon/get/${courtData.court_id}`
      );
      if (response.status === 200) {
        setcourtCoupons(response.data.coupons);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  const addCoupon = (value: string) => {
    if (value) {
      const selectedCoupon = courtCoupons.filter((coupon: Coupon) => {
        return value.trim().toUpperCase() === coupon.coupon_code;
      });
      if (selectedCoupon.length > 0) {
        setUserSelectedCoupon(selectedCoupon[0]);
        setValue("couponCode", selectedCoupon[0].coupon_code);
      } else {
        setCouponError("Coupon Does Not Exist");
      }
    }
  };

  const getItems = [
    {
      key: "1",
      label: "Price Breakdown",
      children: (
        <div className="card-body-chat gap-2">
          <div className="d-flex justify-content-between price-breakdown">
            <p className="m-0 pb-2">GST Charge</p>
            <p className="m-0 pb-2">₹{decimalNumber(gstAmount)}</p>
          </div>
          <div className="d-flex justify-content-between price-breakdown">
            <p className="m-0 pb-2">Base Fee (2% of court price)</p>
            <p className="m-0 pb-2">₹{decimalNumber(baseAmount)}</p>
          </div>
          {userDetails && userDetails.additionalNumberOfGuests > 0 && (
            <div className="d-flex justify-content-between price-breakdown">
              <p className="m-0 pb-2">
                Additional Guest Charge ({userDetails.additionalNumberOfGuests}{" "}
                * {courtData.pricing.price_of_additional_guests})
              </p>
              <p className="m-0 pb-2">₹{decimalNumber(additionalUserCharge)}</p>
            </div>
          )}
          <div className="sorting-select"></div>
        </div>
      ),
      showArrow: false,
    },
  ];
  return (
    <div>
      <aside className="card payment-modes">
        <h3 className="border-bottom">Checkout</h3>
        <div className="px-2 d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Location Fee</h6>
          <h6 className="mb-0">
            ₹
            {decimalNumber(
              Number(courtData.pricing.starting_price) * selectedSlots.length
            )}
          </h6>
        </div>
        <div className="px-2 pt-2 d-flex justify-content-between align-items-center">
          <h6>Convience Fee</h6>
          <h6>₹{decimalNumber(gstAmount + baseAmount)}</h6>
        </div>
        {/* Accordion */}
        <div>
          <div className="ask-questions">
            <div className="faq-info">
              {/* Dropdown */}
              <div className="px-2" id="accordionMain2">
                <div className="accordion-item">
                  <Collapse
                    bordered={false}
                    items={getItems}
                    style={{ backgroundColor: "white" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {userSelectedCoupon && (
          <div className="px-2 pt-2 d-flex justify-content-between align-items-center">
            <h6>Coupon Discount</h6>
            <h6 className="text-success pb-2">
              ₹-{decimalNumber(discountedPrice)}
            </h6>
          </div>
        )}
        {!isCourtAdmin && (
          <div className="px-2 pt-2 d-flex justify-content-between align-items-center">
            <h6>Order Total</h6>
            <h6 className="pb-2">₹ {decimalNumber(totalPrice)}</h6>
          </div>
        )}
        {!isCourtAdmin && courtCoupons.length > 0 && (
          <div className="px-2 pt-2">
            <div className="d-flex justify-content-between">
              <h6>Coupons</h6>
              <Link
                to="#"
                onClick={() => setCouponsModal(true)}
                className="text-success"
                style={{ fontSize: "12px" }}
              >
                Available Coupons
              </Link>
            </div>
            <div className="d-flex">
              <Controller
                name="couponCode"
                control={control}
                render={({ field }) => (
                  <Search
                    placeholder="Enter Coupon Code"
                    enterButton={`${userSelectedCoupon ? "Applied" : "Apply"}`}
                    size="large"
                    value={field.value}
                    onChange={(e) => {
                      setCouponError("");
                      field.onChange(e.target.value);
                    }}
                    onSearch={() => {
                      addCoupon(field.value);
                    }}
                    //   loading
                  />
                )}
              />
              <CouponsModal
                totalPrice={totalPrice}
                couponsModal={couponsModal}
                setCouponsModal={setCouponsModal}
                couponsData={courtCoupons}
                addCoupon={addCoupon}
              />
            </div>
            {couponError && <div className="text-danger">{couponError}</div>}
          </div>
        )}
        {/* Total */}
        <div className="order-total d-flex justify-content-between align-items-center">
          {!isCourtAdmin && Number(courtData.pricing.advance_pay) !== 100 ? (
            <>
              <div>
                <h5 className="text-primary pb-2">
                  ₹ {decimalNumber(advanceAmount)}
                </h5>
                <h5
                  className="text-primary"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Pay Now
                </h5>
              </div>
              <div>
                <h5 className="pb-2">
                  ₹ {decimalNumber(Math.round(totalPrice - advanceAmount))}
                </h5>
                <h5
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Pay at Venue
                </h5>
              </div>
            </>
          ) : (
            <>
              <h5>Order Total</h5>
              <h5 className="pb-2">₹ {decimalNumber(totalPrice)}</h5>
            </>
          )}
        </div>
        <form
          id="terms-and-cond-form"
          onSubmit={handleSubmit(isCourtAdmin ? onCashPayment : onlinePay)}
        >
          <div className="form-check d-flex flex-column gap-2 justify-content-start align-items-start policy m-0 mb-4">
            <div className="d-flex align-items-center">
              <input
                className={`form-check-input ${errors?.policy ? "border border-danger" : ""}`}
                type="checkbox"
                id="policy"
                {...register("policy", {
                  required:
                    "To proceed with booking, you must agree to the privacy policy, refund policy, and terms and conditions.",
                })}
              />
              <label className="form-check-label" htmlFor="policy">
                By checking this box, I agree to the{" "}
                <Link to={`${all_routes.privacyPolicy}`}>Privacy Policy</Link>,{" "}
                <Link to={`${all_routes.termsCondition}`}>Refund Policy</Link>,
                and{" "}
                <Link to={`${all_routes.termsCondition}`}>
                  Terms & Conditions.
                </Link>
              </label>
            </div>
            {!isCourtAdmin &&
              (localStorage.getItem("userId") ||
                localStorage.getItem("adminId")) && (
                <div className="d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="dataConfirmation"
                    {...register("dataConfirmation")}
                  />
                  <label
                    className="form-check-label pt-0"
                    htmlFor="dataConfirmation"
                  >
                    Save the data for faster checkouts in future
                  </label>
                </div>
              )}
          </div>

          <div className="d-grid btn-block">
            {isCourtAdmin && (
              <button
                type="submit"
                onClick={() => {
                  !policy
                    ? trigger("policy")
                    : onCashPayment(
                        courtData,
                        setLoading,
                        userDetails,
                        selectedSlots,
                        courtDuration,
                        selectedDate,
                        isValid,
                        policy,
                        setAdminBookingData,
                        setToggleModal
                      );
                }}
                form="admin-form"
                className="mb-2 btn btn-primary"
              >
                Reserve Now (CASH)
              </button>
            )}
            {!isCourtAdmin && (
              <button
                type="submit"
                onClick={() => {
                  !policy
                    ? trigger("policy")
                    : onlinePay(
                        courtData,
                        setLoading,
                        userDetails,
                        selectedSlots,
                        courtDuration,
                        selectedDate,
                        isValid,
                        policy,
                        dataConfirmation
                      );
                }}
                form="user-form"
                className="mb-2 btn btn-primary"
              >
                Reserve Now
              </button>
            )}
          </div>
        </form>
      </aside>
    </div>
  );
};

export default CheckOutForm;
