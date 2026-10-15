import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ServiceCard = ({ service, onToggleFavorite, isFavorite }) => {
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.title} />
        <div className="overlay"></div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); onToggleFavorite(service.id, 'service'); }}
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
      </div>
      <div className="card-body">
        <div className="freelancer-info">
          <img src={service.freelancerImage} alt={service.freelancerName} />
          <span>{service.freelancerName}</span>
          {service.freelancerLevel && (
            <span className="badge bg-primary-soft text-primary-custom ms-auto" style={{ fontSize: '0.7rem' }}>
              {service.freelancerLevel}
            </span>
          )}
        </div>
        <h6>{service.title}</h6>
        <Rating rating={service.rating} reviews={service.reviews} />
      </div>
      <div className="card-footer">
        <div className="price">
          Starting at <br /><strong>₹{service.packages ? service.packages.basic.price.toLocaleString() : '—'}</strong>
        </div>
        <Link to={`/services/${service.id}`} className="btn btn-sm btn-primary-custom">
          View Service
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
