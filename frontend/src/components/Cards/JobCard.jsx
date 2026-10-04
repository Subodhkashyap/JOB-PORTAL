import React from "react";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  CalendarDays,
  Building2,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";

const JobCard = ({
  job,
  onClick,
  onToggleSave,
  onApply,
}) => {
  const isSaved = job?.isSaved;

  const status = job?.applicationStatus || job?.status;

  const getStatusStyle = () => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "selected":
      case "approved":
        return {
          wrapper:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        };

      case "rejected":
        return {
          wrapper:
            "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
          icon: <Clock3 className="w-3.5 h-3.5" />,
        };

      case "review":
      case "reviewing":
      case "shortlisted":
      case "interview":
        return {
          wrapper:
            "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
          icon: <Clock3 className="w-3.5 h-3.5" />,
        };

      case "applied":
        return {
          wrapper:
            "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        };

      default:
        return null;
    }
  };

  const statusStyle = getStatusStyle();

  const formatDate = (date) => {
    if (!date) return "Recently";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  const companyName =
    job?.company?.name ||
    job?.companyName ||
    job?.company ||
    "Company";

  const location =
    job?.location ||
    job?.jobLocation ||
    "Location not specified";

  const category =
    job?.category ||
    job?.industry ||
    "Technology";

  const jobType =
    job?.jobType ||
    job?.type ||
    "Full-Time";

  const salary =
    job?.salary ||
    job?.salaryRange ||
    job?.package ||
    "Competitive";

  const postedDate =
    job?.createdAt ||
    job?.postedAt ||
    job?.date;

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CO";
  };

  return (
    <article
      className="
        group
        relative
        h-full
        overflow-hidden
        rounded-[26px]
        border
        border-white/80
        bg-white/90
        backdrop-blur-xl
        shadow-[0_10px_40px_rgba(15,23,42,0.07)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_25px_70px_rgba(79,70,229,0.16)]
      "
    >

      {/* =====================================================
          TOP COLOR GLOW
      ===================================================== */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-1.5
          bg-gradient-to-r
          from-blue-500
          via-indigo-500
          to-purple-600
        "
      />

      {/* Hover glow */}

      <div
        className="
          absolute
          -right-20
          -top-20
          w-44
          h-44
          rounded-full
          bg-purple-500/10
          blur-3xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -left-20
          -bottom-20
          w-44
          h-44
          rounded-full
          bg-blue-500/10
          blur-3xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          pointer-events-none
        "
      />

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div className="relative p-5 sm:p-6">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-start gap-4 min-w-0">

            {/* Company logo */}

            <div
              className="
                relative
                w-14
                h-14
                shrink-0
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                via-indigo-500
                to-purple-600
                p-[2px]
                shadow-lg
                shadow-blue-500/20
              "
            >

              <div
                className="
                  w-full
                  h-full
                  rounded-[14px]
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-transparent
                  bg-clip-text
                "
              >

                <span
                  className="
                    text-lg
                    font-black
                    bg-gradient-to-r
                    from-blue-600
                    to-purple-600
                    bg-clip-text
                    text-transparent
                  "
                >
                  {getInitials(companyName)}
                </span>

              </div>

            </div>

            {/* Job title */}

            <div className="min-w-0">

              <h3
                onClick={onClick}
                className="
                  cursor-pointer
                  text-lg
                  sm:text-xl
                  font-extrabold
                  text-slate-900
                  leading-tight
                  hover:text-blue-600
                  transition-colors
                  truncate
                "
              >
                {job?.title || "Software Developer"}
              </h3>

              <div className="
                flex
                items-center
                gap-2
                mt-2
                text-sm
                text-slate-500
              ">

                <Building2 className="w-4 h-4 text-indigo-500" />

                <span className="truncate">
                  {companyName}
                </span>

              </div>

            </div>

          </div>

          {/* Bookmark */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave?.();
            }}
            className="
              shrink-0
              w-10
              h-10
              rounded-xl
              border
              border-slate-200
              bg-white
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:border-blue-300
              hover:bg-blue-50
              hover:scale-105
            "
            title={isSaved ? "Remove bookmark" : "Save job"}
          >

            {isSaved ? (
              <BookmarkCheck
                className="
                  w-5
                  h-5
                  text-blue-600
                  fill-blue-600
                "
              />
            ) : (
              <Bookmark
                className="
                  w-5
                  h-5
                  text-slate-400
                  group-hover:text-blue-500
                "
              />
            )}

          </button>

        </div>

        {/* ===================================================
            TAGS
        =================================================== */}

        <div className="
          flex
          flex-wrap
          items-center
          gap-2
          mt-5
        ">

          <span className="
            inline-flex
            items-center
            px-3
            py-1.5
            rounded-full
            bg-blue-50
            text-blue-700
            border
            border-blue-100
            text-xs
            font-bold
          ">
            {jobType}
          </span>

          <span className="
            inline-flex
            items-center
            px-3
            py-1.5
            rounded-full
            bg-purple-50
            text-purple-700
            border
            border-purple-100
            text-xs
            font-bold
          ">
            {category}
          </span>

          {job?.workMode && (
            <span className="
              inline-flex
              items-center
              px-3
              py-1.5
              rounded-full
              bg-cyan-50
              text-cyan-700
              border
              border-cyan-100
              text-xs
              font-bold
            ">
              {job.workMode}
            </span>
          )}

        </div>

        {/* ===================================================
            INFO
        =================================================== */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
          mt-5
        ">

          <div className="
            flex
            items-center
            gap-2.5
            rounded-xl
            bg-slate-50
            px-3
            py-2.5
            border
            border-slate-100
          ">

            <div className="
              w-8
              h-8
              rounded-lg
              bg-blue-100
              flex
              items-center
              justify-center
            ">

              <MapPin className="
                w-4
                h-4
                text-blue-600
              " />

            </div>

            <div className="min-w-0">

              <p className="
                text-[10px]
                uppercase
                tracking-wider
                text-slate-400
                font-bold
              ">
                Location
              </p>

              <p className="
                text-xs
                font-semibold
                text-slate-700
                truncate
              ">
                {location}
              </p>

            </div>

          </div>

          <div className="
            flex
            items-center
            gap-2.5
            rounded-xl
            bg-slate-50
            px-3
            py-2.5
            border
            border-slate-100
          ">

            <div className="
              w-8
              h-8
              rounded-lg
              bg-purple-100
              flex
              items-center
              justify-center
            ">

              <CalendarDays className="
                w-4
                h-4
                text-purple-600
              " />

            </div>

            <div>

              <p className="
                text-[10px]
                uppercase
                tracking-wider
                text-slate-400
                font-bold
              ">
                Posted
              </p>

              <p className="
                text-xs
                font-semibold
                text-slate-700
              ">
                {formatDate(postedDate)}
              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            BOTTOM
        =================================================== */}

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-end
          sm:justify-between
          gap-4
          mt-6
          pt-5
          border-t
          border-slate-100
        ">

          {/* Salary */}

          <div>

            <p className="
              text-[11px]
              uppercase
              tracking-wider
              text-slate-400
              font-bold
            ">
              Salary
            </p>

            <p className="
              mt-1
              text-xl
              font-black
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              bg-clip-text
              text-transparent
            ">
              {salary}
            </p>

          </div>

          {/* Status / Apply */}

          <div className="
            flex
            items-center
            gap-3
          ">

            {statusStyle ? (

              <div className={`
                inline-flex
                items-center
                gap-1.5
                px-3
                py-2
                rounded-xl
                border
                text-xs
                font-bold
                ${statusStyle.wrapper}
              `}>

                <span
                  className={`
                    w-1.5
                    h-1.5
                    rounded-full
                    ${statusStyle.dot}
                  `}
                />

                {statusStyle.icon}

                <span className="capitalize">
                  {status}
                </span>

              </div>

            ) : (

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApply?.();
                }}
                className="
                  group/apply
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-600
                  to-purple-600
                  text-white
                  text-sm
                  font-bold
                  shadow-lg
                  shadow-blue-500/20
                  hover:shadow-xl
                  hover:shadow-purple-500/20
                  hover:scale-[1.03]
                  active:scale-95
                  transition-all
                "
              >

                <BriefcaseBusiness className="w-4 h-4" />

                Apply Now

                <ArrowUpRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    group-hover/apply:translate-x-0.5
                    group-hover/apply:-translate-y-0.5
                  "
                />

              </button>

            )}

          </div>

        </div>

      </div>

    </article>
  );
};

export default JobCard;