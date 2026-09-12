import React, { useState } from "react";

import {
  LuCalendarDays,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuClock3,
  LuVideo,
  LuMapPin,
  LuUsersRound,
  LuArrowUpRight,
  LuPalette,
  LuDatabase,
  LuBookOpen,
  LuChartNoAxesCombined,
} from "react-icons/lu";

import "./UpcomingSessions.css";

// =====================================================
// SESSION DATA
// =====================================================

const sessions = [
  {
    id: 1,
    title: "UI/UX Design Fundamentals",
    date: "Mar 11, 2025",
    time: "02:00 PM – 03:30 PM",
    type: "Online",
    icon: LuPalette,
    theme: "purple",
  },
  {
    id: 2,
    title: "Database Design",
    date: "Mar 12, 2025",
    time: "10:00 AM – 11:30 AM",
    type: "On Campus",
    icon: LuDatabase,
    theme: "green",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    date: "Mar 13, 2025",
    time: "01:00 PM – 02:30 PM",
    type: "Online",
    icon: LuBookOpen,
    theme: "orange",
  },
  {
    id: 4,
    title: "Project Review & Feedback",
    date: "Mar 14, 2025",
    time: "11:00 AM – 12:30 PM",
    type: "On Campus",
    icon: LuChartNoAxesCombined,
    theme: "rose",
  },
];

// =====================================================
// CALENDAR DATA
// =====================================================

const calendarDays = [
  { day: 23, muted: true },
  { day: 24, muted: true },
  { day: 25, muted: true },
  { day: 26, muted: true },
  { day: 27, muted: true },
  { day: 28, muted: true },
  { day: 1 },

  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },

  { day: 9 },
  { day: 10, active: true },
  { day: 11, event: "blue" },
  { day: 12, event: "green" },
  { day: 13, event: "orange" },
  { day: 14, event: "red" },
  { day: 15 },

  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },

  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
];

// =====================================================
// UPCOMING SESSIONS
// =====================================================

