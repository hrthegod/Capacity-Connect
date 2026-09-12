// src/Components/Learner/Knowledge/KnowledgeClosing/KnowledgeClosing.jsx

import React from "react";

import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiGlobe,
  FiHeart,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import "./KnowledgeClosing.css";

/* =========================================================
   KNOWLEDGE CLOSING
   Capacity Connect — Learner Knowledge Hub

   STRUCTURE:

   ┌─────────────────────────────────────────────────────┐
   │ Logo / Keep Exploring                               │
   │                                                     │
   │ Heading + Description       Quote + Ocean Visual    │
   │                                                     │
   │ [Explore] [Build] [Grow] [Impact]                  │
   │                                                     │
   │ Trusted | Real World | Sustainable | CTA           │
   └─────────────────────────────────────────────────────┘

   No reusable Button / Card / Badge components are used.
========================================================= */

const KNOWLEDGE_ACTIONS = [
  {
    id: "explore",
    title: "Explore More",
    description: "Discover new topics",
    icon: FiBookOpen,
    theme: "blue",
  },
  {
    id: "skills",
    title: "Build Skills",
    description: "Learn at your pace",
    icon: FiTrendingUp,
    theme: "green",
  },
  {
    id: "community",
    title: "Grow Together",
    description: "Join a learning community",
    icon: FiUsers,
    theme: "amber",
  },
  {
    id: "impact",
    title: "Make an Impact",
    description: "Apply knowledge in real-world challenges",
    icon: FiZap,
    theme: "purple",
  },
];

const KNOWLEDGE_VALUES = [
  {
    id: "trusted",
    title: "Trusted Knowledge",
    description: "Curated and reliable resources",
    icon: FiShield,
    theme: "blue",
  },
  {
    id: "relevance",
    title: "Real-World Relevance",
    description: "Insights for a better tomorrow",
    icon: FiGlobe,
    theme: "cyan",
  },
  {
    id: "sustainable",
    title: "Sustainable Future",
    description: "Knowledge that creates impact",
    icon: FiHeart,
    theme: "green",
  },
];

