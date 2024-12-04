import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../../context/app-context";

export const useCourtRatings = (courtId: string) => {
  const { setLoading } = useAppContext();
  const [reviewsData, setReviewsData] = useState<{
    total_rating: number;
    total_reviews: number;
  }>({ total_rating: 0, total_reviews: 0 });

  useEffect(() => {
    const getCourtReviewsData = async () => {
      try {
        setLoading({ status: true, description: "Fetching Court Ratings..." });
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}court/rating/${courtId}`
        );
        const { total_rating, total_reviews } = response.data.reviewsData;
        setReviewsData({ total_rating, total_reviews });
      } catch (error) {
        console.error("Error fetching court ratings:", error);
        setReviewsData({ total_rating: 0, total_reviews: 0 }); // Fallback values
      } finally {
        setLoading({ status: false, description: "Fetching Court Ratings..." });
      }
    };

    if (courtId) {
      getCourtReviewsData();
    }
  }, [courtId, setLoading]);
  return reviewsData;
};
