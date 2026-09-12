import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiClock,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

import "./ProfileOverview.css";

const ProfileOverview = () => {
  const navigate = useNavigate();

  const [activePeriod, setActivePeriod] = useState("month");

  const overviewData = {
    month: {
      enrolled: {
        value: 12,
        growth: "+20%",
        message: "You're exploring new opportunities!",
        action: "View My Learning",
        path: "/learner/learning",
        chart: [28, 22, 31, 25, 40, 34, 48],
      },

      completed: {
        value: 8,
        growth: "+33%",
        message: "Great progress, keep it up!",
        action: "View Completed Courses",
        path: "/learner/learning?status=completed",
        chart: [20, 26, 31, 36, 42, 48, 55],
      },

      hours: {
        value: 48,
        growth: "+12%",
        message: "Consistency leads to mastery!",
        action: "View Learning Activity",
        path: "/learner/learning",
        chart: [25, 42, 29, 49, 36, 44, 57],
      },

      certificates: {
        value: 6,
        growth: "+50%",
        message: "You're building a stronger future!",
        action: "View Certificates",
        path: "/learner/certificates",
        chart: [1, 2, 2, 3],
      },
    },

    year: {
      enrolled: {
        value: 18,
        growth: "+32%",
        message: "You've discovered more learning opportunities!",
        action: "View My Learning",
        path: "/learner/learning",
        chart: [25, 31, 27, 38, 35, 46, 55],
      },

      completed: {
        value: 12,
        growth: "+41%",
        message: "Your learning consistency is paying off!",
        action: "View Completed Courses",
        path: "/learner/learning?status=completed",
        chart: [24, 29, 38, 35, 45, 52, 61],
      },

      hours: {
        value: 126,
        growth: "+28%",
        message: "Your commitment is creating real progress!",
        action: "View Learning Activity",
        path: "/learner/learning",
        chart: [31, 44, 37, 51, 46, 58, 68],
      },

      certificates: {
        value: 9,
        growth: "+63%",
        message: "Your achievements are stacking up!",
        action: "View Certificates",
        path: "/learner/certificates",
        chart: [2, 3, 4, 5],
      },
    },

    all: {
      enrolled: {
        value: 24,
        growth: "+48%",
        message: "You're continuously expanding your knowledge!",
        action: "View My Learning",
        path: "/learner/learning",
        chart: [27, 35, 31, 45, 41, 52, 63],
      },

      completed: {
        value: 16,
        growth: "+57%",
        message: "You've made impressive learning progress!",
        action: "View Completed Courses",
        path: "/learner/learning?status=completed",
        chart: [28, 34, 42, 40, 51, 59, 68],
      },

      hours: {
        value: 214,
        growth: "+46%",
        message: "Your learning habit is becoming a strength!",
        action: "View Learning Activity",
        path: "/learner/learning",
        chart: [34, 48, 42, 55, 49, 64, 73],
      },

      certificates: {
        value: 14,
        growth: "+82%",
        message: "You're building a powerful learning portfolio!",
        action: "View Certificates",
        path: "/learner/certificates",
        chart: [3, 5, 7, 9],
      },
    },
  };

  const currentData = useMemo(() => overviewData[activePeriod], [activePeriod]);

  const periods = [
    {
      id: "month",
      label: "This Month",
    },
    {
      id: "year",
      label: "This Year",
    },
    {
      id: "all",
      label: "All Time",
    },
  ];

  const handleAction = (path) => {
    navigate(path);
  };

  return (
    <section className="profile-overview">
      {/* =========================================================
          OVERVIEW HEADER
      ========================================================= */}

      <div className="profile-overview__header">
        <div className="profile-overview__heading">
          <div className="profile-overview__heading-icon">
            <FiBarChart2 aria-hidden="true" />
          </div>

          <div className="profile-overview__heading-content">
            <h2>Overview</h2>

            <p>A quick snapshot of your learning journey</p>
          </div>
        </div>

        {/* =======================================================
            PERIOD FILTER
        ======================================================= */}

        <div
          className="profile-overview__period-filter"
          role="tablist"
          aria-label="Learning overview period"
        >
          {periods.map((period) => (
            <button
              key={period.id}
              type="button"
              role="tab"
              aria-selected={activePeriod === period.id}
              className={`profile-overview__period-button ${
                activePeriod === period.id ? "is-active" : ""
              }`}
              onClick={() => setActivePeriod(period.id)}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* =======================================================
            MOTIVATIONAL NOTE
        ======================================================= */}

        <div className="profile-overview__motivation">
          <span>Keep</span>
          <span>Learning</span>
          <span>Keep Growing</span>

          <svg
            className="profile-overview__motivation-line"
            viewBox="0 0 100 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 15C23 21 50 19 73 12C83 9 91 5 98 2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* =========================================================
          STAT CARDS
      ========================================================= */}

      <div className="profile-overview__grid">
        {/* =======================================================
            COURSES ENROLLED
        ======================================================= */}

        <article className="profile-overview__card profile-overview__card--blue">
          <div className="profile-overview__card-top">
            <div className="profile-overview__icon">
              <FiBookOpen aria-hidden="true" />
            </div>

            <div className="profile-overview__card-title">
              <h3>Courses Enrolled</h3>
              <strong>{currentData.enrolled.value}</strong>
            </div>

            <span className="profile-overview__growth">
              <FiTrendingUp aria-hidden="true" />
              {currentData.enrolled.growth}
            </span>
          </div>

          <p className="profile-overview__message">
            {currentData.enrolled.message}
          </p>

          <div className="profile-overview__chart profile-overview__chart--line">
            <svg
              viewBox="0 0 420 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="profileBlueArea"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="rgba(47, 143, 232, 0.22)" />
                  <stop offset="100%" stopColor="rgba(47, 143, 232, 0)" />
                </linearGradient>
              </defs>

              <path
                className="profile-overview__chart-area"
                d="M0 74 C42 45 69 77 105 72 C151 66 165 27 207 35 C250 43 258 69 294 63 C333 56 349 32 375 30 C394 28 406 17 420 10 L420 100 L0 100 Z"
              />

              <path
                className="profile-overview__chart-line"
                d="M0 74 C42 45 69 77 105 72 C151 66 165 27 207 35 C250 43 258 69 294 63 C333 56 349 32 375 30 C394 28 406 17 420 10"
              />

              <circle
                className="profile-overview__chart-point"
                cx="420"
                cy="10"
                r="6"
              />
            </svg>
          </div>

          <button
            type="button"
            className="profile-overview__action profile-overview__action--blue"
            onClick={() => handleAction(currentData.enrolled.path)}
          >
            <span>{currentData.enrolled.action}</span>
            <FiArrowRight aria-hidden="true" />
          </button>
        </article>

        {/* =======================================================
            COURSES COMPLETED — DARK NAVY CARD
        ======================================================= */}

        <article className="profile-overview__card profile-overview__card--navy">
          <div className="profile-overview__card-top">
            <div className="profile-overview__icon">
              <FiCheck aria-hidden="true" />
            </div>

            <div className="profile-overview__card-title">
              <h3>Courses Completed</h3>
              <strong>{currentData.completed.value}</strong>
            </div>

            <span className="profile-overview__growth">
              <FiTrendingUp aria-hidden="true" />
              {currentData.completed.growth}
            </span>
          </div>

          <p className="profile-overview__message">
            {currentData.completed.message}
          </p>

          <div className="profile-overview__chart profile-overview__chart--bars">
            {currentData.completed.chart.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="profile-overview__bar"
                style={{
                  height: `${height}%`,
                  animationDelay: `${index * 45}ms`,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="profile-overview__action profile-overview__action--navy"
            onClick={() => handleAction(currentData.completed.path)}
          >
            <span>{currentData.completed.action}</span>
            <FiArrowRight aria-hidden="true" />
          </button>

          <div className="profile-overview__navy-decoration">
            <div />
            <div />
          </div>
        </article>

        {/* =======================================================
            LEARNING HOURS
        ======================================================= */}

        <article className="profile-overview__card profile-overview__card--orange">
          <div className="profile-overview__card-top">
            <div className="profile-overview__icon">
              <FiClock aria-hidden="true" />
            </div>

            <div className="profile-overview__card-title">
              <h3>Learning Hours</h3>
              <strong>{currentData.hours.value}</strong>
            </div>

            <span className="profile-overview__growth">
              <FiTrendingUp aria-hidden="true" />
              {currentData.hours.growth}
            </span>
          </div>

          <p className="profile-overview__message">
            {currentData.hours.message}
          </p>

          <div className="profile-overview__chart profile-overview__chart--orange-line">
            <svg
              viewBox="0 0 420 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="profileOrangeArea"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="rgba(238, 129, 27, 0.18)" />
                  <stop offset="100%" stopColor="rgba(238, 129, 27, 0)" />
                </linearGradient>
              </defs>

              <path
                className="profile-overview__chart-area"
                d="M0 78 C37 42 61 27 96 42 C133 58 137 75 174 67 C211 59 222 26 254 22 C287 17 302 56 334 57 C365 58 387 29 420 10 L420 100 L0 100 Z"
              />

              <path
                className="profile-overview__chart-line"
                d="M0 78 C37 42 61 27 96 42 C133 58 137 75 174 67 C211 59 222 26 254 22 C287 17 302 56 334 57 C365 58 387 29 420 10"
              />

              <circle
                className="profile-overview__chart-point"
                cx="420"
                cy="10"
                r="6"
              />
            </svg>
          </div>

          <button
            type="button"
            className="profile-overview__action profile-overview__action--orange"
            onClick={() => handleAction(currentData.hours.path)}
          >
            <span>{currentData.hours.action}</span>
            <FiArrowRight aria-hidden="true" />
          </button>
        </article>

        {/* =======================================================
            CERTIFICATES
        ======================================================= */}

        <article className="profile-overview__card profile-overview__card--purple">
          <div className="profile-overview__card-top">
            <div className="profile-overview__icon">
              <FiAward aria-hidden="true" />
            </div>

            <div className="profile-overview__card-title">
              <h3>Certificates Earned</h3>
              <strong>{currentData.certificates.value}</strong>
            </div>

            <span className="profile-overview__growth">
              <FiTrendingUp aria-hidden="true" />
              {currentData.certificates.growth}
            </span>
          </div>

          <p className="profile-overview__message">
            {currentData.certificates.message}
          </p>

          <div className="profile-overview__achievement-icons">
            <span>
              <FiAward aria-hidden="true" />
            </span>

            <span>
              <FiAward aria-hidden="true" />
            </span>

            <span>
              <FiAward aria-hidden="true" />
            </span>

            <span>
              <FiAward aria-hidden="true" />
            </span>
          </div>

          <button
            type="button"
            className="profile-overview__action profile-overview__action--purple"
            onClick={() => handleAction(currentData.certificates.path)}
          >
            <span>{currentData.certificates.action}</span>
            <FiArrowRight aria-hidden="true" />
          </button>

          <div className="profile-overview__purple-decoration">
            <FiAward aria-hidden="true" />
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProfileOverview;
