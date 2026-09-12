import React from "react";


import {
  LuUsersRound,
  LuBookOpen,
  LuClipboardCheck,
  LuChartNoAxesCombined,
  LuArrowUpRight,
  LuChevronRight,
  LuEllipsis,
  LuFileText,
  LuClock3,
} from "react-icons/lu";

import "./StatsCards.css";

const statsData = [
  {
    id: 1,
    title: "Total Learners",
    value: "248",
    growth: "12%",
    comparison: "vs last month",
    icon: LuUsersRound,
    bottomIcon: LuUsersRound,
    bottomTitle: "New learners",
    bottomText: "this month",
    badge: "+12",
    theme: "blue",
    chart: "line",
  },
  {
    id: 2,
    title: "Active Courses",
    value: "12",
    growth: "8%",
    comparison: "vs last month",
    icon: LuBookOpen,
    bottomIcon: LuFileText,
    bottomTitle: "2 new courses",
    bottomText: "added this month",
    theme: "green",
    chart: "line",
  },
  {
    id: 3,
    title: "Pending Tasks",
    value: "5",
    growth: "20%",
    comparison: "vs last week",
    icon: LuClipboardCheck,
    bottomIcon: LuClock3,
    bottomTitle: "3 due this week",
    bottomText: "Stay on track",
    theme: "orange",
    chart: "bars",
  },
  {
    id: 4,
    title: "Avg. Performance",
    value: "87%",
    growth: "5%",
    comparison: "vs last month",
    icon: LuChartNoAxesCombined,
    bottomIcon: LuChartNoAxesCombined,
    bottomTitle: "Performing well",
    bottomText: "Keep up the great work!",
    theme: "navy",
    chart: "circle",
  },
];

const MiniLineChart = ({ theme }) => {
  return (
    <div className={`stats-line-chart ${theme}`}>
      <svg viewBox="0 0 150 65" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient
            id={`statsGradient-${theme}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopOpacity="0.18" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="stats-chart-area"
          d="M2 55
             C15 42, 19 48, 31 45
             C43 42, 47 51, 58 38
             C69 25, 77 35, 88 25
             C98 16, 106 28, 116 18
             C126 8, 135 18, 148 5
             L148 65
             L2 65 Z"
          fill={`url(#statsGradient-${theme})`}
        />

        <path
          className="stats-chart-line"
          d="M2 55
             C15 42, 19 48, 31 45
             C43 42, 47 51, 58 38
             C69 25, 77 35, 88 25
             C98 16, 106 28, 116 18
             C126 8, 135 18, 148 5"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <circle className="stats-chart-point" cx="148" cy="5" r="4.5" />
      </svg>
    </div>
  );
};

const MiniBarChart = () => {
  const bars = [18, 27, 36, 46, 58];

  return (
    <div className="stats-bar-chart">
      {bars.map((height, index) => (
        <span
          key={index}
          className="stats-bar"
          style={{ height: `${height}px` }}
        ></span>
      ))}
    </div>
  );
};

const PerformanceCircle = () => {
  return (
    <div className="stats-performance-circle">
      <div className="stats-performance-inner">
        <span>87%</span>
      </div>
    </div>
  );
};

const LearnerAvatars = () => {
  return (
    <div className="stats-learner-avatars">
      <div className="stats-avatar stats-avatar-one">A</div>
      <div className="stats-avatar stats-avatar-two">S</div>
      <div className="stats-avatar stats-avatar-three">R</div>
      <span className="stats-avatar-count">+12</span>
    </div>
  );
};

const StatsCard = ({ item }) => {
  const Icon = item.icon;
  const BottomIcon = item.bottomIcon;

  return (
    <article className={`stats-card stats-card-${item.theme}`}>
      {/* =====================================================
          CARD TOP
      ===================================================== */}

      <div className="stats-card-top">
        <div className="stats-card-icon">
          <Icon />
        </div>

        <button
          type="button"
          className="stats-card-menu"
          aria-label={`More options for ${item.title}`}
        >
          <LuEllipsis />
        </button>
      </div>

      {/* =====================================================
          CARD MAIN
      ===================================================== */}

      <div className="stats-card-main">
        <p className="stats-card-title">{item.title}</p>

        <div className="stats-card-value-row">
          <h3 className="stats-card-value">{item.value}</h3>

          {item.chart === "line" && <MiniLineChart theme={item.theme} />}

          {item.chart === "bars" && <MiniBarChart />}

          {item.chart === "circle" && <PerformanceCircle />}
        </div>

        <div className="stats-card-growth">
          <LuArrowUpRight />

          <span>{item.growth}</span>

          <small>{item.comparison}</small>
        </div>
      </div>

      {/* =====================================================
          CARD BOTTOM
      ===================================================== */}

      <div className="stats-card-divider"></div>

      <div className="stats-card-bottom">
        {item.theme === "blue" ? (
          <LearnerAvatars />
        ) : (
          <div className="stats-bottom-icon">
            <BottomIcon />
          </div>
        )}

        <div className="stats-bottom-content">
          <strong>{item.bottomTitle}</strong>

          <span>{item.bottomText}</span>
        </div>

        <button
          type="button"
          className="stats-card-arrow"
          aria-label={`View ${item.title}`}
        >
          <LuChevronRight />
        </button>
      </div>
    </article>
  );
};

const StatsCards = ({ totalLearners = 0, activeCourses = 0, quizzesCount = 0, avgPerformance = 0 }) => {
  const dynamicStatsData = [
    {
      id: 1,
      title: "Total Learners",
      value: String(totalLearners),
      growth: "+0%",
      comparison: "enrolled",
      icon: LuUsersRound,
      bottomIcon: LuUsersRound,
      bottomTitle: "Unique learners",
      bottomText: "in your courses",
      theme: "blue",
      chart: "line",
    },
    {
      id: 2,
      title: "Active Courses",
      value: String(activeCourses),
      growth: "+0%",
      comparison: "total",
      icon: LuBookOpen,
      bottomIcon: LuFileText,
      bottomTitle: `${activeCourses} courses`,
      bottomText: "MOES / platform courses",
      theme: "green",
      chart: "line",
    },
    {
      id: 3,
      title: "Quizzes",
      value: String(quizzesCount),
      growth: "+0%",
      comparison: "total",
      icon: LuClipboardCheck,
      bottomIcon: LuClock3,
      bottomTitle: `${quizzesCount} quizzes`,
      bottomText: "created",
      theme: "orange",
      chart: "bars",
    },
    {
      id: 4,
      title: "Avg. Performance",
      value: `${avgPerformance}%`,
      growth: "+0%",
      comparison: "score",
      icon: LuChartNoAxesCombined,
      bottomIcon: LuChartNoAxesCombined,
      bottomTitle: "Overall performance",
      bottomText: "based on evaluations",
      theme: "navy",
      chart: "circle",
    },
  ];

  return (
    <section className="trainer-stats-section">
      <div className="trainer-stats-grid">
        {dynamicStatsData.map((item) => (
          <StatsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default StatsCards;
