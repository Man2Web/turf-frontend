import React, { createContext, useContext, useState } from "react";
import { UserDetailsFormData } from "../utils/types/user/userDetailsBookingForm";
import { AdminDetailsFormData } from "../utils/types/admin/adminDetailsBookingForm";

interface BookingContextInterface {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedSlots: any;
  setSelectedSlots: React.Dispatch<React.SetStateAction<any>>;
  courtDuration: string;
  setCourtDuration: React.Dispatch<React.SetStateAction<string>>;
  userDetails: UserDetailsFormData | AdminDetailsFormData | undefined;
  setUserDetails: React.Dispatch<
    React.SetStateAction<UserDetailsFormData | AdminDetailsFormData | undefined>
  >;
  isValid: boolean | undefined;
  setIsValid: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  isCourtAdmin: boolean;
  setIsCourtAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  adminBookingData: SuccessBookingData | undefined;
  setAdminBookingData: React.Dispatch<
    React.SetStateAction<SuccessBookingData | undefined>
  >;
  userSelectedCoupon: Coupon | undefined;
  setUserSelectedCoupon: React.Dispatch<
    React.SetStateAction<Coupon | undefined>
  >;
  policy: boolean | undefined;
  setPolicy: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  dataConfirmation: boolean | undefined;
  setDataConfirmation: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}

// Create a context with default values
export const BookingContext = createContext<
  BookingContextInterface | undefined
>(undefined);

export const BookingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<any>([]);
  const [courtDuration, setCourtDuration] = useState<string>("");
  const [userDetails, setUserDetails] = useState<
    UserDetailsFormData | AdminDetailsFormData
  >();
  const [isValid, setIsValid] = useState<boolean>();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isCourtAdmin, setIsCourtAdmin] = useState<boolean>(false);
  const [adminBookingData, setAdminBookingData] =
    useState<SuccessBookingData>();
  const [userSelectedCoupon, setUserSelectedCoupon] = useState<Coupon>();
  const [policy, setPolicy] = useState<boolean>();
  const [dataConfirmation, setDataConfirmation] = useState<boolean>();
  return (
    <BookingContext.Provider
      value={{
        progress,
        setProgress,
        selectedDate,
        setSelectedDate,
        selectedSlots,
        setSelectedSlots,
        courtDuration,
        setCourtDuration,
        userDetails,
        setUserDetails,
        isValid,
        setIsValid,
        toggleModal,
        setToggleModal,
        isCourtAdmin,
        setIsCourtAdmin,
        adminBookingData,
        setAdminBookingData,
        userSelectedCoupon,
        setUserSelectedCoupon,
        policy,
        setPolicy,
        dataConfirmation,
        setDataConfirmation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook for using AppContext
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
