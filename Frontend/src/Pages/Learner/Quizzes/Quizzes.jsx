import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizzesHeader from "../../../Components/Learner/Quizzes/QuizzesHeader/QuizzesHeader";
import QuizList from "../../../Components/Learner/Quizzes/QuizList/QuizList";

import { getQuizStats, getQuizzes as getMockQuizzes } from "../../../../../data/mock/quiz";
import { getQuizzes as getApiQuizzes } from "../../../services/quizApi";

import "./Quizzes.css";

/* =========================================================
   QUIZZES PAGE
   Capacity Connect - Learner
========================================================= */

const Quizzes = () => {
  const navigate = useNavigate();
  const [realQuizzes, setRealQuizzes] = useState(null);

  useEffect(() => {
    getApiQuizzes("LEARNER")
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const formatted = data.map((q) => ({
            quizId: String(q.id),
            courseId: q.course_id || "MOES-IMD-01",
            courseTitle: q.course_title || "Meteorological Observations",
            quizTitle: q.title || "Quiz",
            description: q.description || "",
            duration: Number(q.time_limit_minutes) || 20,
            passingScore: Number(q.passing_score) || 60,
            totalQuestions: q.total_questions || 10,
            difficulty: "Intermediate",
            category: "Observations",
            status: "available",
          }));
          setRealQuizzes(formatted);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch learner quizzes from API:", err);
      });
  }, []);

  /* =======================================================
     QUIZ DATA
  ======================================================= */

  const quizStats = getQuizStats();
  const allQuizzes = realQuizzes || getMockQuizzes();

  /* =======================================================
     START QUIZ FROM HEADER
  ======================================================= */

  const handleStartQuiz = () => {
    const firstQuizId = allQuizzes.length > 0 ? String(allQuizzes[0].quizId || allQuizzes[0].id) : "1";
    navigate(`/learner/quizzes/${firstQuizId}/attempt`);
  };

  /* =======================================================
     SOLVE QUIZ
     Triggered from an individual QuizCard.
  ======================================================= */

  const handleSolveQuiz = (quiz) => {
    if (!quiz) {
      console.error("No quiz selected.");
      return;
    }

    const targetQuizId = String(quiz.quizId || quiz.id || "1");

    navigate(`/learner/quizzes/${targetQuizId}/attempt`);
  };

  /* =======================================================
     GET QUIZ RESULT
     Triggered only when QuizList determines that
     the learner has passed that particular quiz.
  ======================================================= */

  const handleGetResult = (quiz, status) => {
    if (!quiz) {
      console.error("No quiz selected for result.");
      return;
    }

    if (!status?.passed) {
      console.log("Quiz result is unavailable until the quiz is passed.");
      return;
    }

    if (!status?.attemptId) {
      console.log("No completed attempt was found for this quiz.");
      return;
    }

    navigate(`/learner/quizzes/${quiz.quizId}/result/${status.attemptId}`);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="quizzes-page">
      <div className="quizzes-page__container">
        {/* =================================================
            QUIZZES HEADER
        ================================================== */}

        <QuizzesHeader stats={quizStats} onStartQuiz={handleStartQuiz} />

        {/* =================================================
            QUIZ LIST
        ================================================== */}

        <QuizList
          quizzes={allQuizzes}
          onSolveQuiz={handleSolveQuiz}
          onGetResult={handleGetResult}
        />
      </div>
    </main>
  );
};

export default Quizzes;
