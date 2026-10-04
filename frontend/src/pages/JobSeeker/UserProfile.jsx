import React, { useEffect, useMemo, useState } from "react";
import {
  Save,
  X,
  Trash2,
  Briefcase,
  MapPin,
  CalendarDays,
  Building2,
  Camera,
  FileText,
  CheckCircle2,
  UserRound,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Clock3,
  GraduationCap,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import Navbar from "../../components/layout/Navbar";

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  // =====================================================
  // PROFILE
  // =====================================================

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
    description: user?.description || "",
  });

  const [formData, setFormData] = useState({
    ...profileData,
  });

  // =====================================================
  // STATES
  // =====================================================

  const [uploading, setUploading] = useState({
    avatar: false,
    resume: false,
  });

  const [saving, setSaving] = useState(false);
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] =
    useState(true);
  const [applicationsError, setApplicationsError] =
    useState("");

  // =====================================================
  // INPUT
  // =====================================================

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // UPLOAD
  // =====================================================

  const handleImageUpload = async (file, type) => {
    if (!file) return;

    setUploading((prev) => ({
      ...prev,
      [type]: true,
    }));

    try {
      const response = await uploadImage(file);

      const uploadedUrl = response?.imageUrl || "";

      if (!uploadedUrl) {
        throw new Error("Upload URL was not returned");
      }

      handleInputChange(type, uploadedUrl);

      toast.success(
        type === "avatar"
          ? "Profile photo uploaded!"
          : "Resume uploaded!"
      );
    } catch (error) {
      console.error("Upload failed:", error);

      toast.error(
        `Failed to upload ${
          type === "avatar" ? "profile photo" : "resume"
        }`
      );

      handleInputChange(
        type,
        profileData[type] || ""
      );
    } finally {
      setUploading((prev) => ({
        ...prev,
        [type]: false,
      }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (type === "avatar") {
      const previewUrl = URL.createObjectURL(file);

      handleInputChange(
        "avatar",
        previewUrl
      );
    }

    handleImageUpload(file, type);
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        const updatedData = {
          ...formData,
        };

        setProfileData(updatedData);

        updateUser(
          response.data?.user || updatedData
        );

        toast.success(
          "Profile updated successfully!"
        );
      }
    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    setFormData({
      ...profileData,
    });

    toast.success("Changes discarded");
  };

  // =====================================================
  // DELETE RESUME
  // =====================================================

  const deleteResume = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your resume?"
    );

    if (!confirmed) return;

    setSaving(true);

    try {
      const response =
        await axiosInstance.post(
          API_PATHS.AUTH.DELETE_RESUME,
          {
            resumeUrl: user?.resume || "",
          }
        );

      if (response.status === 200) {
        const updatedData = {
          ...formData,
          resume: "",
        };

        setProfileData(updatedData);
        setFormData(updatedData);

        if (response.data?.user) {
          updateUser(response.data.user);
        } else {
          updateUser({
            ...user,
            resume: "",
          });
        }

        toast.success(
          "Resume deleted successfully!"
        );
      }
    } catch (error) {
      console.error(
        "Resume deletion failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete resume"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // APPLICATIONS
  // =====================================================

  const fetchApplications = async () => {
    setApplicationsLoading(true);
    setApplicationsError("");

    try {
      const response =
        await axiosInstance.get(
          API_PATHS.APPLICATIONS.GET_MY_APPLICATIONS
        );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.applications || [];

      setApplications(data);
    } catch (error) {
      console.error(
        "Failed to fetch applications:",
        error
      );

      setApplicationsError(
        error.response?.data?.message ||
          "Unable to load your applications."
      );

      setApplications([]);
    } finally {
      setApplicationsLoading(false);
    }
  };

  // =====================================================
  // USER EFFECT
  // =====================================================

  useEffect(() => {
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      resume: user?.resume || "",
      description: user?.description || "",
    };

    setProfileData(userData);
    setFormData(userData);

    if (user) {
      fetchApplications();
    }
  }, [user]);

  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const profileCompletion = useMemo(() => {
    let completed = 0;

    if (formData.name) completed += 25;
    if (formData.email) completed += 15;
    if (formData.avatar) completed += 20;
    if (formData.description) completed += 20;
    if (formData.resume) completed += 20;

    return completed;
  }, [formData]);

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "N/A";
    }
  };

  // =====================================================
  // APPLICATION HELPERS
  // =====================================================

  const getJobTitle = (application) => {
    return (
      application?.job?.title ||
      application?.job?.jobTitle ||
      application?.jobTitle ||
      "Job Position"
    );
  };

  const getCompany = (application) => {
    return (
      application?.job?.company?.name ||
      application?.job?.companyName ||
      application?.company?.name ||
      application?.companyName ||
      "Company"
    );
  };

  const getLocation = (application) => {
    return (
      application?.job?.location ||
      application?.location ||
      "Location not specified"
    );
  };

  const getStatus = (application) => {
    return (
      application?.status ||
      application?.applicationStatus ||
      "Pending"
    );
  };

  const getAppliedDate = (application) => {
    return (
      application?.createdAt ||
      application?.appliedAt ||
      application?.appliedDate ||
      application?.date
    );
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getApplicationStatus = (status) => {
    const normalized = String(
      status || ""
    ).toLowerCase();

    const isAccepted =
      normalized === "accepted" ||
      normalized === "selected" ||
      normalized === "approved";

    const isRejected =
      normalized === "rejected" ||
      normalized === "declined";

    const isInterview =
      normalized === "interview";

    const isShortlisted =
      normalized === "shortlisted";

    let label = "Applied";

    if (isAccepted) {
      label = "Accepted";
    } else if (isRejected) {
      label = "Rejected";
    } else if (isInterview) {
      label = "Interview";
    } else if (isShortlisted) {
      label = "Shortlisted";
    } else if (
      normalized === "review" ||
      normalized === "under review"
    ) {
      label = "Under Review";
    }

    let style =
      "bg-amber-50 text-amber-700 border-amber-200";

    if (isAccepted) {
      style =
        "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (isRejected) {
      style =
        "bg-red-50 text-red-700 border-red-200";
    } else if (
      isInterview ||
      isShortlisted
    ) {
      style =
        "bg-purple-50 text-purple-700 border-purple-200";
    }

    return {
      label,
      style,
      isAccepted,
      isRejected,
      isInterview,
      isShortlisted,
    };
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f9fc]">

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">

        {/* Blue top-left */}
        <div
          className="
            absolute
            -top-52
            -left-52
            w-[700px]
            h-[700px]
            rounded-full
            bg-blue-400/20
            blur-[150px]
          "
        />

        {/* Purple top-right */}
        <div
          className="
            absolute
            -top-52
            -right-52
            w-[700px]
            h-[700px]
            rounded-full
            bg-purple-400/20
            blur-[160px]
          "
        />

        {/* Cyan middle */}
        <div
          className="
            absolute
            top-[40%]
            left-[35%]
            w-[500px]
            h-[500px]
            rounded-full
            bg-cyan-300/10
            blur-[150px]
          "
        />

        {/* Purple bottom */}
        <div
          className="
            absolute
            -bottom-60
            right-[5%]
            w-[650px]
            h-[650px]
            rounded-full
            bg-violet-300/15
            blur-[160px]
          "
        />

      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-10">

        <div className="max-w-6xl mx-auto">

          {/* =================================================
              PROFILE HERO
          ================================================= */}

          <section
            className="
              relative
              overflow-hidden
              rounded-[28px]
              bg-gradient-to-br
              from-blue-600
              via-indigo-600
              to-purple-700
              shadow-[0_25px_80px_rgba(79,70,229,0.25)]
              mb-7
            "
          >

            {/* decorative circles */}

            <div className="absolute -top-28 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="absolute top-20 right-1/3 w-40 h-40 rounded-full bg-purple-300/10 blur-3xl" />

            <div className="relative p-6 sm:p-8 lg:p-10">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                {/* PROFILE INFO */}

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                  {/* Avatar */}

                  <div className="relative">

                    <div className="
                      absolute
                      -inset-1
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-300
                      to-purple-300
                      blur
                      opacity-70
                    " />

                    {formData.avatar ? (

                      <img
                        src={formData.avatar}
                        alt="Profile"
                        className="
                          relative
                          w-28
                          h-28
                          sm:w-32
                          sm:h-32
                          rounded-full
                          object-cover
                          border-4
                          border-white/90
                          shadow-2xl
                        "
                      />

                    ) : (

                      <div
                        className="
                          relative
                          w-28
                          h-28
                          sm:w-32
                          sm:h-32
                          rounded-full
                          bg-white/20
                          backdrop-blur-md
                          border-4
                          border-white/70
                          flex
                          items-center
                          justify-center
                          text-white
                          text-4xl
                          font-bold
                        "
                      >
                        {formData.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                    )}

                    <div className="
                      absolute
                      bottom-1
                      right-1
                      w-8
                      h-8
                      rounded-full
                      bg-emerald-500
                      border-4
                      border-white
                      flex
                      items-center
                      justify-center
                    ">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>

                  </div>

                  {/* Text */}

                  <div className="text-center sm:text-left">

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">

                      <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {formData.name || "Your Name"}
                      </h1>

                      <span className="
                        inline-flex
                        items-center
                        gap-1
                        px-3
                        py-1
                        rounded-full
                        bg-white/15
                        border
                        border-white/20
                        text-xs
                        font-semibold
                        text-white
                        backdrop-blur
                      ">
                        <Sparkles className="w-3.5 h-3.5" />
                        Job Seeker
                      </span>

                    </div>

                    <p className="text-blue-100 mt-2 text-sm sm:text-base">
                      {formData.email || "Add your email address"}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">

                      <span className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-xl
                        bg-white/10
                        border
                        border-white/15
                        text-white
                        text-sm
                      ">
                        <UserRound className="w-4 h-4" />
                        Professional Profile
                      </span>

                      <span className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-xl
                        bg-white/10
                        border
                        border-white/15
                        text-white
                        text-sm
                      ">
                        <Briefcase className="w-4 h-4" />
                        {applications.length} Applications
                      </span>

                    </div>

                  </div>

                </div>

                {/* PROFILE COMPLETION */}

                <div className="
                  w-full
                  lg:w-72
                  rounded-2xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  p-5
                ">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-blue-100">
                        Profile completion
                      </p>

                      <p className="text-2xl font-bold text-white mt-1">
                        {profileCompletion}%
                      </p>
                    </div>

                    <div className="
                      w-11
                      h-11
                      rounded-xl
                      bg-white/15
                      flex
                      items-center
                      justify-center
                    ">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>

                  </div>

                  <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-white
                        transition-all
                        duration-500
                      "
                      style={{
                        width: `${profileCompletion}%`,
                      }}
                    />

                  </div>

                  <p className="text-xs text-blue-100 mt-3">
                    Complete your profile to improve your chances with recruiters.
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

            {/* =================================================
                LEFT / PROFILE EDIT
            ================================================= */}

            <section
              className="
                lg:col-span-2
                bg-white/90
                backdrop-blur-xl
                rounded-[26px]
                border
                border-white
                shadow-[0_20px_70px_rgba(15,23,42,0.08)]
                overflow-hidden
              "
            >

              {/* Card Header */}

              <div className="
                px-6
                sm:px-8
                py-6
                border-b
                border-gray-100
                bg-gradient-to-r
                from-white
                via-blue-50/40
                to-purple-50/40
              ">

                <div className="flex items-center gap-4">

                  <div className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  ">
                    <UserRound className="w-6 h-6 text-white" />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Keep your professional profile up to date.
                    </p>

                  </div>

                </div>

              </div>

              {/* Body */}

              <div className="p-6 sm:p-8 space-y-7">

                {/* =================================================
                    PHOTO
                ================================================= */}

                <div className="
                  rounded-2xl
                  border
                  border-blue-100
                  bg-gradient-to-r
                  from-blue-50/70
                  to-purple-50/70
                  p-5
                ">

                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                    <div className="relative shrink-0">

                      {formData.avatar ? (

                        <img
                          src={formData.avatar}
                          alt="Profile"
                          className="
                            w-24
                            h-24
                            rounded-2xl
                            object-cover
                            shadow-lg
                            border-4
                            border-white
                          "
                        />

                      ) : (

                        <div className="
                          w-24
                          h-24
                          rounded-2xl
                          bg-gradient-to-br
                          from-blue-500
                          to-purple-600
                          flex
                          items-center
                          justify-center
                          text-white
                          text-3xl
                          font-bold
                          shadow-lg
                        ">
                          {formData.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                      )}

                      {uploading.avatar && (

                        <div className="
                          absolute
                          inset-0
                          rounded-2xl
                          bg-black/50
                          flex
                          items-center
                          justify-center
                        ">
                          <div className="
                            w-7
                            h-7
                            border-2
                            border-white
                            border-t-transparent
                            rounded-full
                            animate-spin
                          " />
                        </div>

                      )}

                    </div>

                    <div className="flex-1">

                      <div className="flex items-center gap-2">

                        <Camera className="w-4 h-4 text-blue-600" />

                        <h3 className="font-bold text-gray-900">
                          Profile Photo
                        </h3>

                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        Use a clear and professional photo.
                      </p>

                      <label className="inline-block mt-4">

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageChange(
                              e,
                              "avatar"
                            )
                          }
                        />

                        <span className="
                          inline-flex
                          items-center
                          gap-2
                          px-4
                          py-2.5
                          rounded-xl
                          bg-white
                          border
                          border-blue-200
                          text-blue-700
                          font-semibold
                          text-sm
                          cursor-pointer
                          hover:bg-blue-50
                          transition-all
                          shadow-sm
                        ">
                          <Camera className="w-4 h-4" />
                          Change Photo
                        </span>

                      </label>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    NAME
                ================================================= */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <UserRound className="w-4 h-4 text-blue-500" />

                    Full Name

                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Enter your full name"
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-gray-900
                      outline-none
                      focus:ring-4
                      focus:ring-blue-500/10
                      focus:border-blue-500
                      transition-all
                    "
                  />

                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <span className="text-blue-500">@</span>

                    Email Address

                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      text-gray-500
                      cursor-not-allowed
                    "
                  />

                  <p className="text-xs text-gray-400 mt-2">
                    Your email address cannot be changed here.
                  </p>

                </div>

                {/* =================================================
                    ABOUT
                ================================================= */}

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">

                      <FileText className="w-4 h-4 text-purple-500" />

                      About Me

                    </label>

                    <span className="
                      text-xs
                      font-semibold
                      px-2
                      py-1
                      rounded-lg
                      bg-gray-100
                      text-gray-500
                    ">
                      {formData.description?.length || 0}/1000
                    </span>

                  </div>

                  <textarea
                    value={
                      formData.description || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "description",
                        e.target.value
                      )
                    }
                    maxLength={1000}
                    rows={7}
                    placeholder="Tell recruiters about yourself, your skills, projects, experience, education and career goals..."
                    className="
                      w-full
                      px-4
                      py-3.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-gray-700
                      outline-none
                      resize-none
                      focus:ring-4
                      focus:ring-purple-500/10
                      focus:border-purple-500
                      transition-all
                    "
                  />

                  <div className="
                    mt-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-50
                    to-purple-50
                    border
                    border-blue-100
                    px-4
                    py-3
                  ">

                    <div className="flex gap-3">

                      <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />

                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-gray-800">
                          Recruiter tip:
                        </span>{" "}
                        Mention your technical skills, projects,
                        education, internship experience and
                        the type of role you are targeting.
                      </p>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    RESUME
                ================================================= */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">

                    <FileText className="w-4 h-4 text-blue-600" />

                    Resume

                  </label>

                  {user?.resume ? (

                    <div className="
                      rounded-2xl
                      border
                      border-emerald-100
                      bg-gradient-to-r
                      from-emerald-50
                      to-blue-50
                      p-5
                    ">

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                        <div className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-white
                          flex
                          items-center
                          justify-center
                          shadow-sm
                          shrink-0
                        ">
                          <FileText className="w-7 h-7 text-emerald-600" />
                        </div>

                        <div className="flex-1 min-w-0">

                          <div className="flex items-center gap-2">

                            <h3 className="font-bold text-gray-900">
                              Resume uploaded
                            </h3>

                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />

                          </div>

                          <p className="text-xs text-gray-500 mt-1">
                            Your resume is available to recruiters.
                          </p>

                          <a
                            href={user.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              mt-3
                              text-sm
                              font-semibold
                              text-blue-600
                              hover:text-blue-700
                            "
                          >
                            View Resume
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                        </div>

                        <button
                          type="button"
                          onClick={deleteResume}
                          disabled={saving}
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-white
                            border
                            border-red-100
                            text-red-600
                            hover:bg-red-50
                            transition-all
                            disabled:opacity-50
                            font-semibold
                            text-sm
                          "
                        >

                          <Trash2 className="w-4 h-4" />

                          Delete

                        </button>

                      </div>

                    </div>

                  ) : (

                    <div className="
                      rounded-2xl
                      border-2
                      border-dashed
                      border-gray-200
                      bg-gray-50/70
                      p-8
                      text-center
                      hover:border-blue-300
                      hover:bg-blue-50/30
                      transition-all
                    ">

                      <div className="
                        w-14
                        h-14
                        mx-auto
                        rounded-2xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        mb-4
                      ">

                        <FileText className="w-7 h-7 text-blue-600" />

                      </div>

                      <h3 className="font-bold text-gray-800">
                        Upload your resume
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        PDF, DOC or DOCX
                      </p>

                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleImageChange(
                            e,
                            "resume"
                          )
                        }
                        className="
                          block
                          mx-auto
                          mt-5
                          text-sm
                          text-gray-500
                          file:mr-3
                          file:py-2.5
                          file:px-5
                          file:rounded-xl
                          file:border-0
                          file:bg-blue-600
                          file:text-white
                          file:font-semibold
                          hover:file:bg-blue-700
                        "
                      />

                      {uploading.resume && (

                        <p className="text-sm text-blue-600 mt-4 font-medium">
                          Uploading resume...
                        </p>

                      )}

                    </div>

                  )}

                </div>

                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="
                  flex
                  flex-col-reverse
                  sm:flex-row
                  justify-end
                  gap-3
                  pt-6
                  border-t
                  border-gray-100
                ">

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="
                      px-6
                      py-3
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-gray-700
                      hover:bg-gray-50
                      transition-all
                      flex
                      items-center
                      justify-center
                      gap-2
                      font-semibold
                    "
                  >

                    <X className="w-4 h-4" />

                    Cancel

                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={
                      saving ||
                      uploading.avatar ||
                      uploading.resume
                    }
                    className="
                      px-7
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      text-white
                      hover:from-blue-700
                      hover:to-purple-700
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      transition-all
                      shadow-lg
                      hover:shadow-xl
                      flex
                      items-center
                      justify-center
                      gap-2
                      font-bold
                    "
                  >

                    {saving ? (
                      <>
                        <div className="
                          w-4
                          h-4
                          border-2
                          border-white
                          border-t-transparent
                          rounded-full
                          animate-spin
                        " />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />

                        Save Changes
                      </>
                    )}

                  </button>

                </div>

              </div>

            </section>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <div className="space-y-7">

              {/* =================================================
                  PROFILE STATS
              ================================================= */}

              <section className="
                bg-white/90
                backdrop-blur-xl
                rounded-[26px]
                border
                border-white
                shadow-[0_20px_70px_rgba(15,23,42,0.08)]
                p-6
              ">

                <div className="flex items-center gap-3 mb-6">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                  ">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>

                  <div>

                    <h3 className="font-bold text-gray-900">
                      Profile Overview
                    </h3>

                    <p className="text-xs text-gray-500">
                      Your job seeker profile
                    </p>

                  </div>

                </div>

                <div className="space-y-4">

                  <div className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-2xl
                    bg-blue-50
                  ">

                    <div className="flex items-center gap-3">

                      <Briefcase className="w-5 h-5 text-blue-600" />

                      <span className="text-sm text-gray-600">
                        Applications
                      </span>

                    </div>

                    <span className="font-bold text-blue-700">
                      {applications.length}
                    </span>

                  </div>

                  <div className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-2xl
                    bg-purple-50
                  ">

                    <div className="flex items-center gap-3">

                      <FileText className="w-5 h-5 text-purple-600" />

                      <span className="text-sm text-gray-600">
                        Resume
                      </span>

                    </div>

                    <span className="font-bold text-purple-700">
                      {formData.resume ? "Added" : "Missing"}
                    </span>

                  </div>

                  <div className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-2xl
                    bg-emerald-50
                  ">

                    <div className="flex items-center gap-3">

                      <UserRound className="w-5 h-5 text-emerald-600" />

                      <span className="text-sm text-gray-600">
                        Profile
                      </span>

                    </div>

                    <span className="font-bold text-emerald-700">
                      {profileCompletion}%
                    </span>

                  </div>

                </div>

              </section>

              {/* =================================================
                  QUICK TIPS
              ================================================= */}

              <section className="
                relative
                overflow-hidden
                rounded-[26px]
                bg-gradient-to-br
                from-indigo-600
                via-blue-600
                to-purple-700
                p-6
                text-white
                shadow-[0_20px_70px_rgba(79,70,229,0.22)]
              ">

                <div className="
                  absolute
                  -top-16
                  -right-16
                  w-48
                  h-48
                  rounded-full
                  bg-white/10
                  blur-2xl
                " />

                <div className="relative">

                  <div className="
                    w-11
                    h-11
                    rounded-xl
                    bg-white/15
                    flex
                    items-center
                    justify-center
                    mb-5
                  ">
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold">
                    Stand out to recruiters
                  </h3>

                  <p className="text-blue-100 text-sm mt-2 leading-relaxed">
                    A complete profile helps recruiters understand your experience and skills faster.
                  </p>

                  <div className="space-y-3 mt-6">

                    <div className="flex gap-3">

                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />

                      <span className="text-sm text-blue-50">
                        Add a professional photo
                      </span>

                    </div>

                    <div className="flex gap-3">

                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />

                      <span className="text-sm text-blue-50">
                        Write a strong About Me
                      </span>

                    </div>

                    <div className="flex gap-3">

                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />

                      <span className="text-sm text-blue-50">
                        Upload your latest resume
                      </span>

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================================
                  FIND JOBS
              ================================================= */}

              <Link
                to="/find-jobs"
                className="
                  group
                  block
                  bg-white/90
                  backdrop-blur-xl
                  rounded-[26px]
                  border
                  border-white
                  shadow-[0_20px_70px_rgba(15,23,42,0.08)]
                  p-6
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <div className="
                      w-11
                      h-11
                      rounded-xl
                      bg-gradient-to-br
                      from-blue-500
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      mb-4
                    ">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>

                    <h3 className="font-bold text-gray-900">
                      Find Your Next Job
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Explore new opportunities.
                    </p>

                  </div>

                  <ArrowRight className="
                    w-5
                    h-5
                    text-gray-400
                    group-hover:text-blue-600
                    group-hover:translate-x-1
                    transition-all
                  " />

                </div>

              </Link>

            </div>

          </div>

          {/* =================================================
              APPLICATIONS
          ================================================= */}

          <section className="
            mt-7
            bg-white/90
            backdrop-blur-xl
            rounded-[26px]
            border
            border-white
            shadow-[0_20px_70px_rgba(15,23,42,0.08)]
            overflow-hidden
          ">

            {/* HEADER */}

            <div className="
              relative
              overflow-hidden
              px-6
              sm:px-8
              py-7
              bg-gradient-to-r
              from-blue-50
              via-white
              to-purple-50
              border-b
              border-gray-100
            ">

              <div className="
                absolute
                -right-20
                -top-20
                w-64
                h-64
                rounded-full
                bg-purple-300/20
                blur-3xl
              " />

              <div className="
                relative
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
              ">

                <div className="flex items-center gap-4">

                  <div className="
                    w-13
                    h-13
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-600
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  ">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>

                  <div>

                    <h2 className="text-2xl font-black text-gray-900">
                      My Applications
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Track every opportunity you've applied for.
                    </p>

                  </div>

                </div>

                <div className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  bg-white
                  border
                  border-gray-200
                  shadow-sm
                ">

                  <span className="text-sm text-gray-500">
                    Total Applications
                  </span>

                  <span className="
                    min-w-9
                    h-9
                    px-2
                    rounded-xl
                    bg-gradient-to-br
                    from-blue-500
                    to-purple-600
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                  ">
                    {applications.length}
                  </span>

                </div>

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-5 sm:p-8">

              {applicationsLoading ? (

                <div className="space-y-4">

                  {[1, 2, 3].map((item) => (

                    <div
                      key={item}
                      className="
                        animate-pulse
                        rounded-2xl
                        border
                        border-gray-100
                        p-6
                      "
                    >

                      <div className="flex gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-gray-200" />

                        <div className="flex-1 space-y-3">

                          <div className="h-5 bg-gray-200 rounded w-1/3" />

                          <div className="h-4 bg-gray-200 rounded w-1/4" />

                          <div className="h-3 bg-gray-200 rounded w-1/2" />

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              ) : applicationsError ? (

                <div className="text-center py-14">

                  <div className="
                    w-16
                    h-16
                    mx-auto
                    rounded-2xl
                    bg-red-50
                    flex
                    items-center
                    justify-center
                  ">
                    <X className="w-7 h-7 text-red-500" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mt-5">
                    Unable to load applications
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {applicationsError}
                  </p>

                  <button
                    onClick={fetchApplications}
                    className="
                      mt-6
                      px-6
                      py-3
                      rounded-xl
                      bg-blue-600
                      text-white
                      font-semibold
                      hover:bg-blue-700
                      transition-all
                    "
                  >
                    Try Again
                  </button>

                </div>

              ) : applications.length === 0 ? (

                <div className="text-center py-16">

                  <div className="
                    w-24
                    h-24
                    mx-auto
                    rounded-3xl
                    bg-gradient-to-br
                    from-blue-50
                    to-purple-50
                    flex
                    items-center
                    justify-center
                  ">
                    <Briefcase className="w-10 h-10 text-blue-500" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mt-6">
                    No Applications Yet
                  </h3>

                  <p className="
                    text-gray-500
                    text-sm
                    mt-2
                    max-w-md
                    mx-auto
                    leading-relaxed
                  ">
                    You haven't applied to any jobs yet.
                    Start exploring opportunities and submit
                    your first application.
                  </p>

                  <Link
                    to="/find-jobs"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-7
                      px-6
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      text-white
                      font-bold
                      shadow-lg
                      hover:shadow-xl
                      hover:-translate-y-0.5
                      transition-all
                    "
                  >
                    <Briefcase className="w-4 h-4" />
                    Find Jobs
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>

              ) : (

                <div className="space-y-5">

                  {applications.map(
                    (application, index) => {

                      const jobTitle =
                        getJobTitle(application);

                      const company =
                        getCompany(application);

                      const location =
                        getLocation(application);

                      const status =
                        getStatus(application);

                      const appliedDate =
                        getAppliedDate(application);

                      const jobId =
                        application?.job?._id ||
                        application?.jobId;

                      const statusInfo =
                        getApplicationStatus(
                          status
                        );

                      return (

                        <article
                          key={
                            application?._id ||
                            index
                          }
                          className="
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-5
                            sm:p-6
                            hover:border-blue-300
                            hover:shadow-[0_15px_40px_rgba(37,99,235,0.10)]
                            transition-all
                            duration-300
                          "
                        >

                          {/* top gradient */}

                          <div className="
                            absolute
                            top-0
                            left-0
                            right-0
                            h-1
                            bg-gradient-to-r
                            from-blue-500
                            via-purple-500
                            to-cyan-400
                          " />

                          <div className="
                            flex
                            flex-col
                            lg:flex-row
                            lg:items-center
                            gap-5
                          ">

                            {/* COMPANY ICON */}

                            <div className="
                              w-16
                              h-16
                              rounded-2xl
                              bg-gradient-to-br
                              from-blue-50
                              to-purple-50
                              border
                              border-blue-100
                              flex
                              items-center
                              justify-center
                              shrink-0
                              group-hover:scale-105
                              transition-transform
                            ">

                              <Building2 className="w-8 h-8 text-blue-600" />

                            </div>

                            {/* JOB */}

                            <div className="flex-1 min-w-0">

                              <div className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-start
                                sm:justify-between
                                gap-3
                              ">

                                <div className="min-w-0">

                                  <h3 className="
                                    text-lg
                                    sm:text-xl
                                    font-black
                                    text-gray-900
                                    group-hover:text-blue-600
                                    transition-colors
                                    break-words
                                  ">

                                    {jobId ? (

                                      <Link
                                        to={`/job/${jobId}`}
                                      >
                                        {jobTitle}
                                      </Link>

                                    ) : (

                                      jobTitle

                                    )}

                                  </h3>

                                  <p className="
                                    text-gray-600
                                    font-medium
                                    mt-1
                                  ">
                                    {company}
                                  </p>

                                </div>

                                <span
                                  className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-3.5
                                    py-2
                                    rounded-full
                                    border
                                    text-xs
                                    font-bold
                                    w-fit
                                    shrink-0
                                    ${statusInfo.style}
                                  `}
                                >

                                  <span className="
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-current
                                  " />

                                  {statusInfo.label}

                                </span>

                              </div>

                              {/* META */}

                              <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-3
                                sm:gap-5
                                mt-5
                              ">

                                <div className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-gray-500
                                ">

                                  <div className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    bg-gray-50
                                    flex
                                    items-center
                                    justify-center
                                  ">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                  </div>

                                  <span>
                                    {location}
                                  </span>

                                </div>

                                <div className="
                                  flex
                                  items-center
                                  gap-2
                                  text-sm
                                  text-gray-500
                                ">

                                  <div className="
                                    w-8
                                    h-8
                                    rounded-lg
                                    bg-gray-50
                                    flex
                                    items-center
                                    justify-center
                                  ">
                                    <CalendarDays className="w-4 h-4 text-gray-400" />
                                  </div>

                                  <span>
                                    Applied{" "}
                                    {formatDate(
                                      appliedDate
                                    )}
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* VIEW */}

                            {jobId && (

                              <Link
                                to={`/job/${jobId}`}
                                className="
                                  shrink-0
                                  inline-flex
                                  items-center
                                  justify-center
                                  gap-2
                                  px-5
                                  py-2.5
                                  rounded-xl
                                  border
                                  border-gray-200
                                  text-gray-700
                                  font-semibold
                                  text-sm
                                  hover:bg-blue-600
                                  hover:text-white
                                  hover:border-blue-600
                                  transition-all
                                "
                              >
                                View Job
                                <ArrowRight className="w-4 h-4" />
                              </Link>

                            )}

                          </div>

                          {/* PROGRESS */}

                          <div className="
                            mt-6
                            pt-5
                            border-t
                            border-gray-100
                          ">

                            <div className="
                              flex
                              items-center
                              justify-between
                              mb-3
                            ">

                              <span className="
                                text-xs
                                font-semibold
                                text-gray-500
                              ">
                                Application Progress
                              </span>

                              <span className="
                                text-xs
                                font-bold
                                text-gray-700
                              ">
                                {statusInfo.label}
                              </span>

                            </div>

                            <div className="flex gap-1.5">

                              <div className="
                                h-2
                                flex-1
                                rounded-full
                                bg-blue-500
                              " />

                              <div
                                className={`
                                  h-2
                                  flex-1
                                  rounded-full
                                  ${
                                    statusInfo.isShortlisted ||
                                    statusInfo.isInterview ||
                                    statusInfo.isAccepted
                                      ? "bg-blue-500"
                                      : "bg-gray-200"
                                  }
                                `}
                              />

                              <div
                                className={`
                                  h-2
                                  flex-1
                                  rounded-full
                                  ${
                                    statusInfo.isInterview ||
                                    statusInfo.isAccepted
                                      ? "bg-purple-500"
                                      : "bg-gray-200"
                                  }
                                `}
                              />

                              <div
                                className={`
                                  h-2
                                  flex-1
                                  rounded-full
                                  ${
                                    statusInfo.isAccepted
                                      ? "bg-emerald-500"
                                      : statusInfo.isRejected
                                      ? "bg-red-500"
                                      : "bg-gray-200"
                                  }
                                `}
                              />

                            </div>

                            <div className="
                              flex
                              justify-between
                              mt-2
                              text-[10px]
                              text-gray-400
                              font-medium
                            ">

                              <span>Applied</span>
                              <span>Review</span>
                              <span>Interview</span>
                              <span>Decision</span>

                            </div>

                          </div>

                        </article>

                      );
                    }
                  )}

                </div>

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default UserProfile;