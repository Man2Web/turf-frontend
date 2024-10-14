import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { all_routes } from "../../router/all_routes";
import { decimalNumber } from "../../utils/decimalNumber";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/common/Loader";
import { formatTime } from "../../utils/formatTime";
import { weekNames } from "../../utils/weekNames";
import BulkBookingModal from "../../components/admin/bulk-booking-modal";
import { getTimeSlotDuration } from "../../utils/getOperationalHours";
import { HeartFilledIcon, HeartIcon } from "../../utils/icons";

const ViewCourt = () => {
  const routes = all_routes;
  const { courtId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [courtData, setCourtData] = useState<CourtDataType>();
  const [userWishlist, setUserWishlist] = useState<number[]>([]);

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
        console.error("Error fetching user wishlist", error);
      }
    };

    getUserWishList();
  }, [userId]);

  // Fetch court information when courtId changes
  useEffect(() => {
    const getCourtInfo = async (courtId: any) => {
      setLoading(true); // Move setLoading inside the fetch
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}superAdmin/fetch/${courtId}`
        );
        const fetchedCourtData = response.data.court;

        const fetchedImages = await Promise.all(
          fetchedCourtData.images.map(async (imageUrl: string) => {
            const imageBlob = await axios.get(imageUrl, {
              responseType: "blob",
            });
            const objectUrl = URL.createObjectURL(imageBlob.data);
            return { url: objectUrl };
          })
        );

        setImages(fetchedImages);
        setCourtData(fetchedCourtData);
      } catch (error) {
        console.error("Error fetching court info", error);
      } finally {
        setLoading(false);
      }
    };

    if (courtId) {
      getCourtInfo(courtId);
    }
  }, [courtId]); // Run this effect only when courtId changes

  const updateWishList = useCallback(
    async (wishList: number[]) => {
      if (!userId) return;

      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}user/wishlist/update/${userId}`,
          { wishList }
        );
      } catch (error) {
        console.error("Error updating wishlist", error);
        toast.error("Error Updating Wishlist");
      }
    },
    [userId]
  );

  const handleItemClick = (courtId: number) => {
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
      navigator
        .share(shareData)
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
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

  const d = new Date();
  const currentDay = weekNames[d.getDay()];
  const operationalHours = getTimeSlotDuration(currentDay, courtData);

  return (
    <div>
      <ToastContainer />
      <BulkBookingModal />
      {loading && <Loader />}
      {courtData && (
        <div>
          {/*Galler Slider Section*/}
          <div className="bannergallery-section">
            <div className="main-gallery-slider owl-carousel owl-theme">
              <Slider {...imagesData} className="venue-space">
                {images?.map(
                  (img: { url: string }, idx: React.Key | null | undefined) => {
                    console.log(img);
                    return (
                      <div key={idx} className="gallery-widget-item">
                        <Link to="#" data-fancybox="gallery1">
                          <img
                            style={{ height: "400px", width: "798px" }}
                            className="img-fluid"
                            alt="Image"
                            src={img.url}
                          />
                        </Link>
                      </div>
                    );
                  }
                )}
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
                    <span className="d-flex justify-content-center align-items-center">
                      <i className="fas fa-check-double" />
                    </span>
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
                      <div className="ms-2">
                        <p>Venue Type</p>
                        <h6 className="mb-0">Indoor</h6>
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
                            {courtData?.includes.badminton_racket && (
                              <li>
                                <i className="feather-check-square" />
                                Badminton Racket Unlimited
                              </li>
                            )}
                            {courtData?.includes.bats && (
                              <li>
                                <i className="feather-check-square" />
                                Bats
                              </li>
                            )}
                            {courtData?.includes.hitting_machines && (
                              <li>
                                <i className="feather-check-square" />
                                Hitting Machines
                              </li>
                            )}
                            {courtData?.includes.multiple_courts && (
                              <li>
                                <i className="feather-check-square" />
                                Multiple Courts
                              </li>
                            )}
                            {courtData?.includes.spare_players && (
                              <li>
                                <i className="feather-check-square" />
                                Spare Players
                              </li>
                            )}
                            {courtData?.includes.instant_racket && (
                              <li>
                                <i className="feather-check-square" />
                                Instant Racket
                              </li>
                            )}
                            {courtData?.includes.green_turfs && (
                              <li>
                                <i className="feather-check-square" />
                                Green Turfs
                              </li>
                            )}
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
                            <div
                              dangerouslySetInnerHTML={{
                                __html: courtData?.rules_of_venue,
                              }}
                            />
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
                            {courtData?.amenities.parking && (
                              <li>
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                />
                                Parking
                              </li>
                            )}
                            {courtData?.amenities.drinking_water && (
                              <li>
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                />
                                Drinking Water
                              </li>
                            )}
                            {courtData?.amenities.first_aid && (
                              <li>
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                />
                                First Aid
                              </li>
                            )}
                            {courtData?.amenities.change_room && (
                              <li>
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                />
                                Change Room
                              </li>
                            )}
                            {courtData?.amenities.shower && (
                              <li>
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                />
                                Shower
                              </li>
                            )}
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
                              {images?.map(
                                (
                                  img: { url: string },
                                  idx: React.Key | null | undefined
                                ) => {
                                  return (
                                    <div
                                      key={idx}
                                      className="gallery-widget-item"
                                    >
                                      <Link
                                        key={idx}
                                        className="corner-radius-10"
                                        to="#"
                                        data-fancybox="gallery3"
                                      >
                                        <img
                                          className="img-fluid corner-radius-10"
                                          alt="Image"
                                          src={img.url}
                                        />
                                      </Link>
                                    </div>
                                  );
                                }
                              )}
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
                    {/* Booking Buttons */}
                    {/* <div className="d-grid btn-block mt-3 px-4">
                      <Link
                        to={`${routes.courtDetailsLink}/${courtId}/booking`}
                        className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                      >
                        <i className="feather-calendar" />
                        Book Now
                      </Link>
                    </div> */}
                    <div className="white-bg book-court">
                      {/* <h4 className="border-bottom">Book A Court</h4> */}
                      {/* <ul className="d-sm-flex align-items-center justify-content-evenly">
                        <li className="d-flex justify-content-between">
                          <h3 className="d-inline-block primary-text">
                            Starting From: ₹
                            {decimalNumber(courtData?.pricing.starting_price)}
                          </h3>
                          <p>
                            up to {decimalNumber(courtData?.pricing.max_guests)}{" "}
                            guests
                          </p>
                        </li>
                        <li>
                          <h4 className="d-inline-block primary-text">
                            ₹
                            {decimalNumber(
                              courtData?.pricing.price_of_additional_guests
                            )}
                          </h4>
                          <p>
                            each additional guest <br />
                            up to{" "}
                            {decimalNumber(
                              courtData?.pricing.additional_guests
                            )}{" "}
                            guests max
                          </p>
                        </li>
                      </ul> */}
                      <div className="d-grid btn-block mt-3">
                        <Link
                          to={`${routes.courtDetailsLink}/${courtId}/booking`}
                          className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                        >
                          <i className="feather-calendar" />
                          Book Now
                        </Link>
                        {/* <div className="py-4 d-flex justify-content-between gap-2">
                          <Link
                            className="btn btn-primary d-inline-flex justify-content-center align-items-center w-50"
                            to="#"
                            onClick={() => handleShare()}
                          >
                            <i className="feather-share-2" />
                            Share
                          </Link>
                          <Link
                            data-bs-toggle="modal"
                            data-bs-target="#bulkBookingModal"
                            className="btn btn-primary d-inline-flex justify-content-center align-items-center w-100"
                            to="#"
                            style={{ fontSize: "12px" }}
                          >
                            Bulk/Corporate Enquiry
                          </Link>
                        </div> */}
                      </div>

                      {/* Bulk Enquiry */}
                      {/* <div className="py-2">
                        <h4 className="border-bottom">
                          Corporate / Bulk Enquiry
                        </h4>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#bulkBookingModal"
                          className="white-bg d-flex justify-content-start align-items-center availability pe-auto"
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
                            <h4>Bulk / Corporate Booking</h4>
                            <p className="mb-0">Contact to book in bulk.</p>
                          </div>
                        </a>
                      </div> */}
                      {/* Maps Link */}

                      {/* <div>
                        <h4 className="border-bottom py-4">Share Venue</h4>
                        <ul
                          style={{ backgroundColor: "white", padding: "0px" }}
                          className="social-medias d-flex"
                        >
                          <li className="facebook">
                            <Link to="#">
                              <i className="fa-brands fa-facebook-f m-0" />
                            </Link>
                          </li>
                          <li className="instagram">
                            <Link to="#">
                              <i className="fa-brands fa-instagram m-0" />
                            </Link>
                          </li>
                          <li className="twitter">
                            <Link to="#">
                              <i className="fa-brands fa-twitter m-0" />
                            </Link>
                          </li>
                        </ul>
                      </div> */}
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
                        style={{ fontWeight: "bold" }}
                        className="d-inline-block"
                      >
                        {operationalHours && operationalHours}
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
                              {courtData?.location?.embed_link ? (
                                <div
                                  style={{ height: "100%" }} // Ensure the inner div takes the full height
                                  dangerouslySetInnerHTML={{
                                    __html: courtData.location.embed_link,
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
