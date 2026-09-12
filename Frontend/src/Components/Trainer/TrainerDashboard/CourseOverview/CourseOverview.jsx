import React from "react";

import {
  LuGraduationCap,
  LuLayers3,
  LuUsersRound,
  LuClock3,
  LuFileCheck2,
  LuArrowUpRight,
  LuArrowRight,
  LuChevronDown,
  LuChartNoAxesCombined,
  LuMonitor,
  LuBookOpen,
  LuPalette,
  LuDatabase,
} from "react-icons/lu";

import "./CourseOverview.css";

// =====================================================
// COURSE SUMMARY DATA
// =====================================================

const courseStats = [
  {
    id: 1,
    title: "Total Courses",
    value: "8",
    note: "+2 from last month",
    icon: LuLayers3,
    className: "course-stat-blue",
  },
  {
    id: 2,
    title: "Active Courses",
    value: "5",
    note: "+1 from last month",
    icon: LuUsersRound,
    className: "course-stat-green",
  },
  {
    id: 3,
    title: "Upcoming Courses",
    value: "2",
    note: "Starting this month",
    icon: LuClock3,
    className: "course-stat-orange",
  },
  {
    id: 4,
    title: "Completed Courses",
    value: "1",
    note: "12% completion rate",
    icon: LuFileCheck2,
    className: "course-stat-purple",
  },
];

// =====================================================
// RECENT COURSE DATA
// =====================================================

const recentCourses = [
  {
    id: 1,
    title: "React for Beginners",
    learners: "42 learners",
    progress: 80,
    icon: LuMonitor,
    className: "recent-course-blue",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    learners: "36 learners",
    progress: 65,
    icon: LuBookOpen,
    className: "recent-course-green",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    learners: "28 learners",
    progress: 40,
    icon: LuPalette,
    className: "recent-course-purple",
  },
  {
    id: 4,
    title: "Database Management",
    learners: "19 learners",
    progress: 20,
    icon: LuDatabase,
    className: "recent-course-orange",
  },
];

// =====================================================
// COURSE OVERVIEW
// =====================================================

