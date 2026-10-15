import React from 'react';
import { Link } from 'react-router-dom';

const Tag = ({ name, onRemove = null, clickable = true }) => {
  if (onRemove) {
    return (
      <span className="badge bg-light text-primary border border-primary-subtle d-inline-flex align-items-center gap-1 py-1 px-2 me-1 mb-1 rounded-pill">
        <span>#{name}</span>
        <button
          type="button"
          className="btn-close btn-close-white ms-1"
          style={{ width: '0.45rem', height: '0.45rem', filter: 'invert(0.5)' }}
          aria-label="Remove"
          onClick={() => onRemove(name)}
        ></button>
      </span>
    );
  }

  if (clickable) {
    return (
      <Link
        to={`/search?q=${encodeURIComponent(name)}`}
        className="badge bg-light text-secondary border border-light-subtle py-1 px-2 me-1 mb-1 rounded-pill text-decoration-none fw-medium"
        style={{ fontSize: '0.78rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        #{name}
      </Link>
    );
  }

  return (
    <span
      className="badge bg-light text-secondary border border-light-subtle py-1 px-2 me-1 mb-1 rounded-pill fw-medium"
      style={{ fontSize: '0.78rem' }}
    >
      #{name}
    </span>
  );
};

export default Tag;
