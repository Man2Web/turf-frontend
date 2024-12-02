import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";

export const fetchTopRatedCourts = (userLocation: string | null) => {
  const { setLoading } = useAppContext();
  const [courtsData, setCourtsData] = useState<CourtsData[]>([]);
  useEffect(() => {
    getCourtsData();
  }, [userLocation]);

  const getCourtsData = async () => {
    try {
      setLoading({ status: true, description: "Fetching Courts Data..." });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/fetch/rating/${userLocation}`
      );
      setCourtsData((prevData) => [
        ...prevData,
        ...response.data.updatedCourtsData,
      ]);
    } catch (error) {
      return;
    } finally {
      setLoading({ status: false, description: "Fetching Courts Data..." });
    }
  };
  return { courtsData };
};
