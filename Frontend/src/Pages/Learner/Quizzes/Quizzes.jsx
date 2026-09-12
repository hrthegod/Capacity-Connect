import React from "react";
import { useNavigate } from "react-router-dom";

import QuizzesHeader from "../../../Components/Learner/Quizzes/QuizzesHeader/QuizzesHeader";
import QuizList from "../../../Components/Learner/Quizzes/QuizList/QuizList";

import { getQuizStats, getQuizzes } from "../../../../data/mock/quiz";

import "./Quizzes.css";

/* =========================================================
   QUIZZES PAGE
   Capacity Connect - Learner
========================================================= */

const Quizzes = () => {
  const navigate = useNavigate();

  /* =======================================================
     QUIZ DATA
  ======================================================= */

  const quizStats = getQuizStats();
  const allQuizzes = getQuizzes();

  /* =======================================================
     START QUIZ FROM HEADER
  ======================================================= */

  const handleStartQuiz = () => {
    if (!allQuizzes || allQuizzes.length === 0) {
      console.log("No quizzes are currently available.");
      return;
    }

    const firstQuiz = allQuizzes[0];

    if (!firstQuiz?.quizId) {
      console.error("Unable to start quiz: quizId is missing.", firstQuiz);
      return;
    }

    navigate(`/learner/quizzes/${firstQuiz.quizId}/attempt`);
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

    if (!quiz.quizId) {
      console.error("Unable to open quiz: quizId is missing.", quiz);
      return;
    }

    navigate(`/learner/quizzes/${quiz.quizId}/attempt`);
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
