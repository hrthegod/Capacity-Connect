// src/Components/Learner/Knowledge/KnowledgeSearch/KnowledgeSearch.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiGlobe,
  FiLayers,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

import "./KnowledgeSearch.css";

/* =========================================================
   POPULAR RESOURCES

   These are quick-search/filter shortcuts.

   IMPORTANT:
   They do not contain resource data.

   They only tell the Knowledge page which filters to apply.
========================================================= */

const popularResources = [
  {
    id: "learning-guides",
    label: "Learning Guides",
    searchQuery: "",
    resourceType: "Guides",
    icon: FiBookOpen,
  },
  {
    id: "certifications",
    label: "Certifications",
    searchQuery: "certification",
    resourceType: "All Resources",
    icon: FiLayers,
  },
  {
    id: "productivity",
    label: "Productivity",
    searchQuery: "productivity",
    resourceType: "All Resources",
    icon: FiBarChart2,
  },
  {
    id: "mental-health",
    label: "Mental Health",
    searchQuery: "mental health",
    resourceType: "All Resources",
    icon: FiUsers,
  },
  {
    id: "career-events",
    label: "Career Events",
    searchQuery: "career",
    resourceType: "All Resources",
    icon: FiGlobe,
  },
];

/* =========================================================
   RESOURCE TYPES

   Keep these aligned with the actual resource types
   available in knowledge.js.

   Current supported types:
   ✓ All Resources
   ✓ Articles
   ✓ Guides
   ✓ Research
========================================================= */

const resourceTypes = [
  {
    value: "All Resources",
    label: "All Resources",
    icon: FiLayers,
  },
  {
    value: "Articles",
    label: "Articles",
    icon: FiBookOpen,
  },
  {
    value: "Guides",
    label: "Guides",
    icon: FiBookOpen,
  },
  {
    value: "Research",
    label: "Research",
    icon: FiBarChart2,
  },
];

/* =========================================================
   CATEGORIES

   These values are sent to Knowledge.jsx and then to
   KnowledgeResources.

   The UI label and filtering value are kept separate so
   the display can be changed without changing the filter.
========================================================= */

const categories = [
  {
    id: "career-development",
    title: "Career Development",
    value: "Career Development",
    count: "120+ resources",
    icon: FiBookOpen,
    theme: "blue",
  },
  {
    id: "leadership",
    title: "Leadership",
    value: "Leadership",
    count: "80+ resources",
    icon: FiUsers,
    theme: "green",
  },
  {
    id: "wellbeing",
    title: "Wellbeing",
    value: "Wellbeing",
    count: "90+ resources",
    icon: FiGlobe,
    theme: "purple",
  },
  {
    id: "skills-tools",
    title: "Skills & Tools",
    value: "Skills & Tools",
    count: "110+ resources",
    icon: FiSettings,
    theme: "amber",
  },
  {
    id: "industry-culture",
    title: "Industry & Culture",
    value: "Industry & Culture",
    count: "70+ resources",
    icon: FiUsers,
    theme: "rose",
  },
  {
    id: "research-insights",
    title: "Research & Insights",
    value: "Research & Insights",
    count: "150+ resources",
    icon: FiBarChart2,
    theme: "cyan",
  },
];

/* =========================================================
   DEFAULT FILTERS

   Used whenever this component needs to send a complete
   filter object to the parent.
========================================================= */

const DEFAULT_FILTERS = {
  query: "",
  resourceType: "All Resources",
  category: "All Categories",
  sortBy: "Most Relevant",
  level: "All Levels",
  duration: "Any Duration",
};

/* =========================================================
   COMPONENT
========================================================= */

