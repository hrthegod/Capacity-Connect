import React, { useState } from "react";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiZap,
  FiPlayCircle,
  FiTarget,
  FiTrendingUp,
  FiAward,
  FiChevronRight,
} from "react-icons/fi";

import "./LearningStatistics.css";

const LearningStatistics = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [period, setPeriod] = useState("month");

  const [activeDay, setActiveDay] = useState("Fri");

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = [
    {
      id: "completed",
      title: "Courses Completed",
      value: "8",
      change: "33%",
      message: "Great progress, keep it up!",
      icon: FiBookOpen,
      theme: "blue",
      trend: true,
    },
    {
      id: "progress",
      title: "In Progress",
      value: "4",
      message: "Keep going, you're on track!",
      icon: FiPlayCircle,
      theme: "green",
      arrow: true,
    },
    {
      id: "hours",
      title: "Total Learning Hours",
      value: "48",
      change: "12%",
      message: "Consistency leads to mastery!",
      icon: FiClock,
      theme: "orange",
      trend: true,
    },
    {
      id: "streak",
      title: "Current Streak",
      value: "12 Days",
      message: "Amazing! Keep it going!",
      icon: FiZap,
      theme: "purple",
    },
    {
      id: "quiz",
      title: "Average Quiz Score",
      value: "87%",
      change: "5%",
      message: "You're performing really well!",
      icon: FiTarget,
      theme: "pink",
      trend: true,
    },
    {
      id: "overall",
      title: "Overall Progress",
      value: "68%",
      message: "You're more than halfway there!",
      icon: FiTrendingUp,
      theme: "blue",
      progress: 68,
    },
  ];

  /* =========================================================
     WEEKLY ACTIVITY
  ========================================================= */

  const activityData = [
    {
      day: "Mon",
      completed: 1,
      study: 2,
    },
    {
      day: "Tue",
      completed: 0.5,
      study: 1.6,
    },
    {
      day: "Wed",
      completed: 1,
      study: 2.4,
    },
    {
      day: "Thu",
      completed: 1,
      study: 2.3,
    },
    {
      day: "Fri",
      completed: 1.6,
      study: 3.5,
    },
    {
      day: "Sat",
      completed: 0.4,
      study: 1.2,
    },
    {
      day: "Sun",
      completed: 1.8,
      study: 3.6,
    },
  ];

  /* =========================================================
     CATEGORY DATA
  ========================================================= */

  const categories = [
    {
      name: "Ocean Sciences",
      percentage: 25,
      className: "ocean",
    },
    {
      name: "Climate Change",
      percentage: 20,
      className: "climate",
    },
    {
      name: "Sustainability",
      percentage: 18,
      className: "sustainability",
    },
    {
      name: "Data & AI",
      percentage: 15,
      className: "data",
    },
    {
      name: "Policy & Governance",
      percentage: 12,
      className: "policy",
    },
    {
      name: "Others",
      percentage: 10,
      className: "others",
    },
  ];

  /* =========================================================
     ACHIEVEMENTS
  ========================================================= */

  const achievements = [
    {
      id: 1,
      title: "Quick Learner",
      description: "Completed 5 courses",
      icon: FiZap,
      theme: "gold",
    },
    {
      id: 2,
      title: "Consistency Champ",
      description: "7-day learning streak",
      icon: FiCalendar,
      theme: "green",
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Scored 90%+ in a quiz",
      icon: FiAward,
      theme: "purple",
    },
  ];

  /* =========================================================
     PERIOD LABEL
  ========================================================= */

  const periodLabel = {
    month: "This Month",
    year: "This Year",
    all: "All Time",
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="learning-statistics">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="learning-statistics__header">
        <div className="learning-statistics__heading">
          <div className="learning-statistics__heading-icon">
            <FiBarChart2 aria-hidden="true" />
          </div>

          <div>
            <h2>Learning Statistics</h2>

            <p>Track your learning performance and see your growth</p>
          </div>
        </div>

        <div className="learning-statistics__header-actions">
          {/* Period selector */}

          <div
            className="learning-statistics__period"
            role="tablist"
            aria-label="Statistics period"
          >
            {Object.entries(periodLabel).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={period === key}
                className={period === key ? "is-active" : ""}
                onClick={() => setPeriod(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Calendar */}

          <button
            type="button"
            className="learning-statistics__calendar-button"
            aria-label="Select date"
          >
            <FiCalendar aria-hidden="true" />
          </button>
        </div>

        {/* Handwritten decoration */}

        <div className="learning-statistics__header-note">
          <span>Progress</span>
          <span>Builds</span>
          <span>Possibilities</span>

          <svg viewBox="0 0 100 45" aria-hidden="true">
            <path
              d="M4 34C27 38 59 25 94 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M80 5L94 5L87 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </header>

      {/* =====================================================
          STATISTICS GRID
      ===================================================== */}

      <div className="learning-statistics__stats-grid">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.id}
              className={`learning-statistics__stat-card learning-statistics__stat-card--${stat.theme}`}
            >
              <div className="learning-statistics__stat-top">
                <div className="learning-statistics__stat-icon">
                  <Icon aria-hidden="true" />
                </div>

                {stat.arrow && (
                  <FiChevronRight
                    className="learning-statistics__stat-arrow"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="learning-statistics__stat-content">
                <span className="learning-statistics__stat-title">
                  {stat.title}
                </span>

                <div className="learning-statistics__stat-value-row">
                  <strong>{stat.value}</strong>

                  {stat.change && (
                    <span className="learning-statistics__trend">
                      <FiTrendingUp aria-hidden="true" />
                      {stat.change}
                    </span>
                  )}
                </div>

                {stat.progress !== undefined && (
                  <div className="learning-statistics__progress">
                    <div
                      className="learning-statistics__progress-fill"
                      style={{
                        width: `${stat.progress}%`,
                      }}
                    />
                  </div>
                )}

                <p>{stat.message}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* =====================================================
          LEARNING GOAL
      ===================================================== */}

      <article className="learning-statistics__goal">
        <div className="learning-statistics__goal-decoration">
          <span />
          <span />
          <span />
        </div>

        <div className="learning-statistics__goal-icon">
          <FiAward aria-hidden="true" />
        </div>

        <div className="learning-statistics__goal-content">
          <span className="learning-statistics__goal-label">Learning Goal</span>

          <h3>Complete 10 more courses to reach your next milestone</h3>

          <div className="learning-statistics__goal-progress">
            <div className="learning-statistics__goal-progress-track">
              <div
                className="learning-statistics__goal-progress-fill"
                style={{ width: "44%" }}
              />
            </div>

            <span>8 / 18</span>
          </div>
        </div>

        <button
          type="button"
          className="learning-statistics__goal-button"
          onClick={() => window.alert("Learning goals will open here.")}
        >
          <span>View Goals</span>
          <FiArrowRight aria-hidden="true" />
        </button>
      </article>

      {/* =====================================================
          ANALYTICS GRID
      ===================================================== */}

      <div className="learning-statistics__analytics">
        {/* ===================================================
            LEARNING ACTIVITY
        =================================================== */}

        <article className="learning-statistics__activity-card">
          <div className="learning-statistics__card-header">
            <div className="learning-statistics__card-heading">
              <div className="learning-statistics__small-icon learning-statistics__small-icon--blue">
                <FiBarChart2 aria-hidden="true" />
              </div>

              <div>
                <h3>Learning Activity</h3>

                <p>Your learning activity over the last 7 days</p>
              </div>
            </div>

            <div className="learning-statistics__legend">
              <span>
                <i className="learning-statistics__legend-dot learning-statistics__legend-dot--dark" />
                Completed
              </span>

              <span>
                <i className="learning-statistics__legend-dot learning-statistics__legend-dot--light" />
                Study Time (hrs)
              </span>
            </div>
          </div>

          <div className="learning-statistics__chart">
            <div className="learning-statistics__y-axis">
              <span>5</span>
              <span>4</span>
              <span>3</span>
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>

            <div className="learning-statistics__chart-area">
              <div className="learning-statistics__grid-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="learning-statistics__bars">
                {activityData.map((item) => {
                  const isActive = activeDay === item.day;

                  return (
                    <button
                      type="button"
                      key={item.day}
                      className={`learning-statistics__bar-group ${
                        isActive ? "is-active" : ""
                      }`}
                      onClick={() => setActiveDay(item.day)}
                      aria-label={`${item.day}: ${item.study} study hours`}
                    >
                      {isActive && (
                        <div className="learning-statistics__tooltip">
                          <strong>
                            {item.day === "Fri"
                              ? "4 sessions"
                              : `${Math.round(item.study)} sessions`}
                          </strong>

                          <span>{item.study} hrs</span>
                        </div>
                      )}

                      <div className="learning-statistics__bar">
                        <span
                          className="learning-statistics__bar-light"
                          style={{
                            height: `${item.study * 19}%`,
                          }}
                        />

                        <span
                          className="learning-statistics__bar-dark"
                          style={{
                            height: `${item.completed * 17}%`,
                          }}
                        />
                      </div>

                      <span className="learning-statistics__bar-label">
                        {item.day}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </article>

        {/* ===================================================
            CATEGORY DISTRIBUTION
        =================================================== */}

        <article className="learning-statistics__category-card">
          <div className="learning-statistics__card-header">
            <div className="learning-statistics__card-heading">
              <div className="learning-statistics__small-icon learning-statistics__small-icon--cyan">
                <FiCompass aria-hidden="true" />
              </div>

              <div>
                <h3>Course Category Distribution</h3>
              </div>
            </div>
          </div>

          <div className="learning-statistics__category-content">
            <div className="learning-statistics__donut">
              <div className="learning-statistics__donut-ring">
                <div className="learning-statistics__donut-center">
                  <strong>12</strong>
                  <span>Courses</span>
                </div>
              </div>
            </div>

            <div className="learning-statistics__category-list">
              {categories.map((category) => (
                <div
                  className="learning-statistics__category-row"
                  key={category.name}
                >
                  <span className="learning-statistics__category-name">
                    <i
                      className={`learning-statistics__category-dot learning-statistics__category-dot--${category.className}`}
                    />
                    {category.name}
                  </span>

                  <strong>{category.percentage}%</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* ===================================================
            ACHIEVEMENTS
        =================================================== */}

        <article className="learning-statistics__achievements-card">
          <div className="learning-statistics__achievements-header">
            <div className="learning-statistics__card-heading">
              <div className="learning-statistics__small-icon learning-statistics__small-icon--gold">
                <FiAward aria-hidden="true" />
              </div>

              <div>
                <h3>Achievements</h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.alert("All achievements will open here.")}
            >
              View All
            </button>
          </div>

          <div className="learning-statistics__achievement-list">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <button
                  type="button"
                  className="learning-statistics__achievement"
                  key={achievement.id}
                  onClick={() =>
                    window.alert(
                      `${achievement.title}: ${achievement.description}`,
                    )
                  }
                >
                  <span
                    className={`learning-statistics__achievement-icon learning-statistics__achievement-icon--${achievement.theme}`}
                  >
                    <Icon aria-hidden="true" />
                  </span>

                  <span className="learning-statistics__achievement-info">
                    <strong>{achievement.title}</strong>
                    <small>{achievement.description}</small>
                  </span>

                  <FiChevronRight aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </article>
      </div>

      {/* =====================================================
          MOTIVATIONAL FOOTER
      ===================================================== */}

      <article className="learning-statistics__motivation">
        <div className="learning-statistics__motivation-icon">
          <span>◒</span>
        </div>

        <div className="learning-statistics__motivation-content">
          <h3>Keep Learning, Keep Growing</h3>

          <p>
            “Every course you complete is a step towards a better, brighter
            future.”
          </p>
        </div>

        <div className="learning-statistics__motivation-scene">
          <div className="learning-statistics__sun" />

          <div className="learning-statistics__hill learning-statistics__hill--back" />
          <div className="learning-statistics__hill learning-statistics__hill--front" />

          <div className="learning-statistics__lighthouse">
            <span className="learning-statistics__lighthouse-light" />
            <span className="learning-statistics__lighthouse-body" />
            <span className="learning-statistics__lighthouse-top" />
          </div>

          <div className="learning-statistics__water">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="learning-statistics__motivation-note">
          <span>Small</span>
          <span>Steps</span>
          <span>Big Impact</span>

          <svg viewBox="0 0 80 35" aria-hidden="true">
            <path
              d="M3 26C25 31 48 20 76 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </article>
    </section>
  );
};

export default LearningStatistics;
