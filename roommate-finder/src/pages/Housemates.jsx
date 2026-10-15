import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import HousemateCard from '../components/HousemateCard';

const lifestyleOptions = [
  'Non-Smoker',
  'Pet Friendly',
  'Early Riser',
  'Night Owl',
  'Vegetarian',
  'Clean & Organized',
  'Social',
  'Quiet'
];

const Housemates = () => {
  const { housemates } = useApp();

  // Filters State
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [maxBudget, setMaxBudget] = useState(30000);
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLifestyle = (tag) => {
    setSelectedLifestyle((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleReset = () => {
    setSelectedCity('');
    setSelectedGender('');
    setSelectedAgeRange('');
    setMaxBudget(30000);
    setSelectedLifestyle([]);
    setSearchQuery('');
  };

  // Filtered Housemates
  const filteredHousemates = useMemo(() => {
    return housemates.filter((hm) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = hm.name.toLowerCase().includes(q);
        const matchesOccupation = hm.occupation.toLowerCase().includes(q);
        const matchesLoc = hm.location.toLowerCase().includes(q);
        if (!matchesName && !matchesOccupation && !matchesLoc) return false;
      }

      // City
      if (selectedCity && hm.location.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Gender
      if (selectedGender && hm.gender !== selectedGender) {
        return false;
      }

      // Budget
      if (hm.budget > maxBudget) {
        return false;
      }

      // Age Range
      if (selectedAgeRange) {
        if (selectedAgeRange === '18-23' && (hm.age < 18 || hm.age > 23)) return false;
        if (selectedAgeRange === '24-27' && (hm.age < 24 || hm.age > 27)) return false;
        if (selectedAgeRange === '28+' && hm.age < 28) return false;
      }

      // Lifestyle Tags (must include all selected tags)
      if (selectedLifestyle.length > 0) {
        const hasAllTags = selectedLifestyle.every((tag) => hm.lifestyleTags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [housemates, selectedCity, selectedGender, selectedAgeRange, maxBudget, selectedLifestyle, searchQuery]);

  return (
    <div className="housemates-page py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh' }}>
      <div className="container">
        {/* Header Banner */}
        <div className="text-center max-w-700 mx-auto mb-4">
          <span className="badge bg-primary-light text-primary-custom rounded-pill px-3 py-1.5 fw-bold mb-2">
            <i className="bi bi-people-fill me-1"></i> Community Discovery
          </span>
          <h2 className="fw-bold mb-2">Find Compatible Housemates</h2>
          <p className="text-secondary mb-0">
            Connect with verified students and professionals who share your habits, budget, and desired move-in timeline.
          </p>
        </div>

        {/* Filter Card */}
        <div className="card modern-card p-4 mb-4 bg-white">
          <div className="row g-3">
            {/* Search Input */}
            <div className="col-lg-3 col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                <i className="bi bi-search text-primary-custom me-1"></i> Search by Name / Role
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul, Developer..."
                className="form-control rounded-3 shadow-none bg-light border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* City */}
            <div className="col-lg-3 col-md-6 col-12">
              <label className="form-label small fw-bold text-dark mb-1">
                <i className="bi bi-geo-alt-fill text-danger me-1"></i> Preferred City
              </label>
              <select
                className="form-select rounded-3 shadow-none bg-light border-0"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
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

            {/* Gender */}
            <div className="col-lg-2 col-md-4 col-6">
              <label className="form-label small fw-bold text-dark mb-1">Gender</label>
              <select
                className="form-select rounded-3 shadow-none bg-light border-0"
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Age Range */}
            <div className="col-lg-2 col-md-4 col-6">
              <label className="form-label small fw-bold text-dark mb-1">Age Range</label>
              <select
                className="form-select rounded-3 shadow-none bg-light border-0"
                value={selectedAgeRange}
                onChange={(e) => setSelectedAgeRange(e.target.value)}
              >
                <option value="">Any Age</option>
                <option value="18-23">18 - 23 yrs</option>
                <option value="24-27">24 - 27 yrs</option>
                <option value="28+">28+ yrs</option>
              </select>
            </div>

            {/* Max Budget Slider */}
            <div className="col-lg-2 col-md-4 col-12">
              <div className="d-flex justify-content-between mb-1">
                <label className="form-label small fw-bold text-dark mb-0">Max Budget</label>
                <span className="small fw-bold text-primary-custom">₹{maxBudget.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                className="form-range mt-2"
                min="6000"
                max="35000"
                step="1000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
              />
            </div>
          </div>

          <hr className="my-3 opacity-25" />

          {/* Lifestyle Habits Tags Filter */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small fw-bold text-dark">
                <i className="bi bi-tag-fill text-primary-custom me-1"></i> Filter by Lifestyle Preferences:
              </span>
              {(selectedCity || selectedGender || selectedAgeRange || selectedLifestyle.length > 0 || searchQuery) && (
                <button
                  type="button"
                  className="btn btn-link text-danger text-decoration-none p-0 small fw-semibold"
                  onClick={handleReset}
                >
                  Reset Filters
                </button>
              )}
            </div>
            <div className="d-flex flex-wrap gap-2">
              {lifestyleOptions.map((tag) => {
                const isActive = selectedLifestyle.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1.5 fw-medium border ${
                      isActive
                        ? 'btn-primary-custom text-white border-transparent'
                        : 'btn-light text-secondary border-light-subtle'
                    }`}
                    onClick={() => toggleLifestyle(tag)}
                  >
                    {isActive && <i className="bi bi-check-lg me-1"></i>}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="small fw-semibold text-secondary">
            Showing <strong className="text-dark">{filteredHousemates.length}</strong> compatible profile{filteredHousemates.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Housemates Grid */}
        {filteredHousemates.length > 0 ? (
          <div className="row g-4">
            {filteredHousemates.map((hm) => (
              <HousemateCard key={hm.id} housemate={hm} />
            ))}
          </div>
        ) : (
          <div className="card modern-card p-5 text-center my-4 bg-white">
            <div className="bg-light rounded-circle p-4 mx-auto mb-3" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="bi bi-person-x fs-1 text-secondary"></i>
            </div>
            <h4 className="fw-bold mb-2">No housemates match your criteria</h4>
            <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '420px' }}>
              Try loosening lifestyle tags or increasing the budget to discover more prospective roommates.
            </p>
            <div>
              <button
                type="button"
                className="btn btn-primary-custom rounded-pill px-4"
                onClick={handleReset}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Housemates;
