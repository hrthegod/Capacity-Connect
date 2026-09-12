import React from "react";

import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";

import "./QuizResultHeader.css";

const QuizResultHeader = ({ quiz = null, result = null }) => {
  /* =========================================================
     SAFE DATA
  ========================================================= */

  const quizTitle = quiz?.quizTitle || quiz?.title || "Quiz Result";

  const courseTitle =
    quiz?.courseTitle || quiz?.course || "Learning Assessment";

  const category = quiz?.category || quiz?.subject || "General Learning";

  const level = quiz?.level || quiz?.difficulty || "Intermediate";

  const score = Number(result?.score ?? 0);

  const passingScore = Number(result?.passingScore ?? quiz?.passingScore ?? 70);

  const passed =
    typeof result?.passed === "boolean" ? result.passed : score >= passingScore;

  const completedAt =
    result?.completedAt || result?.completionDate || new Date().toISOString();

  const formattedCompletedDate = formatCompletedDate(completedAt);

  const totalQuestions = Number(
    result?.totalQuestions ??
      quiz?.totalQuestions ??
      quiz?.questionCount ??
      quiz?.questions?.length ??
      0,
  );

  const correctAnswers = Number(result?.correctAnswers ?? 0);

  const timeTaken = result?.timeTaken ?? 0;

  const topicTags = quiz?.tags ||
    quiz?.topics || [category, "Knowledge", "Assessment"];

  /* =========================================================
     ACCURACY
  ========================================================= */

  const accuracy =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : score;

  /* =========================================================
     SCORE CIRCLE
  ========================================================= */

  const scoreRadius = 82;

  const circumference = 2 * Math.PI * scoreRadius;

  const scoreOffset =
    circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  /* =========================================================
     DATE FORMATTER
  ========================================================= */

  function formatCompletedDate(value) {
    if (!value) {
      return "Recently";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }

  /* =========================================================
     TIME FORMATTER
  ========================================================= */

  function formatTime(value) {
    const seconds = Number(value) || 0;

    if (seconds <= 0) {
      return "—";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className={`quiz-result-header ${
        passed ? "quiz-result-header--passed" : "quiz-result-header--failed"
      }`}
    >
      {/* =====================================================
          TOP INFORMATION BAR
      ===================================================== */}

      <div className="quiz-result-header__topbar">
        <div className="quiz-result-header__breadcrumb">
          <span>QUIZZES</span>

          <span className="quiz-result-header__breadcrumb-separator">/</span>

          <span>{quizTitle}</span>

          <span className="quiz-result-header__breadcrumb-separator">/</span>

          <strong>RESULT</strong>
        </div>

        <div className="quiz-result-header__completed">
          <Clock3 size={18} strokeWidth={2} />

          <span>
            Completed on <strong>{formattedCompletedDate}</strong>
          </span>
        </div>
      </div>

      {/* =====================================================
          MAIN RESULT CARD
      ===================================================== */}

      <div className="quiz-result-header__card">
        {/* ===================================================
            DECORATIVE BACKGROUND
        =================================================== */}

        <div className="quiz-result-header__background-glow quiz-result-header__background-glow--one" />

        <div className="quiz-result-header__background-glow quiz-result-header__background-glow--two" />

        <div className="quiz-result-header__background-ring quiz-result-header__background-ring--one" />

        <div className="quiz-result-header__background-ring quiz-result-header__background-ring--two" />

        <div className="quiz-result-header__dots">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* ===================================================
            ACHIEVEMENT VISUAL
        =================================================== */}

        <div className="quiz-result-header__achievement">
          <div className="quiz-result-header__confetti">
            <i className="quiz-result-header__confetti-item quiz-result-header__confetti-item--one" />
            <i className="quiz-result-header__confetti-item quiz-result-header__confetti-item--two" />
            <i className="quiz-result-header__confetti-item quiz-result-header__confetti-item--three" />
            <i className="quiz-result-header__confetti-item quiz-result-header__confetti-item--four" />
            <i className="quiz-result-header__confetti-item quiz-result-header__confetti-item--five" />
            <i className="quiz-result-header__confetti-item quiz-result-header__confetti-item--six" />
          </div>

          <div className="quiz-result-header__trophy-glow" />

          <div className="quiz-result-header__trophy-platform">
            <div className="quiz-result-header__trophy-platform-inner" />
          </div>

          <div className="quiz-result-header__trophy">
            <div className="quiz-result-header__trophy-handle quiz-result-header__trophy-handle--left" />

            <div className="quiz-result-header__trophy-handle quiz-result-header__trophy-handle--right" />

            <div className="quiz-result-header__trophy-body">
              <Trophy size={82} strokeWidth={1.45} />

              <div className="quiz-result-header__trophy-star">
                <Sparkles size={23} strokeWidth={2} />
              </div>
            </div>

            <div className="quiz-result-header__trophy-stem" />

            <div className="quiz-result-header__trophy-base" />
          </div>

          <div className="quiz-result-header__achievement-check">
            {passed ? (
              <Check size={27} strokeWidth={3} />
            ) : (
              <XCircle size={27} strokeWidth={2.4} />
            )}
          </div>

          <div className="quiz-result-header__achievement-caption">
            <Award size={16} strokeWidth={2} />

            <span>{passed ? "Achievement Unlocked" : "Quiz Completed"}</span>
          </div>
        </div>

        {/* ===================================================
            CENTER CONTENT
        =================================================== */}

        <div className="quiz-result-header__content">
          <div
            className={`quiz-result-header__status ${
              passed
                ? "quiz-result-header__status--passed"
                : "quiz-result-header__status--failed"
            }`}
          >
            {passed ? (
              <CheckCircle2 size={17} strokeWidth={2.4} />
            ) : (
              <XCircle size={17} strokeWidth={2.2} />
            )}

            <span>Quiz Completed</span>
          </div>

          <h1>{passed ? "Congratulations!" : "Quiz Completed"}</h1>

          <p className="quiz-result-header__description">
            {passed
              ? "You've successfully completed the quiz and demonstrated great understanding of the concepts."
              : "You've completed this quiz. Review your performance and keep building your knowledge."}
          </p>

          {/* QUIZ INFORMATION */}

          <div className="quiz-result-header__quiz-info">
            <h2>{quizTitle}</h2>

            <div className="quiz-result-header__meta">
              <div className="quiz-result-header__meta-item">
                <BookOpen size={18} strokeWidth={2} />

                <span>{courseTitle}</span>
              </div>

              <span className="quiz-result-header__meta-dot">•</span>

              <div className="quiz-result-header__meta-item">
                <GraduationCap size={18} strokeWidth={2} />

                <span>{level} Level</span>
              </div>
            </div>
          </div>

          {/* TOPIC TAGS */}

          <div className="quiz-result-header__tags">
            {topicTags.slice(0, 3).map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className={`quiz-result-header__tag quiz-result-header__tag--${index + 1}`}
              >
                {index === 0 && (
                  <span className="quiz-result-header__tag-dot" />
                )}

                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ===================================================
            SCORE PANEL
        =================================================== */}

        <div className="quiz-result-header__score-panel">
          <div className="quiz-result-header__score-orbit">
            <div className="quiz-result-header__score-circle">
              <svg
                className="quiz-result-header__score-svg"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <circle
                  className="quiz-result-header__score-track"
                  cx="100"
                  cy="100"
                  r={scoreRadius}
                />

                <circle
                  className="quiz-result-header__score-progress"
                  cx="100"
                  cy="100"
                  r={scoreRadius}
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: scoreOffset,
                  }}
                />
              </svg>

              <div className="quiz-result-header__score-value">
                <strong>{Number(score).toFixed(2)}%</strong>

                <span>Score Achieved</span>
              </div>
            </div>

            <div className="quiz-result-header__score-spark quiz-result-header__score-spark--one" />
            <div className="quiz-result-header__score-spark quiz-result-header__score-spark--two" />
          </div>

          {/* PASS / FAIL */}

          <div
            className={`quiz-result-header__result-status ${
              passed
                ? "quiz-result-header__result-status--passed"
                : "quiz-result-header__result-status--failed"
            }`}
          >
            {passed ? (
              <CheckCircle2 size={21} strokeWidth={2.4} />
            ) : (
              <XCircle size={21} strokeWidth={2.2} />
            )}

            <span>{passed ? "PASSED" : "NOT PASSED"}</span>
          </div>

          <p className="quiz-result-header__passing-score">
            Passing Score: <strong>{Number(passingScore).toFixed(2)}%</strong>
          </p>

          {/* MINI RESULT DETAILS */}

          <div className="quiz-result-header__mini-stats">
            <div>
              <strong>{correctAnswers}</strong>

              <span>Correct</span>
            </div>

            <div>
              <strong>{Number(accuracy).toFixed(2)}%</strong>

              <span>Accuracy</span>
            </div>

            <div>
              <strong>{formatTime(timeTaken)}</strong>

              <span>Time</span>
            </div>
          </div>
        </div>

        {/* ===================================================
            SIDE MESSAGE
        =================================================== */}

        <div className="quiz-result-header__message">
          <span>{passed ? "Great" : "Keep"}</span>

          <strong>{passed ? "Effort!" : "Going!"}</strong>

          <div className="quiz-result-header__message-line" />
        </div>
      </div>
    </section>
  );
};

export default QuizResultHeader;
