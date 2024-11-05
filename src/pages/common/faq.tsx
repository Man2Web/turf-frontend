import React from "react";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <div className="content">
      {/* Page Content */}
      <div className="container">
        <div className="row">
          <div className="col-12 offset-sm-12 offset-md-1 col-md-10 col-lg-10">
            <div className="ask-questions">
              <div className="faq-info">
                <div className="accordion" id="accordionExample">
                  {/* FAQ Item 1 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <Link
                        to="#"
                        className="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        How can I book a court on [[company_name]]?
                      </Link>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="accordion-content">
                          <p>
                            You can book a court by navigating to the Book Court
                            page on our platform. From there, select your
                            preferred sport, date, time, and location, and
                            follow the prompts to complete your booking.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /FAQ Item 1 */}

                  {/* FAQ Item 2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <Link
                        to="#"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        What is the duration of a court booking?
                      </Link>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="accordion-content">
                          <p>
                            The duration of each court booking is set by the
                            court admin and may vary depending on the court and
                            sport. Please review the booking details for
                            specific session times before confirming your
                            reservation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /FAQ Item 2 */}

                  {/* FAQ Item 3 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <Link
                        to="#"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Does [[company_name]] provide equipment rentals?
                      </Link>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="accordion-content">
                          <p>
                            [[company_name]] is a court booking platform only
                            and does not currently offer equipment rentals.
                            Please bring your own sports equipment for all
                            bookings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /FAQ Item 3 */}

                  {/* FAQ Item 4 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <Link
                        to="#"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        Are coaching services available on [[company_name]]?
                      </Link>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="accordion-content">
                          <p>
                            As of now, [[company_name]] does not provide
                            coaching services. Our platform is focused on
                            facilitating court bookings for a variety of sports.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /FAQ Item 4 */}

                  {/* FAQ Item 5 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <Link
                        to="#"
                        className="accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        Are leagues or tournaments offered through
                        [[company_name]]?
                      </Link>
                    </h2>
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="accordion-content">
                          <p>
                            Currently, [[company_name]] does not organize
                            leagues or tournaments. Our focus is on providing an
                            easy-to-use platform for booking courts across
                            various sports.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /FAQ Item 5 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default Faq;
