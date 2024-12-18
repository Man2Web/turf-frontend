import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "../../../context/app-context";

type AdminProfileFormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  country: string;
  zipcode: string;
};

const AdminProfileForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminProfileFormInputs>();
  const { setLoading } = useAppContext();
  const adminId = localStorage.getItem("adminId");

  const getAdminDetails = async () => {
    try {
      setLoading({ status: true, description: "Fetching User Data..." });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/get/${adminId}`
      );
      const userDetails = response.data.user;
      const locationDetails = response.data.location;
      reset({
        name: userDetails.username,
        email: userDetails.email,
        phone: userDetails.phone_number,
        address: locationDetails?.address,
        state: locationDetails?.state,
        city: locationDetails?.city,
        country: locationDetails?.country,
        zipcode: locationDetails?.zipcode,
      });
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Fetching User Data..." });
    }
  };

  useEffect(() => {
    if (adminId) {
      getAdminDetails();
    }
  }, []);

  const onSubmit = async (data: AdminProfileFormInputs) => {
    try {
      setLoading({ status: true, description: "Updating User Data..." });
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}user/update/${adminId}`,
        data
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getAdminDetails();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Updating User Data..." });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-sm-12">
          <div className="profile-detail-group">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="input-space">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name"
                        {...register("name", {
                          required: "Name is required",
                        })}
                      />
                      {errors.name && (
                        <p className="text-danger">{errors.name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="input-space">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email Address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="input-space">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Phone Number"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                      />
                      {errors.phone && (
                        <p className="text-danger">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="address-form-head">
                    <h4>Address</h4>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="input-space">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter Address"
                        {...register("address")}
                      />
                      {errors.address && (
                        <p className="text-danger">{errors.address.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="input-space">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="Enter State"
                        {...register("state")}
                      />
                      {errors.state && (
                        <p className="text-danger">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="input-space">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Enter City"
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="text-danger">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4">
                    <div className="input-space">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        placeholder="Enter Country"
                        {...register("country")}
                      />
                      {errors.country && (
                        <p className="text-danger">{errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="input-space mb-0">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        placeholder="Enter Zipcode"
                        {...register("zipcode")}
                      />
                      {errors.zipcode && (
                        <p className="text-danger">{errors.zipcode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="save-changes text-end mt-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => reset()}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary ms-2">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileForm;
