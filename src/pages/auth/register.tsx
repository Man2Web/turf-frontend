import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRegisterForm from "../../components/user/user-register-form";
import AdminRegistrationForm from "../../components/admin/admin-register-form";

const Signin = () => {
  const route = all_routes;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div>
      <ToastContainer />
      <>
        {/* Main Wrapper */}
        <div className="main-wrapper authendication-pages">
          {/* Page Content */}
          <div className="content">
            <div className="container wrapper no-padding">
              <div className="row no-margin vph-100">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
                  <div className="banner-bg register">
                    <div className="row no-margin h-100">
                      <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                        <div className="h-100 d-flex justify-content-center align-items-center">
                          <div className="text-bg register text-center">
                            <button
                              type="button"
                              className="btn btn-limegreen text-capitalize"
                            >
                              <i className="fa-solid fa-thumbs-up me-3" />
                              register Now
                            </button>
                            <p>
                              Register now for our innovative sports software
                              solutions, designed to tackle challenges in
                              everyday sports activities and events.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          <ul
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active d-flex align-items-center"
                                id="user-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#user"
                                type="button"
                                role="tab"
                                aria-controls="user"
                                aria-selected="true"
                              >
                                <span className="d-flex justify-content-center align-items-center" />
                                I am a User
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link d-flex align-items-center"
                                id="coach-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#coach"
                                type="button"
                                role="tab"
                                aria-controls="coach"
                                aria-selected="false"
                              >
                                <span className="d-flex justify-content-center align-items-center" />
                                I am a Owner
                              </button>
                            </li>
                          </ul>
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
      </>
    </div>
  );
};

export default Signin;
