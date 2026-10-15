import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/communities?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <div className="d-flex align-items-center gap-3">
        <div
          className="rounded-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
          style={{
            width: '46px',
            height: '46px',
            backgroundColor: category.color || '#4F46E5',
            fontSize: '1.25rem'
          }}
        >
          <i className={`bi ${category.icon || 'bi-folder'}`}></i>
        </div>
        <div className="overflow-hidden">
          <h4 className="h6 fw-bold mb-1 text-dark text-truncate">{category.name}</h4>
          <p className="text-secondary small mb-1 text-truncate" style={{ fontSize: '0.8rem' }}>
            {category.description}
          </p>
          <span className="badge bg-light text-primary border border-primary-subtle rounded-pill py-0 px-2 small">
            {category.communityCount || 10}+ hubs
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
