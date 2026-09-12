import React, { useState } from "react";

import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Flag,
  Info,
  LockKeyhole,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";

import "./QuizSubmit.css";

const QuizSubmit = ({
  answeredQuestions = 0,
  unansweredQuestions = 0,
  markedQuestions = 0,
  totalQuestions = 0,
  timeRemaining = 0,
  formattedTime = "00:00",
  onReviewUnanswered,
  onContinueReviewing,
  onSubmit,
  isSubmitting = false,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const hasUnansweredQuestions = unansweredQuestions > 0;

  const progressPercentage =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  const handleReviewUnanswered = () => {
    if (typeof onReviewUnanswered === "function") {
      onReviewUnanswered();
    }
  };

  const handleContinueReviewing = () => {
    if (typeof onContinueReviewing === "function") {
      onContinueReviewing();
    }
  };

  const handleOpenConfirmation = () => {
    if (isSubmitting) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    if (isSubmitting) {
      return;
    }

    setShowConfirmation(false);
  };

  const handleConfirmSubmit = () => {
    if (isSubmitting) {
      return;
    }

    if (typeof onSubmit === "function") {
      onSubmit();
    }
  };

  return (
    <>
      <section className="quiz-submit">
        <div className="quiz-submit__glass">
          {/* =================================================
              HEADER
          ================================================= */}

          <header className="quiz-submit__header">
            <div className="quiz-submit__header-main">
              <div className="quiz-submit__header-icon">
                <Send size={27} strokeWidth={2} />
              </div>

              <div className="quiz-submit__header-copy">
                <span className="quiz-submit__eyebrow">QUIZ COMPLETION</span>

                <h2>Ready to Submit?</h2>

                <p>
                  You've almost finished! Review your progress and submit your
                  quiz when you're ready.
                </p>
              </div>
            </div>

            {/* TIME */}
            <div className="quiz-submit__time">
              <div className="quiz-submit__time-icon">
                <Clock3 size={24} strokeWidth={2} />
              </div>

              <div className="quiz-submit__time-copy">
                <span>Time Remaining</span>

                <strong
                  className={
                    timeRemaining <= 60 && timeRemaining > 0 ? "is-warning" : ""
                  }
                >
                  {formattedTime}
                </strong>
              </div>
            </div>
          </header>

          {/* =================================================
              STATISTICS
          ================================================= */}

          <div className="quiz-submit__stats">
            {/* ANSWERED */}
            <article className="quiz-submit__stat quiz-submit__stat--answered">
              <div className="quiz-submit__stat-icon">
                <CheckCircle2 size={25} strokeWidth={2} />
              </div>

              <div className="quiz-submit__stat-content">
                <strong>{answeredQuestions}</strong>

                <span>Answered</span>

                <small>Questions completed</small>
              </div>
            </article>

            {/* REMAINING */}
            <article className="quiz-submit__stat quiz-submit__stat--remaining">
              <div className="quiz-submit__stat-icon">
                <Clock3 size={25} strokeWidth={2} />
              </div>

              <div className="quiz-submit__stat-content">
                <strong>{unansweredQuestions}</strong>

                <span>Remaining</span>

                <small>Questions left to answer</small>
              </div>
            </article>

            {/* REVIEW */}
            <article className="quiz-submit__stat quiz-submit__stat--review">
              <div className="quiz-submit__stat-icon">
                <Flag size={25} strokeWidth={2} />
              </div>

              <div className="quiz-submit__stat-content">
                <strong>{markedQuestions}</strong>

                <span>Marked for Review</span>

                <small>Questions to review</small>
              </div>
            </article>

            {/* TOTAL */}
            <article className="quiz-submit__stat quiz-submit__stat--total">
              <div className="quiz-submit__stat-icon">
                <Target size={25} strokeWidth={2} />
              </div>

              <div className="quiz-submit__stat-content">
                <strong>{totalQuestions}</strong>

                <span>Total Questions</span>

                <small>In this quiz</small>
              </div>
            </article>
          </div>

          {/* =================================================
              WARNING / REVIEW UNANSWERED
          ================================================= */}

          {hasUnansweredQuestions ? (
            <div className="quiz-submit__warning">
              <div className="quiz-submit__warning-icon">
                <AlertTriangle size={25} strokeWidth={2} />
              </div>

              <div className="quiz-submit__warning-content">
                <h3>
                  You still have {unansweredQuestions} unanswered{" "}
                  {unansweredQuestions === 1 ? "question" : "questions"}
                </h3>

                <p>
                  It's a good idea to review all questions before submitting.
                  Unanswered questions will be marked as incorrect.
                </p>
              </div>

              <button
                type="button"
                className="quiz-submit__review-button"
                onClick={handleReviewUnanswered}
              >
                <span>Review Unanswered</span>

                <ArrowRight size={19} strokeWidth={2.2} />
              </button>
            </div>
          ) : (
            <div className="quiz-submit__success">
              <div className="quiz-submit__success-icon">
                <Check size={23} strokeWidth={2.6} />
              </div>

              <div>
                <h3>All questions answered</h3>

                <p>
                  Great work! You can review your answers once more or submit
                  your quiz.
                </p>
              </div>
            </div>
          )}

          {/* =================================================
              LOWER CONTENT
          ================================================= */}

          <div className="quiz-submit__lower">
            {/* =================================================
                QUICK REMINDER
            ================================================= */}

            <article className="quiz-submit__reminder">
              <div className="quiz-submit__reminder-heading">
                <div className="quiz-submit__reminder-icon">
                  <Info size={23} strokeWidth={2} />
                </div>

                <h3>Quick Reminder</h3>
              </div>

              <div className="quiz-submit__reminders">
                <div className="quiz-submit__reminder-item">
                  <span>
                    <Check size={15} strokeWidth={3} />
                  </span>

                  <p>Make sure you've answered all the questions.</p>
                </div>

                <div className="quiz-submit__reminder-item">
                  <span>
                    <Check size={15} strokeWidth={3} />
                  </span>

                  <p>Review your marked questions.</p>
                </div>

                <div className="quiz-submit__reminder-item">
                  <span>
                    <Check size={15} strokeWidth={3} />
                  </span>

                  <p>Once submitted, you cannot change your answers.</p>
                </div>

                <div className="quiz-submit__reminder-item">
                  <span>
                    <Check size={15} strokeWidth={3} />
                  </span>

                  <p>Your result will be available immediately.</p>
                </div>
              </div>

              {/* SMALL PROGRESS INDICATOR */}
              <div className="quiz-submit__reminder-progress">
                <div className="quiz-submit__reminder-progress-top">
                  <span>Your completion</span>

                  <strong>{progressPercentage}%</strong>
                </div>

                <div className="quiz-submit__progress-track">
                  <span
                    style={{
                      width: `${progressPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </article>

            {/* =================================================
                NAVY SUBMIT CARD
            ================================================= */}

            <article className="quiz-submit__action">
              <div className="quiz-submit__action-glow" />

              <div className="quiz-submit__action-top">
                <div className="quiz-submit__action-icon">
                  <ShieldCheck size={27} strokeWidth={1.9} />
                </div>

                <div className="quiz-submit__action-copy">
                  <span>FINAL STEP</span>

                  <h3>Submit Your Quiz</h3>

                  <p>
                    When you're ready, click the button below to submit your
                    quiz attempt.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="quiz-submit__main-button"
                onClick={handleOpenConfirmation}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="quiz-submit__spinner" />

                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={21} strokeWidth={2.1} />

                    <span>Submit Quiz</span>

                    <ArrowRight size={21} strokeWidth={2.1} />
                  </>
                )}
              </button>

              <div className="quiz-submit__secure">
                <LockKeyhole size={15} strokeWidth={2} />

                <span>Your attempt is securely saved</span>
              </div>
            </article>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="quiz-submit__footer">
            <div className="quiz-submit__footer-item">
              <LockKeyhole size={17} strokeWidth={2} />

              <span>Your progress is automatically saved.</span>
            </div>

            <div className="quiz-submit__footer-item quiz-submit__footer-item--right">
              <Sparkles size={17} strokeWidth={2} />

              <span>Take a deep breath — you're doing great!</span>
            </div>
          </footer>
        </div>
      </section>

      {/* =====================================================
          SUBMIT CONFIRMATION
      ===================================================== */}

      {showConfirmation && (
        <div
          className="quiz-submit__overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-submit-confirmation-title"
        >
          <div className="quiz-submit__modal">
            <button
              type="button"
              className="quiz-submit__modal-close"
              onClick={handleCloseConfirmation}
              disabled={isSubmitting}
              aria-label="Close confirmation"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="quiz-submit__modal-icon">
              <Trophy size={29} strokeWidth={1.8} />
            </div>

            <span className="quiz-submit__modal-eyebrow">
              FINAL CONFIRMATION
            </span>

            <h2 id="quiz-submit-confirmation-title">Submit this quiz?</h2>

            <p>
              Once you submit your attempt, your answers can no longer be
              changed.
            </p>

            {hasUnansweredQuestions && (
              <div className="quiz-submit__modal-warning">
                <AlertTriangle size={18} strokeWidth={2} />

                <span>
                  {unansweredQuestions}{" "}
                  {unansweredQuestions === 1
                    ? "question remains"
                    : "questions remain"}{" "}
                  unanswered.
                </span>
              </div>
            )}

            <div className="quiz-submit__modal-summary">
              <div>
                <span>Answered</span>
                <strong>{answeredQuestions}</strong>
              </div>

              <div>
                <span>Remaining</span>
                <strong>{unansweredQuestions}</strong>
              </div>

              <div>
                <span>Marked</span>
                <strong>{markedQuestions}</strong>
              </div>
            </div>

            <div className="quiz-submit__modal-actions">
              <button
                type="button"
                className="quiz-submit__modal-cancel"
                onClick={handleCloseConfirmation}
                disabled={isSubmitting}
              >
                Continue Reviewing
              </button>

              <button
                type="button"
                className="quiz-submit__modal-confirm"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="quiz-submit__spinner quiz-submit__spinner--dark" />

                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} strokeWidth={2} />

                    <span>Submit Quiz</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizSubmit;
