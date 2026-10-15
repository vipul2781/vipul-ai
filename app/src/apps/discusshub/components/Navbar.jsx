import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useForum } from '../context/ForumContext';

const Navbar = () => {
  const { currentUser, notifications, savedPostIds } = useForum();
  const [navSearch, setNavSearch] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;
  const savedCount = savedPostIds.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setIsNavOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center text-white rounded-3 shadow-sm"
            style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
          >
            <i className="bi bi-chat-square-text-fill fs-5"></i>
          </div>
          <div>
            <span className="brand-gradient fs-4 fw-bold">DiscussHub</span>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 p-2 shadow-none"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-2 text-dark"></i>
        </button>

        {/* Navbar Links and Actions */}
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-1">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link nav-link-custom" onClick={() => setIsNavOpen(false)}>
                <i className="bi bi-house me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/communities" className="nav-link nav-link-custom" onClick={() => setIsNavOpen(false)}>
                <i className="bi bi-grid me-1"></i> Communities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search?tab=popular" className="nav-link nav-link-custom" onClick={() => setIsNavOpen(false)}>
                <i className="bi bi-fire me-1"></i> Popular
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search?tab=recent" className="nav-link nav-link-custom" onClick={() => setIsNavOpen(false)}>
                <i className="bi bi-clock me-1"></i> Recent
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/moderation" className="nav-link nav-link-custom text-warning" onClick={() => setIsNavOpen(false)}>
                <i className="bi bi-shield-check me-1"></i> Moderation
              </NavLink>
            </li>
          </ul>

          {/* Quick Search Bar */}
          <form
            className="nav-search-form"
            onSubmit={handleSearchSubmit}
          >
            <div className="input-group nav-search-group">
              <span className="input-group-text nav-search-icon">
                <i className="bi bi-search"></i>
              </span>

              <input
                className="form-control nav-search-input"
                type="search"
                placeholder="Search DiscussHub..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                aria-label="Search DiscussHub"
              />
            </div>
          </form>

          {/* Action Icons & Profile */}
          <div className="d-flex align-items-center gap-2 mb-2 mb-lg-0">
            {/* Notifications with badge */}
            <Link
              to="/notifications"
              className="btn btn-light position-relative rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              title="Notifications"
              onClick={() => setIsNavOpen(false)}
            >
              <i className="bi bi-bell fs-5 text-secondary"></i>
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Saved with badge */}
            <Link
              to="/saved"
              className="btn btn-light position-relative rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              title="Saved Posts"
              onClick={() => setIsNavOpen(false)}
            >
              <i className="bi bi-bookmark fs-5 text-secondary"></i>
              {savedCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.7rem' }}>
                  {savedCount}
                </span>
              )}
            </Link>

            {/* User Profile */}
            <Link
              to={`/profile/${currentUser.id}`}
              className="d-flex align-items-center text-decoration-none mx-1"
              title="My Profile"
              onClick={() => setIsNavOpen(false)}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="avatar-img rounded-circle border"
                style={{ width: '38px', height: '38px', objectFit: 'cover' }}
              />
            </Link>

            {/* Create Post Button */}
            <Link
              to="/create-post"
              className="btn btn-primary-custom d-flex align-items-center gap-1 shadow-sm"
              onClick={() => setIsNavOpen(false)}
            >
              <i className="bi bi-plus-lg fw-bold"></i>
              <span>Create Post</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
