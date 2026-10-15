import React from 'react';

const FilterSidebar = ({ filters, setFilters, onReset, resultCount }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaxRentChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      maxRent: Number(e.target.value)
    }));
  };

  return (
    <div className="card modern-card p-4 filter-card-sticky">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-funnel-fill text-primary-custom"></i> Filter Rooms
        </h5>
        <button
          type="button"
          className="btn btn-link text-secondary text-decoration-none p-0 small fw-semibold"
          onClick={onReset}
        >
          Reset All
        </button>
      </div>

      <div className="d-flex flex-column gap-3.5">
        {/* Location / City */}
        <div>
          <label className="form-label small fw-bold text-dark mb-1">City / Location</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none"
            name="city"
            value={filters.city}
            onChange={handleChange}
          >
            <option value="">All Indian Cities</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi NCR</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        {/* Max Rent Slider */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label small fw-bold text-dark mb-0">Max Monthly Rent</label>
            <span className="badge bg-primary-light text-primary-custom fw-bold">
              ₹{filters.maxRent.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            className="form-range"
            min="5000"
            max="50000"
            step="1000"
            value={filters.maxRent}
            onChange={handleMaxRentChange}
          />
          <div className="d-flex justify-content-between text-secondary" style={{ fontSize: '0.72rem' }}>
            <span>₹5,000</span>
            <span>₹50,000</span>
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="form-label small fw-bold text-dark mb-1">Room Type</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none"
            name="roomType"
            value={filters.roomType}
            onChange={handleChange}
          >
            <option value="">Any Room Type</option>
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
            <option value="Studio">Studio</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="form-label small fw-bold text-dark mb-1">Property Type</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none"
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
          >
            <option value="">Any Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Flat">Flat</option>
            <option value="House">House / Bungalow</option>
            <option value="PG">PG (Paying Guest)</option>
          </select>
        </div>

        {/* Furnished Status */}
        <div>
          <label className="form-label small fw-bold text-dark mb-1">Furnishing</label>
          <div className="d-flex flex-column gap-1">
            {['', 'Furnished', 'Semi Furnished', 'Unfurnished'].map((opt) => (
              <label key={opt} className="form-check-label d-flex align-items-center gap-2 small cursor-pointer py-1">
                <input
                  type="radio"
                  className="form-check-input mt-0 shadow-none"
                  name="furnished"
                  value={opt}
                  checked={filters.furnished === opt}
                  onChange={handleChange}
                />
                <span>{opt === '' ? 'All' : opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender Preference */}
        <div>
          <label className="form-label small fw-bold text-dark mb-1">Gender Preference</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none"
            name="genderPreference"
            value={filters.genderPreference}
            onChange={handleChange}
          >
            <option value="">Any Gender</option>
            <option value="Female Only">Female Only</option>
            <option value="Male Only">Male Only</option>
            <option value="Any">Co-ed / Any</option>
          </select>
        </div>

        {/* Number of Bedrooms */}
        <div>
          <label className="form-label small fw-bold text-dark mb-1">Bedrooms</label>
          <select
            className="form-select form-select-sm rounded-3 shadow-none"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
          >
            <option value="">Any Bedrooms</option>
            <option value="1">1 BHK / 1 Bed</option>
            <option value="2">2 BHK / 2 Beds</option>
            <option value="3">3 BHK / 3 Beds</option>
            <option value="4">4+ BHK / 4+ Beds</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="pt-2 d-flex flex-column gap-2">
          <button
            type="button"
            className="btn btn-primary-custom w-100 py-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Apply Filters ({resultCount})
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm py-2 rounded-3"
            onClick={onReset}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
