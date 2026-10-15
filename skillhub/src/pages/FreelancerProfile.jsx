import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';
import PortfolioCard from '../components/PortfolioCard';

const FreelancerProfile = ({
  freelancers,
  reviews,
  favorites,
  toggleFavorite,
  onHireSubmit,
  onSendMessage
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const freelancer = freelancers.find((f) => f.id === parseInt(id));

  // Hire modal state
  const [showHireModal, setShowHireModal] = useState(false);
  const [hireDuration, setHireDuration] = useState('1 month');
  const [hireHours, setHireHours] = useState('20');
  const [hireNote, setHireNote] = useState('');

  // Quick message state
  const [quickMsg, setQuickMsg] = useState('');
  const [startDate, setStartDate] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(freelancer ? freelancer.hourlyRate * 20 : 0);

  if (!freelancer) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold">Freelancer Not Found</h3>
        <p className="text-muted">The freelancer profile you're looking for does not exist or has been removed.</p>
        <Link to="/freelancers" className="btn btn-primary-custom">
          Back to Freelancers
        </Link>
      </div>
    );
  }

  const isFav = favorites.freelancers.includes(freelancer.id);
  const freelancerReviews = reviews.filter((r) => r.freelancerId === freelancer.id);

  const handleHireSubmit = (e) => {
    e.preventDefault();
    if (onHireSubmit) {
      onHireSubmit({
        freelancerId: freelancer.id,
        freelancerName: freelancer.name,
        hours: hireHours,
        duration: hireDuration,
        note: hireNote,
        total: freelancer.hourlyRate * parseInt(hireHours || 0)
      });
    }
    setShowHireModal(false);
  };

  const handleQuickContact = (e) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    if (onSendMessage) {
      onSendMessage(freelancer.id, freelancer.name, quickMsg);
    }
    setQuickMsg('');
    navigate('/messages');
  };

  return (
    <div className="freelancer-profile-page pb-5">
      {/* Profile Header */}
      <section className="profile-header-section text-white">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-auto">
              <div className="position-relative">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="profile-image"
                />
                <span
                  className={`position-absolute bottom-0 end-0 p-2 rounded-circle border border-white ${
                    freelancer.online ? 'bg-success' : 'bg-secondary'
                  }`}
                  style={{ width: 18, height: 18 }}
                  title={freelancer.online ? 'Online' : 'Offline'}
                ></span>
              </div>
            </div>

            <div className="col">
              <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                <h1 className="profile-name mb-0">{freelancer.name}</h1>
                <span className="badge bg-light text-dark px-2 py-1 rounded-pill small">
                  {freelancer.experience}
                </span>
                <span className="badge bg-primary-soft text-light px-2 py-1 rounded-pill small border border-light">
                  {freelancer.availability}
                </span>
              </div>
              <p className="profile-title mb-2">{freelancer.title}</p>
              <div className="d-flex flex-wrap align-items-center gap-3 text-light opacity-75 small">
                <span>
                  <i className="bi bi-geo-alt me-1"></i> {freelancer.location}
                </span>
                <span>
                  <i className="bi bi-translate me-1"></i> {freelancer.languages.join(', ')}
                </span>
                <div className="d-inline-block text-white">
                  <Rating rating={freelancer.rating} reviews={freelancer.reviews} />
                </div>
              </div>
            </div>

            <div className="col-lg-auto col-12 mt-3 mt-lg-0">
              <div className="d-flex flex-column flex-sm-row flex-lg-column gap-2 text-lg-end">
                <div className="text-white mb-lg-2">
                  <span className="fs-3 fw-bold">₹{freelancer.hourlyRate.toLocaleString()}</span>
                  <span className="opacity-75 small">/hour</span>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-light px-3"
                    onClick={() => {
                      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <i className="bi bi-chat-text me-1"></i> Contact
                  </button>
                  <button
                    className="btn btn-warning fw-semibold px-4 text-dark"
                    onClick={() => setShowHireModal(true)}
                  >
                    <i className="bi bi-lightning-charge-fill me-1"></i> Hire Freelancer
                  </button>
                  <button
                    className={`btn ${isFav ? 'btn-danger' : 'btn-outline-light'}`}
                    onClick={() => toggleFavorite(freelancer.id, 'freelancer')}
                    title={isFav ? 'Saved' : 'Save Profile'}
                  >
                    <i className={`bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mt-4">
        <div className="row g-4">
          {/* Left Column: Details */}
          <div className="col-lg-8 col-12">
            {/* About Me */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h4 className="fw-bold mb-3">
                <i className="bi bi-person-lines-fill text-primary-custom me-2"></i>About Me
              </h4>
              <p className="text-secondary leading-relaxed mb-0" style={{ fontSize: '0.975rem', lineHeight: '1.7' }}>
                {freelancer.about}
              </p>
            </div>

            {/* Skills */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h4 className="fw-bold mb-3">
                <i className="bi bi-cpu text-primary-custom me-2"></i>Skills & Expertise
              </h4>
              <div className="d-flex flex-wrap gap-2">
                {freelancer.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge bg-light text-primary border border-primary-subtle py-2 px-3 fs-6 rounded-pill"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Services Offered */}
            {freelancer.services && freelancer.services.length > 0 && (
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-briefcase text-primary-custom me-2"></i>Services Offered
                </h4>
                <div className="row g-3">
                  {freelancer.services.map((svc) => (
                    <div className="col-md-6 col-12" key={svc.id}>
                      <div className="border rounded-3 p-3 h-100 d-flex flex-column justify-content-between bg-light">
                        <div>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="fw-bold mb-0">{svc.title}</h6>
                            <span className="text-warning small">★ {svc.rating}</span>
                          </div>
                          <p className="text-muted small mb-3">{svc.description}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                          <div>
                            <span className="small text-muted d-block">Starting from</span>
                            <strong className="text-primary-custom fs-6">₹{svc.price.toLocaleString()}</strong>
                          </div>
                          <Link to="/services" className="btn btn-sm btn-outline-custom">
                            View Service
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {freelancer.portfolio && freelancer.portfolio.length > 0 && (
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-grid-3x3-gap text-primary-custom me-2"></i>Portfolio
                </h4>
                <div className="row g-3">
                  {freelancer.portfolio.map((item) => (
                    <div className="col-md-6 col-12" key={item.id}>
                      <PortfolioCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {freelancer.experienceHistory && (
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-clock-history text-primary-custom me-2"></i>Experience Timeline
                </h4>
                <div className="timeline ps-2">
                  {freelancer.experienceHistory.map((exp, idx) => (
                    <div className="timeline-item mb-3" key={idx}>
                      <h6 className="fw-bold mb-0 text-dark">{exp.position}</h6>
                      <span className="text-primary-custom fw-semibold small">{exp.company}</span>
                      <span className="text-muted small ms-2">({exp.duration})</span>
                      <p className="text-muted small mt-1 mb-0">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {freelancer.education && (
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-mortarboard text-primary-custom me-2"></i>Education
                </h4>
                {freelancer.education.map((edu, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-3">
                    <div className="p-3 bg-light rounded-circle text-primary">
                      <i className="bi bi-award fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{edu.degree}</h6>
                      <p className="text-secondary small mb-1">{edu.institution}</p>
                      <span className="badge bg-light text-muted border">Class of {edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Client Reviews */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">
                  <i className="bi bi-chat-square-quote text-primary-custom me-2"></i>Client Reviews
                </h4>
                <span className="badge bg-light text-dark border">
                  {freelancerReviews.length} Verified Reviews
                </span>
              </div>
              {freelancerReviews.length === 0 ? (
                <p className="text-muted mb-0">No client reviews posted yet.</p>
              ) : (
                freelancerReviews.map((rev) => (
                  <ReviewCard review={rev} key={rev.id} />
                ))
              )}
            </div>
          </div>

          {/* Right Column: Hire / Contact Card */}
          <div className="col-lg-4 col-12" id="contact-section">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top bg-white" style={{ top: '90px' }}>
              <h5 className="fw-bold mb-3">Hire {freelancer.name.split(' ')[0]}</h5>

              <div className="p-3 bg-light rounded-3 mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Hourly Rate</span>
                  <strong className="text-dark">₹{freelancer.hourlyRate}/hr</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Est. Hours (Weekly)</span>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    className="form-control form-control-sm w-25 text-end"
                    defaultValue="20"
                    onChange={(e) => setEstimatedCost(freelancer.hourlyRate * (parseInt(e.target.value) || 0))}
                  />
                </div>
                <div className="d-flex justify-content-between pt-2 border-top">
                  <span className="fw-semibold">Estimated Cost</span>
                  <strong className="text-primary-custom fs-5">
                    ₹{estimatedCost.toLocaleString()}
                  </strong>
                </div>
              </div>

              <form onSubmit={handleQuickContact}>
                <div className="mb-3">
                  <label className="form-label-custom">Desired Start Date</label>
                  <input
                    type="date"
                    className="form-control form-control-custom"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label-custom">Quick Message</label>
                  <textarea
                    rows="4"
                    className="form-control form-control-custom"
                    placeholder={`Hi ${freelancer.name}, I came across your profile and would love to discuss a project...`}
                    value={quickMsg}
                    onChange={(e) => setQuickMsg(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-outline-custom">
                    <i className="bi bi-send me-1"></i> Send Message
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary-custom"
                    onClick={() => setShowHireModal(true)}
                  >
                    <i className="bi bi-lightning-charge me-1"></i> Hire Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Hire Modal */}
      {showHireModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Hire {freelancer.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowHireModal(false)}
                ></button>
              </div>
              <form onSubmit={handleHireSubmit}>
                <div className="modal-body">
                  <div className="alert alert-info py-2 small mb-3">
                    <i className="bi bi-info-circle me-1"></i>
                    This is a simulation. No real money or payment gateway will be charged.
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Contract Duration</label>
                    <select
                      className="form-select form-select-custom"
                      value={hireDuration}
                      onChange={(e) => setHireDuration(e.target.value)}
                    >
                      <option value="1 week">1 Week</option>
                      <option value="2 weeks">2 Weeks</option>
                      <option value="1 month">1 Month</option>
                      <option value="3 months">3 Months</option>
                      <option value="Ongoing">Ongoing / Flexible</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Estimated Total Hours</label>
                    <input
                      type="number"
                      className="form-control form-control-custom"
                      min="5"
                      value={hireHours}
                      onChange={(e) => setHireHours(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Project Requirements / Brief</label>
                    <textarea
                      className="form-control form-control-custom"
                      rows="3"
                      placeholder="Outline the core deliverables and milestone expectations..."
                      value={hireNote}
                      onChange={(e) => setHireNote(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                    <div>
                      <span className="small text-muted d-block">Calculated Total</span>
                      <span className="small text-muted">₹{freelancer.hourlyRate} × {hireHours} hrs</span>
                    </div>
                    <span className="fs-4 fw-bold text-primary-custom">
                      ₹{(freelancer.hourlyRate * (parseInt(hireHours) || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowHireModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-custom">
                    Confirm Hire Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerProfile;
