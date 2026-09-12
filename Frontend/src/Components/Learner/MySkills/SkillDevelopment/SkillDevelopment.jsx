import React from "react";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCode,
  FiDatabase,
  FiMessageCircle,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiPenTool,
  FiGrid,
  FiCheckCircle,
  FiAward,
  FiCompass,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./SkillDevelopment.css";

/* =========================================================
   DEFAULT SKILL DATA
========================================================= */

const defaultSkills = [
  {
    id: 1,
    name: "JavaScript",
    category: "Technical Skills",
    progress: 84,
    target: 90,
    status: "Strong",
    statusType: "success",
    improvement: 6,
    icon: FiCode,
    theme: "cyan",
  },
  {
    id: 2,
    name: "SQL",
    category: "Data & Analytics",
    progress: 72,
    target: 85,
    status: "Developing",
    statusType: "warning",
    improvement: 13,
    icon: FiDatabase,
    theme: "amber",
  },
  {
    id: 3,
    name: "Communication",
    category: "Professional Skills",
    progress: 68,
    target: 80,
    status: "Developing",
    statusType: "purple",
    improvement: 12,
    icon: FiMessageCircle,
    theme: "purple",
  },
  {
    id: 4,
    name: "Problem Solving",
    category: "Professional Skills",
    progress: 76,
    target: 85,
    status: "Strong",
    statusType: "success",
    improvement: 9,
    icon: FiTrendingUp,
    theme: "green",
  },
  {
    id: 5,
    name: "UI/UX Design",
    category: "Technical Skills",
    progress: 54,
    target: 75,
    status: "Learning",
    statusType: "info",
    improvement: 21,
    icon: FiPenTool,
    theme: "pink",
  },
  {
    id: 6,
    name: "Team Collaboration",
    category: "Communication",
    progress: 80,
    target: 90,
    status: "Strong",
    statusType: "success",
    improvement: 10,
    icon: FiUsers,
    theme: "blue",
  },
];

/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = [
  {
    id: "all",
    label: "All Skills",
    icon: FiGrid,
  },
  {
    id: "technical",
    label: "Technical",
    icon: FiCode,
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: FiDatabase,
  },
  {
    id: "professional",
    label: "Professional",
    icon: FiTrendingUp,
  },
  {
    id: "communication",
    label: "Communication",
    icon: FiMessageCircle,
  },
];

/* =========================================================
   CATEGORY MATCHING
========================================================= */

const getCategoryKey = (category) => {
  const value = category.toLowerCase();

  if (value.includes("technical")) return "technical";
  if (value.includes("data")) return "data";
  if (value.includes("professional")) return "professional";
  if (value.includes("communication")) return "communication";

  return "all";
};

/* =========================================================
   BADGE VARIANT HELPER
========================================================= */

const getBadgeVariant = (type) => {
  switch (type) {
    case "success":
      return "success";

    case "warning":
      return "warning";

    case "info":
      return "cyan";

    case "purple":
      return "purple";

    default:
      return "cyan";
  }
};

/* =========================================================
   COMPONENT
========================================================= */

