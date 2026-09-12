import React, { useState } from "react";
import {
  LuAward,
  LuBookOpen,
  LuCalendarDays,
  LuChartColumn,
  LuChevronDown,
  LuCircleCheck,
  LuHeart,
  LuMessageCircle,
  LuQuote,
  LuRocket,
  LuSparkles,
  LuStar,
  LuTarget,
  LuTrendingUp,
  LuUsersRound,
} from "react-icons/lu";

import "./ProfileStats.css";

const ProfileStats = () => {
  const [period, setPeriod] = useState("Last 1 Year");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const [message, setMessage] = useState("");

  const periods = [
    "Last 30 Days",
    "Last 3 Months",
    "Last 6 Months",
    "Last 1 Year",
  ];

  const learnerGrowth = [
    {
      month: "Jan",
      value: 80,
    },
    {
      month: "Feb",
      value: 120,
    },
    {
      month: "Mar",
      value: 150,
    },
    {
      month: "Apr",
      value: 130,
    },
    {
      month: "May",
      value: 170,
    },
    {
      month: "Jun",
      value: 200,
    },
  ];

  const maxGrowth = Math.max(...learnerGrowth.map((item) => item.value));

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handlePeriodChange = (selectedPeriod) => {
    setPeriod(selectedPeriod);
    setShowPeriodMenu(false);

    showMessage(`Statistics updated for ${selectedPeriod}.`);
  };

  const handleImpactAction = () => {
    showMessage("Overall impact details opened.");

    window.dispatchEvent(new CustomEvent("trainer-profile-impact-open"));
  };

  const handleLearnerGrowthAction = () => {
    showMessage("Learner growth details opened.");

    window.dispatchEvent(new CustomEvent("trainer-profile-growth-open"));
  };

  const handleCompletionAction = () => {
    showMessage("Course completion details opened.");

    window.dispatchEvent(new CustomEvent("trainer-profile-completion-open"));
  };

  const handleTestimonialsAction = () => {
    showMessage("Learner testimonials opened.");

    window.dispatchEvent(new CustomEvent("trainer-profile-testimonials-open"));
  };

  return (
    <section className="profile-stats">
      <div className="profile-stats-shell">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <header className="profile-stats-header">
          <div className="profile-stats-heading">
            <div className="profile-stats-heading-icon">
              <LuChartColumn size={21} strokeWidth={1.8} />
            </div>

            <div>
              <span>PERFORMANCE SNAPSHOT</span>

              <h2>Trainer Statistics</h2>

              <p>A quick overview of my teaching journey and impact.</p>
            </div>
          </div>

          {/* =================================================
              PERIOD SELECTOR
          ================================================== */}

          <div className="profile-stats-period-wrapper">
            <button
              type="button"
              className={`profile-stats-period ${
                showPeriodMenu ? "active" : ""
              }`}
              onClick={() => setShowPeriodMenu((current) => !current)}
              aria-expanded={showPeriodMenu}
            >
              <LuCalendarDays size={17} strokeWidth={1.8} />

              <span>{period}</span>

              <LuChevronDown
                size={15}
                strokeWidth={1.8}
                className={
                  showPeriodMenu ? "profile-stats-period-arrow-open" : ""
                }
              />
            </button>

            {showPeriodMenu && (
              <div className="profile-stats-period-menu">
                {periods.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={item === period ? "selected" : ""}
                    onClick={() => handlePeriodChange(item)}
                  >
                    <span>{item}</span>

                    {item === period && (
                      <LuCircleCheck size={15} strokeWidth={1.8} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* =====================================================
            LAST FOUR STATISTICS
        ====================================================== */}

        <div className="profile-stat-cards">
          {/* ===================================================
              COMPLETION RATE
          ==================================================== */}

          <article className="profile-stat-card profile-stat-completion">
            <div className="profile-stat-card-top">
              <div className="profile-stat-icon">
                <LuCircleCheck size={21} strokeWidth={1.8} />
              </div>

              <span className="profile-stat-trend">
                <LuTrendingUp size={13} strokeWidth={1.9} />
                +8%
              </span>
            </div>

            <strong className="profile-stat-number">92%</strong>

            <span className="profile-stat-label">Completion Rate</span>

            <div className="profile-stat-bottom">
              <span>vs last year</span>

              <div className="profile-stat-mini-chart completion-chart">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>

          {/* ===================================================
              LEARNER SATISFACTION
          ==================================================== */}

          <article className="profile-stat-card profile-stat-satisfaction">
            <div className="profile-stat-card-top">
              <div className="profile-stat-icon">
                <LuHeart size={21} strokeWidth={1.8} />
              </div>

              <span className="profile-stat-trend">
                <LuTrendingUp size={13} strokeWidth={1.9} />
                +14%
              </span>
            </div>

            <strong className="profile-stat-number">96%</strong>

            <span className="profile-stat-label">Learner Satisfaction</span>

            <div className="profile-stat-bottom">
              <span>vs last year</span>

              <div className="profile-stat-mini-chart satisfaction-chart">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>

          {/* ===================================================
              EXPERIENCE
          ==================================================== */}

          <article className="profile-stat-card profile-stat-experience">
            <div className="profile-stat-card-top">
              <div className="profile-stat-icon">
                <LuAward size={21} strokeWidth={1.8} />
              </div>

              <span className="profile-stat-trend">
                <LuTrendingUp size={13} strokeWidth={1.9} />
                +25%
              </span>
            </div>

            <strong className="profile-stat-number">5+</strong>

            <span className="profile-stat-label">Years of Experience</span>

            <div className="profile-stat-bottom">
              <span>professional journey</span>

              <div className="profile-stat-mini-chart experience-chart">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>

          {/* ===================================================
              PERFORMANCE SCORE
          ==================================================== */}

          <article className="profile-stat-card profile-stat-performance">
            <div className="profile-stat-card-top">
              <div className="profile-stat-icon">
                <LuRocket size={21} strokeWidth={1.8} />
              </div>

              <span className="profile-stat-trend">
                <LuTrendingUp size={13} strokeWidth={1.9} />
                +10%
              </span>
            </div>

            <strong className="profile-stat-number">98</strong>

            <span className="profile-stat-label">Performance Score</span>

            <div className="profile-stat-bottom">
              <span>overall score</span>

              <div className="profile-stat-mini-chart performance-chart">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>
        </div>

        {/* =====================================================
            SECOND ROW
        ====================================================== */}

        <div className="profile-stats-main-grid">
          {/* ===================================================
              OVERALL IMPACT — DARK NAVY
          ==================================================== */}

          <article className="profile-impact-card">
            <div className="profile-impact-background">
              <span />
              <span />
              <span />
            </div>

            <div className="profile-impact-header">
              <div className="profile-impact-title">
                <div className="profile-impact-icon">
                  <LuChartColumn size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <span>TRAINING IMPACT</span>

                  <h3>Overall Impact</h3>
                </div>
              </div>

              <span className="profile-impact-badge">
                <LuStar size={14} strokeWidth={1.8} />
                Top 5%
              </span>
            </div>

            <p className="profile-impact-description">
              Empowering learners with practical skills and real-world knowledge
              to help them grow in their technology journey.
            </p>

            <div className="profile-impact-metrics">
              <button type="button" onClick={handleImpactAction}>
                <div className="profile-impact-metric-icon impact-blue">
                  <LuUsersRound size={18} strokeWidth={1.8} />
                </div>

                <strong>500+</strong>

                <span>Happy Learners</span>
              </button>

              <button type="button" onClick={handleImpactAction}>
                <div className="profile-impact-metric-icon impact-purple">
                  <LuBookOpen size={18} strokeWidth={1.8} />
                </div>

                <strong>30+</strong>

                <span>Projects Guided</span>
              </button>

              <button type="button" onClick={handleImpactAction}>
                <div className="profile-impact-metric-icon impact-gold">
                  <LuStar size={18} strokeWidth={1.8} />
                </div>

                <strong>4.8</strong>

                <span>Average Rating</span>
              </button>
            </div>

            <button
              type="button"
              className="profile-impact-button"
              onClick={handleImpactAction}
            >
              <span>Explore My Impact</span>

              <LuRocket size={16} strokeWidth={1.8} />
            </button>
          </article>

          {/* ===================================================
              LEARNER GROWTH
          ==================================================== */}

          <article className="profile-growth-card">
            <div className="profile-growth-header">
              <div className="profile-growth-title">
                <div className="profile-growth-icon">
                  <LuChartColumn size={20} strokeWidth={1.8} />
                </div>

                <div>
                  <span>LEARNER GROWTH</span>

                  <h3>Learner Growth</h3>

                  <p>Number of learners trained over the past 6 months.</p>
                </div>
              </div>

              <button
                type="button"
                className="profile-growth-filter"
                onClick={handleLearnerGrowthAction}
              >
                <LuUsersRound size={15} strokeWidth={1.8} />

                <span>Learners</span>

                <LuChevronDown size={14} strokeWidth={1.8} />
              </button>
            </div>

            {/* =================================================
                BAR CHART
            ================================================== */}

            <div className="profile-growth-chart">
              <div className="profile-growth-y-axis">
                <span>200</span>
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>

              <div className="profile-growth-graph">
                <div className="profile-growth-grid-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="profile-growth-bars">
                  {learnerGrowth.map((item) => (
                    <div className="profile-growth-bar-column" key={item.month}>
                      <span className="profile-growth-value">{item.value}</span>

                      <div className="profile-growth-bar-wrapper">
                        <div
                          className="profile-growth-bar"
                          style={{
                            height: `${(item.value / maxGrowth) * 100}%`,
                          }}
                        />
                      </div>

                      <span className="profile-growth-month">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* =====================================================
            THIRD ROW
        ====================================================== */}

        <div className="profile-stats-bottom-grid">
          {/* ===================================================
              COURSE COMPLETION
          ==================================================== */}

          <article className="profile-completion-card">
            <div className="profile-completion-header">
              <div className="profile-completion-title">
                <div className="profile-completion-icon">
                  <LuCircleCheck size={20} strokeWidth={1.8} />
                </div>

                <div>
                  <span>COURSE PROGRESS</span>

                  <h3>Course Completion</h3>
                </div>
              </div>

              <button
                type="button"
                className="profile-completion-more"
                onClick={handleCompletionAction}
              >
                Details
              </button>
            </div>

            <div className="profile-completion-content">
              <div
                className="profile-completion-ring"
                style={{
                  "--completion": "92%",
                }}
              >
                <div className="profile-completion-ring-inner">
                  <strong>92%</strong>

                  <span>
                    Completion
                    <br />
                    Rate
                  </span>
                </div>
              </div>

              <div className="profile-completion-legend">
                <div>
                  <span className="legend-completed" />

                  <span>Completed</span>

                  <strong>92%</strong>
                </div>

                <div>
                  <span className="legend-progress" />

                  <span>In Progress</span>

                  <strong>6%</strong>
                </div>

                <div>
                  <span className="legend-dropped" />

                  <span>Dropped</span>

                  <strong>2%</strong>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="profile-completion-button"
              onClick={handleCompletionAction}
            >
              <LuTarget size={15} strokeWidth={1.8} />

              <span>View Completion Details</span>

              <LuTrendingUp size={14} strokeWidth={1.8} />
            </button>
          </article>

          {/* ===================================================
              TESTIMONIAL
          ==================================================== */}

          <article className="profile-testimonial-card">
            <div className="profile-testimonial-decoration">
              <LuQuote size={105} strokeWidth={0.8} />
            </div>

            <div className="profile-testimonial-top">
              <div className="profile-testimonial-icon">
                <LuMessageCircle size={20} strokeWidth={1.8} />
              </div>

              <span>LEARNER VOICE</span>
            </div>

            <h3>Making a Real Difference</h3>

            <blockquote>
              “It&apos;s incredibly fulfilling to see my learners apply their
              skills and achieve their goals.”
            </blockquote>

            <div className="profile-testimonial-author">
              <div className="profile-testimonial-avatar">
                <LuUsersRound size={17} strokeWidth={1.8} />
              </div>

              <div>
                <strong>Learner Feedback</strong>

                <span>Capacity Connect</span>
              </div>
            </div>

            <button
              type="button"
              className="profile-testimonial-button"
              onClick={handleTestimonialsAction}
            >
              <span>View Learner Testimonials</span>

              <LuRocket size={16} strokeWidth={1.8} />
            </button>
          </article>
        </div>

        {/* =====================================================
            STATUS MESSAGE
        ====================================================== */}

        {message && (
          <div
            className="profile-stats-message"
            role="status"
            aria-live="polite"
          >
            <span />

            <p>{message}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileStats;
