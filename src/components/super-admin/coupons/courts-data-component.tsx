import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../common/loader/Loader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

type Court = {
  courts: {
    court_id: string;
    admin_id: number;
    court_name: string;
    court_type: string;
    featured: boolean;
    approved: boolean;
  };
  court_details: {
    phone_number: string;
  };
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

  const updateCourtStatus = async (id: string, status: boolean) => {
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

  const deleteCourt = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}superadmin/court/${id}`
      );
      toast.success(response.data.message);
      getCourtsData();
    } catch (error) {
      toast.error("Error updating court");
      console.log(error);
    }
  };
  console.log(currentData);
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
                            <h4>Courts Data</h4>
                            <p>
                              Effortlessly track and manage your courts data
                            </p>
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
                              stripedRows
                              sortMode="multiple"
                            >
                              <Column
                                sortable
                                field="courtName"
                                header="Court Name"
                                body={(rowData: Court) => (
                                  <td>
                                    <h2 className="table-avatar">
                                      {rowData.courts.court_name}
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
                                      {rowData.court_details.phone_number}
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
                                      {rowData.courts.court_type}
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
                                      {rowData.courts.admin_id}
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
                                      {rowData.courts.approved ? (
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
                                      to={`/super-admin/court/${rowData.courts.court_id}`}
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
                                    {rowData.courts.approved ? (
                                      <div className="table-accept-btn text-end">
                                        <Link
                                          onClick={() =>
                                            updateCourtStatus(
                                              rowData.courts.court_id,
                                              false
                                            )
                                          }
                                          to="#"
                                          className="btn accept-btn"
                                        >
                                          <i className="feather-check-circle"></i>
                                          Revoke
                                        </Link>
                                        <Link
                                          onClick={() =>
                                            deleteCourt(rowData.courts.court_id)
                                          }
                                          to="#"
                                          className="btn btn-red"
                                        >
                                          <i className="feather-x-circle"></i>
                                          Delete
                                        </Link>
                                      </div>
                                    ) : (
                                      <div className="table-accept-btn text-end">
                                        <Link
                                          onClick={() =>
                                            updateCourtStatus(
                                              rowData.courts.court_id,
                                              true
                                            )
                                          }
                                          to="#"
                                          className="btn accept-btn"
                                        >
                                          <i className="feather-check-circle"></i>
                                          Approve
                                        </Link>
                                        <Link
                                          onClick={() =>
                                            deleteCourt(rowData.courts.court_id)
                                          }
                                          to="#"
                                          className="btn btn-red"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtsDataComponent;
