import React from 'react';

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search discussions, communities, or topics...",
  onSubmit,
  className = "",
  size = "lg"
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-100 ${className}`}>
      <div className="hero-search-box d-flex align-items-center">
        <i className="bi bi-search text-muted fs-5 me-2"></i>
        <input
          type="search"
          className="form-control border-0 shadow-none bg-transparent ps-1"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontSize: size === 'lg' ? '1.05rem' : '0.95rem' }}
        />
        {value && (
          <button
            type="button"
            className="btn btn-sm btn-link text-muted me-1 p-0"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <i className="bi bi-x-circle-fill"></i>
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary-custom px-4 py-2 rounded-pill flex-shrink-0"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
