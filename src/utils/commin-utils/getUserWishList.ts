import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const getUserWishList = (userId: string | null) => {
  const [userWishlist, setUserWishlist] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      getUserWishList();
    }
  }, [userId]);

  const updateWishList = async (wishList: number[]) => {
    if (userId) {
      try {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}user/wishlist/update/${userId}`,
          { wishList }
        );
      } catch (error) {
        // console.error(error);
        toast.error("Error Updating Wishlist");
      }
    }
  };

  const getUserWishList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/get/${userId}`
      );
      setUserWishlist(response.data.user.wishlist);
    } catch (error) {
      // console.error(error);
    }
  };
  return { userWishlist, setUserWishlist, updateWishList };
};
