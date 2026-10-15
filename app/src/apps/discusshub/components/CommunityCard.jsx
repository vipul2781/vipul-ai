import React from 'react';
import { Link } from 'react-router-dom';
import { useForum } from '../context/ForumContext';

const CommunityCard = ({ community }) => {
  const { toggleJoinCommunity } = useForum();

  const handleJoinClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleJoinCommunity(community.id);
  };

  const formattedMembers = community.membersCount > 999
    ? `${(community.membersCount / 1000).toFixed(community.membersCount > 9999 ? 0 : 1)}K`
    : community.membersCount;

  const formattedPosts = community.postsCount > 999
    ? `${(community.postsCount / 1000).toFixed(community.postsCount > 9999 ? 0 : 1)}K`
    : community.postsCount;

  return (
    <div className="community-card d-flex flex-column h-100">
      {/* Cover Image banner */}
      <div
        className="community-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${community.coverImage})`,
          backgroundColor: '#4F46E5'
        }}
      >
        <div className="position-absolute top-0 end-0 p-2">
          <span className="badge bg-dark bg-opacity-75 text-white rounded-pill px-2 py-1 small">
            {community.category || 'General'}
          </span>
        </div>
      </div>

      {/* Avatar & Title Section */}
      <div className="px-3 pb-3 pt-0 flex-grow-1 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <img
            src={community.icon}
            alt={community.name}
            className="community-avatar-overlap"
          />
          <button
            type="button"
            className={`btn btn-sm ${
              community.isJoined
                ? 'btn-outline-secondary'
                : 'btn-primary-custom'
            } rounded-pill px-3 py-1 fw-bold`}
            onClick={handleJoinClick}
          >
            {community.isJoined ? (
              <>
                <i className="bi bi-check-lg me-1"></i>Joined
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg me-1"></i>Join
              </>
            )}
          </button>
        </div>

        <h3 className="h6 fw-bold mb-1">
          <Link
            to={`/communities/${community.id}`}
            className="text-dark text-decoration-none hover-primary"
          >
            {community.name}
          </Link>
        </h3>
        <p className="text-muted small mb-2 fw-medium">
          {community.tagline || `r/${community.name.replace(/\s+/g, '')}`}
        </p>

        <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
          {community.description && community.description.length > 105
            ? `${community.description.substring(0, 105)}...`
            : community.description}
        </p>

        {/* Member & Post statistics */}
        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-light-subtle small text-muted mb-3">
          <div className="d-flex align-items-center gap-1">
            <i className="bi bi-people-fill text-primary"></i>
            <span className="fw-bold text-dark">{formattedMembers}</span> members
          </div>
          <div className="d-flex align-items-center gap-1">
            <i className="bi bi-chat-left-text text-secondary"></i>
            <span className="fw-bold text-dark">{formattedPosts}</span> posts
          </div>
        </div>

        {/* View Community CTA */}
        <Link
          to={`/communities/${community.id}`}
          className="btn btn-sm btn-light w-100 fw-semibold text-primary border-light-subtle"
        >
          View Community <i className="bi bi-arrow-right ms-1"></i>
        </Link>
      </div>
    </div>
  );
};

export default CommunityCard;
