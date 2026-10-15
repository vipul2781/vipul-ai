import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AmenityCard from '../components/AmenityCard';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, favoriteRoomIds, toggleFavoriteRoom, openModal } = useApp();

  const room = rooms.find((r) => r.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="card modern-card p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
          <h3 className="fw-bold mb-2">Room Listing Not Found</h3>
          <p className="text-secondary mb-4">
            The property or room you are looking for might have been moved or removed.
          </p>
          <Link to="/rooms" className="btn btn-primary-custom rounded-pill">
            Back to Available Rooms
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = favoriteRoomIds.includes(room.id);

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
      return d.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const galleryImages = room.images && room.images.length > 0 ? room.images : [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
  ];

  return (
    <div className="room-details-page py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '90vh' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/rooms" className="text-decoration-none">Rooms</Link></li>
            <li className="breadcrumb-item text-secondary text-truncate" style={{ maxWidth: '300px' }}>{room.title}</li>
          </ol>
        </nav>

        {/* Title & Key Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-4 gap-3">
          <div>
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span className="badge bg-primary-custom rounded-pill px-3 py-1.5">{room.roomType}</span>
              <span className="badge bg-secondary rounded-pill px-3 py-1.5">{room.propertyType}</span>
              <span className="badge bg-success bg-opacity-15 text-success border border-success-subtle rounded-pill px-3 py-1.5">
                <i className="bi bi-shield-check me-1"></i> Verified Property
              </span>
            </div>
            <h1 className="fw-bold fs-2 text-dark mb-1">{room.title}</h1>
            <p className="text-secondary mb-0 d-flex align-items-center gap-1">
              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span>{room.location}, {room.city}</span>
            </p>
          </div>

          {/* Quick Action Top Bar */}
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-secondary'} rounded-pill px-4 py-2 d-flex align-items-center gap-2`}
              onClick={() => toggleFavoriteRoom(room.id)}
            >
              <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
              <span>{isFavorite ? 'Saved' : 'Save Listing'}</span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="card modern-card p-3 mb-4 bg-white">
          {/* Main Large Image */}
          <div className="rounded-4 overflow-hidden position-relative mb-3" style={{ height: '440px', backgroundColor: '#000' }}>
            <img
              src={galleryImages[activeImageIndex]}
              alt={room.title}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
            <div className="position-absolute bottom-0 start-0 m-3 glass-badge">
              <i className="bi bi-camera-fill me-1"></i> Photo {activeImageIndex + 1} of {galleryImages.length}
            </div>
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="row g-2">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="col-3 col-md-2">
                  <div
                    className={`gallery-thumbnail ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout */}
        <div className="row g-4">
          {/* Left Column: Details, Description, Amenities, House Rules, Roommates */}
          <div className="col-lg-8">
            {/* Quick Specs Overview Grid */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Property Overview</h5>
              <div className="row g-3 text-secondary">
                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Monthly Rent</span>
                  <span className="fs-5 fw-bold text-primary-custom">{formatINR(room.rent)}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Security Deposit</span>
                  <span className="fs-5 fw-bold text-dark">{formatINR(room.securityDeposit)}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Available From</span>
                  <span className="fs-6 fw-bold text-dark">{formatDate(room.availableDate)}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Furnishing</span>
                  <span className="fs-6 fw-bold text-dark">{room.furnished}</span>
                </div>

                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Bedrooms</span>
                  <span className="fs-6 fw-bold text-dark">{room.bedrooms} Bedroom{room.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Bathrooms</span>
                  <span className="fs-6 fw-bold text-dark">{room.bathrooms} Attached</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Gender Preference</span>
                  <span className="fs-6 fw-bold text-dark">{room.genderPreference}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="d-block small text-muted">Property Type</span>
                  <span className="fs-6 fw-bold text-dark">{room.propertyType}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Description</h5>
              <p className="text-secondary leading-relaxed mb-0">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Amenities Included</h5>
              <div className="row g-3">
                {room.amenities.map((amenity, idx) => (
                  <AmenityCard key={idx} amenity={amenity} />
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">House Rules</h5>
              <div className="row g-3">
                {room.houseRules.map((rule, idx) => (
                  <div key={idx} className="col-md-6 col-12">
                    <div className="d-flex align-items-center gap-2 p-2 rounded-3 bg-light border">
                      <i className="bi bi-shield-check text-primary-custom fs-5"></i>
                      <span className="small text-dark fw-medium">{rule}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Housemates */}
            <div className="card modern-card p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Current Flatmates / Roommates</h5>
              {room.currentHousemates && room.currentHousemates.length > 0 ? (
                <div className="row g-3">
                  {room.currentHousemates.map((hm) => (
                    <div key={hm.id} className="col-md-6 col-12">
                      <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-light border">
                        <img
                          src={hm.avatar}
                          alt={hm.name}
                          className="rounded-circle object-fit-cover shadow-xs"
                          style={{ width: '60px', height: '60px' }}
                        />
                        <div>
                          <h6 className="fw-bold mb-0">{hm.name}, {hm.age}</h6>
                          <span className="small text-primary-custom fw-semibold d-block mb-1">{hm.occupation}</span>
                          <p className="text-secondary small mb-0">{hm.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-light rounded-3 text-secondary small">
                  <i className="bi bi-info-circle me-1 text-primary-custom"></i>
                  This property is currently vacant or ready for full independent occupancy. You can invite your friends or team up with housemates from our <Link to="/housemates" className="fw-semibold text-primary-custom">Housemates page</Link>.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Owner Sticky Box */}
          <div className="col-lg-4">
            <div className="card modern-card p-4 sticky-top" style={{ top: '90px' }}>
              <div className="mb-3">
                <span className="text-secondary small">Total Monthly Rent</span>
                <div className="price-tag fs-2">{formatINR(room.rent)} <span className="fs-6 fw-normal text-secondary">/mo</span></div>
                <span className="small text-muted d-block mt-1">
                  Security Deposit: <strong className="text-dark">{formatINR(room.securityDeposit)}</strong>
                </span>
              </div>

              <div className="d-flex flex-column gap-2.5 my-3">
                <button
                  type="button"
                  className="btn btn-primary-custom w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => openModal('contact-owner', 'Contact Property Owner', room.title, room)}
                >
                  <i className="bi bi-telephone-fill"></i> Contact Owner
                </button>

                <button
                  type="button"
                  className="btn btn-outline-custom w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  onClick={() => openModal('send-message', 'Direct Chat with Host', room.title, room)}
                >
                  <i className="bi bi-chat-dots-fill"></i> Send Message
                </button>

                <button
                  type="button"
                  className={`btn ${isFavorite ? 'btn-danger' : 'btn-light border'} w-100 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2`}
                  onClick={() => toggleFavoriteRoom(room.id)}
                >
                  <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  <span>{isFavorite ? 'Saved to Favorites' : 'Save Listing'}</span>
                </button>
              </div>

              <hr className="my-3 opacity-25" />

              <div className="small text-secondary">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-shield-fill-check text-success fs-5"></i>
                  <span>Zero brokerage guarantee</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-lock-fill text-primary-custom fs-5"></i>
                  <span>Secure direct contact verification</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-calendar-check text-warning fs-5"></i>
                  <span>Instant schedule for offline tour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
