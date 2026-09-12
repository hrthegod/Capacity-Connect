import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  LuCalendar,
  LuCheck,
  LuChevronDown,
  LuFilter,
  LuRotateCcw,
  LuSearch,
  LuSlidersHorizontal,
  LuUsersRound,
  LuX,
} from "react-icons/lu";

import "./AttendanceFilters.css";

/* =========================================================
   ATTENDANCE FILTERS
========================================================= */

const AttendanceFilters = ({
  /* ======================================================
     CONTROLLED FILTER VALUES
  ====================================================== */

  searchValue = "",
  course = "All Courses",
  batch = "All Batches",
  status = "All Status",
  sortBy = "Learner Name",

  /* ======================================================
     FILTER CALLBACKS
  ====================================================== */

  onSearchChange,
  onCourseChange,
  onBatchChange,
  onStatusChange,
  onSortChange,

  /* ======================================================
     OTHER CALLBACKS
  ====================================================== */

  onApplyFilters,
  onFiltersChange,
  onResetFilters,
  onClearSearch,

  /* ======================================================
     OPTIONAL RESULT COUNT
  ====================================================== */

  resultCount,
  totalCount,
}) => {
  /* ======================================================
     LOCAL DATE FILTER
     
     AttendanceList does not currently use dateRange,
     so this remains local until date filtering is added.
  ====================================================== */

  const [dateRange, setDateRange] = useState("Today");

  /* ======================================================
     LOCAL STATUS PILL
     
     The actual status value is controlled by the parent.
     This state is only used when necessary for UI sync.
  ====================================================== */

  const statusFilter = status === "All Status" ? "All" : status;

  /* ======================================================
     DROPDOWN STATE
  ====================================================== */

  const [openDropdown, setOpenDropdown] = useState(null);

  /* ======================================================
     REFS
  ====================================================== */

  const filtersRef = useRef(null);

  const searchInputRef = useRef(null);

  /* ======================================================
     OPTIONS
  ====================================================== */

  const courseOptions = [
    "All Courses",
    "React for Beginners",
    "Python for Data Science",
    "UI/UX Design Fundamentals",
    "Cloud Computing Basics",
    "Node.js Backend Development",
    "AI for Everyone",
  ];

  const batchOptions = [
    "All Batches",
    "Batch A - 2025",
    "Batch B - 2025",
    "Batch C - 2025",
    "Morning Batch",
    "Evening Batch",
  ];

  const statusOptions = ["All Status", "Present", "Absent", "Late", "Excused"];

  const dateOptions = [
    "Today",
    "This Week",
    "This Month",
    "Last 7 Days",
    "Last 30 Days",
  ];

  const sortOptions = [
    "Learner Name",
    "Recently Updated",
    "Highest Attendance",
    "Lowest Attendance",
  ];

  /* ======================================================
     STATUS PILLS
  ====================================================== */

  const statusPills = [
    {
      label: "All",
      icon: LuSlidersHorizontal,
      value: "All",
    },
    {
      label: "Present",
      icon: LuCheck,
      value: "Present",
    },
    {
      label: "Absent",
      icon: LuX,
      value: "Absent",
    },
    {
      label: "Late",
      icon: LuCalendar,
      value: "Late",
    },
    {
      label: "Excused",
      icon: LuUsersRound,
      value: "Excused",
    },
  ];

  /* ======================================================
     CLOSE DROPDOWNS — OUTSIDE CLICK
  ====================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ======================================================
     ESCAPE KEY
  ====================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ======================================================
     SEARCH SHORTCUT
  ====================================================== */

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  /* ======================================================
     DROPDOWN TOGGLE
  ====================================================== */

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((previous) => (previous === dropdown ? null : dropdown));
  };

  /* ======================================================
     SEARCH CHANGE
  ====================================================== */

  const handleSearchChange = (event) => {
    const value = event.target.value;

    onSearchChange?.(value);
  };

  /* ======================================================
     COURSE CHANGE
  ====================================================== */

  const handleCourseChange = (value) => {
    onCourseChange?.(value);

    setOpenDropdown(null);
  };

  /* ======================================================
     BATCH CHANGE
  ====================================================== */

  const handleBatchChange = (value) => {
    onBatchChange?.(value);

    setOpenDropdown(null);
  };

  /* ======================================================
     STATUS CHANGE
  ====================================================== */

  const handleStatusChange = (value) => {
    onStatusChange?.(value);

    setOpenDropdown(null);
  };

  /* ======================================================
     DATE CHANGE
  ====================================================== */

  const handleDateChange = (value) => {
    setDateRange(value);

    setOpenDropdown(null);
  };

  /* ======================================================
     SORT CHANGE
  ====================================================== */

  const handleSortChange = (value) => {
    onSortChange?.(value);

    setOpenDropdown(null);
  };

  /* ======================================================
     STATUS PILL CHANGE
  ====================================================== */

  const handleStatusPillChange = (value) => {
    if (value === "All") {
      onStatusChange?.("All Status");
    } else {
      onStatusChange?.(value);
    }
  };

  /* ======================================================
     ACTIVE FILTERS
  ====================================================== */

  const activeFilters = useMemo(() => {
    const filters = [];

    /* ----------------------------------------------------
       DATE
       
       Today is treated as the default and therefore
       isn't shown as an active filter.
    ---------------------------------------------------- */

    if (dateRange !== "Today") {
      filters.push({
        id: "date",
        label: dateRange,
        type: "date",
        icon: LuCalendar,
      });
    }

    /* ----------------------------------------------------
       COURSE
    ---------------------------------------------------- */

    if (course !== "All Courses") {
      filters.push({
        id: "course",
        label: course,
        type: "course",
        icon: LuFilter,
      });
    }

    /* ----------------------------------------------------
       BATCH
    ---------------------------------------------------- */

    if (batch !== "All Batches") {
      filters.push({
        id: "batch",
        label: batch,
        type: "batch",
        icon: LuUsersRound,
      });
    }

    /* ----------------------------------------------------
       STATUS
    ---------------------------------------------------- */

    if (status !== "All Status") {
      filters.push({
        id: "status",
        label: status,
        type: "status",
        icon: LuCheck,
      });
    }

    /* ----------------------------------------------------
       SEARCH
    ---------------------------------------------------- */

    if (searchValue.trim()) {
      filters.push({
        id: "search",
        label: `"${searchValue.trim()}"`,
        type: "search",
        icon: LuSearch,
      });
    }

    return filters;
  }, [dateRange, course, batch, status, searchValue]);

  /* ======================================================
     REMOVE FILTER
  ====================================================== */

  const handleRemoveFilter = (filterType) => {
    switch (filterType) {
      case "date":
        setDateRange("Today");
        break;

      case "course":
        onCourseChange?.("All Courses");
        break;

      case "batch":
        onBatchChange?.("All Batches");
        break;

      case "status":
        onStatusChange?.("All Status");
        break;

      case "search":
        if (onClearSearch) {
          onClearSearch();
        } else {
          onSearchChange?.("");
        }
        break;

      default:
        break;
    }
  };

  /* ======================================================
     RESET FILTERS
  ====================================================== */

  const handleResetFiltersInternal = () => {
    /*
     * Use parent's reset handler when available.
     * This keeps TrainerAttendance as the single
     * source of truth.
     */

    if (onResetFilters) {
      onResetFilters();
    } else {
      onSearchChange?.("");
      onCourseChange?.("All Courses");
      onBatchChange?.("All Batches");
      onStatusChange?.("All Status");
      onSortChange?.("Learner Name");
    }

    setDateRange("Today");
    setOpenDropdown(null);

    /*
     * Also notify parent if it is using the
     * generic onFiltersChange callback.
     */

    onFiltersChange?.({
      searchValue: "",
      course: "All Courses",
      batch: "All Batches",
      status: "All Status",
      dateRange: "Today",
      statusFilter: "All",
      sortBy: "Learner Name",
    });
  };

  /* ======================================================
     APPLY FILTERS
  ====================================================== */

  const handleApplyFilters = () => {
    const filterData = {
      searchValue: searchValue.trim(),

      course,

      batch,

      status,

      dateRange,

      statusFilter,

      sortBy,
    };

    setOpenDropdown(null);

    onFiltersChange?.(filterData);

    onApplyFilters?.(filterData);
  };

  /* ======================================================
     FILTER SUMMARY
  ====================================================== */

  const hasFilters = activeFilters.length > 0;

  /*
   * If the parent doesn't provide a result count,
   * don't display an incorrect hardcoded number.
   */

  const displayedResultCount =
    typeof resultCount === "number" ? resultCount : null;

  const displayedTotalCount =
    typeof totalCount === "number" ? totalCount : null;

  /* ======================================================
     RENDER DROPDOWN
  ====================================================== */

  const renderDropdown = ({ id, value, options, onChange, icon: Icon }) => {
    const isOpen = openDropdown === id;

    return (
      <div className="attendance-filter-dropdown">
        <button
          type="button"
          className={`attendance-filter-select ${isOpen ? "is-open" : ""}`}
          onClick={() => handleDropdownToggle(id)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="attendance-filter-select-left">
            <Icon size={15} strokeWidth={1.7} />

            <span>{value}</span>
          </span>

          <LuChevronDown
            size={14}
            strokeWidth={1.8}
            className={
              isOpen
                ? "attendance-filter-chevron rotated"
                : "attendance-filter-chevron"
            }
          />
        </button>

        {isOpen && (
          <div className="attendance-filter-menu" role="listbox">
            {options.map((option) => (
              <button
                type="button"
                key={option}
                role="option"
                aria-selected={value === option}
                className={value === option ? "selected" : ""}
                onClick={() => onChange(option)}
              >
                <span>{option}</span>

                {value === option && <LuCheck size={14} strokeWidth={1.9} />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <section className="attendance-filters" ref={filtersRef}>
      {/* ==================================================
          BACKGROUND GLASS ORBS
      ================================================== */}

      <div
        className="attendance-filters-orb attendance-filters-orb-one"
        aria-hidden="true"
      />

      <div
        className="attendance-filters-orb attendance-filters-orb-two"
        aria-hidden="true"
      />

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="attendance-filters-header">
        <div className="attendance-filters-title-group">
          <div className="attendance-filters-title-icon">
            <LuFilter size={18} strokeWidth={1.75} />
          </div>

          <div className="attendance-filters-title">
            <h2>Filter Attendance</h2>

            <p>
              Refine the list to find specific learners and attendance records.
            </p>
          </div>
        </div>

        <div className="attendance-filters-header-actions">
          <button
            type="button"
            className="attendance-reset-button"
            onClick={handleResetFiltersInternal}
          >
            <LuRotateCcw size={14} strokeWidth={1.8} />

            <span>Reset Filters</span>
          </button>

          <button
            type="button"
            className="attendance-apply-button"
            onClick={handleApplyFilters}
          >
            <LuCheck size={14} strokeWidth={1.9} />

            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* ==================================================
          MAIN FILTER ROW
      ================================================== */}

      <div className="attendance-filter-row">
        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="attendance-search-wrapper">
          <LuSearch
            className="attendance-search-icon"
            size={16}
            strokeWidth={1.75}
          />

          <input
            ref={searchInputRef}
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search learner by name or ID..."
            aria-label="Search learner by name or ID"
          />

          <kbd>⌘ K</kbd>

          {searchValue && (
            <button
              type="button"
              className="attendance-search-clear"
              onClick={() => {
                if (onClearSearch) {
                  onClearSearch();
                } else {
                  onSearchChange?.("");
                }
              }}
              aria-label="Clear search"
            >
              <LuX size={13} strokeWidth={1.9} />
            </button>
          )}
        </div>

        {/* =================================================
            COURSE
        ================================================= */}

        {renderDropdown({
          id: "course",
          value: course,
          options: courseOptions,
          onChange: handleCourseChange,
          icon: LuFilter,
        })}

        {/* =================================================
            BATCH
        ================================================= */}

        {renderDropdown({
          id: "batch",
          value: batch,
          options: batchOptions,
          onChange: handleBatchChange,
          icon: LuUsersRound,
        })}

        {/* =================================================
            STATUS
        ================================================= */}

        {renderDropdown({
          id: "status",
          value: status,
          options: statusOptions,
          onChange: handleStatusChange,
          icon: LuSlidersHorizontal,
        })}

        {/* =================================================
            DATE
        ================================================= */}

        {renderDropdown({
          id: "date",
          value: dateRange,
          options: dateOptions,
          onChange: handleDateChange,
          icon: LuCalendar,
        })}
      </div>

      {/* ==================================================
          STATUS PILLS
      ================================================== */}

      <div className="attendance-status-pills">
        {statusPills.map((pill) => {
          const Icon = pill.icon;

          return (
            <button
              type="button"
              key={pill.value}
              className={`attendance-status-pill attendance-status-pill-${pill.value.toLowerCase()} ${
                statusFilter === pill.value ? "active" : ""
              }`}
              onClick={() => handleStatusPillChange(pill.value)}
              aria-pressed={statusFilter === pill.value}
            >
              <Icon size={14} strokeWidth={1.8} />

              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================
          ACTIVE FILTERS
      ================================================== */}

      <div className="attendance-active-row">
        <div className="attendance-active-left">
          <span className="attendance-active-label">Active Filters:</span>

          {hasFilters ? (
            <div className="attendance-filter-chips">
              {activeFilters.map((filter) => {
                const Icon = filter.icon;

                return (
                  <div className="attendance-filter-chip" key={filter.id}>
                    <Icon size={13} strokeWidth={1.8} />

                    <span>{filter.label}</span>

                    <button
                      type="button"
                      onClick={() => handleRemoveFilter(filter.type)}
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      <LuX size={12} strokeWidth={1.9} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="attendance-no-filters">No active filters</span>
          )}
        </div>

        {/* =================================================
            SUMMARY + SORT
        ================================================= */}

        <div className="attendance-filter-summary">
          {displayedResultCount !== null ? (
            <span>
              Showing <strong>{displayedResultCount}</strong>
              {displayedTotalCount !== null && (
                <>
                  {" "}
                  of <strong>{displayedTotalCount}</strong>
                </>
              )}{" "}
              learners
            </span>
          ) : (
            <span>
              Filters active: <strong>{activeFilters.length}</strong>
            </span>
          )}

          <div className="attendance-sort-wrapper">
            {renderDropdown({
              id: "sort",
              value: sortBy,
              options: sortOptions,
              onChange: handleSortChange,
              icon: LuSlidersHorizontal,
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceFilters;
