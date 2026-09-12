import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBell,
  FiBookOpen,
  FiChevronRight,
  FiHelpCircle,
  FiHome,
  FiLock,
  FiSliders,
  FiSearch,
  FiSettings,
  FiShield,
  FiUser,
  FiX,
  FiCheck,
  FiInfo,
} from "react-icons/fi";

import "./SettingsHeader.css";

const SettingsHeader = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [activeCategory, setActiveCategory] = useState("account");

  const [searchValue, setSearchValue] = useState("");

  const [saved, setSaved] = useState(false);

  const [showHelp, setShowHelp] = useState(false);

  /* =========================================================
     SETTINGS CATEGORIES
  ========================================================= */

  const categories = [
    {
      id: "account",
      title: "Account",
      description: "Profile & account",
      icon: FiUser,
      theme: "navy",
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Email & alerts",
      icon: FiBell,
      theme: "orange",
    },
    {
      id: "privacy",
      title: "Privacy",
      description: "Data & visibility",
      icon: FiShield,
      theme: "green",
    },
    {
      id: "learning",
      title: "Learning",
      description: "Learning preferences",
      icon: FiBookOpen,
      theme: "purple",
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Theme & display",
      icon: FiSliders,
      theme: "pink",
    },
    {
      id: "security",
      title: "Security",
      description: "Password & security",
      icon: FiLock,
      theme: "cyan",
    },
  ];

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredCategories = categories.filter((category) => {
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  });

  /* =========================================================
     KEYBOARD SHORTCUT
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        const input = document.querySelector(".settings-header__search-input");

        input?.focus();
      }

      if (event.key === "Escape") {
        setSearchValue("");

        const input = document.querySelector(".settings-header__search-input");

        input?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  /* =========================================================
     CATEGORY CLICK
  ========================================================= */

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);

    /*
      The actual Settings page can later listen to this
      selected section and render the appropriate content.
    */
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="settings-header">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="settings-header__background settings-header__background--one"
        aria-hidden="true"
      />

      <div
        className="settings-header__background settings-header__background--two"
        aria-hidden="true"
      />

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="settings-header__top">
        {/* Breadcrumb */}

        <nav className="settings-header__breadcrumb" aria-label="Breadcrumb">
          <button
            type="button"
            className="settings-header__breadcrumb-home"
            onClick={() => {
              window.location.href = "/learner/dashboard";
            }}
            aria-label="Go to dashboard"
          >
            <FiHome aria-hidden="true" />
          </button>

          <FiChevronRight
            className="settings-header__breadcrumb-arrow"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={() => {
              window.location.href = "/learner/dashboard";
            }}
          >
            Dashboard
          </button>

          <FiChevronRight
            className="settings-header__breadcrumb-arrow"
            aria-hidden="true"
          />

          <span>Settings</span>
        </nav>

        {/* Header actions */}

        <div className="settings-header__top-actions">
          <button
            type="button"
            className="settings-header__help-button"
            onClick={() => setShowHelp(true)}
          >
            <FiHelpCircle aria-hidden="true" />
            <span>Help &amp; Support</span>
          </button>

          <button
            type="button"
            className={`settings-header__save-button ${
              saved ? "is-saved" : ""
            }`}
            onClick={handleSave}
          >
            {saved ? (
              <FiCheck aria-hidden="true" />
            ) : (
              <FiSettings aria-hidden="true" />
            )}

            <span>{saved ? "Saved" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* =====================================================
          MAIN INTRO
      ===================================================== */}

      <div className="settings-header__intro">
        <div className="settings-header__intro-content">
          <div className="settings-header__title-icon">
            <FiSettings aria-hidden="true" />
          </div>

          <div>
            <h1>Settings</h1>

            <p>
              Customize your experience, manage your preferences, and keep your
              account secure.
            </p>
          </div>
        </div>

        {/* Search */}

        <div className="settings-header__search-wrapper">
          <FiSearch
            className="settings-header__search-icon"
            aria-hidden="true"
          />

          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search settings..."
            className="settings-header__search-input"
            aria-label="Search settings"
          />

          {searchValue && (
            <button
              type="button"
              className="settings-header__search-clear"
              onClick={() => setSearchValue("")}
              aria-label="Clear search"
            >
              <FiX aria-hidden="true" />
            </button>
          )}

          <div className="settings-header__shortcut">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          DECORATIVE QUOTE
      ===================================================== */}

      <div className="settings-header__quote" aria-hidden="true">
        <span>Small Changes</span>
        <span>Make a Better</span>
        <span>You</span>

        <svg viewBox="0 0 115 45" role="presentation">
          <path
            d="M4 34C28 39 66 25 108 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          <path
            d="M91 7L108 6L99 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* =====================================================
          LIGHTHOUSE SCENE
      ===================================================== */}

      <div className="settings-header__scene" aria-hidden="true">
        <div className="settings-header__sun" />

        <div className="settings-header__cloud settings-header__cloud--one" />
        <div className="settings-header__cloud settings-header__cloud--two" />

        <div className="settings-header__mountain settings-header__mountain--one" />
        <div className="settings-header__mountain settings-header__mountain--two" />

        <div className="settings-header__water">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="settings-header__cliff">
          <div className="settings-header__lighthouse">
            <div className="settings-header__lighthouse-light" />
            <div className="settings-header__lighthouse-top" />
            <div className="settings-header__lighthouse-body" />
            <div className="settings-header__lighthouse-window" />
          </div>
        </div>

        <div className="settings-header__bird settings-header__bird--one">
          ~
        </div>

        <div className="settings-header__bird settings-header__bird--two">
          ~
        </div>
      </div>

      {/* =====================================================
          CATEGORY CARDS
      ===================================================== */}

      <div
        className={`settings-header__categories ${
          filteredCategories.length === 0 ? "is-empty" : ""
        }`}
      >
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => {
            const Icon = category.icon;

            const isActive = activeCategory === category.id;

            return (
              <button
                type="button"
                key={category.id}
                className={`
                  settings-header__category
                  settings-header__category--${category.theme}
                  ${isActive ? "is-active" : ""}
                `}
                onClick={() => handleCategoryClick(category.id)}
                aria-pressed={isActive}
              >
                <div className="settings-header__category-icon">
                  <Icon aria-hidden="true" />
                </div>

                <div className="settings-header__category-content">
                  <strong>{category.title}</strong>

                  <span>{category.description}</span>
                </div>

                <FiChevronRight
                  className="settings-header__category-arrow"
                  aria-hidden="true"
                />

                {isActive && <span className="settings-header__active-line" />}
              </button>
            );
          })
        ) : (
          <div className="settings-header__empty">
            <FiSearch aria-hidden="true" />

            <div>
              <strong>No settings found</strong>
              <span>Try searching for another setting.</span>
            </div>

            <button type="button" onClick={() => setSearchValue("")}>
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* =====================================================
          TIP BANNER
      ===================================================== */}

      <div className="settings-header__tip">
        <div className="settings-header__tip-icon">
          <FiInfo aria-hidden="true" />
        </div>

        <div className="settings-header__tip-label">
          <strong>Tip</strong>
        </div>

        <div className="settings-header__tip-divider" />

        <p>
          Review your settings regularly to keep your account secure and
          personalized.
        </p>

        <button
          type="button"
          className="settings-header__tip-link"
          onClick={() => {
            setActiveCategory("learning");

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <span>Your Learning Journey, Your Way</span>

          <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      {/* =====================================================
          HELP MODAL
      ===================================================== */}

      {showHelp && (
        <div
          className="settings-header__modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowHelp(false);
            }
          }}
        >
          <div
            className="settings-header__help-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-help-title"
          >
            <button
              type="button"
              className="settings-header__modal-close"
              onClick={() => setShowHelp(false)}
              aria-label="Close help"
            >
              <FiX aria-hidden="true" />
            </button>

            <div className="settings-header__modal-icon">
              <FiHelpCircle aria-hidden="true" />
            </div>

            <h2 id="settings-help-title">Need help with Settings?</h2>

            <p>
              Choose a settings category above or search for the preference you
              want to update.
            </p>

            <div className="settings-header__modal-actions">
              <button type="button" onClick={() => setShowHelp(false)}>
                Got it
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowHelp(false);

                  window.location.href = "/learner/dashboard";
                }}
              >
                Go to Dashboard
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SettingsHeader;
