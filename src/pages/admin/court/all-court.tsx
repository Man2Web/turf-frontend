import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../components/common/loader/Loader";
import AdminMenuComponent from "../../../components/admin/profile/adminMenu";
import { Badge } from "primereact/badge";
import { useAppContext } from "../../../context/app-context";

const AllCourt = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [courtsData, setCourtsData] = useState<CourtsData[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const adminId = localStorage.getItem("adminId");
  const { setLoading } = useAppContext();
  useEffect(() => {
    const apiCall = async () => {
      try {
        setLoading({ status: true, description: "Fetching Courts Data..." });
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}admin/court/fetch/${adminId}`
        );
        setCourtsData(response.data.courtsData);
      } catch (error) {
        // console.error("Error fetching courts data:", error);
        toast.error("Failed to load courts data.");
      } finally {
        setLoading({ status: false, description: "Fetching Courts Data..." });
      }
    };

    if (adminId) {
      apiCall();
    } else {
      toast.error("You don't have the permission.");
    }
  }, []);

  const filteredData = Array.isArray(courtsData)
    ? courtsData.filter(
        ({ court_name, location, pricing, venue_overview, status }) => {
          const search = searchInput.toLowerCase();
          return [
            court_name,
            location?.city,
            pricing?.starting_price,
            pricing?.guests,
            pricing?.additional_guests,
            venue_overview,
            status,
          ].some(
            (value) => value && value.toString().toLowerCase().includes(search)
          );
        }
      )
    : [];

  // Helper functions
  const renderCourtName = ({ images, court_name, court_id }: CourtsData) => (
    <h2 className="table-avatar">
      <Link to="#" className="avatar avatar-sm flex-shrink-0">
        {/* <ImageWithBasePath
          className="avatar-img"
          src="https://cdn.britannica.com/69/228369-050-0B18A1F6/Asian-Cup-Final-2019-Hasan-Al-Haydos-Qatar-Japan-Takumi-Minamino.jpg"
          alt="Court"
        /> */}
        {/* <img
          className="avatar-img"
          src="https://cdn.britannica.com/69/228369-050-0B18A1F6/Asian-Cup-Final-2019-Hasan-Al-Haydos-Qatar-Japan-Takumi-Minamino.jpg"
          alt="Court"
        /> */}
      </Link>
      <span className="table-head-name flex-grow-1">
        <Link to="#">{court_name}</Link>
        {/* <span>{court_id}</span> */}
      </span>
    </h2>
  );

  const renderActions = ({ court_id }: CourtsData) => (
    <div className="dropdown dropdown-action table-drop-action">
      <Link
        to="#"
        className="action-icon dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-ellipsis-h" />
      </Link>
      <div className="dropdown-menu dropdown-menu-end">
        <button
          className="dropdown-item"
          onClick={() => {
            navigate(`/admin/edit-court/${court_id}`);
          }}
        >
          <i className="feather-edit" />
          Edit
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            deleteCourt(court_id);
          }}
        >
          <i className="feather-trash" />
          Delete
        </button>
      </div>
    </div>
  );

  const renderStatus = ({ approved }: CourtsData) => {
    return (
      <div className="interset-btn">
        {approved ? (
          <Badge value="Approved" severity="success" />
        ) : (
          <Badge value="Pending" severity="secondary" />
        )}
      </div>
    );
  };

  const renderCourtType = ({ court_type }: CourtsData) => (
    <span>{court_type}</span>
  );

  const columns = [
    {
      field: "court_name",
      header: "Court Name",
      body: renderCourtName,
      sortable: true,
    },
    {
      field: "court_type",
      header: "Court Type",
      body: renderCourtType,
      sortable: true,
    },
    { field: "location.city", header: "City", sortable: true },
    { field: "pricing.starting_price", header: "Amount", sortable: true },
    { field: "pricing.guests", header: "Max Guest", sortable: true },
    {
      field: "pricing.additional_guests",
      header: "Additional Guests",
      sortable: true,
    },
    {
      field: "approved",
      header: "Status",
      body: renderStatus,
      sortable: true,
    },
    { body: renderActions, header: "Action" },
  ];

  const deleteCourt = async (courtId: string) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}admin/court/delete/${Number(adminId)}/${courtId}`
    );
    response.status === 200
      ? toast.success(response.data.message)
      : toast.error(response.data.message);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div>
      <ToastContainer />
      {/* Dashboard Menu */}
      <div className="dashboard-section coach-dash-section mb-10">
        <div className="container">
          <div className="row">
            <AdminMenuComponent />
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="dash-filter-box">
                <div className="input-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Court"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                {/* <div className="dropdown-box">
                  <Dropdown
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.value)}
                    options={timeframes}
                    placeholder="Select Timeframe"
                  />
                </div>
                <div className="dropdown-box">
                  <Dropdown
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.value)}
                    options={sortOptions}
                    placeholder="Sort By"
                  />
                </div> */}
              </div>
              <DataTable value={filteredData}>
                {columns.map((col) => (
                  <Column
                    key={col.field}
                    field={col.field}
                    header={col.header}
                    body={col.body}
                    sortable={col.sortable}
                  />
                ))}
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourt;
