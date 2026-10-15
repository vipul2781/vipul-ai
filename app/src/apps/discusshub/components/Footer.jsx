import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-custom mt-auto">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="d-flex align-items-center justify-content-center text-white rounded-3"
                style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
              >
                <i className="bi bi-chat-square-text-fill"></i>
              </div>
              <span className="fs-4 fw-bold text-white">DiscussHub</span>
            </div>
            <p className="text-light-emphasis pe-lg-4 mb-3">
              "Ask. Discuss. Share. Learn."
            </p>
            <p className="small text-secondary mb-4">
              DiscussHub is a community-driven discussion forum and social knowledge-sharing platform where inquisitive minds connect and collaborate.
            </p>
            <div className="d-flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white" aria-label="X / Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2 text-white" aria-label="GitHub">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="footer-title">Explore</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/communities">Communities</Link></li>
              <li><Link to="/search?tab=popular">Popular Posts</Link></li>
              <li><Link to="/search?tab=recent">Recent Posts</Link></li>
              <li><Link to="/search">Global Search</Link></li>
              <li><Link to="/saved">Saved Discussions</Link></li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="footer-title">Community</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/create-community">Create Community</Link></li>
              <li><Link to="/create-post">Create Post</Link></li>
              <li><Link to="/moderation">Moderation Desk</Link></li>
              <li><Link to="/about">Community Guidelines</Link></li>
              <li><Link to="/about">About DiscussHub</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Support & Trust</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-3">
              <li><Link to="/about#mission">Help Center & FAQ</Link></li>
              <li><Link to="/about#how-it-works">How DiscussHub Works</Link></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: DiscussHub is a frontend demonstration app that respects privacy and stores dummy state in your browser."); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Be respectful, engage constructively, and share knowledge."); }}>Terms of Service</a></li>
            </ul>
            <div className="p-3 rounded-3 bg-dark border border-secondary border-opacity-25 small text-secondary">
              <i className="bi bi-shield-check text-success me-1"></i> 100% Frontend Powered • Zero Tracker Cookies
            </div>
          </div>
        </div>

        <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} DiscussHub Platform. Built with React &amp; Bootstrap 5.
          </p>
          <div className="d-flex gap-3">
            <span>Designed for passionate communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
