import React, { useEffect, useRef, useState } from "react";

import {
  LuArrowUpDown,
  LuCheck,
  LuChevronDown,
  LuGrid2X2,
  LuList,
} from "react-icons/lu";

import "./LearnerFilters.css";

const LearnerFilters = ({
  activeFilter = "All Learners",
  sortValue = "Progress: High",
  viewMode = "list",
  onFilterChange,
  onSortChange,
  onViewChange,
}) => {
  const [showSort, setShowSort] = useState(false);

  const sortRef = useRef(null);

  const tabs = [
    {
      label: "All Learners",
      count: 128,
      type: "all",
    },
    {
      label: "Active",
      count: 96,
      type: "active",
    },
    {
      label: "At Risk",
      count: 12,
      type: "risk",
    },
    {
      label: "Completed",
      count: 20,
      type: "completed",
    },
  ];

  const sortOptions = [
    "Recent Activity",
    "Name: A → Z",
    "Name: Z → A",
    "Progress: High",
    "Progress: Low",
  ];

  /* =====================================================
     CLOSE SORT DROPDOWN
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSort(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =====================================================
     FILTER
  ===================================================== */

  const handleFilterClick = (label) => {
    if (onFilterChange) {
      onFilterChange(label);
    }
  };

  /* =====================================================
     SORT
  ===================================================== */

  const handleSortClick = (option) => {
    setShowSort(false);

    if (onSortChange) {
      onSortChange(option);
    }
  };

  /* =====================================================
     VIEW
  ===================================================== */

  const handleViewClick = (mode) => {
    if (onViewChange) {
      onViewChange(mode);
    }
  };

  return (
    <section className="learner-filters">
      {/* =================================================
          FILTER TABS
      ================================================= */}

      <div className="learner-filter-tabs">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.label;

          return (
            <button
              type="button"
              key={tab.label}
              className={`learner-filter-tab ${isActive ? "active" : ""}`}
              onClick={() => handleFilterClick(tab.label)}
              aria-pressed={isActive}
            >
              {/* All */}
              {tab.type === "all" && (
                <span className="filter-tab-icon">
                  <LuList size={15} strokeWidth={1.8} />
                </span>
              )}

              {/* Active */}
              {tab.type === "active" && (
                <span className="filter-status-dot active" />
              )}

              {/* At Risk */}
              {tab.type === "risk" && (
                <span className="filter-status-dot risk" />
              )}

              {/* Completed */}
              {tab.type === "completed" && (
                <span className="filter-status-dot completed" />
              )}

              <span className="filter-tab-label">{tab.label}</span>

              <span className="filter-tab-count">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* =================================================
          RIGHT SIDE CONTROLS
      ================================================= */}

      <div className="learner-filter-actions">
        {/* =================================================
            SORT
        ================================================= */}

        <div className="learner-sort-wrapper" ref={sortRef}>
          <button
            type="button"
            className={`learner-sort-button ${showSort ? "active" : ""}`}
            onClick={() => setShowSort((previous) => !previous)}
            aria-expanded={showSort}
            aria-haspopup="menu"
          >
            <LuArrowUpDown size={16} strokeWidth={1.8} />

            <span className="sort-text">
              Sort by: <strong>{sortValue}</strong>
            </span>

            <LuChevronDown
              size={15}
              strokeWidth={1.8}
              className={showSort ? "sort-chevron rotate" : "sort-chevron"}
            />
          </button>

          {/* SORT DROPDOWN */}

          {showSort && (
            <div className="learner-sort-menu" role="menu">
              <div className="sort-menu-heading">Sort learners</div>

              {sortOptions.map((option) => {
                const selected = sortValue === option;

                return (
                  <button
                    type="button"
                    key={option}
                    className={`sort-menu-option ${selected ? "selected" : ""}`}
                    onClick={() => handleSortClick(option)}
                    role="menuitem"
                  >
                    <span>{option}</span>

                    {selected && <LuCheck size={14} strokeWidth={2} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* =================================================
            LIST / GRID SWITCH
        ================================================= */}

        <div className="learner-view-switch">
          <button
            type="button"
            className={`learner-view-button ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => handleViewClick("list")}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
          >
            <LuList size={16} strokeWidth={1.8} />

            <span>List</span>
          </button>

          <button
            type="button"
            className={`learner-view-button ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => handleViewClick("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <LuGrid2X2 size={16} strokeWidth={1.8} />

            <span>Grid</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearnerFilters;
