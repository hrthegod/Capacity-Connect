import React, { useMemo, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBookmark,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiPlayCircle,
  FiTarget,
  FiUser,
  FiX,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./ContinueLearning.css";

const ContinueLearning = ({
  course = null,
  enrollment = null,

  onContinueLearning,
  onViewCourse,
  onViewAllCourses,
  onGoToLastLesson,

  initialSaved = false,
}) => {
  /* =========================================================
     SAVE COURSE
  ========================================================= */

  const [isSaved, setIsSaved] = useState(initialSaved);

  /* =========================================================
     COURSE DATA
  ========================================================= */

  const courseData = useMemo(() => {
    const safeProgress = Math.min(
      100,
      Math.max(0, Number(enrollment?.progress) || 0),
    );

    const currentModule = Math.max(1, Number(enrollment?.currentModule) || 1);

    const currentLesson = Math.max(1, Number(enrollment?.currentLesson) || 1);

    const moduleCount = Math.max(1, Number(course?.modules) || 8);

    const durationLabel = course?.durationLabel || "6 Weeks";

    const rating = Number(course?.rating) || 0;

    const learners = Number(course?.learners) || 0;

    return {
      image: course?.image || "",
      title: course?.title || "Course unavailable",

      description:
        course?.description ||
        "Continue your learning journey and build practical knowledge through structured learning.",

      category:
        course?.categoryLabel || course?.category || "Professional Development",

      difficulty:
        course?.difficultyLabel || course?.difficulty || "Intermediate",

      duration: durationLabel,

      modules: moduleCount,

      rating,

      learners,

      trainer: course?.trainerName || course?.instructor || "Course Trainer",

      progress: safeProgress,

      currentModule,

      currentLesson,

      lastAccessed:
        enrollment?.lastAccessedAt || course?.lastAccessedAt || null,
    };
  }, [course, enrollment]);

  /* =========================================================
     CURRENT MODULE / LESSON INFORMATION

     These labels can later come directly from the API
     when module and lesson details are available.
  ========================================================= */

  const currentModuleTitle =
    course?.currentModuleTitle ||
    course?.moduleTitle ||
    `Module ${courseData.currentModule}`;

  const currentLessonTitle =
    course?.currentLessonTitle ||
    course?.lessonTitle ||
    `Lesson ${courseData.currentLesson}`;

  const nextModuleNumber = Math.min(
    courseData.modules,
    courseData.currentModule + 1,
  );

  const nextModuleTitle =
    course?.nextModuleTitle || `Module ${nextModuleNumber}`;

  const nextModuleDescription =
    course?.nextModuleDescription || "Continue your learning path";

  /* =========================================================
     ESTIMATED TIME

     If backend later provides estimated remaining time,
     it will automatically be used.
  ========================================================= */

  const estimatedTime =
    course?.estimatedRemainingTime ||
    enrollment?.estimatedRemainingTime ||
    "2h 15m";

  /* =========================================================
     LAST ACCESSED

     Formats a real timestamp if available.
  ========================================================= */

  const formattedLastAccessed = useMemo(() => {
    if (!courseData.lastAccessed) {
      return "Recently";
    }

    const date = new Date(courseData.lastAccessed);

    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [courseData.lastAccessed]);

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleSaveCourse = () => {
    setIsSaved((previous) => !previous);
  };

  const handleContinue = () => {
    if (typeof onContinueLearning === "function") {
      onContinueLearning(course);
    }
  };

  const handleViewCourse = () => {
    if (typeof onViewCourse === "function") {
      onViewCourse(course);
    }
  };

  const handleViewAllCourses = () => {
    if (typeof onViewAllCourses === "function") {
      onViewAllCourses();
    }
  };

  const handleLastLesson = () => {
    if (typeof onGoToLastLesson === "function") {
      onGoToLastLesson(course, enrollment);
    }
  };

  /* =========================================================
     NO COURSE
  ========================================================= */

  if (!course && !enrollment) {
    return null;
  }

  return (
    <section className="continue-learning">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="continue-learning__background" aria-hidden="true">
        <span className="continue-learning__background-orbit continue-learning__background-orbit--one" />
        <span className="continue-learning__background-orbit continue-learning__background-orbit--two" />
        <span className="continue-learning__background-glow continue-learning__background-glow--one" />
        <span className="continue-learning__background-glow continue-learning__background-glow--two" />
      </div>

      <div className="continue-learning__container">
        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div className="continue-learning__header">
          <div className="continue-learning__heading">
            <span className="continue-learning__eyebrow">
              CONTINUE LEARNING
            </span>

            <h2 className="continue-learning__title">
              Pick up where you left off
            </h2>

            <p className="continue-learning__description">
              Continue your learning journey and make progress towards your
              goals.
            </p>
          </div>

          <div className="continue-learning__header-actions">
            <button
              type="button"
              className="continue-learning__last-accessed"
              aria-label="Learning courses sorted by last accessed"
            >
              <FiClock />

              <span>Last Accessed</span>

              <FiArrowDownRight />
            </button>

            <Button
              variant="ghost"
              size="sm"
              rounded="full"
              rightIcon={<FiArrowRight />}
              onClick={handleViewAllCourses}
              className="continue-learning__view-all-button"
            >
              View all courses
            </Button>
          </div>
        </div>

        {/* ===================================================
            FEATURED COURSE
        =================================================== */}

        <Card
          variant="glass"
          size="lg"
          rounded="xl"
          hover={true}
          className="continue-learning__featured-card"
        >
          <div className="continue-learning__featured-grid">
            {/* ===============================================
                COURSE IMAGE
            =============================================== */}

            <div className="continue-learning__image-wrapper">
              {courseData.image ? (
                <img
                  src={courseData.image}
                  alt={courseData.title}
                  className="continue-learning__image"
                />
              ) : (
                <div
                  className="continue-learning__image-placeholder"
                  aria-label="Course image placeholder"
                >
                  <div className="continue-learning__placeholder-grid" />

                  <div className="continue-learning__placeholder-orbit">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="continue-learning__placeholder-icon">
                    <FiBookOpen />
                  </div>

                  <div className="continue-learning__placeholder-shine" />
                </div>
              )}

              {/* In Progress */}

              <div className="continue-learning__image-status">
                <Badge
                  variant="warning"
                  appearance="soft"
                  size="sm"
                  shape="pill"
                  className="continue-learning__progress-badge"
                >
                  <FiPlayCircle />
                  In Progress
                </Badge>
              </div>

              {/* Save */}

              <button
                type="button"
                className={`continue-learning__save-button ${
                  isSaved ? "continue-learning__save-button--saved" : ""
                }`}
                onClick={handleSaveCourse}
                aria-label={
                  isSaved ? "Remove course from saved courses" : "Save course"
                }
                aria-pressed={isSaved}
              >
                <FiBookmark />

                <span className="continue-learning__save-tooltip">
                  {isSaved ? "Saved" : "Save course"}
                </span>
              </button>

              {/* Image bottom information */}

              <div className="continue-learning__image-overlay">
                <div className="continue-learning__image-overlay-icon">
                  <FiPlayCircle />
                </div>

                <div className="continue-learning__image-overlay-copy">
                  <strong>Continue Learning</strong>

                  <span>
                    Module {courseData.currentModule} • Lesson{" "}
                    {courseData.currentLesson}
                  </span>
                </div>
              </div>
            </div>

            {/* ===============================================
                COURSE INFORMATION
            =============================================== */}

            <div className="continue-learning__course-information">
              <div className="continue-learning__course-main">
                {/* Category */}

                <div className="continue-learning__course-category">
                  <span className="continue-learning__category-icon">
                    <FiLayers />
                  </span>

                  <span>{courseData.category}</span>
                </div>

                {/* Title */}

                <h3 className="continue-learning__course-title">
                  {courseData.title}
                </h3>

                {/* Description */}

                <p className="continue-learning__course-description">
                  {courseData.description}
                </p>

                {/* Course Meta */}

                <div className="continue-learning__course-meta">
                  <div className="continue-learning__course-meta-item">
                    <FiUser />

                    <span>{courseData.trainer}</span>
                  </div>

                  <span className="continue-learning__meta-divider" />

                  <div className="continue-learning__course-meta-item">
                    <FiTarget />

                    <span>{courseData.difficulty}</span>
                  </div>

                  <span className="continue-learning__meta-divider" />

                  <div className="continue-learning__course-meta-item">
                    <FiClock />

                    <span>{courseData.duration}</span>
                  </div>
                </div>

                {/* Progress */}

                <div className="continue-learning__progress-section">
                  <div className="continue-learning__progress-heading">
                    <span>Your Progress</span>

                    <strong>{courseData.progress}%</strong>
                  </div>

                  <ProgressBar
                    value={courseData.progress}
                    variant="primary"
                    appearance="gradient"
                    size="md"
                    rounded="full"
                  />

                  <div className="continue-learning__progress-footer">
                    <span>
                      {course?.completedLessons ||
                        Math.round(
                          (courseData.progress / 100) *
                            (Number(course?.totalLessons) || 20),
                        )}{" "}
                      of {course?.totalLessons || 20} lessons completed
                    </span>

                    <span>{courseData.modules} Modules</span>
                  </div>
                </div>
              </div>

              {/* =============================================
                  RIGHT ACTION PANEL
              ============================================= */}

              <aside className="continue-learning__action-panel">
                <div className="continue-learning__accessed">
                  <span className="continue-learning__accessed-icon">
                    <FiCalendar />
                  </span>

                  <span className="continue-learning__accessed-copy">
                    <strong>Last accessed</strong>

                    <span>{formattedLastAccessed}</span>
                  </span>
                </div>

                <div className="continue-learning__actions">
                  <Button
                    variant="primary"
                    size="lg"
                    rounded="lg"
                    rightIcon={<FiArrowRight />}
                    onClick={handleContinue}
                    className="continue-learning__continue-button"
                  >
                    Continue Learning
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    rounded="lg"
                    leftIcon={<FiBookOpen />}
                    onClick={handleViewCourse}
                    className="continue-learning__details-button"
                  >
                    View Course Details
                  </Button>

                  <Button
                    variant="ghost"
                    size="md"
                    rounded="full"
                    rightIcon={<FiArrowRight />}
                    onClick={handleLastLesson}
                    className="continue-learning__last-lesson-button"
                  >
                    Go to last lesson
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </Card>

        {/* ===================================================
            LEARNING CONTEXT CARDS
        =================================================== */}

        <div className="continue-learning__context">
          {/* Current Module */}

          <Card
            variant="glass"
            size="md"
            rounded="xl"
            hover={true}
            className="continue-learning__context-card continue-learning__context-card--module"
          >
            <div className="continue-learning__context-icon">
              <FiBookOpen />
            </div>

            <div className="continue-learning__context-copy">
              <span>Current Module</span>

              <strong>Module {courseData.currentModule}</strong>

              <small>{currentModuleTitle}</small>
            </div>
          </Card>

          {/* Current Lesson */}

          <Card
            variant="glass"
            size="md"
            rounded="xl"
            hover={true}
            className="continue-learning__context-card continue-learning__context-card--lesson"
          >
            <div className="continue-learning__context-icon">
              <FiPlayCircle />
            </div>

            <div className="continue-learning__context-copy">
              <span>Current Lesson</span>

              <strong>Lesson {courseData.currentLesson}</strong>

              <small>{currentLessonTitle}</small>
            </div>
          </Card>

          {/* Next Milestone */}

          <Card
            variant="glass"
            size="md"
            rounded="xl"
            hover={true}
            className="continue-learning__context-card continue-learning__context-card--milestone"
          >
            <div className="continue-learning__context-icon">
              <FiAward />
            </div>

            <div className="continue-learning__context-copy">
              <span>Next Milestone</span>

              <strong>{nextModuleTitle}</strong>

              <small>{nextModuleDescription}</small>
            </div>
          </Card>

          {/* Estimated Time */}

          <Card
            variant="glass"
            size="md"
            rounded="xl"
            hover={true}
            className="continue-learning__context-card continue-learning__context-card--time"
          >
            <div className="continue-learning__context-icon">
              <FiCalendar />
            </div>

            <div className="continue-learning__context-copy">
              <span>Estimated Time</span>

              <strong>{estimatedTime}</strong>

              <small>To complete</small>
            </div>
          </Card>
        </div>

        {/* ===================================================
            MOTIVATIONAL MESSAGE
        =================================================== */}

        <div className="continue-learning__motivation">
          <div className="continue-learning__motivation-icon">
            <FiTarget />
          </div>

          <p>
            You&apos;re doing great! Keep going to build new skills and achieve
            your learning goals.
          </p>

          <button
            type="button"
            className="continue-learning__motivation-close"
            aria-label="Dismiss learning motivation"
          >
            <FiX />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContinueLearning;
