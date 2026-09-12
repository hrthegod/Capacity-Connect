import React, { useEffect, useRef, useState } from "react";
import {
  LuBookOpen,
  LuCalendar,
  LuCalendarDays,
  LuChevronDown,
  LuChevronRight,
  LuClock3,
  LuEllipsis,
  LuGraduationCap,
  LuPlus,
  LuUsersRound,
} from "react-icons/lu";

import "./ScheduleHeader.css";

const ScheduleHeader = ({
  onCreateSchedule,
  onToday,
  onViewCalendarSettings,
}) => {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isTodayActive, setIsTodayActive] = useState(false);

  const createMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        createMenuRef.current &&
        !createMenuRef.current.contains(event.target)
      ) {
        setShowCreateMenu(false);
      }

      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowCreateMenu(false);
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleToday = () => {
    setIsTodayActive(true);
    setShowMoreMenu(false);

    onToday?.();

    window.dispatchEvent(new CustomEvent("trainer-schedule-today"));

    setTimeout(() => {
      setIsTodayActive(false);
    }, 700);
  };

  const handleCreateSchedule = () => {
    setShowCreateMenu(false);

    onCreateSchedule?.({
      type: "training-session",
    });

    window.dispatchEvent(
      new CustomEvent("trainer-create-schedule", {
        detail: {
          type: "training-session",
        },
      }),
    );
  };

  const handleCreateQuiz = () => {
    setShowCreateMenu(false);

    onCreateSchedule?.({
      type: "quiz",
    });

    window.dispatchEvent(
      new CustomEvent("trainer-create-schedule", {
        detail: {
          type: "quiz",
        },
      }),
    );
  };

  const handleCreateAssessment = () => {
    setShowCreateMenu(false);

    onCreateSchedule?.({
      type: "assessment",
    });

    window.dispatchEvent(
      new CustomEvent("trainer-create-schedule", {
        detail: {
          type: "assessment",
        },
      }),
    );
  };

  const handleCalendarSettings = () => {
    setShowMoreMenu(false);

    onViewCalendarSettings?.();

    window.dispatchEvent(new CustomEvent("trainer-calendar-settings"));
  };

  const handleViewSchedule = () => {
    setShowMoreMenu(false);

    window.dispatchEvent(new CustomEvent("trainer-view-full-schedule"));
  };

  return (
    <section className="schedule-header">
      <div className="schedule-header-shell">
        {/* Decorative glass orbs */}
        <span
          className="schedule-header-orb schedule-header-orb-one"
          aria-hidden="true"
        />
        <span
          className="schedule-header-orb schedule-header-orb-two"
          aria-hidden="true"
        />
        <span
          className="schedule-header-orb schedule-header-orb-three"
          aria-hidden="true"
        />

        {/* =========================================
            TOP / MAIN HEADER
        ========================================= */}
        <div className="schedule-header-main">
          {/* LEFT SIDE */}
          <div className="schedule-header-left">
            {/* Breadcrumb */}
            <nav className="schedule-breadcrumb" aria-label="Breadcrumb">
              <button
                type="button"
                className="schedule-breadcrumb-item schedule-breadcrumb-home"
                onClick={() => {
                  window.location.href = "/trainer";
                }}
              >
                <LuGraduationCap size={14} strokeWidth={1.8} />

                <span>Trainer Dashboard</span>
              </button>

              <LuChevronRight
                className="schedule-breadcrumb-arrow"
                size={13}
                strokeWidth={1.8}
              />

              <span className="schedule-breadcrumb-current">Schedule</span>
            </nav>

            {/* Title */}
            <div className="schedule-title-area">
              <span className="schedule-title-accent">TRAINER WORKSPACE</span>

              <h1>
                Trainer <span>Schedule</span>
              </h1>

              <p>
                Manage your upcoming training sessions, classes, assessments and
                scheduled activities in one place.
              </p>
            </div>
          </div>

          {/* =========================================
              CENTER ILLUSTRATION
          ========================================= */}
          <div className="schedule-illustration" aria-hidden="true">
            <div className="schedule-illustration-glow" />

            <div className="schedule-calendar-art">
              <div className="schedule-calendar-rings">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="schedule-calendar-top">
                <span />
                <span />
                <span />
              </div>

              <div className="schedule-calendar-body">
                <div className="schedule-calendar-line schedule-calendar-line-wide" />
                <div className="schedule-calendar-line schedule-calendar-line-short" />

                <div className="schedule-calendar-mini-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="schedule-calendar-event event-mint">
                  <span />
                </div>

                <div className="schedule-calendar-event event-peach">
                  <span />
                </div>

                <div className="schedule-calendar-event event-lavender">
                  <span />
                </div>
              </div>

              <div className="schedule-clock">
                <div className="schedule-clock-face">
                  <span className="schedule-clock-hour" />
                  <span className="schedule-clock-minute" />
                  <span className="schedule-clock-center" />
                </div>
              </div>
            </div>

            <div className="schedule-art-caption">
              <span>Plan</span>
              <span>Teach</span>
              <span>Inspire</span>

              <i />
            </div>
          </div>

          {/* =========================================
              RIGHT SIDE
          ========================================= */}
          <div className="schedule-header-right">
            {/* Date */}
            <div className="schedule-date">
              <div className="schedule-date-icon">
                <LuCalendarDays size={22} strokeWidth={1.55} />
              </div>

              <div className="schedule-date-content">
                <strong>Tuesday, 9 September 2026</strong>
                <span>Good evening, Trainer!</span>
              </div>
            </div>

            {/* Quote */}
            <div className="schedule-quote">
              <span className="schedule-quote-mark">“</span>

              <p>
                A well planned session
                <br />
                creates a brighter tomorrow.
              </p>

              <span className="schedule-quote-line" />
            </div>

            {/* ACTIONS */}
            <div className="schedule-header-actions">
              {/* Create Schedule */}
              <div className="schedule-create-wrapper" ref={createMenuRef}>
                <button
                  type="button"
                  className="schedule-create-button"
                  onClick={handleCreateSchedule}
                >
                  <span className="schedule-create-icon">
                    <LuPlus size={18} strokeWidth={1.9} />
                  </span>

                  <span>Create Schedule</span>
                </button>

                <button
                  type="button"
                  className="schedule-create-chevron"
                  onClick={() => setShowCreateMenu((current) => !current)}
                  aria-label="More create options"
                  aria-expanded={showCreateMenu}
                >
                  <LuChevronDown size={15} strokeWidth={1.9} />
                </button>

                {showCreateMenu && (
                  <div className="schedule-action-menu schedule-create-menu">
                    <button type="button" onClick={handleCreateSchedule}>
                      <span className="menu-icon menu-icon-blue">
                        <LuBookOpen size={14} strokeWidth={1.8} />
                      </span>

                      <span>
                        <strong>Training Session</strong>
                        <small>Add a regular class</small>
                      </span>
                    </button>

                    <button type="button" onClick={handleCreateQuiz}>
                      <span className="menu-icon menu-icon-purple">
                        <LuGraduationCap size={14} strokeWidth={1.8} />
                      </span>

                      <span>
                        <strong>Quiz</strong>
                        <small>Schedule a quiz</small>
                      </span>
                    </button>

                    <button type="button" onClick={handleCreateAssessment}>
                      <span className="menu-icon menu-icon-peach">
                        <LuCalendar size={14} strokeWidth={1.8} />
                      </span>

                      <span>
                        <strong>Assessment</strong>
                        <small>Schedule an assessment</small>
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Today */}
              <button
                type="button"
                className={`schedule-today-button ${
                  isTodayActive ? "is-active" : ""
                }`}
                onClick={handleToday}
              >
                <LuCalendar size={15} strokeWidth={1.75} />

                <span>Today</span>
              </button>

              {/* More */}
              <div className="schedule-more-wrapper" ref={moreMenuRef}>
                <button
                  type="button"
                  className={`schedule-more-button ${
                    showMoreMenu ? "is-open" : ""
                  }`}
                  onClick={() => setShowMoreMenu((current) => !current)}
                  aria-label="More schedule options"
                  aria-expanded={showMoreMenu}
                >
                  <LuEllipsis size={18} strokeWidth={1.8} />
                </button>

                {showMoreMenu && (
                  <div className="schedule-action-menu schedule-more-menu">
                    <button type="button" onClick={handleViewSchedule}>
                      <span className="menu-icon menu-icon-blue">
                        <LuCalendarDays size={14} strokeWidth={1.8} />
                      </span>

                      <span>
                        <strong>Full Schedule</strong>
                        <small>View all activities</small>
                      </span>
                    </button>

                    <button type="button" onClick={handleCalendarSettings}>
                      <span className="menu-icon menu-icon-mint">
                        <LuClock3 size={14} strokeWidth={1.8} />
                      </span>

                      <span>
                        <strong>Calendar Settings</strong>
                        <small>Manage schedule preferences</small>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM SUMMARY STRIP
        ========================================= */}
        <div className="schedule-header-summary">
          {/* Active Courses */}
          <button
            type="button"
            className="schedule-summary-card schedule-summary-mint"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "active-courses",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuBookOpen size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Active Courses</small>
              <strong>6</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* Total Batches */}
          <button
            type="button"
            className="schedule-summary-card schedule-summary-sky"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "total-batches",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuUsersRound size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Total Batches</small>
              <strong>12</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* Scheduled This Week */}
          <button
            type="button"
            className="schedule-summary-card schedule-summary-peach"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "scheduled-this-week",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuGraduationCap size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Scheduled This Week</small>
              <strong>18</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* Total Hours */}
          <button
            type="button"
            className="schedule-summary-card schedule-summary-lavender"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("trainer-schedule-summary", {
                  detail: {
                    type: "total-hours",
                  },
                }),
              );
            }}
          >
            <span className="schedule-summary-icon">
              <LuClock3 size={17} strokeWidth={1.7} />
            </span>

            <span className="schedule-summary-content">
              <small>Total Hours</small>
              <strong>24.5 hrs</strong>
            </span>

            <LuChevronRight
              className="schedule-summary-arrow"
              size={15}
              strokeWidth={1.8}
            />
          </button>

          {/* Navy motivational card */}
          <div className="schedule-summary-message">
            <div className="schedule-summary-message-icon">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 17L9 12L13 15L20 7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M16 7H20V11"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="schedule-summary-message-content">
              <strong>Keep Going!</strong>

              <span>
                Consistent teaching
                <br />
                builds stronger learners.
              </span>
            </div>

            <div className="schedule-summary-wave" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleHeader;
