import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';

const ServiceDetails = ({
  services,
  favorites,
  toggleFavorite,
  onOrderService,
  onSendMessage
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === parseInt(id));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPackageTab, setSelectedPackageTab] = useState('basic');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h3 className="fw-bold">Service Not Found</h3>
        <p className="text-muted">The service you're looking for does not exist or has been archived.</p>
        <Link to="/services" className="btn btn-primary-custom">
          Back to Services
        </Link>
      </div>
    );
  }

  const isFav = favorites.services?.includes(service.id);
  const images = service.gallery ? [service.image, ...service.gallery] : [service.image];

  const packages = service.packages || {
    basic: { name: 'Basic', price: 2000, delivery: '3 days', revisions: 2, pages: 1, features: ['1 Page', 'Responsive Design', '2 Revisions'] },
    standard: { name: 'Standard', price: 5000, delivery: '5 days', revisions: 5, pages: 5, features: ['5 Pages', 'Responsive Design', '5 Revisions', 'Source Code'] },
    premium: { name: 'Premium', price: 10000, delivery: '7 days', revisions: 'Unlimited', pages: 10, features: ['10 Pages', 'Responsive Design', 'Unlimited Revisions', 'Source Code', 'Full Support'] }
  };

  const currentPkg = packages[selectedPackageTab] || packages.basic;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (onOrderService) {
      onOrderService({
        serviceId: service.id,
        serviceTitle: service.title,
        freelancerName: service.freelancerName,
        packageName: currentPkg.name,
        price: currentPkg.price,
        delivery: currentPkg.delivery,
        notes: orderNotes
      });
    }
    setShowOrderModal(false);
    setOrderNotes('');
  };

  const handleContactFreelancer = () => {
    if (onSendMessage) {
      onSendMessage(
        service.freelancerId,
        service.freelancerName,
        `Hi ${service.freelancerName}, I have a question about your service: "${service.title}".`
      );
    }
    navigate('/messages');
  };

  return (
    <div className="service-details-page pb-5">
      {/* Header */}
      <div className="page-header text-white mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link to="/" className="text-white opacity-75">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/services" className="text-white opacity-75">Services</Link></li>
              <li className="breadcrumb-item active text-white" aria-current="page">#{service.id}</li>
            </ol>
          </nav>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <span className="badge bg-light text-dark px-3 py-1 mb-2 rounded-pill">
                {service.category}
              </span>
              <h1 className="fw-bold mb-1">{service.title}</h1>
              <div className="d-flex align-items-center gap-3 text-white small opacity-75">
                <Rating rating={service.rating} reviews={service.reviews} />
                <span>• Response Time: {service.responseTime || '1-2 hrs'}</span>
              </div>
            </div>
            <button
              className={`btn ${isFav ? 'btn-danger' : 'btn-outline-light'}`}
              onClick={() => toggleFavorite(service.id, 'service')}
            >
              <i className={`bi ${isFav ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
              {isFav ? 'Saved' : 'Save Service'}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* Main Service Content */}
          <div className="col-lg-8 col-12">
            {/* Gallery */}
            <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
              <div className="main-image-container rounded-3 overflow-hidden mb-3" style={{ maxHeight: '420px' }}>
                <img
                  src={images[activeImageIndex]}
                  alt={service.title}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover', maxHeight: '420px' }}
                />
              </div>

              {images.length > 1 && (
                <div className="d-flex gap-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      className={`btn p-0 border rounded-3 overflow-hidden ${activeImageIndex === idx ? 'border-primary border-2' : ''}`}
                      style={{ width: '80px', height: '60px' }}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={imgUrl} alt="thumb" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Description */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h4 className="fw-bold mb-3">About This Service</h4>
              <p className="text-secondary" style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {service.description}
              </p>

              <div className="row g-3 mt-2">
                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded-3">
                    <h6 className="fw-bold mb-1">
                      <i className="bi bi-patch-check-fill text-primary me-2"></i>100% Quality Guaranteed
                    </h6>
                    <small className="text-muted">Rigorous testing, pixel-perfect code, and revisions included.</small>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded-3">
                    <h6 className="fw-bold mb-1">
                      <i className="bi bi-shield-lock-fill text-success me-2"></i>Secure Escrow
                    </h6>
                    <small className="text-muted">Funds released only after your final satisfaction and review.</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Freelancer Profile summary */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h4 className="fw-bold mb-3">About the Seller</h4>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={service.freelancerImage}
                  alt={service.freelancerName}
                  className="rounded-circle"
                  style={{ width: 70, height: 70, objectFit: 'cover' }}
                />
                <div>
                  <h5 className="fw-bold mb-0">{service.freelancerName}</h5>
                  <span className="badge bg-primary-soft text-primary-custom mb-1">
                    {service.freelancerLevel || 'Top Rated Freelancer'}
                  </span>
                  <div>
                    <Rating rating={service.rating} reviews={service.reviews} />
                  </div>
                </div>
              </div>
              <p className="text-muted small mb-3">
                Proven track record in delivering high-impact solutions with quick turnarounds and stellar communication.
              </p>
              <div className="d-flex gap-2">
                <Link to={`/freelancers/${service.freelancerId}`} className="btn btn-outline-custom btn-sm">
                  View Full Profile
                </Link>
                <button className="btn btn-light btn-sm border" onClick={handleContactFreelancer}>
                  <i className="bi bi-chat-text me-1"></i> Contact Seller
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Packages Column */}
          <div className="col-lg-4 col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top bg-white" style={{ top: '90px' }}>
              <h5 className="fw-bold mb-3">Select Package</h5>

              {/* Package Tabs */}
              <div className="btn-group w-100 mb-3" role="group">
                {Object.keys(packages).map((pkgKey) => (
                  <button
                    key={pkgKey}
                    type="button"
                    className={`btn text-capitalize fw-semibold ${
                      selectedPackageTab === pkgKey
                        ? 'btn-primary-custom'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => setSelectedPackageTab(pkgKey)}
                  >
                    {pkgKey}
                  </button>
                ))}
              </div>

              {/* Active Package Details */}
              <div className="package-preview p-3 bg-light rounded-3 mb-4">
                <div className="d-flex justify-content-between align-items-baseline mb-2">
                  <h5 className="fw-bold text-dark text-capitalize mb-0">{currentPkg.name}</h5>
                  <span className="fs-3 fw-bold text-primary-custom">₹{currentPkg.price.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between text-muted small mb-3 pb-2 border-bottom">
                  <span><i className="bi bi-clock me-1"></i>{currentPkg.delivery} Delivery</span>
                  <span><i className="bi bi-arrow-repeat me-1"></i>{currentPkg.revisions} Revisions</span>
                </div>

                <h6 className="fw-bold small text-uppercase text-muted mb-2">What's Included:</h6>
                <ul className="list-unstyled mb-0">
                  {currentPkg.features ? (
                    currentPkg.features.map((feat, i) => (
                      <li key={i} className="small py-1 text-secondary">
                        <i className="bi bi-check2 text-success me-2 fw-bold"></i>{feat}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="small py-1 text-secondary">
                        <i className="bi bi-check2 text-success me-2 fw-bold"></i>{currentPkg.pages} Page(s)
                      </li>
                      <li className="small py-1 text-secondary">
                        <i className="bi bi-check2 text-success me-2 fw-bold"></i>Source Files
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary-custom py-2 fw-semibold"
                  onClick={() => setShowOrderModal(true)}
                >
                  <i className="bi bi-cart-check me-1"></i> Order Service (₹{currentPkg.price.toLocaleString()})
                </button>
                <button
                  className="btn btn-outline-secondary py-2"
                  onClick={handleContactFreelancer}
                >
                  <i className="bi bi-chat-dots me-1"></i> Contact Freelancer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h5 className="modal-title fw-bold">Confirm Order</h5>
                  <p className="text-muted small mb-0">{service.title} — {currentPkg.name}</p>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowOrderModal(false)}
                ></button>
              </div>

              <form onSubmit={handleOrderSubmit}>
                <div className="modal-body">
                  <div className="alert alert-info py-2 small mb-3">
                    <i className="bi bi-info-circle me-1"></i>
                    Simulation mode: No actual payment will be processed.
                  </div>

                  <div className="d-flex justify-content-between p-3 bg-light rounded-3 mb-3">
                    <div>
                      <strong className="d-block">{currentPkg.name} Package</strong>
                      <small className="text-muted">{currentPkg.delivery} delivery · {currentPkg.revisions} revisions</small>
                    </div>
                    <span className="fs-5 fw-bold text-primary-custom">₹{currentPkg.price.toLocaleString()}</span>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Order Instructions / Requirements</label>
                    <textarea
                      rows="3"
                      className="form-control form-control-custom"
                      placeholder="Specify your design preference, assets, brand colors, or guidelines..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowOrderModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary-custom px-4">
                    Place Simulated Order
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

export default ServiceDetails;
