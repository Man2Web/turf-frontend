import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginFormComponent from "../../components/common/login-form";

const Login = () => {
  const route = all_routes;

  return (
    <>
      <ToastContainer />
      {/* Main Wrapper */}
      <div className="main-wrapper authendication-pages">
        {/* Page Content */}
        <div className="content">
          <div className="container wrapper no-padding">
            <div className="row no-margin vph-100">
              <div className="col-12 col-sm-12 col-lg-6 no-padding">
                <div className="banner-bg login">
                  <div className="row no-margin h-100">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <div className="h-100 d-flex justify-content-center align-items-center">
                        <div className="text-bg register text-center">
                          <button
                            type="button"
                            className="btn btn-limegreen text-capitalize"
                          >
                            <i className="fa-solid fa-thumbs-up me-3" />
                            Login User &amp; Coach
                          </button>
                          <p>
                            Log in right away for our advanced sports software
                            solutions, created to address issues in regular
                            sporting events and activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12  col-lg-6 no-padding">
                <div className="dull-pg">
                  <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <header className="text-center">
                        <Link to={"route.userDashboardProfiles"}>
                          <ImageWithBasePath
                            src="assets/img/logo-black.svg"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </Link>
                      </header>
                      <div className="shadow-card">
                        <h2>Welcome Back</h2>
                        <p>Login into your account</p>
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-panel fade show active"
                            id="coach"
                            role="tabpanel"
                            aria-labelledby="coach-tab"
                          >
                            {/* Login Form */}
                            <LoginFormComponent />
                            {/* /Login Form */}
                          </div>
                        </div>
                      </div>
                      <div className="bottom-text text-center">
                        <p>
                          Don’t have an account?{" "}
                          <Link to={route.register}>Sign up!</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Login;
