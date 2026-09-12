import React, { useState } from "react";

import ScheduleHeader from "../../../Components/Trainer/TrainerSchedule/ScheduleHeader/ScheduleHeader";
import ScheduleStats from "../../../Components/Trainer/TrainerSchedule/ScheduleStats/ScheduleStats";
import ScheduleFilters from "../../../Components/Trainer/TrainerSchedule/ScheduleFilters/ScheduleFilters";
import ScheduleCalendar from "../../../Components/Trainer/TrainerSchedule/ScheduleCalendar/ScheduleCalendar";

import "./TrainerSchedule.css";

const TrainerSchedule = () => {
  /* =====================================================
     SCHEDULE MESSAGE
  ===================================================== */

  const [scheduleMessage, setScheduleMessage] = useState("");

  /* =====================================================
     SCHEDULE FILTERS
  ===================================================== */

  const [scheduleFilters, setScheduleFilters] = useState({
    searchValue: "",
    course: "All Courses",
    batch: "All Batches",
    sessionType: "All Types",
    status: "All Status",
    dateRange: "This Week",
  });

  /* =====================================================
     SHOW PAGE MESSAGE
     
     Small helper so all actions use the same
     message behaviour.
  ===================================================== */

  const showScheduleMessage = (message, duration = 2500) => {
    setScheduleMessage(message);

    setTimeout(() => {
      setScheduleMessage("");
    }, duration);
  };

  /* =====================================================
     CREATE SCHEDULE
  ===================================================== */

  const handleCreateSchedule = ({
    type = "training-session",
    date = null,
  } = {}) => {
    const scheduleNames = {
      "training-session": "Training Session",
      quiz: "Quiz",
      assessment: "Assessment",
    };

    const scheduleName = scheduleNames[type] || "Training Session";

    if (date) {
      showScheduleMessage(`${scheduleName} creation opened for ${date}.`, 3000);
    } else {
      showScheduleMessage(`${scheduleName} creation opened.`, 3000);
    }

    /*
      This event can later be connected to
      CreateSchedule / CreateScheduleModal.
    */

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-create", {
        detail: {
          type,
          date,
        },
      }),
    );
  };

  /* =====================================================
     GO TO TODAY
  ===================================================== */

  const handleToday = () => {
    showScheduleMessage("Schedule moved to today.");

    window.dispatchEvent(new CustomEvent("trainer-schedule-go-today"));
  };

  /* =====================================================
     CALENDAR SETTINGS
  ===================================================== */

  const handleCalendarSettings = () => {
    showScheduleMessage("Calendar settings opened.");

    window.dispatchEvent(new CustomEvent("trainer-schedule-calendar-settings"));
  };

  /* =====================================================
     STAT CARD ACTION
  ===================================================== */

  const handleScheduleStatAction = (stat) => {
    if (!stat) return;

    showScheduleMessage(`${stat} schedule details opened.`);

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-stat-action", {
        detail: {
          stat,
        },
      }),
    );
  };

  /* =====================================================
     FILTER CHANGE
     
     This runs when ScheduleFilters applies
     the selected filters.
  ===================================================== */

  const handleFiltersChange = (updatedFilters) => {
    setScheduleFilters((currentFilters) => ({
      ...currentFilters,
      ...updatedFilters,
    }));

    showScheduleMessage("Schedule filters applied.");

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-filters-change", {
        detail: updatedFilters,
      }),
    );
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const handleResetFilters = () => {
    const resetValues = {
      searchValue: "",
      course: "All Courses",
      batch: "All Batches",
      sessionType: "All Types",
      status: "All Status",
      dateRange: "This Week",
    };

    setScheduleFilters(resetValues);

    showScheduleMessage("Schedule filters reset.");

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-filters-reset", {
        detail: resetValues,
      }),
    );
  };

  /* =====================================================
     CALENDAR SCHEDULE CLICK
     
     Called when trainer clicks an existing
     schedule inside the calendar.
  ===================================================== */

  const handleScheduleClick = (schedule) => {
    if (!schedule) return;

    showScheduleMessage(`${schedule.title} opened.`);

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-session-click", {
        detail: {
          schedule,
        },
      }),
    );
  };

  /* =====================================================
     CALENDAR CREATE ACTION
     
     ScheduleCalendar sends the selected date.
     We forward it to the existing page-level
     create schedule handler.
  ===================================================== */

  const handleCalendarCreate = ({ date } = {}) => {
    handleCreateSchedule({
      type: "training-session",
      date,
    });
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="trainer-schedule-page">
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        className="trainer-schedule-bg trainer-schedule-bg-one"
        aria-hidden="true"
      />

      <div
        className="trainer-schedule-bg trainer-schedule-bg-two"
        aria-hidden="true"
      />

      <div
        className="trainer-schedule-bg trainer-schedule-bg-three"
        aria-hidden="true"
      />

      <div className="trainer-schedule-grid" aria-hidden="true" />

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main className="trainer-schedule-content">
        {/* =================================================
            SCHEDULE HEADER
        ================================================= */}

        <ScheduleHeader
          onCreateSchedule={handleCreateSchedule}
          onToday={handleToday}
          onViewCalendarSettings={handleCalendarSettings}
        />

        {/* =================================================
            SCHEDULE STATS
        ================================================= */}

        <ScheduleStats onStatAction={handleScheduleStatAction} />

        {/* =================================================
            SCHEDULE FILTERS
        ================================================= */}

        <ScheduleFilters
          filters={scheduleFilters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
        />

        {/* =================================================
            SCHEDULE CALENDAR

            The calendar receives the filters
            controlled by TrainerSchedule.

            It also sends schedule clicks and
            create actions back to this page.
        ================================================= */}

        <ScheduleCalendar />

        {/* =================================================
            PAGE MESSAGE
        ================================================= */}

        {scheduleMessage && (
          <div
            className="trainer-schedule-message"
            role="status"
            aria-live="polite"
          >
            <span className="trainer-schedule-message-dot" />

            <span>{scheduleMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default TrainerSchedule;
