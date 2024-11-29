import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { all_routes } from "../../../router/all_routes";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../components/common/loader/Loader";
import BasicDetails from "../../../components/admin/form/basicDetails";
import PricingDetails from "../../../components/admin/form/pricingDetails";
import AvailabilityDetails from "../../../components/admin/form/availabilityDetails";
import OverviewDetails from "../../../components/admin/form/overviewDetails";
import IncludesDetails from "../../../components/admin/form/includesDetails";
import RulesDetails from "../../../components/admin/form/rulesDetails";
import AmenitiesDetails from "../../../components/admin/form/amenitiesDetails";
import GalleryDetails from "../../../components/admin/form/galleyDetails";
import LocationDetails from "../../../components/admin/form/locationDetails";
import { useAppContext } from "../../../context/app-context";

const AddCourt = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CourtFormDataType>();
  const navigate = useNavigate();
  const [images, setImages] = useState<any>([]);
  const [rules, setRules] = useState<string[]>([]);
  const [includes, setIncludes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<any>({
    monday: { duration: "0 hrs", startTime: null, endTime: null },
    tuesday: { duration: "0 hrs", startTime: null, endTime: null },
    wednesday: { duration: "0 hrs", startTime: null, endTime: null },
    thursday: { duration: "0 hrs", startTime: null, endTime: null },
    friday: { duration: "0 hrs", startTime: null, endTime: null },
    saturday: { duration: "0 hrs", startTime: null, endTime: null },
    sunday: { duration: "0 hrs", startTime: null, endTime: null },
  });
  // State to store calculated time slots for each day
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: string[] }>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const { setLoading } = useAppContext();

  const onSubmit = async (data: CourtFormDataType) => {
    const userId = localStorage.getItem("adminId");
    if (data.location && data.location.city) {
      data.location.city = data.location.city.toLowerCase().trim();
    }
    const formData = new FormData();
    // Append images to FormData
    images.forEach(async (image: { file: string | Blob }) => {
      formData.append("files", image.file);
    });

    // Append other form data
    formData.append("courtName", data.courtName);
    formData.append("courtType", data.courtType);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("email", data.email);
    formData.append("venuePrice", JSON.stringify(data.venuePrice));
    formData.append("venueOverview", data.venueOverview);
    formData.append("courtIncludes", JSON.stringify(includes));
    formData.append("rulesOfVenue", JSON.stringify(rules));
    formData.append("amenities", JSON.stringify(amenities));
    formData.append("location", JSON.stringify(data.location));
    formData.append("courtAvailability", JSON.stringify(selectedHours));
    if (userId) {
      formData.append("userId", userId);
    }

    try {
      setLoading({ status: true, description: "Fetching Court Data..." });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}court/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // Important header for file uploads
      );
      response.status === 201
        ? toast.success(response.data.message)
        : toast.error(response.data.message);
    } catch (error) {
      toast.error("Failed to add court");
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Fetching Court Data..." });
    }

    // Optionally reset form or navigate
    // reset();
    // setTimeout(() => {
    //   navigate(routes.adminDashboard);
    // }, 3000);
  };

  dayjs.extend(customParseFormat);

  const scrollContent = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  const routes = all_routes;

  // Function to handle file input change
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);

    // Convert files to Blob format and generate object URLs
    const newImages = files.map((file: any) => {
      return {
        file,
        url: URL.createObjectURL(file), // Create a local URL for preview
      };
    });

    setImages((prevImages: any) => [...prevImages, ...newImages]);
  };
  // Function to remove an image
  const removeImg = (index: any) => {
    setImages(images.filter((_: any, i: number) => i !== index));
  };

  return (
    <div>
      <ToastContainer />
      {/* Page Content */}
      <div className="content">
        <div className="container">
          {/* Row */}
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="venue-options option-list-court white-bg">
                <ul className="clearfix">
                  <li className="active">
                    <Link to="#" onClick={() => scrollContent("basic-info")}>
                      Basic Info
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("venue-price")}>
                      Venue Price
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("availability")}>
                      Availability
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("overview")}>
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("includes")}>
                      Includes
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("rules")}>
                      Rules
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("amenities")}>
                      Amenities
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("gallery")}>
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={() => scrollContent("location")}>
                      Locations
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Accordian Contents */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="accordion"
                id="accordionPanel"
              >
                {/* basic info */}
                <BasicDetails
                  errors={errors}
                  control={control}
                  register={register}
                />
                {/* Venue Price */}
                <PricingDetails
                  errors={errors}
                  control={control}
                  register={register}
                />
                {/* Availability */}
                <AvailabilityDetails
                  errors={errors}
                  control={control}
                  register={register}
                  timeSlots={timeSlots}
                  setTimeSlots={setTimeSlots}
                  selectedHours={selectedHours}
                  setSelectedHours={setSelectedHours}
                />
                {/* overview */}
                <OverviewDetails errors={errors} register={register} />
                {/* includes */}
                <IncludesDetails
                  includes={includes}
                  setIncludes={setIncludes}
                  register={register}
                />
                {/* Rules */}
                <RulesDetails
                  errors={errors}
                  control={control}
                  rules={rules}
                  setRules={setRules}
                />
                {/* Amenities */}
                <AmenitiesDetails
                  register={register}
                  amenities={amenities}
                  setAmenities={setAmenities}
                />
                {/* Gallery */}
                <GalleryDetails
                  errors={errors}
                  handleFileChange={handleFileChange}
                  removeImg={removeImg}
                  images={images}
                />
                {/* Location */}
                <LocationDetails errors={errors} register={register} />
                {/* Save form button */}
                <button className="text-center btn-row btn btn-secondary save-profile">
                  Add Court <i className="feather-arrow-right-circle ms-1" />
                </button>
              </form>
              {/* Accordian Contents */}
            </div>
          </div>
          {/* /Row */}
        </div>
        {/* /Container */}
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default AddCourt;
