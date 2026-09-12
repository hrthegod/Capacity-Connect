import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// ========================================
// Admin Layout
// ========================================
import AdminLayout from "../Pages/Admin/AdminLayout";

// ========================================
// Admin Pages
// ========================================
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import UserManagement from "../Pages/Admin/UserManagement";
import UserDetail from "../Pages/Admin/UserDetail";
import TrainerManagement from "../Pages/Admin/TrainerManagement";
import LearnerManagement from "../Pages/Admin/LearnerManagement";
import CourseManagement from "../Pages/Admin/CourseManagement";
import CourseDetail from "../Pages/Admin/CourseDetail";
import TrainingPrograms from "../Pages/Admin/TrainingPrograms";
import CompetencyManagement from "../Pages/Admin/CompetencyManagement";
import KnowledgeHub from "../Pages/Admin/KnowledgeHub";
import ApprovalCenter from "../Pages/Admin/ApprovalCenter";
import OrganizationAnalytics from "../Pages/Admin/OrganizationAnalytics";
import Reports from "../Pages/Admin/Reports";
import PlatformSettings from "../Pages/Admin/PlatformSettings";

// ========================================
// Admin 404
// ========================================
import NotFound from "../Pages/Admin/NotFound";

// ========================================
// ADMIN PATH RESOLVER
// ========================================

export function resolveAdminPath(pageId, paramId) {
  switch (pageId) {
    case "dashboard":
    case "admin":
      return "/admin";

    case "users":
      return "/admin/users";

    case "user-detail":
      return `/admin/users/${paramId || "usr-101"}`;

    case "trainers":
      return "/admin/trainers";

    case "learners":
      return "/admin/learners";

    case "courses":
      return "/admin/courses";

    case "course-detail":
      return `/admin/courses/${paramId || "crs-201"}`;

    case "training":
    case "training-programs":
      return "/admin/training";

    case "competencies":
      return "/admin/competencies";

    case "knowledge-hub":
      return "/admin/knowledge-hub";

    case "approvals":
      return "/admin/approvals";

    case "analytics":
      return "/admin/analytics";

    case "reports":
      return "/admin/reports";

    case "settings":
      return "/admin/settings";

    default:
      return pageId.startsWith("/") ? pageId : `/admin/${pageId}`;
  }
}

// ========================================
// SCROLL TO TOP
// ========================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

// ========================================
// ADMIN LAYOUT CONTAINER
// ========================================

function AdminLayoutContainer() {
  const navigate = useNavigate();

  const handleNavigate = (page, id) => {
    navigate(resolveAdminPath(page, id));
  };

  return (
    <AdminLayout onNavigate={handleNavigate} pendingApprovalsCount={34}>
      <Routes>
        {/* ================================
            DASHBOARD
        ================================= */}

        <Route index element={<AdminDashboard onNavigate={handleNavigate} />} />

        <Route
          path="dashboard"
          element={<AdminDashboard onNavigate={handleNavigate} />}
        />

        {/* ================================
            USER MANAGEMENT
        ================================= */}

        <Route
          path="users"
          element={
            <UserManagement
              onNavigate={handleNavigate}
              onSelectUser={(userId) => navigate(`/admin/users/${userId}`)}
            />
          }
        />

        <Route
          path="users/:userId"
          element={
            <UserDetail
              onNavigate={handleNavigate}
              onBack={() => navigate("/admin/users")}
            />
          }
        />

        {/* ================================
            TRAINER MANAGEMENT
        ================================= */}

        <Route
          path="trainers"
          element={
            <TrainerManagement
              onNavigate={handleNavigate}
              onSelectUser={(userId) => navigate(`/admin/users/${userId}`)}
            />
          }
        />

        {/* ================================
            LEARNER MANAGEMENT
        ================================= */}

        <Route
          path="learners"
          element={
            <LearnerManagement
              onNavigate={handleNavigate}
              onSelectUser={(userId) => navigate(`/admin/users/${userId}`)}
            />
          }
        />

        {/* ================================
            COURSE MANAGEMENT
        ================================= */}

        <Route
          path="courses"
          element={
            <CourseManagement
              onNavigate={handleNavigate}
              onSelectCourse={(courseId) =>
                navigate(`/admin/courses/${courseId}`)
              }
            />
          }
        />

        <Route
          path="courses/:courseId"
          element={
            <CourseDetail
              onNavigate={handleNavigate}
              onBack={() => navigate("/admin/courses")}
            />
          }
        />

        {/* ================================
            TRAINING PROGRAMS
        ================================= */}

        <Route path="training" element={<TrainingPrograms />} />

        <Route
          path="training-programs"
          element={<Navigate to="/admin/training" replace />}
        />

        {/* ================================
            COMPETENCY MANAGEMENT
        ================================= */}

        <Route path="competencies" element={<CompetencyManagement />} />

        {/* ================================
            KNOWLEDGE HUB
        ================================= */}

        <Route path="knowledge-hub" element={<KnowledgeHub />} />

        {/* ================================
            APPROVAL CENTER
        ================================= */}

        <Route path="approvals" element={<ApprovalCenter />} />

        {/* ================================
            ORGANIZATION ANALYTICS
        ================================= */}

        <Route path="analytics" element={<OrganizationAnalytics />} />

        {/* ================================
            REPORTS
        ================================= */}

        <Route path="reports" element={<Reports />} />

        {/* ================================
            PLATFORM SETTINGS
        ================================= */}

        <Route path="settings" element={<PlatformSettings />} />

        {/* ================================
            ADMIN 404
            Must be LAST
        ================================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminLayout>
  );
}

// ========================================
// ADMIN ROUTES
// ========================================

export default function AdminRoutes() {
  return (
    <>
      <ScrollToTop />
      <AdminLayoutContainer />
    </>
  );
}
