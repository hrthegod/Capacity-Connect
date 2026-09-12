// src/Components/Learner/SkillGaps/SkillGapDetails/SkillGapDetails.jsx

import React, { useMemo, useState } from "react";

import {
  FiAlertCircle,
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiCompass,
  FiDatabase,
  FiFlag,
  FiGrid,
  FiLayers,
  FiMessageCircle,
  FiMonitor,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiUserCheck,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import {
  CURRENT_LEARNER_ID,
  getLearnerSkills,
} from "../../../../../data/mock/skills";

import "./SkillGapDetails.css";

/* =========================================================
   HELPERS
========================================================= */

const getTargetLevel = () => {
  return 80;
};

const getPriority = (gap) => {
  if (gap >= 15) {
    return {
      label: "High",
      type: "danger",
    };
  }

  if (gap >= 8) {
    return {
      label: "Medium",
      type: "warning",
    };
  }

  return {
    label: "Low",
    type: "success",
  };
};

const getSkillIcon = (skillName) => {
  const normalizedName = skillName.toLowerCase();

  if (normalizedName.includes("javascript")) return FiCode;
  if (normalizedName.includes("react")) return FiMonitor;
  if (normalizedName.includes("python")) return FiCode;
  if (normalizedName.includes("sql")) return FiDatabase;
  if (normalizedName.includes("data")) return FiBarChart2;
  if (normalizedName.includes("git")) return FiLayers;
  if (normalizedName.includes("communication")) {
    return FiMessageCircle;
  }
  if (normalizedName.includes("team")) return FiUsers;
  if (normalizedName.includes("leadership")) {
    return FiTrendingUp;
  }
  if (normalizedName.includes("research")) return FiSearch;
  if (normalizedName.includes("ocean")) return FiCompass;

  return FiGrid;
};

/* =========================================================
   COMPONENT
========================================================= */

const SkillGapDetails = ({
  onViewSkillDetails,
  onExploreResources,
  onViewAllResources,
}) => {
  /* =======================================================
     ACTIVE FILTER
  ======================================================= */

  const [activeFilter, setActiveFilter] = useState("all");

  /* =======================================================
     LEARNER SKILLS
  ======================================================= */

  const learnerSkills = getLearnerSkills(CURRENT_LEARNER_ID);

  /* =======================================================
     GAP DATA
  ======================================================= */

  const gapSkills = useMemo(() => {
    return learnerSkills
      .map((skill) => {
        const target = getTargetLevel(skill);

        const gap = Math.max(0, target - skill.level);

        return {
          ...skill,
          targetLevel: target,
          gap,
          priority: getPriority(gap),
        };
      })
      .filter((skill) => skill.gap > 0)
      .sort((a, b) => {
        if (b.gap !== a.gap) {
          return b.gap - a.gap;
        }

        return a.level - b.level;
      });
  }, [learnerSkills]);

  /* =======================================================
     FILTERED SKILLS
  ======================================================= */

  const filteredSkills = useMemo(() => {
    if (activeFilter === "all") {
      return gapSkills;
    }

    const filterName =
      activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);

    return gapSkills.filter((skill) => skill.priority.label === filterName);
  }, [activeFilter, gapSkills]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const totalGaps = gapSkills.length;

  const highPriority = gapSkills.filter(
    (skill) => skill.priority.label === "High",
  ).length;

  const mediumPriority = gapSkills.filter(
    (skill) => skill.priority.label === "Medium",
  ).length;

  const lowPriority = gapSkills.filter(
    (skill) => skill.priority.label === "Low",
  ).length;

  /* =======================================================
     HIGHEST GAP
  ======================================================= */

  const highestGap = gapSkills[0] || null;

  /* =======================================================
     INSIGHTS
  ======================================================= */

  const closestSkill = [...gapSkills].sort((a, b) => a.gap - b.gap)[0];

  const averageGap =
    totalGaps > 0
      ? Math.round(
          gapSkills.reduce((total, skill) => total + skill.gap, 0) / totalGaps,
        )
      : 0;

  /* =======================================================
     HANDLERS
  ======================================================= */

  const handleViewSkill = (skill) => {
    if (typeof onViewSkillDetails === "function") {
      onViewSkillDetails(skill);
      return;
    }

    console.log("View skill:", skill);
  };

  const handleExploreResources = (skill) => {
    if (typeof onExploreResources === "function") {
      onExploreResources(skill);
      return;
    }

    console.log("Explore resources:", skill);
  };

  const handleViewResources = () => {
    if (typeof onViewAllResources === "function") {
      onViewAllResources();
      return;
    }

    console.log("View all resources");
  };

  /* =======================================================
     FILTER HANDLER
  ======================================================= */

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  /* =======================================================
     FILTER TABS
  ======================================================= */

  const filterTabs = [
    {
      id: "all",
      label: "All Gaps",
      count: totalGaps,
    },
    {
      id: "high",
      label: "High",
      count: highPriority,
    },
    {
      id: "medium",
      label: "Medium",
      count: mediumPriority,
    },
    {
      id: "low",
      label: "Low",
      count: lowPriority,
    },
  ];

  /* =======================================================
     ACTION DATA
  ======================================================= */

  const actions = [
    {
      id: "courses",
      title: "Take Targeted Courses",
      description: "Enroll in courses designed around your skill gaps.",
      button: "Browse Courses",
      icon: FiBookOpen,
      theme: "blue",
      onClick: () => console.log("Browse Courses"),
    },

    {
      id: "projects",
      title: "Practice with Projects",
      description: "Apply your knowledge through real-world projects.",
      button: "Explore Projects",
      icon: FiCode,
      theme: "purple",
      onClick: () => console.log("Explore Projects"),
    },

    {
      id: "groups",
      title: "Join Study Groups",
      description: "Learn and grow with fellow learners.",
      button: "Find Groups",
      icon: FiUsers,
      theme: "green",
      onClick: () => console.log("Find Groups"),
    },

    {
      id: "mentor",
      title: "Get Mentorship",
      description: "Connect with experts for focused guidance.",
      button: "Find a Mentor",
      icon: FiUserCheck,
      theme: "amber",
      onClick: () => console.log("Find a Mentor"),
    },
  ];

  return (
    <section className="skill-gap-details">
      {/* =====================================================
          TOP FOUR STATE CARDS
      ===================================================== */}

      <div className="skill-gap-details__state-grid">
        <Card className="skill-gap-details__state-card skill-gap-details__state-card--red">
          <div className="skill-gap-details__state-icon">
            <FiTarget />
          </div>

          <div className="skill-gap-details__state-content">
            <span>Total Skill Gaps</span>
            <strong>{totalGaps}</strong>
            <small>Skills to improve</small>
          </div>

          <div className="skill-gap-details__state-arrow">
            <FiArrowRight />
          </div>
        </Card>

        <Card className="skill-gap-details__state-card skill-gap-details__state-card--blue">
          <div className="skill-gap-details__state-icon">
            <FiBarChart2 />
          </div>

          <div className="skill-gap-details__state-content">
            <span>High Priority</span>
            <strong>{highPriority}</strong>
            <small>Need immediate focus</small>
          </div>
        </Card>

        <Card className="skill-gap-details__state-card skill-gap-details__state-card--green">
          <div className="skill-gap-details__state-icon">
            <FiTrendingUp />
          </div>

          <div className="skill-gap-details__state-content">
            <span>Medium Priority</span>
            <strong>{mediumPriority}</strong>
            <small>Plan for growth</small>
          </div>
        </Card>

        <Card className="skill-gap-details__state-card skill-gap-details__state-card--purple">
          <div className="skill-gap-details__state-icon">
            <FiCompass />
          </div>

          <div className="skill-gap-details__state-content">
            <span>Low Priority</span>
            <strong>{lowPriority}</strong>
            <small>Keep practicing</small>
          </div>
        </Card>
      </div>

      {/* =====================================================
          TABLE + FOCUS CARD
      ===================================================== */}

      <div className="skill-gap-details__table-section">
        {/* ===================================================
            TABLE CARD
        =================================================== */}

        <Card className="skill-gap-details__table-card">
          {/* =================================================
              TOOLBAR
          ================================================= */}

          <div className="skill-gap-details__table-toolbar">
            {/* FILTER TABS */}

            <div
              className="skill-gap-details__tabs"
              role="tablist"
              aria-label="Skill gap filters"
            >
              {filterTabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  role="tab"
                  aria-selected={activeFilter === tab.id}
                  className={`skill-gap-details__tab ${
                    activeFilter === tab.id
                      ? "skill-gap-details__tab--active"
                      : ""
                  }`}
                  onClick={() => handleFilterChange(tab.id)}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* SORT */}

            <button type="button" className="skill-gap-details__sort">
              <span>Sort by: Priority</span>
              <FiArrowRight />
            </button>
          </div>

          {/* =================================================
              TABLE SCROLL
          ================================================= */}

          <div className="skill-gap-details__table-scroll">
            <div className="skill-gap-details__table">
              {/* =================================================
                  TABLE HEADER
              ================================================= */}

              <div className="skill-gap-details__table-head">
                <span>Skill</span>

                <span>Current Level</span>

                <span>Target Level</span>

                <span>Gap</span>

                <span>Priority</span>

                <span>Actions</span>
              </div>

              {/* =================================================
                  TABLE ROWS
              ================================================= */}

              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill, index) => {
                  const SkillIcon = getSkillIcon(skill.name);

                  return (
                    <div
                      className={`skill-gap-details__table-row ${
                        index % 2 === 1
                          ? "skill-gap-details__table-row--dark"
                          : "skill-gap-details__table-row--light"
                      }`}
                      key={skill.id}
                    >
                      {/* SKILL */}

                      <div className="skill-gap-details__skill-cell">
                        <div className="skill-gap-details__skill-icon">
                          <SkillIcon />
                        </div>

                        <div className="skill-gap-details__skill-copy">
                          <strong>{skill.name}</strong>

                          <span>{skill.category}</span>
                        </div>
                      </div>

                      {/* CURRENT */}

                      <div className="skill-gap-details__level-cell">
                        <strong>{skill.level}%</strong>

                        <div className="skill-gap-details__progress">
                          <span
                            style={{
                              width: `${skill.level}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* TARGET */}

                      <div className="skill-gap-details__level-cell">
                        <strong>{skill.targetLevel}%</strong>

                        <div className="skill-gap-details__progress skill-gap-details__progress--target">
                          <span
                            style={{
                              width: `${skill.targetLevel}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* GAP */}

                      <div className="skill-gap-details__gap">{skill.gap}%</div>

                      {/* PRIORITY */}

                      <div className="skill-gap-details__priority">
                        <Badge variant={skill.priority.type}>
                          {skill.priority.label}
                        </Badge>
                      </div>

                      {/* ACTION */}

                      <div className="skill-gap-details__action">
                        <Button
                          variant="outline"
                          size="sm"
                          rightIcon={<FiArrowRight />}
                          onClick={() => handleViewSkill(skill)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="skill-gap-details__empty">
                  <FiCheckCircle />

                  <strong>
                    No {activeFilter !== "all" ? activeFilter : ""} skill gaps
                    found
                  </strong>

                  <span>
                    There are no skills matching this filter right now.
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ===================================================
            NAVY FOCUS CARD
        =================================================== */}

        <Card className="skill-gap-details__focus-card">
          <div className="skill-gap-details__focus-glow" />

          <div className="skill-gap-details__focus-header">
            <div className="skill-gap-details__focus-icon">
              <FiTarget />
            </div>

            <div>
              <h3>
                Focus on
                <br />
                High-Impact Skills
              </h3>

              <p>
                Improving these skills can significantly enhance your career
                opportunities.
              </p>
            </div>
          </div>

          <div className="skill-gap-details__focus-divider" />

          <div className="skill-gap-details__focus-list">
            <div className="skill-gap-details__focus-item">
              <div className="skill-gap-details__focus-item-icon skill-gap-details__focus-item-icon--green">
                <FiTrendingUp />
              </div>

              <div>
                <strong>Higher Employability</strong>

                <span>In-demand skills open more doors.</span>
              </div>
            </div>

            <div className="skill-gap-details__focus-item">
              <div className="skill-gap-details__focus-item-icon skill-gap-details__focus-item-icon--purple">
                <FiBookOpen />
              </div>

              <div>
                <strong>Better Opportunities</strong>

                <span>Build stronger career potential.</span>
              </div>
            </div>

            <div className="skill-gap-details__focus-item">
              <div className="skill-gap-details__focus-item-icon skill-gap-details__focus-item-icon--amber">
                <FiTrendingUp />
              </div>

              <div>
                <strong>Personal Growth</strong>

                <span>Build confidence and expertise.</span>
              </div>
            </div>
          </div>

          <div className="skill-gap-details__focus-divider" />

          <p className="skill-gap-details__focus-quote">
            “Skill development today creates the opportunities of tomorrow.”
          </p>

          <Button
            variant="secondary"
            size="md"
            rightIcon={<FiArrowRight />}
            onClick={() => handleExploreResources(highestGap)}
            className="skill-gap-details__focus-button"
          >
            Explore Learning Paths
          </Button>
        </Card>
      </div>

      {/* =====================================================
          ANALYSIS + INSIGHTS
      ===================================================== */}

      <div className="skill-gap-details__analysis-grid">
        {/* ===================================================
            ANALYSIS
        =================================================== */}

        <Card className="skill-gap-details__analysis-card">
          <div className="skill-gap-details__analysis-header">
            <div className="skill-gap-details__analysis-icon skill-gap-details__analysis-icon--green">
              <FiBarChart2 />
            </div>

            <div>
              <h3>Skill Gap Analysis</h3>

              <p>
                Visualise the gap between your current and target skill levels.
              </p>
            </div>
          </div>

          <div className="skill-gap-details__legend">
            <div>
              <span className="skill-gap-details__legend-dot skill-gap-details__legend-dot--current" />
              <span>Current Level</span>
            </div>

            <div>
              <span className="skill-gap-details__legend-dot skill-gap-details__legend-dot--target" />
              <span>Target Level</span>
            </div>
          </div>

          <div className="skill-gap-details__graph-scroll">
            <div className="skill-gap-details__graph">
              <div className="skill-gap-details__graph-yaxis">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              <div className="skill-gap-details__graph-area">
                <div className="skill-gap-details__graph-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="skill-gap-details__graph-bars">
                  {gapSkills.map((skill) => (
                    <div
                      className="skill-gap-details__graph-group"
                      key={`graph-${skill.id}`}
                    >
                      <div className="skill-gap-details__graph-columns">
                        <div
                          className="skill-gap-details__graph-bar skill-gap-details__graph-bar--current"
                          style={{
                            height: `${skill.level}%`,
                          }}
                        />

                        <div
                          className="skill-gap-details__graph-bar skill-gap-details__graph-bar--target"
                          style={{
                            height: `${skill.targetLevel}%`,
                          }}
                        />
                      </div>

                      <span className="skill-gap-details__graph-label">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ===================================================
            QUICK INSIGHTS
        =================================================== */}

        <Card className="skill-gap-details__insights-card">
          <div className="skill-gap-details__analysis-header">
            <div className="skill-gap-details__analysis-icon skill-gap-details__analysis-icon--amber">
              <FiZap />
            </div>

            <div>
              <h3>Quick Insights</h3>

              <p>A few things worth focusing on next.</p>
            </div>
          </div>

          <div className="skill-gap-details__insights-list">
            <div className="skill-gap-details__insight">
              <div className="skill-gap-details__insight-icon skill-gap-details__insight-icon--red">
                <FiAlertCircle />
              </div>

              <div>
                <strong>{highPriority} skills</strong>

                <span>require immediate attention</span>
              </div>
            </div>

            <div className="skill-gap-details__insight">
              <div className="skill-gap-details__insight-icon skill-gap-details__insight-icon--blue">
                <FiTarget />
              </div>

              <div>
                <strong>
                  Focus on {highestGap?.name || "your priority skills"}
                </strong>

                <span>to make the biggest impact</span>
              </div>
            </div>

            <div className="skill-gap-details__insight">
              <div className="skill-gap-details__insight-icon skill-gap-details__insight-icon--green">
                <FiCheckCircle />
              </div>

              <div>
                <strong>
                  You're closest on{" "}
                  {closestSkill?.name || "your remaining gaps"}
                </strong>

                <span>Only {closestSkill?.gap || 0}% gap remains</span>
              </div>
            </div>

            <div className="skill-gap-details__insight">
              <div className="skill-gap-details__insight-icon skill-gap-details__insight-icon--purple">
                <FiBarChart2 />
              </div>

              <div>
                <strong>Average gap: {averageGap}%</strong>

                <span>Keep building your weaker areas</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          RECOMMENDED ACTIONS
      ===================================================== */}

      <Card className="skill-gap-details__actions-card">
        <div className="skill-gap-details__actions-header">
          <div className="skill-gap-details__actions-title">
            <div className="skill-gap-details__actions-icon">
              <FiZap />
            </div>

            <div>
              <h3>Recommended Actions</h3>

              <p>Take these steps to close your skill gaps effectively.</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            rightIcon={<FiArrowRight />}
            onClick={handleViewResources}
          >
            View All Resources
          </Button>
        </div>

        <div className="skill-gap-details__action-grid">
          {actions.map((action) => {
            const ActionIcon = action.icon;

            return (
              <div
                className={`skill-gap-details__action-card skill-gap-details__action-card--${action.theme}`}
                key={action.id}
              >
                <div className="skill-gap-details__action-card-icon">
                  <ActionIcon />
                </div>

                <div className="skill-gap-details__action-card-content">
                  <h4>{action.title}</h4>

                  <p>{action.description}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<FiArrowRight />}
                  onClick={action.onClick}
                  className="skill-gap-details__action-button"
                >
                  {action.button}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
};

export default SkillGapDetails;
