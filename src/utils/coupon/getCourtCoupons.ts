import axios from "axios";

export const getCourtCoupons = async (courtId: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}court/coupon/get/${courtId}`
    );
    console.log(response.data);
  } catch (error) {
    return;
  }
};
