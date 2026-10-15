import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5>
              <span style={{ color: '#818CF8' }}>Skill</span>Hub
            </h5>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '300px' }}>
              Find the right talent. Get work done. Connect with talented professionals and grow your business.
            </p>
            <div className="social-links">
              <a href="#!"><i className="bi bi-facebook"></i></a>
              <a href="#!"><i className="bi bi-twitter-x"></i></a>
              <a href="#!"><i className="bi bi-linkedin"></i></a>
              <a href="#!"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h5>For Clients</h5>
            <ul>
              <li><Link to="/freelancers">Find Freelancers</Link></li>
              <li><Link to="/post-project">Post a Project</Link></li>
              <li><Link to="/services">Browse Services</Link></li>
              <li><Link to="/projects">Browse Projects</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h5>For Freelancers</h5>
            <ul>
              <li><Link to="/projects">Find Projects</Link></li>
              <li><Link to="/post-service">Create Service</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/messages">Messages</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#!">Careers</a></li>
              <li><a href="#!">Blog</a></li>
              <li><a href="#!">Press</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Support</h5>
            <ul>
              <li><a href="#!">Help Center</a></li>
              <li><a href="#!">Privacy Policy</a></li>
              <li><a href="#!">Terms of Service</a></li>
              <li><a href="#!">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-0">© 2026 SkillHub. All rights reserved.</p>
          <p className="mb-0" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            Made with <i className="bi bi-heart-fill" style={{ color: '#EF4444' }}></i> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
