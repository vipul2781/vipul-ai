import React from 'react';

const FilterSidebar = ({
  filters,
  onFilterChange,
  onReset,
  onApply
}) => {
  const categories = [
    'Web Development',
    'Design',
    'Marketing',
    'Writing',
    'Video',
    'Mobile Development'
  ];

  const rateRanges = [
    { label: '₹0 – ₹500', min: 0, max: 500 },
    { label: '₹500 – ₹1,000', min: 500, max: 1000 },
    { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
    { label: '₹2,000+', min: 2000, max: 999999 }
  ];

  const experiences = ['Beginner', 'Intermediate', 'Expert'];
  const ratings = [
    { label: '4.5 & above', val: 4.5 },
    { label: '4.0 & above', val: 4.0 },
    { label: '3.5 & above', val: 3.5 }
  ];
  const availabilities = ['Available Now', 'Available This Week'];
  const languages = ['English', 'Hindi', 'Gujarati'];

  return (
    <div className="filter-sidebar shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold fs-6">
          <i className="bi bi-funnel me-2 text-primary-custom"></i>Filter Talent
        </h5>
        <button
          type="button"
          onClick={onReset}
          className="btn btn-sm btn-link text-decoration-none text-muted p-0"
        >
          Reset All
        </button>
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="form-label-custom d-block">Category</label>
        {categories.map((cat) => (
          <div className="form-check mb-1" key={cat}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`cat-${cat}`}
              checked={filters.categories.includes(cat)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filters.categories, cat]
                  : filters.categories.filter((c) => c !== cat);
                onFilterChange('categories', updated);
              }}
            />
            <label className="form-check-label" htmlFor={`cat-${cat}`}>
              {cat}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-divider"></div>

      {/* Hourly Rate */}
      <div className="mb-3">
        <label className="form-label-custom d-block">Hourly Rate</label>
        {rateRanges.map((range, idx) => (
          <div className="form-check mb-1" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              name="rateRange"
              id={`rate-${idx}`}
              checked={filters.rateIndex === idx}
              onChange={() => onFilterChange('rateIndex', idx)}
            />
            <label className="form-check-label" htmlFor={`rate-${idx}`}>
              {range.label}
            </label>
          </div>
        ))}
        {filters.rateIndex !== null && (
          <button
            type="button"
            className="btn btn-link text-danger btn-sm p-0 text-decoration-none mt-1"
            onClick={() => onFilterChange('rateIndex', null)}
          >
            Clear rate filter
          </button>
        )}
      </div>

      <div className="filter-divider"></div>

      {/* Experience */}
      <div className="mb-3">
        <label className="form-label-custom d-block">Experience Level</label>
        {experiences.map((exp) => (
          <div className="form-check mb-1" key={exp}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`exp-${exp}`}
              checked={filters.experiences.includes(exp)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filters.experiences, exp]
                  : filters.experiences.filter((item) => item !== exp);
                onFilterChange('experiences', updated);
              }}
            />
            <label className="form-check-label" htmlFor={`exp-${exp}`}>
              {exp}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-divider"></div>

      {/* Rating */}
      <div className="mb-3">
        <label className="form-label-custom d-block">Minimum Rating</label>
        {ratings.map((rate) => (
          <div className="form-check mb-1" key={rate.val}>
            <input
              className="form-check-input"
              type="radio"
              name="minRating"
              id={`rate-min-${rate.val}`}
              checked={filters.minRating === rate.val}
              onChange={() => onFilterChange('minRating', rate.val)}
            />
            <label className="form-check-label d-flex align-items-center" htmlFor={`rate-min-${rate.val}`}>
              <span className="text-warning me-1">★</span> {rate.label}
            </label>
          </div>
        ))}
        {filters.minRating !== null && (
          <button
            type="button"
            className="btn btn-link text-danger btn-sm p-0 text-decoration-none mt-1"
            onClick={() => onFilterChange('minRating', null)}
          >
            Clear rating filter
          </button>
        )}
      </div>

      <div className="filter-divider"></div>

      {/* Availability */}
      <div className="mb-3">
        <label className="form-label-custom d-block">Availability</label>
        {availabilities.map((avail) => (
          <div className="form-check mb-1" key={avail}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`avail-${avail}`}
              checked={filters.availabilities.includes(avail)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filters.availabilities, avail]
                  : filters.availabilities.filter((a) => a !== avail);
                onFilterChange('availabilities', updated);
              }}
            />
            <label className="form-check-label" htmlFor={`avail-${avail}`}>
              {avail}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-divider"></div>

      {/* Language */}
      <div className="mb-3">
        <label className="form-label-custom d-block">Language</label>
        {languages.map((lang) => (
          <div className="form-check mb-1" key={lang}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`lang-${lang}`}
              checked={filters.languages.includes(lang)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filters.languages, lang]
                  : filters.languages.filter((l) => l !== lang);
                onFilterChange('languages', updated);
              }}
            />
            <label className="form-check-label" htmlFor={`lang-${lang}`}>
              {lang}
            </label>
          </div>
        ))}
      </div>

      <div className="d-grid gap-2 mt-4">
        <button className="btn btn-primary-custom" onClick={onApply}>
          <i className="bi bi-check-lg me-1"></i> Apply Filters
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={onReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
