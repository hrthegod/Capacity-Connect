import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LuArrowUpRight,
  LuChartBar,
  LuBookOpen,
  LuCalendarDays,
  LuChartNoAxesColumnIncreasing,
  LuCheck,
  LuChevronRight,
  LuClock3,
  LuCircleCheck,
  LuClipboardCheck,
  LuCopy,
  LuFilePenLine,
  LuFileText,
  LuGauge,
  LuGraduationCap,
  LuInfo,
  LuListChecks,
  LuRotateCcw,
  LuSettings2,
  LuShieldCheck,
  LuTarget,
  LuUsersRound,
  LuUserRound,
  LuX,
} from "react-icons/lu";

import "./QuizOverview.css";

/* =========================================================
   DEFAULT QUIZ
========================================================= */

const defaultQuiz = {
  id: 1,
  title: "React Basics Quiz",
  description: "Test your knowledge of React fundamentals and core concepts.",
  course: "React for Beginners",
  type: "Assessment",
  status: "Published",
  questions: 20,
  attempts: 245,
  duration: "30 min",
  score: 82,
  icon: "react",
  theme: "blue",
};

/* =========================================================
   DEFAULT OVERVIEW DATA

   These values can later come from your backend.
========================================================= */

const defaultOverviewData = {
  passingScore: "70%",
  attemptsAllowed: "3",
  difficulty: "Medium",
  targetAudience: "Beginners",
  uniqueLearners: "198",
  completionRate: "76%",
  createdBy: "Alex Johnson",
  createdDate: "Mar 15, 2024, 10:30 AM",
  updatedDate: "Mar 20, 2024, 02:45 PM",

  instructions: [
    "Read each question carefully before selecting your answer.",
    "You can attempt the quiz up to 3 times.",
    "Each question carries equal marks.",
    "You must score at least 70% to pass.",
    "The quiz will be automatically submitted when the time is over.",
    "Make sure you have a stable internet connection.",
  ],
};

/* =========================================================
   COMPONENT
========================================================= */

