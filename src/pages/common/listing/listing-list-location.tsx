import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { Dropdown } from "primereact/dropdown";
import { all_routes } from "../../../router/all_routes";
import Loader from "../../../components/common/loader/Loader";
import { citiesList } from "../../../utils/data-list/citiesList";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { arrayBuffer } from "stream/consumers";

type Inputs = {
  userLocation: string;
};

const sortOptions = [
  { name: "Relevance" },
  { name: "Price Low - High" },
  { name: "Price High - Low" },
  { name: "Featured" },
];

const ListingList = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(8).fill(false));
  const [userLocation, setUserLocation] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [courtsData, setCourtsData] = useState<CourtsData[]>([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState<string[]>();
  const [selectedSort, setSelectedSort] = useState<any>(sortOptions[0].name);

  useEffect(() => {
    const getCitiesData = async () => {
      const fetchedLocations = await citiesList();
      setLocations(fetchedLocations);
    };
    getCitiesData();
    setCourtsData((prevData) => {
      const sortedData = [...prevData];
      const sortOption = selectedSort.name;
      if (sortOption === "Price Low - High") {
        sortedData.sort(
          (a: CourtsData, b: CourtsData) =>
            Number(a.pricing.starting_price) - Number(b.pricing.starting_price)
        );
        console.log(sortedData);
      } else if (sortOption === "Price High - Low") {
        sortedData.sort(
          (a: CourtsData, b: CourtsData) =>
            Number(b.pricing.starting_price) - Number(a.pricing.starting_price)
        );
      } else if (sortOption === "Featured") {
        sortedData.sort((a: CourtsData, b: CourtsData) =>
          b.featured === true ? 1 : -1
        );
      }
      return sortedData;
    });
  }, [selectedSort]);

  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  const SubmitHandler = async (data: Inputs) => {
    const { userLocation } = data;
    setUserLocation(userLocation);

    try {
      setLoading(true);

      // Fetch all courts based on user location
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/fetch/all/${userLocation}`
      );

      console.log(response.data);
      setCourtsData(response.data.courtsData);

      // Fetch court images
      const imagePromises = response.data.courtsData.map(async (court: any) => {
        try {
          // Access the courtImagesData directly since it's an object
          const image = court.courtImagesData;
          const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${court.user_id}/${court.id}/${image.image_url}`;
          console.log(imageUrl);

          const getImage = await axios.get(imageUrl, {
            responseType: "arraybuffer", // Expect binary data
          });

          const blob = new Blob([getImage.data], { type: "image/webp" });
          const imgSrc = URL.createObjectURL(blob);
          return imgSrc; // Return the image source URL
        } catch (error) {
          console.error(
            `Error fetching image for court ${court.court_name}:`,
            error
          );
          return null; // Return null for failed images
        }
      });

      // Await all image promises
      const resolvedImages = await Promise.all(imagePromises);

      setImages(resolvedImages); // Flatten and filter out nulls
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(images);

  const LocationComponent = () => (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <form
        className="col-lg-4 col-md-4"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <label htmlFor="userLocation" className="form-label">
          Location
        </label>
        <Controller
          name="userLocation"
          control={control}
          rules={{ required: "Location required" }}
          render={({ field }) => (
            <Dropdown
              value={field.value} // Since courtOptions is now an array of strings
              onChange={(e) => field.onChange(e.value)} // Directly update the selected value
              options={locations} // Pass the array of strings
              placeholder="Select Location"
              className="select-bg w-100"
            />
          )}
        />
        {errors.userLocation && (
          <p className="text-danger">{errors.userLocation.message}</p>
        )}
        <button className="text-center mb-2 btn btn-secondary save-profile">
          Enter <i className="feather-arrow-right-circle ms-1" />
        </button>
      </form>
    </div>
  );

  return (
    <div>
      {loading && <Loader />}
      {!userLocation && <LocationComponent />}
      {courtsData.length > 0 && (
        <>
          {/* Breadcrumb */}
          <section className="breadcrumb breadcrumb-list mb-0">
            <span className="primary-right-round" />
            <div className="container">
              <h1 className="text-white">Courts List </h1>
              <ul>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>Courts List </li>
              </ul>
            </div>
          </section>
          {/* /Breadcrumb */}
          {/* Page Content */}
          <div className="content listing-list-page">
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
                              <span>{courtsData?.length}</span> venues are
                              listed
                            </p>
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-9 col-sm-12 col-12">
                          <div className="sortby-filter-group">
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
              {/* Listing Content */}
              <div className="row justify-content-center">
                {/* Featured Item */}
                {courtsData?.map((court: CourtsData, idx) => (
                  <div key={idx} className="col-lg-12 col-md-12">
                    <div className="featured-venues-item venue-list-item">
                      <div className="listing-item listing-item-grid">
                        <div className="listing-img">
                          <Link
                            to={`${routes.courtDetailsLink}/${court.court_id}`}
                          >
                            <img
                              style={{ maxHeight: "315px" }}
                              src={images && images[idx]}
                              alt="court img"
                            />
                          </Link>
                          <div className="fav-item-venues">
                            {court.featured && (
                              <span className="tag tag-blue">Featured</span>
                            )}
                            <h5 className="tag tag-primary">
                              ₹{court.pricing.starting_price}
                              <span>/hr</span>
                            </h5>
                          </div>
                        </div>
                        <div className="listing-content">
                          <div className="list-reviews">
                            <div className="d-flex align-items-center">
                              <span className="rating-bg">4.2</span>
                              <span>300 Reviews</span>
                            </div>
                            <Link
                              to="#"
                              key={1}
                              onClick={() => handleItemClick(1)}
                              className={`fav-icon ${selectedItems[1] ? "selected" : ""}`}
                            >
                              <i className="feather-heart" />
                            </Link>
                          </div>
                          <h3 className="listing-title">
                            <Link
                              to={`${routes.courtDetailsLink}/${court.court_id}`}
                            >
                              {court.court_name}
                            </Link>
                          </h3>
                          <div className="listing-details-group">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `${court.venue_overview?.substring(0, 300)} <span><a style="color: #097E52;" href="#">Read more</a></span>`,
                              }}
                            />
                            <ul className="listing-details-info">
                              <li>
                                <span>
                                  <i className="feather-map-pin" />
                                  {`${court.location.city.charAt(0).toLocaleUpperCase()}${court.location.city.slice(1)}, ${court.location.country}`}
                                </span>
                              </li>
                              <li>
                                <span>
                                  <i className="feather-calendar" />
                                  Next availablity :{" "}
                                  <span className="primary-text">
                                    21 May 2023
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="listing-button">
                            <div className="listing-venue-owner">
                              <Link className="navigation" to={""}>
                                <ImageWithBasePath
                                  src="assets/img/profiles/avatar-01.jpg"
                                  alt="User"
                                />
                                Mart Sublin
                              </Link>
                            </div>
                            <Link
                              to={`${routes.courtDetailsLink}/${court.court_id}/booking`}
                              className="user-book-now"
                            >
                              <span>
                                <i className="feather-calendar me-2" />
                              </span>
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* /Listing Content */}
            </div>
          </div>
          {/* /Page Content */}
        </>
      )}
    </div>
  );
};

export default ListingList;
