import React from "react";
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiCheckCircle,
  FiCode,
  FiCompass,
  FiDatabase,
  FiLayers,
  FiMessageCircle,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./SkillsOverview.css";

/* =========================================================
   DEFAULT SKILL DATA
========================================================= */

const defaultSkills = [
  {
    id: "technical",
    name: "Technical Skills",
    shortName: "Technical",
    progress: 82,
    icon: <FiCode />,
    theme: "cyan",
    status: "Strong",
  },
  {
    id: "data",
    name: "Data & Analytics",
    shortName: "Data",
    progress: 72,
    icon: <FiDatabase />,
    theme: "amber",
    status: "Developing",
  },
  {
    id: "communication",
    name: "Communication",
    shortName: "Communication",
    progress: 68,
    icon: <FiMessageCircle />,
    theme: "lavender",
    status: "Developing",
  },
  {
    id: "professional",
    name: "Professional Skills",
    shortName: "Professional",
    progress: 76,
    icon: <FiTrendingUp />,
    theme: "mint",
    status: "Strong",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const clamp = (value) => {
  return Math.min(100, Math.max(0, Number(value) || 0));
};

/* =========================================================
   COMPONENT
========================================================= */

const SkillsOverview = ({
  totalSkills = 12,
  averageProficiency = 75,
  strongSkills = 6,
  developingSkills = 4,
  skills = defaultSkills,
  onViewAllSkills,
}) => {
  const safeAverage = clamp(averageProficiency);

  const safeSkills =
    Array.isArray(skills) && skills.length > 0 ? skills : defaultSkills;

  return (
    <section className="skills-overview">
      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <div className="skills-overview__heading">
        <div className="skills-overview__heading-left">
          <div className="skills-overview__eyebrow">
            <Badge variant="cyan" appearance="soft" size="sm" shape="pill">
              SKILLS OVERVIEW
            </Badge>

            <span className="skills-overview__heading-line" />
          </div>

          <h2 className="skills-overview__title">
            See where your skills stand
          </h2>

          <p className="skills-overview__description">
            Understand your current capability level, track progress across
            important skill areas, and identify opportunities for growth.
          </p>
        </div>

        <Button
          variant="ghost"
          size="md"
          rounded="lg"
          rightIcon={<FiArrowRight />}
          onClick={onViewAllSkills}
          className="skills-overview__view-all"
        >
          View All Skills
        </Button>
      </div>

      {/* =====================================================
          THREE PANEL LAYOUT
      ===================================================== */}

      <div className="skills-overview__layout">
        {/* ===================================================
            LEFT PANEL
            OVERALL STATISTICS
        =================================================== */}

        <Card
          variant="glass"
          size="lg"
          rounded="xl"
          hover={true}
          className="
            skills-overview__panel
            skills-overview__panel--statistics
          "
        >
          <div className="skills-overview__panel-header">
            <div>
              <span className="skills-overview__panel-eyebrow">
                YOUR CAPABILITY
              </span>

              <h3>Skill statistics</h3>
            </div>

            <div className="skills-overview__header-icon">
              <FiBarChart2 />
            </div>
          </div>

          {/* -----------------------------------------------
              MAIN CIRCLE
          ----------------------------------------------- */}

          <div className="skills-overview__main-circle">
            <div
              className="skills-overview__circle-ring"
              style={{
                "--progress": `${safeAverage * 3.6}deg`,
              }}
            >
              <div className="skills-overview__circle-inner">
                <span>Average</span>

                <strong>{safeAverage}%</strong>

                <small>Proficiency</small>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------
              STATISTICS
          ----------------------------------------------- */}

          <div className="skills-overview__statistics">
            <div className="skills-overview__stat">
              <span
                className="
                  skills-overview__stat-icon
                  skills-overview__stat-icon--cyan
                "
              >
                <FiLayers />
              </span>

              <div>
                <strong>{totalSkills}</strong>

                <span>Total skills</span>
              </div>
            </div>

            <div className="skills-overview__stat">
              <span
                className="
                  skills-overview__stat-icon
                  skills-overview__stat-icon--mint
                "
              >
                <FiAward />
              </span>

              <div>
                <strong>{strongSkills}</strong>

                <span>Strong skills</span>
              </div>
            </div>

            <div className="skills-overview__stat">
              <span
                className="
                  skills-overview__stat-icon
                  skills-overview__stat-icon--lavender
                "
              >
                <FiTrendingUp />
              </span>

              <div>
                <strong>{developingSkills}</strong>

                <span>Developing</span>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------
              BOTTOM MESSAGE
          ----------------------------------------------- */}

          <div className="skills-overview__panel-note">
            <FiCheckCircle />

            <span>
              You're making steady progress across your learning journey.
            </span>
          </div>
        </Card>

        {/* ===================================================
            MIDDLE PANEL
            SKILL PROGRESS
        =================================================== */}

        <Card
          variant="glass"
          size="lg"
          rounded="xl"
          hover={true}
          className="
            skills-overview__panel
            skills-overview__panel--progress
          "
        >
          <div className="skills-overview__panel-header">
            <div>
              <span className="skills-overview__panel-eyebrow">PROGRESS</span>

              <h3>Skill development</h3>
            </div>

            <div className="skills-overview__header-icon">
              <FiTrendingUp />
            </div>
          </div>

          {/* -----------------------------------------------
              PROGRESS INTRO
          ----------------------------------------------- */}

          <div className="skills-overview__progress-intro">
            <span>Current proficiency</span>

            <strong>{safeAverage}%</strong>
          </div>

          {/* -----------------------------------------------
              SKILL PROGRESS LIST
          ----------------------------------------------- */}

          <div className="skills-overview__progress-list">
            {safeSkills.map((skill) => {
              const progress = clamp(skill.progress);

              return (
                <div
                  className={`
                    skills-overview__progress-item
                    skills-overview__progress-item--${skill.theme || "cyan"}
                  `}
                  key={skill.id || skill.name}
                >
                  {/* -------------------------------------
                      TOP
                  ------------------------------------- */}

                  <div className="skills-overview__progress-top">
                    <div className="skills-overview__progress-name">
                      <span className="skills-overview__progress-icon">
                        {skill.icon || <FiLayers />}
                      </span>

                      <strong>{skill.name}</strong>
                    </div>

                    <span className="skills-overview__progress-value">
                      {progress}%
                    </span>
                  </div>

                  {/* -------------------------------------
                      DESCRIPTION
                  ------------------------------------- */}

                  <div className="skills-overview__progress-description">
                    <span>{skill.status || "Developing capability"}</span>
                  </div>

                  {/* -------------------------------------
                      BAR
                  ------------------------------------- */}

                  <div
                    className="skills-overview__bar"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${skill.name}: ${progress}%`}
                  >
                    <span
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* -----------------------------------------------
              FOOTER
          ----------------------------------------------- */}

          <div className="skills-overview__progress-footer">
            <FiTarget />

            <span>Keep strengthening your developing skills.</span>
          </div>
        </Card>

        {/* ===================================================
            RIGHT PANEL
            SKILLS BY CATEGORY
        =================================================== */}

        <Card
          variant="glass"
          size="lg"
          rounded="xl"
          hover={true}
          className="
            skills-overview__panel
            skills-overview__panel--categories
          "
        >
          <div className="skills-overview__panel-header">
            <div>
              <span className="skills-overview__panel-eyebrow">
                CAPABILITY AREAS
              </span>

              <h3>Skills by category</h3>
            </div>

            <div className="skills-overview__header-icon">
              <FiCompass />
            </div>
          </div>

          {/* -----------------------------------------------
              CATEGORY CIRCLES
          ----------------------------------------------- */}

          <div className="skills-overview__category-grid">
            {safeSkills.map((skill) => {
              const progress = clamp(skill.progress);

              return (
                <div
                  className={`
                    skills-overview__category
                    skills-overview__category--${skill.theme || "cyan"}
                  `}
                  key={`category-${skill.id || skill.name}`}
                >
                  <div
                    className="skills-overview__category-circle"
                    style={{
                      "--category-progress": `${progress * 3.6}deg`,
                    }}
                  >
                    <div className="skills-overview__category-circle-inner">
                      <span className="skills-overview__category-icon">
                        {skill.icon || <FiLayers />}
                      </span>

                      <strong>{progress}%</strong>
                    </div>
                  </div>

                  <strong className="skills-overview__category-name">
                    {skill.shortName || skill.name}
                  </strong>

                  <span className="skills-overview__category-status">
                    {skill.status || "Developing"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* -----------------------------------------------
              CATEGORY FOOTER
          ----------------------------------------------- */}

          <div className="skills-overview__category-footer">
            <div className="skills-overview__category-footer-icon">
              <FiCompass />
            </div>

            <div>
              <strong>Balanced growth</strong>

              <span>Continue developing each capability area.</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            rounded="lg"
            rightIcon={<FiArrowRight />}
            onClick={onViewAllSkills}
            className="skills-overview__category-button"
          >
            Explore Skills
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default SkillsOverview;
