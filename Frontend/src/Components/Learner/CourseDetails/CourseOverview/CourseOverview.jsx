import React from "react";
import {
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";

import "./CourseOverview.css";

const CourseOverview = ({ course }) => {
  if (!course) {
    return null;
  }

  const {
    title = "Course",
    description = "",
    categoryLabel = "Learning",
    difficulty = "beginner",
    durationLabel = "Not specified",
    modules = 0,
    rating = 0,
    learners = 0,
    skills = [],
    createdAt = "",
  } = course;

  /* =========================================================
     FORMAT HELPERS
  ========================================================= */

  const formatNumber = (number) => {
    const numericValue = Number(number);

    if (Number.isNaN(numericValue)) {
      return "0";
    }

    return numericValue.toLocaleString();
  };

  const formatDate = (date) => {
    if (!date) {
      return "Recently added";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently added";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDifficulty = (level) => {
    if (!level) {
      return "Beginner";
    }

    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  /* =========================================================
     COURSE INFORMATION
  ========================================================= */

  const courseInformation = [
    {
      id: "duration",
      label: "Duration",
      value: durationLabel,
      icon: <FiClock />,
      variant: "cyan",
    },
    {
      id: "modules",
      label: "Modules",
      value: `${modules} Modules`,
      icon: <FiLayers />,
      variant: "violet",
    },
    {
      id: "learners",
      label: "Learners",
      value: formatNumber(learners),
      icon: <FiUsers />,
      variant: "green",
    },
    {
      id: "level",
      label: "Level",
      value: formatDifficulty(difficulty),
      icon: <FiTrendingUp />,
      variant: "amber",
    },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="course-overview">
      {/* =====================================================
          SECTION INTRO
      ===================================================== */}

      <div className="course-overview__intro">
        <div className="course-overview__intro-content">
          <span className="course-overview__eyebrow">COURSE OVERVIEW</span>

          <h2 className="course-overview__title">
            Build knowledge that moves you forward
          </h2>

          <p className="course-overview__intro-text">
            Explore what this course offers, understand the learning commitment,
            and see how it can support your professional growth.
          </p>
        </div>

        <div className="course-overview__intro-mark">
          <FiBookOpen />
        </div>
      </div>

      {/* =====================================================
          MAIN OVERVIEW GRID
      ===================================================== */}

      <div className="course-overview__main-grid">
        {/* ===================================================
            ABOUT THIS COURSE
        =================================================== */}

        <Card variant="default" className="course-overview__about-card">
          <div className="course-overview__card-heading">
            <div className="course-overview__heading-icon course-overview__heading-icon--cyan">
              <FiBookOpen />
            </div>

            <div>
              <span className="course-overview__card-eyebrow">
                ABOUT THIS COURSE
              </span>

              <h3 className="course-overview__card-title">{title}</h3>
            </div>
          </div>

          <div className="course-overview__about-content">
            <p className="course-overview__description">
              {description ||
                "This course is designed to help you build practical knowledge and strengthen your professional capabilities."}
            </p>

            <div className="course-overview__category-row">
              <Badge variant="info" size="sm">
                {categoryLabel}
              </Badge>

              <span className="course-overview__updated">
                Added {formatDate(createdAt)}
              </span>
            </div>
          </div>
        </Card>

        {/* ===================================================
            COURSE INFORMATION
        =================================================== */}

        <Card variant="glass" className="course-overview__info-card">
          <div className="course-overview__card-heading">
            <div className="course-overview__heading-icon course-overview__heading-icon--violet">
              <FiTrendingUp />
            </div>

            <div>
              <span className="course-overview__card-eyebrow">
                COURSE INFORMATION
              </span>

              <h3 className="course-overview__card-title">At a glance</h3>
            </div>
          </div>

          <div className="course-overview__info-grid">
            {courseInformation.map((item) => (
              <div
                className={`course-overview__info-item course-overview__info-item--${item.variant}`}
                key={item.id}
              >
                <div className="course-overview__info-icon">{item.icon}</div>

                <div className="course-overview__info-content">
                  <span>{item.label}</span>

                  <strong>{item.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="course-overview__rating">
            <div className="course-overview__rating-icon">
              <FiStar />
            </div>

            <div className="course-overview__rating-content">
              <span>Course rating</span>

              <strong>
                {Number(rating).toFixed(1)}
                <small>/5.0</small>
              </strong>
            </div>

            <div className="course-overview__rating-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar
                  key={index}
                  className={
                    index < Math.round(Number(rating)) ? "is-filled" : ""
                  }
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* =====================================================
          WHAT YOU'LL LEARN
      ===================================================== */}

      <Card variant="default" className="course-overview__learning-card">
        <div className="course-overview__learning-header">
          <div className="course-overview__learning-heading">
            <div className="course-overview__heading-icon course-overview__heading-icon--green">
              <FiCheckCircle />
            </div>

            <div>
              <span className="course-overview__card-eyebrow">
                LEARNING FOCUS
              </span>

              <h3 className="course-overview__card-title">What you'll learn</h3>
            </div>
          </div>

          <div className="course-overview__learning-count">
            <strong>{skills.length}</strong>

            <span>{skills.length === 1 ? "skill" : "skills"}</span>
          </div>
        </div>

        {skills.length > 0 ? (
          <div className="course-overview__skills-grid">
            {skills.map((skill, index) => (
              <div className="course-overview__skill" key={`${skill}-${index}`}>
                <span className="course-overview__skill-check">
                  <FiCheckCircle />
                </span>

                <span className="course-overview__skill-name">{skill}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="course-overview__skills-empty">
            <FiCheckCircle />

            <p>Learning outcomes for this course will be available soon.</p>
          </div>
        )}
      </Card>

      {/* =====================================================
          LEARNING JOURNEY STRIP
      ===================================================== */}

      <div className="course-overview__journey">
        <div className="course-overview__journey-line" />

        <div className="course-overview__journey-item">
          <div className="course-overview__journey-icon course-overview__journey-icon--cyan">
            <FiBookOpen />
          </div>

          <div>
            <strong>Structured learning</strong>

            <span>Follow a clear course journey</span>
          </div>
        </div>

        <div className="course-overview__journey-item">
          <div className="course-overview__journey-icon course-overview__journey-icon--violet">
            <FiLayers />
          </div>

          <div>
            <strong>{modules} learning modules</strong>

            <span>Progress through focused topics</span>
          </div>
        </div>

        <div className="course-overview__journey-item">
          <div className="course-overview__journey-icon course-overview__journey-icon--green">
            <FiTrendingUp />
          </div>

          <div>
            <strong>Professional growth</strong>

            <span>Strengthen relevant capabilities</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
