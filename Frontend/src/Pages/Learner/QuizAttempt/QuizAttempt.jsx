import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* =========================================================
   QUIZ ATTEMPT COMPONENTS
========================================================= */
import QuizHeader from "../../../Components/Learner/QuizAttempt/QuizHeader/QuizHeader";
import QuizProgress from "../../../Components/Learner/QuizAttempt/QuizProgress/QuizProgress";
import QuizSubmit from "../../../Components/Learner/QuizAttempt/QuizSubmit/QuizSubmit";

/* =========================================================
   QUIZ API SERVICE
========================================================= */
import {
  getQuiz,
  getQuizQuestions,
  startQuiz,
  submitQuiz,
} from "../../../services/quizApi";

import "./QuizAttempt.css";

/* =========================================================
   QUIZ ATTEMPT PAGE
   Capacity Connect - Learner
========================================================= */
const QuizAttempt = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();

  /* =======================================================
     STATE
  ======================================================= */
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reviewedQuestions, setReviewedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isInitiatedRef = useRef(false);

  /* =======================================================
     FETCH QUIZ & START ATTEMPT (EXACTLY ONCE)
  ======================================================= */
  useEffect(() => {
    if (!quizId || isInitiatedRef.current) {
      return;
    }
    isInitiatedRef.current = true;

    async function initAttempt() {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Fetch metadata
        const quizData = await getQuiz(quizId);

        // 2. Fetch questions
        const rawQuestions = await getQuizQuestions(quizId);

        const formattedQuestions = rawQuestions.map((q) => ({
          questionId: q.id,
          question: q.question_text,
          options: Array.isArray(q.options) ? q.options : [],
          points: Number(q.marks) || 10,
        }));

        const formattedQuiz = {
          quizId: String(quizData.id),
          courseId: quizData.course_id,
          courseTitle: quizData.course_title || "",
          quizTitle: quizData.title || "",
          description: quizData.description || "",
          duration: Number(quizData.time_limit_minutes) || 20,
          passingScore: Number(quizData.passing_score) || 60,
          totalQuestions: formattedQuestions.length,
          questions: formattedQuestions,
        };

        setQuiz(formattedQuiz);
        setQuestions(formattedQuestions);

        // 3. Start backend attempt
        const attemptData = await startQuiz(quizId);
        setAttemptId(attemptData.id);
      } catch (err) {
        console.error("Failed to initialize backend quiz attempt:", err);
        setError(err.message || "Failed to load quiz attempt");
      } finally {
        setIsLoading(false);
      }
    }

    initAttempt();
  }, [quizId]);

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
    const rawDuration = quiz.duration ?? quiz.durationMinutes ?? quiz.timeLimit ?? 20;
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
      const updatedAnswers = { ...previousAnswers };
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
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex);
    }
  }, [currentQuestionIndex, totalQuestions]);

  /* =======================================================
     SUBMIT QUIZ TO BACKEND
  ======================================================= */
  const handleSubmitQuiz = useCallback(async () => {
    if (!quiz || !attemptId || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedAnswers = Object.entries(answers).map(([qId, val]) => ({
        questionId: Number(qId),
        selectedOption: val,
      }));

      const submitResult = await submitQuiz(attemptId, formattedAnswers);

      if (submitResult?.attemptId) {
        navigate(
          `/learner/quizzes/${quiz.quizId}/result/${submitResult.attemptId}`,
          { replace: true },
        );
      }
    } catch (err) {
      console.error("Failed to submit backend quiz attempt:", err);
      setIsSubmitting(false);
    }
  }, [quiz, attemptId, isSubmitting, answers, navigate]);

  /* =======================================================
     AUTO SUBMIT WHEN TIME ENDS
  ======================================================= */
  useEffect(() => {
    if (!quiz || !attemptId || isSubmitting || timeRemaining !== 0) {
      return;
    }

    if (answeredQuestions === 0 && currentQuestionIndex === 0) {
      return;
    }

    handleSubmitQuiz();
  }, [
    quiz,
    attemptId,
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
     LOADING / ERROR / INVALID STATES
  ======================================================= */
  if (isLoading) {
    return (
      <main className="quiz-attempt quiz-attempt--not-found">
        <div className="quiz-attempt__not-found">
          <h1>Loading Quiz...</h1>
          <p>Connecting to backend and preparing questions.</p>
        </div>
      </main>
    );
  }

  if (error || !quiz) {
    return (
      <main className="quiz-attempt quiz-attempt--not-found">
        <div className="quiz-attempt__not-found">
          <div className="quiz-attempt__not-found-icon">?</div>
          <h1>Quiz Not Found</h1>
          <p>
            {error ||
              "The quiz you are trying to access does not exist or is no longer available."}
          </p>
          <button type="button" onClick={() => navigate("/learner/quizzes")}>
            Back to Quizzes
          </button>
        </div>
      </main>
    );
  }

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

