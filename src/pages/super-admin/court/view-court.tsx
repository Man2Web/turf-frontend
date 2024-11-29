import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { all_routes } from "../../../router/all_routes";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../components/common/loader/Loader";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import BulkBookingModal from "../../../components/common/modal/bulk-booking-modal";
import { HeartFilledIcon, HeartIcon } from "../../../utils/icons/icons";
import { getCourtDuration } from "../../../utils/court-utils/getCourtDuration";
import { useAppContext } from "../../../context/app-context";

const ViewCourt = () => {
  const routes = all_routes;
  const { courtId } = useParams();
  const [images, setImages] = useState<any>([]);
  const [courtData, setCourtData] = useState<CourtsData>();
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  const { setLoading } = useAppContext();

  const userId = useMemo(
    () =>
      localStorage.getItem("adminId") ||
      localStorage.getItem("userId") ||
      localStorage.getItem("superAdminId"),
    []
  );

  // Fetch user wishlist when userId changes
  useEffect(() => {
    const getUserWishList = async () => {
      if (!userId) return;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}user/get/${userId}`
        );
        setUserWishlist(data.user.wishlist || []);
      } catch (error) {
        // console.error("Error fetching user wishlist", error);
      }
    };

    getUserWishList();
  }, [userId]);

  // Fetch court information when courtId changes
  useEffect(() => {
    const getCourtInfo = async (courtId: any) => {
      setLoading({
        status: true,
        description: "Fetching Court Data...",
      });
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}superAdmin/fetch/${courtId}`
        );
        const fetchedCourtData = response.data.courtData;

        if (fetchedCourtData) {
          const fetchedImages = fetchedCourtData.images.map((image: string) => {
            return `${process.env.REACT_APP_BACKEND_URL}court/uploads/${fetchedCourtData?.admin_id}/${fetchedCourtData?.court_id}/${image}`;
          });
          setImages(fetchedImages);
          setCourtData(fetchedCourtData);
        }
      } catch (error) {
        // console.error("Error fetching court info", error);
      } finally {
        setLoading({
          status: true,
          description: "Fetching Court Data...",
        });
      }
    };

    if (courtId) {
      getCourtInfo(courtId);
    }
  }, [courtId]); // Run this effect only when courtId changes

  const updateWishList = useCallback(
    async (wishList: string[]) => {
      if (!userId) return;

      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}user/wishlist/update/${userId}`,
          { wishList }
        );
      } catch (error) {
        // console.error("Error updating wishlist", error);
        toast.error("Error Updating Wishlist");
      }
    },
    [userId]
  );

  const handleItemClick = (courtId: string) => {
    setUserWishlist((prevData) => {
      const updatedWishlist = prevData.includes(courtId)
        ? prevData.filter((id) => id !== courtId)
        : [...prevData, courtId];

      updateWishList(updatedWishlist);
      return updatedWishlist;
    });
  };

  const handleShare = () => {
    const shareData = {
      title: courtData?.court_name,
      text: courtData?.venue_overview,
      url: window.location.href, // The current page URL or any specific URL you'd like to share
    };

    if (navigator.share) {
      // Use the Web Share API
      navigator.share(shareData);
    } else {
      // Fallback: you can create custom URLs for social media sharing
      alert("Sharing is not supported in this browser.");
      // For example, redirect to a Twitter share URL:
      // window.open(`https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareData.text)}`);
    }
  };

  const imagesData = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: images.length < 3 ? images.length : 3,
    slidesToScroll: 1,
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length < 3 ? images.length : 3,
    slidesToScroll: 1,
  };

  const courtDurationData = getCourtDuration(courtData?.availability || []);

  return (
    <div>
      <ToastContainer />
      <BulkBookingModal />
      {courtData && (
        <div>
          {/*Galler Slider Section*/}
          <div className="bannergallery-section">
            <div className="main-gallery-slider owl-carousel owl-theme">
              <Slider {...imagesData} className="venue-space">
                {images?.map((img: string, index: number) => {
                  return (
                    <div key={index} className="gallery-widget-item">
                      <Link to="#" data-fancybox="gallery1">
                        <img
                          style={{ height: "400px", width: "798px" }}
                          className="img-fluid"
                          alt="Image"
                          src={img}
                        />
                      </Link>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="showphotos corner-radius-10">
              <Link to="#" data-fancybox="gallery1">
                <i className="fa-regular fa-images" />
                More Photos
              </Link>
            </div>
          </div>
          <div className="venue-info white-bg d-block">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                  <h1 className="d-flex align-items-center justify-content-start">
                    {courtData?.court_name}
                  </h1>
                  <ul className="d-sm-flex justify-content-start align-items-center">
                    <li>
                      <a
                        className="d-flex align-items-center justify-content-center" // Add align-items-center
                        href={`tel:+91${courtData.phone_number}`}
                      >
                        <i className="feather-map-pin" />
                        <p className="mb-0 ml-2">
                          {`${courtData?.location.city}, ${courtData?.location.country}`}
                        </p>{" "}
                        {/* Add margin to the paragraph */}
                      </a>
                    </li>
                    <li>
                      <a
                        className="d-flex align-items-center justify-content-center" // Add align-items-center
                        href={`tel:+91${courtData.phone_number}`}
                      >
                        <i className="feather-phone-call" />
                        <p className="mb-0 ml-2">
                          +91 {courtData.phone_number}
                        </p>{" "}
                        {/* Add margin to the paragraph */}
                      </a>
                    </li>
                    <li>
                      <i className="feather-mail" />
                      <Link to={`mailto:${courtData.email}`}>
                        {" "}
                        {courtData.email}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 text-right">
                  <ul className="float-lg-end d-sm-flex justify-content-start align-items-center gap-2">
                    <li onClick={() => handleShare()}>
                      <Link to="#">
                        <i className="feather-share-2" />
                        Share
                      </Link>
                    </li>
                    <li onClick={() => handleItemClick(courtData.court_id)}>
                      <Link to="#" className="favour-adds d-flex gap-1">
                        {userWishlist.includes(courtData.court_id) ? (
                          <HeartIcon />
                        ) : (
                          <HeartFilledIcon />
                        )}
                        Add to favourite
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="row bottom-row d-flex align-items-center">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <ul className="d-sm-flex details">
                    <li>
                      <div className="profile-pic">
                        <Link to="#" className="venue-type">
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/icons/venue-type.svg"
                            alt="Icon"
                          />
                        </Link>
                      </div>
                    </li>
                    <li>
                      {/* <div className="profile-pic">
                        <Link to="#">
                          <ImageWithBasePath
                            className="img-fluid"
                            src="assets/img/profiles/avatar-01.jpg"
                            alt="Icon"
                          />
                        </Link>
                      </div>
                      <div className="ms-2">
                        <p>Managed By</p>
                        <h6 className="mb-0">{courtData.m_name}</h6>
                      </div> */}
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="d-flex float-sm-end align-items-center">
                    <p className="d-inline-block me-2 mb-0">Starts From :</p>
                    <h3 className="primary-text mb-0 d-inline-block">
                      ₹{decimalNumber(courtData?.pricing.starting_price)}
                      <span>/ slot</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Page Content */}
          <div className="content">
            <div className="container">
              {/* Row */}
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                  <div className="venue-options white-bg mb-4">
                    <ul className="clearfix">
                      <li className="active">
                        <Link to="#overview">Overview</Link>
                      </li>
                      <li>
                        <Link to="#includes">Includes</Link>
                      </li>
                      <li>
                        <Link to="#rules">Rules</Link>
                      </li>
                      <li>
                        <Link to="#amenities">Amenities</Link>
                      </li>
                      <li>
                        <Link to="#gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link to="#location">Location</Link>
                      </li>
                    </ul>
                  </div>
                  {/* Accordian Contents */}
                  <div className="accordion" id="accordionPanel">
                    <div className="accordion-item mb-4" id="overview">
                      <h4
                        className="accordion-header"
                        id="panelsStayOpen-overview"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseOne"
                          aria-expanded="true"
                          aria-controls="panelsStayOpen-collapseOne"
                        >
                          Overview
                        </button>
                      </h4>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-overview"
                      >
                        <div className="accordion-body">
                          <div className="text show-more-height">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: courtData?.venue_overview,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4" id="includes">
                      <h4
                        className="accordion-header"
                        id="panelsStayOpen-includes"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          Includes
                        </button>
                      </h4>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-includes"
                      >
                        <div className="accordion-body">
                          <ul className="clearfix ">
                            {courtData.includes.map((item, index) => (
                              <li key={index}>
                                <i className="feather-check-square" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4" id="rules">
                      <h4
                        className="accordion-header"
                        id="panelsStayOpen-rules"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          Rules
                        </button>
                      </h4>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-overview"
                      >
                        <div className="accordion-body">
                          <div className="text show-more-height">
                            <div className="d-flex gap-1 align-items-center">
                              <i className="feather-alert-octagon text-danger" />
                              <p className="m-0">
                                A maxium of{" "}
                                {Number(courtData.pricing.guests) +
                                  Number(
                                    courtData.pricing.additional_guests
                                  )}{" "}
                                players are allowed per booking
                              </p>
                            </div>
                            {courtData.rules_of_venue?.map((rule, index) => (
                              <div
                                key={index}
                                className="d-flex gap-1 align-items-center"
                              >
                                <i className="feather-alert-octagon text-danger" />
                                <p className="m-0">{rule}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4" id="amenities">
                      <h4
                        className="accordion-header"
                        id="panelsStayOpen-amenities"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseFour"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseFour"
                        >
                          Amenities
                        </button>
                      </h4>
                      <div
                        id="panelsStayOpen-collapseFour"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-amenities"
                      >
                        <div className="accordion-body">
                          <ul className="d-md-flex justify-content-between align-items-center">
                            {courtData?.amenities.map((item, index) => (
                              <li key={index}>
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item mb-4" id="gallery">
                      <h4
                        className="accordion-header"
                        id="panelsStayOpen-gallery"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseFive"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseFive"
                        >
                          Gallery
                        </button>
                      </h4>
                      <div
                        id="panelsStayOpen-collapseFive"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-gallery"
                      >
                        <div className="accordion-body">
                          <div className="owl-carousel gallery-slider owl-theme">
                            <Slider {...settings}>
                              {images?.map((img: string, index: number) => {
                                return (
                                  <div
                                    key={index}
                                    className="gallery-widget-item"
                                  >
                                    <Link
                                      key={index}
                                      className="corner-radius-10"
                                      to="#"
                                      data-fancybox="gallery3"
                                    >
                                      <img
                                        className="img-fluid corner-radius-10"
                                        alt="Image"
                                        src={img}
                                      />
                                    </Link>
                                  </div>
                                );
                              })}
                            </Slider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Accordian Contents */}
                </div>
                <aside className="col-12 col-sm-12 col-md-12 col-lg-4 theiaStickySidebar">
                  <div className="stickybar">
                    <div className="white-bg book-court">
                      <div className="d-grid btn-block mt-3">
                        <Link
                          to={`${routes.courtDetailsLink}/${courtId}/booking`}
                          className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                        >
                          <i className="feather-calendar" />
                          Book Now
                        </Link>
                      </div>
                    </div>
                    {/* Booking Buttons */}
                    {/* Enquiry */}
                    <div className="white-bg book-court">
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#bulkBookingModal"
                        className="d-flex justify-content-start align-items-center availability pe-auto"
                      >
                        <div>
                          <span className="icon-bg">
                            <ImageWithBasePath
                              className="img-fluid"
                              alt="Icon"
                              src="assets/img/icons/head-calendar.svg"
                            />
                          </span>
                        </div>
                        <div>
                          <h4>Bulk/Corporate Booking</h4>
                          <p className="mb-0">Contact to book in bulk.</p>
                        </div>
                      </a>
                    </div>
                    {/* Enquiry */}
                    {/* Operational Hours */}
                    <div className="white-bg book-court py-2">
                      <h4 className="border-bottom">Operational Hours</h4>
                      <p
                        style={{ fontWeight: "semibold" }}
                        className="d-inline-block"
                      >
                        {Number(courtDurationData?.duration) !== 0
                          ? `${formatTime(courtDurationData?.start_time)} - ${formatTime(courtDurationData?.end_time)}`
                          : "Not Operating today"}
                      </p>
                    </div>
                    {/* Operational Hours */}
                    {/* Location Details */}
                    <div className="white-bg book-court">
                      <div>
                        <h4 className="border-bottom">Location Details</h4>
                      </div>
                      <div className="accordion-item" id="location">
                        <div
                          id="panelsStayOpen-collapseSeven"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-location"
                        >
                          <div className="accordion-body p-0">
                            <div
                              className="google-maps"
                              style={{ height: "300px", overflow: "hidden" }}
                            >
                              {courtData?.location?.embedded_link ? (
                                <div
                                  style={{ height: "100%" }} // Ensure the inner div takes the full height
                                  dangerouslySetInnerHTML={{
                                    __html: courtData.location.embedded_link,
                                  }}
                                ></div>
                              ) : (
                                <p>No map available</p>
                              )}
                            </div>
                            <a
                              className="dull-bg d-flex justify-content-start align-items-center mt-3 p-2 rounded"
                              target="_blank"
                              rel="noreferrer"
                              href={courtData.location.location_link}
                            >
                              <div
                                style={{ padding: "14px" }}
                                className="white-bg me-2 mb-0 "
                              >
                                <i
                                  style={{ fontSize: "24px" }}
                                  className="fas fa-location-arrow text-success"
                                />
                              </div>
                              <div>
                                <h6>Our Venue Location</h6>
                                <p>{`${courtData?.location.city}, ${courtData?.location.country}`}</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Location Details */}
                    {/* Share Details */}
                    <div className="white-bg book-court">
                      <h4 className="border-bottom">Share Venue</h4>
                      <ul
                        style={{
                          backgroundColor: "white",
                          padding: "0",
                        }}
                        className="social-medias d-flex"
                      >
                        <li className="facebook">
                          <Link to="#">
                            <i className="mr-0 fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li className="instagram">
                          <Link to="#">
                            <i className="mr-0 fa-brands fa-instagram" />
                          </Link>
                        </li>
                        <li className="twitter">
                          <Link to="#">
                            <i className="mr-0 fa-brands fa-twitter" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* Share Details */}
                  </div>
                </aside>
              </div>
              {/* /Row */}
            </div>
          </div>
          {/* /Page Content */}
        </div>
      )}
    </div>
  );
};

export default ViewCourt;
