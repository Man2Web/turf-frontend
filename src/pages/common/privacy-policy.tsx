import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const PrivacyPolicy = () => {
  const routes = all_routes;
  return (
    <div className="content">
      {/* Page Content */}
      <div className="container">
        <h3>Privacy Policy</h3>
        <div className="condition-details">
          <p>
            Welcome to [Application Name]. Your privacy is important to us. This
            Privacy Policy outlines the types of information we collect from
            you, how we use it, and the measures we take to protect your data.
          </p>

          <h4>1. Information We Collect</h4>
          <p>
            We collect information from you when you register on our platform,
            book a court, or otherwise use our services. This includes:
          </p>
          <ul className="mb-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and payment details.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use the
              platform, such as booking history and search preferences.
            </li>
            <li>
              <strong>Device Information:</strong> Device type, IP address, and
              browser type, collected to improve user experience.
            </li>
          </ul>

          <h4>2. How We Use Your Information</h4>
          <p>The information we collect is used to:</p>
          <ul className="mb-2">
            <li>Facilitate and manage bookings on our platform.</li>
            <li>Send notifications and updates related to your bookings.</li>
            <li>
              Improve our services and personalize your experience on the
              platform.
            </li>
            <li>
              Process payments securely and prevent fraudulent activities.
            </li>
          </ul>

          <h4>3. Sharing Your Information</h4>
          <p>
            We may share your information with third-party service providers for
            the purpose of processing payments, providing customer support, or
            analyzing data. We ensure these providers comply with our data
            protection standards.
          </p>

          <h4>4. Data Security</h4>
          <p>
            We implement various security measures to protect your personal
            data. Access to your personal information is limited to authorized
            personnel only, and all sensitive data is encrypted. However, please
            note that no data transmission over the internet can be guaranteed
            as fully secure.
          </p>

          <h4>5. Your Rights</h4>
          <p>You have the right to:</p>
          <ul>
            <li>Access and review the information we hold about you.</li>
            <li>
              Request corrections to any inaccurate or outdated information.
            </li>
            <li>
              Request deletion of your personal data, subject to legal and
              contractual restrictions.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at{" "}
            <a href="mailto:[SupportEmail]">[SupportEmail]</a>.
          </p>

          <h4>6. Cookies</h4>
          <p>
            Our platform uses cookies to enhance user experience and gather
            analytics data. You can choose to disable cookies in your browser
            settings, though this may affect certain functionalities on our
            platform.
          </p>

          <h4>7. Changes to This Privacy Policy</h4>
          <p>
            We reserve the right to update this Privacy Policy as needed. Any
            changes will be posted on this page, and continued use of the
            platform constitutes acceptance of these changes.
          </p>

          <h4>8. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy or how we handle
            your data, please contact us at{" "}
            <a href="mailto:[SupportEmail]">[SupportEmail]</a>.
          </p>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default PrivacyPolicy;
