import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';

const Services = ({
  services,
  favorites,
  toggleFavorite
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState('Recommended');

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q) setSearchTerm(q);
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const serviceCategories = [
    'All',
    'Development',
    'Design',
    'Writing',
    'Marketing',
    'Video',
    'Business'
  ];

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = s.title.toLowerCase().includes(q);
        const matchesDesc = s.description.toLowerCase().includes(q);
        const matchesFreelancer = s.freelancerName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesFreelancer) {
          return false;
        }
      }

      if (selectedCategory && selectedCategory !== 'All' && s.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [services, searchTerm, selectedCategory]);

  const sortedServices = useMemo(() => {
    const list = [...filteredServices];
    switch (sortOption) {
      case 'Lowest Price':
        return list.sort((a, b) => (a.packages?.basic?.price || 0) - (b.packages?.basic?.price || 0));
      case 'Highest Rated':
        return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case 'Fastest Delivery':
        return list.sort((a, b) => {
          const daysA = parseInt(a.packages?.basic?.delivery || 99);
          const daysB = parseInt(b.packages?.basic?.delivery || 99);
          return daysA - daysB;
        });
      case 'Recommended':
      default:
        return list.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filteredServices, sortOption]);

  return (
    <div className="services-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">Services</li>
            </ol>
          </nav>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h1 className="fw-bold mb-2">Freelance Services Catalog</h1>
              <p className="opacity-75 mb-0" style={{ maxWidth: '600px' }}>
                Order pre-packaged, fixed-price services from top-tier professionals with guaranteed delivery.
              </p>
            </div>
            <Link to="/post-service" className="btn btn-warning text-dark fw-bold px-4 py-2">
              <i className="bi bi-plus-circle me-1"></i> Offer a Service
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Category Pills */}
        <div className="d-flex flex-wrap gap-2 mb-4 pb-2 border-bottom">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ${
                (selectedCategory === cat || (!selectedCategory && cat === 'All'))
                  ? 'btn-primary-custom'
                  : 'btn-light border'
              }`}
              onClick={() => {
                setSelectedCategory(cat === 'All' ? '' : cat);
                setSearchParams(cat === 'All' ? {} : { category: cat });
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="row g-3 align-items-center">
            <div className="col-md-7 col-12">
              <SearchBar
                placeholder="Search services by keyword or talent name..."
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
                  <option value="Lowest Price">Lowest Price</option>
                  <option value="Highest Rated">Highest Rated</option>
                  <option value="Fastest Delivery">Fastest Delivery</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">
            Showing <strong>{sortedServices.length}</strong> available services
          </span>
          {(searchTerm || selectedCategory) && (
            <button
              className="btn btn-link btn-sm text-danger text-decoration-none p-0"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSearchParams({});
              }}
            >
              <i className="bi bi-x-circle me-1"></i> Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {sortedServices.length === 0 ? (
          <div className="empty-state card border-0 bg-white rounded-4 shadow-sm p-5 text-center">
            <i className="bi bi-bag-x fs-1 text-muted"></i>
            <h5 className="fw-bold mt-2">No Services Found</h5>
            <p className="text-muted">
              We couldn't find any services matching your current filters or query.
            </p>
            <button
              className="btn btn-primary-custom mx-auto"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
            >
              Show All Services
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {sortedServices.map((service) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={service.id}>
                <ServiceCard
                  service={service}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.services?.includes(service.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
