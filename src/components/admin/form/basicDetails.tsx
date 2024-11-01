import React from "react";
import { Controller } from "react-hook-form";
import { courtOptions } from "../../../utils/court-utils/courtOptions";
import { Dropdown } from "primereact/dropdown";

const BasicDetails = ({
  errors,
  control,
  register,
}: {
  errors: any;
  control: any;
  register: any;
}) => {
  return (
    <div className="accordion-item mb-4" id="basic-info">
      <h4 className="accordion-header" id="panelsStayOpen-basic-info">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >
          Basic Info
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseOne"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-basic-info"
      >
        <div className="accordion-body">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="input-space mb-0">
                <label htmlFor="court-name" className="form-label">
                  Court Name <span>*</span>
                </label>
                <input
                  {...register("courtName", {
                    required: "Court Name is required",
                  })}
                  type="text"
                  className="form-control"
                  id="court-name"
                  placeholder="Enter Court Name"
                />
              </div>
              <p className="text-danger">
                {errors.courtName?.message as string}
              </p>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-space mb-0">
                <label className="form-label">
                  Court Type <span>*</span>
                </label>
                <Controller
                  name="courtType"
                  control={control}
                  rules={{ required: "Court Type is required" }}
                  render={({ field }) => (
                    <Dropdown
                      value={field.value} // Since courtOptions is now an array of strings
                      onChange={(e) => field.onChange(e.value)} // Directly update the selected value
                      options={courtOptions} // Pass the array of strings
                      placeholder="Select Court Type"
                      className="select-bg w-100"
                    />
                  )}
                />
              </div>
              <p className="text-danger">
                {errors.courtType?.message as string}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
