// src/Components/Learner/Recommendations/RecommendationsHeader/RecommendationsHeader.jsx

import React from "react";

import {
  FiArrowRight,
  FiBookOpen,
  FiCompass,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiBarChart2,
  FiStar,
  FiZap,
  FiMap,
  FiAward,
} from "react-icons/fi";

import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import Card from "../../../../Reusable_components/Card/Card";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./RecommendationsHeader.css";

/* =========================================================
   RECOMMENDATIONS HEADER
========================================================= */

const RecommendationsHeader = ({
  stats,
  onExploreCourses,
  onViewLearningPath,
}) => {
  /* =======================================================
     SAFE VALUES
  ======================================================= */

  const totalSkills = Number(stats?.totalSkills ?? 0);

  const averageLevel = Math.min(
    100,
    Math.max(0, Number(stats?.averageLevel ?? 0) || 0),
  );

  const developingSkills = Number(stats?.developingSkills ?? 0);

  const strongSkills = Number(stats?.strongSkills ?? 0);

  /* =======================================================
     DERIVED RECOMMENDATION DATA

     These are temporary UI values until recommendation
     API/mock data is introduced.
  ======================================================= */

  const recommendedCourses = 7;

  const priorityGaps = developingSkills || 3;

  const learningPaths = 2;

  const personalization = 100;

  /* =======================================================
     HANDLERS
  ======================================================= */

  const handleExploreCourses = () => {
    if (typeof onExploreCourses === "function") {
      onExploreCourses();
      return;
    }

    console.log("Explore Recommended Courses");
  };

  const handleViewLearningPath = () => {
    if (typeof onViewLearningPath === "function") {
      onViewLearningPath();
      return;
    }

    console.log("View Learning Path");
  };

  return (
    <section className="recommendations-header">
      {/* =====================================================
          MAIN HERO
      ===================================================== */}

      <div className="recommendations-header__hero">
        {/* ===================================================
            BACKGROUND DECORATION
        =================================================== */}

        <div
          className="
            recommendations-header__glow
            recommendations-header__glow--one
          "
        />

        <div
          className="
            recommendations-header__glow
            recommendations-header__glow--two
          "
        />

        <div
          className="
            recommendations-header__orb
            recommendations-header__orb--one
          "
        />

        <div
          className="
            recommendations-header__orb
            recommendations-header__orb--two
          "
        />

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="recommendations-header__content">
          {/* EYEBROW */}

          <div className="recommendations-header__eyebrow">
            <Badge variant="info">RECOMMENDED FOR YOU</Badge>
          </div>

          {/* TITLE */}

          <h1 className="recommendations-header__title">
            Personalized learning
            <span>for a brighter tomorrow.</span>
          </h1>

          {/* DESCRIPTION */}

          <p className="recommendations-header__description">
            Based on your skills, learning goals, and identified skill gaps,
            we&apos;ve curated courses, learning paths, and resources to help
            you grow faster.
          </p>

          {/* ACTIONS */}

          <div className="recommendations-header__actions">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<FiArrowRight />}
              onClick={handleExploreCourses}
              className="
                recommendations-header__primary-button
              "
            >
              Explore Recommended Courses
            </Button>

            <Button
              variant="outline"
              size="lg"
              leftIcon={<FiMap />}
              onClick={handleViewLearningPath}
              className="
                recommendations-header__secondary-button
              "
            >
              View Learning Path
            </Button>
          </div>

          {/* =================================================
              THREE BENEFITS
          ================================================= */}

          <div className="recommendations-header__benefits">
            {/* TARGETED */}

            <div className="recommendations-header__benefit">
              <span
                className="
                  recommendations-header__benefit-icon
                  recommendations-header__benefit-icon--green
                "
              >
                <FiTarget />
              </span>

              <span>Targeted recommendations</span>
            </div>

            {/* PACE */}

            <div className="recommendations-header__benefit">
              <span
                className="
                  recommendations-header__benefit-icon
                  recommendations-header__benefit-icon--purple
                "
              >
                <FiZap />
              </span>

              <span>Learn at your own pace</span>
            </div>

            {/* INDUSTRY */}

            <div className="recommendations-header__benefit">
              <span
                className="
                  recommendations-header__benefit-icon
                  recommendations-header__benefit-icon--amber
                "
              >
                <FiBarChart2 />
              </span>

              <span>Industry-relevant content</span>
            </div>
          </div>
        </div>

        {/* ===================================================
            NAVY LEARNING JOURNEY
        =================================================== */}

        <Card
          className="
            recommendations-header__journey
          "
        >
          {/* Background decoration */}

          <div
            className="
              recommendations-header__journey-glow
            "
          />

          <div
            className="
              recommendations-header__journey-orbit
              recommendations-header__journey-orbit--one
            "
          />

          <div
            className="
              recommendations-header__journey-orbit
              recommendations-header__journey-orbit--two
            "
          />

          {/* JOURNEY HEADER */}

          <div className="recommendations-header__journey-top">
            <div className="recommendations-header__journey-heading">
              <div className="recommendations-header__journey-icon">
                <FiCompass />
              </div>

              <div>
                <h2>Your Learning Journey</h2>

                <p>Keep learning. Keep growing.</p>
              </div>
            </div>

            <Badge variant="success">Progressing</Badge>
          </div>

          {/* JOURNEY BODY */}

          <div className="recommendations-header__journey-body">
            {/* CIRCULAR PROGRESS */}

            <div
              className="
                recommendations-header__progress-circle
              "
              style={{
                "--progress": `${averageLevel}%`,
              }}
            >
              <div
                className="
                  recommendations-header__progress-circle-inner
                "
              >
                <strong>{averageLevel}%</strong>

                <span>Overall Progress</span>
              </div>
            </div>

            {/* JOURNEY POINTS */}

            <div className="recommendations-header__journey-points">
              <div className="recommendations-header__journey-point">
                <span className="recommendations-header__journey-point-icon">
                  <FiCheckCircle />
                </span>

                <span>{recommendedCourses} Recommended Courses</span>
              </div>

              <div className="recommendations-header__journey-point">
                <span className="recommendations-header__journey-point-icon">
                  <FiTarget />
                </span>

                <span>{priorityGaps} Priority Skill Gaps</span>
              </div>

              <div className="recommendations-header__journey-point">
                <span className="recommendations-header__journey-point-icon">
                  <FiMap />
                </span>

                <span>{learningPaths} Learning Paths</span>
              </div>

              <div className="recommendations-header__journey-point">
                <span className="recommendations-header__journey-point-icon">
                  <FiStar />
                </span>

                <span>Personalized for Your Goals</span>
              </div>
            </div>
          </div>

          {/* JOURNEY FOOTER */}

          <div className="recommendations-header__journey-footer">
            <span>
              &ldquo;Small steps today, big opportunities tomorrow.&rdquo;
            </span>

            <FiTrendingUp />
          </div>
        </Card>
      </div>

      {/* =====================================================
          FOUR STAT CARDS
      ===================================================== */}

      <div className="recommendations-header__stats">
        {/* ===================================================
            RECOMMENDED COURSES
        =================================================== */}

        <Card
          className="
            recommendations-header__stat
            recommendations-header__stat--blue
          "
        >
          <div className="recommendations-header__stat-icon">
            <FiBookOpen />
          </div>

          <div className="recommendations-header__stat-content">
            <strong>{recommendedCourses}</strong>

            <h3>Recommended Courses</h3>

            <p>Based on your skill gaps</p>
          </div>

          <button
            type="button"
            className="recommendations-header__stat-arrow"
            onClick={handleExploreCourses}
            aria-label="Explore recommended courses"
          >
            <FiArrowRight />
          </button>
        </Card>

        {/* ===================================================
            PRIORITY GAPS
        =================================================== */}

        <Card
          className="
            recommendations-header__stat
            recommendations-header__stat--green
          "
        >
          <div className="recommendations-header__stat-icon">
            <FiTarget />
          </div>

          <div className="recommendations-header__stat-content">
            <strong>{priorityGaps}</strong>

            <h3>Priority Skill Gaps</h3>

            <p>Focus areas for improvement</p>
          </div>

          <button
            type="button"
            className="recommendations-header__stat-arrow"
            onClick={handleViewLearningPath}
            aria-label="View priority skill gaps"
          >
            <FiArrowRight />
          </button>
        </Card>

        {/* ===================================================
            LEARNING PATHS
        =================================================== */}

        <Card
          className="
            recommendations-header__stat
            recommendations-header__stat--purple
          "
        >
          <div className="recommendations-header__stat-icon">
            <FiBarChart2 />
          </div>

          <div className="recommendations-header__stat-content">
            <strong>{learningPaths}</strong>

            <h3>Learning Paths</h3>

            <p>Structured for your growth</p>
          </div>

          <button
            type="button"
            className="recommendations-header__stat-arrow"
            onClick={handleViewLearningPath}
            aria-label="View learning paths"
          >
            <FiArrowRight />
          </button>
        </Card>

        {/* ===================================================
            PERSONALIZED
        =================================================== */}

        <Card
          className="
            recommendations-header__stat
            recommendations-header__stat--amber
          "
        >
          <div className="recommendations-header__stat-icon">
            <FiAward />
          </div>

          <div className="recommendations-header__stat-content">
            <strong>{personalization}%</strong>

            <h3>Personalized</h3>

            <p>Tailored to your goals</p>
          </div>

          <button
            type="button"
            className="recommendations-header__stat-arrow"
            onClick={handleExploreCourses}
            aria-label="Explore personalized recommendations"
          >
            <FiArrowRight />
          </button>
        </Card>
      </div>

 

      
    </section>
  );
};

export default RecommendationsHeader;
