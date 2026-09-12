import React, { useEffect, useState } from "react";

import { LuCheck, LuCircleAlert, LuX } from "react-icons/lu";

/* =========================================================
   ATTENDANCE COMPONENTS
========================================================= */

import AttendanceHeader from "../../../Components/Trainer/TrainerAttendance/AttendanceHeader/AttendanceHeader";

import AttendanceStats from "../../../Components/Trainer/TrainerAttendance/AttendanceStats/AttendanceStats";

import AttendanceFilters from "../../../Components/Trainer/TrainerAttendance/AttendanceFilters/AttendanceFilters";

import AttendanceList from "../../../Components/Trainer/TrainerAttendance/AttendanceList/AttendanceList";

/* =========================================================
   PAGE CSS
========================================================= */

import "./TrainerAttendance.css";

/* =========================================================
   TRAINER ATTENDANCE PAGE
========================================================= */

const TrainerAttendance = () => {
  /* ======================================================
     FILTER STATE
  ====================================================== */

  const [searchValue, setSearchValue] = useState("");

  const [course, setCourse] = useState("All Courses");

  const [batch, setBatch] = useState("All Batches");

  const [status, setStatus] = useState("All Status");

  const [sortBy, setSortBy] = useState("Learner Name");

  /* ======================================================
     ATTENDANCE MESSAGE
  ====================================================== */

  const [attendanceMessage, setAttendanceMessage] = useState("");

  const [messageType, setMessageType] = useState("success");

  /* ======================================================
     AUTO HIDE MESSAGE
  ====================================================== */

  useEffect(() => {
    if (!attendanceMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setAttendanceMessage("");
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [attendanceMessage]);

  /* ======================================================
     MARK ATTENDANCE
  ====================================================== */

  const handleMarkAttendance = ({ date }) => {
    setMessageType("success");

    setAttendanceMessage(`Attendance workspace opened for ${date}.`);
  };

  /* ======================================================
     EXPORT
  ====================================================== */

  const handleExport = ({ date }) => {
    setMessageType("success");

    setAttendanceMessage(`Attendance report exported for ${date}.`);
  };

  /* ======================================================
     ATTENDANCE CHANGE
  ====================================================== */

  const handleAttendanceChange = ({ learner, status: newStatus }) => {
    setMessageType("success");

    setAttendanceMessage(`${learner.name}'s attendance marked ${newStatus}.`);
  };

  /* ======================================================
     VIEW LEARNER
  ====================================================== */

  const handleViewLearner = (learner) => {
    setMessageType("success");

    setAttendanceMessage(`Opening attendance details for ${learner.name}.`);
  };

  /* ======================================================
     RESET FILTERS
  ====================================================== */

  const handleResetFilters = () => {
    setSearchValue("");
    setCourse("All Courses");
    setBatch("All Batches");
    setStatus("All Status");
    setSortBy("Learner Name");
  };

  /* ======================================================
     CLEAR SEARCH
  ====================================================== */

  const handleClearSearch = () => {
    setSearchValue("");
  };

  /* ======================================================
     DISMISS MESSAGE
  ====================================================== */

  const handleDismissMessage = () => {
    setAttendanceMessage("");
  };

  /* ======================================================
     SHARED FILTER OBJECT
     
     The same object is passed to AttendanceList.
  ====================================================== */

  const attendanceFilters = {
    searchValue,
    course,
    batch,
    status,
    sortBy,
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="trainer-attendance">
      {/* ==================================================
          PAGE BACKGROUND DECORATION
      ================================================== */}

      <div
        className="trainer-attendance-bg-orb trainer-attendance-bg-orb-one"
        aria-hidden="true"
      />

      <div
        className="trainer-attendance-bg-orb trainer-attendance-bg-orb-two"
        aria-hidden="true"
      />

      <div
        className="trainer-attendance-bg-orb trainer-attendance-bg-orb-three"
        aria-hidden="true"
      />

      {/* ==================================================
          PAGE CONTENT
      ================================================== */}

      <div className="trainer-attendance-content">
        {/* =================================================
            ATTENDANCE HEADER
        ================================================= */}

        <AttendanceHeader
          onMarkAttendance={handleMarkAttendance}
          onExport={handleExport}
        />

        {/* =================================================
            ACTION FEEDBACK
        ================================================= */}

        {attendanceMessage && (
          <div
            className={`attendance-action-feedback ${
              messageType === "error" ? "is-error" : "is-success"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="attendance-feedback-icon">
              {messageType === "error" ? (
                <LuCircleAlert size={15} strokeWidth={1.8} />
              ) : (
                <LuCheck size={15} strokeWidth={2} />
              )}
            </div>

            <span>{attendanceMessage}</span>

            <button
              type="button"
              onClick={handleDismissMessage}
              aria-label="Dismiss message"
            >
              <LuX size={14} strokeWidth={1.9} />
            </button>
          </div>
        )}

        {/* =================================================
            ATTENDANCE STATS
        ================================================= */}

        <AttendanceStats />

        {/* =================================================
            ATTENDANCE FILTERS
        ================================================= */}

        <AttendanceFilters
          searchValue={searchValue}
          course={course}
          batch={batch}
          status={status}
          sortBy={sortBy}
          onSearchChange={setSearchValue}
          onCourseChange={setCourse}
          onBatchChange={setBatch}
          onStatusChange={setStatus}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          onClearSearch={handleClearSearch}
        />

        {/* =================================================
            ATTENDANCE LIST

            Receives exactly the same filter state.
        ================================================= */}

        <AttendanceList
          filters={attendanceFilters}
          onViewLearner={handleViewLearner}
          onAttendanceChange={handleAttendanceChange}
        />
      </div>
    </div>
  );
};

export default TrainerAttendance;
