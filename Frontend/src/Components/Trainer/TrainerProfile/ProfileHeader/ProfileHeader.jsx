import React, { useState } from "react";
import {
  LuArrowUpRight,
  LuBookOpen,
  LuCalendarDays,
  LuCheck,
  LuCopy,
  LuPencil ,
  LuGraduationCap,
  LuMapPin,
  LuPenLine,
  LuShare2,
  LuSparkles,
  LuStar,
  LuTrophy,
  LuUsersRound,
  LuX,
} from "react-icons/lu";

import "./ProfileHeader.css";

const trainerProfile = {
  name: "Sarah Khan",
  role: "Senior Frontend Trainer",
  trainerId: "TRN-2024-018",
  department: "Technology & Development",
  location: "Karachi, Pakistan",
  quote:
    "Passionate about empowering learners through modern web technologies and creating engaging, hands-on learning experiences.",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85",
};

const profileStats = [
  {
    id: "courses",
    value: "28",
    label: "Courses Delivered",
    change: "+12%",
    icon: LuBookOpen,
    theme: "sky",
  },
  {
    id: "learners",
    value: "1,250",
    label: "Learners Trained",
    change: "+18%",
    icon: LuUsersRound,
    theme: "mint",
  },
  {
    id: "sessions",
    value: "96",
    label: "Training Sessions",
    change: "+10%",
    icon: LuCalendarDays,
    theme: "lavender",
  },
  {
    id: "rating",
    value: "4.8",
    label: "Average Rating",
    change: "+6%",
    icon: LuStar,
    theme: "peach",
  },
];

