import React from "react";

import {
  BarChart3,
  BookOpen,
  Clock3,
  FileQuestion,
  Sparkles,
} from "lucide-react";

import "./QuizHeader.css";

/* =========================================================
   QUIZ HEADER
   Capacity Connect - Learner Quiz Attempt
========================================================= */

const QuizHeader = ({ quiz }) => {
  /* =======================================================
     SAFE QUIZ DATA
  ======================================================= */

  const quizData = quiz || {};

  const title =
    quizData.quizTitle || quizData.title || "React Fundamentals Quiz";

  const description =
    quizData.description ||
    "Test your understanding of React concepts and best practices.";

  const category =
    quizData.category || quizData.subject || quizData.courseCategory || "React";

  const level = quizData.level || quizData.difficulty || "Intermediate";

  const totalQuestions =
    quizData.totalQuestions ??
    quizData.questionCount ??
    quizData.questions?.length ??
    15;

  const duration = (() => {
    const value =
      quizData.duration ?? quizData.durationMinutes ?? quizData.timeLimit;

    if (typeof value === "number") {
      return `${value} min`;
    }

    if (value) {
      return String(value);
    }

    return "25 min";
  })();

  const passingScore = Number(quizData.passingScore) || 70;

  /* =======================================================
     CATEGORY ICON
  ======================================================= */

  const getCategoryIcon = () => {
    const value = `
      ${title}
      ${category}
      ${quizData.courseTitle || ""}
    `.toLowerCase();

    if (value.includes("react")) {
      return <span className="quiz-header__react-icon">⚛</span>;
    }

    if (value.includes("html") || value.includes("css")) {
      return <span className="quiz-header__html-icon">5</span>;
    }

    if (value.includes("node")) {
      return <span className="quiz-header__node-icon">N</span>;
    }

    if (value.includes("python")) {
      return <span className="quiz-header__python-icon">Py</span>;
    }

    return <BookOpen size={40} strokeWidth={1.7} />;
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="quiz-header">
      {/* =================================================
          DECORATIVE BACKGROUND
      ================================================== */}

      <div
        className="quiz-header__glow quiz-header__glow--one"
        aria-hidden="true"
      />

      <div
        className="quiz-header__glow quiz-header__glow--two"
        aria-hidden="true"
      />

      <div className="quiz-header__grid" aria-hidden="true" />

      {/* =================================================
          MAIN CONTENT
      ================================================== */}

      <div className="quiz-header__content">
        {/* ===============================================
            QUIZ ICON
        ================================================ */}

        <div className="quiz-header__icon">
          <div className="quiz-header__icon-inner">{getCategoryIcon()}</div>

          <span className="quiz-header__icon-glow" />
        </div>

        {/* ===============================================
            QUIZ INFORMATION
        ================================================ */}

        <div className="quiz-header__information">
          {/* Badge */}

          <div className="quiz-header__badge">
            <span className="quiz-header__badge-dot" />
            <span>{level}</span>
          </div>

          {/* Title */}

          <h1 className="quiz-header__title">{title}</h1>

          {/* Description */}

          <p className="quiz-header__description">{description}</p>
        </div>

        {/* ===============================================
            QUIZ STATS
        ================================================ */}

        <div className="quiz-header__stats">
          {/* Questions */}

          <div className="quiz-header__stat">
            <div className="quiz-header__stat-icon quiz-header__stat-icon--questions">
              <FileQuestion size={19} />
            </div>

            <div className="quiz-header__stat-content">
              <strong>{totalQuestions}</strong>

              <span>Questions</span>
            </div>
          </div>

          <span className="quiz-header__stat-divider" aria-hidden="true" />

          {/* Duration */}

          <div className="quiz-header__stat">
            <div className="quiz-header__stat-icon quiz-header__stat-icon--duration">
              <Clock3 size={19} />
            </div>

            <div className="quiz-header__stat-content">
              <strong>{duration}</strong>

              <span>Duration</span>
            </div>
          </div>

          <span className="quiz-header__stat-divider" aria-hidden="true" />

          {/* Passing Score */}

          <div className="quiz-header__stat">
            <div className="quiz-header__stat-icon quiz-header__stat-icon--passing">
              <BarChart3 size={19} />
            </div>

            <div className="quiz-header__stat-content">
              <strong>{passingScore}%</strong>

              <span>Passing Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          CATEGORY LABEL
      ================================================== */}

      <div className="quiz-header__category">
        <Sparkles size={14} />

        <span>{category}</span>
      </div>

      {/* =================================================
          DECORATIVE SHAPE
      ================================================== */}

      <div className="quiz-header__decor" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
};

export default QuizHeader;
