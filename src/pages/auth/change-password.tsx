import React, { useEffect, useState } from "react";
import { all_routes } from "../../router/all_routes";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loader from "../../components/common/loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "../../context/app-context";

interface ResetPassword {
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const routes = all_routes;
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPassword>();
  const [status, setStatus] = useState<boolean | null>(null);
  const { setLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    getTokenData();
  }, []);

  const getTokenData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/token/${token}`
      );
      if (response.status === 200) {
        setStatus(true);
      }
    } catch (error) {
      // console.error(error);
      if (error instanceof Error && "response" in error) {
        const response = error.response as {
          status: number;
        };
        if (response.status === 404) {
          navigate(routes.error404);
        }
      }
    }
  };

  const onSubmit = async (data: ResetPassword) => {
    try {
      setLoading({ status: true, description: "Updating User Password..." });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}user/password/reset`,
        {
          ...data,
          token,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(routes.login);
        }, 3000);
      }
    } catch (error) {
      if (error instanceof Error && "response" in error) {
        const response = error.response as {
          status: number;
          data: { message: string };
        };
        if (response.status === 400) {
          toast.error(response.data.message);
        }
      }
    } finally {
      setLoading({ status: false, description: "Updating User Password..." });
    }
  };

  return (
    <div className="main-wrapper authendication-pages">
      <ToastContainer />
      {/* Page Content */}
      <div className="content blur-ellipses login-password">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-7 mx-auto vph-100 d-flex align-items-center">
              <div className="change-password w-100">
                <header className="text-center">
                  <Link to={"routes.home"}>
                    <ImageWithBasePath
                      src="assets/img/logo-black.svg"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </Link>
                </header>
                <div className="shadow-card">
                  <h2>Change Password</h2>
                  <p>
                    Your New Password must be different from
                    <br />
                    Previous used Password
                  </p>
                  {/* Login Form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <div className="pass-group group-img">
                        <i className="toggle-password feather-eye" />
                        <input
                          {...register("newPassword", {
                            required: "New Password is required",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be at least 8 characters long",
                            },
                            pattern: {
                              value:
                                /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
                              message:
                                "Password must contain an uppercase letter, a number, and a special character",
                            },
                          })}
                          type="password"
                          className={`form-control new-pass ${errors.newPassword ? "border border-danger" : ""}`}
                          placeholder="New Password"
                        />
                        {(errors.newPassword?.type === "pattern" ||
                          errors.newPassword?.type === "minLength") && (
                          <p className="text-danger">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="pass-group group-img">
                        <i className="toggle-password-confirm feather-eye" />
                        <input
                          {...register("confirmPassword", {
                            required: "New Password Is Required",
                            validate: (value: string) => {
                              if (watch("newPassword") !== value) {
                                return "Passwords do not match";
                              }
                            },
                          })}
                          type="password"
                          className={`form-control pass-confirm ${errors.confirmPassword?.message ? "border border-danger" : ""}`}
                          placeholder="Confirm Password"
                        />
                      </div>
                      {errors.confirmPassword?.type === "validate" && (
                        <p className="text-danger">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    <button className="btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center">
                      Change Password
                      <i className="feather-arrow-right-circle ms-2" />
                    </button>
                  </form>
                  {/* /Login Form */}
                </div>
                <div className="bottom-text text-center">
                  <p>
                    Have an account? <Link to={routes.login}>Sign In!</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default ChangePassword;
