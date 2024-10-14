import React, { useEffect, useState, ReactDOM, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { citiesList } from "../../utils/citiesList";
import { toast, ToastContainer } from "react-toastify";
import ButtonLoader from "./button-loader";
import { Dropdown } from "primereact/dropdown";
import { Modal } from "react-bootstrap";
import { UserLocationContext } from "../../index";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

// {
//   //   locations,
//   setUserLocation,
//   // setLoading,
//   setCourtsData,
//   setImages,
// }: {
//   //   locations: any;
//   setUserLocation?: any;
//   setLoading?: any;
//   setCourtsData?: any;
//   setImages?: any;
// }

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

  useEffect(() => {
    const modalElement = document.getElementById("locationDetailsModal");
    if (modalElement && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show(); // Show the modal on component mount

      modalElement.addEventListener("hidden.bs.modal", () => {
        setShowModal(false);
      });
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hidden.bs.modal", closeModal);
      }
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        dialogClassName="modal custom-modal request-modal"
        id="upcoming-court"
        style={{ overflow: "visible" }}
        backdrop="static"
        tabIndex={-1}
      >
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h4>Enter Your Location</h4>
            </div>
            <div className="modal-body">
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
                          onShow={() => {
                            const panelEl =
                              document.querySelector(".p-dropdown-panel");
                            if (panelEl) {
                              panelEl.style.zIndex = "2000";
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LocationDataModal;
