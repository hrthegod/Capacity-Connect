import React from "react";
import { useNavigate } from "react-router-dom";

import {
  LuArrowRight,
  LuBookOpen,
  LuChevronRight,
  LuGraduationCap,
  LuHouse,
  LuPlus,
} from "react-icons/lu";

import "./CoursesHeader.css";

const CoursesHeader = ({ onCreateCourse }) => {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    if (onCreateCourse) {
      onCreateCourse();
    } else {
      navigate("/trainer/trainer-courses/create");
    }
  };

  const handleCoursesBreadcrumb = () => {
    navigate("/trainer/trainer-courses");
  };

  return (
    <section className="courses-header">
      {/* ==========================================================
          BREADCRUMB
      ========================================================== */}
      <nav className="courses-breadcrumb" aria-label="Course navigation">
        <button
          type="button"
          className="courses-breadcrumb-item breadcrumb-home"
          onClick={() => navigate("/trainer")}
          aria-label="Go to trainer dashboard"
          title="Trainer Dashboard"
        >
          <LuHouse size={14} strokeWidth={1.8} />
        </button>

        <LuChevronRight
          className="courses-breadcrumb-arrow"
          size={13}
          strokeWidth={1.7}
        />

        <button
          type="button"
          className="courses-breadcrumb-item"
          onClick={() => navigate("/trainer")}
        >
          Trainer
        </button>

        <LuChevronRight
          className="courses-breadcrumb-arrow"
          size={13}
          strokeWidth={1.7}
        />

        <button
          type="button"
          className="courses-breadcrumb-item current"
          onClick={handleCoursesBreadcrumb}
          aria-current="page"
        >
          Courses
        </button>
      </nav>

      {/* ==========================================================
          HEADER CONTENT
      ========================================================== */}
      <div className="courses-header-main">
        {/* --------------------------------------------------------
            TITLE AREA
        -------------------------------------------------------- */}
        <div className="courses-header-title-area">
          <div className="courses-header-title-icon">
            <LuBookOpen size={20} strokeWidth={1.7} />
          </div>

          <div className="courses-header-title-content">
            <span className="courses-header-eyebrow">TRAINER LEARNING HUB</span>

            <h1>My Courses</h1>

            <p>
              Create, manage and track your courses. Inspire learners and make a
              greater impact.
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------
            INSPIRATION CARD
        -------------------------------------------------------- */}
        <article className="courses-inspiration-card">
          <div className="inspiration-glow inspiration-glow-one" />
          <div className="inspiration-glow inspiration-glow-two" />

          <div className="inspiration-content">
            <span className="inspiration-mark">“</span>

            <p className="inspiration-text">
              Good teaching creates endless possibilities.
            </p>

            <span className="inspiration-author">— Unknown</span>
          </div>

          <div className="inspiration-visual">
            <div className="inspiration-orbit orbit-one" />
            <div className="inspiration-orbit orbit-two" />

            <div className="inspiration-icon">
              <LuGraduationCap size={42} strokeWidth={1.35} />
            </div>

            <div className="inspiration-floating-card floating-card-one">
              <LuBookOpen size={13} strokeWidth={1.7} />
            </div>

            <div className="inspiration-floating-card floating-card-two">
              <LuPlus size={12} strokeWidth={1.8} />
            </div>
          </div>
        </article>

        {/* --------------------------------------------------------
            CREATE COURSE CARD
        -------------------------------------------------------- */}
        <article className="create-course-card">
          <div className="create-course-icon">
            <LuBookOpen size={19} strokeWidth={1.7} />
          </div>

          <div className="create-course-content">
            <h2>Create a New Course</h2>

            <p>Share your knowledge with learners worldwide.</p>
          </div>

          <button
            type="button"
            className="create-course-button"
            onClick={handleCreateCourse}
          >
            <LuPlus size={16} strokeWidth={2} />

            <span>Create Course</span>

            <LuArrowRight
              className="create-course-arrow"
              size={15}
              strokeWidth={1.9}
            />
          </button>
        </article>
      </div>
    </section>
  );
};

export default CoursesHeader;
