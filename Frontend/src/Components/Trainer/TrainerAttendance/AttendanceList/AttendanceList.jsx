import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  LuCalendar,
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuChartColumn,
  LuCircleCheck,
  LuCircleX,
  LuEllipsis,
  LuEye,
  LuList,
  LuUsersRound,
  LuX,
} from "react-icons/lu";

import "./AttendanceList.css";

/* =========================================================
   ATTENDANCE DATA
========================================================= */

export const attendanceLearners = [
  {
    id: 1,
    name: "Rahul Sharma",
    learnerId: "TRN2025001",
    course: "React for Beginners",
    batch: "Batch A - 2025",
    today: "Present",
    attendance: 92,
    present: 18,
    absent: 1,
    late: 1,
    lastActive: "Apr 26, 2025",
    avatar: "RS",
    theme: "blue",
  },

  {
    id: 2,
    name: "Priya Mehta",
    learnerId: "TRN2025002",
    course: "UI/UX Design Fundamentals",
    batch: "Batch B - 2025",
    today: "Absent",
    attendance: 78,
    present: 15,
    absent: 4,
    late: 2,
    lastActive: "Apr 25, 2025",
    avatar: "PM",
    theme: "rose",
  },

  {
    id: 3,
    name: "Aman Verma",
    learnerId: "TRN2025003",
    course: "Python for Data Science",
    batch: "Batch A - 2025",
    today: "Present",
    attendance: 88,
    present: 17,
    absent: 2,
    late: 1,
    lastActive: "Apr 26, 2025",
    avatar: "AV",
    theme: "mint",
  },

  {
    id: 4,
    name: "Sneha Patel",
    learnerId: "TRN2025004",
    course: "Cloud Computing Basics",
    batch: "Batch C - 2025",
    today: "Late",
    attendance: 81,
    present: 14,
    absent: 3,
    late: 3,
    lastActive: "Apr 26, 2025",
    avatar: "SP",
    theme: "peach",
  },

  {
    id: 5,
    name: "Vikram Singh",
    learnerId: "TRN2025005",
    course: "Node.js Backend Development",
    batch: "Batch B - 2025",
    today: "Present",
    attendance: 95,
    present: 19,
    absent: 1,
    late: 0,
    lastActive: "Apr 26, 2025",
    avatar: "VS",
    theme: "navy",
  },

  {
    id: 6,
    name: "Ananya Gupta",
    learnerId: "TRN2025006",
    course: "AI for Everyone",
    batch: "Batch A - 2025",
    today: "Absent",
    attendance: 76,
    present: 13,
    absent: 5,
    late: 2,
    lastActive: "Apr 24, 2025",
    avatar: "AG",
    theme: "lavender",
  },

  {
    id: 7,
    name: "Karan Malhotra",
    learnerId: "TRN2025007",
    course: "React for Beginners",
    batch: "Batch C - 2025",
    today: "Present",
    attendance: 90,
    present: 18,
    absent: 2,
    late: 0,
    lastActive: "Apr 26, 2025",
    avatar: "KM",
    theme: "sky",
  },

  {
    id: 8,
    name: "Isha Reddy",
    learnerId: "TRN2025008",
    course: "UI/UX Design Fundamentals",
    batch: "Batch B - 2025",
    today: "Present",
    attendance: 87,
    present: 16,
    absent: 2,
    late: 2,
    lastActive: "Apr 26, 2025",
    avatar: "IR",
    theme: "pink",
  },

  {
    id: 9,
    name: "Aditya Kumar",
    learnerId: "TRN2025009",
    course: "Python for Data Science",
    batch: "Batch A - 2025",
    today: "Late",
    attendance: 82,
    present: 15,
    absent: 3,
    late: 2,
    lastActive: "Apr 25, 2025",
    avatar: "AK",
    theme: "violet",
  },

  {
    id: 10,
    name: "Neha Joshi",
    learnerId: "TRN2025010",
    course: "Cloud Computing Basics",
    batch: "Batch C - 2025",
    today: "Present",
    attendance: 89,
    present: 17,
    absent: 2,
    late: 1,
    lastActive: "Apr 25, 2025",
    avatar: "NJ",
    theme: "peach",
  },

  {
    id: 11,
    name: "Rohan Desai",
    learnerId: "TRN2025011",
    course: "AI for Everyone",
    batch: "Batch A - 2025",
    today: "Present",
    attendance: 93,
    present: 18,
    absent: 1,
    late: 1,
    lastActive: "Apr 26, 2025",
    avatar: "RD",
    theme: "blue",
  },

  {
    id: 12,
    name: "Meera Shah",
    learnerId: "TRN2025012",
    course: "React for Beginners",
    batch: "Batch B - 2025",
    today: "Excused",
    attendance: 85,
    present: 16,
    absent: 2,
    late: 1,
    lastActive: "Apr 23, 2025",
    avatar: "MS",
    theme: "lavender",
  },
];

