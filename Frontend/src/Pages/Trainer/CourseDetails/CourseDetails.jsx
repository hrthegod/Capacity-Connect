import React, { useState } from "react";

import {
  LuArchive,
  LuArrowLeft,
  LuArrowUpRight,
  LuAward,
  LuChartNoAxesColumn,
  LuBookOpen,
  LuCheck,
  LuChevronDown,
  LuCircleHelp,
  LuClock3,
  LuCopy,
  LuEllipsis,
  LuEye,
  LuFileText,
  LuHouse,
  LuLayers3,
  LuLink,
  LuList,
  LuMessageSquare,
  LuPencil,
  LuPlay,
  LuRotateCcw,
  LuSettings,
  LuShare2,
  LuStar,
  LuTrash2,
  LuTrendingUp,
  LuUsersRound,
} from "react-icons/lu";

import "./CourseDetails.css";

const CourseDetails = () => {
  const [activeSection, setActiveSection] = useState("Overview");
  const [openMenu, setOpenMenu] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const course = {
    id: 1,
    title: "React for Beginners",
    category: "Web Development",
    level: "Beginner",
    status: "Published",
    description:
      "Learn React from scratch with hands-on projects and real-world examples.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=90",
    duration: "12h 30m",
    lessons: 28,
    modules: 6,
    learners: "1,240",
    progress: 86,
    rating: "4.8",
    reviews: 320,
  };

  const navigationItems = [
    {
      label: "Overview",
      icon: LuHouse,
    },
    {
      label: "Course Content",
      icon: LuList,
    },
    {
      label: "Analytics",
      icon: LuChartNoAxesColumn,
    },
    {
      label: "Student Feedback",
      icon: LuMessageSquare,
    },
    {
      label: "Certificates",
      icon: LuAward,
    },
    {
      label: "Settings",
      icon: LuSettings,
    },
  ];

  const learningPoints = [
    "Understand React fundamentals and core concepts",
    "Work with components, props and state",
    "Use React hooks effectively",
    "Build real-world React projects",
    "Handle routing and navigation",
    "Connect with APIs and external data",
    "Follow best practices and performance tips",
    "Deploy your React applications",
  ];

  const requirements = [
    "Basic knowledge of HTML, CSS and JavaScript",
    "A code editor such as VS Code",
    "No prior React experience required",
  ];

  const feedback = [
    {
      name: "Sarah Johnson",
      initials: "SJ",
      rating: 5,
      time: "2 days ago",
      text: "This course is amazing! The explanations are clear and the projects really helped me understand React. Highly recommended!",
    },
    {
      name: "Michael Chen",
      initials: "MC",
      rating: 5,
      time: "1 week ago",
      text: "Great course for beginners. The instructor explains complex concepts in a simple way. Loved the hands-on projects!",
    },
  ];

  const handleBack = () => {
    window.history.back();
  };

  const handleEdit = () => {
    window.alert("Edit Course functionality will be connected next.");
  };

  const handlePreview = () => {
    window.alert("Course preview will open here.");
  };

  const handleShare = async () => {
    const shareData = {
      title: course.title,
      text: course.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        window.alert("Course link copied to clipboard.");
      } else {
        window.alert("Course link: " + window.location.href);
      }
    } catch {
      // User cancelled the native share dialog.
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      window.alert("Course link copied to clipboard.");
    } catch {
      window.alert("Unable to copy the course link.");
    }
  };

  const handleQuickAction = (action) => {
    window.alert(`${action} action will be connected next.`);
  };

  return (
    <div className="course-details-page">
      {/* ======================================================
          TOP BAR
      ====================================================== */}

      <header className="course-details-topbar">
        <button
          type="button"
          className="course-back-button"
          onClick={handleBack}
        >
          <LuArrowLeft size={15} strokeWidth={1.8} />
          <span>Back to Courses</span>
        </button>

        <div className="course-details-actions">
          <button
            type="button"
            className="course-top-action"
            onClick={handleEdit}
          >
            <LuPencil size={14} strokeWidth={1.8} />
            <span>Edit Course</span>
          </button>

          <button
            type="button"
            className="course-top-action"
            onClick={handlePreview}
          >
            <LuEye size={15} strokeWidth={1.8} />
            <span>Preview</span>
          </button>

          <div className="course-more-wrapper">
            <button
              type="button"
              className={`course-more-button ${openMenu ? "active" : ""}`}
              onClick={() => setOpenMenu((value) => !value)}
              aria-expanded={openMenu}
              aria-label="More course actions"
            >
              <LuEllipsis size={17} strokeWidth={1.9} />
            </button>

            {openMenu && (
              <div className="course-more-menu">
                <button
                  type="button"
                  onClick={() => handleQuickAction("Duplicate Course")}
                >
                  <LuCopy size={14} strokeWidth={1.8} />
                  <span>Duplicate Course</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickAction("Archive Course")}
                >
                  <LuArchive size={14} strokeWidth={1.8} />
                  <span>Archive Course</span>
                </button>

                <button
                  type="button"
                  className="danger"
                  onClick={() => handleQuickAction("Delete Course")}
                >
                  <LuTrash2 size={14} strokeWidth={1.8} />
                  <span>Delete Course</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="course-share-button"
            onClick={handleShare}
          >
            <LuShare2 size={14} strokeWidth={1.8} />
            <span>Share Course</span>
            <LuChevronDown size={13} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* ======================================================
          COURSE HERO
      ====================================================== */}

      <section className="course-details-hero">
        <div className="course-hero-image-card">
          <img
            src={course.image}
            alt={course.title}
            className="course-hero-image"
          />

          <div className="course-hero-image-overlay" />

          <span className="course-hero-status">
            <span />
            {course.status}
          </span>

          <button
            type="button"
            className="course-watch-button"
            onClick={handlePreview}
          >
            <span className="course-watch-icon">
              <LuPlay size={13} fill="currentColor" />
            </span>
            <span>Watch Intro</span>
          </button>

          <span className="course-hero-duration">
            <LuClock3 size={12} strokeWidth={1.8} />
            {course.duration}
          </span>
        </div>

        <div className="course-hero-information">
          <div className="course-category-pill">{course.category}</div>

          <h1>{course.title}</h1>

          <p className="course-hero-short-description">{course.description}</p>

          <p className="course-hero-long-description">
            A complete beginner-friendly course to learn React.js step by step.
            Build real projects, understand core concepts and gain the
            confidence to create modern web applications.
          </p>

          <div className="course-hero-tags">
            <span className="tag-green">Beginner</span>
            <span className="tag-blue">React</span>
            <span className="tag-peach">JavaScript</span>
            <span className="tag-purple">Frontend</span>
          </div>
        </div>

        {/* Learners mini panel */}

        <div className="course-learners-panel">
          <div className="course-learners-heading">
            <div className="course-learners-icon">
              <LuUsersRound size={21} strokeWidth={1.7} />
            </div>

            <div>
              <strong>{course.learners}</strong>
              <span>Total Learners</span>
            </div>

            <span className="course-growth-badge">
              <LuTrendingUp size={11} />
              12%
            </span>
          </div>

          <div className="course-mini-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="course-student-stack">
            <span>SJ</span>
            <span>MC</span>
            <span>AK</span>
            <span>RP</span>
            <span>+</span>
          </div>

          <p>Students enrolled in this course</p>
        </div>
      </section>

      {/* ======================================================
          STAT CARDS
      ====================================================== */}

      <section className="course-stat-grid">
        <div className="course-stat-card progress-card">
          <div className="course-stat-icon">
            <LuPlay size={18} strokeWidth={1.7} />
          </div>

          <div className="course-stat-content">
            <strong>{course.progress}%</strong>
            <span>Course Progress</span>
          </div>

          <div className="course-progress-track">
            <span style={{ width: `${course.progress}%` }} />
          </div>
        </div>

        <div className="course-stat-card duration-card">
          <div className="course-stat-icon">
            <LuClock3 size={18} strokeWidth={1.7} />
          </div>

          <div className="course-stat-content">
            <strong>{course.duration}</strong>
            <span>Total Duration</span>
          </div>
        </div>

        <div className="course-stat-card lessons-card">
          <div className="course-stat-icon">
            <LuFileText size={18} strokeWidth={1.7} />
          </div>

          <div className="course-stat-content">
            <strong>{course.lessons}</strong>
            <span>Lessons</span>
          </div>
        </div>

        <div className="course-stat-card modules-card">
          <div className="course-stat-icon">
            <LuLayers3 size={18} strokeWidth={1.7} />
          </div>

          <div className="course-stat-content">
            <strong>{course.modules}</strong>
            <span>Modules</span>
          </div>
        </div>

        <div className="course-stat-card rating-card">
          <div className="course-stat-icon">
            <LuStar size={18} strokeWidth={1.7} />
          </div>

          <div className="course-stat-content">
            <strong>{course.rating}</strong>
            <span>Course Rating</span>
            <small>Based on {course.reviews} reviews</small>
          </div>
        </div>
      </section>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="course-details-main">
        {/* ====================================================
            LEFT COLUMN
        ==================================================== */}

        <aside className="course-details-sidebar">
          <nav className="course-section-navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.label;

              return (
                <button
                  type="button"
                  key={item.label}
                  className={`course-section-nav-item ${
                    active ? "active" : ""
                  }`}
                  onClick={() => setActiveSection(item.label)}
                >
                  <Icon size={16} strokeWidth={1.7} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="course-quick-actions">
            <h3>Quick Actions</h3>

            <button
              type="button"
              className="quick-action-primary"
              onClick={handleEdit}
            >
              <LuPencil size={15} strokeWidth={1.8} />
              <span>Edit Course</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickAction("Duplicate Course")}
            >
              <LuCopy size={15} strokeWidth={1.8} />
              <span>Duplicate Course</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickAction("Archive Course")}
            >
              <LuArchive size={15} strokeWidth={1.8} />
              <span>Archive Course</span>
            </button>

            <button
              type="button"
              className="quick-action-danger"
              onClick={() => handleQuickAction("Delete Course")}
            >
              <LuTrash2 size={15} strokeWidth={1.8} />
              <span>Delete Course</span>
            </button>
          </div>
        </aside>

        {/* ====================================================
            CENTER COLUMN
        ==================================================== */}

        <main className="course-details-center">
          <article className="course-information-card">
            <div className="course-section-heading">
              <div className="section-heading-icon blue">
                <LuFileText size={17} strokeWidth={1.7} />
              </div>

              <div>
                <h2>About This Course</h2>
                <span>Course overview and learning information</span>
              </div>

              <button
                type="button"
                className="small-edit-button"
                onClick={handleEdit}
              >
                <LuPencil size={13} strokeWidth={1.8} />
                <span>Edit</span>
              </button>
            </div>

            <p className="course-about-text">
              This course is designed for beginners who want to learn React.js
              from scratch. Through practical examples and hands-on projects,
              you'll understand core React concepts such as components, hooks,
              state management and routing. By the end of this course, you'll be
              able to build modern, responsive web applications with confidence.
            </p>

            <div className="learning-box">
              <div className="learning-heading">
                <div>
                  <LuCircleHelp size={18} strokeWidth={1.7} />
                </div>

                <h3>What You'll Learn</h3>
              </div>

              <div className="learning-grid">
                {learningPoints.map((point) => (
                  <div className="learning-point" key={point}>
                    <LuCheck size={13} strokeWidth={2.2} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="requirements-section">
              <div className="requirements-heading">
                <LuBookOpen size={18} strokeWidth={1.7} />
                <h3>Requirements</h3>
              </div>

              <ul>
                {requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            </div>
          </article>

          {/* ==================================================
              FEEDBACK
          ================================================== */}

          <article className="course-feedback-card">
            <div className="course-section-heading">
              <div className="section-heading-icon cyan">
                <LuMessageSquare size={17} strokeWidth={1.7} />
              </div>

              <div>
                <h2>Recent Student Feedback</h2>
                <span>Latest reviews from your learners</span>
              </div>

              <button
                type="button"
                className="view-all-button"
                onClick={() => setActiveSection("Student Feedback")}
              >
                View All
                <LuArrowUpRight size={13} strokeWidth={1.8} />
              </button>
            </div>

            <div className="feedback-list">
              {feedback.slice(0, showMore ? feedback.length : 2).map((item) => (
                <div className="feedback-item" key={item.name}>
                  <div className="feedback-avatar">{item.initials}</div>

                  <div className="feedback-content">
                    <div className="feedback-top">
                      <strong>{item.name}</strong>

                      <div className="feedback-rating">
                        {Array.from({
                          length: item.rating,
                        }).map((_, index) => (
                          <LuStar
                            key={index}
                            size={11}
                            fill="currentColor"
                            strokeWidth={1.7}
                          />
                        ))}
                      </div>

                      <span>{item.time}</span>
                    </div>

                    <p>{item.text}</p>
                  </div>

                  <button
                    type="button"
                    className="feedback-more"
                    aria-label={`More options for ${item.name}`}
                    onClick={() =>
                      window.alert(`More feedback options for ${item.name}`)
                    }
                  >
                    <LuEllipsis size={16} strokeWidth={1.8} />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="feedback-load-button"
              onClick={() => setShowMore((value) => !value)}
            >
              {showMore ? "Show Less" : "View More Feedback"}
            </button>
          </article>
        </main>

        {/* ====================================================
            RIGHT COLUMN
        ==================================================== */}

        <aside className="course-details-right">
          {/* Performance */}

          <article className="performance-card">
            <div className="performance-heading">
              <div>
                <h2>Course Performance</h2>
                <span>Last 30 days</span>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Performance period selector will be connected next.",
                  )
                }
              >
                Last 30 days
                <LuChevronDown size={12} strokeWidth={1.8} />
              </button>
            </div>

            <div className="performance-metrics">
              <div>
                <strong>1,240</strong>
                <span>Total Learners</span>
                <small>
                  <LuTrendingUp size={11} />
                  12%
                </small>
              </div>

              <div>
                <strong>892</strong>
                <span>Active Learners</span>
                <small>
                  <LuTrendingUp size={11} />
                  8%
                </small>
              </div>

              <div>
                <strong>78%</strong>
                <span>Completion Rate</span>
                <small>
                  <LuTrendingUp size={11} />
                  15%
                </small>
              </div>

              <div>
                <strong>4.8</strong>
                <span>Average Rating</span>
                <small>
                  <LuTrendingUp size={11} />
                  6%
                </small>
              </div>
            </div>

            <div className="performance-chart">
              <div className="chart-line">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="chart-labels">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </article>

          {/* Certificate */}

          <article className="certificate-card">
            <div className="certificate-icon">
              <LuAward size={20} strokeWidth={1.7} />
            </div>

            <div>
              <h3>Course Certificate</h3>
              <p>
                Students will receive a certificate upon completion of this
                course.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleQuickAction("View Certificate")}
            >
              <LuArrowUpRight size={14} strokeWidth={1.8} />
              View Certificate
            </button>
          </article>

          {/* Share */}

          <article className="share-course-card">
            <div className="share-icon">
              <LuShare2 size={20} strokeWidth={1.7} />
            </div>

            <div>
              <h3>Share Your Course</h3>
              <p>Help more students learn by sharing your course.</p>
            </div>

            <button type="button" onClick={handleCopyLink}>
              <LuLink size={14} strokeWidth={1.8} />
              Copy Course Link
            </button>
          </article>
        </aside>
      </section>
    </div>
  );
};

export default CourseDetails;