const KnowledgeClosing = ({ onExploreResources, onActionSelect }) => {
  const handleExploreResources = () => {
    if (typeof onExploreResources === "function") {
      onExploreResources();
      return;
    }

    console.log("Explore more Knowledge resources");
  };

  const handleActionSelect = (action) => {
    if (typeof onActionSelect === "function") {
      onActionSelect(action);
      return;
    }

    if (action.id === "explore") {
      handleExploreResources();
      return;
    }

    console.log("Knowledge closing action:", action.id);
  };

  return (
    <section className="knowledge-closing">
      <div className="knowledge-closing__container">
        {/* =================================================
            DECORATIVE BACKGROUND
        ================================================= */}

        <div
          className="knowledge-closing__ambient knowledge-closing__ambient--one"
          aria-hidden="true"
        />

        <div
          className="knowledge-closing__ambient knowledge-closing__ambient--two"
          aria-hidden="true"
        />

        <div
          className="knowledge-closing__wave knowledge-closing__wave--one"
          aria-hidden="true"
        />

        <div
          className="knowledge-closing__wave knowledge-closing__wave--two"
          aria-hidden="true"
        />

        {/* =================================================
            TOP CONTENT
        ================================================= */}

        <div className="knowledge-closing__top">
          {/* LEFT CONTENT */}

          <div className="knowledge-closing__content">
            <div className="knowledge-closing__brand-line">
              <span className="knowledge-closing__brand-icon">
                <FiCheckCircle />
              </span>

              <span className="knowledge-closing__brand-text">
                KEEP EXPLORING
              </span>

              <span className="knowledge-closing__brand-line-divider" />
            </div>

            <h2 className="knowledge-closing__title">
              Continue Your
              <span>Learning Journey</span>
            </h2>

            <p className="knowledge-closing__description">
              Explore new ideas, build valuable skills, and stay updated with
              knowledge that helps create a more resilient tomorrow.
            </p>
          </div>

          {/* =================================================
              RIGHT — QUOTE + OCEAN VISUAL
          ================================================= */}

          <div className="knowledge-closing__visual">
            <div className="knowledge-closing__ocean-image" aria-hidden="true">
              <div className="knowledge-closing__sky">
                <span className="knowledge-closing__sun" />
                <span className="knowledge-closing__cloud knowledge-closing__cloud--one" />
                <span className="knowledge-closing__cloud knowledge-closing__cloud--two" />
              </div>

              <div className="knowledge-closing__cliff">
                <span className="knowledge-closing__cliff-light" />
              </div>

              <div className="knowledge-closing__lighthouse">
                <span className="knowledge-closing__lighthouse-top" />
                <span className="knowledge-closing__lighthouse-body" />
                <span className="knowledge-closing__lighthouse-light" />
              </div>

              <div className="knowledge-closing__sea">
                <span className="knowledge-closing__sea-line knowledge-closing__sea-line--one" />
                <span className="knowledge-closing__sea-line knowledge-closing__sea-line--two" />
                <span className="knowledge-closing__sea-line knowledge-closing__sea-line--three" />
              </div>

              <span className="knowledge-closing__bird knowledge-closing__bird--one">
                •
              </span>

              <span className="knowledge-closing__bird knowledge-closing__bird--two">
                •
              </span>
            </div>

            {/* Quote glass */}
            <div className="knowledge-closing__quote">
              <span className="knowledge-closing__quote-mark">“</span>

              <p>A more informed tomorrow starts with what you learn today.</p>

              <span className="knowledge-closing__quote-line" />

              <span className="knowledge-closing__quote-author">
                — Capacity Connect
              </span>
            </div>

            <div className="knowledge-closing__visual-message">
              <span>Knowledge</span>
              <span>for a Safer,</span>
              <span>Resilient Tomorrow</span>
            </div>
          </div>
        </div>

        {/* =================================================
            FOUR LEARNING ACTION CARDS
        ================================================= */}

        <div className="knowledge-closing__actions">
          {KNOWLEDGE_ACTIONS.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                type="button"
                className={`knowledge-closing__action knowledge-closing__action--${action.theme}`}
                onClick={() => handleActionSelect(action)}
              >
                <span className="knowledge-closing__action-icon">
                  <Icon />
                </span>

                <span className="knowledge-closing__action-content">
                  <span className="knowledge-closing__action-title">
                    {action.title}
                  </span>

                  <span className="knowledge-closing__action-description">
                    {action.description}
                  </span>
                </span>

                <span className="knowledge-closing__action-arrow">
                  <FiArrowRight />
                </span>
              </button>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM VALUE STRIP
        ================================================= */}

        <div className="knowledge-closing__bottom">
          <div className="knowledge-closing__values">
            {KNOWLEDGE_VALUES.map((value, index) => {
              const Icon = value.icon;

              return (
                <React.Fragment key={value.id}>
                  <div
                    className={`knowledge-closing__value knowledge-closing__value--${value.theme}`}
                  >
                    <span className="knowledge-closing__value-icon">
                      <Icon />
                    </span>

                    <span className="knowledge-closing__value-content">
                      <span className="knowledge-closing__value-title">
                        {value.title}
                      </span>

                      <span className="knowledge-closing__value-description">
                        {value.description}
                      </span>
                    </span>
                  </div>

                  {index < KNOWLEDGE_VALUES.length - 1 && (
                    <span
                      className="knowledge-closing__value-divider"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* =================================================
              DARK NAVY CTA
          ================================================= */}

          <button
            type="button"
            className="knowledge-closing__cta"
            onClick={handleExploreResources}
          >
            <span>Explore More Resources</span>

            <span className="knowledge-closing__cta-arrow">
              <FiArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeClosing;
