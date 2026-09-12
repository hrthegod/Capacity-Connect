import React, { useState } from "react";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiEdit3,
  FiExternalLink,
  FiGlobe,
  FiGithub,
  FiLink,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiUser,
  FiX,
} from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

import "./PersonalInformation.css";

const PersonalInformation = () => {
  /* =========================================================
     PROFILE DATA
  ========================================================= */

  const [profile, setProfile] = useState({
    name: "Arjun Mehta",
    role: "Lifelong Learner",
    email: "arjun.mehta@email.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    education: "B.Tech in Environmental Science",
    currentRole: "Learner",
    organization: "Capacity Connect",
    memberSince: "January 2024",
    bio: "Passionate about environmental sustainability and ocean sciences. Always eager to learn and contribute to a better tomorrow.",
    linkedin: "https://www.linkedin.com/",
    website: "https://example.com/",
    github: "https://github.com/",
  });

  /* =========================================================
     EDIT STATE
  ========================================================= */

  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState(profile);

  /* =========================================================
     HANDLE EDIT
  ========================================================= */

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  /* =========================================================
     HANDLE CLOSE
  ========================================================= */

  const handleClose = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     HANDLE SAVE
  ========================================================= */

  const handleSave = (event) => {
    event.preventDefault();

    setProfile(editForm);
    setIsEditing(false);
  };

  /* =========================================================
     INFORMATION DATA
  ========================================================= */

  const informationItems = [
    {
      id: "name",
      label: "Full Name",
      value: profile.name,
      icon: FiUser,
      theme: "blue",
    },
    {
      id: "email",
      label: "Email Address",
      value: profile.email,
      icon: FiMail,
      theme: "coral",
    },
    {
      id: "phone",
      label: "Phone Number",
      value: profile.phone,
      icon: FiPhone,
      theme: "green",
    },
    {
      id: "location",
      label: "Location",
      value: profile.location,
      icon: FiMapPin,
      theme: "purple",
    },
    {
      id: "education",
      label: "Education",
      value: profile.education,
      icon: FiUser,
      theme: "gold",
    },
    {
      id: "role",
      label: "Current Role",
      value: profile.currentRole,
      icon: FiBriefcase,
      theme: "blue",
    },
    {
      id: "organization",
      label: "Organization",
      value: profile.organization,
      icon: FiBriefcase,
      theme: "coral",
    },
    {
      id: "member",
      label: "Member Since",
      value: profile.memberSince,
      icon: FiCalendar,
      theme: "green",
    },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="personal-information">
      {/* =======================================================
          SECTION HEADER
      ======================================================= */}

      <div className="personal-information__header">
        <div className="personal-information__title-group">
          <div className="personal-information__title-icon">
            <FiUser aria-hidden="true" />
          </div>

          <div>
            <h2>Personal Information</h2>

            <p>Your personal details and professional information</p>
          </div>
        </div>

        {/* Decorative handwritten message */}

        <div className="personal-information__header-note">
          <span>Better Learner</span>
          <span>Brighter Tomorrow</span>

          <svg
            viewBox="0 0 120 35"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 25C34 32 72 25 113 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M97 5L113 4L104 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Edit button */}

        <button
          type="button"
          className="personal-information__edit-button"
          onClick={handleEdit}
        >
          <FiEdit3 aria-hidden="true" />
          <span>Edit Information</span>
        </button>
      </div>

      {/* =======================================================
          MAIN CONTENT
      ======================================================= */}

      <div className="personal-information__main">
        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <article className="personal-information__profile-card">
          {/* Navy upper section */}

          <div className="personal-information__profile-cover">
            <div className="personal-information__cover-rings">
              <span />
              <span />
              <span />
            </div>

            <div className="personal-information__profile-quote">
              <span>Good</span>
              <span>Things</span>
              <span>Take Time</span>

              <svg
                viewBox="0 0 150 45"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 30C44 40 93 27 144 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Profile image */}

          <div className="personal-information__avatar-wrapper">
            <div className="personal-information__avatar">
              <img
                src="/Images/profile-avatar.jpg"
                alt={profile.name}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement.classList.add(
                    "has-fallback",
                  );
                }}
              />

              <span className="personal-information__avatar-fallback">AM</span>
            </div>

            <button
              type="button"
              className="personal-information__camera-button"
              aria-label="Change profile photo"
              onClick={handleEdit}
            >
              <FiEdit3 aria-hidden="true" />
            </button>
          </div>

          {/* Profile details */}

          <div className="personal-information__profile-body">
            <div className="personal-information__profile-name">
              <h3>{profile.name}</h3>

              <FiCheckCircle
                aria-label="Verified learner"
                title="Verified learner"
              />
            </div>

            <p className="personal-information__profile-role">{profile.role}</p>

            <div className="personal-information__profile-divider" />

            <p className="personal-information__profile-bio">{profile.bio}</p>

            {/* Learning mindset */}

            <div className="personal-information__mindset">
              <div className="personal-information__mindset-icon">
                <span>✦</span>
              </div>

              <div>
                <span className="personal-information__mindset-label">
                  Learning Mindset
                </span>

                <p>“Small steps every day lead to big results.”</p>
              </div>
            </div>
          </div>
        </article>

        {/* =====================================================
            INFORMATION CARDS
        ===================================================== */}

        <div className="personal-information__details">
          {informationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                className={`personal-information__detail-card personal-information__detail-card--${item.theme}`}
                key={item.id}
                onClick={handleEdit}
                aria-label={`Edit ${item.label}`}
              >
                <span className="personal-information__detail-icon">
                  <Icon aria-hidden="true" />
                </span>

                <span className="personal-information__detail-content">
                  <span className="personal-information__detail-label">
                    {item.label}
                  </span>

                  <span className="personal-information__detail-value">
                    {item.value}
                  </span>
                </span>

                <FiArrowUpRight
                  className="personal-information__detail-arrow"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* =======================================================
          CONNECT SECTION
      ======================================================= */}

      <div className="personal-information__connect">
        <div className="personal-information__connect-intro">
          <div className="personal-information__connect-icon">
            <FiLink aria-hidden="true" />
          </div>

          <div>
            <h3>Connect</h3>
            <p>Let&apos;s stay in touch</p>
          </div>
        </div>

        <div className="personal-information__social-links">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="personal-information__social-link personal-information__social-link--linkedin"
          >
            <FaLinkedinIn aria-hidden="true" />

            <span>LinkedIn</span>

            <FiExternalLink aria-hidden="true" />
          </a>

          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="personal-information__social-link"
          >
            <FiGlobe aria-hidden="true" />

            <span>Website</span>

            <FiExternalLink aria-hidden="true" />
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="personal-information__social-link personal-information__social-link--github"
          >
            <FiGithub aria-hidden="true" />

            <span>GitHub</span>

            <FiExternalLink aria-hidden="true" />
          </a>
        </div>

        {/* Quote */}

        <div className="personal-information__connect-quote">
          <span className="personal-information__quote-mark">“</span>

          <div>
            <p>Learning never exhausts the mind.</p>
            <span>— Leonardo da Vinci</span>
          </div>

          <div className="personal-information__leaf-decoration">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* =======================================================
          EDIT MODAL
      ======================================================= */}

      {isEditing && (
        <div
          className="personal-information__modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <div
            className="personal-information__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="personal-information-edit-title"
          >
            {/* Modal header */}

            <div className="personal-information__modal-header">
              <div>
                <span className="personal-information__modal-kicker">
                  PROFILE SETTINGS
                </span>

                <h3 id="personal-information-edit-title">Edit Information</h3>

                <p>Keep your profile details up to date.</p>
              </div>

              <button
                type="button"
                className="personal-information__modal-close"
                onClick={handleClose}
                aria-label="Close edit information"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            {/* Form */}

            <form className="personal-information__form" onSubmit={handleSave}>
              <div className="personal-information__form-grid">
                <label>
                  <span>Full Name</span>

                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  <span>Professional Role</span>

                  <input
                    type="text"
                    name="role"
                    value={editForm.role}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  <span>Email Address</span>

                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  <span>Phone Number</span>

                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  <span>Location</span>

                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  <span>Education</span>

                  <input
                    type="text"
                    name="education"
                    value={editForm.education}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  <span>Current Role</span>

                  <input
                    type="text"
                    name="currentRole"
                    value={editForm.currentRole}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  <span>Organization</span>

                  <input
                    type="text"
                    name="organization"
                    value={editForm.organization}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="personal-information__form-field--full">
                  <span>Bio</span>

                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </label>

                <label>
                  <span>LinkedIn</span>

                  <input
                    type="url"
                    name="linkedin"
                    value={editForm.linkedin}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  <span>Website</span>

                  <input
                    type="url"
                    name="website"
                    value={editForm.website}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  <span>GitHub</span>

                  <input
                    type="url"
                    name="github"
                    value={editForm.github}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              {/* Form actions */}

              <div className="personal-information__form-actions">
                <button
                  type="button"
                  className="personal-information__cancel-button"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="personal-information__save-button"
                >
                  <FiSave aria-hidden="true" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonalInformation;
