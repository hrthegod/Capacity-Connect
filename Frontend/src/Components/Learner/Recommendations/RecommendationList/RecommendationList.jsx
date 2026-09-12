// src/Components/Learner/Recommendations/RecommendationList/RecommendationList.jsx

import React, { useEffect, useMemo, useState } from "react";

import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiBarChart2,
  FiBookOpen,
  FiBookmark,
  FiClock,
  FiCompass,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiMonitor,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import Card from "../../../../Reusable_components/Card/Card";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./RecommendationList.css";

/* =========================================================
   RECOMMENDATION DATA

   8 cards are provided so the carousel can show:

   PAGE 1 → 1, 2, 3, 4
   PAGE 2 → 5, 6, 7, 8

   Later this array can be replaced by API data.
========================================================= */

/* =========================================================
   ICON MAP
========================================================= */

const courseIcons = {
  javascript: FiMonitor,
  database: FiDatabase,
  communication: FiBookOpen,
  ocean: FiGlobe,
  react: FiLayers,
  python: FiBarChart2,
  leadership: FiTarget,
  research: FiCompass,
};

/* =========================================================
   CONSTANTS
========================================================= */

const DESKTOP_PAGE_SIZE = 4;

/* =========================================================
   COMPONENT
========================================================= */

const RecommendationList = ({ stats, onViewAllCourses, onExploreCourse, courses = [] }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(0);

  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = [
    {
      id: "All",
      label: "All Recommendations",
    },
    {
      id: "Development",
      label: "Development",
    },
    {
      id: "Data",
      label: "Data",
    },
    {
      id: "Soft Skills",
      label: "Soft Skills",
    },
    {
      id: "Domain",
      label: "Domain",
    },
  ];

  /* =======================================================
     FILTER COURSES
  ======================================================= */

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All") {
      return courses;
    }

    return courses.filter(
      (course) => course.category === activeCategory,
    );
  }, [activeCategory, courses]);

  /* =======================================================
     TOTAL PAGES

     Example:

     8 courses / 4 = 2 pages
======================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / DESKTOP_PAGE_SIZE),
  );

  /* =======================================================
     RESET PAGE WHEN CATEGORY CHANGES
  ======================================================= */

  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  /* =======================================================
     SAFETY

     If filtering changes the number of pages, make sure
     currentPage never points to a non-existing page.
  ======================================================= */

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  /* =======================================================
     CURRENT FOUR COURSES

     Page 0 → 0,1,2,3
     Page 1 → 4,5,6,7
  ======================================================= */

  const visibleCourses = useMemo(() => {
    const startIndex = currentPage * DESKTOP_PAGE_SIZE;

    return filteredCourses.slice(startIndex, startIndex + DESKTOP_PAGE_SIZE);
  }, [currentPage, filteredCourses]);

  /* =======================================================
     NAVIGATION STATE
  ======================================================= */

  const isFirstPage = currentPage === 0;

  const isLastPage = currentPage >= totalPages - 1;

  /* =======================================================
     HANDLERS
  ======================================================= */

  const handlePrevious = () => {
    if (isFirstPage) {
      return;
    }

    setCurrentPage((page) => page - 1);
  };

  const handleNext = () => {
    if (isLastPage) {
      return;
    }

    setCurrentPage((page) => page + 1);
  };

  const handleViewAllCourses = () => {
    if (typeof onViewAllCourses === "function") {
      onViewAllCourses();
      return;
    }

    console.log("View all recommended courses");
  };

  const handleExploreCourse = (course) => {
    if (typeof onExploreCourse === "function") {
      onExploreCourse(course);
      return;
    }

    console.log("Explore course:", course);
  };

  const handleBookmark = (courseId) => {
    setBookmarkedCourses((previous) => {
      if (previous.includes(courseId)) {
        return previous.filter((id) => id !== courseId);
      }

      return [...previous, courseId];
    });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="recommendation-list">
      {/* =====================================================
          SECTION INTRO
      ===================================================== */}

      <div className="recommendation-list__top">
        <div className="recommendation-list__heading">
          <Badge variant="info">CURATED FOR YOUR GROWTH</Badge>

          <h2>Recommended Courses</h2>

          <p>
            Explore learning opportunities selected around your current skills,
            identified gaps, and professional goals.
          </p>
        </div>

        {/* =================================================
            TOP ACTIONS
        ================================================= */}

        <div className="recommendation-list__top-actions">
          <Button
            variant="outline"
            size="md"
            className="recommendation-list__view-all"
            onClick={handleViewAllCourses}
          >
            View All Courses
          </Button>

          {/* =================================================
              CAROUSEL BUTTONS
          ================================================= */}

          <div className="recommendation-list__carousel-controls">
            <button
              type="button"
              className="recommendation-list__carousel-button"
              onClick={handlePrevious}
              disabled={isFirstPage}
              aria-label="Previous recommendations"
            >
              <FiArrowLeft />
            </button>

            <button
              type="button"
              className="recommendation-list__carousel-button recommendation-list__carousel-button--next"
              onClick={handleNext}
              disabled={isLastPage}
              aria-label="Next recommendations"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          CATEGORY FILTER
      ===================================================== */}

      <div className="recommendation-list__categories">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`recommendation-list__category ${
              activeCategory === category.id ? "is-active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* =====================================================
          CAROUSEL

          ONLY RECOMMENDATION CARDS.

          NO DARK CARD.
          NO PERSONALIZED PATH.
          NO QUOTE CARD.
      ===================================================== */}

      <div className="recommendation-list__carousel">
        <div className="recommendation-list__courses">
          {visibleCourses.map((course) => {
            const CourseIcon = courseIcons[course.icon] || FiBookOpen;

            const isBookmarked = bookmarkedCourses.includes(course.id);

            return (
              <Card
                key={course.id}
                className={`recommendation-list__course-card recommendation-list__course-card--${course.theme}`}
              >
                {/* =========================================
                    CARD TOP
                ========================================= */}

                <div className="recommendation-list__course-top">
                  <Badge variant="info">{course.category}</Badge>

                  <button
                    type="button"
                    className={`recommendation-list__bookmark ${
                      isBookmarked ? "is-bookmarked" : ""
                    }`}
                    onClick={() => handleBookmark(course.id)}
                    aria-label={
                      isBookmarked
                        ? `Remove ${course.title} bookmark`
                        : `Bookmark ${course.title}`
                    }
                  >
                    <FiBookmark />
                  </button>
                </div>

                {/* =========================================
                    COURSE ICON
                ========================================= */}

                <div
                  className={`recommendation-list__course-icon recommendation-list__course-icon--${course.icon}`}
                >
                  <CourseIcon />
                </div>

                {/* =========================================
                    COURSE CONTENT
                ========================================= */}

                <div className="recommendation-list__course-content">
                  <h3>{course.title}</h3>

                  <p>{course.description}</p>

                  {/* CURRENT LEVEL */}

                  <div className="recommendation-list__level">
                    <span>Current Level</span>

                    <strong>{course.level}%</strong>
                  </div>

                  {/* PROGRESS */}

                  <ProgressBar
                    value={course.level}
                    max={100}
                    variant={
                      course.theme === "green"
                        ? "success"
                        : course.theme === "purple"
                          ? "purple"
                          : course.theme === "amber"
                            ? "warning"
                            : "primary"
                    }
                    size="sm"
                    radius="full"
                  />

                  {/* TARGET */}

                  <div className="recommendation-list__target">
                    <FiTrendingUp />

                    <span>Target:</span>

                    <strong>{course.target}%</strong>
                  </div>
                </div>

                {/* =========================================
                    META
                ========================================= */}

                <div className="recommendation-list__course-meta">
                  <div>
                    <FiClock />

                    <span>{course.duration}</span>
                  </div>

                  <div>
                    <FiBarChart2 />

                    <span>{course.impact}</span>
                  </div>
                </div>

                {/* =========================================
                    PROFESSIONAL EXPLORE BUTTON

                    ALWAYS AT THE BOTTOM.
                ========================================= */}

                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<FiArrowUpRight />}
                  className="recommendation-list__course-button"
                  onClick={() => handleExploreCourse(course)}
                >
                  <span className="recommendation-list__course-button-text">
                    Explore Course
                  </span>
                </Button>
              </Card>
            );
          })}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {visibleCourses.length === 0 && (
            <Card className="recommendation-list__empty">
              <div className="recommendation-list__empty-icon">
                <FiBookOpen />
              </div>

              <h3>No recommendations found</h3>

              <p>There are currently no courses available in this category.</p>
            </Card>
          )}
        </div>

        {/* =================================================
            PAGE INDICATOR
        ================================================= */}

        {totalPages > 1 && (
          <div className="recommendation-list__pagination">
            <span className="recommendation-list__pagination-current">
              {currentPage + 1}
            </span>

            <span className="recommendation-list__pagination-divider">/</span>

            <span>{totalPages}</span>

            <span className="recommendation-list__pagination-label">
              Recommendation Sets
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendationList;
