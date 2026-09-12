import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LuArrowRight,
  LuBookOpen,
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuFilePenLine,
  LuLayers3,
  LuPlay,
  LuUsersRound,
} from "react-icons/lu";

import "./CourseList.css";

/* =========================================================
   COURSE DATA

   Exported so TrainerCourses.jsx can use the same data
   for search, filtering and sorting.
========================================================= */

export const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description:
      "Learn React from scratch with hands-on projects and real-world examples.",
    category: "Web Development",
    level: "Beginner",
    status: "Published",
    learners: "1,240",
    progress: 86,
    duration: "12h 30m",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=85",
    theme: "blue",
  },
  {
    id: 2,
    title: "Python for Data Science",
    description:
      "Explore data analysis, visualization and machine learning with Python.",
    category: "Data Science",
    level: "Intermediate",
    status: "Draft",
    learners: "856",
    progress: 64,
    duration: "8h 15m",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=85",
    theme: "sky",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description:
      "Master the principles of modern UI/UX design with practical exercises.",
    category: "Design",
    level: "Beginner",
    status: "Published",
    learners: "932",
    progress: 78,
    duration: "10h 20m",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85",
    theme: "lavender",
  },
  {
    id: 4,
    title: "Cloud Computing Basics",
    description:
      "Understand cloud infrastructure, services and deployment strategies.",
    category: "Cloud Computing",
    level: "Beginner",
    status: "Archived",
    learners: "642",
    progress: 52,
    duration: "6h 45m",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
    theme: "blue",
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    description:
      "Learn modern digital marketing techniques to grow your business.",
    category: "Marketing",
    level: "Intermediate",
    status: "Published",
    learners: "1,120",
    progress: 72,
    duration: "5h 30m",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=85",
    theme: "peach",
  },
  {
    id: 6,
    title: "Node.js Backend Development",
    description:
      "Build scalable backend applications with Node.js and Express.",
    category: "Web Development",
    level: "Intermediate",
    status: "Draft",
    learners: "720",
    progress: 58,
    duration: "9h 10m",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=900&q=85",
    theme: "green",
  },
  {
    id: 7,
    title: "AI for Everyone",
    description:
      "Understand the fundamentals of artificial intelligence and its applications.",
    category: "Artificial Intelligence",
    level: "Beginner",
    status: "Published",
    learners: "1,430",
    progress: 91,
    duration: "7h 25m",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    theme: "violet",
  },
  {
    id: 8,
    title: "Flutter App Development",
    description:
      "Build beautiful cross-platform mobile applications with Flutter.",
    category: "Mobile Development",
    level: "Intermediate",
    status: "Published",
    learners: "980",
    progress: 69,
    duration: "11h 40m",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=85",
    theme: "sky",
  },
];

/* =========================================================
   COURSE LIST
========================================================= */

