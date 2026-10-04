import React, { useEffect, useState } from "react";

import {
  Search,
  Filter,
  Grid,
  List,
  X,
  Sparkles,
  BriefcaseBusiness,
  SlidersHorizontal,
  MapPin,
  TrendingUp,
  RotateCcw,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";

import FilterContent from "./components/FilterContent";
import SearchHeader from "./components/SearchHeader";

import Navbar from "../../components/layout/Navbar";
import JobCard from "../../components/Cards/JobCard";

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ============================================================
  // STATES
  // ============================================================

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    type: "",
    minSalary: "",
    maxSalary: "",
  });

  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    salary: true,
    categories: true,
  });

  // ============================================================
  // FETCH JOBS
  // ============================================================

  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (filterParams.keyword) {
        params.append("keyword", filterParams.keyword);
      }

      if (filterParams.location) {
        params.append("location", filterParams.location);
      }

      if (filterParams.category) {
        params.append("category", filterParams.category);
      }

      if (filterParams.type) {
        params.append("type", filterParams.type);
      }

      if (filterParams.minSalary) {
        params.append("minSalary", filterParams.minSalary);
      }

      if (filterParams.maxSalary) {
        params.append("maxSalary", filterParams.maxSalary);
      }

      if (user?._id) {
        params.append("userId", user._id);
      }

      const query = params.toString();

      const url = query
        ? `${API_PATHS.JOBS.GET_ALL_JOBS}?${query}`
        : API_PATHS.JOBS.GET_ALL_JOBS;

      const response = await axiosInstance.get(url);

      const jobsData = Array.isArray(response.data)
        ? response.data
        : response.data?.jobs || [];

      setJobs(jobsData);
    } catch (err) {
      console.error("FETCH JOBS ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load jobs. Please try again."
      );

      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // FETCH WHEN FILTER CHANGES
  // ============================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    filters.keyword,
    filters.location,
    filters.category,
    filters.type,
    filters.minSalary,
    filters.maxSalary,
    user?._id,
  ]);

  // ============================================================
  // FILTER HANDLERS
  // ============================================================

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      category: "",
      type: "",
      minSalary: "",
      maxSalary: "",
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== ""
  ).length;

  // ============================================================
  // SAVE JOB
  // ============================================================

  const toggleSaveJob = async (jobId, isSaved) => {
    try {
      if (!jobId) {
        toast.error("Invalid job ID");
        return;
      }

      if (isSaved) {
        await axiosInstance.delete(
          API_PATHS.JOBS.UNSAVE_JOB(jobId)
        );

        toast.success("Job removed from saved jobs");
      } else {
        await axiosInstance.post(
          API_PATHS.JOBS.SAVE_JOB(jobId)
        );

        toast.success("Job saved successfully");
      }

      await fetchJobs(filters);
    } catch (err) {
      console.error("SAVE JOB ERROR:", err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to update saved job."
      );
    }
  };

  // ============================================================
  // APPLY JOB
  // ============================================================

  const applyToJob = async (jobId) => {
    try {
      if (!jobId) {
        toast.error("Invalid job ID");
        return;
      }

      await axiosInstance.post(
        API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId)
      );

      toast.success("Application submitted successfully");

      await fetchJobs(filters);
    } catch (err) {
      console.error("APPLY JOB ERROR:", err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to apply to job. Please try again."
      );
    }
  };

  // ============================================================
  // MOBILE FILTER
  // ============================================================

  const MobileFilter = () => {
    if (!showMobileFilters) return null;

    return (
      <div className="fixed inset-0 z-[9999] lg:hidden">

        {/* BACKDROP */}

        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setShowMobileFilters(false)}
        />

        {/* DRAWER */}

        <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">

          {/* HEADER */}

          <div className="shrink-0 flex items-center justify-between px-5 py-5 border-b bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Filter className="w-5 h-5 text-white" />
              </div>

              <div>
                <h3 className="font-black text-slate-900">
                  Filter Jobs
                </h3>

                <p className="text-xs text-slate-500">
                  Refine your search
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setShowMobileFilters(false)}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

          {/* FILTER CONTENT */}

          <div className="flex-1 overflow-y-auto p-5">

            <FilterContent
              toggleSection={toggleSection}
              clearAllFilters={clearAllFilters}
              expandedSections={expandedSections}
              filters={filters}
              handleFilterChange={handleFilterChange}
            />

          </div>

          {/* FOOTER */}

          <div className="shrink-0 p-5 border-t bg-white">

            <button
              type="button"
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition"
            >
              Show {jobs.length} Jobs
            </button>

          </div>

        </div>
      </div>
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading && jobs.length === 0) {
    return <LoadingSpinner />;
  }

  // ============================================================
  // MAIN
  // ============================================================

  return (
    <div className="relative min-h-screen bg-[#f4f7ff]">

      {/* ======================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">

        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-blue-400/20 blur-[160px]" />

        <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-purple-400/20 blur-[160px]" />

        <div className="absolute top-[35%] left-[35%] w-[500px] h-[500px] rounded-full bg-cyan-300/10 blur-[150px]" />

        <div className="absolute bottom-[-250px] right-[-100px] w-[650px] h-[650px] rounded-full bg-pink-300/10 blur-[160px]" />

      </div>

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* ======================================================
          PAGE CONTENT
      ====================================================== */}

      <main className="relative pt-24 pb-16">

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* ==================================================
              HERO
          ================================================== */}

          <section className="relative overflow-hidden rounded-[30px] mb-7 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-[0_25px_80px_rgba(79,70,229,0.25)]">

            {/* GLOW */}

            <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px]" />

            <div className="absolute -bottom-60 left-1/3 w-[600px] h-[600px] rounded-full bg-cyan-300/10 blur-[130px]" />

            {/* DECORATIVE CIRCLES */}

            <div className="absolute top-8 right-10 w-20 h-20 rounded-full border border-white/10" />

            <div className="absolute bottom-8 right-32 w-10 h-10 rounded-full border border-white/10" />

            <div className="relative px-6 sm:px-8 lg:px-10 py-8">

              {/* BADGE */}

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold">

                <Sparkles className="w-4 h-4" />

                Find your next opportunity

                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />

              </div>

              {/* TITLE */}

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">

                Find Your{" "}

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-purple-200">
                  Dream Job
                </span>

              </h1>

              <p className="mt-3 text-blue-100 max-w-2xl text-sm sm:text-base">
                Discover opportunities that match your skills,
                experience and career goals.
              </p>

              {/* SEARCH */}

              <div className="mt-7 bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/50">

                <SearchHeader
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                />

              </div>

              {/* STATS */}

              <div className="flex flex-wrap gap-3 mt-5">

                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white">

                  <BriefcaseBusiness className="w-4 h-4" />

                  <span className="text-sm font-semibold">
                    {jobs.length}+ Jobs
                  </span>

                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white">

                  <TrendingUp className="w-4 h-4" />

                  <span className="text-sm font-semibold">
                    New Opportunities
                  </span>

                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white">

                  <MapPin className="w-4 h-4" />

                  <span className="text-sm font-semibold">
                    Remote & On-site
                  </span>

                </div>

              </div>

            </div>
          </section>

          {/* ==================================================
              TRUST CARDS
          ================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

            <div className="bg-white/85 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-4 flex items-center gap-3 hover:-translate-y-1 transition">

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-sm">
                  Verified Opportunities
                </p>

                <p className="text-xs text-slate-500">
                  Trusted job listings
                </p>
              </div>

            </div>

            <div className="bg-white/85 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-4 flex items-center gap-3 hover:-translate-y-1 transition">

              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-sm">
                  Fast Applications
                </p>

                <p className="text-xs text-slate-500">
                  Apply in a few clicks
                </p>
              </div>

            </div>

            <div className="bg-white/85 backdrop-blur-xl rounded-2xl border border-white shadow-sm p-4 flex items-center gap-3 hover:-translate-y-1 transition">

              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>

              <div>
                <p className="font-bold text-slate-800 text-sm">
                  Career Growth
                </p>

                <p className="text-xs text-slate-500">
                  Grow your career
                </p>
              </div>

            </div>

          </div>

          {/* ==================================================
              MAIN CONTENT
          ================================================== */}

          <div className="flex flex-col lg:flex-row gap-7 items-start">

            {/* =================================================
                FILTER SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block w-[290px] xl:w-[310px] shrink-0 sticky top-24">

              <div className="bg-white/90 backdrop-blur-xl rounded-[26px] border border-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">

                {/* FILTER HEADER */}

                <div className="px-5 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                        <Filter className="w-5 h-5 text-white" />
                      </div>

                      <div>
                        <h3 className="font-black text-slate-900">
                          Filter Jobs
                        </h3>

                        <p className="text-xs text-slate-500">
                          Refine results
                        </p>
                      </div>

                    </div>

                    {activeFilterCount > 0 && (
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}

                  </div>

                </div>

                {/* FILTER CONTENT */}

                <div className="max-h-[calc(100vh-120px)] overflow-y-auto p-5">

                  <FilterContent
                    toggleSection={toggleSection}
                    clearAllFilters={clearAllFilters}
                    expandedSections={expandedSections}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                  />

                </div>

              </div>

            </aside>

            {/* =================================================
                JOB RESULTS
            ================================================= */}

            <section className="flex-1 min-w-0">

              {/* RESULTS HEADER */}

              <div className="bg-white/90 backdrop-blur-xl rounded-[24px] border border-white shadow-sm px-5 sm:px-6 py-5 mb-5">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 flex items-center justify-center">

                      <BriefcaseBusiness className="w-5 h-5" />

                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <h2 className="text-xl font-black text-slate-900">
                          Available Jobs
                        </h2>

                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-black">
                          {jobs.length}
                        </span>

                      </div>

                      <p className="text-sm text-slate-500">
                        Find the opportunity that fits you best.
                      </p>

                    </div>

                  </div>

                  {/* CONTROLS */}

                  <div className="flex items-center gap-2">

                    {/* MOBILE FILTER */}

                    <button
                      type="button"
                      onClick={() => setShowMobileFilters(true)}
                      className="lg:hidden relative w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"
                    >
                      <SlidersHorizontal className="w-5 h-5" />

                      {activeFilterCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>

                    {/* CLEAR */}

                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Clear
                      </button>
                    )}

                    {/* GRID / LIST */}

                    <div className="flex items-center gap-1 p-1 rounded-xl border border-slate-200 bg-white">

                      <button
                        type="button"
                        onClick={() => setViewMode("grid")}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                          viewMode === "grid"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                            : "text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setViewMode("list")}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                          viewMode === "list"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                            : "text-slate-400 hover:bg-slate-100"
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <p className="font-bold text-sm">
                        Something went wrong
                      </p>

                      <p className="text-xs mt-1">
                        {error}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => fetchJobs(filters)}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
                    >
                      Retry
                    </button>

                  </div>

                </div>
              )}

              {/* =================================================
                  JOBS
              ================================================= */}

              {jobs.length === 0 && !loading ? (

                <div className="min-h-[450px] rounded-[28px] bg-white/90 border border-white shadow-sm flex flex-col items-center justify-center text-center px-6">

                  <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">

                    <Search className="w-10 h-10 text-blue-600" />

                  </div>

                  <h3 className="mt-6 text-2xl font-black text-slate-900">
                    No Jobs Found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 max-w-md">
                    Try changing your keywords, location or filters
                    to find more opportunities.
                  </p>

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear Filters
                  </button>

                </div>

              ) : (

                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 xl:grid-cols-2 gap-5 pb-10"
                      : "flex flex-col gap-5 pb-10"
                  }
                >

                  {jobs.map((job) => (

                    <div
                      key={job._id}
                      className="relative group"
                    >

                      {/* GLOW */}

                      <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                      {/* JOB CARD */}

                      <div className="relative">

                        <JobCard
                          job={job}
                          onClick={() =>
                            navigate(`/job/${job._id}`)
                          }
                          onToggleSave={() =>
                            toggleSaveJob(
                              job._id,
                              job.isSaved
                            )
                          }
                          onApply={() =>
                            applyToJob(job._id)
                          }
                        />

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </section>

          </div>

        </div>

      </main>

      {/* MOBILE FILTER */}

      <MobileFilter />

    </div>
  );
};

export default JobSeekerDashboard;