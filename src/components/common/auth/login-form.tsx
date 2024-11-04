import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import Loader from "../loader/Loader";
import axios from "axios";
import { useAppContext } from "../../../context/app-context";
import Cookies from "js-cookie";

const LoginFormComponent = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const route = all_routes;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsAdmin, setIsUser } = useAppContext();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/auth`, // Assuming you updated the backend route
        data
      );

      const { message, token, userId, role } = response.data;

      toast.success(message);

      if (role === "admin") {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminId", userId);
        navigate(route.adminDashboard); // Redirect to the admin dashboard
      } else if (role === "user") {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userId", userId);
        navigate(route.userDashboard); // Redirect to the user dashboard
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Loader loader={loading} loadingDescription="Logging In..." />
      <div className="form-group">
        <div className="group-img">
          <i className="feather-user" />
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.emailOrUsername && (
            <p className="error">{errors.emailOrUsername.message as string}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <div className="pass-group group-img">
          <i className={`toggle-password `} />
          <input
            type={"password"}
            className="form-control pass-input"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message as string}</p>
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
