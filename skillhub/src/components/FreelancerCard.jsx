import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import SkillBadge from './SkillBadge';

const FreelancerCard = ({ freelancer, onToggleFavorite, isFavorite }) => {
  return (
    <div className="freelancer-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="profile-header">
            <img src={freelancer.image} alt={freelancer.name} className="profile-img" />
            <div className="profile-info">
              <h6>{freelancer.name}</h6>
              <p className="title mb-0">{freelancer.title}</p>
            </div>
          </div>
          <button
            className={`btn btn-sm ${isFavorite ? 'text-danger' : 'text-muted'}`}
            onClick={(e) => { e.preventDefault(); onToggleFavorite(freelancer.id, 'freelancer'); }}
            style={{ border: 'none', background: 'none', fontSize: '1.1rem' }}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
        </div>

        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="location">
            <i className="bi bi-geo-alt me-1"></i>{freelancer.location}
          </span>
          {freelancer.online ? (
            <span className="online-badge">Online</span>
          ) : (
            <span className="offline-badge">Offline</span>
          )}
        </div>

        <div className="rating-section">
          <Rating rating={freelancer.rating} reviews={freelancer.reviews} />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="hourly-rate">
            ₹{freelancer.hourlyRate.toLocaleString()}<span>/hr</span>
          </span>
          <span className="badge bg-light text-dark" style={{ fontSize: '0.75rem' }}>
            {freelancer.experience}
          </span>
        </div>

        <div className="skill-badges">
          {freelancer.skills.slice(0, 4).map((skill, i) => (
            <SkillBadge key={i} skill={skill} />
          ))}
          {freelancer.skills.length > 4 && (
            <span className="skill-badge" style={{ background: '#f1f5f9', color: '#64748b' }}>
              +{freelancer.skills.length - 4}
            </span>
          )}
        </div>

        <Link to={`/freelancers/${freelancer.id}`} className="btn btn-primary-custom w-100 mt-3">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default FreelancerCard;
