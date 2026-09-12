import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LuArrowLeft,
  LuAtom,
  LuBookOpen,
  LuCalendarDays,
  LuChevronDown,
  LuCircleCheck,
  LuClock3,
  LuEllipsis,
  LuFilePenLine,
  LuListChecks,
  LuUserRound,
  LuUsersRound,
} from "react-icons/lu";

import "./QuizDetailsHeader.css";

const QuizDetailsHeader = ({ quiz = {}, onEditQuiz }) => {
  const navigate = useNavigate();

  const [openActions, setOpenActions] = useState(false);

  const actionsRef = useRef(null);

  /* ======================================================
     OUTSIDE CLICK
  ====================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setOpenActions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ======================================================
     ESCAPE KEY
  ====================================================== */

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        setOpenActions(false);
      }
    };

    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  /* ======================================================
     BACK TO QUIZZES
  ====================================================== */

  const handleBack = () => {
    navigate("/trainer/trainer-quizzes");
  };

  /* ======================================================
     EDIT QUIZ
  ====================================================== */

  const handleEdit = () => {
    setOpenActions(false);

    if (onEditQuiz) {
      onEditQuiz(quiz);
      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-edit-quiz", {
        detail: { quiz },
      }),
    );
  };

  /* ======================================================
     DUPLICATE QUIZ
  ====================================================== */

  const handleDuplicate = () => {
    setOpenActions(false);

    window.dispatchEvent(
      new CustomEvent("trainer-duplicate-quiz", {
        detail: { quiz },
      }),
    );
  };

  /* ======================================================
     ARCHIVE QUIZ
  ====================================================== */

  const handleArchive = () => {
    setOpenActions(false);

    window.dispatchEvent(
      new CustomEvent("trainer-archive-quiz", {
        detail: { quiz },
      }),
    );
  };

  /* ======================================================
     STATUS CLASS
  ====================================================== */

  const statusClass =
    quiz.status?.toLowerCase().replace(/\s+/g, "-") || "published";

  return (
    <section className="quiz-details-header">
      {/* ==================================================
          TOP NAVIGATION
      ================================================== */}

      <div className="quiz-details-topbar">
        {/* ================================================
            BACK BUTTON
        ================================================= */}

        <button
          type="button"
          className="quiz-details-back-button"
          onClick={handleBack}
        >
          <span className="quiz-details-back-icon">
            <LuArrowLeft size={16} strokeWidth={1.8} />
          </span>

          <span>Back to Quizzes</span>
        </button>

        {/* ================================================
            BREADCRUMB
        ================================================= */}

        <div className="quiz-details-breadcrumb">
          <button type="button" onClick={handleBack}>
            Trainer
          </button>

          <span>/</span>

          <button type="button" onClick={handleBack}>
            Quizzes
          </button>

          <span>/</span>

          <strong>{quiz.title}</strong>
        </div>
      </div>

      {/* ==================================================
          MAIN HEADER CARD
      ================================================== */}

      <div className="quiz-details-main-card">
        {/* =================================================
            LEFT / MAIN INFORMATION
        ================================================= */}

        <div className="quiz-details-information">
          {/* ===============================================
              TITLE ROW
          =============================================== */}

          <div className="quiz-details-title-row">
            <div className="quiz-details-logo">
              <div className="quiz-details-logo-glow" />

              <LuAtom size={39} strokeWidth={1.5} />
            </div>

            <div className="quiz-details-title-content">
              <h1>{quiz.title}</h1>

              {/* =========================================
                  META BADGES
              ========================================= */}

              <div className="quiz-details-meta">
                <span className="quiz-details-meta-item assessment">
                  <LuBookOpen size={14} strokeWidth={1.8} />

                  {quiz.type}
                </span>

                <span className="quiz-details-meta-item course">
                  <LuBookOpen size={14} strokeWidth={1.8} />

                  {quiz.course}
                </span>

                <span
                  className={`quiz-details-meta-item status ${statusClass}`}
                >
                  <span className="quiz-details-status-dot" />

                  {quiz.status}
                </span>
              </div>
            </div>
          </div>

          {/* ===============================================
              DESCRIPTION
          =============================================== */}

          <p className="quiz-details-description">{quiz.description}</p>

          {/* ===============================================
              INFORMATION ROW
          =============================================== */}

          <div className="quiz-details-information-row">
            {/* ===========================================
                CREATED BY
            =========================================== */}

            <div className="quiz-details-information-item creator">
              <div className="quiz-details-information-icon">
                <LuUserRound size={16} strokeWidth={1.7} />
              </div>

              <div>
                <span>Created by</span>

                <strong>{quiz.createdBy || "—"}</strong>
              </div>
            </div>

            {/* ===========================================
                CREATED ON
            =========================================== */}

            <div className="quiz-details-information-item created">
              <div className="quiz-details-information-icon">
                <LuCalendarDays size={16} strokeWidth={1.7} />
              </div>

              <div>
                <span>Created on</span>

                <strong>{quiz.createdOn || "—"}</strong>
              </div>
            </div>

            {/* ===========================================
                LAST UPDATED
            =========================================== */}

            <div className="quiz-details-information-item updated">
              <div className="quiz-details-information-icon">
                <LuClock3 size={16} strokeWidth={1.7} />
              </div>

              <div>
                <span>Last updated</span>

                <strong>{quiz.lastUpdated || "—"}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT ACTION AREA
        ================================================= */}

        <div className="quiz-details-actions-area">
          {/* ===============================================
              ACTION BUTTONS
          =============================================== */}

          <div className="quiz-details-actions">
            <button
              type="button"
              className="quiz-details-edit-button"
              onClick={handleEdit}
            >
              <LuFilePenLine size={15} strokeWidth={1.8} />

              <span>Edit Quiz</span>
            </button>

            <div className="quiz-details-more-wrapper" ref={actionsRef}>
              <button
                type="button"
                className={`quiz-details-more-button ${
                  openActions ? "active" : ""
                }`}
                onClick={() => setOpenActions((previous) => !previous)}
                aria-haspopup="menu"
                aria-expanded={openActions}
              >
                <LuEllipsis size={17} strokeWidth={1.9} />

                <span>More</span>

                <LuChevronDown
                  className={openActions ? "rotate" : ""}
                  size={14}
                  strokeWidth={1.8}
                />
              </button>

              {openActions && (
                <div className="quiz-details-more-menu">
                  <button type="button" onClick={handleDuplicate}>
                    <LuFilePenLine size={14} strokeWidth={1.8} />

                    <span>Duplicate Quiz</span>
                  </button>

                  <button type="button" onClick={handleArchive}>
                    <LuCircleCheck size={14} strokeWidth={1.8} />

                    <span>Archive Quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ===============================================
              DECORATIVE LEARNING CARD

              Small dark navy section only.
          =============================================== */}

          <div className="quiz-details-learning-card">
            <div className="quiz-details-learning-orb orb-one" />
            <div className="quiz-details-learning-orb orb-two" />

            <div className="quiz-details-learning-icon">
              <LuListChecks size={21} strokeWidth={1.7} />
            </div>

            <div className="quiz-details-learning-content">
              <span>QUIZ WORKSPACE</span>

              <strong>Learn. Practice. Grow.</strong>

              <p>Keep your learners moving forward.</p>
            </div>

            <div className="quiz-details-learning-users">
              <LuUsersRound size={15} strokeWidth={1.8} />

              <span>{quiz.attempts ?? 0} attempts</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          METRICS
      ================================================== */}

      <div className="quiz-details-metrics">
        {/* ================================================
            QUESTIONS
        ================================================= */}

        <div className="quiz-details-metric-card questions">
          <div className="quiz-details-metric-icon">
            <LuListChecks size={19} strokeWidth={1.7} />
          </div>

          <div className="quiz-details-metric-content">
            <strong>{quiz.questions ?? 0}</strong>

            <span>Questions</span>
          </div>

          <div className="quiz-details-metric-arrow">
            <LuChevronDown size={15} strokeWidth={1.8} />
          </div>
        </div>

        {/* ================================================
            ATTEMPTS
        ================================================= */}

        <div className="quiz-details-metric-card attempts">
          <div className="quiz-details-metric-icon">
            <LuUsersRound size={19} strokeWidth={1.7} />
          </div>

          <div className="quiz-details-metric-content">
            <strong>{quiz.attempts ?? 0}</strong>

            <span>Total Attempts</span>
          </div>

          <div className="quiz-details-metric-arrow">
            <LuChevronDown size={15} strokeWidth={1.8} />
          </div>
        </div>

        {/* ================================================
            DURATION
        ================================================= */}

        <div className="quiz-details-metric-card duration">
          <div className="quiz-details-metric-icon">
            <LuClock3 size={19} strokeWidth={1.7} />
          </div>

          <div className="quiz-details-metric-content">
            <strong>{quiz.duration || (quiz.time_limit_minutes ? `${quiz.time_limit_minutes} min` : "—")}</strong>

            <span>Duration</span>
          </div>

          <div className="quiz-details-metric-arrow">
            <LuChevronDown size={15} strokeWidth={1.8} />
          </div>
        </div>

        {/* ================================================
            SCORE
        ================================================= */}

        <div className="quiz-details-metric-card score">
          <div className="quiz-details-metric-icon">
            <LuCircleCheck size={19} strokeWidth={1.7} />
          </div>

          <div className="quiz-details-metric-content">
            <strong>{quiz.score ?? quiz.passing_score ?? 60}%</strong>

            <span>Passing Score</span>
          </div>

          <div className="quiz-details-metric-arrow">
            <LuChevronDown size={15} strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizDetailsHeader;
