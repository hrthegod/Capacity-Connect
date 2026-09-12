import React from "react";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCompass,
  FiLayers,
  FiMap,
  FiPlayCircle,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Button from "../../../../Reusable_components/Button/Button";

import "./EmptyLearning.css";

const EmptyLearning = ({ onExploreCourses, onViewRecommendations }) => {
  const handleExploreCourses = () => {
    if (onExploreCourses) {
      onExploreCourses();
    }
  };

  const handleRecommendations = () => {
    if (onViewRecommendations) {
      onViewRecommendations();
    }
  };

  return (
    <section className="empty-learning">
      <div className="empty-learning__container">
        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <header className="empty-learning__header">
          <div className="empty-learning__header-copy">
            <span className="empty-learning__eyebrow">
              <FiCompass />
              YOUR LEARNING SPACE
            </span>

            <h2 className="empty-learning__title">
              Your learning journey
              <span>starts here.</span>
            </h2>

            <p className="empty-learning__description">
              Build practical skills, explore expert-led courses, and create a
              learning path designed around your professional goals.
            </p>
          </div>

          <div className="empty-learning__header-mark">
            <span className="empty-learning__header-mark-icon">
              <FiBookOpen />
            </span>

            <div>
              <strong>Ready to learn?</strong>
              <span>Choose your first course</span>
            </div>
          </div>
        </header>

        {/* =====================================================
            MAIN FEATURE AREA
        ===================================================== */}

        <div className="empty-learning__feature-grid">
          {/* ---------------------------------------------------
              MAIN DARK VISUAL CARD
          --------------------------------------------------- */}

          <Card variant="glass" className="empty-learning__hero-card">
            <div className="empty-learning__hero-glow empty-learning__hero-glow--one" />
            <div className="empty-learning__hero-glow empty-learning__hero-glow--two" />

            <div className="empty-learning__hero-grid" />

            <div className="empty-learning__hero-orbit empty-learning__hero-orbit--one" />
            <div className="empty-learning__hero-orbit empty-learning__hero-orbit--two" />

            <div className="empty-learning__hero-content">
              <span className="empty-learning__hero-label">
                <span className="empty-learning__hero-status-dot" />
                LEARNING SPACE READY
              </span>

              <div className="empty-learning__hero-icon">
                <FiBookOpen />
              </div>

              <div className="empty-learning__hero-copy">
                <h3>No courses yet</h3>

                <p>
                  Your learning library is waiting for its first course. Explore
                  Capacity Connect and find an opportunity that matches your
                  interests, skills, and career direction.
                </p>
              </div>

              <div className="empty-learning__hero-actions">
                <Button
                  variant="primary"
                  size="lg"
                  rounded="lg"
                  rightIcon={<FiArrowRight />}
                  onClick={handleExploreCourses}
                >
                  Explore Course Catalog
                </Button>

                <button
                  type="button"
                  className="empty-learning__text-action"
                  onClick={handleRecommendations}
                >
                  <FiTarget />
                  View recommendations
                  <FiArrowRight />
                </button>
              </div>
            </div>

            <div className="empty-learning__hero-footer">
              <div className="empty-learning__hero-stat">
                <span className="empty-learning__hero-stat-icon">
                  <FiLayers />
                </span>

                <div>
                  <strong>Multiple learning paths</strong>
                  <span>Skills • Technology • Science</span>
                </div>
              </div>

              <div className="empty-learning__hero-stat">
                <span className="empty-learning__hero-stat-icon">
                  <FiAward />
                </span>

                <div>
                  <strong>Verified learning</strong>
                  <span>Certificates on completion</span>
                </div>
              </div>
            </div>
          </Card>

          {/* ---------------------------------------------------
              DISCOVERY PANEL
          --------------------------------------------------- */}

          <div className="empty-learning__discovery-column">
            <Card variant="glass" className="empty-learning__discovery-card">
              <div className="empty-learning__discovery-icon">
                <FiSearch />
              </div>

              <span className="empty-learning__discovery-label">
                FIND YOUR DIRECTION
              </span>

              <h3>Explore learning opportunities</h3>

              <p>
                Browse courses by domain, difficulty, duration, and skills to
                find the right starting point.
              </p>

              <div className="empty-learning__discovery-list">
                <div>
                  <span>
                    <FiBookOpen />
                  </span>
                  <strong>Expert-led courses</strong>
                </div>

                <div>
                  <span>
                    <FiTrendingUp />
                  </span>
                  <strong>Career-relevant skills</strong>
                </div>

                <div>
                  <span>
                    <FiUsers />
                  </span>
                  <strong>Learn with a community</strong>
                </div>
              </div>

              <Button
                variant="outline"
                size="md"
                rounded="lg"
                rightIcon={<FiArrowRight />}
                fullWidth
                onClick={handleExploreCourses}
              >
                Browse Courses
              </Button>
            </Card>

            {/* -------------------------------------------------
                PURPLE RECOMMENDATION CARD
            ------------------------------------------------- */}

            <Card
              variant="glass"
              className="empty-learning__recommendation-card"
            >
              <div className="empty-learning__recommendation-top">
                <span className="empty-learning__recommendation-icon">
                  <FiTarget />
                </span>

                <span className="empty-learning__recommendation-badge">
                  SMART PATH
                </span>
              </div>

              <div className="empty-learning__recommendation-copy">
                <h3>Not sure where to begin?</h3>

                <p>
                  Your skills and development areas can help guide your next
                  learning decision.
                </p>
              </div>

              <button
                type="button"
                className="empty-learning__recommendation-action"
                onClick={handleRecommendations}
              >
                <span>Explore recommendations</span>
                <FiArrowRight />
              </button>
            </Card>
          </div>
        </div>

        {/* =====================================================
            WHY START LEARNING
        ===================================================== */}

        <section className="empty-learning__benefits">
          <div className="empty-learning__subsection-heading">
            <div>
              <span className="empty-learning__subsection-eyebrow">
                WHY START LEARNING?
              </span>

              <h3>Turn learning into measurable progress.</h3>
            </div>

            <p>
              Every course you complete contributes to your skills, experience,
              and professional development journey.
            </p>
          </div>

          <div className="empty-learning__benefit-grid">
            {/* GREEN */}
            <Card
              variant="glass"
              className="empty-learning__benefit-card empty-learning__benefit-card--green"
            >
              <div className="empty-learning__benefit-top">
                <span className="empty-learning__benefit-icon">
                  <FiTrendingUp />
                </span>

                <span className="empty-learning__benefit-number">01</span>
              </div>

              <div className="empty-learning__benefit-copy">
                <h4>Build relevant skills</h4>

                <p>
                  Develop practical capabilities aligned with your role,
                  interests, and professional goals.
                </p>
              </div>

              <div className="empty-learning__benefit-line" />
            </Card>

            {/* CYAN */}
            <Card
              variant="glass"
              className="empty-learning__benefit-card empty-learning__benefit-card--cyan"
            >
              <div className="empty-learning__benefit-top">
                <span className="empty-learning__benefit-icon">
                  <FiPlayCircle />
                </span>

                <span className="empty-learning__benefit-number">02</span>
              </div>

              <div className="empty-learning__benefit-copy">
                <h4>Learn at your pace</h4>

                <p>
                  Follow structured modules, continue where you left off, and
                  progress through learning at your own pace.
                </p>
              </div>

              <div className="empty-learning__benefit-line" />
            </Card>

            {/* AMBER */}
            <Card
              variant="glass"
              className="empty-learning__benefit-card empty-learning__benefit-card--amber"
            >
              <div className="empty-learning__benefit-top">
                <span className="empty-learning__benefit-icon">
                  <FiAward />
                </span>

                <span className="empty-learning__benefit-number">03</span>
              </div>

              <div className="empty-learning__benefit-copy">
                <h4>Earn verified credentials</h4>

                <p>
                  Complete your learning journey and earn certificates that
                  represent your course achievements.
                </p>
              </div>

              <div className="empty-learning__benefit-line" />
            </Card>
          </div>
        </section>

        {/* =====================================================
            DARK LEARNING PATH STRIP
        ===================================================== */}

        <Card variant="glass" className="empty-learning__path-card">
          <div className="empty-learning__path-background">
            <span className="empty-learning__path-line empty-learning__path-line--one" />
            <span className="empty-learning__path-line empty-learning__path-line--two" />
            <span className="empty-learning__path-node empty-learning__path-node--one" />
            <span className="empty-learning__path-node empty-learning__path-node--two" />
            <span className="empty-learning__path-node empty-learning__path-node--three" />
          </div>

          <div className="empty-learning__path-icon">
            <FiMap />
          </div>

          <div className="empty-learning__path-copy">
            <span>YOUR DEVELOPMENT PATH</span>

            <h3>Learn → Practice → Progress → Achieve</h3>

            <p>
              Start with one course and gradually build a learning portfolio
              that reflects your professional development.
            </p>
          </div>

          <Button
            variant="ghost"
            size="md"
            rounded="lg"
            rightIcon={<FiArrowRight />}
            onClick={handleExploreCourses}
            className="empty-learning__path-button"
          >
            Start Learning
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default EmptyLearning;
