import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

const OverviewDetails = ({
  errors,
  control,
}: {
  errors: any;
  control: any;
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
              <div className="">
                <label htmlFor="venueOverview" className="form-label">
                  Overview of Venue <span>*</span>
                </label>
                {/* Controller for ReactQuill */}
                <Controller
                  name="venueOverview"
                  control={control}
                  rules={{
                    required: "Venue Overview is required",
                  }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      placeholder="Enter Overview"
                      modules={{
                        toolbar: [
                          [{ header: [false] }],
                          ["bold", "italic", "underline", "strike"],
                        ],
                      }}
                      className="form-control"
                    />
                  )}
                />
                {/* Error message */}
                {errors.venueOverview && (
                  <p className="text-danger">
                    {errors.venueOverview.message as string}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDetails;
