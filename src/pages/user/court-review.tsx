import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { all_routes } from "../../router/all_routes";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { Rating } from "primereact/rating";
import Loader from "../../components/common/Loader";

interface CourtDataType {
  court_id: string;
  court_name: string;
  venue_overview: string;
  images: string[];
}

interface ReviewFormData {
  court_id: string | undefined;
  user_id: string;
  transaction_id: string | undefined;
  booking_details_id: string | undefined;
  title: string;
  description: string;
  rating: number;
}

const CourtReview = () => {
  const routes = all_routes;
  const { courtId, transaction_id, booking_details_id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [courtData, setCourtData] = useState<CourtDataType>();
  const [reviewData, setReviewData] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
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

  const ratingValue = watch("rating");

  const ratingChanged = (newRating: number) => {
    setValue("rating", newRating);
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
      const fetchedCourtData = response.data.court;
      console.log(fetchedCourtData);
      const imageUrl = fetchedCourtData.images[0].image_url;
      const imageData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/uploads/${fetchedCourtData.user_id}/${fetchedCourtData.id}/${imageUrl}`,
        {
          responseType: "blob",
        }
      );
      const imageBlobUrl = URL.createObjectURL(imageData.data);
      setImages(imageBlobUrl);
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
      {loading && <Loader />}
      <ToastContainer />
      {courtData && !loading && (
        <div className="col-lg-4 col-md-12 mb-2 px-6 d-flex flex-column align-content-center">
          <h1>{reviewData ? "Update" : "Create"} Review</h1>
          {/* Court Data Display */}
          <div className="featured-venues-item venue-list-item">
            <div className="listing-item listing-item-grid">
              <div className="listing-img d-none d-md-block">
                <Link to={`${routes.courtDetailsLink}/${courtData.court_id}`}>
                  <img
                    style={{
                      height: "225px",
                      width: "400px",
                    }}
                    src={images}
                    alt="court img"
                  />
                </Link>
              </div>
              <div className="listing-content">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="listing-title m-0">
                    <Link
                      to={`${routes.courtDetailsLink}/${courtData.court_id}`}
                    >
                      {courtData.court_name}
                    </Link>
                  </h5>
                </div>
                <div
                  style={{ fontWeight: "200" }}
                  className="listing-details-group"
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: courtData.venue_overview,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
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

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <Rating
                onChange={(e) => ratingChanged(Number(e.value))}
                value={ratingValue}
                cancel={false}
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
