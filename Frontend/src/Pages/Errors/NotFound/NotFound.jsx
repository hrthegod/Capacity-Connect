import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiGrid,
  FiHeart,
  FiHelpCircle,
  FiHome,
  FiInfo,
} from "react-icons/fi";

import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  const goDashboard = () => {
    navigate("/learner/dashboard");
  };

  const helpfulLinks = [
    {
      id: 1,
      title: "Dashboard",
      description: "Go to your main dashboard",
      icon: <FiHome />,
      className: "blue",
      action: goDashboard,
    },
    {
      id: 2,
      title: "My Learning",
      description: "Continue your learning journey",
      icon: <FiBookOpen />,
      className: "green",
      action: () => navigate("/learner/learning"),
    },
    {
      id: 3,
      title: "Course Catalog",
      description: "Explore new courses",
      icon: <FiGrid />,
      className: "purple",
      action: () => navigate("/learner/courses"),
    },
    {
      id: 4,
      title: "Help & Support",
      description: "Get assistance",
      icon: <FiHelpCircle />,
      className: "orange",
      action: () => {
        window.dispatchEvent(new CustomEvent("open-support"));
      },
    },
  ];

  return (
    <div className="not-found-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="not-found-header">
        <button
          type="button"
          className="not-found-brand"
          onClick={goHome}
          aria-label="Go to Capacity Connect home"
        >
          <span className="not-found-brand-logo">CC</span>

          <span className="not-found-brand-content">
            <span className="not-found-brand-title">
              Capacity <span>Connect</span>
            </span>

            <span className="not-found-brand-tagline">
              Learn&nbsp;&nbsp;·&nbsp;&nbsp;Grow&nbsp;&nbsp;·&nbsp;&nbsp;Advance
            </span>
          </span>
        </button>

        <button
          type="button"
          className="not-found-home-button"
          onClick={goHome}
        >
          <FiHome />

          <span>Go to Home</span>

          <FiArrowRight />
        </button>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="not-found-main">
        {/* Decorative background */}
        <div className="not-found-orb not-found-orb-one" />
        <div className="not-found-orb not-found-orb-two" />
        <div className="not-found-orb not-found-orb-three" />

        <div className="not-found-container">
          {/* =================================================
              HERO
          ================================================= */}

          <section className="not-found-hero">
            {/* LEFT CONTENT */}
            <div className="not-found-content">
              <button
                type="button"
                className="not-found-back-link"
                onClick={goBack}
              >
                <FiArrowLeft />

                <span>Page Not Found</span>
              </button>

              <div className="not-found-number">
                <span>4</span>

                <div className="not-found-zero">
                  <FiHelpCircle />
                </div>

                <span>4</span>
              </div>

              <h1>Oops! Page not found</h1>

              <p className="not-found-description">
                The page you’re looking for doesn’t exist or has been moved to a
                different location.
              </p>

              <div className="not-found-actions">
                <button
                  type="button"
                  className="not-found-primary-button"
                  onClick={goDashboard}
                >
                  <FiHome />

                  <span>Go to Dashboard</span>

                  <FiArrowRight />
                </button>

                <button
                  type="button"
                  className="not-found-secondary-button"
                  onClick={goBack}
                >
                  <FiArrowLeft />

                  <span>Go Back</span>
                </button>
              </div>
            </div>

            {/* RIGHT ILLUSTRATION */}
            <div className="not-found-visual">
              <div className="not-found-visual-glow" />

              <div className="not-found-question-bubble">?</div>

              <div className="not-found-signpost">
                <div className="not-found-sign sign-one">This way?</div>

                <div className="not-found-sign sign-two">Not here!</div>

                <div className="not-found-sign sign-three">Try Dashboard</div>

                <div className="not-found-post" />
              </div>

              {/* CSS illustration */}
              <div className="not-found-astronaut">
                <div className="astronaut-head">
                  <div className="astronaut-glass">
                    <span />
                    <span />
                  </div>
                </div>

                <div className="astronaut-body">
                  <div className="astronaut-logo">CC</div>
                </div>

                <div className="astronaut-arm astronaut-arm-left" />
                <div className="astronaut-arm astronaut-arm-right" />

                <div className="astronaut-leg astronaut-leg-left" />
                <div className="astronaut-leg astronaut-leg-right" />
              </div>

              <div className="not-found-ground">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="not-found-note">
                <span>Every learner finds</span>

                <strong>the right path!</strong>

                <div className="note-arrow">↙</div>
              </div>
            </div>
          </section>

          {/* =================================================
              LOWER CONTENT
          ================================================= */}

          <section className="not-found-lower">
            {/* =================================================
                HELPFUL LINKS
            ================================================= */}

            <div className="not-found-links-card">
              <div className="links-card-heading">
                <div className="links-heading-icon">
                  <FiGrid />
                </div>

                <p>
                  Here are some <strong>helpful links:</strong>
                </p>
              </div>

              <div className="helpful-links-grid">
                {helpfulLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className={`helpful-link-card ${link.className}`}
                    onClick={link.action}
                  >
                    <div className="helpful-link-top">
                      <div className="helpful-link-icon">{link.icon}</div>

                      <FiArrowRight className="helpful-link-arrow" />
                    </div>

                    <div className="helpful-link-text">
                      <h3>{link.title}</h3>

                      <p>{link.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                SUPPORT CARD
            ================================================= */}

            <aside className="not-found-support-card">
              <div className="support-decoration support-decoration-one" />
              <div className="support-decoration support-decoration-two" />

              <div className="support-icon">
                <FiInfo />
              </div>

              <div className="support-content">
                <h2>Need Help?</h2>

                <p>
                  If you believe this is a mistake or need further assistance,
                  feel free to contact our support team.
                </p>

                <button
                  type="button"
                  className="support-button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("open-support"));
                  }}
                >
                  <span>Contact Support</span>

                  <FiArrowRight />
                </button>
              </div>
            </aside>
          </section>

          {/* =================================================
              FOOTER MESSAGE
          ================================================= */}

          <div className="not-found-footer-message">
            <span className="footer-line" />

            <div className="footer-message-content">
              <FiHeart />

              <span>Let's get you back on track</span>
            </div>

            <span className="footer-line" />
          </div>

          <div className="not-found-footer-brand">
            <span className="footer-brand-line" />

            <span>Capacity Connect</span>

            <span className="footer-brand-line" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
