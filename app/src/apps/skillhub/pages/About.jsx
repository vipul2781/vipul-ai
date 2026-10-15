import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page pb-5">
      {/* Hero Header */}
      <section className="about-hero text-white text-center">
        <div className="container">
          <span className="badge rounded-pill bg-primary-soft text-light border border-light px-3 py-2 mb-3">
            Connecting Talent Across India & The World
          </span>
          <h1 className="display-4 fw-bold mb-3">About SkillHub</h1>
          <p className="lead opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
            SkillHub is India’s modern freelancer marketplace designed to bridge ambitious businesses with elite freelance specialists.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 col-12">
              <span className="text-primary fw-bold text-uppercase small">Our Core Purpose</span>
              <h2 className="section-title mb-3">Our Mission</h2>
              <p className="text-secondary leading-relaxed mb-4">
                At SkillHub, our mission is dual-sided: we empower businesses and startups to seamlessly discover, collaborate with, and hire premier talent without friction; while simultaneously helping independent professionals build thriving freelance careers on their own terms.
              </p>
              <div className="border-start border-primary border-4 ps-3 mb-4">
                <p className="fst-italic text-dark fw-semibold mb-0">
                  "Find the right talent. Get work done with certainty, trust, and speed."
                </p>
              </div>
              <div className="d-flex gap-3">
                <div className="p-3 bg-light rounded-3 text-center flex-fill">
                  <h4 className="fw-bold text-primary-custom mb-0">100%</h4>
                  <small className="text-muted">Payment Protection</small>
                </div>
                <div className="p-3 bg-light rounded-3 text-center flex-fill">
                  <h4 className="fw-bold text-primary-custom mb-0">24/7</h4>
                  <small className="text-muted">Dedicated Support</small>
                </div>
                <div className="p-3 bg-light rounded-3 text-center flex-fill">
                  <h4 className="fw-bold text-primary-custom mb-0">0%</h4>
                  <small className="text-muted">Hidden Fees</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="rounded-4 overflow-hidden shadow-lg position-relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works comparison */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">Transparent Workflow</span>
            <h2 className="section-title">How SkillHub Operates</h2>
            <p className="text-muted">A structured path designed specifically for both clients and talent.</p>
          </div>

          <div className="row g-4">
            {/* For Clients */}
            <div className="col-lg-6 col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <span className="p-2 bg-primary-soft text-primary-custom rounded-circle">
                    <i className="bi bi-briefcase-fill fs-4"></i>
                  </span>
                  <h4 className="fw-bold mb-0">For Clients</h4>
                </div>

                <div className="d-flex gap-3 mb-3">
                  <div className="step-number" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>1</div>
                  <div>
                    <h6 className="fw-bold mb-1">Post a Project or Browse Gigs</h6>
                    <p className="text-muted small mb-0">Clearly define your scope, deadline, and expected budget.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3">
                  <div className="step-number" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>2</div>
                  <div>
                    <h6 className="fw-bold mb-1">Review Freelancers & Proposals</h6>
                    <p className="text-muted small mb-0">Evaluate real reviews, past portfolio samples, and competitive bids.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3">
                  <div className="step-number" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>3</div>
                  <div>
                    <h6 className="fw-bold mb-1">Hire & Fund Milestones</h6>
                    <p className="text-muted small mb-0">Deposit milestone payments safely into our secure simulated escrow.</p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="step-number" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>4</div>
                  <div>
                    <h6 className="fw-bold mb-1">Receive & Approve Work</h6>
                    <p className="text-muted small mb-0">Inspect the delivered code or assets, request revisions, and release payment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Freelancers */}
            <div className="col-lg-6 col-12">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                <div className="d-flex align-items-center gap-2 mb-4">
                  <span className="p-2 bg-success-soft text-success rounded-circle">
                    <i className="bi bi-person-badge-fill fs-4"></i>
                  </span>
                  <h4 className="fw-bold mb-0">For Freelancers</h4>
                </div>

                <div className="d-flex gap-3 mb-3">
                  <div className="step-number bg-success" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>1</div>
                  <div>
                    <h6 className="fw-bold mb-1">Create an Impactful Profile</h6>
                    <p className="text-muted small mb-0">Highlight your technical stack, experience, certifications, and rates.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3">
                  <div className="step-number bg-success" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>2</div>
                  <div>
                    <h6 className="fw-bold mb-1">Discover Meaningful Projects</h6>
                    <p className="text-muted small mb-0">Filter by category, budget tier, and client ratings matching your expertise.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3">
                  <div className="step-number bg-success" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>3</div>
                  <div>
                    <h6 className="fw-bold mb-1">Submit Custom Proposals</h6>
                    <p className="text-muted small mb-0">Send compelling cover letters and tailored bid quotes directly to clients.</p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="step-number bg-success" style={{ width: 40, height: 40, fontSize: '1.1rem', flexShrink: 0 }}>4</div>
                  <div>
                    <h6 className="fw-bold mb-1">Complete Work & Get Paid</h6>
                    <p className="text-muted small mb-0">Deliver quality outcomes, receive 5-star ratings, and grow earnings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-6 text-center">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Freelancers</div>
            </div>
            <div className="col-lg-3 col-6 text-center">
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="col-lg-3 col-6 text-center">
              <div className="stat-number">100+</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="col-lg-3 col-6 text-center">
              <div className="stat-number">95%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section text-center text-white">
        <div className="container">
          <h2 className="mb-3">Take the next step with SkillHub</h2>
          <p className="mx-auto mb-4 opacity-75" style={{ maxWidth: '600px' }}>
            Whether you want to build the next groundbreaking app or offer your specialized craft, we have you covered.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/post-service" className="btn btn-cta-primary">
              <i className="bi bi-briefcase me-2"></i>Start Freelancing
            </Link>
            <Link to="/freelancers" className="btn btn-cta-secondary">
              <i className="bi bi-search me-2"></i>Find Talent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
