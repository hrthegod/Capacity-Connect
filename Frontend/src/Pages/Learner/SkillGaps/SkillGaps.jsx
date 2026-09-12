import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../api/apiClient";

import SkillGapsHeader from "../../../Components/Learner/SkillGaps/SkillGapsHeader/SkillGapsHeader";
import SkillGapOverview from "../../../Components/Learner/SkillGaps/SkillGapOverview/SkillGapOverview";
import SkillGapDetails from "../../../Components/Learner/SkillGaps/SkillGapDetails/SkillGapDetails";
import SkillGapsClosing from "../../../Components/Learner/SkillGaps/SkillGapsClosing/SkillGapsClosing";

import "./SkillGaps.css";

const SkillGaps = () => {
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/skill-gaps/summary", {}, "LEARNER")
      .then((res) => {
        if (res?.data) {
          setGapData(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch skill gap summary:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const stats = {
    totalSkills: gapData?.totalCompetenciesInCatalog || 7,
    acquiredCount: gapData?.acquiredCount || 1,
    missingCount: gapData?.missingCount || 6,
    skillGaps: gapData?.missing || [],
  };

  /* =========================================================
     HEADER HANDLERS
  ========================================================= */

  const handleExploreSkillGaps = () => {
    console.log("Explore Skill Gaps");
  };

  const handleViewLearningResources = () => {
    console.log("View Learning Resources");
  };

  /* =========================================================
     SKILL GAP OVERVIEW HANDLERS
  ========================================================= */

  const handleExploreResources = (skill) => {
    console.log("Explore resources for:", skill);
  };

  const handleViewSkillDetails = (skill) => {
    console.log("View skill details:", skill);
  };

  /* =========================================================
     SKILL GAP DETAILS HANDLERS
  ========================================================= */

  const handleViewAllResources = () => {
    console.log("View All Resources");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="skill-gaps-page">
      <div className="skill-gaps-page__container">
        {/* =====================================================
            SKILL GAPS HEADER
        ===================================================== */}

        <SkillGapsHeader
          stats={stats}
          onExploreSkillGaps={handleExploreSkillGaps}
          onViewLearningResources={handleViewLearningResources}
        />

        {/* =====================================================
            SKILL GAP OVERVIEW
        ===================================================== */}

        <SkillGapOverview
          onExploreResources={handleExploreResources}
          onViewSkillDetails={handleViewSkillDetails}
        />

        {/* =====================================================
            SKILL GAP DETAILS
        ===================================================== */}

        <SkillGapDetails
          onViewSkillDetails={handleViewSkillDetails}
          onExploreResources={handleExploreResources}
          onViewAllResources={handleViewAllResources}
              />
        <SkillGapsClosing
          stats={stats}
          onExploreResources={handleExploreResources}
          onViewAllResources={handleViewAllResources}
          onBackToSkills={() => {
            console.log("Back to My Skills");
          }}
        />
      </div>
    </main>
  );
};

export default SkillGaps;
