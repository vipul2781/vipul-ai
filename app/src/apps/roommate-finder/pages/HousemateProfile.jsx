import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HousemateProfile = () => {
  const { id } = useParams();
  const { housemates, favoriteHousemateIds, toggleFavoriteHousemate, openModal } = useApp();

  const housemate = housemates.find((h) => h.id === id);

  if (!housemate) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="card modern-card p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <i className="bi bi-person-x fs-1 text-warning mb-3"></i>
          <h3 className="fw-bold mb-2">Profile Not Found</h3>
          <p className="text-secondary mb-4">The housemate profile you are looking for does not exist or has been deactivated.</p>
          <Link to="/housemates" className="btn btn-primary-custom rounded-pill">
            Explore All Housemates
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favoriteHousemateIds.includes(housemate.id);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const breakdown = housemate.compatibilityBreakdown || {
    budget: 92,
    location: 88,
    lifestyle: 90,
    moveIn: 94
  };

  return (
    <div className="housemate-profile-page py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '90vh' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/housemates" className="text-decoration-none">Housemates</Link></li>
            <li className="breadcrumb-item text-secondary">{housemate.name}</li>
          </ol>
        </nav>

        {/* Profile Card Header */}
        <div className="card modern-card p-4 p-md-5 mb-4 bg-white position-relative">
          <div className="row align-items-center g-4">
            <div className="col-md-auto text-center">
              <div className="position-relative d-inline-block">
                <img
                  src={housemate.avatar}
                  alt={housemate.name}
                  className="rounded-circle object-fit-cover shadow-sm border border-4 border-white"
                  style={{ width: '150px', height: '150px' }}
                />
                <span className="badge bg-success position-absolute bottom-0 end-0 rounded-pill px-2.5 py-1.5 border border-white">
                  <i className="bi bi-patch-check-fill me-1"></i> Verified
                </span>
              </div>
            </div>

            <div className="col-md">
              <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                <div>
                  <h1 className="fw-bold fs-2 text-dark mb-1">
                    {housemate.name}, <span className="fw-normal text-secondary">{housemate.age}</span>
                  </h1>
                  <p className="fs-5 text-primary-custom fw-semibold mb-1">
                    {housemate.occupation}
                  </p>
                  <p className="text-secondary small mb-0 d-flex align-items-center gap-1">
                    <i className="bi bi-geo-alt-fill text-danger"></i>
                    <span>Looking in {housemate.location}</span>
                  </p>
                </div>

                <div className="text-md-end">
                  <div className="d-inline-flex flex-column align-items-center p-3 rounded-4 bg-primary-light border border-primary-subtle">
                    <span className="small text-secondary fw-semibold">Overall Match</span>
                    <span className="fs-3 fw-extrabold text-primary-custom">
                      {housemate.compatibility}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Quick Info Pills */}
              <div className="d-flex flex-wrap gap-2 mt-3 pt-2 border-top">
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                  <i className="bi bi-cash-stack text-success me-1"></i> Budget: <strong>{formatINR(housemate.budget)}/mo</strong>
                </span>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                  <i className="bi bi-calendar3 text-primary-custom me-1"></i> Move-in: <strong>{formatDate(housemate.moveInDate)}</strong>
                </span>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                  <i className="bi bi-gender-ambiguous text-info me-1"></i> Gender: <strong>{housemate.gender}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Two-Column Layout */}
        <div className="row g-4">
          {/* Left Column: About, Lifestyle, Hobbies, Preferences */}
          <div className="col-lg-8">
            {/* About Me */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">About Me</h5>
              <p className="text-secondary leading-relaxed mb-0">
                {housemate.bio}
              </p>
            </div>

            {/* Lifestyle Habits */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Lifestyle & Habits</h5>
              <div className="d-flex flex-wrap gap-2">
                {housemate.lifestyleTags.map((tag, idx) => (
                  <span key={idx} className="badge bg-primary-light text-primary-custom px-3 py-2 fs-6 rounded-pill border border-primary-subtle">
                    <i className="bi bi-check-circle-fill me-1.5 text-primary-custom"></i>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hobbies & Interests */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Hobbies & Interests</h5>
              <div className="d-flex flex-wrap gap-2">
                {housemate.hobbies && housemate.hobbies.map((hobby, idx) => (
                  <span key={idx} className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                    <i className="bi bi-heart-fill text-danger me-1.5"></i>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            {/* Room Requirements & Preferred Localities */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Room Requirements & Preferred Localities</h5>
              <div className="mb-3">
                <span className="d-block small text-muted fw-bold mb-1">Target Neighborhoods</span>
                <div className="d-flex flex-wrap gap-2">
                  {housemate.preferredLocations && housemate.preferredLocations.map((loc, idx) => (
                    <span key={idx} className="badge bg-secondary bg-opacity-10 text-secondary border px-3 py-1.5 rounded-pill">
                      <i className="bi bi-pin-map-fill text-danger me-1"></i>
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="d-block small text-muted fw-bold mb-1">What {housemate.name} is looking for</span>
                <p className="text-secondary mb-0 p-3 bg-light rounded-3 border">
                  {housemate.roomRequirements}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Compatibility Match Breakdown & Actions */}
          <div className="col-lg-4">
            {/* Compatibility Breakdown Card */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-pie-chart-fill text-primary-custom"></i> Compatibility Index
              </h5>

              <div className="d-flex flex-column gap-3">
                {/* Budget */}
                <div>
                  <div className="d-flex justify-content-between small fw-bold mb-1">
                    <span>Budget Alignment</span>
                    <span className="text-success">{breakdown.budget}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${breakdown.budget}%` }}></div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="d-flex justify-content-between small fw-bold mb-1">
                    <span>Location Preferences</span>
                    <span className="text-primary-custom">{breakdown.location}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-primary-custom" role="progressbar" style={{ width: `${breakdown.location}%` }}></div>
                  </div>
                </div>

                {/* Lifestyle */}
                <div>
                  <div className="d-flex justify-content-between small fw-bold mb-1">
                    <span>Lifestyle & Habits</span>
                    <span className="text-info">{breakdown.lifestyle}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${breakdown.lifestyle}%` }}></div>
                  </div>
                </div>

                {/* Move-in */}
                <div>
                  <div className="d-flex justify-content-between small fw-bold mb-1">
                    <span>Move-in Timeline</span>
                    <span className="text-warning">{breakdown.moveIn}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${breakdown.moveIn}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-light rounded-3 text-secondary small">
                <i className="bi bi-stars text-warning me-1"></i>
                You and {housemate.name} have strong overlap in work schedules, budget range, and cleanliness standards!
              </div>
            </div>

            {/* Action Buttons Box */}
            <div className="card modern-card p-4">
              <h5 className="fw-bold mb-3">Connect with {housemate.name.split(' ')[0]}</h5>
              <div className="d-flex flex-column gap-2.5">
                <button
                  type="button"
                  className="btn btn-primary-custom w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => openModal('connect', 'Send Connection Request', housemate.name, housemate)}
                >
                  <i className="bi bi-person-plus-fill"></i> Connect
                </button>

                <button
                  type="button"
                  className="btn btn-outline-custom w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => openModal('send-message', 'Direct Chat', housemate.name, housemate)}
                >
                  <i className="bi bi-chat-dots-fill"></i> Send Message
                </button>

                <button
                  type="button"
                  className={`btn ${isFavorite ? 'btn-danger' : 'btn-light border'} w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2`}
                  onClick={() => toggleFavoriteHousemate(housemate.id)}
                >
                  <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  <span>{isFavorite ? 'Profile Saved' : 'Save Profile'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousemateProfile;
