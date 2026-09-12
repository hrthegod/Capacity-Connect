import React from "react";

import {
  LuCalendar,
  LuInfo,
  LuUserRound,
  LuCircleOff,
  LuClock3,
  LuChartNoAxesColumnIncreasing,
  LuChevronDown,
  LuArrowRight,
  LuBookOpen,
  LuDatabase,
  LuPanelTop,
} from "react-icons/lu";

import "./AttendanceOverview.css";

// =====================================================
// ATTENDANCE OVERVIEW DATA
// =====================================================

const attendanceStats = [
  {
    id: 1,
    title: "Present",
    value: "223",
    change: "+6%",
    changeText: "from last month",
    className: "attendance-stat-green",
    icon: LuUserRound,
  },
  {
    id: 2,
    title: "Absent",
    value: "18",
    change: "+2%",
    changeText: "from last month",
    className: "attendance-stat-red",
    icon: LuCircleOff,
  },
  {
    id: 3,
    title: "Late",
    value: "15",
    change: "-3%",
    changeText: "from last month",
    className: "attendance-stat-orange",
    icon: LuClock3,
  },
];

// =====================================================
// TREND DATA
// =====================================================

const attendanceTrend = [
  {
    id: 1,
    label: "W1",
    value: 78,
  },
  {
    id: 2,
    label: "W2",
    value: 82,
  },
  {
    id: 3,
    label: "W3",
    value: 85,
  },
  {
    id: 4,
    label: "W4",
    value: 87,
  },
];

// =====================================================
// RECENT ATTENDANCE DATA
// =====================================================

const recentAttendance = [
  {
    id: 1,
    title: "React Development",
    date: "Today, 10:00 AM",
    status: "Present",
    statusClass: "attendance-status-present",
    icon: LuBookOpen,
    iconClass: "attendance-recent-blue",
  },
  {
    id: 2,
    title: "Database Design",
    date: "Yesterday, 2:00 PM",
    status: "Late",
    statusClass: "attendance-status-late",
    icon: LuDatabase,
    iconClass: "attendance-recent-red",
  },
  {
    id: 3,
    title: "UI/UX Fundamentals",
    date: "Mar 7, 11:00 AM",
    status: "Present",
    statusClass: "attendance-status-present",
    icon: LuPanelTop,
    iconClass: "attendance-recent-green",
  },
];

// =====================================================
// ATTENDANCE OVERVIEW
// =====================================================

