import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

const OverviewDetails = ({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) => {
  return (
    <div className="accordion-item mb-4" id="overview">
      <h4 className="accordion-header" id="panelsStayOpen-overview">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseFour"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseFour"
        >
          Venue Overview
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseFour"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-overview"
      >
        <div className="accordion-body">
          <div className="row">
            <div className="col-12">
              <div className="input-space mb-0">
                <label htmlFor="court-name" className="form-label">
                  Court Overview <span>*</span>
                </label>
                <textarea
                  {...register("venueOverview", {
                    required: "Court Overview is required",
                    minLength: {
                      value: 20,
                      message: "Overview must be at least 20 characters long",
                    },
                    maxLength: {
                      value: 500,
                      message: "Overview cannot exceed 500 characters",
                    },
                  })}
                  className="form-control"
                  id="venue-overview"
                  placeholder="Provide a brief overview of the court"
                  rows={4} // Sets the visible height of the textarea
                />
              </div>
              <p className="text-danger">
                {errors.venueOverview?.message as string}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDetails;
