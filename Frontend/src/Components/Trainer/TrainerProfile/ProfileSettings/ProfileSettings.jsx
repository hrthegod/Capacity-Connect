import React, { useState } from "react";
import {
  LuSettings,
  LuShieldCheck,
  LuSlidersHorizontal,
  LuBell,
  LuMail,
  LuCalendarDays,
  LuUsersRound,
  LuFileText,
  LuGlobe,
  LuClock3,
  LuCalendar,
  LuChevronDown,
  LuLockKeyhole,
  LuKeyRound,
  LuMonitor,
  LuFingerprint,
  LuEye,
  LuUserRound,
  LuShare2,
  LuDatabase,
  LuDownload,
  LuTrash2,
  LuShield,
  LuZap,
  LuSquarePen,
  LuExternalLink,
  LuFileDown,
  LuRotateCcw,
  LuCheck,
  LuChevronRight,
} from "react-icons/lu";

import "./ProfileSettings.css";

const ProfileSettings = () => {
  /* =========================================================
     ACCOUNT SETTINGS
  ========================================================= */

  const [language, setLanguage] = useState("English (US)");
  const [timeZone, setTimeZone] = useState("(GMT+05:30) Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD MMM YYYY");

  /* =========================================================
     NOTIFICATION SETTINGS
  ========================================================= */

  const [notifications, setNotifications] = useState({
    email: true,
    sessions: true,
    learners: true,
    assessments: false,
  });

  /* =========================================================
     SECURITY
  ========================================================= */

  const [twoFactor, setTwoFactor] = useState(true);

  /* =========================================================
     VISIBILITY
  ========================================================= */

  const [visibility, setVisibility] = useState({
    publicProfile: true,
    contact: false,
    social: true,
  });

  /* =========================================================
     UI STATE
  ========================================================= */

  const [message, setMessage] = useState("");

  /* =========================================================
     HELPERS
  ========================================================= */

  const showMessage = (text) => {
    setMessage(text);

    window.clearTimeout(window.profileSettingsMessageTimer);

    window.profileSettingsMessageTimer = window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const toggleVisibility = (key) => {
    setVisibility((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setLanguage("English (US)");
    setTimeZone("(GMT+05:30) Asia/Kolkata");
    setDateFormat("DD MMM YYYY");

    setNotifications({
      email: true,
      sessions: true,
      learners: true,
      assessments: false,
    });

    setTwoFactor(true);

    setVisibility({
      publicProfile: true,
      contact: false,
      social: true,
    });

    showMessage("Settings restored to their previous defaults.");
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = () => {
    showMessage("Your profile settings have been saved successfully.");
  };

  /* =========================================================
     DROPDOWN
  ========================================================= */

  const SettingSelect = ({ value, onChange, options, ariaLabel }) => {
    return (
      <div className="profile-settings-select">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={ariaLabel}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <LuChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
      </div>
    );
  };

  /* =========================================================
     TOGGLE
  ========================================================= */

  const Toggle = ({ checked, onChange, label }) => {
    return (
      <button
        type="button"
        className={`profile-settings-toggle ${checked ? "is-active" : ""}`}
        onClick={onChange}
        aria-label={label}
        aria-pressed={checked}
      >
        <span />
      </button>
    );
  };

  /* =========================================================
     NOTIFICATION ROW
  ========================================================= */

  const NotificationRow = ({
    icon,
    title,
    description,
    checked,
    onChange,
    tone,
  }) => {
    return (
      <div className={`profile-settings-option-row ${tone}`}>
        <div className="profile-settings-option-icon">{icon}</div>

        <div className="profile-settings-option-content">
          <strong>{title}</strong>
          <span>{description}</span>
        </div>

        <Toggle
          checked={checked}
          onChange={onChange}
          label={`Toggle ${title}`}
        />
      </div>
    );
  };

  /* =========================================================
     VISIBILITY ROW
  ========================================================= */

  const VisibilityRow = ({ icon, title, description, checked, onChange }) => {
    return (
      <div className="profile-settings-option-row visibility-row">
        <div className="profile-settings-option-icon">{icon}</div>

        <div className="profile-settings-option-content">
          <strong>{title}</strong>
          <span>{description}</span>
        </div>

        <Toggle
          checked={checked}
          onChange={onChange}
          label={`Toggle ${title}`}
        />
      </div>
    );
  };

  /* =========================================================
     SECURITY ACTION
  ========================================================= */

  const SecurityAction = ({
    icon,
    title,
    description,
    rightContent,
    onClick,
  }) => {
    return (
      <button
        type="button"
        className="profile-settings-security-action"
        onClick={onClick}
      >
        <span className="profile-settings-security-icon">{icon}</span>

        <span className="profile-settings-security-content">
          <strong>{title}</strong>
          <small>{description}</small>
        </span>

        {rightContent}

        <LuChevronRight
          className="profile-settings-security-arrow"
          size={18}
          strokeWidth={1.8}
        />
      </button>
    );
  };

  /* =========================================================
     DATA ACTION
  ========================================================= */

  const DataAction = ({ icon, title, description, tone, onClick }) => {
    return (
      <button
        type="button"
        className={`profile-settings-data-action ${tone}`}
        onClick={onClick}
      >
        <span className="profile-settings-data-icon">{icon}</span>

        <span className="profile-settings-data-content">
          <strong>{title}</strong>
          <small>{description}</small>
        </span>

        <LuChevronRight size={17} strokeWidth={1.8} />
      </button>
    );
  };

  /* =========================================================
     QUICK ACTION
  ========================================================= */

  const QuickAction = ({ icon, title, description, tone, onClick }) => {
    return (
      <button
        type="button"
        className={`profile-settings-quick-action ${tone}`}
        onClick={onClick}
      >
        <span className="profile-settings-quick-icon">{icon}</span>

        <span className="profile-settings-quick-content">
          <strong>{title}</strong>
          <small>{description}</small>
        </span>

        <LuChevronRight size={17} strokeWidth={1.8} />
      </button>
    );
  };

  return (
    <section className="profile-settings">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="profile-settings-header">
        <div className="profile-settings-heading">
          <div className="profile-settings-heading-icon">
            <LuSettings size={23} strokeWidth={1.8} />
          </div>

          <div>
            <span className="profile-settings-eyebrow">ACCOUNT WORKSPACE</span>

            <h2>Profile Settings</h2>

            <p>Manage your preferences, security and profile visibility.</p>
          </div>
        </div>

        <div className="profile-settings-header-status">
          <div className="profile-settings-status-icon">
            <LuShieldCheck size={20} strokeWidth={1.8} />
          </div>

          <div>
            <strong>Profile protected</strong>
            <span>Your account settings are up to date.</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          TOP GRID
      ===================================================== */}

      <div className="profile-settings-top-grid">
        {/* ===================================================
            ACCOUNT PREFERENCES
        =================================================== */}

        <article className="profile-settings-card account-card">
          <div className="profile-settings-card-header">
            <div className="profile-settings-card-icon">
              <LuSlidersHorizontal size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h3>Account Preferences</h3>
              <p>Customize your general account settings.</p>
            </div>
          </div>

          <div className="profile-settings-form-list">
            <div className="profile-settings-form-row">
              <div className="profile-settings-form-icon">
                <LuGlobe size={19} strokeWidth={1.8} />
              </div>

              <div className="profile-settings-form-content">
                <strong>Language</strong>
                <span>Select your preferred language</span>
              </div>

              <SettingSelect
                value={language}
                onChange={setLanguage}
                options={["English (US)", "English (UK)", "Hindi", "Gujarati"]}
                ariaLabel="Language"
              />
            </div>

            <div className="profile-settings-form-row">
              <div className="profile-settings-form-icon">
                <LuClock3 size={19} strokeWidth={1.8} />
              </div>

              <div className="profile-settings-form-content">
                <strong>Time Zone</strong>
                <span>Set your local time zone</span>
              </div>

              <SettingSelect
                value={timeZone}
                onChange={setTimeZone}
                options={[
                  "(GMT+05:30) Asia/Kolkata",
                  "(GMT+00:00) Europe/London",
                  "(GMT-05:00) America/New_York",
                ]}
                ariaLabel="Time zone"
              />
            </div>

            <div className="profile-settings-form-row">
              <div className="profile-settings-form-icon">
                <LuCalendar size={19} strokeWidth={1.8} />
              </div>

              <div className="profile-settings-form-content">
                <strong>Date Format</strong>
                <span>Choose how dates are displayed</span>
              </div>

              <SettingSelect
                value={dateFormat}
                onChange={setDateFormat}
                options={[
                  "DD MMM YYYY",
                  "MMM DD, YYYY",
                  "DD/MM/YYYY",
                  "MM/DD/YYYY",
                ]}
                ariaLabel="Date format"
              />
            </div>
          </div>
        </article>

        {/* ===================================================
            NOTIFICATIONS
        =================================================== */}

        <article className="profile-settings-card notification-card">
          <div className="profile-settings-card-header">
            <div className="profile-settings-card-icon">
              <LuBell size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h3>Notification Preferences</h3>
              <p>Choose what updates you want to receive.</p>
            </div>
          </div>

          <div className="profile-settings-option-list">
            <NotificationRow
              icon={<LuMail size={19} strokeWidth={1.8} />}
              title="Email Notifications"
              description="Receive important updates via email"
              checked={notifications.email}
              onChange={() => toggleNotification("email")}
              tone="notification-blue"
            />

            <NotificationRow
              icon={<LuCalendarDays size={19} strokeWidth={1.8} />}
              title="Session Reminders"
              description="Get reminded before your training sessions"
              checked={notifications.sessions}
              onChange={() => toggleNotification("sessions")}
              tone="notification-peach"
            />

            <NotificationRow
              icon={<LuUsersRound size={19} strokeWidth={1.8} />}
              title="Learner Activity"
              description="Updates about your learners' progress"
              checked={notifications.learners}
              onChange={() => toggleNotification("learners")}
              tone="notification-mint"
            />

            <NotificationRow
              icon={<LuFileText size={19} strokeWidth={1.8} />}
              title="Quiz & Assessment Updates"
              description="Receive notifications about quiz results"
              checked={notifications.assessments}
              onChange={() => toggleNotification("assessments")}
              tone="notification-lavender"
            />
          </div>
        </article>

        {/* ===================================================
            SECURITY — DARK NAVY
        =================================================== */}

        <article className="profile-settings-card security-card">
          <div className="profile-settings-card-header">
            <div className="profile-settings-card-icon">
              <LuShieldCheck size={22} strokeWidth={1.8} />
            </div>

            <div>
              <h3>Security</h3>
              <p>Keep your account safe and secure.</p>
            </div>
          </div>

          <div className="profile-settings-security-list">
            <SecurityAction
              icon={<LuLockKeyhole size={20} strokeWidth={1.8} />}
              title="Change Password"
              description="Update your password regularly"
              onClick={() => showMessage("Password change workspace opened.")}
            />

            <SecurityAction
              icon={<LuKeyRound size={20} strokeWidth={1.8} />}
              title="Two-Factor Authentication"
              description="Add an extra layer of security"
              rightContent={
                <span
                  className={`profile-settings-security-status ${
                    twoFactor ? "enabled" : ""
                  }`}
                >
                  <LuCheck size={12} strokeWidth={2} />
                  {twoFactor ? "Enabled" : "Disabled"}
                </span>
              }
              onClick={() => setTwoFactor((current) => !current)}
            />

            <SecurityAction
              icon={<LuMonitor size={20} strokeWidth={1.8} />}
              title="Active Sessions"
              description="Manage your logged-in devices"
              onClick={() => showMessage("Active sessions opened.")}
            />

            <button
              type="button"
              className="profile-settings-protected"
              onClick={() =>
                showMessage("Your account security status is healthy.")
              }
            >
              <div className="profile-settings-protected-icon">
                <LuFingerprint size={23} strokeWidth={1.7} />
              </div>

              <div>
                <strong>Your account is protected</strong>
                <span>Last security check completed successfully.</span>
              </div>

              <LuChevronRight size={18} strokeWidth={1.8} />
            </button>
          </div>
        </article>
      </div>

      {/* =====================================================
          BOTTOM GRID
      ===================================================== */}

      <div className="profile-settings-bottom-grid">
        {/* ===================================================
            PROFILE VISIBILITY
        =================================================== */}

        <article className="profile-settings-card visibility-card">
          <div className="profile-settings-card-header">
            <div className="profile-settings-card-icon">
              <LuEye size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h3>Profile Visibility</h3>
              <p>Control who can see your profile information.</p>
            </div>
          </div>

          <div className="profile-settings-option-list">
            <VisibilityRow
              icon={<LuGlobe size={19} strokeWidth={1.8} />}
              title="Public Trainer Profile"
              description="Make your profile visible to learners"
              checked={visibility.publicProfile}
              onChange={() => toggleVisibility("publicProfile")}
            />

            <VisibilityRow
              icon={<LuUserRound size={19} strokeWidth={1.8} />}
              title="Show Contact Information"
              description="Display your email and contact details"
              checked={visibility.contact}
              onChange={() => toggleVisibility("contact")}
            />

            <VisibilityRow
              icon={<LuShare2 size={19} strokeWidth={1.8} />}
              title="Show Social Links"
              description="Display your social media profiles"
              checked={visibility.social}
              onChange={() => toggleVisibility("social")}
            />
          </div>
        </article>

        {/* ===================================================
            DATA & PRIVACY
        =================================================== */}

        <article className="profile-settings-card privacy-card">
          <div className="profile-settings-card-header">
            <div className="profile-settings-card-icon">
              <LuDatabase size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h3>Data & Privacy</h3>
              <p>Manage your data and privacy settings.</p>
            </div>
          </div>

          <div className="profile-settings-data-list">
            <DataAction
              icon={<LuDownload size={20} strokeWidth={1.8} />}
              title="Download My Data"
              description="Get a copy of your profile data"
              tone="data-purple"
              onClick={() =>
                showMessage("Your data export has been requested.")
              }
            />

            <DataAction
              icon={<LuTrash2 size={20} strokeWidth={1.8} />}
              title="Delete Account"
              description="Permanently delete your account"
              tone="data-red"
              onClick={() => showMessage("Account deletion settings opened.")}
            />

            <DataAction
              icon={<LuShield size={20} strokeWidth={1.8} />}
              title="Privacy Policy"
              description="Read our privacy policy"
              tone="data-blue"
              onClick={() => showMessage("Privacy policy opened.")}
            />
          </div>
        </article>

        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <article className="profile-settings-card quick-card">
          <div className="profile-settings-card-header">
            <div className="profile-settings-card-icon">
              <LuZap size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h3>Quick Actions</h3>
              <p>Common actions for your profile.</p>
            </div>
          </div>

          <div className="profile-settings-quick-grid">
            <QuickAction
              icon={<LuSquarePen size={20} strokeWidth={1.8} />}
              title="Edit Profile"
              description="Update your information"
              tone="quick-blue"
              onClick={() => showMessage("Profile editor opened.")}
            />

            <QuickAction
              icon={<LuEye size={20} strokeWidth={1.8} />}
              title="Preview Profile"
              description="See how it looks"
              tone="quick-sky"
              onClick={() => showMessage("Profile preview opened.")}
            />

            <QuickAction
              icon={<LuFileDown size={20} strokeWidth={1.8} />}
              title="Download Resume"
              description="Get your latest resume"
              tone="quick-mint"
              onClick={() => showMessage("Resume download started.")}
            />

            <QuickAction
              icon={<LuShare2 size={20} strokeWidth={1.8} />}
              title="Share Profile"
              description="Share with others"
              tone="quick-lavender"
              onClick={() => showMessage("Profile sharing options opened.")}
            />
          </div>
        </article>
      </div>

      {/* =====================================================
          SAVE BAR
      ===================================================== */}

      <footer className="profile-settings-save-bar">
        <button
          type="button"
          className="profile-settings-reset-button"
          onClick={handleReset}
        >
          <span className="profile-settings-save-button-icon">
            <LuRotateCcw size={17} strokeWidth={1.8} />
          </span>

          <span>
            <strong>Reset Changes</strong>
            <small>Restore previous settings</small>
          </span>
        </button>

        <div className="profile-settings-save-area">
          <button
            type="button"
            className="profile-settings-save-button"
            onClick={handleSave}
          >
            <LuCheck size={18} strokeWidth={2} />

            <span>Save Changes</span>

            <LuChevronRight size={17} strokeWidth={1.9} />
          </button>

          <span>Your changes will be saved immediately.</span>
        </div>
      </footer>

      {/* =====================================================
          FEEDBACK MESSAGE
      ===================================================== */}

      {message && (
        <div
          className="profile-settings-message"
          role="status"
          aria-live="polite"
        >
          <span className="profile-settings-message-icon">
            <LuCheck size={15} strokeWidth={2} />
          </span>

          <span>{message}</span>
        </div>
      )}
    </section>
  );
};

export default ProfileSettings;
