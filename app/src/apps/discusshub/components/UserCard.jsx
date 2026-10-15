import React from 'react';
import { Link } from 'react-router-dom';
import { useForum } from '../context/ForumContext';

const UserCard = ({ user }) => {
  const { followingUserIds, toggleFollowUser } = useForum();
  const isFollowing = followingUserIds.includes(user.id);

  return (
    <div className="card border rounded-4 shadow-sm h-100 overflow-hidden">
      <div
        style={{
          height: '60px',
          backgroundImage: `linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)`
        }}
      ></div>
      <div className="card-body pt-0 px-3 pb-3 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle border border-3 border-white shadow-sm"
              style={{
                width: '60px',
                height: '60px',
                marginTop: '-30px',
                objectFit: 'cover'
              }}
            />
          </Link>
          <button
            type="button"
            className={`btn btn-sm ${
              isFollowing ? 'btn-outline-secondary' : 'btn-primary-custom'
            } rounded-pill px-3 py-1 fw-bold`}
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
        </div>

        <h4 className="h6 fw-bold mb-0">
          <Link
            to={`/profile/${user.id}`}
            className="text-dark text-decoration-none hover-primary"
          >
            {user.name}
          </Link>
        </h4>
        <span className="small text-muted mb-2">@{user.username}</span>

        <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '0.85rem' }}>
          {user.bio && user.bio.length > 90
            ? `${user.bio.substring(0, 90)}...`
            : user.bio || 'Community member'}
        </p>

        {/* User Badges */}
        {user.badges && user.badges.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mb-3">
            {user.badges.slice(0, 2).map((b, idx) => (
              <span
                key={idx}
                className="badge bg-warning bg-opacity-10 text-warning-emphasis border border-warning-subtle rounded-pill py-1 px-2"
                style={{ fontSize: '0.72rem' }}
              >
                <i className="bi bi-patch-check-fill text-warning me-1"></i>
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="d-flex align-items-center justify-content-between pt-2 border-top small text-muted">
          <div>
            <span className="fw-bold text-dark">{user.reputation}</span> rep
          </div>
          <div>
            <span className="fw-bold text-dark">{user.followers}</span> followers
          </div>
          <div>
            <span className="fw-bold text-dark">{user.postsCount || 12}</span> posts
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
