
import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { getInitials } from "../../utils/helper";
import StatusBadge from "../../components/StatusBadge";
import ApplicantProfilPreview from "../../components/Cards/ApplicantProfilPreview";

// ============================================================
// REMOVE NUMBER FROM JOB TITLE
// ============================================================
// Examples:
//
// HR Executive - 19  -> HR Executive
// HR Executive #19   -> HR Executive
// HR Executive (19)  -> HR Executive
// HR Executive 19    -> HR Executive
//
// ============================================================

const cleanJobTitle = (title) => {
  if (!title) return "Untitled Job";

  let cleanTitle = String(title).trim();

  // Remove "- 19"
  cleanTitle = cleanTitle.replace(/\s*-\s*\d+\s*$/g, "");

  // Remove "#19"
  cleanTitle = cleanTitle.replace(/\s*#\s*\d+\s*$/g, "");

  // Remove "(19)"
  cleanTitle = cleanTitle.replace(/\s*\(\s*\d+\s*\)\s*$/g, "");

  // Remove ending number
  cleanTitle = cleanTitle.replace(/\s+\d+\s*$/g, "");

  return cleanTitle.trim();
};

// ============================================================
// APPLICATION VIEWER
// ============================================================

const ApplicationViewer = () => {
  const location = useLocation();

  const jobId = location.state?.jobId || null;

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] =
    useState(null);

  // ==========================================================
  // FETCH APPLICATIONS
  // ==========================================================

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
      );

      // Backend returns:
      // { success: true, applications: [...] }

      setApplications(
        Array.isArray(response.data?.applications)
          ? response.data.applications
          : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch applications:",
        error.response?.data || error.message
      );

      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOAD APPLICATIONS
  // ==========================================================

  useEffect(() => {
    if (jobId) {
      fetchApplications();
    } else {
      navigate("/manage-jobs");
    }
  }, [jobId]);

  // ==========================================================
  // GROUP APPLICATIONS BY JOB
  // ==========================================================

  const groupedApplications = useMemo(() => {
    const filtered = applications.filter(
      (app) => app?.job?._id
    );

    return filtered.reduce((acc, app) => {
      const currentJobId = app.job._id;

      if (!acc[currentJobId]) {
        acc[currentJobId] = {
          job: app.job,
          applications: [],
        };
      }

      acc[currentJobId].applications.push(app);

      return acc;
    }, {});
  }, [applications]);

  // ==========================================================
  // DOWNLOAD RESUME
  // ==========================================================

  const handleDownloadResume = (resumeUrl) => {
    if (!resumeUrl) {
      alert("Resume not available");
      return;
    }

    window.open(resumeUrl, "_blank");
  };

  // ==========================================================
  // UPDATE STATUS
  // ==========================================================

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      await axiosInstance.put(
        API_PATHS.APPLICATIONS.UPDATE_STATUS(
          applicationId
        ),
        {
          status,
        }
      );

      alert(
        status === "Accepted"
          ? "Application Accepted"
          : "Application Rejected"
      );

      await fetchApplications();
    } catch (error) {
      console.error(
        "Failed to update application status:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <DashboardLayout activeMenu="manage-jobs">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">

            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

            <p className="mt-4 text-gray-600">
              Loading Applications...
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ==========================================================
  // MAIN UI
  // ==========================================================

  return (
    <DashboardLayout activeMenu="manage-jobs">

      <div className="min-h-screen bg-gray-50">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4 mb-4 sm:mb-0">

              <button
                onClick={() =>
                  navigate("/manage-jobs")
                }
                className="group flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 border border-gray-200 hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

                <span>
                  Back
                </span>

              </button>

              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                Applications Overview
              </h1>

            </div>

          </div>

        </div>

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-8">

          {/* ==================================================
              NO APPLICATIONS
          ================================================== */}

          {Object.keys(groupedApplications).length === 0 ? (

            <div className="text-center py-16">

              <Users className="mx-auto h-24 w-24 text-gray-300" />

              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No Applications Available
              </h3>

              <p className="mt-2 text-gray-500">
                No Applications Found At The Moment.
              </p>

            </div>

          ) : (

            /* ==================================================
               APPLICATIONS BY JOB
            ================================================== */

            <div className="space-y-8">

              {Object.values(groupedApplications).map(
                ({ job, applications }) => (

                  <div
                    key={job._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >

                    {/* ========================================
                        JOB HEADER
                    ======================================== */}

                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                          {/* ==================================
                              CLEAN JOB TITLE
                          ================================== */}

                          <h2 className="text-lg font-semibold text-white">

                            {cleanJobTitle(job?.title)}

                          </h2>

                          <div className="flex flex-wrap items-center gap-4 mt-2 text-blue-100">

                            {/* LOCATION */}

                            <div className="flex items-center gap-1">

                              <MapPin className="h-4 w-4" />

                              <span className="text-sm">
                                {job?.location || "Unknown"}
                              </span>

                            </div>

                            {/* TYPE */}

                            <div className="flex items-center gap-1">

                              <Briefcase className="h-4 w-4" />

                              <span className="text-sm">
                                {job?.type || "N/A"}
                              </span>

                            </div>

                            {/* CATEGORY */}

                            <div className="flex items-center gap-1">

                              <span className="text-sm">
                                {job?.category || "N/A"}
                              </span>

                            </div>

                          </div>

                        </div>

                        {/* APPLICATION COUNT */}

                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">

                          <span className="text-sm text-white font-medium">

                            {applications.length}{" "}
                            Application
                            {applications.length !== 1
                              ? "s"
                              : ""}

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* ========================================
                        APPLICATION LIST
                    ======================================== */}

                    <div className="p-6">

                      <div className="space-y-4">

                        {applications.map(
                          (application, index) => (

                            <div
                              key={application._id}
                              className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >

                              {/* =================================
                                  LEFT SIDE
                              ================================= */}

                              <div className="flex items-center gap-4">

                                {/* SERIAL NUMBER */}

                                <div className="flex-shrink-0">

                                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">

                                    <span className="text-blue-600 font-bold text-sm">
                                      #{index + 1}
                                    </span>

                                  </div>

                                </div>

                                {/* AVATAR */}

                                <div className="flex-shrink-0">

                                  {application?.applicant?.avatar ? (

                                    <img
                                      src={
                                        application.applicant
                                          .avatar
                                      }
                                      alt={
                                        application.applicant
                                          ?.name ||
                                        "Applicant"
                                      }
                                      className="h-12 w-12 rounded-full object-cover"
                                    />

                                  ) : (

                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">

                                      <span className="text-blue-600 font-semibold">

                                        {getInitials(
                                          application
                                            ?.applicant
                                            ?.name || "A"
                                        )}

                                      </span>

                                    </div>

                                  )}

                                </div>

                                {/* APPLICANT INFO */}

                                <div className="min-w-0 flex-1">

                                  <h3 className="font-semibold text-gray-900">

                                    {application?.applicant
                                      ?.name ||
                                      "Unnamed Applicant"}

                                  </h3>

                                  <p className="text-gray-600 text-sm">

                                    {application?.applicant
                                      ?.email ||
                                      "No email provided"}

                                  </p>

                                  <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">

                                    <Calendar className="h-3 w-3" />

                                    <span>

                                      Applied{" "}

                                      {application?.createdAt
                                        ? moment(
                                            application.createdAt
                                          ).format(
                                            "DD MM YYYY"
                                          )
                                        : "N/A"}

                                    </span>

                                  </div>

                                </div>

                              </div>

                              {/* =================================
                                  ACTIONS
                              ================================= */}

                              <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">

                                {/* STATUS */}

                                <StatusBadge
                                  status={
                                    application.status
                                  }
                                />

                                {/* ACCEPT */}

                                {application.status !==
                                  "Accepted" && (

                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        application._id,
                                        "Accepted"
                                      )
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                                  >
                                    Accept
                                  </button>

                                )}

                                {/* REJECT */}

                                {application.status !==
                                  "Rejected" && (

                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        application._id,
                                        "Rejected"
                                      )
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                                  >
                                    Reject
                                  </button>

                                )}

                                {/* RESUME */}

                                <button
                                  onClick={() =>
                                    handleDownloadResume(
                                      application
                                        ?.applicant
                                        ?.resume
                                    )
                                  }
                                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                >

                                  <Download className="h-4 w-4" />

                                  Resume

                                </button>

                                {/* VIEW PROFILE */}

                                <button
                                  onClick={() =>
                                    setSelectedApplicant(
                                      {
                                        ...application,

                                        // Save serial number
                                        serialNumber:
                                          index + 1,
                                      }
                                    )
                                  }
                                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                >

                                  <Eye className="h-4 w-4" />

                                  View Profile

                                </button>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        {/* ====================================================
            PROFILE MODAL
        ==================================================== */}

        {selectedApplicant && (

          <ApplicantProfilPreview
            selectedApplicant={
              selectedApplicant
            }

            setSelectedApplicant={
              setSelectedApplicant
            }

            handleDownloadResume={
              handleDownloadResume
            }

            serialNumber={
              selectedApplicant?.serialNumber || 1
            }

            handleClose={() => {

              setSelectedApplicant(null);

              fetchApplications();

            }}
          />

        )}

      </div>

    </DashboardLayout>
  );
};

export default ApplicationViewer;
