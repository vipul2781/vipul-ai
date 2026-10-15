import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { showToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    showToast('Subscribed to RoomMate newsletter successfully!', 'success', 'bi-envelope-check-fill');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="text-white text-decoration-none d-flex align-items-center gap-2 mb-3">
              <div className="bg-primary-custom text-white rounded-3 p-2 d-inline-flex" style={{ width: '36px', height: '36px', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-houses-fill fs-5"></i>
              </div>
              <span className="fs-4 fw-bold">
                Room<span className="text-primary-custom">Mate</span>
              </span>
            </Link>
            <p className="text-light-emphasis pe-lg-4">
              Find your perfect room and housemate. Seamless, verified, and community-driven flatmate discovery across India's top metropolitan hubs.
            </p>
            <div className="d-flex align-items-center gap-2 mt-4">
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook" onClick={(e) => { e.preventDefault(); showToast('Redirecting to Facebook...', 'info'); }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram" onClick={(e) => { e.preventDefault(); showToast('Redirecting to Instagram...', 'info'); }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter/X" onClick={(e) => { e.preventDefault(); showToast('Redirecting to X (Twitter)...', 'info'); }}>
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#linkedin" className="social-icon-btn" aria-label="LinkedIn" onClick={(e) => { e.preventDefault(); showToast('Redirecting to LinkedIn...', 'info'); }}>
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6>Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/rooms">Find Rooms</Link></li>
              <li><Link to="/housemates">Housemates</Link></li>
              <li><Link to="/post-room">Post a Room</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6>Support</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#help" onClick={(e) => { e.preventDefault(); showToast('Help Center is 24/7 online', 'info'); }}>Help Center</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); showToast('Contact support: support@roommate.in', 'info'); }}>Contact</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy details', 'info'); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service details', 'info'); }}>Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6>Stay Updated</h6>
            <p className="small text-light-emphasis">Get fresh room listings and tenant guides right into your inbox every week.</p>
            <form onSubmit={handleSubscribe} className="d-flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="form-control bg-dark border-secondary text-white rounded-3 shadow-none px-3"
              />
              <button type="submit" className="btn btn-primary-custom px-3">
                <i className="bi bi-send-fill"></i>
              </button>
            </form>
            <div className="mt-3 text-secondary small d-flex align-items-center gap-2">
              <i className="bi bi-shield-check text-success"></i>
              <span>No spam, guaranteed unsubscribe at any time.</span>
            </div>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-secondary small">
          <div>
            &copy; {new Date().getFullYear()} RoomMate Technologies India Pvt. Ltd. All rights reserved.
          </div>
          <div className="d-flex gap-3">
            <span>Made with <i className="bi bi-heart-fill text-danger mx-1"></i> for flat-hunters</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
