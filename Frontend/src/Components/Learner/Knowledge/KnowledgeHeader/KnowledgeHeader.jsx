// src/Components/Learner/Knowledge/KnowledgeHeader/KnowledgeHeader.jsx

import React from "react";

import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiCompass,
  FiFileText,
  FiLayers,
  FiSearch,
  FiTrendingUp,
} from "react-icons/fi";

import "./KnowledgeHeader.css";

/* =========================================================
   KNOWLEDGE HEADER
   Capacity Connect — Learner Knowledge Hub

   DESIGN:
   ✓ Light-theme dominant
   ✓ Local button / badge styling
   ✓ No reusable Card / Badge / Button
   ✓ Mint knowledge visual
   ✓ Glassmorphism
   ✓ Decorative orbits
   ✓ Responsive
   ✓ No horizontal overflow
   ✓ Explicit SVG sizing
========================================================= */

const KnowledgeHeader = ({ onExploreRecommendations }) => {
  const handleExploreRecommendations = () => {
    if (typeof onExploreRecommendations === "function") {
      onExploreRecommendations();
      return;
    }

    console.log("Explore recommendations");
  };

  return (
    <section className="knowledge-header">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="knowledge-header__background-glow knowledge-header__background-glow--one"
        aria-hidden="true"
      />

      <div
        className="knowledge-header__background-glow knowledge-header__background-glow--two"
        aria-hidden="true"
      />

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="knowledge-header__main">
        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="knowledge-header__content">
          {/* Eyebrow */}
          <div className="knowledge-header__eyebrow">
            <span className="knowledge-header__eyebrow-icon">
              <FiCompass />
            </span>

            <span>KNOWLEDGE HUB</span>
          </div>

          {/* Heading */}
          <h1 className="knowledge-header__title">
            Search. Learn. Grow.
            <span>All in One Place.</span>
          </h1>

          {/* Description */}
          <p className="knowledge-header__description">
            Discover expert articles, guides, and research to build your skills,
            solve challenges, and stay ahead in your learning journey.
          </p>

          {/* Quick information */}
          <div className="knowledge-header__highlights">
            <div className="knowledge-header__highlight">
              <span className="knowledge-header__highlight-icon knowledge-header__highlight-icon--blue">
                <FiBookOpen />
              </span>

              <span>Expert resources</span>
            </div>

            <div className="knowledge-header__highlight">
              <span className="knowledge-header__highlight-icon knowledge-header__highlight-icon--green">
                <FiCheckCircle />
              </span>

              <span>Curated for learners</span>
            </div>

            <div className="knowledge-header__highlight">
              <span className="knowledge-header__highlight-icon knowledge-header__highlight-icon--purple">
                <FiTrendingUp />
              </span>

              <span>Grow continuously</span>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            className="knowledge-header__button"
            onClick={handleExploreRecommendations}
          >
            <span>Explore Recommendations</span>

            <span className="knowledge-header__button-icon">
              <FiArrowRight />
            </span>
          </button>
        </div>

        {/* ===================================================
            RIGHT VISUAL
        =================================================== */}

        <div className="knowledge-header__visual">
          {/* Decorative layers */}
          <div className="knowledge-header__visual-glow" aria-hidden="true" />

          <div
            className="knowledge-header__visual-ring knowledge-header__visual-ring--outer"
            aria-hidden="true"
          />

          <div
            className="knowledge-header__visual-ring knowledge-header__visual-ring--middle"
            aria-hidden="true"
          />

          <div
            className="knowledge-header__visual-ring knowledge-header__visual-ring--inner"
            aria-hidden="true"
          />

          {/* Floating resource cards */}
          <div className="knowledge-header__floating-card knowledge-header__floating-card--articles">
            <span className="knowledge-header__floating-icon knowledge-header__floating-icon--blue">
              <FiFileText />
            </span>

            <span>Articles</span>
          </div>

          <div className="knowledge-header__floating-card knowledge-header__floating-card--guides">
            <span className="knowledge-header__floating-icon knowledge-header__floating-icon--green">
              <FiBookOpen />
            </span>

            <span>Guides</span>
          </div>

          <div className="knowledge-header__floating-card knowledge-header__floating-card--research">
            <span className="knowledge-header__floating-icon knowledge-header__floating-icon--purple">
              <FiLayers />
            </span>

            <span>Research</span>
          </div>

          {/* Center visual */}
          <div className="knowledge-header__visual-center">
            <div className="knowledge-header__visual-center-icon">
              <FiSearch />
            </div>
          </div>

          {/* Bottom visual text */}
          <div className="knowledge-header__visual-caption">
            <span>EXPLORE • DISCOVER • GROW</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHeader;
