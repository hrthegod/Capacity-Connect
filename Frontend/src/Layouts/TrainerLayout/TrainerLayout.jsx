import React from "react";
import { Outlet } from "react-router-dom";

import TrainerSidebar from "../../Components/Trainer/TrainerSidebar/TrainerSidebar";
import TrainerTopBar from "../../Components/Trainer/TrainerTopBar/TrainerTopBar";

import "./TrainerLayout.css";

const TrainerLayout = () => {
  return (
    <div className="trainer-layout">
      {/* Sidebar */}
      <TrainerSidebar />

      {/* Main Application Area */}
      <div className="trainer-main">
        {/* Top Bar */}
        <TrainerTopBar />

        {/* Page Content */}
        <main className="trainer-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TrainerLayout;
