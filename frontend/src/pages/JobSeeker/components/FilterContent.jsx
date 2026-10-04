import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SalaryRangeSlider from "../../../components/Input/SalaryRangeSlider";

const JOB_TYPES = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Remote", label: "Remote" },
];

const CATEGORIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Education",
  "Consulting",
  "Automotive",
  "Telecom",
  "Cybersecurity",
  "Software",
  "Manufacturing",
  "Logistics",
  "Media",
  "Travel",
  "Energy",
];

const FilterSection = ({
  title,
  isExpanded,
  onToggle,
  children,
}) => (
  <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors"
    >
      {title}

      {isExpanded ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
    </button>

    {isExpanded && children}
  </div>
);

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {
  return (
    <>
      {/* Clear Filters */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <FilterSection
        title="Job Type"
        isExpanded={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600"
                checked={filters?.type === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "type",
                    e.target.checked ? type.value : ""
                  )
                }
              />

              <span className="ml-3 text-gray-700 font-medium">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Salary */}
      <FilterSection
        title="Salary Range"
        isExpanded={expandedSections?.salary}
        onToggle={() => toggleSection("salary")}
      >
        <SalaryRangeSlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>

      {/* Category */}
      <FilterSection
        title="Category"
        isExpanded={expandedSections?.categories}
        onToggle={() => toggleSection("categories")}
      >
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600"
                checked={filters?.category === category}
                onChange={(e) =>
                  handleFilterChange(
                    "category",
                    e.target.checked ? category : ""
                  )
                }
              />

              <span className="ml-3 text-gray-700 font-medium">
                {category}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;