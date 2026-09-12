import React, { useMemo, useState } from "react";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBookmark,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiLayers,
  FiPlay,
  FiPlayCircle,
  FiStar,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./EnrolledCourseCard.css";

const EnrolledCourseCard = ({
  enrollment = {},
  course = {},
  onViewCourse,
  onContinueLearning,
  onToggleSave,
}) => {
  const [isSaved, setIsSaved] = useState(
    Boolean(course?.isFavorite || course?.saved),
  );

  const progress = Math.min(
    100,
    Math.max(0, Number(enrollment?.progress) || 0),
  );

  const status = useMemo(() => {
    if (enrollment?.status === "completed" || progress >= 100) {
      return "completed";
    }

    if (progress > 0) {
      return "in-progress";
    }

    return "not-started";
  }, [enrollment?.status, progress]);

  const statusConfig = {
    completed: {
      label: "Completed",
      icon: <FiCheckCircle />,
      badgeVariant: "success",
    },

    "in-progress": {
      label: "In Progress",
      icon: <FiPlayCircle />,
      badgeVariant: "warning",
    },

    "not-started": {
      label: "Not Started",
      icon: <FiTarget />,
      badgeVariant: "neutral",
    },
  };

  const currentStatus = statusConfig[status];

  const safeTitle = course?.title || "Course unavailable";

  const category =
    course?.categoryLabel || course?.category || "Professional Development";

  const difficulty =
    course?.difficultyLabel || course?.difficulty || "Intermediate";

  const duration = course?.durationLabel || course?.duration || "Self-paced";

  const modules = Number(course?.modules) || 0;

  const rating = Number(course?.rating) || 0;

  const learners =
    Number(course?.learners) || Number(course?.totalLearners) || 0;

  const currentModule = Number(enrollment?.currentModule) || 1;

  const currentLesson = Number(enrollment?.currentLesson) || 1;

  const handleToggleSave = () => {
    const nextSavedState = !isSaved;

    setIsSaved(nextSavedState);

    if (onToggleSave) {
      onToggleSave(course, nextSavedState);
    }
  };

  const handleViewCourse = () => {
    if (onViewCourse) {
      onViewCourse(course?.id);
    }
  };

  const handleContinueLearning = () => {
    if (onContinueLearning) {
      onContinueLearning(course?.id);
    }
  };

  return (
    <article className={`enrolled-course-card enrolled-course-card--${status}`}>
      <Card
        variant="glass"
        size="lg"
        rounded="xl"
        hover={true}
        className="enrolled-course-card__surface"
      >
        {/* =====================================================
            TOP COURSE VISUAL
        ===================================================== */}

        <div className="enrolled-course-card__visual">
          {course?.image ? (
            <img
              src={course.image}
              alt={safeTitle}
              className="enrolled-course-card__image"
            />
          ) : (
            <div
              className="enrolled-course-card__image-placeholder"
              aria-hidden="true"
            >
              <div className="enrolled-course-card__placeholder-grid" />

              <div className="enrolled-course-card__placeholder-orbit enrolled-course-card__placeholder-orbit--one" />
              <div className="enrolled-course-card__placeholder-orbit enrolled-course-card__placeholder-orbit--two" />

              <div className="enrolled-course-card__placeholder-icon">
                <FiBookOpen />
              </div>

              <div className="enrolled-course-card__placeholder-wave enrolled-course-card__placeholder-wave--one" />
              <div className="enrolled-course-card__placeholder-wave enrolled-course-card__placeholder-wave--two" />
            </div>
          )}

          <div className="enrolled-course-card__visual-top">
            <Badge
              variant={currentStatus.badgeVariant}
              appearance="soft"
              size="sm"
              shape="pill"
              className="enrolled-course-card__status-badge"
            >
              <span className="enrolled-course-card__status-icon">
                {currentStatus.icon}
              </span>

              <span>{currentStatus.label}</span>
            </Badge>

            <button
              type="button"
              className={`enrolled-course-card__save ${
                isSaved ? "enrolled-course-card__save--saved" : ""
              }`}
              onClick={handleToggleSave}
              aria-label={
                isSaved
                  ? `Remove ${safeTitle} from saved courses`
                  : `Save ${safeTitle}`
              }
              aria-pressed={isSaved}
            >
              <FiBookmark />

              <span className="enrolled-course-card__save-tooltip">
                {isSaved ? "Saved" : "Save course"}
              </span>
            </button>
          </div>

          <div className="enrolled-course-card__visual-bottom">
            <div className="enrolled-course-card__visual-category">
              <FiLayers />

              <span>{category}</span>
            </div>

            <div className="enrolled-course-card__visual-index">
              {course?.id || "COURSE"}
            </div>
          </div>
        </div>

        {/* =====================================================
            COURSE BODY
        ===================================================== */}

        <div className="enrolled-course-card__body">
          {/* -------------------------------------------------
              COURSE IDENTITY
          ------------------------------------------------- */}

          <div className="enrolled-course-card__identity">
            <div className="enrolled-course-card__title-block">
              <h3 className="enrolled-course-card__title">{safeTitle}</h3>

              <p className="enrolled-course-card__description">
                {course?.description ||
                  "Continue developing your knowledge and professional capabilities through structured learning."}
              </p>
            </div>

            <div className="enrolled-course-card__rating">
              <FiStar />

              <strong>{rating > 0 ? rating.toFixed(1) : "—"}</strong>
            </div>
          </div>

          {/* -------------------------------------------------
              COURSE INFORMATION STRIP
          ------------------------------------------------- */}

          <div className="enrolled-course-card__information">
            <div className="enrolled-course-card__information-item enrolled-course-card__information-item--difficulty">
              <span className="enrolled-course-card__information-icon">
                <FiTarget />
              </span>

              <span className="enrolled-course-card__information-copy">
                <small>Level</small>
                <strong>{difficulty}</strong>
              </span>
            </div>

            <div className="enrolled-course-card__information-item enrolled-course-card__information-item--duration">
              <span className="enrolled-course-card__information-icon">
                <FiClock />
              </span>

              <span className="enrolled-course-card__information-copy">
                <small>Duration</small>
                <strong>{duration}</strong>
              </span>
            </div>

            <div className="enrolled-course-card__information-item enrolled-course-card__information-item--modules">
              <span className="enrolled-course-card__information-icon">
                <FiLayers />
              </span>

              <span className="enrolled-course-card__information-copy">
                <small>Modules</small>
                <strong>{modules > 0 ? modules : "—"}</strong>
              </span>
            </div>

            <div className="enrolled-course-card__information-item enrolled-course-card__information-item--learners">
              <span className="enrolled-course-card__information-icon">
                <FiUsers />
              </span>

              <span className="enrolled-course-card__information-copy">
                <small>Learners</small>
                <strong>
                  {learners > 0 ? learners.toLocaleString() : "—"}
                </strong>
              </span>
            </div>
          </div>

          {/* =================================================
              PROGRESS JOURNEY
          ================================================= */}

          <div className="enrolled-course-card__journey">
            <div className="enrolled-course-card__journey-header">
              <div>
                <span className="enrolled-course-card__journey-label">
                  LEARNING JOURNEY
                </span>

                <strong>
                  {status === "completed"
                    ? "Course completed"
                    : progress > 0
                      ? `Module ${currentModule} · Lesson ${currentLesson}`
                      : "Ready to begin"}
                </strong>
              </div>

              <div className="enrolled-course-card__journey-percentage">
                {progress}%
              </div>
            </div>

            <div className="enrolled-course-card__progress">
              <ProgressBar
                value={progress}
                variant={
                  status === "completed"
                    ? "success"
                    : status === "in-progress"
                      ? "gradient"
                      : "info"
                }
                appearance="gradient"
                showValue={false}
                size="md"
              />
            </div>

            <div className="enrolled-course-card__journey-footer">
              <span>
                {status === "completed"
                  ? "All learning milestones completed"
                  : progress > 0
                    ? `${progress}% of this course completed`
                    : "No lessons completed yet"}
              </span>

              {status !== "completed" && (
                <span>
                  {modules > 0 ? `${modules} modules` : "Structured course"}
                </span>
              )}
            </div>
          </div>

          {/* =================================================
              CURRENT LEARNING POSITION
          ================================================= */}

          <div className="enrolled-course-card__position">
            <div className="enrolled-course-card__position-marker">
              {status === "completed" ? <FiAward /> : <FiPlay />}
            </div>

            <div className="enrolled-course-card__position-content">
              <span>
                {status === "completed"
                  ? "Learning milestone"
                  : progress > 0
                    ? "Continue from"
                    : "Start with"}
              </span>

              <strong>
                {status === "completed"
                  ? "Certificate eligible"
                  : `Module ${currentModule}, Lesson ${currentLesson}`}
              </strong>
            </div>

            <span className="enrolled-course-card__position-arrow">
              <FiChevronRight />
            </span>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="enrolled-course-card__actions">
            <Button
              variant="outline"
              size="md"
              rounded="lg"
              onClick={handleViewCourse}
              className="enrolled-course-card__details-button"
            >
              View Course
            </Button>

            <Button
              variant="primary"
              size="md"
              rounded="lg"
              rightIcon={
                status === "completed" ? <FiAward /> : <FiArrowRight />
              }
              onClick={handleContinueLearning}
              className="enrolled-course-card__continue-button"
            >
              {status === "completed"
                ? "View Certificate"
                : progress > 0
                  ? "Continue Learning"
                  : "Start Learning"}
            </Button>
          </div>
        </div>
      </Card>
    </article>
  );
};

export default EnrolledCourseCard;
