import React, { useEffect, useMemo, useState } from "react";
import "./TrainerLearners.css";

// Trainer Learners Components
import LearnersHeader from "../../../Components/Trainer/TrainerLearners/LearnersHeader/LearnersHeader";

import LearnerFilters from "../../../Components/Trainer/TrainerLearners/LearnerFilters/LearnerFilters";

import LearnerTable, {
  defaultLearners,
} from "../../../Components/Trainer/TrainerLearners/LearnerTable/LearnerTable";

const TrainerLearners = () => {
  // =====================================================
  // SEARCH STATE
  // =====================================================

  const [searchValue, setSearchValue] = useState("");

  // =====================================================
  // FILTER STATE
  // =====================================================

  const [activeFilter, setActiveFilter] = useState("All Learners");

  // =====================================================
  // SORT STATE
  // =====================================================

  const [sortValue, setSortValue] = useState("Recent Activity");

  // =====================================================
  // VIEW STATE
  // =====================================================

  const [viewMode, setViewMode] = useState("list");

  // =====================================================
  // LISTEN TO SEARCH FROM LEARNERS HEADER
  // =====================================================

  useEffect(() => {
    const handleSearch = (event) => {
      setSearchValue(event.detail?.searchValue || "");
    };

    window.addEventListener("trainer-learners-search", handleSearch);

    return () => {
      window.removeEventListener("trainer-learners-search", handleSearch);
    };
  }, []);

  // =====================================================
  // FILTER + SEARCH + SORT LEARNERS
  // =====================================================

  const filteredLearners = useMemo(() => {
    let result = [...defaultLearners];

    // ---------------------------------------------------
    // SEARCH FILTER
    // ---------------------------------------------------

    const search = searchValue.trim().toLowerCase();

    if (search) {
      result = result.filter((learner) => {
        return (
          learner.name.toLowerCase().includes(search) ||
          learner.email.toLowerCase().includes(search) ||
          learner.course.toLowerCase().includes(search)
        );
      });
    }

    // ---------------------------------------------------
    // STATUS FILTER
    // ---------------------------------------------------

    if (activeFilter !== "All Learners") {
      result = result.filter((learner) => learner.status === activeFilter);
    }

    // ---------------------------------------------------
    // SORT
    // ---------------------------------------------------

    switch (sortValue) {
      case "Name: A → Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Name: Z → A":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Progress: High":
        result.sort((a, b) => b.progress - a.progress);
        break;

      case "Progress: Low":
        result.sort((a, b) => a.progress - b.progress);
        break;

      case "Recent Activity":
      default:
        // Keep the default learner order for now.
        break;
    }

    return result;
  }, [searchValue, activeFilter, sortValue]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="trainer-learners">
      {/* =================================================
          HEADER
      ================================================= */}

      <LearnersHeader />

      {/* =================================================
          FILTER BAR
      ================================================= */}

      <LearnerFilters
        activeFilter={activeFilter}
        sortValue={sortValue}
        viewMode={viewMode}
        onFilterChange={setActiveFilter}
        onSortChange={setSortValue}
        onViewChange={setViewMode}
      />

      {/* =================================================
          LEARNER TABLE
      ================================================= */}

      <LearnerTable learners={filteredLearners} viewMode={viewMode} />
    </div>
  );
};

export default TrainerLearners;