const CourseOverview = ({ courses = [] }) => {
  const totalCourses = courses.length;

  const dynamicCourseStats = [
    {
      id: 1,
      title: "Total Courses",
      value: String(totalCourses),
      note: "total active courses",
      icon: LuLayers3,
      className: "course-stat-blue",
    },
    {
      id: 2,
      title: "Active Courses",
      value: String(totalCourses),
      note: "currently running",
      icon: LuUsersRound,
      className: "course-stat-green",
    },
    {
      id: 3,
      title: "Upcoming Courses",
      value: "0",
      note: "planned courses",
      icon: LuClock3,
      className: "course-stat-orange",
    },
    {
      id: 4,
      title: "Completed Courses",
      value: "0",
      note: "completed batches",
      icon: LuFileCheck2,
      className: "course-stat-purple",
    },
  ];

  return (
    <section className="trainer-course-overview">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="course-overview-header">
        <div className="course-overview-heading">
          <div className="course-overview-title-icon">
            <LuGraduationCap />
          </div>

          <div className="course-overview-heading-text">
            <h2>Course Overview</h2>

            <p>Summary of your courses and their current status</p>
          </div>
        </div>

        <button type="button" className="course-overview-view-button">
          <span>View All Courses</span>
          <LuArrowRight />
        </button>
      </div>

      {/* =================================================
          COURSE STAT CARDS
      ================================================= */}

      <div className="course-overview-stats">
        {dynamicCourseStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.id}
              className={`course-stat-card ${stat.className}`}
            >
              <div className="course-stat-icon">
                <Icon />
              </div>

              <div className="course-stat-content">
                <p className="course-stat-title">{stat.title}</p>

                <div className="course-stat-value-row">
                  <h3>{stat.value}</h3>
                </div>

                <div className="course-stat-note">
                  {stat.id <= 2 ? <LuArrowUpRight /> : <LuClock3 />}

                  <span>{stat.note}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* =================================================
          LOWER OVERVIEW
      ================================================= */}

      <div className="course-overview-lower">
        {/* =================================================
            COURSE ENGAGEMENT
        ================================================= */}

        <article className="course-engagement-card">
          <div className="course-engagement-header">
            <div className="course-engagement-title">
              <div className="course-engagement-icon">
                <LuChartNoAxesCombined />
              </div>

              <div>
                <h3>Course Engagement</h3>

                <p>Learner engagement across your courses</p>
              </div>
            </div>

            <button type="button" className="course-period-button">
              <span>Last 6 Months</span>
              <LuChevronDown />
            </button>
          </div>

          {/* =================================================
              CHART
          ================================================= */}

          <div className="course-engagement-chart">
            <div className="course-chart-y-axis">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            <div className="course-chart-area">
              <div className="course-chart-grid-line line-1" />
              <div className="course-chart-grid-line line-2" />
              <div className="course-chart-grid-line line-3" />
              <div className="course-chart-grid-line line-4" />
              <div className="course-chart-grid-line line-5" />

              <svg
                className="course-chart-svg"
                viewBox="0 0 600 210"
                preserveAspectRatio="none"
                aria-label="Course engagement chart"
              >
                <defs>
                  <linearGradient
                    id="courseChartFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3ba7f5" stopOpacity="0.28" />

                    <stop offset="100%" stopColor="#3ba7f5" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* AREA */}

                <path
                  className="course-chart-area-fill"
                  d="
                    M 0 168
                    C 70 148, 75 143, 120 140
                    C 170 135, 190 126, 240 112
                    C 290 98, 320 87, 360 92
                    C 410 99, 430 108, 470 92
                    C 520 72, 550 62, 600 48
                    L 600 210
                    L 0 210
                    Z
                  "
                />

                {/* LINE */}

                <path
                  className="course-chart-line"
                  d="
                    M 0 168
                    C 70 148, 75 143, 120 140
                    C 170 135, 190 126, 240 112
                    C 290 98, 320 87, 360 92
                    C 410 99, 430 108, 470 92
                    C 520 72, 550 62, 600 48
                  "
                />

                {/* POINTS */}

                <circle className="course-chart-point" cx="0" cy="168" r="5" />

                <circle
                  className="course-chart-point"
                  cx="120"
                  cy="140"
                  r="5"
                />

                <circle
                  className="course-chart-point"
                  cx="240"
                  cy="112"
                  r="5"
                />

                <circle className="course-chart-point" cx="360" cy="92" r="5" />

                <circle className="course-chart-point" cx="470" cy="92" r="5" />

                <circle className="course-chart-point" cx="600" cy="48" r="5" />
              </svg>

              {/* TOOLTIP */}

              <div className="course-chart-tooltip">
                <span>Jun 2026</span>

                <strong>
                  <i />
                  78%
                </strong>
              </div>

              {/* MONTHS */}

              <div className="course-chart-months">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </article>

        {/* =================================================
            RECENT COURSES
        ================================================= */}

        <article className="recent-courses-card">
          <div className="recent-courses-header">
            <div className="recent-courses-heading">
              <div className="recent-courses-icon">
                <LuClock3 />
              </div>

              <div>
                <h3>Recent Courses</h3>

                <p>Your most recently updated courses</p>
              </div>
            </div>

            <button type="button" className="recent-courses-view-button">
              <span>View All</span>
              <LuArrowRight />
            </button>
          </div>

          {/* =================================================
              COURSE LIST
          ================================================= */}

          <div className="recent-courses-list">
            {(courses.length > 0 ? courses : []).slice(0, 5).map((course, idx) => {
              const Icon = course.icon || LuBookOpen;
              const title = course.title || "Course";
              const studentCount = course.student_count ?? course.students_count ?? (idx === 0 ? 1 : 0);
              const colorClasses = ["recent-course-blue", "recent-course-green", "recent-course-purple", "recent-course-orange"];
              const colorClass = colorClasses[idx % colorClasses.length];

              return (
                <div key={course.id || idx} className="recent-course-item">
                  <div className={`recent-course-icon ${colorClass}`}>
                    <Icon />
                  </div>

                  <div className="recent-course-info">
                    <h4>{title}</h4>

                    <div className="recent-course-learners">
                      <LuUsersRound />
                      <span>{studentCount} learner{studentCount === 1 ? "" : "s"}</span>
                    </div>
                  </div>

                  <div className="recent-course-progress">
                    <div className="recent-course-progress-track">
                      <span
                        style={{
                          width: `100%`,
                        }}
                      />
                    </div>

                    <strong>Active</strong>
                  </div>

                  <button
                    type="button"
                    className="recent-course-arrow"
                    aria-label={`Open ${title}`}
                  >
                    <LuArrowRight />
                  </button>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
};

export default CourseOverview;
