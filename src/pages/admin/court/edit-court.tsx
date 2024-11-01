import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import moment from "moment";

const daysOfWeek = [
  { id: 1, label: "Mon" },
  { id: 2, label: "Tues" },
  { id: 3, label: "Wed" },
  { id: 4, label: "Thur" },
  { id: 5, label: "Fri" },
  { id: 6, label: "Sat" },
  { id: 7, label: "Sun" },
];

const courtOptions = [
  "Football",
  "Cricket",
  "Badminton",
  "Basketball",
  "Tennis",
  "Swimming",
  "Squash",
];

const hoursOptions = ["1 Hrs", "2 Hrs", "3 Hrs"];

const EditCourt = () => {
  const { courtId } = useParams();
  const navigate = useNavigate();
  const adminId = localStorage.getItem("adminId");
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CourtFormDataType>();

  const [courtData, setCourtData] = useState<CourtsData>();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  // State to store calculated time slots for each day
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
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: string[] }>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [selectedDays, setSelectedDays] = useState(
    Array(daysOfWeek.length).fill(false)
  );

  // useEffect to recalculate time slots whenever selectedHours changes
  useEffect(() => {
    if (adminId && courtId) {
      const getCourtData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}admin/court/fetch/${adminId}/${courtId}`
          );
          const fetchedCourtData = response.data.courtData;
          const timeSlots = fetchedCourtData.availability;

          // Fetch each image as blob and create object URLs
          const fetchAndStoreImages = async (fetchedCourtData: any) => {
            try {
              const imagePromises = fetchedCourtData.images.map(
                async (image: string) => {
                  const imageUrl = `${process.env.REACT_APP_BACKEND_URL}court/uploads/${fetchedCourtData?.admin_id}/${fetchedCourtData?.court_info.court_id}/${image}`;

                  // Fetch the image from the URL
                  const response = await fetch(imageUrl);
                  if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${imageUrl}`);
                  }

                  // Convert the response to a Blob
                  const blob = await response.blob();

                  // Return both Blob and URL
                  return { blob, url: URL.createObjectURL(blob) };
                }
              );

              // Wait for all images to be fetched and converted to Blobs
              const fetchedImages = await Promise.all(imagePromises);

              // Store the images as needed (e.g., in state)
              setImages(fetchedImages); // Assuming setImages stores the blob and url objects
            } catch (error) {
              console.error("Error fetching and storing images:", error);
            }
          };
          fetchAndStoreImages(fetchedCourtData);
          // Update the selectedHours logic
          const updatedSelectedHours = timeSlots.reduce(
            (acc: any, slot: any) => {
              const [dayOfWeek, duration, startTime, endTime] = slot;

              // Use the day of the week in string form (e.g., "sunday", "monday")
              const dayNames = [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
              ];
              const dayName = dayNames[dayOfWeek];

              // Update the accumulator with the values for the given day
              acc[dayName] = {
                duration: `${duration} Hrs`, // Set to "1" if available, otherwise empty string
                startTime: startTime || null, // Set start time or null
                endTime: endTime || null, // Set end time or null
              };

              return acc;
            },
            { ...selectedHours } // Preserve the previous selectedHours values
          );

          setCourtData(fetchedCourtData);
          setSelectedHours(updatedSelectedHours);
          setRules(fetchedCourtData.rules);
          setIncludes(fetchedCourtData.includes);
          setAmenities(fetchedCourtData.amenities);

          reset({
            courtName: fetchedCourtData.court_name,
            courtType: fetchedCourtData.court_type,
            phoneNumber: fetchedCourtData.phone_number,
            email: fetchedCourtData.email,
            venuePrice: {
              startingPrice: fetchedCourtData.price,
              maxGuests: fetchedCourtData.guests,
              additionalGuests: fetchedCourtData.add_guests,
              priceOfAdditionalGuests: fetchedCourtData.add_price,
              advancePay: fetchedCourtData.advance_pay,
            },
            venueOverview: fetchedCourtData.overview,
            location: {
              country: fetchedCourtData.country,
              city: fetchedCourtData.city,
              locationLink: fetchedCourtData.location_link,
              embedLink: fetchedCourtData.embedded_link,
            },
          });
        } catch (error) {
          console.error("Error fetching court data:", error);
        }
      };

      getCourtData();
    }
  }, [adminId, courtId]);
  // Added dependencies to ensure effect runs when adminId or courtId changes

  useEffect(() => {
    // Loop through all days and calculate slots
    Object.keys(selectedHours).forEach((day) => {
      calculateTimeSlots(day);
    });
  }, [selectedHours]);

  // Function to calculate time slots dynamically based on the day
  const calculateTimeSlots = (day: string) => {
    const slots: string[] = [];
    const dayHours = selectedHours[day];

    if (
      !dayHours ||
      !dayHours.duration ||
      !dayHours.startTime ||
      !dayHours.endTime
    ) {
      return; // Don't calculate if any value is missing
    }

    const durationInMinutes = parseInt(dayHours.duration.split(" ")[0]) * 60; // convert "1 Hrs" to 60 minutes
    let currentTime = moment(dayHours.startTime, "HH:mm");
    const endTime = moment(dayHours.endTime, "HH:mm");

    while (currentTime.isBefore(endTime)) {
      slots.push(currentTime.format("HH:mm A")); // e.g., "06:00 AM"
      currentTime = currentTime.add(durationInMinutes, "minutes"); // move to next slot
    }

    setTimeSlots((prevState) => ({ ...prevState, [day]: slots })); // update the time slots for the specific day
  };

  const onSubmit = async (data: any) => {
    // setLoading(true);
    const userId = localStorage.getItem("adminId");
    if (data.location && data.location.city) {
      data.location.city = data.location.city.toLowerCase().trim();
    }

    const formData = new FormData();
    images.forEach((image: { file: string | Blob }) => {
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

    console.log(images);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}court/edit/${adminId}/${courtId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(routes.adminDashboard);
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update court");
      console.error("Error updating court:", error);
    } finally {
      setLoading(false);
    }
  };

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
    setDeletedImages((prevData) => [images[index], ...prevData]);
    setImages(images.filter((_: any, i: number) => i !== index));
  };

  console.log(images);
  return (
    <div>
      <ToastContainer />
      {/* Page Content */}
      {loading ? (
        <Loader />
      ) : (
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
                      <Link
                        to="#"
                        onClick={() => scrollContent("availability")}
                      >
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
                    Update Court{" "}
                    <i className="feather-arrow-right-circle ms-1" />
                  </button>
                </form>
                {/* Accordian Contents */}
              </div>
            </div>
            {/* /Row */}
          </div>
          {/* /Container */}
        </div>
      )}
      {/* /Page Content */}
    </div>
  );
};

export default EditCourt;
