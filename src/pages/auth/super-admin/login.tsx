import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../../router/all_routes";
import Loader from "../../../components/common/Loader";
import ButtonLoader from "../../../components/common/button-loader";

const SuperAdminLoginFormComponent = () => {
  const navigate = useNavigate();
  const route = all_routes;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}superadmin/auth`, // Assuming you updated the backend route
        data
      );

      const { message, token, userId, role } = response.data;

      toast.success(message);

      // Store token and userId in localStorage, naming them based on the role
      if (role === "superAdmin") {
        localStorage.setItem("superAdminToken", token);
        localStorage.setItem("superAdminId", userId);
        navigate(route.SuperAdminDashboard); // Redirect to the admin dashboard
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form
        className="w-50 d-flex flex-column gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <div className="group-img">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.emailOrUsername && (
              <p className="error">
                {errors.emailOrUsername.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="pass-group group-img">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control pass-input"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="error">{errors.password.message as string}</p>
            )}
          </div>
        </div>

        <div className="form-group d-sm-flex align-items-center justify-content-between">
          <div className="form-check form-switch d-flex align-items-center justify-content-start">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Password
            </label>
          </div>
        </div>

        <button
          className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
          type="submit"
        >
          {loading && <ButtonLoader />}
          {!loading && (
            <>
              Sign In
              <i className="feather-arrow-right-circle ms-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SuperAdminLoginFormComponent;