const KnowledgeSearch = ({
  onSearch,
  onFilterChange,
  onPopularSelect,
  onCategorySelect,
  onViewAllCategories,
}) => {
  /* =======================================================
     SEARCH QUERY
  ======================================================= */

  const [searchQuery, setSearchQuery] = useState("");

  /* =======================================================
     RESOURCE TYPE DROPDOWN
  ======================================================= */

  const [resourceType, setResourceType] = useState("All Resources");

  const [isResourceDropdownOpen, setIsResourceDropdownOpen] = useState(false);

  /* =======================================================
     SELECTED POPULAR RESOURCE
  ======================================================= */

  const [selectedPopularResource, setSelectedPopularResource] = useState(null);

  /* =======================================================
     DROPDOWN REF
  ======================================================= */

  const resourceDropdownRef = useRef(null);

  /* =======================================================
     CLICK OUTSIDE DROPDOWN

     Clicking anywhere outside the dropdown closes it.
  ======================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resourceDropdownRef.current &&
        !resourceDropdownRef.current.contains(event.target)
      ) {
        setIsResourceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =======================================================
     CREATE COMPLETE FILTER OBJECT

     This guarantees that the parent always receives
     the same filter structure.
  ======================================================= */

  const createFilters = (overrides = {}) => {
    return {
      ...DEFAULT_FILTERS,

      query: searchQuery.trim(),

      resourceType,

      ...overrides,
    };
  };

  /* =======================================================
     SEND FILTER CHANGE

     Used for live filter changes.
  ======================================================= */

  const emitFilterChange = (filters) => {
    if (typeof onFilterChange === "function") {
      onFilterChange(filters);
    }
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    const searchData = createFilters();

    emitFilterChange(searchData);

    if (typeof onSearch === "function") {
      onSearch(searchData);
      return;
    }

    console.log("Knowledge search:", searchData);
  };

  /* =======================================================
     SEARCH INPUT CHANGE

     Search results update while typing.

     The Search button is still available for explicit
     search submission.
  ======================================================= */

  const handleSearchInputChange = (event) => {
    const value = event.target.value;

    setSearchQuery(value);

    const searchData = createFilters({
      query: value.trim(),
    });

    emitFilterChange(searchData);
  };

  /* =======================================================
     RESOURCE TYPE SELECT
  ======================================================= */

  const handleResourceTypeSelect = (type) => {
    setResourceType(type);

    setIsResourceDropdownOpen(false);

    const filterData = createFilters({
      resourceType: type,
    });

    emitFilterChange(filterData);

    /*
      Also notify the main search handler so the
      selected type behaves like a real filter.
    */

    if (typeof onSearch === "function") {
      onSearch(filterData);
    }
  };

  /* =======================================================
     POPULAR RESOURCE SELECT
  ======================================================= */

  const handlePopularSelect = (resource) => {
    setSelectedPopularResource(resource);

    /*
      Show the selected topic in the search box.

      For Learning Guides, the query stays empty because
      the real filter is "Guides".

      For other popular topics, their search term is used.
    */

    setSearchQuery(resource.searchQuery || "");

    setResourceType(resource.resourceType || "All Resources");

    const filterData = createFilters({
      query: resource.searchQuery || "",
      resourceType: resource.resourceType || "All Resources",
      category: "All Categories",
    });

    emitFilterChange(filterData);

    if (typeof onPopularSelect === "function") {
      onPopularSelect(filterData);
    }

    if (typeof onSearch === "function") {
      onSearch(filterData);
    }
  };

  /* =======================================================
     BACK TO POPULAR

     Returns the visual section to the original
     Popular Right Now state.

     It also clears the search filters so the learner
     returns to the full resource list.
  ======================================================= */

  const handleBackToPopular = () => {
    setSelectedPopularResource(null);

    setSearchQuery("");

    setResourceType("All Resources");

    const filterData = {
      ...DEFAULT_FILTERS,
    };

    emitFilterChange(filterData);

    if (typeof onSearch === "function") {
      onSearch(filterData);
    }
  };

  /* =======================================================
     CATEGORY SELECT
  ======================================================= */

  const handleCategorySelect = (category) => {
    const filterData = createFilters({
      query: "",
      category: category.value || category.title,
    });

    /*
      Clear search text because category selection
      should start a clean category search.
    */

    setSearchQuery("");

    emitFilterChange(filterData);

    if (typeof onCategorySelect === "function") {
      onCategorySelect(filterData);
      return;
    }

    console.log("Knowledge category selected:", filterData);
  };

  /* =======================================================
     VIEW ALL CATEGORIES
  ======================================================= */

  const handleViewAllCategories = () => {
    const filterData = createFilters({
      category: "All Categories",
    });

    emitFilterChange(filterData);

    if (typeof onViewAllCategories === "function") {
      onViewAllCategories();
      return;
    }

    console.log("View all Knowledge categories");
  };

  /* =======================================================
     FILTER POPULAR RESOURCES

     If the learner types into the search box while
     remaining on the Popular section, matching shortcuts
     are displayed.
  ======================================================= */

  const visiblePopularResources = useMemo(() => {
    if (!searchQuery.trim() || selectedPopularResource) {
      return popularResources;
    }

    const query = searchQuery.toLowerCase().trim();

    return popularResources.filter((resource) =>
      resource.label.toLowerCase().includes(query),
    );
  }, [searchQuery, selectedPopularResource]);

  return (
    <section className="knowledge-search">
      <div className="knowledge-search__container">
        {/* =================================================
            SEARCH AREA
        ================================================= */}

        <div className="knowledge-search__search-area">
          <div className="knowledge-search__search-heading">
            <span className="knowledge-search__search-eyebrow">
              FIND WHAT YOU NEED
            </span>

            <h2 className="knowledge-search__search-title">
              Explore the Knowledge Hub
            </h2>

            <p className="knowledge-search__search-description">
              Search through articles, guides, research, and other resources
              designed to support your learning journey.
            </p>
          </div>

          <form className="knowledge-search__form" onSubmit={handleSearch}>
            {/* =========================================
                SEARCH INPUT
            ========================================= */}

            <div className="knowledge-search__input-wrapper">
              <FiSearch
                className="knowledge-search__input-icon"
                aria-hidden="true"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search for articles, guides, research..."
                aria-label="Search Knowledge Hub"
              />

              {searchQuery && (
                <button
                  type="button"
                  className="knowledge-search__clear-button"
                  onClick={handleBackToPopular}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* =========================================
                RESOURCE TYPE DROPDOWN
            ========================================= */}

            <div
              className="knowledge-search__select-wrapper"
              ref={resourceDropdownRef}
            >
              <button
                type="button"
                className={`knowledge-search__select-trigger ${
                  isResourceDropdownOpen
                    ? "knowledge-search__select-trigger--open"
                    : ""
                }`}
                onClick={() =>
                  setIsResourceDropdownOpen((previous) => !previous)
                }
                aria-haspopup="listbox"
                aria-expanded={isResourceDropdownOpen}
              >
                <span className="knowledge-search__select-value">
                  {resourceType}
                </span>

                <FiChevronDown
                  className={`knowledge-search__select-icon ${
                    isResourceDropdownOpen
                      ? "knowledge-search__select-icon--open"
                      : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* =======================================
                  CUSTOM DROPDOWN
              ======================================= */}

              {isResourceDropdownOpen && (
                <div className="knowledge-search__dropdown" role="listbox">
                  <div className="knowledge-search__dropdown-header">
                    <span>RESOURCE TYPE</span>
                  </div>

                  <div className="knowledge-search__dropdown-list">
                    {resourceTypes.map((type) => {
                      const isActive = resourceType === type.value;

                      const TypeIcon = type.icon;

                      return (
                        <button
                          key={type.value}
                          type="button"
                          className={`knowledge-search__dropdown-option ${
                            isActive
                              ? "knowledge-search__dropdown-option--active"
                              : ""
                          }`}
                          onClick={() => handleResourceTypeSelect(type.value)}
                          role="option"
                          aria-selected={isActive}
                        >
                          <span className="knowledge-search__dropdown-option-content">
                            <span className="knowledge-search__dropdown-option-icon">
                              <TypeIcon aria-hidden="true" />
                            </span>

                            <span>{type.label}</span>
                          </span>

                          {isActive && (
                            <span className="knowledge-search__dropdown-check">
                              <FiCheck aria-hidden="true" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* =========================================
                SEARCH BUTTON
            ========================================= */}

            <button type="submit" className="knowledge-search__search-button">
              <FiSearch aria-hidden="true" />

              <span>Search</span>
            </button>
          </form>
        </div>

        {/* =================================================
            POPULAR RIGHT NOW

            DARK NAVY GLASSMORPHISM
        ================================================= */}

        <div className="knowledge-search__popular">
          <div className="knowledge-search__popular-glow knowledge-search__popular-glow--one" />

          <div className="knowledge-search__popular-glow knowledge-search__popular-glow--two" />

          {/* ===============================================
              NORMAL POPULAR STATE
          =============================================== */}

          {!selectedPopularResource && (
            <>
              <div className="knowledge-search__popular-header">
                <div>
                  <span className="knowledge-search__popular-eyebrow">
                    QUICK START
                  </span>

                  <h3 className="knowledge-search__popular-title">
                    Popular right now
                  </h3>
                </div>

                <div
                  className="knowledge-search__popular-icon"
                  aria-hidden="true"
                >
                  <FiTrendingIcon />
                </div>
              </div>

              <div className="knowledge-search__popular-list">
                {visiblePopularResources.length > 0 ? (
                  visiblePopularResources.map((resource) => {
                    const Icon = resource.icon;

                    return (
                      <button
                        key={resource.id}
                        type="button"
                        className="knowledge-search__popular-item"
                        onClick={() => handlePopularSelect(resource)}
                      >
                        <span className="knowledge-search__popular-item-icon">
                          <Icon aria-hidden="true" />
                        </span>

                        <span className="knowledge-search__popular-item-text">
                          {resource.label}
                        </span>

                        <FiArrowRight
                          className="knowledge-search__popular-item-arrow"
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })
                ) : (
                  <div className="knowledge-search__popular-empty">
                    No popular resources match your search.
                  </div>
                )}
              </div>
            </>
          )}

          {/* ===============================================
              SELECTED POPULAR RESOURCE
          =============================================== */}

          {selectedPopularResource && (
            <div className="knowledge-search__selected-resource">
              <button
                type="button"
                className="knowledge-search__back-button"
                onClick={handleBackToPopular}
              >
                <FiChevronLeft aria-hidden="true" />

                <span>Back to Popular</span>
              </button>

              <div className="knowledge-search__selected-content">
                <span className="knowledge-search__selected-icon">
                  {React.createElement(selectedPopularResource.icon, {
                    "aria-hidden": true,
                  })}
                </span>

                <div className="knowledge-search__selected-text">
                  <span className="knowledge-search__popular-eyebrow">
                    SELECTED RESOURCE
                  </span>

                  <h3 className="knowledge-search__selected-title">
                    {selectedPopularResource.label}
                  </h3>

                  <p className="knowledge-search__selected-description">
                    Explore curated knowledge and learning resources related to{" "}
                    {selectedPopularResource.label.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            BROWSE BY CATEGORY
        ================================================= */}

        <div className="knowledge-search__categories">
          <div className="knowledge-search__categories-header">
            <div>
              <span className="knowledge-search__categories-eyebrow">
                EXPLORE TOPICS
              </span>

              <h3 className="knowledge-search__categories-title">
                Browse by Category
              </h3>
            </div>

            <button
              type="button"
              className="knowledge-search__view-all"
              onClick={handleViewAllCategories}
            >
              <span>View all categories</span>

              <FiArrowRight aria-hidden="true" />
            </button>
          </div>

          <div className="knowledge-search__category-grid">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`knowledge-search__category knowledge-search__category--${category.theme}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <span className="knowledge-search__category-icon">
                    <Icon aria-hidden="true" />
                  </span>

                  <span className="knowledge-search__category-content">
                    <span className="knowledge-search__category-title">
                      {category.title}
                    </span>

                    <span className="knowledge-search__category-count">
                      {category.count}
                    </span>
                  </span>

                  <span className="knowledge-search__category-arrow">
                    <FiArrowRight aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   LOCAL TRENDING ICON

   Kept local so no additional icon package/component
   is required.
========================================================= */

const FiTrendingIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
};

export default KnowledgeSearch;
