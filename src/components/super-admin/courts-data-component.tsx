import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

type Court = {
  id: number;
  user_id: number;
  court_name: string;
  court_type: string;
  venue_overview: string;
  rules_of_venue: string;
  featured: boolean;
  phone_number: string;
  email: string;
  approved: boolean;
};

const CourtsDataComponent = () => {
  const [dataToggle, setDataToggle] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [approvedCourtsData, setApprovedCourtsData] = useState<Court[]>();
  const [pendingCourtsData, setPendingCourtsData] = useState<Court[]>();
  const [currentData, setCurrentData] = useState<Court[]>();

  const navigate = useNavigate();

  useEffect(() => {
    getCourtsData();
  }, [dataToggle]);

  const getCourtsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}superadmin/courts`
      );
      dataToggle === 1
        ? setCurrentData(response.data.pendingCourts)
        : setCurrentData(response.data.approvedCourts);
      setPendingCourtsData(response.data.pendingCourts);
      setApprovedCourtsData(response.data.approvedCourts);
    } catch (error) {
      toast.error("Error fetching courts data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCourtStatus = async (id: number, status: boolean) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}superadmin/court/approve/${id}`,
        { status: status }
      );
      toast.success(response.data.message);
      getCourtsData();
    } catch (error) {
      toast.error("Error updating court");
      console.log(error);
    }
  };

  const deleteCourt = async (id: number) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}superadmin/court/approve/${id}`,
        { status: status }
      );
      toast.success(response.data.message);
      getCourtsData();
    } catch (error) {
      toast.error("Error updating court");
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="content court-bg">
        <div className="container">
          {/* Sort By */}
          <div className="row">
            <div className="col-lg-12">
              <div className="sortby-section court-sortby-section">
                <div className="sorting-info">
                  <div className="row d-flex align-items-center">
                    <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
                      <div className="coach-court-list">
                        <ul className="nav">
                          <li>
                            <Link
                              className={`${dataToggle === 0 ? "active" : ""}`}
                              onClick={() => setDataToggle(0)}
                              to={""}
                            >
                              Approved
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={`${dataToggle === 1 ? "active" : ""}`}
                              onClick={() => setDataToggle(1)}
                              to={""}
                            >
                              Pending
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sort By */}
          <div className="row">
            <div className="col-sm-12">
              <div className="court-tab-content">
                <div className="card card-tableset">
                  <div className="card-body">
                    <div className="coache-head-blk">
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="court-table-head">
                            <h4>Bookings</h4>
                            <p>
                              Effortlessly track and manage your completed
                              bookings
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="coach-active-blk">
                            <div className="dataTables_filter">
                              <label>
                                <input
                                  type="text"
                                  value={searchInput}
                                  onChange={(e) =>
                                    setSearchInput(e.target.value)
                                  }
                                  placeholder="Search"
                                  className="form-control"
                                />
                              </label>
                            </div>
                            <div className="card-header-btns">
                              <nav>
                                <div className="nav nav-tabs" role="tablist">
                                  <button
                                    className="nav-link active"
                                    id="nav-Recent-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-Recent"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-Recent"
                                    aria-selected="true"
                                  >
                                    Court
                                  </button>
                                </div>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="nav-Recent"
                        role="tabpanel"
                        aria-labelledby="nav-Recent-tab"
                        tabIndex={0}
                      >
                        <div className="table-responsive">
                          {loading && <Loader />}
                          {!loading && (
                            <DataTable
                              value={currentData}
                              className="table table-borderless datatable"
                              paginator
                              stripedRows
                              sortMode="multiple"
                              rows={20}
                              rowsPerPageOptions={[20, 40, 60]}
                            >
                              <Column
                                sortable
                                field="courtId"
                                header="Court ID"
                                body={(rowData: Court) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      {rowData.id}
                                    </h2>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                sortable
                                field="courtName"
                                header="Court Name"
                                body={(rowData: Court) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      {rowData.court_name}
                                    </h2>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                sortable
                                field="managerNumber"
                                header="Manager Number"
                                body={(rowData: Court) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      {rowData.phone_number}
                                    </h2>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                sortable
                                field="courtType"
                                header="Court Type"
                                body={(rowData: Court) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      {rowData.court_type}
                                    </h2>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                sortable
                                field="userId"
                                header="Admin ID"
                                body={(rowData: Court) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      {rowData.user_id}
                                    </h2>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                sortable
                                field="approved"
                                header="Approved"
                                body={(rowData: Court) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      {rowData.approved ? (
                                        <Badge
                                          value="Approved"
                                          severity="success"
                                        >
                                          Approved
                                        </Badge>
                                      ) : (
                                        <Badge value="Pending" severity="info">
                                          Pending
                                        </Badge>
                                      )}
                                    </h2>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                field="viewCourt"
                                // header="View Court"
                                body={(rowData: Court) => (
                                  <td className="table-accept-btn text-end">
                                    <Link
                                      to={`/super-admin/court/${rowData.id}`}
                                      className="btn accept-btn"
                                    >
                                      <i className="feather-eye"></i>
                                      View
                                    </Link>
                                  </td>
                                )}
                              ></Column>
                              <Column
                                field="actionButtons"
                                // header=""
                                body={(rowData: Court) => (
                                  <td>
                                    {rowData.approved ? (
                                      <div className="table-accept-btn text-end">
                                        <Link
                                          onClick={() =>
                                            updateCourtStatus(rowData.id, false)
                                          }
                                          to="#"
                                          className="btn accept-btn"
                                        >
                                          <i className="feather-check-circle"></i>
                                          Revoke
                                        </Link>
                                        <Link
                                          onClick={() =>
                                            deleteCourt(rowData.id)
                                          }
                                          to="#"
                                          className="btn cancel-table-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#request-reject"
                                        >
                                          <i className="feather-x-circle"></i>
                                          Delete
                                        </Link>
                                      </div>
                                    ) : (
                                      <div className="table-accept-btn text-end">
                                        <Link
                                          onClick={() =>
                                            updateCourtStatus(rowData.id, true)
                                          }
                                          to="#"
                                          className="btn accept-btn"
                                        >
                                          <i className="feather-check-circle"></i>
                                          Approve
                                        </Link>
                                        <Link
                                          onClick={() =>
                                            deleteCourt(rowData.id)
                                          }
                                          to="#"
                                          className="btn cancel-table-btn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#request-reject"
                                        >
                                          <i className="feather-x-circle"></i>
                                          Delete
                                        </Link>
                                      </div>
                                    )}
                                  </td>
                                )}
                              ></Column>
                            </DataTable>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-footer">
                  <div className="row">
                    <div className="col-md-6">
                      <div id="tablelength" />
                    </div>
                    <div className="col-md-6">
                      <div id="tablepage" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtsDataComponent;
