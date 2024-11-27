import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";

export const fetchCourtsByLocation = (
  userLocation: string | null,
  offset: number
) => {
  const { setLoading } = useAppContext();
  const [courtsData, setCourtsData] = useState<CourtsData[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const limit = 20;
  useEffect(() => {
    getCourtsData();
  }, [userLocation, offset]);

  const getCourtsData = async () => {
    try {
      setLoading({ status: true, description: "Fetching Courts Data..." });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/fetch/all/${userLocation}`,
        {
          params: {
            limit,
            offset,
          },
        }
      );
      setTotalCount(response.data.pagination.totalCount);
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
  return { courtsData, totalCount };
};
