import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import axios from "axios";

export const getCourtInfo = (courtId: string | undefined) => {
  const { setLoading } = useAppContext();
  const [courtData, setCourtData] = useState<CourtsData>();
  useEffect(() => {
    try {
      setLoading({ status: true, description: "Fetching Court Details" });
      const getCourtInfo = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}court/fetch/${courtId}`
        );
        const fetchedCourtData = response.data.courtData;
        setCourtData(fetchedCourtData);
      };
      getCourtInfo();
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading({ status: false, description: "Fetching Court Details" });
    }
  }, [courtId]);
  return courtData;
};
