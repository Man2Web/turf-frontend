import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRegisterForm from "../../components/user/auth/user-register-form";
import AdminRegistrationForm from "../../components/admin/auth/admin-register-form";
import Slider from "react-slick";
import { loginSliderSettings } from "../../utils/data-list/slidersData";

const Signin = () => {
  const route = all_routes;

  return (
    <div>
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
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
                <div className="dull-pg">
                  <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                    <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                      <header className="text-center">
                        <Link to={"route.home"}>
                          <ImageWithBasePath
                            src="assets/img/logo-black.svg"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </Link>
                      </header>
                      <div className="shadow-card mb-0">
                        <h2>Get Started With Dreamsports</h2>
                        <p>
                          Ignite your sports journey with DreamSports and get
                          started now.
                        </p>
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="user"
                            role="tabpanel"
                            aria-labelledby="user-tab"
                          >
                            {/* User Register Form */}
                            <UserRegisterForm />
                            {/* /Register Form */}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="coach"
                            role="tabpanel"
                            aria-labelledby="coach-tab"
                          >
                            {/* Admin Register Form */}
                            <AdminRegistrationForm />
                            {/* /Register Form */}
                          </div>
                        </div>
                      </div>
                      <div className="bottom-text text-center">
                        <p>
                          Have an account?{" "}
                          <Link to={route.login}>Sign In!</Link>
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
    </div>
  );
};

export default Signin;
