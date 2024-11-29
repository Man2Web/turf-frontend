import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../../router/all_routes";
import { citiesList } from "../../utils/data-list/citiesList";
import { useAppContext } from "../../context/app-context";
import LocationDataModal from "../../components/common/modal/location-data-modal";
import { Card } from "antd";
import { courtOptions } from "../../utils/court-utils/courtOptions";
import { getIconsBySport } from "../../utils/icons/getIconsBySport";
import FetchCourts from "../../components/common/home/fetch-courts";
import RatedCourts from "../../components/common/home/rated-courts";

const HomePage = () => {
  const routes = all_routes;
  const [citiesData, setCitiesData] = useState<string[]>([]);
  const { userLocation, setUserLocation } = useAppContext();
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    <main className="main-homepage">
      {!userLocation && <LocationDataModal />}
      <section className="hero-section">
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center w-100">
              <div className="col-lg-7 col-md-10 mx-auto">
                <div className="section-search aos" data-aos="fade-up">
                  <h1 className="mx-auto">
                    Find the best court <span>near you..!</span>
                  </h1>
                  <ImageWithBasePath
                    src="assets/img/home-icons/shuttlecock.png"
                    alt="shuttle cock image"
                    className="shuttle-cock-1"
                  />
                  <div className="search-box">
                    <form className="container gap-2">
                      {/* <div className="search-input line"></div> */}
                      <div className="col-12 col-md-8">
                        <div className="form-group mb-0">
                          <Dropdown
                            filter
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
                  <ImageWithBasePath
                    src="assets/img/home-icons/shuttlecock.png"
                    alt="shuttle cock image"
                    className="shuttle-cock-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ads-section">
        <Slider {...settings}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card className="grey-bg" key={index} bordered={false}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
            </Card>
          ))}
        </Slider>
      </section>
      <section className="categories-section">
        <h2>What Are You Playing Today?</h2>
        <div className="d-flex gap-4 icons my-4">
          {courtOptions.map((option, index) => (
            <Link
              to={`${routes.ListingList}/${option}`}
              className="text-center icon"
              key={index}
            >
              {getIconsBySport(option, 32)}
              <p>{option}</p>
            </Link>
          ))}
        </div>
      </section>
      <RatedCourts />
      <FetchCourts />
    </main>
  );
};

export default HomePage;
