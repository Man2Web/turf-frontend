import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import AOS from "aos";
import "aos/dist/aos.css";
import Select from "react-select";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../../router/all_routes";
import { citiesList } from "../../utils/data-list/citiesList";
import { useAppContext } from "../../context/app-context";

const HomePage = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [citiesData, setCitiesData] = useState<string[]>([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const images = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const options = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const { userLocation, setUserLocation } = useAppContext();

  const fetchCourts = (location: string) => {
    setUserLocation(location);
    navigate(routes.ListingList);
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    const fetchData = async () => {
      const data = await citiesList();
      setCitiesData(data);
    };
    fetchData();
  }, []);

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
                  <div className="search-box">
                    <form className="container gap-2">
                      {/* <div className="search-input line"></div> */}
                      <div className="col-8">
                        <div className="form-group mb-0">
                          <Dropdown
                            value={userLocation}
                            onChange={(e) => setUserLocation(e.value)}
                            options={citiesData}
                            optionLabel="name"
                            placeholder="Choose Location"
                            className="select custom-select-list w-100 text-capitalize"
                          />
                        </div>
                      </div>
                      <Link
                        to={routes.ListingList}
                        className="btn btn-primary col-4 d-flex gap-2 justify-content-center  align-items-center"
                      >
                        <span className="search-text">Search Courts</span>
                        <i className="feather-search" />
                      </Link>
                    </form>
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
      <section className="section work-section">
        <div className="work-cock-img">
          <ImageWithBasePath src="assets/img/icons/work-cock.svg" alt="Icon" />
        </div>
        <div className="work-img">
          <div className="work-img-right">
            <ImageWithBasePath src="assets/img/bg/work-bg.png" alt="Icon" />
          </div>
        </div>
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              How It <span>Works</span>
            </h2>
            <p className="sub-title">
              Simplifying the booking process for coaches, venues, and athletes.
            </p>
          </div>
          <div className="row justify-content-center ">
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="work-grid w-100 aos" data-aos="fade-up">
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/work-icon1.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h5>
                    <Link to={"routes.register"}>Join Us</Link>
                  </h5>
                  <p>
                    Quick and Easy Registration: Get started on our software
                    platform with a simple account creation process.
                  </p>
                  <Link className="btn" to={"routes.register"}>
                    Register Now <i className="feather-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="work-grid w-100 aos" data-aos="fade-up">
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/work-icon2.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h5>
                    <Link to={"routes.coachesList"}>Select Coaches/Venues</Link>
                  </h5>
                  <p>
                    Book Badminton coaches and venues for expert guidance and
                    premium facilities.
                  </p>
                  <Link className="btn" to={"routes.coachesList"}>
                    Go To Coaches <i className="feather-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div className="work-grid w-100 aos" data-aos="fade-up">
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/work-icon3.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h5>
                    <Link to={"routes.coachDetails"}>Booking Process</Link>
                  </h5>
                  <p>
                    Easily book, pay, and enjoy a seamless experience on our
                    user-friendly platform.
                  </p>
                  <Link className="btn" to={"routes.coachDetails"}>
                    Book Now <i className="feather-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Deals */}
      <section className="section featured-venues">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              Featured <span>Venues</span>
            </h2>
            <p className="sub-title">
              Advanced sports venues offer the latest facilities, dynamic and
              unique environments for enhanced badminton performance.
            </p>
          </div>
          <div className="row">
            <div className="featured-slider-group ">
              <div className="owl-carousel featured-venues-slider owl-theme">
                <Slider {...settings}>
                  {/* Featured Item */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-01.jpg"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Featured</span>
                          <h5 className="tag tag-primary">
                            $450<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.2</span>
                            <span>300 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>
                            Sarah Sports Academy
                          </Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Elevate your athletic journey at Sarah Sports
                            Academy, where excellence meets opportunity.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Port Alsworth, AK
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity :{" "}
                                <span className="primary-text">
                                  15 May 2023
                                </span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link
                              className="navigation"
                              to={"routes.coachDetail"}
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-01.jpg"
                                alt="Venue"
                              />
                              Mart Sublin
                            </Link>
                          </div>
                          <Link
                            to={"routes.venueDetails"}
                            className="user-book-now"
                          >
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-02.jpg"
                            className="img-fluid"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Top Rated</span>
                          <h5 className="tag tag-primary">
                            $200<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">5.0</span>
                            <span>150 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>
                            Badminton Academy
                          </Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Unleash your badminton potential at our premier
                            Badminton Academy, where champions are made.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Sacramento, CA
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity :{" "}
                                <span className="primary-text">
                                  15 May 2023
                                </span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link
                              className="navigation"
                              to={"routes.coachDetail"}
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-02.jpg"
                                alt="Venue"
                              />
                              Rebecca
                            </Link>
                          </div>
                          <Link
                            to={"routes.venueDetails"}
                            className="user-book-now"
                          >
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-03.jpg"
                            className="img-fluid"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <h5 className="tag tag-primary">
                            $350<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.7</span>
                            <span>120 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>
                            Manchester Academy
                          </Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Unleash your badminton potential at our premier
                            Badminton Academy, where champions are made.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Guysville, OH
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity :{" "}
                                <span className="primary-text">
                                  16 May 2023
                                </span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link
                              className="navigation"
                              to={"routes.coachDetail"}
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-03.jpg"
                                alt="Venue"
                              />
                              Andrew
                            </Link>
                          </div>
                          <Link
                            to={"routes.venueDetails"}
                            className="user-book-now"
                          >
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-02.jpg"
                            className="img-fluid"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Featured</span>
                          <h5 className="tag tag-primary">
                            $450<span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content">
                        <div className="list-reviews">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.5</span>
                            <span>300 Reviews</span>
                          </div>
                          <Link to="#" className="fav-icon">
                            <i className="feather-heart" />
                          </Link>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>
                            ABC Sports Academy
                          </Link>
                        </h3>
                        <div className="listing-details-group">
                          <p>
                            Unleash your badminton potential at our premier ABC
                            Sports Academy, where champions are made.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Little Rock, AR
                              </span>
                            </li>
                            <li>
                              <span>
                                <i className="feather-calendar" />
                                Next Availablity :{" "}
                                <span className="primary-text">
                                  17 May 2023
                                </span>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="listing-button">
                          <div className="listing-venue-owner">
                            <Link
                              className="navigation"
                              to={"routes.coachDetail"}
                            >
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-04.jpg"
                                alt="Venue"
                              />
                              Mart Sublin
                            </Link>
                          </div>
                          <Link
                            to={"routes.venueDetails"}
                            className="user-book-now"
                          >
                            <span>
                              <i className="feather-calendar me-2" />
                            </span>
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                </Slider>
              </div>
            </div>
          </div>
          {/* View More */}
          <div className="view-all text-center aos" data-aos="fade-up">
            <Link
              to={"routes.listingGrid"}
              className="btn btn-secondary d-inline-flex align-items-center"
            >
              View All Featured
              <span className="lh-1">
                <i className="feather-arrow-right-circle ms-2" />
              </span>
            </Link>
          </div>
          {/* View More */}
        </div>
      </section>
      {/* /Rental Deals */}

      {/* Services */}
      <section className="section service-section">
        <div className="work-cock-img">
          <ImageWithBasePath
            src="assets/img/icons/work-cock.svg"
            alt="Service"
          />
        </div>
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              Explore Our <span>Services</span>
            </h2>
            <p className="sub-title">
              Fostering excellence and empowering sports growth through tailored
              services for athletes, coaches, and enthusiasts.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="service-grid w-100 aos" data-aos="fade-up">
                <div className="service-img">
                  <Link to={"routes.serviceDetail"}>
                    <ImageWithBasePath
                      src="assets/img/services/service-01.jpg"
                      className="img-fluid"
                      alt="Service"
                    />
                  </Link>
                </div>
                <div className="service-content">
                  <h4>
                    <Link to={"routes.serviceDetail"}>Court Rent</Link>
                  </h4>
                  <Link to={"routes.serviceDetail"}>Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="service-grid w-100 aos" data-aos="fade-up">
                <div className="service-img">
                  <Link to={"routes.serviceDetail"}>
                    <ImageWithBasePath
                      src="assets/img/services/service-02.jpg"
                      className="img-fluid"
                      alt="Service"
                    />
                  </Link>
                </div>
                <div className="service-content">
                  <h4>
                    <Link to={"routes.serviceDetail"}>Group Lesson</Link>
                  </h4>
                  <Link to={"routes.serviceDetail"}>Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="service-grid w-100 aos" data-aos="fade-up">
                <div className="service-img">
                  <Link to={"routes.serviceDetail"}>
                    <ImageWithBasePath
                      src="assets/img/services/service-03.jpg"
                      className="img-fluid"
                      alt="Service"
                    />
                  </Link>
                </div>
                <div className="service-content">
                  <h4>
                    <Link to={"routes.serviceDetail"}>Training Program</Link>
                  </h4>
                  <Link to={"routes.serviceDetail"}>Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="service-grid w-100 aos" data-aos="fade-up">
                <div className="service-img">
                  <Link to={"routes.serviceDetail"}>
                    <ImageWithBasePath
                      src="assets/img/services/service-04.jpg"
                      className="img-fluid"
                      alt="Service"
                    />
                  </Link>
                </div>
                <div className="service-content">
                  <h4>
                    <Link to={"routes.serviceDetail"}>Private Lessons</Link>
                  </h4>
                  <Link to={"routes.serviceDetail"}>Learn More</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="view-all text-center aos" data-aos="fade-up">
            <Link
              to={"routes.services"}
              className="btn btn-secondary d-inline-flex align-items-center"
            >
              View All Services{" "}
              <span className="lh-1">
                <i className="feather-arrow-right-circle ms-2" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* /Services */}

      {/* Convenient */}
      <section className="section convenient-section">
        <div className="cock-img">
          <div className="cock-img-one">
            <ImageWithBasePath src="assets/img/icons/cock-01.svg" alt="Icon" />
          </div>
          <div className="cock-img-two">
            <ImageWithBasePath src="assets/img/icons/cock-02.svg" alt="Icon" />
          </div>
          <div className="cock-circle">
            <ImageWithBasePath src="assets/img/bg/cock-shape.png" alt="Icon" />
          </div>
        </div>
        <div className="container">
          <div className="convenient-content aos" data-aos="fade-up">
            <h2>Convenient &amp; Flexible Scheduling</h2>
            <p>
              Find and book coaches conveniently with our online system that
              matches your schedule and location.
            </p>
          </div>
          <div className="convenient-btns aos" data-aos="fade-up">
            <Link
              to={"routes.coachDetails"}
              className="btn btn-primary d-inline-flex align-items-center"
            >
              Book a Training{" "}
              <span className="lh-1">
                <i className="feather-arrow-right-circle ms-2" />
              </span>
            </Link>
            <Link
              to={"routes.pricing"}
              className="btn btn-secondary d-inline-flex align-items-center"
            >
              View Pricing Plan{" "}
              <span className="lh-1">
                <i className="feather-arrow-right-circle ms-2" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* /Convenient */}

      {/* Featured Coaches */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              Featured <span>Coaches</span>
            </h2>
            <p className="sub-title">
              Uplift your badminton game with our featured coaches, personalized
              instruction, and expertise to achieve your goals.
            </p>
          </div>
          <div className="row">
            <div className="featured-slider-group aos" data-aos="fade-up">
              <div className="owl-carousel featured-coache-slider owl-theme">
                <Slider {...options}>
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.coachDetail"}>
                          <ImageWithBasePath
                            src="assets/img/profiles/user-01.jpg"
                            alt="User"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Rookie</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                        <div className="hour-list">
                          <h5 className="tag tag-primary">
                            From $250 <span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content list-coche-content">
                        <span>4 Lessons</span>
                        <h3>
                          <Link to={"routes.coachDetail"}>Kevin Anderson</Link>
                        </h3>
                        <Link to={"routes.coachDetails"}>
                          <i className="feather-arrow-right" />
                        </Link>
                        <Link to={"routes.coachDetails"} className="icon-hover">
                          <i className="feather-calendar" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.coachDetail"}>
                          <ImageWithBasePath
                            src="assets/img/profiles/user-02.jpg"
                            alt="User"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Intermediate</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                        <div className="hour-list">
                          <h5 className="tag tag-primary">
                            From $150 <span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content list-coche-content">
                        <span>3 Lessons</span>
                        <h3>
                          <Link to={"routes.coachDetail"}>
                            Harry Richardson
                          </Link>
                        </h3>
                        <Link to={"routes.coachDetails"}>
                          <i className="feather-arrow-right" />
                        </Link>
                        <Link to={"routes.coachDetails"} className="icon-hover">
                          <i className="feather-calendar" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.coachDetail"}>
                          <ImageWithBasePath
                            src="assets/img/profiles/user-03.jpg"
                            alt="User"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Professional</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                        <div className="hour-list">
                          <h5 className="tag tag-primary">
                            From $350 <span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content list-coche-content">
                        <span>2 Lessons</span>
                        <h3>
                          <Link to={"routes.coachDetail"}>Evon Raddick</Link>
                        </h3>
                        <Link to={"routes.coachDetails"}>
                          <i className="feather-arrow-right" />
                        </Link>
                        <Link to={"routes.coachDetails"} className="icon-hover">
                          <i className="feather-calendar" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.coachDetail"}>
                          <ImageWithBasePath
                            src="assets/img/profiles/user-04.jpg"
                            alt="User"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Rookie</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                        <div className="hour-list">
                          <h5 className="tag tag-primary">
                            From $250 <span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content list-coche-content">
                        <span>4 Lessons</span>
                        <h3>
                          <Link to={"routes.coachDetail"}>
                            Angela Roudrigez
                          </Link>
                        </h3>
                        <Link to={"routes.coachDetails"}>
                          <i className="feather-arrow-right" />
                        </Link>
                        <Link to={"routes.coachDetails"} className="icon-hover">
                          <i className="feather-calendar" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                  {/* Featured Item */}
                  <div className="featured-venues-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.coachDetail"}>
                          <ImageWithBasePath
                            src="assets/img/profiles/user-02.jpg"
                            alt="User"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <span className="tag tag-blue">Intermediate</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                        <div className="hour-list">
                          <h5 className="tag tag-primary">
                            From $150 <span>/hr</span>
                          </h5>
                        </div>
                      </div>
                      <div className="listing-content list-coche-content">
                        <span>4 Lessons</span>
                        <h3>
                          <Link to={"routes.coachDetail"}>
                            Harry Richardson
                          </Link>
                        </h3>
                        <Link to={"routes.coachDetails"}>
                          <i className="feather-arrow-right" />
                        </Link>
                        <Link to={"routes.coachDetails"} className="icon-hover">
                          <i className="feather-calendar" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Featured Item */}
                </Slider>
              </div>
            </div>
          </div>
          <div className="view-all text-center aos" data-aos="fade-up">
            <Link
              to={"routes.coachesList"}
              className="btn btn-secondary d-inline-flex align-items-center"
            >
              View All Coaches{" "}
              <span className="lh-1">
                <i className="feather-arrow-right-circle ms-2" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* /Featured Coaches */}

      {/* Journey */}
      <section className="section journey-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center">
              <div className="start-your-journey aos" data-aos="fade-up">
                <h2>
                  Start Your Journey With{" "}
                  <span className="active-sport">Dreamsports</span> Badminton
                  Today.
                </h2>
                <p>
                  At DreamSports Badminton, we prioritize your satisfaction and
                  value your feedback as we continuously improve and evolve our
                  learning experiences.
                </p>
                <p>
                  Our instructors utilize modern methods for effective badminton
                  lessons, offering introductory sessions for beginners and
                  personalized development plans to foster individual growth.
                </p>
                <span className="stay-approach">
                  Stay Ahead With Our Innovative Approach:
                </span>
                <div className="journey-list">
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Skilled Professionals
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Modern Techniques
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Intro Lesson
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Personal Development
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Advanced Equipment
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Interactive Classes For Easy Learning.
                    </li>
                  </ul>
                </div>
                <div className="convenient-btns">
                  <Link
                    to={"routes.register"}
                    className="btn btn-primary d-inline-flex align-items-center"
                  >
                    <span>
                      <i className="feather-user-plus me-2" />
                    </span>
                    Join With Us
                  </Link>
                  <Link
                    to={"routes.aboutUs"}
                    className="btn btn-secondary d-inline-flex align-items-center"
                  >
                    <span>
                      <i className="feather-align-justify me-2" />
                    </span>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="journey-img aos" data-aos="fade-up">
                <ImageWithBasePath
                  src="assets/img/journey-01.png"
                  className="img-fluid"
                  alt="User"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Journey */}

      {/* Group Coaching */}
      <section className="section group-coaching">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              Our <span>Features</span>
            </h2>
            <p className="sub-title">
              Discover your potential with our comprehensive training, expert
              trainers, and advanced facilities. Join us to improve your
              athletic career.
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex">
              <div
                className="work-grid coaching-grid w-100 aos"
                data-aos="fade-up"
              >
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/coache-icon-01.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h3>Group Coaching</h3>
                  <p>
                    Accelerate your skills with tailored group coaching sessions
                    for badminton players game.
                  </p>
                  <Link to="#">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div
                className="work-grid coaching-grid w-100 aos"
                data-aos="fade-up"
              >
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/coache-icon-02.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h3>Private Coaching</h3>
                  <p>
                    Find private badminton coaches and academies for a
                    personalized approach to skill enhancement.
                  </p>
                  <Link to="#">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div
                className="work-grid coaching-grid w-100 aos"
                data-aos="fade-up"
              >
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/coache-icon-03.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h3>Equipment Store</h3>
                  <p>
                    Your one-stop shop for high-quality badminton equipment,
                    enhancing your on-court performance.
                  </p>
                  <Link to="#">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div
                className="work-grid coaching-grid w-100 aos"
                data-aos="fade-up"
              >
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/coache-icon-04.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h3>Innovative Lessons</h3>
                  <p>
                    Enhance your badminton skills with innovative lessons,
                    combining modern techniques and training methods
                  </p>
                  <Link to="#">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div
                className="work-grid coaching-grid w-100 aos"
                data-aos="fade-up"
              >
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/coache-icon-05.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h3>Badminton Community</h3>
                  <p>
                    Upraise your game with engaging lessons and a supportive
                    community. Join us now and take your skills to new heights.
                  </p>
                  <Link to="#">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex">
              <div
                className="work-grid coaching-grid w-100 aos"
                data-aos="fade-up"
              >
                <div className="work-icon">
                  <div className="work-icon-inner">
                    <ImageWithBasePath
                      src="assets/img/icons/coache-icon-06.svg"
                      alt="Icon"
                    />
                  </div>
                </div>
                <div className="work-content">
                  <h3>Court Rental</h3>
                  <p>
                    Enjoy uninterrupted badminton sessions at DreamSports with
                    our premium court rental services.
                  </p>
                  <Link to="#">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Group Coaching */}

      {/* Earn Money */}
      <section className="section earn-money">
        <div className="cock-img cock-position">
          <div className="cock-img-one ">
            <ImageWithBasePath src="assets/img/icons/cock-01.svg" alt="Icon" />
          </div>
          <div className="cock-img-two">
            <ImageWithBasePath src="assets/img/icons/cock-02.svg" alt="Icon" />
          </div>
          <div className="cock-circle">
            <ImageWithBasePath src="assets/img/bg/cock-shape.png" alt="Icon" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="private-venue aos" data-aos="fade-up">
                <div className="convenient-btns become-owner " role="tablist">
                  <Link
                    to="#"
                    className="btn btn-secondary become-venue d-inline-flex align-items-center nav-link active"
                    id="nav-Recent-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-Recent"
                    role="tab"
                    aria-controls="nav-Recent"
                    aria-selected="true"
                  >
                    Become A Venue Member
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-primary become-coche d-inline-flex align-items-center nav-link"
                    id="nav-RecentCoaching-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-RecentCoaching"
                    role="tab"
                    aria-controls="nav-RecentCoaching"
                    aria-selected="false"
                  >
                    Become A Coach
                  </Link>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="nav-Recent"
                    role="tabpanel"
                    aria-labelledby="nav-Recent-tab"
                    tabIndex={0}
                  >
                    <h2>
                      Earn Money Renting Out Your Private Coaches On Dreamsports
                    </h2>
                    <p>
                      Join our network of private facility owners, offering
                      rentals to local players, coaches, and teams.
                    </p>
                    <div className="earn-list">
                      <ul>
                        <li>
                          <i className="fa-solid fa-circle-check " />
                          $1,000,000 liability insurance{" "}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check " />
                          Build of Trust
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check " />
                          Protected Environment for Your Activities{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="convenient-btns">
                      <Link
                        to={"routes.register"}
                        className="btn btn-secondary d-inline-flex align-items-center"
                      >
                        <span className="lh-1">
                          <i className="feather-user-plus me-2" />
                        </span>
                        Join With Us
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show "
                    id="nav-RecentCoaching"
                    role="tabpanel"
                    aria-labelledby="nav-Recent-tab"
                    tabIndex={0}
                  >
                    <h2>
                      Earn Money Renting Out Your Private Coaches On Dreamsports
                    </h2>
                    <p>
                      Join our network of private facility owners, offering
                      rentals to local players, coaches, and teams.
                    </p>
                    <div className="earn-list">
                      <ul>
                        <li>
                          <i className="fa-solid fa-circle-check " />
                          $1,000,000 liability insurance{" "}
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check " />
                          Build of Trust
                        </li>
                        <li>
                          <i className="fa-solid fa-circle-check " />
                          Protected Environment for Your Activities{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="convenient-btns">
                      <Link
                        to={"routes.register"}
                        className="btn btn-secondary d-inline-flex align-items-center"
                      >
                        <span className="lh-1">
                          <i className="feather-user-plus me-2" />
                        </span>
                        Join With Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Earn Money */}

      {/* Courts Near */}
      <section className="section court-near">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              Find Courts <span>Near You</span>
            </h2>
            <p className="sub-title">
              Discover nearby badminton courts for convenient and accessible
              gameplay.
            </p>
          </div>
          <div className="row">
            <div className="featured-slider-group aos" data-aos="fade-up">
              <div className="owl-carousel featured-venues-slider owl-theme">
                <Slider {...options}>
                  {/* Courts Item */}
                  <div className="featured-venues-item court-near-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-04.jpg"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content ">
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>
                            Smart Shuttlers
                          </Link>
                        </h3>
                        <div className="listing-details-group">
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />1 Crowthorne
                                Road, 4th Street, NY
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="list-reviews near-review">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.2</span>
                            <span>300 Reviews</span>
                          </div>
                          <span className="mile-away">
                            <i className="feather-zap" />
                            2.1 Miles Away
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Courts Item */}
                  {/* Courts Item */}
                  <div className="featured-venues-item court-near-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-05.jpg"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content ">
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>
                            Parlers Badminton
                          </Link>
                        </h3>
                        <div className="listing-details-group">
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Hope Street, Battersea, SW11 2DA
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="list-reviews near-review">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.2</span>
                            <span>200 Reviews</span>
                          </div>
                          <span className="mile-away">
                            <i className="feather-zap" />
                            9.3 Miles Away
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Courts Item */}
                  {/* Courts Item */}
                  <div className="featured-venues-item court-near-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-06.jpg"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content ">
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>6 Feathers</Link>
                        </h3>
                        <div className="listing-details-group">
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />
                                Lonsdale Road, Barnes, SW13 9QL
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="list-reviews near-review">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.2</span>
                            <span>400 Reviews</span>
                          </div>
                          <span className="mile-away">
                            <i className="feather-zap" />
                            10.8 Miles Away
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Courts Item */}
                  {/* Courts Item */}
                  <div className="featured-venues-item court-near-item">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.venueDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-05.jpg"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues">
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content ">
                        <h3 className="listing-title">
                          <Link to={"routes.venueDetails"}>
                            Parlers Badminton
                          </Link>
                        </h3>
                        <div className="listing-details-group">
                          <ul>
                            <li>
                              <span>
                                <i className="feather-map-pin" />1 Crowthorne
                                Road, 4th Street, NY
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="list-reviews near-review">
                          <div className="d-flex align-items-center">
                            <span className="rating-bg">4.2</span>
                            <span>300 Reviews</span>
                          </div>
                          <span className="mile-away">
                            <i className="feather-zap" />
                            8.1 Miles Away
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Courts Item */}
                </Slider>
              </div>
            </div>
          </div>
          {/* View More */}
          <div className="view-all text-center aos" data-aos="fade-up">
            <Link
              to={"routes.listingGrid"}
              className="btn btn-secondary d-inline-flex align-items-center"
            >
              View All Services{" "}
              <span className="lh-1">
                <i className="feather-arrow-right-circle ms-2" />
              </span>
            </Link>
          </div>
          {/* View More */}
        </div>
      </section>
      {/* /Courts Near */}

      {/* Testimonials */}
      <section className="section our-testimonials">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              Our <span>Testimonials</span>
            </h2>
            <p className="sub-title">
              Glowing testimonials from passionate badminton enthusiasts
              worldwide, showcasing our exceptional services.
            </p>
          </div>
          <div className="row">
            <div className="featured-slider-group aos" data-aos="fade-up">
              <div className="owl-carousel testimonial-slide featured-venues-slider owl-theme">
                <Slider {...settings}>
                  {/* Testimonials Item */}
                  <div className="testimonial-group">
                    <div className="testimonial-review">
                      <div className="rating-point">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <span> 5.0</span>
                      </div>
                      <h5>Personalized Attention</h5>
                      <p>
                        DreamSports&apos; coaching services enhanced my
                        badminton skills. Personalized attention from
                        knowledgeable coaches propelled my game to new heights.
                      </p>
                    </div>
                    <div className="listing-venue-owner">
                      <Link className="navigation" to={""}>
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-01.jpg"
                          alt="User"
                        />
                      </Link>
                      <div className="testimonial-content">
                        <h5>
                          <Link to="#">Ariyan Rusov</Link>
                        </h5>
                        <Link to="#" className="btn btn-primary ">
                          Badminton
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Testimonials Item */}
                  {/* Testimonials Item */}
                  <div className="testimonial-group">
                    <div className="testimonial-review">
                      <div className="rating-point">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <span> 5.0</span>
                      </div>
                      <h5>Quality Matters !</h5>
                      <p>
                        DreamSports&apos; advanced badminton equipment has
                        greatly improved my performance on the court. Their
                        quality range of rackets and shoes made a significant
                        impact.
                      </p>
                    </div>
                    <div className="listing-venue-owner">
                      <Link className="navigation" to="">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-04.jpg"
                          alt="User"
                        />
                      </Link>
                      <div className="testimonial-content">
                        <h5>
                          <Link to="#">Darren Valdez</Link>
                        </h5>
                        <Link to="#" className="btn btn-primary ">
                          Badminton
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Testimonials Item */}
                  {/* Testimonials Item */}
                  <div className="testimonial-group">
                    <div className="testimonial-review">
                      <div className="rating-point">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <span> 5.0</span>
                      </div>
                      <h5>Excellent Professionalism !</h5>
                      <p>
                        DreamSports&apos; unmatched professionalism and service
                        excellence left a positive experience. Highly
                        recommended for court rentals and equipment purchases.
                      </p>
                    </div>
                    <div className="listing-venue-owner">
                      <Link className="navigation" to="">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-03.jpg"
                          alt="User"
                        />
                      </Link>
                      <div className="testimonial-content">
                        <h5>
                          <Link to="#">Elinor Dunn</Link>
                        </h5>
                        <Link to="#" className="btn btn-primary ">
                          Badminton
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Testimonials Item */}
                  {/* Testimonials Item */}
                  <div className="testimonial-group">
                    <div className="testimonial-review">
                      <div className="rating-point">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <span> 5.0</span>
                      </div>
                      <h5>Quality Matters !</h5>
                      <p>
                        DreamSports&apos; advanced badminton equipment has
                        greatly improved my performance on the court. Their
                        quality range of rackets and shoes made a significant
                        impact.
                      </p>
                    </div>
                    <div className="listing-venue-owner">
                      <Link className="navigation" to="">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-04.jpg"
                          alt="User"
                        />
                      </Link>
                      <div className="testimonial-content">
                        <h5>
                          <Link to="#">Darren Valdez</Link>
                        </h5>
                        <Link to="#" className="btn btn-primary ">
                          Badminton
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* /Testimonials Item */}
                </Slider>
              </div>
            </div>
            {/* Testimonials Slide */}
            <div className="brand-slider-group aos" data-aos="fade-up">
              <div className="owl-carousel testimonial-brand-slider owl-theme">
                <Slider {...images}>
                  <div className="brand-logos">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-01.svg"
                      alt="Brand"
                    />
                  </div>
                  <div className="brand-logos">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-04.svg"
                      alt="Brand"
                    />
                  </div>
                  <div className="brand-logos">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-03.svg"
                      alt="Brand"
                    />
                  </div>
                  <div className="brand-logos">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-04.svg"
                      alt="Brand"
                    />
                  </div>
                  <div className="brand-logos">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-05.svg"
                      alt="Brand"
                    />
                  </div>
                  <div className="brand-logos">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-03.svg"
                      alt="Brand"
                    />
                  </div>
                  <div className="brand-logos">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-04.svg"
                      alt="Brand"
                    />
                  </div>
                </Slider>
              </div>
            </div>
            {/* /Testimonials Slide */}
          </div>
        </div>
      </section>
      {/* /Testimonials */}

      {/* Featured Plans */}
      <section className="section featured-plan">
        <div className="work-img ">
          <div className="work-img-right">
            <ImageWithBasePath src="assets/img/bg/work-bg.png" alt="Icon" />
          </div>
        </div>
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              We Have Excellent <span>Plans For You</span>
            </h2>
            <p className="sub-title">
              Choose monthly or yearly plans for uninterrupted access to our
              premium badminton facilities. Join us and experience convenient
              excellence.
            </p>
          </div>
          <div className="interset-btn aos" data-aos="fade-up">
            <div className="status-toggle d-inline-flex align-items-center">
              Monthly
              <input type="checkbox" id="status_1" className="check" />
              <label htmlFor="status_1" className="checktoggle">
                checkbox
              </label>
              Yearly
            </div>
          </div>
          <div className="price-wrap aos" data-aos="fade-up">
            <div className="row justify-content-center">
              <div className="col-lg-4 d-flex col-md-6">
                {/* Price Card */}
                <div className="price-card flex-fill ">
                  <div className="price-head">
                    <ImageWithBasePath
                      src="assets/img/icons/price-01.svg"
                      alt="Price"
                    />
                    <h3>Professoinal</h3>
                  </div>
                  <div className="price-body">
                    <div className="per-month">
                      <h2>
                        <sup>$</sup>
                        <span>60.00</span>
                      </h2>
                      <span>Per Month</span>
                    </div>
                    <div className="features-price-list">
                      <h5>Features</h5>
                      <p>Everything in our free Upto 10 users. </p>
                      <ul>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Included : Quality Checked By Envato
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Included : Future Updates
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Technical Support
                        </li>
                        <li className="inactive">
                          <i className="feather-x-circle" />
                          Add Listing{" "}
                        </li>
                        <li className="inactive">
                          <i className="feather-x-circle" />
                          Approval of Listing
                        </li>
                      </ul>
                    </div>
                    <div className="price-choose">
                      <Link to="#" className="btn viewdetails-btn">
                        Choose Plan
                      </Link>
                    </div>
                    <div className="price-footer">
                      <p>
                        Use, by you or one client, in a single end product which
                        end users. charged for. The total price includes the
                        item price and a buyer fee.
                      </p>
                    </div>
                  </div>
                </div>
                {/* /Price Card */}
              </div>
              <div className="col-lg-4 d-flex col-md-6">
                {/* Price Card */}
                <div className="price-card flex-fill">
                  <div className="price-head expert-price">
                    <ImageWithBasePath
                      src="assets/img/icons/price-02.svg"
                      alt="Price"
                    />
                    <h3>Expert</h3>
                    <span>Recommended</span>
                  </div>
                  <div className="price-body">
                    <div className="per-month">
                      <h2>
                        <sup>$</sup>
                        <span>60.00</span>
                      </h2>
                      <span>Per Month</span>
                    </div>
                    <div className="features-price-list">
                      <h5>Features</h5>
                      <p>Everything in our free Upto 10 users. </p>
                      <ul>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Included : Quality Checked By Envato
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Included : Future Updates
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />6 Months
                          Technical Support
                        </li>
                        <li className="inactive">
                          <i className="feather-x-circle" />
                          Add Listing{" "}
                        </li>
                        <li className="inactive">
                          <i className="feather-x-circle" />
                          Approval of Listing
                        </li>
                      </ul>
                    </div>
                    <div className="price-choose active-price">
                      <Link to="#" className="btn viewdetails-btn">
                        Choose Plan
                      </Link>
                    </div>
                    <div className="price-footer">
                      <p>
                        Use, by you or one client, in a single end product which
                        end users. charged for. The total price includes the
                        item price and a buyer fee.
                      </p>
                    </div>
                  </div>
                </div>
                {/* /Price Card */}
              </div>
              <div className="col-lg-4 d-flex col-md-6">
                {/* Price Card */}
                <div className="price-card flex-fill">
                  <div className="price-head">
                    <ImageWithBasePath
                      src="assets/img/icons/price-03.svg"
                      alt="Price"
                    />
                    <h3>Enterprise</h3>
                  </div>
                  <div className="price-body">
                    <div className="per-month">
                      <h2>
                        <sup>$</sup>
                        <span>990.00</span>
                      </h2>
                      <span>Per Month</span>
                    </div>
                    <div className="features-price-list">
                      <h5>Features</h5>
                      <p>Everything in our free Upto 10 users. </p>
                      <ul>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Included : Quality Checked By Envato
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Included : Future Updates
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Technical Support
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Add Listing{" "}
                        </li>
                        <li className="active">
                          <i className="feather-check-circle" />
                          Approval of Listing
                        </li>
                      </ul>
                    </div>
                    <div className="price-choose">
                      <Link to="#" className="btn viewdetails-btn">
                        Choose Plan
                      </Link>
                    </div>
                    <div className="price-footer">
                      <p>
                        Use, by you or one client, in a single end product which
                        end users. charged for. The total price includes the
                        item price and a buyer fee.
                      </p>
                    </div>
                  </div>
                </div>
                {/* /Price Card */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Featured Plans */}
      {/* Latest News */}
      <section className="section featured-venues latest-news">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-up">
            <h2>
              The Latest <span>News</span>
            </h2>
            <p className="sub-title">
              Get the latest buzz from the badminton world- stay informed and
              inspired by the thrilling updates and remarkable achievements in
              the sport.
            </p>
          </div>
          <div className="row">
            <div className="featured-slider-group ">
              <div className="owl-carousel featured-venues-slider owl-theme">
                <Slider {...settings}>
                  {/* News */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.blogDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-07.jpg"
                            alt="User"
                          />
                        </Link>
                        <div className="fav-item-venues news-sports">
                          <span className="tag tag-blue">Badminton</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content news-content">
                        <div className="listing-venue-owner listing-dates">
                          <Link to="#" className="navigation">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-01.jpg"
                              alt="User"
                            />
                            Orlando Waters
                          </Link>
                          <span>
                            <i className="feather-calendar" />
                            15 May 2023
                          </span>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.blogDetails"}>
                            Badminton Gear Guide: Must-Have Equipment for Every
                            Player
                          </Link>
                        </h3>
                        <div className="listing-button read-new">
                          <ul className="nav">
                            <li>
                              <Link to="#">
                                <i className="feather-heart" />
                                45
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="feather-message-square" />
                                45
                              </Link>
                            </li>
                          </ul>
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/clock.svg"
                              alt="User"
                            />
                            10 Min To Read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /News */}
                  {/* News */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.blogDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-08.jpg"
                            alt="User"
                          />
                        </Link>
                        <div className="fav-item-venues news-sports">
                          <span className="tag tag-blue">Sports Activites</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content news-content">
                        <div className="listing-venue-owner listing-dates">
                          <Link to="#" className="navigation">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-03.jpg"
                              alt="User"
                            />
                            Nichols
                          </Link>
                          <span>
                            <i className="feather-calendar" />
                            16 Jun 2023
                          </span>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.blogDetails"}>
                            Badminton Techniques: Mastering the Smash, Drop
                            Shot, and Clear{" "}
                          </Link>
                        </h3>
                        <div className="listing-button read-new">
                          <ul className="nav">
                            <li>
                              <Link to="#">
                                <i className="feather-heart" />
                                35
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="feather-message-square" />
                                35
                              </Link>
                            </li>
                          </ul>
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/clock.svg"
                              alt="Icon"
                            />
                            12 Min To Read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /News */}
                  {/* News */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.blogDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-09.jpg"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues news-sports">
                          <span className="tag tag-blue">Rules of Game</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content news-content">
                        <div className="listing-venue-owner listing-dates">
                          <Link to="#" className="navigation">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-06.jpg"
                              alt="User"
                            />
                            Joanna Le
                          </Link>
                          <span>
                            <i className="feather-calendar" />
                            11 May 2023
                          </span>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.blogDetails"}>
                            The Evolution of Badminton:From Backyard Fun to
                            Olympic Sport
                          </Link>
                        </h3>
                        <div className="listing-button read-new">
                          <ul className="nav">
                            <li>
                              <Link to="#">
                                <i className="feather-heart" />
                                25
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="feather-message-square" />
                                25
                              </Link>
                            </li>
                          </ul>
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/clock.svg"
                              alt="Clock"
                            />
                            14 Min To Read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /News */}
                  {/* News */}
                  <div className="featured-venues-item aos" data-aos="fade-up">
                    <div className="listing-item mb-0">
                      <div className="listing-img">
                        <Link to={"routes.blogDetails"}>
                          <ImageWithBasePath
                            src="assets/img/venues/venues-08.jpg"
                            alt="Venue"
                          />
                        </Link>
                        <div className="fav-item-venues news-sports">
                          <span className="tag tag-blue">Sports Activites</span>
                          <div className="list-reviews coche-star">
                            <Link to="#" className="fav-icon">
                              <i className="feather-heart" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="listing-content news-content">
                        <div className="listing-venue-owner listing-dates">
                          <Link to="#" className="navigation">
                            <ImageWithBasePath
                              src="assets/img/profiles/avatar-01.jpg"
                              alt="User"
                            />
                            Mart Sublin
                          </Link>
                          <span>
                            <i className="feather-calendar" />
                            12 May 2023
                          </span>
                        </div>
                        <h3 className="listing-title">
                          <Link to={"routes.blogDetails"}>
                            Sports Make Us A Lot Stronger And Healthier Than We
                            Think
                          </Link>
                        </h3>
                        <div className="listing-button read-new">
                          <ul className="nav">
                            <li>
                              <Link to="#">
                                <i className="feather-heart" />
                                35
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="feather-message-square" />
                                35
                              </Link>
                            </li>
                          </ul>
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/clock.svg"
                              alt="Clock"
                            />
                            12 Min To Read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /News */}
                </Slider>
              </div>
            </div>
          </div>
          {/* View More */}
          <div className="view-all text-center aos" data-aos="fade-up">
            <Link
              to={"routes.blogGrid"}
              className="btn btn-secondary d-inline-flex align-items-center"
            >
              View All News{" "}
              <span className="lh-1">
                <i className="feather-arrow-right-circle ms-2" />
              </span>
            </Link>
          </div>
          {/* View More */}
        </div>
      </section>
      {/* /Latest News */}
      {/* Newsletter */}
      <section className="section newsletter-sport">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="subscribe-style aos" data-aos="fade-up">
                <div className="banner-blk">
                  <ImageWithBasePath
                    src="assets/img/subscribe-bg.jpg"
                    className="img-fluid"
                    alt="Subscribe"
                  />
                </div>
                <div className="banner-info ">
                  <ImageWithBasePath
                    src="assets/img/icons/subscribe.svg"
                    className="img-fluid"
                    alt="Subscribe"
                  />
                  <h2>Subscribe to Newsletter</h2>
                  <p>Just for you, exciting badminton news updates.</p>
                  <div className="subscribe-blk bg-white">
                    <div className="input-group align-items-center">
                      <i className="feather-mail" />
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Address"
                        aria-label="email"
                      />
                      <div className="subscribe-btn-grp">
                        <input
                          type="submit"
                          className="btn btn-secondary"
                          defaultValue="Subscribe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Newsletter */}
    </>
  );
};

export default HomePage;
