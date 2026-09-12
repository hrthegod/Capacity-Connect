import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Grid2X2,
  List,
  Play,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Trophy,
  X,
} from "lucide-react";

import { getQuizzes } from "../../../../../data/mock/quiz";

import "./QuizList.css";

/* =========================================================
   QUIZ LIST
   Capacity Connect - Learner
========================================================= */

const QuizList = ({ quizzes: providedQuizzes, onSolveQuiz, onGetResult }) => {
  const navigate = useNavigate();

  /* =======================================================
     DATA
  ======================================================= */

  const quizzes = providedQuizzes || getQuizzes();

  /* =======================================================
     STATE
  ======================================================= */

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [level, setLevel] = useState("All Levels");
  const [duration, setDuration] = useState("Any Duration");
  const [sortBy, setSortBy] = useState("Newest");

  const [openDropdown, setOpenDropdown] = useState(null);

  const [viewMode, setViewMode] = useState("grid");

  /* =======================================================
     DROPDOWN REF
  ======================================================= */

  const dropdownContainerRef = useRef(null);

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("All Categories");
    setLevel("All Levels");
    setDuration("Any Duration");
    setSortBy("Newest");
    setOpenDropdown(null);
  };

  /* =======================================================
     CLOSE DROPDOWN
     - Escape key
     - Click outside
  ======================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        document.activeElement?.blur();
      }
    };

    const handleClickOutside = (event) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        quizzes
          .map((quiz) => quiz.category || quiz.subject || quiz.courseCategory)
          .filter(Boolean),
      ),
    ];

    return ["All Categories", ...uniqueCategories];
  }, [quizzes]);

  const levels = useMemo(() => {
    const uniqueLevels = [
      ...new Set(
        quizzes.map((quiz) => quiz.level || quiz.difficulty).filter(Boolean),
      ),
    ];

    return ["All Levels", ...uniqueLevels];
  }, [quizzes]);

  /* =======================================================
     DURATION HELPER
  ======================================================= */

  const getDurationNumber = (quiz) => {
    const rawDuration =
      quiz.duration ?? quiz.durationMinutes ?? quiz.timeLimit ?? 0;

    if (typeof rawDuration === "number") {
      return rawDuration;
    }

    const match = String(rawDuration).match(/\d+/);

    return match ? Number(match[0]) : 0;
  };

  /* =======================================================
     ATTEMPT / RESULT HELPERS
  ======================================================= */

  const getQuizAttempt = (quiz) => {
    /*
      Attempts are temporarily read from localStorage.

      Expected structure:
      {
        status: "passed" | "failed" | "completed",
        score: 82,
        attemptId: "attempt-001"
      }

      Later this can be replaced directly with backend data.
    */

    try {
      const storedAttempts = JSON.parse(
        localStorage.getItem("capacityConnectQuizAttempts") || "{}",
      );

      return storedAttempts[quiz.quizId] || null;
    } catch {
      return null;
    }
  };

  const getQuizStatus = (quiz) => {
    const attempt = getQuizAttempt(quiz);

    if (!attempt) {
      return {
        attempted: false,
        passed: false,
        failed: false,
        score: null,
        attemptId: null,
      };
    }

    const passingScore = Number(quiz.passingScore) || 70;

    const score =
      typeof attempt.score === "number" ? attempt.score : Number(attempt.score);

    const passed =
      attempt.passed === true ||
      attempt.status === "passed" ||
      score >= passingScore;

    return {
      attempted: true,
      passed,
      failed: !passed,
      score: Number.isFinite(score) ? score : null,
      attemptId: attempt.attemptId || null,
    };
  };

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredQuizzes = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    let result = quizzes.filter((quiz) => {
      const title = quiz.quizTitle || quiz.title || "";

      const courseTitle = quiz.courseTitle || quiz.course || "";

      const quizCategory =
        quiz.category || quiz.subject || quiz.courseCategory || "";

      const quizLevel = quiz.level || quiz.difficulty || "";

      const searchableText = `
        ${title}
        ${courseTitle}
        ${quizCategory}
        ${quizLevel}
      `.toLowerCase();

      /* Search */

      if (normalizedSearch && !searchableText.includes(normalizedSearch)) {
        return false;
      }

      /* Category */

      if (category !== "All Categories" && quizCategory !== category) {
        return false;
      }

      /* Level */

      if (level !== "All Levels" && quizLevel !== level) {
        return false;
      }

      /* Duration */

      const minutes = getDurationNumber(quiz);

      if (duration === "Under 15 min" && minutes >= 15) {
        return false;
      }

      if (duration === "15–30 min" && (minutes < 15 || minutes > 30)) {
        return false;
      }

      if (duration === "30+ min" && minutes <= 30) {
        return false;
      }

      return true;
    });

    /* =====================================================
       SORT
    ===================================================== */

    result = [...result].sort((a, b) => {
      if (sortBy === "Newest") {
        const dateA = new Date(a.createdAt || a.updatedAt || a.date || 0);

        const dateB = new Date(b.createdAt || b.updatedAt || b.date || 0);

        return dateB - dateA;
      }

      if (sortBy === "Oldest") {
        const dateA = new Date(a.createdAt || a.updatedAt || a.date || 0);

        const dateB = new Date(b.createdAt || b.updatedAt || b.date || 0);

        return dateA - dateB;
      }

      if (sortBy === "Shortest") {
        return getDurationNumber(a) - getDurationNumber(b);
      }

      if (sortBy === "Longest") {
        return getDurationNumber(b) - getDurationNumber(a);
      }

      if (sortBy === "Highest Score") {
        const scoreA = Number(a.passingScore) || 0;

        const scoreB = Number(b.passingScore) || 0;

        return scoreB - scoreA;
      }

      return 0;
    });

    return result;
  }, [quizzes, searchQuery, category, level, duration, sortBy]);

  /* =======================================================
     SOLVE QUIZ
  ======================================================= */

  const handleSolveQuiz = (quiz) => {
    if (onSolveQuiz) {
      onSolveQuiz(quiz);
      return;
    }

    if (!quiz?.quizId) {
      return;
    }

    navigate(`/learner/quizzes/${quiz.quizId}/attempt`);
  };

  /* =======================================================
     GET RESULT
  ======================================================= */

  const handleGetResult = (quiz) => {
    const status = getQuizStatus(quiz);

    /*
      Result is available only after passing.
    */

    if (!status.passed) {
      return;
    }

    if (onGetResult) {
      onGetResult(quiz, status);
      return;
    }

    if (!quiz?.quizId || !status.attemptId) {
      return;
    }

    navigate(`/learner/quizzes/${quiz.quizId}/result/${status.attemptId}`);
  };

  /* =======================================================
     DISPLAY HELPERS
  ======================================================= */

  const getTitle = (quiz) => quiz.quizTitle || quiz.title || "Untitled Quiz";

  const getCategory = (quiz) =>
    quiz.category || quiz.subject || quiz.courseCategory || "General";

  const getLevel = (quiz) => quiz.level || quiz.difficulty || "Intermediate";

  const getQuestions = (quiz) =>
    quiz.totalQuestions ?? quiz.questionCount ?? quiz.questions?.length ?? 0;

  const getDurationLabel = (quiz) => {
    const rawDuration = quiz.duration ?? quiz.durationMinutes ?? quiz.timeLimit;

    if (typeof rawDuration === "number") {
      return `${rawDuration} min`;
    }

    if (rawDuration) {
      return String(rawDuration);
    }

    return "20 min";
  };

  const getPassingScore = (quiz) => Number(quiz.passingScore) || 70;

  /* =======================================================
     CATEGORY THEME
  ======================================================= */

  const getCategoryTheme = (quiz) => {
    const value = getCategory(quiz).toLowerCase();

    if (value.includes("react")) {
      return "purple";
    }

    if (value.includes("html") || value.includes("css")) {
      return "mint";
    }

    if (value.includes("node")) {
      return "green";
    }

    if (value.includes("python")) {
      return "yellow";
    }

    if (value.includes("data")) {
      return "rose";
    }

    return "blue";
  };

  /* =======================================================
     QUIZ ICON
  ======================================================= */

  const getQuizIcon = (quiz) => {
    const value = `
      ${getTitle(quiz)}
      ${getCategory(quiz)}
      ${quiz.courseTitle || ""}
    `.toLowerCase();

    if (value.includes("react")) {
      return (
        <span className="quiz-list-card__tech-icon quiz-list-card__tech-icon--react">
          ⚛
        </span>
      );
    }

    if (value.includes("html") || value.includes("css")) {
      return (
        <span className="quiz-list-card__tech-icon quiz-list-card__tech-icon--html">
          5
        </span>
      );
    }

    if (value.includes("node")) {
      return (
        <span className="quiz-list-card__tech-icon quiz-list-card__tech-icon--node">
          N
        </span>
      );
    }

    if (value.includes("python")) {
      return (
        <span className="quiz-list-card__tech-icon quiz-list-card__tech-icon--python">
          Py
        </span>
      );
    }

    return (
      <span className="quiz-list-card__tech-icon quiz-list-card__tech-icon--javascript">
        JS
      </span>
    );
  };

  /* =======================================================
     PREMIUM DROPDOWN
  ======================================================= */

  const renderPremiumDropdown = (id, icon, value, options, onChange) => {
    const isOpen = openDropdown === id;

    return (
      <div className={`quiz-list__premium-select ${isOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="quiz-list__premium-select-trigger"
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="quiz-list__premium-select-left">
            {icon}

            <span>{value}</span>
          </span>

          <ChevronDown className="quiz-list__premium-chevron" size={15} />
        </button>

        {isOpen && (
          <div className="quiz-list__premium-menu" role="listbox">
            {options.map((option) => (
              <button
                type="button"
                key={option}
                role="option"
                aria-selected={value === option}
                className={`quiz-list__premium-option ${
                  value === option ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(option);
                  setOpenDropdown(null);
                }}
              >
                <span>{option}</span>

                {value === option && <CheckCircle2 size={15} />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="quiz-list">
      {/* =====================================================
          EXPLORE TOOLBAR
      ===================================================== */}

      <div className="quiz-list__toolbar">
        <div className="quiz-list__toolbar-header">
          <div className="quiz-list__toolbar-title-wrap">
            <div className="quiz-list__toolbar-icon">
              <Grid2X2 size={21} />
            </div>

            <div>
              <h2>Explore Your Quizzes</h2>

              <p>
                Find the right quiz, test your knowledge, and keep improving.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="quiz-list__clear-button"
            onClick={resetFilters}
          >
            <RotateCcw size={14} />

            <span>Clear Filters</span>
          </button>
        </div>

        {/* =================================================
            FILTER CONTROLS
        ================================================== */}

        <div className="quiz-list__filters" ref={dropdownContainerRef}>
          {/* Search */}

          <div className="quiz-list__search">
            <Search size={18} />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search quizzes by title, subject, or keyword..."
              aria-label="Search quizzes"
            />

            {searchQuery && (
              <button
                type="button"
                className="quiz-list__search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* =================================================
              CATEGORY DROPDOWN
          ================================================== */}

          {renderPremiumDropdown(
            "category",
            <SlidersHorizontal size={16} />,
            category,
            categories,
            setCategory,
          )}

          {/* =================================================
              LEVEL DROPDOWN
          ================================================== */}

          {renderPremiumDropdown(
            "level",
            <BarChart3 size={16} />,
            level,
            levels,
            setLevel,
          )}

          {/* =================================================
              DURATION DROPDOWN
          ================================================== */}

          {renderPremiumDropdown(
            "duration",
            <Clock3 size={16} />,
            duration,
            ["Any Duration", "Under 15 min", "15–30 min", "30+ min"],
            setDuration,
          )}

          {/* =================================================
              SORT DROPDOWN
          ================================================== */}

          {renderPremiumDropdown(
            "sort",
            <SlidersHorizontal size={16} />,
            sortBy,
            ["Newest", "Oldest", "Shortest", "Longest", "Highest Score"],
            setSortBy,
          )}
        </div>
      </div>

      {/* =====================================================
          RESULTS HEADER
      ===================================================== */}

      <div className="quiz-list__results-header">
        <div className="quiz-list__results-title">
          <h2>
            Available Quizzes
            <span>({filteredQuizzes.length})</span>
          </h2>
        </div>

        <div className="quiz-list__results-controls">
          <div className="quiz-list__view-toggle">
            <button
              type="button"
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid2X2 size={15} />
            </button>

            <button
              type="button"
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List size={16} />
            </button>
          </div>

          <span className="quiz-list__page-label">Page 1 of 1</span>

          <button
            type="button"
            className="quiz-list__page-arrow"
            disabled
            aria-label="Previous page"
          >
            ‹
          </button>

          <button
            type="button"
            className="quiz-list__page-arrow"
            disabled
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>

      {/* =====================================================
          QUIZ CARDS
      ===================================================== */}

      {filteredQuizzes.length > 0 ? (
        <div
          className={`quiz-list__cards ${
            viewMode === "list" ? "quiz-list__cards--list" : ""
          }`}
        >
          {filteredQuizzes.map((quiz) => {
            const status = getQuizStatus(quiz);

            const theme = getCategoryTheme(quiz);

            return (
              <article
                className={`quiz-list-card quiz-list-card--${theme}`}
                key={quiz.quizId}
              >
                {/* =========================================
                    TOP ROW
                ========================================== */}

                <div className="quiz-list-card__top">
                  <span className="quiz-list-card__category">
                    {getCategory(quiz)}
                  </span>

                  <span
                    className={`quiz-list-card__level quiz-list-card__level--${theme}`}
                  >
                    {getLevel(quiz)}
                  </span>
                </div>

                {/* =========================================
                    MAIN CONTENT
                ========================================== */}

                <div className="quiz-list-card__main">
                  <div className="quiz-list-card__icon-wrap">
                    {getQuizIcon(quiz)}
                  </div>

                  <div className="quiz-list-card__title-wrap">
                    <h3>{getTitle(quiz)}</h3>

                    {quiz.courseTitle && (
                      <span className="quiz-list-card__course">
                        {quiz.courseTitle}
                      </span>
                    )}
                  </div>
                </div>

                {/* =========================================
                    DESCRIPTION
                ========================================== */}

                <p className="quiz-list-card__description">
                  {quiz.description ||
                    "Test your knowledge and strengthen your understanding through practical assessment."}
                </p>

                {/* =========================================
                    META
                ========================================== */}

                <div className="quiz-list-card__meta">
                  <span>
                    <span className="quiz-list-card__meta-icon">?</span>
                    {getQuestions(quiz)} Questions
                  </span>

                  <span>
                    <Clock3 size={14} />

                    {getDurationLabel(quiz)}
                  </span>

                  <span>
                    <Trophy size={14} />
                    {getPassingScore(quiz)}% to pass
                  </span>
                </div>

                {/* =========================================
                    STATUS
                ========================================== */}

                {status.attempted && (
                  <div
                    className={`quiz-list-card__status ${
                      status.passed
                        ? "quiz-list-card__status--passed"
                        : "quiz-list-card__status--failed"
                    }`}
                  >
                    <CheckCircle2 size={15} />

                    <span>
                      {status.passed
                        ? `Passed • ${status.score}%`
                        : status.score !== null
                          ? `Completed • ${status.score}%`
                          : "Completed"}
                    </span>
                  </div>
                )}

                {/* =========================================
                    ACTIONS
                ========================================== */}

                <div className="quiz-list-card__actions">
                  <button
                    type="button"
                    className="quiz-list-card__solve"
                    onClick={() => handleSolveQuiz(quiz)}
                  >
                    <Play size={15} />

                    <span>{status.failed ? "Solve Again" : "Solve Quiz"}</span>
                  </button>

                  <button
                    type="button"
                    className={`quiz-list-card__result ${
                      !status.passed ? "is-disabled" : ""
                    }`}
                    disabled={!status.passed}
                    onClick={() => handleGetResult(quiz)}
                    title={
                      !status.passed
                        ? "Complete and pass this quiz to view the result"
                        : "View quiz result"
                    }
                  >
                    <BarChart3 size={15} />

                    <span>View Result</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* =================================================
           EMPTY STATE
        ================================================== */

        <div className="quiz-list__empty">
          <div className="quiz-list__empty-icon">
            <Search size={25} />
          </div>

          <h3>No quizzes found</h3>

          <p>Try changing your search or filters to find available quizzes.</p>

          <button type="button" onClick={resetFilters}>
            <RotateCcw size={15} />
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default QuizList;
