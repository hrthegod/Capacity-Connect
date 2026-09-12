import React, { useState } from "react";
import {
  LuArrowRight,
  LuBookOpen,
  LuBriefcaseBusiness,
  LuDownload,
  LuFileText,
  LuGraduationCap,
  LuHeart,
  LuTrophy,
  LuLightbulb,
  LuQuote,
  LuRocket,
  LuSparkles,
  LuStar,
  LuTarget,
  LuTrendingUp,
  LuUsersRound,
} from "react-icons/lu";

import "./ProfileOverview.css";

const ProfileOverview = () => {
  const [resumeMessage, setResumeMessage] = useState("");

  const handleResumeDownload = () => {
    setResumeMessage("Resume download started.");

    const resumeContent = `
Trainer Profile
Capacity Connect

Professional Overview
Frontend Trainer and Technical Educator

Specialization
Frontend Development
UI/UX Design
Web Technologies
Teaching & Mentorship
Open Source
Lifelong Learning
`;

    const blob = new Blob([resumeContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "trainer-profile.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    window.setTimeout(() => {
      setResumeMessage("");
    }, 2500);
  };

  const handleJourneyClick = () => {
    setResumeMessage("Full professional journey opened.");

    window.dispatchEvent(new CustomEvent("trainer-profile-journey-open"));

    window.setTimeout(() => {
      setResumeMessage("");
    }, 2500);
  };

  const handleAboutAction = () => {
    setResumeMessage("About section selected.");

    window.dispatchEvent(new CustomEvent("trainer-profile-about-open"));

    window.setTimeout(() => {
      setResumeMessage("");
    }, 2500);
  };

  const handlePhilosophyAction = () => {
    setResumeMessage("Teaching philosophy selected.");

    window.dispatchEvent(new CustomEvent("trainer-profile-philosophy-open"));

    window.setTimeout(() => {
      setResumeMessage("");
    }, 2500);
  };

  const handleFocusAction = () => {
    setResumeMessage("Current learning focus selected.");

    window.dispatchEvent(new CustomEvent("trainer-profile-focus-open"));

    window.setTimeout(() => {
      setResumeMessage("");
    }, 2500);
  };

  return (
    <section className="profile-overview">
      <div className="profile-overview-shell">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <header className="profile-overview-header">
          <div className="profile-overview-heading">
            <div className="profile-overview-heading-icon">
              <LuUsersRound size={20} strokeWidth={1.8} />
            </div>

            <div>
              <span className="profile-overview-eyebrow">
                PROFESSIONAL PROFILE
              </span>

              <h2>About &amp; Professional Overview</h2>
            </div>
          </div>

          <div className="profile-overview-header-quote">
            <LuQuote size={19} strokeWidth={1.7} />

            <span>
              Teaching is not just a profession, it&apos;s a way to create
              opportunities.
            </span>
          </div>
        </header>

        {/* =====================================================
            MAIN CONTENT GRID
        ====================================================== */}

        <div className="profile-overview-grid">
          {/* ===================================================
              ABOUT ME
          ==================================================== */}

          <article className="profile-overview-card profile-about-card">
            <div className="profile-card-top">
              <div className="profile-card-icon profile-card-icon-blue">
                <LuBookOpen size={20} strokeWidth={1.8} />
              </div>

              <div className="profile-card-heading">
                <span>ABOUT</span>

                <h3>About Me</h3>
              </div>

              <button
                type="button"
                className="profile-card-action profile-card-action-blue"
                onClick={handleAboutAction}
              >
                <span>Get to know me</span>

                <LuArrowRight size={15} strokeWidth={1.8} />
              </button>
            </div>

            <div className="profile-card-content">
              <p>
                I&apos;m a passionate Frontend Trainer and technical educator
                focused on helping learners build practical and industry-ready
                skills.
              </p>

              <p>
                I enjoy simplifying complex concepts and turning them into
                interactive learning experiences through hands-on projects,
                practical guidance, and continuous feedback.
              </p>

              <p>
                My goal is to create a supportive learning environment where
                every learner feels confident, motivated, and ready to grow.
              </p>
            </div>

            <div className="profile-card-glow profile-card-glow-blue" />
          </article>

          {/* ===================================================
              TEACHING PHILOSOPHY
          ==================================================== */}

          <article className="profile-overview-card profile-philosophy-card">
            <div className="profile-card-top">
              <div className="profile-card-icon profile-card-icon-rose">
                <LuHeart size={20} strokeWidth={1.8} />
              </div>

              <div className="profile-card-heading">
                <span>APPROACH</span>

                <h3>Teaching Philosophy</h3>
              </div>

              <button
                type="button"
                className="profile-card-action profile-card-action-rose"
                onClick={handlePhilosophyAction}
              >
                <span>What I believe</span>

                <LuHeart size={14} strokeWidth={1.8} />
              </button>
            </div>

            <div className="profile-card-content">
              <p>
                I believe in learning by doing. My approach focuses on practical
                learning, real-world projects, and meaningful feedback.
              </p>

              <p>
                Every session should be interactive, engaging, and
                learner-centered so that concepts are not simply memorized but
                genuinely understood and applied.
              </p>
            </div>

            <div className="profile-card-glow profile-card-glow-rose" />
          </article>

          {/* ===================================================
              CURRENT FOCUS
          ==================================================== */}

          <article className="profile-overview-card profile-focus-card">
            <div className="profile-card-top">
              <div className="profile-card-icon profile-card-icon-mint">
                <LuTarget size={20} strokeWidth={1.8} />
              </div>

              <div className="profile-card-heading">
                <span>LEARNING NOW</span>

                <h3>Current Focus</h3>
              </div>

              <button
                type="button"
                className="profile-card-action profile-card-action-mint"
                onClick={handleFocusAction}
              >
                <span>Always learning</span>

                <LuTrendingUp size={14} strokeWidth={1.8} />
              </button>
            </div>

            <div className="profile-focus-content">
              <p>
                Currently focusing on modern frontend technologies, UI/UX best
                practices, and helping learners create portfolio-ready projects.
              </p>

              <div className="profile-focus-items">
                <span>
                  <LuSparkles size={14} strokeWidth={1.8} />
                  Modern Frontend
                </span>

                <span>
                  <LuRocket size={14} strokeWidth={1.8} />
                  Practical Projects
                </span>

                <span>
                  <LuLightbulb size={14} strokeWidth={1.8} />
                  Better Learning
                </span>
              </div>
            </div>

            <div className="profile-card-glow profile-card-glow-mint" />
          </article>

          {/* ===================================================
              PROFESSIONAL JOURNEY — DARK CARD
          ==================================================== */}

          <article className="profile-overview-card profile-journey-card">
            <div className="profile-journey-pattern" />

            <div className="profile-card-top profile-journey-top">
              <div className="profile-card-icon profile-card-icon-dark">
                <LuGraduationCap size={21} strokeWidth={1.8} />
              </div>

              <div className="profile-card-heading">
                <span>EXPERIENCE</span>

                <h3>My Journey</h3>
              </div>
            </div>

            <p className="profile-journey-description">
              Continuous growth, better learning experiences, and a commitment
              to helping learners move forward.
            </p>

            <div className="profile-journey-timeline">
              <div className="profile-journey-line" />

              <div className="profile-journey-item">
                <div className="profile-journey-point profile-journey-point-blue">
                  <LuGraduationCap size={17} strokeWidth={1.8} />
                </div>

                <strong>2019</strong>

                <span>
                  Started
                  <br />
                  Teaching
                </span>
              </div>

              <div className="profile-journey-item">
                <div className="profile-journey-point profile-journey-point-purple">
                  <LuBriefcaseBusiness size={17} strokeWidth={1.8} />
                </div>

                <strong>2022</strong>

                <span>
                  Trained
                  <br />
                  500+ Learners
                </span>
              </div>

              <div className="profile-journey-item">
                <div className="profile-journey-point profile-journey-point-gold">
                  <LuStar size={17} strokeWidth={1.8} />
                </div>

                <strong>2024</strong>

                <span>
                  Expanded to
                  <br />
                  Advanced Topics
                </span>
              </div>
            </div>

            <button
              type="button"
              className="profile-journey-button"
              onClick={handleJourneyClick}
            >
              <span>View Full Journey</span>

              <LuArrowRight size={17} strokeWidth={1.8} />
            </button>
          </article>

          {/* ===================================================
              QUOTE
          ==================================================== */}

          <article className="profile-overview-card profile-quote-card">
            <div className="profile-card-icon profile-card-icon-purple">
              <LuQuote size={21} strokeWidth={1.8} />
            </div>

            <div className="profile-quote-content">
              <span>A QUOTE I LIVE BY</span>

              <blockquote>
                &ldquo;The beautiful thing about learning is that no one can
                take it away from you.&rdquo;
              </blockquote>

              <cite>— B.B. King</cite>
            </div>

            <div className="profile-quote-decoration">
              <LuQuote size={78} strokeWidth={1} />
            </div>
          </article>

          {/* ===================================================
              PROFESSIONAL HIGHLIGHTS
          ==================================================== */}

          <article className="profile-overview-card profile-highlights-card">
            <div className="profile-card-top">
              <div className="profile-card-icon profile-card-icon-gold">
                <LuStar size={20} strokeWidth={1.8} />
              </div>

              <div className="profile-card-heading">
                <span>ACHIEVEMENTS</span>

                <h3>Professional Highlights</h3>
              </div>
            </div>

            <div className="profile-highlight-grid">
              <div className="profile-highlight-item">
                <div className="profile-highlight-icon profile-highlight-icon-green">
                  <LuUsersRound size={18} strokeWidth={1.8} />
                </div>

                <strong>500+</strong>

                <span>
                  Learners
                  <br />
                  Trained
                </span>
              </div>

              <div className="profile-highlight-item">
                <div className="profile-highlight-icon profile-highlight-icon-orange">
                  <LuFileText size={18} strokeWidth={1.8} />
                </div>

                <strong>30+</strong>

                <span>
                  Projects
                  <br />
                  Guided
                </span>
              </div>

              <div className="profile-highlight-item">
                <div className="profile-highlight-icon profile-highlight-icon-gold">
                  <LuTrophy size={18} strokeWidth={1.8} />
                </div>

                <strong>4.8</strong>

                <span>
                  Average
                  <br />
                  Rating
                </span>
              </div>

              <div className="profile-highlight-item">
                <div className="profile-highlight-icon profile-highlight-icon-purple">
                  <LuStar size={18} strokeWidth={1.8} />
                </div>

                <strong>5+</strong>

                <span>
                  Years of
                  <br />
                  Experience
                </span>
              </div>
            </div>
          </article>

          {/* ===================================================
              CORE INTERESTS
          ==================================================== */}

          <article className="profile-overview-card profile-interests-card">
            <div className="profile-card-top">
              <div className="profile-card-icon profile-card-icon-blue">
                <LuRocket size={20} strokeWidth={1.8} />
              </div>

              <div className="profile-card-heading">
                <span>EXPERTISE</span>

                <h3>Core Interests</h3>
              </div>
            </div>

            <div className="profile-interest-tags">
              <button type="button" className="profile-interest-tag tag-blue">
                Frontend Development
              </button>

              <button type="button" className="profile-interest-tag tag-purple">
                UI/UX Design
              </button>

              <button type="button" className="profile-interest-tag tag-green">
                Web Technologies
              </button>

              <button type="button" className="profile-interest-tag tag-orange">
                Teaching &amp; Mentorship
              </button>

              <button type="button" className="profile-interest-tag tag-rose">
                Open Source
              </button>

              <button type="button" className="profile-interest-tag tag-indigo">
                Lifelong Learning
              </button>
            </div>

            <button
              type="button"
              className="profile-resume-button"
              onClick={handleResumeDownload}
            >
              <span className="profile-resume-main">
                <LuDownload size={18} strokeWidth={1.8} />

                <span>Download Resume</span>
              </span>

              <span className="profile-resume-divider" />

              <span className="profile-resume-format">
                <LuFileText size={16} strokeWidth={1.8} />
                PDF
              </span>
            </button>
          </article>
        </div>

        {/* =====================================================
            ACTION MESSAGE
        ====================================================== */}

        {resumeMessage && (
          <div
            className="profile-overview-message"
            role="status"
            aria-live="polite"
          >
            <span className="profile-overview-message-dot" />

            <span>{resumeMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileOverview;
