import React from "react";

const AmenitiesDetails = ({ register }: { register: any }) => {
  return (
    <div className="accordion-item mb-4" id="amenities">
      <h4 className="accordion-header" id="panelsStayOpen-amenities">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseSeven"
          aria-expanded="false"
          aria-controls="panelsStayOpen-collapseSeven"
        >
          Amenities
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseSeven"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-amenities"
      >
        <div className="accordion-body">
          <ul className="d-md-flex align-items-center">
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="amenities1"
                    {...register("amenities.parking")}
                  />
                </div>
                <label className="form-check-label" htmlFor="amenities1">
                  Parking
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="amenities2"
                    {...register("amenities.drinkingWater")}
                  />
                </div>
                <label className="form-check-label" htmlFor="amenities2">
                  Drinking Water
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="amenities3"
                    {...register("amenities.firstAid")}
                  />
                </div>
                <label className="form-check-label" htmlFor="amenities3">
                  First Aid
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="amenities4"
                    {...register("amenities.changeRoom")}
                  />
                </div>
                <label className="form-check-label" htmlFor="amenities4">
                  Change Room
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="amenities5"
                    {...register("amenities.shower")}
                  />
                </div>
                <label className="form-check-label" htmlFor="amenities5">
                  Shower
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesDetails;
