// src/Components/Learner/Recommendations/LearningPaths/LearningPaths.jsx

import React, { useState } from "react";

import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCode,
  FiDatabase,
  FiLayers,
  FiMap,
  FiPlay,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";
import Card from "../../../../Reusable_components/Card/Card";
import ProgressBar from "../../../../Reusable_components/ProgressBar/ProgressBar";

import "./LearningPaths.css";

/* =========================================================
   LEARNING PATH DATA

   API-ready structure.

   Later this can directly come from your backend.
========================================================= */

const learningPaths = [
  {
    id: "frontend-development",
    title: "Frontend Development",
    subtitle: "Build modern web experiences from the ground up.",
    description:
      "A structured journey through modern frontend development, taking you from core JavaScript concepts to production-ready React applications.",
    category: "Development",
    icon: "code",
    theme: "blue",

    progress: 72,

    coursesCompleted: 4,
    totalCourses: 6,

    duration: "8 weeks",

    level: "Intermediate",

    nextCourse: "Advanced React Patterns",

    skills: ["JavaScript", "React", "UI Development"],

    highlights: ["Modern JavaScript", "React architecture", "Responsive UI"],
  },

  {
    id: "data-analysis",
    title: "Python & Data Analysis",
    subtitle: "Turn data into meaningful insights.",
    description:
      "Develop practical Python and data-analysis skills through a guided sequence covering programming, data manipulation, visualization, and analytical thinking.",
    category: "Data",
    icon: "database",
    theme: "green",

    progress: 58,

    coursesCompleted: 2,
    totalCourses: 5,

    duration: "10 weeks",

    level: "Developing",

    nextCourse: "Python for Data Analysis",

    skills: ["Python", "Data Analysis", "SQL"],

    highlights: [
      "Python fundamentals",
      "Data manipulation",
      "Data visualization",
    ],
  },

  {
    id: "professional-growth",
    title: "Professional Growth",
    subtitle: "Strengthen the skills that help you lead.",
    description:
      "Build communication, teamwork, leadership, and workplace confidence through a practical professional-development journey.",
    category: "Professional",
    icon: "users",
    theme: "purple",

    progress: 64,

    coursesCompleted: 3,
    totalCourses: 5,

    duration: "6 weeks",

    level: "Intermediate",

    nextCourse: "Leadership Essentials",

    skills: ["Communication", "Teamwork", "Leadership"],

    highlights: [
      "Leadership skills",
      "Team collaboration",
      "Professional communication",
    ],
  },

  {
    id: "ocean-science",
    title: "Ocean Science Foundations",
    subtitle: "Build a strong foundation in ocean sciences.",
    description:
      "Explore fundamental ocean-science concepts and develop domain knowledge that connects technology, research, and marine environments.",
    category: "Domain",
    icon: "layers",
    theme: "amber",

    progress: 70,

    coursesCompleted: 3,
    totalCourses: 4,

    duration: "7 weeks",

    level: "Proficient",

    nextCourse: "Marine Research Essentials",

    skills: ["Ocean Science", "Research", "Marine Systems"],

    highlights: ["Ocean fundamentals", "Marine systems", "Research methods"],
  },
];

/* =========================================================
   ICON MAP
========================================================= */

const pathIcons = {
  code: FiCode,
  database: FiDatabase,
  users: FiUsers,
  layers: FiLayers,
};

/* =========================================================
   COMPONENT
========================================================= */

