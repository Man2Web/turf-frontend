import React from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { DatePicker, Radio, Select, Space } from "antd";
import { useAppContext } from "../../../context/app-context";
const { RangePicker } = DatePicker;

interface formDataType {
  courtId: ModalCourtsData | null;
  couponType: string;
  timeRange: string[];
  couponCode: string;
  label: string;
  percentage: string;
  amount: string;
  startTime: string;
  endTime: string;
  minCartValue: string;
}

interface ModalCourtsData {
  id: string;
  name: string;
}

const options = [
  { label: "Flat Discount", value: "0" },
  { label: "Percentage Discount", value: "1" },
];

const courtsData = [{ id: 0, name: "Site Wide" }];

const AddCoupon = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<formDataType>({
    defaultValues: {
      courtId: null,
    },
  });
  const { setLoading } = useAppContext();
  const couponType = watch("couponType");

  // Function to handle form submission
  const onSubmit = async (data: formDataType) => {
    const updatedData = {
      ...data,
      courtId: 0,
      adminId: localStorage.getItem("superAdminId"),
      startTime: data.timeRange[0] || "",
      endTime: data.timeRange[1] || "",
    };

    try {
      setLoading({ status: true, description: "Adding Coupon..." });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}superadmin/coupon/add`,
        {
          ...updatedData,
        }
      );
      if (response.status === 200) {
        toast.success("Coupon Added Successfully");
      }
    } catch (error: unknown) {
      // console.error(error);
      // Check if error is an object and has a 'response' property
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { status: number } };

        // Check for 406 status
        if (err.response && err.response.status === 406) {
          toast.error("Coupon Name Already Exists");
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        // If the error is not of the expected format
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading({ status: false, description: "Adding Coupon..." });
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Page Content */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="profile-detail-group">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="row col-12">
                      <div className="col-4">
                        <div className="input-space d-flex flex-column">
                          <label htmlFor="select-court" className="form-label">
                            Select Court
                          </label>
                          <Select
                            defaultValue="Site Wide"
                            style={{ width: 200 }}
                            disabled
                          />
                          {errors.courtId && (
                            <span className="text-danger">
                              {errors.courtId.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-8 pt-2">
                        <div className="input-space d-flex flex-column">
                          <label htmlFor="select-range" className="form-label">
                            Select Time Range
                          </label>
                          <Controller
                            name="timeRange"
                            control={control}
                            rules={{ required: "Please select a timerange" }}
                            render={({ field }) => (
                              <Space direction="vertical" size={12}>
                                <RangePicker
                                  showTime={{ format: "HH:mm" }}
                                  format="YYYY-MM-DD HH:mm"
                                  className="form-label"
                                  onChange={(value, dateString) => {
                                    field.onChange(dateString);
                                  }}
                                />
                              </Space>
                            )}
                          />
                        </div>
                        {
                          <span className="text-danger">
                            {errors.timeRange?.message}
                          </span>
                        }
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-space d-flex flex-column">
                        <label htmlFor="coupon-type" className="form-label">
                          Coupon Type
                        </label>
                        <Controller
                          control={control}
                          name="couponType"
                          render={({ field }) => (
                            <Radio.Group
                              id="coupon-type"
                              size="large"
                              options={options}
                              defaultValue="0"
                              value={field.value}
                              onChange={(e) => field.onChange(e)}
                              optionType="button"
                              buttonStyle="solid"
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-space">
                        <label htmlFor="coupon-code" className="form-label">
                          Enter Coupon Code
                        </label>
                        <input
                          className="form-control"
                          id="coupon-code"
                          placeholder="GET50"
                          {...register("couponCode", {
                            required: "Coupon code is required",
                          })}
                        />
                        {errors.couponCode && (
                          <span className="text-danger">
                            {errors.couponCode.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="input-space">
                        <label htmlFor="coupon-label" className="form-label">
                          Enter Label
                        </label>
                        <input
                          className="form-control"
                          id="coupon-label"
                          placeholder="Get Flat 50% Off"
                          {...register("label", {
                            required: "Label text is required",
                          })}
                        />
                        {errors.label && (
                          <span className="text-danger">
                            {errors.label.message}
                          </span>
                        )}
                      </div>
                    </div>
                    {Number(couponType) === 1 ? (
                      <>
                        <div className="col-4">
                          <div className="input-space">
                            <label
                              htmlFor="coupon-percentage"
                              className="form-label"
                            >
                              Enter Percentage
                            </label>
                            <input
                              className="form-control"
                              id="coupon-percentage"
                              placeholder="10%"
                              {...register("percentage", {
                                required: "Percentage is required",
                              })}
                            />
                            {errors.percentage && (
                              <span className="text-danger">
                                {errors.percentage.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="input-space">
                            <label
                              htmlFor="coupon-amount"
                              className="form-label"
                            >
                              Enter Max Discount Amount
                            </label>
                            <input
                              className="form-control"
                              id="coupon-amount"
                              placeholder="100"
                              {...register("amount", {
                                required: "Amount is required",
                              })}
                            />
                            {errors.amount && (
                              <span className="text-danger">
                                {errors.amount.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="col-4">
                        <div className="input-space">
                          <label htmlFor="coupon-amount" className="form-label">
                            Enter Max Discount Amount
                          </label>
                          <input
                            className="form-control"
                            id="coupon-amount"
                            placeholder="100"
                            {...register("amount", {
                              required: "Amount is required",
                            })}
                          />
                          {errors.amount && (
                            <span className="text-danger">
                              {errors.amount.message}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="col-4">
                      <div className="input-space">
                        <label htmlFor="min-cart-amount" className="form-label">
                          Enter Min Cart Amount
                        </label>
                        <input
                          className="form-control"
                          id="min-cart-amount"
                          placeholder="1400"
                          {...register("minCartValue", {
                            required: "Min Cart Amount Is Required",
                          })}
                        />
                        {errors.amount && (
                          <span className="text-danger">
                            {errors.amount.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="save-changes text-end">
                    <button
                      type="submit"
                      className="btn btn-secondary save-profile"
                    >
                      Add Coupon
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default AddCoupon;
