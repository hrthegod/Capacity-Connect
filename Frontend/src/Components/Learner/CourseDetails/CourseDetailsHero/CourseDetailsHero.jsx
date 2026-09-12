import React from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiLoader,
  FiPlayCircle,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./CourseDetailsHero.css";

const CourseDetailsHero = ({
  course,
  onBack,
  onEnroll,
  onFavorite,

  /* =========================================================
     ENROLLMENT PROPS
  ========================================================= */

  enrollment = null,
  isEnrolled = false,
  isCompleted = false,
  isEnrollmentLoading = false,
  isEnrolling = false,
  onContinueLearning,
}) => {
  if (!course) return null;

  const {
    title = "Course Title",
    categoryLabel = "Learning",
    difficulty = "beginner",
    durationLabel = "4 weeks",
    modules = 0,
    rating = 0,
    learners = 0,
    description = "",
    image = "",
    badge = "",
    isFavorite = false,
  } = course;

  /* =========================================================
     DIFFICULTY
  ========================================================= */

  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  const formattedLearners = new Intl.NumberFormat("en-IN").format(learners);

  const difficultyVariant =
    difficulty === "advanced"
      ? "purple"
      : difficulty === "intermediate"
        ? "warning"
        : "success";

  /* =========================================================
     ENROLLMENT BUTTON STATE

     Priority:

     1. Checking enrollment
     2. Enrolling
     3. Completed
     4. Already enrolled
     5. Not enrolled
  ========================================================= */

  const getEnrollmentButtonContent = () => {
    /* -------------------------------------------------------
       1. Checking enrollment
    ------------------------------------------------------- */

    if (isEnrollmentLoading) {
      return {
        text: "Checking enrollment...",
        icon: <FiLoader />,
        action: null,
        disabled: true,
        variant: "primary",
      };
    }

    /* -------------------------------------------------------
       2. Currently enrolling
    ------------------------------------------------------- */

    if (isEnrolling) {
      return {
        text: "Enrolling...",
        icon: <FiLoader />,
        action: null,
        disabled: true,
        variant: "primary",
      };
    }

    /* -------------------------------------------------------
       3. Course completed
    ------------------------------------------------------- */

    if (isCompleted) {
      return {
        text: "View Course",
        icon: <FiArrowRight />,
        action: onContinueLearning,
        disabled: false,
        variant: "primary",
      };
    }

    /* -------------------------------------------------------
       4. Already enrolled
    ------------------------------------------------------- */

    if (isEnrolled) {
      return {
        text: "Continue Learning",
        icon: <FiArrowRight />,
        action: onContinueLearning,
        disabled: false,
        variant: "primary",
      };
    }

    /* -------------------------------------------------------
       5. Not enrolled
    ------------------------------------------------------- */

    return {
      text: "Enroll Now",
      icon: <FiArrowRight />,
      action: () => onEnroll?.(course),
      disabled: false,
      variant: "primary",
    };
  };

  const enrollmentButton = getEnrollmentButtonContent();

  /* =========================================================
     HERO
  ========================================================= */

  return (
    <section
      className={`course-details-hero ${
        image
          ? "course-details-hero--has-image"
          : "course-details-hero--fallback"
      }`}
      aria-labelledby="course-details-title"
    >
      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <button
        type="button"
        className="course-details-hero__back"
        onClick={() => onBack?.()}
        aria-label="Back to course catalog"
      >
        <span className="course-details-hero__back-icon" aria-hidden="true">
          <FiArrowLeft />
        </span>

        <span>Back to Course Catalog</span>
      </button>

      {/* =====================================================
          MAIN HERO CARD
      ===================================================== */}

      <Card variant="default" className="course-details-hero__card">
        {/* ===================================================
            VISUAL SIDE
        =================================================== */}

        <div className="course-details-hero__visual" aria-hidden="true">
          {image ? (
            <img src={image} alt="" className="course-details-hero__image" />
          ) : (
            <div className="course-details-hero__ocean-fallback">
              <div className="course-details-hero__fallback-depth" />

              <div className="course-details-hero__fallback-light" />

              <div className="course-details-hero__fallback-wave course-details-hero__fallback-wave--one" />

              <div className="course-details-hero__fallback-wave course-details-hero__fallback-wave--two" />

              <div className="course-details-hero__fallback-wave course-details-hero__fallback-wave--three" />

              <div className="course-details-hero__fallback-orb" />

              <div className="course-details-hero__fallback-grid" />

              <div className="course-details-hero__fallback-label">
                <FiBookOpen />

                <span>OCEAN LEARNING</span>
              </div>
            </div>
          )}

          <div className="course-details-hero__visual-shade" />

          <div className="course-details-hero__visual-fade" />

          <div className="course-details-hero__visual-bottom-fade" />

          {/* =================================================
              VISUAL CALLOUT
          ================================================= */}

          <div className="course-details-hero__visual-callout">
            <span className="course-details-hero__callout-line" />

            <div className="course-details-hero__callout-icon">
              <FiPlayCircle />
            </div>

            <div className="course-details-hero__callout-copy">
              <strong>Learn at your own pace</strong>

              <span>Structured learning • Expert guidance</span>
            </div>
          </div>
        </div>

        {/* ===================================================
            CONTENT SIDE
        =================================================== */}

        <div className="course-details-hero__content">
          {/* =================================================
              COURSE BADGES
          ================================================= */}

          <div className="course-details-hero__eyebrow">
            <Badge variant="cyan" appearance="soft" size="sm" shape="pill">
              {categoryLabel}
            </Badge>

            <Badge
              variant={difficultyVariant}
              appearance="soft"
              size="sm"
              shape="pill"
            >
              {difficultyLabel}
            </Badge>

            {badge ? (
              <Badge variant="warning" appearance="soft" size="sm" shape="pill">
                {badge}
              </Badge>
            ) : null}

            {/* =================================================
                ENROLLED STATUS BADGE
            ================================================= */}

            {isCompleted ? (
              <Badge variant="success" appearance="soft" size="sm" shape="pill">
                Completed
              </Badge>
            ) : isEnrolled ? (
              <Badge variant="success" appearance="soft" size="sm" shape="pill">
                Enrolled
              </Badge>
            ) : null}
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h1 id="course-details-title" className="course-details-hero__title">
            {title}
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p className="course-details-hero__description">{description}</p>

          {/* =================================================
              COURSE METRICS
          ================================================= */}

          <div className="course-details-hero__metrics">
            {/* Rating */}

            <div className="course-details-hero__metric">
              <span className="course-details-hero__metric-icon course-details-hero__metric-icon--rating">
                <FiStar />
              </span>

              <span className="course-details-hero__metric-copy">
                <strong>{rating}</strong>
                <span>Rating</span>
              </span>
            </div>

            <span className="course-details-hero__metric-divider" />

            {/* Learners */}

            <div className="course-details-hero__metric">
              <span className="course-details-hero__metric-icon course-details-hero__metric-icon--learners">
                <FiUsers />
              </span>

              <span className="course-details-hero__metric-copy">
                <strong>{formattedLearners}</strong>
                <span>Learners</span>
              </span>
            </div>

            <span className="course-details-hero__metric-divider" />

            {/* Duration */}

            <div className="course-details-hero__metric">
              <span className="course-details-hero__metric-icon course-details-hero__metric-icon--duration">
                <FiClock />
              </span>

              <span className="course-details-hero__metric-copy">
                <strong>{durationLabel}</strong>
                <span>Duration</span>
              </span>
            </div>

            <span className="course-details-hero__metric-divider" />

            {/* Modules */}

            <div className="course-details-hero__metric">
              <span className="course-details-hero__metric-icon course-details-hero__metric-icon--modules">
                <FiBookOpen />
              </span>

              <span className="course-details-hero__metric-copy">
                <strong>{modules}</strong>
                <span>Modules</span>
              </span>
            </div>
          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="course-details-hero__actions">
            {/* =================================================
                PRIMARY ENROLLMENT / LEARNING BUTTON
            ================================================= */}

            <Button
              variant={enrollmentButton.variant}
              size="lg"
              rounded="lg"
              rightIcon={enrollmentButton.icon}
              className={`course-details-hero__enroll-button ${
                isEnrolled ? "course-details-hero__enroll-button--enrolled" : ""
              } ${
                isCompleted
                  ? "course-details-hero__enroll-button--completed"
                  : ""
              }`}
              onClick={enrollmentButton.action}
              disabled={enrollmentButton.disabled}
            >
              {enrollmentButton.text}
            </Button>

            {/* =================================================
                SAVE COURSE
            ================================================= */}

            <Button
              variant="outline"
              size="lg"
              rounded="lg"
              leftIcon={<FiHeart />}
              className={`course-details-hero__save-button ${
                isFavorite ? "course-details-hero__save-button--active" : ""
              }`}
              onClick={() => onFavorite?.(course, !isFavorite)}
              aria-label={
                isFavorite ? "Remove from saved courses" : "Save course"
              }
            >
              {isFavorite ? "Saved Course" : "Save Course"}
            </Button>
          </div>

          {/* =================================================
              ENROLLMENT PROGRESS

              Only displayed when learner is enrolled.
          ================================================= */}

          {isEnrolled && enrollment && (
            <div className="course-details-hero__enrollment-status">
              <div className="course-details-hero__enrollment-status-icon">
                <FiCheckCircle />
              </div>

              <div className="course-details-hero__enrollment-status-copy">
                <strong>
                  {isCompleted
                    ? "Course completed"
                    : "You are enrolled in this course"}
                </strong>

                <span>
                  {isCompleted
                    ? "Your learning journey is complete."
                    : `${Number(enrollment.progress) || 0}% of the course completed`}
                </span>
              </div>
            </div>
          )}

          {/* =================================================
              BENEFITS
          ================================================= */}

          <div className="course-details-hero__benefits">
            {/* Certificate */}

            <div className="course-details-hero__benefit course-details-hero__benefit--certificate">
              <span className="course-details-hero__benefit-icon">
                <FiAward />
              </span>

              <span>Certificate on completion</span>
            </div>

            {/* Expert */}

            <div className="course-details-hero__benefit course-details-hero__benefit--expert">
              <span className="course-details-hero__benefit-icon">
                <FiCheckCircle />
              </span>

              <span>Expert-led learning</span>
            </div>

            {/* Flexible */}

            <div className="course-details-hero__benefit course-details-hero__benefit--flexible">
              <span className="course-details-hero__benefit-icon">
                <FiCheckCircle />
              </span>

              <span>Self-paced learning</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default CourseDetailsHero;
