import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserDetailsComponent from "./user-details-component";
import ButtonLoader from "../button-loader";
import AdminDetailsComponent from "./admin-details-component";
import { decimalNumber } from "../../../utils/decimalNumber";
import BookingConfirmModal from "../../admin/booking-confirm";

interface CheckoutForm {
  policy: boolean;
  adminDetailsForm: any;
  userDetailsForm: any;
}

const CourtCheckout = ({
  courtData,
  courtImage,
  userDetails,
  selectedDate,
  selectedSlots,
  courtId,
  setUserDetails,
  courtDuration,
}: {
  courtData: CourtDataType;
  courtImage: any;
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
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    mode: "onTouched",
  });
  const [localErrors, setErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [adminLoading, setAdminLoading] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isCourtAdmin, setIsCourtAdmin] = useState<boolean>(false);
  const [adminBookingData, setAdminBookingData] =
    useState<SuccessBookingData>();
  const policy = watch("policy");

  const gstCharge = Number(process.env.REACT_APP_GST_CHARGE) || 0; // Assume this is a percentage like 18 for 18%
  const baseFee = Number(process.env.REACT_APP_BASE_FEE);
  const additionalUserCharge =
    (Number(userDetails?.additionalNumberOfGuests) || 0) *
    (Number(courtData?.venueprice?.price_of_additional_guests) || 0);
  const startingPrice = Number(courtData.venueprice.starting_price) || 0;
  const selectedSlotCount = selectedSlots.length || 0;

  const checkIfCourtIsAdminCourt = async (adminId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/court/fetch/${adminId}/${courtData.court_id}`
      );
      response.status === 404 ? setIsCourtAdmin(false) : setIsCourtAdmin(true);
    } catch (error) {
      console.error(error);
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

  const totalPriceWithoutGST =
    startingPrice * selectedSlotCount + additionalUserCharge;

  // GST is applied as a percentage of the total price before GST
  const gstAmount = (gstCharge / 100) * totalPriceWithoutGST;

  // base fee
  const baseAmount = (baseFee / 100) * startingPrice * selectedSlotCount;

  const totalPrice = totalPriceWithoutGST + gstAmount + baseAmount;

  // const advanceAmountAdmin = Number(courtData.pricing.advance_pay);

  const advanceAmount =
    (Number(courtData.venueprice.advance_pay) / 100) * totalPrice;

  console.log(isValid, policy);

  // Function to handle API call for default payment method
  const onlinePay = async () => {
    console.log("Trig");
    // if (isValid) {
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
    // }
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
          console.log(response.data.transaction_id);
          const transaction_id = response.data.transaction_id;

          try {
            const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}booking/get/${transaction_id}`
            );
            console.log(response.data);
            setAdminBookingData(response.data);
          } catch (error) {
            console.error(error);
          }
          setToggleModal(true);
        } else {
          toast.error("Error processing cash booking.");
        }
      } catch (error) {
        console.error("Error during CASH payment:", error);
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
        />
      )}
      <div className="content pt-0">
        <div className="container">
          <section>
            <div className="row checkout">
              <div className="d-flex">
                {/* Form Data collection */}
                <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                  {isCourtAdmin ? (
                    <AdminDetailsComponent
                      setErrors={setErrors}
                      setIsValid={setIsValid}
                      courtData={courtData}
                      setUserDetails={setUserDetails}
                    />
                  ) : (
                    <UserDetailsComponent
                      setErrors={setErrors}
                      setIsValid={setIsValid}
                      courtData={courtData}
                      setUserDetails={setUserDetails}
                    />
                  )}
                </div>
                <div>
                  {/* Original CheckOut */}
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <aside className="card payment-modes">
                      <h3 className="border-bottom">Checkout</h3>
                      <div className="px-2 d-flex justify-content-between align-items-center">
                        <h5>Location Fee</h5>
                        <h5>
                          ₹
                          {decimalNumber(
                            courtData.venueprice.starting_price *
                              selectedSlots.length
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
                              <div className="" id="headingTwo">
                                <h6 className="">
                                  <Link
                                    to="#"
                                    className="w-100 collapsed text-success d-flex justify-content-between"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="true"
                                    aria-controls="collapseTwo"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Price breakdown
                                  </Link>
                                </h6>
                              </div>
                              <div
                                id="collapseTwo"
                                className="collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample2"
                              >
                                <div className="card-body-chat gap-2">
                                  <div className="d-flex justify-content-between price-breakdown">
                                    <p className="m-0 pb-2">GST Charge</p>
                                    <p className="m-0 pb-2">
                                      ₹{decimalNumber(gstAmount)}
                                    </p>
                                  </div>
                                  <div className="d-flex justify-content-between price-breakdown">
                                    <p className="m-0 pb-2">
                                      Base Fee ( 2% of court price )
                                    </p>
                                    <p className="m-0 pb-2">
                                      ₹{decimalNumber(baseAmount)}
                                    </p>
                                  </div>
                                  {userDetails &&
                                    userDetails.additionalNumberOfGuests >
                                      0 && (
                                      <div className="d-flex justify-content-between price-breakdown">
                                        <p className="m-0 pb-2">
                                          Additional Guest Charge ({" "}
                                          {userDetails.additionalNumberOfGuests}{" "}
                                          *{" "}
                                          {
                                            courtData.venueprice
                                              .price_of_additional_guests
                                          }{" "}
                                          )
                                        </p>
                                        <p className="m-0 pb-2">
                                          ₹{decimalNumber(additionalUserCharge)}
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
                      {!isCourtAdmin && (
                        <div className="px-2 pt-2 d-flex justify-content-between align-items-center">
                          <h5>Order Total</h5>
                          <h5 className="pb-2">
                            ₹ {decimalNumber(totalPrice)}
                          </h5>
                        </div>
                      )}
                      {/* Total */}
                      <div className="order-total d-flex justify-content-between align-items-center">
                        {!isCourtAdmin &&
                        Number(courtData.venueprice.advance_pay) !== 100 ? (
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
                                ₹{" "}
                                {decimalNumber(
                                  Math.round(totalPrice - advanceAmount)
                                )}
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
                            <h5 className="pb-2">
                              ₹ {decimalNumber(totalPrice)}
                            </h5>
                          </>
                        )}
                      </div>
                      <form
                        id="terms-and-cond-form"
                        onSubmit={handleSubmit(
                          isCourtAdmin ? onCashPayment : onlinePay
                        )}
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
                            <label
                              className="form-check-label"
                              htmlFor="policy"
                            >
                              By checking this box, I agree to the{" "}
                              <Link to="privacy-policy">Privacy Policy</Link>,{" "}
                              <Link to="terms-condition">Refund Policy</Link>,
                              and{" "}
                              <Link to="terms-condition">
                                Terms & Conditions.
                              </Link>
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
                              {adminLoading ? (
                                <ButtonLoader />
                              ) : (
                                "Reserve Now (CASH)"
                              )}
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CourtCheckout;
