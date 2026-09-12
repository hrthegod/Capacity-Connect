import React, { useEffect, useRef, useState } from "react";

import {
  LuArchive,
  LuBookOpen,
  LuCheck,
  LuChevronDown,
  LuFileText,
  LuFilter,
  LuGrid2X2,
  LuInfo,
  LuList,
  LuRotateCcw,
  LuSearch,
  LuSlidersHorizontal,
  LuTag,
  LuTrash2,
  LuUpload,
  LuUsersRound,
} from "react-icons/lu";

import "./CourseFilters.css";

const CourseFilters = ({
  searchValue = "",
  category = "All Categories",
  status = "All Status",
  sortValue = "Newest",
  viewMode = "grid",

  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onViewChange,
  onResetFilters,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const categoryRef = useRef(null);
  const statusRef = useRef(null);
  const sortRef = useRef(null);
  const bulkRef = useRef(null);

  /* ==========================================================
     FILTER OPTIONS
  ========================================================== */

  const categories = [
    "All Categories",
    "Web Development",
    "Programming",
    "Data Science",
    "Design",
    "Cloud Computing",
    "Marketing",
    "Artificial Intelligence",
    "Mobile Development",
  ];

  const statuses = ["All Status", "Published", "Drafts", "Archived"];

  const sortOptions = [
    "Newest",
    "Oldest",
    "Name: A → Z",
    "Name: Z → A",
    "Most Learners",
    "Highest Progress",
  ];

  const statusTabs = [
    {
      id: "all",
      label: "All Courses",
      count: 24,
      icon: LuFileText,
      variant: "blue",
      value: "All Status",
    },
    {
      id: "published",
      label: "Published",
      count: 18,
      icon: LuCheck,
      variant: "mint",
      value: "Published",
    },
    {
      id: "drafts",
      label: "Drafts",
      count: 4,
      icon: LuFileText,
      variant: "peach",
      value: "Drafts",
    },
    {
      id: "archived",
      label: "Archived",
      count: 2,
      icon: LuArchive,
      variant: "lavender",
      value: "Archived",
    },
  ];

  /* ==========================================================
     OUTSIDE CLICK
  ========================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const refs = [categoryRef, statusRef, sortRef, bulkRef];

      const clickedInside = refs.some(
        (ref) => ref.current && ref.current.contains(event.target),
      );

      if (!clickedInside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* ==========================================================
     KEYBOARD SHORTCUTS
  ========================================================== */

  useEffect(() => {
    const handleKeyboardShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        const searchInput = document.querySelector(
          ".course-filter-search-input",
        );

        if (searchInput) {
          searchInput.focus();
        }
      }

      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, []);

  /* ==========================================================
     DROPDOWN
  ========================================================== */

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((previous) => (previous === dropdown ? null : dropdown));
  };

  /* ==========================================================
     SEARCH
  ========================================================== */

  const handleSearchChange = (event) => {
    const value = event.target.value;

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  /* ==========================================================
     CATEGORY
  ========================================================== */

  const handleCategorySelect = (value) => {
    if (onCategoryChange) {
      onCategoryChange(value);
    }

    setOpenDropdown(null);
  };

  /* ==========================================================
     STATUS
  ========================================================== */

  const handleStatusSelect = (value) => {
    if (onStatusChange) {
      onStatusChange(value);
    }

    setOpenDropdown(null);
  };

  /* ==========================================================
     SORT
  ========================================================== */

  const handleSortSelect = (value) => {
    if (onSortChange) {
      onSortChange(value);
    }

    setOpenDropdown(null);
  };

  /* ==========================================================
     STATUS TABS
  ========================================================== */

  const handleStatusTab = (selectedStatus) => {
    const selectedTab = statusTabs.find((tab) => tab.id === selectedStatus);

    if (!selectedTab) {
      return;
    }

    if (onStatusChange) {
      onStatusChange(selectedTab.value);
    }

    setOpenDropdown(null);
  };

  /* ==========================================================
     VIEW MODE
  ========================================================== */

  const handleViewChange = (mode) => {
    if (onViewChange) {
      onViewChange(mode);
    }
  };

  /* ==========================================================
     RESET
  ========================================================== */

  const handleResetFilters = () => {
    setOpenDropdown(null);

    if (onResetFilters) {
      onResetFilters();
    }
  };

  /* ==========================================================
     APPLY

     Filtering is already live because the parent receives
     every change immediately.

     Apply simply closes the dropdown for now.
  ========================================================== */

  const handleApplyFilters = () => {
    setOpenDropdown(null);
  };

  /* ==========================================================
     BULK ACTION
  ========================================================== */

  const handleBulkAction = (action) => {
    setOpenDropdown(null);

    window.dispatchEvent(
      new CustomEvent("trainer-courses-bulk-action", {
        detail: {
          action,
        },
      }),
    );
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section className="course-filters" aria-labelledby="course-filters-title">
      {/* ========================================================
          FILTER HEADER
      ======================================================== */}

      <div className="course-filters-top">
        <div className="course-filters-heading">
          <div className="course-filters-heading-icon">
            <LuSlidersHorizontal size={19} strokeWidth={1.7} />
          </div>

          <div>
            <span className="course-filters-eyebrow">MANAGE COURSES</span>

            <h2 id="course-filters-title">Find &amp; Filter Courses</h2>

            <p>Search, filter and sort to quickly find your courses.</p>
          </div>
        </div>

        {/* ======================================================
            TOP ACTIONS
        ====================================================== */}

        <div className="course-filter-top-actions">
          {/* Tip */}

          <button
            type="button"
            className="course-filter-tip"
            onClick={() =>
              window.alert(
                "Use filters to quickly find and manage your courses more efficiently.",
              )
            }
          >
            <span className="course-filter-tip-icon">
              <LuInfo size={17} strokeWidth={1.7} />
            </span>

            <span className="course-filter-tip-content">
              <strong>Tip for you</strong>

              <span>
                Use filters to quickly find and manage your courses more
                efficiently.
              </span>
            </span>

            <span className="course-filter-tip-arrow">→</span>
          </button>

          {/* Bulk Actions */}

          <div className="course-bulk-wrapper" ref={bulkRef}>
            <button
              type="button"
              className={`course-bulk-button ${
                openDropdown === "bulk" ? "active" : ""
              }`}
              onClick={() => toggleDropdown("bulk")}
              aria-expanded={openDropdown === "bulk"}
              aria-haspopup="menu"
            >
              <LuBookOpen size={16} strokeWidth={1.7} />

              <span>Bulk Actions</span>

              <LuChevronDown
                size={14}
                strokeWidth={1.8}
                className={
                  openDropdown === "bulk"
                    ? "filter-chevron rotate"
                    : "filter-chevron"
                }
              />
            </button>

            {openDropdown === "bulk" && (
              <div className="course-filter-dropdown bulk-menu" role="menu">
                <div className="filter-dropdown-title">Bulk actions</div>

                <button
                  type="button"
                  onClick={() => handleBulkAction("Publish Selected")}
                >
                  <LuUpload size={14} strokeWidth={1.8} />

                  <span>Publish Selected</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleBulkAction("Archive Selected")}
                >
                  <LuArchive size={14} strokeWidth={1.8} />

                  <span>Archive Selected</span>
                </button>

                <button
                  type="button"
                  className="bulk-danger"
                  onClick={() => handleBulkAction("Delete Selected")}
                >
                  <LuTrash2 size={14} strokeWidth={1.8} />

                  <span>Delete Selected</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          FILTER CONTROLS
      ======================================================== */}

      <div className="course-filter-controls">
        {/* ======================================================
            SEARCH
        ====================================================== */}

        <div className="course-filter-search">
          <LuSearch
            className="course-filter-search-icon"
            size={18}
            strokeWidth={1.7}
          />

          <input
            type="search"
            className="course-filter-search-input"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search courses by title, description or keywords..."
            aria-label="Search courses"
          />

          <div className="course-filter-shortcut">
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </div>
        </div>

        {/* ======================================================
            CATEGORY
        ====================================================== */}

        <div className="course-filter-select-wrapper" ref={categoryRef}>
          <button
            type="button"
            className={`course-filter-select ${
              openDropdown === "category" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("category")}
            aria-expanded={openDropdown === "category"}
            aria-haspopup="menu"
          >
            <LuGrid2X2 size={16} strokeWidth={1.7} />

            <span>{category}</span>

            <LuChevronDown
              size={14}
              strokeWidth={1.8}
              className={
                openDropdown === "category"
                  ? "filter-chevron rotate"
                  : "filter-chevron"
              }
            />
          </button>

          {openDropdown === "category" && (
            <div className="course-filter-dropdown" role="menu">
              <div className="filter-dropdown-title">Course category</div>

              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={category === item ? "selected" : ""}
                  onClick={() => handleCategorySelect(item)}
                >
                  <span>{item}</span>

                  {category === item && <LuCheck size={14} strokeWidth={2} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ======================================================
            STATUS
        ====================================================== */}

        <div className="course-filter-select-wrapper" ref={statusRef}>
          <button
            type="button"
            className={`course-filter-select ${
              openDropdown === "status" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("status")}
            aria-expanded={openDropdown === "status"}
            aria-haspopup="menu"
          >
            <LuTag size={16} strokeWidth={1.7} />

            <span>{status}</span>

            <LuChevronDown
              size={14}
              strokeWidth={1.8}
              className={
                openDropdown === "status"
                  ? "filter-chevron rotate"
                  : "filter-chevron"
              }
            />
          </button>

          {openDropdown === "status" && (
            <div className="course-filter-dropdown" role="menu">
              <div className="filter-dropdown-title">Course status</div>

              {statuses.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={status === item ? "selected" : ""}
                  onClick={() => handleStatusSelect(item)}
                >
                  <span>{item}</span>

                  {status === item && <LuCheck size={14} strokeWidth={2} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ======================================================
            SORT
        ====================================================== */}

        <div className="course-filter-select-wrapper" ref={sortRef}>
          <button
            type="button"
            className={`course-filter-select ${
              openDropdown === "sort" ? "active" : ""
            }`}
            onClick={() => toggleDropdown("sort")}
            aria-expanded={openDropdown === "sort"}
            aria-haspopup="menu"
          >
            <LuUsersRound size={16} strokeWidth={1.7} />

            <span>
              Sort by: <strong>{sortValue}</strong>
            </span>

            <LuChevronDown
              size={14}
              strokeWidth={1.8}
              className={
                openDropdown === "sort"
                  ? "filter-chevron rotate"
                  : "filter-chevron"
              }
            />
          </button>

          {openDropdown === "sort" && (
            <div className="course-filter-dropdown sort-menu" role="menu">
              <div className="filter-dropdown-title">Sort courses</div>

              {sortOptions.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={sortValue === item ? "selected" : ""}
                  onClick={() => handleSortSelect(item)}
                >
                  <span>{item}</span>

                  {sortValue === item && <LuCheck size={14} strokeWidth={2} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ======================================================
            VIEW SWITCH
        ====================================================== */}

        <div className="course-view-switch">
          <button
            type="button"
            className={`course-view-button ${
              viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => handleViewChange("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            title="Grid view"
          >
            <LuGrid2X2 size={16} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className={`course-view-button ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => handleViewChange("list")}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            title="List view"
          >
            <LuList size={17} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* ========================================================
          STATUS TABS + ACTIONS
      ======================================================== */}

      <div className="course-filter-bottom">
        <div className="course-status-tabs">
          {statusTabs.map((tab) => {
            const Icon = tab.icon;

            const isActive = status === tab.value;

            return (
              <button
                type="button"
                key={tab.id}
                className={`course-status-tab ${tab.variant} ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleStatusTab(tab.id)}
                aria-pressed={isActive}
              >
                <span className="course-status-icon">
                  <Icon size={14} strokeWidth={1.8} />
                </span>

                <span className="course-status-label">{tab.label}</span>

                <span className="course-status-count">{tab.count}</span>
              </button>
            );
          })}
        </div>

        <div className="course-filter-actions">
          <button
            type="button"
            className="course-reset-button"
            onClick={handleResetFilters}
          >
            <LuRotateCcw size={15} strokeWidth={1.8} />

            <span>Reset Filters</span>
          </button>

          <button
            type="button"
            className="course-apply-button"
            onClick={handleApplyFilters}
          >
            <LuFilter size={15} strokeWidth={1.9} />

            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseFilters;
