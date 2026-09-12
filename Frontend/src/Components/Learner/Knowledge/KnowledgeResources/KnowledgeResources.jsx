// src/Components/Learner/Knowledge/KnowledgeResources/KnowledgeResources.jsx

import React, { useMemo, useState } from "react";

import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiBookmark,
  FiBookOpen,
  FiCheck,
  FiClock,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiHome,
  FiLayers,
  FiMap,
  FiSearch,
  FiThermometer,
  FiUser,
} from "react-icons/fi";

import { getKnowledgeResources } from "../../../../../data/mock/knowledge";

import "./KnowledgeResources.css";

/* =========================================================
   RESOURCE FILTER TABS
========================================================= */

const resourceFilters = [
  {
    id: "all",
    label: "All",
    value: "All Resources",
  },
  {
    id: "article",
    label: "Articles",
    value: "Articles",
  },
  {
    id: "guide",
    label: "Guides",
    value: "Guides",
  },
  {
    id: "research",
    label: "Research",
    value: "Research",
  },
];

/* =========================================================
   ICON MAP

   knowledge.js stores icon names as strings.

   Example:
   icon: "globe"

   This map converts that string into a React icon.
========================================================= */

const iconMap = {
  activity: FiActivity,
  "bar-chart": FiBarChart2,
  book: FiBookOpen,
  cpu: FiCpu,
  database: FiDatabase,
  globe: FiGlobe,
  home: FiHome,
  layers: FiLayers,
  map: FiMap,
  search: FiSearch,
  satellite: FiGlobe,
  thermometer: FiThermometer,
};

/* =========================================================
   RESOURCE TYPE LABELS
========================================================= */

const typeLabels = {
  article: "ARTICLE",
  guide: "GUIDE",
  research: "RESEARCH",
};

/* =========================================================
   DEFAULT FILTERS

   These values match the filters coming from
   Knowledge.jsx.
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
   NORMALIZE VALUE

   Makes searching case-insensitive and prevents
   small formatting differences from breaking filters.
========================================================= */

const normalize = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim();
};

/* =========================================================
   RESOURCE TYPE MATCH
========================================================= */

const matchesResourceType = (resource, resourceType) => {
  if (!resourceType || resourceType === "All Resources") {
    return true;
  }

  const currentType = normalize(resource.type);

  switch (resourceType) {
    case "Articles":
      return currentType === "article";

    case "Guides":
      return currentType === "guide";

    case "Research":
      return currentType === "research";

    default:
      return true;
  }
};

/* =========================================================
   CATEGORY MATCH
========================================================= */

const matchesCategory = (resource, category) => {
  if (!category || category === "All Categories") {
    return true;
  }

  const selectedCategory = normalize(category);

  const resourceCategory = normalize(resource.category);

  /*
    Exact category match first.

    Example:
    "Ocean Science"
    matches
    "Ocean Science"
  */

  if (resourceCategory === selectedCategory) {
    return true;
  }

  /*
    Partial matching allows a future category such as:

    "Research & Insights"

    to match resources containing "Research"
    in their category/tags.
  */

  const resourceTags = Array.isArray(resource.tags)
    ? resource.tags.map(normalize).join(" ")
    : "";

  const resourceText = [
    resource.title,
    resource.description,
    resource.category,
    resource.author,
    resource.type,
  ]
    .filter(Boolean)
    .map(normalize)
    .join(" ");

  return (
    resourceText.includes(selectedCategory) ||
    resourceTags.includes(selectedCategory)
  );
};

/* =========================================================
   SEARCH MATCH
========================================================= */

const matchesSearch = (resource, query) => {
  if (!query?.trim()) {
    return true;
  }

  const normalizedQuery = normalize(query);

  /*
    Search through the actual fields present in
    knowledge.js.
  */

  const searchableText = [
    resource.title,
    resource.description,
    resource.category,
    resource.level,
    resource.duration,
    resource.readTime,
    resource.author,
    resource.type,

    ...(Array.isArray(resource.tags) ? resource.tags : []),
  ]
    .filter(Boolean)
    .map(normalize)
    .join(" ");

  return searchableText.includes(normalizedQuery);
};

/* =========================================================
   LEVEL MATCH
========================================================= */

const matchesLevel = (resource, level) => {
  if (!level || level === "All Levels") {
    return true;
  }

  return normalize(resource.level) === normalize(level);
};

