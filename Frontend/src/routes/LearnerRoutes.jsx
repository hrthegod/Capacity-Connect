import { Navigate, Routes, Route } from "react-router-dom";

import LearnerLayout from "../Layouts/LearnerLayout/LearnerLayout";

/* =========================================================
   LEARNER PAGES
========================================================= */

import Dashboard from "../Pages/Learner/Dashboard/Dashboard";

import CourseCatalog from "../Pages/Learner/CourseCatalog/CourseCatalog";
import Quizzes from "../Pages/Learner/Quizzes/Quizzes";
import QuizAttempt from "../Pages/Learner/QuizAttempt/QuizAttempt";
import QuizResult from "../Pages/Learner/QuizResult/QuizResult";

import MyLearning from "../Pages/Learner/MyLearning/MyLearning";
import CourseDetails from "../Pages/Learner/CourseDetails/CourseDetails";
import MySkills from "../Pages/Learner/Skills/MySkills";
import SkillGaps from "../Pages/Learner/SkillGaps/SkillGaps";
import Recommendations from "../Pages/Learner/Recommendations/Recommendations";
import Certificates from "../Pages/Learner/Certificates/Certificates";
import Knowledge from "../Pages/Learner/KnowledgeHub/Knowledge";

/* =========================================================
   TEMPORARY PLACEHOLDER PAGE
========================================================= */

const PlaceholderPage = ({ title }) => {
  return (
    <div
      style={{
        minHeight: "400px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        border: "1px solid #dce3eb",
        borderRadius: "12px",

        background: "#ffffff",

        fontSize: "24px",
        fontWeight: "600",

        color: "#354052",

        boxSizing: "border-box",
      }}
    >
      {title}
    </div>
  );
};

/* =========================================================
   LEARNER ROUTES
========================================================= */

const LearnerRoutes = () => {
  return (
    <Routes>
      {/* =====================================================
          LEARNER LAYOUT
      ===================================================== */}

      <Route path="/" element={<LearnerLayout />}>
        {/* ===================================================
            DEFAULT LEARNER ROUTE
        =================================================== */}

        <Route index element={<Navigate to="dashboard" replace />} />

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <Route path="dashboard" element={<Dashboard />} />

        {/* ===================================================
            LEARNING
        =================================================== */}

        <Route path="learning" element={<MyLearning />} />

        {/* ===================================================
            COURSE CATALOG
        =================================================== */}

        <Route path="courses" element={<CourseCatalog />} />

        {/* ===================================================
            QUIZZES
        =================================================== */}

        <Route path="quizzes" element={<Quizzes />} />

        <Route
          path="quizzes/:quizId/attempt"
          element={<QuizAttempt />}
        />

        <Route
          path="quizzes/:quizId/result/:attemptId"
          element={<QuizResult />}
        />

        {/* ===================================================
            COURSE JOURNEY
        =================================================== */}

        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route
          path="courses/:courseId/learn"
          element={<PlaceholderPage title="Learning Player" />}
        />

        <Route
          path="courses/:courseId/quiz/:quizId"
          element={<PlaceholderPage title="Quiz" />}
        />

        <Route
          path="courses/:courseId/result/:attemptId"
          element={<PlaceholderPage title="Quiz Result" />}
        />

        {/* ===================================================
            COMPETENCY
        =================================================== */}

        <Route path="skills" element={<MySkills />} />

        <Route path="skill-gaps" element={<SkillGaps />} />

        <Route path="recommendations" element={<Recommendations />} />

        {/* ===================================================
            ACHIEVEMENTS
        =================================================== */}

        <Route path="certificates" element={<Certificates />} />

        {/* ===================================================
            KNOWLEDGE HUB
        =================================================== */}

        <Route path="knowledge-hub" element={<Knowledge />} />

        <Route
          path="knowledge-hub/:resourceId"
          element={<PlaceholderPage title="Resource Details" />}
        />

        {/* ===================================================
            ACCOUNT
        =================================================== */}

        <Route path="profile" element={<PlaceholderPage title="Profile" />} />

        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>
    </Routes>
  );
};

export default LearnerRoutes;