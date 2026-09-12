import React from "react";

import TrainerProfileSettings from "../../../Components/Trainer/TrainerProfile/ProfileSettings/ProfileSettings";

import "./ProfileSettings.css";

const ProfileSettings = () => {
  return (
    <div className="trainer-profile-settings-page">
      {/* Background glass decorations */}
      <div
        className="trainer-profile-settings-bg trainer-profile-settings-bg-one"
        aria-hidden="true"
      />

      <div
        className="trainer-profile-settings-bg trainer-profile-settings-bg-two"
        aria-hidden="true"
      />

      <div
        className="trainer-profile-settings-bg trainer-profile-settings-bg-three"
        aria-hidden="true"
      />

      <div className="trainer-profile-settings-grid" aria-hidden="true" />

      {/* Page content */}
      <main className="trainer-profile-settings-content">
        <TrainerProfileSettings />
      </main>
    </div>
  );
};

export default ProfileSettings;
