import React from "react";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiCompass,
  FiLayers,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./MySkillsHeader.css";

const MySkillsHeader = ({
  totalSkills = 0,
  overallProficiency = 75,
  completedSkills = 0,
  onViewSkillGaps,
  onExploreRecommendations,
}) => {
  const safeProficiency = Math.min(
    100,
    Math.max(0, Number(overallProficiency) || 0),
  );

  return (
    <section className="my-skills-header">
      {/* =====================================================
          TOP SECTION
      ===================================================== */}

      <div className="my-skills-header__intro">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="my-skills-header__intro-content">
          {/* -------------------------------------------------
              EYEBROW
          ------------------------------------------------- */}

          <div className="my-skills-header__eyebrow">
            <Badge variant="cyan" appearance="soft" size="sm" shape="pill">
              MY SKILLS
            </Badge>

            <span className="my-skills-header__eyebrow-line" />
          </div>

          {/* -------------------------------------------------
              TITLE
          ------------------------------------------------- */}

          <h1 className="my-skills-header__title">
            Build today.
            <span>A stronger tomorrow.</span>
          </h1>

          {/* -------------------------------------------------
              DESCRIPTION
          ------------------------------------------------- */}

          <p className="my-skills-header__description">
            Understand your capabilities, track your progress, and identify the
            skills that can move your professional journey forward.
          </p>

          {/* =================================================
              INSIGHTS
          ================================================= */}

          <div className="my-skills-header__insights">
            {/* ------------------------------------------------
                TRACK PROGRESS
            ------------------------------------------------ */}

            <div
              className="
                my-skills-header__insight
                my-skills-header__insight--cyan
              "
            >
              <span className="my-skills-header__insight-icon">
                <FiTrendingUp />
              </span>

              <div className="my-skills-header__insight-content">
                <strong>Track Your Progress</strong>

                <span>See how your skills are developing</span>
              </div>
            </div>

            {/* ------------------------------------------------
                IDENTIFY SKILL GAPS
            ------------------------------------------------ */}

            <div
              className="
                my-skills-header__insight
                my-skills-header__insight--amber
              "
            >
              <span className="my-skills-header__insight-icon">
                <FiTarget />
              </span>

              <div className="my-skills-header__insight-content">
                <strong>Identify Skill Gaps</strong>

                <span>Discover where you can improve</span>
              </div>
            </div>

            {/* ------------------------------------------------
                NEXT STEP
            ------------------------------------------------ */}

            <div
              className="
                my-skills-header__insight
                my-skills-header__insight--lavender
              "
            >
              <span className="my-skills-header__insight-icon">
                <FiCompass />
              </span>

              <div className="my-skills-header__insight-content">
                <strong>Find Your Next Step</strong>

                <span>Get learning recommendations</span>
              </div>
            </div>
          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="my-skills-header__actions">
            <Button
              variant="primary"
              size="lg"
              rounded="lg"
              rightIcon={<FiArrowRight />}
              onClick={onViewSkillGaps}
              className="my-skills-header__primary-button"
            >
              View Skill Gaps
            </Button>

            <Button
              variant="outline"
              size="lg"
              rounded="lg"
              leftIcon={<FiBookOpen />}
              onClick={onExploreRecommendations}
              className="my-skills-header__secondary-button"
            >
              Explore Recommendations
            </Button>
          </div>
        </div>

        {/* =================================================
            DARK CAPABILITY PANEL
        ================================================= */}

        <Card
          variant="glass"
          size="lg"
          rounded="xl"
          hover={true}
          className="my-skills-header__capability-panel"
        >
          {/* -------------------------------------------------
              PANEL HEADER
          ------------------------------------------------- */}

          <div className="my-skills-header__panel-header">
            <div className="my-skills-header__growth-badge">
              <FiTrendingUp />

              <span>Growth Mindset</span>
            </div>

            <span className="my-skills-header__growth-message">
              Small steps. Big progress.
            </span>
          </div>

          {/* -------------------------------------------------
              PANEL INTRO
          ------------------------------------------------- */}

          <div className="my-skills-header__panel-intro">
            <div className="my-skills-header__panel-icon">
              <FiZap />
            </div>

            <div className="my-skills-header__panel-copy">
              <span className="my-skills-header__panel-label">
                YOUR DEVELOPMENT
              </span>

              <h2>Continuous growth</h2>

              <p>
                Keep learning, practicing, and improving your professional
                capabilities.
              </p>
            </div>
          </div>

          {/* =================================================
              DEVELOPMENT STEPS
          ================================================= */}

          <div className="my-skills-header__development">
            <div
              className="
                my-skills-header__development-item
                my-skills-header__development-item--learn
              "
            >
              <span className="my-skills-header__development-icon">
                <FiBookOpen />
              </span>

              <div>
                <span>01</span>
                <strong>Learn</strong>
              </div>
            </div>

            <div
              className="
                my-skills-header__development-item
                my-skills-header__development-item--practice
              "
            >
              <span className="my-skills-header__development-icon">
                <FiLayers />
              </span>

              <div>
                <span>02</span>
                <strong>Practice</strong>
              </div>
            </div>

            <div
              className="
                my-skills-header__development-item
                my-skills-header__development-item--improve
              "
            >
              <span className="my-skills-header__development-icon">
                <FiTrendingUp />
              </span>

              <div>
                <span>03</span>
                <strong>Improve</strong>
              </div>
            </div>

            <div
              className="
                my-skills-header__development-item
                my-skills-header__development-item--achieve
              "
            >
              <span className="my-skills-header__development-icon">
                <FiAward />
              </span>

              <div>
                <span>04</span>
                <strong>Achieve</strong>
              </div>
            </div>
          </div>

          {/* =================================================
              PROFICIENCY
          ================================================= */}

          <div className="my-skills-header__proficiency">
            <div className="my-skills-header__proficiency-top">
              <div className="my-skills-header__proficiency-value-label">
                <span>Current proficiency</span>

                <strong>{safeProficiency}%</strong>
              </div>

              <span className="my-skills-header__proficiency-status">
                {safeProficiency >= 75 ? "Strong momentum" : "Keep building"}
              </span>
            </div>

            <div
              className="my-skills-header__proficiency-track"
              role="progressbar"
              aria-valuenow={safeProficiency}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Current proficiency ${safeProficiency}%`}
            >
              <span
                className="my-skills-header__proficiency-value"
                style={{
                  width: `${safeProficiency}%`,
                }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          BOTTOM SUMMARY
      ===================================================== */}

      <div className="my-skills-header__summary">
        {/* TOTAL SKILLS */}

        <Card
          variant="glass"
          size="sm"
          rounded="lg"
          hover={true}
          className="
            my-skills-header__summary-card
            my-skills-header__summary-card--cyan
          "
        >
          <span className="my-skills-header__summary-icon">
            <FiLayers />
          </span>

          <div className="my-skills-header__summary-copy">
            <span>Total skills</span>

            <strong>{totalSkills}</strong>

            <small>Skills being developed</small>
          </div>
        </Card>

        {/* AVERAGE PROFICIENCY */}

        <Card
          variant="glass"
          size="sm"
          rounded="lg"
          hover={true}
          className="
            my-skills-header__summary-card
            my-skills-header__summary-card--mint
          "
        >
          <span className="my-skills-header__summary-icon">
            <FiTrendingUp />
          </span>

          <div className="my-skills-header__summary-copy">
            <span>Average proficiency</span>

            <strong>{safeProficiency}%</strong>

            <small>Overall capability level</small>
          </div>
        </Card>

        {/* COMPLETED */}

        <Card
          variant="glass"
          size="sm"
          rounded="lg"
          hover={true}
          className="
            my-skills-header__summary-card
            my-skills-header__summary-card--amber
          "
        >
          <span className="my-skills-header__summary-icon">
            <FiCheckCircle />
          </span>

          <div className="my-skills-header__summary-copy">
            <span>Completed</span>

            <strong>{completedSkills}</strong>

            <small>Skills completed successfully</small>
          </div>
        </Card>

        {/* GROWTH */}

        <Card
          variant="glass"
          size="sm"
          rounded="lg"
          hover={true}
          className="
            my-skills-header__summary-card
            my-skills-header__summary-card--lavender
          "
        >
          <span className="my-skills-header__summary-icon">
            <FiCheckCircle />
          </span>

          <div className="my-skills-header__summary-copy">
            <span>Growth outcome</span>

            <strong>Better skills.</strong>

            <small>Better opportunities.</small>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MySkillsHeader;
