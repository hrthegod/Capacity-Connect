// src/Components/Learner/Recommendations/RecommendationsClosing/RecommendationsClosing.jsx

import React from "react";

import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiCompass,
  FiLayers,
  FiPlay,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import Card from "../../../../Reusable_components/Card/Card";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./RecommendationsClosing.css";

/* =========================================================
   RECOMMENDATIONS CLOSING
========================================================= */

const RecommendationsClosing = ({
  stats,
  onContinueLearning,
  onViewSkillGaps,
  onExploreCourses,
}) => {
  /* =======================================================
     SAFE STATS
  ======================================================= */

  const averageLevel = Math.min(
    100,
    Math.max(0, Number(stats?.averageLevel ?? 0) || 0),
  );

  const strongSkills = Number(stats?.strongSkills ?? 0);

  const developingSkills = Number(stats?.developingSkills ?? 0);

  const totalSkills = Number(stats?.totalSkills ?? 0);

  /* =======================================================
     HANDLERS
  ======================================================= */

  const handleContinueLearning = () => {
    if (typeof onContinueLearning === "function") {
      onContinueLearning();
      return;
    }

    console.log("Continue learning");
  };

  const handleViewSkillGaps = () => {
    if (typeof onViewSkillGaps === "function") {
      onViewSkillGaps();
      return;
    }

    console.log("View skill gaps");
  };

  const handleExploreCourses = () => {
    if (typeof onExploreCourses === "function") {
      onExploreCourses();
      return;
    }

    console.log("Explore courses");
  };

  return (
    <section className="recommendations-closing">
      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div
        className="
          recommendations-closing__orb
          recommendations-closing__orb--one
        "
      />

      <div
        className="
          recommendations-closing__orb
          recommendations-closing__orb--two
        "
      />

      <div
        className="
          recommendations-closing__glow
          recommendations-closing__glow--one
        "
      />

      <div
        className="
          recommendations-closing__glow
          recommendations-closing__glow--two
        "
      />

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div className="recommendations-closing__content">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="recommendations-closing__main">
          <div className="recommendations-closing__eyebrow">
            <Badge variant="success">KEEP MOVING FORWARD</Badge>
          </div>

          <div className="recommendations-closing__icon">
            <FiCompass />
          </div>

          <h2>
            Your learning journey
            <span>is already in motion.</span>
          </h2>

          <p className="recommendations-closing__description">
            Every course you complete strengthens your skills, closes important
            gaps, and moves you closer to your goals. Keep learning consistently
            and let your next achievement build on the last one.
          </p>

          {/* ===============================================
              ACTIONS
          =============================================== */}

          <div className="recommendations-closing__actions">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<FiPlay />}
              rightIcon={<FiArrowRight />}
              onClick={handleContinueLearning}
              className="recommendations-closing__primary-button"
            >
              Continue Learning
            </Button>

            <Button
              variant="outline"
              size="lg"
              leftIcon={<FiTarget />}
              onClick={handleViewSkillGaps}
              className="recommendations-closing__secondary-button"
            >
              Review Skill Gaps
            </Button>
          </div>
        </div>

        {/* =================================================
            RIGHT PROGRESS PANEL
        ================================================= */}

        <Card className="recommendations-closing__progress-card">
          <div className="recommendations-closing__progress-card-top">
            <div className="recommendations-closing__progress-heading">
              <div className="recommendations-closing__progress-icon">
                <FiTrendingUp />
              </div>

              <div>
                <span>Your Progress</span>
                <h3>Learning Momentum</h3>
              </div>
            </div>

            <Badge variant="success">ON TRACK</Badge>
          </div>

          <div className="recommendations-closing__progress-value">
            <strong>{averageLevel}%</strong>

            <span>Overall Skill Level</span>
          </div>

          <div className="recommendations-closing__progress">
            <div className="recommendations-closing__progress-top">
              <span>Your current progress</span>

              <strong>{averageLevel}%</strong>
            </div>

            <ProgressBar
              value={averageLevel}
              max={100}
              variant="success"
              size="sm"
              radius="full"
              animated
            />
          </div>

          <div className="recommendations-closing__progress-message">
            <FiCheckCircle />

            <span>
              You have built a solid foundation. Keep your momentum going.
            </span>
          </div>
        </Card>
      </div>

      {/* ===================================================
          SUPPORTING INSIGHTS
      =================================================== */}

    

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <div className="recommendations-closing__footer">
        <div className="recommendations-closing__footer-icon">
          <FiBookOpen />
        </div>

        <div className="recommendations-closing__footer-content">
          <span>READY FOR YOUR NEXT STEP?</span>

          <h3>Turn your recommendations into progress.</h3>

          <p>
            Explore a course, continue your learning path, and keep building the
            skills that matter most for your goals.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          rightIcon={<FiArrowRight />}
          onClick={handleExploreCourses}
          className="recommendations-closing__footer-button"
        >
          Explore Courses
        </Button>
      </div>
    </section>
  );
};

export default RecommendationsClosing;
