import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const ContactUs = () => {
  const route = all_routes;
  return (
    <div>
      <div className="main-wrapper contact-us-page">
        {/* Page Content */}
        <div className="content blog-details contact-group">
          <div className="container">
            <h2 className="text-center mb-40">Contact Information</h2>
            <div className="row mb-40">
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details">
                  <i className="feather-mail d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Email Address</h4>
                    <p>
                      <Link to="mailto:info@example.com">Info@example.com</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details">
                  <i className="feather-phone-call d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Phone Number</h4>
                    <p>+1 8164 164654</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-start align-items-center details">
                  <i className="feather-map-pin d-flex justify-content-center align-items-center" />
                  <div className="info">
                    <h4>Location</h4>
                    <p>3365 Central AvenueTeterboro, NJ 07608</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="google-maps">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8862835683544!2d-73.98256668525309!3d41.93829486962529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0ee3286615b7%3A0x42bfa96cc2ce4381!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2sin!4v1670922579281!5m2!1sen!2sin"
                    height={445}
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </div>
  );
};

export default ContactUs;
