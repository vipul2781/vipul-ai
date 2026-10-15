import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HousemateCard = ({ housemate }) => {
  const { favoriteHousemateIds, toggleFavoriteHousemate, openModal } = useApp();
  const isFavorite = favoriteHousemateIds.includes(housemate.id);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="card modern-card h-100 p-4 d-flex flex-column justify-content-between position-relative">
        {/* Favorite Button */}
        <div className="position-absolute top-0 end-0 m-3">
          <button
            className={`fav-btn ${isFavorite ? 'is-fav' : ''}`}
            onClick={() => toggleFavoriteHousemate(housemate.id)}
            title={isFavorite ? 'Saved housemate' : 'Save housemate'}
            aria-label="Save profile"
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
        </div>

        {/* Profile Header */}
        <div>
          <div className="text-center mb-3">
            <div className="housemate-avatar-wrapper mb-3">
              <img
                src={housemate.avatar}
                alt={housemate.name}
                loading="lazy"
              />
              <span className="compatibility-badge" title="Overall compatibility match">
                {housemate.compatibility}% Match
              </span>
            </div>

            <h5 className="fw-bold mb-1">
              <Link to={`/housemates/${housemate.id}`} className="text-decoration-none text-dark hover-primary">
                {housemate.name}, {housemate.age}
              </Link>
            </h5>
            <div className="text-primary-custom fw-semibold small mb-1">
              {housemate.occupation}
            </div>
            <div className="text-secondary small d-flex align-items-center justify-content-center gap-1">
              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span>{housemate.location}</span>
            </div>
          </div>

          {/* Quick Stats: Budget & Move-in */}
          <div className="bg-light rounded-3 p-2.5 mb-3 d-flex justify-content-around text-center border">
            <div>
              <span className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Monthly Budget</span>
              <span className="fw-bold text-dark">{formatINR(housemate.budget)}</span>
            </div>
            <div className="vr my-1 opacity-25"></div>
            <div>
              <span className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>Move-in By</span>
              <span className="fw-bold text-dark">{formatDate(housemate.moveInDate)}</span>
            </div>
          </div>

          {/* Short Bio */}
          <p className="text-secondary small mb-3 text-truncate-2" style={{ minHeight: '2.5rem' }}>
            {housemate.bio}
          </p>

          {/* Lifestyle Tags */}
          <div className="d-flex flex-wrap gap-1.5 mb-3">
            {housemate.lifestyleTags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="lifestyle-chip">
                <i className="bi bi-check2"></i>
                {tag}
              </span>
            ))}
            {housemate.lifestyleTags.length > 3 && (
              <span className="badge bg-light text-secondary border rounded-pill d-inline-flex align-items-center">
                +{housemate.lifestyleTags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 pt-3 border-top mt-2">
          <Link
            to={`/housemates/${housemate.id}`}
            className="btn btn-outline-secondary btn-sm rounded-pill flex-grow-1 py-2 fw-semibold"
          >
            View Profile
          </Link>
          <button
            type="button"
            className="btn btn-primary-custom btn-sm rounded-pill flex-grow-1 py-2 fw-semibold"
            onClick={() => openModal('connect', 'Connect with Housemate', housemate.name, housemate)}
          >
            <i className="bi bi-chat-dots-fill me-1"></i> Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default HousemateCard;
