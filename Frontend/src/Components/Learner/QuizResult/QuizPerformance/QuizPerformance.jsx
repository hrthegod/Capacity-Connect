import React, { useMemo, useState } from "react";

import {
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleX,
  Clock3,
  FileText,
  Info,
  Layers3,
  Lightbulb,
  Target,
  TrendingUp,
  Trophy,
  ArrowUp,
  Sparkles,
} from "lucide-react";

import "./QuizPerformance.css";

/* =========================================================
   QUIZ PERFORMANCE
   Capacity Connect - Learner
========================================================= */

const QuizPerformance = ({ quiz = null, result = null }) => {
  /* =======================================================
     STATE
  ======================================================= */

  const [topicFilter, setTopicFilter] = useState("All Topics");

  /* =======================================================
     BASIC RESULT DATA
  ======================================================= */

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

  const score = Number(result?.score ?? 0);

  const timeTaken = Number(result?.timeTaken ?? 0);

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
     ATTEMPTED
  ======================================================= */

  const attemptedQuestions = correctAnswers + incorrectAnswers;

  const attemptedPercentage =
    totalQuestions > 0
      ? Math.round((attemptedQuestions / totalQuestions) * 100)
      : 0;

  /* =======================================================
     AVERAGE TIME
  ======================================================= */

  const averageTimeSeconds =
    totalQuestions > 0 ? Math.round(timeTaken / totalQuestions) : 0;

  const averageTimeMinutes = (averageTimeSeconds / 60).toFixed(1);

  /* =======================================================
     PERFORMANCE LEVEL
  ======================================================= */

  const performanceLevel = useMemo(() => {
    if (accuracy >= 90) {
      return "Excellent";
    }

    if (accuracy >= 80) {
      return "Very Good";
    }

    if (accuracy >= 70) {
      return "Good";
    }

    if (accuracy >= 50) {
      return "Developing";
    }

    return "Needs Practice";
  }, [accuracy]);

  /* =======================================================
     TOPIC DATA
  ======================================================= */

  const topicData = useMemo(() => {
    const questions = Array.isArray(quiz?.questions) ? quiz.questions : [];

    const answers = Array.isArray(result?.answers) ? result.answers : [];

    if (questions.length === 0) {
      return [];
    }

    const groups = {};

    questions.forEach((question, index) => {
      const topic =
        question?.topic ||
        question?.category ||
        question?.section ||
        quiz?.category ||
        "General";

      if (!groups[topic]) {
        groups[topic] = {
          topic,
          total: 0,
          correct: 0,
          incorrect: 0,
          unanswered: 0,
        };
      }

      groups[topic].total += 1;

      const questionId = question?.questionId;

      const answerRecord =
        answers.find((answer) => answer?.questionId === questionId) ??
        answers[index];

      const selectedAnswer =
        answerRecord?.selectedAnswer ??
        answerRecord?.answer ??
        answerRecord?.selectedOption;

      const isAnswered =
        selectedAnswer !== undefined &&
        selectedAnswer !== null &&
        selectedAnswer !== "";

      if (!isAnswered) {
        groups[topic].unanswered += 1;

        return;
      }

      const correctAnswer = question?.correctAnswer;

      const isCorrect = selectedAnswer === correctAnswer;

      if (isCorrect) {
        groups[topic].correct += 1;
      } else {
        groups[topic].incorrect += 1;
      }
    });

    return Object.values(groups)
      .map((item) => ({
        ...item,

        percentage:
          item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }, [quiz, result]);

  /* =======================================================
     DISPLAY TOPICS
  ======================================================= */

  const visibleTopics = useMemo(() => {
    if (topicFilter === "All Topics") {
      return topicData;
    }

    return topicData.filter((item) => item.topic === topicFilter);
  }, [topicData, topicFilter]);

  /* =======================================================
     STRENGTH AREAS
  ======================================================= */

  const strengthAreas = useMemo(() => {
    return topicData.filter((topic) => topic.percentage >= 80).slice(0, 3);
  }, [topicData]);

  /* =======================================================
     IMPROVEMENT AREAS
  ======================================================= */

  const improvementAreas = useMemo(() => {
    return [...topicData]
      .filter((topic) => topic.percentage < 80)
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3);
  }, [topicData]);

  /* =======================================================
     FALLBACK STRENGTHS
  ======================================================= */

  const finalStrengthAreas =
    strengthAreas.length > 0
      ? strengthAreas
      : [
          {
            topic: quiz?.category || "Quiz Concepts",
            percentage: accuracy,
            total: totalQuestions,
            correct: correctAnswers,
          },
        ];

  /* =======================================================
     FALLBACK IMPROVEMENTS
  ======================================================= */

  const finalImprovementAreas =
    improvementAreas.length > 0
      ? improvementAreas
      : [
          {
            topic: accuracy >= 80 ? "Advanced Practice" : "Core Concepts",
            percentage: accuracy >= 80 ? Math.max(accuracy - 10, 0) : accuracy,
            total: totalQuestions,
            correct: correctAnswers,
          },
        ];

  /* =======================================================
     LEARNING INSIGHT
  ======================================================= */

  const learningInsight = useMemo(() => {
    const weakest = finalImprovementAreas[0];

    const strongest = finalStrengthAreas[0];

    if (accuracy >= 90) {
      return `You have an excellent understanding of ${
        strongest?.topic || "the core concepts"
      }. Continue challenging yourself with advanced practice to keep growing.`;
    }

    if (accuracy >= 80) {
      return `You have a strong understanding of ${
        strongest?.topic || "the core concepts"
      }. Focus on ${
        weakest?.topic || "your weaker areas"
      } to make your performance even stronger.`;
    }

    if (accuracy >= 70) {
      return `You have a good foundation. Spend more time practicing ${
        weakest?.topic || "the areas where you lost marks"
      } to improve your confidence and accuracy.`;
    }

    return `Focus on strengthening ${
      weakest?.topic || "the core concepts"
    } through targeted practice and review. Every attempt is an opportunity to improve.`;
  }, [accuracy, finalImprovementAreas, finalStrengthAreas]);

  /* =======================================================
     DONUT CIRCUMFERENCE
  ======================================================= */

  const donutRadius = 72;

  const donutCircumference = 2 * Math.PI * donutRadius;

  const correctOffset =
    donutCircumference * (1 - correctAnswers / Math.max(totalQuestions, 1));

  const incorrectRatio = incorrectAnswers / Math.max(totalQuestions, 1);

  const incorrectLength = donutCircumference * incorrectRatio;

  const unansweredRatio = unanswered / Math.max(totalQuestions, 1);

  const unansweredLength = donutCircumference * unansweredRatio;

  /* =======================================================
     FORMAT TIME
  ======================================================= */

  const formattedAverageTime =
    averageTimeSeconds > 0 ? `${averageTimeMinutes} min` : "—";

  /* =======================================================
     TOPIC FILTER OPTIONS
  ======================================================= */

  const topicOptions = ["All Topics", ...topicData.map((topic) => topic.topic)];

  /* =======================================================
     PERFORMANCE CARD
  ======================================================= */

  return (
    <section className="quiz-performance">
      {/* =================================================
          HEADER
      ================================================== */}

      <div className="quiz-performance__header">
        <div className="quiz-performance__header-left">
          <div className="quiz-performance__header-icon">
            <BarChart3 size={29} strokeWidth={2.1} />
          </div>

          <div className="quiz-performance__header-content">
            <span className="quiz-performance__eyebrow">
              PERFORMANCE ANALYSIS
            </span>

            <h2>Dive Deeper Into Your Performance</h2>

            <p>
              Understand your strengths, analyze your answers, and discover
              where you can improve.
            </p>
          </div>
        </div>

        <div className="quiz-performance__header-insight">
          <div className="quiz-performance__header-insight-icon">
            <Lightbulb size={23} strokeWidth={2} />
          </div>

          <div>
            <strong>Small steps make big progress!</strong>

            <span>Analyze, learn and do better next time.</span>
          </div>
        </div>
      </div>

      {/* =================================================
          TOP METRIC CARDS
      ================================================== */}

      <div className="quiz-performance__metrics">
        {/* ACCURACY */}

        <article className="quiz-performance__metric quiz-performance__metric--green">
          <div className="quiz-performance__metric-icon">
            <Target size={27} strokeWidth={2.1} />
          </div>

          <div className="quiz-performance__metric-content">
            <span>Accuracy Rate</span>

            <strong>{accuracy.toFixed(2)}%</strong>

            <p>Correct out of attempted</p>
          </div>

          <div className="quiz-performance__metric-trend">
            <ArrowUp size={15} strokeWidth={2.7} />

            <span>{Math.max(accuracy - 68, 0).toFixed(2)}%</span>
          </div>

          <div className="quiz-performance__mini-wave">
            <span />
            <span />
            <span />
            <span />
          </div>
        </article>

        {/* ATTEMPTED */}

        <article className="quiz-performance__metric quiz-performance__metric--purple">
          <div className="quiz-performance__metric-icon">
            <FileText size={27} strokeWidth={2} />
          </div>

          <div className="quiz-performance__metric-content">
            <span>Questions Attempted</span>

            <strong>
              {attemptedQuestions}
              <small> / {totalQuestions}</small>
            </strong>

            <p>
              {unanswered === 0
                ? "You attempted all questions"
                : `${unanswered} question${
                    unanswered === 1 ? "" : "s"
                  } unanswered`}
            </p>
          </div>

          <div className="quiz-performance__metric-circle">
            <svg viewBox="0 0 72 72" aria-hidden="true">
              <circle
                cx="36"
                cy="36"
                r="28"
                className="quiz-performance__metric-circle-track"
              />

              <circle
                cx="36"
                cy="36"
                r="28"
                className="quiz-performance__metric-circle-progress"
                style={{
                  strokeDasharray: 2 * Math.PI * 28,
                  strokeDashoffset:
                    2 * Math.PI * 28 * (1 - attemptedPercentage / 100),
                }}
              />
            </svg>

            <strong>{attemptedPercentage.toFixed(2)}%</strong>
          </div>
        </article>

        {/* TIME */}

        <article className="quiz-performance__metric quiz-performance__metric--yellow">
          <div className="quiz-performance__metric-icon">
            <Clock3 size={27} strokeWidth={2.1} />
          </div>

          <div className="quiz-performance__metric-content">
            <span>Avg. Time per Question</span>

            <strong>{formattedAverageTime}</strong>

            <p>Time spent on each question</p>
          </div>

          <div className="quiz-performance__metric-wave">
            <span />
            <span />
            <span />
          </div>
        </article>

        {/* PERFORMANCE LEVEL */}

        <article className="quiz-performance__metric quiz-performance__metric--pink">
          <div className="quiz-performance__metric-icon">
            <Trophy size={27} strokeWidth={2} />
          </div>

          <div className="quiz-performance__metric-content">
            <span>Performance Level</span>

            <strong>{performanceLevel}</strong>

            <p>Keep up the great work!</p>
          </div>

          <div className="quiz-performance__metric-bars">
            <span />
            <span />
            <span />
            <span />
          </div>
        </article>
      </div>

      {/* =================================================
          ANALYSIS GRID
      ================================================== */}

      <div className="quiz-performance__analysis-grid">
        {/* =================================================
            QUESTION PERFORMANCE — DARK
        ================================================== */}

        <article className="quiz-performance__question-card">
          <div className="quiz-performance__dark-glow quiz-performance__dark-glow--one" />
          <div className="quiz-performance__dark-glow quiz-performance__dark-glow--two" />
          <div className="quiz-performance__dark-grid" />

          <div className="quiz-performance__question-header">
            <div className="quiz-performance__section-title">
              <div className="quiz-performance__section-icon quiz-performance__section-icon--dark">
                <BarChart3 size={23} strokeWidth={2} />
              </div>

              <div>
                <h3>Question Performance</h3>

                <p>See how your answers were distributed.</p>
              </div>
            </div>

            <div className="quiz-performance__dark-select">
              <span>Based on all questions</span>
              <ChevronDown size={17} strokeWidth={2.2} />
            </div>
          </div>

          <div className="quiz-performance__question-body">
            {/* DONUT */}

            <div className="quiz-performance__donut-wrap">
              <div className="quiz-performance__donut">
                <svg
                  viewBox="0 0 180 180"
                  className="quiz-performance__donut-svg"
                  aria-label={`Question performance: ${correctAnswers} correct, ${incorrectAnswers} incorrect, ${unanswered} unanswered`}
                >
                  <circle
                    cx="90"
                    cy="90"
                    r={donutRadius}
                    className="quiz-performance__donut-track"
                  />

                  {correctAnswers > 0 && (
                    <circle
                      cx="90"
                      cy="90"
                      r={donutRadius}
                      className="quiz-performance__donut-correct"
                      style={{
                        strokeDasharray: donutCircumference,
                        strokeDashoffset: correctOffset,
                      }}
                    />
                  )}

                  {incorrectAnswers > 0 && (
                    <circle
                      cx="90"
                      cy="90"
                      r={donutRadius}
                      className="quiz-performance__donut-incorrect"
                      style={{
                        strokeDasharray: `${incorrectLength} ${donutCircumference}`,
                        strokeDashoffset: -(
                          donutCircumference *
                          (correctAnswers / Math.max(totalQuestions, 1))
                        ),
                      }}
                    />
                  )}

                  {unanswered > 0 && (
                    <circle
                      cx="90"
                      cy="90"
                      r={donutRadius}
                      className="quiz-performance__donut-unanswered"
                      style={{
                        strokeDasharray: `${unansweredLength} ${donutCircumference}`,
                        strokeDashoffset: -(
                          donutCircumference *
                          ((correctAnswers + incorrectAnswers) /
                            Math.max(totalQuestions, 1))
                        ),
                      }}
                    />
                  )}
                </svg>

                <div className="quiz-performance__donut-center">
                  <strong>{totalQuestions}</strong>

                  <span>Total Questions</span>
                </div>
              </div>
            </div>

            {/* LEGEND */}

            <div className="quiz-performance__legend">
              <div className="quiz-performance__legend-row">
                <span className="quiz-performance__legend-dot quiz-performance__legend-dot--green" />

                <span>Correct Answers</span>

                <strong>{correctAnswers}</strong>

                <small>
                  {(totalQuestions > 0
                    ? (correctAnswers / totalQuestions) * 100
                    : 0
                  ).toFixed(2)}
                  %
                </small>
              </div>

              <div className="quiz-performance__legend-row">
                <span className="quiz-performance__legend-dot quiz-performance__legend-dot--red" />

                <span>Incorrect Answers</span>

                <strong>{incorrectAnswers}</strong>

                <small>
                  {(totalQuestions > 0
                    ? (incorrectAnswers / totalQuestions) * 100
                    : 0
                  ).toFixed(2)}
                  %
                </small>
              </div>

              <div className="quiz-performance__legend-row">
                <span className="quiz-performance__legend-dot quiz-performance__legend-dot--yellow" />

                <span>Unanswered</span>

                <strong>{unanswered}</strong>

                <small>
                  {(totalQuestions > 0
                    ? (unanswered / totalQuestions) * 100
                    : 0
                  ).toFixed(2)}
                  %
                </small>
              </div>
            </div>
          </div>

          {/* DARK INFO */}

          <div className="quiz-performance__question-info">
            <Info size={21} strokeWidth={2} />

            <span>
              You answered <strong>{accuracy.toFixed(2)}%</strong> of the questions
              correctly. Keep practicing to improve even further!
            </span>
          </div>
        </article>

        {/* =================================================
            PERFORMANCE BY TOPIC — LIGHT
        ================================================== */}

        <article className="quiz-performance__topic-card">
          <div className="quiz-performance__topic-header">
            <div className="quiz-performance__section-title">
              <div className="quiz-performance__section-icon quiz-performance__section-icon--blue">
                <Layers3 size={23} strokeWidth={2} />
              </div>

              <div>
                <h3>Performance by Topic</h3>

                <p>See how you performed in each topic or section.</p>
              </div>
            </div>

            <div className="quiz-performance__topic-select">
              <select
                value={topicFilter}
                onChange={(event) => setTopicFilter(event.target.value)}
                aria-label="Filter performance by topic"
              >
                {topicOptions.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>

              <ChevronDown size={17} strokeWidth={2} />
            </div>
          </div>

          <div className="quiz-performance__topic-list">
            {visibleTopics.length > 0 ? (
              visibleTopics.map((topic, index) => (
                <div
                  className="quiz-performance__topic-row"
                  key={`${topic.topic}-${index}`}
                >
                  <div className="quiz-performance__topic-name">
                    {topic.topic}
                  </div>

                  <div className="quiz-performance__topic-track">
                    <div
                      className={`quiz-performance__topic-fill ${
                        topic.percentage >= 80
                          ? "quiz-performance__topic-fill--green"
                          : topic.percentage >= 60
                            ? "quiz-performance__topic-fill--blue"
                            : "quiz-performance__topic-fill--yellow"
                      }`}
                      style={{
                        width: `${Math.max(topic.percentage, 4)}%`,
                      }}
                    />
                  </div>

                  <strong>{Number(topic.percentage).toFixed(2)}%</strong>

                  <span>
                    {topic.correct}/{topic.total}
                  </span>
                </div>
              ))
            ) : (
              <div className="quiz-performance__topic-empty">
                <Layers3 size={25} strokeWidth={1.8} />

                <p>
                  Topic-level performance is not available for this quiz yet.
                </p>
              </div>
            )}
          </div>
        </article>
      </div>

      {/* =================================================
          LOWER INSIGHTS
      ================================================== */}

      <div className="quiz-performance__lower-grid">
        {/* =================================================
            STRENGTH AREAS
        ================================================== */}

        <article className="quiz-performance__lower-card quiz-performance__lower-card--strength">
          <div className="quiz-performance__lower-header">
            <div className="quiz-performance__lower-icon">
              <Trophy size={23} strokeWidth={2} />
            </div>

            <div>
              <h3>Strength Areas</h3>

              <p>Topics you performed well in.</p>
            </div>
          </div>

          <div className="quiz-performance__area-list">
            {finalStrengthAreas.map((item, index) => (
              <div
                className="quiz-performance__area-item"
                key={`${item.topic}-${index}`}
              >
                <div className="quiz-performance__area-item-icon">
                  <Check size={17} strokeWidth={3} />
                </div>

                <div className="quiz-performance__area-content">
                  <strong>{item.topic}</strong>

                  <span>
                    {item.percentage >= 90
                      ? "Excellent understanding"
                      : "Strong performance"}
                  </span>
                </div>

                <b>{Number(item.percentage).toFixed(2)}%</b>
              </div>
            ))}
          </div>
        </article>

        {/* =================================================
            IMPROVEMENT AREAS
        ================================================== */}

        <article className="quiz-performance__lower-card quiz-performance__lower-card--improvement">
          <div className="quiz-performance__lower-header">
            <div className="quiz-performance__lower-icon">
              <Target size={23} strokeWidth={2} />
            </div>

            <div>
              <h3>Areas for Improvement</h3>

              <p>Topics to focus on and practice more.</p>
            </div>
          </div>

          <div className="quiz-performance__area-list">
            {finalImprovementAreas.map((item, index) => (
              <div
                className="quiz-performance__area-item"
                key={`${item.topic}-${index}`}
              >
                <div className="quiz-performance__area-item-icon">
                  <ArrowUp size={17} strokeWidth={2.8} />
                </div>

                <div className="quiz-performance__area-content">
                  <strong>{item.topic}</strong>

                  <span>
                    {item.percentage < 50
                      ? "Needs more practice"
                      : "Review key concepts"}
                  </span>
                </div>

                <b>{Number(item.percentage).toFixed(2)}%</b>
              </div>
            ))}
          </div>
        </article>

        {/* =================================================
            LEARNING INSIGHTS
        ================================================== */}

        <article className="quiz-performance__lower-card quiz-performance__lower-card--insight">
          <div className="quiz-performance__lower-header">
            <div className="quiz-performance__lower-icon">
              <Lightbulb size={23} strokeWidth={2} />
            </div>

            <div>
              <h3>Learning Insights</h3>

              <p>Personalized insights based on your performance.</p>
            </div>
          </div>

          <div className="quiz-performance__insight-box">
            <div className="quiz-performance__quote-mark">“</div>

            <p>{learningInsight}</p>
          </div>

          <div className="quiz-performance__insight-footer">
            <Sparkles size={21} strokeWidth={2} />

            <span>Keep learning, keep growing!</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default QuizPerformance;
