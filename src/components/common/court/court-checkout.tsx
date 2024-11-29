import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UserDetailsComponent from "./user-details-component";
import AdminDetailsComponent from "./admin-details-component";
import BookingConfirmModal from "../modal/booking-confirm";
import CheckOutForm from "./checkout-form";
import { useAppContext } from "../../../context/app-context";
import { getCourtPrice } from "../../../utils/court-utils/payment/getCourtPrice";
import { useBookingContext } from "../../../context/booking-context";

interface CheckoutForm {
  policy: boolean;
  dataConfirmation: boolean;
  adminDetailsForm: any;
  userDetailsForm: any;
}

const CourtCheckout = ({ courtData }: { courtData: CourtsData }) => {
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
  const { setLoading } = useAppContext();
  const {
    toggleModal,
    adminBookingData,
    setIsCourtAdmin,
    isCourtAdmin,
    userSelectedCoupon,
    selectedSlots,
    userDetails,
    setPolicy,
    setDataConfirmation,
  } = useBookingContext();

  const policy = watch("policy");
  const dataConfirmation = watch("dataConfirmation");
  useEffect(() => {
    setPolicy(policy);
    setDataConfirmation(dataConfirmation);
  }, [policy, dataConfirmation]);

  useEffect(() => {
    if (userSelectedCoupon) {
      getCourtPrice(userDetails, courtData, selectedSlots, userSelectedCoupon);
    }
  }, [userSelectedCoupon]);

  const checkIfCourtIsAdminCourt = async (adminId: string) => {
    try {
      setLoading({ status: true, description: "Adding Coupon..." });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/court/fetch/${adminId}/${courtData.court_id}`
      );
      response.status === 404 ? setIsCourtAdmin(false) : setIsCourtAdmin(true);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Adding Coupon..." });
    }
  };

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      checkIfCourtIsAdminCourt(adminId);
    }
  }, []);

  return (
    <div>
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
            <div className="d-lg-flex gap-lg-4">
              {/* Form Data collection */}
              <div className="col-12 col-lg-8">
                {isCourtAdmin ? (
                  <AdminDetailsComponent courtData={courtData} />
                ) : (
                  <UserDetailsComponent courtData={courtData} />
                )}
              </div>
              <div className="col-12 col-lg-4">
                {/* Original CheckOut */}
                <CheckOutForm
                  courtData={courtData}
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  trigger={trigger}
                  control={control}
                  policy={policy}
                  setValue={setValue}
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
