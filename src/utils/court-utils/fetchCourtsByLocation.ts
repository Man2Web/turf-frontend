import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";

export const fetchCourtsByLocation = (
  userLocation: string | null,
  offset: number,
  filteringOptions?: AdvancedSearchForm,
  selectedSort?: string,
  sportType?: string | undefined
) => {
  const { setLoading } = useAppContext();
  const [courtsData, setCourtsData] = useState<CourtsData[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const limit = 20;
  useEffect(() => {
    if (filteringOptions) {
      setCourtsData([]);
    }
    getCourtsData();
  }, [userLocation, offset, filteringOptions, selectedSort]);
  useEffect(() => {
    setCourtsData([]);
  }, [userLocation, selectedSort]);

  const getCourtsData = async () => {
    try {
      setLoading({ status: true, description: "Fetching Courts Data..." });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}court/fetch/all/${userLocation}`,
        {
          params: {
            limit,
            offset,
            ...filteringOptions,
            sportType,
            selectedSort,
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
