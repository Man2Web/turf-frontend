import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Controller, useForm } from "react-hook-form";
import { sportValues } from "../../../utils/data-list/sportsData";
import { citiesList } from "../../../utils/data-list/citiesList";

export const FilterForm = ({
  filteringOptions,
  setFilteringOptions,
  userLocation,
  setUserLocation,
}: {
  filteringOptions: AdvancedSearchForm | undefined;
  setFilteringOptions: any;
  userLocation: any;
  setUserLocation: any;
}) => {
  const { register, handleSubmit, reset, control } =
    useForm<AdvancedSearchForm>();
  const [locations, setLocations] = useState<string[]>([]);
  const [updatedUserLocation, setUpdatedUserLocation] = useState(
    localStorage.getItem("userLocation")
  );

  useEffect(() => {
    const getCitiesData = async () => {
      const data = await citiesList();
      setLocations(data);
    };
    getCitiesData();
  }, []);

  useEffect(() => {
    if (updatedUserLocation) {
      setUserLocation(updatedUserLocation);
      localStorage.setItem("userLocation", updatedUserLocation);
    }
  }, [updatedUserLocation]);

  const onSubmit = async (data: AdvancedSearchForm) => {
    setFilteringOptions(data);
  };

  return (
    <div className="col-lg-4 theiaStickySidebar">
      <div className="stickybar">
        <div className="listing-filter-group listing-item">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            autoComplete="off"
            className="listing-content"
          >
            {/* Name */}
            <div className="sidebar-heading">
              <h3>Filters</h3>
              {filteringOptions && (
                <p>
                  <Link
                    onClick={() => {
                      reset();
                      setFilteringOptions();
                    }}
                    to="#"
                  >
                    Clear Filters
                  </Link>
                </p>
              )}
            </div>
            <div className="listing-search">
              <div className="form-custom">
                <input
                  {...register("courtName")}
                  type="text"
                  className="form-control"
                  id="member_search1"
                  placeholder="Court Name"
                />
                <button className="btn">
                  <span>
                    <i className="feather-search" />
                  </span>
                </button>
              </div>
            </div>
            {/* /Name */}
            {/* Location */}
            <div className="accordion" id="accordionMain2">
              <div className="card-header-new" id="headingTwo">
                <h5 className="filter-title">
                  <Link
                    to="#"
                    className="w-100 collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Location
                    <span className="accordion-arrow">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h5>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample2"
              >
                <div className="card-body-chat">
                  <div className="sorting-select z-3">
                    <span>
                      <i className="feather-map-pin" />
                    </span>
                    <Controller
                      name="userLocation"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          filter
                          value={userLocation}
                          onChange={(e) => {
                            field.onChange(e.value);
                            setUpdatedUserLocation(e.value);
                          }}
                          options={locations}
                          optionLabel="name"
                          placeholder="Select Location"
                          className="select-bg w-100 list-sidebar-select"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Location */}
            {/* Sport Type */}
            <div className="accordion" id="accordionMain6">
              <div className="card-header-new" id="headingSix">
                <h5 className="filter-title">
                  <Link
                    to="#"
                    className="w-100 collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="true"
                    aria-controls="collapseSix"
                  >
                    Sport
                    <span className="accordion-arrow">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h5>
              </div>
              <div
                id="collapseSix"
                className="collapse"
                aria-labelledby="headingSix"
                data-bs-parent="#accordionExample2"
              >
                <div className="card-body-chat">
                  <div className="sorting-select">
                    <span>
                      <i className="feather-filter" />
                    </span>
                    <Controller
                      name="sportType"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          options={sportValues}
                          optionLabel="name"
                          placeholder="Select Sport"
                          className="select-bg w-100 list-sidebar-select"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Sport Type */}
            {/* Category */}
            <div className="accordion" id="accordionMain4">
              <div className="card-header-new" id="headingFour">
                <h5 className="filter-title">
                  <Link
                    to="#"
                    className="w-100 collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="true"
                    aria-controls="collapseFour"
                  >
                    Price Range
                    <span className="accordion-arrow">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h5>
              </div>
              <div
                id="collapseFour"
                className="collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample4"
              >
                <div className="card-body-chat range-price">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-custom">
                        <input
                          {...register("minPrice")}
                          type="text"
                          className="form-control"
                          placeholder="Enter Min Price"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-custom">
                        <input
                          {...register("maxPrice")}
                          type="text"
                          className="form-control"
                          placeholder="Enter Max Price"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Category */}
            {/* Guests */}
            <div className="accordion" id="accordionMain5">
              <div className="card-header-new" id="headingFive">
                <h5 className="filter-title">
                  <Link
                    to="#"
                    className="w-100 collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="true"
                    aria-controls="collapseFive"
                  >
                    Guests
                    <span className="accordion-arrow">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h5>
              </div>
              <div
                id="collapseFive"
                className="collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample5"
              >
                <div className="card-body-chat range-price">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-custom">
                        <input
                          {...register("minGuest")}
                          type="text"
                          className="form-control"
                          placeholder="Min Guest"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-custom">
                        <input
                          {...register("maxGuest")}
                          type="text"
                          className="form-control"
                          placeholder="Max Guest"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Guests */}
            <button type="submit" className="search-btn btn w-100 btn-primary">
              <span>
                <i className="feather-search me-2" />
              </span>
              Apply Filters
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
