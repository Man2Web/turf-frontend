import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import Loader from "../../components/common/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import { FilterForm } from "../../components/common/filters-form";
import LocationDataModal from "../../components/common/location-data-modal";
import GridCard from "../../components/common/courts-list/grid-card";
import ListCard from "../../components/common/courts-list/list-card";
import { UserLocationContext } from "../..";
import ButtonLoader from "../../components/common/button-loader";

const sortOptions = [
  { name: "Relevance" },
  { name: "Price Low - High" },
  { name: "Price High - Low" },
  { name: "Featured" },
];

const ListingList = () => {
  const [viewMode, setViewMode] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [courtsData, setCourtsData] = useState<CourtsData[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<any>(sortOptions[0].name);
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(18);
  const [offset, setOffset] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [paginationData, setPaginationData] = useState<PageinationType>();
  const [uniqueCourtsData, setuniqueCourtsData] = useState<CourtsData[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const userId =
    localStorage.getItem("adminId") || localStorage.getItem("userId");

  const pageLoadingRef = useRef(null);

  const locationContext = useContext(UserLocationContext);

  if (!locationContext) {
    throw new Error("Error getting user location");
  }

  const { userLocationInContext, setUserLocationInContext } = locationContext;

  useEffect(() => {
    if (userLocationInContext) {
      SubmitHandler();
    }
  }, [userLocationInContext, offset, userWishlist]);

  useEffect(() => {
    if (userId) {
      getUserWishList();
    }
    setCourtsData((prevData) => {
      const sortedData = [...prevData];
      const sortOption = selectedSort.name;
      if (sortOption === "Price Low - High") {
        sortedData.sort(
          (a: CourtsData, b: CourtsData) =>
            a.courtPriceData.starting_price - b.courtPriceData.starting_price
        );
        // (sortedData);
      } else if (sortOption === "Price High - Low") {
        sortedData.sort(
          (a: CourtsData, b: CourtsData) =>
            b.courtPriceData.starting_price - a.courtPriceData.starting_price
        );
      } else if (sortOption === "Featured") {
        sortedData.sort((a: CourtsData, b: CourtsData) =>
          b.featured === true ? 1 : -1
        );
      }
      return sortedData;
    });
  }, [selectedSort]);

  const SubmitHandler = async () => {
    // const userLocationInContext = localStorage.getItem("userLocationInContext");
    // const { userLocationInContext } = data;
    userLocationInContext && setUserLocationInContext(userLocationInContext);

    try {
      setLoading(true);
      setPageLoading(true);
      // Fetch all courts based on user location
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/fetch/all/${userLocationInContext}`,
        {
          params: {
            limit,
            offset,
          },
        }
      );
      console.log(response.data);
      setCourtsData((prevData) => {
        const combinedData = [...prevData, ...response.data.courtsData];

        // Create a map to store courts by their unique `id`
        const courtsMap = new Map();
        combinedData.forEach((court) => courtsMap.set(court.id, court));

        // Return only unique courts based on their `id`
        return Array.from(courtsMap.values());
      });

      setPaginationData(response.data.pagination);
      setLastPage(response.data.pagination.totalCount / limit);

      // Filter the courtsData to remove duplicates based on court.id
      const uniqueCourtsData = response.data.courtsData.filter(
        (court: any, index: number, self: any[]) =>
          index === self.findIndex((c) => c.id === court.id) // Keep only the first occurrence of each court.id
      );
      console.log("UNQC:", uniqueCourtsData);
      setuniqueCourtsData(uniqueCourtsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };
  // console.log("CourtsData:", courtsData);
  // console.log("uniQC:", uniqueCourtsData);
  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = courtsData.map(async (court: any) => {
        try {
          const image = court.courtImagesData[0];
          const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${court.user_id}/${court.id}/${image.image_url}`;
          const getImage = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });
          const blob = new Blob([getImage.data], { type: "image/webp" });
          const imgSrc = URL.createObjectURL(blob);
          return imgSrc;
        } catch (error) {
          console.error(
            `Error fetching image for court ${court.court_name}:`,
            error
          );
          return null;
        }
      });

      const resolvedImages = await Promise.all(imagePromises);

      // Replace the images state instead of appending
      setImages(resolvedImages.filter(Boolean) as string[]);
    };

    fetchImages();
  }, [courtsData]);

  // console.log("images:", images);

  const updateWishList = async (wishList: number[]) => {
    if (userId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}user/wishlist/update/${userId}`,
          { wishList }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
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
      console.error(error);
    }
  };

  const handleInfIniteScroll = () => {
    const documentTotalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTopLeft = document.documentElement.scrollTop;
    if (windowHeight + scrollTopLeft >= documentTotalHeight - 200) {
      // (paginationData);
      if (paginationData && lastPage > paginationData.currentPage) {
        handlePagination(paginationData.nextOffset);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfIniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfIniteScroll);
    };
  }, [paginationData]);

  const handlePagination = (movement: number) => {
    setOffset(movement);
  };

  return (
    <>
      {!userLocationInContext && <LocationDataModal />}
      {courtsData.length === 0 && loading && <Loader />}
      {userLocationInContext && courtsData.length > 0 && (
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
                            <p>
                              Showing{" "}
                              <span>{Number(paginationData?.totalCount)}</span>{" "}
                              Locations in{" "}
                              <span className="text-capitalize">
                                {userLocationInContext}
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
                            <div className="grid-listview">
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
              {/* Listing Content Group*/}
              <div className="listing-list-sidebar">
                <div className="row">
                  {/* Form */}
                  {showFilters && (
                    <FilterForm
                      setFiltersLoading={setFiltersLoading}
                      setImages={setImages}
                      setCourtsData={setCourtsData}
                      userLocation={userLocationInContext}
                      setUserLocation={setUserLocationInContext}
                      limit={limit}
                      offset={offset}
                    />
                  )}
                  <div className={`${showFilters ? "col-lg-8" : "col-lg-12"}`}>
                    {/* Listing Content */}
                    <div className="row justify-content-start">
                      {/* Grid View */}
                      {viewMode === 0 &&
                        !filtersLoading &&
                        courtsData?.map((court: CourtsData, idx) => (
                          <GridCard
                            showFilters={showFilters}
                            key={idx}
                            court={court}
                            images={images}
                            idx={idx}
                            userWishlist={userWishlist}
                            setUserWishlist={setUserWishlist}
                            updateWishList={updateWishList}
                          />
                        ))}

                      {/* List View */}
                      {viewMode === 1 &&
                        !filtersLoading &&
                        courtsData?.map((court: CourtsData, idx) => (
                          <ListCard
                            key={idx}
                            court={court}
                            images={images}
                            idx={idx}
                            userWishlist={userWishlist}
                            setUserWishlist={setUserWishlist}
                            updateWishList={updateWishList}
                          />
                        ))}

                      {/* Loader Animation */}
                      {filtersLoading && <Loader />}

                      {courtsData.length === 0 && !filtersLoading && (
                        <h1>No Data found</h1>
                      )}
                    </div>
                    {/* /Listing Content */}
                  </div>
                  {/* Pagination */}
                  {pageLoading && (
                    <div className="w-full d-flex justify-content-center">
                      <ButtonLoader />
                    </div>
                  )}
                  {/* /Pagination */}
                </div>
              </div>
              {/* Listing Content Group*/}
            </div>
          </div>
          {/* /Page Content */}
        </div>
      )}
    </>
  );
};

export default ListingList;
