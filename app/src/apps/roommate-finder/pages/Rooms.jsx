import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import FilterSidebar from '../components/FilterSidebar';

const Rooms = () => {
  const { rooms } = useApp();
  const [searchParams] = useSearchParams();

  // Filters State
  const [filters, setFilters] = useState({
    city: '',
    maxRent: 50000,
    roomType: '',
    propertyType: '',
    furnished: '',
    genderPreference: '',
    bedrooms: '',
    searchQuery: ''
  });

  const [sortOption, setSortOption] = useState('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL query parameters if present
  useEffect(() => {
    const urlCity = searchParams.get('city');
    const urlBudget = searchParams.get('budget');

    setFilters((prev) => {
      let maxRent = prev.maxRent;
      if (urlBudget === 'under-10000') maxRent = 10000;
      else if (urlBudget === '10000-20000') maxRent = 20000;
      else if (urlBudget === '20000-30000') maxRent = 30000;

      return {
        ...prev,
        city: urlCity || prev.city,
        maxRent: maxRent
      };
    });
  }, [searchParams]);

  // Handle Reset Filters
  const handleResetFilters = () => {
    setFilters({
      city: '',
      maxRent: 50000,
      roomType: '',
      propertyType: '',
      furnished: '',
      genderPreference: '',
      bedrooms: '',
      searchQuery: ''
    });
    setSortOption('recommended');
  };

  // Filtered & Sorted Rooms calculation
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = room.title.toLowerCase().includes(query);
        const matchesLocation = room.location.toLowerCase().includes(query);
        const matchesCity = room.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesCity) return false;
      }

      // City
      if (filters.city && room.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Max Rent
      if (room.rent > filters.maxRent) {
        return false;
      }

      // Room Type
      if (filters.roomType && room.roomType !== filters.roomType) {
        return false;
      }

      // Property Type
      if (filters.propertyType && room.propertyType !== filters.propertyType) {
        return false;
      }

      // Furnishing
      if (filters.furnished && room.furnished !== filters.furnished) {
        return false;
      }

      // Gender Preference
      if (filters.genderPreference && filters.genderPreference !== 'Any') {
        if (room.genderPreference !== filters.genderPreference && room.genderPreference !== 'Any') {
          return false;
        }
      }

      // Bedrooms
      if (filters.bedrooms) {
        const beds = parseInt(filters.bedrooms, 10);
        if (beds === 4) {
          if (room.bedrooms < 4) return false;
        } else {
          if (room.bedrooms !== beds) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') {
        return a.rent - b.rent;
      }
      if (sortOption === 'price-high') {
        return b.rent - a.rent;
      }
      if (sortOption === 'newest') {
        return new Date(b.availableDate) - new Date(a.availableDate);
      }
      // 'recommended' or default
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.rating || 0) - (a.rating || 0);
    });
  }, [rooms, filters, sortOption]);

  return (
    <div className="rooms-page py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh' }}>
      <div className="container">
        {/* Header Breadcrumb & Title */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Explore Available Rooms & Flats</h2>
          <p className="text-secondary mb-0">
            Browse verified rooms, apartments, and co-living spaces tailored to your comfort and budget.
          </p>
        </div>

        {/* Search Bar & Mobile Filter Trigger */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="row g-2 align-items-center">
            <div className="col-lg-7 col-md-6 col-12">
              <div className="input-group">
                <span className="input-group-text bg-light border-0 ps-3">
                  <i className="bi bi-search text-secondary"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search by neighborhood, city, or landmark (e.g. Koramangala, SG Highway)..."
                  className="form-control border-0 bg-light py-2 shadow-none"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                />
                {filters.searchQuery && (
                  <button
                    className="btn btn-light border-0 text-secondary"
                    type="button"
                    onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>
            </div>

            <div className="col-lg-5 col-md-6 col-12 d-flex justify-content-md-end align-items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                type="button"
                className="btn btn-outline-secondary d-lg-none rounded-3 py-2 flex-grow-1"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              >
                <i className="bi bi-funnel me-1"></i> {mobileFilterOpen ? 'Hide Filters' : 'Filters'}
              </button>

              {/* Sort Dropdown */}
              <div className="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0">
                <span className="small text-secondary text-nowrap d-none d-sm-inline">Sort by:</span>
                <select
                  className="form-select form-select-sm rounded-3 shadow-none py-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  style={{ minWidth: '170px' }}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Available</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="row g-4">
          {/* Left Sidebar Filters */}
          <div className={`col-lg-3 ${mobileFilterOpen ? 'd-block mb-3' : 'd-none d-lg-block'}`}>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              resultCount={filteredRooms.length}
            />
          </div>

          {/* Right Listings Grid */}
          <div className="col-lg-9">
            {/* Header info */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-semibold text-secondary small">
                Showing <span className="text-dark fw-bold">{filteredRooms.length}</span> verified room{filteredRooms.length === 1 ? '' : 's'}
                {filters.city && <span> in <span className="text-primary-custom fw-bold">{filters.city}</span></span>}
              </span>

              {/* Active Filter Chips */}
              {(filters.city || filters.roomType || filters.furnished || filters.propertyType || filters.bedrooms || filters.searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="btn btn-link text-danger text-decoration-none p-0 small fw-semibold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Grid */}
            {filteredRooms.length > 0 ? (
              <div className="row g-4">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="card modern-card p-5 text-center my-4 bg-white">
                <div className="bg-light rounded-circle p-4 mx-auto mb-3" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-search fs-1 text-secondary"></i>
                </div>
                <h4 className="fw-bold mb-2">No rooms match your filters</h4>
                <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '420px' }}>
                  We couldn't find any rooms matching your selected parameters. Try widening your budget or clearing some filters.
                </p>
                <div>
                  <button
                    onClick={handleResetFilters}
                    className="btn btn-primary-custom rounded-pill px-4"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
