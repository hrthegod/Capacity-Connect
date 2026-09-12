import React, { useState } from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiCamera,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiEdit3,
  FiGlobe,
  FiHeadphones,
  FiLink,
  FiLock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiShield,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";

import "./AccountSettings.css";

const AccountSettings = () => {
  /* =========================================================
     ACCOUNT DATA
  ========================================================= */

  const initialData = {
    fullName: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "+91 98765 43210",
    dateOfBirth: "15 March 2000",
    gender: "Male",
    location: "Ahmedabad, Gujarat, India",
  };

  const [formData, setFormData] = useState(initialData);

  const [savedData, setSavedData] = useState(initialData);

  const [isEditing, setIsEditing] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [showPhotoMessage, setShowPhotoMessage] = useState(false);

  const [savedMessage, setSavedMessage] = useState(false);

  /* =========================================================
     FORM HANDLERS
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSavedMessage(false);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setSavedData(formData);
    setIsEditing(false);

    setSavedMessage(true);

    window.setTimeout(() => {
      setSavedMessage(false);
    }, 3000);
  };

  const handlePhotoChange = () => {
    setShowPhotoMessage(true);

    window.setTimeout(() => {
      setShowPhotoMessage(false);
    }, 2500);
  };

  /* =========================================================
     QUICK ACTIONS
  ========================================================= */

  const quickActions = [
    {
      id: "photo",
      title: "Change Profile Photo",
      description: "Update your profile picture",
      icon: FiCamera,
      className: "photo",
      action: handlePhotoChange,
    },
    {
      id: "account",
      title: "Manage Account",
      description: "Update your account details",
      icon: FiUser,
      className: "account",
      action: handleEdit,
    },
    {
      id: "linked",
      title: "Linked Accounts",
      description: "Connect with other platforms",
      icon: FiLink,
      className: "linked",
      action: () => {
        window.alert("Linked accounts management will be available here.");
      },
    },
    {
      id: "delete",
      title: "Delete Account",
      description: "Permanently delete your account",
      icon: FiTrash2,
      className: "delete",
      action: () => setShowDeleteConfirm(true),
    },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="account-settings">
      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="account-settings__grid">
        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <aside className="account-settings__left">
          {/* =================================================
              PROFILE SUMMARY
          ================================================= */}

          <article className="account-profile-card">
            <div className="account-profile-card__glow" />

            <div className="account-profile-card__top">
              <div className="account-profile-card__avatar-wrapper">
                <div className="account-profile-card__avatar">
                  <FiUser />
                </div>

                <button
                  type="button"
                  className="account-profile-card__camera"
                  onClick={handlePhotoChange}
                  aria-label="Change profile photo"
                  title="Change profile photo"
                >
                  <FiCamera />
                </button>
              </div>

              <div className="account-profile-card__identity">
                <div className="account-profile-card__name-row">
                  <h2>{formData.fullName}</h2>

                  <span className="account-profile-card__verified">
                    <FiCheck />
                  </span>
                </div>

                <div className="account-profile-card__role-row">
                  <span>Learner</span>

                  <span className="account-profile-card__active">
                    <span />
                    Active
                  </span>
                </div>

                <p>
                  “Learning today for a
                  <br />
                  brighter tomorrow.”
                </p>
              </div>

              <button
                type="button"
                className="account-profile-card__arrow"
                onClick={handleEdit}
                aria-label="Edit account information"
              >
                <FiChevronRight />
              </button>
            </div>

            <div className="account-profile-card__divider" />

            <div className="account-profile-card__stats">
              <div className="account-profile-stat">
                <strong>12</strong>
                <span>Courses</span>
              </div>

              <div className="account-profile-stat">
                <strong>4</strong>
                <span>Certificates</span>
              </div>

              <div className="account-profile-stat">
                <strong>2</strong>
                <span>Skills Gained</span>
              </div>
            </div>
          </article>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <article className="account-quick-actions">
            {quickActions.map((item, index) => {
              const Icon = item.icon;

              return (
                <React.Fragment key={item.id}>
                  <button
                    type="button"
                    className={`account-action account-action--${item.className}`}
                    onClick={item.action}
                  >
                    <span className="account-action__icon">
                      <Icon />
                    </span>

                    <span className="account-action__content">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>

                    <span className="account-action__arrow">
                      <FiChevronRight />
                    </span>
                  </button>

                  {index < quickActions.length - 1 && (
                    <div className="account-action__separator" />
                  )}
                </React.Fragment>
              );
            })}
          </article>

          {/* =================================================
              SUPPORT CARD
          ================================================= */}

          <article className="account-support-card">
            <div className="account-support-card__icon">
              <FiHeadphones />
            </div>

            <div className="account-support-card__content">
              <h3>Need Help?</h3>

              <p>
                Our support team is here to help you
                <br className="account-support-card__desktop-break" />
                with your account settings.
              </p>

              <button
                type="button"
                className="account-support-card__button"
                onClick={() => window.alert("Support center will open here.")}
              >
                <span>Contact Support</span>
                <FiArrowRight />
              </button>
            </div>

            <div className="account-support-card__decoration">
              <span />
              <span />
              <span />
            </div>
          </article>
        </aside>

        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <div className="account-settings__right">
          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <article className="account-information-card">
            <div className="account-card-header">
              <div className="account-card-header__identity">
                <span className="account-card-header__icon account-card-header__icon--blue">
                  <FiUser />
                </span>

                <div>
                  <h2>Personal Information</h2>
                  <p>Keep your personal details accurate and up to date.</p>
                </div>
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  className="account-edit-button"
                  onClick={handleEdit}
                >
                  <FiEdit3 />
                  <span>Edit Information</span>
                </button>
              ) : (
                <div className="account-edit-actions">
                  <button
                    type="button"
                    className="account-cancel-button"
                    onClick={handleCancel}
                  >
                    <FiX />
                    <span>Cancel</span>
                  </button>

                  <button
                    type="button"
                    className="account-save-button"
                    onClick={handleSave}
                  >
                    <FiSave />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>

            {savedMessage && (
              <div className="account-save-message">
                <FiCheckCircle />
                <span>Your account information has been updated.</span>
              </div>
            )}

            <div className="account-information-form">
              {/* Full Name */}
              <div className="account-field">
                <label htmlFor="account-full-name">Full Name</label>

                <div className="account-input-wrapper">
                  <span className="account-input-icon">
                    <FiUser />
                  </span>

                  <input
                    id="account-full-name"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="account-field">
                <label htmlFor="account-dob">Date of Birth</label>

                <div className="account-input-wrapper">
                  <span className="account-input-icon">
                    <FiCalendar />
                  </span>

                  <input
                    id="account-dob"
                    name="dateOfBirth"
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />

                  <span className="account-input-end-icon">
                    <FiCalendar />
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="account-field">
                <label htmlFor="account-email">Email Address</label>

                <div className="account-input-wrapper">
                  <span className="account-input-icon">
                    <FiMail />
                  </span>

                  <input
                    id="account-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="account-field">
                <label htmlFor="account-gender">Gender</label>

                <div className="account-input-wrapper account-input-wrapper--select">
                  <span className="account-input-icon">
                    <FiUser />
                  </span>

                  <select
                    id="account-gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>

                  <span className="account-input-end-icon">
                    <FiChevronDown />
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="account-field">
                <label htmlFor="account-phone">Phone Number</label>

                <div className="account-input-wrapper">
                  <span className="account-input-icon">
                    <FiPhone />
                  </span>

                  <input
                    id="account-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="account-field">
                <label htmlFor="account-location">Location</label>

                <div className="account-input-wrapper account-input-wrapper--select">
                  <span className="account-input-icon">
                    <FiMapPin />
                  </span>

                  <select
                    id="account-location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="Ahmedabad, Gujarat, India">
                      Ahmedabad, Gujarat, India
                    </option>
                    <option value="New Delhi, India">New Delhi, India</option>
                    <option value="Mumbai, Maharashtra, India">
                      Mumbai, Maharashtra, India
                    </option>
                    <option value="Bengaluru, Karnataka, India">
                      Bengaluru, Karnataka, India
                    </option>
                  </select>

                  <span className="account-input-end-icon">
                    <FiChevronDown />
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* =================================================
              ACCOUNT SECURITY
          ================================================= */}

          <article className="account-security-card">
            <div className="account-card-header">
              <div className="account-card-header__identity">
                <span className="account-card-header__icon account-card-header__icon--purple">
                  <FiShield />
                </span>

                <div>
                  <h2>Account Security</h2>
                  <p>Keep your account protected with secure access.</p>
                </div>
              </div>

              <span className="account-security-badge">
                <FiCheckCircle />
                Secure
              </span>
            </div>

            <div className="account-security-grid">
              <button
                type="button"
                className="account-security-item"
                onClick={() =>
                  window.alert("Password management will open here.")
                }
              >
                <span className="account-security-item__icon">
                  <FiLock />
                </span>

                <span className="account-security-item__content">
                  <strong>Password</strong>
                  <small>Last changed 30 days ago</small>
                </span>

                <FiChevronRight />
              </button>

              <button
                type="button"
                className="account-security-item"
                onClick={() =>
                  window.alert(
                    "Two-factor authentication settings will open here.",
                  )
                }
              >
                <span className="account-security-item__icon">
                  <FiShield />
                </span>

                <span className="account-security-item__content">
                  <strong>Two-factor Authentication</strong>
                  <small>Additional account protection</small>
                </span>

                <span className="account-security-item__status">Off</span>
              </button>
            </div>
          </article>

          {/* =================================================
              ACCOUNT STATUS
          ================================================= */}

          <article className="account-status-card">
            <div className="account-card-header">
              <div className="account-card-header__identity">
                <span className="account-card-header__icon account-card-header__icon--green">
                  <FiShield />
                </span>

                <div>
                  <h2>Account Status</h2>
                  <p>Your account is active and in good standing.</p>
                </div>
              </div>
            </div>

            <div className="account-status-content">
              <div className="account-status-main">
                <span className="account-status-main__icon">
                  <FiCheckCircle />
                </span>

                <div>
                  <strong>Active Account</strong>
                  <p>
                    You're all set! Your account is active and ready to use.
                  </p>
                </div>
              </div>

              <div className="account-status-meta">
                <div className="account-status-meta__item">
                  <span className="account-status-meta__icon">
                    <FiCalendar />
                  </span>

                  <div>
                    <small>Member Since</small>
                    <strong>12 Jan 2024</strong>
                  </div>
                </div>

                <div className="account-status-meta__item">
                  <span className="account-status-meta__icon">
                    <FiClock />
                  </span>

                  <div>
                    <small>Last Login</small>
                    <strong>Today, 10:24 AM</strong>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* =================================================
              PREFERENCES
          ================================================= */}

          <article className="account-preferences-card">
            <div className="account-card-header">
              <div className="account-card-header__identity">
                <span className="account-card-header__icon account-card-header__icon--orange">
                  <FiGlobe />
                </span>

                <div>
                  <h2>Preferences</h2>
                  <p>Customize your account preferences.</p>
                </div>
              </div>
            </div>

            <div className="account-preferences-content">
              <div className="account-preference-field">
                <label htmlFor="account-language">Language</label>

                <div className="account-input-wrapper account-input-wrapper--select">
                  <span className="account-input-icon">
                    <FiGlobe />
                  </span>

                  <select id="account-language" defaultValue="English (US)">
                    <option>English (US)</option>
                    <option>English (India)</option>
                    <option>Hindi</option>
                    <option>Gujarati</option>
                  </select>

                  <span className="account-input-end-icon">
                    <FiChevronDown />
                  </span>
                </div>
              </div>

              <div className="account-preference-field">
                <label htmlFor="account-timezone">Time Zone</label>

                <div className="account-input-wrapper account-input-wrapper--select">
                  <span className="account-input-icon">
                    <FiClock />
                  </span>

                  <select
                    id="account-timezone"
                    defaultValue="(GMT+05:30) India Standard Time"
                  >
                    <option>(GMT+05:30) India Standard Time</option>
                    <option>(GMT+00:00) Greenwich Mean Time</option>
                    <option>(GMT-05:00) Eastern Standard Time</option>
                  </select>

                  <span className="account-input-end-icon">
                    <FiChevronDown />
                  </span>
                </div>
              </div>

              <div className="account-communication">
                <div className="account-communication__heading">
                  <span className="account-communication__icon">
                    <FiMail />
                  </span>

                  <div>
                    <h3>Communication Preferences</h3>
                    <p>Choose how you want to be contacted.</p>
                  </div>
                </div>

                <label className="account-checkbox">
                  <input type="checkbox" defaultChecked />

                  <span className="account-checkbox__box">
                    <FiCheck />
                  </span>

                  <span>Receive product updates</span>
                </label>

                <label className="account-checkbox">
                  <input type="checkbox" defaultChecked />

                  <span className="account-checkbox__box">
                    <FiCheck />
                  </span>

                  <span>Receive learning recommendations</span>
                </label>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* =====================================================
          PHOTO MESSAGE
      ===================================================== */}

      {showPhotoMessage && (
        <div className="account-toast">
          <FiCamera />
          <span>Profile photo update selected.</span>

          <button
            type="button"
            onClick={() => setShowPhotoMessage(false)}
            aria-label="Close notification"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      {showDeleteConfirm && (
        <div
          className="account-modal-backdrop"
          onMouseDown={() => setShowDeleteConfirm(false)}
        >
          <div
            className="account-delete-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="account-delete-modal__icon">
              <FiTrash2 />
            </div>

            <h3>Delete Account?</h3>

            <p>
              This action cannot be undone. Your account and associated
              information will be permanently removed.
            </p>

            <div className="account-delete-modal__actions">
              <button
                type="button"
                className="account-delete-modal__cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="account-delete-modal__delete"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  window.alert("Account deletion would be processed here.");
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountSettings;
