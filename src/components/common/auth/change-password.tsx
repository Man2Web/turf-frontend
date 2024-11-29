import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { useAppContext } from "../../../context/app-context";

interface formDataType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordComponent = () => {
  const { setLoading } = useAppContext();
  const userId = localStorage.getItem("userId");

  // Initialize react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formDataType>();

  const newPass = watch("newPassword");

  // Function to handle form submission
  const onSubmit = async (data: formDataType) => {
    try {
      setLoading({ status: true, description: "Updating User Password..." });
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}user/pass/update/${userId}`,
        data
      );
      response.status === 200
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
      reset();
    } catch (error: any) {
      toast.error("Please check the credentials and try again");
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Updating User Password..." });
    } // Handle password update logic here
  };

  return (
    <div>
      <ToastContainer />
      {/* Page Content */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="profile-detail-group">
              <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-7 col-md-7">
                      <div className="input-space">
                        <label className="form-label">Old Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter Old Password"
                          {...register("oldPassword", {
                            required: "Old Password is required",
                          })}
                        />
                        {errors.oldPassword && (
                          <span className="text-danger">
                            {errors.oldPassword.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7">
                      <div className="input-space">
                        <label className="form-label">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="new-password"
                          placeholder="Enter New Password"
                          {...register("newPassword", {
                            required: "New Password is required",
                          })}
                        />
                        {errors.newPassword && (
                          <span className="text-danger">
                            {errors.newPassword.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7">
                      <div className="input-space mb-0">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirm-password"
                          placeholder="Enter Confirm Password"
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                              value === newPass || "Passwords do not match",
                          })}
                        />
                        {errors.confirmPassword && (
                          <span className="text-danger">
                            {errors.confirmPassword.message}
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
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default ChangePasswordComponent;