const ProfileHeader = () => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    window.clearTimeout(window.__trainerProfileMessageTimer);

    window.__trainerProfileMessageTimer = window.setTimeout(() => {
      setMessage("");
    }, 2800);
  };

  const handleEditProfile = () => {
    window.dispatchEvent(
      new CustomEvent("trainer-profile-edit", {
        detail: {
          trainer: trainerProfile,
        },
      }),
    );

    showMessage("Profile editing workspace opened.");
  };

  const handleShareProfile = async () => {
    const profileUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${trainerProfile.name} — Trainer Profile`,
          text: `View ${trainerProfile.name}'s trainer profile.`,
          url: profileUrl,
        });

        showMessage("Profile sharing opened.");
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        showMessage("Profile link copied to clipboard.");

        window.setTimeout(() => {
          setCopied(false);
        }, 2200);

        return;
      }

      showMessage("Profile link is ready to share.");
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      showMessage("Unable to open profile sharing.");
    }
  };

  const handleAvatarEdit = () => {
    window.dispatchEvent(new CustomEvent("trainer-profile-avatar-edit"));

    showMessage("Profile photo editor opened.");
  };

  const handleInspiration = () => {
    window.dispatchEvent(new CustomEvent("trainer-profile-inspiration"));

    showMessage("Keep inspiring your learners.");
  };

  const handlePerformance = () => {
    window.dispatchEvent(new CustomEvent("trainer-profile-performance"));

    showMessage("Performance overview opened.");
  };

  const handleStatClick = (stat) => {
    window.dispatchEvent(
      new CustomEvent("trainer-profile-stat-click", {
        detail: {
          stat: stat.id,
          label: stat.label,
        },
      }),
    );

    showMessage(`${stat.label} details opened.`);
  };

  return (
    <section className="profile-header">
      <div className="profile-header-shell">
        {/* =====================================================
            MAIN PROFILE AREA
        ====================================================== */}

        <div className="profile-header-main">
          {/* PROFILE PHOTO */}

          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-ring">
                <img
                  src={trainerProfile.avatar}
                  alt={`${trainerProfile.name} profile`}
                  className="profile-avatar"
                />
              </div>

              <div className="profile-online-status">
                <span className="profile-online-dot" />
                <span>Online</span>
              </div>

              <button
                type="button"
                className="profile-avatar-edit"
                onClick={handleAvatarEdit}
                aria-label="Edit profile photo"
                title="Edit profile photo"
              >
                <LuPenLine size={17} strokeWidth={1.9} />
              </button>
            </div>
          </div>

          {/* PROFILE INFORMATION */}

          <div className="profile-header-information">
            <div className="profile-eyebrow">
              <span>TRAINER PROFILE</span>
            </div>

            <div className="profile-name-row">
              <h1>{trainerProfile.name}</h1>

              <span
                className="profile-verified"
                title="Verified trainer"
                aria-label="Verified trainer"
              >
                <LuCheck size={14} strokeWidth={2.5} />
              </span>
            </div>

            <p className="profile-role">{trainerProfile.role}</p>

            {/* META INFORMATION */}

            <div className="profile-meta-list">
              <div className="profile-meta-item profile-meta-id">
                <span className="profile-meta-icon">
                  <LuGraduationCap size={16} strokeWidth={1.8} />
                </span>

                <span>{trainerProfile.trainerId}</span>
              </div>

              <div className="profile-meta-item profile-meta-department">
                <span className="profile-meta-icon">
                  <LuBookOpen size={16} strokeWidth={1.8} />
                </span>

                <span>{trainerProfile.department}</span>
              </div>

              <div className="profile-meta-item profile-meta-location">
                <span className="profile-meta-icon">
                  <LuMapPin size={16} strokeWidth={1.8} />
                </span>

                <span>{trainerProfile.location}</span>
              </div>
            </div>

            {/* QUOTE */}

            <div className="profile-quote">
              <span className="profile-quote-mark">“</span>

              <p>{trainerProfile.quote}</p>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="profile-header-actions">
            <button
              type="button"
              className="profile-share-button"
              onClick={handleShareProfile}
            >
              <span className="profile-action-icon">
                {copied ? (
                  <LuCheck size={17} strokeWidth={1.9} />
                ) : (
                  <LuShare2 size={17} strokeWidth={1.9} />
                )}
              </span>

              <span>{copied ? "Copied" : "Share Profile"}</span>
            </button>

            <button
              type="button"
              className="profile-edit-button"
              onClick={handleEditProfile}
            >
              <LuPencil size={17} strokeWidth={1.9} />

              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* =====================================================
            INSPIRATION CARD
        ====================================================== */}

        <div className="profile-inspiration-card">
          <div className="profile-inspiration-icon">
            <LuGraduationCap size={24} strokeWidth={1.7} />
          </div>

          <div className="profile-inspiration-content">
            <div className="profile-inspiration-title">
              <strong>Keep Inspiring</strong>

              <LuSparkles size={18} strokeWidth={1.7} />
            </div>

            <p>Your knowledge creates brighter futures for every learner.</p>
          </div>

          <button
            type="button"
            className="profile-inspiration-action"
            onClick={handleInspiration}
            aria-label="Keep inspiring"
            title="Keep inspiring"
          >
            <LuArrowUpRight size={19} strokeWidth={1.9} />
          </button>

          <div
            className="profile-inspiration-decoration profile-inspiration-decoration-one"
            aria-hidden="true"
          />

          <div
            className="profile-inspiration-decoration profile-inspiration-decoration-two"
            aria-hidden="true"
          />
        </div>

        {/* =====================================================
            STAT CARDS
        ====================================================== */}

        <div className="profile-stat-grid">
          {profileStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <button
                type="button"
                key={stat.id}
                className={`profile-stat-card profile-stat-${stat.theme}`}
                onClick={() => handleStatClick(stat)}
              >
                <span className="profile-stat-icon">
                  <Icon size={24} strokeWidth={1.7} />
                </span>

                <span className="profile-stat-information">
                  <strong>{stat.value}</strong>

                  <span className="profile-stat-label">{stat.label}</span>

                  <span className="profile-stat-change">
                    <LuArrowUpRight size={14} strokeWidth={2} />

                    <span>{stat.change}</span>
                  </span>
                </span>
              </button>
            );
          })}

          {/* ===================================================
              NAVY PERFORMANCE CARD
          ==================================================== */}

          <button
            type="button"
            className="profile-performance-card"
            onClick={handlePerformance}
          >
            <span className="profile-performance-icon">
              <LuTrophy size={25} strokeWidth={1.7} />
            </span>

            <span className="profile-performance-content">
              <strong>Top Performer</strong>

              <span>Among all trainers</span>
            </span>

            <span className="profile-performance-arrow">
              <LuArrowUpRight size={19} strokeWidth={1.9} />
            </span>

            <span className="profile-performance-glow" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* =======================================================
          FEEDBACK MESSAGE
      ======================================================== */}

      {message && (
        <div
          className="profile-header-message"
          role="status"
          aria-live="polite"
        >
          <span className="profile-header-message-icon">
            <LuCheck size={15} strokeWidth={2} />
          </span>

          <span>{message}</span>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Close message"
          >
            <LuX size={14} strokeWidth={1.9} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProfileHeader;
