import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import SkillBadge from '../components/SkillBadge';

const Favorites = ({
  freelancers,
  services,
  favorites,
  toggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState('freelancers');

  const savedFreelancers = freelancers.filter((f) => favorites.freelancers?.includes(f.id));
  const savedServices = services.filter((s) => favorites.services?.includes(s.id));

  return (
    <div className="favorites-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Favorites</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-2">Saved Items</h1>
          <p className="opacity-75 mb-0" style={{ maxWidth: '600px' }}>
            Keep track of your bookmarked freelancers and favorite service offerings in one place.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Navigation Tabs */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <ul className="nav nav-pills gap-2">
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill px-4 ${activeTab === 'freelancers' ? 'active' : 'bg-white border text-dark'}`}
                onClick={() => setActiveTab('freelancers')}
              >
                <i className="bi bi-people me-1"></i> Saved Freelancers
                <span className="badge bg-light text-dark ms-2">{savedFreelancers.length}</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill px-4 ${activeTab === 'services' ? 'active' : 'bg-white border text-dark'}`}
                onClick={() => setActiveTab('services')}
              >
                <i className="bi bi-briefcase me-1"></i> Saved Services
                <span className="badge bg-light text-dark ms-2">{savedServices.length}</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Tab 1: Freelancers */}
        {activeTab === 'freelancers' && (
          <div>
            {savedFreelancers.length === 0 ? (
              <div className="empty-state card border-0 bg-white rounded-4 shadow-sm p-5 text-center">
                <i className="bi bi-heart text-muted fs-1 mb-3"></i>
                <h4 className="fw-bold">You haven't saved anything yet.</h4>
                <p className="text-muted mb-4">
                  Browse through thousands of qualified freelancers and click the heart icon to save them.
                </p>
                <Link to="/freelancers" className="btn btn-primary-custom mx-auto px-4">
                  Explore Freelancers
                </Link>
              </div>
            ) : (
              <div className="row g-4">
                {savedFreelancers.map((freelancer) => (
                  <div className="col-lg-6 col-12" key={freelancer.id}>
                    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                      <div className="d-flex gap-3 align-items-start">
                        <img
                          src={freelancer.image}
                          alt={freelancer.name}
                          className="rounded-circle"
                          style={{ width: 64, height: 64, objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h5 className="fw-bold mb-0">{freelancer.name}</h5>
                              <p className="text-muted small mb-1">{freelancer.title}</p>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => toggleFavorite(freelancer.id, 'freelancer')}
                              title="Remove from favorites"
                            >
                              <i className="bi bi-trash"></i> Remove
                            </button>
                          </div>

                          <div className="d-flex align-items-center gap-3 my-2">
                            <Rating rating={freelancer.rating} reviews={freelancer.reviews} />
                            <span className="fw-bold text-primary-custom">
                              ₹{freelancer.hourlyRate}/hr
                            </span>
                          </div>

                          <div className="d-flex flex-wrap gap-1 mb-3">
                            {freelancer.skills.slice(0, 4).map((skill, i) => (
                              <SkillBadge key={i} skill={skill} />
                            ))}
                          </div>

                          <Link to={`/freelancers/${freelancer.id}`} className="btn btn-sm btn-primary-custom">
                            View Profile <i className="bi bi-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Services */}
        {activeTab === 'services' && (
          <div>
            {savedServices.length === 0 ? (
              <div className="empty-state card border-0 bg-white rounded-4 shadow-sm p-5 text-center">
                <i className="bi bi-heart text-muted fs-1 mb-3"></i>
                <h4 className="fw-bold">You haven't saved anything yet.</h4>
                <p className="text-muted mb-4">
                  Browse ready-to-order gigs and services and save them to review later.
                </p>
                <Link to="/services" className="btn btn-primary-custom mx-auto px-4">
                  Explore Services
                </Link>
              </div>
            ) : (
              <div className="row g-4">
                {savedServices.map((service) => (
                  <div className="col-lg-6 col-12" key={service.id}>
                    <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
                      <div className="row g-3 align-items-center">
                        <div className="col-sm-4">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-100 rounded-3"
                            style={{ height: '140px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-sm-8">
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <span className="badge bg-primary-soft text-primary-custom small">{service.category}</span>
                            <button
                              className="btn btn-sm text-danger p-0"
                              onClick={() => toggleFavorite(service.id, 'service')}
                              title="Remove"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                          <h6 className="fw-bold mb-1">{service.title}</h6>
                          <p className="text-muted small mb-2">By {service.freelancerName}</p>

                          <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                            <div>
                              <small className="text-muted d-block">Starting from</small>
                              <strong className="text-primary-custom fs-6">
                                ₹{service.packages?.basic?.price.toLocaleString() || '2,000'}
                              </strong>
                            </div>
                            <Link to={`/services/${service.id}`} className="btn btn-sm btn-outline-custom">
                              View Service
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
