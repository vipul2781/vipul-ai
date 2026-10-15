import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ initialCity = '', initialBudget = '', initialDate = '' }) => {
  const [city, setCity] = useState(initialCity);
  const [budget, setBudget] = useState(initialBudget);
  const [moveInDate, setMoveInDate] = useState(initialDate);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (budget) params.set('budget', budget);
    if (moveInDate) params.set('date', moveInDate);

    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="search-box-card">
      <form onSubmit={handleSearch} className="row g-3 align-items-center">
        {/* Location Field */}
        <div className="col-lg-4 col-md-6 col-12">
          <label className="form-label small fw-bold text-secondary mb-1">
            <i className="bi bi-geo-alt-fill text-primary-custom me-1"></i> Location
          </label>
          <div className="input-group">
            <select
              className="form-select border-0 bg-light py-2.5 rounded-3 fw-medium shadow-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
        </div>

        {/* Move-in Date */}
        <div className="col-lg-3 col-md-6 col-12">
          <label className="form-label small fw-bold text-secondary mb-1">
            <i className="bi bi-calendar3 text-primary-custom me-1"></i> Move-in Date
          </label>
          <input
            type="date"
            className="form-control border-0 bg-light py-2.5 rounded-3 fw-medium shadow-none"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
          />
        </div>

        {/* Budget Dropdown */}
        <div className="col-lg-3 col-md-6 col-12">
          <label className="form-label small fw-bold text-secondary mb-1">
            <i className="bi bi-cash-stack text-primary-custom me-1"></i> Monthly Budget
          </label>
          <select
            className="form-select border-0 bg-light py-2.5 rounded-3 fw-medium shadow-none"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Any Budget</option>
            <option value="under-10000">Under ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
            <option value="20000-30000">₹20,000 - ₹30,000</option>
            <option value="above-30000">Above ₹30,000</option>
          </select>
        </div>

        {/* Search Submit Button */}
        <div className="col-lg-2 col-md-6 col-12 d-flex align-items-end">
          <button
            type="submit"
            className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-search fs-6"></i>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
