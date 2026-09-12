import React, { useState } from "react";
import {
  LuArrowUpRight,
  LuCalendarCheck,
  LuCalendarClock,
  LuCheck,
  LuChevronRight,
  LuClock3,
  LuListChecks,
  LuRotateCcw,
  LuUsersRound,
} from "react-icons/lu";

import "./ScheduleStats.css";

const scheduleStatsData = [
  {
    id: "today",
    label: "Today's Sessions",
    value: "04",
    subtext: "2 sessions remaining",
    trend: "+2",
    trendText: "from yesterday",
    icon: LuCalendarClock,
    theme: "mint",
    progress: 68,
  },
  {
    id: "week",
    label: "This Week",
    value: "18",
    subtext: "Sessions scheduled",
    trend: "+12%",
    trendText: "vs last week",
    icon: LuCalendarCheck,
    theme: "sky",
    progress: 82,
  },
  {
    id: "upcoming",
    label: "Upcoming",
    value: "12",
    subtext: "Next 7 days",
    trend: "08",
    trendText: "in next 3 days",
    icon: LuClock3,
    theme: "peach",
    progress: 54,
  },
  {
    id: "completed",
    label: "Completed",
    value: "06",
    subtext: "Sessions this week",
    trend: "86%",
    trendText: "completion rate",
    icon: LuListChecks,
    theme: "lavender",
    progress: 86,
  },
  {
    id: "pending",
    label: "Pending Actions",
    value: "02",
    subtext: "Need your attention",
    trend: "View",
    trendText: "pending items",
    icon: LuUsersRound,
    theme: "navy",
    progress: 42,
  },
];

const ScheduleStats = () => {
  const [activeStat, setActiveStat] = useState(null);

  const handleStatClick = (stat) => {
    setActiveStat(stat.id);

    window.dispatchEvent(
      new CustomEvent("trainer-schedule-stat-click", {
        detail: {
          stat: stat.id,
        },
      }),
    );
  };

  const handleViewSchedule = () => {
    window.dispatchEvent(new CustomEvent("trainer-schedule-view-all"));
  };

  const handleRefreshStats = () => {
    window.dispatchEvent(new CustomEvent("trainer-schedule-refresh-stats"));
  };

  return (
    <section className="schedule-stats">
      <div className="schedule-stats-shell">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="schedule-stats-heading">
          <div className="schedule-stats-heading-left">
            <span className="schedule-stats-eyebrow">SCHEDULE OVERVIEW</span>

            <h2>your schedule at a glance</h2>

            <p>
              A quick view of your sessions, activity and upcoming schedule.
            </p>
          </div>

          <div className="schedule-stats-heading-actions">
            <button
              type="button"
              className="schedule-stats-refresh"
              onClick={handleRefreshStats}
              aria-label="Refresh schedule statistics"
              title="Refresh statistics"
            >
              <LuRotateCcw size={14} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className="schedule-stats-view-button"
              onClick={handleViewSchedule}
            >
              <span>view full schedule</span>

              <LuArrowUpRight size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="schedule-stats-grid">
          {scheduleStatsData.map((stat) => {
            const Icon = stat.icon;

            const isActive = activeStat === stat.id;

            return (
              <button
                type="button"
                key={stat.id}
                className={`schedule-stat-card schedule-stat-${stat.theme} ${
                  isActive ? "is-active" : ""
                }`}
                onClick={() => handleStatClick(stat)}
                aria-pressed={isActive}
              >
                {/* Decorative glass circle */}
                <span className="schedule-stat-card-glow" aria-hidden="true" />

                {/* Top row */}
                <div className="schedule-stat-top">
                  <span className="schedule-stat-icon">
                    <Icon size={17} strokeWidth={1.75} />
                  </span>

                  <span className="schedule-stat-arrow">
                    <LuChevronRight size={14} strokeWidth={1.8} />
                  </span>
                </div>

                {/* Main information */}
                <div className="schedule-stat-content">
                  <span className="schedule-stat-label">{stat.label}</span>

                  <strong className="schedule-stat-value">{stat.value}</strong>

                  <span className="schedule-stat-subtext">{stat.subtext}</span>
                </div>

                {/* Bottom information */}
                <div className="schedule-stat-bottom">
                  <div className="schedule-stat-trend">
                    <span className="schedule-stat-trend-value">
                      {stat.trend}
                    </span>

                    <span className="schedule-stat-trend-text">
                      {stat.trendText}
                    </span>
                  </div>

                  <div className="schedule-stat-progress">
                    <span
                      className="schedule-stat-progress-fill"
                      style={{
                        width: `${stat.progress}%`,
                      }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* =================================================
            SMALL STATUS FOOTER
        ================================================= */}

        <div className="schedule-stats-footer">
          <div className="schedule-stats-footer-status">
            <span className="schedule-stats-status-dot" />

            <span>schedule data updated just now</span>
          </div>

          <div className="schedule-stats-footer-divider" />

          <div className="schedule-stats-footer-info">
            <LuCheck size={13} strokeWidth={1.9} />

            <span>all session times are shown in your local timezone</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleStats;
