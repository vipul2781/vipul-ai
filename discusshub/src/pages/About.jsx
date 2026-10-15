import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page py-5">
      {/* Hero Section */}
      <section className="hero-gradient py-5 mb-5 border-bottom">
        <div className="container text-center py-4">
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-3">
            Our Story &amp; Purpose
          </span>
          <h1 className="display-4 fw-extrabold text-dark mb-3">About DiscussHub</h1>
          <p className="lead text-secondary mx-auto fs-5 mb-0" style={{ maxWidth: '750px', lineHeight: 1.7 }}>
            DiscussHub is a community-driven platform where people can ask questions, share knowledge, discover new ideas, and participate in meaningful discussions.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Mission Section */}
        <section className="mb-5" id="mission">
          <div className="text-center mb-4">
            <span className="badge bg-success bg-opacity-10 text-success border border-success-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
              Core Purpose
            </span>
            <h2 className="h3 fw-bold text-dark">Our Mission</h2>
            <p className="text-secondary small">
              We empower inquisitive creators and learners to connect with clarity, civility, and trust.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: 'bi-lightbulb-fill',
                color: 'text-warning',
                title: 'Knowledge Sharing',
                desc: 'Open, accessible knowledge transfer from veteran practitioners to curious beginners.'
              },
              {
                icon: 'bi-people-fill',
                color: 'text-primary',
                title: 'Community Building',
                desc: 'Dedicated spaces for niche disciplines, emerging tech, creative arts, and shared passions.'
              },
              {
                icon: 'bi-chat-quote-fill',
                color: 'text-info',
                title: 'Open Discussion',
                desc: 'Freedom to debate technical tradeoffs, evaluate paradigms, and learn from constructive feedback.'
              },
              {
                icon: 'bi-heart-fill',
                color: 'text-danger',
                title: 'Helpful Conversations',
                desc: 'A supportive, toxic-free culture where asking questions is celebrated rather than judged.'
              },
              {
                icon: 'bi-compass-fill',
                color: 'text-success',
                title: 'Discovering New Ideas',
                desc: 'Serendipitous discovery across interdisciplinary frontiers, from AI to astrophysics.'
              }
            ].map((item, idx) => (
              <div key={idx} className="col-md-4 col-sm-6">
                <div className="card h-100 border rounded-4 p-4 shadow-sm bg-white">
                  <div className={`fs-2 mb-3 ${item.color}`}>
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <h3 className="h6 fw-bold mb-2">{item.title}</h3>
                  <p className="small text-secondary mb-0" style={{ lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works 4 Steps */}
        <section className="py-5 bg-white border rounded-4 p-4 p-md-5 mb-5 shadow-sm" id="how-it-works">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
              User Experience
            </span>
            <h2 className="h3 fw-bold text-dark">How DiscussHub Works</h2>
            <p className="text-secondary small">Four straightforward stages to collaborate with communities.</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-3 col-sm-6">
              <div className="p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
                >
                  <i className="bi bi-search fs-4"></i>
                </div>
                <h3 className="h6 fw-bold mb-1">1. Discover</h3>
                <p className="small text-secondary mb-0">Find communities you are interested in.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  <i className="bi bi-person-check fs-4"></i>
                </div>
                <h3 className="h6 fw-bold mb-1">2. Join</h3>
                <p className="small text-secondary mb-0">Become part of the community with one click.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #059669, #10B981)' }}
                >
                  <i className="bi bi-chat-text fs-4"></i>
                </div>
                <h3 className="h6 fw-bold mb-1">3. Discuss</h3>
                <p className="small text-secondary mb-0">Ask questions and share your knowledge.</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #EA580C, #F97316)' }}
                >
                  <i className="bi bi-link-45deg fs-4"></i>
                </div>
                <h3 className="h6 fw-bold mb-1">4. Connect</h3>
                <p className="small text-secondary mb-0">Interact with other members and vote.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-5">
          <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-dark text-white text-center">
            <h3 className="h4 fw-bold mb-4">DiscussHub in Numbers</h3>
            <div className="row g-4">
              <div className="col-md-3 col-6">
                <div className="display-5 fw-extrabold text-primary mb-1">500+</div>
                <div className="fw-semibold text-light">Communities</div>
                <span className="small text-secondary">Active topics</span>
              </div>
              <div className="col-md-3 col-6">
                <div className="display-5 fw-extrabold text-success mb-1">100K+</div>
                <div className="fw-semibold text-light">Members</div>
                <span className="small text-secondary">Global creators</span>
              </div>
              <div className="col-md-3 col-6">
                <div className="display-5 fw-extrabold text-info mb-1">250K+</div>
                <div className="fw-semibold text-light">Posts</div>
                <span className="small text-secondary">Cataloged threads</span>
              </div>
              <div className="col-md-3 col-6">
                <div className="display-5 fw-extrabold text-warning mb-1">1M+</div>
                <div className="fw-semibold text-light">Comments</div>
                <span className="small text-secondary">Community answers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-4">
          <h3 className="h4 fw-bold mb-2">Ready to become a DiscussHub member?</h3>
          <p className="text-secondary small mb-4">
            Explore hundreds of dedicated spaces and start sharing your journey today.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/communities" className="btn btn-primary-custom px-4 py-2">
              <i className="bi bi-grid me-1"></i>Explore Communities
            </Link>
            <Link to="/create-post" className="btn btn-outline-primary-custom px-4 py-2">
              <i className="bi bi-pencil-square me-1"></i>Create First Post
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
