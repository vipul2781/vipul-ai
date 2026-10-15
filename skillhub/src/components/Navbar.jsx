import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ favoritesCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar navbar-expand-lg navbar-custom sticky-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand navbar-brand-custom" to="/">
          Skill<span>Hub</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${isActive('/')}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${isActive('/freelancers')}`} to="/freelancers">Find Freelancers</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${isActive('/projects')}`} to="/projects">Browse Projects</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${isActive('/services')}`} to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${isActive('/about')}`} to="/about">How It Works</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            <Link to="/favorites" className="btn btn-light btn-sm position-relative" title="Favorites">
              <i className="bi bi-heart"></i>
              {favoritesCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link to="/messages" className="btn btn-light btn-sm d-none d-md-inline-flex" title="Messages">
              <i className="bi bi-chat-dots"></i>
            </Link>
            <Link to="/dashboard" className="btn btn-light btn-sm d-none d-md-inline-flex">
              <i className="bi bi-person me-1"></i> Dashboard
            </Link>
            <Link to="/post-project" className="btn btn-post-project ms-1">
              <i className="bi bi-plus-circle me-1"></i> Post a Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
