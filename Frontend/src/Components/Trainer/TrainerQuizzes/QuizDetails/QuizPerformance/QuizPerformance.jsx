import React, { useMemo, useState } from "react";

import {
  LuArrowDown,
  LuArrowUp,
  LuCalendarDays,
  LuCheck,
  LuChevronDown,
  LuCircleCheck,
  LuClock3,
  LuDownload,
  LuInfo,
  LuListChecks,
  LuRefreshCw,
  LuStar,
  LuTrophy,
  LuUsersRound,
} from "react-icons/lu";

import "./QuizPerformance.css";

/* =========================================================
   PERFORMANCE DATA
========================================================= */

const performanceData = {
  "Last 7 days": {
    scoreDistribution: [
      { label: "0–20%", value: 1 },
      { label: "21–40%", value: 2 },
      { label: "41–60%", value: 3 },
      { label: "61–80%", value: 6 },
      { label: "81–100%", value: 9 },
    ],

    trend: [
      { label: "Mon", score: 68, passRate: 42 },
      { label: "Tue", score: 73, passRate: 48 },
      { label: "Wed", score: 71, passRate: 52 },
      { label: "Thu", score: 78, passRate: 58 },
      { label: "Fri", score: 75, passRate: 55 },
      { label: "Sat", score: 82, passRate: 64 },
      { label: "Sun", score: 85, passRate: 69 },
    ],
  },

  "Last 30 days": {
    scoreDistribution: [
      { label: "0–20%", value: 2 },
      { label: "21–40%", value: 4 },
      { label: "41–60%", value: 5 },
      { label: "61–80%", value: 9 },
      { label: "81–100%", value: 14 },
    ],

    trend: [
      { label: "Week 1", score: 64, passRate: 38 },
      { label: "Week 2", score: 74, passRate: 48 },
      { label: "Week 3", score: 79, passRate: 56 },
      { label: "Week 4", score: 76, passRate: 51 },
      { label: "Week 5", score: 88, passRate: 68 },
    ],
  },

  "Last 90 days": {
    scoreDistribution: [
      { label: "0–20%", value: 4 },
      { label: "21–40%", value: 7 },
      { label: "41–60%", value: 11 },
      { label: "61–80%", value: 19 },
      { label: "81–100%", value: 28 },
    ],

    trend: [
      { label: "May", score: 68, passRate: 43 },
      { label: "Jun", score: 72, passRate: 48 },
      { label: "Jul", score: 76, passRate: 53 },
      { label: "Aug", score: 81, passRate: 61 },
      { label: "Sep", score: 86, passRate: 69 },
    ],
  },
};

/* =========================================================
   DATE OPTIONS
========================================================= */

const dateOptions = ["Last 7 days", "Last 30 days", "Last 90 days"];

/* =========================================================
   GRAPH PERIOD OPTIONS
========================================================= */

const graphPeriodOptions = ["Daily", "Weekly", "Monthly"];

/* =========================================================
   QUIZ PERFORMANCE
========================================================= */

