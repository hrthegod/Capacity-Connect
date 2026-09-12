import React, { useState } from "react";

import {
  LuUsers,
  LuSearch,
  LuPlus,
  LuGraduationCap,
  LuClock3,
  LuCircleCheck,
  LuSparkles,
  LuArrowRight,
  LuX,
  LuUserPlus,
  LuMail,
  LuBookOpen,
} from "react-icons/lu";

import "./LearnersHeader.css";

const LearnersHeader = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [searchValue, setSearchValue] = useState("");
  const [showAddLearner, setShowAddLearner] = useState(false);

  const [learnerForm, setLearnerForm] = useState({
    name: "",
    email: "",
    course: "",
  });

  // =====================================================
  // DATA
  // =====================================================

  const stats = [
    {
      id: "total",
      title: "Total Learners",
      value: "128",
      change: "12%",
      description: "from last month",
      icon: LuUsers,
      className: "stat-mint",
      positive: true,
    },
    {
      id: "active",
      title: "Active Learners",
      value: "96",
      change: "8%",
      description: "from last month",
      icon: LuGraduationCap,
      className: "stat-lavender",
      positive: true,
    },
    {
      id: "risk",
      title: "At Risk",
      value: "12",
      change: "3%",
      description: "from last month",
      icon: LuClock3,
      className: "stat-peach",
      positive: false,
    },
    {
      id: "completed",
      title: "Completed",
      value: "20",
      change: "25%",
      description: "from last month",
      icon: LuCircleCheck,
      className: "stat-sky",
      positive: true,
    },
  ];

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (event) => {
    const value = event.target.value;

    setSearchValue(value);

    /*
     * Send search value to other learner components.
     * Later this can be replaced with shared state/context.
     */
    window.dispatchEvent(
      new CustomEvent("trainer-learners-search", {
        detail: {
          searchValue: value,
        },
      }),
    );
  };

  const clearSearch = () => {
    setSearchValue("");

    window.dispatchEvent(
      new CustomEvent("trainer-learners-search", {
        detail: {
          searchValue: "",
        },
      }),
    );
  };

  // =====================================================
  // ADD LEARNER
  // =====================================================

  const handleLearnerFormChange = (event) => {
    const { name, value } = event.target;

    setLearnerForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddLearner = (event) => {
    event.preventDefault();

    if (
      !learnerForm.name.trim() ||
      !learnerForm.email.trim() ||
      !learnerForm.course.trim()
    ) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("trainer-add-learner", {
        detail: {
          ...learnerForm,
        },
      }),
    );

    setLearnerForm({
      name: "",
      email: "",
      course: "",
    });

    setShowAddLearner(false);
  };

  // =====================================================
  // SUPPORT ACTION
  // =====================================================

  const handleSupportClick = () => {
    window.dispatchEvent(new CustomEvent("trainer-support-learners"));
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <section className="learners-header">
        {/* =================================================
            TOP HEADER
        ================================================= */}

        <div className="learners-heading-row">
          <div className="learners-heading">
            <div className="learners-heading-icon">
              <LuUsers />
            </div>

            <div className="learners-heading-content">
              <span className="learners-eyebrow">LEARNERS</span>

              <h1>Manage Learners</h1>

              <p>View, track, and support your learners&apos; progress</p>
            </div>
          </div>

          {/* =================================================
              HEADER ACTIONS
          ================================================= */}

          <div className="learners-heading-actions">
            {/* SEARCH */}

            <div className="learners-search">
              <LuSearch className="learners-search-icon" />

              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search learners by name, email, or course..."
                aria-label="Search learners"
              />

              {searchValue ? (
                <button
                  type="button"
                  className="learners-search-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <LuX />
                </button>
              ) : (
                <div className="learners-search-shortcut">
                  <span>Ctrl</span>
                  <span>K</span>
                </div>
              )}
            </div>

            {/* ADD LEARNER */}

            <button
              type="button"
              className="learners-add-button"
              onClick={() => setShowAddLearner(true)}
            >
              <LuPlus />

              <span>Add Learner</span>
            </button>
          </div>
        </div>

        {/* =================================================
            STATS + SUPPORT
        ================================================= */}

        <div className="learners-summary-grid">
          {/* =================================================
              STAT CARDS
          ================================================= */}

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.id}
                className={`learner-stat-card ${stat.className}`}
              >
                <div className="learner-stat-top">
                  <div className="learner-stat-icon">
                    <Icon />
                  </div>

                  <span className="learner-stat-title">{stat.title}</span>
                </div>

                <div className="learner-stat-value">{stat.value}</div>

                <div className="learner-stat-footer">
                  <span
                    className={
                      stat.positive
                        ? "stat-change positive"
                        : "stat-change negative"
                    }
                  >
                    ↑ {stat.change}
                  </span>

                  <span className="stat-description">{stat.description}</span>
                </div>
              </article>
            );
          })}

          {/* =================================================
              DARK SUPPORT CARD
          ================================================= */}

          <article className="learner-support-card">
            <div className="support-card-top">
              <div className="support-icon">
                <LuSparkles />
              </div>

              <button
                type="button"
                className="support-arrow"
                onClick={handleSupportClick}
                aria-label="Support learner growth"
              >
                <LuArrowRight />
              </button>
            </div>

            <div className="support-card-content">
              <h2>Support Their Growth</h2>

              <p>Help learners stay consistent and achieve their goals.</p>
            </div>

            <div className="support-learners">
              <div className="support-avatar">
                <img src="https://i.pravatar.cc/80?img=47" alt="Learner" />
              </div>

              <div className="support-avatar">
                <img src="https://i.pravatar.cc/80?img=32" alt="Learner" />
              </div>

              <div className="support-avatar">
                <img src="https://i.pravatar.cc/80?img=12" alt="Learner" />
              </div>

              <div className="support-avatar">
                <img src="https://i.pravatar.cc/80?img=44" alt="Learner" />
              </div>

              <span className="support-more">+124</span>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================
          ADD LEARNER MODAL
      ===================================================== */}

      {showAddLearner && (
        <div
          className="learner-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAddLearner(false);
            }
          }}
        >
          <div className="learner-modal">
            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="learner-modal-header">
              <div className="modal-heading">
                <div className="modal-icon">
                  <LuUserPlus />
                </div>

                <div>
                  <h2>Add Learner</h2>

                  <p>Create a new learner profile</p>
                </div>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() => setShowAddLearner(false)}
                aria-label="Close add learner"
              >
                <LuX />
              </button>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form className="learner-modal-form" onSubmit={handleAddLearner}>
              {/* NAME */}

              <div className="modal-input-group">
                <label htmlFor="learner-name">Learner Name</label>

                <div className="modal-input-wrapper">
                  <LuUsers />

                  <input
                    id="learner-name"
                    name="name"
                    type="text"
                    value={learnerForm.name}
                    onChange={handleLearnerFormChange}
                    placeholder="Enter learner name"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="modal-input-group">
                <label htmlFor="learner-email">Email Address</label>

                <div className="modal-input-wrapper">
                  <LuMail />

                  <input
                    id="learner-email"
                    name="email"
                    type="email"
                    value={learnerForm.email}
                    onChange={handleLearnerFormChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              {/* COURSE */}

              <div className="modal-input-group">
                <label htmlFor="learner-course-modal">Course</label>

                <div className="modal-input-wrapper">
                  <LuBookOpen />

                  <input
                    id="learner-course-modal"
                    name="course"
                    type="text"
                    value={learnerForm.course}
                    onChange={handleLearnerFormChange}
                    placeholder="Enter course name"
                    required
                  />
                </div>
              </div>

              {/* =================================================
                  MODAL ACTIONS
              ================================================= */}

              <div className="learner-modal-actions">
                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={() => setShowAddLearner(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="modal-submit-button">
                  <LuPlus />
                  Add Learner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LearnersHeader;
