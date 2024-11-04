import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { all_routes } from "../../../router/all_routes";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import Loader from "../../../components/common/loader/Loader";
import { Card, Flex, Rate } from "antd";

const CourtReview = () => {
  const routes = all_routes;
  const { courtId, transaction_id, booking_details_id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [courtData, setCourtData] = useState<CourtsData>();
  const [reviewData, setReviewData] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReviewFormData>();

  const onSubmit = async (data: ReviewFormData) => {
    const completeData = {
      ...data,
      court_id: courtId,
      user_id: userId,
      booking_details_id: booking_details_id,
      transaction_id: transaction_id,
    };

    try {
      setLoading(true);
      if (reviewData) {
        // Update existing review
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}user/review/update/${courtId}/${transaction_id}`,
          completeData
        );
        response.status === 200
          ? toast.success("Review Updated")
          : toast.error("Could not update review");
        setReviewData(data);
      } else {
        // Add a new review
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}user/review/add/${courtId}/${transaction_id}`,
          completeData
        );
        response.status === 201
          ? toast.success("Review Created")
          : toast.error("Could not create review");
        setReviewData(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const userId = useMemo(
    () => localStorage.getItem("adminId") || localStorage.getItem("userId"),
    []
  );

  const getCourtInfo = async (courtId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/fetch/${courtId}`
      );
      const fetchedCourtData = response.data.courtData;
      setCourtData(fetchedCourtData);
    } catch (error) {
      console.error("Error fetching court info", error);
    } finally {
      setLoading(false);
    }
  };

  const getReviewData = async (courtId: string, transaction_id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/review/${courtId}/${transaction_id}`
      );
      setValue("title", response.data.title);
      setValue("description", response.data.description);
      setValue("rating", response.data.rating);

      setReviewData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courtId) {
      getCourtInfo(courtId);
    }
    if (courtId && transaction_id) {
      getReviewData(courtId, transaction_id);
    }
  }, [courtId, transaction_id]);

  return (
    <div className="d-flex justify-content-center">
      <ToastContainer />
      <Loader loader={loading} loadingDescription="Fetching Review Data..." />
      {!loading && (
        <div className="col-lg-4 col-md-12 mb-2 px-6 d-flex flex-column align-content-center">
          <h1>{reviewData ? "Update" : "Create"} Review</h1>
          {/* Court Data Display */}
          <Card>
            <Flex gap="middle">
              <img
                className="custom-court-image"
                src={`${process.env.REACT_APP_BACKEND_URL}court/uploads/${courtData?.admin_id}/${courtId}/${courtData?.images[0]}`}
              />
              <div>
                <h2>{courtData?.court_name}</h2>
                <p>
                  {courtData?.venue_overview.slice(0, 300)}
                  <span className="text-success"> Read More</span>
                </p>
              </div>
            </Flex>
          </Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Review Title
              </label>
              <input
                id="title"
                className="form-control"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </div>
            <div className="mb-3 d-flex flex-column">
              <label className="form-label">Rating</label>
              <Rate
                defaultValue={1}
                onChange={(number) => {
                  setValue("rating", number);
                }}
              />
              {errors.rating && (
                <p className="text-danger">{errors.rating.message}</p>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                {reviewData ? "Update" : "Submit"} Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourtReview;
