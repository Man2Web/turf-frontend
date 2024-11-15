import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import { HeartFilledIcon, HeartIcon } from "../../../utils/icons/icons";
import { getIconBySport } from "./list-card";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { handleWishListUpdate } from "../../../utils/commin-utils/handleWishlistUpdate";
import { getCourtDuration } from "../../../utils/court-utils/getCourtDuration";

const GridCard = ({
  showFilters,
  court,
  idx,
  userWishlist,
  setUserWishlist,
  updateWishList,
}: {
  showFilters: boolean;
  court: CourtsData;
  idx: number;
  userWishlist: string[];
  setUserWishlist: any;
  updateWishList: any;
}) => {
  const routes = all_routes;
  const courtDurationData = getCourtDuration(court.availability);
  const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${court.admin_id}/${court.court_id}/${court.images[0]}`;
  return (
    <div
      key={idx}
      className={`${showFilters ? "col-lg-6" : "col-lg-4"} col-md-6 mb-4`}
    >
      <div className="wrapper">
        <div className="listing-item listing-item-grid">
          <div className="listing-img">
            <Link to={`${routes.courtDetailsLink}/${court.court_id}`}>
              <img
                style={{
                  height: "250px",
                  width: "415px",
                }}
                src={imageUrl}
                alt="court img"
              />
            </Link>
            <div className="fav-item-venues">
              {court.featured && <span className="tag tag-blue">Featured</span>}
              <h5 className="tag tag-primary">
                ₹{decimalNumber(court.pricing.starting_price)}
              </h5>
            </div>
          </div>
          <div className="listing-content">
            <div className="list-reviews d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="listing-title d-flex align-items-center m-0">
                  <Link to={`${routes.courtDetailsLink}/${court.court_id}`}>
                    {court.court_name}
                  </Link>
                </h5>
              </div>
              <Link
                to="#"
                key={1}
                onClick={() =>
                  handleWishListUpdate(
                    court.court_id,
                    userWishlist,
                    setUserWishlist,
                    updateWishList
                  )
                }
              >
                {userWishlist?.includes(court.court_id) ? (
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
                  {courtDurationData &&
                    Number(courtDurationData.duration) !== 0 && (
                      <span>
                        <i className="feather-clock fw-bold" />
                        {`${courtDurationData && courtDurationData.duration} Hrs`}
                      </span>
                    )}
                  {courtDurationData &&
                    Number(courtDurationData.duration) !== 0 && (
                      <span>
                        <i className="feather-sun fw-bold" />
                        {`${formatTime(courtDurationData.start_time)} - ${formatTime(courtDurationData.end_time)}`}
                      </span>
                    )}
                  <span className="text-capitalize">
                    <i className="feather-map-pin fw-bold" />
                    {`${court.location.city}, ${court.location.country}`}
                  </span>
                </li>
              </ul>
            </div>
            <div className="listing-button">
              <Link
                to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
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
