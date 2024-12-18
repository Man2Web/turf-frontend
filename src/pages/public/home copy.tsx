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
import LocationDataModal from "../../components/common/modal/location-data-modal";

const HomePage = () => {
  const routes = all_routes;
  const [citiesData, setCitiesData] = useState<string[]>([]);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // screens smaller than 1024px
        settings: {
          slidesToShow: 2, // show 2 slides
          slidesToScroll: 1, // scroll 1 slide at a time
          infinite: true,
        },
      },
      {
        breakpoint: 768, // screens smaller than 768px
        settings: {
          slidesToShow: 1, // show 1 slide
          slidesToScroll: 1, // scroll 1 slide at a time
          infinite: true,
        },
      },
    ],
  };

  const images = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200, // screens smaller than 1200px
        settings: {
          slidesToShow: 4, // show 4 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // screens smaller than 1024px
        settings: {
          slidesToShow: 3, // show 3 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // screens smaller than 768px
        settings: {
          slidesToShow: 2, // show 2 slides
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // screens smaller than 480px
        settings: {
          slidesToShow: 1, // show 1 slide
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { userLocation, setUserLocation } = useAppContext();

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
      {!userLocation && <LocationDataModal />}
      {/* Main Home */}
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
                      <div className="col-12 col-md-8">
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
                        className="btn btn-primary col-12 col-md-4 d-flex gap-2 justify-content-center  align-items-center mt-2 mt-md-0"
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
      {/* Main Home */}

      {/* How it works */}
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
                    <Link to={routes.register}>Join Us</Link>
                  </h5>
                  <p>
                    Quick and Easy Registration: Get started on our software
                    platform with a simple account creation process.
                  </p>
                  <Link className="btn" to={routes.register}>
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
                    <Link to={routes.ListingList}>Booking Process</Link>
                  </h5>
                  <p>
                    Easily book, pay, and enjoy a seamless experience on our
                    user-friendly platform.
                  </p>
                  <Link className="btn" to={routes.ListingList}>
                    Book Now <i className="feather-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How it works */}

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
            <h2>Convenient &amp; Flexible Bookings</h2>
            <p>
              Find and book coaches conveniently with our online system that
              matches your schedule and location.
            </p>
          </div>
        </div>
      </section>
      {/* /Convenient */}

      {/* Journey */}
      <section className="section journey-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center">
              <div className="start-your-journey aos" data-aos="fade-up">
                <h2>
                  Start Your Journey With Us{" "}
                  <span className="active-sport">Today.</span>
                </h2>
                <p>
                  At Man2Web, we prioritize your experience and welcome your
                  feedback as we continuously enhance our platform to better
                  serve our sports community.
                </p>
                <p>
                  Whether you’re a beginner, a seasoned player, or simply
                  someone looking to stay active, our platform offers a simple
                  and efficient way to discover and book sports facilities that
                  match your needs.
                </p>
                <span className="stay-approach">
                  Discover the Benefits of Our Platform:
                </span>
                <div className="journey-list">
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Easy-to-Use Booking System
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Access to a Variety of Sports Facilities
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Transparent Pricing
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Personalized Booking History
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Reliable Customer Support
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Convenient for Individuals and Groups
                    </li>
                  </ul>
                </div>
                <div className="convenient-btns">
                  <Link
                    to={routes.register}
                    className="btn btn-primary d-inline-flex align-items-center"
                  >
                    <span>
                      <i className="feather-user-plus me-2" />
                    </span>
                    Join Us
                  </Link>
                  <Link
                    to={routes.aboutUs}
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
                  alt="User Journey"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Journey */}

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
                        Man2Web&apos; coaching services enhanced my badminton
                        skills. Personalized attention from knowledgeable
                        coaches propelled my game to new heights.
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
                        Man2Web&apos; advanced badminton equipment has greatly
                        improved my performance on the court. Their quality
                        range of rackets and shoes made a significant impact.
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
                        Man2Web&apos; unmatched professionalism and service
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
                        Man2Web&apos; advanced badminton equipment has greatly
                        improved my performance on the court. Their quality
                        range of rackets and shoes made a significant impact.
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
                  <div className="brand-logos ">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-01.svg"
                      alt="Brand"
                      className="mx-auto"
                    />
                  </div>
                  <div className="brand-logos ">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-04.svg"
                      alt="Brand"
                      className="mx-auto"
                    />
                  </div>
                  <div className="brand-logos ">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-03.svg"
                      alt="Brand"
                      className="mx-auto"
                    />
                  </div>
                  <div className="brand-logos ">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-04.svg"
                      alt="Brand"
                      className="mx-auto"
                    />
                  </div>
                  <div className="brand-logos ">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-05.svg"
                      alt="Brand"
                      className="mx-auto"
                    />
                  </div>
                  <div className="brand-logos ">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-03.svg"
                      alt="Brand"
                      className="mx-auto"
                    />
                  </div>
                  <div className="brand-logos ">
                    <ImageWithBasePath
                      src="assets/img/testimonial-icon-04.svg"
                      alt="Brand"
                      className="mx-auto"
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
