import React from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

type Inputs = {
  userLocation: string;
};

const HomePage = () => {
  const routes = all_routes;

  return (
    <>
      <section className="hero-section">
        <div className="banner-cock-one">
          <ImageWithBasePath
            src="assets/img/icons/banner-cock1.svg"
            alt="Banner"
          />
        </div>
        <div className="banner-shapes">
          <div className="banner-dot-one">
            <span />
          </div>
          <div className="banner-cock-two">
            <ImageWithBasePath
              src="assets/img/icons/banner-cock2.svg"
              alt="Banner"
            />
            <span />
          </div>
          <div className="banner-dot-two">
            <span />
          </div>
        </div>
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center w-100">
              <div className="col-lg-7 col-md-10 mx-auto">
                <div className="section-search aos" data-aos="fade-up">
                  <h4>World Class Badminton Coaching &amp; Premium Courts</h4>
                  <h1>
                    Choose Your <span>Coaches</span> and Start Your Training
                  </h1>
                  <p className="sub-info">
                    Unleash Your Athletic Potential with Expert Coaching,
                    State-of-the-Art Facilities, and Personalized Training
                    Programs.
                  </p>
                  <div className="w-full my-4">
                    <Link to={routes.ListingList} className="btn btn-secondary">
                      Book A Court
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="banner-imgs text-center aos" data-aos="fade-up">
                  <ImageWithBasePath
                    className="img-fluid"
                    src="assets/img/bg/banner-right.png"
                    alt="Banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
