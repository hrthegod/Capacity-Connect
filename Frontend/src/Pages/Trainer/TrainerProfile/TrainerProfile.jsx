import React from "react";

import ProfileHeader from "../../../Components/Trainer/TrainerProfile/ProfileHeader/ProfileHeader";
import ProfileOverview from "../../../Components/Trainer/TrainerProfile/ProfileOverview/ProfileOverview";
import ProfileStats from "../../../Components/Trainer/TrainerProfile/ProfileStats/ProfileStats";

import "./TrainerProfile.css";

const TrainerProfile = () => {
  return (
    <div className="trainer-profile-page">
      {/* =========================================
          BACKGROUND GLASS DECORATIONS
      ========================================== */}

      <div
        className="trainer-profile-bg trainer-profile-bg-one"
        aria-hidden="true"
      />

      <div
        className="trainer-profile-bg trainer-profile-bg-two"
        aria-hidden="true"
      />

      <div
        className="trainer-profile-bg trainer-profile-bg-three"
        aria-hidden="true"
      />

      <div className="trainer-profile-grid" aria-hidden="true" />

      {/* =========================================
          PROFILE PAGE CONTENT
      ========================================== */}

      <main className="trainer-profile-content">
        {/* Profile identity + actions */}
        <ProfileHeader />

        {/* About / professional overview */}
        <ProfileOverview />

        {/* Statistics + analytics */}
        <ProfileStats />
      </main>
    </div>
  );
};

export default TrainerProfile;
