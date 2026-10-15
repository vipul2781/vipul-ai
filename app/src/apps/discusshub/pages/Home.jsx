import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import CommunityCard from '../components/CommunityCard';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { useForum } from '../context/ForumContext';

const Home = () => {
  const { posts, communities } = useForum();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Trending');
  const navigate = useNavigate();

  const handleHeroSearchSubmit = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularTopics = [
    'React',
    'JavaScript',
    'Technology',
    'Gaming',
    'Movies',
    'Education',
    'Programming',
    'Photography'
  ];

  // 6 Trending Posts
  const trendingPosts = posts.filter(p => p.isTrending).slice(0, 6);

  // Tabbed discussions
  let tabFilteredPosts = [...posts];
  if (activeTab === 'Trending') {
    tabFilteredPosts = posts.filter(p => p.isTrending || p.votes > 250);
  } else if (activeTab === 'Popular') {
    tabFilteredPosts = [...posts].sort((a, b) => b.votes - a.votes);
  } else if (activeTab === 'Recent') {
    tabFilteredPosts = [...posts].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }

  // First 8 popular communities
  const popularCommunities = communities.slice(0, 8);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-gradient py-5 py-lg-6">
        <div className="container py-3">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9 col-xl-8">
              <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-3">
                <i className="bi bi-stars me-1"></i> Welcome to DiscussHub
              </span>

              <h1 className="display-4 fw-extrabold text-dark tracking-tight mb-3">
                Join the conversation.
              </h1>

              <p className="lead text-secondary mb-4 fs-5" style={{ lineHeight: 1.6 }}>
                Discover communities, ask questions, share ideas, and connect with people who share your interests.
              </p>

              {/* Large Search Bar */}
              <div className="mx-auto mb-4" style={{ maxWidth: '680px' }}>
                <SearchBar
                  value={heroSearch}
                  onChange={setHeroSearch}
                  onSubmit={handleHeroSearchSubmit}
                  placeholder="Search discussions, communities, or topics..."
                  size="lg"
                />
              </div>

              {/* Popular Topics List */}
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                <span className="small text-muted fw-semibold me-1">Popular Topics:</span>
                {popularTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="topic-pill"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(topic)}`)}
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR COMMUNITIES */}
      <section className="py-5 bg-white border-bottom border-light-subtle">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
            <div>
              <span className="text-primary fw-bold text-uppercase small tracking-wider">
                Explore Interests
              </span>
              <h2 className="h3 fw-bold text-dark mb-0">Popular Communities</h2>
            </div>
            <Link to="/communities" className="btn btn-outline-primary-custom btn-sm">
              View All Communities <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {popularCommunities.map((c) => (
              <div key={c.id} className="col-lg-3 col-md-6 col-sm-6">
                <CommunityCard community={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRENDING DISCUSSIONS & MAIN FEED */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Left 8 Cols: Discussions Feed */}
            <div className="col-lg-8">
              {/* Trending Discussions Heading */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="p-2 rounded-3 bg-danger bg-opacity-10 text-danger">
                    <i className="bi bi-fire fs-5"></i>
                  </span>
                  <h2 className="h4 fw-bold text-dark mb-0">Trending Discussions</h2>
                </div>
                <p className="text-secondary small mb-0">
                  Catch up with discussions driving the highest engagement across communities right now.
                </p>
              </div>

              {/* 6 Trending Posts */}
              <div className="mb-5">
                {trendingPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Popular Discussions with Filter Tabs */}
              <div className="card border rounded-4 shadow-sm p-4 bg-white mb-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
                  <div>
                    <h3 className="h4 fw-bold mb-1">Explore Discussions</h3>
                    <p className="text-muted small mb-0">Browse through insightful community conversations</p>
                  </div>

                  <ul className="nav nav-pills custom-pills gap-1">
                    {['Trending', 'Popular', 'Recent'].map((tab) => (
                      <li className="nav-item" key={tab}>
                        <button
                          type="button"
                          className={`nav-link rounded-pill px-3 py-1 fw-bold ${
                            activeTab === tab ? 'active bg-primary text-white' : 'text-secondary bg-light'
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab === 'Trending' && <i className="bi bi-fire me-1"></i>}
                          {tab === 'Popular' && <i className="bi bi-graph-up-arrow me-1"></i>}
                          {tab === 'Recent' && <i className="bi bi-clock-history me-1"></i>}
                          {tab}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tab Filtered Discussions Feed */}
                <div>
                  {tabFilteredPosts.slice(0, 7).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                <div className="text-center pt-3">
                  <Link to="/search" className="btn btn-outline-primary-custom px-4 py-2">
                    Browse All Discussions <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Sidebar */}
            <div className="col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW DISCUSSHUB WORKS */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container py-4">
          <div className="text-center max-w-xl mx-auto mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
              Simple &amp; Engaging
            </span>
            <h2 className="display-6 fw-bold text-dark">How DiscussHub Works</h2>
            <p className="text-secondary lead fs-6">
              Connect with enthusiasts, ask questions, share answers, and expand your horizons in 4 simple steps.
            </p>
          </div>

          <div className="row g-4 text-center">
            {/* Step 1 */}
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 border-0 p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
                >
                  <i className="bi bi-compass fs-3"></i>
                </div>
                <h3 className="h6 fw-bold mb-2">1. Find a Community</h3>
                <p className="small text-secondary mb-0">
                  Discover communities based on your interests from programming to gaming and science.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 border-0 p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  <i className="bi bi-chat-text fs-3"></i>
                </div>
                <h3 className="h6 fw-bold mb-2">2. Join the Discussion</h3>
                <p className="small text-secondary mb-0">
                  Read insightful posts and participate in discussions with developers and creators.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 border-0 p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #059669, #10B981)' }}
                >
                  <i className="bi bi-pencil-square fs-3"></i>
                </div>
                <h3 className="h6 fw-bold mb-2">3. Share Your Ideas</h3>
                <p className="small text-secondary mb-0">
                  Create rich posts, conduct polls, share code snippets, and ask pressing questions.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="col-md-3 col-sm-6">
              <div className="card h-100 border-0 p-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white shadow-sm"
                  style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #EA580C, #F97316)' }}
                >
                  <i className="bi bi-hand-thumbs-up fs-3"></i>
                </div>
                <h3 className="h6 fw-bold mb-2">4. Vote &amp; Connect</h3>
                <p className="small text-secondary mb-0">
                  Vote on useful content, bookmark discussions, and interact with other community members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STATISTICS SECTION */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="stat-box">
                <div className="display-5 fw-extrabold text-primary mb-1">500+</div>
                <div className="fw-semibold text-dark">Communities</div>
                <div className="small text-muted">Across 10 categories</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-box">
                <div className="display-5 fw-extrabold text-success mb-1">100K+</div>
                <div className="fw-semibold text-dark">Members</div>
                <div className="small text-muted">Active worldwide</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-box">
                <div className="display-5 fw-extrabold text-info mb-1">250K+</div>
                <div className="fw-semibold text-dark">Discussions</div>
                <div className="small text-muted">Shared &amp; cataloged</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-box">
                <div className="display-5 fw-extrabold text-warning mb-1">1M+</div>
                <div className="fw-semibold text-dark">Comments</div>
                <div className="small text-muted">Thoughtful exchanges</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)' }}>
        <div className="container py-4 text-center text-white">
          <h2 className="display-6 fw-bold mb-3">Have something to say?</h2>
          <p className="lead text-light opacity-75 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Join the community and start your first discussion. Connect with peers, receive answers, and build your reputation.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/communities" className="btn btn-light btn-lg px-4 py-2 fw-bold text-primary shadow">
              <i className="bi bi-grid-3x3-gap-fill me-2"></i>Explore Communities
            </Link>
            <Link to="/create-post" className="btn btn-primary-custom btn-lg px-4 py-2 fw-bold shadow">
              <i className="bi bi-pencil-fill me-2"></i>Create a Post
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
