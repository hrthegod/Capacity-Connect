import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LuArrowUpDown,
  LuChartColumn,
  LuCalendarDays,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuEye,
  LuFileDown,
  LuGrid2X2,
  LuList,
  LuMail,
  LuSearch,
  LuSlidersHorizontal,
  LuTrendingDown,
  LuTrendingUp,
  LuUserRound,
  LuX,
} from "react-icons/lu";

import "./LearnerPerformance.css";

/* =========================================================
   LEARNER PERFORMANCE DATA
   ========================================================= */

export const learnerPerformanceData = [
  {
    id: 1,
    name: "Rohan Sharma",
    learnerId: "CC001",
    email: "rohan.sharma@example.com",
    course: "Web Development",
    batch: "Batch A",
    score: 92,
    completion: 100,
    assignments: 100,
    assignmentsCompleted: 12,
    assignmentsTotal: 12,
    status: "Excellent",
    lastActive: "2 hours ago",
    avatar: "RS",
    theme: "blue",
  },
  {
    id: 2,
    name: "Aisha Patel",
    learnerId: "CC002",
    email: "aisha.patel@example.com",
    course: "Data Structures",
    batch: "Batch B",
    score: 78,
    completion: 85,
    assignments: 83,
    assignmentsCompleted: 10,
    assignmentsTotal: 12,
    status: "Good",
    lastActive: "1 day ago",
    avatar: "AP",
    theme: "rose",
  },
  {
    id: 3,
    name: "Karan Mehta",
    learnerId: "CC003",
    email: "karan.mehta@example.com",
    course: "Database Management",
    batch: "Batch A",
    score: 84,
    completion: 90,
    assignments: 92,
    assignmentsCompleted: 11,
    assignmentsTotal: 12,
    status: "Good",
    lastActive: "5 hours ago",
    avatar: "KM",
    theme: "peach",
  },
  {
    id: 4,
    name: "Sneha Prakash",
    learnerId: "CC004",
    email: "sneha.prakash@example.com",
    course: "Artificial Intelligence",
    batch: "Batch C",
    score: 71,
    completion: 80,
    assignments: 75,
    assignmentsCompleted: 9,
    assignmentsTotal: 12,
    status: "Average",
    lastActive: "1 day ago",
    avatar: "SP",
    theme: "lavender",
  },
  {
    id: 5,
    name: "Arjun Desai",
    learnerId: "CC005",
    email: "arjun.desai@example.com",
    course: "Web Development",
    batch: "Batch B",
    score: 88,
    completion: 95,
    assignments: 100,
    assignmentsCompleted: 12,
    assignmentsTotal: 12,
    status: "Excellent",
    lastActive: "3 hours ago",
    avatar: "AD",
    theme: "mint",
  },
  {
    id: 6,
    name: "Priya Kapoor",
    learnerId: "CC006",
    email: "priya.kapoor@example.com",
    course: "Data Structures",
    batch: "Batch C",
    score: 65,
    completion: 70,
    assignments: 67,
    assignmentsCompleted: 8,
    assignmentsTotal: 12,
    status: "Needs Attention",
    lastActive: "2 days ago",
    avatar: "PK",
    theme: "blue",
  },
  {
    id: 7,
    name: "Nikhil Verma",
    learnerId: "CC007",
    email: "nikhil.verma@example.com",
    course: "Database Management",
    batch: "Batch D",
    score: 79,
    completion: 85,
    assignments: 83,
    assignmentsCompleted: 10,
    assignmentsTotal: 12,
    status: "Good",
    lastActive: "6 hours ago",
    avatar: "NV",
    theme: "rose",
  },
  {
    id: 8,
    name: "Tanvi Chowdhury",
    learnerId: "CC008",
    email: "tanvi.chowdhury@example.com",
    course: "Artificial Intelligence",
    batch: "Batch A",
    score: 90,
    completion: 92,
    assignments: 92,
    assignmentsCompleted: 11,
    assignmentsTotal: 12,
    status: "Excellent",
    lastActive: "4 hours ago",
    avatar: "TC",
    theme: "lavender",
  },
  {
    id: 9,
    name: "Dev Malhotra",
    learnerId: "CC009",
    email: "dev.malhotra@example.com",
    course: "Web Development",
    batch: "Batch D",
    score: 74,
    completion: 82,
    assignments: 75,
    assignmentsCompleted: 9,
    assignmentsTotal: 12,
    status: "Average",
    lastActive: "8 hours ago",
    avatar: "DM",
    theme: "mint",
  },
  {
    id: 10,
    name: "Meera Joshi",
    learnerId: "CC010",
    email: "meera.joshi@example.com",
    course: "Artificial Intelligence",
    batch: "Batch B",
    score: 94,
    completion: 98,
    assignments: 100,
    assignmentsCompleted: 12,
    assignmentsTotal: 12,
    status: "Excellent",
    lastActive: "1 hour ago",
    avatar: "MJ",
    theme: "peach",
  },
  {
    id: 11,
    name: "Aditya Rao",
    learnerId: "CC011",
    email: "aditya.rao@example.com",
    course: "Data Structures",
    batch: "Batch A",
    score: 69,
    completion: 76,
    assignments: 67,
    assignmentsCompleted: 8,
    assignmentsTotal: 12,
    status: "Average",
    lastActive: "2 days ago",
    avatar: "AR",
    theme: "blue",
  },
  {
    id: 12,
    name: "Kavya Shah",
    learnerId: "CC012",
    email: "kavya.shah@example.com",
    course: "Database Management",
    batch: "Batch C",
    score: 58,
    completion: 63,
    assignments: 58,
    assignmentsCompleted: 7,
    assignmentsTotal: 12,
    status: "Needs Attention",
    lastActive: "3 days ago",
    avatar: "KS",
    theme: "rose",
  },
];

