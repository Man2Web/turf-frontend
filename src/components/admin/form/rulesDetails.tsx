import React, { useState } from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

const RulesDetails = ({
  errors,
  control,
  rules,
  setRules,
}: {
  errors: any;
  control: any;
  rules: any;
  setRules: any;
}) => {
  const addRule = (rule: string) => {
    setRules((prev: any) => [...prev, rule]);
  };
  const removeRule = (index: number) => {
    setRules((prev: any[]) =>
      prev.filter((_, idx) => {
        return idx !== index;
      })
    );
  };
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
                {rules?.map((rule: string, index: number) => (
                  <div key={index} className="d-flex gap-1 align-items-center">
                    <i className="feather-alert-octagon text-danger" />
                    <p className="m-0">{rule}</p>
                    <button
                      className="btn btn-red"
                      type="button"
                      onClick={() => removeRule(index)}
                    >
                      <i className="feather-trash" />
                    </button>
                  </div>
                ))}
                <div className="col-12">
                  <div className="input-space mb-0">
                    <label htmlFor="court-name" className="form-label"></label>
                    <Controller
                      control={control}
                      name="rulesOfVenue"
                      render={({ field }) => (
                        <div className="d-flex">
                          <input
                            {...field}
                            className="form-control"
                            id="venue-overview"
                            placeholder="Shoes not allowed"
                          />
                          <button
                            type="button"
                            onClick={() => addRule(field.value)}
                            className="btn btn-red"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    />
                  </div>
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
    </div>
  );
};

export default RulesDetails;
