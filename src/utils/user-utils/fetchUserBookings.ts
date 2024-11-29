import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";

export const fetchUserBookings = (userId: string | null, offset: number) => {
  const [previousBooking, setPreviousBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [upcomingBooking, setUpcomingBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [totalPrevCount, setTotalPrevCount] = useState<number>(0);
  const { setLoading } = useAppContext();
  const limit = 20;
  useEffect(() => {
    getBookingData();
  }, [userId, offset]);
  const getBookingData = async () => {
    try {
      setLoading({
        status: true,
        description: "Fetching User Bookings Data...",
      });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/booking/${userId}`,
        {
          params: {
            limit: limit,
            offset: offset,
          },
        }
      );
      if (response.data.upcomingBookings) {
        setUpcomingBooking(response.data.upcomingBookings);
      }
      if (response.data.previousBookings) {
        setPreviousBooking((prevData) => [
          ...prevData,
          ...response.data.previousBookings,
        ]);
        setTotalPrevCount(Number(response.data.totalCount));
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading({
        status: false,
        description: "Fetching User Bookings Data...",
      });
    }
  };
  return { previousBooking, upcomingBooking, totalPrevCount };
};
