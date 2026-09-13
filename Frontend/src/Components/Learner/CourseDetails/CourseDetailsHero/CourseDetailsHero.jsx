import React from "react";

import {
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiLoader,
  FiPlayCircle,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import Badge from "../../../../Reusable_components/Badge/Badge";
import Button from "../../../../Reusable_components/Button/Button";

import "./CourseDetailsHero.css";

const CourseDetailsHero = ({
  course,
  onBack,
  onEnroll,
  onFavorite,

  /* =========================================================
     ENROLLMENT PROPS
  ========================================================= */

  enrollment = null,
  isEnrolled = false,
  isCompleted = false,
  isEnrollmentLoading = false,
  isEnrolling = false,
  onContinueLearning,
}) => {
  if (!course) return null;

  const {
    title = "Course Title",
    categoryLabel = "Learning",
    difficulty = "beginner",
    durationLabel = "4 weeks",
    modules = 0,
    rating = 0,
    learners = 0,
    description = "",
    image = "",
    badge = "",
    isFavorite = false,
  } = course;

  /* =========================================================
     DIFFICULTY
  ========================================================= */

  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  const formattedLearners = new Intl.NumberFormat("en-IN").format(learners);

  const difficultyVariant =
    difficulty === "advanced"
      ? "purple"
      : difficulty === "intermediate"
        ? "warning"
        : "success";

  /* =========================================================
     ENROLLMENT BUTTON STATE
  ========================================================= */

  const getEnrollmentButtonContent = () => {
    if (isEnrollmentLoading) {
      return {
        text: "Checking enrollment...",
        icon: <FiLoader />,
        action: null,
        disabled: true,
        variant: "primary",
      };
    }

    if (isEnrolling) {
      return {
        text: "Enrolling...",
        icon: <FiLoader />,
        action: null,
        disabled: true,
        variant: "primary",
      };
    }

    if (isCompleted) {
      return {
        text: "View Course",
        icon: <FiArrowRight />,
        action: onContinueLearning,
        disabled: false,
        variant: "primary",
      };
    }

    if (isEnrolled) {
      return {
        text: "Continue Learning",
        icon: <FiArrowRight />,
        action: onContinueLearning,
        disabled: false,
        variant: "primary",
      };
    }

    return {
      text: "Enroll Now",
      icon: <FiArrowRight />,
      action: () => onEnroll?.(course),
      disabled: false,
      variant: "primary",
    };
  };

  const enrollmentButton = getEnrollmentButtonContent();

  /* =========================================================
     HERO
  ========================================================= */

  return (
    <></>
  );
};

export default CourseDetailsHero;
