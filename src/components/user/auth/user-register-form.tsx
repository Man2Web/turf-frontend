import axios from "axios";
import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";

const UserRegisterForm = () => {
  const routes = all_routes;
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [confirmPasswordVisible1, setConfirmPasswordVisible1] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRegisterForm>();

  const onSubmitUser = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}user/addUser`,
        data
      );
      response.status === 201
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Error posting data:", error);
    }
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1((prev: any) => !prev);
  };

  const toggleConfirmPasswordVisibility1 = () => {
    setConfirmPasswordVisible1((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitUser)}>
      <ToastContainer />
      <div className="form-group">
        <div className="group-img">
          <i className="feather-user" />
          <input
            type="text"
            className={`form-control ${errors.username ? "border border-danger" : ""}`}
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
            })}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="group-img">
          <i className="feather-mail" />
          <input
            type="text"
            className={`form-control ${errors.email ? "border border-danger" : ""}`}
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </div>

        {/* Conditionally show error messages excluding 'required' if needed */}
        {errors.email && (
          <p className="text-danger">
            {errors.email.type === "pattern" && errors.email.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <div className="group-img">
          <i className="feather-phone" />
          <input
            type="tel"
            className={`form-control ${errors.phonenumber ? "border border-danger" : ""}`}
            placeholder="Phone Number"
            {...register("phonenumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Adjust pattern as per your requirements (e.g., 10-digit numbers)
                message: "Phone Number must be 10 digits",
              },
              minLength: {
                value: 10,
                message: "Phone Number must be at least 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Phone Number cannot exceed 10 digits",
              },
            })}
          />
        </div>

        {/* Conditionally show error message, excluding the 'required' error */}
        {errors.phonenumber && errors.phonenumber.type !== "required" && (
          <p className="text-danger">{errors.phonenumber.message}</p>
        )}
      </div>

      <div className="form-group">
        <div className="pass-group group-img">
          <i
            className={`toggle-password ${passwordVisible1 ? "feather-eye" : "feather-eye-off"}`}
            onClick={togglePasswordVisibility1}
          />
          <input
            type={passwordVisible1 ? "text" : "password"}
            className={`form-control pass-input ${errors.password ? "border border-danger" : ""}`}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter",
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "Password must contain at least one number",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character",
              },
            })}
          />
          {errors.password && errors.password?.type !== "required" && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <div className="pass-group group-img">
          <i
            className={`toggle-password ${confirmPasswordVisible1 ? "feather-eye" : "feather-eye-off"}`}
            onClick={toggleConfirmPasswordVisibility1}
          />
          <input
            type={confirmPasswordVisible1 ? "text" : "password"}
            className={`form-control pass-input ${errors.confirmPassword ? "border border-danger" : ""}`}
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type !== "required" && (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            )}
        </div>
      </div>

      <div className="form-check d-flex justify-content-start align-items-center policy">
        <div className="d-inline-block">
          <input
            className={`form-check-input ${errors.terms ? "border border-danger" : ""}`}
            type="checkbox"
            {...register("terms", {
              required: "You must agree to the terms",
            })}
          />
        </div>
        <label className="form-check-label">
          By continuing you indicate that you read and agreed to the{" "}
          <Link to={routes.termsCondition}>Terms of Use</Link>
        </label>
      </div>

      <button
        className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
        type="submit"
      >
        Create Account
        <i className="feather-arrow-right-circle ms-2" />
      </button>
    </form>
  );
};

export default UserRegisterForm;
