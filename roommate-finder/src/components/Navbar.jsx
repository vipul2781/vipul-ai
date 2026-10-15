import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [navCollapsed, setNavCollapsed] = useState(true);
  const { favoriteRoomIds, favoriteHousemateIds, openModal } = useApp();
  const navigate = useNavigate();

  const totalFavorites = favoriteRoomIds.length + favoriteHousemateIds.length;

  const handleLinkClick = () => {
    setNavCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-decoration-none" to="/" onClick={handleLinkClick}>
          <div className="d-inline-flex align-items-center justify-content-center bg-primary-custom text-white rounded-3 p-2 shadow-sm" style={{ width: '38px', height: '38px' }}>
            <i className="bi bi-houses-fill fs-5"></i>
          </div>
          <span className="ms-2 fs-4 fw-extrabold tracking-tight">
            Room<span className="text-primary-custom">Mate</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none px-2"
          type="button"
          aria-expanded={!navCollapsed}
          aria-label="Toggle navigation"
          onClick={() => setNavCollapsed(!navCollapsed)}
        >
          <i className={`bi ${navCollapsed ? 'bi-list' : 'bi-x'} fs-2 text-dark`}></i>
        </button>

        {/* Collapsible Content */}
        <div className={`collapse navbar-collapse ${!navCollapsed ? 'show mt-3 mt-lg-0' : ''}`} id="navbarMain">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-2">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/" end onClick={handleLinkClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/rooms" onClick={handleLinkClick}>
                Find Rooms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/housemates" onClick={handleLinkClick}>
                Housemates
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/post-room" onClick={handleLinkClick}>
                Post a Room
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/about" onClick={handleLinkClick}>
                About
              </NavLink>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* Favorites Icon */}
            <Link
              to="/favorites"
              className="btn btn-light position-relative rounded-pill px-3 py-2 border shadow-xs d-flex align-items-center gap-1 text-decoration-none me-1"
              title="Saved Favorites"
              onClick={handleLinkClick}
            >
              <i className="bi bi-heart-fill text-danger fs-6"></i>
              <span className="small fw-semibold d-none d-sm-inline text-secondary">Saved</span>
              {totalFavorites > 0 && (
                <span className="badge bg-danger rounded-pill ms-1 font-monospace" style={{ fontSize: '0.7rem' }}>
                  {totalFavorites}
                </span>
              )}
            </Link>

            {/* Login Button */}
            <button
              className="btn btn-outline-secondary rounded-pill px-3 py-2 fw-semibold border-0"
              onClick={() => openModal('auth-login', 'Welcome Back', 'Login')}
            >
              Log in
            </button>

            {/* Sign Up Button */}
            <button
              className="btn btn-primary-custom rounded-pill px-3 py-2 fw-semibold"
              onClick={() => openModal('auth-signup', 'Join RoomMate Today', 'Sign Up')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
