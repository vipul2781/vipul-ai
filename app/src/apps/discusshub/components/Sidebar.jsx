import React from 'react';
import { Link } from 'react-router-dom';
import { useForum } from '../context/ForumContext';

const Sidebar = () => {
  const { communities, toggleJoinCommunity } = useForum();

  // Top 5 communities by members
  const topCommunities = [...communities]
    .sort((a, b) => b.membersCount - a.membersCount)
    .slice(0, 5);

  const popularTags = [
    'React',
    'JavaScript',
    'TypeScript',
    'WebDev',
    'DevOps',
    'AI',
    'Gaming',
    'Photography',
    'Cinema',
    'Productivity',
    'Science',
    'Ableton'
  ];

  return (
    <aside className="d-flex flex-column gap-4">
      {/* Quick Action Card */}
      <div className="card border rounded-4 p-3 shadow-sm bg-white">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center text-white"
            style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
          >
            <i className="bi bi-chat-quote-fill"></i>
          </div>
          <div>
            <h6 className="fw-bold mb-0">Join the Conversation</h6>
            <span className="small text-muted">DiscussHub Community</span>
          </div>
        </div>
        <p className="small text-secondary mb-3">
          Share your questions, showcase projects, and connect with 100K+ passionate creators.
        </p>
        <div className="d-grid gap-2">
          <Link to="/create-post" className="btn btn-primary-custom btn-sm">
            <i className="bi bi-pencil-square me-1"></i> Create Discussion
          </Link>
          <Link to="/create-community" className="btn btn-outline-primary-custom btn-sm">
            <i className="bi bi-people-fill me-1"></i> Start a Community
          </Link>
        </div>
      </div>

      {/* Top Communities Widget */}
      <div className="card border rounded-4 p-3 shadow-sm bg-white">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="fw-bold mb-0 d-flex align-items-center gap-1">
            <i className="bi bi-trophy text-warning"></i>
            <span>Top Communities</span>
          </h6>
          <Link to="/communities" className="small text-primary text-decoration-none fw-semibold">
            All
          </Link>
        </div>

        <div className="d-flex flex-column gap-3">
          {topCommunities.map((c, idx) => (
            <div key={c.id} className="d-flex align-items-center justify-content-between">
              <Link
                to={`/communities/${c.id}`}
                className="d-flex align-items-center gap-2 text-decoration-none text-dark flex-grow-1 overflow-hidden me-2"
              >
                <span className="small fw-bold text-muted" style={{ minWidth: '16px' }}>
                  {idx + 1}
                </span>
                <img
                  src={c.icon}
                  alt={c.name}
                  className="rounded-circle flex-shrink-0"
                  style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                />
                <div className="text-truncate">
                  <div className="fw-bold small text-truncate hover-primary">{c.name}</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                    {(c.membersCount / 1000).toFixed(0)}K members
                  </div>
                </div>
              </Link>
              <button
                type="button"
                className={`btn btn-sm ${
                  c.isJoined ? 'btn-outline-secondary' : 'btn-light text-primary border'
                } rounded-pill px-2 py-0 fw-semibold`}
                style={{ fontSize: '0.78rem' }}
                onClick={() => toggleJoinCommunity(c.id)}
              >
                {c.isJoined ? 'Joined' : 'Join'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Topics Cloud */}
      <div className="card border rounded-4 p-3 shadow-sm bg-white">
        <h6 className="fw-bold mb-3 d-flex align-items-center gap-1">
          <i className="bi bi-hash text-primary"></i>
          <span>Popular Topics</span>
        </h6>
        <div className="d-flex flex-wrap gap-1">
          {popularTags.map((tag, idx) => (
            <Link
              key={idx}
              to={`/search?q=${encodeURIComponent(tag)}`}
              className="badge bg-light text-secondary border border-light-subtle py-1 px-2 text-decoration-none hover-primary fw-medium"
              style={{ fontSize: '0.78rem' }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Community Rules Box */}
      <div className="card border rounded-4 p-3 shadow-sm bg-light">
        <h6 className="fw-bold mb-2 text-dark d-flex align-items-center gap-1">
          <i className="bi bi-shield-check text-success"></i>
          <span>Community Guidelines</span>
        </h6>
        <ol className="small text-secondary ps-3 mb-0" style={{ lineHeight: '1.6' }}>
          <li>Remember the human behind the screen.</li>
          <li>Be constructive and courteous.</li>
          <li>Search before creating duplicate questions.</li>
          <li>Format source code properly.</li>
          <li>Zero tolerance for spam or harassment.</li>
        </ol>
      </div>

      {/* Footer Micro Links */}
      <div className="small text-muted px-2 d-flex flex-wrap gap-2">
        <Link to="/about" className="text-decoration-none text-muted">About</Link>
        <span>•</span>
        <Link to="/communities" className="text-decoration-none text-muted">Communities</Link>
        <span>•</span>
        <Link to="/moderation" className="text-decoration-none text-muted">Moderation</Link>
        <span>•</span>
        <Link to="/saved" className="text-decoration-none text-muted">Bookmarks</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
