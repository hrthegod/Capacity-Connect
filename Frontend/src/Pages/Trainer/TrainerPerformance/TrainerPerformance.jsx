import React, { useEffect, useState } from "react";

import PerformanceHeader from "../../../Components/Trainer/TrainerPerformance/PerformanceHeader/PerformanceHeader";
import PerformanceStats from "../../../Components/Trainer/TrainerPerformance/PerformanceStats/PerformanceStats";
import PerformanceFilters from "../../../Components/Trainer/TrainerPerformance/PerformanceFilters/PerformanceFilters";
import LearnerPerformance from "../../../Components/Trainer/TrainerPerformance/LearnerPerformance/LearnerPerformance";

import { getTrainerPerformanceAnalytics } from "../../../services/courseApi";

import "./TrainerPerformance.css";

const TrainerPerformance = () => {
  const [performanceFilters, setPerformanceFilters] = useState({
    course: "All Courses",
    batch: "All Batches",
    period: "This Month",
    status: "All Status",
    searchValue: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    stats: {},
    learners: []
  });

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getTrainerPerformanceAnalytics("TRAINER")
      .then((data) => {
        if (isMounted && data) {
          setAnalyticsData({
            stats: data.stats || {},
            learners: data.learners || []
          });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch performance analytics:", err);
        if (isMounted) setError(err.message || "Failed to load performance analytics");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFiltersChange = (updatedFilters) => {
    setPerformanceFilters((currentFilters) => ({
      ...currentFilters,
      ...updatedFilters,
    }));
  };

  const handleResetFilters = () => {
    setPerformanceFilters({
      course: "All Courses",
      batch: "All Batches",
      period: "This Month",
      status: "All Status",
      searchValue: "",
    });
  };

  return (
    <div className="trainer-performance-page">
      <div
        className="trainer-performance-bg-orb trainer-performance-bg-orb-one"
        aria-hidden="true"
      />
      <div
        className="trainer-performance-bg-orb trainer-performance-bg-orb-two"
        aria-hidden="true"
      />
      <div
        className="trainer-performance-bg-orb trainer-performance-bg-orb-three"
        aria-hidden="true"
      />

      <main className="trainer-performance-content">
        <PerformanceHeader />

        <PerformanceStats stats={analyticsData.stats} />

        <PerformanceFilters
          filters={performanceFilters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
        />

        <LearnerPerformance learners={analyticsData.learners} filters={performanceFilters} />
      </main>
    </div>
  );
};

export default TrainerPerformance;
