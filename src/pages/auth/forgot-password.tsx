import React, { useState } from "react";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ButtonLoader from "../../components/common/loader/button-loader";

interface ResetForm {
  email: string;
}

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const routes = all_routes;

  const onSubmit = async (data: ResetForm) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/forgot/${data.email}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error && "response" in error) {
        const response = error.response as {
          status: number;
          data: { message: string };
        };

        if (response.status === 409) {
          toast.info(response.data.message);
        } else if (response.data && response.data.message) {
          toast.error(response.data.message);
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper authendication-pages">
      <ToastContainer />
      <div className="content blur-ellipses">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 mx-auto vph-100 d-flex align-items-center">
              <div className="forgot-password w-100">
                <header className="text-center forgot-head-title">
                  <Link to={"routes.home"}>
                    <ImageWithBasePath
                      src="assets/img/logo-black.svg"
                      className="img-fluid"
                      alt="Logo"
                    />
                  </Link>
                </header>
                <div className="shadow-card">
                  <h2>Forgot Password</h2>
                  <p>Enter Registered Email</p>
                  {/* Login Form */}
                  <form onSubmit={handleSubmit(onSubmit)} action="login">
                    <div className="form-group">
                      <div className="group-img">
                        <i className="feather-mail" />
                        <input
                          {...register("email", {
                            required: "User Email Is Required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address",
                            },
                          })}
                          type="text"
                          className={`form-control ${errors.email?.message ? "border border-danger" : ""}`}
                          placeholder="Email"
                        />
                        {errors.email?.type === "pattern" && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <button className="btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center">
                      {loading ? (
                        <ButtonLoader />
                      ) : (
                        <>
                          Submit
                          <i className="feather-arrow-right-circle ms-2" />
                        </>
                      )}
                    </button>
                  </form>
                  {/* /Login Form */}
                </div>
                <div className="bottom-text text-center">
                  <p>
                    Remember Password? <Link to={routes.login}>Sign In!</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
