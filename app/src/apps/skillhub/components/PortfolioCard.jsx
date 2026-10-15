import React from 'react';

const PortfolioCard = ({ item }) => {
  return (
    <div className="portfolio-card" style={{ overflow: 'hidden', borderRadius: '16px' }}>
      <img src={item.image} alt={item.title} />
      <div className="portfolio-overlay">
        <span className="badge bg-light text-dark mb-1" style={{ fontSize: '0.7rem' }}>{item.category}</span>
        <h6>{item.title}</h6>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
