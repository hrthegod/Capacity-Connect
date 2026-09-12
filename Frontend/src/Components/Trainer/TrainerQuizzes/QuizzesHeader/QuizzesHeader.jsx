import React from "react";
import { LuPlus, LuClipboardCheck } from "react-icons/lu";

import "./QuizzesHeader.css";

const QuizzesHeader = () => {
  const handleCreateQuiz = () => {
    window.dispatchEvent(new CustomEvent("trainer-create-quiz"));
  };

  return (
    <section className="quizzes-header">
      <div className="quizzes-header-left">
        <div className="quizzes-header-icon">
          <LuClipboardCheck size={21} strokeWidth={1.7} />
        </div>

        <div className="quizzes-header-content">
          <div className="quizzes-header-title-row">
            <h1>Quizzes</h1>
            <span className="quizzes-header-badge">24 Quizzes</span>
          </div>

          <p>Create, manage and track quizzes for your learners.</p>
        </div>
      </div>

      <button
        type="button"
        className="quizzes-create-button"
        onClick={handleCreateQuiz}
      >
        <LuPlus size={16} strokeWidth={1.9} />
        <span>Create Quiz</span>
      </button>
    </section>
  );
};

export default QuizzesHeader;
