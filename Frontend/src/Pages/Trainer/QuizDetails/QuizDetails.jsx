import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LuArrowLeft, LuFileText } from "react-icons/lu";

/* =========================================================
   QUIZ DETAILS COMPONENTS
========================================================= */

import QuizDetailsHeader from "../../../Components/Trainer/TrainerQuizzes/QuizDetails/QuizDetailsHeader/QuizDetailsHeader";

import QuizOverview from "../../../Components/Trainer/TrainerQuizzes/QuizDetails/QuizOverview/QuizOverview";

import QuizQuestions from "../../../Components/Trainer/TrainerQuizzes/QuizDetails/QuizQuestions/QuizQuestions";

import QuizAttempts from "../../../Components/Trainer/TrainerQuizzes/QuizDetails/QuizAttempts/QuizAttempts";

import QuizPerformance from "../../../Components/Trainer/TrainerQuizzes/QuizDetails/QuizPerformance/QuizPerformance";

/* =========================================================
   QUIZ DATA
========================================================= */

import { quizzes } from "../../../Components/Trainer/TrainerQuizzes/QuizList/QuizList";

import "./QuizDetails.css";

/* =========================================================
   QUIZ DETAILS PAGE
========================================================= */

const QuizDetails = () => {
  const navigate = useNavigate();

  const { quizId } = useParams();

  /* ======================================================
     FIND QUIZ
  ====================================================== */

  const quiz = quizzes.find((item) => String(item.id) === String(quizId));

  /* ======================================================
     EDIT QUIZ
  ====================================================== */

  const handleEditQuiz = (selectedQuiz) => {
    window.dispatchEvent(
      new CustomEvent("trainer-edit-quiz", {
        detail: {
          quiz: selectedQuiz,
        },
      }),
    );
  };

  /* ======================================================
     INVALID QUIZ
  ====================================================== */

  if (!quiz) {
    return (
      <div className="quiz-details-page">
        <section className="quiz-details-not-found">
          <div className="quiz-details-not-found-icon">
            <LuFileText size={26} strokeWidth={1.7} />
          </div>

          <h1>Quiz not found</h1>

          <p>
            The quiz you're looking for doesn't exist or may have been removed.
          </p>

          <button
            type="button"
            onClick={() => navigate("/trainer/trainer-quizzes")}
          >
            <LuArrowLeft size={16} strokeWidth={1.8} />

            <span>Back to Quizzes</span>
          </button>
        </section>
      </div>
    );
  }

  /* ======================================================
     MAIN
  ====================================================== */

  return (
    <div className="quiz-details-page">
      {/* ==================================================
          QUIZ DETAILS HEADER
      ================================================== */}

      <QuizDetailsHeader quiz={quiz} onEditQuiz={handleEditQuiz} />

      {/* ==================================================
          QUIZ OVERVIEW
      ================================================== */}

      <QuizOverview quiz={quiz} />

      {/* ==================================================
          QUIZ QUESTIONS
      ================================================== */}

      <QuizQuestions questions={undefined} />

      {/* ==================================================
          QUIZ ATTEMPTS
      ================================================== */}

      <QuizAttempts />

      {/* ==================================================
          QUIZ PERFORMANCE
      ================================================== */}

      <QuizPerformance />
    </div>
  );
};

export default QuizDetails;