const AttendanceOverview = () => {
  return (
    <section className="trainer-attendance-overview">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="attendance-overview-header">
        <div className="attendance-overview-heading">
          <div className="attendance-title-icon">
            <LuCalendar />
          </div>

          <div className="attendance-heading-text">
            <h2>Attendance Overview</h2>

            <p>Track learner attendance and engagement</p>
          </div>
        </div>

        {/* =================================================
            MONTH SELECTOR
        ================================================= */}

        <button type="button" className="attendance-month-button">
          <LuCalendar />

          <span>This Month</span>

          <LuChevronDown />
        </button>
      </div>

      {/* =================================================
          TOP OVERVIEW GRID
      ================================================= */}

      <div className="attendance-top-grid">
        {/* =================================================
            OVERALL ATTENDANCE
        ================================================= */}

        <article className="attendance-overall-card">
          <div className="attendance-overall-header">
            <div>
              <h3>Overall Attendance</h3>

              <p>Total learner attendance rate</p>
            </div>

            <button
              type="button"
              className="attendance-info-button"
              aria-label="Attendance information"
            >
              <LuInfo />
            </button>
          </div>

          {/* =================================================
              ATTENDANCE CIRCLE
          ================================================= */}

          <div className="attendance-circle-wrapper">
            <div className="attendance-circle">
              <div className="attendance-circle-inner">
                <strong>87%</strong>
                <span>Attendance Rate</span>
              </div>
            </div>
          </div>

          {/* =================================================
              OVERALL CHANGE
          ================================================= */}

          <div className="attendance-overall-change">
            <strong>
              <span>↑</span> 6%
            </strong>

            <span>from last month</span>
          </div>

          {/* =================================================
              OVERALL FOOTER
          ================================================= */}

          <div className="attendance-overall-footer">
            <div className="attendance-footer-item">
              <LuUserRound />

              <div>
                <strong>256</strong>
                <span>Total Learners</span>
              </div>
            </div>

            <div className="attendance-footer-divider"></div>

            <div className="attendance-footer-item">
              <LuUserRound />

              <div>
                <strong>223</strong>
                <span>Active Learners</span>
              </div>
            </div>
          </div>
        </article>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="attendance-right-area">
          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="attendance-stat-grid">
            {attendanceStats.map((stat) => {
              const StatIcon = stat.icon;

              return (
                <article
                  key={stat.id}
                  className={`attendance-stat-card ${stat.className}`}
                >
                  <div className="attendance-stat-icon">
                    <StatIcon />
                  </div>

                  <div className="attendance-stat-content">
                    <span className="attendance-stat-title">{stat.title}</span>

                    <strong className="attendance-stat-value">
                      {stat.value}
                    </strong>

                    <div className="attendance-stat-change">
                      <span>{stat.change}</span>

                      <small>{stat.changeText}</small>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =================================================
              GOOD PROGRESS CARD
          ================================================= */}

          <article className="attendance-progress-card">
            <div className="attendance-progress-icon">
              <LuChartNoAxesColumnIncreasing />
            </div>

            <div className="attendance-progress-content">
              <h3>Good Progress!</h3>

              <p>Attendance is 6% higher than last month.</p>
            </div>

            <button
              type="button"
              className="attendance-progress-arrow"
              aria-label="View attendance progress"
            >
              <LuArrowRight />
            </button>
          </article>
        </div>
      </div>

      {/* =================================================
          BOTTOM GRID
      ================================================= */}

      <div className="attendance-bottom-grid">
        {/* =================================================
            ATTENDANCE TREND
        ================================================= */}

        <article className="attendance-trend-card">
          <div className="attendance-panel-header">
            <div>
              <h3>Attendance Trend</h3>

              <p>Last 4 weeks</p>
            </div>

            <button type="button" className="attendance-trend-selector">
              <span>This Month</span>
              <LuChevronDown />
            </button>
          </div>

          {/* =================================================
              CHART
          ================================================= */}

          <div className="attendance-chart">
            <div className="attendance-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="attendance-chart-area">
              <div className="attendance-grid-line line-100"></div>
              <div className="attendance-grid-line line-75"></div>
              <div className="attendance-grid-line line-50"></div>
              <div className="attendance-grid-line line-25"></div>
              <div className="attendance-grid-line line-0"></div>

              <div className="attendance-bars">
                {attendanceTrend.map((item) => (
                  <div className="attendance-bar-column" key={item.id}>
                    <strong>{item.value}%</strong>

                    <div
                      className="attendance-bar"
                      style={{
                        height: `${item.value}%`,
                      }}
                    ></div>

                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* =================================================
            RECENT ATTENDANCE
        ================================================= */}

        <article className="recent-attendance-card">
          <div className="attendance-panel-header">
            <div>
              <h3>Recent Attendance</h3>
            </div>

            <button
              type="button"
              className="recent-attendance-arrow"
              aria-label="View all attendance"
            >
              <LuArrowRight />
            </button>
          </div>

          {/* =================================================
              RECENT LIST
          ================================================= */}

          <div className="recent-attendance-list">
            {recentAttendance.map((item) => {
              const RecentIcon = item.icon;

              return (
                <div key={item.id} className="recent-attendance-item">
                  <div className={`recent-attendance-icon ${item.iconClass}`}>
                    <RecentIcon />
                  </div>

                  <div className="recent-attendance-content">
                    <strong>{item.title}</strong>

                    <span>{item.date}</span>
                  </div>

                  <span
                    className={`recent-attendance-status ${item.statusClass}`}
                  >
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AttendanceOverview;
