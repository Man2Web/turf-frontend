import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../../router/all_routes";
import CourtDetailsComponent from "./court-details-component";
import { useForm, Controller } from "react-hook-form";
import { nanoid } from "nanoid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserDetailsComponent from "./user-details-component";
import OrderConfirmationPage from "./court-order-confirm";
import { formatEndTime } from "../../../utils/formatEndTime";
import { monthNames } from "../../../utils/monthNames";
import { UserDetailsFormData } from "../../../utils/types/userDetailsBookingForm";
import ButtonLoader from "../button-loader";
import AdminDetailsComponent from "./admin-details-component";
import { decimalNumber } from "../../../utils/decimalNumber";
import BookingConfirmModal from "../../admin/booking-confirm";
import { register } from "module";

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
  const { register, control, handleSubmit, watch } = useForm();
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [adminLoading, setAdminLoading] = useState<boolean>(false);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isCourtAdmin, setIsCourtAdmin] = useState<boolean>(false);

  const policy = watch("policy");

  // const month = monthNames[selectedDate.getMonth()];
  // const date = selectedDate.getDate();
  // const year = selectedDate.getFullYear();
  // const isAdmin = localStorage.getItem("adminId");
  const serviceCharge = Number(process.env.REACT_APP_SERVICE_CHARGE) || 0;
  const gstCharge = Number(process.env.REACT_APP_GST_CHARGE) || 0; // Assume this is a percentage like 18 for 18%
  const baseFee = Number(process.env.REACT_APP_BASE_FEE);
  const additionalUserCharge =
    (Number(userDetails?.additionalNumberOfGuests) || 0) *
    (Number(courtData?.pricing?.price_of_additional_guests) || 0);
  const startingPrice = Number(courtData.pricing.starting_price) || 0;
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

  const totalPrice = totalPriceWithoutGST + gstAmount;

  // const advanceAmountAdmin = Number(courtData.pricing.advance_pay);

  const advanceAmount =
    (Number(courtData.pricing.advance_pay) / 100) * totalPrice;

  // Function to handle API call for default payment method
  const onlinePay = async (data: any) => {
    console.log("Trig");

    // if (isValid) {
    const updatedData = {
      // name: "Random Name",
      amount: advanceAmount,
      amountTobePaid: Number(Math.round(totalPrice - advanceAmount)),
      courtDuration: courtDuration,
      // number: "87908770087",
      MID: nanoid(10),
      transactionId: nanoid(10),
      userDetails,
      selectedDate,
      selectedSlots,
      courtId: Number(courtId),
      user_id:
        localStorage.getItem("adminId") ||
        localStorage.getItem("userId") ||
        null,
    };

    if (data.policy) {
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
    // if (isValid) {
    const cashData = {
      courtDuration: courtDuration,
      amount: totalPrice,
      paymentMethod: "CASH",
      transactionId: nanoid(10),
      userDetails,
      selectedDate,
      selectedSlots,
      courtId: Number(courtId),
      user_id:
        localStorage.getItem("adminId") ||
        localStorage.getItem("userId") ||
        null,
    };

    try {
      setAdminLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}payment/admin`,
        cashData
      );
      if (response.status === 200) {
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
    // }
  };

  // const disableCheck = policy && Object.keys(errors).length === 0 && isValid;
  // const disableCheck = isValid;
  return (
    <div>
      <ToastContainer />
      {toggleModal && <BookingConfirmModal toggleModal={toggleModal} />}
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
                            courtData.pricing.starting_price *
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
                                            courtData.pricing
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
                        Number(courtData.pricing.advance_pay) !== 100 ? (
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

                      <form onSubmit={handleSubmit(onlinePay)}>
                        <div className="form-check d-flex justify-content-start align-items-center policy m-0 mb-2">
                          <div className="d-inline-block">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="policy"
                              {...register("policy", {
                                required: "You must agree to the policy",
                              })}
                            />

                            {errors?.policy && (
                              <p className="text-danger">
                                {errors.policy.message}
                              </p>
                            )}
                          </div>
                          <label className="form-check-label" htmlFor="policy">
                            By checking this box, I agree to the{" "}
                            <Link to="privacy-policy">Privacy Policy</Link>,{" "}
                            <Link to="terms-condition">Refund Policy</Link>, and{" "}
                            <Link to="terms-condition">
                              Terms & Conditions.
                            </Link>
                          </label>
                        </div>
                        {!policy && (
                          <p className="text-danger">
                            Please check this box in order to complete booking
                          </p>
                        )}
                        <div className="d-grid btn-block">
                          {isCourtAdmin && (
                            <button
                              type="button"
                              className="mb-2 btn btn-primary"
                              // disabled={!disableCheck}
                              onClick={onCashPayment} // Trigger onCashPayment when clicked
                              // data-bs-toggle="modal"
                              // data-bs-target="#bookingconfirmModal"
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
