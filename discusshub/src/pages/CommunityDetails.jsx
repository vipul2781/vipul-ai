import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import { useForum } from '../context/ForumContext';

const CommunityDetails = () => {
  const { id } = useParams();
  const { communities, posts, users, toggleJoinCommunity } = useForum();
  const [activeTab, setActiveTab] = useState('Posts');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Find community by id or slug
  const community = communities.find(
    (c) => c.id === id || c.slug === id
  ) || communities[0];

  // Filter posts belonging to this community
  const communityPosts = useMemo(() => {
    let list = posts.filter(
      (p) => p.communityId === community.id || p.communityName === community.name
    );

    // If no direct matches, supply a couple related posts
    if (list.length === 0) {
      list = posts.slice(0, 4);
    }

    if (activeTab === 'Popular') {
      return [...list].sort((a, b) => b.votes - a.votes);
    }
    if (activeTab === 'Recent') {
      return [...list].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }
    return list;
  }, [posts, community, activeTab]);

  // Pagination calculations
  const totalPages = Math.ceil(communityPosts.length / postsPerPage) || 1;
  const paginatedPosts = communityPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="community-details-page pb-5">
      {/* Community Cover Banner */}
      <div
        className="community-banner position-relative"
        style={{
          height: '240px',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${community.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#4F46E5'
        }}
      >
        <div className="container h-100 position-relative">
          <div className="position-absolute bottom-0 start-0 p-3 d-flex align-items-end gap-3 flex-wrap">
            <img
              src={community.icon}
              alt={community.name}
              className="rounded-4 border border-4 border-white shadow-lg bg-white"
              style={{ width: '90px', height: '90px', objectFit: 'cover' }}
            />
            <div className="text-white pb-1">
              <h1 className="h3 fw-bold mb-0 text-white text-shadow">
                {community.name}
              </h1>
              <span className="small opacity-75 fw-medium">
                {community.tagline || `r/${community.name.replace(/\s+/g, '')}`} • Created {community.createdAt || '2021'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Community Header Sub-bar */}
      <div className="bg-white border-bottom py-3 shadow-sm mb-4">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            {/* Quick metrics */}
            <div className="d-flex align-items-center gap-4 text-secondary small">
              <div>
                <strong className="text-dark fs-6 d-block">
                  {(community.membersCount / 1000).toFixed(community.membersCount > 9999 ? 0 : 1)}K
                </strong>
                <span>Members</span>
              </div>
              <div>
                <strong className="text-dark fs-6 d-block">
                  {community.onlineCount || 1200}
                </strong>
                <span className="d-flex align-items-center gap-1">
                  <span className="p-1 bg-success rounded-circle"></span> Online
                </span>
              </div>
              <div>
                <strong className="text-dark fs-6 d-block">
                  {community.postsCount || communityPosts.length}
                </strong>
                <span>Discussions</span>
              </div>
            </div>

            {/* Actions: Join & Create Post */}
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className={`btn ${
                  community.isJoined
                    ? 'btn-outline-secondary'
                    : 'btn-primary-custom'
                } rounded-pill px-4 py-2 fw-bold shadow-sm`}
                onClick={() => toggleJoinCommunity(community.id)}
              >
                {community.isJoined ? (
                  <>
                    <i className="bi bi-check-lg me-1"></i>Joined Community
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-lg me-1"></i>Join Community
                  </>
                )}
              </button>

              <Link
                to={`/create-post?community=${community.id}`}
                className="btn btn-outline-primary-custom rounded-pill px-3 py-2 fw-semibold"
              >
                <i className="bi bi-pencil-square me-1"></i>Create Post
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container">
        <div className="row g-4">
          {/* Left Column: Navigation Tabs & Feed (col-lg-8) */}
          <div className="col-lg-8">
            {/* Community Navigation Tabs */}
            <div className="card border rounded-4 shadow-sm mb-4 p-2 bg-white">
              <ul className="nav nav-pills custom-nav-pills gap-1">
                {['Posts', 'Popular', 'Recent', 'Members', 'About'].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      type="button"
                      className={`nav-link rounded-pill px-3 py-1 fw-bold ${
                        activeTab === tab ? 'active bg-primary text-white' : 'text-secondary'
                      }`}
                      onClick={() => {
                        setActiveTab(tab);
                        setCurrentPage(1);
                      }}
                    >
                      {tab === 'Posts' && <i className="bi bi-card-text me-1"></i>}
                      {tab === 'Popular' && <i className="bi bi-fire me-1"></i>}
                      {tab === 'Recent' && <i className="bi bi-clock me-1"></i>}
                      {tab === 'Members' && <i className="bi bi-people me-1"></i>}
                      {tab === 'About' && <i className="bi bi-info-circle me-1"></i>}
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* TAB CONTENT */}
            {(activeTab === 'Posts' || activeTab === 'Popular' || activeTab === 'Recent') && (
              <div>
                {paginatedPosts.length > 0 ? (
                  <>
                    {paginatedPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <nav className="d-flex justify-content-center mt-4">
                        <ul className="pagination">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            >
                              Previous
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <li
                              key={page}
                              className={`page-item ${currentPage === page ? 'active' : ''}`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`page-item ${
                              currentPage === totalPages ? 'disabled' : ''
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </>
                ) : (
                  <div className="text-center py-5 bg-white rounded-4 border">
                    <i className="bi bi-chat-dots text-muted fs-1 mb-2 d-block"></i>
                    <h5 className="fw-bold">No discussions in this tab yet</h5>
                    <p className="text-secondary small mb-3">
                      Start the very first conversation in r/{community.name}!
                    </p>
                    <Link
                      to={`/create-post?community=${community.id}`}
                      className="btn btn-primary-custom btn-sm"
                    >
                      Start Discussion
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* MEMBERS TAB */}
            {activeTab === 'Members' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <h4 className="h5 fw-bold mb-3">Active Community Members</h4>
                <div className="row g-3">
                  {users.slice(0, 6).map((u) => (
                    <div key={u.id} className="col-md-6">
                      <UserCard user={u} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'About' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <h4 className="h5 fw-bold mb-3">About {community.name}</h4>
                <p className="text-secondary leading-relaxed mb-4">{community.description}</p>

                <h5 className="h6 fw-bold mb-2">Category &amp; Focus</h5>
                <p className="small text-muted mb-4">{community.category}</p>

                <h5 className="h6 fw-bold mb-2">Community Mission</h5>
                <p className="small text-secondary mb-0">
                  DiscussHub r/{community.name} fosters constructive dialogue, collaborative technical breakthroughs, and supportive mentoring for creators at every skill level.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Community Sidebar (col-lg-4) */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              {/* About Community Card */}
              <div className="card border rounded-4 p-3 shadow-sm bg-white">
                <h6 className="fw-bold mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-info-circle text-primary"></i>
                  <span>About Community</span>
                </h6>
                <p className="small text-secondary mb-3">{community.description}</p>
                <div className="border-top pt-2 small text-muted">
                  <div className="d-flex justify-content-between py-1">
                    <span>Category</span>
                    <span className="fw-semibold text-dark">{community.category}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <span>Privacy</span>
                    <span className="fw-semibold text-dark">{community.privacy || 'Public'}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1">
                    <span>Founded</span>
                    <span className="fw-semibold text-dark">{community.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Community Rules Card */}
              <div className="card border rounded-4 p-3 shadow-sm bg-white">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark-ruled text-warning"></i>
                  <span>Community Rules</span>
                </h6>
                <ol className="small text-secondary ps-3 mb-0" style={{ lineHeight: '1.7' }}>
                  {(community.rules || [
                    "Be respectful.",
                    "No spam or self-promotion.",
                    "Stay on topic.",
                    "No harassment.",
                    "Use appropriate titles."
                  ]).map((rule, idx) => (
                    <li key={idx} className="mb-2 fw-medium">
                      {rule}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Moderators Card */}
              <div className="card border rounded-4 p-3 shadow-sm bg-white">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-shield-shaded text-success"></i>
                  <span>Community Moderators</span>
                </h6>
                <div className="d-flex flex-column gap-2">
                  {(community.moderators || [
                    { name: "Rahul Sharma", role: "Lead Moderator", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
                    { name: "Priya Patel", role: "Community Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" }
                  ]).map((mod, idx) => (
                    <div key={idx} className="d-flex align-items-center gap-2 p-2 rounded-3 bg-light">
                      <img
                        src={mod.avatar}
                        alt={mod.name}
                        className="rounded-circle"
                        style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                      />
                      <div className="overflow-hidden">
                        <span className="fw-bold small text-dark d-block text-truncate">{mod.name}</span>
                        <span className="small text-muted" style={{ fontSize: '0.75rem' }}>{mod.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Statistics Card */}
              <div className="card border rounded-4 p-3 shadow-sm bg-light">
                <h6 className="fw-bold mb-3 text-dark d-flex align-items-center gap-2">
                  <i className="bi bi-graph-up-arrow text-primary"></i>
                  <span>Community Statistics</span>
                </h6>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="small text-secondary">Total Members:</span>
                  <span className="fw-bold text-dark">
                    {(community.membersCount / 1000).toFixed(0)}K Members
                  </span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span className="small text-secondary">Currently Online:</span>
                  <span className="fw-bold text-success">
                    {community.onlineCount || '5.2K'} Online
                  </span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="small text-secondary">Discussions This Week:</span>
                  <span className="fw-bold text-primary">
                    {community.postsThisWeek || '2.5K'} Posts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
