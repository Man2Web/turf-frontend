import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { decimalNumber } from "../../../utils/decimalNumber";
import { HeartFilledIcon, HeartIcon, ThreeDots } from "../../../utils/icons";
import { getIconBySport } from "./list-card";
import { formatTime } from "../../../utils/formatTime";

const GridCard = ({
  showFilters,
  court,
  images,
  userWishlist,
  handleItemClick,
  idx,
}: {
  showFilters: boolean;
  court: CourtsData;
  images: string[] | undefined;
  userWishlist: number[] | undefined;
  handleItemClick: any;
  idx: number;
}) => {
  const routes = all_routes;
  return (
    <div
      key={idx}
      className={`${showFilters ? "col-lg-6" : "col-lg-4"} col-md-6 mb-4`}
    >
      <div className="wrapper">
        <div className="listing-item listing-item-grid">
          <div className="listing-img">
            <Link to={`${routes.courtDetailsLink}/${court.id}`}>
              <img
                style={{
                  height: "250px",
                  width: "415px",
                }}
                src={images && images[idx]}
                alt="court img"
              />
            </Link>
            <div className="fav-item-venues">
              {court.featured && <span className="tag tag-blue">Featured</span>}
              <h5 className="tag tag-primary">
                ₹{decimalNumber(court.courtPriceData.starting_price)}
              </h5>
            </div>
          </div>
          <div className="listing-content">
            <div className="list-reviews d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="listing-title d-flex align-items-center m-0">
                  <Link to={`${routes.courtDetailsLink}/${court.id}`}>
                    {court.court_name}
                  </Link>
                </h5>
              </div>
              <Link to="#" key={1} onClick={() => handleItemClick(court.id)}>
                {userWishlist?.includes(Number(court.id)) ? (
                  <HeartFilledIcon />
                ) : (
                  <HeartIcon />
                )}
              </Link>
            </div>
            <div className="listing-details-group">
              <ul
                style={{ fontWeight: "200" }}
                className="listing-details-info"
              >
                <li className="mb-2">
                  <span>
                    <i>{getIconBySport(court.court_type)}</i>
                    {`${court.court_type}`}
                  </span>
                  <span>
                    <i className="feather-clock" />
                    {`${court.courtAvailabilityData.duration}`}
                  </span>
                  <span>
                    <i className="feather-sun" />
                    {`${formatTime(court.courtAvailabilityData.start_time)} - ${formatTime(court.courtAvailabilityData.end_time)}`}
                  </span>
                  <span className="text-capitalize">
                    <i className="feather-map-pin" />
                    {`${court.locationData.city}, ${court.locationData.country}`}
                  </span>
                </li>
              </ul>
            </div>
            <div className="listing-button">
              <Link
                to={`${routes.courtDetailsLink}/${court.id}/booking`}
                className="user-book-now btn btn-primary text-white w-100 justify-content-center"
              >
                <span>
                  <i className="feather-calendar me-2 text-white" />
                </span>
                Reserve Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridCard;
