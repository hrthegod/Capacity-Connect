import React from "react";
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiGlobe,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import Card from "../../../../Reusable_components/Card/Card";
import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import Avatar from "../../../../Reusable_components/Avatar/Avatar";

import "./CourseTrainer.css";

const CourseTrainer = ({ trainer, onViewProfile }) => {
  if (!trainer) {
    return null;
  }

  const {
    name,
    designation,
    organization,
    department,
    avatar,
    bio,
    shortBio,
    experienceYears,
    specialization,
    expertise = [],
    qualifications = [],
    certifications = [],
    rating,
    totalReviews,
    totalLearners,
    totalCourses,
    completedCourses,
    yearsTeaching,
    skills = [],
    subjects = [],
    location,
    languages = [],
    trainerType,
    availability,
    verified,
  } = trainer;

  const formatNumber = (value) => {
    if (value === undefined || value === null || value === "") {
      return "—";
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      return value;
    }

    return numericValue.toLocaleString("en-IN");
  };

  const getInitials = (value = "") => {
    return value
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const displayedExpertise =
    expertise.length > 0
      ? expertise.slice(0, 5)
      : skills.length > 0
        ? skills.slice(0, 5)
        : [];

  const displayedQualifications = qualifications.slice(0, 3);

  const trainerDescription =
    shortBio ||
    bio ||
    "Experienced professional dedicated to delivering practical, research-driven learning experiences.";

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(trainer);
    }
  };

  return (
    <section className="course-trainer">
      <div className="course-trainer__container">
        {/* ---------------------------------------------------------
            SECTION HEADER
        --------------------------------------------------------- */}
        <div className="course-trainer__header">
          <div className="course-trainer__heading-group">
            <span className="course-trainer__eyebrow">
              <span className="course-trainer__eyebrow-line" />
              COURSE TRAINER
            </span>

            <h2 className="course-trainer__title">
              Learn from experienced experts
            </h2>

            <p className="course-trainer__subtitle">
              Gain practical knowledge and expert guidance from professionals
              with real-world experience in their field.
            </p>
          </div>

          <div className="course-trainer__header-mark">
            <FiAward />
          </div>
        </div>

        {/* ---------------------------------------------------------
            MAIN TRAINER CARD
        --------------------------------------------------------- */}
        <Card
          variant="glass"
          size="lg"
          rounded="xl"
          hover={true}
          className="course-trainer__card"
        >
          {/* Decorative glass layers */}
          <div className="course-trainer__card-glow course-trainer__card-glow--one" />
          <div className="course-trainer__card-glow course-trainer__card-glow--two" />

          <div className="course-trainer__content">
            {/* -----------------------------------------------------
                LEFT PROFILE COLUMN
            ----------------------------------------------------- */}
            <div className="course-trainer__profile">
              <div className="course-trainer__avatar-wrapper">
                {avatar ? (
                  <Avatar
                    src={avatar}
                    alt={name || "Course trainer"}
                    size="xl"
                  />
                ) : (
                  <div className="course-trainer__avatar-fallback">
                    {getInitials(name)}
                  </div>
                )}

                {verified && (
                  <span
                    className="course-trainer__verified"
                    title="Verified trainer"
                  >
                    <FiCheckCircle />
                  </span>
                )}
              </div>

              <div className="course-trainer__profile-badge">
                <Badge variant="success">
                  {verified ? "Verified Expert" : "Course Expert"}
                </Badge>
              </div>

              <div className="course-trainer__profile-label">
                <FiBookOpen />
                <span>Course Instructor</span>
              </div>
            </div>

            {/* -----------------------------------------------------
                RIGHT INFORMATION COLUMN
            ----------------------------------------------------- */}
            <div className="course-trainer__details">
              {/* Identity */}
              <div className="course-trainer__identity">
                <div className="course-trainer__name-row">
                  <h3 className="course-trainer__name">
                    {name || "Course Trainer"}
                  </h3>

                  {verified && (
                    <span className="course-trainer__verified-label">
                      <FiCheckCircle />
                      Verified
                    </span>
                  )}
                </div>

                {designation && (
                  <p className="course-trainer__designation">{designation}</p>
                )}

                {organization && (
                  <p className="course-trainer__organization">{organization}</p>
                )}

                {department && (
                  <p className="course-trainer__department">{department}</p>
                )}
              </div>

              {/* Rating + Trainer Type */}
              <div className="course-trainer__rating-row">
                <div className="course-trainer__rating">
                  <span className="course-trainer__rating-icon">
                    <FiStar />
                  </span>

                  <strong>
                    {rating !== undefined && rating !== null
                      ? Number(rating).toFixed(1)
                      : "—"}
                  </strong>

                  <span className="course-trainer__rating-label">
                    Trainer rating
                  </span>

                  {totalReviews !== undefined && (
                    <>
                      <span className="course-trainer__rating-divider" />
                      <span className="course-trainer__reviews">
                        {formatNumber(totalReviews)} reviews
                      </span>
                    </>
                  )}
                </div>

                {trainerType && <Badge variant="info">{trainerType}</Badge>}
              </div>

              {/* Bio */}
              <div className="course-trainer__bio">
                <div className="course-trainer__bio-mark">“</div>

                <p>{trainerDescription}</p>
              </div>

              {/* Specialization */}
              {specialization && (
                <div className="course-trainer__specialization">
                  <span className="course-trainer__label">SPECIALIZATION</span>

                  <div className="course-trainer__specialization-value">
                    <span className="course-trainer__specialization-icon">
                      <FiGlobe />
                    </span>

                    <span>{specialization}</span>
                  </div>
                </div>
              )}

              {/* Expertise */}
              {displayedExpertise.length > 0 && (
                <div className="course-trainer__expertise">
                  <div className="course-trainer__section-label">
                    <span>Areas of expertise</span>
                  </div>

                  <div className="course-trainer__expertise-list">
                    {displayedExpertise.map((item, index) => (
                      <span
                        className={`course-trainer__expertise-chip course-trainer__expertise-chip--${index % 5}`}
                        key={`${item}-${index}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="course-trainer__stats">
                <div className="course-trainer__stat course-trainer__stat--cyan">
                  <span className="course-trainer__stat-icon">
                    <FiBriefcase />
                  </span>

                  <div className="course-trainer__stat-content">
                    <strong>
                      {experienceYears !== undefined
                        ? `${experienceYears}+`
                        : "—"}
                    </strong>
                    <span>Years experience</span>
                  </div>
                </div>

                <div className="course-trainer__stat course-trainer__stat--green">
                  <span className="course-trainer__stat-icon">
                    <FiUsers />
                  </span>

                  <div className="course-trainer__stat-content">
                    <strong>{formatNumber(totalLearners)}</strong>
                    <span>Learners guided</span>
                  </div>
                </div>

                <div className="course-trainer__stat course-trainer__stat--violet">
                  <span className="course-trainer__stat-icon">
                    <FiBookOpen />
                  </span>

                  <div className="course-trainer__stat-content">
                    <strong>{formatNumber(totalCourses)}</strong>
                    <span>Courses created</span>
                  </div>
                </div>

                <div className="course-trainer__stat course-trainer__stat--amber">
                  <span className="course-trainer__stat-icon">
                    <FiAward />
                  </span>

                  <div className="course-trainer__stat-content">
                    <strong>
                      {yearsTeaching !== undefined ? `${yearsTeaching}+` : "—"}
                    </strong>
                    <span>Years teaching</span>
                  </div>
                </div>
              </div>

              {/* Additional information */}
              <div className="course-trainer__meta-grid">
                {location && (
                  <div className="course-trainer__meta-item">
                    <span className="course-trainer__meta-icon">
                      <FiMapPin />
                    </span>

                    <div>
                      <span className="course-trainer__meta-label">
                        Based in
                      </span>

                      <span className="course-trainer__meta-value">
                        {location}
                      </span>
                    </div>
                  </div>
                )}

                {availability && (
                  <div className="course-trainer__meta-item">
                    <span className="course-trainer__meta-icon course-trainer__meta-icon--green">
                      <FiCheckCircle />
                    </span>

                    <div>
                      <span className="course-trainer__meta-label">
                        Availability
                      </span>

                      <span className="course-trainer__meta-value">
                        {availability}
                      </span>
                    </div>
                  </div>
                )}

                {completedCourses !== undefined && (
                  <div className="course-trainer__meta-item">
                    <span className="course-trainer__meta-icon course-trainer__meta-icon--violet">
                      <FiAward />
                    </span>

                    <div>
                      <span className="course-trainer__meta-label">
                        Completed courses
                      </span>

                      <span className="course-trainer__meta-value">
                        {formatNumber(completedCourses)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Qualifications */}
              {displayedQualifications.length > 0 && (
                <div className="course-trainer__qualifications">
                  <span className="course-trainer__section-label">
                    Professional qualifications
                  </span>

                  <div className="course-trainer__qualification-list">
                    {displayedQualifications.map((qualification, index) => (
                      <div
                        className="course-trainer__qualification"
                        key={`${qualification}-${index}`}
                      >
                        <FiCheckCircle />
                        <span>{qualification}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTA */}
              <div className="course-trainer__footer">
                <div className="course-trainer__footer-message">
                  <div className="course-trainer__footer-icon">
                    <FiStar />
                  </div>

                  <div>
                    <strong>Learn with expert guidance</strong>
                    <span>
                      Explore the trainer's professional profile and expertise.
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  rounded="lg"
                  rightIcon={<FiArrowRight />}
                  className="course-trainer__profile-button"
                  onClick={handleViewProfile}
                >
                  View Trainer Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* ---------------------------------------------------------
            BOTTOM CONTEXT STRIP
        --------------------------------------------------------- */}
        <div className="course-trainer__context">
          <div className="course-trainer__context-left">
            <span className="course-trainer__context-icon">
              <FiBookOpen />
            </span>

            <div>
              <strong>Expert-led learning experience</strong>
              <span>
                Learn from professionals with practical knowledge and
                specialized expertise.
              </span>
            </div>
          </div>

          <div className="course-trainer__context-right">
            <span className="course-trainer__context-dot" />
            <span>Knowledge • Practice • Growth</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseTrainer;