const QuizPerformance = () => {
  const [dateRange, setDateRange] = useState("Last 30 days");

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  const [graphPeriod, setGraphPeriod] = useState("Weekly");

  const [graphDropdownOpen, setGraphDropdownOpen] = useState(false);

  const [activeBar, setActiveBar] = useState(null);

  const [activePoint, setActivePoint] = useState(null);

  /* ======================================================
     CURRENT GRAPH DATA
  ====================================================== */

  const currentData = useMemo(() => {
    return performanceData[dateRange];
  }, [dateRange]);

  /* ======================================================
     MAX BAR VALUE
  ====================================================== */

  const maxBarValue = Math.max(
    ...currentData.scoreDistribution.map((item) => item.value),
  );

  /* ======================================================
     CLOSE DATE DROPDOWN
  ====================================================== */

  const handleDateToggle = () => {
    setDateDropdownOpen((previous) => !previous);
    setGraphDropdownOpen(false);
  };

  /* ======================================================
     CHANGE DATE RANGE
  ====================================================== */

  const handleDateChange = (value) => {
    setDateRange(value);
    setDateDropdownOpen(false);
    setActiveBar(null);
    setActivePoint(null);
  };

  /* ======================================================
     GRAPH PERIOD
  ====================================================== */

  const handleGraphPeriodToggle = () => {
    setGraphDropdownOpen((previous) => !previous);
    setDateDropdownOpen(false);
  };

  const handleGraphPeriodChange = (value) => {
    setGraphPeriod(value);
    setGraphDropdownOpen(false);
  };

  /* ======================================================
     EXPORT REPORT
  ====================================================== */

  const handleExportReport = () => {
    const rows = [
      ["Metric", "Value", "Change"],
      ["Total Attempts", "28", "+12%"],
      ["Pass Rate", "71%", "+8%"],
      ["Average Time", "14m 32s", "-18%"],
      ["Average Score", "76%", "+6%"],
      ["Top Performer", "Aarav Mehta", "96%"],
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "quiz-performance-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* ======================================================
     RESET VIEW
  ====================================================== */

  const handleResetView = () => {
    setDateRange("Last 30 days");
    setGraphPeriod("Weekly");
    setDateDropdownOpen(false);
    setGraphDropdownOpen(false);
    setActiveBar(null);
    setActivePoint(null);
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <section className="quiz-performance">
      {/* ==================================================
          PERFORMANCE HEADER
      ================================================== */}

      <div className="quiz-performance-header">
        <div className="quiz-performance-heading-group">
          <div className="quiz-performance-heading-icon">
            <LuListChecks size={19} strokeWidth={1.75} />
          </div>

          <div className="quiz-performance-heading">
            <h2>Quiz Performance</h2>

            <p>
              Analyze learner performance and identify areas for improvement.
            </p>
          </div>
        </div>

        <div className="quiz-performance-header-actions">
          {/* ==============================================
              DATE DROPDOWN
          ============================================== */}

          <div className="quiz-performance-dropdown">
            <button
              type="button"
              className={`quiz-performance-date-trigger ${
                dateDropdownOpen ? "is-open" : ""
              }`}
              onClick={handleDateToggle}
              aria-expanded={dateDropdownOpen}
              aria-haspopup="listbox"
            >
              <LuCalendarDays size={15} strokeWidth={1.8} />

              <span>{dateRange}</span>

              <LuChevronDown
                className={dateDropdownOpen ? "is-rotated" : ""}
                size={14}
                strokeWidth={1.8}
              />
            </button>

            {dateDropdownOpen && (
              <div className="quiz-performance-dropdown-menu" role="listbox">
                {dateOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    role="option"
                    aria-selected={dateRange === option}
                    className={dateRange === option ? "selected" : ""}
                    onClick={() => handleDateChange(option)}
                  >
                    <span>{option}</span>

                    {dateRange === option && (
                      <LuCheck size={14} strokeWidth={1.9} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==============================================
              RESET
          ============================================== */}

          <button
            type="button"
            className="quiz-performance-reset-button"
            onClick={handleResetView}
            aria-label="Reset performance view"
            title="Reset view"
          >
            <LuRefreshCw size={15} strokeWidth={1.8} />
          </button>

          {/* ==============================================
              EXPORT
          ============================================== */}

          <button
            type="button"
            className="quiz-performance-export-button"
            onClick={handleExportReport}
          >
            <LuDownload size={15} strokeWidth={1.8} />

            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* ==================================================
          PERFORMANCE CARDS
      ================================================== */}

      <div className="quiz-performance-cards">
        {/* =================================================
            TOTAL ATTEMPTS
        ================================================= */}

        <article className="performance-stat-card performance-stat-blue">
          <div className="performance-stat-icon">
            <LuUsersRound size={18} strokeWidth={1.75} />
          </div>

          <div className="performance-stat-content">
            <span className="performance-stat-label">Total Attempts</span>

            <strong className="performance-stat-value">28</strong>

            <span className="performance-stat-change positive">
              <LuArrowUp size={12} strokeWidth={2} />
              +12%
            </span>

            <span className="performance-stat-helper">vs previous 30 days</span>
          </div>
        </article>

        {/* =================================================
            PASS RATE
        ================================================= */}

        <article className="performance-stat-card performance-stat-mint">
          <div className="performance-stat-icon">
            <LuCircleCheck size={18} strokeWidth={1.75} />
          </div>

          <div className="performance-stat-content">
            <span className="performance-stat-label">Pass Rate</span>

            <strong className="performance-stat-value">71%</strong>

            <span className="performance-stat-change positive">
              <LuArrowUp size={12} strokeWidth={2} />
              +8%
            </span>

            <span className="performance-stat-helper">vs previous 30 days</span>
          </div>
        </article>

        {/* =================================================
            AVERAGE TIME
        ================================================= */}

        <article className="performance-stat-card performance-stat-peach">
          <div className="performance-stat-icon">
            <LuClock3 size={18} strokeWidth={1.75} />
          </div>

          <div className="performance-stat-content">
            <span className="performance-stat-label">Avg. Time Taken</span>

            <strong className="performance-stat-value">14m 32s</strong>

            <span className="performance-stat-change positive">
              <LuArrowDown size={12} strokeWidth={2} />
              -18%
            </span>

            <span className="performance-stat-helper">vs previous 30 days</span>
          </div>
        </article>

        {/* =================================================
            AVERAGE SCORE
        ================================================= */}

        <article className="performance-stat-card performance-stat-lavender">
          <div className="performance-stat-icon">
            <LuStar size={18} strokeWidth={1.75} />
          </div>

          <div className="performance-stat-content">
            <span className="performance-stat-label">Avg. Score</span>

            <strong className="performance-stat-value">76%</strong>

            <span className="performance-stat-change positive">
              <LuArrowUp size={12} strokeWidth={2} />
              +6%
            </span>

            <span className="performance-stat-helper">vs previous 30 days</span>
          </div>
        </article>

        {/* =================================================
            TOP PERFORMER
        ================================================= */}

        <article className="performance-stat-card performance-stat-dark">
          <div className="performance-dark-top">
            <div className="performance-stat-icon">
              <LuTrophy size={18} strokeWidth={1.75} />
            </div>

            <span className="performance-dark-label">Top Performer</span>
          </div>

          <div className="performance-top-performer">
            <div className="performance-avatar">AM</div>

            <div className="performance-performer-info">
              <strong>Aarav Mehta</strong>

              <span>
                96% <i>•</i> 18m 12s
              </span>
            </div>
          </div>

          <div className="performance-dark-badge">Highest Score</div>
        </article>
      </div>

      {/* ==================================================
          GRAPH SECTION
      ================================================== */}

      <div className="quiz-performance-graphs">
        {/* =================================================
            SCORE DISTRIBUTION
        ================================================= */}

        <article className="performance-chart-card">
          <div className="performance-chart-header">
            <div>
              <div className="performance-chart-title-row">
                <div className="performance-chart-icon score-icon">
                  <LuStar size={15} strokeWidth={1.75} />
                </div>

                <h3>Score Distribution</h3>
              </div>

              <p>Distribution of quiz scores among all attempts.</p>
            </div>

            <div className="performance-chart-total">
              <span>Highest range</span>
              <strong>81–100%</strong>
            </div>
          </div>

          {/* ==============================================
              BAR CHART
          ============================================== */}

          <div className="score-chart">
            <div className="score-chart-y-axis">
              <span>{maxBarValue}</span>
              <span>{Math.ceil(maxBarValue * 0.66)}</span>
              <span>{Math.ceil(maxBarValue * 0.33)}</span>
              <span>0</span>
            </div>

            <div className="score-chart-main">
              <div className="score-chart-grid">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="score-bars">
                {currentData.scoreDistribution.map((item, index) => {
                  const height = (item.value / maxBarValue) * 100;

                  return (
                    <button
                      type="button"
                      key={item.label}
                      className={`score-bar-column ${
                        activeBar === index ? "is-active" : ""
                      }`}
                      onClick={() => setActiveBar(index)}
                      aria-label={`${item.label}: ${item.value} attempts`}
                    >
                      <span
                        className={`score-bar score-bar-${index}`}
                        style={{
                          height: `${height}%`,
                        }}
                      >
                        {activeBar === index && (
                          <span className="score-bar-tooltip">
                            {item.value} attempts
                          </span>
                        )}
                      </span>

                      <span className="score-bar-label">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </article>

        {/* =================================================
            PERFORMANCE TREND
        ================================================= */}

        <article className="performance-chart-card">
          <div className="performance-chart-header">
            <div>
              <div className="performance-chart-title-row">
                <div className="performance-chart-icon trend-icon">
                  <LuArrowUp size={15} strokeWidth={1.9} />
                </div>

                <h3>Performance Trend</h3>
              </div>

              <p>Average score and pass rate over time.</p>
            </div>

            {/* ============================================
                PERIOD DROPDOWN
            ============================================ */}

            <div className="performance-period-dropdown">
              <button
                type="button"
                className={`performance-period-trigger ${
                  graphDropdownOpen ? "is-open" : ""
                }`}
                onClick={handleGraphPeriodToggle}
                aria-expanded={graphDropdownOpen}
                aria-haspopup="listbox"
              >
                <span>{graphPeriod}</span>

                <LuChevronDown
                  className={graphDropdownOpen ? "is-rotated" : ""}
                  size={13}
                  strokeWidth={1.8}
                />
              </button>

              {graphDropdownOpen && (
                <div className="performance-period-menu">
                  {graphPeriodOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={graphPeriod === option ? "selected" : ""}
                      onClick={() => handleGraphPeriodChange(option)}
                    >
                      <span>{option}</span>

                      {graphPeriod === option && (
                        <LuCheck size={13} strokeWidth={1.9} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ==============================================
              LEGEND
          ============================================== */}

          <div className="performance-chart-legend">
            <span>
              <i className="legend-dot score-dot" />
              Average Score
            </span>

            <span>
              <i className="legend-dot pass-dot" />
              Pass Rate
            </span>
          </div>

          {/* ==============================================
              LINE GRAPH
          ============================================== */}

          <div className="trend-chart">
            <div className="trend-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="trend-chart-main">
              <div className="trend-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="trend-area score-area" />
              <div className="trend-area pass-area" />

              <svg
                className="trend-svg"
                viewBox="0 0 700 240"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polyline
                  className="trend-score-line"
                  points={currentData.trend
                    .map((item, index) => {
                      const x =
                        currentData.trend.length === 1
                          ? 350
                          : (index / (currentData.trend.length - 1)) * 660 + 20;

                      const y = 220 - (item.score / 100) * 200;

                      return `${x},${y}`;
                    })
                    .join(" ")}
                />

                <polyline
                  className="trend-pass-line"
                  points={currentData.trend
                    .map((item, index) => {
                      const x =
                        currentData.trend.length === 1
                          ? 350
                          : (index / (currentData.trend.length - 1)) * 660 + 20;

                      const y = 220 - (item.passRate / 100) * 200;

                      return `${x},${y}`;
                    })
                    .join(" ")}
                />

                {currentData.trend.map((item, index) => {
                  const x =
                    currentData.trend.length === 1
                      ? 350
                      : (index / (currentData.trend.length - 1)) * 660 + 20;

                  const scoreY = 220 - (item.score / 100) * 200;

                  const passY = 220 - (item.passRate / 100) * 200;

                  return (
                    <g key={item.label}>
                      <circle
                        className="trend-score-point"
                        cx={x}
                        cy={scoreY}
                        r={activePoint === `${index}-score` ? 6 : 4}
                        onClick={() => setActivePoint(`${index}-score`)}
                      />

                      <circle
                        className="trend-pass-point"
                        cx={x}
                        cy={passY}
                        r={activePoint === `${index}-pass` ? 6 : 4}
                        onClick={() => setActivePoint(`${index}-pass`)}
                      />
                    </g>
                  );
                })}
              </svg>

              {activePoint && (
                <div className="trend-tooltip">
                  <strong>
                    {currentData.trend[Number(activePoint.split("-")[0])].label}
                  </strong>

                  <span>
                    Score:{" "}
                    {currentData.trend[Number(activePoint.split("-")[0])].score}
                    %
                  </span>

                  <span>
                    Pass Rate:{" "}
                    {
                      currentData.trend[Number(activePoint.split("-")[0])]
                        .passRate
                    }
                    %
                  </span>
                </div>
              )}

              <div className="trend-x-axis">
                {currentData.trend.map((item) => (
                  <span key={item.label}>{item.label}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ==================================================
          PERFORMANCE NOTE
      ================================================== */}

      <div className="quiz-performance-note">
        <div className="quiz-performance-note-icon">
          <LuInfo size={15} strokeWidth={1.8} />
        </div>

        <div className="quiz-performance-note-content">
          <strong>Performance insight</strong>

          <span>
            Learner scores are trending upward. Review lower-score attempts to
            identify topics that may need additional practice.
          </span>
        </div>
      </div>
    </section>
  );
};

export default QuizPerformance;
