import React, { useMemo } from "react";
import {
  FiAlertCircle,
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiZap,
  FiMessageCircle,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import {
  CURRENT_LEARNER_ID,
  getLearnerSkills,
} from "../../../../../data/mock/skills";

import "./SkillGapOverview.css";

/* =========================================================
   HELPERS
========================================================= */

const getSkillIcon = (skillName) => {
  const iconMap = {
    JavaScript: FiCode,
    React: FiLayers,
    "C Programming": FiCode,
    Python: FiCode,
    SQL: FiDatabase,
    "Data Analysis": FiBarChart2,
    "Git & GitHub": FiGitBranch,
    Communication: FiMessageCircle,
    Teamwork: FiCheckCircle,
    Leadership: FiTarget,
    "Ocean Science": FiLayers,
    Research: FiBookOpen,
  };

  return iconMap[skillName] || FiLayers;
};

/* =========================================================
   COMPONENT
========================================================= */

const SkillGapOverview = ({
  learnerId = CURRENT_LEARNER_ID,
  onExploreResources,
  onViewSkillDetails,
}) => {
  /* =======================================================
     LEARNER SKILLS
  ======================================================= */

  const learnerSkills = useMemo(() => getLearnerSkills(learnerId), [learnerId]);

  /* =======================================================
     PROFICIENCY DISTRIBUTION
  ======================================================= */

  const distribution = useMemo(() => {
    const strong = learnerSkills.filter((skill) => skill.level >= 80).length;

    const proficient = learnerSkills.filter(
      (skill) => skill.level >= 70 && skill.level < 80,
    ).length;

    const developing = learnerSkills.filter(
      (skill) => skill.level >= 50 && skill.level < 70,
    ).length;

    const beginner = learnerSkills.filter((skill) => skill.level < 50).length;

    const total = learnerSkills.length || 1;

    return [
      {
        id: "strong",
        label: "Strong",
        range: "(80–100)",
        count: strong,
        percentage: Math.round((strong / total) * 100),
        theme: "green",
      },
      {
        id: "proficient",
        label: "Proficient",
        range: "(70–79)",
        count: proficient,
        percentage: Math.round((proficient / total) * 100),
        theme: "blue",
      },
      {
        id: "developing",
        label: "Developing",
        range: "(50–69)",
        count: developing,
        percentage: Math.round((developing / total) * 100),
        theme: "amber",
      },
      {
        id: "beginner",
        label: "Beginner",
        range: "(0–49)",
        count: beginner,
        percentage: Math.round((beginner / total) * 100),
        theme: "red",
      },
    ];
  }, [learnerSkills]);

  /* =======================================================
     TOTAL + AVERAGE
  ======================================================= */

  const totalSkills = learnerSkills.length;

  const averageLevel =
    totalSkills > 0
      ? Math.round(
          learnerSkills.reduce(
            (total, skill) => total + Number(skill.level || 0),
            0,
          ) / totalSkills,
        )
      : 0;

  /* =======================================================
     SKILL GAPS
  ======================================================= */

  const skillsWithGaps = useMemo(() => {
    return [...learnerSkills]
      .filter((skill) => skill.level < 70)
      .sort((a, b) => a.level - b.level);
  }, [learnerSkills]);

  /* =======================================================
     TOP SKILLS
  ======================================================= */

  const topSkills = useMemo(() => {
    return [...learnerSkills].sort((a, b) => b.level - a.level).slice(0, 3);
  }, [learnerSkills]);

  /* =======================================================
     BIGGEST OPPORTUNITY
  ======================================================= */

  const biggestOpportunity = skillsWithGaps[0] || learnerSkills[0] || null;

  /* =======================================================
     HIGH PRIORITY
  ======================================================= */

  const highPrioritySkills = skillsWithGaps.slice(0, 3);

  /* =======================================================
     HANDLE ACTION
  ======================================================= */

  const handleExploreResources = () => {
    if (typeof onExploreResources === "function") {
      onExploreResources(biggestOpportunity);
      return;
    }

    console.log("Explore learning resources:", biggestOpportunity);
  };

  /* =======================================================
     HANDLE SKILL DETAILS
  ======================================================= */

  const handleSkillDetails = (skill) => {
    if (typeof onViewSkillDetails === "function") {
      onViewSkillDetails(skill);
      return;
    }

    console.log("View skill details:", skill);
  };

  return (
    <section className="skill-gap-overview">
      <Card className="skill-gap-overview__card">
        {/* ===================================================
            SECTION HEADING
        =================================================== */}

        <header className="skill-gap-overview__heading">
          <div className="skill-gap-overview__heading-copy">
            <Badge variant="info" className="skill-gap-overview__badge">
              SKILL GAP OVERVIEW
            </Badge>

            <h2 className="skill-gap-overview__title">
              Skills that need attention
            </h2>

            <p className="skill-gap-overview__subtitle">
              Identify where you&apos;re below your desired level and focus on
              what matters most.
            </p>
          </div>

          <div className="skill-gap-overview__heading-decoration">
            <div className="skill-gap-overview__target">
              <FiTarget />
            </div>

            <span className="skill-gap-overview__quote-mark">“</span>

            <p>
              Every small step in learning
              <br />
              today creates a bigger you
              <br />
              tomorrow.
            </p>
          </div>
        </header>

        {/* ===================================================
            MAIN ANALYSIS
        =================================================== */}

        <div className="skill-gap-overview__main-grid">
          {/* =================================================
              LEFT — PROFICIENCY DISTRIBUTION
          ================================================= */}

          <Card className="skill-gap-overview__distribution-card">
            <div className="skill-gap-overview__card-heading">
              <div className="skill-gap-overview__heading-icon skill-gap-overview__heading-icon--blue">
                <FiBarChart2 />
              </div>

              <div>
                <h3>Skill Proficiency Distribution</h3>

                <p>
                  See how your skills are spread across different proficiency
                  levels.
                </p>
              </div>
            </div>

            <div className="skill-gap-overview__distribution-content">
              {/* =============================================
                  BAR GRAPH
              ============================================= */}

              <div className="skill-gap-overview__bars">
                {distribution.map((item) => {
                  const barHeight =
                    item.percentage === 0
                      ? 8
                      : Math.max(28, (item.percentage / 35) * 170);

                  return (
                    <div
                      className={`skill-gap-overview__bar-column skill-gap-overview__bar-column--${item.theme}`}
                      key={item.id}
                    >
                      <span className="skill-gap-overview__bar-percentage">
                        {item.percentage}%
                      </span>

                      <div className="skill-gap-overview__bar-area">
                        <div
                          className="skill-gap-overview__bar"
                          style={{
                            height: `${barHeight}px`,
                          }}
                        />
                      </div>

                      <div className="skill-gap-overview__bar-label">
                        <strong>{item.label}</strong>

                        <span>{item.range}</span>

                        <small>
                          {item.count} {item.count === 1 ? "skill" : "skills"}
                        </small>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* =============================================
                  CIRCULAR STATISTICS
              ============================================= */}

              <div className="skill-gap-overview__circle-stat">
                <div
                  className="skill-gap-overview__circle"
                  style={{
                    "--progress": `${averageLevel}%`,
                  }}
                >
                  <div className="skill-gap-overview__circle-inner">
                    <strong>{totalSkills}</strong>

                    <span>Total Skills</span>
                  </div>
                </div>

                <div className="skill-gap-overview__circle-meta">
                  <span>Average proficiency</span>

                  <strong>{averageLevel}%</strong>
                </div>
              </div>
            </div>
          </Card>

          {/* =================================================
              RIGHT — BIGGEST OPPORTUNITY
          ================================================= */}

          <Card className="skill-gap-overview__opportunity-card">
            <div className="skill-gap-overview__opportunity-glow" />

            <div className="skill-gap-overview__opportunity-header">
              <div className="skill-gap-overview__opportunity-title">
                <div className="skill-gap-overview__opportunity-icon">
                  <FiTrendingUp />
                </div>

                <div>
                  <h3>Your Biggest Opportunity</h3>

                  <p>Focus on this skill to make the biggest impact.</p>
                </div>
              </div>

              <Badge
                variant="warning"
                className="skill-gap-overview__priority-badge"
              >
                <FiAlertCircle />
                Highest Gap
              </Badge>
            </div>

            {biggestOpportunity ? (
              <>
                <div className="skill-gap-overview__opportunity-skill">
                  <div className="skill-gap-overview__opportunity-skill-icon">
                    {React.createElement(getSkillIcon(biggestOpportunity.name))}
                  </div>

                  <div className="skill-gap-overview__opportunity-skill-copy">
                    <strong>{biggestOpportunity.name}</strong>

                    <span>{biggestOpportunity.category}</span>
                  </div>

                  <div className="skill-gap-overview__opportunity-level">
                    <strong>{biggestOpportunity.level}%</strong>

                    <Badge variant="warning">{biggestOpportunity.status}</Badge>
                  </div>
                </div>

                {/* =========================================
                    OPPORTUNITY PROGRESS
                ========================================= */}

                <div className="skill-gap-overview__opportunity-progress">
                  <div className="skill-gap-overview__opportunity-progress-track">
                    <span
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, biggestOpportunity.level),
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="skill-gap-overview__opportunity-progress-meta">
                    <span>Current proficiency</span>

                    <span>{biggestOpportunity.level} / 100</span>
                  </div>
                </div>

                <p className="skill-gap-overview__opportunity-description">
                  {biggestOpportunity.level >= 60
                    ? `You're close to proficiency. Strengthening your ${biggestOpportunity.name} skills will open up more learning and career opportunities.`
                    : `Building your ${biggestOpportunity.name} foundation can create a strong path toward future learning opportunities.`}
                </p>

                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<FiArrowRight />}
                  className="skill-gap-overview__resource-button"
                  onClick={handleExploreResources}
                >
                  <FiBookOpen />
                  Explore Learning Resources
                </Button>
              </>
            ) : (
              <div className="skill-gap-overview__no-gap">
                <FiCheckCircle />

                <strong>Great work — no major skill gaps found.</strong>

                <span>Continue developing your strongest skills.</span>
              </div>
            )}

            <div className="skill-gap-overview__opportunity-caption">
              <span>Small</span>
              <span>improvements</span>
              <span>create big</span>
              <span>opportunities.</span>
            </div>
          </Card>
        </div>

        {/* ===================================================
            BOTTOM THREE CARDS
        =================================================== */}

        <div className="skill-gap-overview__bottom-grid">
          {/* =================================================
              TOP SKILLS — GREEN
          ================================================= */}

          <Card className="skill-gap-overview__bottom-card skill-gap-overview__bottom-card--green">
            <div className="skill-gap-overview__bottom-heading">
              <div className="skill-gap-overview__bottom-icon">
                <FiTrendingUp />
              </div>

              <div>
                <h3>Top Skills</h3>

                <p>Your strongest skills. Keep up the great work!</p>
              </div>
            </div>

            <div className="skill-gap-overview__skill-list">
              {topSkills.map((skill, index) => (
                <button
                  type="button"
                  className="skill-gap-overview__skill-row"
                  key={skill.id}
                  onClick={() => handleSkillDetails(skill)}
                >
                  <span className="skill-gap-overview__rank skill-gap-overview__rank--green">
                    {index + 1}
                  </span>

                  <span className="skill-gap-overview__skill-name">
                    {skill.name}
                  </span>

                  <span className="skill-gap-overview__mini-progress">
                    <span
                      style={{
                        width: `${skill.level}%`,
                      }}
                    />
                  </span>

                  <strong>{skill.level}%</strong>
                </button>
              ))}
            </div>
          </Card>

          {/* =================================================
              SKILLS NEEDING ATTENTION — RED
          ================================================= */}

          <Card className="skill-gap-overview__bottom-card skill-gap-overview__bottom-card--red">
            <div className="skill-gap-overview__bottom-heading">
              <div className="skill-gap-overview__bottom-icon">
                <FiAlertCircle />
              </div>

              <div>
                <h3>Skills Needing Attention</h3>

                <p>Focus on these skills to close your gaps.</p>
              </div>
            </div>

            <div className="skill-gap-overview__skill-list">
              {highPrioritySkills.length > 0 ? (
                highPrioritySkills.map((skill, index) => (
                  <button
                    type="button"
                    className="skill-gap-overview__skill-row"
                    key={skill.id}
                    onClick={() => handleSkillDetails(skill)}
                  >
                    <span className="skill-gap-overview__rank skill-gap-overview__rank--red">
                      {index + 1}
                    </span>

                    <span className="skill-gap-overview__skill-name">
                      {skill.name}
                    </span>

                    <span className="skill-gap-overview__mini-progress skill-gap-overview__mini-progress--red">
                      <span
                        style={{
                          width: `${skill.level}%`,
                        }}
                      />
                    </span>

                    <strong>{skill.level}%</strong>
                  </button>
                ))
              ) : (
                <div className="skill-gap-overview__empty-row">
                  <FiCheckCircle />
                  <span>No skills need immediate attention.</span>
                </div>
              )}
            </div>
          </Card>

          {/* =================================================
              RECOMMENDED NEXT STEPS — WHITE / BLUE
          ================================================= */}

          <Card className="skill-gap-overview__bottom-card skill-gap-overview__bottom-card--white">
            <div className="skill-gap-overview__bottom-heading">
              <div className="skill-gap-overview__bottom-icon">
                <FiZap  />
              </div>

              <div>
                <h3>Recommended Next Steps</h3>

                <p>Take action to close your skill gaps.</p>
              </div>
            </div>

            <div className="skill-gap-overview__recommendation-list">
              <button
                type="button"
                className="skill-gap-overview__recommendation"
                onClick={handleExploreResources}
              >
                <span className="skill-gap-overview__recommendation-icon skill-gap-overview__recommendation-icon--blue">
                  <FiBookOpen />
                </span>

                <span>Explore relevant courses</span>

                <FiArrowRight />
              </button>

              <button
                type="button"
                className="skill-gap-overview__recommendation"
                onClick={handleExploreResources}
              >
                <span className="skill-gap-overview__recommendation-icon skill-gap-overview__recommendation-icon--purple">
                  <FiCode />
                </span>

                <span>Practice with real-world projects</span>

                <FiArrowRight />
              </button>

              <button
                type="button"
                className="skill-gap-overview__recommendation"
                onClick={handleSkillDetails}
              >
                <span className="skill-gap-overview__recommendation-icon skill-gap-overview__recommendation-icon--violet">
                  <FiBarChart2 />
                </span>

                <span>Track your progress regularly</span>

                <FiArrowRight />
              </button>
            </div>
          </Card>
        </div>
      </Card>
    </section>
  );
};

export default SkillGapOverview;