const UpcomingSessions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");
  const [calendarMonth, setCalendarMonth] = useState("March 2025");

  const handlePreviousMonth = () => {
    setCalendarMonth("February 2025");
  };

  const handleNextMonth = () => {
    setCalendarMonth("April 2025");
  };

  return (
    <section className="trainer-upcoming-sessions">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="upcoming-sessions-header">
        <div className="upcoming-sessions-heading">
          <div className="upcoming-sessions-title-icon">
            <LuCalendarDays />
          </div>

          <div className="upcoming-sessions-heading-text">
            <h2>Upcoming Sessions</h2>

            <p>Your next classes and training sessions</p>
          </div>
        </div>

        {/* PERIOD SELECTOR */}

        <button
          type="button"
          className="upcoming-period-button"
          onClick={() =>
            setSelectedPeriod(
              selectedPeriod === "This Week" ? "Next Week" : "This Week",
            )
          }
          aria-label="Change session period"
        >
          <LuCalendarDays />

          <span>{selectedPeriod}</span>

          <LuChevronDown />
        </button>
      </div>

      {/* =================================================
          MAIN CONTENT GRID
      ================================================= */}

      <div className="upcoming-sessions-grid">
        {/* =================================================
            NEXT SESSION - DARK NAVY
        ================================================= */}

        <article className="next-session-card">
          <div className="next-session-glow"></div>

          <div className="next-session-header">
            <div>
              <span className="next-session-label">Next Session</span>

              <div className="next-session-time">
                <span className="session-live-dot"></span>
                <span>In 2 hours</span>
              </div>
            </div>

            <button
              type="button"
              className="next-session-arrow"
              aria-label="Open next session"
            >
              <LuChevronRight />
            </button>
          </div>

          {/* SESSION INFORMATION */}

          <div className="next-session-course">
            <div className="next-session-course-icon">
              <LuBookOpen />
            </div>

            <div className="next-session-course-info">
              <h3>React Development</h3>

              <p>Building Interactive UIs</p>
            </div>
          </div>

          <div className="next-session-divider"></div>

          {/* DETAILS */}

          <div className="next-session-details">
            <div className="next-session-detail">
              <LuCalendarDays />

              <span>Today, Mar 10</span>

              <strong>10:00 AM – 11:30 AM</strong>
            </div>

            <div className="next-session-detail">
              <LuVideo />

              <span>Online Session</span>

              <strong>Google Meet</strong>
            </div>

            <div className="next-session-detail">
              <LuUsersRound />

              <span>24 Learners</span>

              <strong>Enrolled</strong>
            </div>
          </div>

          {/* JOIN BUTTON */}

          <button type="button" className="join-session-button">
            <span>Join Session</span>

            <LuArrowUpRight />
          </button>
        </article>

        {/* =================================================
            SESSION LIST
        ================================================= */}

        <article className="upcoming-list-card">
          <div className="upcoming-list-header">
            <div>
              <h3>Upcoming Sessions</h3>

              <p>Scheduled training activities</p>
            </div>

            <button type="button" className="view-all-sessions">
              <span>View All</span>
              <LuArrowUpRight />
            </button>
          </div>

          <div className="session-list">
            {sessions.map((session) => {
              const SessionIcon = session.icon;

              return (
                <div className="session-item" key={session.id}>
                  {/* SESSION ICON */}

                  <div
                    className={`session-item-icon session-item-${session.theme}`}
                  >
                    <SessionIcon />
                  </div>

                  {/* SESSION CONTENT */}

                  <div className="session-item-content">
                    <h4>{session.title}</h4>

                    <div className="session-item-meta">
                      <span>
                        <LuCalendarDays />
                        {session.date}
                      </span>

                      <span>
                        <LuClock3 />
                        {session.time}
                      </span>
                    </div>
                  </div>

                  {/* SESSION TYPE */}

                  <span
                    className={`session-type session-type-${session.theme}`}
                  >
                    {session.type === "Online" ? <LuVideo /> : <LuMapPin />}

                    {session.type}
                  </span>

                  {/* ARROW */}

                  <button
                    type="button"
                    className="session-item-arrow"
                    aria-label={`Open ${session.title}`}
                  >
                    <LuChevronRight />
                  </button>
                </div>
              );
            })}
          </div>
        </article>

        {/* =================================================
            CALENDAR + QUICK ACTION
        ================================================= */}

        <div className="upcoming-right-column">
          {/* =================================================
              CALENDAR
          ================================================= */}

          <article className="session-calendar-card">
            <div className="calendar-header">
              <button
                type="button"
                className="calendar-nav-button"
                onClick={handlePreviousMonth}
                aria-label="Previous month"
              >
                <LuChevronLeft />
              </button>

              <h3>{calendarMonth}</h3>

              <button
                type="button"
                className="calendar-nav-button"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                <LuChevronRight />
              </button>
            </div>

            <div className="calendar-weekdays">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="calendar-grid">
              {calendarDays.map((item, index) => (
                <button
                  type="button"
                  key={`${item.day}-${index}`}
                  className={`
                    calendar-day
                    ${item.muted ? "calendar-day-muted" : ""}
                    ${item.active ? "calendar-day-active" : ""}
                    ${item.event ? `calendar-event-${item.event}` : ""}
                  `}
                  aria-label={`March ${item.day}`}
                >
                  <span>{item.day}</span>

                  {item.event && <i className="calendar-event-dot"></i>}
                </button>
              ))}
            </div>
          </article>

          {/* =================================================
              SCHEDULE SESSION
          ================================================= */}

          <button type="button" className="schedule-session-card">
            <div className="schedule-session-icon">
              <LuCalendarDays />
            </div>

            <div className="schedule-session-content">
              <h3>Schedule a Session</h3>

              <p>Plan and create new training sessions for your learners.</p>
            </div>

            <LuChevronRight className="schedule-session-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSessions;
