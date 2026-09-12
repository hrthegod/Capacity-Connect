import React, { useEffect, useRef, useState } from "react";

import {
  LuCalendarDays,
  LuChevronDown,
  LuCheck,
  LuDownload,
  LuGraduationCap,
  LuPlus,
  LuRefreshCw,
  LuUsersRound,
  LuBookOpen,
  LuLayers3,
} from "react-icons/lu";

import "./AttendanceHeader.css";

/* =========================================================
   ATTENDANCE HEADER
========================================================= */

const AttendanceHeader = ({ onMarkAttendance, onExport }) => {
  /* ======================================================
     LOCAL STATE
  ====================================================== */

  const [selectedDate, setSelectedDate] = useState("Apr 21, 2025");

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  const headerRef = useRef(null);

  /* ======================================================
     DATE OPTIONS
  ====================================================== */

  const dateOptions = [
    "Apr 21, 2025",
    "Apr 20, 2025",
    "Apr 19, 2025",
    "Apr 18, 2025",
  ];

  /* ======================================================
     OUTSIDE CLICK
  ====================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDateDropdownOpen(false);
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
    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        setDateDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  /* ======================================================
     DATE DROPDOWN
  ====================================================== */

  const handleDateToggle = () => {
    setDateDropdownOpen((previous) => !previous);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateDropdownOpen(false);
  };

  /* ======================================================
     TODAY
  ====================================================== */

  const handleToday = () => {
    setSelectedDate("Apr 21, 2025");
    setDateDropdownOpen(false);
  };

  /* ======================================================
     MARK ATTENDANCE
  ====================================================== */

  const handleMarkAttendance = () => {
    if (onMarkAttendance) {
      onMarkAttendance({
        date: selectedDate,
      });

      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-mark-attendance", {
        detail: {
          date: selectedDate,
        },
      }),
    );
  };

  /* ======================================================
     EXPORT ATTENDANCE
  ====================================================== */

  const handleExport = () => {
    if (onExport) {
      onExport({
        date: selectedDate,
      });

      return;
    }

    const rows = [
      ["Date", "Total Learners", "Present", "Absent", "Attendance"],
      [selectedDate, "42", "37", "5", "88.1%"],
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `attendance-${selectedDate
      .replace(/,/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase()}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <section className="attendance-header" ref={headerRef}>
      {/* ==================================================
          DECORATIVE GLASS ORBS
      ================================================== */}

      <div className="attendance-header-orb attendance-orb-one" />
      <div className="attendance-header-orb attendance-orb-two" />

      {/* ==================================================
          TOP CONTENT
      ================================================== */}

      <div className="attendance-header-top">
        {/* =================================================
            TITLE
        ================================================= */}

        <div className="attendance-header-title-group">
          <div className="attendance-header-title-icon">
            <LuCalendarDays size={21} strokeWidth={1.7} />
          </div>

          <div className="attendance-header-title">
            <div className="attendance-title-line">
              <h1>Attendance</h1>

              <span className="attendance-live-badge">
                <span className="attendance-live-dot" />
                Live
              </span>
            </div>

            <p>Track and manage learner attendance across your courses.</p>
          </div>
        </div>

        {/* =================================================
            DECORATIVE CALENDAR PANEL
        ================================================= */}

        <div className="attendance-header-visual">
          <div className="attendance-visual-glow" />

          <div className="attendance-mini-calendar">
            <div className="attendance-calendar-top">
              <span>APR</span>

              <LuCalendarDays size={15} strokeWidth={1.7} />
            </div>

            <strong>21</strong>

            <div className="attendance-calendar-checks">
              <span>
                <LuCheck size={8} strokeWidth={2.2} />
              </span>

              <span>
                <LuCheck size={8} strokeWidth={2.2} />
              </span>

              <span>
                <LuCheck size={8} strokeWidth={2.2} />
              </span>
            </div>
          </div>

          <div className="attendance-visual-message">
            <span>Daily attendance</span>
            <strong>Stay consistent.</strong>
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM ACTION AREA
      ================================================== */}

      <div className="attendance-header-bottom">
        {/* =================================================
            QUICK INFORMATION
        ================================================= */}

        <div className="attendance-header-metrics">
          {/* ===============================================
              LEARNERS
          =============================================== */}

          <div className="attendance-header-metric metric-blue">
            <div className="attendance-metric-icon">
              <LuUsersRound size={17} strokeWidth={1.7} />
            </div>

            <div className="attendance-metric-content">
              <strong>42</strong>

              <span>Learners</span>
            </div>
          </div>

          {/* ===============================================
              COURSES
          =============================================== */}

          <div className="attendance-header-metric metric-lavender">
            <div className="attendance-metric-icon">
              <LuBookOpen size={17} strokeWidth={1.7} />
            </div>

            <div className="attendance-metric-content">
              <strong>5</strong>

              <span>Courses</span>
            </div>
          </div>

          {/* ===============================================
              BATCHES
          =============================================== */}

          <div className="attendance-header-metric metric-mint">
            <div className="attendance-metric-icon">
              <LuLayers3 size={17} strokeWidth={1.7} />
            </div>

            <div className="attendance-metric-content">
              <strong>8</strong>

              <span>Batches</span>
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="attendance-header-actions">
          {/* ===============================================
              DATE SELECTOR
          =============================================== */}

          <div className="attendance-date-wrapper">
            <button
              type="button"
              className={`attendance-date-button ${
                dateDropdownOpen ? "is-open" : ""
              }`}
              onClick={handleDateToggle}
              aria-expanded={dateDropdownOpen}
              aria-haspopup="listbox"
            >
              <LuCalendarDays size={15} strokeWidth={1.8} />

              <span>{selectedDate}</span>

              <LuChevronDown
                className={dateDropdownOpen ? "is-rotated" : ""}
                size={14}
                strokeWidth={1.8}
              />
            </button>

            {dateDropdownOpen && (
              <div
                className="attendance-date-dropdown"
                role="listbox"
                aria-label="Attendance date"
              >
                {dateOptions.map((date) => (
                  <button
                    type="button"
                    key={date}
                    role="option"
                    aria-selected={selectedDate === date}
                    className={selectedDate === date ? "selected" : ""}
                    onClick={() => handleDateChange(date)}
                  >
                    <span>{date}</span>

                    {selectedDate === date && (
                      <LuCheck size={14} strokeWidth={2} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===============================================
              TODAY
          =============================================== */}

          <button
            type="button"
            className="attendance-today-button"
            onClick={handleToday}
          >
            <LuRefreshCw size={14} strokeWidth={1.8} />

            <span>Today</span>
          </button>

          {/* ===============================================
              MARK ATTENDANCE
          =============================================== */}

          <button
            type="button"
            className="attendance-mark-button"
            onClick={handleMarkAttendance}
          >
            <LuPlus size={17} strokeWidth={1.9} />

            <span>Mark Attendance</span>
          </button>

          {/* ===============================================
              EXPORT
          =============================================== */}

          <button
            type="button"
            className="attendance-export-button"
            onClick={handleExport}
          >
            <LuDownload size={15} strokeWidth={1.8} />

            <span>Export</span>

            <LuChevronDown size={13} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AttendanceHeader;
