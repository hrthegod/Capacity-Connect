import React, { useMemo } from "react";

import {
  BarChart3,
  Check,
  CheckCircle2,
  CircleX,
  Clock3,
  FileText,
  Minus,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import "./QuizScore.css";

/* =========================================================
   QUIZ SCORE
   Capacity Connect - Learner
========================================================= */

const QuizScore = ({ quiz = null, result = null }) => {
  /* =======================================================
     SAFE DATA
  ======================================================= */

  const score = Number(result?.score ?? 0);

  const passingScore = Number(result?.passingScore ?? quiz?.passingScore ?? 70);

  const passed =
    typeof result?.passed === "boolean" ? result.passed : score >= passingScore;

  const totalQuestions = Number(
    result?.totalQuestions ??
      quiz?.totalQuestions ??
      quiz?.questionCount ??
      quiz?.questions?.length ??
      0,
  );

  const correctAnswers = Number(result?.correctAnswers ?? 0);

  const incorrectAnswers = Number(result?.incorrectAnswers ?? 0);

  const unanswered = Number(
    result?.unanswered ??
      Math.max(totalQuestions - correctAnswers - incorrectAnswers, 0),
  );

  const earnedPoints = Number(result?.earnedPoints ?? score);

  const totalPoints = Number(result?.totalPoints ?? 100);

  const timeTaken = Number(result?.timeTaken ?? 0);

  /* =======================================================
     DIFFERENCE
  ======================================================= */

  const scoreDifference = score - passingScore;

  /* =======================================================
     ACCURACY
  ======================================================= */

  const accuracy = useMemo(() => {
    if (totalQuestions <= 0) {
      return 0;
    }

    return Math.round((correctAnswers / totalQuestions) * 100);
  }, [correctAnswers, totalQuestions]);

  /* =======================================================
     SCORE MESSAGE
  ======================================================= */

  const scoreMessage = useMemo(() => {
    if (passed) {
      if (score >= 90) {
        return {
          title: "Outstanding!",
          description:
            "Excellent performance! You demonstrated a strong understanding of the concepts.",
        };
      }

      if (score >= 80) {
        return {
          title: "Great Job!",
          description:
            "You met the passing score and showed strong understanding of the concepts.",
        };
      }

      return {
        title: "Well Done!",
        description:
          "You successfully passed the quiz. Keep building your knowledge!",
      };
    }

    return {
      title: "Keep Going!",
      description:
        "Use this attempt to identify areas for improvement and strengthen your understanding.",
    };
  }, [passed, score]);

  /* =======================================================
     TIME FORMATTER
  ======================================================= */

  const formattedTime = useMemo(() => {
    if (timeTaken <= 0) {
      return "—";
    }

    const minutes = Math.floor(timeTaken / 60);

    const seconds = timeTaken % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }, [timeTaken]);

  /* =======================================================
     POINT PERCENTAGE
  ======================================================= */

  const pointsPercentage =
    totalPoints > 0
      ? Math.min(Math.max((earnedPoints / totalPoints) * 100, 0), 100)
      : score;

  /* =======================================================
     SCORE LABEL
  ======================================================= */

  const scoreLabel =
    score >= 90
      ? "Excellent"
      : score >= 80
        ? "Very Good"
        : score >= passingScore
          ? "Good"
          : "Needs Improvement";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="quiz-score">
      {/* ===================================================
          SECTION HEADER
      =================================================== */}

      <div className="quiz-score__header">
        <div className="quiz-score__heading-group">
          <div className="quiz-score__heading-icon">
            <BarChart3 size={30} strokeWidth={2.1} />
          </div>

          <div className="quiz-score__heading-content">
            <span className="quiz-score__eyebrow">SCORE BREAKDOWN</span>

            <h2>How You Performed</h2>

            <p>A detailed view of your performance in this quiz.</p>
          </div>
        </div>

        {/* =================================================
            INSIGHT CARD
        ================================================== */}

        <div className="quiz-score__insight">
          <div className="quiz-score__insight-icon">
            <span>💡</span>
          </div>

          <div>
            <strong>Every attempt helps you grow!</strong>

            <span>Keep learning and keep improving.</span>
          </div>
        </div>
      </div>

      {/* ===================================================
          MAIN SCORE GRID
      =================================================== */}

      <div className="quiz-score__main">
        {/* =================================================
            LEFT CONTENT
        ================================================== */}

        <div className="quiz-score__left">
          {/* ===============================================
              ANSWER SUMMARY
          ================================================ */}

          <div className="quiz-score__answer-grid">
            {/* CORRECT */}

            <article className="quiz-score__answer-card quiz-score__answer-card--correct">
              <div className="quiz-score__answer-icon">
                <Check size={27} strokeWidth={3} />
              </div>

              <strong className="quiz-score__answer-number">
                {correctAnswers}
              </strong>

              <h3>Correct Answers</h3>

              <p>You got these right!</p>
            </article>

            {/* INCORRECT */}

            <article className="quiz-score__answer-card quiz-score__answer-card--incorrect">
              <div className="quiz-score__answer-icon">
                <CircleX size={27} strokeWidth={2.5} />
              </div>

              <strong className="quiz-score__answer-number">
                {incorrectAnswers}
              </strong>

              <h3>Incorrect Answers</h3>

              <p>Review and learn from these.</p>
            </article>

            {/* UNANSWERED */}

            <article className="quiz-score__answer-card quiz-score__answer-card--unanswered">
              <div className="quiz-score__answer-icon">
                <Minus size={27} strokeWidth={2.8} />
              </div>

              <strong className="quiz-score__answer-number">
                {unanswered}
              </strong>

              <h3>Unanswered</h3>

              <p>
                {unanswered === 0
                  ? "All questions attempted!"
                  : "Questions left unanswered."}
              </p>
            </article>
          </div>

          {/* ===============================================
              POINTS EARNED
          ================================================ */}

          <div className="quiz-score__points">
            <div className="quiz-score__points-header">
              <div className="quiz-score__points-title">
                <div className="quiz-score__points-icon">
                  <Trophy size={23} strokeWidth={2.1} />
                </div>

                <div>
                  <h3>Points Earned</h3>

                  <p>Your total points based on correct answers.</p>
                </div>
              </div>

              <div className="quiz-score__points-total">
                <strong>
                  {earnedPoints.toFixed(2)}
                  <span> / {totalPoints.toFixed(2)}</span>
                </strong>

                <small>Total Points</small>
              </div>
            </div>

            <div className="quiz-score__points-progress">
              <div className="quiz-score__points-track">
                <div
                  className="quiz-score__points-fill"
                  style={{
                    width: `${pointsPercentage}%`,
                  }}
                />
              </div>

              <div className="quiz-score__points-percent">
                {pointsPercentage.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* ===============================================
              SCORE COMPARISON
          ================================================ */}

          <div className="quiz-score__comparison">
            {/* PASSING SCORE */}

            <article className="quiz-score__comparison-card quiz-score__comparison-card--passing">
              <div className="quiz-score__comparison-icon">
                <Target size={24} strokeWidth={2.2} />
              </div>

              <div className="quiz-score__comparison-content">
                <span>Passing Score</span>

                <strong>{passingScore.toFixed(2)}%</strong>

                <small>Required to pass</small>
              </div>
            </article>

            {/* YOUR SCORE */}

            <article className="quiz-score__comparison-card quiz-score__comparison-card--score">
              <div className="quiz-score__comparison-icon">
                <Trophy size={24} strokeWidth={2.1} />
              </div>

              <div className="quiz-score__comparison-content">
                <span>Your Score</span>

                <strong>{score.toFixed(2)}%</strong>

                <small>You achieved</small>
              </div>
            </article>

            {/* DIFFERENCE */}

            <article
              className={`quiz-score__comparison-card ${
                scoreDifference >= 0
                  ? "quiz-score__comparison-card--difference-positive"
                  : "quiz-score__comparison-card--difference-negative"
              }`}
            >
              <div className="quiz-score__comparison-icon">
                <TrendingUp size={24} strokeWidth={2.2} />
              </div>

              <div className="quiz-score__comparison-content">
                <span>Difference</span>

                <strong>
                  {scoreDifference >= 0 ? "+" : ""}
                  {scoreDifference.toFixed(2)}%
                </strong>

                <small>
                  {scoreDifference >= 0
                    ? "Above passing score"
                    : "Below passing score"}
                </small>
              </div>
            </article>
          </div>
        </div>

        {/* =================================================
            RIGHT DARK NAVY PANEL
        ================================================== */}

        <aside
          className={`quiz-score__dark-panel ${
            passed
              ? "quiz-score__dark-panel--passed"
              : "quiz-score__dark-panel--failed"
          }`}
        >
          {/* Decorative elements */}

          <div className="quiz-score__dark-glow quiz-score__dark-glow--one" />

          <div className="quiz-score__dark-glow quiz-score__dark-glow--two" />

          <div className="quiz-score__dark-grid" />

          <div className="quiz-score__dark-orbit quiz-score__dark-orbit--one" />

          <div className="quiz-score__dark-orbit quiz-score__dark-orbit--two" />

          {/* STATUS */}

          <div
            className={`quiz-score__dark-status ${
              passed
                ? "quiz-score__dark-status--passed"
                : "quiz-score__dark-status--failed"
            }`}
          >
            {passed ? (
              <CheckCircle2 size={20} strokeWidth={2.5} />
            ) : (
              <CircleX size={20} strokeWidth={2.3} />
            )}

            <span>{passed ? "PASSED" : "NOT PASSED"}</span>
          </div>

          {/* SCORE RING */}

          <div className="quiz-score__dark-score">
            <div className="quiz-score__dark-score-ring">
              <svg
                viewBox="0 0 200 200"
                className="quiz-score__dark-score-svg"
                aria-hidden="true"
              >
                <circle
                  className="quiz-score__dark-score-track"
                  cx="100"
                  cy="100"
                  r="78"
                />

                <circle
                  className="quiz-score__dark-score-progress"
                  cx="100"
                  cy="100"
                  r="78"
                  style={{
                    strokeDasharray: 2 * Math.PI * 78,

                    strokeDashoffset:
                      2 *
                      Math.PI *
                      78 *
                      (1 - Math.min(Math.max(score, 0), 100) / 100),
                  }}
                />
              </svg>

              <div className="quiz-score__dark-score-value">
                <strong>{score.toFixed(2)}%</strong>

                <span>Your Score</span>
              </div>
            </div>
          </div>

          {/* RESULT MESSAGE */}

          <div className="quiz-score__dark-message">
            <div className="quiz-score__dark-message-icon">
              <Trophy size={29} strokeWidth={1.8} />
            </div>

            <div>
              <h3>{scoreMessage.title}</h3>

              <p>{scoreMessage.description}</p>
            </div>
          </div>

          {/* QUOTE */}

          <div className="quiz-score__quote">
            <div className="quiz-score__quote-mark">“</div>

            <div>
              <strong>Consistency today, success tomorrow.</strong>

              <span>Keep building your knowledge!</span>
            </div>

            <div className="quiz-score__quote-leaf">✦</div>
          </div>

          {/* BOTTOM STATS */}

          <div className="quiz-score__dark-stats">
            <div className="quiz-score__dark-stat">
              <div className="quiz-score__dark-stat-icon">
                <Clock3 size={23} strokeWidth={2} />
              </div>

              <div>
                <span>Time Taken</span>

                <strong>{formattedTime}</strong>
              </div>
            </div>

            <div className="quiz-score__dark-divider" />

            <div className="quiz-score__dark-stat">
              <div className="quiz-score__dark-stat-icon">
                <FileText size={23} strokeWidth={2} />
              </div>

              <div>
                <span>Total Questions</span>

                <strong>{totalQuestions}</strong>
              </div>
            </div>
          </div>

          {/* SCORE LABEL */}

          <div className="quiz-score__dark-label">{scoreLabel}</div>
        </aside>
      </div>
    </section>
  );
};

export default QuizScore;
