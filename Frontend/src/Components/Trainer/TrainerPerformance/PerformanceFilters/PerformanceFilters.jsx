import React, { useEffect, useRef, useState } from "react";
import {
  LuCalendarDays,
  LuChevronDown,
  LuChevronRight,
  LuCircleCheck,
  LuFilter,
  LuRotateCcw,
  LuSearch,
  LuSlidersHorizontal,
  LuSparkles,
  LuUsersRound,
  LuX,
} from "react-icons/lu";

import "./PerformanceFilters.css";

const PerformanceFilters = ({
  filters = {},
  onFiltersChange,
  onResetFilters,
}) => {
  /* =====================================================
     PARENT FILTER VALUES
  ===================================================== */

  const {
    course: parentCourse = "All Courses",
    batch: parentBatch = "All Batches",
    period: parentPeriod = "This Month",
    status: parentStatus = "All Status",
    searchValue: parentSearchValue = "",
  } = filters;

  /* =====================================================
     LOCAL FILTER STATE

     These values are intentionally local until the
     trainer clicks "Apply Filters".
  ===================================================== */

  const [course, setCourse] = useState(parentCourse);
  const [batch, setBatch] = useState(parentBatch);
  const [period, setPeriod] = useState(parentPeriod);
  const [status, setStatus] = useState(parentStatus);
  const [searchValue, setSearchValue] = useState(parentSearchValue);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showInsight, setShowInsight] = useState(false);

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

  const periodOptions = [
    "This Month",
    "Last Month",
    "Last 3 Months",
    "This Year",
  ];

  const statusOptions = [
    "All Status",
    "Excellent",
    "Good",
    "Average",
    "Needs Attention",
  ];

  /* =====================================================
     SYNC WITH PARENT

     This is especially important when the parent resets
     the filters.
  ===================================================== */

  useEffect(() => {
    setCourse(parentCourse);
    setBatch(parentBatch);
    setPeriod(parentPeriod);
    setStatus(parentStatus);
    setSearchValue(parentSearchValue);
  }, [
    parentCourse,
    parentBatch,
    parentPeriod,
    parentStatus,
    parentSearchValue,
  ]);

  /* =====================================================
     OUTSIDE CLICK + ESCAPE
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
     DROPDOWN HANDLERS
  ===================================================== */

  const toggleDropdown = (name) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const handleSelect = (type, value) => {
    if (type === "course") {
      setCourse(value);
    }

    if (type === "batch") {
      setBatch(value);
    }

    if (type === "period") {
      setPeriod(value);
    }

    if (type === "status") {
      setStatus(value);
    }

    setOpenDropdown(null);
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const handleReset = () => {
    const resetValues = {
      course: "All Courses",
      batch: "All Batches",
      period: "This Month",
      status: "All Status",
      searchValue: "",
    };

    setCourse(resetValues.course);
    setBatch(resetValues.batch);
    setPeriod(resetValues.period);
    setStatus(resetValues.status);
    setSearchValue(resetValues.searchValue);

    setOpenDropdown(null);

    onResetFilters?.(resetValues);

    /*
      Also update the parent immediately so the learner
      performance list returns to the complete dataset.
    */
    onFiltersChange?.(resetValues);
  };

  /* =====================================================
     APPLY FILTERS
  ===================================================== */

  const handleApply = () => {
    const filterData = {
      course,
      batch,
      period,
      status,
      searchValue: searchValue.trim(),
    };

    setOpenDropdown(null);

    /*
      Send the complete filter state to the parent.
    */
    onFiltersChange?.(filterData);
  };

  /* =====================================================
     REMOVE INDIVIDUAL FILTER
  ===================================================== */

  const removeFilter = (type) => {
    if (type === "course") {
      setCourse("All Courses");
    }

    if (type === "batch") {
      setBatch("All Batches");
    }

    if (type === "period") {
      setPeriod("This Month");
    }

    if (type === "status") {
      setStatus("All Status");
    }

    if (type === "search") {
      setSearchValue("");
    }
  };

  /* =====================================================
     ACTIVE FILTERS
  ===================================================== */

  const activeFilters = [];

  if (course !== "All Courses") {
    activeFilters.push({
      id: "course",
      label: course,
      type: "course",
    });
  }

  if (batch !== "All Batches") {
    activeFilters.push({
      id: "batch",
      label: batch,
      type: "batch",
    });
  }

  if (period !== "This Month") {
    activeFilters.push({
      id: "period",
      label: period,
      type: "period",
    });
  }

  if (status !== "All Status") {
    activeFilters.push({
      id: "status",
      label: status,
      type: "status",
    });
  }

  if (searchValue.trim()) {
    activeFilters.push({
      id: "search",
      label: `"${searchValue.trim()}"`,
      type: "search",
    });
  }

  /* =====================================================
     DROPDOWN RENDERER
  ===================================================== */

  const renderDropdown = (type, label, value, options, icon, theme) => {
    const isOpen = openDropdown === type;

    return (
      <div className="performance-filter-field">
        <label className="performance-filter-label">{label}</label>

        <div className="performance-filter-dropdown">
          <button
            type="button"
            className={`performance-filter-trigger performance-filter-trigger-${theme} ${
              isOpen ? "is-open" : ""
            }`}
            onClick={() => toggleDropdown(type)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className="performance-filter-trigger-left">
              <span className="performance-filter-icon">{icon}</span>

              <span className="performance-filter-value">{value}</span>
            </span>

            <LuChevronDown
              className={`performance-filter-chevron ${isOpen ? "rotate" : ""}`}
              size={14}
              strokeWidth={1.9}
            />
          </button>

          {isOpen && (
            <div className="performance-filter-menu" role="listbox">
              {options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`performance-filter-option ${
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

  return (
    <section className="performance-filters">
      <div className="performance-filters-shell">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="performance-filters-header">
          <div className="performance-filters-title-area">
            <div className="performance-filters-main-icon">
              <LuSlidersHorizontal size={17} strokeWidth={1.8} />
            </div>

            <div className="performance-filters-heading">
              <div className="performance-filters-heading-line">
                <h2>Performance Filters</h2>

                <span className="performance-filter-count">
                  {activeFilters.length}
                </span>
              </div>

              <p>Refine and customize the performance data you want to view.</p>
            </div>
          </div>

          {/* =================================================
              RIGHT HEADER ACTIONS
          ================================================= */}

          <div className="performance-filters-header-right">
            <div className="performance-filters-live">
              <span className="performance-filters-live-dot" />

              <span>Live data</span>
            </div>

            <button
              type="button"
              className={`performance-insight-button ${
                showInsight ? "active" : ""
              }`}
              onClick={() => setShowInsight((current) => !current)}
              aria-expanded={showInsight}
            >
              <LuSparkles size={14} strokeWidth={1.8} />

              <span>Better insights</span>

              <LuChevronRight
                size={14}
                strokeWidth={1.8}
                className={showInsight ? "performance-insight-arrow-open" : ""}
              />
            </button>
          </div>
        </div>

        {/* =================================================
            OPTIONAL INSIGHT PANEL
        ================================================= */}

        {showInsight && (
          <div className="performance-insight-panel">
            <div className="performance-insight-panel-icon">
              <LuSparkles size={15} strokeWidth={1.8} />
            </div>

            <div className="performance-insight-panel-content">
              <strong>Use multiple filters together</strong>

              <span>
                Combine course, batch, status and learner search to narrow down
                performance results.
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowInsight(false)}
              aria-label="Close insights"
            >
              <LuX size={13} strokeWidth={1.9} />
            </button>
          </div>
        )}

        {/* =================================================
            FILTER CONTROLS
        ================================================= */}

        <div className="performance-filter-controls" ref={dropdownRef}>
          {/* =================================================
              COURSE
          ================================================= */}

          {renderDropdown(
            "course",
            "COURSE",
            course,
            courseOptions,
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>,
            "blue",
          )}

          {/* =================================================
              BATCH
          ================================================= */}

          {renderDropdown(
            "batch",
            "BATCH",
            batch,
            batchOptions,
            <LuUsersRound size={14} strokeWidth={1.8} />,
            "mint",
          )}

          {/* =================================================
              PERIOD
          ================================================= */}

          {renderDropdown(
            "period",
            "TIME PERIOD",
            period,
            periodOptions,
            <LuCalendarDays size={14} strokeWidth={1.8} />,
            "peach",
          )}

          {/* =================================================
              STATUS
          ================================================= */}

          {renderDropdown(
            "status",
            "PERFORMANCE STATUS",
            status,
            statusOptions,
            <LuFilter size={14} strokeWidth={1.8} />,
            "lavender",
          )}

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="performance-filter-field performance-search-field">
            <label
              htmlFor="performance-learner-search"
              className="performance-filter-label"
            >
              SEARCH LEARNER
            </label>

            <div
              className={`performance-search-wrapper ${
                searchValue ? "has-value" : ""
              }`}
            >
              <span className="performance-search-icon">
                <LuSearch size={15} strokeWidth={1.8} />
              </span>

              <input
                id="performance-learner-search"
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by name or email..."
                aria-label="Search learner"
              />

              {searchValue && (
                <button
                  type="button"
                  className="performance-search-clear"
                  onClick={() => setSearchValue("")}
                  aria-label="Clear learner search"
                >
                  <LuX size={13} strokeWidth={1.8} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIVE FILTERS + ACTIONS
        ================================================= */}

        <div className="performance-filter-footer">
          {/* =================================================
              ACTIVE FILTER AREA
          ================================================= */}

          <div className="performance-active-filter-box">
            <div className="performance-active-filter-heading">
              <span>ACTIVE FILTERS</span>

              {activeFilters.length > 0 && (
                <span>{activeFilters.length} applied</span>
              )}
            </div>

            <div className="performance-active-filter-content">
              {activeFilters.length === 0 ? (
                <div className="performance-no-filters">
                  <div className="performance-no-filter-icon">
                    <LuFilter size={14} strokeWidth={1.7} />
                  </div>

                  <div>
                    <strong>No filters applied</strong>

                    <span>Showing all performance data</span>
                  </div>
                </div>
              ) : (
                <div className="performance-filter-chips">
                  {activeFilters.map((filter) => (
                    <div className="performance-filter-chip" key={filter.id}>
                      <span>{filter.label}</span>

                      <button
                        type="button"
                        onClick={() => removeFilter(filter.type)}
                        aria-label={`Remove ${filter.label} filter`}
                      >
                        <LuX size={11} strokeWidth={1.9} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="performance-filter-actions">
            <button
              type="button"
              className="performance-reset-button"
              onClick={handleReset}
            >
              <LuRotateCcw size={14} strokeWidth={1.8} />

              <span>Reset Filters</span>
            </button>

            <button
              type="button"
              className="performance-apply-button"
              onClick={handleApply}
            >
              <LuFilter size={14} strokeWidth={1.9} />

              <span>Apply Filters</span>

              <LuChevronRight size={14} strokeWidth={1.9} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceFilters;
