import { Collapse, CollapseProps } from "antd";
import React from "react";

const Faq = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "How can I book a court on Man2Web?",
      children: (
        <p>
          You can book a court by navigating to the Book Court page on our
          platform. From there, select your preferred sport, date, time, and
          location, and follow the prompts to complete your booking.
        </p>
      ),
    },
    {
      key: "2",
      label: "What is the duration of a court booking?",
      children: (
        <p>
          The duration of each court booking is set by the court admin and may
          vary depending on the court and sport. Please review the booking
          details for specific session times before confirming your reservation.
        </p>
      ),
    },
    {
      key: "3",
      label: "Does Man2Web provide equipment rentals?",
      children: (
        <p>
          Man2Web is a court booking platform only and does not currently offer
          equipment rentals. Please bring your own sports equipment for all
          bookings.
        </p>
      ),
    },
    {
      key: "4",
      label: "Are coaching services available on Man2Web?",
      children: (
        <p>
          As of now, Man2Web does not provide coaching services. Our platform is
          focused on facilitating court bookings for a variety of sports.
        </p>
      ),
    },
    {
      key: "5",
      label: "Are leagues or tournaments offered through Man2Web?",
      children: (
        <p>
          Currently, Man2Web does not organize leagues or tournaments. Our focus
          is on providing an easy-to-use platform for booking courts across
          various sports.
        </p>
      ),
    },
  ];

  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-12 offset-sm-12 offset-md-1 col-md-10 col-lg-10">
            <Collapse items={items} defaultActiveKey={["1"]} />;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
