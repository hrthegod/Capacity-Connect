import React from "react";
import {
  FiArrowRight,
  FiAward,
  FiCompass,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiLayers,
  FiZap,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./MySkillsClosing.css";

const MySkillsClosing = ({
  stats = {},
  onViewSkillGaps,
  onViewRecommendations,
}) => {
  /* =====================================================
     SAFE STATISTICS
  ===================================================== */

  const totalSkills = Number(stats?.totalSkills ?? 0);

  const overallProgress = Math.min(
    100,
    Math.max(
      0,
      Number(
        stats?.overallProgress ??
          stats?.averageProgress ??
          stats?.proficiency ??
          0,
      ) || 0,
    ),
  );

  const completedSkills = Number(
    stats?.completedSkills ?? stats?.masteredSkills ?? stats?.strongSkills ?? 0,
  );

  return (
    <section className="my-skills-closing">
      <Card
        variant="glass"
        size="lg"
        rounded="xl"
        hover={false}
        className="my-skills-closing__card"
      >
        {/* =================================================
            DECORATIVE VISUAL
        ================================================= */}

        <div className="my-skills-closing__visual" aria-hidden="true">
          <div className="my-skills-closing__visual-orbit my-skills-closing__visual-orbit--outer" />

          <div className="my-skills-closing__visual-orbit my-skills-closing__visual-orbit--middle" />

          <div className="my-skills-closing__visual-orbit my-skills-closing__visual-orbit--inner" />

          <div className="my-skills-closing__visual-glow" />

          <div className="my-skills-closing__visual-center">
            <FiAward />
          </div>

          <span className="my-skills-closing__floating-icon my-skills-closing__floating-icon--one">
            <FiTarget />
          </span>

          <span className="my-skills-closing__floating-icon my-skills-closing__floating-icon--two">
            <FiTrendingUp />
          </span>

          <span className="my-skills-closing__floating-icon my-skills-closing__floating-icon--three">
            <FiZap />
          </span>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="my-skills-closing__content">
          {/* ---------------------------------------------
              EYEBROW
          --------------------------------------------- */}

          <div className="my-skills-closing__eyebrow-row">
            <Badge variant="cyan" appearance="soft" size="sm" shape="pill">
              NEXT STEP
            </Badge>

            <span className="my-skills-closing__eyebrow-line">
              Keep building your capability
            </span>
          </div>

          {/* ---------------------------------------------
              TITLE
          --------------------------------------------- */}

          <h2 className="my-skills-closing__title">
            Turn your skills into
            <span> your next opportunity.</span>
          </h2>

          {/* ---------------------------------------------
              DESCRIPTION
          --------------------------------------------- */}

          <p className="my-skills-closing__description">
            Your skill journey does not stop here. Identify the areas that need
            attention, discover relevant learning opportunities, and continue
            developing the capabilities that matter for your professional
            growth.
          </p>

          {/* ---------------------------------------------
              ACTIONS
          --------------------------------------------- */}

          <div className="my-skills-closing__actions">
            <Button
              variant="primary"
              size="lg"
              rounded="lg"
              rightIcon={<FiArrowRight />}
              onClick={onViewSkillGaps}
              className="my-skills-closing__primary-button"
            >
              Explore Skill Gaps
            </Button>

            <Button
              variant="outline"
              size="lg"
              rounded="lg"
              rightIcon={<FiCompass />}
              onClick={onViewRecommendations}
              className="my-skills-closing__secondary-button"
            >
              Find Recommended Learning
            </Button>
          </div>

          {/* ---------------------------------------------
              MICRO MESSAGE
          --------------------------------------------- */}

          <div className="my-skills-closing__message">
            <FiCheckCircle />

            <span>
              Every new capability brings you one step closer to your goals.
            </span>
          </div>
        </div>

        {/* =================================================
            STATISTICS PANEL
        ================================================= */}

        <div className="my-skills-closing__stats">
          {/* ---------------------------------------------
              TOTAL SKILLS
          --------------------------------------------- */}

          <div className="my-skills-closing__stat my-skills-closing__stat--cyan">
            <div className="my-skills-closing__stat-icon">
              <FiLayers />
            </div>

            <div className="my-skills-closing__stat-copy">
              <strong>{totalSkills}</strong>

              <span>Total Skills</span>
            </div>
          </div>

          {/* ---------------------------------------------
              OVERALL PROFICIENCY
          --------------------------------------------- */}

          <div className="my-skills-closing__stat my-skills-closing__stat--green">
            <div className="my-skills-closing__stat-icon">
              <FiTrendingUp />
            </div>

            <div className="my-skills-closing__stat-copy">
              <strong>{overallProgress}%</strong>

              <span>Overall Progress</span>
            </div>
          </div>

          {/* ---------------------------------------------
              STRONG SKILLS
          --------------------------------------------- */}

          <div className="my-skills-closing__stat my-skills-closing__stat--amber">
            <div className="my-skills-closing__stat-icon">
              <FiAward />
            </div>

            <div className="my-skills-closing__stat-copy">
              <strong>{completedSkills}</strong>

              <span>Strong Skills</span>
            </div>
          </div>
        </div>

        {/* =================================================
            BRAND FOOTER
        ================================================= */}

        <div className="my-skills-closing__brand">
          <span className="my-skills-closing__brand-mark">
            <FiCompass />
          </span>

          <span className="my-skills-closing__brand-name">
            Capacity Connect
          </span>

          <span className="my-skills-closing__brand-divider" />

          <span className="my-skills-closing__brand-tagline">
            Learn • Develop • Grow • Advance
          </span>
        </div>
      </Card>
    </section>
  );
};

export default MySkillsClosing;