const QuizOverview = ({
  quiz = defaultQuiz,
  overviewData = defaultOverviewData,
  onEditInfo,
  onEditSettings,
  onEditInstructions,
}) => {
  const navigate = useNavigate();

  const [showCopied, setShowCopied] = useState(false);

  /* =======================================================
     DATA
  ======================================================= */

  const data = {
    ...defaultOverviewData,
    ...overviewData,
  };

  /* =======================================================
     EDIT INFO
  ======================================================= */

  const handleEditInfo = () => {
    if (onEditInfo) {
      onEditInfo(quiz);
      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-edit-quiz-info", {
        detail: {
          quiz,
        },
      }),
    );
  };

  /* =======================================================
     EDIT SETTINGS
  ======================================================= */

  const handleEditSettings = () => {
    if (onEditSettings) {
      onEditSettings(quiz);
      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-edit-quiz-settings", {
        detail: {
          quiz,
        },
      }),
    );
  };

  /* =======================================================
     EDIT INSTRUCTIONS
  ======================================================= */

  const handleEditInstructions = () => {
    if (onEditInstructions) {
      onEditInstructions(quiz);
      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-edit-quiz-instructions", {
        detail: {
          quiz,
        },
      }),
    );
  };

  /* =======================================================
     COURSE NAVIGATION
  ======================================================= */

  const handleCourseClick = () => {
    navigate("/trainer/trainer-courses");
  };

  /* =======================================================
     COPY QUIZ ID
  ======================================================= */

  const handleCopyQuizId = async () => {
    try {
      await navigator.clipboard.writeText(String(quiz.id));

      setShowCopied(true);

      window.setTimeout(() => {
        setShowCopied(false);
      }, 1800);
    } catch {
      setShowCopied(false);
    }
  };

  /* =======================================================
     STATUS CLASS
  ======================================================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Published":
        return "published";

      case "Draft":
        return "draft";

      case "Archived":
        return "archived";

      case "Unpublished":
        return "unpublished";

      default:
        return "published";
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="quiz-overview">
      {/* ===================================================
          SECTION HEADER
      =================================================== */}

      <header className="quiz-overview-header">
        <div className="quiz-overview-header-left">
          <div className="quiz-overview-header-icon">
            <LuGauge size={18} strokeWidth={1.75} />
          </div>

          <div className="quiz-overview-heading">
            <div className="quiz-overview-title-row">
              <h2>Quiz Overview</h2>

              <span className="quiz-overview-id">
                ID #{String(quiz.id).padStart(3, "0")}
              </span>
            </div>

            <p>
              Detailed information, configuration, and instructions for this
              quiz.
            </p>
          </div>
        </div>

        <div className="quiz-overview-header-note">
          <div className="quiz-overview-header-note-icon">
            <LuInfo size={15} strokeWidth={1.8} />
          </div>

          <span>
            Everything you need to know
            <br />
            about this quiz at a glance.
          </span>
        </div>
      </header>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div className="quiz-overview-layout">
        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div className="quiz-overview-left">
          {/* ===============================================
              QUIZ INFORMATION
          =============================================== */}

          <article className="quiz-overview-card quiz-info-card">
            <div className="quiz-overview-card-header">
              <div className="quiz-overview-card-heading">
                <div className="quiz-overview-card-icon info">
                  <LuInfo size={17} strokeWidth={1.75} />
                </div>

                <div>
                  <h3>Quiz Information</h3>
                  <p>
                    Basic details and additional information about this quiz.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="quiz-overview-outline-button"
                onClick={handleEditInfo}
              >
                <LuFilePenLine size={14} strokeWidth={1.8} />
                <span>Edit Info</span>
              </button>
            </div>

            <div className="quiz-information-list">
              {/* TITLE */}

              <div className="quiz-information-row">
                <div className="quiz-information-label">
                  <LuFileText size={15} strokeWidth={1.7} />
                  <span>Title</span>
                </div>

                <div className="quiz-information-value">{quiz.title}</div>
              </div>

              {/* DESCRIPTION */}

              <div className="quiz-information-row quiz-description-row">
                <div className="quiz-information-label">
                  <LuClipboardCheck size={15} strokeWidth={1.7} />
                  <span>Description</span>
                </div>

                <div className="quiz-information-value description">
                  {quiz.description}
                </div>
              </div>

              {/* COURSE */}

              <div className="quiz-information-row">
                <div className="quiz-information-label">
                  <LuBookOpen size={15} strokeWidth={1.7} />
                  <span>Course</span>
                </div>

                <div className="quiz-information-value">
                  <button
                    type="button"
                    className="quiz-course-link"
                    onClick={handleCourseClick}
                  >
                    <span>{quiz.course}</span>

                    <LuArrowUpRight size={13} strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              {/* TYPE */}

              <div className="quiz-information-row">
                <div className="quiz-information-label">
                  <LuListChecks size={15} strokeWidth={1.7} />
                  <span>Quiz Type</span>
                </div>

                <div className="quiz-information-value">
                  <span className="quiz-overview-soft-badge type">
                    {quiz.type}
                  </span>
                </div>
              </div>

              {/* STATUS */}

              <div className="quiz-information-row">
                <div className="quiz-information-label">
                  <LuCircleCheck size={15} strokeWidth={1.7} />
                  <span>Status</span>
                </div>

                <div className="quiz-information-value">
                  <span
                    className={`quiz-overview-status-badge ${getStatusClass(
                      quiz.status,
                    )}`}
                  >
                    <span className="quiz-overview-status-dot" />
                    {quiz.status}
                  </span>
                </div>
              </div>

              {/* CREATED BY */}

              <div className="quiz-information-row">
                <div className="quiz-information-label">
                  <LuUserRound size={15} strokeWidth={1.7} />
                  <span>Created By</span>
                </div>

                <div className="quiz-information-value creator-value">
                  <span className="quiz-creator-avatar">
                    <LuUserRound size={13} strokeWidth={1.8} />
                  </span>

                  <span>{data.createdBy}</span>
                </div>
              </div>

              {/* CREATED DATE */}

              <div className="quiz-information-row">
                <div className="quiz-information-label">
                  <LuCalendarDays size={15} strokeWidth={1.7} />
                  <span>Created Date</span>
                </div>

                <div className="quiz-information-value">{data.createdDate}</div>
              </div>

              {/* UPDATED DATE */}

              <div className="quiz-information-row">
                <div className="quiz-information-label">
                  <LuCalendarDays size={15} strokeWidth={1.7} />
                  <span>Last Updated</span>
                </div>

                <div className="quiz-information-value">{data.updatedDate}</div>
              </div>
            </div>

            {/* QUIZ ID */}

            <div className="quiz-id-footer">
              <div className="quiz-id-footer-left">
                <LuShieldCheck size={14} strokeWidth={1.7} />

                <span>Quiz identifier</span>
              </div>

              <button
                type="button"
                className={`quiz-copy-id-button ${showCopied ? "copied" : ""}`}
                onClick={handleCopyQuizId}
              >
                <span>#{String(quiz.id).padStart(3, "0")}</span>

                {showCopied ? (
                  <LuCheck size={13} strokeWidth={2} />
                ) : (
                  <LuCopy size={13} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </article>

          {/* ===============================================
              QUIZ INSTRUCTIONS
          =============================================== */}

          <article className="quiz-overview-card quiz-instructions-card">
            <div className="quiz-overview-card-header">
              <div className="quiz-overview-card-heading">
                <div className="quiz-overview-card-icon instructions">
                  <LuFileText size={17} strokeWidth={1.75} />
                </div>

                <div>
                  <h3>Quiz Instructions</h3>
                  <p>Instructions and guidelines for learners.</p>
                </div>
              </div>

              <button
                type="button"
                className="quiz-overview-outline-button"
                onClick={handleEditInstructions}
              >
                <LuFilePenLine size={14} strokeWidth={1.8} />
                <span>Edit Instructions</span>
              </button>
            </div>

            <div className="quiz-instructions-box">
              <div className="quiz-instructions-icon">
                <LuInfo size={17} strokeWidth={1.7} />
              </div>

              <ol className="quiz-instructions-list">
                {data.instructions.map((instruction, index) => (
                  <li key={`${instruction}-${index}`}>
                    <span className="quiz-instruction-number">{index + 1}</span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </div>

        {/* =================================================
            RIGHT COLUMN
        ================================================= */}

        <div className="quiz-overview-right">
          {/* ===============================================
              QUIZ CONFIGURATION
          =============================================== */}

          <article className="quiz-overview-card quiz-configuration-card">
            <div className="quiz-overview-card-header">
              <div className="quiz-overview-card-heading">
                <div className="quiz-overview-card-icon configuration">
                  <LuSettings2 size={17} strokeWidth={1.75} />
                </div>

                <div>
                  <h3>Quiz Configuration</h3>
                  <p>Settings and configuration for this quiz.</p>
                </div>
              </div>

              <button
                type="button"
                className="quiz-overview-outline-button"
                onClick={handleEditSettings}
              >
                <LuSettings2 size={14} strokeWidth={1.8} />
                <span>Edit Settings</span>
              </button>
            </div>

            <div className="quiz-configuration-grid">
              {/* TOTAL QUESTIONS */}

              <div className="quiz-config-item blue">
                <div className="quiz-config-icon">
                  <LuListChecks size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-config-content">
                  <span className="quiz-config-label">Total Questions</span>
                  <strong>{quiz.questions}</strong>
                  <small>Questions</small>
                </div>
              </div>

              {/* DURATION */}

              <div className="quiz-config-item mint">
                <div className="quiz-config-icon">
                  <LuClock3 size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-config-content">
                  <span className="quiz-config-label">Time Duration</span>
                  <strong>{quiz.duration}</strong>
                  <small>Time limit</small>
                </div>
              </div>

              {/* PASSING SCORE */}

              <div className="quiz-config-item rose">
                <div className="quiz-config-icon">
                  <LuTarget size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-config-content">
                  <span className="quiz-config-label">Passing Score</span>
                  <strong>{data.passingScore}</strong>
                  <small>Required to pass</small>
                </div>
              </div>

              {/* ATTEMPTS */}

              <div className="quiz-config-item peach">
                <div className="quiz-config-icon">
                  <LuRotateCcw size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-config-content">
                  <span className="quiz-config-label">Attempts Allowed</span>
                  <strong>{data.attemptsAllowed}</strong>
                  <small>Per learner</small>
                </div>
              </div>

              {/* DIFFICULTY */}

              <div className="quiz-config-item lavender">
                <div className="quiz-config-icon">
                  <LuChartNoAxesColumnIncreasing size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-config-content">
                  <span className="quiz-config-label">Difficulty Level</span>
                  <strong>{data.difficulty}</strong>
                  <small>Balanced challenge</small>
                </div>
              </div>

              {/* TOTAL ATTEMPTS */}

              <div className="quiz-config-item sky">
                <div className="quiz-config-icon">
                  <LuUsersRound size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-config-content">
                  <span className="quiz-config-label">Total Attempts</span>
                  <strong>{quiz.attempts}</strong>
                  <small>By learners</small>
                </div>
              </div>
            </div>
          </article>

          {/* ===============================================
              QUICK SUMMARY — DARK SECTION
          =============================================== */}

          <article className="quiz-quick-summary">
            <div className="quiz-quick-summary-header">
              <div className="quiz-quick-summary-title">
                <div className="quiz-quick-summary-icon">
                  <LuChartBar size={18} strokeWidth={1.75} />
                </div>

                <div>
                  <h3>Quick Summary</h3>

                  <p>A quick snapshot of this quiz&apos;s key details.</p>
                </div>
              </div>

              <span className="quiz-ready-badge">
                <span className="quiz-ready-dot" />
                Ready for Learners
              </span>
            </div>

            <div className="quiz-summary-grid">
              {/* TARGET AUDIENCE */}

              <div className="quiz-summary-item">
                <div className="quiz-summary-item-icon green">
                  <LuGraduationCap size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-summary-item-content">
                  <span>Target Audience</span>
                  <strong>{data.targetAudience}</strong>
                  <small>Ideal for new learners</small>
                </div>
              </div>

              {/* AVERAGE SCORE */}

              <div className="quiz-summary-item">
                <div className="quiz-summary-item-icon purple">
                  <LuTarget size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-summary-item-content">
                  <span>Average Score</span>
                  <strong>{quiz.score}%</strong>
                  <small>From all attempts</small>
                </div>
              </div>

              {/* UNIQUE LEARNERS */}

              <div className="quiz-summary-item">
                <div className="quiz-summary-item-icon blue">
                  <LuUsersRound size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-summary-item-content">
                  <span>Unique Learners</span>
                  <strong>{data.uniqueLearners}</strong>
                  <small>Total participants</small>
                </div>
              </div>

              {/* COMPLETION RATE */}

              <div className="quiz-summary-item">
                <div className="quiz-summary-item-icon yellow">
                  <LuChartNoAxesColumnIncreasing size={18} strokeWidth={1.7} />
                </div>

                <div className="quiz-summary-item-content">
                  <span>Completion Rate</span>
                  <strong>{data.completionRate}</strong>
                  <small>Completed attempts</small>
                </div>
              </div>
            </div>

            {/* DARK CARD FOOTER */}

            <div className="quiz-summary-footer">
              <div className="quiz-summary-footer-info">
                <LuShieldCheck size={14} strokeWidth={1.7} />

                <span>Configuration is currently synced with the quiz.</span>
              </div>

              <button
                type="button"
                className="quiz-summary-details-button"
                onClick={handleEditSettings}
              >
                <span>Manage settings</span>

                <LuChevronRight size={14} strokeWidth={1.8} />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default QuizOverview;
