import React from "react";
import {
  FiAward,
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiChevronRight,
  FiCode,
  FiDownload,
  FiFileText,
  FiGrid,
  FiShield,
  FiStar,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

import "./CertificatesHeader.css";

const CertificatesHeader = ({
  stats = {},
  latestCertificate = null,
  onViewLatestCertificate,
  onExploreCourses,
}) => {
  const {
    totalCertificates = 0,
    verifiedCertificates = 0,
    averageScore = 0,
  } = stats;

  const latest = latestCertificate || {
    courseTitle: "Full Stack Web Development",
    completionDate: "27 Aug 2026",
    certificateNumber: "CC-FSWD-2026-001",
    score: 92,
    verification: {
      isVerified: true,
    },
  };

  const formatDate = (date) => {
    if (!date) return "Recently completed";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleLatestCertificate = () => {
    if (onViewLatestCertificate) {
      onViewLatestCertificate(latest);
      return;
    }

    console.log("View latest certificate:", latest);
  };

  const handleExploreCourses = () => {
    if (onExploreCourses) {
      onExploreCourses();
      return;
    }

    console.log("Explore more courses");
  };

  return (
    <section className="certificates-header">
      <div className="certificates-header__background-glow certificates-header__background-glow--one" />
      <div className="certificates-header__background-glow certificates-header__background-glow--two" />

      <div className="certificates-header__inner">
        {/* =========================================================
            LEFT CONTENT
        ========================================================= */}
        <div className="certificates-header__content">
          {/* Eyebrow */}
          <div className="certificates-header__eyebrow">
            <span className="certificates-header__eyebrow-icon">
              <FiAward aria-hidden="true" />
            </span>

            <span className="certificates-header__eyebrow-text">
              YOUR ACHIEVEMENTS
            </span>

            <span className="certificates-header__eyebrow-line" />
          </div>

          {/* Heading */}
          <div className="certificates-header__heading-wrap">
            <h1 className="certificates-header__title">My Certificates</h1>

            <p className="certificates-header__description">
              Celebrate your learning achievements and showcase the skills
              you&apos;ve earned for a brighter, more resilient future.
            </p>
          </div>

          {/* =====================================================
              STAT CARDS
          ===================================================== */}
          <div className="certificates-header__stats">
            {/* Total Certificates */}
            <article className="certificate-stat certificate-stat--blue">
              <div className="certificate-stat__icon">
                <FiFileText aria-hidden="true" />
              </div>

              <div className="certificate-stat__content">
                <strong className="certificate-stat__number">
                  {totalCertificates}
                </strong>

                <span className="certificate-stat__label">
                  Total Certificates
                </span>

                <span className="certificate-stat__helper">
                  Courses completed
                </span>
              </div>
            </article>

            {/* Verified Certificates */}
            <article className="certificate-stat certificate-stat--green">
              <div className="certificate-stat__icon">
                <FiShield aria-hidden="true" />
              </div>

              <div className="certificate-stat__content">
                <strong className="certificate-stat__number">
                  {verifiedCertificates}
                </strong>

                <span className="certificate-stat__label">
                  Verified Certificates
                </span>

                <span className="certificate-stat__helper">
                  Globally recognized
                </span>
              </div>
            </article>

            {/* Average Score */}
            <article className="certificate-stat certificate-stat--amber">
              <div className="certificate-stat__icon">
                <FiBarChart2 aria-hidden="true" />
              </div>

              <div className="certificate-stat__content">
                <strong className="certificate-stat__number">
                  {averageScore}%
                </strong>

                <span className="certificate-stat__label">Average Score</span>

                <span className="certificate-stat__helper">
                  Across all courses
                </span>
              </div>
            </article>
          </div>

          {/* =====================================================
              ACTION BUTTONS
          ===================================================== */}
          <div className="certificates-header__actions">
            <button
              type="button"
              className="certificate-header-button certificate-header-button--primary"
              onClick={handleLatestCertificate}
            >
              <span className="certificate-header-button__icon">
                <FiFileText aria-hidden="true" />
              </span>

              <span className="certificate-header-button__text">
                View Latest Certificate
              </span>

              <span className="certificate-header-button__arrow">
                <FiArrowRight aria-hidden="true" />
              </span>
            </button>

            <button
              type="button"
              className="certificate-header-button certificate-header-button--secondary"
              onClick={handleExploreCourses}
            >
              <span className="certificate-header-button__icon">
                <FiGrid aria-hidden="true" />
              </span>

              <span className="certificate-header-button__text">
                Explore More Courses
              </span>

              <span className="certificate-header-button__arrow">
                <FiArrowRight aria-hidden="true" />
              </span>
            </button>
          </div>

          {/* Bottom statement */}
          <div className="certificates-header__statement">
            <FiStar aria-hidden="true" />

            <span>
              Keep learning. Keep achieving. Build a safer, brighter tomorrow.
            </span>
          </div>
        </div>

        {/* =========================================================
            RIGHT DARK CERTIFICATE VISUAL
        ========================================================= */}
        <div className="certificates-header__visual-column">
          <div className="certificate-showcase">
            {/* Decorative background */}
            <div className="certificate-showcase__glow certificate-showcase__glow--one" />
            <div className="certificate-showcase__glow certificate-showcase__glow--two" />

            <div className="certificate-showcase__top">
              <div className="certificate-showcase__eyebrow">
                <span className="certificate-showcase__trophy">
                  <FiAward aria-hidden="true" />
                </span>

                <span>Latest Achievement</span>
              </div>

              <span className="certificate-showcase__spark certificate-showcase__spark--one">
                ✦
              </span>

              <span className="certificate-showcase__spark certificate-showcase__spark--two">
                ✦
              </span>
            </div>

            <div className="certificate-showcase__main">
              {/* Certificate details */}
              <div className="certificate-showcase__details">
                <h2 className="certificate-showcase__title">
                  {latest.courseTitle}
                </h2>

                <div className="certificate-showcase__meta">
                  <span>
                    Completed on{" "}
                    <strong>
                      {formatDate(latest.completionDate || latest.issuedAt)}
                    </strong>
                  </span>

                  <span>
                    Certificate ID:{" "}
                    <strong>
                      {latest.certificateNumber || "CC-CERT-2026"}
                    </strong>
                  </span>
                </div>

                {/* Verification */}
                <div className="certificate-verification">
                  <span className="certificate-verification__icon">
                    <FiCheck aria-hidden="true" />
                  </span>

                  <span>
                    {latest.verification?.isVerified
                      ? "Verified Certificate"
                      : "Certificate Issued"}
                  </span>
                </div>

                {/* Score */}
                <div className="certificate-score">
                  <div className="certificate-score__label">
                    Achievement Score
                  </div>

                  <div className="certificate-score__value">
                    {latest.score || 0}%
                  </div>
                </div>

                <button
                  type="button"
                  className="certificate-showcase__view"
                  onClick={handleLatestCertificate}
                >
                  <span className="certificate-showcase__view-icon">
                    <FiArrowRight aria-hidden="true" />
                  </span>

                  <span>View Certificate</span>
                </button>
              </div>

              {/* =================================================
                  CSS CERTIFICATE ARTWORK
              ================================================= */}
              <div className="certificate-artwork">
                <div className="certificate-artwork__shadow" />

                <div className="certificate-paper">
                  <div className="certificate-paper__corner certificate-paper__corner--top-left" />
                  <div className="certificate-paper__corner certificate-paper__corner--top-right" />
                  <div className="certificate-paper__corner certificate-paper__corner--bottom-left" />
                  <div className="certificate-paper__corner certificate-paper__corner--bottom-right" />

                  <div className="certificate-paper__border">
                    <div className="certificate-paper__inner">
                      {/* Mini logo */}
                      <div className="certificate-paper__logo">
                        <span className="certificate-paper__logo-mark">
                          <FiCode aria-hidden="true" />
                        </span>

                        <span className="certificate-paper__logo-text">
                          Capacity Connect
                        </span>
                      </div>

                      <span className="certificate-paper__label">
                        CERTIFICATE
                      </span>

                      <span className="certificate-paper__of">
                        OF COMPLETION
                      </span>

                      <div className="certificate-paper__divider">
                        <span />
                        <FiAward aria-hidden="true" />
                        <span />
                      </div>

                      <span className="certificate-paper__recipient">
                        This certificate is proudly awarded for
                      </span>

                      <strong className="certificate-paper__course">
                        {latest.courseTitle}
                      </strong>

                      <span className="certificate-paper__footer">
                        Empowering Learners
                        <br />
                        for a Resilient Tomorrow
                      </span>

                      {/* Seal */}
                      <div className="certificate-seal">
                        <div className="certificate-seal__outer">
                          <div className="certificate-seal__inner">
                            <FiStar aria-hidden="true" />
                          </div>
                        </div>

                        <div className="certificate-seal__ribbon certificate-seal__ribbon--left" />
                        <div className="certificate-seal__ribbon certificate-seal__ribbon--right" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative leaves */}
                <div className="certificate-leaves certificate-leaves--left">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="certificate-leaves certificate-leaves--right">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>

            {/* Showcase footer */}
            <div className="certificate-showcase__footer">
              <div className="certificate-showcase__footer-icon">
                <FiAward aria-hidden="true" />
              </div>

              <div className="certificate-showcase__footer-text">
                <strong>Achievement unlocked</strong>
                <span>Keep building skills that create real-world impact.</span>
              </div>

              <div className="certificate-showcase__footer-score">
                <span>Score</span>
                <strong>{latest.score || 0}%</strong>
              </div>
            </div>
          </div>

          {/* =====================================================
              THREE BOTTOM INFO ITEMS
          ===================================================== */}
          <div className="certificates-header__learning-points">
            {/* Learn */}
            <div className="certificate-learning-point certificate-learning-point--blue">
              <div className="certificate-learning-point__icon">
                <FiBookOpen aria-hidden="true" />
              </div>

              <div className="certificate-learning-point__content">
                <span>Learn</span>
                <strong>Continuously</strong>
              </div>
            </div>

            <span className="certificate-learning-point__divider" />

            {/* Grow */}
            <div className="certificate-learning-point certificate-learning-point--green">
              <div className="certificate-learning-point__icon">
                <FiUsers aria-hidden="true" />
              </div>

              <div className="certificate-learning-point__content">
                <span>Grow</span>
                <strong>Professionally</strong>
              </div>
            </div>

            <span className="certificate-learning-point__divider" />

            {/* Impact */}
            <div className="certificate-learning-point certificate-learning-point--teal">
              <div className="certificate-learning-point__icon">
                <FiTrendingUp aria-hidden="true" />
              </div>

              <div className="certificate-learning-point__content">
                <span>Make a</span>
                <strong>Positive Impact</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesHeader;
