import React from "react";

const IncludesDetails = ({
  register,
  includes,
  setIncludes,
}: {
  register: any;
  includes: any;
  setIncludes: any;
}) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    if (event.target.checked) {
      // Add item to the array if it's checked
      setIncludes((prevIncludes: any) => [...prevIncludes, item]);
    } else {
      // Remove item from the array if it's unchecked
      setIncludes((prevIncludes: any[]) =>
        prevIncludes.filter((i: string) => i !== item)
      );
    }
  };

  const includesData = [
    {
      key: "badmintonUnlimited",
      label: "Badminton Racket Unlimited",
      id: "includes1",
    },
    { key: "bats", label: "Bats", id: "includes2" },
    {
      key: "hittingMachines",
      label: "Hitting Machines",
      id: "includes3",
    },
    {
      key: "multipleCourts",
      label: "Multiple Courts",
      id: "includes4",
    },
    { key: "sparePlayers", label: "Spare Players", id: "includes5" },
    {
      key: "instantRacket",
      label: "Instant Racket",
      id: "includes6",
    },
    { key: "greenTurfs", label: "Green Turfs", id: "includes7" },
  ];

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
            {includesData.map((item) => (
              <li key={item.key}>
                <div className="form-check d-flex justify-content-start align-items-center">
                  <div className="d-inline-block">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={item.id}
                      {...register(`courtIncludes.${item.key}`)}
                      checked={includes.includes(item.key)}
                      onChange={(event) =>
                        handleCheckboxChange(event, item.key)
                      }
                    />
                  </div>
                  <label className="form-check-label" htmlFor={item.id}>
                    {item.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IncludesDetails;
