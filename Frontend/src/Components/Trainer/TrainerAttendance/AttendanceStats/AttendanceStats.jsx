import React, { useState } from "react";

import {
  LuArrowUpRight,
  LuChartColumn,
  LuCircleCheck,
  LuCircleX,
  LuUsersRound,
} from "react-icons/lu";

import "./AttendanceStats.css";

/* =========================================================
   ATTENDANCE STATS
========================================================= */

const AttendanceStats = () => {
  /* ======================================================
     ACTIVE PERIOD
  ====================================================== */

  const [activePeriod, setActivePeriod] = useState("Today");

  /* ======================================================
     PERIOD DATA
  ====================================================== */

  const periodData = {
    Today: {
      total: "42",
      present: "37",
      absent: "5",
      rate: "88.1%",
      totalChange: "+4%",
      presentChange: "+6%",
      absentChange: "+1%",
      rateChange: "+2.3%",
      totalCompare: "from last week",
      presentCompare: "from yesterday",
      absentCompare: "from yesterday",
      rateCompare: "from last week",
    },

    "This Week": {
      total: "42",
      present: "186",
      absent: "24",
      rate: "88.6%",
      totalChange: "+3%",
      presentChange: "+5%",
      absentChange: "-2%",
      rateChange: "+1.8%",
      totalCompare: "from last week",
      presentCompare: "from last week",
      absentCompare: "from last week",
      rateCompare: "from last week",
    },

    "This Month": {
      total: "42",
      present: "764",
      absent: "91",
      rate: "89.3%",
      totalChange: "+7%",
      presentChange: "+8%",
      absentChange: "-4%",
      rateChange: "+2.7%",
      totalCompare: "from last month",
      presentCompare: "from last month",
      absentCompare: "from last month",
      rateCompare: "from last month",
    },

    Overall: {
      total: "42",
      present: "3,842",
      absent: "468",
      rate: "89.2%",
      totalChange: "+12%",
      presentChange: "+10%",
      absentChange: "-6%",
      rateChange: "+3.1%",
      totalCompare: "overall growth",
      presentCompare: "overall",
      absentCompare: "overall",
      rateCompare: "overall",
    },
  };

  const currentData = periodData[activePeriod];

  /* ======================================================
     PERIOD BUTTONS
  ====================================================== */

  const periods = ["Today", "This Week", "This Month", "Overall"];

  /* ======================================================
     STAT CARD DATA
  ====================================================== */

  const stats = [
    {
      id: "total",
      title: "Total Learners",
      value: currentData.total,
      change: currentData.totalChange,
      compare: currentData.totalCompare,
      icon: LuUsersRound,
      theme: "blue",
      positive: true,
    },

    {
      id: "present",
      title: "Present Today",
      value: currentData.present,
      change: currentData.presentChange,
      compare: currentData.presentCompare,
      icon: LuCircleCheck,
      theme: "mint",
      positive: true,
    },

    {
      id: "absent",
      title: "Absent Today",
      value: currentData.absent,
      change: currentData.absentChange,
      compare: currentData.absentCompare,
      icon: LuCircleX,
      theme: "rose",
      positive: currentData.absentChange.startsWith("-"),
    },

    {
      id: "rate",
      title: "Attendance Rate",
      value: currentData.rate,
      change: currentData.rateChange,
      compare: currentData.rateCompare,
      icon: LuChartColumn,
      theme: "lavender",
      positive: true,
      showProgress: true,
    },
  ];

  /* ======================================================
     PERIOD CHANGE
  ====================================================== */

  const handlePeriodChange = (period) => {
    setActivePeriod(period);
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <section className="attendance-stats">
      {/* ==================================================
          GLASS DECORATION
      ================================================== */}

      <div
        className="attendance-stats-glass-orb attendance-stats-orb-one"
        aria-hidden="true"
      />

      <div
        className="attendance-stats-glass-orb attendance-stats-orb-two"
        aria-hidden="true"
      />

      {/* ==================================================
          STATS HEADER
      ================================================== */}

      <div className="attendance-stats-header">
        {/* =================================================
            TITLE
        ================================================= */}

        <div className="attendance-stats-title-group">
          <div className="attendance-stats-title-icon">
            <LuChartColumn size={18} strokeWidth={1.75} />
          </div>

          <div className="attendance-stats-title-content">
            <h2>Attendance Overview</h2>

            <p>Quick snapshot of learner attendance for the selected period.</p>
          </div>
        </div>

        {/* =================================================
            PERIOD SWITCHER
        ================================================= */}

        <div
          className="attendance-period-switcher"
          role="tablist"
          aria-label="Attendance period"
        >
          {periods.map((period) => (
            <button
              type="button"
              key={period}
              role="tab"
              aria-selected={activePeriod === period}
              className={activePeriod === period ? "active" : ""}
              onClick={() => handlePeriodChange(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* ==================================================
          STAT CARDS
      ================================================== */}

      <div className="attendance-stat-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.id}
              className={`attendance-stat-card attendance-stat-${stat.theme}`}
            >
              {/* ==========================================
                  ICON
              ========================================== */}

              <div className="attendance-stat-icon">
                <Icon size={19} strokeWidth={1.7} />
              </div>

              {/* ==========================================
                  MAIN INFORMATION
              ========================================== */}

              <div className="attendance-stat-content">
                <strong className="attendance-stat-value">{stat.value}</strong>

                <span className="attendance-stat-label">{stat.title}</span>

                <div
                  className={`attendance-stat-change ${
                    stat.positive ? "is-positive" : "is-negative"
                  }`}
                >
                  <LuArrowUpRight
                    size={12}
                    strokeWidth={2}
                    className={stat.positive ? "" : "attendance-arrow-down"}
                  />

                  <span>{stat.change}</span>

                  <small>{stat.compare}</small>
                </div>
              </div>

              {/* ==========================================
                  RATE PROGRESS
              ========================================== */}

              {stat.showProgress && (
                <div
                  className="attendance-rate-ring"
                  aria-label={`${stat.value} attendance rate`}
                >
                  <svg viewBox="0 0 44 44" aria-hidden="true">
                    <circle
                      className="attendance-ring-track"
                      cx="22"
                      cy="22"
                      r="17"
                    />

                    <circle
                      className="attendance-ring-progress"
                      cx="22"
                      cy="22"
                      r="17"
                    />
                  </svg>

                  <span>{stat.value}</span>
                </div>
              )}

              {/* ==========================================
                  DECORATIVE MINI BARS
              ========================================== */}

              {!stat.showProgress && (
                <div className="attendance-mini-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AttendanceStats;
