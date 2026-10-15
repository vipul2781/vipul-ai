import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import CommunityCard from '../components/CommunityCard';
import { useForum } from '../context/ForumContext';

const Profile = () => {
  const { id } = useParams();
  const {
    users,
    posts,
    communities,
    followingUserIds,
    toggleFollowUser,
    showToast
  } = useForum();

  const [activeTab, setActiveTab] = useState('Posts');

  // Find user by id or username
  const user = users.find((u) => u.id === id || u.username === id) || users[0];

  const isFollowing = followingUserIds.includes(user.id);

  // User's posts
  const userPosts = posts.filter(
    (p) => p.author?.id === user.id || p.author?.username === user.username
  );

  const handleMessage = () => {
    showToast(`Direct message thread started with ${user.name}!`, 'info');
  };

  const badgeDescriptions = {
    'Top Contributor': 'Published 25+ highly rated discussions',
    'Community Expert': 'Recognized expert in technical domains',
    'Helpful Member': 'Authored 100+ accepted solutions in comments',
    'Early Member': 'Joined during platform beta release',
    'Popular Poster': 'Achieved over 1,000 total discussion upvotes'
  };

  return (
    <div className="profile-page pb-5">
      {/* Cover Image */}
      <div
        style={{
          height: '220px',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${user.coverImage || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#4F46E5'
        }}
      ></div>

      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Profile Card Header */}
        <div className="card border rounded-4 shadow-sm bg-white p-4 mb-4 position-relative" style={{ marginTop: '-60px' }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-3">
            <div className="d-flex flex-column flex-sm-row align-items-sm-end gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="rounded-circle border border-4 border-white shadow-md bg-white"
                style={{ width: '110px', height: '110px', objectFit: 'cover' }}
              />
              <div>
                <h1 className="h3 fw-bold text-dark mb-0">{user.name}</h1>
                <span className="text-secondary small fw-medium">@{user.username}</span>
                <div className="d-flex align-items-center gap-3 text-muted small mt-2 flex-wrap">
                  {user.location && (
                    <span>
                      <i className="bi bi-geo-alt me-1"></i>
                      {user.location}
                    </span>
                  )}
                  <span>
                    <i className="bi bi-calendar3 me-1"></i>
                    Joined {user.joinedDate || 'March 2021'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn ${
                  isFollowing ? 'btn-outline-secondary' : 'btn-primary-custom'
                } rounded-pill px-4 fw-bold`}
                onClick={() => toggleFollowUser(user.id)}
              >
                {isFollowing ? (
                  <>
                    <i className="bi bi-check-lg me-1"></i>Following
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-1"></i>Follow
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-3"
                onClick={handleMessage}
              >
                <i className="bi bi-chat-dots me-1"></i>Message
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-dark small mb-4" style={{ lineHeight: 1.6 }}>
            {user.bio}
          </p>

          {/* User Statistics Row */}
          <div className="row g-2 p-3 bg-light rounded-3 text-center border">
            <div className="col-3">
              <div className="h5 fw-bold text-primary mb-0">{user.reputation || 1245}</div>
              <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Reputation</div>
            </div>
            <div className="col-3">
              <div className="h5 fw-bold text-dark mb-0">{user.postsCount || 54}</div>
              <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Posts</div>
            </div>
            <div className="col-3">
              <div className="h5 fw-bold text-dark mb-0">{user.commentsCount || 380}</div>
              <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Comments</div>
            </div>
            <div className="col-3">
              <div className="h5 fw-bold text-dark mb-0">{user.communitiesCount || 12}</div>
              <div className="small text-muted" style={{ fontSize: '0.78rem' }}>Communities</div>
            </div>
          </div>
        </div>

        {/* Profile Tabs Navigation */}
        <div className="card border rounded-4 shadow-sm mb-4 p-2 bg-white">
          <ul className="nav nav-pills custom-nav-pills gap-1">
            {['Posts', 'Comments', 'Communities', 'Badges', 'About'].map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  type="button"
                  className={`nav-link rounded-pill px-3 py-1 fw-bold ${
                    activeTab === tab ? 'active bg-primary text-white' : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'Posts' && <i className="bi bi-card-text me-1"></i>}
                  {tab === 'Comments' && <i className="bi bi-chat-left-text me-1"></i>}
                  {tab === 'Communities' && <i className="bi bi-grid me-1"></i>}
                  {tab === 'Badges' && <i className="bi bi-patch-check me-1"></i>}
                  {tab === 'About' && <i className="bi bi-person me-1"></i>}
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* TAB CONTENTS */}

        {/* 1. POSTS */}
        {activeTab === 'Posts' && (
          <div>
            <h5 className="fw-bold mb-3">Recent Discussions by {user.name}</h5>
            {userPosts.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 border">
                <p className="text-muted mb-0">No published discussions from this member yet.</p>
              </div>
            )}
          </div>
        )}

        {/* 2. COMMENTS */}
        {activeTab === 'Comments' && (
          <div className="card border rounded-4 shadow-sm p-4 bg-white">
            <h5 className="fw-bold mb-3">Recent Comments &amp; Answers</h5>
            <div className="d-flex flex-column gap-3">
              <div className="p-3 bg-light rounded-3 border">
                <span className="small text-muted d-block mb-1">
                  Commented on <strong>How do you structure a large React application?</strong> • 2 hours ago
                </span>
                <p className="text-dark small mb-0">
                  "Feature-Sliced Design (FSD) was a complete game changer for our team of 15 devs. When you group by feature rather than type, maintenance is a breeze."
                </p>
              </div>
              <div className="p-3 bg-light rounded-3 border">
                <span className="small text-muted d-block mb-1">
                  Commented on <strong>Understanding Transformer Attention</strong> • 1 day ago
                </span>
                <p className="text-dark small mb-0">
                  "The rubber duck debugging method is essentially a mini version of the Feynman technique. Speaking out loud forces serialization of thoughts."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. COMMUNITIES */}
        {activeTab === 'Communities' && (
          <div>
            <h5 className="fw-bold mb-3">Communities {user.name} Participates In</h5>
            <div className="row g-4">
              {communities.slice(0, 4).map((c) => (
                <div key={c.id} className="col-md-6">
                  <CommunityCard community={c} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BADGES */}
        {activeTab === 'Badges' && (
          <div className="card border rounded-4 shadow-sm p-4 bg-white">
            <h5 className="fw-bold mb-3">Earned Community Badges</h5>
            <div className="row g-3">
              {(user.badges || [
                'Top Contributor',
                'Community Expert',
                'Helpful Member',
                'Early Member',
                'Popular Poster'
              ]).map((badge, idx) => (
                <div key={idx} className="col-md-6">
                  <div className="p-3 rounded-3 border bg-light d-flex align-items-start gap-3">
                    <div
                      className="rounded-circle p-2 text-white bg-warning bg-opacity-75 flex-shrink-0 d-flex align-items-center justify-content-center"
                      style={{ width: '42px', height: '42px' }}
                    >
                      <i className="bi bi-award-fill fs-5"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark">{badge}</h6>
                      <p className="small text-secondary mb-0">
                        {badgeDescriptions[badge] || 'Awarded for active and helpful community contributions.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. ABOUT */}
        {activeTab === 'About' && (
          <div className="card border rounded-4 shadow-sm p-4 bg-white">
            <h5 className="fw-bold mb-3">About {user.name}</h5>
            <p className="text-secondary leading-relaxed mb-4">{user.bio}</p>

            <div className="row g-3">
              <div className="col-sm-6">
                <span className="small text-muted d-block">Location</span>
                <span className="fw-semibold text-dark">{user.location || 'Global'}</span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Member Since</span>
                <span className="fw-semibold text-dark">{user.joinedDate || '2021'}</span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Followers</span>
                <span className="fw-semibold text-dark">{user.followers || 940}</span>
              </div>
              <div className="col-sm-6">
                <span className="small text-muted d-block">Following</span>
                <span className="fw-semibold text-dark">{user.following || 110}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
