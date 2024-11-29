import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import Loader from "../loader/Loader";
import axios from "axios";
import { useAppContext } from "../../../context/app-context";

const LoginFormComponent = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const route = all_routes;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProfileForm>();
  const { setLoading } = useAppContext();

  const onSubmit = async (data: any) => {
    try {
      setLoading({ status: true, description: "Logging In..." });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/auth`, // Assuming you updated the backend route
        data
      );

      const { message, token, userId, role } = response.data;

      toast.success(message);

      if (role === "admin") {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminId", userId);
        navigate(route.home); // Redirect to the admin dashboard
      } else if (role === "user") {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", userId);
        navigate(route.home); // Redirect to the user dashboard
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
      // console.error("Error posting data:", error);
    } finally {
      setLoading({ status: false, description: "Logging In..." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="group-img">
          <i className="feather-user" />
          <input
            type="text"
            className={`form-control ${errors.email ? "border border-danger" : ""}`}
            placeholder="Email or Username"
            {...register("email", {
              required: "Email or Username is required",
              validate: (value) => {
                // Regular expressions for email and username
                const isEmail =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    value
                  );
                const isUsername = /^[a-zA-Z0-9]+$/.test(value);
                return (
                  isEmail ||
                  isUsername ||
                  "Enter a valid email or username (alphanumeric only)"
                );
              },
            })}
          />
          {errors.email && errors.email?.type !== "required" && (
            <p style={{ fontSize: "14px" }} className="text-danger">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        <div className="pass-group group-img">
          <i className="toggle-password feather-eye" />
          <input
            type="password"
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
            <p style={{ fontSize: "14px" }} className="text-danger">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="form-group d-sm-flex align-items-center justify-content-between">
        <div className="form-check form-switch d-flex align-items-center justify-content-start"></div>
        <span>
          <Link to={routes.forgotPassword} className="forgot-pass">
            Forgot Password
          </Link>
        </span>
      </div>

      <button
        className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
        type="submit"
      >
        Sign In
        <i className="feather-arrow-right-circle ms-2" />
      </button>
    </form>
  );
};

export default LoginFormComponent;
