import React from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';
import Tag from './Tag';
import { useForum } from '../context/ForumContext';

const PostCard = ({ post }) => {
  const {
    userPostVotes,
    votePost,
    savedPostIds,
    toggleSavePost,
    showToast,
    resolveReport
  } = useForum();
  const isSaved = savedPostIds.includes(post.id);
  const userVote = userPostVotes[post.id] || 0;

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/posts/${post.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Discussion link copied to clipboard!', 'success');
    } else {
      showToast('Link copied: ' + url, 'info');
    }
  };

  const handleReport = (e) => {
    e.stopPropagation();
    resolveReport(`rep-${Date.now()}`, 'Ignore', post.title);
    showToast('Post reported to moderators for review.', 'warning');
  };

  return (
    <article className="post-card mb-3 position-relative">
      <div className="d-flex flex-column flex-md-row">
        {/* Desktop Vertical Voting Section */}
        <div className="d-none d-md-flex">
          <VoteButtons
            itemId={post.id}
            votes={post.votes}
            userVote={userVote}
            onVote={votePost}
            horizontal={false}
          />
        </div>

        {/* Main Card Body */}
        <div className="p-3 p-md-4 flex-grow-1">
          {/* Post Header / Meta */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Community Link */}
              <Link
                to={`/communities/${post.communityId}`}
                className="d-flex align-items-center gap-1 text-decoration-none fw-bold text-dark hover-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={post.communityIcon}
                  alt={post.communityName}
                  className="rounded-circle"
                  style={{ width: '22px', height: '22px', objectFit: 'cover' }}
                />
                <span className="small text-primary">{post.communityTag || `r/${post.communityName}`}</span>
              </Link>

              <span className="text-muted small">•</span>

              {/* Author */}
              <Link
                to={`/profile/${post.author?.id || post.author?.username}`}
                className="small text-secondary text-decoration-none fw-medium d-flex align-items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Posted by {post.author?.name || 'Anonymous'}</span>
              </Link>

              <span className="text-muted small">•</span>
              <span className="small text-muted">{post.createdAt}</span>
            </div>

            {/* Badges */}
            <div className="d-flex align-items-center gap-1">
              {post.isTrending && (
                <span className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle rounded-pill px-2 py-1 small">
                  <i className="bi bi-fire me-1"></i>Trending
                </span>
              )}
              {post.postType && post.postType !== 'Discussion' && (
                <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle rounded-pill px-2 py-1 small">
                  {post.postType}
                </span>
              )}
            </div>
          </div>

          {/* Post Title */}
          <h2 className="h5 fw-bold mb-2">
            <Link
              to={`/posts/${post.id}`}
              className="text-dark text-decoration-none text-hover-primary"
            >
              {post.title}
            </Link>
          </h2>

          {/* Post Content Preview */}
          <p className="text-secondary mb-3 small" style={{ lineHeight: 1.6 }}>
            {post.content && post.content.length > 240
              ? `${post.content.substring(0, 240)}...`
              : post.content}
          </p>

          {/* Optional Code Snippet Preview */}
          {post.codeSnippet && (
            <div className="code-box mb-3 py-2 px-3">
              <pre className="m-0" style={{ fontSize: '0.82rem' }}>
                <code>{post.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Optional Image Preview */}
          {post.image && (
            <div className="mb-3 rounded-3 overflow-hidden" style={{ maxHeight: '280px' }}>
              <img
                src={post.image}
                alt={post.title}
                className="w-100 object-fit-cover rounded-3"
                style={{ maxHeight: '280px', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="d-flex flex-wrap align-items-center gap-1 mb-3">
              {post.tags.map((t, idx) => (
                <Tag key={idx} name={t} />
              ))}
            </div>
          )}

          {/* Card Footer Actions */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-2 border-top border-light-subtle">
            {/* Mobile Voting Gutter */}
            <div className="d-md-none">
              <VoteButtons
                itemId={post.id}
                votes={post.votes}
                userVote={userVote}
                onVote={votePost}
                horizontal={true}
              />
            </div>

            <div className="d-flex align-items-center gap-1 flex-wrap">
              {/* Comments Button */}
              <Link
                to={`/posts/${post.id}#comments`}
                className="post-action-btn"
                title="View Comments"
              >
                <i className="bi bi-chat-left-text"></i>
                <span>{post.commentsCount || 0} comments</span>
              </Link>

              {/* Share Button */}
              <button
                type="button"
                className="post-action-btn"
                onClick={handleShare}
                title="Share discussion"
              >
                <i className="bi bi-share"></i>
                <span className="d-none d-sm-inline">Share</span>
              </button>

              {/* Save Button */}
              <button
                type="button"
                className={`post-action-btn ${isSaved ? 'text-primary' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSavePost(post.id);
                }}
                title={isSaved ? 'Remove from Saved' : 'Save discussion'}
              >
                <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                <span className="d-none d-sm-inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              {/* Report Button */}
              <button
                type="button"
                className="post-action-btn text-muted"
                onClick={handleReport}
                title="Report this post"
              >
                <i className="bi bi-flag"></i>
              </button>
            </div>

            {/* View Discussion Link */}
            <div>
              <Link
                to={`/posts/${post.id}`}
                className="btn btn-sm btn-outline-primary-custom py-1 px-3 d-flex align-items-center gap-1"
              >
                <span>View Discussion</span>
                <i className="bi bi-arrow-right small"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
