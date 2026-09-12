import React, { useEffect, useState } from "react";
import "./TrainerDashboard.css";

import WelcomeSection from "../../../Components/Trainer/TrainerDashboard/WelcomeSection/WelcomeSection";
import StatsCards from "../../../Components/Trainer/TrainerDashboard/StatsCards/StatsCards";
import LearnerOverview from "../../../Components/Trainer/TrainerDashboard/LearnerOverview/LearnerOverview";
import CourseOverview from "../../../Components/Trainer/TrainerDashboard/CourseOverview/CourseOverview";
import PerformanceOverview from "../../../Components/Trainer/TrainerDashboard/PerformanceOverview/PerformanceOverview";
import AttendanceOverview from "../../../Components/Trainer/TrainerDashboard/AttendanceOverview/AttendanceOverview";
import UpcomingSessions from "../../../Components/Trainer/TrainerDashboard/UpcomingSessions/UpcomingSessions";
import PendingTasks from "../../../Components/Trainer/TrainerDashboard/PendingTasks/PendingTasks";
import RecentActivity from "../../../Components/Trainer/TrainerDashboard/RecentActivity/RecentActivity";

import { apiFetch } from "../../../api/apiClient";

const TrainerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch("/trainer/dashboard");

        console.log("TRAINER DASHBOARD RESPONSE:", response);

        setDashboard(response?.data || {});
      } catch (err) {
        console.error("TRAINER DASHBOARD ERROR:", err);
        setError(err.message || "Failed to load trainer dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="trainer-dashboard">
        <div style={{ padding: "30px", textAlign: "center" }}>
          Loading trainer dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trainer-dashboard">
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            color: "red",
          }}
        >
          Failed to load dashboard: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="trainer-dashboard">
      <WelcomeSection
        profile={dashboard?.profile}
      />

      <StatsCards
        stats={dashboard?.stats}
      />

      <LearnerOverview
        learners={dashboard?.learners || []}
        stats={dashboard?.stats}
      />

      <CourseOverview
        courses={dashboard?.courses || []}
      />

      <PerformanceOverview
        stats={dashboard?.stats}
        learners={dashboard?.learners || []}
      />

      {/* These two sections are currently UI-only because
          the backend does not have attendance/session tables. */}
      <AttendanceOverview />
      <UpcomingSessions />

      <PendingTasks
        stats={dashboard?.stats}
      />

      <RecentActivity
        activities={dashboard?.recentActivity || []}
      />
    </div>
  );
};

export default TrainerDashboard;