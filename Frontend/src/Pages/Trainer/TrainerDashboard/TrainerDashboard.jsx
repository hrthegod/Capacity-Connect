import React from "react";

import "./TrainerDashboard.css";

// =====================================================
// TRAINER DASHBOARD COMPONENTS
// =====================================================

import WelcomeSection from "../../../Components/Trainer/TrainerDashboard/WelcomeSection/WelcomeSection";

import StatsCards from "../../../Components/Trainer/TrainerDashboard/StatsCards/StatsCards";

import LearnerOverview from "../../../Components/Trainer/TrainerDashboard/LearnerOverview/LearnerOverview";

import CourseOverview from "../../../Components/Trainer/TrainerDashboard/CourseOverview/CourseOverview";

import PerformanceOverview from "../../../Components/Trainer/TrainerDashboard/PerformanceOverview/PerformanceOverview";

import AttendanceOverview from "../../../Components/Trainer/TrainerDashboard/AttendanceOverview/AttendanceOverview";

import UpcomingSessions from "../../../Components/Trainer/TrainerDashboard/UpcomingSessions/UpcomingSessions";

import PendingTasks from "../../../Components/Trainer/TrainerDashboard/PendingTasks/PendingTasks";

import RecentActivity from "../../../Components/Trainer/TrainerDashboard/RecentActivity/RecentActivity";

// =====================================================
// TRAINER DASHBOARD
// =====================================================

const TrainerDashboard = () => {
  return (
    <div className="trainer-dashboard">
      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <WelcomeSection />

      {/* =================================================
          STATS CARDS
      ================================================= */}

      <StatsCards />

      {/* =================================================
          LEARNER OVERVIEW
      ================================================= */}

      <LearnerOverview />

      {/* =================================================
          COURSE OVERVIEW
      ================================================= */}

      <CourseOverview />

      {/* =================================================
          PERFORMANCE OVERVIEW
      ================================================= */}

      <PerformanceOverview />

      {/* =================================================
          ATTENDANCE OVERVIEW
      ================================================= */}

      <AttendanceOverview />

      {/* =================================================
          UPCOMING SESSIONS
      ================================================= */}

      <UpcomingSessions />

      {/* =================================================
          PENDING TASKS
      ================================================= */}

      <PendingTasks />

      {/* =================================================
          RECENT ACTIVITY
      ================================================= */}

      <RecentActivity />
    </div>
  );
};

export default TrainerDashboard;