/* =========================================================
   ATTENDANCE LIST
========================================================= */

const AttendanceList = ({
  filters = {},

  /* VIEW MODE */
  viewMode = "table",
  onViewChange,

  onViewLearner,
  onAttendanceChange,
}) => {
  /* ======================================================
     FILTER VALUES
  ====================================================== */

  const {
    searchValue = "",
    course = "All Courses",
    batch = "All Batches",
    status = "All Status",
    sortBy = "Learner Name",
  } = filters;

  /* ======================================================
     LOCAL STATE
  ====================================================== */

  const [selectedLearners, setSelectedLearners] = useState([]);

  const [openMenu, setOpenMenu] = useState(null);

  const [openRowsDropdown, setOpenRowsDropdown] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  /* ======================================================
     REF
  ====================================================== */

  const listRef = useRef(null);

  /* ======================================================
     FILTER + SORT
  ====================================================== */

  const filteredLearners = useMemo(() => {
    let result = [...attendanceLearners];

    const search = searchValue.trim().toLowerCase();

    if (search) {
      result = result.filter((learner) => {
        return (
          learner.name.toLowerCase().includes(search) ||
          learner.learnerId.toLowerCase().includes(search) ||
          learner.course.toLowerCase().includes(search) ||
          learner.batch.toLowerCase().includes(search)
        );
      });
    }

    if (course !== "All Courses") {
      result = result.filter((learner) => learner.course === course);
    }

    if (batch !== "All Batches") {
      result = result.filter((learner) => learner.batch === batch);
    }

    if (status !== "All Status" && status !== "") {
      result = result.filter((learner) => learner.today === status);
    }

    switch (sortBy) {
      case "Highest Attendance":
        result.sort((a, b) => b.attendance - a.attendance);
        break;

      case "Lowest Attendance":
        result.sort((a, b) => a.attendance - b.attendance);
        break;

      case "Recently Updated":
        result.sort((a, b) => b.id - a.id);
        break;

      case "Learner Name":
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchValue, course, batch, status, sortBy]);

  /* ======================================================
     PAGINATION
  ====================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLearners.length / rowsPerPage),
  );

  useEffect(() => {
    setCurrentPage(1);
    setSelectedLearners([]);
  }, [searchValue, course, batch, status, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const visibleLearners = filteredLearners.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  /* ======================================================
     OUTSIDE CLICK
  ====================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setOpenMenu(null);
        setOpenRowsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ======================================================
     ESCAPE
  ====================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setOpenRowsDropdown(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ======================================================
     SELECT SINGLE
  ====================================================== */

  const handleSelectLearner = (learnerId) => {
    setSelectedLearners((previous) => {
      if (previous.includes(learnerId)) {
        return previous.filter((id) => id !== learnerId);
      }

      return [...previous, learnerId];
    });
  };

  /* ======================================================
     SELECT ALL
  ====================================================== */

  const allVisibleSelected =
    visibleLearners.length > 0 &&
    visibleLearners.every((learner) => selectedLearners.includes(learner.id));

  const handleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedLearners((previous) =>
        previous.filter(
          (id) => !visibleLearners.some((learner) => learner.id === id),
        ),
      );

      return;
    }

    setSelectedLearners((previous) => {
      const ids = visibleLearners.map((learner) => learner.id);

      return Array.from(new Set([...previous, ...ids]));
    });
  };

  /* ======================================================
     MENU
  ====================================================== */

  const handleMenuToggle = (learnerId) => {
    setOpenRowsDropdown(false);

    setOpenMenu((previous) => (previous === learnerId ? null : learnerId));
  };

  /* ======================================================
     VIEW LEARNER
  ====================================================== */

  const handleViewLearner = (learner) => {
    setOpenMenu(null);

    if (onViewLearner) {
      onViewLearner(learner);
      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-view-learner", {
        detail: {
          learner,
        },
      }),
    );
  };

  /* ======================================================
     ATTENDANCE STATUS
  ====================================================== */

  const handleAttendanceChange = (learner, newStatus) => {
    setOpenMenu(null);

    onAttendanceChange?.({
      learner,
      status: newStatus,
    });

    window.dispatchEvent(
      new CustomEvent("trainer-attendance-change", {
        detail: {
          learner,
          status: newStatus,
        },
      }),
    );
  };

  /* ======================================================
     VIEW MODE
  ====================================================== */

  const handleTableView = () => {
    setOpenMenu(null);
    onViewChange?.("table");
  };

  const handleGridView = () => {
    setOpenMenu(null);
    onViewChange?.("grid");
  };

  /* ======================================================
     ROWS PER PAGE
  ====================================================== */

  const handleRowsChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
    setOpenRowsDropdown(false);
  };

  /* ======================================================
     PAGE CHANGE
  ====================================================== */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
    setOpenMenu(null);
    setOpenRowsDropdown(false);
  };

  /* ======================================================
     STATUS CLASS
  ====================================================== */

  const getStatusClass = (learnerStatus) => {
    switch (learnerStatus) {
      case "Present":
        return "present";

      case "Absent":
        return "absent";

      case "Late":
        return "late";

      case "Excused":
        return "excused";

      default:
        return "unknown";
    }
  };

  /* ======================================================
     ATTENDANCE CLASS
  ====================================================== */

  const getAttendanceClass = (percentage) => {
    if (percentage >= 90) {
      return "excellent";
    }

    if (percentage >= 80) {
      return "good";
    }

    return "low";
  };

  /* ======================================================
     PAGE NUMBERS
  ====================================================== */

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        {
          length: totalPages,
        },
        (_, index) => index + 1,
      ).map((page) => (
        <button
          type="button"
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ));
    }

    return (
      <>
        {[1, 2, 3].map((page) => (
          <button
            type="button"
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <span className="attendance-page-dots">...</span>

        <button
          type="button"
          className={currentPage === totalPages ? "active" : ""}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      </>
    );
  };

  /* ======================================================
     EMPTY STATE
  ====================================================== */

  if (filteredLearners.length === 0) {
    return (
      <section className="attendance-list" ref={listRef}>
        <div className="attendance-list-empty">
          <div className="attendance-empty-icon">
            <LuUsersRound size={24} strokeWidth={1.6} />
          </div>

          <h3>No learners found</h3>

          <p>Try changing your attendance filters or search value.</p>
        </div>
      </section>
    );
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <section className="attendance-list" ref={listRef}>
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="attendance-list-header">
        <div className="attendance-list-title-group">
          <div className="attendance-list-title-icon">
            <LuUsersRound size={18} strokeWidth={1.7} />
          </div>

          <div>
            <div className="attendance-list-title-row">
              <h2>Attendance List</h2>

              <span>{filteredLearners.length} Learners</span>
            </div>

            <p>View and manage learner attendance records.</p>
          </div>
        </div>

        {/* =================================================
            HEADER RIGHT
        ================================================= */}

        <div className="attendance-list-header-right">
          <span className="attendance-showing">
            Showing <strong>{startIndex + 1}</strong>–
            <strong>
              {Math.min(
                startIndex + visibleLearners.length,
                filteredLearners.length,
              )}
            </strong>{" "}
            of <strong>{filteredLearners.length}</strong> learners
          </span>

          <div className="attendance-header-arrows">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              <LuChevronLeft size={15} strokeWidth={1.9} />
            </button>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next page"
            >
              <LuChevronRight size={15} strokeWidth={1.9} />
            </button>
          </div>

          {/* =================================================
              VIEW SWITCHER
          ================================================= */}

          <div className="attendance-view-indicator">
            <span>View</span>

            <button
              type="button"
              className={viewMode === "table" ? "active" : ""}
              onClick={handleTableView}
              aria-label="Table view"
              aria-pressed={viewMode === "table"}
            >
              <LuList size={15} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className={viewMode === "grid" ? "active" : ""}
              onClick={handleGridView}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <LuChartColumn size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================
          TABLE / GRID VIEW
      ================================================== */}

      {viewMode === "table" ? (
        /* ==================================================
           TABLE VIEW
        ================================================== */

        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th className="attendance-checkbox-column">
                  <button
                    type="button"
                    className={`attendance-checkbox ${
                      allVisibleSelected ? "checked" : ""
                    }`}
                    onClick={handleSelectAll}
                    aria-label={
                      allVisibleSelected
                        ? "Deselect all learners"
                        : "Select all learners"
                    }
                  >
                    {allVisibleSelected && (
                      <LuCheck size={12} strokeWidth={2.2} />
                    )}
                  </button>
                </th>

                <th>#</th>

                <th>Learner</th>

                <th>Course</th>

                <th>Batch</th>

                <th>Today</th>

                <th>Attendance %</th>

                <th>
                  <span className="attendance-month-heading">This Month</span>
                </th>

                <th>Last Active</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleLearners.map((learner, learnerIndex) => {
                const isSelected = selectedLearners.includes(learner.id);

                const statusClass = getStatusClass(learner.today);

                const attendanceClass = getAttendanceClass(learner.attendance);

                return (
                  <tr
                    key={learner.id}
                    className={`attendance-table-row ${
                      isSelected ? "selected-row" : ""
                    } ${learner.theme === "navy" ? "navy-row" : ""}`}
                  >
                    {/* =================================
                          CHECKBOX
                    ================================= */}

                    <td>
                      <button
                        type="button"
                        className={`attendance-checkbox ${
                          isSelected ? "checked" : ""
                        }`}
                        onClick={() => handleSelectLearner(learner.id)}
                        aria-label={`Select ${learner.name}`}
                      >
                        {isSelected && <LuCheck size={12} strokeWidth={2.2} />}
                      </button>
                    </td>

                    {/* =================================
                          NUMBER
                    ================================= */}

                    <td>
                      <span className="attendance-row-number">
                        {startIndex + learnerIndex + 1}
                      </span>
                    </td>

                    {/* =================================
                          LEARNER
                    ================================= */}

                    <td>
                      <div className="attendance-learner">
                        <div
                          className={`attendance-avatar attendance-avatar-${learner.theme}`}
                        >
                          {learner.avatar}
                        </div>

                        <div className="attendance-learner-info">
                          <strong>{learner.name}</strong>

                          <span>{learner.learnerId}</span>
                        </div>
                      </div>
                    </td>

                    {/* =================================
                          COURSE
                    ================================= */}

                    <td>
                      <div className="attendance-course">
                        <div
                          className={`attendance-course-icon attendance-course-${learner.theme}`}
                        >
                          {learner.course.toLowerCase().includes("react")
                            ? "R"
                            : learner.course.toLowerCase().includes("python")
                              ? "P"
                              : learner.course.toLowerCase().includes("ui")
                                ? "U"
                                : learner.course.toLowerCase().includes("cloud")
                                  ? "C"
                                  : learner.course
                                        .toLowerCase()
                                        .includes("node")
                                    ? "N"
                                    : "A"}
                        </div>

                        <span>
                          {learner.course
                            .replace(" Fundamentals", "")
                            .replace(" Development", " Development")}
                        </span>
                      </div>
                    </td>

                    {/* =================================
                          BATCH
                    ================================= */}

                    <td>
                      <span className="attendance-batch">{learner.batch}</span>
                    </td>

                    {/* =================================
                          TODAY STATUS
                    ================================= */}

                    <td>
                      <span
                        className={`attendance-today-status ${statusClass}`}
                      >
                        {learner.today === "Present" ? (
                          <LuCircleCheck size={13} strokeWidth={1.9} />
                        ) : learner.today === "Absent" ? (
                          <LuCircleX size={13} strokeWidth={1.9} />
                        ) : (
                          <LuCalendar size={13} strokeWidth={1.8} />
                        )}

                        <span>{learner.today}</span>
                      </span>
                    </td>

                    {/* =================================
                          ATTENDANCE
                    ================================= */}

                    <td>
                      <div className="attendance-percentage">
                        <div className="attendance-percentage-top">
                          <span>{learner.attendance}%</span>
                        </div>

                        <div className="attendance-progress">
                          <span
                            className={`attendance-progress-value ${attendanceClass}`}
                            style={{
                              width: `${learner.attendance}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* =================================
                          MONTHLY
                    ================================= */}

                    <td>
                      <div className="attendance-month-stats">
                        <span className="month-present">
                          P {learner.present}
                        </span>

                        <span className="month-absent">A {learner.absent}</span>

                        <span className="month-late">L {learner.late}</span>
                      </div>
                    </td>

                    {/* =================================
                          LAST ACTIVE
                    ================================= */}

                    <td>
                      <div className="attendance-last-active">
                        <LuCalendar size={14} strokeWidth={1.7} />

                        <span>{learner.lastActive}</span>
                      </div>
                    </td>

                    {/* =================================
                          ACTIONS
                    ================================= */}

                    <td>
                      <div className="attendance-actions">
                        <button
                          type="button"
                          onClick={() => handleViewLearner(learner)}
                          aria-label={`View ${learner.name}`}
                          title="View learner"
                        >
                          <LuEye size={14} strokeWidth={1.8} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleAttendanceChange(
                              learner,
                              learner.today === "Present"
                                ? "Absent"
                                : "Present",
                            )
                          }
                          aria-label={`Change attendance for ${learner.name}`}
                          title="Change attendance"
                        >
                          {learner.today === "Present" ? (
                            <LuCircleX size={14} strokeWidth={1.8} />
                          ) : (
                            <LuCircleCheck size={14} strokeWidth={1.8} />
                          )}
                        </button>

                        <div className="attendance-action-menu-wrapper">
                          <button
                            type="button"
                            className={openMenu === learner.id ? "active" : ""}
                            onClick={() => handleMenuToggle(learner.id)}
                            aria-label={`More actions for ${learner.name}`}
                            aria-expanded={openMenu === learner.id}
                          >
                            <LuEllipsis size={15} strokeWidth={1.9} />
                          </button>

                          {openMenu === learner.id && (
                            <div className="attendance-row-menu">
                              <button
                                type="button"
                                onClick={() => handleViewLearner(learner)}
                              >
                                <LuEye size={13} strokeWidth={1.8} />

                                <span>View Learner</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAttendanceChange(learner, "Present")
                                }
                              >
                                <LuCircleCheck size={13} strokeWidth={1.8} />

                                <span>Mark Present</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleAttendanceChange(learner, "Absent")
                                }
                              >
                                <LuCircleX size={13} strokeWidth={1.8} />

                                <span>Mark Absent</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* ==================================================
           GRID VIEW
        ================================================== */

        <div className="attendance-grid-wrapper">
          {visibleLearners.map((learner) => {
            const statusClass = getStatusClass(learner.today);

            const attendanceClass = getAttendanceClass(learner.attendance);

            return (
              <article
                key={learner.id}
                className={`attendance-grid-card attendance-grid-${learner.theme}`}
              >
                {/* ==========================================
                    GRID CARD HEADER
                ========================================== */}

                <div className="attendance-grid-top">
                  <div className="attendance-grid-profile">
                    <div
                      className={`attendance-avatar attendance-avatar-${learner.theme}`}
                    >
                      {learner.avatar}
                    </div>

                    <div className="attendance-grid-profile-info">
                      <h4>{learner.name}</h4>

                      <span>{learner.learnerId}</span>
                    </div>
                  </div>

                  <div className="attendance-grid-menu-wrapper">
                    <button
                      type="button"
                      className={
                        openMenu === learner.id
                          ? "attendance-grid-menu active"
                          : "attendance-grid-menu"
                      }
                      onClick={() => handleMenuToggle(learner.id)}
                      aria-label={`More actions for ${learner.name}`}
                      aria-expanded={openMenu === learner.id}
                    >
                      <LuEllipsis size={15} strokeWidth={1.9} />
                    </button>

                    {openMenu === learner.id && (
                      <div className="attendance-row-menu attendance-grid-row-menu">
                        <button
                          type="button"
                          onClick={() => handleViewLearner(learner)}
                        >
                          <LuEye size={13} strokeWidth={1.8} />

                          <span>View Learner</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleAttendanceChange(learner, "Present")
                          }
                        >
                          <LuCircleCheck size={13} strokeWidth={1.8} />

                          <span>Mark Present</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleAttendanceChange(learner, "Absent")
                          }
                        >
                          <LuCircleX size={13} strokeWidth={1.8} />

                          <span>Mark Absent</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ==========================================
                    STATUS + BATCH
                ========================================== */}

                <div className="attendance-grid-status-row">
                  <span className={`attendance-today-status ${statusClass}`}>
                    {learner.today === "Present" ? (
                      <LuCircleCheck size={13} strokeWidth={1.9} />
                    ) : learner.today === "Absent" ? (
                      <LuCircleX size={13} strokeWidth={1.9} />
                    ) : (
                      <LuCalendar size={13} strokeWidth={1.8} />
                    )}

                    <span>{learner.today}</span>
                  </span>

                  <span className="attendance-grid-batch">{learner.batch}</span>
                </div>

                {/* ==========================================
                    COURSE
                ========================================== */}

                <div className="attendance-grid-course">
                  <span>Course</span>

                  <strong>{learner.course}</strong>
                </div>

                {/* ==========================================
                    ATTENDANCE
                ========================================== */}

                <div className="attendance-grid-progress">
                  <div className="attendance-grid-progress-top">
                    <span>Attendance</span>

                    <strong>{learner.attendance}%</strong>
                  </div>

                  <div className="attendance-progress">
                    <span
                      className={`attendance-progress-value ${attendanceClass}`}
                      style={{
                        width: `${learner.attendance}%`,
                      }}
                    />
                  </div>
                </div>

                {/* ==========================================
                    MONTHLY STATS
                ========================================== */}

                <div className="attendance-grid-month">
                  <div className="attendance-grid-month-item present">
                    <strong>{learner.present}</strong>

                    <span>Present</span>
                  </div>

                  <div className="attendance-grid-month-item absent">
                    <strong>{learner.absent}</strong>

                    <span>Absent</span>
                  </div>

                  <div className="attendance-grid-month-item late">
                    <strong>{learner.late}</strong>

                    <span>Late</span>
                  </div>
                </div>

                {/* ==========================================
                    CARD FOOTER
                ========================================== */}

                <div className="attendance-grid-footer">
                  <div className="attendance-last-active">
                    <LuCalendar size={13} strokeWidth={1.8} />

                    <span>{learner.lastActive}</span>
                  </div>

                  <button
                    type="button"
                    className="attendance-grid-view-btn"
                    onClick={() => handleViewLearner(learner)}
                  >
                    <LuEye size={14} strokeWidth={1.8} />

                    <span>View</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ==================================================
          FOOTER
      ================================================== */}

      <div className="attendance-list-footer">
        {/* =================================================
            ROWS PER PAGE
        ================================================= */}

        <div className="attendance-rows-control">
          <span>Rows per page</span>

          <div className="attendance-rows-select">
            <button
              type="button"
              className={openRowsDropdown ? "is-open" : ""}
              onClick={() => {
                setOpenMenu(null);

                setOpenRowsDropdown((previous) => !previous);
              }}
              aria-haspopup="listbox"
              aria-expanded={openRowsDropdown}
            >
              <span>{rowsPerPage}</span>

              <LuChevronDown
                size={13}
                strokeWidth={1.8}
                className={openRowsDropdown ? "rotated" : ""}
              />
            </button>

            {openRowsDropdown && (
              <div className="attendance-rows-menu" role="listbox">
                {[5, 10, 20].map((option) => (
                  <button
                    type="button"
                    key={option}
                    role="option"
                    aria-selected={rowsPerPage === option}
                    className={rowsPerPage === option ? "selected" : ""}
                    onClick={() => handleRowsChange(option)}
                  >
                    <span>{option}</span>

                    {rowsPerPage === option && (
                      <LuCheck size={13} strokeWidth={2} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            PAGE INFORMATION
        ================================================= */}

        <span className="attendance-page-info">
          {currentPage} of {totalPages} pages
        </span>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="attendance-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
            aria-label="First page"
          >
            <LuChevronLeft size={13} strokeWidth={2} />

            <LuChevronLeft size={13} strokeWidth={2} className="double-arrow" />
          </button>

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <LuChevronLeft size={14} strokeWidth={1.9} />
          </button>

          {renderPageNumbers()}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <LuChevronRight size={14} strokeWidth={1.9} />
          </button>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
            aria-label="Last page"
          >
            <LuChevronRight size={13} strokeWidth={2} />

            <LuChevronRight
              size={13}
              strokeWidth={2}
              className="double-arrow"
            />
          </button>
        </div>
      </div>

      {/* ==================================================
          SELECTED LEARNERS BAR
      ================================================== */}

      {selectedLearners.length > 0 && (
        <div className="attendance-selected-bar">
          <div>
            <span className="attendance-selected-count">
              {selectedLearners.length}
            </span>

            <span>
              learner
              {selectedLearners.length > 1 ? "s" : ""} selected
            </span>
          </div>

          <div className="attendance-selected-actions">
            <button
              type="button"
              onClick={() => {
                visibleLearners
                  .filter((learner) => selectedLearners.includes(learner.id))
                  .forEach((learner) =>
                    handleAttendanceChange(learner, "Present"),
                  );

                setSelectedLearners([]);
              }}
            >
              <LuCircleCheck size={13} strokeWidth={1.9} />

              <span>Mark Present</span>
            </button>

            <button
              type="button"
              onClick={() => {
                visibleLearners
                  .filter((learner) => selectedLearners.includes(learner.id))
                  .forEach((learner) =>
                    handleAttendanceChange(learner, "Absent"),
                  );

                setSelectedLearners([]);
              }}
            >
              <LuCircleX size={13} strokeWidth={1.9} />

              <span>Mark Absent</span>
            </button>

            <button
              type="button"
              className="clear-selection"
              onClick={() => setSelectedLearners([])}
            >
              <LuX size={13} strokeWidth={1.9} />

              <span>Clear</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AttendanceList;