/* =========================================================
   DURATION PARSER

   knowledge.js contains values like:

   "8 min"
   "15 min"
   "30 min"
========================================================= */

const getDurationMinutes = (resource) => {
  const duration = String(resource.duration || "");

  const match = duration.match(/\d+/);

  if (!match) {
    return 0;
  }

  return Number(match[0]);
};

/* =========================================================
   DURATION MATCH
========================================================= */

const matchesDuration = (resource, duration) => {
  if (!duration || duration === "Any Duration") {
    return true;
  }

  const minutes = getDurationMinutes(resource);

  switch (duration) {
    case "Under 15 min":
      return minutes > 0 && minutes < 15;

    case "15 - 30 min":
      return minutes >= 15 && minutes <= 30;

    case "30 - 60 min":
      return minutes > 30 && minutes <= 60;

    case "60+ min":
      return minutes > 60;

    default:
      return true;
  }
};

/* =========================================================
   SORT RESOURCES

   Uses the actual `publishedAt` field from knowledge.js.
========================================================= */

const sortResources = (resources, sortBy) => {
  const sorted = [...resources];

  switch (sortBy) {
    case "Newest":
      return sorted.sort((a, b) => {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });

    case "Most Popular":
      /*
        Current knowledge.js does not contain a
        popularity/views field.

        Therefore we leave the original order
        unchanged instead of inventing popularity data.
      */

      return sorted;

    case "Highest Rated":
      /*
        Current knowledge.js does not contain ratings.

        Do not invent rating values.
      */

      return sorted;

    case "Most Relevant":
    default:
      /*
        Keep the original order supplied by knowledge.js.
      */

      return sorted;
  }
};

/* =========================================================
   COMPONENT
========================================================= */

