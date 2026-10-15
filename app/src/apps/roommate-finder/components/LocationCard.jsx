import React from 'react';
import { useNavigate } from 'react-router-dom';

const LocationCard = ({ location }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/rooms?city=${encodeURIComponent(location.name)}`);
  };

  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="location-card" onClick={handleExplore}>
        <img src={location.image} alt={location.name} loading="lazy" />
        <div className="overlay">
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <span className="badge bg-primary-custom text-white mb-2 px-2.5 py-1 rounded-pill small">
                {location.roomCount} Rooms Available
              </span>
              <h4 className="text-white fw-bold mb-1">{location.name}</h4>
              <p className="text-white-50 small mb-0">
                {location.popularAreas.slice(0, 3).join(' • ')}
              </p>
            </div>
            <button
              className="btn btn-sm btn-light rounded-pill px-3 py-1.5 fw-semibold shadow-sm text-dark d-flex align-items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleExplore();
              }}
            >
              Explore <i className="bi bi-chevron-right fs-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
