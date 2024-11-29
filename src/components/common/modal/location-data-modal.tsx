import React, { useEffect, useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { citiesList } from "../../../utils/data-list/citiesList";
import { toast, ToastContainer } from "react-toastify";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import { Divider, Modal } from "antd";
import Loader from "../loader/Loader";
import { useAppContext } from "../../../context/app-context";

const LocationDataModal = ({
  toggleModal,
  closeToggleModal,
}: {
  toggleModal?: boolean;
  closeToggleModal?: () => void;
}) => {
  const { control } = useForm();
  const [showModal, setShowModal] = useState(true);
  const [locationError, setlocationError] = useState<string>();
  const [locations, setLocations] = useState<string[]>([]);
  const { setLoading } = useAppContext();
  const routes = all_routes;
  const navigate = useNavigate();

  // Destructure properties from the context
  const { userLocation, setUserLocation } = useAppContext();

  useEffect(() => {
    getCitiesData();
  }, []);

  useEffect(() => {
    if (toggleModal) {
      setShowModal(true);
    }
  }, [toggleModal]);

  const getCitiesData = async () => {
    const fetchedLocations = await citiesList();
    setLocations(fetchedLocations);
  };

  const getUserLocation = () => {
    try {
      setLoading({ status: true, description: "Fetching User Location..." });
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
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Fetching User Location..." });
    }
  };

  const successLocation = async (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      setLoading({ status: true, description: "Fetching User Location..." });
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const userLocationInContext = response.data.address.city
        .toLowerCase()
        .trim();

      if (locations.includes(userLocationInContext)) {
        localStorage.setItem("userLocation", userLocationInContext);
        setUserLocation(userLocationInContext);
        setShowModal(false);
        closeModal();
        navigate(routes.ListingList);
      } else {
        toast.error(
          "We currently don't serve in your location, Please select from the dropdown below."
        );
      }
    } catch (error) {
      // console.error(error);
      toast.error("Error fetching user location");
    } finally {
      setLoading({ status: false, description: "Fetching User Location..." });
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
    if (closeToggleModal) {
      closeToggleModal();
    }
  };
  return (
    <>
      <ToastContainer />
      <Modal
        open={showModal}
        onCancel={closeModal}
        closable={false}
        maskClosable={userLocation ? true : false}
        footer={null}
        centered
      >
        <div className="modal-body">
          <div className="text-center">
            <button
              onClick={() => getUserLocation()}
              className="btn btn-primary mb-4"
            >
              <div className="d-flex gap-2 align-items-center">
                <i className="feather-map-pin" />
                <p className="m-0">Get My Location</p>
              </div>
            </button>
          </div>
          {locationError && <p className="text-danger">{locationError}</p>}
          <Divider orientation="center">Or</Divider>
          <form autoComplete="off" className="w-100">
            <div className="card-body-chat">
              <div className="sorting-select">
                <Controller
                  name="userLocationInContext"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      filter
                      value={userLocation || field.value}
                      onChange={(e) => {
                        field.onChange(e.value);
                        setUserLocation(e.value);
                        closeModal();
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
