import React from 'react';

const ReviewCard = ({ review }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i key={i} className={`bi ${i <= review.rating ? 'bi-star-fill' : 'bi-star'}`} style={{ color: i <= review.rating ? '#F59E0B' : '#E2E8F0', fontSize: '0.85rem' }}></i>
    );
  }

  return (
    <div className="review-card">
      <div className="d-flex align-items-center gap-3 mb-2">
        <img src={review.clientImage} alt={review.clientName} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <h6 className="mb-0" style={{ fontSize: '0.925rem', fontWeight: 600 }}>{review.clientName}</h6>
          <div className="d-flex align-items-center gap-2">
            <div>{stars}</div>
            <small className="text-muted">{review.date}</small>
          </div>
        </div>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
        "{review.review}"
      </p>
    </div>
  );
};

export default ReviewCard;
