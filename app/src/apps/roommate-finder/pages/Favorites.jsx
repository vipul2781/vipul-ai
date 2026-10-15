import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Favorites = () => {
  const {
    rooms,
    housemates,
    favoriteRoomIds,
    favoriteHousemateIds,
    toggleFavoriteRoom,
    toggleFavoriteHousemate
  } = useApp();

  const [activeTab, setActiveTab] = useState('rooms');
  const navigate = useNavigate();

  const savedRooms = rooms.filter((r) => favoriteRoomIds.includes(r.id));
  const savedHousemates = housemates.filter((h) => favoriteHousemateIds.includes(h.id));

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="favorites-page py-4" style={{ backgroundColor: '#F8FAFC', minHeight: '85vh' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Your Saved Favorites</h2>
          <p className="text-secondary mb-0">
            Keep track of shortlisted properties and promising housemates for easy review and direct contact.
          </p>
        </div>

        {/* Tabs */}
        <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-3">
          <button
            type="button"
            className={`btn rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${
              activeTab === 'rooms'
                ? 'btn-primary-custom text-white'
                : 'btn-light text-secondary border'
            }`}
            onClick={() => setActiveTab('rooms')}
          >
            <i className="bi bi-houses-fill"></i>
            <span>Saved Rooms</span>
            <span className="badge bg-white text-dark rounded-pill ms-1 font-monospace">
              {savedRooms.length}
            </span>
          </button>

          <button
            type="button"
            className={`btn rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${
              activeTab === 'housemates'
                ? 'btn-primary-custom text-white'
                : 'btn-light text-secondary border'
            }`}
            onClick={() => setActiveTab('housemates')}
          >
            <i className="bi bi-people-fill"></i>
            <span>Saved Housemates</span>
            <span className="badge bg-white text-dark rounded-pill ms-1 font-monospace">
              {savedHousemates.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Saved Rooms */}
        {activeTab === 'rooms' && (
          <div>
            {savedRooms.length > 0 ? (
              <div className="row g-4">
                {savedRooms.map((room) => (
                  <div key={room.id} className="col-lg-6 col-12">
                    <div className="card modern-card p-3 h-100">
                      <div className="row g-3 align-items-center">
                        <div className="col-sm-4">
                          <div className="rounded-3 overflow-hidden position-relative" style={{ height: '140px' }}>
                            <img
                              src={room.images && room.images.length > 0 ? room.images[0] : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80'}
                              alt={room.title}
                              className="w-100 h-100 object-fit-cover"
                            />
                            <span className="badge bg-dark bg-opacity-75 position-absolute top-0 start-0 m-2 rounded-pill small">
                              {room.roomType}
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-8">
                          <div className="d-flex flex-column justify-content-between h-100">
                            <div>
                              <div className="d-flex justify-content-between align-items-baseline mb-1">
                                <span className="fs-5 fw-extrabold text-primary-custom">
                                  {formatINR(room.rent)}
                                  <span className="fs-6 fw-normal text-secondary">/mo</span>
                                </span>
                                <span className="badge bg-light text-secondary border">
                                  {room.furnished}
                                </span>
                              </div>

                              <h6 className="fw-bold mb-1 text-truncate">
                                <Link to={`/rooms/${room.id}`} className="text-decoration-none text-dark hover-primary">
                                  {room.title}
                                </Link>
                              </h6>

                              <p className="text-secondary small mb-2 d-flex align-items-center gap-1">
                                <i className="bi bi-geo-alt-fill text-danger"></i>
                                <span className="text-truncate">{room.location}, {room.city}</span>
                              </p>
                            </div>

                            <div className="d-flex gap-2 pt-2 border-top">
                              <Link
                                to={`/rooms/${room.id}`}
                                className="btn btn-outline-custom btn-sm rounded-pill px-3 py-1.5 flex-grow-1"
                              >
                                View Details
                              </Link>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1.5"
                                onClick={() => toggleFavoriteRoom(room.id)}
                                title="Remove from favorites"
                              >
                                <i className="bi bi-trash3 me-1"></i> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card modern-card p-5 text-center my-4 bg-white">
                <div className="bg-light rounded-circle p-4 mx-auto mb-3" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-heartbreak fs-1 text-secondary"></i>
                </div>
                <h4 className="fw-bold mb-2">You haven't saved anything yet.</h4>
                <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '420px' }}>
                  Explore thousands of verified rooms across India and click the heart icon on any listing to save it here.
                </p>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary-custom rounded-pill px-4 py-2.5 fw-semibold"
                    onClick={() => navigate('/rooms')}
                  >
                    Explore Rooms
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Housemates */}
        {activeTab === 'housemates' && (
          <div>
            {savedHousemates.length > 0 ? (
              <div className="row g-4">
                {savedHousemates.map((hm) => (
                  <div key={hm.id} className="col-lg-6 col-12">
                    <div className="card modern-card p-3 h-100">
                      <div className="row g-3 align-items-center">
                        <div className="col-sm-4 text-center">
                          <img
                            src={hm.avatar}
                            alt={hm.name}
                            className="rounded-circle object-fit-cover shadow-sm border border-2 border-white"
                            style={{ width: '100px', height: '100px' }}
                          />
                          <span className="badge bg-success rounded-pill d-block mt-2 font-monospace">
                            {hm.compatibility}% Match
                          </span>
                        </div>

                        <div className="col-sm-8">
                          <div className="d-flex flex-column justify-content-between h-100">
                            <div>
                              <h6 className="fw-bold mb-0">
                                <Link to={`/housemates/${hm.id}`} className="text-decoration-none text-dark hover-primary">
                                  {hm.name}, {hm.age}
                                </Link>
                              </h6>
                              <span className="small text-primary-custom fw-semibold d-block mb-1">{hm.occupation}</span>
                              <p className="text-secondary small mb-1 d-flex align-items-center gap-1">
                                <i className="bi bi-geo-alt-fill text-danger"></i>
                                <span>{hm.location} • Budget: {formatINR(hm.budget)}/mo</span>
                              </p>

                              <div className="d-flex flex-wrap gap-1 mb-2">
                                {hm.lifestyleTags.slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="badge bg-light text-secondary border small">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="d-flex gap-2 pt-2 border-top">
                              <Link
                                to={`/housemates/${hm.id}`}
                                className="btn btn-outline-custom btn-sm rounded-pill px-3 py-1.5 flex-grow-1"
                              >
                                View Profile
                              </Link>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1.5"
                                onClick={() => toggleFavoriteHousemate(hm.id)}
                                title="Remove from favorites"
                              >
                                <i className="bi bi-trash3 me-1"></i> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card modern-card p-5 text-center my-4 bg-white">
                <div className="bg-light rounded-circle p-4 mx-auto mb-3" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-person-heart fs-1 text-secondary"></i>
                </div>
                <h4 className="fw-bold mb-2">You haven't saved any housemates yet.</h4>
                <p className="text-secondary mx-auto mb-4" style={{ maxWidth: '420px' }}>
                  Browse through compatible housemate profiles and bookmark candidates to team up with.
                </p>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary-custom rounded-pill px-4 py-2.5 fw-semibold"
                    onClick={() => navigate('/housemates')}
                  >
                    Explore Housemates
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