const SkillDevelopment = ({
  skills = defaultSkills,
  onViewAllSkills,
  onViewSkillDetails,
  onSetLearningGoals,
}) => {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  /* -------------------------------------------------------
     FILTER SKILLS
  ------------------------------------------------------- */

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      activeCategory === "all" ||
      getCategoryKey(skill.category) === activeCategory;

    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="skill-development">
      <Card
        variant="glass"
        size="lg"
        rounded="xl"
        hover={false}
        className="skill-development__card"
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="skill-development__header">
          <div className="skill-development__header-main">
            <div className="skill-development__header-icon">
              <FiTrendingUp />
            </div>

            <div className="skill-development__header-copy">
              <span className="skill-development__eyebrow">
                SKILL DEVELOPMENT
              </span>

              <h2>Track your skill development</h2>

              <p>
                See detailed progress for each skill, set your targets and keep
                moving forward.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            rounded="lg"
            rightIcon={<FiArrowRight />}
            onClick={onViewAllSkills}
            className="skill-development__view-all"
          >
            View All Skills
          </Button>
        </div>

        {/* =================================================
            FILTER BAR
        ================================================= */}

        <div className="skill-development__toolbar">
          <div className="skill-development__categories">
            {categories.map((category) => {
              const CategoryIcon = category.icon;

              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`skill-development__category ${
                    isActive ? "skill-development__category--active" : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="skill-development__category-icon">
                    <CategoryIcon />
                  </span>

                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          <label className="skill-development__search">
            <FiSearch />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search skills..."
              aria-label="Search skills"
            />
          </label>
        </div>

        {/* =================================================
            SKILL LIST
        ================================================= */}

        <div className="skill-development__list">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => {
              const SkillIcon = skill.icon;

              return (
                <article
                  key={skill.id}
                  className={`skill-development__row skill-development__row--${skill.theme}`}
                >
                  {/* ---------------------------------------
                      SKILL INFORMATION
                  --------------------------------------- */}

                  <div className="skill-development__skill">
                    <div className="skill-development__skill-icon">
                      <SkillIcon />
                    </div>

                    <div className="skill-development__skill-copy">
                      <div className="skill-development__skill-title">
                        <h3>{skill.name}</h3>

                        <Badge
                          variant={getBadgeVariant(skill.statusType)}
                          appearance="soft"
                          size="sm"
                          shape="pill"
                        >
                          {skill.status}
                        </Badge>
                      </div>

                      <p>{skill.category}</p>
                    </div>
                  </div>

                  {/* ---------------------------------------
                      PROGRESS
                  --------------------------------------- */}

                  <div className="skill-development__progress">
                    <div className="skill-development__progress-top">
                      <span className="skill-development__progress-label">
                        Current proficiency
                      </span>

                      <strong>{skill.progress}%</strong>
                    </div>

                    <div
                      className="skill-development__progress-track"
                      role="progressbar"
                      aria-valuenow={skill.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${skill.name} current proficiency ${skill.progress}%`}
                    >
                      <span
                        className="skill-development__progress-value"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, skill.progress),
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="skill-development__progress-meta">
                      <span>
                        Current: <strong>{skill.progress}%</strong>
                      </span>

                      <span>
                        Target: <strong>{skill.target}%</strong>
                      </span>

                      <span className="skill-development__improvement">
                        <FiArrowRight />+{skill.improvement}%
                      </span>
                    </div>
                  </div>

                  {/* ---------------------------------------
                      TARGET
                  --------------------------------------- */}

                  <div className="skill-development__target">
                    <div className="skill-development__target-icon">
                      <FiTarget />
                    </div>

                    <div className="skill-development__target-copy">
                      <strong>{skill.target}%</strong>

                      <span>Target level</span>
                    </div>
                  </div>

                  {/* ---------------------------------------
                      ACTION
                  --------------------------------------- */}

                  <Button
                    variant="outline"
                    size="md"
                    rounded="lg"
                    rightIcon={<FiArrowRight />}
                    onClick={() => onViewSkillDetails?.(skill)}
                    className="skill-development__details-button"
                  >
                    View Details
                  </Button>
                </article>
              );
            })
          ) : (
            <div className="skill-development__empty">
              <div className="skill-development__empty-icon">
                <FiSearch />
              </div>

              <h3>No skills found</h3>

              <p>
                Try another search term or select a different skill category.
              </p>
            </div>
          )}
        </div>

        {/* =================================================
            FOOTER / LEARNING GOAL
        ================================================= */}

        <div className="skill-development__footer">
          <div className="skill-development__footer-message">
            <div className="skill-development__footer-icon">
              <FiAward />
            </div>

            <div>
              <h3>Keep going! You&apos;re making great progress.</h3>

              <p>
                Continue developing your skills to reach your target levels.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            rounded="lg"
            rightIcon={<FiArrowRight />}
            onClick={onSetLearningGoals}
            className="skill-development__goal-button"
          >
            Set Learning Goals
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default SkillDevelopment;
