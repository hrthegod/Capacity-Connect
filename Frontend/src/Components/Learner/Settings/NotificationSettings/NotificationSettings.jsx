import React, { useState } from "react";

import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiFileText,
  FiHelpCircle,
  FiInfo,
  FiMail,
  FiVolume2,
  FiMessageCircle,
  FiMessageSquare,
  FiPlayCircle,
  FiRefreshCw,
  FiSettings,
  FiShield,
  FiSmartphone,
  FiX,
} from "react-icons/fi";

import "./NotificationSettings.css";

const NotificationSettings = () => {
  /* =========================================================
     NOTIFICATION STATES
  ========================================================= */

  const [notifications, setNotifications] = useState({
    newCourseContent: true,
    courseUpdates: true,
    learningReminders: false,

    quizReminders: true,
    assignmentDeadlines: true,
    assessmentResults: false,

    badgesAchievements: true,
    certificates: true,
    learningStreaks: false,

    instructorMessages: true,
    discussionReplies: true,
    systemAnnouncements: false,

    emailNotifications: true,
    inAppNotifications: true,
    pushNotifications: false,
  });

  const [toast, setToast] = useState(null);

  /* =========================================================
     TOGGLE HANDLER
  ========================================================= */

  const handleToggle = (key, label) => {
    const newValue = !notifications[key];

    setNotifications((previous) => ({
      ...previous,
      [key]: newValue,
    }));

    showToast(`${label} ${newValue ? "enabled" : "disabled"}.`);
  };

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(window.__notificationToastTimer);

    window.__notificationToastTimer = window.setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  /* =========================================================
     NOTIFICATION ITEM
  ========================================================= */

  const NotificationItem = ({
    icon,
    iconClass,
    title,
    description,
    stateKey,
  }) => {
    const enabled = notifications[stateKey];

    return (
      <div
        className={`notification-setting-item ${
          enabled ? "notification-setting-item--enabled" : ""
        }`}
      >
        <div className={`notification-setting-item__icon ${iconClass}`}>
          {icon}
        </div>

        <div className="notification-setting-item__content">
          <strong>{title}</strong>

          <span>{description}</span>
        </div>

        <button
          type="button"
          className={`notification-switch ${
            enabled ? "notification-switch--on" : ""
          }`}
          onClick={() => handleToggle(stateKey, title)}
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
    <section className="notification-settings">
      {/* =====================================================
          MAIN NOTIFICATION GRID
      ===================================================== */}

      <div className="notification-settings__grid">
        {/* ===================================================
            DARK FEATURE CARD
        =================================================== */}

        <article className="notification-feature-card">
          <div className="notification-feature-card__orb" />

          <div className="notification-feature-card__rings">
            <span />
            <span />
            <span />
          </div>

          <div className="notification-feature-card__bell">
            <FiBell />
            <span className="notification-feature-card__pulse">
              <FiCheckCircle />
            </span>
          </div>

          <div className="notification-feature-card__content">
            <span className="notification-feature-card__eyebrow">
              NOTIFICATIONS
            </span>

            <h2>Stay in the loop</h2>

            <p>Get important updates about your courses, progress and more.</p>
          </div>

          <div className="notification-feature-card__stats">
            <div>
              <span>
                <FiMail />
              </span>

              <small>Real-time</small>
              <strong>Updates</strong>
            </div>

            <div>
              <span>
                <FiShield />
              </span>

              <small>Custom</small>
              <strong>Preferences</strong>
            </div>

            <div>
              <span>
                <FiBarChart2 />
              </span>

              <small>Stay</small>
              <strong>Productive</strong>
            </div>
          </div>

          <button
            type="button"
            className="notification-feature-card__button"
            onClick={() =>
              showToast("Your notification preferences are fully customizable.")
            }
          >
            <span>Learn more about notifications</span>
            <FiArrowRight />
          </button>
        </article>

        {/* ===================================================
            COURSE & LEARNING
        =================================================== */}

        <article className="notification-panel notification-panel--course">
          <div className="notification-panel__header">
            <div className="notification-panel__heading-icon notification-panel__heading-icon--blue">
              <FiBookOpen />
            </div>

            <div>
              <h2>Course &amp; Learning Notifications</h2>

              <p>Get notified about your enrolled courses.</p>
            </div>
          </div>

          <div className="notification-setting-list">
            <NotificationItem
              icon={<FiPlayCircle />}
              iconClass="notification-item-icon--blue"
              title="New course content"
              description="Be notified when new content is available."
              stateKey="newCourseContent"
            />

            <NotificationItem
              icon={<FiRefreshCw />}
              iconClass="notification-item-icon--blue"
              title="Course updates"
              description="Get updates about changes in your courses."
              stateKey="courseUpdates"
            />

            <NotificationItem
              icon={<FiCalendar />}
              iconClass="notification-item-icon--cyan"
              title="Learning reminders"
              description="Receive reminders to keep you on track."
              stateKey="learningReminders"
            />
          </div>
        </article>

        {/* ===================================================
            ASSESSMENTS
        =================================================== */}

        <article className="notification-panel notification-panel--assessment">
          <div className="notification-panel__header">
            <div className="notification-panel__heading-icon notification-panel__heading-icon--purple">
              <FiFileText />
            </div>

            <div>
              <h2>Assessments &amp; Deadlines</h2>

              <p>Never miss an important deadline.</p>
            </div>
          </div>

          <div className="notification-setting-list">
            <NotificationItem
              icon={<FiHelpCircle />}
              iconClass="notification-item-icon--purple"
              title="Quiz reminders"
              description="Get notified about upcoming quizzes."
              stateKey="quizReminders"
            />

            <NotificationItem
              icon={<FiCalendar />}
              iconClass="notification-item-icon--orange"
              title="Assignment deadlines"
              description="Receive reminders before deadlines."
              stateKey="assignmentDeadlines"
            />

            <NotificationItem
              icon={<FiBarChart2 />}
              iconClass="notification-item-icon--purple"
              title="Assessment results"
              description="Be notified when results are available."
              stateKey="assessmentResults"
            />
          </div>
        </article>
      </div>

      {/* =====================================================
          SECOND ROW
      ===================================================== */}

      <div className="notification-settings__grid notification-settings__grid--second">
        {/* ===================================================
            ACHIEVEMENTS
        =================================================== */}

        <article className="notification-panel notification-panel--achievement">
          <div className="notification-panel__header">
            <div className="notification-panel__heading-icon notification-panel__heading-icon--orange">
              <FiAward />
            </div>

            <div>
              <h2>Achievement Notifications</h2>

              <p>Celebrate your learning milestones.</p>
            </div>
          </div>

          <div className="notification-setting-list">
            <NotificationItem
              icon={<FiAward />}
              iconClass="notification-item-icon--orange"
              title="Badges & achievements"
              description="Get notified when you earn a badge."
              stateKey="badgesAchievements"
            />

            <NotificationItem
              icon={<FiFileText />}
              iconClass="notification-item-icon--orange"
              title="Certificates"
              description="Be notified when you receive a certificate."
              stateKey="certificates"
            />

            <NotificationItem
              icon={<FiAward />}
              iconClass="notification-item-icon--orange"
              title="Learning streaks"
              description="Get updates about your learning progress."
              stateKey="learningStreaks"
            />
          </div>
        </article>

        {/* ===================================================
            MESSAGES
        =================================================== */}

        <article className="notification-panel notification-panel--communication">
          <div className="notification-panel__header">
            <div className="notification-panel__heading-icon notification-panel__heading-icon--green">
              <FiMessageSquare />
            </div>

            <div>
              <h2>Messages &amp; Communication</h2>

              <p>Stay connected with instructors and peers.</p>
            </div>
          </div>

          <div className="notification-setting-list">
            <NotificationItem
              icon={<FiMail />}
              iconClass="notification-item-icon--green"
              title="Instructor messages"
              description="Get notified about new messages."
              stateKey="instructorMessages"
            />

            <NotificationItem
              icon={<FiMessageCircle />}
              iconClass="notification-item-icon--green"
              title="Discussion replies"
              description="Be notified when someone replies to your posts."
              stateKey="discussionReplies"
            />

            <NotificationItem
              icon={<FiVolume2 />}
              iconClass="notification-item-icon--green"
              title="System announcements"
              description="Receive important platform updates."
              stateKey="systemAnnouncements"
            />
          </div>
        </article>

        {/* ===================================================
            DELIVERY
        =================================================== */}

        <article className="notification-panel notification-panel--delivery">
          <div className="notification-panel__header">
            <div className="notification-panel__heading-icon notification-panel__heading-icon--pink">
              <FiMail />
            </div>

            <div>
              <h2>Notification Delivery</h2>

              <p>Choose how you want to receive notifications.</p>
            </div>
          </div>

          <div className="notification-setting-list">
            <NotificationItem
              icon={<FiMail />}
              iconClass="notification-item-icon--pink"
              title="Email notifications"
              description="Receive notifications via email."
              stateKey="emailNotifications"
            />

            <NotificationItem
              icon={<FiSmartphone />}
              iconClass="notification-item-icon--pink"
              title="In-app notifications"
              description="Receive notifications in the platform."
              stateKey="inAppNotifications"
            />

            <NotificationItem
              icon={<FiBell />}
              iconClass="notification-item-icon--pink"
              title="Push notifications"
              description="Receive notifications on your device."
              stateKey="pushNotifications"
            />
          </div>
        </article>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION AREA
      ===================================================== */}

      <div className="notification-bottom">
        {/* ===================================================
            NEVER MISS UPDATE
        =================================================== */}

        <article className="notification-update-card">
          <div className="notification-update-card__icon">
            <FiMail />
          </div>

          <div className="notification-update-card__content">
            <h2>Never Miss an Update</h2>

            <p>
              Stay informed and make the most of your learning experience with
              timely notifications.
            </p>
          </div>

          <div className="notification-device">
            <div className="notification-device__phone">
              <div className="notification-device__speaker" />

              <div className="notification-device__screen">
                <div className="notification-device__screen-bell">
                  <FiBell />
                </div>

                <div className="notification-device__screen-line" />
                <div className="notification-device__screen-line notification-device__screen-line--short" />
              </div>

              <div className="notification-device__home" />
            </div>

            <span className="notification-floating-tag notification-floating-tag--one">
              <FiMessageSquare />
              New Messages
            </span>

            <span className="notification-floating-tag notification-floating-tag--two">
              <FiBookOpen />
              Course Updates
            </span>

            <span className="notification-floating-tag notification-floating-tag--three">
              <FiHelpCircle />
              Quiz Reminders
            </span>

            <span className="notification-floating-tag notification-floating-tag--four">
              <FiAward />
              Achievements
            </span>
          </div>
        </article>

        {/* ===================================================
            FREQUENCY
        =================================================== */}

        <article className="notification-frequency-card">
          <div className="notification-frequency-card__icon">
            <FiInfo />
          </div>

          <div className="notification-frequency-card__content">
            <h3>Notification Frequency</h3>

            <p>
              You can manage how often you receive notifications to avoid too
              many alerts.
            </p>
          </div>

          <button
            type="button"
            className="notification-frequency-card__button"
            onClick={() =>
              showToast("Notification preferences are ready to customize.")
            }
          >
            <span>Manage Preferences</span>
            <FiArrowRight />
          </button>
        </article>
      </div>

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div className="notification-toast">
          <span className="notification-toast__icon">
            <FiCheckCircle />
          </span>

          <span>{toast}</span>

          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Close notification"
          >
            <FiX />
          </button>
        </div>
      )}
    </section>
  );
};

export default NotificationSettings;