const CourseList = ({
  courses: filteredCourses = courses,
  viewMode = "grid",
}) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  /* =========================================================
     ACTIONS
  ========================================================= */

  const handleEdit = (course) => {
    setOpenMenu(null);

    window.dispatchEvent(
      new CustomEvent("trainer-edit-course", {
        detail: {
          course,
        },
      }),
    );
  };

  /* =========================================================
     VIEW COURSE DETAILS
  ========================================================= */

  const handleViewDetails = (course) => {
    setOpenMenu(null);

    navigate(`/trainer/trainer-courses/${course.id}`);
  };

  /* =========================================================
     PAGINATION
  ========================================================= */

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOpenMenu(null);

    window.dispatchEvent(
      new CustomEvent("trainer-course-page-change", {
        detail: {
          page,
        },
      }),
    );
  };

  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (courseStatus) => {
    if (courseStatus === "Published") {
      return "published";
    }

    if (courseStatus === "Draft") {
      return "draft";
    }

    return "archived";
  };

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  const renderEmptyState = () => {
    return (
      <div className="course-list-empty-state">
        <div className="course-empty-icon">
          <LuBookOpen size={21} strokeWidth={1.6} />
        </div>

        <h3>No courses found</h3>

        <p>Try changing your search or course filters.</p>
      </div>
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="course-list-section">
      {/* =====================================================
          LIST HEADER
      ===================================================== */}

      <div className="course-list-header">
        <div className="course-list-title-group">
          <div className="course-list-icon">
            <LuLayers3 size={19} strokeWidth={1.7} />
          </div>

          <div className="course-list-heading-content">
            <div className="course-list-title-row">
              <h2>Courses List</h2>

              <span className="course-total-badge">
                {filteredCourses.length}{" "}
                {filteredCourses.length === 1 ? "course" : "courses"}
              </span>
            </div>

            <p>Manage, edit and track your courses all in one place.</p>
          </div>
        </div>

        <div className="course-list-header-pagination">
          <span>
            Showing <strong>{filteredCourses.length}</strong> of 24 courses
          </span>

          <div className="course-pagination-arrows">
            <button
              type="button"
              aria-label="Previous courses"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            >
              <LuChevronLeft size={16} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              aria-label="Next courses"
              disabled={currentPage === 6}
              onClick={() => handlePageChange(Math.min(6, currentPage + 1))}
            >
              <LuChevronRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          COURSE GRID / LIST
      ===================================================== */}

      {filteredCourses.length > 0 ? (
        <div
          className={`course-list-grid ${
            viewMode === "list" ? "course-list-list-mode" : ""
          }`}
        >
          {filteredCourses.map((course) => (
            <article
              className={`course-list-card ${course.theme}`}
              key={course.id}
            >
              {/* =================================================
                  COURSE IMAGE
              ================================================= */}

              <div className="course-card-image-wrapper">
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-card-image"
                />

                <div className="course-card-image-overlay" />

                {/* Status */}

                <span
                  className={`course-status-badge ${getStatusClass(
                    course.status,
                  )}`}
                >
                  <span className="course-status-dot" />

                  {course.status}
                </span>

                {/* Duration */}

                <span className="course-duration">
                  <LuPlay size={10} strokeWidth={2} />

                  {course.duration}
                </span>

                {/* Menu */}

                <div className="course-card-menu-wrapper">
                  <button
                    type="button"
                    className={`course-card-menu-button ${
                      openMenu === course.id ? "active" : ""
                    }`}
                    aria-label={`More actions for ${course.title}`}
                    aria-expanded={openMenu === course.id}
                    onClick={() =>
                      setOpenMenu((previous) =>
                        previous === course.id ? null : course.id,
                      )
                    }
                  >
                    <LuEllipsis size={17} strokeWidth={1.9} />
                  </button>

                  {openMenu === course.id && (
                    <div className="course-card-action-menu">
                      <button type="button" onClick={() => handleEdit(course)}>
                        <LuFilePenLine size={14} strokeWidth={1.8} />

                        <span>Edit course</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleViewDetails(course)}
                      >
                        <LuBookOpen size={14} strokeWidth={1.8} />

                        <span>View course</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  COURSE CONTENT
              ================================================= */}

              <div className="course-card-content">
                <h3>{course.title}</h3>

                <p className="course-card-description">{course.description}</p>

                {/* Metrics */}

                <div className="course-card-metrics">
                  <div className="course-card-metric">
                    <LuUsersRound size={15} strokeWidth={1.7} />

                    <span>{course.learners}</span>
                  </div>

                  <span className="course-metric-divider" />

                  <div className="course-card-metric">
                    <LuPlay size={14} strokeWidth={1.8} />

                    <span>{course.progress}%</span>
                  </div>
                </div>

                {/* Tags */}

                <div className="course-card-tags">
                  <span className="course-category-tag">{course.category}</span>

                  <span className="course-level-tag">{course.level}</span>
                </div>

                {/* Actions */}

                <div className="course-card-actions">
                  <button
                    type="button"
                    className="course-edit-button"
                    onClick={() => handleEdit(course)}
                  >
                    <LuFilePenLine size={14} strokeWidth={1.8} />

                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    className="course-details-button"
                    onClick={() => handleViewDetails(course)}
                  >
                    <span>View Details</span>

                    <LuArrowRight size={15} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        renderEmptyState()
      )}

      {/* =====================================================
          LIST FOOTER
      ===================================================== */}

      {filteredCourses.length > 0 && (
        <div className="course-list-footer">
          <p>
            Showing <strong>{filteredCourses.length}</strong> of{" "}
            <strong>24 courses</strong>
          </p>

          <div className="course-pagination">
            <button
              type="button"
              className="course-pagination-button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            >
              <LuChevronLeft size={15} strokeWidth={1.8} />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                type="button"
                key={page}
                className={`course-page-number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <span className="course-page-dots">...</span>

            <button
              type="button"
              className={`course-page-number ${
                currentPage === 6 ? "active" : ""
              }`}
              onClick={() => handlePageChange(6)}
            >
              6
            </button>

            <button
              type="button"
              className="course-pagination-button"
              aria-label="Next page"
              disabled={currentPage === 6}
              onClick={() => handlePageChange(Math.min(6, currentPage + 1))}
            >
              <LuChevronRight size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseList;
