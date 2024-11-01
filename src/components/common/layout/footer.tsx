import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageWithBasePath from "../../../core/data/img/ImageWithBasePath";
import { all_routes } from "../../../router/all_routes";
import { Dropdown } from "primereact/dropdown";

const Footer = () => {
  const routes = all_routes;
  return (
    <footer className="footer">
      <div className="container">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <ImageWithBasePath
                className="img-fluid"
                src="assets/img/logo.svg"
              />
              <div className="mt-2 copyright-text">
                <p className="mb-0 text-white text-start">
                  © {new Date().getFullYear()}
                  DreamSports - All rights reserved.
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Contact us</h4>
                <div className="footer-address-blk">
                  <div className="footer-call">
                    <span>Toll free Customer Care</span>
                    <p>+017 123 456 78</p>
                  </div>
                  <div className="footer-call">
                    <span>Need Live Suppot</span>
                    <p>dreamsports@example.com</p>
                  </div>
                </div>
                <div className="social-icon">
                  <ul>
                    <li>
                      <Link to="#" className="facebook">
                        <i className="fab fa-facebook-f" />{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="twitter">
                        <i className="fab fa-twitter" />{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="instagram">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="linked-in">
                        <i className="fab fa-linkedin-in" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Footer Widget */}
            </div>
            <div className="col-lg-2 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Quick Links</h4>
                <ul>
                  <li>
                    <Link to={"routes.aboutUs"}>About us</Link>
                  </li>
                  <li>
                    <Link to={"routes.contactUs"}>Contact us</Link>
                  </li>
                  <li>
                    <Link to={"routes.contactUs"}>Patner With Us</Link>
                  </li>
                </ul>
              </div>
              {/* /Footer Widget */}
            </div>
            <div className="col-lg-2 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h4 className="footer-title">Privacy & Terms</h4>
                <ul>
                  <li>
                    <Link to={"routes.faq"}>Faq</Link>
                  </li>
                  <li>
                    <Link to={"routes.privacyPolicy"}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to={"routes.termsCondition"}>
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              {/* /Footer Widget */}
            </div>
          </div>
        </div>
        {/* /Footer Top */}
      </div>
    </footer>
  );
};

export default Footer;
