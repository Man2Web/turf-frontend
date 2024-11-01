export const handleWishListUpdate = (
  courtId: string,
  userWishlist: string[],
  setUserWishlist: any,
  updateWishList: any
) => {
  if (!userWishlist || userWishlist.length === 0) {
    // If userWishlist is null, undefined, or an empty array
    setUserWishlist([courtId]);
    updateWishList([courtId]);
  } else {
    if (userWishlist.includes(courtId)) {
      // Remove the item if it already exists in the wishlist
      setUserWishlist((prevData: any[]) => {
        const localWishList = prevData.filter((id: string) => id !== courtId);
        updateWishList(localWishList);
        return localWishList;
      });
    } else {
      // Add the item to the wishlist
      setUserWishlist((prevData: any) => {
        const localWishList = [...prevData, courtId];
        updateWishList(localWishList);
        return localWishList;
      });
    }
  }
};
