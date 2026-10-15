import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/freelancers?category=${category.name}`} className="text-decoration-none">
      <div className="category-card">
        <div className="icon-wrapper">
          <i className={`bi ${category.icon}`}></i>
        </div>
        <h5>{category.name}</h5>
        <p className="freelancer-count">{category.freelancers.toLocaleString()} freelancers</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
