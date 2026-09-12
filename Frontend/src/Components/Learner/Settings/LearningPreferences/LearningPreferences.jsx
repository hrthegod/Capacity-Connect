import React, { useState } from "react";
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiGlobe,
  FiHeadphones,
  FiInfo,
  FiLayers,
  FiHeart,
  FiMonitor,
  FiPlay,
  FiRefreshCw,
  FiSettings,
  FiSliders,
  FiTarget,
  FiUsers,
  FiZap,
  FiFileText,
} from "react-icons/fi";

import "./LearningPreferences.css";

const LearningPreferences = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [preferences, setPreferences] = useState({
    learningMode: "self-paced",
    learningFormat: "video",
    difficulty: "intermediate",
    pace: "balanced",
    language: "English",
    dailyGoal: "30",
    recommendations: true,
    captions: true,
    autoplay: false,
    reducedMotion: false,
    highContrast: false,
  });

  const [message, setMessage] = useState("");

  /* =========================================================
     HELPERS
  ========================================================= */

  const showMessage = (text) => {
    setMessage(text);

    window.clearTimeout(window.__learningPreferenceTimer);

    window.__learningPreferenceTimer = window.setTimeout(() => {
      setMessage("");
    }, 2200);
  };

  const updatePreference = (key, value, label) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: value,
    }));

    if (label) {
      showMessage(`${label} selected`);
    }
  };

  const togglePreference = (key, label) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));

    showMessage(`${label} ${preferences[key] ? "disabled" : "enabled"}`);
  };

  /* =========================================================
     OPTION CARD
  ========================================================= */

  const OptionCard = ({
    value,
    currentValue,
    onChange,
    icon,
    title,
    description,
    iconClass = "blue",
  }) => {
    const active = currentValue === value;

    return (
      <button
        type="button"
        className={`learning-option ${active ? "learning-option--active" : ""}`}
        onClick={() => onChange(value, title)}
        aria-pressed={active}
      >
        <div
          className={`learning-option__icon learning-option__icon--${iconClass}`}
        >
          {icon}
        </div>

        <span className="learning-option__radio">{active && <FiCheck />}</span>

        <div className="learning-option__content">
          <strong>{title}</strong>
          <span>{description}</span>
        </div>
      </button>
    );
  };

  /* =========================================================
     TOGGLE
  ========================================================= */

  const PreferenceToggle = ({
    stateKey,
    title,
    description,
    icon,
    iconClass = "blue",
  }) => {
    const enabled = preferences[stateKey];

    return (
      <div
        className={`learning-toggle-row ${
          enabled ? "learning-toggle-row--active" : ""
        }`}
      >
        <div
          className={`learning-toggle-row__icon learning-toggle-row__icon--${iconClass}`}
        >
          {icon}
        </div>

        <div className="learning-toggle-row__content">
          <strong>{title}</strong>
          <span>{description}</span>
        </div>

        <button
          type="button"
          className={`learning-switch ${
            enabled ? "learning-switch--active" : ""
          }`}
          onClick={() => togglePreference(stateKey, title)}
          aria-label={`Toggle ${title}`}
          aria-pressed={enabled}
        >
          <span />
        </button>
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="learning-preferences">
      {/* =====================================================
          TOP INTRO
      ===================================================== */}

      <header className="learning-preferences__top">
        <div className="learning-preferences__title-wrap">
          <div className="learning-preferences__title-icon">
            <FiSettings />
          </div>

          <div>
            <h1>Learning Preferences</h1>

            <p>
              Personalize your learning experience to make it more effective and
              enjoyable.
            </p>
          </div>
        </div>

        <div className="learning-preferences__tip">
          <div className="learning-preferences__tip-icon">
            <FiZap />
          </div>

          <div>
            <strong>Your learning, your way</strong>
            <span>Customize how you learn best.</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          FIRST ROW
      ===================================================== */}

      <div className="learning-preferences__main-grid">
        {/* ===================================================
            DARK FEATURE CARD
        =================================================== */}

        <article className="learning-journey-card">
          <div className="learning-journey-card__circle learning-journey-card__circle--one" />
          <div className="learning-journey-card__circle learning-journey-card__circle--two" />
          <div className="learning-journey-card__circle learning-journey-card__circle--three" />

          <div className="learning-journey-card__badge">
            <FiSliders />
          </div>

          <div className="learning-journey-card__visual">
            <div className="learning-journey-card__visual-ring">
              <div className="learning-journey-card__visual-inner">
                <FiBookOpen />
              </div>
            </div>

            <span className="learning-floating-icon learning-floating-icon--green">
              <FiSettings />
            </span>

            <span className="learning-floating-icon learning-floating-icon--blue">
              <FiClock />
            </span>

            <span className="learning-floating-icon learning-floating-icon--purple">
              <FiBarChart2 />
            </span>
          </div>

          <div className="learning-journey-card__content">
            <span className="learning-journey-card__eyebrow">
              LEARNING EXPERIENCE
            </span>

            <h2>
              Shape your
              <br />
              learning journey
            </h2>

            <p>
              Set your preferences to get a personalized and effective learning
              experience.
            </p>
          </div>

          <div className="learning-journey-card__features">
            <div>
              <span className="learning-feature-icon learning-feature-icon--green">
                <FiTarget />
              </span>

              <small>Learn</small>
              <strong>Your Way</strong>
            </div>

            <div>
              <span className="learning-feature-icon learning-feature-icon--blue">
                <FiClock />
              </span>

              <small>Stay</small>
              <strong>Consistent</strong>
            </div>

            <div>
              <span className="learning-feature-icon learning-feature-icon--purple">
                <FiBarChart2 />
              </span>

              <small>Achieve</small>
              <strong>More</strong>
            </div>
          </div>

          <button
            type="button"
            className="learning-journey-card__button"
            onClick={() => showMessage("Explore learning tips selected")}
          >
            <span>Explore learning tips</span>
            <FiChevronDown className="learning-journey-card__arrow" />
          </button>
        </article>

        {/* ===================================================
            LEARNING MODE
        =================================================== */}

        <article className="learning-preference-card learning-preference-card--blue">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--blue">
              <FiBookOpen />
            </div>

            <div>
              <h2>Learning Mode</h2>
              <p>Choose how you prefer to learn.</p>
            </div>
          </div>

          <div className="learning-options learning-options--three">
            <OptionCard
              value="self-paced"
              currentValue={preferences.learningMode}
              onChange={(value, title) =>
                updatePreference("learningMode", value, title)
              }
              icon={<FiUserIcon />}
              title="Self-paced"
              description="Learn at your own pace"
              iconClass="blue"
            />

            <OptionCard
              value="instructor-led"
              currentValue={preferences.learningMode}
              onChange={(value, title) =>
                updatePreference("learningMode", value, title)
              }
              icon={<FiUsers />}
              title="Instructor-led"
              description="Learn with expert guidance"
              iconClass="indigo"
            />

            <OptionCard
              value="blended"
              currentValue={preferences.learningMode}
              onChange={(value, title) =>
                updatePreference("learningMode", value, title)
              }
              icon={<FiMonitor />}
              title="Blended"
              description="Combine both formats"
              iconClass="navy"
            />
          </div>
        </article>

        {/* ===================================================
            PREFERRED FORMAT
        =================================================== */}

        <article className="learning-preference-card learning-preference-card--pink">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--pink">
              <FiLayers />
            </div>

            <div>
              <h2>Preferred Learning Format</h2>
              <p>Select the content formats you enjoy most.</p>
            </div>
          </div>

          <div className="learning-options learning-options--four">
            <OptionCard
              value="video"
              currentValue={preferences.learningFormat}
              onChange={(value, title) =>
                updatePreference("learningFormat", value, title)
              }
              icon={<FiPlay />}
              title="Video"
              description="Watch & learn"
              iconClass="blue"
            />

            <OptionCard
              value="reading"
              currentValue={preferences.learningFormat}
              onChange={(value, title) =>
                updatePreference("learningFormat", value, title)
              }
              icon={<FiFileIcon />}
              title="Reading"
              description="Read content"
              iconClass="green"
            />

            <OptionCard
              value="interactive"
              currentValue={preferences.learningFormat}
              onChange={(value, title) =>
                updatePreference("learningFormat", value, title)
              }
              icon={<FiSliders />}
              title="Interactive"
              description="Engage & practice"
              iconClass="orange"
            />

            <OptionCard
              value="hands-on"
              currentValue={preferences.learningFormat}
              onChange={(value, title) =>
                updatePreference("learningFormat", value, title)
              }
              icon={<FiZap />}
              title="Hands-on"
              description="Practical learning"
              iconClass="pink"
            />
          </div>
        </article>
      </div>

      {/* =====================================================
          SECOND ROW
      ===================================================== */}

      <div className="learning-preferences__secondary-grid">
        {/* ===================================================
            DIFFICULTY
        =================================================== */}

        <article className="learning-preference-card learning-preference-card--orange">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--orange">
              <FiBarChart2 />
            </div>

            <div>
              <h2>Content Difficulty</h2>
              <p>Choose your preferred difficulty level.</p>
            </div>
          </div>

          <div className="learning-options learning-options--three">
            <OptionCard
              value="beginner"
              currentValue={preferences.difficulty}
              onChange={(value, title) =>
                updatePreference("difficulty", value, title)
              }
              icon={<FiHeart />}
              title="Beginner"
              description="Just getting started"
              iconClass="green"
            />

            <OptionCard
              value="intermediate"
              currentValue={preferences.difficulty}
              onChange={(value, title) =>
                updatePreference("difficulty", value, title)
              }
              icon={<FiBarChart2 />}
              title="Intermediate"
              description="Some experience"
              iconClass="blue"
            />

            <OptionCard
              value="advanced"
              currentValue={preferences.difficulty}
              onChange={(value, title) =>
                updatePreference("difficulty", value, title)
              }
              icon={<FiAward />}
              title="Advanced"
              description="Ready for challenges"
              iconClass="orange"
            />
          </div>
        </article>

        {/* ===================================================
            LEARNING PACE
        =================================================== */}

        <article className="learning-preference-card learning-preference-card--cyan">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--cyan">
              <FiClock />
            </div>

            <div>
              <h2>Preferred Learning Pace</h2>
              <p>Set a pace that works for you.</p>
            </div>
          </div>

          <div className="learning-options learning-options--three">
            <OptionCard
              value="relaxed"
              currentValue={preferences.pace}
              onChange={(value, title) =>
                updatePreference("pace", value, title)
              }
              icon={<FiHeart />}
              title="Relaxed"
              description="Take it easy"
              iconClass="green"
            />

            <OptionCard
              value="balanced"
              currentValue={preferences.pace}
              onChange={(value, title) =>
                updatePreference("pace", value, title)
              }
              icon={<FiSliders />}
              title="Balanced"
              description="Steady progress"
              iconClass="blue"
            />

            <OptionCard
              value="intensive"
              currentValue={preferences.pace}
              onChange={(value, title) =>
                updatePreference("pace", value, title)
              }
              icon={<FiZap />}
              title="Intensive"
              description="Learn quickly"
              iconClass="pink"
            />
          </div>
        </article>
      </div>

      {/* =====================================================
          THIRD ROW
      ===================================================== */}

      <div className="learning-preferences__bottom-grid">
        {/* ===================================================
            LANGUAGE
        =================================================== */}

        <article className="learning-preference-card learning-language-card">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--blue">
              <FiGlobe />
            </div>

            <div>
              <h2>Language Preference</h2>
              <p>Choose your preferred learning language.</p>
            </div>
          </div>

          <div className="learning-language-select-wrap">
            <span className="learning-language-flag">EN</span>

            <select
              value={preferences.language}
              onChange={(event) =>
                updatePreference(
                  "language",
                  event.target.value,
                  event.target.value,
                )
              }
              aria-label="Preferred learning language"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
            </select>

            <FiChevronDown />
          </div>

          <p className="learning-language-note">
            More languages will be available soon.
          </p>
        </article>

        {/* ===================================================
            DAILY GOAL
        =================================================== */}

        <article className="learning-preference-card learning-preference-card--daily">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--pink">
              <FiTarget />
            </div>

            <div>
              <h2>Daily Learning Goal</h2>
              <p>Set a daily goal to stay consistent.</p>
            </div>
          </div>

          <div className="learning-options learning-options--four learning-options--goal">
            <OptionCard
              value="15"
              currentValue={preferences.dailyGoal}
              onChange={(value, title) =>
                updatePreference("dailyGoal", value, title)
              }
              icon={<FiClock />}
              title="15 min"
              description="A quick session"
              iconClass="blue"
            />

            <OptionCard
              value="30"
              currentValue={preferences.dailyGoal}
              onChange={(value, title) =>
                updatePreference("dailyGoal", value, title)
              }
              icon={<FiTarget />}
              title="30 min"
              description="Build the habit"
              iconClass="pink"
            />

            <OptionCard
              value="45"
              currentValue={preferences.dailyGoal}
              onChange={(value, title) =>
                updatePreference("dailyGoal", value, title)
              }
              icon={<FiClock />}
              title="45 min"
              description="Go deeper"
              iconClass="purple"
            />

            <OptionCard
              value="60"
              currentValue={preferences.dailyGoal}
              onChange={(value, title) =>
                updatePreference("dailyGoal", value, title)
              }
              icon={<FiZap />}
              title="60+ min"
              description="For faster progress"
              iconClass="orange"
            />
          </div>
        </article>

        {/* ===================================================
            RECOMMENDATIONS
        =================================================== */}

        <article className="learning-preference-card learning-recommendation-card">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--yellow">
              <FiTarget />
            </div>

            <div>
              <h2>Personalized Recommendations</h2>
              <p>Get course and content suggestions based on your activity.</p>
            </div>
          </div>

          <PreferenceToggle
            stateKey="recommendations"
            title="Enable recommendations"
            description="Receive personalized course suggestions, learning paths and content."
            icon={<FiAward />}
            iconClass="green"
          />
        </article>
      </div>

      {/* =====================================================
          ACCESSIBILITY
      ===================================================== */}

      <div className="learning-accessibility-layout">
        <article className="learning-accessibility-card">
          <div className="learning-card-heading">
            <div className="learning-card-heading__icon learning-card-heading__icon--blue">
              <FiSettings />
            </div>

            <div>
              <h2>Accessibility &amp; Learning Experience</h2>
              <p>Customize your learning environment.</p>
            </div>
          </div>

          <div className="learning-accessibility-options">
            <PreferenceToggle
              stateKey="captions"
              title="Closed captions"
              description="Show captions in videos"
              icon={<FiHeadphones />}
              iconClass="blue"
            />

            <PreferenceToggle
              stateKey="autoplay"
              title="Auto-play videos"
              description="Automatically play next video"
              icon={<FiPlay />}
              iconClass="purple"
            />

            <PreferenceToggle
              stateKey="reducedMotion"
              title="Reduce motion"
              description="Minimize animations"
              icon={<FiRefreshCw />}
              iconClass="green"
            />

            <PreferenceToggle
              stateKey="highContrast"
              title="High contrast"
              description="Improve visibility"
              icon={<FiInfo />}
              iconClass="orange"
            />
          </div>
        </article>

        {/* ===================================================
            QUOTE CARD
        =================================================== */}

        <article className="learning-quote-card">
          <div className="learning-quote-card__glow" />

          <div className="learning-quote-card__leaf">
            <FiHeart />
          </div>

          <p>
            “A better learning
            <br />
            experience leads to
            <br />a brighter you.”
          </p>

          <span />
        </article>
      </div>

      {/* =====================================================
          TOAST
      ===================================================== */}

      {message && (
        <div className="learning-preferences__toast">
          <FiCheckCircleIcon />
          <span>{message}</span>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   SAFE LOCAL ICON HELPERS
   ========================================================= */

const FiUserIcon = () => <FiUsers />;
const FiFileIcon = () => <FiFileText />;
const FiCheckCircleIcon = () => <FiCheck />;

export default LearningPreferences;
