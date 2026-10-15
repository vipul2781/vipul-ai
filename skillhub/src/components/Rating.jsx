import React from 'react';

const Rating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="d-flex align-items-center gap-1">
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="bi bi-star-fill"></i>
        ))}
        {hasHalf && <i className="bi bi-star-half"></i>}
        {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
          <i key={i} className="bi bi-star" style={{ opacity: 0.3 }}></i>
        ))}
      </div>
      <span className="rating-text">{rating}</span>
      {reviews !== undefined && (
        <span className="review-count">({reviews} reviews)</span>
      )}
    </div>
  );
};

export default Rating;
