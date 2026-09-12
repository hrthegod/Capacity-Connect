import React from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CircleHelp,
  GraduationCap,
  Headphones,
  Lightbulb,
  RefreshCw,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react";

import "./QuizResultActions.css";

const QuizResultActions = ({
  quiz,
  result,
  onTakeQuizAgain,
  onBackToQuizzes,
  onContinueLearning,
  onReviewPerformance,
  onExploreMoreQuizzes,
  onGetSupport,
}) => {
  const quizTitle = quiz?.quizTitle || "this quiz";

  const passed =
    typeof result?.passed === "boolean"
      ? result.passed
      : Number(result?.score ?? 0) >= Number(result?.passingScore ?? 70);

  const score = Number(result?.score ?? 0);

  const handleTakeQuizAgain = () => {
    if (typeof onTakeQuizAgain === "function") {
      onTakeQuizAgain();
    }
  };

  const handleBackToQuizzes = () => {
    if (typeof onBackToQuizzes === "function") {
      onBackToQuizzes();
    }
  };

  const handleContinueLearning = () => {
    if (typeof onContinueLearning === "function") {
      onContinueLearning();
    }
  };

  const handleReviewPerformance = () => {
    if (typeof onReviewPerformance === "function") {
      onReviewPerformance();
      return;
    }

    const reviewSection = document.getElementById("quiz-review");

    if (reviewSection) {
      reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleExploreMoreQuizzes = () => {
    if (typeof onExploreMoreQuizzes === "function") {
      onExploreMoreQuizzes();
    } else {
      handleBackToQuizzes();
    }
  };

  const handleGetSupport = () => {
    if (typeof onGetSupport === "function") {
      onGetSupport();
    }
  };

  return (
    <section className="quiz-result-actions">
      <div className="quiz-result-actions__container">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <header className="quiz-result-actions__header">
          <div className="quiz-result-actions__header-icon">
            <div className="quiz-result-actions__header-icon-inner">
              <Rocket size={30} strokeWidth={1.8} aria-hidden="true" />
            </div>
          </div>

          <div className="quiz-result-actions__header-content">
            <span className="quiz-result-actions__eyebrow">NEXT STEPS</span>

            <h2>Continue Your Learning</h2>

            <p>
              You&apos;ve completed {quizTitle}. Here are some recommended next
              steps to keep building your skills and knowledge.
            </p>
          </div>

          <div className="quiz-result-actions__motivation">
            <div className="quiz-result-actions__motivation-icon">
              <Lightbulb size={24} strokeWidth={1.8} aria-hidden="true" />
            </div>

            <div>
              <strong>Small steps lead to big progress.</strong>
              <span>Keep learning, keep growing!</span>
            </div>
          </div>
        </header>

        {/* =========================================================
            ACTION CARDS
        ========================================================== */}
        <div className="quiz-result-actions__cards">
          {/* Take Again */}
          <button
            type="button"
            className="quiz-result-actions__action-card quiz-result-actions__action-card--green"
            onClick={handleTakeQuizAgain}
          >
            <div className="quiz-result-actions__action-top">
              <div className="quiz-result-actions__action-icon">
                <RefreshCw size={25} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <span className="quiz-result-actions__arrow">
                <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </div>

            <div className="quiz-result-actions__action-content">
              <h3>Take Quiz Again</h3>

              <p>Try again to improve your score and unlock more rewards.</p>
            </div>
          </button>

          {/* Back to Quizzes */}
          <button
            type="button"
            className="quiz-result-actions__action-card quiz-result-actions__action-card--blue"
            onClick={handleBackToQuizzes}
          >
            <div className="quiz-result-actions__action-top">
              <div className="quiz-result-actions__action-icon">
                <BookOpen size={25} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <span className="quiz-result-actions__arrow">
                <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </div>

            <div className="quiz-result-actions__action-content">
              <h3>Back to Quizzes</h3>

              <p>
                Explore more quizzes and test your knowledge on other topics.
              </p>
            </div>
          </button>

          {/* Continue Learning */}
          <button
            type="button"
            className="quiz-result-actions__action-card quiz-result-actions__action-card--purple"
            onClick={handleContinueLearning}
          >
            <div className="quiz-result-actions__action-top">
              <div className="quiz-result-actions__action-icon">
                <GraduationCap size={25} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <span className="quiz-result-actions__arrow">
                <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </div>

            <div className="quiz-result-actions__action-content">
              <h3>Continue Learning</h3>

              <p>Move to the next lesson and keep building your skills.</p>
            </div>
          </button>

          {/* Review Performance */}
          <button
            type="button"
            className="quiz-result-actions__action-card quiz-result-actions__action-card--amber"
            onClick={handleReviewPerformance}
          >
            <div className="quiz-result-actions__action-top">
              <div className="quiz-result-actions__action-icon">
                <BarChart3 size={25} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <span className="quiz-result-actions__arrow">
                <ArrowRight size={20} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </div>

            <div className="quiz-result-actions__action-content">
              <h3>Review Performance</h3>

              <p>Check your detailed performance and focus on weak areas.</p>
            </div>
          </button>
        </div>

        {/* =========================================================
            LEARNING JOURNEY + DARK ACHIEVEMENT PANEL
        ========================================================== */}
        <div className="quiz-result-actions__journey-grid">
          {/* Learning Journey */}
          <div className="quiz-result-actions__journey-card">
            <div className="quiz-result-actions__journey-illustration">
              <div className="quiz-result-actions__book book--top">
                <span />
              </div>

              <div className="quiz-result-actions__book book--middle">
                <span />
              </div>

              <div className="quiz-result-actions__book book--bottom">
                <span />
              </div>

              <div className="quiz-result-actions__plant">
                <div className="quiz-result-actions__stem" />

                <div className="quiz-result-actions__leaf leaf--left" />
                <div className="quiz-result-actions__leaf leaf--right" />
              </div>
            </div>

            <div className="quiz-result-actions__journey-content">
              <span className="quiz-result-actions__journey-eyebrow">
                KEEP GOING
              </span>

              <h3>Your Learning Journey Continues</h3>

              <p>
                Every quiz you take helps you grow stronger. Keep exploring new
                topics, practice regularly, and achieve your goals!
              </p>

              <div className="quiz-result-actions__journey-divider" />

              <div className="quiz-result-actions__journey-points">
                <div className="quiz-result-actions__journey-point">
                  <span className="journey-point-icon journey-point-icon--green">
                    <TrendingUp
                      size={19}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <strong>Build</strong>
                    <span>New Skills</span>
                  </div>
                </div>

                <div className="quiz-result-actions__journey-point">
                  <span className="journey-point-icon journey-point-icon--purple">
                    <Target size={19} strokeWidth={1.9} aria-hidden="true" />
                  </span>

                  <div>
                    <strong>Achieve</strong>
                    <span>Your Goals</span>
                  </div>
                </div>

                <div className="quiz-result-actions__journey-point">
                  <span className="journey-point-icon journey-point-icon--blue">
                    <Star size={19} strokeWidth={1.9} aria-hidden="true" />
                  </span>

                  <div>
                    <strong>Unlock</strong>
                    <span>New Opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Achievement Panel */}
          <div className="quiz-result-actions__achievement">
            <div className="quiz-result-actions__achievement-glow" />

            <div className="quiz-result-actions__achievement-stars">
              <Sparkles size={15} strokeWidth={1.7} aria-hidden="true" />

              <Sparkles size={11} strokeWidth={1.7} aria-hidden="true" />

              <Sparkles size={13} strokeWidth={1.7} aria-hidden="true" />
            </div>

            <div className="quiz-result-actions__trophy">
              <Trophy size={50} strokeWidth={1.6} aria-hidden="true" />
            </div>

            <span className="quiz-result-actions__achievement-status">
              {passed ? "QUIZ COMPLETED" : "KEEP PRACTICING"}
            </span>

            <h3>
              {passed
                ? "You&apos;re on the Right Path!"
                : "Every Attempt Makes You Better!"}
            </h3>

            <p>
              {passed
                ? "Consistent learning leads to meaningful progress. Stay curious and keep challenging yourself."
                : `You scored ${score}%. Review your answers, strengthen your weak areas, and try again.`}
            </p>

            <button
              type="button"
              className="quiz-result-actions__achievement-button"
              onClick={handleExploreMoreQuizzes}
            >
              <span>Explore More Quizzes</span>

              <ArrowRight size={19} strokeWidth={1.9} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* =========================================================
            SUPPORT
        ========================================================== */}
        <div className="quiz-result-actions__support">
          <div className="quiz-result-actions__support-icon">
            <CircleHelp size={23} strokeWidth={1.8} aria-hidden="true" />
          </div>

          <div className="quiz-result-actions__support-content">
            <h3>Need help or have questions?</h3>

            <p>Visit our Help Center or contact support for assistance.</p>
          </div>

          <button
            type="button"
            className="quiz-result-actions__support-button"
            onClick={handleGetSupport}
          >
            <Headphones size={19} strokeWidth={1.8} aria-hidden="true" />

            <span>Get Support</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizResultActions;
