import React from "react";

const LocationDetails = ({
  errors,
  register,
}: {
  errors: any;
  register: any;
}) => {
  return (
    <div className="accordion-item" id="location">
      <h4 className="accordion-header" id="panelsStayOpen-location">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseNine"
          aria-expanded="false"
          aria-controls="panelsStayOpen-collapseNine"
        >
          Location
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseNine"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-location"
      >
        <div className="accordion-body">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  readOnly
                  {...register("location.country", {
                    required: "Country is required",
                  })}
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Enter Country"
                  defaultValue="India"
                />
              </div>
              <p className="text-danger">
                {errors.location?.country?.message as string}
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  {...register("location.city", {
                    required: "City is required",
                  })}
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter City"
                />
              </div>
              <p className="text-danger">
                {errors.location?.city?.message as string}
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="phone-number" className="form-label">
                  Phone Number <span>*</span>
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // Regular expression for 10 digit phone numbers
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  type="text"
                  className="form-control"
                  id="phone-number"
                  placeholder="Enter Phone Number"
                />
              </div>
              <p className="text-danger">
                {errors.phoneNumber?.message as string}
              </p>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="email" className="form-label">
                  Email <span>*</span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for a valid email address
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
              <p className="text-danger">{errors.email?.message as string}</p>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="street-address" className="form-label">
                  Google Maps Location Link <span>*</span>
                </label>
                <input
                  {...register("location.locationLink", {
                    required: "Google Maps Link is required",
                  })}
                  type="text"
                  className="form-control"
                  id="street-address"
                  placeholder="Enter Link"
                />
              </div>
              <p className="text-danger">
                {errors.location?.locationLink?.message as string}
              </p>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="google-maps-link" className="form-label">
                  Google Maps Embed Link <span>*</span>
                </label>
                <input
                  {...register("location.embedLink", {
                    required: "Google Maps Link is required",
                  })}
                  type="text"
                  className="form-control"
                  id="google-maps-link"
                  placeholder="Enter Google Maps Embed Link"
                />
              </div>
              <p className="text-danger">
                {errors.location?.locationLink?.message as string}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
