import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../../context/app-context";
import { fetchCourtsByLocation } from "../../../utils/court-utils/fetchCourtsByLocation";
import InfiniteLoadComponent from "../courts-list/infinite-load";
import GridCard from "../courts-list/grid-card";

const FetchCourts = () => {
  const { userLocation } = useAppContext();
  const [offset, setOffset] = useState(0);
  const { courtsData, totalCount } = fetchCourtsByLocation(
    userLocation,
    offset
  );
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          courtsData.length < Number(totalCount)
        ) {
          setOffset((prevData) => prevData + 20);
        }
      },
      { threshold: 0.5 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, totalCount, courtsData]);
  return (
    <section className="courts-section my-2 text-capitalize">
      <h2>
        Showing {totalCount} Courts In {userLocation}
      </h2>
      <div className="courts-list">
        {courtsData?.map((court: CourtsData, index: number) => (
          <div key={index} className="p-0 py-2 p-lg-2 col-12 col-md-6 col-lg-4">
            <GridCard court={court} />
          </div>
        ))}
        <div ref={observerTarget} />
      </div>
    </section>
  );
};

export default FetchCourts;
