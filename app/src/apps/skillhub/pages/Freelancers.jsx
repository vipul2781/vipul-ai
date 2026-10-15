import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FreelancerCard from '../components/FreelancerCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';

const rateRanges = [
  { min: 0, max: 500 },
  { min: 500, max: 1000 },
  { min: 1000, max: 2000 },
  { min: 2000, max: 999999 }
];

const Freelancers = ({
  freelancers,
  favorites,
  toggleFavorite
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [sortOption, setSortOption] = useState('Recommended');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const initialFilters = {
    categories: initialCategory ? [initialCategory] : [],
    rateIndex: null,
    experiences: [],
    minRating: null,
    availabilities: [],
    languages: []
  };

  const [filters, setFilters] = useState(initialFilters);

  // Sync when query params change
  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    if (cat) {
      setFilters((prev) => ({ ...prev, categories: [cat] }));
    }
    if (q) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      rateIndex: null,
      experiences: [],
      minRating: null,
      availabilities: [],
      languages: []
    });
    setSearchTerm('');
    setSearchParams({});
  };

  const filteredFreelancers = useMemo(() => {
    return freelancers.filter((f) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(term);
        const matchesTitle = f.title.toLowerCase().includes(term);
        const matchesSkills = f.skills.some((s) => s.toLowerCase().includes(term));
        const matchesLocation = f.location.toLowerCase().includes(term);
        if (!matchesName && !matchesTitle && !matchesSkills && !matchesLocation) {
          return false;
        }
      }

      // Category
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(f.category)) {
          return false;
        }
      }

      // Hourly Rate
      if (filters.rateIndex !== null) {
        const range = rateRanges[filters.rateIndex];
        if (f.hourlyRate < range.min || f.hourlyRate > range.max) {
          return false;
        }
      }

      // Experience
      if (filters.experiences.length > 0) {
        if (!filters.experiences.includes(f.experience)) {
          return false;
        }
      }

      // Min Rating
      if (filters.minRating !== null) {
        if (f.rating < filters.minRating) {
          return false;
        }
      }

      // Availability
      if (filters.availabilities.length > 0) {
        if (!filters.availabilities.includes(f.availability)) {
          return false;
        }
      }

      // Language
      if (filters.languages.length > 0) {
        const hasLang = filters.languages.some((l) => f.languages.includes(l));
        if (!hasLang) {
          return false;
        }
      }

      return true;
    });
  }, [freelancers, searchTerm, filters]);

  // Sorting
  const sortedFreelancers = useMemo(() => {
    const list = [...filteredFreelancers];
    switch (sortOption) {
      case 'Highest Rated':
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case 'Lowest Hourly Rate':
        return list.sort((a, b) => a.hourlyRate - b.hourlyRate);
      case 'Highest Hourly Rate':
        return list.sort((a, b) => b.hourlyRate - a.hourlyRate);
      case 'Most Experienced': {
        const order = { Expert: 3, Intermediate: 2, Beginner: 1 };
        return list.sort((a, b) => (order[b.experience] || 0) - (order[a.experience] || 0));
      }
      case 'Recommended':
      default:
        return list.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filteredFreelancers, sortOption]);

  return (
    <div className="freelancers-page pb-5">
      {/* Page Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><a href="/" className="text-white opacity-75">Home</a></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Freelancers</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-2">Discover Top Freelancers</h1>
          <p className="opacity-75 mb-0" style={{ maxWidth: '600px' }}>
            Find trusted, skilled professionals for web development, design, marketing, mobile apps, and more.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* Mobile Filter Toggle Button */}
          <div className="col-12 d-lg-none">
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowMobileFilter(!showMobileFilter)}
              >
                <i className="bi bi-funnel"></i>
                {showMobileFilter ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>

          {/* Left Sidebar Filter */}
          <div className={`col-lg-3 col-12 ${showMobileFilter ? 'd-block' : 'd-none d-lg-block'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              onApply={() => setShowMobileFilter(false)}
            />
          </div>

          {/* Results Main Section */}
          <div className="col-lg-9 col-12">
            {/* Search & Sort Controls */}
            <div className="card border rounded-3 p-3 mb-4 shadow-sm bg-white">
              <div className="row g-3 align-items-center">
                <div className="col-md-7 col-12">
                  <SearchBar
                    placeholder="Search by name, skills, title, or city..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                  />
                </div>
                <div className="col-md-5 col-12">
                  <div className="d-flex align-items-center justify-content-md-end gap-2">
                    <label className="text-muted small fw-semibold text-nowrap">Sort by:</label>
                    <select
                      className="form-select form-select-sm form-select-custom w-auto"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="Recommended">Recommended</option>
                      <option value="Highest Rated">Highest Rated</option>
                      <option value="Lowest Hourly Rate">Lowest Hourly Rate</option>
                      <option value="Highest Hourly Rate">Highest Hourly Rate</option>
                      <option value="Most Experienced">Most Experienced</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">
                Showing <strong>{sortedFreelancers.length}</strong> freelancers found
              </span>
              {(filters.categories.length > 0 || filters.rateIndex !== null || filters.minRating || searchTerm) && (
                <button
                  onClick={handleResetFilters}
                  className="btn btn-link btn-sm text-danger text-decoration-none p-0"
                >
                  <i className="bi bi-x-circle me-1"></i>Clear all filters
                </button>
              )}
            </div>

            {/* Freelancer Grid */}
            {sortedFreelancers.length === 0 ? (
              <div className="empty-state card border-0 bg-white rounded-4 shadow-sm">
                <i className="bi bi-search"></i>
                <h5 className="fw-bold">No Freelancers Found</h5>
                <p className="text-muted">
                  We couldn't find any freelancers matching your active filters or keywords.
                </p>
                <button className="btn btn-primary-custom mx-auto" onClick={handleResetFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {sortedFreelancers.map((freelancer) => (
                  <div className="col-xl-4 col-md-6 col-12" key={freelancer.id}>
                    <FreelancerCard
                      freelancer={freelancer}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.freelancers.includes(freelancer.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelancers;
