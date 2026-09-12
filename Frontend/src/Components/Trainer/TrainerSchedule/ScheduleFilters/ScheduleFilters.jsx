import React, { useEffect, useRef, useState } from "react";
import {
  LuCalendarDays,
  LuChevronDown,
  LuChevronRight,
  LuCircleCheck,
  LuFilter,
  LuLayers3,
  LuLightbulb,
  LuRefreshCw,
  LuSearch,
  LuUsersRound,
  LuX,
} from "react-icons/lu";

import "./ScheduleFilters.css";

const ScheduleFilters = ({ filters = {}, onFiltersChange, onResetFilters }) => {
  /* =====================================================
     PARENT FILTER VALUES
  ===================================================== */

  const {
    searchValue: parentSearchValue = "",
    course: parentCourse = "All Courses",
    batch: parentBatch = "All Batches",
    sessionType: parentSessionType = "All Types",
    status: parentStatus = "All Status",
    dateRange: parentDateRange = "This Week",
  } = filters;

  /* =====================================================
     LOCAL FILTER STATE

     Changes stay local until Apply Filters is clicked.
  ===================================================== */

  const [searchValue, setSearchValue] = useState(parentSearchValue);

  const [course, setCourse] = useState(parentCourse);

  const [batch, setBatch] = useState(parentBatch);

  const [sessionType, setSessionType] = useState(parentSessionType);

  const [status, setStatus] = useState(parentStatus);

  const [dateRange, setDateRange] = useState(parentDateRange);

  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  /* =====================================================
     OPTIONS
  ===================================================== */

  const courseOptions = [
    "All Courses",
    "Web Development",
    "Data Structures",
    "Database Management",
    "Artificial Intelligence",
  ];

  const batchOptions = [
    "All Batches",
    "Batch A",
    "Batch B",
    "Batch C",
    "Batch D",
  ];

  const sessionTypeOptions = [
    "All Types",
    "Training Session",
    "Quiz",
    "Assessment",
    "Workshop",
  ];

  const statusOptions = [
    "All Status",
    "Scheduled",
    "Completed",
    "Cancelled",
    "Rescheduled",
  ];

  const dateRangeOptions = [
    "Today",
    "This Week",
    "This Month",
    "Next 7 Days",
    "Next 30 Days",
  ];

  /* =====================================================
     SYNC WITH PARENT
  ===================================================== */

  useEffect(() => {
    setSearchValue(parentSearchValue);
    setCourse(parentCourse);
    setBatch(parentBatch);
    setSessionType(parentSessionType);
    setStatus(parentStatus);
    setDateRange(parentDateRange);
  }, [
    parentSearchValue,
    parentCourse,
    parentBatch,
    parentSessionType,
    parentStatus,
    parentDateRange,
  ]);

  /* =====================================================
     CLOSE DROPDOWNS

     - Outside click
     - Escape key
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =====================================================
     DROPDOWN
  ===================================================== */

  const toggleDropdown = (type) => {
    setOpenDropdown((current) => (current === type ? null : type));
  };

  const handleSelect = (type, value) => {
    if (type === "course") {
      setCourse(value);
    }

    if (type === "batch") {
      setBatch(value);
    }

    if (type === "sessionType") {
      setSessionType(value);
    }

    if (type === "status") {
      setStatus(value);
    }

    if (type === "dateRange") {
      setDateRange(value);
    }

    setOpenDropdown(null);
  };

  /* =====================================================
     ACTIVE FILTERS
  ===================================================== */

  const activeFilters = [];

  if (dateRange !== "This Week") {
    activeFilters.push({
      id: "dateRange",
      type: "dateRange",
      label: dateRange,
      theme: "sky",
      icon: <LuCalendarDays size={13} />,
    });
  }

  if (course !== "All Courses") {
    activeFilters.push({
      id: "course",
      type: "course",
      label: course,
      theme: "mint",
      icon: <LuLayers3 size={13} />,
    });
  }

  if (batch !== "All Batches") {
    activeFilters.push({
      id: "batch",
      type: "batch",
      label: batch,
      theme: "peach",
      icon: <LuUsersRound size={13} />,
    });
  }

  if (sessionType !== "All Types") {
    activeFilters.push({
      id: "sessionType",
      type: "sessionType",
      label: sessionType,
      theme: "lavender",
      icon: <LuLayers3 size={13} />,
    });
  }

  if (status !== "All Status") {
    activeFilters.push({
      id: "status",
      type: "status",
      label: status,
      theme: "green",
      icon: <LuCircleCheck size={13} />,
    });
  }

  if (searchValue.trim()) {
    activeFilters.push({
      id: "search",
      type: "search",
      label: `"${searchValue.trim()}"`,
      theme: "blue",
      icon: <LuSearch size={13} />,
    });
  }

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    const resetValues = {
      searchValue: "",
      course: "All Courses",
      batch: "All Batches",
      sessionType: "All Types",
      status: "All Status",
      dateRange: "This Week",
    };

    setSearchValue("");
    setCourse("All Courses");
    setBatch("All Batches");
    setSessionType("All Types");
    setStatus("All Status");
    setDateRange("This Week");

    setOpenDropdown(null);

    onResetFilters?.(resetValues);

    onFiltersChange?.(resetValues);
  };

  /* =====================================================
     APPLY
  ===================================================== */

  const handleApply = () => {
    const filterData = {
      searchValue: searchValue.trim(),
      course,
      batch,
      sessionType,
      status,
      dateRange,
    };

    setOpenDropdown(null);

    onFiltersChange?.(filterData);

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-filters-applied", {
        detail: filterData,
      }),
    );
  };

  /* =====================================================
     REMOVE INDIVIDUAL FILTER
  ===================================================== */

  const removeFilter = (type) => {
    if (type === "search") {
      setSearchValue("");
    }

    if (type === "course") {
      setCourse("All Courses");
    }

    if (type === "batch") {
      setBatch("All Batches");
    }

    if (type === "sessionType") {
      setSessionType("All Types");
    }

    if (type === "status") {
      setStatus("All Status");
    }

    if (type === "dateRange") {
      setDateRange("This Week");
    }
  };

  /* =====================================================
     DROPDOWN RENDERER
  ===================================================== */

  const renderDropdown = (type, label, value, options, icon, theme) => {
    const isOpen = openDropdown === type;

    return (
      <div className={`schedule-filter-field schedule-filter-field-${theme}`}>
        <label className="schedule-filter-label">{label}</label>

        <div className="schedule-filter-dropdown">
          <button
            type="button"
            className={`schedule-filter-trigger ${isOpen ? "is-open" : ""}`}
            onClick={() => toggleDropdown(type)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className="schedule-filter-trigger-left">
              <span className="schedule-filter-trigger-icon">{icon}</span>

              <span className="schedule-filter-trigger-value">{value}</span>
            </span>

            <LuChevronDown
              size={14}
              strokeWidth={1.8}
              className={`schedule-filter-chevron ${isOpen ? "rotate" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="schedule-filter-menu" role="listbox">
              {options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`schedule-filter-option ${
                    option === value ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(type, option)}
                  role="option"
                  aria-selected={option === value}
                >
                  <span>{option}</span>

                  {option === value && (
                    <LuCircleCheck size={13} strokeWidth={1.8} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section className="schedule-filters">
      <div className="schedule-filters-shell">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="schedule-filters-header">
          <div className="schedule-filters-title-area">
            <span className="schedule-filters-eyebrow">FILTER SCHEDULE</span>

            <h2>find exactly what you need</h2>

            <p>
              Use filters to narrow down your schedule and focus on what
              matters.
            </p>
          </div>

          {/* =================================================
              DECORATIVE GLASS CALENDAR
          ================================================= */}

          <div className="schedule-filter-visual" aria-hidden="true">
            <div className="schedule-filter-visual-glow" />

            <div className="schedule-filter-mini-calendar">
              <div className="schedule-mini-calendar-top">
                <span />
                <span />
              </div>

              <div className="schedule-mini-calendar-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="schedule-mini-calendar-check">
                <LuCircleCheck size={17} strokeWidth={1.8} />
              </div>
            </div>

            <div className="schedule-filter-visual-text">
              <strong>organize</strong>
              <strong>filter</strong>
              <strong>stay productive</strong>

              <i />
            </div>
          </div>

          {/* =================================================
              NAVY PRO TIP
          ================================================= */}

          <div className="schedule-filter-tip">
            <div className="schedule-filter-tip-icon">
              <LuLightbulb size={19} strokeWidth={1.7} />
            </div>

            <div className="schedule-filter-tip-content">
              <strong>Pro Tip</strong>

              <span>
                Use filters to quickly find upcoming sessions, quizzes or
                assessments.
              </span>
            </div>

            <div className="schedule-filter-tip-line" aria-hidden="true" />
          </div>
        </div>

        {/* =================================================
            FILTER CONTROLS
        ================================================= */}

        <div className="schedule-filter-controls" ref={dropdownRef}>
          {/* SEARCH */}

          <div className="schedule-filter-field schedule-search-field">
            <label htmlFor="schedule-search" className="schedule-filter-label">
              SEARCH
            </label>

            <div
              className={`schedule-search-wrapper ${
                searchValue ? "has-value" : ""
              }`}
            >
              <LuSearch
                className="schedule-search-icon"
                size={16}
                strokeWidth={1.8}
              />

              <input
                id="schedule-search"
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search sessions, courses or batches..."
                aria-label="Search schedule"
              />

              {searchValue && (
                <button
                  type="button"
                  className="schedule-search-clear"
                  onClick={() => setSearchValue("")}
                  aria-label="Clear search"
                >
                  <LuX size={13} strokeWidth={1.8} />
                </button>
              )}
            </div>
          </div>

          {/* COURSE */}

          {renderDropdown(
            "course",
            "COURSE",
            course,
            courseOptions,
            <LuLayers3 size={15} strokeWidth={1.8} />,
            "mint",
          )}

          {/* BATCH */}

          {renderDropdown(
            "batch",
            "BATCH",
            batch,
            batchOptions,
            <LuUsersRound size={15} strokeWidth={1.8} />,
            "peach",
          )}

          {/* SESSION TYPE */}

          {renderDropdown(
            "sessionType",
            "SESSION TYPE",
            sessionType,
            sessionTypeOptions,
            <LuLayers3 size={15} strokeWidth={1.8} />,
            "lavender",
          )}

          {/* STATUS */}

          {renderDropdown(
            "status",
            "STATUS",
            status,
            statusOptions,
            <LuCircleCheck size={15} strokeWidth={1.8} />,
            "green",
          )}

          {/* DATE RANGE */}

          {renderDropdown(
            "dateRange",
            "DATE RANGE",
            dateRange,
            dateRangeOptions,
            <LuCalendarDays size={15} strokeWidth={1.8} />,
            "sky",
          )}
        </div>

        {/* =================================================
            ACTIVE FILTERS + ACTIONS
        ================================================= */}

        <div className="schedule-filter-footer">
          {/* ACTIVE FILTER AREA */}

          <div className="schedule-active-filters">
            <div className="schedule-active-filter-title">
              <LuFilter size={15} strokeWidth={1.8} />

              <span>Active Filters</span>
            </div>

            <div className="schedule-active-filter-list">
              {activeFilters.length === 0 ? (
                <div className="schedule-no-filters">
                  <span>no filters applied</span>
                </div>
              ) : (
                activeFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className={`schedule-filter-chip schedule-filter-chip-${filter.theme}`}
                  >
                    <span className="schedule-filter-chip-icon">
                      {filter.icon}
                    </span>

                    <span className="schedule-filter-chip-label">
                      {filter.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFilter(filter.type)}
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      <LuX size={11} strokeWidth={1.9} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ACTIONS */}

          <div className="schedule-filter-actions">
            <button
              type="button"
              className="schedule-reset-button"
              onClick={handleReset}
            >
              <LuRefreshCw size={14} strokeWidth={1.8} />

              <span>Reset Filters</span>
            </button>

            <button
              type="button"
              className="schedule-apply-button"
              onClick={handleApply}
            >
              <LuFilter size={14} strokeWidth={1.9} />

              <span>
                Apply Filters
                {activeFilters.length > 0 ? ` (${activeFilters.length})` : ""}
              </span>

              <LuChevronRight size={14} strokeWidth={1.9} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleFilters;
