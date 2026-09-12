// src/Components/Learner/SkillGaps/SkillGapsHeader/SkillGapsHeader.jsx

import React from "react";
import {
  FiHome,
  FiChevronRight,
  FiBarChart2,
  FiTarget,
  FiBookOpen,
  FiArrowRight,
  FiGrid,
  FiTrendingUp,
  FiAward,
  FiCheckCircle,
  FiZap,
  FiCompass,
  FiActivity,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./SkillGapsHeader.css";

/*
|--------------------------------------------------------------------------
| Hero Image
|--------------------------------------------------------------------------
| Keep this empty for now.
| Later you can simply add:
|
| const HERO_IMAGE = "/Images/your-image.avif";
|
*/

const HERO_IMAGE = "";

/*
|--------------------------------------------------------------------------
| Default Data
|--------------------------------------------------------------------------
*/

const DEFAULT_STATS = {
  totalSkills: 12,
  skillsToImprove: 4,
  averageGap: 33,
  growthPotential: 100,
};

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

const SkillGapsHeader = ({
  stats = {},
  onExploreSkillGaps,
  onViewLearningResources,
}) => {
  /*
  |--------------------------------------------------------------------------
  | Safe Stats
  |--------------------------------------------------------------------------
  */

  const totalSkills = Number(stats?.totalSkills) || DEFAULT_STATS.totalSkills;

  const skillsToImprove =
    Number(stats?.developingSkills) ||
    Number(stats?.skillsToImprove) ||
    DEFAULT_STATS.skillsToImprove;

  /*
  |--------------------------------------------------------------------------
  | Average Gap
  |--------------------------------------------------------------------------
  | Your current skills.js does not contain target levels yet,
  | therefore this remains a presentation value for now.
  | It can later come directly from skillGaps.js.
  */

  const averageGap = Number(stats?.averageGap) || DEFAULT_STATS.averageGap;

  const growthPotential =
    Number(stats?.growthPotential) || DEFAULT_STATS.growthPotential;

  /*
  |--------------------------------------------------------------------------
  | Growth Progress
  |--------------------------------------------------------------------------
  */

  const growthProgress = Math.min(100, Math.max(0, growthPotential));

  /*
  |--------------------------------------------------------------------------
  | Button Handlers
  |--------------------------------------------------------------------------
  */

  const handleExploreSkillGaps = () => {
    if (onExploreSkillGaps) {
      onExploreSkillGaps();
    }
  };

  const handleViewLearningResources = () => {
    if (onViewLearningResources) {
      onViewLearningResources();
    }
  };

  return (
    <section className="skill-gaps-header">
      <Card variant="glass" className="skill-gaps-header__card">
        {/* =========================================================
            BACKGROUND IMAGE / VISUAL LAYER
        ========================================================= */}

        <div
          className="skill-gaps-header__background-image"
          style={
            HERO_IMAGE
              ? {
                  backgroundImage: `url("${HERO_IMAGE}")`,
                }
              : undefined
          }
          aria-hidden="true"
        />

        <div
          className="skill-gaps-header__background-overlay"
          aria-hidden="true"
        />

        <div className="skill-gaps-header__wave" aria-hidden="true" />

        {/* =========================================================
            TOP NAVIGATION / BREADCRUMB
        ========================================================= */}

        <div className="skill-gaps-header__topbar">
          <div className="skill-gaps-header__breadcrumb">
            <span className="skill-gaps-header__breadcrumb-home">
              <FiHome aria-hidden="true" />
            </span>

            <span>Home</span>

            <FiChevronRight
              className="skill-gaps-header__breadcrumb-arrow"
              aria-hidden="true"
            />

            <span className="skill-gaps-header__breadcrumb-current">
              Skill Gaps
            </span>
          </div>

          {/* =====================================================
              TOP RIGHT QUOTE
          ===================================================== */}

          <div className="skill-gaps-header__quote-area">
            <span className="skill-gaps-header__quote-dot" />

            <p className="skill-gaps-header__quote">
              “Every skill gap is a new opportunity
              <br className="skill-gaps-header__quote-break" />
              to become a better version of you.”
            </p>

            <div className="skill-gaps-header__page-indicator">
              <span className="is-active" />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* =========================================================
            HERO BODY
        ========================================================= */}

        <div className="skill-gaps-header__hero">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div className="skill-gaps-header__left">
            {/* =================================================
                BADGE
            ================================================= */}

            <div className="skill-gaps-header__badge-row">
              <Badge
                variant="info"
                size="md"
                className="skill-gaps-header__badge"
              >
                <span className="skill-gaps-header__badge-icon">
                  <FiBarChart2 aria-hidden="true" />
                </span>

                <span>SKILL GAP ANALYSIS</span>
              </Badge>

              <div className="skill-gaps-header__process">
                <span>Identify</span>
                <b>•</b>
                <span>Plan</span>
                <b>•</b>
                <span>Grow</span>
              </div>
            </div>

            {/* =================================================
                TITLE
            ================================================= */}

            <h1 className="skill-gaps-header__title">
              Skill Gaps
              <span>
                Your Roadmap to <strong>Growth</strong>
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p className="skill-gaps-header__description">
              Discover the skills you can improve, understand the gaps, and get
              personalized recommendations to help you grow. Turn insights into
              action and move one step closer to your goals.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="skill-gaps-header__actions">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<FiArrowRight aria-hidden="true" />}
                onClick={handleExploreSkillGaps}
                className="skill-gaps-header__primary-button"
              >
                Explore Skill Gaps
              </Button>

              <Button
                variant="outline"
                size="lg"
                leftIcon={<FiBookOpen aria-hidden="true" />}
                onClick={handleViewLearningResources}
                className="skill-gaps-header__secondary-button"
              >
                View Learning Resources
              </Button>
            </div>
          </div>

          {/* =====================================================
              RIGHT VISUAL
          ===================================================== */}

          <div className="skill-gaps-header__visual">
            {/* =================================================
                OCEAN / IMAGE AREA

                Image path intentionally empty for now.
            ================================================= */}

            <div
              className="skill-gaps-header__ocean-image"
              style={
                HERO_IMAGE
                  ? {
                      backgroundImage: `url("${HERO_IMAGE}")`,
                    }
                  : undefined
              }
            />

            <div className="skill-gaps-header__ocean-gradient" />

            {/* =================================================
                TILTED GLASS CARD
            ================================================= */}

            <div className="skill-gaps-header__growth-card">
              <div className="skill-gaps-header__growth-inner">
                {/* =================================================
                    HALF CIRCULAR PROGRESS
                ================================================= */}

                <div className="skill-gaps-header__growth-ring">
                  <div className="skill-gaps-header__ring-track" />

                  <div className="skill-gaps-header__ring-progress" />

                  <div className="skill-gaps-header__growth-center">
                    <span className="skill-gaps-header__growth-icon">
                      <FiZap aria-hidden="true" />
                    </span>

                    <strong>Growth</strong>
                    <strong>Ahead</strong>

                    <div className="skill-gaps-header__growth-divider" />

                    <span className="skill-gaps-header__growth-text">
                      Close the gap,
                      <br />
                      create new opportunities.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FLOATING LEARN CARD
            ================================================= */}

            <div className="skill-gaps-header__floating-card skill-gaps-header__floating-card--learn">
              <span className="skill-gaps-header__floating-icon">
                <FiCompass aria-hidden="true" />
              </span>

              <span>Learn</span>
            </div>

            {/* =================================================
                FLOATING IMPROVE CARD
            ================================================= */}

            <div className="skill-gaps-header__floating-card skill-gaps-header__floating-card--improve">
              <span className="skill-gaps-header__floating-icon">
                <FiBarChart2 aria-hidden="true" />
              </span>

              <span>Improve</span>
            </div>

            {/* =================================================
                FLOATING ACHIEVE CARD
            ================================================= */}

            <div className="skill-gaps-header__floating-card skill-gaps-header__floating-card--achieve">
              <span className="skill-gaps-header__floating-icon">
                <FiAward aria-hidden="true" />
              </span>

              <span>Achieve</span>
            </div>

            {/* =================================================
                CONNECTING ARROW
            ================================================= */}

            <div className="skill-gaps-header__visual-arrow" aria-hidden="true">
              <span />
              <span />
              <FiArrowRight />
            </div>

            {/* =================================================
                DECORATIVE LIGHTHOUSE TEXT
            ================================================= */}

            <div className="skill-gaps-header__visual-caption">
              <span>Better</span>
              <span>Skills</span>
              <span>Brighter</span>
              <span>Future</span>
            </div>

            {/* =================================================
                DECORATIVE PARTICLES
            ================================================= */}

            <span className="skill-gaps-header__particle skill-gaps-header__particle--one" />
            <span className="skill-gaps-header__particle skill-gaps-header__particle--two" />
            <span className="skill-gaps-header__particle skill-gaps-header__particle--three" />
            <span className="skill-gaps-header__particle skill-gaps-header__particle--four" />
          </div>
        </div>

        {/* =========================================================
            FOUR STATISTICS
        ========================================================= */}

        <div className="skill-gaps-header__stats">
          {/* =====================================================
              TOTAL SKILLS
          ===================================================== */}

          <Card
            variant="glass"
            className="skill-gaps-header__stat-card skill-gaps-header__stat-card--blue"
          >
            <div className="skill-gaps-header__stat-icon">
              <FiGrid aria-hidden="true" />
            </div>

            <div className="skill-gaps-header__stat-content">
              <strong>{totalSkills}</strong>
              <span>Total Skills</span>
            </div>

            <FiChevronRight className="skill-gaps-header__stat-arrow" />
          </Card>

          {/* =====================================================
              SKILLS TO IMPROVE
          ===================================================== */}

          <Card
            variant="glass"
            className="skill-gaps-header__stat-card skill-gaps-header__stat-card--orange"
          >
            <div className="skill-gaps-header__stat-icon">
              <FiTarget aria-hidden="true" />
            </div>

            <div className="skill-gaps-header__stat-content">
              <strong>{skillsToImprove}</strong>
              <span>Skills to Improve</span>
            </div>

            <FiChevronRight className="skill-gaps-header__stat-arrow" />
          </Card>

          {/* =====================================================
              AVERAGE GAP
          ===================================================== */}

          <Card
            variant="glass"
            className="skill-gaps-header__stat-card skill-gaps-header__stat-card--purple"
          >
            <div className="skill-gaps-header__stat-icon">
              <FiBarChart2 aria-hidden="true" />
            </div>

            <div className="skill-gaps-header__stat-content">
              <strong>{averageGap}%</strong>
              <span>Average Gap</span>
            </div>

            <FiChevronRight className="skill-gaps-header__stat-arrow" />
          </Card>

          {/* =====================================================
              GROWTH POTENTIAL
          ===================================================== */}

          <Card
            variant="glass"
            className="skill-gaps-header__stat-card skill-gaps-header__stat-card--green"
          >
            <div className="skill-gaps-header__stat-icon">
              <FiTrendingUp aria-hidden="true" />
            </div>

            <div className="skill-gaps-header__stat-content">
              <strong>{growthPotential}%</strong>
              <span>Growth Potential</span>
            </div>

            <FiChevronRight className="skill-gaps-header__stat-arrow" />
          </Card>
        </div>

        {/* =========================================================
            INSIGHT STRIP
        ========================================================= */}

        <div className="skill-gaps-header__insight">
          <div className="skill-gaps-header__insight-icon">
            <FiActivity aria-hidden="true" />
          </div>

          <p className="skill-gaps-header__insight-text">
            “Small improvements in the right skills can create big
            opportunities.”
          </p>

          <div className="skill-gaps-header__insight-divider" />

          <div className="skill-gaps-header__insight-action">
            <span>Keep Learning</span>
            <span>Keep Growing</span>

            <FiArrowRight aria-hidden="true" />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default SkillGapsHeader;
