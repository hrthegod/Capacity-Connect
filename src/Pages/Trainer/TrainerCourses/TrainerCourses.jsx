import React, { useEffect, useMemo, useState } from "react";

import CoursesHeader from "../../../Components/Trainer/TrainerCourses/CoursesHeader/CoursesHeader";
import CourseStats from "../../../Components/Trainer/TrainerCourses/CourseStats/CourseStats";
import CourseFilters from "../../../Components/Trainer/TrainerCourses/CourseFilters/CourseFilters";

import CourseList, {
  courses as fallbackCourses,
} from "../../../Components/Trainer/TrainerCourses/CourseList/CourseList";
import { getCourses } from "../../../services/courseApi";

import "./TrainerCourses.css";

const normalizeCourse = (c, idx) => ({
  ...c,
  id: c.id,
  title: c.title,
  description: c.description || "Comprehensive course provided by MOES/IMD Training Division.",
  category: c.category || "Meteorology",
  level: c.level || "Intermediate",
  status: c.is_published !== false ? "Published" : "Draft",
  learners: c.enrolled_count ? String(c.enrolled_count) : "240",
  progress: c.progress ?? 75,
  duration: c.duration || "12h 30m",
  image:
    c.image ||
    [
      "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85",
    ][idx % 4],
  theme: ["blue", "sky", "lavender", "peach", "mint"][idx % 5],
});

const TrainerCourses = () => {
  const [realCourses, setRealCourses] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getCourses("TRAINER")
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setRealCourses(data.map(normalizeCourse));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch backend courses:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
    let result = [...(realCourses || fallbackCourses)];

    /* ----------------------------------------------------------
       SEARCH
    ---------------------------------------------------------- */

    const search = searchValue.trim().toLowerCase();

    if (search) {
      result = result.filter((course) => {
        return (
          (course.title && course.title.toLowerCase().includes(search)) ||
          (course.description && course.description.toLowerCase().includes(search)) ||
          (course.category && course.category.toLowerCase().includes(search)) ||
          (course.level && course.level.toLowerCase().includes(search))
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
            Number(String(b.learners || 0).replace(/,/g, "")) -
            Number(String(a.learners || 0).replace(/,/g, "")),
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
  }, [realCourses, searchValue, category, status, sortValue]);

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

