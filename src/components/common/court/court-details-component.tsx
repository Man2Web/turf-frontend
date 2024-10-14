import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { decimalNumber } from "../../../utils/decimalNumber";

const CourtDetailsComponent = ({
  courtData,
  courtImage,
  contentTitle,
  contentDescription,
}: {
  courtData: CourtDataType;
  courtImage: any;
  contentTitle: string | undefined;
  contentDescription: string | undefined;
}) => {
  return (
    <>
      <section className="card mb-40">
        <div className="text-center mb-40">
          <h3 className="mb-1">{contentTitle}</h3>
          <p className="sub-title mb-0">{contentDescription}</p>
        </div>
        <div className="master-academy dull-whitesmoke-bg card">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
              <div className="d-sm-flex justify-content-start align-items-center">
                <Link to="#">
                  {/* <ImageWithBasePath
                src="assets/img/master-academy.png"
                className="corner-radius-10"
                alt="Venue"
              /> */}
                  <img
                    src={courtImage}
                    style={{ maxHeight: "100px" }}
                    className="corner-radius-10"
                    alt="Venue"
                  />
                </Link>
                <div className="info">
                  {/* <div className="d-flex justify-content-start align-items-center mb-3">
                  <span className="text-white dark-yellow-bg color-white me-2 d-flex justify-content-center align-items-center">
                    4.5
                  </span>
                  <span>300 Reviews</span>
                </div> */}
                  <h3 className="mb-2">{courtData.court_name}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: courtData.venue_overview.substring(0, 100),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
              <ul className="d-sm-flex align-items-center justify-content-evenly">
                <li>
                  <h3 className="d-inline-block">
                    ₹{decimalNumber(courtData.pricing.starting_price)}
                  </h3>
                  <span>/per slot</span>
                  <p>up to {courtData.pricing.max_guests} guests</p>
                </li>
                <li>
                  <span>
                    <i className="feather-plus" />
                  </span>
                </li>
                <li>
                  <h3 className="d-inline-block">
                    ₹
                    {decimalNumber(
                      courtData.pricing.price_of_additional_guests
                    )}
                  </h3>
                  <span>/per slot</span>
                  <p>
                    each additional guest <br />
                    up to {courtData.pricing.additional_guests} guests max
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourtDetailsComponent;
