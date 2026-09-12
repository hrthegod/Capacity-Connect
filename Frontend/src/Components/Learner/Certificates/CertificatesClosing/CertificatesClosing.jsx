import React from "react";
import {
  FiArrowRight,
  FiChevronRight,
  FiBookOpen,
  FiCompass,
  FiAward,
  FiBarChart2,
  FiShield,
  FiStar,
  FiClock,
  FiUser,
  FiGlobe,
  FiUsers,
  FiSend,
} from "react-icons/fi";

import "./CertificatesClosing.css";

const CertificatesClosing = ({
  stats = {},
  onExploreCourses,
  onBrowseLearningPaths,
}) => {
  const {
    certificatesEarned = 6,
    verifiedCertificates = 6,
    averageScore = 89,
    learningHours = 240,
  } = stats;

  const handleExploreCourses = () => {
    if (onExploreCourses) {
      onExploreCourses();
      return;
    }

    console.log("Explore more courses");
  };

  const handleBrowseLearningPaths = () => {
    if (onBrowseLearningPaths) {
      onBrowseLearningPaths();
      return;
    }

    console.log("Browse learning paths");
  };

  return (
    <section className="certificates-closing">
      <div className="certificates-closing__background-glow certificates-closing__background-glow--one" />
      <div className="certificates-closing__background-glow certificates-closing__background-glow--two" />

      <div className="certificates-closing__inner">
        {/* =========================================================
            TOP: HEADING + DARK SHOWCASE CARD
        ========================================================= */}
        <div className="certificates-closing__top">
          {/* ---------------------------------------------------
              LEFT CONTENT
          --------------------------------------------------- */}
          <div className="closing-content">
            <div className="closing-eyebrow">
              <span className="closing-eyebrow__icon">
                <FiArrowRight aria-hidden="true" />
              </span>
              <span className="closing-eyebrow__text">Keep Growing</span>
            </div>

            <h2 className="closing-content__title">
              Your Learning Journey Continues
            </h2>

            <p className="closing-content__description">
              Each certificate is a milestone, but there&apos;s so much more to
              achieve. Explore new courses, gain in-demand skills, and keep
              building the best version of yourself.
            </p>

            <div className="closing-actions">
              <button
                type="button"
                className="closing-button closing-button--primary"
                onClick={handleExploreCourses}
              >
                <span className="closing-button__icon">
                  <FiBookOpen aria-hidden="true" />
                </span>
                <span className="closing-button__text">
                  Explore More Courses
                </span>
                <span className="closing-button__arrow">
                  <FiChevronRight aria-hidden="true" />
                </span>
              </button>

              <button
                type="button"
                className="closing-button closing-button--secondary"
                onClick={handleBrowseLearningPaths}
              >
                <span className="closing-button__icon">
                  <FiCompass aria-hidden="true" />
                </span>
                <span className="closing-button__text">
                  Browse Learning Paths
                </span>
                <span className="closing-button__arrow">
                  <FiChevronRight aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------
              RIGHT DARK SHOWCASE
          --------------------------------------------------- */}
          <div className="closing-showcase">
            <div className="closing-showcase__glow closing-showcase__glow--one" />
            <div className="closing-showcase__glow closing-showcase__glow--two" />

            <div className="closing-showcase__top">
              <span className="closing-showcase__trophy">
                <FiAward aria-hidden="true" />
              </span>

              <span className="closing-showcase__script">
                Better Skills
                <br />
                Brighter Future
              </span>
            </div>

            <div className="closing-showcase__body">
              <span className="closing-showcase__eyebrow">
                A Brighter Tomorrow
              </span>

              <h3 className="closing-showcase__title">
                Knowledge has no limits
              </h3>

              <p className="closing-showcase__quote">
                &ldquo;Every certificate is a step towards a brighter, more
                resilient you.&rdquo;
              </p>
            </div>

            <div className="closing-showcase__footer">
              Keep Learning &bull; Keep Achieving
            </div>

            {/* CSS graduation-cap + books illustration */}
            <div className="grad-illustration" aria-hidden="true">
              <div className="grad-illustration__book grad-illustration__book--bottom" />
              <div className="grad-illustration__book grad-illustration__book--middle" />
              <div className="grad-illustration__book grad-illustration__book--top" />

              <div className="grad-cap">
                <div className="grad-cap__board" />
                <div className="grad-cap__button" />
                <div className="grad-cap__tassel" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            STAT CARDS
        ========================================================= */}
        <div className="closing-stats">
          <article className="closing-stat closing-stat--blue">
            <div className="closing-stat__icon">
              <FiBarChart2 aria-hidden="true" />
            </div>
            <div className="closing-stat__content">
              <strong className="closing-stat__number">
                {certificatesEarned}
              </strong>
              <span className="closing-stat__label">Certificates Earned</span>
              <span className="closing-stat__helper">Keep going!</span>
            </div>
          </article>

          <article className="closing-stat closing-stat--green">
            <div className="closing-stat__icon">
              <FiShield aria-hidden="true" />
            </div>
            <div className="closing-stat__content">
              <strong className="closing-stat__number">
                {verifiedCertificates}
              </strong>
              <span className="closing-stat__label">Verified Certificates</span>
              <span className="closing-stat__helper">Globally recognized</span>
            </div>
          </article>

          <article className="closing-stat closing-stat--amber">
            <div className="closing-stat__icon">
              <FiStar aria-hidden="true" />
            </div>
            <div className="closing-stat__content">
              <strong className="closing-stat__number">{averageScore}%</strong>
              <span className="closing-stat__label">Average Score</span>
              <span className="closing-stat__helper">Across all courses</span>
            </div>
          </article>

          <article className="closing-stat closing-stat--purple">
            <div className="closing-stat__icon">
              <FiClock aria-hidden="true" />
            </div>
            <div className="closing-stat__content">
              <strong className="closing-stat__number">{learningHours}+</strong>
              <span className="closing-stat__label">Learning Hours</span>
              <span className="closing-stat__helper">Time well invested</span>
            </div>
          </article>
        </div>

        {/* =========================================================
            FOUR FEATURE ITEMS
        ========================================================= */}
        <div className="closing-features">
          <div className="closing-feature">
            <div className="closing-feature__icon closing-feature__icon--rose">
              <FiSend aria-hidden="true" />
            </div>
            <div className="closing-feature__content">
              <strong>Discover More</strong>
              <span>Explore new courses and trending skills.</span>
            </div>
          </div>

          <div className="closing-feature">
            <div className="closing-feature__icon closing-feature__icon--blue">
              <FiUser aria-hidden="true" />
            </div>
            <div className="closing-feature__content">
              <strong>Build Your Career</strong>
              <span>Add more certifications to your professional profile.</span>
            </div>
          </div>

          <div className="closing-feature">
            <div className="closing-feature__icon closing-feature__icon--green">
              <FiGlobe aria-hidden="true" />
            </div>
            <div className="closing-feature__content">
              <strong>Get Recognized</strong>
              <span>Showcase your achievements to the world.</span>
            </div>
          </div>

          <div className="closing-feature">
            <div className="closing-feature__icon closing-feature__icon--purple">
              <FiUsers aria-hidden="true" />
            </div>
            <div className="closing-feature__content">
              <strong>Join a Growing Community</strong>
              <span>Learn, share, and grow with fellow learners.</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            CLOSING QUOTE
        ========================================================= */}
        <div className="closing-quote">
          <span className="closing-quote__mark closing-quote__mark--open">
            &ldquo;
          </span>
          <span className="closing-quote__text">
            Small steps today, extraordinary opportunities tomorrow.
          </span>
          <span className="closing-quote__mark closing-quote__mark--close">
            &rdquo;
          </span>
        </div>
      </div>
    </section>
  );
};

export default CertificatesClosing;
