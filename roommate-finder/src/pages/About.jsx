import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="hero-gradient-bg py-5 border-bottom">
        <div className="container py-lg-4 text-center">
          <span className="hero-tag mb-3">
            <i className="bi bi-shield-heart-fill"></i> Community First Co-Living
          </span>
          <h1 className="display-4 fw-extrabold text-dark mb-3">About RoomMate</h1>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '720px' }}>
            We are redefining how young professionals and students discover safe housing and compatible flatmates across India's fastest-growing cities.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-lg-3 col-6">
              <div className="p-3">
                <div className="display-5 fw-extrabold text-primary-custom mb-1">10,000+</div>
                <div className="text-secondary fw-semibold">Verified Rooms</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="p-3">
                <div className="display-5 fw-extrabold text-primary-custom mb-1">5,000+</div>
                <div className="text-secondary fw-semibold">Compatible Housemates</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="p-3">
                <div className="display-5 fw-extrabold text-primary-custom mb-1">20+</div>
                <div className="text-secondary fw-semibold">Metropolitan Cities</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="p-3">
                <div className="display-5 fw-extrabold text-primary-custom mb-1">95%</div>
                <div className="text-secondary fw-semibold">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-primary-custom fw-bold text-uppercase small tracking-wider">Our Purpose</span>
              <h2 className="fw-bold mb-3 display-6">Our Mission</h2>
              <p className="text-secondary leading-relaxed mb-3">
                Finding a flat in a new city has historically been a stressful ordeal: high brokerage fees, misleading photos, unresponsive brokers, and the constant fear of moving in with incompatible roommates.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                <strong>RoomMate</strong> was founded to bridge this gap. We combine smart lifestyle compatibility algorithms with 100% verified property listings, transparent deposits, and an authentic community of trustworthy house-hunters.
              </p>
              <div className="d-flex flex-column gap-2.5">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-success fs-5"></i>
                  <span className="fw-semibold text-dark">Zero brokerage and zero hidden costs</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-success fs-5"></i>
                  <span className="fw-semibold text-dark">Verified lifestyle matching (habits, diet, sleep schedules)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-success fs-5"></i>
                  <span className="fw-semibold text-dark">Safe direct communication between tenants & verified owners</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
                  alt="Friends and housemates enjoying home"
                  className="rounded-4 w-100 shadow-lg object-fit-cover"
                  style={{ height: '380px' }}
                />
                <div className="card modern-card p-3 position-absolute bottom-0 start-0 m-3 shadow-lg border-0 bg-white" style={{ maxWidth: '280px' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="bg-success text-white rounded-circle p-2 d-inline-flex">
                      <i className="bi bi-heart-fill fs-6"></i>
                    </div>
                    <div>
                      <div className="fw-bold small text-dark">Community First</div>
                      <div className="text-secondary" style={{ fontSize: '0.75rem' }}>Over 25,000 matches made</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How RoomMate Works */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary-custom fw-bold text-uppercase small tracking-wider">The Process</span>
            <h2 className="fw-bold mb-2">How RoomMate Works</h2>
            <p className="text-secondary">A transparent experience from your first search to the day you move in.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4 col-12">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
                <div className="bg-primary-custom text-white rounded-3 p-3 mb-3 d-inline-flex" style={{ width: 'fit-content' }}>
                  <i className="bi bi-search fs-4"></i>
                </div>
                <h4 className="fw-bold mb-2">1. Explore & Filter</h4>
                <p className="text-secondary mb-0">
                  Select your city, budget ceiling, room type, and lifestyle preferences to instantly uncover listings that meet your exact standards.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-12">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
                <div className="bg-primary-custom text-white rounded-3 p-3 mb-3 d-inline-flex" style={{ width: 'fit-content' }}>
                  <i className="bi bi-chat-quote-fill fs-4"></i>
                </div>
                <h4 className="fw-bold mb-2">2. Match & Connect</h4>
                <p className="text-secondary mb-0">
                  Review compatibility metrics and send instant inquiries to owners or housemate profiles directly through the platform.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-12">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
                <div className="bg-primary-custom text-white rounded-3 p-3 mb-3 d-inline-flex" style={{ width: 'fit-content' }}>
                  <i className="bi bi-house-check-fill fs-4"></i>
                </div>
                <h4 className="fw-bold mb-2">3. Tour & Move In</h4>
                <p className="text-secondary mb-0">
                  Visit the property in person, agree on terms with no middlemen, unpack your bags, and feel right at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use RoomMate? */}
      <section className="py-5" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary-custom fw-bold text-uppercase small tracking-wider">Features</span>
            <h2 className="fw-bold mb-2">Why Use RoomMate?</h2>
            <p className="text-secondary">Everything you need to find an authentic home and like-minded friends.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-12">
              <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-4 border shadow-xs">
                <div className="bg-primary-light text-primary-custom rounded-3 p-3 flex-shrink-0">
                  <i className="bi bi-file-earmark-check-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Zero Brokerage Fees</h5>
                  <p className="text-secondary small mb-0">Never pay an entire month's rent to a middleman. All listings are directly posted by owners and current flatmates.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-4 border shadow-xs">
                <div className="bg-primary-light text-primary-custom rounded-3 p-3 flex-shrink-0">
                  <i className="bi bi-heart-pulse-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Lifestyle & Habit Compatibility</h5>
                  <p className="text-secondary small mb-0">Match with roommates who respect your sleep cycle, diet (veg/non-veg), pet preferences, and work schedules.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-4 border shadow-xs">
                <div className="bg-primary-light text-primary-custom rounded-3 p-3 flex-shrink-0">
                  <i className="bi bi-shield-lock-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Privacy & Safety Guaranteed</h5>
                  <p className="text-secondary small mb-0">Your phone number and contact details are safeguarded. Only verified users can send connection inquiries.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="d-flex align-items-start gap-3 p-3 bg-white rounded-4 border shadow-xs">
                <div className="bg-primary-light text-primary-custom rounded-3 p-3 flex-shrink-0">
                  <i className="bi bi-phone-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Mobile & Desktop Friendly</h5>
                  <p className="text-secondary small mb-0">Seamless experience whether you're searching on your phone during commute or on laptop from home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}>
        <div className="container py-lg-4 text-center text-white">
          <h2 className="display-6 fw-bold mb-3 text-white">Start your home search today</h2>
          <p className="text-light-emphasis lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Find available rooms or connect with potential housemates across top Indian cities.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/rooms" className="btn btn-primary-custom btn-lg rounded-pill px-5 fw-bold">
              Find a Room
            </Link>
            <Link to="/housemates" className="btn btn-outline-light btn-lg rounded-pill px-5 fw-semibold">
              Find Housemates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
