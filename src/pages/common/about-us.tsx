import React, { useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const AboutUs = () => {
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(4).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  const testimonialSlider = {
    dots: false,
    autoplay: false,
    slidesToShow: 3,
    margin: 20,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const testimonialBrandSlider = {
    dots: false,
    nav: false,
    autoplay: true,
    slidesToShow: 5,
    margin: 20,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      {/* Page Content */}
      <div className="content">
        {/* About Us Info */}
        <section className="aboutus-info">
          <div className="container">
            {/* Banners */}
            <div className="row d-flex align-items-center">
              <div className=" col-12 col-sm-3 col-md-3 col-lg-3">
                <div className="banner text-center">
                  <ImageWithBasePath
                    src="assets/img/aboutus/banner-01.jpg"
                    className="img-fluid corner-radius-10"
                    alt="Banner-01"
                  />
                </div>
              </div>
              <div className=" col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="banner text-center">
                  <ImageWithBasePath
                    src="assets/img/aboutus/banner-02.jpg"
                    className="img-fluid corner-radius-10"
                    alt="Banner-02"
                  />
                </div>
              </div>
              <div className=" col-12 col-sm-3 col-md-3 col-lg-3">
                <div className="banner text-center">
                  <ImageWithBasePath
                    src="assets/img/aboutus/banner-03.jpg"
                    className="img-fluid corner-radius-10"
                    alt="Banner-03"
                  />
                </div>
              </div>
            </div>
            {/* /Banners */}
            {/* Vision-Mission */}
            <div className="vision-mission">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                  <h2>Our Vision</h2>
                  <p>
                    We envision a vibrant sports community where technology
                    makes it easy for everyone to engage, connect, and enjoy a
                    variety of sports. Our platform seeks to inspire individuals
                    and teams to embrace active lifestyles and pursue their
                    passion for sports.
                  </p>
                  <p>
                    By streamlining the process of finding and booking sports
                    facilities, we empower players, facility managers, and
                    enthusiasts to focus on what they love most. Join us as we
                    build a community that thrives on the joy of sports and
                    promotes a healthy, active lifestyle!
                  </p>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                  <div className="mission-bg">
                    <h2>Our Mission</h2>
                    <p>
                      Our mission is to provide an accessible and seamless
                      platform for booking sports facilities, enabling users to
                      easily find, reserve, and enjoy courts across various
                      sports. We aim to foster a connected community of players
                      and facility managers, supporting the growth of sports
                      participation and making it simple for everyone to stay
                      active.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /Vision-Mission */}
          </div>
        </section>
        {/* Testimonials */}
        <section className="section our-testimonials">
          <div className="container">
            <div className="section-heading">
              <h2>
                Our <span>Testimonials</span>
              </h2>
              <p className="sub-title">
                Glowing testimonials from passionate badminton enthusiasts
                worldwide, showcasing our exceptional services.s
              </p>
            </div>
            <div className="row">
              <div className="featured-slider-group">
                <div className="testimonial-slide featured-venues-slider owl-theme">
                  <Slider {...testimonialSlider}>
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
                            className="img-fluid"
                            alt="User"
                          />
                        </Link>
                        <div className="testimonial-content">
                          <h5>Ariyan Rusov</h5>
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
                        <Link className="navigation" to={""}>
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-04.jpg"
                            className="img-fluid"
                            alt="User"
                          />
                        </Link>
                        <div className="testimonial-content">
                          <h5>Darren Valdez</h5>
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
                        <Link className="navigation" to={""}>
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-03.jpg"
                            className="img-fluid"
                            alt="User"
                          />
                        </Link>
                        <div className="testimonial-content">
                          <h5>Elinor Dunn</h5>
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
                        <Link className="navigation" to={""}>
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-04.jpg"
                            className="img-fluid"
                            alt="User"
                          />
                        </Link>
                        <div className="testimonial-content">
                          <h5>Darren Valdez</h5>
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
              <div className="brand-slider-group">
                <div className="testimonial-brand-slider owl-theme">
                  <Slider {...testimonialBrandSlider}>
                    <div className="brand-logos">
                      <ImageWithBasePath
                        src="assets/img/testimonial-icon-01.svg"
                        className="img-fluid"
                        alt="Brand-logo"
                      />
                    </div>
                    <div className="brand-logos">
                      <ImageWithBasePath
                        src="assets/img/testimonial-icon-01.svg"
                        className="img-fluid"
                        alt="Brand-logo"
                      />
                    </div>
                    <div className="brand-logos">
                      <ImageWithBasePath
                        src="assets/img/testimonial-icon-01.svg"
                        className="img-fluid"
                        alt="Brand-logo"
                      />
                    </div>
                    <div className="brand-logos">
                      <ImageWithBasePath
                        src="assets/img/testimonial-icon-01.svg"
                        className="img-fluid"
                        alt="Brand-logo"
                      />
                    </div>
                    <div className="brand-logos">
                      <ImageWithBasePath
                        src="assets/img/testimonial-icon-01.svg"
                        className="img-fluid"
                        alt="Brand-logo"
                      />
                    </div>
                    <div className="brand-logos">
                      <ImageWithBasePath
                        src="assets/img/testimonial-icon-01.svg"
                        className="img-fluid"
                        alt="Brand-logo"
                      />
                    </div>
                    <div className="brand-logos">
                      <ImageWithBasePath
                        src="assets/img/testimonial-icon-01.svg"
                        className="img-fluid"
                        alt="Brand-logo"
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
        {/* Newsletter */}
        <section className="section newsletter-sport">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="subscribe-style">
                  <div className="banner-blk">
                    <ImageWithBasePath
                      src="assets/img/subscribe-bg.jpg"
                      className="img-fluid"
                      alt="Banner"
                    />
                  </div>
                  <div className="banner-info ">
                    <ImageWithBasePath
                      src="assets/img/icons/subscribe.svg"
                      className="img-fluid"
                      alt="Banner"
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
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default AboutUs;
