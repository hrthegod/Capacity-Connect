import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

/* =========================================================
   QUIZ ATTEMPT COMPONENTS
========================================================= */

import QuizHeader from "../../../Components/Learner/QuizAttempt/QuizHeader/QuizHeader";

import QuizProgress from "../../../Components/Learner/QuizAttempt/QuizProgress/QuizProgress";


import QuizSubmit from "../../../Components/Learner/QuizAttempt/QuizSubmit/QuizSubmit";

/* =========================================================
   QUIZ DATA
========================================================= */

import { getQuizzes } from "../../../../data/mock/quiz";

import "./QuizAttempt.css";

/* =========================================================
   CONSTANTS
========================================================= */

const ATTEMPTS_STORAGE_KEY = "capacityConnectQuizAttempts";

const ATTEMPT_HISTORY_STORAGE_KEY = "capacityConnectQuizAttemptHistory";

const CURRENT_LEARNER_ID = "learner-001";

/* =========================================================
   QUIZ ATTEMPT PAGE
   Capacity Connect - Learner
========================================================= */

const QuizAttempt = () => {
  const navigate = useNavigate();

  const { quizId } = useParams();

  /* =======================================================
     QUIZ DATA
  ======================================================= */

  const quiz = useMemo(() => {
    if (!quizId) {
      return null;
    }

    const quizzes = getQuizzes();

    return quizzes.find((item) => item.quizId === quizId) || null;
  }, [quizId]);

  /* =======================================================
     QUESTIONS
  ======================================================= */

  const questions = useMemo(() => {
    if (!quiz?.questions) {
      return [];
    }

    return quiz.questions;
  }, [quiz]);

  /* =======================================================
     STATE
  ======================================================= */

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  const [reviewedQuestions, setReviewedQuestions] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =======================================================
     TOTAL QUESTIONS
  ======================================================= */

  const totalQuestions = questions.length;

  /* =======================================================
     CURRENT QUESTION
  ======================================================= */

  const currentQuestion = questions[currentQuestionIndex] || null;

  /* =======================================================
     CURRENT QUESTION NUMBER
  ======================================================= */

  const currentQuestionNumber = currentQuestionIndex + 1;

  /* =======================================================
     ANSWERED QUESTIONS
  ======================================================= */

  const answeredQuestions = useMemo(() => {
    return Object.keys(answers).filter((questionId) => {
      const answer = answers[questionId];

      return answer !== undefined && answer !== null && answer !== "";
    }).length;
  }, [answers]);

  /* =======================================================
     UNANSWERED QUESTIONS
  ======================================================= */

  const unansweredQuestions = Math.max(totalQuestions - answeredQuestions, 0);

  /* =======================================================
     PROGRESS PERCENTAGE
  ======================================================= */

  const progressPercentage =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  /* =======================================================
     MARKED QUESTIONS COUNT
  ======================================================= */

  const markedQuestions = reviewedQuestions.length;

  /* =======================================================
     GET QUIZ DURATION
  ======================================================= */

  const getQuizDurationMinutes = useCallback(() => {
    if (!quiz) {
      return 20;
    }

    const rawDuration =
      quiz.duration ?? quiz.durationMinutes ?? quiz.timeLimit ?? 20;

    if (typeof rawDuration === "number") {
      return Math.max(rawDuration, 1);
    }

    const match = String(rawDuration).match(/\d+/);

    return match ? Math.max(Number(match[0]), 1) : 20;
  }, [quiz]);

  /* =======================================================
     INITIALIZE TIMER
  ======================================================= */

  useEffect(() => {
    if (!quiz) {
      return;
    }

    const durationMinutes = getQuizDurationMinutes();

    setTimeRemaining(durationMinutes * 60);
  }, [quiz, getQuizDurationMinutes]);

  /* =======================================================
     FORMAT TIME
  ======================================================= */

  const formatTime = useCallback((seconds) => {
    const safeSeconds = Math.max(Number(seconds) || 0, 0);

    const minutes = Math.floor(safeSeconds / 60);

    const remainingSeconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }, []);

  /* =======================================================
     TIME RUNNING OUT
  ======================================================= */

  const isTimeRunningOut = timeRemaining > 0 && timeRemaining <= 60;

  /* =======================================================
     TIMER
  ======================================================= */

  useEffect(() => {
    if (!quiz || isSubmitting || timeRemaining <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((previousTime) => Math.max(previousTime - 1, 0));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [quiz, timeRemaining, isSubmitting]);

  /* =======================================================
     SELECT ANSWER
  ======================================================= */

  const handleAnswerSelect = useCallback(
    (questionId, answer) => {
      if (!questionId || isSubmitting) {
        return;
      }

      setAnswers((previousAnswers) => ({
        ...previousAnswers,

        [questionId]: answer,
      }));
    },
    [isSubmitting],
  );

  /* =======================================================
     CLEAR CURRENT ANSWER
  ======================================================= */

  const handleClearAnswer = useCallback(() => {
    if (!currentQuestion || isSubmitting) {
      return;
    }

    const questionId = currentQuestion.questionId;

    setAnswers((previousAnswers) => {
      const updatedAnswers = {
        ...previousAnswers,
      };

      delete updatedAnswers[questionId];

      return updatedAnswers;
    });
  }, [currentQuestion, isSubmitting]);

  /* =======================================================
     NEXT QUESTION
  ======================================================= */

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
    }
  }, [currentQuestionIndex, totalQuestions]);

  /* =======================================================
     PREVIOUS QUESTION
  ======================================================= */

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((previousIndex) => previousIndex - 1);
    }
  }, [currentQuestionIndex]);

  /* =======================================================
     GO TO QUESTION
  ======================================================= */

  const handleQuestionSelect = useCallback(
    (index) => {
      if (index < 0 || index >= totalQuestions || isSubmitting) {
        return;
      }

      setCurrentQuestionIndex(index);
    },
    [totalQuestions, isSubmitting],
  );

  /* =======================================================
     MARK / UNMARK QUESTION
  ======================================================= */

  const handleMarkReview = useCallback(
    (index) => {
      if (index < 0 || index >= totalQuestions || isSubmitting) {
        return;
      }

      const question = questions[index];

      if (!question?.questionId) {
        return;
      }

      const questionId = question.questionId;

      setReviewedQuestions((previousReviewed) => {
        if (previousReviewed.includes(questionId)) {
          return previousReviewed.filter((id) => id !== questionId);
        }

        return [...previousReviewed, questionId];
      });
    },
    [questions, totalQuestions, isSubmitting],
  );

  /* =======================================================
     REVIEW UNANSWERED
  ======================================================= */

  const handleReviewUnanswered = useCallback(() => {
    const firstUnansweredIndex = questions.findIndex((question) => {
      const answer = answers[question.questionId];

      return answer === undefined || answer === null || answer === "";
    });

    if (firstUnansweredIndex !== -1) {
      setCurrentQuestionIndex(firstUnansweredIndex);
    }
  }, [questions, answers]);

  /* =======================================================
     CONTINUE REVIEWING
  ======================================================= */

  const handleContinueReviewing = useCallback(() => {
    /*
        The learner is already inside the
        quiz attempt, so this action simply
        closes the submit confirmation
        inside QuizSubmit.

        QuizSubmit handles its own modal
        state and will call this callback
        when needed.
      */

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex);
    }
  }, [currentQuestionIndex, totalQuestions]);

  /* =======================================================
     CALCULATE RESULT
  ======================================================= */

  const calculateResult = useCallback(() => {
    if (!quiz || questions.length === 0) {
      return null;
    }

    let totalPoints = 0;

    let earnedPoints = 0;

    let correctAnswers = 0;

    let incorrectAnswers = 0;

    let unanswered = 0;

    const resultAnswers = questions.map((question) => {
      const questionId = question.questionId;

      const selectedAnswer = answers[questionId];

      const points = Number(question.points) || 1;

      totalPoints += points;

      const isAnswered =
        selectedAnswer !== undefined &&
        selectedAnswer !== null &&
        selectedAnswer !== "";

      /* -----------------------------------------
               UNANSWERED
            ------------------------------------------ */

      if (!isAnswered) {
        unanswered += 1;

        return {
          questionId,

          selectedAnswer: null,

          correctAnswer: question.correctAnswer,

          isCorrect: false,

          points: 0,

          maxPoints: points,
        };
      }

      /* -----------------------------------------
               CHECK ANSWER
            ------------------------------------------ */

      const isCorrect = selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        correctAnswers += 1;

        earnedPoints += points;
      } else {
        incorrectAnswers += 1;
      }

      return {
        questionId,

        selectedAnswer,

        correctAnswer: question.correctAnswer,

        isCorrect,

        points: isCorrect ? points : 0,

        maxPoints: points,
      };
    });

    /* -----------------------------------------
         SCORE
      ------------------------------------------ */

    const score =
      totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

    /* -----------------------------------------
         PASSING SCORE
      ------------------------------------------ */

    const passingScore = Number(quiz.passingScore) || 70;

    const passed = score >= passingScore;

    /* -----------------------------------------
         TIME TAKEN
      ------------------------------------------ */

    const durationSeconds = getQuizDurationMinutes() * 60;

    const timeTaken = Math.max(durationSeconds - timeRemaining, 0);

    /* -----------------------------------------
         RESULT
      ------------------------------------------ */

    return {
      score,

      passingScore,

      passed,

      correctAnswers,

      incorrectAnswers,

      unanswered,

      totalQuestions: questions.length,

      earnedPoints,

      totalPoints,

      timeTaken,

      answers: resultAnswers,
    };
  }, [quiz, questions, answers, timeRemaining, getQuizDurationMinutes]);

  /* =======================================================
     SAVE ATTEMPT
  ======================================================= */

  const saveAttempt = useCallback(
    (result) => {
      if (!quiz || !result) {
        return null;
      }

      const attemptId = `attempt-${quiz.quizId}-${Date.now()}`;

      const attempt = {
        attemptId,

        learnerId: CURRENT_LEARNER_ID,

        quizId: quiz.quizId,

        quizTitle: quiz.quizTitle || quiz.title || "",

        courseId: quiz.courseId || null,

        courseTitle: quiz.courseTitle || quiz.course || "",

        status: result.passed ? "passed" : "failed",

        score: result.score,

        passingScore: result.passingScore,

        passed: result.passed,

        correctAnswers: result.correctAnswers,

        incorrectAnswers: result.incorrectAnswers,

        unanswered: result.unanswered,

        totalQuestions: result.totalQuestions,

        earnedPoints: result.earnedPoints,

        totalPoints: result.totalPoints,

        timeTaken: result.timeTaken,

        answers: result.answers,

        completedAt: new Date().toISOString(),
      };

      /* ===============================================
           SAVE LATEST ATTEMPT
        ================================================ */

      try {
        const storedAttempts = JSON.parse(
          localStorage.getItem(ATTEMPTS_STORAGE_KEY) || "{}",
        );

        storedAttempts[quiz.quizId] = attempt;

        localStorage.setItem(
          ATTEMPTS_STORAGE_KEY,
          JSON.stringify(storedAttempts),
        );
      } catch (error) {
        console.error("Unable to save latest quiz attempt:", error);
      }

      /* ===============================================
           SAVE ATTEMPT HISTORY
        ================================================ */

      try {
        const storedHistory = JSON.parse(
          localStorage.getItem(ATTEMPT_HISTORY_STORAGE_KEY) || "[]",
        );

        storedHistory.push(attempt);

        localStorage.setItem(
          ATTEMPT_HISTORY_STORAGE_KEY,
          JSON.stringify(storedHistory),
        );
      } catch (error) {
        console.error("Unable to save quiz attempt history:", error);
      }

      return attempt;
    },
    [quiz],
  );

  /* =======================================================
     SUBMIT QUIZ
  ======================================================= */

  const handleSubmitQuiz = useCallback(() => {
    if (!quiz || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const result = calculateResult();

    if (!result) {
      setIsSubmitting(false);

      return;
    }

    const attempt = saveAttempt(result);

    if (!attempt) {
      setIsSubmitting(false);

      return;
    }

    navigate(`/learner/quizzes/${quiz.quizId}/result/${attempt.attemptId}`, {
      replace: true,
    });
  }, [quiz, isSubmitting, calculateResult, saveAttempt, navigate]);

  /* =======================================================
     AUTO SUBMIT WHEN TIME ENDS
  ======================================================= */

  useEffect(() => {
    if (!quiz || isSubmitting || timeRemaining !== 0) {
      return;
    }

    /*
      Prevent automatic submission
      during initial timer setup.
    */

    if (answeredQuestions === 0 && currentQuestionIndex === 0) {
      return;
    }

    handleSubmitQuiz();
  }, [
    quiz,
    timeRemaining,
    isSubmitting,
    answeredQuestions,
    currentQuestionIndex,
    handleSubmitQuiz,
  ]);

  /* =======================================================
     EXIT QUIZ
  ======================================================= */

  const handleExitQuiz = useCallback(() => {
    if (isSubmitting) {
      return;
    }

    const shouldExit = window.confirm(
      "Are you sure you want to leave this quiz? Your current answers will not be submitted.",
    );

    if (shouldExit) {
      navigate("/learner/quizzes");
    }
  }, [isSubmitting, navigate]);

  /* =======================================================
     PROGRESS DATA
  ======================================================= */

  const progressData = useMemo(
    () => ({
      currentQuestion: currentQuestionNumber,

      totalQuestions,

      answeredQuestions,

      unansweredQuestions,

      percentage: progressPercentage,

      timeRemaining,

      formattedTime: formatTime(timeRemaining),

      isTimeRunningOut,
    }),
    [
      currentQuestionNumber,
      totalQuestions,
      answeredQuestions,
      unansweredQuestions,
      progressPercentage,
      timeRemaining,
      formatTime,
      isTimeRunningOut,
    ],
  );

  /* =======================================================
     CURRENT SELECTED ANSWER
  ======================================================= */

  const selectedAnswer = currentQuestion?.questionId
    ? (answers[currentQuestion.questionId] ?? null)
    : null;

  /* =======================================================
     INVALID QUIZ
  ======================================================= */

  if (!quiz) {
    return (
      <main className="quiz-attempt quiz-attempt--not-found">
        <div className="quiz-attempt__not-found">
          <div className="quiz-attempt__not-found-icon">?</div>

          <h1>Quiz Not Found</h1>

          <p>
            The quiz you are trying to access does not exist or is no longer
            available.
          </p>

          <button type="button" onClick={() => navigate("/learner/quizzes")}>
            Back to Quizzes
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     QUIZ WITHOUT QUESTIONS
  ======================================================= */

  if (questions.length === 0) {
    return (
      <main className="quiz-attempt quiz-attempt--not-found">
        <div className="quiz-attempt__not-found">
          <div className="quiz-attempt__not-found-icon">!</div>

          <h1>Quiz Unavailable</h1>

          <p>This quiz does not contain any questions yet.</p>

          <button type="button" onClick={() => navigate("/learner/quizzes")}>
            Back to Quizzes
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="quiz-attempt">
      <div className="quiz-attempt__container">
        {/* =================================================
            QUIZ HEADER
        ================================================== */}

        <QuizHeader quiz={quiz} />

        {/* =================================================
            QUIZ PROGRESS
        ================================================== */}

        <QuizProgress
          progress={progressData}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onQuestionSelect={handleQuestionSelect}
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          onMarkReview={handleMarkReview}
          onAnswerSelect={handleAnswerSelect}
          onSubmit={handleSubmitQuiz}
          onExit={handleExitQuiz}
        />

        {/* =================================================
            CURRENT QUESTION
        ================================================== */}

        {/* =================================================
            QUIZ SUBMISSION
        ================================================== */}

        <QuizSubmit
          answeredQuestions={answeredQuestions}
          unansweredQuestions={unansweredQuestions}
          markedQuestions={markedQuestions}
          totalQuestions={totalQuestions}
          timeRemaining={timeRemaining}
          formattedTime={formatTime(timeRemaining)}
          onReviewUnanswered={handleReviewUnanswered}
          onContinueReviewing={handleContinueReviewing}
          onSubmit={handleSubmitQuiz}
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
};

export default QuizAttempt;
