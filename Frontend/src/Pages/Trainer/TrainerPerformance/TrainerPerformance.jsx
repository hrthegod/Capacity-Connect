import React, { useState } from "react";

import PerformanceHeader from "../../../Components/Trainer/TrainerPerformance/PerformanceHeader/PerformanceHeader";
import PerformanceStats from "../../../Components/Trainer/TrainerPerformance/PerformanceStats/PerformanceStats";
import PerformanceFilters from "../../../Components/Trainer/TrainerPerformance/PerformanceFilters/PerformanceFilters";
import LearnerPerformance from "../../../Components/Trainer/TrainerPerformance/LearnerPerformance/LearnerPerformance";

import "./TrainerPerformance.css";

const TrainerPerformance = () => {
  /* =====================================================
     PERFORMANCE FILTER STATE
     This is the single source of truth for filtering.
  ===================================================== */

  const [performanceFilters, setPerformanceFilters] = useState({
    course: "All Courses",
    batch: "All Batches",
    period: "This Month",
    status: "All Status",
    searchValue: "",
  });

  /* =====================================================
     UPDATE FILTERS
  ===================================================== */

  const handleFiltersChange = (updatedFilters) => {
    setPerformanceFilters((currentFilters) => ({
      ...currentFilters,
      ...updatedFilters,
    }));
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

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
      {/* ========================================
          DECORATIVE BACKGROUND
      ======================================== */}

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

      {/* ========================================
          MAIN PERFORMANCE CONTENT
      ======================================== */}

      <main className="trainer-performance-content">
        {/* ======================================
            PERFORMANCE HEADER
        ====================================== */}

        <PerformanceHeader />

        {/* ======================================
            PERFORMANCE STATS
        ====================================== */}

        <PerformanceStats />

        {/* ======================================
            PERFORMANCE FILTERS
        ====================================== */}

        <PerformanceFilters
          filters={performanceFilters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
        />

        {/* ======================================
            LEARNER PERFORMANCE LIST

            The same filter state is passed here.
            PerformanceFilters will update the state
            above, and this component will receive
            the updated values.
        ====================================== */}

        <LearnerPerformance filters={performanceFilters} />
      </main>
    </div>
  );
};

export default TrainerPerformance;
