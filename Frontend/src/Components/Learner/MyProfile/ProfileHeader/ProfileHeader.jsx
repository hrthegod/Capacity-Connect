import React, { useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCamera,
  FiCheckCircle,
  FiEdit3,
  FiGlobe,
  FiMapPin,
  FiMail,
  FiX,
} from "react-icons/fi";
import "./ProfileHeader.css";

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85",
  );

  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "Arjun Mehta",
    role: "Lifelong Learner",
    email: "arjun.mehta@email.com",
    location: "New Delhi, India",
    joined: "Jan 2024",
    bio: "Passionate about environmental sustainability and ocean sciences. Always eager to learn and contribute to a better tomorrow.",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleEditToggle = () => {
    setIsEditing((previous) => !previous);
    setShowProfileMenu(false);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="profile-header">
      {/* ================================================================
          PAGE INTRODUCTION
      ================================================================ */}
      <div className="profile-header__intro">
        <div className="profile-header__intro-left">
          <button
            type="button"
            className="profile-header__back-button"
            onClick={handleBack}
            aria-label="Back to dashboard"
          >
            <FiArrowLeft aria-hidden="true" />
            <span>Back to Dashboard</span>
          </button>

          <div className="profile-header__title-block">
            <h1>My Profile</h1>

            <p>
              Manage your profile, track your progress, and showcase your
              achievements
            </p>
          </div>
        </div>

        {/* Quote Card */}
        <div className="profile-header__quote-card">
          <div className="profile-header__quote-icon" aria-hidden="true">
            “
          </div>

          <div className="profile-header__quote-content">
            <strong>
              “A little progress each day
              <br />
              adds up to big results.”
            </strong>

            <span>Keep Learning!</span>
          </div>

          <div className="profile-header__quote-decoration">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* ================================================================
          PROFILE HERO CARD
      ================================================================ */}
      <div className="profile-header__card">
        {/* Cover */}
        <div className="profile-header__cover">
          <div className="profile-header__cover-overlay" />

          <div className="profile-header__cover-pattern">
            <span />
            <span />
            <span />
          </div>

          <button
            type="button"
            className={`profile-header__edit-button ${
              isEditing ? "is-editing" : ""
            }`}
            onClick={handleEditToggle}
          >
            {isEditing ? (
              <>
                <FiX aria-hidden="true" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <FiEdit3 aria-hidden="true" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-header__content">
          {/* Avatar */}
          <div className="profile-header__avatar-wrapper">
            <div className="profile-header__avatar-ring">
              <img
                src={profileImage}
                alt={`${profile.name} profile`}
                className="profile-header__avatar"
              />
            </div>

            <button
              type="button"
              className="profile-header__camera-button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile picture"
              title="Change profile picture"
            >
              <FiCamera aria-hidden="true" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="profile-header__file-input"
              onChange={handleImageChange}
            />
          </div>

          {/* Main Details */}
          <div className="profile-header__details">
            <div className="profile-header__name-row">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="profile-header__name-input"
                  aria-label="Full name"
                />
              ) : (
                <h2>{profile.name}</h2>
              )}

              <span
                className="profile-header__verified"
                title="Verified learner"
                aria-label="Verified learner"
              >
                <FiCheckCircle aria-hidden="true" />
              </span>

              <span className="profile-header__status">
                <span className="profile-header__status-dot" />
                Active Learner
              </span>
            </div>

            {isEditing ? (
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="profile-header__role-input"
                aria-label="Profile role"
              />
            ) : (
              <p className="profile-header__role">{profile.role}</p>
            )}

            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="profile-header__bio-input"
                rows="3"
                aria-label="Profile bio"
              />
            ) : (
              <p className="profile-header__bio">{profile.bio}</p>
            )}

            {/* Meta Information */}
            <div className="profile-header__meta">
              {isEditing ? (
                <label className="profile-header__meta-input">
                  <FiMail aria-hidden="true" />

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    aria-label="Email address"
                  />
                </label>
              ) : (
                <a
                  href={`mailto:${profile.email}`}
                  className="profile-header__meta-item profile-header__meta-link"
                >
                  <FiMail aria-hidden="true" />
                  <span>{profile.email}</span>
                </a>
              )}

              {isEditing ? (
                <label className="profile-header__meta-input">
                  <FiMapPin aria-hidden="true" />

                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    aria-label="Location"
                  />
                </label>
              ) : (
                <span className="profile-header__meta-item">
                  <FiMapPin aria-hidden="true" />
                  <span>{profile.location}</span>
                </span>
              )}

              <span className="profile-header__meta-item">
                <FiCalendar aria-hidden="true" />
                <span>Joined {profile.joined}</span>
              </span>
            </div>

            {/* Save */}
            {isEditing && (
              <div className="profile-header__edit-actions">
                <button
                  type="button"
                  className="profile-header__save-button"
                  onClick={handleSaveProfile}
                >
                  <FiCheckCircle aria-hidden="true" />
                  Save Changes
                </button>

                <button
                  type="button"
                  className="profile-header__discard-button"
                  onClick={() => setIsEditing(false)}
                >
                  Discard
                </button>
              </div>
            )}
          </div>

          {/* Decorative Handwritten Text */}
          <div className="profile-header__message">
            <span>Good</span>
            <span>Things</span>
            <span>Take Time</span>

            <svg
              className="profile-header__message-line"
              viewBox="0 0 170 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 25C35 33 75 31 105 22C125 16 142 10 165 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ================================================================
          SMALL PROFILE QUICK MENU
      ================================================================ */}
      <div className="profile-header__quick-actions">
        <button
          type="button"
          className="profile-header__quick-action"
          onClick={() => setShowProfileMenu((previous) => !previous)}
          aria-expanded={showProfileMenu}
        >
          <span className="profile-header__quick-icon">
            <FiGlobe aria-hidden="true" />
          </span>

          <span>Profile Visibility</span>

          <FiArrowRight
            className={`profile-header__quick-arrow ${
              showProfileMenu ? "is-open" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {showProfileMenu && (
          <div className="profile-header__quick-menu">
            <button type="button" onClick={() => setShowProfileMenu(false)}>
              Public Profile
            </button>

            <button type="button" onClick={() => setShowProfileMenu(false)}>
              Learners Only
            </button>

            <button type="button" onClick={() => setShowProfileMenu(false)}>
              Private
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;
