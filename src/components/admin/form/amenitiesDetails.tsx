import React from "react";

const AmenitiesDetails = ({
  register,
  amenities,
  setAmenities,
}: {
  register: any;
  amenities: any; // Specify amenities as an array of strings
  setAmenities: any; // Set state with an array of strings
}) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    if (event.target.checked) {
      // Add item to the array if it's checked
      setAmenities((prevAmenities: any) => [...prevAmenities, item]);
    } else {
      // Remove item from the array if it's unchecked
      setAmenities((prevAmenities: any) =>
        prevAmenities.filter((i: string) => i !== item)
      );
    }
  };

  const amenitiesData = [
    { key: "parking", label: "Parking", id: "amenities1" },
    {
      key: "drinkingWater",
      label: "Drinking Water",
      id: "amenities2",
    },
    { key: "firstAid", label: "First Aid", id: "amenities3" },
    { key: "changeRoom", label: "Change Room", id: "amenities4" },
    { key: "shower", label: "Shower", id: "amenities5" },
  ];

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
            {amenitiesData.map((item) => (
              <li key={item.key}>
                <div className="form-check d-flex justify-content-start align-items-center">
                  <div className="d-inline-block">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={item.id}
                      {...register(`amenities.${item.key}`)} // Register the checkbox with the form
                      checked={amenities.includes(item.key)} // Check if the item is included
                      onChange={(event) =>
                        handleCheckboxChange(event, item.key)
                      } // Handle the change
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

export default AmenitiesDetails;
