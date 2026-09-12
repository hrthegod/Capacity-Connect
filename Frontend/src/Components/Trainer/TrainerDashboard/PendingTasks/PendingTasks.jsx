import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  LuClipboardList,
  LuCalendarDays,
  LuChevronDown,
  LuEllipsis,
  LuFileText,
  LuMessageSquare,
  LuUsersRound,
  LuClock3,
  LuCircleCheck,
  LuCircleAlert,
  LuPlus,
  LuArrowRight,
  LuTarget,
  LuX,
  LuCheck,
  LuTrash2,
} from "react-icons/lu";

import "./PendingTasks.css";

// =====================================================
// INITIAL TASK DATA
// =====================================================

const initialTasks = [
  {
    id: 1,
    title: "Review Assignment Submissions",
    course: "UI/UX Design Fundamentals",
    date: "Mar 8, 2025",
    status: "overdue",
    icon: LuFileText,
  },
  {
    id: 2,
    title: "Provide Feedback",
    course: "Database Design",
    date: "Mar 10, 2025",
    status: "due-soon",
    icon: LuMessageSquare,
  },
  {
    id: 3,
    title: "Prepare Next Session",
    course: "Advanced JavaScript",
    date: "Mar 12, 2025",
    status: "later",
    icon: LuUsersRound,
  },
  {
    id: 4,
    title: "Update Course Materials",
    course: "React Development",
    date: "Mar 11, 2025",
    status: "due-soon",
    icon: LuFileText,
  },
  {
    id: 5,
    title: "Grade Quiz Attempts",
    course: "Project Management",
    date: "Mar 7, 2025",
    status: "overdue",
    icon: LuClipboardList,
  },
  {
    id: 6,
    title: "Review Attendance Records",
    course: "Frontend Development",
    date: "Mar 14, 2025",
    status: "later",
    icon: LuCalendarDays,
  },
];

// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig = {
  overdue: {
    label: "Overdue",
    icon: LuCircleAlert,
  },

  "due-soon": {
    label: "Due Soon",
    icon: LuClock3,
  },

  later: {
    label: "Later",
    icon: LuClock3,
  },
};

// =====================================================
// PENDING TASKS
// =====================================================

