import React from "react";
import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiDownload,
  FiFileText,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import "./CertificateOverview.css";

const CertificateOverview = ({
  stats = {},
  latestCertificate = null,
  onExploreCourses,
}) => {
  /* =========================================================
     SAFE DATA
  ========================================================= */

  const totalCertificates = stats?.totalCertificates ?? 0;
  const verifiedCertificates = stats?.verifiedCertificates ?? 0;
  const totalLearningHours = stats?.totalLearningHours ?? 0;
  const averageScore = stats?.averageScore ?? 0;

  const issuedCertificates = stats?.issuedCertificates ?? totalCertificates;

  const downloadableCertificates =
    stats?.downloadableCertificates ?? totalCertificates;

  const completionPercentage =
    totalCertificates > 0
      ? Math.min(
          100,
          Math.round((issuedCertificates / totalCertificates) * 100),
        )
      : 0;

  const highestScore = latestCertificate?.score
    ? Math.max(latestCertificate.score, averageScore)
    : averageScore;

  const latestCertificateTitle =
    latestCertificate?.courseTitle || "No certificate available";

  const latestCertificateDate =
    latestCertificate?.issuedAt ||
    latestCertificate?.completionDate ||
    "Recently issued";

  /* =========================================================
     DATE FORMATTER
  ========================================================= */

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Recently issued";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* =========================================================
     STAT CARDS
  ========================================================= */

  const overviewStats = [
    {
      id: "total",
      value: totalCertificates,
      title: "Total Certificates",
      description: "Courses completed successfully",
      icon: FiFileText,
      theme: "blue",
      indicator: `+${totalCertificates}`,
    },
    {
      id: "verified",
      value: verifiedCertificates,
      title: "Verified Certificates",
      description: "Globally recognized credentials",
      icon: FiCheckCircle,
      theme: "green",
      indicator: "100%",
    },
    {
      id: "hours",
      value: `${totalLearningHours}h`,
      title: "Total Learning Hours",
      description: "Time invested in your growth",
      icon: FiBookOpen,
      theme: "purple",
      indicator: `+${totalLearningHours}h`,
    },
  ];

  /* =========================================================
     SNAPSHOT ITEMS
  ========================================================= */

  const achievementItems = [
    {
      id: "highest-score",
      icon: FiTrendingUp,
      title: "Highest Score",
      description: "Your best performance across all courses",
      value: `${highestScore}%`,
      theme: "amber",
    },
    {
      id: "latest-certificate",
      icon: FiFileText,
      title: "Latest Certificate",
      description: latestCertificateTitle,
      value: formatDate(latestCertificateDate),
      theme: "blue",
    },
    {
      id: "all-certificates",
      icon: FiAward,
      title: "All Certificates",
      description: "Verified and ready to showcase",
      value: `${verifiedCertificates}/${totalCertificates}`,
      theme: "green",
    },
    {
      id: "downloadable",
      icon: FiDownload,
      title: "Downloadable Certificates",
      description: "Available for offline use",
      value: downloadableCertificates,
      theme: "cyan",
    },
  ];

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleExploreCourses = () => {
    if (typeof onExploreCourses === "function") {
      onExploreCourses();
      return;
    }

    console.log("Explore more courses");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="certificate-overview">
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <span className="certificate-overview__glow certificate-overview__glow--one" />
      <span className="certificate-overview__glow certificate-overview__glow--two" />

      <div className="certificate-overview__container">
        {/* ===================================================
            TOP INTRO
        =================================================== */}

        <div className="certificate-overview__intro">
          <div className="certificate-overview__intro-content">
            <div className="certificate-overview__eyebrow">
              <span className="certificate-overview__eyebrow-icon">
                <FiAward />
              </span>

              <span className="certificate-overview__eyebrow-text">
                CERTIFICATION OVERVIEW
              </span>
            </div>

            <h2 className="certificate-overview__title">
              Your Learning Achievements at a Glance
            </h2>

            <p className="certificate-overview__description">
              Track your certification progress, see key milestones, and
              celebrate your growth in one place.
            </p>
          </div>

          {/* ===============================================
              QUOTE GLASS CARD
          =============================================== */}

          <div className="certificate-overview__quote">
            <div className="certificate-overview__quote-icon">
              <FiBookOpen />
            </div>

            <div className="certificate-overview__quote-content">
              <span className="certificate-overview__quote-mark">“</span>

              <p>Every certificate is a step towards a brighter future.</p>
            </div>

            <span className="certificate-overview__quote-spark">✦</span>
          </div>
        </div>

        {/* ===================================================
            THREE STAT CARDS
        =================================================== */}

        <div className="certificate-overview__stats">
          {overviewStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.id}
                className={`certificate-overview-stat certificate-overview-stat--${stat.theme}`}
              >
                <div className="certificate-overview-stat__icon">
                  <Icon />
                </div>

                <div className="certificate-overview-stat__content">
                  <strong className="certificate-overview-stat__value">
                    {stat.value}
                  </strong>

                  <h3 className="certificate-overview-stat__title">
                    {stat.title}
                  </h3>

                  <p className="certificate-overview-stat__description">
                    {stat.description}
                  </p>
                </div>

                <span className="certificate-overview-stat__indicator">
                  <FiTrendingUp />
                  {stat.indicator}
                </span>
              </article>
            );
          })}
        </div>

        {/* ===================================================
            LOWER TWO COLUMN AREA
        =================================================== */}

        <div className="certificate-overview__main">
          {/* =================================================
              CERTIFICATION PROGRESS
          ================================================= */}

          <article className="certificate-progress">
            <div className="certificate-progress__header">
              <div className="certificate-progress__heading">
                <span className="certificate-progress__icon">
                  <FiTrendingUp />
                </span>

                <div>
                  <h3>Certification Progress</h3>

                  <p>Your journey through completed certifications</p>
                </div>
              </div>

              <span className="certificate-progress__status">
                <FiCheckCircle />
                Completed
              </span>
            </div>

            <p className="certificate-progress__description">
              You've completed all available certificates. Keep learning to
              achieve more!
            </p>

            {/* =============================================
                PROGRESS BAR
            ============================================= */}

            <div className="certificate-progress__bar-area">
              <div className="certificate-progress__bar-track">
                <div
                  className="certificate-progress__bar-fill"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                />
              </div>

              <strong className="certificate-progress__percentage">
                {completionPercentage}%
              </strong>
            </div>

            <div className="certificate-progress__count">
              <strong>{issuedCertificates}</strong>
              <span> of </span>
              <strong>{totalCertificates}</strong>
              <span> certificates completed</span>
            </div>

            {/* =============================================
                TROPHY MESSAGE
            ============================================= */}

            <div className="certificate-progress__achievement">
              <div className="certificate-progress__achievement-icon">
                <FiAward />
              </div>

              <div className="certificate-progress__achievement-content">
                <strong>
                  Amazing! You have completed all your certificates.
                </strong>

                <p>Explore more courses to continue your learning journey.</p>
              </div>
            </div>
          </article>

          {/* =================================================
              ACHIEVEMENT SNAPSHOT
          ================================================= */}

          <article className="achievement-snapshot">
            <div className="achievement-snapshot__header">
              <div className="achievement-snapshot__header-icon">
                <FiAward />
              </div>

              <div>
                <h3>Achievement Snapshot</h3>

                <p>A quick look at your key achievements</p>
              </div>
            </div>

            <div className="achievement-snapshot__items">
              {achievementItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`achievement-item achievement-item--${item.theme}`}
                  >
                    <div className="achievement-item__icon">
                      <Icon />
                    </div>

                    <div className="achievement-item__content">
                      <strong>{item.title}</strong>

                      <span>{item.description}</span>
                    </div>

                    <strong className="achievement-item__value">
                      {item.value}
                    </strong>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        {/* ===================================================
            KEEP GOING
        =================================================== */}

        <section className="certificate-overview__keep-going">
          <div className="certificate-overview__keep-going-content">
            <div className="certificate-overview__keep-going-icon">
              <FiTarget />
            </div>

            <div>
              <h3>Keep Going!</h3>

              <p>
                Explore more courses, gain new skills, and add more certificates
                to your portfolio.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="certificate-overview__explore-button"
            onClick={handleExploreCourses}
          >
            <span>Explore More Courses</span>

            <span className="certificate-overview__explore-arrow">→</span>
          </button>
        </section>
      </div>
    </section>
  );
};

export default CertificateOverview;
