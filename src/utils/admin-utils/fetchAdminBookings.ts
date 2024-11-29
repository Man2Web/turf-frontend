import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const fetchAdminBookings = (
  adminId: string | null,
  dataToggle: number,
  observerTarget: any
) => {
  const [bookingDataOffsets, setBookingDataOffsets] = useState({
    previousBookingSettings: 0,
    todayBookingSettings: 0,
    upcomingBookingSettings: 0,
  });
  const [todaysBooking, setTodaysBooking] = useState<SuccessBookingData[]>([]);
  const [previousBooking, setPreviousBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [upcomingBooking, setUpcomingBooking] = useState<SuccessBookingData[]>(
    []
  );
  const [currentData, setCurrentData] = useState<SuccessBookingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [countData, setCountData] = useState<{
    todaysBookingsCount: string;
    previousBookingsCount: string;
    upcomingBookingsCount: string;
  }>();

  const limit = 18;

  const checkOffset = () => {
    if (dataToggle === 0) {
      return previousBooking.length < Number(countData?.previousBookingsCount);
    } else if (dataToggle === 1) {
      return todaysBooking.length < Number(countData?.todaysBookingsCount);
    } else {
      return upcomingBooking.length < Number(countData?.upcomingBookingsCount);
    }
  };

  const setOffset = () => {
    if (dataToggle === 0) {
      setBookingDataOffsets((prevData) => ({
        ...prevData,
        previousBookingSettings: prevData.previousBookingSettings + limit,
      }));
    } else if (dataToggle === 1) {
      setBookingDataOffsets((prevData) => ({
        ...prevData,
        todayBookingSettings: prevData.todayBookingSettings + limit,
      }));
    } else {
      setBookingDataOffsets((prevData) => ({
        ...prevData,
        upcomingBookingSettings: prevData.upcomingBookingSettings + limit,
      }));
    }
  };

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting && checkOffset()) {
        setOffset();
      }
    },
    [bookingDataOffsets, countData, dataToggle]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px",
      threshold: 1.0,
    });
    const currentLoadMoreRef = observerTarget.current;

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }
    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [handleObserver, dataToggle]);

  const getBookingData = useCallback(async () => {
    const data = {
      todayBookingSettings: bookingDataOffsets.todayBookingSettings,
      upcomingBookingSettings: bookingDataOffsets.upcomingBookingSettings,
      previousBookingSettings: bookingDataOffsets.previousBookingSettings,
      limit,
    };
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/booking/${adminId}`,
        { params: data }
      );

      const filterNewBookings = (
        prevData: SuccessBookingData[],
        newData: SuccessBookingData[]
      ) => {
        if (newData.length > 0) {
          return newData?.filter(
            (newBooking) =>
              !prevData.some(
                (prevBooking) =>
                  prevBooking.transaction_id === newBooking.transaction_id
              )
          );
        } else {
          return [];
        }
      };

      if (dataToggle === 1 && response.data.todaysBookings.length > 0) {
        setCurrentData((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.todaysBookings),
        ]);
      }
      setCountData(response.data.countData);

      if (response.data.todaysBookings.length > 0) {
        setTodaysBooking((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.todaysBookings),
        ]);
      }

      if (response.data.previousBookings.length > 0) {
        setPreviousBooking((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.previousBookings),
        ]);
      }

      if (response.data.upcomingBookings.length > 0) {
        setUpcomingBooking((prevData) => [
          ...prevData,
          ...filterNewBookings(prevData, response.data.upcomingBookings),
        ]);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }, [adminId, bookingDataOffsets, limit, dataToggle]);

  useEffect(() => {
    getBookingData();
  }, [bookingDataOffsets]);

  useEffect(() => {
    if (dataToggle === 0) {
      setCurrentData(previousBooking);
    } else if (dataToggle === 1) {
      setCurrentData(todaysBooking);
    } else if (dataToggle === 2) {
      setCurrentData(upcomingBooking);
    }
  }, [dataToggle, todaysBooking, previousBooking, upcomingBooking]);
  return currentData;
};
