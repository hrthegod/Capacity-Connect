import React, { useMemo, useState } from "react";
import {
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiLock,
  FiPlay,
  FiPlayCircle,
  FiLayers,
  FiArrowRight,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./CourseModules.css";

/*
  CourseModules
  ------------------------------------------------------------
  Displays the structured learning path of a course.

  Expected future API structure:

  course.moduleDetails = [
    {
      id: 1,
      title: "...",
      description: "...",
      lessons: [
        {
          id: 1,
          title: "...",
          duration: "15 min",
          status: "completed"
        }
      ],
      duration: "45 min",
      progress: 100,
      status: "completed"
    }
  ]

  Until detailed module data is available in MockAPI, this
  component creates a visual fallback from course.modules.
*/

const createFallbackModules = (moduleCount = 0) => {
  const fallbackTitles = [
    "Introduction to Ocean Systems",
    "Marine Data & Analytics",
    "Data Collection & Processing",
    "Data Visualization",
    "Research Methodology",
    "Applied Marine Technology",
    "Practical Applications",
    "Final Assessment & Project",
  ];

  const fallbackDescriptions = [
    "Build a strong foundation by understanding the key concepts and principles.",
    "Learn how marine datasets are collected, organized, and analyzed.",
    "Explore practical methods for collecting and processing relevant data.",
    "Learn how to turn complex information into meaningful visual insights.",
    "Apply structured research approaches to real-world problems.",
    "Explore practical applications of modern marine technologies.",
    "Apply your knowledge through practical scenarios and exercises.",
    "Review your learning and demonstrate your understanding through assessment.",
  ];

  const fallbackLessons = [
    [
      "Introduction and Fundamentals",
      "Understanding the Core Concepts",
      "Key Terminology",
      "Knowledge Check",
    ],
    [
      "Understanding Marine Data",
      "Data Collection Methods",
      "Data Processing",
      "Data Quality",
      "Practical Exercise",
    ],
    [
      "Collection Techniques",
      "Data Preparation",
      "Processing Workflow",
      "Validation Exercise",
    ],
    [
      "Visualization Principles",
      "Choosing the Right Chart",
      "Creating Visual Insights",
      "Practical Exercise",
    ],
    [
      "Research Fundamentals",
      "Research Planning",
      "Analysis Methods",
      "Case Study",
      "Knowledge Check",
    ],
    [
      "Technology Overview",
      "Modern Applications",
      "Implementation Methods",
      "Practical Exercise",
    ],
    ["Real-World Scenario", "Problem Solving", "Applied Exercise", "Review"],
    ["Course Review", "Final Assessment", "Practical Project"],
  ];

  const durations = [
    "45 min",
    "1 hr 20 min",
    "55 min",
    "1 hr",
    "1 hr 10 min",
    "1 hr 15 min",
    "50 min",
    "1 hr 30 min",
  ];

  const count = Number(moduleCount) || 0;

  return Array.from({ length: count }, (_, index) => {
    let status = "locked";
    let progress = 0;

    if (index === 0) {
      status = "completed";
      progress = 100;
    } else if (index === 1) {
      status = "in-progress";
      progress = 60;
    }

    const lessonNames = fallbackLessons[index % fallbackLessons.length];

    return {
      id: index + 1,
      title:
        fallbackTitles[index] ||
        `Learning Module ${String(index + 1).padStart(2, "0")}`,
      description:
        fallbackDescriptions[index] ||
        "Continue building your knowledge through structured learning.",
      duration: durations[index] || "1 hr",
      progress,
      status,
      lessons: lessonNames.map((lessonTitle, lessonIndex) => ({
        id: lessonIndex + 1,
        title: lessonTitle,
        duration:
          lessonIndex % 2 === 0
            ? "15 min"
            : lessonIndex === 1
              ? "20 min"
              : "10 min",
        status:
          status === "completed"
            ? "completed"
            : status === "in-progress" && lessonIndex < 3
              ? "completed"
              : status === "in-progress" && lessonIndex === 3
                ? "current"
                : "locked",
      })),
    };
  });
};

const formatModuleCount = (count) => {
  const number = Number(count) || 0;
  return `${number} ${number === 1 ? "Module" : "Modules"}`;
};

const getStatusLabel = (status) => {
  if (status === "completed") return "Completed";
  if (status === "in-progress") return "In Progress";
  return "Locked";
};

const getStatusBadgeVariant = (status) => {
  if (status === "completed") return "success";
  if (status === "in-progress") return "info";
  return "neutral";
};

const CourseModules = ({ course }) => {
  const [expandedModule, setExpandedModule] = useState(2);

  const modules = useMemo(() => {
    if (!course) return [];

    /*
      If detailed module data is eventually added to MockAPI,
      this automatically uses it.
    */
    if (
      Array.isArray(course.moduleDetails) &&
      course.moduleDetails.length > 0
    ) {
      return course.moduleDetails;
    }

    return createFallbackModules(course.modules);
  }, [course]);

  if (!course) {
    return null;
  }

  const totalModules = modules.length;
  const completedModules = modules.filter(
    (module) => module.status === "completed",
  ).length;

  const overallProgress =
    totalModules > 0
      ? Math.round(
          modules.reduce(
            (total, module) => total + (Number(module.progress) || 0),
            0,
          ) / totalModules,
        )
      : 0;

  const handleToggleModule = (moduleId) => {
    setExpandedModule((current) => (current === moduleId ? null : moduleId));
  };

  const handleContinue = (module) => {
    console.log("Continue module:", module);
  };

  return (
    <section className="course-modules">
      <div className="course-modules__container">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}
        <div className="course-modules__header">
          <div className="course-modules__header-content">
            <div className="course-modules__eyebrow">
              <span className="course-modules__eyebrow-icon">
                <FiLayers />
              </span>

              <span>COURSE CURRICULUM</span>
            </div>

            <h2 className="course-modules__title">Structured learning path</h2>

            <p className="course-modules__description">
              Follow the modules in sequence to build your knowledge step by
              step and develop practical capabilities.
            </p>
          </div>

          <div className="course-modules__header-mark">
            <FiBookOpen />
          </div>
        </div>

        {/* =========================================================
            DARK NAVY PROGRESS CARD
        ========================================================= */}
        <Card
          variant="default"
          hover={false}
          className="course-modules__progress-card"
        >
          <div className="course-modules__progress-top">
            <div className="course-modules__progress-stat">
              <div className="course-modules__progress-icon">
                <FiLayers />
              </div>

              <div>
                <span className="course-modules__progress-label">
                  Course structure
                </span>

                <strong className="course-modules__progress-value">
                  {formatModuleCount(totalModules)}
                </strong>
              </div>
            </div>

            <div className="course-modules__progress-stat">
              <div className="course-modules__progress-icon course-modules__progress-icon--cyan">
                <FiClock />
              </div>

              <div>
                <span className="course-modules__progress-label">Duration</span>

                <strong className="course-modules__progress-value">
                  {course.durationLabel || "Self-paced"}
                </strong>
              </div>
            </div>

            <div className="course-modules__progress-stat">
              <div className="course-modules__progress-icon course-modules__progress-icon--green">
                <FiCheckCircle />
              </div>

              <div>
                <span className="course-modules__progress-label">
                  Completed
                </span>

                <strong className="course-modules__progress-value">
                  {completedModules} / {totalModules}
                </strong>
              </div>
            </div>
          </div>

          <div className="course-modules__progress-divider" />

          <div className="course-modules__overall-progress">
            <div className="course-modules__overall-progress-header">
              <div>
                <span className="course-modules__overall-label">
                  Your progress
                </span>

                <p className="course-modules__overall-text">
                  {overallProgress === 100
                    ? "Course completed. Excellent work!"
                    : overallProgress > 0
                      ? "Keep going — you're making steady progress."
                      : "Start your learning journey today."}
                </p>
              </div>

              <strong className="course-modules__overall-percentage">
                {overallProgress}%
              </strong>
            </div>

            <ProgressBar
              value={overallProgress}
              max={100}
              variant="cyan"
              appearance="gradient"
              size="md"
              showValue={false}
            />
          </div>
        </Card>

        {/* =========================================================
            MODULE LIST
        ========================================================= */}
        <div className="course-modules__list">
          {modules.map((module, index) => {
            const isExpanded = expandedModule === module.id;
            const status = module.status || "locked";
            const moduleProgress = Number(module.progress) || 0;

            return (
              <Card
                key={module.id || index}
                variant="default"
                hover={false}
                className={`course-modules__module-card ${
                  isExpanded ? "course-modules__module-card--expanded" : ""
                } ${
                  status === "locked"
                    ? "course-modules__module-card--locked"
                    : ""
                }`}
              >
                <div className="course-modules__module-main">
                  {/* Module number */}
                  <div
                    className={`course-modules__module-number course-modules__module-number--${status}`}
                  >
                    {status === "completed" ? (
                      <FiCheck />
                    ) : status === "locked" ? (
                      <FiLock />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </div>

                  {/* Module information */}
                  <div className="course-modules__module-content">
                    <div className="course-modules__module-heading">
                      <div className="course-modules__module-title-wrap">
                        <span className="course-modules__module-index">
                          MODULE {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="course-modules__module-title">
                          {module.title}
                        </h3>
                      </div>

                      <Badge
                        variant={getStatusBadgeVariant(status)}
                        size="sm"
                        rounded="full"
                      >
                        {getStatusLabel(status)}
                      </Badge>
                    </div>

                    <p className="course-modules__module-description">
                      {module.description}
                    </p>

                    <div className="course-modules__module-meta">
                      <span>
                        <FiBookOpen />
                        {module.lessons?.length || 0}{" "}
                        {(module.lessons?.length || 0) === 1
                          ? "Lesson"
                          : "Lessons"}
                      </span>

                      <span>
                        <FiClock />
                        {module.duration || "Self-paced"}
                      </span>
                    </div>

                    {status === "in-progress" && (
                      <div className="course-modules__module-progress">
                        <div className="course-modules__module-progress-top">
                          <span>Module progress</span>
                          <strong>{moduleProgress}%</strong>
                        </div>

                        <ProgressBar
                          value={moduleProgress}
                          max={100}
                          variant="cyan"
                          appearance="gradient"
                          size="sm"
                          showValue={false}
                        />
                      </div>
                    )}
                  </div>

                  {/* Module actions */}
                  <div className="course-modules__module-actions">
                    {status !== "locked" && (
                      <Button
                        variant={status === "in-progress" ? "primary" : "ghost"}
                        size="sm"
                        rounded="full"
                        rightIcon={
                          status === "in-progress" ? (
                            <FiArrowRight />
                          ) : undefined
                        }
                        onClick={() => handleContinue(module)}
                      >
                        {status === "in-progress" ? "Continue" : "Review"}
                      </Button>
                    )}

                    {status === "locked" && (
                      <span className="course-modules__locked-label">
                        Complete previous module
                      </span>
                    )}

                    {status !== "locked" && (
                      <button
                        type="button"
                        className="course-modules__expand-button"
                        onClick={() => handleToggleModule(module.id)}
                        aria-label={
                          isExpanded ? "Collapse module" : "Expand module"
                        }
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                    )}
                  </div>
                </div>

                {/* =================================================
                    EXPANDED LESSONS
                ================================================= */}
                {isExpanded &&
                  status !== "locked" &&
                  Array.isArray(module.lessons) &&
                  module.lessons.length > 0 && (
                    <div className="course-modules__lessons">
                      <div className="course-modules__lessons-inner">
                        <div className="course-modules__lessons-header">
                          <span className="course-modules__lessons-title">
                            Lessons in this module
                          </span>

                          <span className="course-modules__lessons-count">
                            {module.lessons.length}{" "}
                            {module.lessons.length === 1 ? "lesson" : "lessons"}
                          </span>
                        </div>

                        <div className="course-modules__lesson-list">
                          {module.lessons.map((lesson, lessonIndex) => {
                            const lessonStatus = lesson.status || "locked";

                            return (
                              <div
                                key={lesson.id || `${module.id}-${lessonIndex}`}
                                className={`course-modules__lesson ${
                                  lessonStatus === "current"
                                    ? "course-modules__lesson--current"
                                    : ""
                                } ${
                                  lessonStatus === "locked"
                                    ? "course-modules__lesson--locked"
                                    : ""
                                }`}
                              >
                                <div
                                  className={`course-modules__lesson-icon course-modules__lesson-icon--${lessonStatus}`}
                                >
                                  {lessonStatus === "completed" ? (
                                    <FiCheck />
                                  ) : lessonStatus === "current" ? (
                                    <FiPlay />
                                  ) : (
                                    <FiLock />
                                  )}
                                </div>

                                <div className="course-modules__lesson-info">
                                  <span className="course-modules__lesson-number">
                                    Lesson{" "}
                                    {String(lessonIndex + 1).padStart(2, "0")}
                                  </span>

                                  <span className="course-modules__lesson-title">
                                    {lesson.title}
                                  </span>
                                </div>

                                <span className="course-modules__lesson-duration">
                                  <FiClock />
                                  {lesson.duration || "Self-paced"}
                                </span>

                                {lessonStatus === "current" && (
                                  <span className="course-modules__lesson-current">
                                    <FiPlayCircle />
                                    Current
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
              </Card>
            );
          })}
        </div>

        {/* =========================================================
            BOTTOM CONTEXT
        ========================================================= */}
        <div className="course-modules__footer">
          <div className="course-modules__footer-icon">
            <FiCheckCircle />
          </div>

          <div className="course-modules__footer-content">
            <strong>Complete each module at your own pace</strong>

            <span>
              Your progress is saved automatically as you move through the
              learning path.
            </span>
          </div>

          <Badge variant="info" size="sm" rounded="full">
            Self-paced learning
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default CourseModules;
