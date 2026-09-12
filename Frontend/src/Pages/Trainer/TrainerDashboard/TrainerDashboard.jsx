import React, { useEffect, useState } from "react";

import "./TrainerDashboard.css";

// =====================================================
// TRAINER DASHBOARD COMPONENTS
// =====================================================

import WelcomeSection from "../../../Components/Trainer/TrainerDashboard/WelcomeSection/WelcomeSection";
import StatsCards from "../../../Components/Trainer/TrainerDashboard/StatsCards/StatsCards";
import LearnerOverview from "../../../Components/Trainer/TrainerDashboard/LearnerOverview/LearnerOverview";
import CourseOverview from "../../../Components/Trainer/TrainerDashboard/CourseOverview/CourseOverview";
import PerformanceOverview from "../../../Components/Trainer/TrainerDashboard/PerformanceOverview/PerformanceOverview";

import { getCourses, getTrainerPerformanceAnalytics } from "../../../services/courseApi";
import { getQuizzes } from "../../../services/quizApi";

// =====================================================
// TRAINER DASHBOARD
// =====================================================

const TrainerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    courses: [],
    stats: {},
    learners: [],
    quizzesCount: 0,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getCourses("TRAINER").catch(() => []),
      getTrainerPerformanceAnalytics("TRAINER").catch(() => ({ stats: {}, learners: [] })),
      getQuizzes("TRAINER").catch(() => []),
    ]).then(([courses, perfData, quizzes]) => {
      if (isMounted) {
        setDashboardData({
          courses: Array.isArray(courses) ? courses : [],
          stats: perfData?.stats || {},
          learners: Array.isArray(perfData?.learners) ? perfData.learners : [],
          quizzesCount: Array.isArray(quizzes) ? quizzes.length : 0,
          loading: false,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="trainer-dashboard">
      {/* =================================================
          WELCOME SECTION
      ================================================= */}

      <WelcomeSection />

      {/* =================================================
          STATS CARDS
      ================================================= */}

      <StatsCards
        totalLearners={dashboardData.stats.totalLearners ?? 0}
        activeCourses={dashboardData.courses.length}
        quizzesCount={dashboardData.quizzesCount}
        avgPerformance={dashboardData.stats.overallPerformance ?? 0}
      />

      {/* =================================================
          LEARNER OVERVIEW
      ================================================= */}

      <LearnerOverview learners={dashboardData.learners} />

      {/* =================================================
          COURSE OVERVIEW
      ================================================= */}

      <CourseOverview courses={dashboardData.courses} />

      {/* =================================================
          PERFORMANCE OVERVIEW
      ================================================= */}

      <PerformanceOverview stats={dashboardData.stats} learners={dashboardData.learners} />
    </div>
  );
};

export default TrainerDashboard;
