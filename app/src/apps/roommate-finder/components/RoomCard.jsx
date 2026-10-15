import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const RoomCard = ({ room }) => {
  const { favoriteRoomIds, toggleFavoriteRoom } = useApp();
  const isFavorite = favoriteRoomIds.includes(room.id);

  // Format currency
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
      return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="card modern-card h-100 position-relative">
        {/* Card Image Area */}
        <div className="card-img-wrapper">
          <img
            src={room.images && room.images.length > 0 ? room.images[0] : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'}
            alt={room.title}
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="position-absolute top-0 start-0 m-3 d-flex flex-wrap gap-1">
            <span className="badge bg-primary-custom rounded-pill px-3 py-1 shadow-sm">
              {room.roomType}
            </span>
            <span className="badge bg-dark bg-opacity-75 rounded-pill px-3 py-1 shadow-sm">
              {room.furnished}
            </span>
          </div>

          {/* Favorite Heart Button */}
          <div className="position-absolute top-0 end-0 m-3">
            <button
              className={`fav-btn ${isFavorite ? 'is-fav' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavoriteRoom(room.id);
              }}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              aria-label="Toggle favorite"
            >
              <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
            </button>
          </div>

          {/* City Pill */}
          <div className="position-absolute bottom-0 start-0 m-3">
            <span className="glass-badge">
              <i className="bi bi-geo-alt-fill text-warning me-1"></i>
              {room.city}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-baseline mb-2">
              <div className="price-tag">
                {formatINR(room.rent)}
                <span className="text-secondary fw-normal fs-6">/month</span>
              </div>
              {room.rating && (
                <div className="small fw-bold text-dark d-flex align-items-center gap-1">
                  <i className="bi bi-star-fill text-warning"></i>
                  <span>{room.rating}</span>
                  <span className="text-secondary fw-normal">({room.reviewsCount})</span>
                </div>
              )}
            </div>

            <h5 className="card-title text-truncate-2 mb-2" style={{ minHeight: '3.1rem', fontSize: '1.05rem', lineHeight: '1.4' }}>
              <Link to={`/rooms/${room.id}`} className="text-decoration-none text-dark hover-primary">
                {room.title}
              </Link>
            </h5>

            <p className="text-secondary small mb-3 d-flex align-items-center gap-1">
              <i className="bi bi-pin-map text-primary-custom"></i>
              <span className="text-truncate">{room.location}</span>
            </p>

            {/* Key specs badge row */}
            <div className="d-flex align-items-center gap-3 text-secondary small py-2 border-top border-bottom border-light-subtle mb-3">
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-door-closed fs-6 text-primary-custom"></i>
                <span>{room.bedrooms} Bed</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-droplet fs-6 text-primary-custom"></i>
                <span>{room.bathrooms} Bath</span>
              </div>
              <div className="d-flex align-items-center gap-1 text-truncate">
                <i className="bi bi-calendar-event fs-6 text-primary-custom"></i>
                <span>Avail: {formatDate(room.availableDate)}</span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="d-flex align-items-center justify-content-between mt-1 pt-2">
            <span className="badge bg-light text-secondary border px-2.5 py-1.5 rounded-pill">
              {room.propertyType}
            </span>
            <Link to={`/rooms/${room.id}`} className="btn btn-outline-custom btn-sm rounded-pill px-3 py-1.5">
              View Details <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
