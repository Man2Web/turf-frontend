import React, { useState } from "react";
import { Link } from "react-router-dom";
import SuperAdminMenu from "../../../components/super-admin/profile/super-admin-menu";
import CouponsDataTable from "../../../components/super-admin/coupons/coupons-data-table";
import AddCoupon from "../../../components/super-admin/coupons/add-coupon";

const SuperAdminCoupon = () => {
  const [userSelected, setUserSelected] = useState<number>(0);
  return (
    <div>
      {/* Dashboard Menu */}
      <SuperAdminMenu />

      {/* Page Content */}
      <div className="content court-bg">
        <div className="container">
          <div className="coach-court-list profile-court-list">
            <ul className="nav">
              <li>
                <Link
                  onClick={() => setUserSelected(0)}
                  to={"#"}
                  className={userSelected === 0 ? "active" : ""}
                >
                  Manage Coupons
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setUserSelected(1)}
                  to={"#"}
                  className={userSelected === 1 ? "active" : ""}
                >
                  Add Coupon
                </Link>
              </li>
            </ul>
          </div>
          {userSelected === 0 && <CouponsDataTable />}
          {userSelected === 1 && <AddCoupon />}
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default SuperAdminCoupon;
