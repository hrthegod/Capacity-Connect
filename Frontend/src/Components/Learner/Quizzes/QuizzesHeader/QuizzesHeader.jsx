import React from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  ChevronRight,
  FileQuestion,
  GraduationCap,
  Lightbulb,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import "./QuizzesHeader.css";

const QuizzesHeader = ({ stats, onStartQuiz }) => {
  const quizStats = stats || {
    totalQuizzes: 0,
    totalQuestions: 0,
    averagePassingScore: 0,
    categoriesCount: 0,
  };

  const statCards = [
    {
      id: "quizzes",
      value: quizStats.totalQuizzes,
      label: "Total Quizzes",
      description: "Across all courses",
      icon: FileQuestion,
      className: "quiz-header-stat--blue",
    },
    {
      id: "questions",
      value: quizStats.totalQuestions,
      label: "Total Questions",
      description: "In all quizzes",
      icon: Brain,
      className: "quiz-header-stat--purple",
    },
    {
      id: "passing",
      value: `${quizStats.averagePassingScore}%`,
      label: "Average Pass Score",
      description: "Minimum to pass",
      icon: Trophy,
      className: "quiz-header-stat--mint",
    },
    {
      id: "categories",
      value: quizStats.categoriesCount,
      label: "Categories",
      description: "Different subjects",
      icon: BarChart3,
      className: "quiz-header-stat--amber",
    },
  ];

  const handleStartQuiz = () => {
    if (typeof onStartQuiz === "function") {
      onStartQuiz();
      return;
    }

    console.log("Start a quiz");
  };

  return (
    <section className="quizzes-header">
      {/* Decorative background elements */}
      <div className="quizzes-header__glow quizzes-header__glow--one" />
      <div className="quizzes-header__glow quizzes-header__glow--two" />

      <div className="quizzes-header__wave quizzes-header__wave--one" />
      <div className="quizzes-header__wave quizzes-header__wave--two" />

      <div className="quizzes-header__content">
        {/* -------------------------------------------------
            LEFT CONTENT
        -------------------------------------------------- */}
        <div className="quizzes-header__left">
          <div className="quizzes-header__eyebrow">
            <span className="quizzes-header__eyebrow-icon">
              <GraduationCap size={18} strokeWidth={2.4} />
            </span>

            <span>Quiz Center</span>
          </div>

          <div className="quizzes-header__heading">
            <h1>
              Challenge Yourself.
              <span>Measure What You Know.</span>
            </h1>
          </div>

          <p className="quizzes-header__description">
            Test your knowledge, strengthen your skills, and track your progress
            through course assessments.
          </p>

          <div className="quizzes-header__progress-note">
            <span className="quizzes-header__progress-note-icon">
              <Zap size={17} strokeWidth={2.5} />
            </span>

            <span>Small Tests</span>

            <span className="quizzes-header__progress-dot">•</span>

            <span>Big Progress!</span>
          </div>

          {/* -------------------------------------------------
              STATISTICS
          -------------------------------------------------- */}
          <div className="quizzes-header__stats">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  className={`quiz-header-stat ${stat.className}`}
                  key={stat.id}
                >
                  <div className="quiz-header-stat__icon">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  <div className="quiz-header-stat__value">{stat.value}</div>

                  <h2 className="quiz-header-stat__label">{stat.label}</h2>

                  <p className="quiz-header-stat__description">
                    {stat.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* -------------------------------------------------
            RIGHT DARK PANEL
        -------------------------------------------------- */}
        <div className="quizzes-header__feature">
          <div className="quizzes-header__feature-orbit quizzes-header__feature-orbit--one" />
          <div className="quizzes-header__feature-orbit quizzes-header__feature-orbit--two" />

          <div className="quizzes-header__feature-stars">
            <span className="quiz-star quiz-star--one">✦</span>
            <span className="quiz-star quiz-star--two">✦</span>
            <span className="quiz-star quiz-star--three">✦</span>
          </div>

          <div className="quizzes-header__feature-topline">
            <span>LEARN</span>
            <span>•</span>
            <span>PRACTICE</span>
            <span>•</span>
            <span>GROW</span>
          </div>

          <div className="quizzes-header__feature-content">
            <h2>
              Turn Knowledge
              <span>Into Achievement</span>
            </h2>

            <p>
              Every quiz you take brings you one step closer to your learning
              goals.
            </p>

            <button
              type="button"
              className="quizzes-header__start-button"
              onClick={handleStartQuiz}
            >
              <span>Start a Quiz</span>

              <span className="quizzes-header__start-icon">
                <ChevronRight size={20} strokeWidth={2.6} />
              </span>
            </button>
          </div>

          {/* Quiz illustration */}
          <div className="quizzes-header__illustration">
            <div className="quizzes-header__bulb">
              <Lightbulb size={34} strokeWidth={1.9} />
            </div>

            <div className="quizzes-header__books">
              <div className="quizzes-header__book quizzes-header__book--back" />
              <div className="quizzes-header__book quizzes-header__book--middle" />
              <div className="quizzes-header__book quizzes-header__book--front" />
            </div>

            <div className="quizzes-header__quiz-sheet">
              <div className="quizzes-header__quiz-sheet-title">QUIZ</div>

              <div className="quizzes-header__quiz-line">
                <span className="quizzes-header__check">
                  <span />
                </span>

                <i />
              </div>

              <div className="quizzes-header__quiz-line">
                <span className="quizzes-header__empty-check" />
                <i />
              </div>

              <div className="quizzes-header__quiz-line">
                <span className="quizzes-header__empty-check" />
                <i />
              </div>

              <div className="quizzes-header__quiz-line">
                <span className="quizzes-header__empty-check" />
                <i />
              </div>
            </div>
          </div>

          {/* Bottom feature strip */}
          <div className="quizzes-header__feature-footer">
            <div className="quizzes-header__feature-item">
              <span className="quizzes-header__feature-item-icon quizzes-header__feature-item-icon--yellow">
                <Zap size={18} strokeWidth={2.5} />
              </span>

              <span>Build Skills</span>
            </div>

            <div className="quizzes-header__feature-divider" />

            <div className="quizzes-header__feature-item">
              <span className="quizzes-header__feature-item-icon quizzes-header__feature-item-icon--pink">
                <Target size={18} strokeWidth={2.4} />
              </span>

              <span>Track Progress</span>
            </div>

            <div className="quizzes-header__feature-divider" />

            <div className="quizzes-header__feature-item">
              <span className="quizzes-header__feature-item-icon quizzes-header__feature-item-icon--cyan">
                <Award size={18} strokeWidth={2.3} />
              </span>

              <span>Achieve Goals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom supporting statement */}
      <div className="quizzes-header__statement">
        <div className="quizzes-header__statement-icon">
          <BookOpen size={20} strokeWidth={2.2} />
        </div>

        <div>
          <strong>Learn. Test. Improve.</strong>
          <span>
            Every attempt is an opportunity to understand what you know and
            discover what comes next.
          </span>
        </div>
      </div>
    </section>
  );
};

export default QuizzesHeader;
