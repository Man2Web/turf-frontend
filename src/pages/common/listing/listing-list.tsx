import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import Loader from "../../../components/common/loader/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { FilterForm } from "../../../components/common/courts-list/filters-form";
import LocationDataModal from "../../../components/common/modal/location-data-modal";
import GridCard from "../../../components/common/courts-list/grid-card";
import ListCard from "../../../components/common/courts-list/list-card";
import { useAppContext } from "../../../context/app-context";
import { fetchCourtsByLocation } from "../../../utils/court-utils/fetchCourtsByLocation";

const sortOptions = [
  { name: "Relevance" },
  { name: "Price Low - High" },
  { name: "Price High - Low" },
  { name: "Featured" },
];

const ListingList = () => {
  const [viewMode, setViewMode] = useState<number>(0);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<any>(sortOptions[0].name);
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const userId =
    localStorage.getItem("adminId") || localStorage.getItem("userId");
  const { sportType } = useParams();
  const { userLocation, setUserLocation, setLoading } = useAppContext();

  useEffect(() => {
    if (userLocation) {
      // SubmitHandler();
    }
  }, [offset, userWishlist]);

  useEffect(() => {
    if (userId) {
      getUserWishList();
    }
    // setCourtsData((prevData) => {
    //   const sortedData = [...prevData];
    //   const sortOption = selectedSort.name;
    //   if (sortOption === "Price Low - High") {
    //     sortedData.sort(
    //       (a: CourtsData, b: CourtsData) =>
    //         Number(a.pricing.starting_price) - Number(b.pricing.starting_price)
    //     );
    //     // (sortedData);
    //   } else if (sortOption === "Price High - Low") {
    //     sortedData.sort(
    //       (a: CourtsData, b: CourtsData) =>
    //         Number(b.pricing.starting_price) - Number(a.pricing.starting_price)
    //     );
    //   } else if (sortOption === "Featured") {
    //     sortedData.sort((a: CourtsData, b: CourtsData) =>
    //       b.featured === true ? 1 : -1
    //     );
    //   }
    //   return sortedData;
    // });
  }, [selectedSort]);

  // const SubmitHandler = async () => {
  //   userLocation && setUserLocation(userLocation);

  //   try {
  //     setLoading(true);
  //     setPageLoading(true);
  //     // Fetch all courts based on user location
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}court/fetch/all/${userLocation}`,
  //       {
  //         params: {
  //           limit,
  //           offset,
  //           sportType: sportType || null,
  //         },
  //       }
  //     );
  //     setCourtsData((prevData) => {
  //       const combinedData = [...prevData, ...response.data.updatedCourtsData];

  //       // Create a map to store courts by their unique `id`
  //       const courtsMap = new Map();
  //       combinedData.forEach((court) => courtsMap.set(court.court_id, court));

  //       // Return only unique courts based on their `id`
  //       return Array.from(courtsMap.values());
  //     });

  //     setPaginationData(response.data.pagination);
  //     setLastPage(response.data.pagination.totalCount / limit);

  //     // Filter the courtsData to remove duplicates based on court.id
  //     const uniqueCourtsData = response.data.updatedCourtsData.filter(
  //       (court: any, index: number, self: any[]) =>
  //         index === self.findIndex((c) => c.id === court.id) // Keep only the first occurrence of each court.id
  //     );
  //     setuniqueCourtsData(uniqueCourtsData);
  //   } catch (error) {
  //     // console.error(error);
  //   } finally {
  //     setLoading(false);
  //     setPageLoading(false);
  //   }
  // };

  const { courtsData, totalCount } = fetchCourtsByLocation(
    userLocation,
    offset
  );

  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          courtsData.length < Number(totalCount)
        ) {
          setOffset((prevData) => prevData + 20);
        }
      },
      { threshold: 0.5 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, totalCount, courtsData]);

  const updateWishList = async (wishList: number[]) => {
    if (userId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}user/wishlist/update/${userId}`,
          { wishList }
        );
      } catch (error) {
        // console.error(error);
        toast.error("Error Updating Wishlist");
      }
    }
  };

  const getUserWishList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/get/${userId}`
      );
      setUserWishlist(response.data.user.wishlist);
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <>
      {!userLocation && <LocationDataModal />}
      {userLocation && (
        <div>
          {/* Page Content */}
          <div className="content listing-page listing-list-page">
            <div className="container">
              {/* Sort By */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="sortby-section">
                    <div className="sorting-info">
                      <div className="row d-flex align-items-center">
                        <div className="col-xl-4 col-lg-3 col-sm-12 col-12">
                          <div className="count-search">
                            <p className="font-bold">
                              Showing <span>{Number(totalCount)}</span>{" "}
                              Locations in{" "}
                              <span className="text-capitalize">
                                {userLocation}
                              </span>
                            </p>
                            <Link
                              to="#"
                              style={{ fontSize: "12px" }}
                              className="text-small text-success"
                              onClick={() => setShowFilters(!showFilters)}
                            >
                              {showFilters ? "Hide Filters" : "Show Filters"}
                            </Link>
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                          <div className="sortby-filter-group">
                            <div className="grid-listview d-none d-md-block">
                              <ul className="nav">
                                <li>
                                  <span>View as</span>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    onClick={() => setViewMode(0)}
                                    className={`${viewMode === 0 ? "active" : ""}`}
                                  >
                                    <ImageWithBasePath
                                      src="assets/img/icons/sort-01.svg"
                                      alt="Icon"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="#"
                                    onClick={() => setViewMode(1)}
                                    className={`${viewMode === 1 ? "active" : ""}`}
                                  >
                                    <ImageWithBasePath
                                      src="assets/img/icons/sort-02.svg"
                                      alt="Icon"
                                    />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div className="sortbyset">
                              <span className="sortbytitle">Sort By</span>
                              <div className="sorting-select">
                                <Dropdown
                                  value={selectedSort}
                                  onChange={(e) => setSelectedSort(e.value)}
                                  options={sortOptions}
                                  optionLabel="name"
                                  placeholder="Relevance"
                                  className="select custom-select-list"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sort By */}
              <div className="listing-list-sidebar">
                <div className="row">
                  {/* Form */}
                  {showFilters && (
                    <FilterForm
                      setFiltersLoading={setFiltersLoading}
                      // setCourtsData={setCourtsData}
                      userLocation={userLocation}
                      setUserLocation={setUserLocation}
                      offset={offset}
                    />
                  )}
                  <div className={`${showFilters ? "col-lg-8" : "col-lg-12"}`}>
                    {/* Listing Content */}
                    <div className="row justify-content-start">
                      {/* Grid View */}
                      {viewMode === 0 &&
                        !filtersLoading &&
                        courtsData.length > 0 &&
                        courtsData?.map((court: CourtsData, idx) => (
                          <div
                            key={idx}
                            className={`${showFilters ? "col-lg-6" : "col-lg-4"} col-12 col-md-6 mb-4`}
                          >
                            <GridCard
                              court={court}
                              userWishlist={userWishlist}
                              setUserWishlist={setUserWishlist}
                              updateWishList={updateWishList}
                            />
                          </div>
                        ))}

                      {/* List View */}
                      {viewMode === 1 &&
                        !filtersLoading &&
                        courtsData?.map((court: CourtsData, idx) => (
                          <div key={idx} className="col-lg-12 col-md-12 mb-2">
                            <ListCard
                              court={court}
                              userWishlist={userWishlist}
                              setUserWishlist={setUserWishlist}
                              updateWishList={updateWishList}
                            />
                          </div>
                        ))}

                      <div ref={observerTarget} />

                      {/* If not courts found show this */}
                      {courtsData.length === 0 && !filtersLoading && (
                        <h1>No Data found</h1>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingList;
