import React from "react";

import {
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flag,
  Lightbulb,
  List,
  Target,
} from "lucide-react";

import "./QuizProgress.css";

/* =========================================================
   QUIZ PROGRESS
   Capacity Connect - Learner
========================================================= */

const QuizProgress = ({
  progress = {},
  questions = [],
  currentQuestionIndex = 0,
  answers = {},
  onQuestionSelect,
  onPrevious,
  onNext,
  onMarkReview,
  onAnswerSelect,
  onSubmit,
}) => {
  /* =======================================================
     SAFE DATA
  ======================================================= */

  const totalQuestions = progress.totalQuestions || questions.length || 10;

  const currentQuestion = progress.currentQuestion || currentQuestionIndex + 1;

  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;

  const answeredQuestions =
    progress.answeredQuestions ??
    Object.keys(answers).filter((key) => {
      const value = answers[key];

      return value !== undefined && value !== null && value !== "";
    }).length;

  const unansweredQuestions = Math.max(totalQuestions - answeredQuestions, 0);

  const percentage =
    progress.percentage ??
    (totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0);

  const formattedTime = progress.formattedTime || "20:00";

  const isTimeRunningOut = progress.isTimeRunningOut || false;

  /* =======================================================
     CURRENT QUESTION
  ======================================================= */

  const activeQuestion = questions[currentQuestionIndex] || null;

  const questionText =
    activeQuestion?.question ||
    "Which of the following is the correct way to declare a variable in JavaScript?";

  const questionPoints = activeQuestion?.points ?? 1;

  /* =======================================================
     QUESTION OPTIONS
  ======================================================= */

  const options = activeQuestion?.options || [
    'variable name = "value";',
    'let name = "value";',
    'var name == "value";',
    'const : name = "value";',
  ];

  /* =======================================================
     SELECTED ANSWER
  ======================================================= */

  const selectedAnswer = activeQuestion?.questionId
    ? answers[activeQuestion.questionId]
    : null;

  /* =======================================================
     QUESTION STATUS
  ======================================================= */

  const getQuestionStatus = (index) => {
    const question = questions[index];

    const questionId = question?.questionId;

    const isAnswered =
      questionId &&
      answers[questionId] !== undefined &&
      answers[questionId] !== null &&
      answers[questionId] !== "";

    if (index === currentQuestionIndex) {
      return "current";
    }

    if (isAnswered) {
      return "answered";
    }

    return "unanswered";
  };

  /* =======================================================
     QUESTION NUMBER ARRAY
  ======================================================= */

  const questionNumbers = Array.from(
    { length: totalQuestions },
    (_, index) => index,
  );

  /* =======================================================
     OPTION LETTER
  ======================================================= */

  const getOptionLetter = (index) => String.fromCharCode(65 + index);

  /* =======================================================
     HANDLE ANSWER
  ======================================================= */

  const handleOptionSelect = (option) => {
    if (!activeQuestion?.questionId) {
      return;
    }

    onAnswerSelect?.(activeQuestion.questionId, option);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="quiz-progress">
      {/* ===================================================
          TOP WORKSPACE
          LEFT = QUESTIONS
          RIGHT = TIMER
      =================================================== */}

      <div className="quiz-progress__workspace">
        {/* ===============================================
            LEFT QUESTION PANEL
        ================================================ */}

        <aside className="quiz-progress__questions-panel">
          {/* =============================================
              PANEL HEADER
          ============================================== */}

          <div className="quiz-progress__questions-header">
            <div className="quiz-progress__questions-title">
              <span className="quiz-progress__questions-icon">
                <List size={19} strokeWidth={2.2} />
              </span>

              <h2>Questions</h2>
            </div>

            <strong>{totalQuestions}</strong>
          </div>

          {/* =============================================
              STATUS LEGEND
          ============================================== */}

          <div className="quiz-progress__legend">
            <div className="quiz-progress__legend-item">
              <span className="quiz-progress__legend-dot quiz-progress__legend-dot--current" />
              <span>Current</span>
            </div>

            <div className="quiz-progress__legend-item">
              <span className="quiz-progress__legend-dot quiz-progress__legend-dot--answered" />
              <span>Answered</span>
            </div>

            <div className="quiz-progress__legend-item">
              <span className="quiz-progress__legend-dot quiz-progress__legend-dot--review" />
              <span>Review</span>
            </div>

            <div className="quiz-progress__legend-item">
              <span className="quiz-progress__legend-dot quiz-progress__legend-dot--unanswered" />
              <span>Not Answered</span>
            </div>
          </div>

          {/* =============================================
              QUESTION GRID
          ============================================== */}

          <div className="quiz-progress__question-grid">
            {questionNumbers.map((index) => {
              const status = getQuestionStatus(index);

              return (
                <button
                  key={index}
                  type="button"
                  className={`quiz-progress__question-number quiz-progress__question-number--${status}`}
                  onClick={() => onQuestionSelect?.(index)}
                  aria-label={`Go to question ${index + 1}`}
                  aria-current={status === "current" ? "step" : undefined}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* =============================================
              MARK FOR REVIEW
          ============================================== */}

          <div className="quiz-progress__review-wrapper">
            <button
              type="button"
              className="quiz-progress__review-button"
              onClick={() => onMarkReview?.(currentQuestionIndex)}
            >
              <Flag size={17} strokeWidth={2} />

              <span>Mark for Review</span>
            </button>
          </div>
        </aside>

        {/* =================================================
            RIGHT TIMER PANEL
        ================================================== */}

        <aside className="quiz-progress__side-panel">
          {/* =============================================
              TIMER
          ============================================== */}

          <div
            className={`quiz-progress__timer-card ${
              isTimeRunningOut ? "quiz-progress__timer-card--warning" : ""
            }`}
          >
            <div className="quiz-progress__timer-ring">
              <div className="quiz-progress__timer-ring-inner">
                <Clock3 size={23} strokeWidth={2} />

                <strong>{formattedTime}</strong>

                <span>Time Remaining</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* =================================================
          FULL WIDTH QUESTION AREA
      ================================================== */}

      <div className="quiz-progress__question-area">
        {/* ===============================================
            QUESTION TOP BAR
        ================================================ */}

        <div className="quiz-progress__question-top">
          <div className="quiz-progress__question-count">
            Question <strong>{currentQuestion}</strong> of {totalQuestions}
          </div>

          <span className="quiz-progress__points">
            {questionPoints} point
            {questionPoints !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ===============================================
            QUESTION CARD
        ================================================ */}

        <div className="quiz-progress__question-card">
          <h2>{questionText}</h2>

          <p className="quiz-progress__question-instruction">
            Select the best answer from the options below.
          </p>

          {/* =============================================
              OPTIONS
          ============================================== */}

          <div className="quiz-progress__options">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === option;

              return (
                <button
                  key={`${option}-${index}`}
                  type="button"
                  className={`quiz-progress__option ${
                    isSelected ? "quiz-progress__option--selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <span
                    className={`quiz-progress__radio ${
                      isSelected ? "quiz-progress__radio--selected" : ""
                    }`}
                  >
                    {isSelected && <Check size={13} strokeWidth={3} />}
                  </span>

                  <span className="quiz-progress__option-letter">
                    {getOptionLetter(index)}.
                  </span>

                  <span className="quiz-progress__option-text">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===============================================
            QUESTION NAVIGATION
        ================================================ */}

        <div className="quiz-progress__navigation">
          <button
            type="button"
            className="quiz-progress__previous"
            onClick={onPrevious}
            disabled={currentQuestion <= 1}
          >
            <ChevronLeft size={19} />

            <span>Previous</span>
          </button>

          {isLastQuestion ? (
            <button
              type="button"
              className="quiz-progress__next quiz-progress__next--submit"
              onClick={onSubmit}
            >
              <span>Submit Quiz</span>

              <ChevronRight size={19} />
            </button>
          ) : (
            <button
              type="button"
              className="quiz-progress__next"
              onClick={onNext}
            >
              <span>Next Question</span>

              <ChevronRight size={19} />
            </button>
          )}
        </div>
      </div>

      {/* =================================================
          BOTTOM INFORMATION ROW
      ================================================== */}

      <div className="quiz-progress__bottom-row">
        {/* ===============================================
            YOUR PROGRESS
        ================================================ */}

        <div className="quiz-progress__progress-card">
          <div className="quiz-progress__progress-header">
            <div>
              <BarChart3 size={19} strokeWidth={2.2} />

              <h3>Your Progress</h3>
            </div>
          </div>

          <div className="quiz-progress__progress-values">
            <span>
              <strong>{answeredQuestions}</strong> of {totalQuestions} answered
            </span>

            <strong>{percentage}%</strong>
          </div>

          <div className="quiz-progress__progress-track">
            <span
              style={{
                width: `${Math.min(Math.max(percentage, 0), 100)}%`,
              }}
            />
          </div>
        </div>

        {/* ===============================================
            ANSWERED
        ================================================ */}

        <div className="quiz-progress__stat-card quiz-progress__stat-card--answered">
          <span className="quiz-progress__stat-icon">
            <Check size={17} strokeWidth={2.8} />
          </span>

          <strong>{answeredQuestions}</strong>

          <span>Answered</span>
        </div>

        {/* ===============================================
            REMAINING
        ================================================ */}

        <div className="quiz-progress__stat-card quiz-progress__stat-card--remaining">
          <span className="quiz-progress__stat-icon">
            <Clock3 size={17} strokeWidth={2.2} />
          </span>

          <strong>{unansweredQuestions}</strong>

          <span>Remaining</span>
        </div>

        {/* ===============================================
            QUICK TIP
        ================================================ */}

        <div className="quiz-progress__tip-card">
          <div className="quiz-progress__tip-header">
            <span>
              <Lightbulb size={19} strokeWidth={2} />
            </span>

            <h3>Quick Tip</h3>
          </div>

          <p>Read each question carefully before selecting your answer.</p>
        </div>
      </div>
    </section>
  );
};

export default QuizProgress;
