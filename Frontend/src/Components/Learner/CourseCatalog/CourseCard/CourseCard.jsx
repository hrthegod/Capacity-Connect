import React, { useState } from "react";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiClock,
  FiHeart,
  FiStar,
  FiUsers,
  FiCheck,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./CourseCard.css";

/* =========================================================
   COURSE CARD

   Responsibility:
   - Display ONE course
   - Receive already-filtered course data
   - Navigate through onViewCourse
   - Provide lightweight favorite interaction

   Filtering/sorting belongs to CourseCatalog.jsx.
========================================================= */

const CourseCard = ({
  course,
  onViewCourse,
  onFavoriteChange,
}) => {
  const [isFavorite, setIsFavorite] = useState(
    Boolean(course?.isFavorite),
  );

  /* =========================================================
     SAFETY
  ========================================================= */

  if (!course) {
    return null;
  }

  /* =========================================================
     COURSE DATA
  ========================================================= */

  const {
    id,
    title = "Untitled Course",
    category = "general",
    categoryLabel = "Learning",
    difficulty = "beginner",
    difficultyLabel,
    durationLabel = "Self-paced",
    modules = 0,
    rating = 0,
    learners = 0,
    description = "Explore this learning opportunity.",
    image = "",
    skills = [],
    badge = "",
    badgeLabel,
    recommended = false,
    status = "available",
  } = course;

  /* =========================================================
     DIFFICULTY LABEL
  ========================================================= */

  const normalizedDifficulty =
    String(difficulty).toLowerCase();

  const resolvedDifficultyLabel =
    difficultyLabel ||
    {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    }[normalizedDifficulty] ||
    difficulty;

  /* =========================================================
     DIFFICULTY TONE
  ========================================================= */

  const difficultyTone =
    normalizedDifficulty === "advanced"
      ? "coral"
      : normalizedDifficulty === "intermediate"
        ? "violet"
        : "cyan";

  /* =========================================================
     COURSE CATEGORY TONE

     Used only for the small contextual category indicator.
  ========================================================= */

  const categoryTone =
    {
      "ocean-science": "cyan",
      "marine-technology": "violet",
      "data-analytics": "blue",
      leadership: "amber",
      communication: "coral",
      sustainability: "green",
    }[String(category).toLowerCase()] || "cyan";

  /* =========================================================
     SPECIAL BADGE
  ========================================================= */

  const resolvedBadge =
    badgeLabel ||
    (recommended
      ? "Recommended"
      : badge);

  const normalizedBadge =
    String(resolvedBadge).toLowerCase();

  /* =========================================================
     STATUS
  ========================================================= */

  const isEnrolled =
    status === "enrolled" ||
    status === "in-progress";

  const isCompleted =
    status === "completed";

  /* =========================================================
     FORMAT LEARNERS
  ========================================================= */

  const formatLearners = (value) => {
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return value;
    }

    if (numericValue >= 1000000) {
      return `${(numericValue / 1000000).toFixed(1)}M`;
    }

    if (numericValue >= 1000) {
      return `${(numericValue / 1000).toFixed(1)}K`;
    }

    return numericValue.toLocaleString();
  };

  /* =========================================================
     FAVORITE
  ========================================================= */

  const handleFavorite = (event) => {
    event.stopPropagation();

    const nextValue = !isFavorite;

    setIsFavorite(nextValue);

    onFavoriteChange?.(course, nextValue);
  };

  /* =========================================================
     VIEW COURSE
  ========================================================= */

  const handleViewCourse = () => {
    onViewCourse?.(course);

    /*
      The parent can later navigate to:

      /learner/courses/:courseId

      We intentionally don't hard-code routing here.
    */
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <article
      className={`course-card course-card--${categoryTone}`}
      data-course-id={id}
    >
      <Card
        variant="default"
        className="course-card__surface"
      >
        {/* =================================================
            COURSE VISUAL
        ================================================= */}

        <div className="course-card__visual">

          {image ? (
            <img
              className="course-card__image"
              src={image}
              alt={`${title} course`}
              loading="lazy"
            />
          ) : (
            <div
              className={`course-card__visual-placeholder course-card__visual-placeholder--${categoryTone}`}
              aria-hidden="true"
            >
              <div className="course-card__visual-grid" />

              <div className="course-card__visual-glow" />

              <div className="course-card__visual-wave course-card__visual-wave--one" />
              <div className="course-card__visual-wave course-card__visual-wave--two" />

              <div className="course-card__visual-symbol">
                <FiBookOpen />
              </div>
            </div>
          )}

          {/* IMAGE OVERLAY */}

          <div className="course-card__visual-overlay" />

          {/* TOP CONTROLS */}

          <div className="course-card__visual-top">

            <Badge
              variant={
                difficultyTone === "violet"
                  ? "purple"
                  : difficultyTone === "coral"
                    ? "danger"
                    : "cyan"
              }
            >
              {resolvedDifficultyLabel}
            </Badge>

            <button
              type="button"
              className={`course-card__favorite ${
                isFavorite
                  ? "course-card__favorite--active"
                  : ""
              }`}
              onClick={handleFavorite}
              aria-label={
                isFavorite
                  ? `Remove ${title} from favorites`
                  : `Add ${title} to favorites`
              }
              aria-pressed={isFavorite}
            >
              <FiHeart />
            </button>

          </div>

          {/* SPECIAL BADGE */}

          {resolvedBadge && (
            <div className="course-card__special-badge">

              <span
                className={`course-card__special-badge-dot course-card__special-badge-dot--${normalizedBadge.replace(
                  /\s+/g,
                  "-",
                )}`}
              />

              {resolvedBadge}

            </div>
          )}

        </div>

        {/* =================================================
            CARD BODY
        ================================================= */}

        <div className="course-card__body">

          {/* CATEGORY */}

          <div className="course-card__category-row">

            <span
              className={`course-card__category-dot course-card__category-dot--${categoryTone}`}
            />

            <span className="course-card__category">
              {categoryLabel}
            </span>

          </div>

          {/* TITLE */}

          <h3 className="course-card__title">
            {title}
          </h3>

          {/* DESCRIPTION */}

          <p className="course-card__description">
            {description}
          </p>

          {/* =================================================
              COURSE METRICS
          ================================================= */}

          <div className="course-card__metrics">

            <div className="course-card__metric">

              <FiStar className="course-card__metric-icon course-card__metric-icon--rating" />

              <span className="course-card__metric-value">
                {Number(rating).toFixed(1)}
              </span>

            </div>

            <span className="course-card__metric-divider" />

            <div className="course-card__metric">

              <FiUsers className="course-card__metric-icon" />

              <span className="course-card__metric-value">
                {formatLearners(learners)}
              </span>

              <span className="course-card__metric-label">
                learners
              </span>

            </div>

          </div>

          <div className="course-card__metrics">

            <div className="course-card__metric">

              <FiClock className="course-card__metric-icon" />

              <span className="course-card__metric-value">
                {durationLabel}
              </span>

            </div>

            <span className="course-card__metric-divider" />

            <div className="course-card__metric">

              <FiBookOpen className="course-card__metric-icon" />

              <span className="course-card__metric-value">
                {modules}
              </span>

              <span className="course-card__metric-label">
                modules
              </span>

            </div>

          </div>

          {/* =================================================
              SKILLS
          ================================================= */}

          {skills.length > 0 && (
            <div className="course-card__skills">

              <span className="course-card__skills-label">
                Skills
              </span>

              <div className="course-card__skill-list">

                {skills.slice(0, 3).map((skill, index) => (
                  <span
                    className="course-card__skill"
                    key={`${skill}-${index}`}
                  >
                    {skill}
                  </span>
                ))}

                {skills.length > 3 && (
                  <span className="course-card__skill course-card__skill--more">
                    +{skills.length - 3}
                  </span>
                )}

              </div>

            </div>
          )}

          {/* =================================================
              ACTION
          ================================================= */}

          <div className="course-card__action">

            {isCompleted ? (
              <Button
                variant="success"
                size="md"
                fullWidth
                leftIcon={<FiCheck />}
                onClick={handleViewCourse}
              >
                Completed
              </Button>
            ) : isEnrolled ? (
              <Button
                variant="primary"
                size="md"
                fullWidth
                rightIcon={<FiArrowUpRight />}
                onClick={handleViewCourse}
              >
                Continue Learning
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                fullWidth
                rightIcon={<FiArrowUpRight />}
                onClick={handleViewCourse}
              >
                View Course
              </Button>
            )}

          </div>

        </div>
      </Card>
    </article>
  );
};

export default CourseCard;