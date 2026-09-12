import React, { useState } from "react";

import QuizzesHeader from "../../../Components/Trainer/TrainerQuizzes/QuizzesHeader/QuizzesHeader";
import QuizStats from "../../../Components/Trainer/TrainerQuizzes/QuizStats/QuizStats";
import QuizFilters from "../../../Components/Trainer/TrainerQuizzes/QuizFilters/QuizFilters";
import QuizList from "../../../Components/Trainer/TrainerQuizzes/QuizList/QuizList";

import "./TrainerQuizzes.css";

const TrainerQuizzes = () => {
  /* ======================================================
     SHARED QUIZ FILTER STATE
  ====================================================== */

  const [searchValue, setSearchValue] = useState("");

  const [course, setCourse] = useState("All Courses");

  const [status, setStatus] = useState("All Status");

  const [type, setType] = useState("All Types");

  const [sortValue, setSortValue] = useState("Latest First");

  const [viewMode, setViewMode] = useState("grid");

  /* ======================================================
     RESET ALL FILTERS
  ====================================================== */

  const handleResetFilters = () => {
    setSearchValue("");
    setCourse("All Courses");
    setStatus("All Status");
    setType("All Types");
    setSortValue("Latest First");
    setViewMode("grid");
  };

  /* ======================================================
     CREATE QUIZ
  ====================================================== */

  const handleCreateQuiz = () => {
    window.dispatchEvent(new CustomEvent("trainer-create-quiz"));
  };

  /* ======================================================
     EDIT QUIZ
  ====================================================== */

  const handleEditQuiz = (quiz) => {
    window.dispatchEvent(
      new CustomEvent("trainer-edit-quiz", {
        detail: { quiz },
      }),
    );
  };

  /* ======================================================
     VIEW QUIZ
  ====================================================== */

  const handleViewQuiz = (quiz) => {
    window.dispatchEvent(
      new CustomEvent("trainer-view-quiz", {
        detail: { quiz },
      }),
    );
  };

  return (
    <div className="trainer-quizzes">
      {/* ========================================
          Quizzes Header
      ======================================== */}

      <QuizzesHeader />

      {/* ========================================
          Quiz Statistics
      ======================================== */}

      <QuizStats />

      {/* ========================================
          Quiz Filters
      ======================================== */}

      <QuizFilters
        searchValue={searchValue}
        course={course}
        status={status}
        type={type}
        sortValue={sortValue}
        viewMode={viewMode}
        onSearchChange={setSearchValue}
        onCourseChange={setCourse}
        onStatusChange={setStatus}
        onTypeChange={setType}
        onSortChange={setSortValue}
        onViewChange={setViewMode}
        onResetFilters={handleResetFilters}
        onCreateQuiz={handleCreateQuiz}
      />

      {/* ========================================
          Quiz List
      ======================================== */}

      <QuizList
        searchValue={searchValue}
        course={course}
        status={status}
        type={type}
        sortValue={sortValue}
        viewMode={viewMode}
        onViewChange={setViewMode}
        onEditQuiz={handleEditQuiz}
        onViewQuiz={handleViewQuiz}
      />
    </div>
  );
};

export default TrainerQuizzes;
