import React, { useState } from "react";

import {
  FiAward,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronRight,
  FiDatabase,
  FiDownload,
  FiFileText,
  FiGlobe,
  FiLink,
  FiLock,
  FiMail,
  FiShield,
  FiTrash2,
  FiUser,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";

import "./PrivacySettings.css";

const PrivacySettings = () => {
  /* =========================================================
     TOGGLE STATES
  ========================================================= */

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: false,
    privateProfile: true,

    learningActivity: true,
    achievements: true,
    completedCourses: false,

    personalizedRecommendations: true,
    learningAnalytics: true,
    thirdPartyIntegrations: false,

    emailNotifications: true,
    marketingEmails: false,
  });

  /* =========================================================
     OTHER STATES
  ========================================================= */

  const [contactPreference, setContactPreference] = useState(
    "Only instructors and platform staff",
  );

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [toast, setToast] = useState(null);

  /* =========================================================
     TOGGLE HANDLER
  ========================================================= */

  const handleToggle = (name) => {
    setPrivacySettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    const labels = {
      publicProfile: "Public profile",
      privateProfile: "Private profile",
      learningActivity: "Learning activity visibility",
      achievements: "Achievement visibility",
      completedCourses: "Completed course visibility",
      personalizedRecommendations: "Personalized recommendations",
      learningAnalytics: "Learning analytics",
      thirdPartyIntegrations: "Third-party integrations",
      emailNotifications: "Email notifications",
      marketingEmails: "Marketing emails",
    };

    showToast(
      `${labels[name]} ${!privacySettings[name] ? "enabled" : "disabled"}.`,
      "success",
    );
  };

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    window.clearTimeout(window.__privacyToastTimer);

    window.__privacyToastTimer = window.setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  /* =========================================================
     DATA ACTION
  ========================================================= */

  const handleDataAction = (action) => {
    if (action === "download") {
      showToast("Your data export request has been submitted.");
      return;
    }

    if (action === "usage") {
      showToast("Opening data usage information.");
      return;
    }

    if (action === "delete") {
      setShowPrivacyModal(true);
    }
  };

  /* =========================================================
     CONTACT PREFERENCE
  ========================================================= */

  const handleContactChange = (event) => {
    const value = event.target.value;

    setContactPreference(value);

    showToast("Communication preference updated.");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="privacy-settings">
      {/* =====================================================
          TOP GRID
      ===================================================== */}

      <div className="privacy-settings__grid">
        {/* ===================================================
            PRIVACY STATUS
        =================================================== */}

        <article className="privacy-status-card">
          <div className="privacy-status-card__background-circle" />

          <div className="privacy-status-card__header">
            <div className="privacy-status-card__shield">
              <FiShield />
            </div>

            <div>
              <span className="privacy-status-card__eyebrow">
                PRIVACY STATUS
              </span>

              <h2>Your data is protected</h2>

              <p>
                We follow industry best practices to keep your information safe.
              </p>
            </div>
          </div>

          <div className="privacy-status-card__features">
            <div className="privacy-status-feature">
              <span>
                <FiLock />
              </span>

              <div>
                <strong>Encrypted</strong>
                <small>Data</small>
              </div>
            </div>

            <div className="privacy-status-feature">
              <span>
                <FiShield />
              </span>

              <div>
                <strong>Secure</strong>
                <small>Access</small>
              </div>
            </div>

            <div className="privacy-status-feature">
              <span>
                <FiCheckCircle />
              </span>

              <div>
                <strong>Regular</strong>
                <small>Monitoring</small>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="privacy-status-card__button"
            onClick={() => setShowPrivacyModal(true)}
          >
            <span>Learn more about our privacy practices</span>

            <FiChevronRight />
          </button>
        </article>

        {/* ===================================================
            PROFILE VISIBILITY
        =================================================== */}

        <article className="privacy-panel privacy-profile-panel">
          <div className="privacy-panel__header">
            <div className="privacy-panel__heading-icon privacy-panel__heading-icon--cyan">
              <FiUser />
            </div>

            <div>
              <h2>Profile Visibility</h2>

              <p>Control who can see your profile information.</p>
            </div>
          </div>

          <div className="privacy-option-list">
            <div
              className={`privacy-option ${
                privacySettings.publicProfile ? "privacy-option--active" : ""
              }`}
            >
              <div className="privacy-option__icon privacy-option__icon--blue">
                <FiGlobe />
              </div>

              <div className="privacy-option__content">
                <strong>Public Profile</strong>

                <small>Your profile can be seen by other learners.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.publicProfile ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("publicProfile")}
                aria-label="Toggle public profile"
                aria-pressed={privacySettings.publicProfile}
              >
                <span />
              </button>
            </div>

            <div
              className={`privacy-option ${
                privacySettings.privateProfile
                  ? "privacy-option--active-blue"
                  : ""
              }`}
            >
              <div className="privacy-option__icon privacy-option__icon--blue-dark">
                <FiLock />
              </div>

              <div className="privacy-option__content">
                <strong>Private Profile</strong>

                <small>Only you can see your profile information.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.privateProfile ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("privateProfile")}
                aria-label="Toggle private profile"
                aria-pressed={privacySettings.privateProfile}
              >
                <span />
              </button>
            </div>
          </div>
        </article>

        {/* ===================================================
            LEARNING ACTIVITY
        =================================================== */}

        <article className="privacy-panel privacy-learning-panel">
          <div className="privacy-panel__header">
            <div className="privacy-panel__heading-icon privacy-panel__heading-icon--purple">
              <FiBookOpen />
            </div>

            <div>
              <h2>Learning Activity</h2>

              <p>Manage who can see your learning activity.</p>
            </div>
          </div>

          <div className="privacy-option-list">
            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--blue">
                <FiBarChart2 />
              </div>

              <div className="privacy-option__content">
                <strong>Show learning activity</strong>

                <small>Let others see what you're learning.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.learningActivity ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("learningActivity")}
                aria-label="Toggle learning activity"
                aria-pressed={privacySettings.learningActivity}
              >
                <span />
              </button>
            </div>

            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--orange">
                <FiAward />
              </div>

              <div className="privacy-option__content">
                <strong>Show achievements</strong>

                <small>Display your badges and certificates.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.achievements ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("achievements")}
                aria-label="Toggle achievements"
                aria-pressed={privacySettings.achievements}
              >
                <span />
              </button>
            </div>

            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--indigo">
                <FiBookOpen />
              </div>

              <div className="privacy-option__content">
                <strong>Show completed courses</strong>

                <small>Make your completed courses visible.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.completedCourses ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("completedCourses")}
                aria-label="Toggle completed courses"
                aria-pressed={privacySettings.completedCourses}
              >
                <span />
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* =====================================================
          SECOND GRID
      ===================================================== */}

      <div className="privacy-settings__grid privacy-settings__grid--secondary">
        {/* ===================================================
            DATA MANAGEMENT
        =================================================== */}

        <article className="privacy-panel privacy-data-panel">
          <div className="privacy-panel__header">
            <div className="privacy-panel__heading-icon privacy-panel__heading-icon--blue">
              <FiDatabase />
            </div>

            <div>
              <h2>Data Management</h2>

              <p>Manage your personal data and downloads.</p>
            </div>
          </div>

          <div className="privacy-data-list">
            <button
              type="button"
              className="privacy-data-item"
              onClick={() => handleDataAction("download")}
            >
              <span className="privacy-data-item__icon privacy-data-item__icon--blue">
                <FiDownload />
              </span>

              <span className="privacy-data-item__content">
                <strong>Download Your Data</strong>

                <small>Get a copy of your personal data.</small>
              </span>

              <FiChevronRight />
            </button>

            <button
              type="button"
              className="privacy-data-item"
              onClick={() => handleDataAction("usage")}
            >
              <span className="privacy-data-item__icon privacy-data-item__icon--purple">
                <FiFileText />
              </span>

              <span className="privacy-data-item__content">
                <strong>Data Usage Information</strong>

                <small>Learn how we use your data.</small>
              </span>

              <FiChevronRight />
            </button>

            <button
              type="button"
              className="privacy-data-item privacy-data-item--danger"
              onClick={() => handleDataAction("delete")}
            >
              <span className="privacy-data-item__icon privacy-data-item__icon--red">
                <FiTrash2 />
              </span>

              <span className="privacy-data-item__content">
                <strong>Request Data Deletion</strong>

                <small>Submit a request to delete your data.</small>
              </span>

              <FiChevronRight />
            </button>
          </div>
        </article>

        {/* ===================================================
            PERSONALIZATION
        =================================================== */}

        <article className="privacy-panel privacy-personalization-panel">
          <div className="privacy-panel__header">
            <div className="privacy-panel__heading-icon privacy-panel__heading-icon--pink">
              <FiZap />
            </div>

            <div>
              <h2>Personalization &amp; Data</h2>

              <p>Control how your data is used to improve your experience.</p>
            </div>
          </div>

          <div className="privacy-option-list">
            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--pink">
                <FiZap />
              </div>

              <div className="privacy-option__content">
                <strong>Personalized Recommendations</strong>

                <small>
                  Get course recommendations based on your activity.
                </small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.personalizedRecommendations
                    ? "privacy-switch--on"
                    : ""
                }`}
                onClick={() => handleToggle("personalizedRecommendations")}
                aria-label="Toggle personalized recommendations"
                aria-pressed={privacySettings.personalizedRecommendations}
              >
                <span />
              </button>
            </div>

            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--pink">
                <FiBarChart2 />
              </div>

              <div className="privacy-option__content">
                <strong>Learning Analytics</strong>

                <small>Help us improve with anonymous usage data.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.learningAnalytics ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("learningAnalytics")}
                aria-label="Toggle learning analytics"
                aria-pressed={privacySettings.learningAnalytics}
              >
                <span />
              </button>
            </div>

            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--purple">
                <FiLink />
              </div>

              <div className="privacy-option__content">
                <strong>Third-Party Integrations</strong>

                <small>Allow data sharing with trusted partners.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.thirdPartyIntegrations
                    ? "privacy-switch--on"
                    : ""
                }`}
                onClick={() => handleToggle("thirdPartyIntegrations")}
                aria-label="Toggle third-party integrations"
                aria-pressed={privacySettings.thirdPartyIntegrations}
              >
                <span />
              </button>
            </div>
          </div>
        </article>

        {/* ===================================================
            COMMUNICATION PRIVACY
        =================================================== */}

        <article className="privacy-panel privacy-communication-panel">
          <div className="privacy-panel__header">
            <div className="privacy-panel__heading-icon privacy-panel__heading-icon--green">
              <FiMail />
            </div>

            <div>
              <h2>Communication Privacy</h2>

              <p>Choose who can contact you.</p>
            </div>
          </div>

          <div className="privacy-contact-control">
            <label htmlFor="privacy-contact">Who can contact you?</label>

            <div className="privacy-select-wrapper">
              <span className="privacy-select-icon">
                <FiUsers />
              </span>

              <select
                id="privacy-contact"
                value={contactPreference}
                onChange={handleContactChange}
              >
                <option>Only instructors and platform staff</option>

                <option>Only people in my courses</option>

                <option>All registered learners</option>

                <option>No one</option>
              </select>

              <FiChevronDown />
            </div>
          </div>

          <div className="privacy-option-list privacy-option-list--communication">
            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--green">
                <FiBell />
              </div>

              <div className="privacy-option__content">
                <strong>Email notifications</strong>

                <small>Receive important account notifications.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.emailNotifications ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("emailNotifications")}
                aria-label="Toggle email notifications"
                aria-pressed={privacySettings.emailNotifications}
              >
                <span />
              </button>
            </div>

            <div className="privacy-option">
              <div className="privacy-option__icon privacy-option__icon--orange">
                <FiMail />
              </div>

              <div className="privacy-option__content">
                <strong>Marketing emails</strong>

                <small>Receive updates about new features and courses.</small>
              </div>

              <button
                type="button"
                className={`privacy-switch ${
                  privacySettings.marketingEmails ? "privacy-switch--on" : ""
                }`}
                onClick={() => handleToggle("marketingEmails")}
                aria-label="Toggle marketing emails"
                aria-pressed={privacySettings.marketingEmails}
              >
                <span />
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* =====================================================
          PRIVACY COMMITMENT
      ===================================================== */}

      <article className="privacy-commitment">
        <div className="privacy-commitment__icon">
          <FiShield />
        </div>

        <div className="privacy-commitment__content">
          <span className="privacy-commitment__eyebrow">
            YOUR TRUST MATTERS
          </span>

          <h2>We&apos;re Committed to Your Privacy</h2>

          <p>
            Your trust is important to us. We follow strict security standards
            and never share your personal information without your consent.
          </p>
        </div>

        <div className="privacy-commitment__visual">
          <span className="privacy-commitment__ring privacy-commitment__ring--one" />
          <span className="privacy-commitment__ring privacy-commitment__ring--two" />

          <div className="privacy-commitment__lock">
            <FiLock />
          </div>

          <span className="privacy-commitment__tag privacy-commitment__tag--one">
            <FiShield />
            Your Data
          </span>

          <span className="privacy-commitment__tag privacy-commitment__tag--two">
            <FiCheckCircle />
            Your Choice
          </span>

          <span className="privacy-commitment__tag privacy-commitment__tag--three">
            <FiShield />
            Our Responsibility
          </span>
        </div>

        <button
          type="button"
          className="privacy-commitment__button"
          onClick={() => setShowPrivacyModal(true)}
        >
          <span>View Our Privacy Policy</span>
          <FiChevronRight />
        </button>
      </article>

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div
          className={`privacy-toast ${
            toast.type === "error" ? "privacy-toast--error" : ""
          }`}
        >
          <span className="privacy-toast__icon">
            <FiCheckCircle />
          </span>

          <span>{toast.message}</span>

          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* =====================================================
          PRIVACY MODAL
      ===================================================== */}

      {showPrivacyModal && (
        <div
          className="privacy-modal-backdrop"
          onMouseDown={() => setShowPrivacyModal(false)}
        >
          <div
            className="privacy-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="privacy-modal__close"
              onClick={() => setShowPrivacyModal(false)}
              aria-label="Close"
            >
              <FiX />
            </button>

            <div className="privacy-modal__icon">
              <FiShield />
            </div>

            <h3>Your Privacy Matters</h3>

            <p>
              Your personal information is handled according to our privacy and
              security practices. You remain in control of your profile
              visibility, learning activity and personal data.
            </p>

            <div className="privacy-modal__points">
              <div>
                <FiCheck />
                <span>Your data remains under your control.</span>
              </div>

              <div>
                <FiCheck />
                <span>You can change your privacy choices anytime.</span>
              </div>

              <div>
                <FiCheck />
                <span>
                  Your information is protected using secure practices.
                </span>
              </div>
            </div>

            <div className="privacy-modal__actions">
              <button
                type="button"
                className="privacy-modal__secondary"
                onClick={() => setShowPrivacyModal(false)}
              >
                Close
              </button>

              <button
                type="button"
                className="privacy-modal__primary"
                onClick={() => {
                  setShowPrivacyModal(false);
                  showToast("Privacy policy opened.");
                }}
              >
                Continue
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PrivacySettings;
