import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import {
  ClockIcon,
  HeartFilledIcon,
  HeartIcon,
  IndianRupee,
  LocationPin,
  StarIcon,
} from "../../../utils/icons/icons";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { handleWishListUpdate } from "../../../utils/commin-utils/handleWishlistUpdate";
import { getCourtDuration } from "../../../utils/court-utils/getCourtDuration";
import { Badge, Button, Card, Divider, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import { getIconsBySport } from "../../../utils/icons/getIconsBySport";
import Slider from "react-slick";
import { gridCardSliderSettings } from "../../../utils/data-list/slidersData";
import { useCourtRatings } from "../../../utils/court-utils/getCourtRating";

const GridCard = ({
  court,
  userWishlist,
  setUserWishlist,
  updateWishList,
}: {
  court: CourtsData;
  userWishlist?: string[];
  setUserWishlist?: any;
  updateWishList?: any;
}) => {
  const routes = all_routes;
  const courtDurationData = getCourtDuration(court?.availability);
  const { total_rating, total_reviews } = useCourtRatings(court.court_id);
  return (
    <Card
      hoverable
      actions={[
        <Link
          key={court.court_id}
          to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
        >
          <Button className="w-100" type="primary">
            Book Now
          </Button>
        </Link>,
      ]}
      cover={
        <Link
          to={`${routes.courtDetailsLink}/${court.court_id}`}
          className="position-relative"
        >
          {court.featured && (
            <Badge.Ribbon className="z-3" text="Featured" color="primary" />
          )}
          <div className="position-relative">
            {/* Badge for Court Type */}
            <Badge
              className="position-absolute bottom-0 start-0 m-2 z-3"
              color="primary"
              text={
                <p className="mb-0 d-flex align-items-center gap-2 bg-white px-2 rounded">
                  {getIconsBySport(court.court_type)}
                  {court.court_type}
                </p>
              }
            />
            {/* Badge for Coupon */}
            <Badge
              className="position-absolute bottom-0 end-0 m-2 z-3"
              color="primary"
              text={
                <p
                  style={{ backgroundColor: "#097E52", color: "white" }}
                  className="mb-0 d-flex align-items-center gap-2 px-2 rounded"
                >
                  {court.coupon_data?.coupon_label}
                </p>
              }
            />
            {/* Image Slider */}
            <Slider {...gridCardSliderSettings}>
              {court?.images?.map((image: string, index: number) => (
                <img
                  key={index}
                  alt="example"
                  src={`${process.env.REACT_APP_BACKEND_URL}court/uploads/${court.admin_id}/${court.court_id}/${image}`}
                  className="rounded-top"
                />
              ))}
            </Slider>
          </div>
        </Link>
      }
    >
      <Meta
        title={
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to={`${routes.courtDetailsLink}/${court.court_id}`}
              className="mb-0"
            >
              <p className="text-black mb-0">{court.court_name}</p>
            </Link>
            <div className="d-flex align-items-center gap-2">
              {/* Badge for Court Rating */}
              {total_reviews > 0 && (
                <div className="d-flex w-full align-items-center">
                  <StarIcon
                    style={{ marginRight: "4px" }}
                    color="#ffd600"
                    fill="#ffd600"
                    height={16}
                    width={16}
                  />
                  <p
                    style={{ fontWeight: "normal", fontSize: "14px" }}
                    className="mb-0"
                  >
                    {total_rating}
                  </p>
                  {/* <Divider type="vertical" />
                  <p
                    style={{ fontWeight: "normal", fontSize: "14px" }}
                    className="mb-0"
                  >
                    {total_reviews}
                  </p> */}
                </div>
              )}
              {/* <Badge  text={} /> */}
              <Link
                to="#"
                key={1}
                onClick={() => {
                  if (userWishlist) {
                    handleWishListUpdate(
                      court.court_id,
                      userWishlist,
                      setUserWishlist,
                      updateWishList
                    );
                  }
                }}
              >
                {userWishlist?.includes(court.court_id) ? (
                  <HeartFilledIcon />
                ) : (
                  <HeartIcon />
                )}
              </Link>
            </div>
          </div>
        }
        description={
          <div>
            <p className="mb-0 d-flex align-items-center gap-2">
              <IndianRupee />
              {decimalNumber(court?.pricing?.starting_price)}
              {`${courtDurationData && Number(courtDurationData.duration) > 0 ? ` / ${courtDurationData.duration} Hrs` : " Onwards"}`}
            </p>
            {Number(courtDurationData?.duration) !== 0 &&
              courtDurationData !== null && (
                <p className="mb-0 d-flex align-items-center gap-2">
                  <ClockIcon />
                  {`${formatTime(courtDurationData?.start_time)} - ${formatTime(courtDurationData?.end_time)}`}
                </p>
              )}
            <p className="text-capitalize mb-0 d-flex align-items-center gap-2">
              <LocationPin />
              {`${court.location?.city}, ${court.location?.country}`}
            </p>
          </div>
        }
      />
    </Card>
  );
};

export default GridCard;
