import React, { useMemo, useState } from "react";

import CoursesHeader from "../../../Components/Trainer/TrainerCourses/CoursesHeader/CoursesHeader";
import CourseStats from "../../../Components/Trainer/TrainerCourses/CourseStats/CourseStats";
import CourseFilters from "../../../Components/Trainer/TrainerCourses/CourseFilters/CourseFilters";

import CourseList, {
  courses as allCourses,
} from "../../../Components/Trainer/TrainerCourses/CourseList/CourseList";

import "./TrainerCourses.css";

const TrainerCourses = () => {
  /* ==========================================================
     COURSE FILTER STATE
  ========================================================== */

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [sortValue, setSortValue] = useState("Newest");
  const [viewMode, setViewMode] = useState("grid");

  /* ==========================================================
     FILTER + SORT COURSES
  ========================================================== */

  const filteredCourses = useMemo(() => {
    let result = [...allCourses];

    /* ----------------------------------------------------------
       SEARCH
    ---------------------------------------------------------- */

    const search = searchValue.trim().toLowerCase();

    if (search) {
      result = result.filter((course) => {
        return (
          course.title.toLowerCase().includes(search) ||
          course.description.toLowerCase().includes(search) ||
          course.category.toLowerCase().includes(search) ||
          course.level.toLowerCase().includes(search)
        );
      });
    }

    /* ----------------------------------------------------------
       CATEGORY
    ---------------------------------------------------------- */

    if (category !== "All Categories") {
      result = result.filter((course) => course.category === category);
    }

    /* ----------------------------------------------------------
       STATUS
    ---------------------------------------------------------- */

    if (status !== "All Status") {
      result = result.filter((course) => {
        if (status === "Published") {
          return course.status === "Published";
        }

        if (status === "Drafts") {
          return course.status === "Draft";
        }

        if (status === "Archived") {
          return course.status === "Archived";
        }

        return true;
      });
    }

    /* ----------------------------------------------------------
       SORT
    ---------------------------------------------------------- */

    switch (sortValue) {
      case "Name: A → Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "Name: Z → A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case "Most Learners":
        result.sort(
          (a, b) =>
            Number(b.learners.replace(/,/g, "")) -
            Number(a.learners.replace(/,/g, "")),
        );
        break;

      case "Highest Progress":
        result.sort((a, b) => b.progress - a.progress);
        break;

      case "Oldest":
        result.sort((a, b) => b.id - a.id);
        break;

      case "Newest":
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [searchValue, category, status, sortValue]);

  /* ==========================================================
     RESET FILTERS
  ========================================================== */

  const handleResetFilters = () => {
    setSearchValue("");
    setCategory("All Categories");
    setStatus("All Status");
    setSortValue("Newest");
    setViewMode("grid");
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="trainer-courses">
      {/* ==========================================================
          COURSES HEADER
      ========================================================== */}
      <CoursesHeader />

      {/* ==========================================================
          COURSE STATS
      ========================================================== */}
      <CourseStats />

      {/* ==========================================================
          COURSE FILTERS
      ========================================================== */}
      <CourseFilters
        searchValue={searchValue}
        category={category}
        status={status}
        sortValue={sortValue}
        viewMode={viewMode}
        onSearchChange={setSearchValue}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onSortChange={setSortValue}
        onViewChange={setViewMode}
        onResetFilters={handleResetFilters}
      />

      {/* ==========================================================
          COURSE LIST

          Only receives the already filtered and sorted courses.
      ========================================================== */}
      <CourseList courses={filteredCourses} viewMode={viewMode} />
    </div>
  );
};

export default TrainerCourses;
