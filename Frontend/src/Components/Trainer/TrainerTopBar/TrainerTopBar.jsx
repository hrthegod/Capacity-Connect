import React, { useEffect, useRef, useState } from "react";

import {
  LuMenu,
  LuSearch,
  LuX,
  LuBell,
  LuCircleHelp,
  LuChevronDown,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

import "./TrainerTopBar.css";

const TrainerTopBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
const userName = user.name || "Trainer";

  const profileRef = useRef(null);
  const searchInputRef = useRef(null);

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");

    /*
      Keep the cursor inside the search input
      after clearing the text.
    */
    searchInputRef.current?.focus();
  };

  /* =========================================================
     SIDEBAR TOGGLE
  ========================================================= */

  const handleMenuToggle = () => {
    /*
      This event will be connected to TrainerSidebar
      for responsive sidebar control.
    */
    window.dispatchEvent(new CustomEvent("trainer-sidebar-toggle"));
  };

  /* =========================================================
     PROFILE DROPDOWN
  ========================================================= */

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  /* =========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      /*
        Escape closes profile dropdown
      */
      if (event.key === "Escape") {
        setShowProfileMenu(false);

        /*
          If search contains text, Escape clears it.
        */
        if (searchValue) {
          setSearchValue("");
        }
      }

      /*
        Ctrl + K / Cmd + K focuses search
      */
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchValue]);

  return (
    <header className="trainer-topbar">
      {/* =====================================================
          LEFT SECTION
      ===================================================== */}

      <div className="trainer-topbar-left">
        {/* Sidebar Menu */}
        <button
          type="button"
          className="trainer-menu-button"
          onClick={handleMenuToggle}
          aria-label="Toggle trainer sidebar"
        >
          <LuMenu />
        </button>

        {/* =================================================
            SEARCH BAR
        ================================================= */}

        <div className="trainer-search">
          {/* Search Icon */}
          <div className="trainer-search-icon">
            <LuSearch />
          </div>

          {/* Search Input */}
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search learners, courses, quizzes..."
            aria-label="Search learners, courses and quizzes"
          />

          {/* =================================================
              CLEAR SEARCH BUTTON
          ================================================= */}

          {searchValue && (
            <button
              type="button"
              className="trainer-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <LuX />
            </button>
          )}

          {/* =================================================
              KEYBOARD SHORTCUT
          ================================================= */}

          {!searchValue && (
            <div className="trainer-search-shortcut">
              <span>⌘</span>
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <div className="trainer-topbar-right">
        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <button
          type="button"
          className="trainer-topbar-icon-button notification-button"
          aria-label="Notifications"
        >
          <LuBell />

          <span className="notification-count">3</span>
        </button>

        {/* =================================================
            HELP
        ================================================= */}

        <button
          type="button"
          className="trainer-topbar-icon-button"
          aria-label="Help and support"
        >
          <LuCircleHelp />
        </button>

        {/* Divider */}
        <div className="trainer-topbar-divider"></div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="trainer-profile-wrapper" ref={profileRef}>
          {/* Profile Button */}
          <button
            type="button"
            className={`trainer-profile ${
              showProfileMenu ? "profile-active" : ""
            }`}
            onClick={toggleProfileMenu}
            aria-expanded={showProfileMenu}
            aria-haspopup="menu"
            aria-label="Open trainer profile menu"
          >
            {/* Avatar */}
            <div className="trainer-avatar">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Trainer profile"
              />
            </div>

            {/* Trainer Information */}
            <div className="trainer-profile-info">
              <span className="trainer-profile-name">{userName}</span>

              <span className="trainer-profile-role">Trainer</span>
            </div>

            {/* Dropdown Arrow */}
            <LuChevronDown
              className={`trainer-profile-arrow ${
                showProfileMenu ? "arrow-up" : ""
              }`}
            />
          </button>

          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          {showProfileMenu && (
            <div className="trainer-profile-dropdown" role="menu">
              {/* Dropdown Header */}
              <div className="trainer-dropdown-header">
                <div className="trainer-dropdown-avatar">
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Trainer profile"
                  />
                </div>

                <div>
                  <strong>{userName}</strong>

                  <span>Trainer</span>
                </div>
              </div>

              {/* Divider */}
              <div className="trainer-dropdown-divider"></div>

              {/* My Profile */}
              <button
                type="button"
                className="trainer-dropdown-item"
                role="menuitem"
              >
                <LuUser />

                <span>My Profile</span>
              </button>

              {/* Settings */}
              <button
                type="button"
                className="trainer-dropdown-item"
                role="menuitem"
              >
                <LuSettings />

                <span>Settings</span>
              </button>

              {/* Divider */}
              <div className="trainer-dropdown-divider"></div>

              {/* Logout */}
              <button
                type="button"
                className="trainer-dropdown-item dropdown-logout"
                role="menuitem"
              >
                <LuLogOut />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TrainerTopBar;
