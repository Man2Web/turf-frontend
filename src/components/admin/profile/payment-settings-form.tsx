import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../common/loader/Loader";
import { toast, ToastContainer } from "react-toastify";

type PaymentSettingsInput = {
  merchantId: string;
};

const PaymentSettingsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentSettingsInput>();
  const [loading, setLoading] = useState<boolean>(false);
  const adminId = localStorage.getItem("adminId");

  const getMerchantId = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/get/${adminId}`
      );
      const merchant_id = response.data.user.m_id;
      reset({
        merchantId: merchant_id,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMerchantId();
  }, []);

  const onSubmit = async (data: PaymentSettingsInput) => {
    //   console.log("Form Data: ", data);
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}user/update/mid/${adminId}`,
        data
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        getMerchantId();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    // Handle form submission logic here
  };

  return (
    <div className="row">
      <ToastContainer />
      <Loader
        loader={loading}
        loadingDescription="Fetching Payment Details Data..."
      />
      <div className="col-sm-12">
        <div className="profile-detail-group">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="input-space">
                    <label htmlFor="name" className="form-label">
                      Merchant ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="PGTESTPAYUAT"
                      {...register("merchantId", {
                        required:
                          "Merchant Id is required in order to accept payments",
                      })}
                    />
                    <p>We only accept PhonePe merchant ID as of now</p>
                    {errors.merchantId && (
                      <p className="text-danger">{errors.merchantId.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="save-changes text-end mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => reset()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-secondary ms-2">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettingsForm;