const PendingTasks = () => {
  // ===================================================
  // TASK STATE
  // ===================================================

  const [tasks, setTasks] = useState(initialTasks);

  const [showAll, setShowAll] = useState(false);

  // ===================================================
  // FILTER STATE
  // ===================================================

  const [selectedFilter, setSelectedFilter] = useState("This Week");

  const [showFilter, setShowFilter] = useState(false);

  // ===================================================
  // TASK MENU STATE
  // ===================================================

  const [openTaskMenu, setOpenTaskMenu] = useState(null);

  // ===================================================
  // ORGANIZATION TIP
  // ===================================================

  const [showOrganizationTip, setShowOrganizationTip] = useState(false);

  // ===================================================
  // PERIOD DROPDOWN REF
  // ===================================================

  const periodRef = useRef(null);

  // ===================================================
  // CLOSE PERIOD DROPDOWN ON OUTSIDE CLICK
  // ===================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (periodRef.current && !periodRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // ===================================================
  // CLOSE MENUS WITH ESCAPE
  // ===================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowFilter(false);
        setOpenTaskMenu(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ===================================================
  // TASK COUNTS
  // ===================================================

  const taskCounts = useMemo(() => {
    return {
      overdue: tasks.filter((task) => task.status === "overdue").length,

      dueSoon: tasks.filter((task) => task.status === "due-soon").length,

      later: tasks.filter((task) => task.status === "later").length,

      completed: 8,
    };
  }, [tasks]);

  // ===================================================
  // DISPLAY TASKS
  // ===================================================

  const visibleTasks = showAll ? tasks : tasks.slice(0, 5);

  // ===================================================
  // MARK TASK COMPLETE
  // ===================================================

  const handleCompleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );

    setOpenTaskMenu(null);
  };

  // ===================================================
  // REMOVE TASK
  // ===================================================

  const handleRemoveTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );

    setOpenTaskMenu(null);
  };

  // ===================================================
  // CREATE TASK
  // ===================================================

  const handleCreateTask = () => {
    const newTask = {
      id: Date.now(),
      title: "Plan Upcoming Training Session",
      course: "Capacity Connect",
      date: "Mar 16, 2025",
      status: "later",
      icon: LuClipboardList,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    setShowAll(true);
  };

  // ===================================================
  // FILTER CHANGE
  // ===================================================

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    setShowFilter(false);
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="trainer-pending-tasks">
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div className="pending-tasks-header">
        <div className="pending-tasks-heading">
          <div className="pending-tasks-title-icon">
            <LuClipboardList />
          </div>

          <div className="pending-tasks-heading-text">
            <h2>Pending Tasks</h2>

            <p>Tasks that need your attention</p>
          </div>
        </div>

        {/* ===============================================
            WEEK FILTER
        =============================================== */}

        <div className="period-dropdown-wrapper" ref={periodRef}>
          <button
            type="button"
            className={`pending-filter-button ${
              showFilter ? "filter-active" : ""
            }`}
            onClick={() => setShowFilter((previous) => !previous)}
            aria-expanded={showFilter}
            aria-haspopup="menu"
          >
            <LuCalendarDays />

            <span>{selectedFilter}</span>

            <LuChevronDown className={showFilter ? "filter-arrow-up" : ""} />
          </button>

          {/* =============================================
              FILTER MENU
          ============================================= */}

          {showFilter && (
            <div className="pending-filter-menu" role="menu">
              {["This Week", "Next Week", "All Tasks"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={selectedFilter === filter ? "selected-filter" : ""}
                  onClick={() => handleFilterChange(filter)}
                  role="menuitem"
                >
                  <span>{filter}</span>

                  {selectedFilter === filter && <LuCheck />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =================================================
          MAIN CONTENT GRID
      ================================================= */}

      <div className="pending-tasks-grid">
        {/* =================================================
            TASK OVERVIEW
        ================================================= */}

        <article className="pending-task-overview">
          <div className="pending-overview-top">
            <h3>Task Overview</h3>

            <button
              type="button"
              className="pending-overview-menu"
              aria-label="Task overview options"
              onClick={() => setShowOrganizationTip((previous) => !previous)}
            >
              <LuEllipsis />
            </button>
          </div>

          {/* =============================================
              CIRCLE
          ============================================= */}

          <div className="pending-overview-circle">
            <div className="pending-circle-inner">
              <strong>{tasks.length}</strong>

              <span>Pending</span>
            </div>
          </div>

          {/* =============================================
              STATUS SUMMARY
          ============================================= */}

          <div className="pending-status-summary">
            <div className="pending-summary-item">
              <span className="summary-dot summary-dot-red"></span>

              <strong>{taskCounts.overdue}</strong>

              <span>Overdue</span>
            </div>

            <div className="pending-summary-item">
              <span className="summary-dot summary-dot-orange"></span>

              <strong>{taskCounts.dueSoon}</strong>

              <span>Due Soon</span>
            </div>

            <div className="pending-summary-item">
              <span className="summary-dot summary-dot-blue"></span>

              <strong>{taskCounts.later}</strong>

              <span>Later</span>
            </div>
          </div>

          {/* =============================================
              DIVIDER
          ============================================= */}

          <div className="pending-overview-divider"></div>

          {/* =============================================
              MESSAGE
          ============================================= */}

          <div className="pending-overview-message">
            <span className="pending-message-icon">✦</span>

            <p>Small steps today lead to big progress.</p>
          </div>

          {/* =============================================
              ORGANIZATION TIP
          ============================================= */}

          {showOrganizationTip && (
            <button
              type="button"
              className="pending-overview-tip"
              onClick={() => setShowOrganizationTip(false)}
            >
              <LuX />

              <span>Stay focused on the most urgent tasks first.</span>
            </button>
          )}
        </article>

        {/* =================================================
            TASK LIST
        ================================================= */}

        <article className="pending-task-list-card">
          <div className="pending-task-list-header">
            <div>
              <h3>Pending Tasks</h3>

              <p>Work that still needs to be completed</p>
            </div>

            <button
              type="button"
              className="pending-view-all-button"
              onClick={() => setShowAll((previous) => !previous)}
            >
              <span>{showAll ? "Show Less" : "View All"}</span>

              <LuArrowRight
                className={showAll ? "view-all-arrow-active" : ""}
              />
            </button>
          </div>

          {/* =============================================
              TASK LIST
          ============================================= */}

          <div className="pending-task-list">
            {visibleTasks.length === 0 ? (
              <div className="pending-empty-state">
                <div className="pending-empty-icon">
                  <LuCircleCheck />
                </div>

                <strong>All tasks completed</strong>

                <span>Great work! You have nothing pending.</span>
              </div>
            ) : (
              visibleTasks.map((task) => {
                const TaskIcon = task.icon;

                const StatusIcon = statusConfig[task.status].icon;

                return (
                  <div className="pending-task-row" key={task.id}>
                    {/* ===================================
                        TASK ICON
                    =================================== */}

                    <div
                      className={`pending-task-icon pending-task-icon-${task.status}`}
                    >
                      <TaskIcon />
                    </div>

                    {/* ===================================
                        TASK CONTENT
                    =================================== */}

                    <div className="pending-task-content">
                      <strong>{task.title}</strong>

                      <span>{task.course}</span>
                    </div>

                    {/* ===================================
                        STATUS
                    =================================== */}

                    <div
                      className={`pending-task-status pending-status-${task.status}`}
                    >
                      <StatusIcon />

                      <span>{statusConfig[task.status].label}</span>
                    </div>

                    {/* ===================================
                        DATE
                    =================================== */}

                    <span className="pending-task-date">{task.date}</span>

                    {/* ===================================
                        ACTION MENU
                    =================================== */}

                    <div className="pending-task-actions">
                      <button
                        type="button"
                        className="pending-task-menu-button"
                        aria-label={`Actions for ${task.title}`}
                        aria-expanded={openTaskMenu === task.id}
                        onClick={() =>
                          setOpenTaskMenu(
                            openTaskMenu === task.id ? null : task.id,
                          )
                        }
                      >
                        <LuEllipsis />
                      </button>

                      {openTaskMenu === task.id && (
                        <div className="pending-task-menu" role="menu">
                          <button
                            type="button"
                            onClick={() => handleCompleteTask(task.id)}
                            role="menuitem"
                          >
                            <LuCircleCheck />

                            <span>Mark Complete</span>
                          </button>

                          <button
                            type="button"
                            className="task-delete-action"
                            onClick={() => handleRemoveTask(task.id)}
                            role="menuitem"
                          >
                            <LuTrash2 />

                            <span>Remove Task</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </article>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <aside className="pending-task-sidebar">
          {/* ===============================================
              QUICK STATS
          =============================================== */}

          <div className="pending-quick-stats">
            <h3>Quick Stats</h3>

            <div className="pending-quick-grid">
              <div className="pending-quick-card pending-quick-red">
                <div className="quick-card-icon">
                  <LuCircleAlert />
                </div>

                <div>
                  <strong>{taskCounts.overdue}</strong>

                  <span>Overdue</span>
                </div>
              </div>

              <div className="pending-quick-card pending-quick-orange">
                <div className="quick-card-icon">
                  <LuClock3 />
                </div>

                <div>
                  <strong>{taskCounts.dueSoon}</strong>

                  <span>Due Soon</span>
                </div>
              </div>

              <div className="pending-quick-card pending-quick-blue">
                <div className="quick-card-icon">
                  <LuClock3 />
                </div>

                <div>
                  <strong>{taskCounts.later}</strong>

                  <span>Later</span>
                </div>
              </div>

              <div className="pending-quick-card pending-quick-green">
                <div className="quick-card-icon">
                  <LuCircleCheck />
                </div>

                <div>
                  <strong>{taskCounts.completed}</strong>

                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===============================================
              CREATE TASK
          =============================================== */}

          <button
            type="button"
            className="pending-action-card pending-create-card"
            onClick={handleCreateTask}
          >
            <div className="pending-action-icon pending-create-icon">
              <LuPlus />
            </div>

            <div className="pending-action-content">
              <strong>Create a New Task</strong>

              <span>Add and manage your tasks easily</span>
            </div>

            <LuArrowRight className="pending-action-arrow" />
          </button>

          {/* ===============================================
              ORGANIZE
          =============================================== */}

          <button
            type="button"
            className="pending-action-card pending-organize-card"
            onClick={() => setShowOrganizationTip((previous) => !previous)}
          >
            <div className="pending-action-icon pending-organize-icon">
              <LuTarget />
            </div>

            <div className="pending-action-content">
              <strong>Stay Organized</strong>

              <span>
                {showOrganizationTip
                  ? "Focus on urgent tasks first."
                  : "Break down your work and achieve your goals."}
              </span>
            </div>

            <LuArrowRight className="pending-action-arrow" />
          </button>
        </aside>
      </div>
    </section>
  );
};

export default PendingTasks;
