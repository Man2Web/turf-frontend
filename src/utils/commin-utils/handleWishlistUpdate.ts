export const handleWishListUpdate = (
  courtId: string,
  userWishlist: string[],
  setUserWishlist: any,
  updateWishList: any
) => {
  if (!userWishlist || userWishlist.length === 0) {
    setUserWishlist([courtId]);
    updateWishList([courtId]);
  } else {
    if (userWishlist.includes(courtId)) {
      setUserWishlist((prevData: string[]) => {
        const localWishList = prevData.filter((id: string) => id !== courtId);
        updateWishList(localWishList);
        return localWishList;
      });
    } else {
      setUserWishlist((prevData: string[]) => {
        const localWishList = [...prevData, courtId];
        updateWishList(localWishList);
        return localWishList;
      });
    }
  }
};
