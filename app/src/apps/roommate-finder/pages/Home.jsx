import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { locationsData } from '../data/locations';
import RoomCard from '../components/RoomCard';
import LocationCard from '../components/LocationCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { rooms } = useApp();
  const navigate = useNavigate();

  // Pick first 6 featured or active rooms
  const featuredRooms = rooms.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-gradient-bg py-5 py-lg-6 border-bottom">
        <div className="container py-lg-4">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-xl-9 col-lg-10">
              <span className="hero-tag mb-3">
                <i className="bi bi-patch-check-fill"></i> India's #1 Trusted Co-living Platform
              </span>
              <h1 className="display-4 fw-extrabold text-dark mb-3 tracking-tight">
                Find a Room. Find a House.<br />
                <span className="text-primary-custom">Find Your Perfect Housemate.</span>
              </h1>
              <p className="lead text-secondary mb-4 mx-auto" style={{ maxWidth: '680px' }}>
                Discover affordable rooms and compatible housemates in your preferred location. Verified listings, zero brokerage hassles, and curated lifestyle matching.
              </p>

              {/* Search Box */}
              <div className="mt-4 mb-3">
                <SearchBar />
              </div>

              {/* Quick stats under search */}
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 text-secondary small pt-3">
                <span className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-shield-lock-fill text-success"></i> 100% Verified Properties
                </span>
                <span className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-person-check-fill text-primary-custom"></i> AI Compatibility Matching
                </span>
                <span className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-lightning-charge-fill text-warning"></i> Instant Owner Connection
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Locations Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-2">
            <div>
              <span className="text-primary-custom fw-bold text-uppercase small tracking-wider">Top Destinations</span>
              <h2 className="fw-bold mb-1">Popular Locations</h2>
              <p className="text-secondary mb-0">Browse rooms and verified flatmates in leading metropolitan cities.</p>
            </div>
            <Link to="/rooms" className="btn btn-outline-custom rounded-pill px-4">
              View All Cities <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {locationsData.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-lg-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-2">
            <div>
              <span className="text-primary-custom fw-bold text-uppercase small tracking-wider">Curated Picks</span>
              <h2 className="fw-bold mb-1">Featured Rooms</h2>
              <p className="text-secondary mb-0">Handpicked, high-rated rooms with modern furnishings ready for move-in.</p>
            </div>
            <Link to="/rooms" className="btn btn-primary-custom rounded-pill px-4">
              Explore All Rooms <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary-custom fw-bold text-uppercase small tracking-wider">Simple & Transparent</span>
            <h2 className="fw-bold mb-2">How It Works</h2>
            <p className="text-secondary">Find your next comfortable home in three simple steps.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Step 1 */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4">
                <div className="step-number-bubble mx-auto">1</div>
                <h4 className="fw-bold mb-2">Search</h4>
                <p className="text-secondary mb-0">
                  Filter through verified rooms, apartments, and compatible housemates based on your budget, city, and lifestyle habits.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4">
                <div className="step-number-bubble mx-auto">2</div>
                <h4 className="fw-bold mb-2">Connect</h4>
                <p className="text-secondary mb-0">
                  Chat with verified property owners or prospective roommates. Check compatibility scores, habits, and schedule in-person tours.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="card h-100 border-0 shadow-sm p-4 text-center rounded-4">
                <div className="step-number-bubble mx-auto">3</div>
                <h4 className="fw-bold mb-2">Move In</h4>
                <p className="text-secondary mb-0">
                  Finalize your rental agreement with transparent deposits, move into your new home, and start living comfortably!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose RoomMate */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="text-primary-custom fw-bold text-uppercase small tracking-wider">Our Advantages</span>
            <h2 className="fw-bold mb-2">Why Choose RoomMate?</h2>
            <p className="text-secondary">Designed specifically to eliminate house-hunting headaches and awkward roommate pairings.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="card modern-card h-100 p-4 border-0">
                <div className="bg-primary-light text-primary-custom rounded-3 d-inline-flex p-3 mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-patch-check-fill fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">Verified Listings</h5>
                <p className="text-secondary small mb-0">
                  Every property photo, rent amount, and owner background is manually verified by our local operations team.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="card modern-card h-100 p-4 border-0">
                <div className="bg-primary-light text-primary-custom rounded-3 d-inline-flex p-3 mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-search-heart-fill fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">Easy Search</h5>
                <p className="text-secondary small mb-0">
                  Granular filters for budget, private vs shared rooms, pet friendliness, dietary preferences, and move-in timelines.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="card modern-card h-100 p-4 border-0">
                <div className="bg-primary-light text-primary-custom rounded-3 d-inline-flex p-3 mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-people-fill fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">Compatible Housemates</h5>
                <p className="text-secondary small mb-0">
                  Our proprietary lifestyle tag algorithm pairs you with housemates who share your schedule, cleanliness, and vibes.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="card modern-card h-100 p-4 border-0">
                <div className="bg-primary-light text-primary-custom rounded-3 d-inline-flex p-3 mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-shield-shaded fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">Safe & Simple</h5>
                <p className="text-secondary small mb-0">
                  Safe communication, verified mobile numbers, and zero spam calls from aggressive brokers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}>
        <div className="container py-lg-4 text-center text-white">
          <h2 className="display-6 fw-bold mb-3 text-white">Ready to find your next home?</h2>
          <p className="text-light-emphasis lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Join thousands of students and working professionals discovering peaceful rooms and like-minded housemates today.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              onClick={() => navigate('/rooms')}
              className="btn btn-primary-custom btn-lg rounded-pill px-5 fw-bold"
            >
              Find a Room
            </button>
            <button
              onClick={() => navigate('/post-room')}
              className="btn btn-outline-light btn-lg rounded-pill px-5 fw-semibold"
            >
              Post a Room Listing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