/* =========================================================
   CONSTANTS
   ========================================================= */

const ROWS_PER_PAGE_OPTIONS = [8, 12, 20];

const STATUS_ORDER = {
  Excellent: 1,
  Good: 2,
  Average: 3,
  "Needs Attention": 4,
};

/* =========================================================
   COMPONENT
   ========================================================= */

const LearnerPerformance = ({ filters = {}, onViewLearner, onExport }) => {
  const {
    course: filterCourse = "All Courses",
    batch: filterBatch = "All Batches",
    period: filterPeriod = "This Month",
    status: filterStatus = "All Status",
    searchValue: filterSearch = "",
  } = filters;

  const [searchValue, setSearchValue] = useState(filterSearch);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const [viewMode, setViewMode] = useState("table");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [openMenu, setOpenMenu] = useState(null);
  const [openRowsMenu, setOpenRowsMenu] = useState(false);

  const [selectedLearners, setSelectedLearners] = useState([]);

  const menuRef = useRef(null);

  /* =====================================================
     SYNC SEARCH WITH PARENT FILTER
  ===================================================== */

  useEffect(() => {
    setSearchValue(filterSearch);
    setCurrentPage(1);
  }, [filterSearch, filterCourse, filterBatch, filterPeriod, filterStatus]);

  /* =====================================================
     OUTSIDE CLICK + ESCAPE
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
        setOpenRowsMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setOpenRowsMenu(false);
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
     FILTER DATA
  ===================================================== */

  const filteredLearners = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return learnerPerformanceData.filter((learner) => {
      const matchesCourse =
        filterCourse === "All Courses" || learner.course === filterCourse;

      const matchesBatch =
        filterBatch === "All Batches" || learner.batch === filterBatch;

      const matchesStatus =
        filterStatus === "All Status" || learner.status === filterStatus;

      const matchesSearch =
        !normalizedSearch ||
        learner.name.toLowerCase().includes(normalizedSearch) ||
        learner.email.toLowerCase().includes(normalizedSearch) ||
        learner.learnerId.toLowerCase().includes(normalizedSearch);

      return matchesCourse && matchesBatch && matchesStatus && matchesSearch;
    });
  }, [searchValue, filterCourse, filterBatch, filterStatus]);

  /* =====================================================
     SORT
  ===================================================== */

  const sortedLearners = useMemo(() => {
    const data = [...filteredLearners];

    data.sort((first, second) => {
      let firstValue;
      let secondValue;

      if (sortBy === "name") {
        firstValue = first.name;
        secondValue = second.name;
      }

      if (sortBy === "score") {
        firstValue = first.score;
        secondValue = second.score;
      }

      if (sortBy === "completion") {
        firstValue = first.completion;
        secondValue = second.completion;
      }

      if (sortBy === "assignments") {
        firstValue = first.assignments;
        secondValue = second.assignments;
      }

      if (sortBy === "status") {
        firstValue = STATUS_ORDER[first.status];
        secondValue = STATUS_ORDER[second.status];
      }

      if (typeof firstValue === "string") {
        return sortDirection === "asc"
          ? firstValue.localeCompare(secondValue)
          : secondValue.localeCompare(firstValue);
      }

      return sortDirection === "asc"
        ? firstValue - secondValue
        : secondValue - firstValue;
    });

    return data;
  }, [filteredLearners, sortBy, sortDirection]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(sortedLearners.length / rowsPerPage),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const endIndex = Math.min(startIndex + rowsPerPage, sortedLearners.length);

  const visibleLearners = sortedLearners.slice(startIndex, endIndex);

  /* =====================================================
     SORT HANDLER
  ===================================================== */

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  /* =====================================================
     SELECTION
  ===================================================== */

  const visibleIds = visibleLearners.map((learner) => learner.id);

  const allVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedLearners.includes(id));

  const handleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedLearners((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );

      return;
    }

    setSelectedLearners((current) => [...new Set([...current, ...visibleIds])]);
  };

  const handleSelectLearner = (id) => {
    setSelectedLearners((current) =>
      current.includes(id)
        ? current.filter((learnerId) => learnerId !== id)
        : [...current, id],
    );
  };

  const clearSelection = () => {
    setSelectedLearners([]);
  };

  /* =====================================================
     VIEW HANDLERS
  ===================================================== */

  const handleTableView = () => {
    setViewMode("table");
    setOpenMenu(null);
  };

  const handleGridView = () => {
    setViewMode("grid");
    setOpenMenu(null);
  };

  /* =====================================================
     ROWS PER PAGE
  ===================================================== */

  const handleRowsPerPage = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
    setOpenRowsMenu(false);
  };

  /* =====================================================
     VIEW LEARNER
  ===================================================== */

  const handleViewLearner = (learner) => {
    setOpenMenu(null);
    onViewLearner?.(learner);
  };

  /* =====================================================
     EXPORT
  ===================================================== */

  const handleExport = () => {
    onExport?.({
      learners: sortedLearners,
      course: filterCourse,
      batch: filterBatch,
      period: filterPeriod,
      status: filterStatus,
      searchValue,
    });
  };

  /* =====================================================
     STATUS CLASS
  ===================================================== */

  const getStatusClass = (status) => {
    if (status === "Excellent") {
      return "is-excellent";
    }

    if (status === "Good") {
      return "is-good";
    }

    if (status === "Average") {
      return "is-average";
    }

    return "is-attention";
  };

  /* =====================================================
     COURSE CLASS
  ===================================================== */

  const getCourseClass = (course) => {
    if (course === "Web Development") {
      return "course-blue";
    }

    if (course === "Data Structures") {
      return "course-mint";
    }

    if (course === "Database Management") {
      return "course-peach";
    }

    return "course-lavender";
  };

  /* =====================================================
     RENDER SORT BUTTON
  ===================================================== */

  const renderSortButton = (label, field) => {
    const active = sortBy === field;

    return (
      <button
        type="button"
        className={`performance-table-sort ${active ? "active" : ""}`}
        onClick={() => handleSort(field)}
      >
        <span>{label}</span>

        {active ? (
          <LuArrowUpDown size={11} strokeWidth={1.9} />
        ) : (
          <LuArrowUpDown size={11} strokeWidth={1.6} />
        )}
      </button>
    );
  };

  /* =====================================================
     PROGRESS BAR
  ===================================================== */

  const renderProgress = (value, theme = "blue") => {
    return (
      <div className="performance-list-progress">
        <div className="performance-list-progress-track">
          <div
            className={`performance-list-progress-fill progress-${theme}`}
            style={{
              width: `${Math.min(Math.max(value, 0), 100)}%`,
            }}
          />
        </div>

        <span>{value}%</span>
      </div>
    );
  };

  /* =====================================================
     PERFORMANCE SCORE
  ===================================================== */

  const renderScore = (score) => {
    let scoreClass = "score-blue";

    if (score >= 85) {
      scoreClass = "score-mint";
    } else if (score < 70) {
      scoreClass = "score-peach";
    }

    return (
      <div className={`performance-score ${scoreClass}`}>
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="15" className="performance-score-track" />

          <circle
            cx="20"
            cy="20"
            r="15"
            className="performance-score-progress"
            style={{
              strokeDashoffset: 94.25 - (94.25 * score) / 100,
            }}
          />
        </svg>

        <span>{score}%</span>
      </div>
    );
  };

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  if (sortedLearners.length === 0) {
    return (
      <section className="learner-performance">
        <div className="learner-performance-shell">
          <div className="learner-performance-header">
            <div className="learner-performance-title-area">
              <div className="learner-performance-title-icon">
                <LuUserRound size={17} strokeWidth={1.8} />
              </div>

              <div>
                <h2>Learners Performance</h2>
                <p>Individual learner performance details.</p>
              </div>
            </div>
          </div>

          <div className="performance-list-empty">
            <div className="performance-list-empty-icon">
              <LuSearch size={20} strokeWidth={1.7} />
            </div>

            <h3>No learners found</h3>

            <p>No learners match the current performance filters.</p>

            <button type="button" onClick={() => setSearchValue("")}>
              <LuX size={14} strokeWidth={1.8} />
              Clear Search
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="learner-performance">
      <div className="learner-performance-shell" ref={menuRef}>
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="learner-performance-header">
          <div className="learner-performance-title-area">
            <div className="learner-performance-title-icon">
              <LuUserRound size={17} strokeWidth={1.8} />
            </div>

            <div className="learner-performance-heading">
              <div className="learner-performance-heading-line">
                <h2>Learners Performance</h2>

                <span className="learner-performance-count">
                  {sortedLearners.length}
                </span>
              </div>

              <p>View and manage individual learner performance details.</p>
            </div>
          </div>

          {/* HEADER ACTIONS */}

          <div className="learner-performance-actions">
            <div className="learner-performance-result">
              <span className="learner-result-dot" />

              <div>
                <strong>Showing filtered results</strong>

                <small>{sortedLearners.length} learners found</small>
              </div>
            </div>

            <button
              type="button"
              className="learner-export-button"
              onClick={handleExport}
            >
              <LuFileDown size={14} strokeWidth={1.8} />

              <span>Export</span>
            </button>

            <div className="learner-view-toggle">
              <button
                type="button"
                className={viewMode === "table" ? "active" : ""}
                onClick={handleTableView}
                aria-label="Table view"
                aria-pressed={viewMode === "table"}
              >
                <LuList size={15} strokeWidth={1.8} />

                <span>Table</span>
              </button>

              <button
                type="button"
                className={viewMode === "grid" ? "active" : ""}
                onClick={handleGridView}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <LuGrid2X2 size={14} strokeWidth={1.8} />

                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            SEARCH ROW
        ================================================= */}

        <div className="learner-performance-toolbar">
          <div className="learner-list-search">
            <LuSearch size={14} strokeWidth={1.8} />

            <input
              type="search"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search learner, email or ID..."
              aria-label="Search learner"
            />

            {searchValue && (
              <button
                type="button"
                onClick={() => {
                  setSearchValue("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
              >
                <LuX size={12} strokeWidth={1.9} />
              </button>
            )}
          </div>

          <div className="learner-toolbar-summary">
            <div className="learner-toolbar-summary-item">
              <LuSlidersHorizontal size={13} strokeWidth={1.8} />

              <span>{filterCourse}</span>
            </div>

            <span className="learner-toolbar-separator">·</span>

            <div className="learner-toolbar-summary-item">
              <span>{filterBatch}</span>
            </div>

            <span className="learner-toolbar-separator">·</span>

            <div className="learner-toolbar-summary-item">
              <LuCalendarDays size={12} strokeWidth={1.8} />

              <span>{filterPeriod}</span>
            </div>
          </div>
        </div>

        {/* =================================================
            TABLE VIEW
        ================================================= */}

        {viewMode === "table" && (
          <div className="learner-table-wrapper">
            <table className="learner-performance-table">
              <thead>
                <tr>
                  <th className="learner-checkbox-column">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all learners"
                    />
                  </th>

                  <th>{renderSortButton("Learner", "name")}</th>

                  <th>
                    <span className="performance-table-heading">Email</span>
                  </th>

                  <th>{renderSortButton("Course", "name")}</th>

                  <th>
                    <span className="performance-table-heading">Batch</span>
                  </th>

                  <th>{renderSortButton("Avg. Score", "score")}</th>

                  <th>{renderSortButton("Completion", "completion")}</th>

                  <th>{renderSortButton("Assignments", "assignments")}</th>

                  <th>{renderSortButton("Status", "status")}</th>

                  <th>
                    <span className="performance-table-heading">
                      Last Active
                    </span>
                  </th>

                  <th className="learner-actions-column">
                    <span className="performance-table-heading">Actions</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleLearners.map((learner) => (
                  <tr
                    key={learner.id}
                    className={
                      selectedLearners.includes(learner.id)
                        ? "selected-row"
                        : ""
                    }
                  >
                    {/* CHECKBOX */}

                    <td className="learner-checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedLearners.includes(learner.id)}
                        onChange={() => handleSelectLearner(learner.id)}
                        aria-label={`Select ${learner.name}`}
                      />
                    </td>

                    {/* LEARNER */}

                    <td>
                      <div className="learner-profile-cell">
                        <div
                          className={`learner-avatar learner-avatar-${learner.theme}`}
                        >
                          {learner.avatar}
                        </div>

                        <div className="learner-profile-info">
                          <strong>{learner.name}</strong>

                          <span>#{learner.learnerId}</span>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td>
                      <div className="learner-email-cell">
                        <LuMail size={12} strokeWidth={1.7} />

                        <span>{learner.email}</span>
                      </div>
                    </td>

                    {/* COURSE */}

                    <td>
                      <div
                        className={`learner-course-cell ${getCourseClass(
                          learner.course,
                        )}`}
                      >
                        <span className="learner-course-icon">
                          <LuChartColumn size={13} strokeWidth={1.8} />
                        </span>

                        <span>{learner.course}</span>
                      </div>
                    </td>

                    {/* BATCH */}

                    <td>
                      <span
                        className={`learner-batch-badge batch-${learner.theme}`}
                      >
                        {learner.batch}
                      </span>
                    </td>

                    {/* SCORE */}

                    <td>
                      <div className="learner-score-cell">
                        {renderScore(learner.score)}
                      </div>
                    </td>

                    {/* COMPLETION */}

                    <td>
                      {renderProgress(
                        learner.completion,
                        learner.completion >= 90
                          ? "mint"
                          : learner.completion < 75
                            ? "peach"
                            : "blue",
                      )}
                    </td>

                    {/* ASSIGNMENTS */}

                    <td>
                      <div className="learner-assignment-cell">
                        <div className="learner-assignment-count">
                          <strong>{learner.assignmentsCompleted}</strong>

                          <span>/{learner.assignmentsTotal}</span>
                        </div>

                        <div className="learner-assignment-bar">
                          <span
                            style={{
                              width: `${learner.assignments}%`,
                            }}
                            className={
                              learner.assignments >= 90
                                ? "assignment-high"
                                : learner.assignments < 70
                                  ? "assignment-low"
                                  : "assignment-medium"
                            }
                          />
                        </div>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`learner-status ${getStatusClass(
                          learner.status,
                        )}`}
                      >
                        {learner.status === "Excellent" ? (
                          <LuTrendingUp size={12} strokeWidth={1.9} />
                        ) : learner.status === "Needs Attention" ? (
                          <LuTrendingDown size={12} strokeWidth={1.9} />
                        ) : (
                          <LuChartColumn size={12} strokeWidth={1.8} />
                        )}

                        <span>{learner.status}</span>
                      </span>
                    </td>

                    {/* LAST ACTIVE */}

                    <td>
                      <div className="learner-last-active">
                        <LuCalendarDays size={12} strokeWidth={1.7} />

                        <span>{learner.lastActive}</span>
                      </div>
                    </td>

                    {/* ACTION */}

                    <td className="learner-actions-column">
                      <div className="learner-row-menu-wrapper">
                        <button
                          type="button"
                          className="learner-row-menu-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === learner.id ? null : learner.id,
                            )
                          }
                          aria-label={`Actions for ${learner.name}`}
                          aria-expanded={openMenu === learner.id}
                        >
                          <LuEllipsis size={16} strokeWidth={1.8} />
                        </button>

                        {openMenu === learner.id && (
                          <div className="learner-row-menu">
                            <button
                              type="button"
                              onClick={() => handleViewLearner(learner)}
                            >
                              <LuEye size={13} strokeWidth={1.8} />

                              <span>View Performance</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSearchValue(learner.name);
                                setOpenMenu(null);
                                setCurrentPage(1);
                              }}
                            >
                              <LuSearch size={13} strokeWidth={1.8} />

                              <span>Filter This Learner</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* =================================================
            GRID VIEW
        ================================================= */}

        {viewMode === "grid" && (
          <div className="learner-performance-grid">
            {visibleLearners.map((learner) => (
              <article
                className={`learner-performance-card learner-card-${learner.theme}`}
                key={learner.id}
              >
                <div className="learner-card-top">
                  <div className="learner-card-profile">
                    <div
                      className={`learner-avatar learner-avatar-${learner.theme}`}
                    >
                      {learner.avatar}
                    </div>

                    <div>
                      <strong>{learner.name}</strong>

                      <span>#{learner.learnerId}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="learner-card-menu-button"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === `grid-${learner.id}`
                          ? null
                          : `grid-${learner.id}`,
                      )
                    }
                    aria-label={`Actions for ${learner.name}`}
                  >
                    <LuEllipsis size={16} strokeWidth={1.8} />
                  </button>

                  {openMenu === `grid-${learner.id}` && (
                    <div className="learner-grid-menu">
                      <button
                        type="button"
                        onClick={() => handleViewLearner(learner)}
                      >
                        <LuEye size={13} strokeWidth={1.8} />
                        View Performance
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSearchValue(learner.name);

                          setOpenMenu(null);
                          setCurrentPage(1);
                        }}
                      >
                        <LuSearch size={13} strokeWidth={1.8} />
                        Filter Learner
                      </button>
                    </div>
                  )}
                </div>

                <div className="learner-card-course-row">
                  <span
                    className={`learner-card-course ${getCourseClass(
                      learner.course,
                    )}`}
                  >
                    {learner.course}
                  </span>

                  <span
                    className={`learner-batch-badge batch-${learner.theme}`}
                  >
                    {learner.batch}
                  </span>
                </div>

                <div className="learner-card-score">
                  <div>
                    <span>Average score</span>

                    <strong>{learner.score}%</strong>
                  </div>

                  {renderScore(learner.score)}
                </div>

                <div className="learner-card-metric">
                  <div className="learner-card-metric-top">
                    <span>Completion</span>

                    <strong>{learner.completion}%</strong>
                  </div>

                  {renderProgress(learner.completion, "blue")}
                </div>

                <div className="learner-card-metric">
                  <div className="learner-card-metric-top">
                    <span>Assignments</span>

                    <strong>
                      {learner.assignmentsCompleted}/{learner.assignmentsTotal}
                    </strong>
                  </div>

                  <div className="learner-assignment-bar">
                    <span
                      style={{
                        width: `${learner.assignments}%`,
                      }}
                      className="assignment-medium"
                    />
                  </div>
                </div>

                <div className="learner-card-footer">
                  <span
                    className={`learner-status ${getStatusClass(
                      learner.status,
                    )}`}
                  >
                    <LuCheck size={11} strokeWidth={2} />

                    {learner.status}
                  </span>

                  <span className="learner-card-active">
                    {learner.lastActive}
                  </span>
                </div>

                <button
                  type="button"
                  className="learner-card-view-button"
                  onClick={() => handleViewLearner(learner)}
                >
                  <LuEye size={13} strokeWidth={1.8} />
                  View Performance
                  <LuChevronRight size={13} strokeWidth={1.8} />
                </button>
              </article>
            ))}
          </div>
        )}

        {/* =================================================
            SELECTION BAR
        ================================================= */}

        {selectedLearners.length > 0 && (
          <div className="learner-selection-bar">
            <div>
              <span className="learner-selection-icon">
                <LuCheck size={13} strokeWidth={2} />
              </span>

              <span>
                {selectedLearners.length} learner
                {selectedLearners.length > 1 ? "s" : ""} selected
              </span>
            </div>

            <button type="button" onClick={clearSelection}>
              <LuX size={12} strokeWidth={1.9} />
              Clear
            </button>
          </div>
        )}

        {/* =================================================
            FOOTER / PAGINATION
        ================================================= */}

        <div className="learner-performance-footer">
          <div className="learner-footer-summary">
            Showing <strong>{startIndex + 1}</strong> to{" "}
            <strong>{endIndex}</strong> of{" "}
            <strong>{sortedLearners.length}</strong> learners
          </div>

          <div className="learner-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((current) => Math.max(current - 1, 1))
              }
              aria-label="Previous page"
            >
              <LuChevronLeft size={14} strokeWidth={1.8} />
            </button>

            {Array.from(
              {
                length: Math.min(totalPages, 5),
              },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((current) => Math.min(current + 1, totalPages))
              }
              aria-label="Next page"
            >
              <LuChevronRight size={14} strokeWidth={1.8} />
            </button>
          </div>

          <div className="learner-rows-wrapper">
            <span>Rows per page</span>

            <button
              type="button"
              className="learner-rows-button"
              onClick={() => setOpenRowsMenu((current) => !current)}
              aria-expanded={openRowsMenu}
            >
              <span>{rowsPerPage}</span>

              <LuChevronDown size={13} strokeWidth={1.8} />
            </button>

            {openRowsMenu && (
              <div className="learner-rows-menu">
                {ROWS_PER_PAGE_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={rowsPerPage === option ? "selected" : ""}
                    onClick={() => handleRowsPerPage(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnerPerformance;
