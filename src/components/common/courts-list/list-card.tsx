import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { decimalNumber } from "../../../utils/commin-utils/decimalNumber";
import {
  HeartFilledIcon,
  HeartIcon,
  ThreeDots,
  FootballIcon,
  BadmintonIcon,
  TennisBallIcon,
  Basketball01Icon,
  CricketBatIcon,
  IndianRupee,
  ClockIcon,
  LocationPin,
} from "../../../utils/icons/icons";
import { formatTime } from "../../../utils/commin-utils/formatTime";
import { handleWishListUpdate } from "../../../utils/commin-utils/handleWishlistUpdate";
import { getCourtDuration } from "../../../utils/court-utils/getCourtDuration";
import { Badge, Button, Card, Divider, List } from "antd";
import Meta from "antd/es/card/Meta";

export const getIconBySport = (sport: string) => {
  switch (sport) {
    case "Basketball":
      return <Basketball01Icon />;
    case "Cricket":
      return <CricketBatIcon />;
    case "Tennis":
      return <TennisBallIcon />;
    case "Badminton":
      return <BadmintonIcon />;
    case "Football":
      return <FootballIcon />;
    default:
      return <ThreeDots />;
  }
};

const ListCard = ({
  court,
  idx,
  userWishlist,
  setUserWishlist,
  updateWishList,
}: {
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
    <div key={idx} className="col-lg-12 col-md-12 mb-2">
      <List
        className="shadow-sm hover-shadow-lg rounded"
        itemLayout="horizontal"
      >
        <List.Item>
          <List.Item.Meta
            avatar={
              <Link
                to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
                className="position-relative d-none d-md-block"
              >
                {court.featured && (
                  <Badge.Ribbon text="Featured" color="primary" />
                )}
                <img
                  alt="example"
                  src={imageUrl}
                  className="object-fit-cover"
                  style={{
                    width: "350px",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                />
              </Link>
            }
            title={
              <div className="d-flex justify-content-between align-items-center py-2">
                <Link
                  to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
                  className="mb-0"
                >
                  <p className="text-black">{court.court_name}</p>
                </Link>
                <Link
                  style={{
                    paddingRight: "10px",
                  }}
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
                <Divider />
                <div className="d-flex justify-content-end">
                  <Link
                    style={{
                      paddingRight: "10px",
                    }}
                    className="justify-content-end"
                    to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
                    key={idx}
                  >
                    <Button className="w-100" type="primary">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            }
          />
        </List.Item>
      </List>
    </div>
  );
};

export default ListCard;
