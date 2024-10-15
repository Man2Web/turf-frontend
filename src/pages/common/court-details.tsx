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
import { weekNames } from "../../utils/weekNames";
import BulkBookingModal from "../../components/admin/bulk-booking-modal";
import { getTimeSlotDuration } from "../../utils/getOperationalHours";
import { HeartFilledIcon, HeartIcon } from "../../utils/icons";

const CourtDetails = () => {
  const routes = all_routes;
  const { courtId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [courtData, setCourtData] = useState<CourtDataType>();
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  console.log(courtData?.rules_of_venue);

  const userId = useMemo(
    () => localStorage.getItem("adminId") || localStorage.getItem("userId"),
    []
  );

  const convertLiToArray = (htmlString: string) => {
    // Create a temporary div element to hold the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    // Select all <li> elements inside the temporary div
    const listItems = tempDiv.querySelectorAll("li");

    // Extract the text content of each <li> and put it into an array
    const listArray = Array.from(listItems).map((li) => li.textContent);

    return listArray;
  };

  let listArray;

  // Get the array of <li> values
  if (courtData?.rules_of_venue) {
    listArray = convertLiToArray(courtData?.rules_of_venue);
  }

  // Fetch user wishlist when userId changes
  useEffect(() => {
    const getUserWishList = async () => {
      if (!userId) return;

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}user/get/${userId}`
        );
        setUserWishlist(data.user.wishlist);
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
          `${process.env.REACT_APP_BACKEND_URL}court/fetch/${courtId}`
        );
        const fetchedCourtData = response.data.court;
        console.log(fetchedCourtData);
        const fetchedImages = await Promise.all(
          fetchedCourtData.images.map(async (images: { image_url: string }) => {
            const imageBlob = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}court/uploads/${fetchedCourtData?.user_id}/${fetchedCourtData?.id}/${images.image_url}`,
              {
                responseType: "blob",
              }
            );
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
    async (wishList: string[]) => {
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

  const handleItemClick = (courtId: string) => {
    if (!userWishlist || userWishlist.length === 0) {
      // If userWishlist is null, undefined, or an empty array
      setUserWishlist([courtId]);
      updateWishList([courtId]);
    } else {
      if (userWishlist.includes(courtId)) {
        // Remove the item if it already exists in the wishlist
        setUserWishlist((prevData) => {
          const localWishList = prevData.filter((id) => id !== courtId);
          updateWishList(localWishList);
          return localWishList;
        });
      } else {
        // Add the item to the wishlist
        setUserWishlist((prevData) => {
          const localWishList = [...prevData, courtId];
          updateWishList(localWishList);
          return localWishList;
        });
      }
    }
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
      // window.open(`https://twitter.com/share?url=${encodeURIComponent(window.locationdata.href)}&text=${encodeURIComponent(shareData.text)}`);
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

  console.log(userWishlist);
  // console.log(userWishlist.includes(Number(courtData?.court_id)));

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
                  </h1>
                  <ul className="d-sm-flex justify-content-start align-items-center">
                    <li>
                      <a
                        className="d-flex align-items-center justify-content-center" // Add align-items-center
                        href={`tel:+91${courtData.phone_number}`}
                      >
                        <i className="feather-map-pin" />
                        <p className="mb-0 ml-2 text-capitalize">
                          {`${courtData?.locationdata.city}, ${courtData?.locationdata.country}`}
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
                        {userWishlist?.includes(courtData.court_id) ? (
                          <HeartFilledIcon />
                        ) : (
                          <HeartIcon />
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
                  <ul className="d-sm-flex details"></ul>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                  <div className="d-flex float-sm-end align-items-center">
                    <p className="d-inline-block me-2 mb-0">Starts From :</p>
                    <h3 className="primary-text mb-0 d-inline-block">
                      ₹{decimalNumber(courtData?.venueprice.starting_price)}
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
                        <Link to="#locationdata">locationdata</Link>
                      </li>
                    </ul>
                  </div>
                  {/* Accordian Contents */}
                  <div className="accordion" id="accordionPanel">
                    {/* Overview */}
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
                    {/* Overview */}
                    {/* Includes */}
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
                            {courtData?.courtincludes.badminton_racket && (
                              <li>
                                <i className="feather-check-square" />
                                Badminton Racket Unlimited
                              </li>
                            )}
                            {courtData?.courtincludes.bats && (
                              <li>
                                <i className="feather-check-square" />
                                Bats
                              </li>
                            )}
                            {courtData?.courtincludes.hitting_machines && (
                              <li>
                                <i className="feather-check-square" />
                                Hitting Machines
                              </li>
                            )}
                            {courtData?.courtincludes.multiple_courts && (
                              <li>
                                <i className="feather-check-square" />
                                Multiple Courts
                              </li>
                            )}
                            {courtData?.courtincludes.spare_players && (
                              <li>
                                <i className="feather-check-square" />
                                Spare Players
                              </li>
                            )}
                            {courtData?.courtincludes.instant_racket && (
                              <li>
                                <i className="feather-check-square" />
                                Instant Racket
                              </li>
                            )}
                            {courtData?.courtincludes.green_turfs && (
                              <li>
                                <i className="feather-check-square" />
                                Green Turfs
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* Includes */}
                    {/* Rules */}
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
                                {courtData.venueprice.max_guests +
                                  courtData.venueprice.additional_guests}{" "}
                                players are allowed per booking
                              </p>
                            </div>
                            {listArray?.map((rule, index) => (
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
                    {/* Rules */}
                    {/* Amenities */}
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
                          <ul className="d-md-flex gap-4 align-items-center">
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
                    {/* Amenities */}
                    {/* Gallery */}
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
                    {/* Gallery */}
                  </div>
                  {/* Accordian Contents */}
                </div>
                <aside className="col-12 col-sm-12 col-md-12 col-lg-4 theiaStickySidebar">
                  <div className="stickybar">
                    {/* Booking Buttons */}
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
                        {operationalHours && operationalHours}
                      </p>
                    </div>
                    {/* Operational Hours */}
                    {/* locationdata Details */}
                    <div className="white-bg book-court">
                      <div>
                        <h4 className="border-bottom">locationdata Details</h4>
                      </div>
                      <div className="accordion-item" id="locationdata">
                        <div
                          id="panelsStayOpen-collapseSeven"
                          className="accordion-collapse collapse show"
                          aria-labelledby="panelsStayOpen-locationdata"
                        >
                          <div className="accordion-body p-0">
                            <div
                              className="google-maps"
                              style={{ height: "300px", overflow: "hidden" }}
                            >
                              {courtData?.locationdata?.embed_link ? (
                                <div
                                  style={{ height: "100%" }} // Ensure the inner div takes the full height
                                  dangerouslySetInnerHTML={{
                                    __html: courtData.locationdata.embed_link,
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
                              href={courtData.locationdata.location_link}
                            >
                              <div
                                style={{ padding: "14px" }}
                                className="white-bg me-2 mb-0 "
                              >
                                <i
                                  style={{ fontSize: "24px" }}
                                  className="fas fa-locationdata-arrow text-success"
                                />
                              </div>
                              <div>
                                <h6>Our Venue locationdata</h6>
                                <p className="text-capitalize">{`${courtData?.locationdata.city}, ${courtData?.locationdata.country}`}</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* locationdata Details */}
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

export default CourtDetails;
