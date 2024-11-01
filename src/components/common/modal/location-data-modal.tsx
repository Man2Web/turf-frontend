import React, { useEffect, useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { citiesList } from "../../../utils/data-list/citiesList";
import { toast, ToastContainer } from "react-toastify";
import ButtonLoader from "../loader/button-loader";
import { Dropdown } from "primereact/dropdown";
import { UserLocationContext } from "../../../index";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { Modal } from "antd";

const LocationDataModal = () => {
  const { control } = useForm();
  const [showModal, setShowModal] = useState(true);
  const [locationError, setlocationError] = useState<string>();
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const routes = all_routes;
  const navigate = useNavigate();

  const context = useContext(UserLocationContext);

  // Check if the context is undefined
  if (!context) {
    throw new Error("SomeComponent must be used within a UserLocationProvider");
  }

  // Destructure properties from the context
  const { setUserLocationInContext } = context;

  useEffect(() => {
    getCitiesData();
  }, []);

  const getCitiesData = async () => {
    const fetchedLocations = await citiesList();
    setLocations(fetchedLocations);
  };

  const getUserLocation = () => {
    try {
      setLoading(true);
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
        };
        navigator.geolocation.getCurrentPosition(
          successLocation,
          failedLocation,
          options
        );
      } else {
        toast.error("Permission denied");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const successLocation = async (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const userLocationInContext = response.data.address.city
        .toLowerCase()
        .trim();

      if (locations.includes(userLocationInContext)) {
        // setUserLocation(userLocationInContext);
        localStorage.setItem("userLocation", userLocationInContext);
        setUserLocationInContext(userLocationInContext);
        navigate(routes.ListingList);
      } else {
        toast.error(
          "We currently don't serve in your location, Please select from the dropdown below."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user location");
    } finally {
      setLoading(false);
    }
  };

  const failedLocation = () => {
    setlocationError(
      "Looks like you have denied location permission, Don't worry you can still select location from the dropdown below"
    );
  };

  // Function to hide the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        title="Enter Your Location"
        open={showModal}
        onCancel={closeModal}
        closable={false}
        maskClosable={false}
        footer={null}
        centered
      >
        <div className="modal-body">
          <div className="d-flex justify-content-center">
            <button
              onClick={() => getUserLocation()}
              className="btn btn-primary mb-4"
            >
              <div className="d-flex gap-2 align-items-center">
                {loading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <i className="feather-map-pin" />
                    <p className="m-0">Get My Location</p>
                  </>
                )}
              </div>
            </button>
          </div>
          {locationError && <p className="text-danger">{locationError}</p>}
          <form autoComplete="off" className="w-100">
            <div className="card-body-chat">
              <div className="sorting-select">
                <Controller
                  name="userLocationInContext"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      filter
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.value);
                        setUserLocationInContext(e.value);
                      }}
                      options={locations}
                      optionLabel="userLocationInContext"
                      placeholder="Select Location"
                      className="select-bg w-100 list-sidebar-select"
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LocationDataModal;
