import React, { useMemo, useState } from "react";

import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Clock3,
  FileQuestion,
  Filter,
  Info,
  Lightbulb,
  Minus,
  Search,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";

import "./QuizReview.css";

/* =========================================================
   QUIZ REVIEW
   Capacity Connect - Learner
========================================================= */

const QuizReview = ({ quiz = null, result = null }) => {
  /* =======================================================
     STATE
  ======================================================= */

  const [activeFilter, setActiveFilter] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");

  const [sortOrder, setSortOrder] = useState("ascending");

  const [openQuestionId, setOpenQuestionId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const QUESTIONS_PER_PAGE = 5;

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

  /* =======================================================
     ANSWER LOOKUP
  ======================================================= */

  const answerLookup = useMemo(() => {
    const answers = Array.isArray(result?.answers) ? result.answers : [];

    const lookup = new Map();

    answers.forEach((answer, index) => {
      if (answer?.questionId !== undefined) {
        lookup.set(String(answer.questionId), answer);
      }

      lookup.set(`index-${index}`, answer);
    });

    return lookup;
  }, [result]);

  /* =======================================================
     NORMALIZE ANSWER VALUE
  ======================================================= */

  const getSelectedAnswer = (answerRecord) => {
    if (!answerRecord) {
      return null;
    }

    return (
      answerRecord.selectedAnswer ??
      answerRecord.answer ??
      answerRecord.selectedOption ??
      answerRecord.userAnswer ??
      null
    );
  };

  /* =======================================================
     NORMALIZE QUESTION REVIEW
  ======================================================= */

  const reviewQuestions = useMemo(() => {
    const questions = Array.isArray(quiz?.questions) ? quiz.questions : [];

    return questions.map((question, index) => {
      const questionId = question?.questionId ?? `question-${index + 1}`;

      const answerRecord =
        answerLookup.get(String(questionId)) ??
        answerLookup.get(`index-${index}`) ??
        null;

      const selectedAnswer = getSelectedAnswer(answerRecord);

      const hasAnswer =
        selectedAnswer !== null &&
        selectedAnswer !== undefined &&
        String(selectedAnswer).trim() !== "";

      const correctAnswer = question?.correctAnswer ?? null;

      const isCorrect =
        hasAnswer && String(selectedAnswer) === String(correctAnswer);

      let status = "unanswered";

      if (isCorrect) {
        status = "correct";
      } else if (hasAnswer) {
        status = "incorrect";
      }

      return {
        ...question,

        questionId,

        questionNumber: index + 1,

        selectedAnswer,

        correctAnswer,

        explanation:
          question?.explanation ||
          "Review the concept and try practicing a few more questions to strengthen your understanding.",

        status,

        points: Number(question?.points ?? 0),

        answerRecord,
      };
    });
  }, [quiz, answerLookup]);

  /* =======================================================
     FILTER + SEARCH + SORT
  ======================================================= */

  const filteredQuestions = useMemo(() => {
    let filtered = [...reviewQuestions];

    /* FILTER */

    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (question) => question.status === activeFilter,
      );
    }

    /* SEARCH */

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter((question) => {
        const questionText = String(question.question ?? "").toLowerCase();

        const selected = String(question.selectedAnswer ?? "").toLowerCase();

        const correct = String(question.correctAnswer ?? "").toLowerCase();

        return (
          questionText.includes(query) ||
          selected.includes(query) ||
          correct.includes(query)
        );
      });
    }

    /* SORT */

    filtered.sort((a, b) => {
      if (sortOrder === "descending") {
        return b.questionNumber - a.questionNumber;
      }

      return a.questionNumber - b.questionNumber;
    });

    return filtered;
  }, [reviewQuestions, activeFilter, searchQuery, sortOrder]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(
    Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE),
    1,
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pageStartIndex = (safeCurrentPage - 1) * QUESTIONS_PER_PAGE;

  const paginatedQuestions = filteredQuestions.slice(
    pageStartIndex,
    pageStartIndex + QUESTIONS_PER_PAGE,
  );

  /* =======================================================
     RESET PAGE WHEN FILTER CHANGES
  ======================================================= */

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    setOpenQuestionId(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);

    setCurrentPage(1);
  };

  /* =======================================================
     TOGGLE QUESTION
  ======================================================= */

  const handleToggleQuestion = (questionId) => {
    setOpenQuestionId((previous) =>
      previous === questionId ? null : questionId,
    );
  };

  /* =======================================================
     PAGINATION
  ======================================================= */

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));

    setOpenQuestionId(null);
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));

    setOpenQuestionId(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOpenQuestionId(null);
  };

  /* =======================================================
     FILTER COUNTS
  ======================================================= */

  const filterItems = [
    {
      id: "all",
      label: "All Questions",
      count: totalQuestions,
      icon: FileQuestion,
    },
    {
      id: "correct",
      label: "Correct",
      count: correctAnswers,
      icon: CheckCircle2,
    },
    {
      id: "incorrect",
      label: "Incorrect",
      count: incorrectAnswers,
      icon: CircleX,
    },
    {
      id: "unanswered",
      label: "Unanswered",
      count: unanswered,
      icon: Minus,
    },
  ];

  /* =======================================================
     FORMAT ANSWER
  ======================================================= */

  const formatAnswer = (answer) => {
    if (
      answer === null ||
      answer === undefined ||
      String(answer).trim() === ""
    ) {
      return "No answer selected";
    }

    return String(answer);
  };

  /* =======================================================
     STATUS CONFIG
  ======================================================= */

  const getStatusConfig = (status) => {
    if (status === "correct") {
      return {
        label: "Correct",
        icon: CheckCircle2,
      };
    }

    if (status === "incorrect") {
      return {
        label: "Incorrect",
        icon: XCircle,
      };
    }

    return {
      label: "Unanswered",
      icon: Clock3,
    };
  };

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  const hasQuestions = reviewQuestions.length > 0;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="quiz-review">
      {/* =================================================
          HEADER
      ================================================== */}

      <div className="quiz-review__header">
        <div className="quiz-review__header-left">
          <div className="quiz-review__header-icon">
            <FileQuestion size={28} strokeWidth={2} />
          </div>

          <div className="quiz-review__header-content">
            <span className="quiz-review__eyebrow">ANSWER REVIEW</span>

            <h2>Review Your Answers</h2>

            <p>
              Review your responses, compare them with the correct answers, and
              learn from each question.
            </p>
          </div>
        </div>

        <div className="quiz-review__header-action">
          <div className="quiz-review__header-action-icon">
            <Lightbulb size={21} strokeWidth={2} />
          </div>

          <div>
            <strong>Learn from every answer</strong>

            <span>Understanding mistakes helps you improve faster.</span>
          </div>
        </div>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================== */}

      <div className="quiz-review__summary">
        {/* TOTAL — DARK NAVY */}

        <article className="quiz-review__summary-card quiz-review__summary-card--dark">
          <div className="quiz-review__summary-dark-glow" />

          <div className="quiz-review__summary-icon">
            <FileQuestion size={25} strokeWidth={2} />
          </div>

          <div className="quiz-review__summary-content">
            <span>Total Questions</span>

            <strong>{totalQuestions}</strong>

            <p>Review all questions</p>
          </div>
        </article>

        {/* CORRECT */}

        <article className="quiz-review__summary-card quiz-review__summary-card--green">
          <div className="quiz-review__summary-icon">
            <Check size={25} strokeWidth={2.6} />
          </div>

          <div className="quiz-review__summary-content">
            <span>Correct</span>

            <strong>{correctAnswers}</strong>

            <p>
              {(totalQuestions > 0
                ? (correctAnswers / totalQuestions) * 100
                : 0
              ).toFixed(2)}
              % accuracy
            </p>
          </div>
        </article>

        {/* INCORRECT */}

        <article className="quiz-review__summary-card quiz-review__summary-card--red">
          <div className="quiz-review__summary-icon">
            <XCircle size={25} strokeWidth={2.1} />
          </div>

          <div className="quiz-review__summary-content">
            <span>Incorrect</span>

            <strong>{incorrectAnswers}</strong>

            <p>
              {(totalQuestions > 0
                ? (incorrectAnswers / totalQuestions) * 100
                : 0
              ).toFixed(2)}
              % of questions
            </p>
          </div>
        </article>

        {/* UNANSWERED */}

        <article className="quiz-review__summary-card quiz-review__summary-card--yellow">
          <div className="quiz-review__summary-icon">
            <Minus size={26} strokeWidth={2.8} />
          </div>

          <div className="quiz-review__summary-content">
            <span>Unanswered</span>

            <strong>{unanswered}</strong>

            <p>
              {(totalQuestions > 0
                ? (unanswered / totalQuestions) * 100
                : 0
              ).toFixed(2)}
              % of questions
            </p>
          </div>
        </article>
      </div>

      {/* =================================================
          FILTER / TOOLBAR
      ================================================== */}

      <div className="quiz-review__toolbar">
        <div className="quiz-review__filters">
          {filterItems.map((filter) => {
            const Icon = filter.icon;

            return (
              <button
                key={filter.id}
                type="button"
                className={`quiz-review__filter ${
                  activeFilter === filter.id
                    ? "quiz-review__filter--active"
                    : ""
                } quiz-review__filter--${filter.id}`}
                onClick={() => handleFilterChange(filter.id)}
              >
                <Icon size={17} strokeWidth={2.1} />

                <span>{filter.label}</span>

                <b>{filter.count}</b>
              </button>
            );
          })}
        </div>

        <div className="quiz-review__tools">
          {/* SEARCH */}

          <div className="quiz-review__search">
            <Search size={18} strokeWidth={2} />

            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search questions..."
              aria-label="Search questions"
            />
          </div>

          {/* SORT */}

          <div className="quiz-review__sort">
            <SlidersHorizontal size={17} strokeWidth={2} />

            <select
              value={sortOrder}
              onChange={handleSortChange}
              aria-label="Question order"
            >
              <option value="ascending">Question Order</option>

              <option value="descending">Reverse Order</option>
            </select>

            <ChevronDown size={16} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* =================================================
          QUESTION LIST
      ================================================== */}

      {!hasQuestions ? (
        <div className="quiz-review__empty">
          <div className="quiz-review__empty-icon">
            <FileQuestion size={32} strokeWidth={1.8} />
          </div>

          <h3>No Questions Available</h3>

          <p>There are no questions available to review for this quiz.</p>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="quiz-review__empty">
          <div className="quiz-review__empty-icon">
            <Search size={30} strokeWidth={1.8} />
          </div>

          <h3>No Matching Questions</h3>

          <p>
            Try changing the filter or search term to find another question.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              handleFilterChange("all");
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="quiz-review__questions">
          {paginatedQuestions.map((question) => {
            const statusConfig = getStatusConfig(question.status);

            const StatusIcon = statusConfig.icon;

            const isOpen = openQuestionId === question.questionId;

            return (
              <article
                key={question.questionId}
                className={`quiz-review__question-card quiz-review__question-card--${question.status} ${
                  isOpen ? "quiz-review__question-card--open" : ""
                }`}
              >
                {/* QUESTION TOP */}

                <div className="quiz-review__question-top">
                  <div className="quiz-review__question-number">
                    {question.questionNumber}
                  </div>

                  <div className="quiz-review__question-main">
                    <div className="quiz-review__question-heading">
                      <h3>{question.question}</h3>

                      <div
                        className={`quiz-review__status quiz-review__status--${question.status}`}
                      >
                        <StatusIcon size={15} strokeWidth={2.5} />

                        <span>{statusConfig.label}</span>
                      </div>
                    </div>

                    {/* ANSWERS */}

                    <div className="quiz-review__answers">
                      {/* YOUR ANSWER */}

                      <div className="quiz-review__answer-column">
                        <div className="quiz-review__answer-label">
                          {question.status === "correct" ? (
                            <CheckCircle2 size={17} strokeWidth={2.2} />
                          ) : question.status === "incorrect" ? (
                            <XCircle size={17} strokeWidth={2.2} />
                          ) : (
                            <Clock3 size={17} strokeWidth={2} />
                          )}

                          <span>Your Answer</span>
                        </div>

                        <div
                          className={`quiz-review__answer-value quiz-review__answer-value--${question.status}`}
                        >
                          {formatAnswer(question.selectedAnswer)}
                        </div>
                      </div>

                      {/* CORRECT ANSWER */}

                      <div className="quiz-review__answer-column">
                        <div className="quiz-review__answer-label quiz-review__answer-label--correct">
                          <CheckCircle2 size={17} strokeWidth={2.2} />

                          <span>Correct Answer</span>
                        </div>

                        <div className="quiz-review__answer-value quiz-review__answer-value--correct-answer">
                          {formatAnswer(question.correctAnswer)}
                        </div>
                      </div>
                    </div>

                    {/* EXPLANATION */}

                    <div className="quiz-review__explanation">
                      <div className="quiz-review__explanation-icon">
                        <Lightbulb size={17} strokeWidth={2} />
                      </div>

                      <div>
                        <strong>Explanation:</strong>

                        <p>{question.explanation}</p>
                      </div>
                    </div>
                  </div>

                  {/* COLLAPSE BUTTON */}

                  <button
                    type="button"
                    className={`quiz-review__expand ${
                      isOpen ? "quiz-review__expand--active" : ""
                    }`}
                    onClick={() => handleToggleQuestion(question.questionId)}
                    aria-label={
                      isOpen ? "Collapse question" : "Expand question"
                    }
                    aria-expanded={isOpen}
                  >
                    <ChevronDown size={19} strokeWidth={2.1} />
                  </button>
                </div>

                {/* EXPANDED DETAILS */}

                <div
                  className={`quiz-review__details ${
                    isOpen ? "quiz-review__details--open" : ""
                  }`}
                >
                  <div className="quiz-review__details-inner">
                    <div className="quiz-review__detail-stat">
                      <span>Question</span>

                      <strong>#{question.questionNumber}</strong>
                    </div>

                    <div className="quiz-review__detail-stat">
                      <span>Points</span>

                      <strong>{Number(question.points).toFixed(2)}</strong>
                    </div>

                    <div className="quiz-review__detail-stat">
                      <span>Result</span>

                      <strong>{statusConfig.label}</strong>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* =================================================
          PAGINATION
      ================================================== */}

      {filteredQuestions.length > 0 && (
        <div className="quiz-review__pagination">
          <div className="quiz-review__pagination-buttons">
            <button
              type="button"
              className="quiz-review__page-arrow"
              onClick={handlePreviousPage}
              disabled={safeCurrentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={`quiz-review__page-number ${
                  safeCurrentPage === page
                    ? "quiz-review__page-number--active"
                    : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="quiz-review__page-arrow"
              onClick={handleNextPage}
              disabled={safeCurrentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>

          <span className="quiz-review__pagination-info">
            Showing <strong>{pageStartIndex + 1}</strong> to{" "}
            <strong>
              {Math.min(
                pageStartIndex + QUESTIONS_PER_PAGE,
                filteredQuestions.length,
              )}
            </strong>{" "}
            of <strong>{filteredQuestions.length}</strong> questions
          </span>
        </div>
      )}
    </section>
  );
};

export default QuizReview;
