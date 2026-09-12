import React, { useMemo, useRef, useState } from "react";

import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code2,
  Download,
  FileText,
  GitBranch,
  GraduationCap,
  MoreHorizontal,
  Network,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
  Search,
} from "lucide-react";

import "./CertificateList.css";

/* =========================================================
   FILTERS
========================================================= */

const filters = [
  {
    id: "all",
    label: "All Certificates",
    icon: <Award size={14} strokeWidth={2.2} />,
  },
  {
    id: "verified",
    label: "Verified",
    icon: <CheckCircle2 size={14} strokeWidth={2.2} />,
  },
  {
    id: "latest",
    label: "Latest",
    icon: <Clock3 size={14} strokeWidth={2.2} />,
  },
  {
    id: "highest",
    label: "Highest Score",
    icon: <BarChart3 size={14} strokeWidth={2.2} />,
  },
];

/* =========================================================
   CLOUD ICON
========================================================= */

function CloudIcon({ size = 24, strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.5 18.5H17a4.5 4.5 0 0 0 .66-8.95A6 6 0 0 0 6.04 10.8 4 4 0 0 0 7.5 18.5Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   FALLBACK CERTIFICATES
========================================================= */

const fallbackCertificates = [
  {
    id: "certificate-1",
    courseTitle: "Modern React Development",
    description: "Build modern web applications with React",
    category: "Web Development",
    level: "Intermediate",
    learningHours: 42,
    completionDate: "12 Jul 2026",
    score: 88,
    verification: {
      isVerified: true,
    },
    skills: ["React", "JavaScript", "Frontend"],
    theme: "blue",
    icon: "react",
  },

  {
    id: "certificate-2",
    courseTitle: "Python for Data Science",
    description: "Analyze data and build powerful insights",
    category: "Data Science",
    level: "Intermediate",
    learningHours: 38,
    completionDate: "28 May 2026",
    score: 91,
    verification: {
      isVerified: true,
    },
    skills: ["Python", "Data Science", "Analytics", "Machine Learning"],
    theme: "amber",
    icon: "python",
  },

  {
    id: "certificate-3",
    courseTitle: "UI/UX Design Fundamentals",
    description: "Design user-centered digital experiences",
    category: "Design",
    level: "Intermediate",
    learningHours: 36,
    completionDate: "10 Apr 2026",
    score: 85,
    verification: {
      isVerified: true,
    },
    skills: ["UI/UX", "Figma", "Design"],
    theme: "purple",
    icon: "figma",
  },

  {
    id: "certificate-4",
    courseTitle: "Backend Development with Node.js",
    description: "Build scalable server-side applications",
    category: "Backend Development",
    level: "Intermediate",
    learningHours: 40,
    completionDate: "18 Feb 2026",
    score: 78,
    verification: {
      isVerified: false,
    },
    skills: ["Node.js", "Express", "API", "Backend"],
    theme: "green",
    icon: "node",
  },

  {
    id: "certificate-5",
    courseTitle: "AWS Cloud Practitioner",
    description: "Understand cloud concepts and AWS services",
    category: "Cloud Computing",
    level: "Beginner",
    learningHours: 32,
    completionDate: "14 Jan 2026",
    score: 82,
    verification: {
      isVerified: true,
    },
    skills: ["AWS", "Cloud Computing", "DevOps", "Infrastructure"],
    theme: "teal",
    icon: "aws",
  },

  {
    id: "certificate-6",
    courseTitle: "Git & GitHub Workflow",
    description: "Master modern version control workflows",
    category: "Development Tools",
    level: "Beginner",
    learningHours: 24,
    completionDate: "20 Dec 2025",
    score: 86,
    verification: {
      isVerified: true,
    },
    skills: ["Git", "GitHub", "Version Control"],
    theme: "rose",
    icon: "git",
  },
];

/* =========================================================
   CERTIFICATE LIST
========================================================= */

function CertificateList({
  certificates = fallbackCertificates,
  onViewCertificate,
  onDownloadCertificate,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  /*
    IMPORTANT:
    This ref points to the search/filter toolbar.

    Pagination will scroll to this position instead
    of scrolling the entire page to the very top.
  */
  const toolbarRef = useRef(null);

  const certificatesPerPage = 5;

  /* =========================================================
     VERIFIED COUNT
  ========================================================= */

  const verifiedCount = certificates.filter(
    (certificate) => certificate.verification?.isVerified,
  ).length;

  /* =========================================================
     FILTER CERTIFICATES
  ========================================================= */

  const filteredCertificates = useMemo(() => {
    let result = [...certificates];

    /* SEARCH */

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter((certificate) => {
        const searchableText = [
          certificate.courseTitle,
          certificate.description,
          certificate.category,
          certificate.level,
          certificate.instructor,
          certificate.certificateNumber,
          ...(certificate.skills || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    /* VERIFIED */

    if (activeFilter === "verified") {
      result = result.filter(
        (certificate) => certificate.verification?.isVerified,
      );
    }

    /* LATEST */

    if (activeFilter === "latest") {
      result.sort((a, b) => {
        const dateA = new Date(a.issuedAt || a.completionDate || 0);
        const dateB = new Date(b.issuedAt || b.completionDate || 0);

        return dateB - dateA;
      });
    }

    /* HIGHEST SCORE */

    if (activeFilter === "highest") {
      result.sort((a, b) => (b.score || 0) - (a.score || 0));
    }

    return result;
  }, [certificates, searchQuery, activeFilter]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCertificates.length / certificatesPerPage),
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * certificatesPerPage;

  const visibleCertificates = filteredCertificates.slice(
    startIndex,
    startIndex + certificatesPerPage,
  );

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    setOpenMenu(null);
  };

  /* =========================================================
     VIEW CERTIFICATE
  ========================================================= */

  const handleViewCertificate = (certificate) => {
    setOpenMenu(null);

    if (onViewCertificate) {
      onViewCertificate(certificate);
      return;
    }

    const certificateWindow = window.open(
      "",
      "_blank",
      "width=1000,height=750",
    );

    if (!certificateWindow) {
      return;
    }

    certificateWindow.document.write(`
      <!DOCTYPE html>

      <html>
        <head>
          <title>${certificate.courseTitle}</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 40px;
              background: #eef5fb;
              font-family: Arial, sans-serif;
              color: #173759;
            }

            .certificate {
              max-width: 850px;
              margin: 0 auto;
              padding: 70px;
              background: white;
              border: 10px solid #173f67;
              text-align: center;
              box-shadow:
                0 20px 60px
                rgba(15, 40, 70, .15);
            }

            .award {
              font-size: 50px;
              margin-bottom: 20px;
            }

            h1 {
              margin: 0 0 12px;
              font-size: 34px;
            }

            h2 {
              margin: 20px 0;
              font-size: 26px;
            }

            p {
              color: #64748b;
              font-size: 16px;
              line-height: 1.6;
            }

            .score {
              margin-top: 30px;
              font-size: 20px;
              font-weight: bold;
            }

            .footer {
              margin-top: 50px;
              color: #718096;
              font-size: 13px;
            }

            @media print {
              body {
                padding: 0;
                background: white;
              }

              .certificate {
                box-shadow: none;
              }
            }
          </style>
        </head>

        <body>

          <div class="certificate">

            <div class="award">
              🏆
            </div>

            <h1>
              Certificate of Achievement
            </h1>

            <p>
              This certificate recognizes successful completion of
            </p>

            <h2>
              ${certificate.courseTitle}
            </h2>

            <p>
              The learner demonstrated dedication,
              knowledge, and commitment throughout
              the learning journey.
            </p>

            <div class="score">
              Achievement Score:
              ${certificate.score}%
            </div>

            <div class="footer">
              Capacity Connect •
              Verified Learning Achievement
            </div>

          </div>

        </body>
      </html>
    `);

    certificateWindow.document.close();
  };

  /* =========================================================
     DOWNLOAD CERTIFICATE
  ========================================================= */

  const handleDownloadCertificate = (certificate) => {
    setOpenMenu(null);

    if (onDownloadCertificate) {
      onDownloadCertificate(certificate);
      return;
    }

    handleViewCertificate(certificate);

    setTimeout(() => {
      window.print();
    }, 500);
  };

  /* =========================================================
     MORE MENU
  ========================================================= */

  const handleMore = (certificateId) => {
    setOpenMenu((previous) =>
      previous === certificateId ? null : certificateId,
    );
  };

  /* =========================================================
     PAGINATION
  ========================================================= */

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    /*
      IMPORTANT:

      Previously:
        window.scrollTo({ top: 0 })

      That was scrolling the entire page to the
      absolute top.

      Now we scroll only to the CertificateList
      toolbar/search-bar position.
    */
    requestAnimationFrame(() => {
      toolbarRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /* =========================================================
     COURSE ICON
  ========================================================= */

  const getCourseIcon = (certificate) => {
    switch (certificate.icon) {
      case "python":
        return Code2;

      case "figma":
        return Activity;

      case "node":
        return Network;

      case "aws":
        return CloudIcon;

      case "git":
        return GitBranch;

      case "react":
        return Network;

      default:
        return Award;
    }
  };

  /* =========================================================
     THEME CLASS
  ========================================================= */

  const getThemeClass = (theme) => {
    const allowedThemes = ["blue", "amber", "purple", "green", "teal", "rose"];

    if (allowedThemes.includes(theme)) {
      return `certificate-row--${theme}`;
    }

    return "certificate-row--blue";
  };

  /* =========================================================
     ACHIEVEMENT MESSAGES
  ========================================================= */

  const achievementMessages = {
    blue: {
      title: "Great Work!",
      text: "You've mastered modern frontend development.",
      icon: GraduationCap,
    },

    amber: {
      title: "Excellent!",
      text: "You've shown strong analytical skills.",
      icon: Trophy,
    },

    purple: {
      title: "Well Done!",
      text: "Your creativity makes a difference.",
      icon: Award,
    },

    green: {
      title: "Keep Going!",
      text: "Your backend skills continue to grow.",
      icon: BookOpen,
    },

    teal: {
      title: "Nice Progress!",
      text: "You're building valuable cloud skills.",
      icon: TrendingUp,
    },

    rose: {
      title: "Great Progress!",
      text: "Your professional skills are growing.",
      icon: Star,
    },
  };

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <section className="certificate-page">
      <div className="certificate-container">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="certificate-top">
          {/* LEFT SIDE */}

          <div className="certificate-heading">
            <div className="certificate-logo">
              <Award size={23} strokeWidth={2.2} />
            </div>

            <div>
              <div className="eyebrow">
                <span className="eyebrow-diamond">◆</span>
                MY CERTIFICATES
              </div>

              <h1>Your Learning Achievements</h1>

              <p>
                Explore, manage, and showcase all the certificates you've
                earned. Each certificate represents your dedication, growth, and
                real-world skills.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="knowledge-card">
            <div className="trophy-icon">
              <Trophy size={22} strokeWidth={2.1} />
            </div>

            <div>
              <h2>Knowledge has no limits</h2>

              <p>
                “Every certificate is a step towards
                <br />a brighter, more resilient you.”
              </p>
            </div>

            <span className="sparkle sparkle-one">✦</span>

            <span className="sparkle sparkle-two">✧</span>
          </div>
        </div>

        {/* =====================================================
            SEARCH + FILTER TOOLBAR
        ===================================================== */}

        <div className="certificate-toolbar" ref={toolbarRef}>
          {/* SEARCH */}

          <div className="certificate-search">
            <Search size={16} strokeWidth={2.1} />

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search certificates, courses, or skills..."
              aria-label="Search certificates"
            />

            {searchQuery ? (
              <button
                type="button"
                className="search-clear"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            ) : (
              <>
                <span className="keyboard-shortcut">Ctrl</span>

                <span className="keyboard-key">K</span>
              </>
            )}
          </div>

          {/* FILTERS */}

          <div className="certificate-filters">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter.id}
                className={`filter-button ${
                  activeFilter === filter.id ? "filter-button-active" : ""
                }`}
                onClick={() => handleFilter(filter.id)}
              >
                {filter.icon}

                <span>{filter.label}</span>

                {filter.id === "all" && (
                  <span className="filter-count">{certificates.length}</span>
                )}

                {filter.id === "verified" && (
                  <span className="filter-count filter-count-light">
                    {verifiedCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            CERTIFICATE RESULTS
        ===================================================== */}

        <div className="certificate-results">
          {visibleCertificates.map((certificate) => {
            const CourseIcon = getCourseIcon(certificate);

            const message =
              achievementMessages[certificate.theme] ||
              achievementMessages.blue;

            const MessageIcon = message.icon;

            return (
              <article
                key={certificate.id}
                className={`certificate-row ${getThemeClass(
                  certificate.theme,
                )}`}
              >
                {/* COURSE THUMBNAIL */}

                <div className="certificate-course-thumb">
                  <div className="certificate-course-icon">
                    <CourseIcon />
                  </div>
                </div>

                {/* COURSE INFORMATION */}

                <div className="certificate-course-info">
                  {/* TITLE */}

                  <div className="certificate-title-line">
                    <h3>{certificate.courseTitle}</h3>

                    <span
                      className={`verification-badge ${
                        certificate.verification?.isVerified
                          ? "verification-badge--verified"
                          : "verification-badge--unverified"
                      }`}
                    >
                      {certificate.verification?.isVerified ? (
                        <>
                          <CheckCircle2 />
                          Verified
                        </>
                      ) : (
                        <>
                          <ShieldCheck />
                          Not Verified
                        </>
                      )}
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="certificate-description">
                    {certificate.description}
                  </p>

                  {/* META */}

                  <div className="certificate-meta">
                    <span>
                      <Clock3 />
                      {certificate.learningHours || "—"} hours
                    </span>

                    <span>
                      <CalendarDays />
                      Completed on{" "}
                      {certificate.completionDate ||
                        certificate.issuedAt ||
                        "—"}
                    </span>

                    <span>
                      <BarChart3 />
                      Score: <strong>{certificate.score || 0}%</strong>
                    </span>
                  </div>

                  {/* SKILLS */}

                  <div className="certificate-skills">
                    {(certificate.skills || []).slice(0, 4).map((skill) => (
                      <span key={skill} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACHIEVEMENT */}

                <div className="certificate-achievement">
                  <div className="achievement-icon">
                    <MessageIcon />
                  </div>

                  <div className="achievement-text">
                    <strong>{message.title}</strong>

                    <span>{message.text}</span>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="certificate-actions">
                  {/* VIEW */}

                  <button
                    type="button"
                    className="view-certificate-button"
                    onClick={() => handleViewCertificate(certificate)}
                  >
                    <span>View Certificate</span>

                    <ChevronRight />
                  </button>

                  {/* DOWNLOAD + MORE */}

                  <div className="secondary-actions">
                    <button
                      type="button"
                      className="download-certificate-button"
                      onClick={() => handleDownloadCertificate(certificate)}
                    >
                      <Download />

                      <span>Download PDF</span>
                    </button>

                    <div className="more-wrapper">
                      <button
                        type="button"
                        className="more-button"
                        onClick={() => handleMore(certificate.id)}
                        aria-label="More options"
                      >
                        <MoreHorizontal />
                      </button>

                      {openMenu === certificate.id && (
                        <div className="certificate-menu">
                          <button
                            type="button"
                            onClick={() => handleViewCertificate(certificate)}
                          >
                            <FileText />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDownloadCertificate(certificate)
                            }
                          >
                            <Download />
                            Download PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {visibleCertificates.length === 0 && (
            <div className="certificate-empty">
              <div className="certificate-empty-icon">
                <Award />
              </div>

              <h3>No certificates found</h3>

              <p>Try changing your search or filter.</p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* =====================================================
            SHOWCASE YOUR ACHIEVEMENTS
        ===================================================== */}

        {visibleCertificates.length > 0 && (
          <div className="certificate-showcase">
            <div className="showcase-decoration showcase-decoration-one" />

            <div className="showcase-decoration showcase-decoration-two" />

            <div className="showcase-icon">
              <BarChart3 />
            </div>

            <div className="showcase-content">
              <h3>Showcase Your Achievements</h3>

              <p>
                Add your certificates to your LinkedIn profile and let the world
                see your progress.
              </p>
            </div>

            <button
              type="button"
              className="linkedin-button"
              onClick={() =>
                alert("LinkedIn certificate sharing will be available soon.")
              }
            >
              <span className="linkedin-logo">in</span>

              <span>Add to LinkedIn</span>

              <ChevronRight />
            </button>
          </div>
        )}

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="certificate-pagination">
          <span className="pagination-summary">
            Showing <strong>{visibleCertificates.length}</strong> of{" "}
            <strong>{filteredCertificates.length}</strong> certificates
          </span>

          <div className="pagination-controls">
            {/* PREVIOUS */}

            <button
              type="button"
              className="pagination-arrow"
              disabled={safePage === 1}
              onClick={() => changePage(safePage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </button>

            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={`pagination-number ${
                  safePage === page ? "pagination-number--active" : ""
                }`}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            ))}

            {/* NEXT */}

            <button
              type="button"
              className="pagination-arrow"
              disabled={safePage === totalPages}
              onClick={() => changePage(safePage + 1)}
              aria-label="Next page"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificateList;
