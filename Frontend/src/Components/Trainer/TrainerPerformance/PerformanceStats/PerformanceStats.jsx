import React, { useEffect, useRef, useState } from "react";
import {
  LuArrowUpRight,
  LuCalendarDays,
  LuChartColumn,
  LuChevronDown,
  LuChevronRight,
  LuCircleHelp,
  LuFileCheck2,
  LuGraduationCap,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuUsersRound,
  LuX,
} from "react-icons/lu";

import "./PerformanceStats.css";

const PerformanceStats = () => {
  const [period, setPeriod] = useState("This Month");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null);
  const [activeSummary, setActiveSummary] = useState(null);

  const periodRef = useRef(null);

  const periodOptions = [
    "This Month",
    "Last Month",
    "Last 3 Months",
    "This Year",
  ];

  const stats = [
    {
      id: "learners",
      title: "Total Learners",
      subtitle: "Active in this period",
      value: "124",
      change: "+12%",
      theme: "blue",
      icon: <LuUsersRound size={17} strokeWidth={1.75} />,
      info:
        "Total number of learners who were active during the selected period.",
      chart: "learners",
    },
    {
      id: "score",
      title: "Average Score",
      subtitle: "Across all assessments",
      value: "78%",
      change: "+6%",
      theme: "mint",
      icon: <LuTarget size={17} strokeWidth={1.75} />,
      info:
        "Average assessment score across quizzes, assignments and other evaluations.",
      chart: "score",
    },
    {
      id: "completion",
      title: "Completion Rate",
      subtitle: "Course completion",
      value: "85%",
      change: "+10%",
      theme: "peach",
      icon: <LuGraduationCap size={17} strokeWidth={1.75} />,
      info:
        "Percentage of enrolled learners who completed their assigned course work.",
      chart: "completion",
    },
    {
      id: "assignments",
      title: "Assignments",
      subtitle: "Submission rate",
      value: "92%",
      change: "+8%",
      theme: "lavender",
      icon: <LuFileCheck2 size={17} strokeWidth={1.75} />,
      info:
        "Percentage of assigned work submitted by learners during this period.",
      chart: "assignments",
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        periodRef.current &&
        !periodRef.current.contains(event.target)
      ) {
        setPeriodOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPeriodOpen(false);
        setActiveInfo(null);
        setActiveSummary(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handlePeriodSelect = (value) => {
    setPeriod(value);
    setPeriodOpen(false);
  };

  const handleInfoClick = (id) => {
    setActiveSummary(null);

    setActiveInfo((current) =>
      current === id ? null : id,
    );
  };

  const handleSummaryClick = (id) => {
    setActiveInfo(null);

    setActiveSummary((current) =>
      current === id ? null : id,
    );
  };

  const closeInfo = () => {
    setActiveInfo(null);
    setActiveSummary(null);
  };

  return (
    <section className="performance-stats">
      <div className="performance-stats-shell">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="performance-stats-header">
          <div className="performance-stats-title-area">
            <div className="performance-stats-title-icon">
              <LuChartColumn
                size={18}
                strokeWidth={1.75}
              />
            </div>

            <div>
              <h2>Performance Stats</h2>

              <p>
                Key metrics to track learner growth and
                engagement.
              </p>
            </div>
          </div>

          <div className="performance-stats-header-actions">
            {/* Live data */}

            <div className="performance-live-status">
              <span className="performance-live-dot" />
              <span>Live data</span>
            </div>

            {/* Period selector */}

            <div
              className="performance-period-wrapper"
              ref={periodRef}
            >
              <button
                type="button"
                className={`performance-period-button ${
                  periodOpen ? "is-open" : ""
                }`}
                onClick={() =>
                  setPeriodOpen((current) => !current)
                }
                aria-expanded={periodOpen}
                aria-haspopup="listbox"
              >
                <LuCalendarDays
                  size={14}
                  strokeWidth={1.8}
                />

                <span>{period}</span>

                <LuChevronDown
                  className={`performance-period-chevron ${
                    periodOpen ? "rotate" : ""
                  }`}
                  size={13}
                  strokeWidth={1.9}
                />
              </button>

              {periodOpen && (
                <div
                  className="performance-period-menu"
                  role="listbox"
                >
                  {periodOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`performance-period-option ${
                        option === period ? "selected" : ""
                      }`}
                      onClick={() =>
                        handlePeriodSelect(option)
                      }
                      role="option"
                      aria-selected={option === period}
                    >
                      <span>{option}</span>

                      {option === period && (
                        <span className="performance-period-selected-dot" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN STAT CARDS
        ===================================================== */}

        <div className="performance-stats-grid">
          {stats.map((stat) => (
            <article
              className={`performance-stat-card performance-stat-${stat.theme}`}
              key={stat.id}
            >
              {/* Card top */}

              <div className="performance-stat-card-top">
                <div className="performance-stat-icon">
                  {stat.icon}
                </div>

                <button
                  type="button"
                  className={`performance-stat-info-button ${
                    activeInfo === stat.id ? "active" : ""
                  }`}
                  onClick={() => handleInfoClick(stat.id)}
                  aria-label={`Information about ${stat.title}`}
                  aria-expanded={activeInfo === stat.id}
                >
                  <LuCircleHelp
                    size={14}
                    strokeWidth={1.7}
                  />
                </button>

                {activeInfo === stat.id && (
                  <div className="performance-stat-info-popover">
                    <div className="performance-stat-info-popover-top">
                      <span>About this metric</span>

                      <button
                        type="button"
                        onClick={closeInfo}
                        aria-label="Close information"
                      >
                        <LuX
                          size={12}
                          strokeWidth={1.9}
                        />
                      </button>
                    </div>

                    <p>{stat.info}</p>
                  </div>
                )}
              </div>

              {/* Card title */}

              <div className="performance-stat-heading">
                <h3>{stat.title}</h3>

                <span>{stat.subtitle}</span>
              </div>

              {/* Value + chart */}

              <div className="performance-stat-bottom">
                <div className="performance-stat-value-area">
                  <strong>{stat.value}</strong>

                  <div className="performance-stat-change">
                    <LuTrendingUp
                      size={12}
                      strokeWidth={2}
                    />

                    <span>{stat.change}</span>
                  </div>

                  <small>vs last period</small>
                </div>

                <div
                  className={`performance-mini-chart performance-mini-chart-${stat.chart}`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 110 55"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id={`chartGradient-${stat.id}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          className="chart-gradient-start"
                        />

                        <stop
                          offset="100%"
                          className="chart-gradient-end"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      className="performance-chart-area"
                      d="M0 43 C13 42 17 40 26 38 C36 35 39 23 49 25 C59 27 64 36 73 28 C83 19 89 23 95 18 C102 13 106 6 110 5 L110 55 L0 55 Z"
                      fill={`url(#chartGradient-${stat.id})`}
                    />

                    <path
                      className="performance-chart-line"
                      d="M0 43 C13 42 17 40 26 38 C36 35 39 23 49 25 C59 27 64 36 73 28 C83 19 89 23 95 18 C102 13 106 6 110 5"
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}

          {/* ===================================================
              OVERALL PERFORMANCE - DARK NAVY CARD
          =================================================== */}

          <article className="performance-stat-card performance-stat-overall">
            <div className="performance-overall-glow" />

            <div className="performance-stat-card-top">
              <div className="performance-stat-icon">
                <LuTrophy
                  size={17}
                  strokeWidth={1.7}
                />
              </div>

              <button
                type="button"
                className={`performance-stat-info-button ${
                  activeInfo === "overall" ? "active" : ""
                }`}
                onClick={() => handleInfoClick("overall")}
                aria-label="Information about Overall Performance"
                aria-expanded={activeInfo === "overall"}
              >
                <LuCircleHelp
                  size={14}
                  strokeWidth={1.7}
                />
              </button>

              {activeInfo === "overall" && (
                <div className="performance-stat-info-popover performance-overall-popover">
                  <div className="performance-stat-info-popover-top">
                    <span>About this metric</span>

                    <button
                      type="button"
                      onClick={closeInfo}
                      aria-label="Close information"
                    >
                      <LuX
                        size={12}
                        strokeWidth={1.9}
                      />
                    </button>
                  </div>

                  <p>
                    Combined learner performance calculated
                    from the major academic and engagement
                    indicators.
                  </p>
                </div>
              )}
            </div>

            <div className="performance-stat-heading">
              <h3>Overall Performance</h3>

              <span>All key metrics combined</span>
            </div>

            <div className="performance-overall-content">
              <div className="performance-stat-value-area">
                <strong>82%</strong>

                <div className="performance-stat-change">
                  <LuTrendingUp
                    size={12}
                    strokeWidth={2}
                  />

                  <span>+6.4%</span>
                </div>

                <small>vs last period</small>
              </div>

              <div className="performance-overall-ring">
                <svg
                  viewBox="0 0 72 72"
                  aria-hidden="true"
                >
                  <circle
                    cx="36"
                    cy="36"
                    r="29"
                    className="performance-overall-ring-track"
                  />

                  <circle
                    cx="36"
                    cy="36"
                    r="29"
                    className="performance-overall-ring-progress"
                  />
                </svg>

                <span>82%</span>
              </div>
            </div>
          </article>
        </div>

        {/* =====================================================
            SUMMARY ROW
        ===================================================== */}

        <div className="performance-stats-summary-grid">
          {/* ===================================================
              TOP PERFORMING BATCH
          =================================================== */}

          <button
            type="button"
            className={`performance-summary-card performance-summary-batch ${
              activeSummary === "batch" ? "active" : ""
            }`}
            onClick={() => handleSummaryClick("batch")}
          >
            <div className="performance-summary-icon performance-summary-icon-peach">
              <LuTrophy
                size={17}
                strokeWidth={1.75}
              />
            </div>

            <div className="performance-summary-main">
              <span className="performance-summary-label">
                Top Performing Batch
              </span>

              <strong>Batch B</strong>

              <small>
                Batch B is leading this month.
              </small>
            </div>

            <div className="performance-summary-divider" />

            <div className="performance-summary-highlight">
              <div className="performance-summary-small-icon">
                <LuTrophy
                  size={13}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <strong>92%</strong>
                <span>avg score</span>
              </div>
            </div>

            <LuChevronRight
              className="performance-summary-arrow"
              size={17}
              strokeWidth={1.7}
            />
          </button>

          {/* ===================================================
              PERFORMANCE TREND
          =================================================== */}

          <button
            type="button"
            className={`performance-summary-card performance-summary-trend ${
              activeSummary === "trend" ? "active" : ""
            }`}
            onClick={() => handleSummaryClick("trend")}
          >
            <div className="performance-summary-icon performance-summary-icon-blue">
              <LuTrendingUp
                size={17}
                strokeWidth={1.75}
              />
            </div>

            <div className="performance-summary-main">
              <span className="performance-summary-label">
                Performance Trend
              </span>

              <strong>+6.4%</strong>

              <small>
                Steady improvement over time.
              </small>
            </div>

            <div className="performance-summary-trend-value">
              <LuArrowUpRight
                size={15}
                strokeWidth={1.9}
              />

              <span>overall growth</span>
            </div>

            <LuChevronRight
              className="performance-summary-arrow"
              size={17}
              strokeWidth={1.7}
            />
          </button>

          {/* ===================================================
              MOST ACTIVE LEARNERS
          =================================================== */}

          <button
            type="button"
            className={`performance-summary-card performance-summary-active ${
              activeSummary === "active" ? "active" : ""
            }`}
            onClick={() => handleSummaryClick("active")}
          >
            <div className="performance-summary-icon performance-summary-icon-lavender">
              <LuUsersRound
                size={17}
                strokeWidth={1.75}
              />
            </div>

            <div className="performance-summary-main">
              <span className="performance-summary-label">
                Most Active Learners
              </span>

              <strong>32 learners</strong>

              <small>
                improved this month.
              </small>
            </div>

            <div className="performance-avatar-stack">
              <span className="performance-avatar performance-avatar-a">
                A
              </span>

              <span className="performance-avatar performance-avatar-r">
                R
              </span>

              <span className="performance-avatar performance-avatar-s">
                S
              </span>

              <span className="performance-avatar performance-avatar-more">
                +29
              </span>
            </div>

            <LuChevronRight
              className="performance-summary-arrow"
              size={17}
              strokeWidth={1.7}
            />
          </button>
        </div>

        {/* =====================================================
            SUMMARY DETAIL PANEL
        ===================================================== */}

        {activeSummary && (
          <div className="performance-summary-detail">
            <div className="performance-summary-detail-icon">
              {activeSummary === "batch" && (
                <LuTrophy
                  size={16}
                  strokeWidth={1.8}
                />
              )}

              {activeSummary === "trend" && (
                <LuTrendingUp
                  size={16}
                  strokeWidth={1.8}
                />
              )}

              {activeSummary === "active" && (
                <LuUsersRound
                  size={16}
                  strokeWidth={1.8}
                />
              )}
            </div>

            <div className="performance-summary-detail-content">
              {activeSummary === "batch" && (
                <>
                  <strong>Batch B is currently leading.</strong>

                  <span>
                    The batch has an average score of 92%
                    across the selected performance period.
                  </span>
                </>
              )}

              {activeSummary === "trend" && (
                <>
                  <strong>Performance is improving steadily.</strong>

                  <span>
                    Overall learner performance has improved
                    by 6.4% compared with the previous period.
                  </span>
                </>
              )}

              {activeSummary === "active" && (
                <>
                  <strong>32 learners showed strong activity.</strong>

                  <span>
                    These learners demonstrated measurable
                    improvement during the selected period.
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              className="performance-summary-detail-close"
              onClick={closeInfo}
              aria-label="Close summary details"
            >
              <LuX
                size={14}
                strokeWidth={1.8}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PerformanceStats;