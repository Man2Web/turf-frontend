import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminMenuComponent from "../../components/admin/adminMenu";
import AddCoupon from "../../components/admin/coupons/add-coupon";
import CouponsDataTable from "../../components/admin/coupons/coupons-data-table";

const AdminCoupon = () => {
  const [userSelected, setUserSelected] = useState<number>(0);
  return (
    <div>
      {/* Dashboard Menu */}
      <AdminMenuComponent />

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

export default AdminCoupon;
