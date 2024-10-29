import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginFormComponent from "../../components/common/login-form";
import Slider from "react-slick";
import { loginSliderSettings } from "../../utils/slidersData";

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
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding d-none d-xl-block">
                <Slider className="slider-full-width" {...loginSliderSettings}>
                  {new Array(5).fill(null).map((_, index) => (
                    <ImageWithBasePath
                      key={index}
                      className="full-width-image"
                      src={`assets/img/gallery/gallery1/gallery-0${index + 1}.png`}
                    />
                  ))}
                </Slider>
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
