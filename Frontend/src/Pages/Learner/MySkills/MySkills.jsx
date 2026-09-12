import React from "react";
import { useNavigate } from "react-router-dom";

import MySkillsHeader from "../../../Components/Learner/MySkills/MySkillsHeader/MySkillsHeader";
import SkillsOverview from "../../../Components/Learner/MySkills/SkillsOverview/SkillsOverview";
import SkillDevelopment from "../../../Components/Learner/MySkills/SkillDevelopment/SkillDevelopment";
import MySkillsClosing from "../../../Components/Learner/MySkills/MySkillsClosing/MySkillsClosing";


import {
  CURRENT_LEARNER_ID,
  getSkillStats,
} from "../../../../data/mock/skills";

import "./MySkills.css";

const MySkills = () => {
  const navigate = useNavigate();

  /* =====================================================
     CURRENT LEARNER SKILL DATA
  ===================================================== */

  const stats = getSkillStats(CURRENT_LEARNER_ID);

  /* =====================================================
     NAVIGATION HANDLERS
  ===================================================== */

  const handleViewSkillGaps = () => {
    navigate("/learner/skill-gaps");
  };

  const handleViewRecommendations = () => {
    navigate("/learner/recommendations");
  };

  const handleViewAllSkills = () => {
    // Keep the learner on the My Skills page.
    // This can later be changed to a dedicated
    // all-skills/details route if required.
    navigate("/learner/my-skills");
  };

  const handleViewSkillDetails = (skill) => {
    /*
      For now, keep the learner on the My Skills page.

      Later you can change this to something like:

      navigate(`/learner/my-skills/${skill.id}`);

      or:

      navigate(`/learner/skills/${skill.id}`);
    */

    console.log("View skill details:", skill);
  };

  const handleSetLearningGoals = () => {
    /*
      This can later navigate to a dedicated
      learning-goals page.

      Example:

      navigate("/learner/learning-goals");
    */

    console.log("Set learning goals");
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="my-skills-page">
      <div className="my-skills-page__container">
        {/* =================================================
            1. MY SKILLS HEADER
        ================================================= */}

        <MySkillsHeader
          stats={stats}
          onViewSkillGaps={handleViewSkillGaps}
          onViewRecommendations={handleViewRecommendations}
        />

        {/* =================================================
            2. SKILLS OVERVIEW
        ================================================= */}

        <SkillsOverview stats={stats} onViewAllSkills={handleViewAllSkills} />

        {/* =================================================
            3. SKILL DEVELOPMENT
        ================================================= */}

        <SkillDevelopment
          onViewAllSkills={handleViewAllSkills}
          onViewSkillDetails={handleViewSkillDetails}
          onSetLearningGoals={handleSetLearningGoals}
        />
        <MySkillsClosing
          stats={stats}
          onViewSkillGaps={handleViewSkillGaps}
          onViewRecommendations={handleViewRecommendations}
        />
        
      </div>
    </main>
  );
};

export default MySkills;
