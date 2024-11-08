import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const TermsCondition = () => {
  const route = all_routes;
  return (
    <div className="main-wrapper terms-page innerpagebg">
      {/* Page Content */}
      <div className="content">
        <div className="container">
          <h3>Terms and Conditions</h3>
          <p>
            Welcome to [Application Name]! These Terms and Conditions govern
            your use of our turf booking platform. By accessing or using our
            platform, you agree to abide by these terms.
          </p>

          <h4>1. Acceptance of Terms</h4>
          <p>
            By creating an account, accessing, or using our platform, you
            acknowledge that you have read, understood, and agree to these Terms
            of Use. If you disagree with any part, please do not use the
            platform.
          </p>

          <h4>2. User Roles and Permissions</h4>
          <p>
            Our platform supports three levels of user access:{" "}
            <strong>User</strong>, <strong>Admin</strong>, and{" "}
            <strong>Super-Admin</strong>. Each role has specific permissions and
            responsibilities:
          </p>

          <div className="row">
            <div className="col-12 col-md-4">
              <h5>User</h5>
              <p>
                <ul>
                  <li>View available courts.</li>
                  <li>Book courts and manage bookings.</li>
                  <li>Access personal booking history.</li>
                </ul>
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h5>Admin</h5>
              <p>
                <ul>
                  <li>
                    Manage courts by creating, editing, and setting
                    availability.
                  </li>
                  <li>
                    View and manage court bookings for their assigned courts.
                  </li>
                  <li>
                    Admins must await Super-Admin approval to make courts
                    visible to users.
                  </li>
                </ul>
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h5>Super-Admin</h5>
              <p>
                <ul>
                  <li>
                    Approve courts added by Admins before they are made
                    available to Users.
                  </li>
                  <li>
                    Revoke court access as necessary for safety and platform
                    integrity.
                  </li>
                  <li>
                    Manage user access, content approval, and platform
                    oversight.
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <h4>3. Account Registration and Use</h4>
          <p>
            All users must create an account with accurate, up-to-date
            information. Users are responsible for keeping login credentials
            secure. You are responsible for all activities under your account
            and agree to notify us of any unauthorized access or security
            breaches.
          </p>

          <h4>4. Booking and Payment Terms</h4>
          <p>
            <strong>Booking Confirmations</strong>: Bookings are subject to
            availability and will be confirmed via email or in-app notification.
            Payments must be made at booking, and users are responsible for any
            applicable taxes.
          </p>
          <p>
            <strong>Cancellation and Refunds</strong>: Users can cancel up to [X
            hours/days] before the booking for a full refund. The platform
            reserves the right to cancel bookings in case of unforeseen
            circumstances, in which case a full refund will be provided.
          </p>

          <h4>5. Court Management and Approval Process</h4>
          <p>
            <strong>Court Creation and Updates (Admin)</strong>: Admins are
            responsible for the accuracy of details when creating or editing
            courts. Courts require Super-Admin approval before becoming
            available for booking.
          </p>
          <p>
            <strong>Approval and Revocation (Super-Admin)</strong>: Super-Admins
            review court details for quality and safety, reserving the right to
            revoke access to any court if needed.
          </p>

          <h4>6. User Conduct and Responsibilities</h4>
          <p>
            Users must comply with all applicable laws and facility rules.
            Prohibited activities include misuse of the platform, unauthorized
            access, and disruptive or harmful behavior. [Application Name] is
            not responsible for injuries or damages incurred while using booked
            facilities.
          </p>

          <h4>7. Privacy and Data Protection</h4>
          <p>
            All data collection, storage, and processing are governed by our{" "}
            <a href="[PrivacyPolicyLink]">Privacy Policy</a>. Users consent to
            data processing in line with this policy.
          </p>

          <h4>8. Intellectual Property Rights</h4>
          <p>
            All content on the platform is owned by Man2Web or its licensors.
            Users are granted a limited license to use the platform in
            accordance with these Terms. Unauthorized use is prohibited.
          </p>

          <h4>9. Disclaimers and Limitation of Liability</h4>
          <p>
            We strive to maintain platform availability but cannot guarantee
            uninterrupted service. Man2Web is not liable for any damages arising
            from the use or inability to use the platform.
          </p>

          <h4>10. Indemnification</h4>
          <p>
            Users agree to indemnify Man2Web and its affiliates from claims,
            damages, and expenses arising from use of the platform, misuse, or
            violation of these Terms.
          </p>

          <h4>11. Modifications to Terms</h4>
          <p>
            We reserve the right to update these Terms at any time. Continued
            use of the platform after modifications constitutes acceptance of
            the revised Terms.
          </p>

          <h4>12. Governing Law and Dispute Resolution</h4>
          <p>
            These Terms are governed by the laws of [Country/State]. Disputes
            shall be resolved through [e.g., arbitration, specific
            jurisdiction].
          </p>

          <p>
            By using our platform, you agree to these Terms of Use. For any
            questions, please contact us at{" "}
            <a href="mailto:[SupportEmail]">[SupportEmail]</a>.
          </p>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default TermsCondition;
