import React from "react";
import { Routes, Route } from "react-router-dom";

// ========================================
// Trainer Layout
// ========================================
import TrainerLayout from "../Layouts/TrainerLayout/TrainerLayout";

// ========================================
// Trainer Course Details
// ========================================
import CourseDetails from "../Pages/Trainer/CourseDetails/CourseDetails";

// ========================================
// Trainer Pages
// ========================================
import TrainerDashboard from "../Pages/Trainer/TrainerDashboard/TrainerDashboard";
import TrainerLearners from "../Pages/Trainer/TrainerLearners/TrainerLearners";
import TrainerCourses from "../Pages/Trainer/TrainerCourses/TrainerCourses";
import TrainerQuizzes from "../Pages/Trainer/TrainerQuizzes/TrainerQuizzes";
import QuizDetails from "../Pages/Trainer/QuizDetails/QuizDetails";
import TrainerAttendance from "../Pages/Trainer/TrainerAttendance/TrainerAttendance";
import TrainerPerformance from "../Pages/Trainer/TrainerPerformance/TrainerPerformance";
import TrainerSchedule from "../Pages/Trainer/TrainerSchedule/TrainerSchedule";
import TrainerProfile from "../Pages/Trainer/TrainerProfile/TrainerProfile";

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TrainerLayout />}>
        {/* ========================================
            Trainer Dashboard
        ======================================== */}

        <Route index element={<TrainerDashboard />} />

        {/* ========================================
            Trainer Learners
        ======================================== */}

        <Route path="trainer-learners" element={<TrainerLearners />} />

        {/* ========================================
            Trainer Courses
        ======================================== */}

        <Route path="trainer-courses" element={<TrainerCourses />} />

        <Route path="trainer-courses/:courseId" element={<CourseDetails />} />

        {/* ========================================
            Trainer Quizzes
        ======================================== */}

        <Route path="trainer-quizzes" element={<TrainerQuizzes />} />

        <Route path="trainer-quizzes/:quizId" element={<QuizDetails />} />

        {/* ========================================
            Trainer Attendance
        ======================================== */}

        <Route path="trainer-attendance" element={<TrainerAttendance />} />

        {/* ========================================
            Trainer Performance
        ======================================== */}

        <Route path="trainer-performance" element={<TrainerPerformance />} />

        {/* ========================================
            Trainer Schedule
        ======================================== */}

        <Route path="trainer-schedule" element={<TrainerSchedule />} />

        {/* ========================================
            Trainer Profile
        ======================================== */}

        <Route path="trainer-profile" element={<TrainerProfile />} />
      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
