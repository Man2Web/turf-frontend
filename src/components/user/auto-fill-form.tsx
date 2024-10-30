import axios from "axios";
import { useEffect } from "react";
import { UserDetailsFormData } from "../../utils/types/userDetailsBookingForm";

export const autoFillFormData = (
  reset: (data: Partial<UserDetailsFormData>) => void
) => {
  const userId =
    localStorage.getItem("userId") || localStorage.getItem("adminId");

  useEffect(() => {
    getUserDetailsData();
  }, [userId]);

  const getUserDetailsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/user-data/${userId}`
      );
      if (response.status === 200) {
        const userDetails = response.data.userData;
        reset({
          fName: userDetails.fname || "",
          lName: userDetails.lname || "",
          email: userDetails.email || "",
          phonenumber: userDetails.phone_number || "",
          address: userDetails.address || "",
          city: userDetails.city || "",
          state: userDetails.state || "",
          country: userDetails.country || "",
          pincode: userDetails.pincode || "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};
