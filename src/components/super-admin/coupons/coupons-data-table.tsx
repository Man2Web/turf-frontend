import React, { useEffect, useState } from "react";
import Loader from "../../common/loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "antd";

const CouponsDataTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [couponsData, setCouponsData] = useState<Coupon[]>([]);
  const adminId = localStorage.getItem("superAdminId");

  useEffect(() => {
    getAdminCouponsData();
  }, [adminId]);

  const getAdminCouponsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}superadmin/coupon/${adminId}`
      );
      if (response.status === 200) {
        setCouponsData(response.data.couponsData);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (adminId: string, couponId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}court/coupon/remove/${adminId}/${couponId}`
      );
      if (response.status === 200) {
        toast.success("Coupon Deletd Successfully");
        setCouponsData([]);
        getAdminCouponsData();
      } else {
        toast.error("Could Not Delete Coupon");
      }
    } catch (error) {
      // console.error(error);
      toast.error("Error deleting coupon");
    }
  };

  const renderDateISOStart = ({ start_time }: Coupon) => {
    const startTime = new Date(start_time);
    return <span>{startTime.toLocaleString()}</span>;
  };

  const renderDateISOEnd = ({ end_time }: Coupon) => {
    const startTime = new Date(end_time);
    return <span>{startTime.toLocaleString()}</span>;
  };

  const deleteCouponHtml = ({ id }: Coupon) => {
    if (adminId) {
      return (
        <Button
          onClick={() => deleteCoupon(adminId, id)}
          danger
          type="primary"
          size="large"
        >
          <i className="feather-trash" />
        </Button>
      );
    }
    return null;
  };

  const columns = [
    {
      field: "coupon_code",
      header: "Coupon Code",
      sortable: true,
    },
    {
      field: "coupon_label",
      header: "Coupon Label",
      sortable: true,
    },
    {
      field: "percentage",
      header: "Percentage",
      sortable: true,
    },
    {
      field: "amount",
      header: "Amount",
      sortable: true,
    },
    {
      field: "start_time",
      header: "Coupon Start Time",
      body: renderDateISOStart,
      sortable: true,
    },
    {
      field: "end_time",
      header: "Coupon End Time",
      body: renderDateISOEnd,
      sortable: true,
    },
    {
      header: "Actions",
      body: deleteCouponHtml,
    },
  ];
  return (
    <>
      <ToastContainer />
      <Loader loader={loading} loadingDescription="Fetching Coupons..." />
      {!loading && (
        <div className="row">
          <div className="card col-sm-12">
            <DataTable stripedRows value={couponsData}>
              {columns.map((column, index) => (
                <Column
                  key={index}
                  field={column.field}
                  header={column.header}
                  body={column.body}
                  sortable={column.sortable}
                />
              ))}
            </DataTable>
          </div>
        </div>
      )}
    </>
  );
};

export default CouponsDataTable;
