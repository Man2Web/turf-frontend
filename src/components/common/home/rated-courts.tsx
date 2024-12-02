import React from "react";
import GridCard from "../courts-list/grid-card";
import { useAppContext } from "../../../context/app-context";
import { fetchTopRatedCourts } from "../../../utils/court-utils/fetchTopRatedCourtsByLocation";
import { getUserWishList } from "../../../utils/commin-utils/getUserWishList";

const RatedCourts = ({ userId }: { userId: string | null }) => {
  const { userLocation } = useAppContext();
  const { courtsData } = fetchTopRatedCourts(userLocation);
  const { userWishlist, setUserWishlist, updateWishList } =
    getUserWishList(userId);
  return (
    <section className="top-rated-section">
      <h2 className="text-capitalize">Top Rated Courts In {userLocation}</h2>
      <div className="d-flex courts">
        {courtsData.map((court: CourtsData, index: number) => (
          <div key={index} className="p-0 p-lg-2 col-12 col-md-6 col-lg-4">
            <GridCard
              court={court}
              userWishlist={userWishlist}
              setUserWishlist={setUserWishlist}
              updateWishList={updateWishList}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RatedCourts;
