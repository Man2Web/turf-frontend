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
} from "../../../utils/icons/icons";
import { getIconBySport } from "./list-card";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { handleWishListUpdate } from "../../../utils/commin-utils/handleWishlistUpdate";
import { getCourtDuration } from "../../../utils/court-utils/getCourtDuration";
import { Badge, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";

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
      <Card
        hoverable
        actions={[
          <Link
            to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
            key={idx}
          >
            <Button className="w-100" type="primary">
              Book Now
            </Button>
          </Link>,
        ]}
        cover={
          <Link
            to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
            className="position-relative"
          >
            {court.featured && <Badge.Ribbon text="Featured" color="primary" />}
            <img alt="example" src={imageUrl} className="rounded-top" />
          </Link>
        }
      >
        <Meta
          title={
            <div className="d-flex justify-content-between align-items-center">
              <Link
                to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
                className="mb-0"
              >
                <p className="text-black">{court.court_name}</p>
              </Link>
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
          }
          description={
            <div>
              <p className="mb-0 d-flex align-items-center gap-2">
                {getIconBySport(court.court_type)}
                {court.court_type}
              </p>
              <p className="mb-0 d-flex align-items-center gap-2">
                <IndianRupee />
                {decimalNumber(court.pricing.starting_price)} /{" "}
                {`${courtDurationData && courtDurationData.duration} Hrs`}
              </p>
              {Number(courtDurationData?.duration) !== 0 && (
                <p className="mb-0 d-flex align-items-center gap-2">
                  <ClockIcon />
                  {`${formatTime(courtDurationData?.start_time)} - ${formatTime(courtDurationData?.end_time)}`}
                </p>
              )}
              <p className="text-capitalize mb-0 d-flex align-items-center gap-2">
                <LocationPin />
                {`${court.location.city}, ${court.location.country}`}
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default GridCard;
