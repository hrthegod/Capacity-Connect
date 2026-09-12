// src/Pages/Learner/Recommendations/Recommendations.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../api/apiClient";

import RecommendationsHeader from "../../../Components/Learner/Recommendations/RecommendationsHeader/RecommendationsHeader";
import RecommendationList from "../../../Components/Learner/Recommendations/RecommendationList/RecommendationList";
import LearningPaths from "../../../Components/Learner/Recommendations/LearningPaths/LearningPaths";
import RecommendationsClosing from "../../../Components/Learner/Recommendations/RecommendationsClosing/RecommendationsClosing";

import "./Recommendations.css";

/* =========================================================
   RECOMMENDATIONS PAGE
========================================================= */

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [stats, setStats] = useState({
    totalSkills: 0,
    averageLevel: 0,
    developingSkills: 0,
    strongSkills: 0,
    recommendedCourses: 0,
    missingCount: 0,
  });

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [recsRes, profileRes, gapsRes] = await Promise.all([
          apiFetch('/recommendations').catch(() => null),
          apiFetch('/competencies/profile').catch(() => null),
          apiFetch('/skill-gaps/summary').catch(() => null),
        ]);

        if (!isMounted) return;

        let recsList = [];
        if (recsRes) {
          const rawRecs = Array.isArray(recsRes)
            ? recsRes
            : (recsRes.data?.recommendations || recsRes.data || []);
          recsList = rawRecs.map((rec, index) => ({
            id: rec.id || rec.course_id || index,
            title: rec.title || rec.course_title || 'Recommended Course',
            description: rec.description || (rec.skills_addressed ? `Skills: ${rec.skills_addressed.join(', ')}` : ''),
            category: rec.category || 'Domain',
            level: rec.relevance_score || 80,
            target: 100,
            duration: rec.duration || 'Self-paced',
            impact: rec.level ? `${rec.level} Level` : 'High Impact',
            icon: 'ocean',
            theme: index % 2 === 0 ? 'blue' : 'green',
            course_id: rec.course_id
          }));
        }
        setRecommendations(recsList);

        let totalSk = 0;
        let avgLvl = 0;
        if (profileRes && profileRes.success && Array.isArray(profileRes.data)) {
          const list = profileRes.data;
          totalSk = list.length;
          const sum = list.reduce((acc, curr) => acc + (Number(curr.proficiency_level) || 0), 0);
          avgLvl = totalSk > 0 ? Math.round(sum / totalSk) : 0;
        }

        let missing = 0;
        if (gapsRes && gapsRes.success && gapsRes.data) {
          missing = gapsRes.data.missingCount || 0;
        }

        setStats({
          totalSkills: totalSk,
          averageLevel: avgLvl,
          developingSkills: missing,
          strongSkills: totalSk - missing > 0 ? totalSk - missing : 0,
          recommendedCourses: recsList.length,
          missingCount: missing,
        });
      } catch (err) {
        console.error("Failed to load recommendations data:", err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  /* =======================================================
     HEADER ACTIONS
  ======================================================= */

  const handleExploreCourses = () => {
    document.querySelector(".recommendation-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleViewLearningPath = () => {
    document.querySelector(".learning-paths")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =======================================================
     RECOMMENDATION LIST ACTIONS
  ======================================================= */

  const handleExploreCourse = (course) => {
    if (course.course_id) {
      navigate(`/learner/courses/${course.course_id}`);
    }
  };

  const handleViewAllRecommendations = () => {
    handleExploreCourses();
  };

  /* =======================================================
     LEARNING PATH ACTIONS
  ======================================================= */

  const handleContinuePath = (path) => {
    console.log("Continue learning path:", path);
  };

  const handleViewAllPaths = () => {
    console.log("View all learning paths");
  };

  /* =======================================================
     CLOSING SECTION ACTIONS
  ======================================================= */

  const handleContinueLearning = () => {
    navigate("/learner/my-learning");
  };

  const handleViewSkillGaps = () => {
    navigate("/learner/skill-gaps");
  };

  const handleClosingExploreCourses = () => {
    handleExploreCourses();
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="recommendations-page">
      <div className="recommendations-page__container">
        {/* =================================================
            RECOMMENDATIONS HEADER
        ================================================= */}

        <RecommendationsHeader
          stats={stats}
          onExploreCourses={handleExploreCourses}
          onViewLearningPath={handleViewLearningPath}
        />

        {/* =================================================
            RECOMMENDED COURSES
        ================================================= */}

        <RecommendationList
          stats={stats}
          courses={recommendations}
          onExploreCourse={handleExploreCourse}
          onViewAllRecommendations={handleViewAllRecommendations}
          onViewLearningPath={handleViewLearningPath}
        />

        {/* =================================================
            LEARNING PATHS
        ================================================= */}

        <LearningPaths
          onContinuePath={handleContinuePath}
          onViewAllPaths={handleViewAllPaths}
        />

        {/* =================================================
            RECOMMENDATIONS CLOSING
        ================================================= */}

        <RecommendationsClosing
          stats={stats}
          onContinueLearning={handleContinueLearning}
          onViewSkillGaps={handleViewSkillGaps}
          onExploreCourses={handleClosingExploreCourses}
        />
      </div>
    </main>
  );
};

export default Recommendations;
