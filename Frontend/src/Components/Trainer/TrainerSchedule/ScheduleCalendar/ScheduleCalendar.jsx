import React, { useMemo, useState } from "react";
import {
  LuCalendarDays,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuList,
  LuPlus,
  LuUsersRound,
  LuClock3,
  LuCheck,
  LuX,
} from "react-icons/lu";

import "./ScheduleCalendar.css";

/* =========================================================
   DEMO DATA
   ========================================================= */

const scheduleData = [
  {
    id: 1,
    title: "Web Development",
    subtitle: "Training Session",
    type: "training",
    course: "Web Development",
    batch: "Batch A",
    date: "2026-09-07",
    start: "09:00",
    end: "10:30",
    status: "scheduled",
  },
  {
    id: 2,
    title: "JavaScript Quiz",
    subtitle: "Quiz",
    type: "quiz",
    course: "Web Development",
    batch: "Batch B",
    date: "2026-09-07",
    start: "11:00",
    end: "12:00",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Database Concepts",
    subtitle: "Assessment",
    type: "assessment",
    course: "Database Management",
    batch: "Batch B",
    date: "2026-09-07",
    start: "14:00",
    end: "15:30",
    status: "completed",
  },
  {
    id: 4,
    title: "System Design",
    subtitle: "Workshop",
    type: "workshop",
    course: "Data Structures",
    batch: "Batch A",
    date: "2026-09-08",
    start: "09:30",
    end: "11:00",
    status: "completed",
  },
  {
    id: 5,
    title: "React Development",
    subtitle: "Training Session",
    type: "training",
    course: "Web Development",
    batch: "Batch A",
    date: "2026-09-08",
    start: "13:00",
    end: "14:30",
    status: "scheduled",
  },
  {
    id: 6,
    title: "HTML & CSS Quiz",
    subtitle: "Quiz",
    type: "quiz",
    course: "Web Development",
    batch: "Batch C",
    date: "2026-09-09",
    start: "11:00",
    end: "12:00",
    status: "scheduled",
  },
  {
    id: 7,
    title: "Career Guidance",
    subtitle: "Training Session",
    type: "training",
    course: "Professional Development",
    batch: "Batch A",
    date: "2026-09-09",
    start: "13:00",
    end: "14:30",
    status: "scheduled",
  },
  {
    id: 8,
    title: "System Design Workshop",
    subtitle: "Workshop",
    type: "workshop",
    course: "Data Structures",
    batch: "Batch A",
    date: "2026-09-09",
    start: "09:30",
    end: "11:00",
    status: "completed",
  },
  {
    id: 9,
    title: "React Assessment",
    subtitle: "Assessment",
    type: "assessment",
    course: "Web Development",
    batch: "Batch C",
    date: "2026-09-10",
    start: "10:00",
    end: "11:30",
    status: "scheduled",
  },
  {
    id: 10,
    title: "HTML & CSS Quiz",
    subtitle: "Quiz",
    type: "quiz",
    course: "Web Development",
    batch: "Batch C",
    date: "2026-09-10",
    start: "15:00",
    end: "16:00",
    status: "scheduled",
  },
  {
    id: 11,
    title: "Live Project",
    subtitle: "Workshop",
    type: "workshop",
    course: "Database Management",
    batch: "Batch A",
    date: "2026-09-11",
    start: "16:00",
    end: "17:30",
    status: "scheduled",
  },
  {
    id: 12,
    title: "Frontend Architecture",
    subtitle: "Training Session",
    type: "training",
    course: "Web Development",
    batch: "Batch A",
    date: "2026-09-12",
    start: "10:00",
    end: "11:30",
    status: "scheduled",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

const pad = (value) => String(value).padStart(2, "0");

const formatDateKey = (date) => {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("-");
};

const parseDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const startOfWeek = (date) => {
  const result = new Date(date);
  const day = result.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
};

const addDays = (date, amount) => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const formatTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);

  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${pad(minutes)} ${suffix}`;
};

const formatLongDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatMonthYear = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const formatWeekRange = (date) => {
  const start = startOfWeek(date);
  const end = addDays(start, 6);

  const sameMonth = start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} – ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }

  return `${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} – ${end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

/* =========================================================
   CONSTANTS
   ========================================================= */

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const miniMonthDays = [
  31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4,
];

/* =========================================================
   COMPONENT
   ========================================================= */

const ScheduleCalendar = ({
  filters = {},
  onScheduleClick,
  onCreateSchedule,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 9));

  const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 9));

  const [visibleTypes, setVisibleTypes] = useState({
    training: true,
    quiz: true,
    assessment: true,
    workshop: true,
  });

  const [statusMessage, setStatusMessage] = useState("");

  /* =====================================================
     FILTER DATA
     ===================================================== */

  const filteredSchedules = useMemo(() => {
    const search = filters.searchValue?.trim()?.toLowerCase() || "";

    return scheduleData.filter((schedule) => {
      const matchesSearch =
        !search ||
        `${schedule.title} ${schedule.subtitle} ${schedule.course} ${schedule.batch}`
          .toLowerCase()
          .includes(search);

      const matchesCourse =
        !filters.course ||
        filters.course === "All Courses" ||
        schedule.course === filters.course;

      const matchesBatch =
        !filters.batch ||
        filters.batch === "All Batches" ||
        schedule.batch === filters.batch;

      const matchesSessionType =
        !filters.sessionType ||
        filters.sessionType === "All Types" ||
        (filters.sessionType === "Training Session" &&
          schedule.type === "training") ||
        (filters.sessionType === "Quiz" && schedule.type === "quiz") ||
        (filters.sessionType === "Assessment" &&
          schedule.type === "assessment") ||
        (filters.sessionType === "Workshop" && schedule.type === "workshop");

      const matchesStatus =
        !filters.status ||
        filters.status === "All Status" ||
        schedule.status === filters.status.toLowerCase();

      const matchesVisibleType = visibleTypes[schedule.type];

      return (
        matchesSearch &&
        matchesCourse &&
        matchesBatch &&
        matchesSessionType &&
        matchesStatus &&
        matchesVisibleType
      );
    });
  }, [filters, visibleTypes]);

  /* =====================================================
     WEEK DATA
     ===================================================== */

  const weekStart = startOfWeek(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index),
  );

  /* =====================================================
     MINI MONTH NAVIGATION
     ===================================================== */

  const goMiniPrevious = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goMiniNext = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  /* =====================================================
     SELECT DATE
     ===================================================== */

  const selectDate = (date) => {
    setSelectedDate(date);
    setCurrentDate(date);
  };

  /* =====================================================
     EVENT TOGGLE
     ===================================================== */

  const toggleType = (type) => {
    setVisibleTypes((current) => ({
      ...current,
      [type]: !current[type],
    }));
  };

  /* =====================================================
     CREATE
     ===================================================== */

  const createSchedule = (date = selectedDate) => {
    const dateKey = formatDateKey(date);

    setStatusMessage(`Create schedule opened for ${formatLongDate(date)}.`);

    onCreateSchedule?.({
      date: dateKey,
      type: "training-session",
    });

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-create", {
        detail: {
          date: dateKey,
          type: "training-session",
        },
      }),
    );

    window.setTimeout(() => {
      setStatusMessage("");
    }, 2500);
  };

  /* =====================================================
     CLICK SCHEDULE
     ===================================================== */

  const openSchedule = (schedule) => {
    setStatusMessage(`${schedule.title} opened.`);

    onScheduleClick?.(schedule);

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-session-click", {
        detail: {
          schedule,
        },
      }),
    );

    window.setTimeout(() => {
      setStatusMessage("");
    }, 2000);
  };

  /* =====================================================
     EVENT POSITION
     ===================================================== */

  const getEventStyle = (schedule) => {
    const calendarStart = 8 * 60;

    const start = timeToMinutes(schedule.start);

    const end = timeToMinutes(schedule.end);

    const top = ((start - calendarStart) / 60) * 70;

    const height = ((end - start) / 60) * 70;

    return {
      top: `${top}px`,
      height: `${Math.max(height, 64)}px`,
    };
  };

  /* =====================================================
     GET DAY EVENTS
     ===================================================== */

  const getSchedulesForDate = (date) => {
    const dateKey = formatDateKey(date);

    return filteredSchedules.filter((schedule) => schedule.date === dateKey);
  };

  /* =====================================================
     ICONS
     ===================================================== */

  const renderEventIcon = (type) => {
    if (type === "quiz") {
      return <LuList size={16} strokeWidth={1.8} />;
    }

    if (type === "assessment") {
      return <LuCircleCheck size={16} strokeWidth={1.8} />;
    }

    if (type === "workshop") {
      return <LuUsersRound size={16} strokeWidth={1.8} />;
    }

    return <LuCalendarDays size={16} strokeWidth={1.8} />;
  };

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <section className="schedule-calendar">
      <div className="schedule-calendar-shell">
        {/* =================================================
            BODY
        ================================================= */}

        <div className="schedule-calendar-body">
          {/* =================================================
              LEFT SIDEBAR
          ================================================= */}

          <aside className="schedule-calendar-sidebar">
            {/* MINI MONTH */}

            <div className="schedule-mini-month">
              <div className="schedule-mini-month-header">
                <strong>{formatMonthYear(currentDate)}</strong>

                <div>
                  <button
                    type="button"
                    onClick={goMiniPrevious}
                    aria-label="Previous month"
                  >
                    <LuChevronLeft size={16} strokeWidth={1.8} />
                  </button>

                  <button
                    type="button"
                    onClick={goMiniNext}
                    aria-label="Next month"
                  >
                    <LuChevronRight size={16} strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <div className="schedule-mini-weekdays">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>

              <div className="schedule-mini-days">
                {miniMonthDays.map((day, index) => {
                  const outsideMonth = index === 0 || index >= 31;

                  const selected =
                    day === selectedDate.getDate() && !outsideMonth;

                  return (
                    <button
                      type="button"
                      key={`${day}-${index}`}
                      className={`
                          ${outsideMonth ? "outside-month" : ""}
                          ${selected ? "selected" : ""}
                        `}
                      onClick={() => {
                        if (outsideMonth) {
                          return;
                        }

                        const date = new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day,
                        );

                        selectDate(date);
                      }}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MY CALENDARS */}

            <div className="schedule-calendar-legend">
              <div className="schedule-sidebar-section-heading">
                <span>My Calendars</span>

                <button
                  type="button"
                  onClick={() => {
                    setVisibleTypes({
                      training: true,
                      quiz: true,
                      assessment: true,
                      workshop: true,
                    });
                  }}
                  aria-label="Show all calendars"
                >
                  <LuPlus size={15} strokeWidth={1.8} />
                </button>
              </div>

              <button
                type="button"
                className={
                  visibleTypes.training
                    ? "calendar-toggle active"
                    : "calendar-toggle"
                }
                onClick={() => toggleType("training")}
              >
                <span className="calendar-checkbox training">
                  {visibleTypes.training && (
                    <LuCheck size={12} strokeWidth={2.2} />
                  )}
                </span>

                <span>Training Sessions</span>
              </button>

              <button
                type="button"
                className={
                  visibleTypes.quiz
                    ? "calendar-toggle active"
                    : "calendar-toggle"
                }
                onClick={() => toggleType("quiz")}
              >
                <span className="calendar-checkbox quiz">
                  {visibleTypes.quiz && <LuCheck size={12} strokeWidth={2.2} />}
                </span>

                <span>Quizzes</span>
              </button>

              <button
                type="button"
                className={
                  visibleTypes.assessment
                    ? "calendar-toggle active"
                    : "calendar-toggle"
                }
                onClick={() => toggleType("assessment")}
              >
                <span className="calendar-checkbox assessment">
                  {visibleTypes.assessment && (
                    <LuCheck size={12} strokeWidth={2.2} />
                  )}
                </span>

                <span>Assessments</span>
              </button>

              <button
                type="button"
                className={
                  visibleTypes.workshop
                    ? "calendar-toggle active"
                    : "calendar-toggle"
                }
                onClick={() => toggleType("workshop")}
              >
                <span className="calendar-checkbox workshop">
                  {visibleTypes.workshop && (
                    <LuCheck size={12} strokeWidth={2.2} />
                  )}
                </span>

                <span>Workshops</span>
              </button>
            </div>

            {/* DARK ORGANIZATION CARD */}

            <div className="schedule-calendar-sidebar-tip">
              <div className="schedule-calendar-sidebar-tip-icon">
                <LuClock3 size={20} strokeWidth={1.7} />
              </div>

              <strong>Stay Organized</strong>

              <span>
                Plan sessions, set reminders and keep your learners on track.
              </span>

              <button
                type="button"
                onClick={() => createSchedule(selectedDate)}
              >
                Create Schedule
                <LuChevronRight size={16} strokeWidth={1.8} />
              </button>
            </div>
          </aside>

          {/* =================================================
              CENTER CALENDAR
          ================================================= */}

          <main className="schedule-calendar-main">
            {/* MAIN HEADER */}

            <div className="schedule-calendar-main-header">
              <div>
                <div className="schedule-calendar-range-row">
                  <strong>{formatWeekRange(currentDate)}</strong>

                  <span className="schedule-week-badge">This Week</span>
                </div>

                <span>{filteredSchedules.length} scheduled sessions</span>
              </div>

              <button
                type="button"
                onClick={() => createSchedule(selectedDate)}
              >
                <LuPlus size={16} strokeWidth={1.9} />

                <span>New Session</span>
              </button>
            </div>

            {/* WEEK VIEW */}

            <div className="schedule-week-view">
              {/* DAY HEADER */}

              <div className="schedule-week-header">
                <div className="schedule-time-header">GMT+5:30</div>

                {weekDays.map((date, index) => {
                  const selected =
                    formatDateKey(date) === formatDateKey(selectedDate);

                  return (
                    <button
                      type="button"
                      key={formatDateKey(date)}
                      className={`
                          schedule-day-header
                          ${selected ? "selected" : ""}
                        `}
                      onClick={() => selectDate(date)}
                    >
                      <span>{dayNames[index]}</span>

                      <strong>{date.getDate()}</strong>
                    </button>
                  );
                })}
              </div>

              {/* GRID */}

              <div className="schedule-week-grid">
                {/* TIME COLUMN */}

                <div className="schedule-time-column">
                  {timeSlots.map((time) => (
                    <div key={time} className="schedule-time-slot">
                      {formatTime(time)}
                    </div>
                  ))}
                </div>

                {/* DAY COLUMNS */}

                {weekDays.map((date) => {
                  const schedules = getSchedulesForDate(date);

                  const selected =
                    formatDateKey(date) === formatDateKey(selectedDate);

                  return (
                    <div
                      key={formatDateKey(date)}
                      className={`
                          schedule-day-column
                          ${selected ? "is-selected" : ""}
                        `}
                    >
                      {/* GRID CELLS */}

                      {timeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          className="schedule-hour-cell"
                          aria-label={`Create schedule on ${formatLongDate(
                            date,
                          )} at ${formatTime(time)}`}
                          onClick={() => {
                            selectDate(date);

                            createSchedule(date);
                          }}
                        />
                      ))}

                      {/* EVENTS */}

                      {schedules.map((schedule) => (
                        <button
                          type="button"
                          key={schedule.id}
                          className={`
                                schedule-calendar-event
                                schedule-calendar-event-${schedule.type}
                              `}
                          style={getEventStyle(schedule)}
                          onClick={(event) => {
                            event.stopPropagation();

                            openSchedule(schedule);
                          }}
                        >
                          <span className="schedule-event-icon">
                            {renderEventIcon(schedule.type)}
                          </span>

                          <span className="schedule-event-content">
                            <strong>{schedule.title}</strong>

                            <span>{schedule.subtitle}</span>

                            <small>
                              {formatTime(schedule.start)} -{" "}
                              {formatTime(schedule.end)}
                            </small>

                            <small>{schedule.batch}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </main>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <aside className="schedule-calendar-right-panel">
            {/* SELECTED DATE CARD */}

            <div className="schedule-selected-date-card">
              <div className="schedule-selected-date-art">
                <div className="schedule-art-circle one" />
                <div className="schedule-art-circle two" />
                <div className="schedule-art-circle three" />
              </div>

              <div className="schedule-selected-date-icon">
                <LuCalendarDays size={20} strokeWidth={1.7} />
              </div>

              <strong>{formatLongDate(selectedDate)}</strong>

              <span>
                {getSchedulesForDate(selectedDate).length} sessions scheduled
              </span>

              <div className="schedule-selected-date-stats">
                <div>
                  <strong>{getSchedulesForDate(selectedDate).length}</strong>

                  <span>Sessions</span>
                </div>

                <div>
                  <strong>
                    {
                      getSchedulesForDate(selectedDate).filter(
                        (item) => item.type === "quiz",
                      ).length
                    }
                  </strong>

                  <span>Quiz</span>
                </div>

                <div>
                  <strong>
                    {
                      getSchedulesForDate(selectedDate).filter(
                        (item) => item.type === "assessment",
                      ).length
                    }
                  </strong>

                  <span>Assessments</span>
                </div>
              </div>
            </div>

            {/* TODAY'S SCHEDULE */}

            <div className="schedule-day-summary">
              <div className="schedule-sidebar-section-heading">
                <span>Today's Schedule</span>

                <button
                  type="button"
                  onClick={() => {
                    const todaySessions = getSchedulesForDate(selectedDate);

                    setStatusMessage(
                      `${todaySessions.length} sessions found for ${formatLongDate(
                        selectedDate,
                      )}.`,
                    );

                    window.setTimeout(() => {
                      setStatusMessage("");
                    }, 2200);
                  }}
                >
                  View All
                </button>
              </div>

              <div className="schedule-day-session-list">
                {getSchedulesForDate(selectedDate).length > 0 ? (
                  getSchedulesForDate(selectedDate).map((schedule) => (
                    <button
                      type="button"
                      key={schedule.id}
                      className={`schedule-day-session ${schedule.type}`}
                      onClick={() => openSchedule(schedule)}
                    >
                      <i className="schedule-session-status" />

                      <span className="schedule-session-time">
                        {formatTime(schedule.start)}
                      </span>

                      <span className="schedule-session-info">
                        <strong>{schedule.title}</strong>

                        <small>
                          {schedule.batch} · {formatTime(schedule.start)}
                        </small>
                      </span>

                      <span className="schedule-session-icon">
                        {renderEventIcon(schedule.type)}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="schedule-empty-day">
                    <LuCalendarDays size={24} strokeWidth={1.5} />

                    <strong>No sessions scheduled</strong>

                    <span>Create a new session for this day.</span>

                    <button
                      type="button"
                      onClick={() => createSchedule(selectedDate)}
                    >
                      <LuPlus size={14} />
                      Create Session
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* CREATE CARD */}

            <div className="schedule-calendar-create-card">
              <div className="schedule-calendar-create-icon">
                <LuCalendarDays size={21} strokeWidth={1.7} />
              </div>

              <strong>Need to schedule something?</strong>

              <span>
                Click any time slot to create a new session, quiz or assessment.
              </span>

              <button
                type="button"
                onClick={() => createSchedule(selectedDate)}
              >
                Create Schedule
                <LuPlus size={15} strokeWidth={1.9} />
              </button>
            </div>
          </aside>
        </div>

        {/* =====================================================
            BOTTOM LEGEND
        ===================================================== */}

        <div className="schedule-calendar-bottom">
          <div className="schedule-bottom-group">
            <strong>Session Types</strong>

            <span>
              <i className="training" />
              Training Session
            </span>

            <span>
              <i className="quiz" />
              Quiz
            </span>

            <span>
              <i className="assessment" />
              Assessment
            </span>

            <span>
              <i className="workshop" />
              Workshop
            </span>
          </div>

          <div className="schedule-bottom-divider" />

          <div className="schedule-bottom-group">
            <strong>Status</strong>

            <span>
              <i className="scheduled" />
              Scheduled
            </span>

            <span>
              <i className="completed" />
              Completed
            </span>

            <span>
              <i className="cancelled" />
              Cancelled
            </span>
          </div>
        </div>

        {/* =====================================================
            STATUS MESSAGE
        ===================================================== */}

        {statusMessage && (
          <div
            className="schedule-calendar-status-message"
            role="status"
            aria-live="polite"
          >
            <LuCheck size={15} strokeWidth={2} />

            <span>{statusMessage}</span>

            <button
              type="button"
              onClick={() => setStatusMessage("")}
              aria-label="Close message"
            >
              <LuX size={13} strokeWidth={1.8} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScheduleCalendar;
