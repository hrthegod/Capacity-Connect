import React from "react";
import { LuSparkles, LuTarget, LuTrendingUp } from "react-icons/lu";

import "./PerformanceHeader.css";

const PerformanceHeader = () => {
  return (
    <header className="performance-header">
      {/* ========================================
          BACKGROUND DECORATION
      ======================================== */}

      <div
        className="performance-header-orb performance-header-orb-one"
        aria-hidden="true"
      />

      <div
        className="performance-header-orb performance-header-orb-two"
        aria-hidden="true"
      />

      {/* ========================================
          HEADER INNER
      ======================================== */}

      <div className="performance-header-inner">
        {/* ========================================
            TOP HEADER
        ======================================== */}

        <div className="performance-heading-row">
          {/* ======================================
              LEFT - PAGE INTRODUCTION
          ====================================== */}

          <div className="performance-heading-content">
            <div className="performance-eyebrow">
              <span className="performance-eyebrow-icon">
                <LuTrendingUp size={13} strokeWidth={1.9} />
              </span>

              <span>TRAINER ANALYTICS</span>
            </div>

            <h1>Learner Performance</h1>

            <p>
              Monitor learner progress, engagement and overall academic
              performance from one place.
            </p>
          </div>

          {/* ======================================
              RIGHT - PERFORMANCE SNAPSHOT
              DARK NAVY SECTION
          ====================================== */}

          <div className="performance-highlight-card">
            <div className="performance-highlight-glow" aria-hidden="true" />

            {/* Snapshot heading */}

            <div className="performance-highlight-top">
              <div className="performance-highlight-icon">
                <LuSparkles size={17} strokeWidth={1.7} />
              </div>

              <span className="performance-highlight-label">
                PERFORMANCE SNAPSHOT
              </span>
            </div>

            {/* Snapshot value */}

            <div className="performance-highlight-content">
              <div className="performance-highlight-value">
                <strong>82%</strong>

                <span>overall performance</span>
              </div>

              {/* Circular progress */}

              <div className="performance-highlight-ring">
                <svg
                  viewBox="0 0 42 42"
                  className="performance-ring-svg"
                  aria-hidden="true"
                >
                  <circle
                    cx="21"
                    cy="21"
                    r="17"
                    className="performance-ring-track"
                  />

                  <circle
                    cx="21"
                    cy="21"
                    r="17"
                    className="performance-ring-progress"
                  />
                </svg>

                <LuTarget
                  className="performance-ring-icon"
                  size={15}
                  strokeWidth={1.7}
                />
              </div>
            </div>

            {/* Performance comparison */}

            <div className="performance-highlight-footer">
              <span>
                <LuTrendingUp size={12} strokeWidth={2} />
                +6.4%
              </span>

              <small>vs previous period</small>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PerformanceHeader;
