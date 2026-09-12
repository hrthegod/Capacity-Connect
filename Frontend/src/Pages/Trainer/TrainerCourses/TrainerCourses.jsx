import React, { useEffect, useMemo, useState } from "react";

import CoursesHeader from "../../../Components/Trainer/TrainerCourses/CoursesHeader/CoursesHeader";
import CourseStats from "../../../Components/Trainer/TrainerCourses/CourseStats/CourseStats";
import CourseFilters from "../../../Components/Trainer/TrainerCourses/CourseFilters/CourseFilters";

import CourseList from "../../../Components/Trainer/TrainerCourses/CourseList/CourseList";
import { getCourses, createCourse } from "../../../services/courseApi";

import "./TrainerCourses.css";

const GENERIC_DEMO_TITLES = [
  "Full Stack Web Development & Microservices",
  "Database Management & Advanced SQL Analytics",
  "Cloud Infrastructure & DevOps Mastery"
];

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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourseData, setNewCourseData] = useState({
    title: "",
    description: "",
    category: "Observations",
    level: "BEGINNER"
  });

  const fetchCoursesList = () => {
    getCourses("TRAINER")
      .then((data) => {
        if (Array.isArray(data)) {
          const filtered = data.filter((c) => !GENERIC_DEMO_TITLES.includes(c.title));
          setRealCourses(filtered.map(normalizeCourse));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch backend courses:", err);
      });
  };

  useEffect(() => {
    fetchCoursesList();
  }, []);

  const handleCreateCourseSubmit = async (e) => {
    e.preventDefault();
    if (!newCourseData.title.trim()) {
      alert("Please enter a course title");
      return;
    }
    try {
      await createCourse({
        title: newCourseData.title,
        description: newCourseData.description,
        category: newCourseData.category,
        level: newCourseData.level,
        isPublished: true
      });
      setShowCreateModal(false);
      setNewCourseData({ title: "", description: "", category: "Observations", level: "BEGINNER" });
      fetchCoursesList();
    } catch (err) {
      console.error("Error creating course:", err);
      alert(err.message || "Failed to create course");
    }
  };

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
    let result = [...(realCourses || [])];

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

    if (category !== "All Categories") {
      result = result.filter((course) => course.category === category);
    }

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

  const handleResetFilters = () => {
    setSearchValue("");
    setCategory("All Categories");
    setStatus("All Status");
    setSortValue("Newest");
    setViewMode("grid");
  };

  return (
    <div className="trainer-courses">
      <CoursesHeader onCreateCourse={() => setShowCreateModal(true)} />
      <CourseStats />
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
      <CourseList courses={filteredCourses} viewMode={viewMode} />

      {/* Create Course Modal */}
      {showCreateModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "2rem",
            width: "90%",
            maxWidth: "520px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          }}>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem", color: "#0f172a" }}>Create New Course</h2>
            <form onSubmit={handleCreateCourseSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Title</label>
                <input
                  type="text"
                  required
                  value={newCourseData.title}
                  onChange={(e) => setNewCourseData({ ...newCourseData, title: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                  placeholder="e.g. Advanced Meteorological Data Processing"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Category</label>
                <input
                  type="text"
                  required
                  value={newCourseData.category}
                  onChange={(e) => setNewCourseData({ ...newCourseData, category: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                  placeholder="e.g. Observations / Forecasting"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Difficulty Level</label>
                <select
                  value={newCourseData.level}
                  onChange={(e) => setNewCourseData({ ...newCourseData, level: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Description</label>
                <textarea
                  rows={3}
                  value={newCourseData.description}
                  onChange={(e) => setNewCourseData({ ...newCourseData, description: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                  placeholder="Course summary and objectives..."
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", cursor: "pointer", fontWeight: 600 }}
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerCourses;