const KnowledgeResources = ({
  filters = DEFAULT_FILTERS,
  onFilterChange,
  onResourceSelect,
  onViewAllResources,
}) => {
  /* =======================================================
     BOOKMARK STATE

     Local for now.

     Later this can be connected to an API.
  ======================================================= */

  const [bookmarkedResources, setBookmarkedResources] = useState([]);

  /* =======================================================
     ACTIVE FILTERS

     Merge incoming filters with defaults so the component
     remains safe even if some values are missing.
  ======================================================= */

  const activeFilters = {
    ...DEFAULT_FILTERS,
    ...(filters || {}),
  };

  /* =======================================================
     GET ALL RESOURCES

     knowledge.js remains the single source of truth.
  ======================================================= */

  const allResources = useMemo(() => {
    return getKnowledgeResources();
  }, []);

  /* =======================================================
     FILTER RESOURCES

     All filters are applied together.

     Example:

     Search = "ocean"
     Type   = "Research"

     Result:
     only research resources containing "ocean".
  ======================================================= */

  const resources = useMemo(() => {
    const filtered = allResources.filter((resource) => {
      return (
        matchesResourceType(resource, activeFilters.resourceType) &&
        matchesCategory(resource, activeFilters.category) &&
        matchesSearch(resource, activeFilters.query) &&
        matchesLevel(resource, activeFilters.level) &&
        matchesDuration(resource, activeFilters.duration)
      );
    });

    return sortResources(filtered, activeFilters.sortBy);
  }, [
    allResources,
    activeFilters.resourceType,
    activeFilters.category,
    activeFilters.query,
    activeFilters.level,
    activeFilters.duration,
    activeFilters.sortBy,
  ]);

  /* =======================================================
     ACTIVE FILTER TAB
  ======================================================= */

  const activeFilterId =
    resourceFilters.find(
      (filter) => filter.value === activeFilters.resourceType,
    )?.id || "all";

  /* =======================================================
     RESOURCE FILTER TAB

     Clicking Articles / Guides / Research changes the
     SAME filter state used by KnowledgeSearch.
  ======================================================= */

  const handleFilterChange = (filter) => {
    const nextFilters = {
      ...activeFilters,
      resourceType: filter.value,
    };

    if (typeof onFilterChange === "function") {
      onFilterChange(nextFilters);
    }
  };

  /* =======================================================
     VIEW ALL RESOURCES
  ======================================================= */

  const handleViewAll = () => {
    const resetFilters = {
      ...DEFAULT_FILTERS,
    };

    if (typeof onFilterChange === "function") {
      onFilterChange(resetFilters);
    }

    if (typeof onViewAllResources === "function") {
      onViewAllResources();
    }
  };

  /* =======================================================
     RESOURCE SELECT
  ======================================================= */

  const handleResourceSelect = (resource) => {
    if (typeof onResourceSelect === "function") {
      onResourceSelect(resource);

      return;
    }

    console.log("Open knowledge resource:", resource);
  };

  /* =======================================================
     BOOKMARK
  ======================================================= */

  const handleBookmark = (event, resourceId) => {
    /*
      Prevent the bookmark action from triggering
      any other card interaction.
    */

    event.stopPropagation();

    setBookmarkedResources((previous) => {
      if (previous.includes(resourceId)) {
        return previous.filter((id) => id !== resourceId);
      }

      return [...previous, resourceId];
    });
  };

  /* =======================================================
     CHECK BOOKMARK
  ======================================================= */

  const isBookmarked = (resourceId) => {
    return bookmarkedResources.includes(resourceId);
  };

  /* =======================================================
     ACTIVE FILTER INFORMATION
  ======================================================= */

  const hasSearchQuery = Boolean(activeFilters.query?.trim());

  const hasCategoryFilter = activeFilters.category !== "All Categories";

  const hasTypeFilter = activeFilters.resourceType !== "All Resources";

  const hasLevelFilter = activeFilters.level !== "All Levels";

  const hasDurationFilter = activeFilters.duration !== "Any Duration";

  const hasActiveFilters =
    hasSearchQuery ||
    hasCategoryFilter ||
    hasTypeFilter ||
    hasLevelFilter ||
    hasDurationFilter;

  /* =======================================================
     ACTIVE FILTER TEXT
  ======================================================= */

  const getActiveFilterText = () => {
    if (hasSearchQuery) {
      return `Results for "${activeFilters.query}"`;
    }

    if (hasCategoryFilter) {
      return `Category: ${activeFilters.category}`;
    }

    if (hasTypeFilter) {
      return `Type: ${activeFilters.resourceType}`;
    }

    if (hasLevelFilter) {
      return `Level: ${activeFilters.level}`;
    }

    if (hasDurationFilter) {
      return `Duration: ${activeFilters.duration}`;
    }

    return "Filtered resources";
  };

  return (
    <section className="knowledge-resources">
      <div className="knowledge-resources__container">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="knowledge-resources__header">
          <div className="knowledge-resources__heading">
            <span className="knowledge-resources__eyebrow">
              KNOWLEDGE LIBRARY
            </span>

            <div className="knowledge-resources__title-row">
              <h2 className="knowledge-resources__title">Latest Resources</h2>

              <span className="knowledge-resources__resource-count">
                {resources.length}{" "}
                {resources.length === 1 ? "resource" : "resources"}
              </span>
            </div>

            <p className="knowledge-resources__description">
              Explore recently added articles, practical guides, and research
              selected to support your learning journey.
            </p>
          </div>

          {/* =================================================
              RESOURCE FILTER TABS
          ================================================= */}

          <div
            className="knowledge-resources__filters"
            role="tablist"
            aria-label="Filter knowledge resources"
          >
            {resourceFilters.map((filter) => {
              const isActive = activeFilterId === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`knowledge-resources__filter ${
                    isActive ? "knowledge-resources__filter--active" : ""
                  }`}
                  onClick={() => handleFilterChange(filter)}
                  role="tab"
                  aria-selected={isActive}
                >
                  {isActive && (
                    <FiCheck
                      className="knowledge-resources__filter-check"
                      aria-hidden="true"
                    />
                  )}

                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================
            ACTIVE FILTER SUMMARY
        ================================================= */}

        {hasActiveFilters && (
          <div className="knowledge-resources__active-filter">
            <div className="knowledge-resources__active-filter-main">
              <FiSearch aria-hidden="true" />

              <span>{getActiveFilterText()}</span>
            </div>

            <span className="knowledge-resources__active-filter-count">
              {resources.length}
            </span>
          </div>
        )}

        {/* =================================================
            RESOURCE GRID
        ================================================= */}

        {resources.length > 0 ? (
          <div className="knowledge-resources__grid">
            {resources.map((resource) => {
              const ResourceIcon = iconMap[resource.icon] || FiBookOpen;

              const bookmarked = isBookmarked(resource.id);

              const hasImage =
                typeof resource.image === "string" &&
                resource.image.trim().length > 0;

              const isFeatured = Boolean(resource.featured);

              return (
                <article
                  key={resource.id}
                  className={`knowledge-resource-card ${
                    isFeatured ? "knowledge-resource-card--featured" : ""
                  } knowledge-resource-card--${resource.theme || "blue"}`}
                >
                  {/* =====================================
                        RESOURCE IMAGE
                    ===================================== */}

                  <div className="knowledge-resource-card__image">
                    {hasImage ? (
                      <img
                        src={resource.image}
                        alt={resource.title}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="knowledge-resource-card__image-placeholder"
                        aria-label="Resource image placeholder"
                      >
                        <div className="knowledge-resource-card__placeholder-shape knowledge-resource-card__placeholder-shape--one" />

                        <div className="knowledge-resource-card__placeholder-shape knowledge-resource-card__placeholder-shape--two" />

                        <span className="knowledge-resource-card__placeholder-icon">
                          <ResourceIcon aria-hidden="true" />
                        </span>

                        <span className="knowledge-resource-card__placeholder-label">
                          {typeLabels[resource.type] ||
                            String(resource.type || "RESOURCE").toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* ===================================
                          BOOKMARK BUTTON
                      =================================== */}

                    <button
                      type="button"
                      className={`knowledge-resource-card__bookmark ${
                        bookmarked
                          ? "knowledge-resource-card__bookmark--active"
                          : ""
                      }`}
                      onClick={(event) => handleBookmark(event, resource.id)}
                      aria-label={
                        bookmarked
                          ? `Remove ${resource.title} from bookmarks`
                          : `Bookmark ${resource.title}`
                      }
                      aria-pressed={bookmarked}
                    >
                      <FiBookmark aria-hidden="true" />
                    </button>
                  </div>

                  {/* =====================================
                        RESOURCE CONTENT
                    ===================================== */}

                  <div className="knowledge-resource-card__content">
                    {/* =================================
                          TYPE + FEATURED
                      ================================= */}

                    <div className="knowledge-resource-card__meta-top">
                      <span className="knowledge-resource-card__type">
                        {typeLabels[resource.type] ||
                          String(resource.type || "RESOURCE").toUpperCase()}
                      </span>

                      {isFeatured && (
                        <span className="knowledge-resource-card__featured">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* =================================
                          TITLE
                      ================================= */}

                    <h3 className="knowledge-resource-card__title">
                      {resource.title}
                    </h3>

                    {/* =================================
                          DESCRIPTION
                      ================================= */}

                    <p className="knowledge-resource-card__description">
                      {resource.description}
                    </p>

                    {/* =================================
                          CATEGORY
                      ================================= */}

                    <div className="knowledge-resource-card__category">
                      <ResourceIcon aria-hidden="true" />

                      <span>{resource.category}</span>
                    </div>

                    {/* =================================
                          AUTHOR + READING TIME
                      ================================= */}

                    <div className="knowledge-resource-card__details">
                      <div className="knowledge-resource-card__author">
                        <span className="knowledge-resource-card__author-icon">
                          <FiUser aria-hidden="true" />
                        </span>

                        <span className="knowledge-resource-card__author-name">
                          {resource.author}
                        </span>
                      </div>

                      <div className="knowledge-resource-card__reading-time">
                        <FiClock aria-hidden="true" />

                        <span>{resource.readTime}</span>
                      </div>
                    </div>

                    {/* =================================
                          FOOTER
                      ================================= */}

                    <div className="knowledge-resource-card__footer">
                      <div className="knowledge-resource-card__level">
                        <span>{resource.level}</span>
                      </div>

                      <button
                        type="button"
                        className="knowledge-resource-card__read-button"
                        onClick={() => handleResourceSelect(resource)}
                      >
                        <span>Read Resource</span>

                        <FiArrowRight aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* ===============================================
             EMPTY STATE
          =============================================== */

          <div className="knowledge-resources__empty">
            <span className="knowledge-resources__empty-icon">
              <FiSearch aria-hidden="true" />
            </span>

            <h3>No resources found</h3>

            <p>
              We couldn't find any resources matching your current search or
              filters.
            </p>

            <button
              type="button"
              className="knowledge-resources__empty-button"
              onClick={handleViewAll}
            >
              <span>View all resources</span>

              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        )}

        {/* =================================================
            VIEW ALL FOOTER
        ================================================= */}

        {resources.length > 0 && (
          <div className="knowledge-resources__bottom">
            <button
              type="button"
              className="knowledge-resources__view-all"
              onClick={handleViewAll}
            >
              <span>View all resources</span>

              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default KnowledgeResources;