const LearningPaths = ({ onContinuePath, onViewAllPaths }) => {
  const [expandedPath, setExpandedPath] = useState(null);

  /* =======================================================
     HANDLERS
  ======================================================= */

  const handleContinuePath = (path) => {
    if (typeof onContinuePath === "function") {
      onContinuePath(path);
      return;
    }

    console.log("Continue learning path:", path);
  };

  const handleViewAllPaths = () => {
    if (typeof onViewAllPaths === "function") {
      onViewAllPaths();
      return;
    }

    console.log("View all learning paths");
  };

  const handleTogglePath = (pathId) => {
    setExpandedPath((current) => (current === pathId ? null : pathId));
  };

  return (
    <section className="learning-paths">
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="learning-paths__header">
        <div className="learning-paths__heading">
          <Badge variant="info">STRUCTURED FOR YOUR GROWTH</Badge>

          <h2>Learning Paths</h2>

          <p>
            Follow a structured journey that connects individual courses into
            meaningful skill development.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          rightIcon={<FiArrowRight />}
          onClick={handleViewAllPaths}
          className="learning-paths__view-all"
        >
          View All Paths
        </Button>
      </div>

      {/* =====================================================
          FEATURED PATH

          DARK NAVY CARD — ONLY ONE DARK SECTION
      ===================================================== */}

      <Card className="learning-paths__featured">
        <div className="learning-paths__featured-glow" />

        <div className="learning-paths__featured-orb learning-paths__featured-orb--one" />

        <div className="learning-paths__featured-orb learning-paths__featured-orb--two" />

        {/* ---------------------------------------------------
            FEATURED LEFT
        --------------------------------------------------- */}

        <div className="learning-paths__featured-main">
          <div className="learning-paths__featured-top">
            <div className="learning-paths__featured-icon">
              <FiMap />
            </div>

            <Badge variant="success">RECOMMENDED PATH</Badge>
          </div>

          <div className="learning-paths__featured-copy">
            <span className="learning-paths__featured-label">
              Your Current Learning Journey
            </span>

            <h3>Frontend Development</h3>

            <p>
              Continue building your frontend expertise through a focused
              sequence of skills and practical projects.
            </p>
          </div>

          <div className="learning-paths__featured-progress">
            <div className="learning-paths__featured-progress-top">
              <span>Overall Progress</span>

              <strong>72%</strong>
            </div>

            <ProgressBar
              value={72}
              max={100}
              variant="success"
              size="sm"
              radius="full"
              animated
            />
          </div>

          <div className="learning-paths__featured-meta">
            <div>
              <FiBookOpen />

              <span>4 of 6 courses</span>
            </div>

            <div>
              <FiClock />

              <span>8 weeks</span>
            </div>

            <div>
              <FiTrendingUp />

              <span>Intermediate</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            leftIcon={<FiPlay />}
            rightIcon={<FiArrowRight />}
            onClick={() => handleContinuePath(learningPaths[0])}
            className="learning-paths__featured-button"
          >
            Continue Learning
          </Button>
        </div>

        {/* ---------------------------------------------------
            FEATURED RIGHT — NEXT MILESTONE
        --------------------------------------------------- */}

        <div className="learning-paths__featured-side">
          <div className="learning-paths__milestone-heading">
            <div>
              <span>NEXT MILESTONE</span>

              <h4>Advanced React Patterns</h4>
            </div>

            <div className="learning-paths__milestone-icon">
              <FiTarget />
            </div>
          </div>

          <div className="learning-paths__milestone-line">
            <span className="is-complete">
              <FiCheckCircle />
            </span>

            <div>
              <strong>JavaScript Foundations</strong>

              <small>Completed</small>
            </div>
          </div>

          <div className="learning-paths__milestone-line">
            <span className="is-complete">
              <FiCheckCircle />
            </span>

            <div>
              <strong>React Fundamentals</strong>

              <small>Completed</small>
            </div>
          </div>

          <div className="learning-paths__milestone-line is-current">
            <span>
              <FiPlay />
            </span>

            <div>
              <strong>Advanced React Patterns</strong>

              <small>Up next</small>
            </div>
          </div>

          <div className="learning-paths__milestone-line is-locked">
            <span>
              <FiLayers />
            </span>

            <div>
              <strong>Production Projects</strong>

              <small>Coming next</small>
            </div>
          </div>
        </div>
      </Card>

      {/* =====================================================
          ALL LEARNING PATHS
      ===================================================== */}

      <div className="learning-paths__section-heading">
        <div>
          <span>EXPLORE YOUR JOURNEYS</span>

          <h3>Paths built around your goals</h3>
        </div>

        <p>Choose a path and progress step-by-step.</p>
      </div>

      <div className="learning-paths__grid">
        {learningPaths.map((path, index) => {
          const PathIcon = pathIcons[path.icon] || FiLayers;

          const isExpanded = expandedPath === path.id;

          return (
            <Card
              key={path.id}
              className={`learning-paths__card learning-paths__card--${path.theme} ${
                index === 0 ? "learning-paths__card--featured-light" : ""
              }`}
            >
              {/* =================================================
                  CARD TOP
              ================================================= */}

              <div className="learning-paths__card-top">
                <div className="learning-paths__card-icon">
                  <PathIcon />
                </div>

                <Badge
                  variant={
                    path.theme === "green"
                      ? "success"
                      : path.theme === "purple"
                        ? "info"
                        : path.theme === "amber"
                          ? "warning"
                          : "info"
                  }
                >
                  {path.category}
                </Badge>
              </div>

              {/* =================================================
                  CARD CONTENT
              ================================================= */}

              <div className="learning-paths__card-content">
                <h4>{path.title}</h4>

                <span className="learning-paths__card-subtitle">
                  {path.subtitle}
                </span>

                <p>{path.description}</p>
              </div>

              {/* =================================================
                  SKILLS
              ================================================= */}

              <div className="learning-paths__skills">
                {path.skills.map((skill) => (
                  <span key={skill} className="learning-paths__skill">
                    {skill}
                  </span>
                ))}
              </div>

              {/* =================================================
                  PROGRESS
              ================================================= */}

              <div className="learning-paths__card-progress">
                <div className="learning-paths__card-progress-top">
                  <span>Path Progress</span>

                  <strong>{path.progress}%</strong>
                </div>

                <ProgressBar
                  value={path.progress}
                  max={100}
                  variant={
                    path.theme === "green"
                      ? "success"
                      : path.theme === "purple"
                        ? "purple"
                        : path.theme === "amber"
                          ? "warning"
                          : "primary"
                  }
                  size="sm"
                  radius="full"
                  animated
                />
              </div>

              {/* =================================================
                  META
              ================================================= */}

              <div className="learning-paths__card-meta">
                <div>
                  <FiBookOpen />

                  <span>
                    {path.coursesCompleted}/{path.totalCourses} courses
                  </span>
                </div>

                <div>
                  <FiClock />

                  <span>{path.duration}</span>
                </div>
              </div>

              {/* =================================================
                  NEXT COURSE
              ================================================= */}

              <div className="learning-paths__next">
                <div className="learning-paths__next-icon">
                  <FiTarget />
                </div>

                <div>
                  <span>NEXT UP</span>

                  <strong>{path.nextCourse}</strong>
                </div>
              </div>

              {/* =================================================
                  EXPANDABLE HIGHLIGHTS
              ================================================= */}

              {isExpanded && (
                <div className="learning-paths__highlights">
                  {path.highlights.map((highlight) => (
                    <div key={highlight} className="learning-paths__highlight">
                      <FiCheckCircle />

                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* =================================================
                  CARD ACTIONS
              ================================================= */}

              <div className="learning-paths__card-actions">
                <button
                  type="button"
                  className="learning-paths__details-button"
                  onClick={() => handleTogglePath(path.id)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Hide Details" : "View Details"}

                  {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<FiArrowRight />}
                  onClick={() => handleContinuePath(path)}
                  className="learning-paths__card-button"
                >
                  Continue
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* =====================================================
          BOTTOM INSIGHT
      ===================================================== */}

      <div className="learning-paths__insight">
        <div className="learning-paths__insight-icon">
          <FiTrendingUp />
        </div>

        <div className="learning-paths__insight-content">
          <span>YOUR NEXT STEP</span>

          <h3>Stay consistent and complete one milestone at a time.</h3>

          <p>
            Completing your active learning path will strengthen multiple skills
            together instead of learning them in isolation.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          rightIcon={<FiArrowRight />}
          onClick={() => handleContinuePath(learningPaths[0])}
          className="learning-paths__insight-button"
        >
          Continue Path
        </Button>
      </div>
    </section>
  );
};

export default LearningPaths;
