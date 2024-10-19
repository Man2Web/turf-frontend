import React from "react";

const PricingDetails = ({
  errors,
  control,
  register,
}: {
  errors: any;
  control: any;
  register: any;
}) => {
  return (
    <div className="accordion-item mb-4" id="venue-price">
      <h4 className="accordion-header" id="panelsStayOpen-venue-price">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseTwo"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseTwo"
        >
          Venue Price <span>(INR)</span>
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseTwo"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-venue-price"
      >
        <div className="accordion-body">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="starting-price" className="form-label">
                  Starting Price (Per Hour)
                </label>
                <input
                  {...register("venuePrice.startingPrice", {
                    required: "Venue Price is required",
                  })}
                  type="text"
                  className="form-control"
                  id="starting-price"
                  placeholder="Enter Price"
                />
              </div>
              <p className="text-danger">
                {errors.venuePrice?.startingPrice?.message as string}
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-space">
                <label htmlFor="name" className="form-label">
                  Max Guests
                </label>
                <input
                  {...register("venuePrice.maxGuests", {
                    required: "Max Guests is required",
                  })}
                  type="text"
                  className="form-control"
                  id="max-guests"
                  placeholder="Enter Max Number of Guests"
                />
              </div>
              <p className="text-danger">
                {errors.venuePrice?.maxGuests?.message as string}
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-space mb-0">
                <label htmlFor="additional-guests" className="form-label">
                  Additional Guests
                </label>
                <input
                  {...register("venuePrice.additionalGuests", {
                    required: "Additional Guests is required",
                  })}
                  type="text"
                  className="form-control"
                  id="additional-guests"
                  placeholder="No Additional Guests"
                />
              </div>
              <p className="text-danger">
                {errors.venuePrice?.additionalGuests?.message as string}
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-space mb-0">
                <label htmlFor="name" className="form-label">
                  Price of Extra Guest (Per Hour)
                </label>
                <input
                  {...register("venuePrice.priceOfAdditionalGuests", {
                    required: "Additional Guests Price is required",
                  })}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Price of Extra Guests"
                />
              </div>
              <p className="text-danger">
                {errors.venuePrice?.priceOfAdditionalGuests?.message as string}
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-space mb-0">
                <label htmlFor="advancePay" className="form-label">
                  Advance Payment
                </label>
                <input
                  {...register("venuePrice.advancePay", {
                    required: "Advance Payment is required",
                    min: {
                      value: 25,
                      message: "Advance Payment must be at least 25",
                    },
                    max: {
                      value: 100,
                      message: "Advance Payment must be at most 100",
                    },
                  })}
                  type="number" // Using number type for better control over min/max values
                  className="form-control"
                  id="advancePay"
                  placeholder="Enter Advance Payment"
                  defaultValue={25} // Setting the default value to 25
                />
              </div>
              <p className="text-danger">
                {errors.venuePrice?.advancePay?.message as string}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
