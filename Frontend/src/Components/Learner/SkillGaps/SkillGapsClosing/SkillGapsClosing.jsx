// src/Components/Learner/SkillGaps/SkillGapsClosing/SkillGapsClosing.jsx

import React from "react";

import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiTarget,
  FiTrendingUp,
  FiBookOpen,
  FiZap,
} from "react-icons/fi";

import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./SkillGapsClosing.css";

/* =========================================================
   SKILL GAPS CLOSING
========================================================= */

const SkillGapsClosing = ({
  stats,
  onExploreResources,
  onViewAllResources,
  onBackToSkills,
}) => {
  /* =======================================================
     SAFE STAT VALUES
  ======================================================= */

  const totalSkills = Number(stats?.totalSkills ?? 0);

  const averageLevel = Math.min(
    100,
    Math.max(0, Number(stats?.averageLevel ?? 0) || 0),
  );

  const developingSkills = Number(stats?.developingSkills ?? 0);

  const strongSkills = Number(stats?.strongSkills ?? 0);

  /* =======================================================
     HANDLERS
  ======================================================= */

  const handleExploreResources = () => {
    if (typeof onExploreResources === "function") {
      onExploreResources();
      return;
    }

    if (typeof onViewAllResources === "function") {
      onViewAllResources();
      return;
    }

    console.log("Explore Learning Resources");
  };

  const handleBackToSkills = () => {
    if (typeof onBackToSkills === "function") {
      onBackToSkills();
      return;
    }

    console.log("Back to My Skills");
  };

  return (
    <section className="skill-gaps-closing">
      <div className="skill-gaps-closing__surface">
        {/* =================================================
            DECORATIVE BACKGROUND
        ================================================= */}

        <div
          className="
            skill-gaps-closing__background-glow
            skill-gaps-closing__background-glow--one
          "
        />

        <div
          className="
            skill-gaps-closing__background-glow
            skill-gaps-closing__background-glow--two
          "
        />

        <div
          className="
            skill-gaps-closing__background-line
            skill-gaps-closing__background-line--one
          "
        />

        <div
          className="
            skill-gaps-closing__background-line
            skill-gaps-closing__background-line--two
          "
        />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="skill-gaps-closing__main">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="skill-gaps-closing__content">
            {/* EYEBROW */}

            <div className="skill-gaps-closing__eyebrow">
              <Badge variant="success">KEEP GROWING</Badge>

              <span>Your next step starts here</span>
            </div>

            {/* TITLE */}

            <h2 className="skill-gaps-closing__title">
              Close your skill gaps.
              <span>Build your next opportunity.</span>
            </h2>

            {/* DESCRIPTION */}

            <p className="skill-gaps-closing__description">
              You now know where to focus. Turn your skill gaps into strengths
              through focused learning, practical experience, and consistent
              progress.
            </p>

            {/* ACTIONS */}

            <div className="skill-gaps-closing__actions">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<FiArrowRight />}
                onClick={handleExploreResources}
                className="
                  skill-gaps-closing__primary-button
                "
              >
                Explore Learning Resources
              </Button>

              <Button
                variant="outline"
                size="lg"
                leftIcon={<FiTarget />}
                onClick={handleBackToSkills}
                className="
                  skill-gaps-closing__secondary-button
                "
              >
                Back to My Skills
              </Button>
            </div>

            {/* BENEFITS */}

            <div className="skill-gaps-closing__benefits">
              <div className="skill-gaps-closing__benefit">
                <span
                  className="
                    skill-gaps-closing__benefit-icon
                    skill-gaps-closing__benefit-icon--green
                  "
                >
                  <FiCheckCircle />
                </span>

                <span>Focus on priority gaps</span>
              </div>

              <div className="skill-gaps-closing__benefit">
                <span
                  className="
                    skill-gaps-closing__benefit-icon
                    skill-gaps-closing__benefit-icon--purple
                  "
                >
                  <FiCompass />
                </span>

                <span>Learn at your own pace</span>
              </div>

              <div className="skill-gaps-closing__benefit">
                <span
                  className="
                    skill-gaps-closing__benefit-icon
                    skill-gaps-closing__benefit-icon--amber
                  "
                >
                  <FiTrendingUp />
                </span>

                <span>Track your progress</span>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT PROGRESS AREA
          ================================================= */}

          <div className="skill-gaps-closing__progress-area">
            {/* =================================================
                ORBIT DECORATION
            ================================================= */}

            <div className="skill-gaps-closing__orbit skill-gaps-closing__orbit--outer" />

            <div className="skill-gaps-closing__orbit skill-gaps-closing__orbit--inner" />

            {/* =================================================
                PROGRESS HEADER
            ================================================= */}

            <div className="skill-gaps-closing__progress-header">
              <div
                className="
                  skill-gaps-closing__progress-icon
                "
              >
                <FiZap />
              </div>

              <div className="skill-gaps-closing__progress-header-copy">
                <span>YOUR NEXT STEP</span>

                <strong>Keep building momentum</strong>
              </div>

              <Badge variant="warning">NEXT STEP</Badge>
            </div>

            {/* =================================================
                PROGRESS SUMMARY
            ================================================= */}

            <div className="skill-gaps-closing__progress-summary">
              <div>
                <span>Overall Skill Progress</span>

                <strong>{averageLevel}%</strong>
              </div>
            </div>

            {/* =================================================
                PROGRESS BAR
            ================================================= */}

            <div className="skill-gaps-closing__progress-bar">
              <ProgressBar value={averageLevel} max={100} />
            </div>

            {/* =================================================
                PROGRESS META
            ================================================= */}

            <div className="skill-gaps-closing__progress-meta">
              <span>Current proficiency</span>

              <strong>{averageLevel} / 100</strong>
            </div>

            {/* =================================================
                CIRCULAR PROGRESS
            ================================================= */}

            <div className="skill-gaps-closing__circle-section">
              <div
                className="skill-gaps-closing__circle"
                style={{
                  "--progress": `${averageLevel}%`,
                }}
              >
                <div className="skill-gaps-closing__circle-track">
                  <div className="skill-gaps-closing__circle-content">
                    <FiTrendingUp />

                    <strong>{averageLevel}%</strong>

                    <span>Skill Progress</span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                MINI STATISTICS
            ================================================= */}

            <div className="skill-gaps-closing__mini-stats">
              {/* TOTAL */}

              <div className="skill-gaps-closing__mini-stat">
                <div
                  className="
                    skill-gaps-closing__mini-icon
                    skill-gaps-closing__mini-icon--blue
                  "
                >
                  <FiBookOpen />
                </div>

                <div>
                  <strong>{totalSkills}</strong>

                  <span>Total Skills</span>
                </div>
              </div>

              {/* STRONG */}

              <div className="skill-gaps-closing__mini-stat">
                <div
                  className="
                    skill-gaps-closing__mini-icon
                    skill-gaps-closing__mini-icon--green
                  "
                >
                  <FiCheckCircle />
                </div>

                <div>
                  <strong>{strongSkills}</strong>

                  <span>Strong Skills</span>
                </div>
              </div>

              {/* DEVELOPING */}

              <div className="skill-gaps-closing__mini-stat">
                <div
                  className="
                    skill-gaps-closing__mini-icon
                    skill-gaps-closing__mini-icon--amber
                  "
                >
                  <FiTarget />
                </div>

                <div>
                  <strong>{developingSkills}</strong>

                  <span>Developing</span>
                </div>
              </div>
            </div>

            {/* =================================================
                PROGRESS FOOTER
            ================================================= */}

            <div className="skill-gaps-closing__progress-footer">
              <span>Every improvement counts</span>

              <FiArrowRight />
            </div>
          </div>
        </div>

        {/* =================================================
            BRAND FOOTER
        ================================================= */}

        <div className="skill-gaps-closing__brand">
          <div className="skill-gaps-closing__brand-mark">
            <FiCompass />
          </div>

          <strong>Capacity Connect</strong>

          <span className="skill-gaps-closing__brand-divider" />

          <span>Learn • Improve • Achieve</span>
        </div>
      </div>
    </section>
  );
};

export default SkillGapsClosing;
