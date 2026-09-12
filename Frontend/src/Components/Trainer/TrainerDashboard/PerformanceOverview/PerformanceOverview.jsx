import React from "react";

import {
  LuChartNoAxesCombined,
  LuCalendarDays,
  LuChevronDown,
  LuUsersRound,
  LuBookOpen,
  LuStar,
  LuTrendingUp,
  LuArrowUpRight,
  LuCircleCheck,
} from "react-icons/lu";

import "./PerformanceOverview.css";

// =====================================================
// PERFORMANCE OVERVIEW
// =====================================================

const PerformanceOverview = () => {
  return (
    <section className="trainer-performance-overview">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="performance-overview-header">
        <div className="performance-overview-heading">
          <div className="performance-overview-title-icon">
            <LuChartNoAxesCombined />
          </div>

          <div className="performance-overview-heading-text">
            <h2>Performance Overview</h2>

            <p>Your teaching performance at a glance</p>
          </div>
        </div>

        <button type="button" className="performance-period-button">
          <LuCalendarDays />

          <span>This Month</span>

          <LuChevronDown />
        </button>
      </div>

      {/* =================================================
          MAIN PERFORMANCE GRID
      ================================================= */}

      <div className="performance-overview-grid">
        {/* =================================================
            LEARNER PROGRESS TREND
        ================================================= */}

        <article className="performance-trend-card">
          <div className="performance-trend-header">
            <div>
              <h3>Learner Progress Trend</h3>

              <p>Overall learner completion rate</p>
            </div>

            <button type="button" className="performance-trend-period">
              <span>This Month</span>
              <LuChevronDown />
            </button>
          </div>

          {/* =================================================
              CHART
          ================================================= */}

          <div className="performance-chart">
            <div className="performance-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="performance-chart-area">
              <div className="performance-grid-line performance-grid-1" />
              <div className="performance-grid-line performance-grid-2" />
              <div className="performance-grid-line performance-grid-3" />
              <div className="performance-grid-line performance-grid-4" />
              <div className="performance-grid-line performance-grid-5" />

              <svg
                className="performance-chart-svg"
                viewBox="0 0 600 230"
                preserveAspectRatio="none"
                aria-label="Learner progress trend"
              >
                {/* Area */}
                <defs>
                  <linearGradient
                    id="performanceAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#58c9ff" stopOpacity="0.22" />

                    <stop offset="100%" stopColor="#58c9ff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  className="performance-chart-area-fill"
                  d="
                    M 20 170
                    L 185 118
                    L 355 91
                    L 525 43
                    L 525 205
                    L 20 205
                    Z
                  "
                  fill="url(#performanceAreaGradient)"
                />

                {/* Main Line */}

                <path
                  className="performance-chart-line"
                  d="
                    M 20 170
                    L 185 118
                    L 355 91
                    L 525 43
                  "
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Points */}

                <circle
                  className="performance-chart-point"
                  cx="20"
                  cy="170"
                  r="7"
                />

                <circle
                  className="performance-chart-point"
                  cx="185"
                  cy="118"
                  r="7"
                />

                <circle
                  className="performance-chart-point"
                  cx="355"
                  cy="91"
                  r="7"
                />

                <circle
                  className="performance-chart-point"
                  cx="525"
                  cy="43"
                  r="8"
                />
              </svg>

              {/* Current Value */}

              <div className="performance-chart-tooltip">
                <strong>78%</strong>
              </div>

              {/* X Axis */}

              <div className="performance-x-axis">
                <span>W1</span>
                <span>W2</span>
                <span>W3</span>
                <span>W4</span>
              </div>
            </div>
          </div>
        </article>

        {/* =================================================
            RIGHT PERFORMANCE AREA
        ================================================= */}

        <div className="performance-side-area">
          {/* =================================================
              METRIC CARDS
          ================================================= */}

          <div className="performance-metric-grid">
            {/* Active Learners */}

            <article className="performance-metric-card performance-metric-green">
              <div className="performance-metric-icon">
                <LuUsersRound />
              </div>

              <div className="performance-metric-content">
                <span className="performance-metric-title">
                  Active Learners
                </span>

                <strong className="performance-metric-value">142</strong>

                <span className="performance-metric-growth performance-growth-green">
                  <LuArrowUpRight />
                  +12%
                </span>

                <small>from last month</small>
              </div>
            </article>

            {/* Course Completion */}

            <article className="performance-metric-card performance-metric-orange">
              <div className="performance-metric-icon">
                <LuBookOpen />
              </div>

              <div className="performance-metric-content">
                <span className="performance-metric-title">
                  Course Completion
                </span>

                <strong className="performance-metric-value">78%</strong>

                <span className="performance-metric-growth performance-growth-orange">
                  <LuArrowUpRight />
                  +8%
                </span>

                <small>from last month</small>
              </div>
            </article>

            {/* Average Rating */}

            <article className="performance-metric-card performance-metric-purple">
              <div className="performance-metric-icon">
                <LuStar />
              </div>

              <div className="performance-metric-content">
                <span className="performance-metric-title">Average Rating</span>

                <strong className="performance-metric-value">4.7</strong>

                <span className="performance-metric-growth performance-growth-green">
                  <LuArrowUpRight />
                  +0.3
                </span>

                <small>from last month</small>
              </div>
            </article>
          </div>

          {/* =================================================
              LOWER PERFORMANCE PANELS
          ================================================= */}

          <div className="performance-lower-grid">
            {/* =================================================
                LEARNER ENGAGEMENT
            ================================================= */}

            <article className="performance-engagement-card">
              <div className="performance-panel-header">
                <div>
                  <h3>Learner Engagement</h3>

                  <p>Based on recent activity</p>
                </div>
              </div>

              <div className="performance-engagement-value">
                <div className="performance-engagement-track">
                  <span style={{ width: "85%" }} />
                </div>

                <strong>85%</strong>
              </div>

              <div className="performance-engagement-insight">
                <div className="performance-insight-icon">
                  <LuTrendingUp />
                </div>

                <div className="performance-insight-text">
                  <strong>Engagement is 10% higher</strong>

                  <span>compared to last month</span>
                </div>

                <LuArrowUpRight className="performance-insight-arrow" />
              </div>
            </article>

            {/* =================================================
                COURSE COMPLETION
            ================================================= */}

            <article className="performance-completion-card">
              <div className="performance-panel-header">
                <div>
                  <h3>Course Completion</h3>

                  <p>Across all your courses</p>
                </div>
              </div>

              <div className="performance-completion-content">
                {/* Donut */}

                <div className="performance-donut">
                  <div className="performance-donut-inner">
                    <strong>78%</strong>

                    <span>Completed</span>
                  </div>
                </div>

                {/* Legend */}

                <div className="performance-completion-legend">
                  <div className="performance-legend-item">
                    <span className="performance-legend-dot performance-dot-green" />

                    <span>Completed</span>

                    <strong>78%</strong>
                  </div>

                  <div className="performance-legend-item">
                    <span className="performance-legend-dot performance-dot-blue" />

                    <span>In Progress</span>

                    <strong>14%</strong>
                  </div>

                  <div className="performance-legend-item">
                    <span className="performance-legend-dot performance-dot-gray" />

                    <span>Not Started</span>

                    <strong>8%</strong>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceOverview;
