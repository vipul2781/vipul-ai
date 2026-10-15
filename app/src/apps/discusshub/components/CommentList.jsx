import React, { useState } from 'react';
import Comment from './Comment';
import { useForum } from '../context/ForumContext';

const CommentList = ({ postId }) => {
  const { comments, addComment, currentUser } = useForum();
  const [newCommentText, setNewCommentText] = useState('');
  const [sortBy, setSortBy] = useState('top');

  // Filter top-level comments for this post
  const postComments = comments.filter(
    (c) => c.postId === postId && (!c.parentId || c.parentId === null)
  );

  const sortedComments = [...postComments].sort((a, b) => {
    if (sortBy === 'newest') {
      return (b.timestamp || 0) - (a.timestamp || 0);
    }
    return (b.votes || 0) - (a.votes || 0);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(postId, newCommentText.trim());
    setNewCommentText('');
  };

  return (
    <section className="comments-section" id="comments">
      {/* Header and Sort */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <h3 className="h5 fw-bold mb-0 d-flex align-items-center gap-2">
          <span>Comments</span>
          <span className="badge bg-light text-secondary border rounded-pill">
            {postComments.length}
          </span>
        </h3>
        <div className="d-flex align-items-center gap-2">
          <span className="small text-muted">Sort by:</span>
          <select
            className="form-select form-select-sm"
            style={{ width: 'auto', fontSize: '0.85rem' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="top">Top Upvoted</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="card border rounded-4 p-3 mb-4 shadow-sm">
        <div className="d-flex align-items-center gap-2 mb-2">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="rounded-circle"
            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
          />
          <div>
            <span className="fw-semibold small text-dark">Comment as </span>
            <span className="fw-bold small text-primary">{currentUser.name}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control border-light-subtle rounded-3 mb-2"
            rows="3"
            placeholder="Join the discussion... Share your perspectives, questions, or solutions."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            required
          ></textarea>

          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
              <i className="bi bi-info-circle me-1"></i>Be respectful and follow community guidelines.
            </span>
            <div className="d-flex gap-2">
              {newCommentText && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setNewCommentText('')}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="btn btn-sm btn-primary-custom px-3 py-1"
                disabled={!newCommentText.trim()}
              >
                <i className="bi bi-send me-1"></i> Comment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Comment List rendering */}
      {sortedComments.length > 0 ? (
        <div className="comment-thread-wrapper">
          {sortedComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
              depth={0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 bg-light rounded-4 border border-dashed">
          <i className="bi bi-chat-square-text text-muted fs-2 d-block mb-2"></i>
          <p className="fw-semibold text-secondary mb-1">No comments on this discussion yet.</p>
          <p className="small text-muted mb-0">Be the first to share your thoughts and kick off the conversation!</p>
        </div>
      )}
    </section>
  );
};

export default CommentList;
