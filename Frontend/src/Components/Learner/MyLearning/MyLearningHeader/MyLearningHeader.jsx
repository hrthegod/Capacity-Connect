import React from "react";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiLayers,
  FiPlayCircle,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./MyLearningHeader.css";

const MyLearningHeader = ({
  totalCourses = 0,
  inProgressCourses = 0,
  completedCourses = 0,
  overallProgress = 0,
  onExploreCourses,
}) => {
  const safeProgress = Math.min(100, Math.max(0, Number(overallProgress) || 0));

  return (
    <section className="my-learning-header">
      <div className="my-learning-header__grid">
        {/* =====================================================
            MAIN WELCOME PANEL
        ===================================================== */}

        <Card
          variant="default"
          size="lg"
          rounded="xl"
          hover={true}
          className="my-learning-header__hero-card"
        >
          {/* -------------------------------------------------
              Decorative visual layer
          ------------------------------------------------- */}

          <div className="my-learning-header__hero-visual" aria-hidden="true">
            <div className="my-learning-header__visual-grid" />

            <div className="my-learning-header__visual-orbit">
              <span />
              <span />
              <span />
            </div>

            <div className="my-learning-header__visual-glow" />

            <div className="my-learning-header__visual-icon">
              <FiCompass />
            </div>
          </div>

          {/* -------------------------------------------------
              Hero content
          ------------------------------------------------- */}

          <div className="my-learning-header__hero-content">
            <div className="my-learning-header__eyebrow-row">
              <Badge variant="cyan" appearance="soft" size="sm" shape="pill">
                MY LEARNING
              </Badge>

              <span className="my-learning-header__eyebrow-status">
                <span className="my-learning-header__status-dot" />
                Learning space
              </span>
            </div>

            <h1 className="my-learning-header__title">
              Continue your learning journey
            </h1>

            <p className="my-learning-header__description">
              Pick up where you left off, strengthen your capabilities, and
              continue building knowledge through structured courses designed
              for professional development.
            </p>

            {/* -------------------------------------------------
                Learning context
            ------------------------------------------------- */}

            <div className="my-learning-header__context">
              <div className="my-learning-header__context-item">
                <span className="my-learning-header__context-icon">
                  <FiBookOpen />
                </span>

                <span className="my-learning-header__context-copy">
                  <strong>{totalCourses}</strong>

                  <span>
                    Enrolled course
                    {totalCourses !== 1 ? "s" : ""}
                  </span>
                </span>
              </div>

              <span className="my-learning-header__context-divider" />

              <div className="my-learning-header__context-item">
                <span className="my-learning-header__context-icon my-learning-header__context-icon--progress">
                  <FiPlayCircle />
                </span>

                <span className="my-learning-header__context-copy">
                  <strong>{inProgressCourses}</strong>

                  <span>In progress</span>
                </span>
              </div>

              <span className="my-learning-header__context-divider" />

              <div className="my-learning-header__context-item">
                <span className="my-learning-header__context-icon my-learning-header__context-icon--complete">
                  <FiCheckCircle />
                </span>

                <span className="my-learning-header__context-copy">
                  <strong>{completedCourses}</strong>

                  <span>Completed</span>
                </span>
              </div>
            </div>

            {/* -------------------------------------------------
                Primary action
            ------------------------------------------------- */}

            <div className="my-learning-header__actions">
              <Button
                variant="primary"
                size="lg"
                rounded="lg"
                rightIcon={<FiArrowRight />}
                onClick={onExploreCourses}
                className="my-learning-header__explore-button"
              >
                Explore Course Catalog
              </Button>

              <span className="my-learning-header__action-note">
                Discover new learning opportunities
              </span>
            </div>
          </div>
        </Card>

        {/* =====================================================
            LEARNING SNAPSHOT CARD
        ===================================================== */}

        <Card
          variant="glass"
          size="lg"
          rounded="xl"
          hover={true}
          className="my-learning-header__snapshot-card"
        >
          <div className="my-learning-header__snapshot-top">
            <div>
              <span className="my-learning-header__snapshot-eyebrow">
                LEARNING SNAPSHOT
              </span>

              <h2>Your progress</h2>
            </div>

            <div className="my-learning-header__snapshot-icon">
              <FiTrendingUp />
            </div>
          </div>

          {/* -------------------------------------------------
              Progress visual
          ------------------------------------------------- */}

          <div className="my-learning-header__progress-block">
            <div className="my-learning-header__progress-heading">
              <span>Overall progress</span>

              <strong>{safeProgress}%</strong>
            </div>

            <div
              className="my-learning-header__progress-track"
              role="progressbar"
              aria-valuenow={safeProgress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Overall learning progress: ${safeProgress}%`}
            >
              <span
                className="my-learning-header__progress-value"
                style={{
                  width: `${safeProgress}%`,
                }}
              />
            </div>

            <p className="my-learning-header__progress-caption">
              Keep progressing through your enrolled courses to reach your
              learning goals.
            </p>
          </div>

          {/* -------------------------------------------------
              Snapshot information
          ------------------------------------------------- */}

          <div className="my-learning-header__snapshot-list">
            <div className="my-learning-header__snapshot-item">
              <span className="my-learning-header__snapshot-item-icon my-learning-header__snapshot-item-icon--courses">
                <FiLayers />
              </span>

              <span className="my-learning-header__snapshot-item-copy">
                <strong>{totalCourses}</strong>

                <span>Total enrolled</span>
              </span>
            </div>

            <div className="my-learning-header__snapshot-item">
              <span className="my-learning-header__snapshot-item-icon my-learning-header__snapshot-item-icon--time">
                <FiClock />
              </span>

              <span className="my-learning-header__snapshot-item-copy">
                <strong>{inProgressCourses}</strong>

                <span>Currently learning</span>
              </span>
            </div>

            <div className="my-learning-header__snapshot-item">
              <span className="my-learning-header__snapshot-item-icon my-learning-header__snapshot-item-icon--award">
                <FiAward />
              </span>

              <span className="my-learning-header__snapshot-item-copy">
                <strong>{completedCourses}</strong>

                <span>Learning completed</span>
              </span>
            </div>
          </div>

          {/* -------------------------------------------------
              Bottom message
          ------------------------------------------------- */}

          <div className="my-learning-header__snapshot-footer">
            <FiCheckCircle />

            <span>
              Every completed course strengthens your professional capability.
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MyLearningHeader;
