import React, { useEffect, useState } from "react";
import { decimalNumber } from "../../../utils/decimalNumber";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ButtonLoader from "../button-loader";
import axios from "axios";
import Search from "antd/es/transfer/search";
import { Input, message } from "antd";
import CouponsModal from "../../admin/coupons/coupons-modal";

interface CourtPrice {
  gstAmount: number;
  baseAmount: number;
  additionalUserCharge: number;
  totalPrice: number;
  advanceAmount: number;
  discountedPrice: number;
}

const CheckOutForm = ({
  courtData,
  selectedSlots,
  userDetails,
  isCourtAdmin,
  register,
  handleSubmit,
  getCourtPrice,
  errors,
  trigger,
  policy,
  loading,
  adminLoading,
  onCashPayment,
  onlinePay,
  control,
  setValue,
  setUserSelectedCoupon,
  userSelectedCoupon,
}: {
  courtData: CourtsData;
  selectedSlots: any;
  userDetails: any;
  isCourtAdmin: boolean;
  register: any;
  handleSubmit: any;
  getCourtPrice: () => CourtPrice;
  errors: any;
  trigger: any;
  policy: boolean;
  loading: boolean;
  adminLoading: boolean;
  onCashPayment: () => void;
  onlinePay: () => void;
  control: any;
  setValue: any;
  setUserSelectedCoupon: (data: Coupon) => void;
  userSelectedCoupon: Coupon | undefined;
}) => {
  const [courtCoupons, setcourtCoupons] = useState<Coupon[]>([]);
  const [couponError, setCouponError] = useState<string>();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { Search } = Input;
  const {
    gstAmount,
    baseAmount,
    additionalUserCharge,
    totalPrice,
    advanceAmount,
    discountedPrice,
  } = getCourtPrice();
  useEffect(() => {
    getCoupons();
  }, [courtData]);

  const getCoupons = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/coupon/get/${courtData.court_id}`
      );
      console.log(response);
      if (response.status === 200) {
        setcourtCoupons(response.data.coupons);
      }
    } catch (error) {
      console.error(error);
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
  console.log(couponError);
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
      <aside className="card payment-modes">
        <h3 className="border-bottom">Checkout</h3>
        <div className="px-2 d-flex justify-content-between align-items-center">
          <h5>Location Fee</h5>
          <h5>
            ₹
            {decimalNumber(
              Number(courtData.pricing.starting_price) * selectedSlots.length
            )}
          </h5>
        </div>
        <div className="px-2 pt-2 d-flex justify-content-between align-items-center">
          <h5>Convience Fee</h5>
          <h5>₹{decimalNumber(gstAmount + baseAmount)}</h5>
        </div>
        {/* Accordion */}
        <div>
          <div className="ask-questions">
            <div className="faq-info">
              {/* Dropdown */}
              <div className="px-2" id="accordionMain2">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingTwo">
                    <h6 className="">
                      <Link
                        to="#"
                        className="w-100 collapsed text-success d-flex justify-content-between"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false" // Change to false for correct initial state
                        aria-controls="collapseTwo"
                        style={{ fontSize: "12px" }}
                      >
                        Price breakdown
                      </Link>
                    </h6>
                  </div>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionMain2" // Ensure this matches the parent accordion ID
                  >
                    <div className="card-body-chat gap-2">
                      <div className="d-flex justify-content-between price-breakdown">
                        <p className="m-0 pb-2">GST Charge</p>
                        <p className="m-0 pb-2">₹{decimalNumber(gstAmount)}</p>
                      </div>
                      <div className="d-flex justify-content-between price-breakdown">
                        <p className="m-0 pb-2">Base Fee (2% of court price)</p>
                        <p className="m-0 pb-2">₹{decimalNumber(baseAmount)}</p>
                      </div>
                      {userDetails &&
                        userDetails.additionalNumberOfGuests > 0 && (
                          <div className="d-flex justify-content-between price-breakdown">
                            <p className="m-0 pb-2">
                              Additional Guest Charge (
                              {userDetails.additionalNumberOfGuests} *{" "}
                              {courtData.pricing.price_of_additional_guests})
                            </p>
                            <p className="m-0 pb-2">
                              ₹{decimalNumber(additionalUserCharge)}
                            </p>
                          </div>
                        )}
                      {userSelectedCoupon && (
                        <div className="d-flex justify-content-between price-breakdown">
                          <p className="m-0 pb-2">Coupon Discout</p>
                          <p className="m-0 pb-2">
                            ₹{decimalNumber(discountedPrice)}
                          </p>
                        </div>
                      )}
                      <div className="sorting-select"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isCourtAdmin && (
          <div className="px-2 pt-2 d-flex justify-content-between align-items-center">
            <h5>Order Total</h5>
            <h5 className="pb-2">₹ {decimalNumber(totalPrice)}</h5>
          </div>
        )}
        {!isCourtAdmin && courtCoupons.length > 0 && (
          <div className="px-2 pt-2">
            <div className="d-flex justify-content-between">
              <h5>Coupons</h5>
              <Link
                to="#"
                onClick={() => setToggleModal(true)}
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
                    enterButton="Get Discount"
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
                toggleModal={toggleModal}
                setToggleModal={setToggleModal}
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
                <h6
                  className="text-primary"
                  style={{ fontSize: "12px", fontWeight: "400" }}
                >
                  Pay Now
                </h6>
              </div>
              <div>
                <h5 className="pb-2">
                  ₹ {decimalNumber(Math.round(totalPrice - advanceAmount))}
                </h5>
                <h6
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Pay at Venue
                </h6>
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
          <div className="form-check d-flex justify-content-start align-items-center policy m-0 mb-2">
            <div className="d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="policy"
                {...register("policy", {
                  required:
                    "To proceed with booking, you must agree to the privacy policy, refund policy, and terms and conditions.",
                })}
              />
              <label className="form-check-label" htmlFor="policy">
                By checking this box, I agree to the{" "}
                <Link to="privacy-policy">Privacy Policy</Link>,{" "}
                <Link to="terms-condition">Refund Policy</Link>, and{" "}
                <Link to="terms-condition">Terms & Conditions.</Link>
              </label>
            </div>
          </div>
          {errors?.policy && (
            <p className="text-danger">{errors.policy.message}</p>
          )}

          <div className="d-grid btn-block">
            {isCourtAdmin && (
              <button
                type="submit"
                onClick={() => {
                  !policy ? trigger("policy") : onCashPayment();
                }}
                form="admin-form"
                className="mb-2 btn btn-primary"
              >
                {adminLoading ? <ButtonLoader /> : "Reserve Now (CASH)"}
              </button>
            )}
            {!isCourtAdmin && (
              <button
                type="submit"
                onClick={() => {
                  !policy ? trigger("policy") : onlinePay();
                }}
                form="user-form"
                className="mb-2 btn btn-primary"
              >
                {loading ? <ButtonLoader /> : "Reserve Now"}
              </button>
            )}
          </div>
        </form>
      </aside>
    </div>
  );
};

export default CheckOutForm;
