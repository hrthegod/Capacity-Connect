import React from "react";

import {
  LuUsersRound,
  LuArrowUpRight,
  LuTrendingUp,
  LuTriangleAlert,
  LuGraduationCap,
  LuLightbulb,
  LuClock3,
  LuEllipsis,
  LuChevronDown,
  LuArrowRight,
} from "react-icons/lu";

import "./LearnerOverview.css";

// =====================================================
// LEARNER OVERVIEW
// =====================================================

const LearnerOverview = () => {
  // ===================================================
  // STAT CARDS
  // ===================================================

  const stats = [
    {
      title: "Total Learners",
      value: "248",
      growth: "12%",
      icon: LuUsersRound,
      type: "blue",
    },
    {
      title: "Active Learners",
      value: "216",
      growth: "8%",
      icon: LuUsersRound,
      type: "green",
    },
    {
      title: "At Risk Learners",
      value: "12",
      growth: "2%",
      icon: LuTriangleAlert,
      type: "orange",
      negative: true,
    },
    {
      title: "Completed Learners",
      value: "94",
      growth: "18%",
      icon: LuGraduationCap,
      type: "purple",
    },
  ];

  // ===================================================
  // RECENT LEARNERS
  // ===================================================

  const learners = [
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      initials: "SJ",
      avatar: "https://i.pravatar.cc/80?img=47",
      progress: 80,
      active: "2 hours ago",
      status: "Active",
      statusType: "active",
    },
    {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      initials: "MC",
      avatar: "https://i.pravatar.cc/80?img=12",
      progress: 45,
      active: "1 day ago",
      status: "At Risk",
      statusType: "risk",
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      initials: "ED",
      avatar: "https://i.pravatar.cc/80?img=44",
      progress: 100,
      active: "3 hours ago",
      status: "Completed",
      statusType: "completed",
    },
    {
      name: "James Wilson",
      email: "james.wilson@example.com",
      initials: "JW",
      avatar: "https://i.pravatar.cc/80?img=11",
      progress: 20,
      active: "2 days ago",
      status: "Inactive",
      statusType: "inactive",
    },
  ];

  return (
    <section className="trainer-learner-overview">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="learner-overview-header">
        <div className="learner-overview-heading">
          <div className="learner-overview-title-icon">
            <LuUsersRound />
          </div>

          <div className="learner-overview-heading-text">
            <h2>Learner Overview</h2>

            <p>A quick snapshot of your learners and their progress.</p>
          </div>
        </div>

        <button type="button" className="learner-overview-view-button">
          <span>View All Learners</span>

          <LuArrowRight />
        </button>
      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="learner-overview-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className={`learner-stat-card learner-stat-${stat.type}`}
            >
              <div className="learner-stat-icon">
                <Icon />
              </div>

              <div className="learner-stat-content">
                <p className="learner-stat-title">{stat.title}</p>

                <div className="learner-stat-value-row">
                  <h3>{stat.value}</h3>
                </div>

                <div
                  className={`learner-stat-growth ${
                    stat.negative ? "learner-stat-growth-negative" : ""
                  }`}
                >
                  <LuTrendingUp />

                  <span>{stat.growth}</span>

                  <small>from last month</small>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* =================================================
          ANALYTICS ROW
      ================================================= */}

      <div className="learner-overview-analytics">
        {/* =================================================
            LEARNER GROWTH
        ================================================= */}

        <article className="learner-growth-card">
          <div className="learner-growth-header">
            <div>
              <h3>Learner Growth</h3>

              <p>Total learners over the last 6 months</p>
            </div>

            <button type="button" className="learner-period-button">
              <span>Last 6 Months</span>
              <LuChevronDown />
            </button>
          </div>

          <div className="learner-growth-chart">
            <div className="growth-y-axis">
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            <div className="growth-chart-area">
              <div className="growth-grid-line grid-line-one"></div>
              <div className="growth-grid-line grid-line-two"></div>
              <div className="growth-grid-line grid-line-three"></div>
              <div className="growth-grid-line grid-line-four"></div>

              <svg
                className="growth-chart-svg"
                viewBox="0 0 620 220"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="learnerGrowthFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(91, 194, 255, 0.36)" />

                    <stop offset="100%" stopColor="rgba(91, 194, 255, 0.015)" />
                  </linearGradient>
                </defs>

                <path
                  className="growth-area"
                  d="
                    M 0 172
                    C 60 168, 82 160, 124 156
                    C 164 152, 188 145, 248 137
                    C 300 130, 325 119, 372 112
                    C 425 104, 460 105, 496 99
                    C 540 91, 570 72, 620 61
                    L 620 220
                    L 0 220
                    Z
                  "
                  fill="url(#learnerGrowthFill)"
                />

                <path
                  className="growth-line"
                  d="
                    M 0 172
                    C 60 168, 82 160, 124 156
                    C 164 152, 188 145, 248 137
                    C 300 130, 325 119, 372 112
                    C 425 104, 460 105, 496 99
                    C 540 91, 570 72, 620 61
                  "
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle className="growth-point" cx="0" cy="172" r="5" />

                <circle className="growth-point" cx="124" cy="156" r="5" />

                <circle className="growth-point" cx="248" cy="137" r="5" />

                <circle className="growth-point" cx="372" cy="112" r="5" />

                <circle className="growth-point" cx="496" cy="99" r="5" />

                <circle className="growth-point" cx="620" cy="61" r="5" />
              </svg>

              <div className="growth-tooltip">
                <strong>248</strong>
                <span>Learners</span>
              </div>

              <div className="growth-months">
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
            LEARNER STATUS
        ================================================= */}

        <article className="learner-status-card">
          <div className="learner-panel-header">
            <div>
              <h3>Learner Status</h3>

              <p>Current distribution of learners</p>
            </div>
          </div>

          <div className="learner-status-content">
            <div className="status-donut">
              <div className="status-donut-inner">
                <strong>248</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="status-legend">
              <div className="status-legend-item">
                <span className="status-dot status-dot-green"></span>

                <span className="status-name">Active</span>

                <strong>216 (87%)</strong>
              </div>

              <div className="status-legend-item">
                <span className="status-dot status-dot-orange"></span>

                <span className="status-name">At Risk</span>

                <strong>12 (5%)</strong>
              </div>

              <div className="status-legend-item">
                <span className="status-dot status-dot-blue"></span>

                <span className="status-name">Completed</span>

                <strong>94 (38%)</strong>
              </div>

              <div className="status-legend-item">
                <span className="status-dot status-dot-gray"></span>

                <span className="status-name">Inactive</span>

                <strong>26 (10%)</strong>
              </div>
            </div>
          </div>
        </article>

        {/* =================================================
            KEY INSIGHTS
        ================================================= */}

        <article className="learner-insights-card">
          <div className="learner-panel-header">
            <div className="insights-title">
              <div className="insights-title-icon">
                <LuLightbulb />
              </div>

              <h3>Key Insights</h3>
            </div>
          </div>

          <div className="learner-insights-list">
            <div className="learner-insight">
              <div className="insight-icon insight-green">
                <LuTrendingUp />
              </div>

              <div>
                <strong>Active learners increased by 8%</strong>

                <p>More learners are engaging this month.</p>
              </div>
            </div>

            <div className="learner-insight">
              <div className="insight-icon insight-blue">
                <LuUsersRound />
              </div>

              <div>
                <strong>High course completion rate</strong>

                <p>38% of learners have completed their courses.</p>
              </div>
            </div>

            <div className="learner-insight">
              <div className="insight-icon insight-red">
                <LuClock3 />
              </div>

              <div>
                <strong>12 learners need attention</strong>

                <p>These learners haven't been active recently.</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* =================================================
          RECENT LEARNERS
      ================================================= */}

      <article className="recent-learners-card">
        <div className="recent-learners-header">
          <div>
            <h3>Recent Learners</h3>

            <p>Latest learners who joined or were recently active</p>
          </div>

          <button type="button" className="recent-learners-view-button">
            <span>View All</span>
            <LuArrowRight />
          </button>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="recent-learners-table-wrapper">
          <table className="recent-learners-table">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Email</th>
                <th>Progress</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {learners.map((learner) => (
                <tr key={learner.email}>
                  {/* Learner */}
                  <td>
                    <div className="learner-table-user">
                      <div className="learner-table-avatar">
                        <img src={learner.avatar} alt={learner.name} />

                        <span>{learner.initials}</span>
                      </div>

                      <strong>{learner.name}</strong>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span className="learner-email">{learner.email}</span>
                  </td>

                  {/* Progress */}
                  <td>
                    <div className="learner-progress">
                      <strong>{learner.progress}%</strong>

                      <div className="learner-progress-track">
                        <span
                          className={`learner-progress-fill progress-${learner.statusType}`}
                          style={{
                            width: `${learner.progress}%`,
                          }}
                        ></span>
                      </div>
                    </div>
                  </td>

                  {/* Last Active */}
                  <td>
                    <span className="learner-last-active">
                      {learner.active}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`learner-status-badge status-${learner.statusType}`}
                    >
                      <span></span>

                      {learner.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <button
                      type="button"
                      className="learner-table-action"
                      aria-label={`Actions for ${learner.name}`}
                    >
                      <LuEllipsis />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default LearnerOverview;
