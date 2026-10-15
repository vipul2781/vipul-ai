import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import FreelancerCard from '../components/FreelancerCard';
import ServiceCard from '../components/ServiceCard';

const Home = ({
  freelancers,
  services,
  categories,
  favorites,
  toggleFavorite
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('freelancers');

  const popularSearches = [
    'Web Development',
    'UI/UX Design',
    'Logo Design',
    'Digital Marketing',
    'Content Writing',
    'Video Editing'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === 'freelancers') {
      navigate(`/freelancers?q=${encodeURIComponent(searchTerm)}`);
    } else if (searchType === 'services') {
      navigate(`/services?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(`/projects?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handlePopularClick = (tag) => {
    navigate(`/freelancers?category=${encodeURIComponent(tag)}`);
  };

  // 6 featured freelancers
  const featuredFreelancers = freelancers.slice(0, 6);
  // 6 popular services
  const popularServices = services.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-lg-9 col-md-11">
              <span className="badge rounded-pill bg-primary-soft text-light border border-secondary px-3 py-2 mb-3">
                <i className="bi bi-stars text-warning me-1"></i> India's Premier Freelance Platform
              </span>
              <h1 className="hero-title text-white">
                Find the perfect freelancer for your next project.
              </h1>
              <p className="hero-subtitle mx-auto text-light opacity-75">
                Connect with talented professionals and get high-quality work done faster.
              </p>

              {/* Search Bar */}
              <div className="hero-search-box mx-auto my-4">
                <form onSubmit={handleSearch} className="d-flex flex-column flex-md-row gap-2">
                  <select
                    className="form-select w-auto text-white bg-transparent"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{ minWidth: '160px', borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    <option value="freelancers" className="text-dark">Search freelancers</option>
                    <option value="skills" className="text-dark">Search skills</option>
                    <option value="services" className="text-dark">Search services</option>
                  </select>
                  <input
                    type="text"
                    className="form-control text-white"
                    placeholder="Try 'React Developer' or 'Logo Design'..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-search">
                    <i className="bi bi-search me-2"></i>Search
                  </button>
                </form>
              </div>

              {/* Popular Searches */}
              <div className="popular-searches">
                <span className="me-2 text-light opacity-75">Popular:</span>
                {popularSearches.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePopularClick(tag)}
                    className="popular-search-tag btn btn-link p-0 text-decoration-none"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-primary fw-semibold text-uppercase small tracking-wide">Explore Niches</span>
              <h2 className="section-title mb-1">Popular Categories</h2>
              <p className="text-muted mb-0">Browse top talent by their specialized field of expertise.</p>
            </div>
            <Link to="/freelancers" className="btn btn-outline-custom mt-3 mt-md-0">
              Explore All Categories <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {categories.map((cat) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={cat.id}>
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Freelancers */}
      <section className="section-padding">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-primary fw-semibold text-uppercase small tracking-wide">Verified Talent</span>
              <h2 className="section-title mb-1">Featured Freelancers</h2>
              <p className="text-muted mb-0">Hire top-rated, vetted experts with proven track records.</p>
            </div>
            <Link to="/freelancers" className="btn btn-primary-custom mt-3 mt-md-0">
              Browse All Freelancers <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredFreelancers.map((freelancer) => (
              <div className="col-lg-4 col-md-6 col-12" key={freelancer.id}>
                <FreelancerCard
                  freelancer={freelancer}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.freelancers.includes(freelancer.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-primary fw-semibold text-uppercase small tracking-wide">Pre-Packaged Work</span>
              <h2 className="section-title mb-1">Popular Services</h2>
              <p className="text-muted mb-0">Order directly with transparent pricing and fast turnaround times.</p>
            </div>
            <Link to="/services" className="btn btn-outline-custom mt-3 mt-md-0">
              View All Services <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {popularServices.map((service) => (
              <div className="col-lg-4 col-md-6 col-12" key={service.id}>
                <ServiceCard
                  service={service}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.services.includes(service.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How SkillHub Works */}
      <section className="section-padding how-it-works">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-5">
            <span className="text-primary fw-semibold text-uppercase small tracking-wide">Simple Process</span>
            <h2 className="section-title">How SkillHub Works</h2>
            <p className="text-muted">Simple, streamlined hiring from brief to delivery in four simple steps.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="step-card h-100 border rounded-4 p-4 shadow-sm bg-white">
                <div className="step-number">1</div>
                <h5>Post a Project</h5>
                <p>Tell freelancers what you need done with your specific budget and timeline expectations.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="step-card h-100 border rounded-4 p-4 shadow-sm bg-white">
                <div className="step-number">2</div>
                <h5>Find Talent</h5>
                <p>Browse freelancer profiles, reviews, portfolios, and compare verified proposals.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="step-card h-100 border rounded-4 p-4 shadow-sm bg-white">
                <div className="step-number">3</div>
                <h5>Hire</h5>
                <p>Choose the freelancer that matches your requirements and collaborate with ease.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="step-card h-100 border rounded-4 p-4 shadow-sm bg-white">
                <div className="step-number">4</div>
                <h5>Get Work Done</h5>
                <p>Communicate directly, receive completed milestones, and approve high-quality work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-6">
              <div className="stat-item text-center">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Freelancers</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="stat-item text-center">
                <div className="stat-number">25,000+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="stat-item text-center">
                <div className="stat-number">100+</div>
                <div className="stat-label">Skills Represented</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="stat-item text-center">
                <div className="stat-number">95%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section text-center text-white">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h2 className="mb-3">Ready to get your project started?</h2>
          <p className="mx-auto mb-4 opacity-75" style={{ maxWidth: '600px' }}>
            Join thousands of businesses hiring top Indian and global talent on SkillHub today.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/freelancers" className="btn btn-cta-primary">
              <i className="bi bi-search me-2"></i>Find a Freelancer
            </Link>
            <Link to="/post-project" className="btn btn-cta-secondary">
              <i className="bi bi-briefcase me-2"></i>Post a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
