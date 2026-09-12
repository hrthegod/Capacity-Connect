import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* =========================================================
   QUIZ RESULT COMPONENTS
========================================================= */
import QuizResultHeader from "../../../Components/Learner/QuizResult/QuizResultHeader/QuizResultHeader";
import QuizScore from "../../../Components/Learner/QuizResult/QuizScore/QuizScore";
import QuizPerformance from "../../../Components/Learner/QuizResult/QuizPerformance/QuizPerformance";
import QuizReview from "../../../Components/Learner/QuizResult/QuizReview/QuizReview";
import QuizResultActions from "../../../Components/Learner/QuizResult/QuizResultActions/QuizResultActions";

/* =========================================================
   QUIZ API SERVICE
========================================================= */
import { getQuiz, getQuizResult } from "../../../services/quizApi";

import "./QuizResult.css";

/* =========================================================
   QUIZ RESULT PAGE
   Capacity Connect - Learner
========================================================= */
const QuizResult = () => {
  const navigate = useNavigate();
  const { quizId, attemptId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =======================================================
     FETCH RESULT FROM BACKEND API
  ======================================================= */
  useEffect(() => {
    if (!attemptId) {
      setIsLoading(false);
      return;
    }

    async function fetchResult() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch graded result from backend API
        const res = await getQuizResult(attemptId);
        const attemptData = res?.attempt;
        const answersData = res?.answers || [];

        if (!attemptData) {
          throw new Error("Result data unavailable");
        }

        // Fetch quiz metadata if quizId is present
        let quizMeta = null;
        const actualQuizId = attemptData.quiz_id || quizId;

        if (actualQuizId) {
          try {
            quizMeta = await getQuiz(actualQuizId);
          } catch (e) {
            console.error("Quiz metadata unavailable:", e);
          }
        }

        // Format questions array for QuizReview component
        const formattedQuestions = answersData.map((ans, idx) => ({
          questionId: ans.question_id || `q-${idx}`,
          question: ans.question_text || "",
          options: Array.isArray(ans.options) ? ans.options : [],
          correctAnswer: ans.correct_answer || "",
          points: Number(ans.marks) || 10,
          explanation:
            "Review the concept and try practicing a few more questions to strengthen your understanding.",
        }));

        const formattedQuiz = {
          quizId: String(actualQuizId),
          quizTitle: attemptData.quiz_title || quizMeta?.title || "Quiz",
          courseTitle: quizMeta?.course_title || "",
          passingScore: Number(
            attemptData.passing_score || quizMeta?.passing_score || 60,
          ),
          totalQuestions: formattedQuestions.length,
          questions: formattedQuestions,
        };

        // Format result stats for header/score/review components
        const correctCount = answersData.filter((a) => a.is_correct).length;
        const totalCount = answersData.length;
        const incorrectCount = answersData.filter(
          (a) => a.user_answer && !a.is_correct,
        ).length;
        const unansweredCount = totalCount - correctCount - incorrectCount;

        const formattedAnswers = answersData.map((ans) => ({
          questionId: ans.question_id,
          selectedAnswer: ans.user_answer,
          user_answer: ans.user_answer,
          correctAnswer: ans.correct_answer,
          isCorrect: Boolean(ans.is_correct),
          is_correct: Boolean(ans.is_correct),
          marksAwarded: Number(ans.marks_awarded || 0),
          maxPoints: Number(ans.marks || 10),
        }));

        const formattedResult = {
          attemptId: String(attemptData.id),
          quizId: String(actualQuizId),
          score: Number(attemptData.percentage ?? attemptData.score ?? 0),
          passingScore: Number(
            attemptData.passing_score || quizMeta?.passing_score || 60,
          ),
          passed: Boolean(attemptData.passed),
          totalQuestions: totalCount,
          correctAnswers: correctCount,
          incorrectAnswers: incorrectCount,
          unanswered: Math.max(unansweredCount, 0),
          earnedPoints: Number(attemptData.score || 0),
          totalPoints: answersData.reduce(
            (acc, a) => acc + (Number(a.marks) || 0),
            0,
          ),
          completedAt: attemptData.submitted_at || attemptData.created_at,
          answers: formattedAnswers,
        };

        setQuiz(formattedQuiz);
        setResult(formattedResult);
      } catch (err) {
        console.error("Failed to load backend attempt result:", err);
        setError(err.message || "Failed to load quiz result");
      } finally {
        setIsLoading(false);
      }
    }

    fetchResult();
  }, [quizId, attemptId]);

  /* =======================================================
     NAVIGATION ACTIONS
  ======================================================= */
  const handleBackToQuizzes = () => {
    navigate("/learner/quizzes");
  };

  const handleTakeQuizAgain = () => {
    if (!quiz?.quizId) {
      return;
    }
    navigate(`/learner/quizzes/${quiz.quizId}/attempt`);
  };

  const handleReviewPerformance = () => {
    const reviewSection = document.querySelector(".quiz-review");
    if (reviewSection) {
      reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleExploreMoreQuizzes = () => {
    navigate("/learner/quizzes");
  };

  /* =======================================================
     LOADING / INVALID STATES
  ======================================================= */
  if (isLoading) {
    return (
      <main className="quiz-result quiz-result--not-found">
        <div className="quiz-result__not-found">
          <h1>Loading Result...</h1>
          <p>Fetching your graded score and performance review.</p>
        </div>
      </main>
    );
  }

  if (error || !quiz || !result) {
    return (
      <main className="quiz-result quiz-result--not-found">
        <div className="quiz-result__not-found">
          <div className="quiz-result__not-found-icon">!</div>
          <span className="quiz-result__not-found-eyebrow">
            RESULT UNAVAILABLE
          </span>
          <h1>Result Not Found</h1>
          <p>
            {error ||
              "We couldn't find this quiz attempt. It may have expired or been removed."}
          </p>
          <div className="quiz-result__not-found-actions">
            <button type="button" onClick={handleBackToQuizzes}>
              Back to Quizzes
            </button>
            {quiz?.quizId && (
              <button
                type="button"
                className="quiz-result__secondary-button"
                onClick={handleTakeQuizAgain}
              >
                Take Quiz Again
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */
  return (
    <main className="quiz-result">
      <div className="quiz-result__container">
        {/* =================================================
            RESULT HEADER
        ================================================== */}
        <QuizResultHeader quiz={quiz} result={result} />

        {/* =================================================
            QUIZ SCORE
        ================================================== */}
        <QuizScore quiz={quiz} result={result} />

        {/* =================================================
            QUIZ PERFORMANCE
        ================================================== */}
        <QuizPerformance quiz={quiz} result={result} />

        {/* =================================================
            QUIZ REVIEW
        ================================================== */}
        <QuizReview quiz={quiz} result={result} />

        {/* =================================================
            RESULT ACTIONS
        ================================================== */}
        <QuizResultActions
          quiz={quiz}
          result={result}
          onTakeQuizAgain={handleTakeQuizAgain}
          onBackToQuizzes={handleBackToQuizzes}
          onReviewPerformance={handleReviewPerformance}
          onExploreMoreQuizzes={handleExploreMoreQuizzes}
        />
      </div>
    </main>
  );
};

export default QuizResult;

