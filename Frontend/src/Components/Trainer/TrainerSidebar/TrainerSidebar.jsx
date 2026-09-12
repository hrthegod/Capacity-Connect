import React from "react";
import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuUsers,
  LuBookOpen,
  LuClipboardCheck,
  LuCalendarCheck,
  LuChartNoAxesCombined,
  LuCalendarDays,
  LuUserRound,
  LuHeadphones,
  LuArrowLeftRight,
  LuChevronRight,
} from "react-icons/lu";

import "./TrainerSidebar.css";

const TrainerSidebar = () => {
  const navigationItems = [
    {
      label: "Dashboard",
      path: "/trainer",
      icon: LuLayoutDashboard,
    },
    {
      label: "Trainer Learners",
      path: "/trainer/trainer-learners",
      icon: LuUsers,
    },
    {
      label: "Trainer Courses",
      path: "/trainer/trainer-courses",
      icon: LuBookOpen,
    },
    {
      label: "Trainer Quizzes",
      path: "/trainer/trainer-quizzes",
      icon: LuClipboardCheck,
    },
    {
      label: "Trainer Attendance",
      path: "/trainer/trainer-attendance",
      icon: LuCalendarCheck,
    },
    {
      label: "Trainer Performance",
      path: "/trainer/trainer-performance",
      icon: LuChartNoAxesCombined,
    },
    {
      label: "Trainer Schedule",
      path: "/trainer/trainer-schedule",
      icon: LuCalendarDays,
    },
    {
      label: "Trainer Profile",
      path: "/trainer/trainer-profile",
      icon: LuUserRound,
    },
  ];

  return (
    <aside className="trainer-sidebar">
      {/* =========================================
          BRAND
      ========================================= */}
      <div className="trainer-sidebar-brand">
        <NavLink to="/trainer" className="trainer-brand-link">
          <div className="trainer-brand-logo">
            <span>C</span>
          </div>

          <div className="trainer-brand-content">
            <h1>Capacity Connect</h1>
            <p>Learn. Grow. Lead.</p>
          </div>
        </NavLink>
      </div>

      {/* =========================================
          NAVIGATION
      ========================================= */}
      <nav className="trainer-sidebar-navigation">
        <p className="trainer-navigation-label">Workspace</p>

        <div className="trainer-navigation-list">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/trainer"}
                className={({ isActive }) =>
                  `trainer-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="trainer-nav-icon">
                  <Icon />
                </span>

                <span className="trainer-nav-label">{item.label}</span>

                {item.badge && (
                  <span className="trainer-nav-badge">{item.badge}</span>
                )}

                <span className="trainer-nav-arrow">
                  <LuChevronRight />
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* =========================================
          SIDEBAR BOTTOM
      ========================================= */}
      <div className="trainer-sidebar-bottom">
        {/* Support Card */}
        <div className="trainer-support-card">
          <div className="trainer-support-icon">
            <LuHeadphones />
          </div>

          <div className="trainer-support-content">
            <h3>Need Help?</h3>
            <p>Get support anytime</p>
          </div>

          <button type="button" className="trainer-support-button">
            Contact Support
          </button>
        </div>

        {/* Switch To Learner */}
        <button type="button" className="trainer-switch-button">
          <span className="trainer-switch-icon">
            <LuArrowLeftRight />
          </span>

          <span className="trainer-switch-text">Switch to Learner</span>

          <span className="trainer-switch-arrow">
            <LuChevronRight />
          </span>
        </button>
      </div>
    </aside>
  );
};

export default TrainerSidebar;
