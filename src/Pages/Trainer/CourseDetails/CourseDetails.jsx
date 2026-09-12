import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  LuExternalLink,
  LuEye,
  LuFile,
  LuFileText,
  LuHouse,
  LuLayers3,
  LuLink,
  LuList,
  LuMessageSquare,
  LuPencil,
  LuPlay,
  LuPlus,
  LuRotateCcw,
  LuSettings,
  LuShare2,
  LuStar,
  LuTrash2,
  LuTrendingUp,
  LuUpload,
  LuUsersRound,
} from "react-icons/lu";

import {
  getCourseById,
  getModulesByCourse,
  getUnitsByCourse,
  getTopicsByUnit,
  updateCourse,
  deleteCourse,
  createUnit,
  updateUnit,
  deleteUnit,
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicMaterials,
  uploadTopicMaterial,
  deleteTopicMaterial,
} from "../../../services/courseApi";

import "./CourseDetails.css";

const CourseDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const targetCourseId = Number(params.courseId || params.id) || 1;

  const [activeSection, setActiveSection] = useState("Overview");
  const [openMenu, setOpenMenu] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [realCourse, setRealCourse] = useState(null);
  const [modulesList, setModulesList] = useState([]);
  const [unitsList, setUnitsList] = useState([]);
  const [unitTopicsMap, setUnitTopicsMap] = useState({});
  const [topicMaterialsMap, setTopicMaterialsMap] = useState({});

  // Modals state
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [editCourseData, setEditCourseData] = useState({ title: "", description: "", category: "", level: "BEGINNER" });

  const [showUnitModal, setShowUnitModal] = useState(false);
  const [unitModalMode, setUnitModalMode] = useState("create"); // "create" | "edit"
  const [activeUnitData, setActiveUnitData] = useState({ id: null, unitNumber: 1, title: "", description: "" });

  const [showTopicModal, setShowTopicModal] = useState(false);
  const [topicModalMode, setTopicModalMode] = useState("create"); // "create" | "edit"
  const [activeTopicData, setActiveTopicData] = useState({ id: null, unitId: null, topicNumber: 1, title: "", description: "" });

  // PDF Upload Modal state
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUploadTopicId, setPdfUploadTopicId] = useState(null);
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const fetchTopicMaterialsForTopic = async (topicId) => {
    try {
      const materials = await getTopicMaterials(topicId, "TRAINER");
      setTopicMaterialsMap((prev) => ({ ...prev, [topicId]: materials }));
    } catch (err) {
      console.error(`Error fetching materials for topic ${topicId}:`, err);
    }
  };

  const fetchCourseContent = () => {
    // 1. Fetch course details
    getCourseById(targetCourseId, "TRAINER")
      .then((cData) => {
        if (cData) {
          setRealCourse(cData);
          setEditCourseData({
            title: cData.title || "",
            description: cData.description || "",
            category: cData.category || "",
            level: cData.level || "BEGINNER"
          });
        }
      })
      .catch((err) => console.error("Error fetching course details:", err));

    // 2. Fetch modules for course
    getModulesByCourse(targetCourseId, "TRAINER")
      .then((mList) => {
        if (Array.isArray(mList)) {
          setModulesList(mList);
        }
      })
      .catch((err) => console.error("Error fetching modules:", err));

    // 3. Fetch units for course
    getUnitsByCourse(targetCourseId, "TRAINER")
      .then(async (uList) => {
        if (Array.isArray(uList)) {
          setUnitsList(uList);

          // 4. Fetch topics for each unit & materials for each topic
          const topicsMap = {};
          for (const u of uList) {
            try {
              const topics = await getTopicsByUnit(u.id, "TRAINER");
              topicsMap[u.id] = topics;

              for (const tp of topics) {
                fetchTopicMaterialsForTopic(tp.id);
              }
            } catch (err) {
              console.error(`Error fetching topics for unit ${u.id}:`, err);
              topicsMap[u.id] = [];
            }
          }
          setUnitTopicsMap(topicsMap);
        }
      })
      .catch((err) => console.error("Error fetching units:", err));
  };

  useEffect(() => {
    fetchCourseContent();
  }, [targetCourseId]);

  // Course CRUD actions
  const handleEditCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(targetCourseId, editCourseData, "TRAINER");
      setShowEditCourseModal(false);
      fetchCourseContent();
    } catch (err) {
      console.error("Failed to update course:", err);
      alert(err.message || "Failed to update course");
    }
  };

  const handleDeleteCourseAction = async () => {
    if (window.confirm(`Are you sure you want to delete course: "${realCourse?.title || 'this course'}"?`)) {
      try {
        await deleteCourse(targetCourseId, "TRAINER");
        alert("Course deleted successfully");
        navigate("/trainer/trainer-courses");
      } catch (err) {
        console.error("Failed to delete course:", err);
        alert(err.message || "Failed to delete course");
      }
    }
  };

  // Unit CRUD actions
  const openCreateUnitModal = () => {
    setUnitModalMode("create");
    setActiveUnitData({
      id: null,
      unitNumber: unitsList.length + 1,
      title: "",
      description: ""
    });
    setShowUnitModal(true);
  };

  const openEditUnitModal = (u) => {
    setUnitModalMode("edit");
    setActiveUnitData({
      id: u.id,
      unitNumber: u.unit_number || 1,
      title: u.title || "",
      description: u.description || ""
    });
    setShowUnitModal(true);
  };

  const handleUnitSubmit = async (e) => {
    e.preventDefault();
    try {
      if (unitModalMode === "create") {
        await createUnit({
          courseId: targetCourseId,
          unitNumber: Number(activeUnitData.unitNumber),
          title: activeUnitData.title,
          description: activeUnitData.description
        }, "TRAINER");
      } else {
        await updateUnit(activeUnitData.id, {
          unitNumber: Number(activeUnitData.unitNumber),
          title: activeUnitData.title,
          description: activeUnitData.description
        }, "TRAINER");
      }
      setShowUnitModal(false);
      fetchCourseContent();
    } catch (err) {
      console.error("Failed unit action:", err);
      alert(err.message || "Failed to save unit");
    }
  };

  const handleDeleteUnitAction = async (unitId) => {
    if (window.confirm("Are you sure you want to delete this unit and its topics?")) {
      try {
        await deleteUnit(unitId, "TRAINER");
        fetchCourseContent();
      } catch (err) {
        console.error("Failed to delete unit:", err);
        alert(err.message || "Failed to delete unit");
      }
    }
  };

  // Topic CRUD actions
  const openCreateTopicModal = (unitId) => {
    const existingTopics = unitTopicsMap[unitId] || [];
    setTopicModalMode("create");
    setActiveTopicData({
      id: null,
      unitId,
      topicNumber: existingTopics.length + 1,
      title: "",
      description: ""
    });
    setShowTopicModal(true);
  };

  const openEditTopicModal = (tp) => {
    setTopicModalMode("edit");
    setActiveTopicData({
      id: tp.id,
      unitId: tp.unit_id,
      topicNumber: tp.topic_number || 1,
      title: tp.title || "",
      description: tp.description || ""
    });
    setShowTopicModal(true);
  };

  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    try {
      if (topicModalMode === "create") {
        await createTopic({
          unitId: activeTopicData.unitId,
          topicNumber: Number(activeTopicData.topicNumber),
          title: activeTopicData.title,
          description: activeTopicData.description
        }, "TRAINER");
      } else {
        await updateTopic(activeTopicData.id, {
          topicNumber: Number(activeTopicData.topicNumber),
          title: activeTopicData.title,
          description: activeTopicData.description
        }, "TRAINER");
      }
      setShowTopicModal(false);
      fetchCourseContent();
    } catch (err) {
      console.error("Failed topic action:", err);
      alert(err.message || "Failed to save topic");
    }
  };

  const handleDeleteTopicAction = async (topicId) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      try {
        await deleteTopic(topicId, "TRAINER");
        fetchCourseContent();
      } catch (err) {
        console.error("Failed to delete topic:", err);
        alert(err.message || "Failed to delete topic");
      }
    }
  };

  // PDF Upload actions
  const openUploadPdfModal = (topicId) => {
    setPdfUploadTopicId(topicId);
    setPdfTitle("");
    setPdfFile(null);
    setShowPdfModal(true);
  };

  const handlePdfUploadSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("Please select a PDF file");
      return;
    }
    if (pdfFile.size > 10 * 1024 * 1024) {
      alert("File size exceeds maximum limit of 10MB");
      return;
    }
    if (!pdfFile.name.toLowerCase().endsWith(".pdf")) {
      alert("Only PDF files are allowed");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("pdf", pdfFile);
      if (pdfTitle.trim()) {
        formData.append("title", pdfTitle.trim());
      }

      await uploadTopicMaterial(pdfUploadTopicId, formData, "TRAINER");
      setShowPdfModal(false);
      fetchTopicMaterialsForTopic(pdfUploadTopicId);
    } catch (err) {
      console.error("Failed to upload PDF:", err);
      alert(err.message || "Failed to upload PDF material");
    }
  };

  const handleDeleteMaterialAction = async (topicId, materialId) => {
    if (window.confirm("Are you sure you want to delete this PDF material?")) {
      try {
        await deleteTopicMaterial(materialId, "TRAINER");
        fetchTopicMaterialsForTopic(topicId);
      } catch (err) {
        console.error("Failed to delete material:", err);
        alert(err.message || "Failed to delete material");
      }
    }
  };

  const handleOpenPdfUrl = (fileUrl) => {
    const fullUrl = fileUrl.startsWith("http")
      ? fileUrl
      : `http://localhost:5000${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
    window.open(fullUrl, "_blank");
  };

  const course = {
    id: realCourse?.id || targetCourseId,
    title: realCourse?.title || "Loading Course Details...",
    category: realCourse?.category || "Meteorology & Atmospheric Sciences",
    level: realCourse?.level || "Intermediate",
    status: realCourse?.is_published !== false ? "Published" : "Draft",
    description:
      realCourse?.description ||
      "Comprehensive training module provided by Ministry of Earth Sciences (MoES) and IMD.",
    image:
      realCourse?.image ||
      "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?auto=format&fit=crop&w=1200&q=90",
    duration: realCourse?.duration || "12h 30m",
    lessons: modulesList.length * 5 || 28,
    modules: modulesList.length || 6,
    units: unitsList.length || 0,
    learners: realCourse?.enrolled_count ? String(realCourse.enrolled_count) : "1,240",
    progress: realCourse?.progress ?? 86,
    rating: "4.8",
    reviews: 320,
  };

  const navigationItems = [
    { label: "Overview", icon: LuHouse },
    { label: "Course Content", icon: LuList },
    { label: "Analytics", icon: LuChartNoAxesColumn },
    { label: "Student Feedback", icon: LuMessageSquare },
    { label: "Certificates", icon: LuAward },
    { label: "Settings", icon: LuSettings },
  ];

  const learningPoints = [
    "Understand operational weather forecasting techniques",
    "Analyze observational data and radar products",
    "Work with satellite imagery and numerical weather models",
    "Formulate early warning alerts and disaster bulletins",
    "Apply climatological statistical tools in regional studies",
    "Operate Doppler Weather Radar (DWR) data interfaces",
  ];

  const requirements = [
    "Basic understanding of physics and mathematics at graduate level",
    "Familiarity with meteorological observation standards",
    "No prior advanced radar experience required",
  ];

  const feedback = [
    {
      name: "Sarah Johnson",
      initials: "SJ",
      rating: 5,
      time: "2 days ago",
      text: "This course is amazing! The explanations are clear and the projects really helped me understand meteorological principles.",
    },
    {
      name: "Michael Chen",
      initials: "MC",
      rating: 5,
      time: "1 week ago",
      text: "Great course for trainees. The instructor explains complex forecasting algorithms clearly.",
    },
  ];

  const handleBack = () => {
    window.history.back();
  };

  const handleEdit = () => {
    setShowEditCourseModal(true);
  };

  const handlePreview = () => {
    window.alert("Course preview mode active.");
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        window.alert("Course link copied to clipboard.");
      }
    } catch {}
  };

  const handleQuickAction = (action) => {
    if (action === "Delete Course") {
      handleDeleteCourseAction();
    } else {
      window.alert(`${action} performed.`);
    }
  };

  return (
    <div className="course-details-page">
      {/* TOP BAR */}
      <header className="course-details-topbar">
        <button type="button" className="course-back-button" onClick={handleBack}>
          <LuArrowLeft size={15} strokeWidth={1.8} />
          <span>Back to Courses</span>
        </button>

        <div className="course-details-actions">
          <button type="button" className="course-top-action" onClick={handleEdit}>
            <LuPencil size={14} strokeWidth={1.8} />
            <span>Edit Course</span>
          </button>

          <button type="button" className="course-top-action" onClick={handlePreview}>
            <LuEye size={15} strokeWidth={1.8} />
            <span>Preview</span>
          </button>

          <div className="course-more-wrapper">
            <button
              type="button"
              className={`course-more-button ${openMenu ? "active" : ""}`}
              onClick={() => setOpenMenu((v) => !v)}
            >
              <LuEllipsis size={17} strokeWidth={1.9} />
            </button>

            {openMenu && (
              <div className="course-more-menu">
                <button type="button" onClick={() => handleQuickAction("Duplicate Course")}>
                  <LuCopy size={14} strokeWidth={1.8} />
                  <span>Duplicate Course</span>
                </button>
                <button type="button" onClick={() => handleQuickAction("Archive Course")}>
                  <LuArchive size={14} strokeWidth={1.8} />
                  <span>Archive Course</span>
                </button>
                <button type="button" className="danger" onClick={handleDeleteCourseAction}>
                  <LuTrash2 size={14} strokeWidth={1.8} />
                  <span>Delete Course</span>
                </button>
              </div>
            )}
          </div>

          <button type="button" className="course-share-button" onClick={handleShare}>
            <LuShare2 size={14} strokeWidth={1.8} />
            <span>Share Course</span>
            <LuChevronDown size={13} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="course-details-hero">
        <div className="course-hero-image-card">
          <img src={course.image} alt={course.title} className="course-hero-image" />
          <div className="course-hero-image-overlay" />
          <span className="course-hero-status"><span />{course.status}</span>
          <button type="button" className="course-watch-button" onClick={handlePreview}>
            <span className="course-watch-icon"><LuPlay size={13} fill="currentColor" /></span>
            <span>Watch Intro</span>
          </button>
          <span className="course-hero-duration"><LuClock3 size={12} strokeWidth={1.8} />{course.duration}</span>
        </div>

        <div className="course-hero-information">
          <div className="course-category-pill">{course.category}</div>
          <h1>{course.title}</h1>
          <p className="course-hero-short-description">{course.description}</p>
          <p className="course-hero-long-description">
            {realCourse?.description || "Official technical curriculum designed for disaster management, forecasting, and meteorological observation personnel."}
          </p>

          <div className="course-hero-tags">
            <span className="tag-green">{course.level}</span>
            <span className="tag-blue">{course.category}</span>
            <span className="tag-peach">MOES / IMD</span>
            <span className="tag-purple">Capacity Building</span>
          </div>
        </div>

        <div className="course-learners-panel">
          <div className="course-learners-heading">
            <div className="course-learners-icon"><LuUsersRound size={21} strokeWidth={1.7} /></div>
            <div><strong>{course.learners}</strong><span>Total Learners</span></div>
            <span className="course-growth-badge"><LuTrendingUp size={11} />12%</span>
          </div>
          <div className="course-mini-chart">
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <div className="course-student-stack">
            <span>SJ</span><span>MC</span><span>AK</span><span>RP</span><span>+</span>
          </div>
          <p>Students enrolled in this course</p>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="course-stat-grid">
        <div className="course-stat-card progress-card">
          <div className="course-stat-icon"><LuPlay size={18} strokeWidth={1.7} /></div>
          <div className="course-stat-content"><strong>{course.progress}%</strong><span>Course Progress</span></div>
          <div className="course-progress-track"><span style={{ width: `${course.progress}%` }} /></div>
        </div>

        <div className="course-stat-card duration-card">
          <div className="course-stat-icon"><LuClock3 size={18} strokeWidth={1.7} /></div>
          <div className="course-stat-content"><strong>{course.duration}</strong><span>Total Duration</span></div>
        </div>

        <div className="course-stat-card lessons-card">
          <div className="course-stat-icon"><LuFileText size={18} strokeWidth={1.7} /></div>
          <div className="course-stat-content"><strong>{unitsList.length || course.modules}</strong><span>Units / Modules</span></div>
        </div>

        <div className="course-stat-card modules-card">
          <div className="course-stat-icon"><LuLayers3 size={18} strokeWidth={1.7} /></div>
          <div className="course-stat-content"><strong>{modulesList.length}</strong><span>Modules</span></div>
        </div>

        <div className="course-stat-card rating-card">
          <div className="course-stat-icon"><LuStar size={18} strokeWidth={1.7} /></div>
          <div className="course-stat-content">
            <strong>{course.rating}</strong>
            <span>Course Rating</span>
            <small>Based on {course.reviews} reviews</small>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="course-details-main">
        {/* SIDEBAR */}
        <aside className="course-details-sidebar">
          <nav className="course-section-navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.label;
              return (
                <button
                  type="button"
                  key={item.label}
                  className={`course-section-nav-item ${active ? "active" : ""}`}
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
            <button type="button" className="quick-action-primary" onClick={handleEdit}>
              <LuPencil size={15} strokeWidth={1.8} />
              <span>Edit Course</span>
            </button>
            <button type="button" onClick={() => handleQuickAction("Duplicate Course")}>
              <LuCopy size={15} strokeWidth={1.8} />
              <span>Duplicate Course</span>
            </button>
            <button type="button" onClick={() => handleQuickAction("Archive Course")}>
              <LuArchive size={15} strokeWidth={1.8} />
              <span>Archive Course</span>
            </button>
            <button type="button" className="quick-action-danger" onClick={handleDeleteCourseAction}>
              <LuTrash2 size={15} strokeWidth={1.8} />
              <span>Delete Course</span>
            </button>
          </div>
        </aside>

        {/* CENTER COLUMN */}
        <main className="course-details-center">
          {activeSection === "Course Content" ? (
            <article className="course-information-card">
              <div className="course-section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="section-heading-icon blue">
                    <LuLayers3 size={17} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h2>Course Content Structure</h2>
                    <span>Manage Modules, Units, Topics, and PDF Materials</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openCreateUnitModal}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 0.9rem",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  <LuPlus size={15} />
                  <span>Add Unit</span>
                </button>
              </div>

              {/* Modules List */}
              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#1e293b" }}>
                  Modules ({modulesList.length})
                </h3>
                {modulesList.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {modulesList.map((m) => (
                      <div
                        key={m.id}
                        style={{
                          padding: "0.85rem 1.1rem",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "#f8fafc",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <strong style={{ fontSize: "0.95rem", color: "#0f172a" }}>
                            Module {m.module_number || m.order_index}: {m.title}
                          </strong>
                        </div>
                        {m.description && (
                          <p style={{ margin: "0.4rem 0 0 0", fontSize: "0.85rem", color: "#64748b" }}>
                            {m.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No modules configured for this course.</p>
                )}
              </div>

              {/* Units & Topics List */}
              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#1e293b" }}>
                  Units & Topics ({unitsList.length} Units)
                </h3>
                {unitsList.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {unitsList.map((u) => {
                      const topics = unitTopicsMap[u.id] || [];
                      return (
                        <div
                          key={u.id}
                          style={{
                            padding: "1rem 1.2rem",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1e293b" }}>
                                Unit {u.unit_number}: {u.title}
                              </h4>
                              {u.description && (
                                <p style={{ margin: "0.3rem 0 0.75rem 0", fontSize: "0.85rem", color: "#475569" }}>
                                  {u.description}
                                </p>
                              )}
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                type="button"
                                onClick={() => openEditUnitModal(u)}
                                style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", fontSize: "0.8rem" }}
                              >
                                Edit Unit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUnitAction(u.id)}
                                style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: "1px solid #fca5a5", backgroundColor: "#fef2f2", color: "#dc2626", cursor: "pointer", fontSize: "0.8rem" }}
                              >
                                Delete Unit
                              </button>
                            </div>
                          </div>

                          {/* Topics Section */}
                          <div style={{ marginLeft: "0.5rem", borderLeft: "2px solid #e2e8f0", paddingLeft: "1rem", marginTop: "0.75rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                              <strong style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#64748b" }}>
                                Topics ({topics.length})
                              </strong>
                              <button
                                type="button"
                                onClick={() => openCreateTopicModal(u.id)}
                                style={{
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "4px",
                                  backgroundColor: "#eff6ff",
                                  color: "#2563eb",
                                  border: "1px solid #bfdbfe",
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  cursor: "pointer"
                                }}
                              >
                                + Add Topic
                              </button>
                            </div>

                            {topics.length > 0 ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {topics.map((tp) => {
                                  const materials = topicMaterialsMap[tp.id] || [];
                                  return (
                                    <div
                                      key={tp.id}
                                      style={{
                                        padding: "0.75rem 0.9rem",
                                        borderRadius: "8px",
                                        backgroundColor: "#f8fafc",
                                        border: "1px solid #e2e8f0",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem"
                                      }}
                                    >
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                                          <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "#334155" }}>
                                            Topic {tp.topic_number}: {tp.title}
                                          </span>
                                          {tp.description && (
                                            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{tp.description}</span>
                                          )}
                                        </div>
                                        <div style={{ display: "flex", gap: "0.4rem" }}>
                                          <button
                                            type="button"
                                            onClick={() => openUploadPdfModal(tp.id)}
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "0.3rem",
                                              padding: "0.25rem 0.55rem",
                                              borderRadius: "4px",
                                              border: "1px solid #93c5fd",
                                              backgroundColor: "#eff6ff",
                                              color: "#1d4ed8",
                                              fontSize: "0.75rem",
                                              fontWeight: 600,
                                              cursor: "pointer"
                                            }}
                                          >
                                            <LuUpload size={12} />
                                            <span>Upload PDF</span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => openEditTopicModal(tp)}
                                            style={{ padding: "0.25rem 0.45rem", borderRadius: "4px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontSize: "0.75rem", cursor: "pointer" }}
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteTopicAction(tp.id)}
                                            style={{ padding: "0.25rem 0.45rem", borderRadius: "4px", border: "1px solid #fca5a5", backgroundColor: "#ffffff", color: "#dc2626", fontSize: "0.75rem", cursor: "pointer" }}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>

                                      {/* PDF Materials list under Topic */}
                                      {materials.length > 0 && (
                                        <div style={{ marginTop: "0.3rem", display: "flex", flexDirection: "column", gap: "0.35rem", paddingLeft: "0.5rem", borderLeft: "2px solid #cbd5e1" }}>
                                          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                                            Learning Materials ({materials.length})
                                          </span>
                                          {materials.map((mat) => (
                                            <div
                                              key={mat.id}
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "0.35rem 0.6rem",
                                                borderRadius: "4px",
                                                backgroundColor: "#ffffff",
                                                border: "1px solid #e2e8f0"
                                              }}
                                            >
                                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                <LuFile size={13} color="#2563eb" />
                                                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1e293b" }}>
                                                  {mat.title}
                                                </span>
                                              </div>
                                              <div style={{ display: "flex", gap: "0.4rem" }}>
                                                <button
                                                  type="button"
                                                  onClick={() => handleOpenPdfUrl(mat.file_url)}
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "0.2rem",
                                                    padding: "0.2rem 0.45rem",
                                                    borderRadius: "4px",
                                                    border: "1px solid #cbd5e1",
                                                    backgroundColor: "#f8fafc",
                                                    color: "#2563eb",
                                                    fontSize: "0.75rem",
                                                    cursor: "pointer"
                                                  }}
                                                >
                                                  <span>Open PDF</span>
                                                  <LuExternalLink size={11} />
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() => handleDeleteMaterialAction(tp.id, mat.id)}
                                                  style={{
                                                    padding: "0.2rem 0.45rem",
                                                    borderRadius: "4px",
                                                    border: "1px solid #fca5a5",
                                                    backgroundColor: "#fef2f2",
                                                    color: "#dc2626",
                                                    fontSize: "0.75rem",
                                                    cursor: "pointer"
                                                  }}
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p style={{ margin: "0.4rem 0 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
                                No topics added under this unit yet.
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No units created for this course yet.</p>
                )}
              </div>
            </article>
          ) : (
            <article className="course-information-card">
              <div className="course-section-heading">
                <div className="section-heading-icon blue"><LuFileText size={17} strokeWidth={1.7} /></div>
                <div><h2>About This Course</h2><span>Course overview and learning information</span></div>
                <button type="button" className="small-edit-button" onClick={handleEdit}>
                  <LuPencil size={13} strokeWidth={1.8} /><span>Edit</span>
                </button>
              </div>

              <p className="course-about-text">{course.description}</p>

              <div className="learning-box">
                <div className="learning-heading">
                  <div><LuCircleHelp size={18} strokeWidth={1.7} /></div>
                  <h3>What You'll Learn</h3>
                </div>
                <div className="learning-grid">
                  {learningPoints.map((p) => (
                    <div className="learning-point" key={p}>
                      <LuCheck size={13} strokeWidth={2.2} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="requirements-section">
                <div className="requirements-heading"><LuBookOpen size={18} strokeWidth={1.7} /><h3>Requirements</h3></div>
                <ul>{requirements.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
            </article>
          )}

          {/* FEEDBACK */}
          <article className="course-feedback-card">
            <div className="course-section-heading">
              <div className="section-heading-icon cyan"><LuMessageSquare size={17} strokeWidth={1.7} /></div>
              <div><h2>Recent Student Feedback</h2><span>Latest reviews from your learners</span></div>
              <button type="button" className="view-all-button" onClick={() => setActiveSection("Student Feedback")}>
                View All <LuArrowUpRight size={13} strokeWidth={1.8} />
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
                        {Array.from({ length: item.rating }).map((_, index) => (
                          <LuStar key={index} size={11} fill="currentColor" strokeWidth={1.7} />
                        ))}
                      </div>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </main>
      </section>

      {/* EDIT COURSE MODAL */}
      {showEditCourseModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "520px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem", color: "#0f172a" }}>Edit Course</h2>
            <form onSubmit={handleEditCourseSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Title</label>
                <input type="text" required value={editCourseData.title} onChange={(e) => setEditCourseData({ ...editCourseData, title: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Category</label>
                <input type="text" required value={editCourseData.category} onChange={(e) => setEditCourseData({ ...editCourseData, category: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Difficulty Level</label>
                <select value={editCourseData.level} onChange={(e) => setEditCourseData({ ...editCourseData, level: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}>
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Description</label>
                <textarea rows={3} value={editCourseData.description} onChange={(e) => setEditCourseData({ ...editCourseData, description: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowEditCourseModal(false)} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", cursor: "pointer", fontWeight: 600 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UNIT MODAL */}
      {showUnitModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "480px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", color: "#0f172a" }}>{unitModalMode === "create" ? "Add Unit" : "Edit Unit"}</h2>
            <form onSubmit={handleUnitSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Unit Number</label>
                <input type="number" required min={1} value={activeUnitData.unitNumber} onChange={(e) => setActiveUnitData({ ...activeUnitData, unitNumber: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Unit Title</label>
                <input type="text" required value={activeUnitData.title} onChange={(e) => setActiveUnitData({ ...activeUnitData, title: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} placeholder="e.g. Observational Data Digitization" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Description</label>
                <textarea rows={2} value={activeUnitData.description} onChange={(e) => setActiveUnitData({ ...activeUnitData, description: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowUnitModal(false)} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", cursor: "pointer", fontWeight: 600 }}>{unitModalMode === "create" ? "Add Unit" : "Save Unit"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOPIC MODAL */}
      {showTopicModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "480px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", color: "#0f172a" }}>{topicModalMode === "create" ? "Add Topic" : "Edit Topic"}</h2>
            <form onSubmit={handleTopicSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Topic Number</label>
                <input type="number" required min={1} value={activeTopicData.topicNumber} onChange={(e) => setActiveTopicData({ ...activeTopicData, topicNumber: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Topic Title</label>
                <input type="text" required value={activeTopicData.title} onChange={(e) => setActiveTopicData({ ...activeTopicData, title: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} placeholder="e.g. Siting Standards & Calibration" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Description</label>
                <textarea rows={2} value={activeTopicData.description} onChange={(e) => setActiveTopicData({ ...activeTopicData, description: e.target.value })} style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowTopicModal(false)} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", cursor: "pointer", fontWeight: 600 }}>{topicModalMode === "create" ? "Add Topic" : "Save Topic"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD PDF MODAL */}
      {showPdfModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "480px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", color: "#0f172a" }}>Upload PDF Material</h2>
            <form onSubmit={handlePdfUploadSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>Material Title (Optional)</label>
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.9rem" }}
                  placeholder="e.g. Siting Guidelines Handbook PDF"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "0.3rem" }}>PDF File (Max 10MB)</label>
                <input
                  type="file"
                  required
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0] || null)}
                  style={{ width: "100%", padding: "0.4rem 0.6rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button type="button" onClick={() => setShowPdfModal(false)} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", cursor: "pointer", fontWeight: 600 }}>Upload PDF</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
