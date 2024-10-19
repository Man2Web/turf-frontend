import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

const RulesDetails = ({ errors, control }: { errors: any; control: any }) => {
  return (
    <div className="accordion-item mb-4" id="rules">
      <h4 className="accordion-header" id="panelsStayOpen-rules">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseSix"
          aria-expanded="false"
          aria-controls="panelsStayOpen-collapseSix"
        >
          Venue Rules
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseSix"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-rules"
      >
        <div className="accordion-body">
          <div className="row">
            <div className="col-12">
              <div className="">
                <label htmlFor="rulesOfVenue" className="form-label">
                  Rules of Venue <span>*</span>
                </label>
                {/* Controller for ReactQuill */}
                <Controller
                  name="rulesOfVenue"
                  control={control}
                  rules={{ required: "Venue Rules are required" }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      placeholder="Enter Rules"
                      modules={{
                        toolbar: [[{ list: "bullet" }]],
                      }}
                      className="form-control"
                    />
                  )}
                />
                {/* Error message */}
                {errors.rulesOfVenue && (
                  <p className="text-danger">
                    {errors.rulesOfVenue.message as string}
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

export default RulesDetails;
