import React from "react";

const IncludesDetails = ({ register }: { register: any }) => {
  return (
    <div className="accordion-item mb-4" id="includes">
      <h4 className="accordion-header" id="panelsStayOpen-includes">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseFive"
          aria-expanded="false"
          aria-controls="panelsStayOpen-collapseFive"
        >
          Includes
        </button>
      </h4>
      <div
        id="panelsStayOpen-collapseFive"
        className="accordion-collapse collapse show"
        aria-labelledby="panelsStayOpen-includes"
      >
        <div className="accordion-body">
          <ul className="clearfix">
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("courtIncludes.badmintonRacket")}
                    id="includes1"
                  />
                </div>
                <label className="form-check-label" htmlFor="includes1">
                  Badminton Racket Unlimited
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("courtIncludes.bats")}
                    id="includes2"
                  />
                </div>
                <label className="form-check-label" htmlFor="includes2">
                  Bats
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("courtIncludes.hittingMachines")}
                    id="includes3"
                  />
                </div>
                <label className="form-check-label" htmlFor="includes3">
                  Hitting Machines
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("courtIncludes.multipleCourts")}
                    id="includes4"
                  />
                </div>
                <label className="form-check-label" htmlFor="includes4">
                  Multiple Courts
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("courtIncludes.sparePlayers")}
                    id="includes5"
                  />
                </div>
                <label className="form-check-label" htmlFor="includes5">
                  Spare Players
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("courtIncludes.instantRacket")}
                    id="includes6"
                  />
                </div>
                <label className="form-check-label" htmlFor="includes6">
                  Instant Racket
                </label>
              </div>
            </li>
            <li>
              <div className="form-check d-flex justify-content-start align-items-center">
                <div className="d-inline-block">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("courtIncludes.greenTurfs")}
                    id="includes7"
                  />
                </div>
                <label className="form-check-label" htmlFor="includes7">
                  Green Turfs
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IncludesDetails;
