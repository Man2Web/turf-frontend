import React from "react";
import GridCard from "../courts-list/grid-card";
import { useAppContext } from "../../../context/app-context";
import { fetchTopRatedCourts } from "../../../utils/court-utils/fetchTopRatedCourtsByLocation";

const RatedCourts = () => {
  const { userLocation } = useAppContext();
  const { courtsData } = fetchTopRatedCourts(userLocation);
  return (
    <section className="top-rated-section">
      <h2 className="text-capitalize">Top Rated Courts In {userLocation}</h2>
      <div className="d-flex courts">
        {courtsData.map((court: CourtsData, index: number) => (
          <div key={index} className="p-0 p-lg-2 col-12 col-md-6 col-lg-4">
            <GridCard court={court} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RatedCourts;
