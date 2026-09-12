import React, { useEffect, useRef, useState } from "react";

import {
  LuBookOpen,
  LuCalendarDays,
  LuChevronDown,
  LuFileText,
  LuSend,
  LuTrendingUp,
  LuUsersRound,
} from "react-icons/lu";

import "./CourseStats.css";

const CourseStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 Days");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const periodRef = useRef(null);

  const periods = ["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"];

  const stats = [
    {
      id: 1,
      title: "Total Courses",
      value: "24",
      change: "+12%",
      description: "+3 from last month",
      icon: LuBookOpen,
      variant: "blue",
      positive: true,
    },
    {
      id: 2,
      title: "Published",
      value: "18",
      change: "+8%",
      description: "+2 from last month",
      icon: LuSend,
      variant: "mint",
      positive: true,
    },
    {
      id: 3,
      title: "Drafts",
      value: "4",
      change: "-20%",
      description: "-1 from last month",
      icon: LuFileText,
      variant: "peach",
      positive: false,
    },
    {
      id: 4,
      title: "Total Learners",
      value: "1,248",
      change: "+18%",
      description: "+192 from last month",
      icon: LuUsersRound,
      variant: "lavender",
      positive: true,
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (periodRef.current && !periodRef.current.contains(event.target)) {
        setShowPeriodMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setShowPeriodMenu(false);
  };

  return (
    <section className="course-stats" aria-labelledby="course-stats-title">
      {/* ==========================================================
          SECTION HEADER
      ========================================================== */}
      <div className="course-stats-header">
        <div className="course-stats-heading">
          <span className="course-stats-eyebrow">COURSE PERFORMANCE</span>

          <h2 id="course-stats-title">Course Overview</h2>

          <p>A quick glance at your course performance and engagement.</p>
        </div>

        {/* ========================================================
            PERIOD SELECTOR
        ======================================================== */}
        <div className="course-period-wrapper" ref={periodRef}>
          <button
            type="button"
            className={`course-period-button ${showPeriodMenu ? "active" : ""}`}
            onClick={() => setShowPeriodMenu((previous) => !previous)}
            aria-expanded={showPeriodMenu}
            aria-haspopup="menu"
          >
            <LuCalendarDays size={15} strokeWidth={1.8} />

            <span>{selectedPeriod}</span>

            <LuChevronDown
              size={14}
              strokeWidth={1.8}
              className={`course-period-chevron ${
                showPeriodMenu ? "rotate" : ""
              }`}
            />
          </button>

          {showPeriodMenu && (
            <div className="course-period-menu" role="menu">
              <div className="course-period-menu-label">Select period</div>

              {periods.map((period) => (
                <button
                  type="button"
                  key={period}
                  className={`course-period-option ${
                    selectedPeriod === period ? "selected" : ""
                  }`}
                  onClick={() => handlePeriodSelect(period)}
                  role="menuitem"
                >
                  <span>{period}</span>

                  {selectedPeriod === period && (
                    <span className="period-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ==========================================================
          STAT CARDS
      ========================================================== */}
      <div className="course-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.id}
              className={`course-stat-card ${stat.variant}`}
            >
              {/* Decorative glass layer */}
              <div className="course-stat-glow" />

              <div className="course-stat-top">
                <div className="course-stat-icon">
                  <Icon size={20} strokeWidth={1.7} />
                </div>

                <span
                  className={`course-stat-change ${
                    stat.positive ? "positive" : "negative"
                  }`}
                >
                  {stat.positive ? (
                    <LuTrendingUp size={12} strokeWidth={2} />
                  ) : (
                    <LuTrendingUp
                      size={12}
                      strokeWidth={2}
                      className="trend-down"
                    />
                  )}

                  <span>{stat.change}</span>
                </span>
              </div>

              <div className="course-stat-content">
                <span className="course-stat-title">{stat.title}</span>

                <strong className="course-stat-value">{stat.value}</strong>

                <span className="course-stat-description">
                  {stat.description}
                </span>
              </div>

              {/* Decorative mini chart */}
              <div className="course-stat-decoration" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default CourseStats;
