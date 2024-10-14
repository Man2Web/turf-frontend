import React from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

const StatsCardComponent = () => {
  return (
    <div className="row">
      <div className="col-xl-6 col-lg-6">
        <div className="card dashboard-card statistic-simply">
          <div className="card-header">
            <h4>Statistics</h4>
            <p>Track progress and improve coaching performance </p>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
              <div className="statistics-grid flex-fill">
                <div className="statistics-content">
                  <h3>78</h3>
                  <p>Total Courts Booked</p>
                </div>
                <div className="statistics-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/statistics-01.svg"
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
              <div className="statistics-grid flex-fill">
                <div className="statistics-content">
                  <h3>06</h3>
                  <p>Upcoming Bookings</p>
                </div>
                <div className="statistics-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/statistics-03.svg"
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
              <div className="statistics-grid flex-fill">
                <div className="statistics-content">
                  <h3>45</h3>
                  <p>Total Lessons Taken</p>
                </div>
                <div className="statistics-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/statistics-02.svg"
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 d-flex">
              <div className="statistics-grid flex-fill">
                <div className="statistics-content">
                  <h3>$45,056</h3>
                  <p>Payments</p>
                </div>
                <div className="statistics-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/statistics-04.svg"
                    alt="Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 d-flex">
        <div className="card dashboard-card statistic-simply">
          <div className="card-header">
            <h4>Profile</h4>
            <p>Impress potential students with an interesting profile </p>
          </div>
          <div className="dash-coach-profile">
            <div className="track-statistics">
              <div className="statistic-head">
                <h5>Today</h5>
                <p>100%</p>
              </div>
              <div className="progress mb-0">
                <div
                  className="progress-bar bg-today"
                  role="progressbar"
                  style={{ width: "72.17%" }}
                  aria-valuenow={72.17}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
            <div className="progress-titles">
              <h5>Completed </h5>
              <ul>
                <li>
                  <i className="fa-solid fa-check-double" />
                  Basic Details
                </li>
                <li>
                  <i className="fa-solid fa-check-double" />
                  Payment Setup
                </li>
                <li>
                  <i className="fa-solid fa-check-double" />
                  Availability
                </li>
              </ul>
            </div>
            <div className="progress-titles">
              <h5>Need to Complete </h5>
              <ul className="need-complete">
                <li>
                  <i className="feather-x-circle" />
                  Setup level for your Profile
                </li>
                <li>
                  <i className="feather-x-circle" />
                  Add Lesson type
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCardComponent;
