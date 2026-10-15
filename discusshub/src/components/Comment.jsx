import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VoteButtons from './VoteButtons';
import { useForum } from '../context/ForumContext';

const Comment = ({ comment, postId, depth = 0 }) => {
  const {
    currentUser,
    userCommentVotes,
    voteComment,
    addComment,
    deleteComment,
    savedCommentIds,
    toggleSaveComment,
    showToast,
    resolveReport
  } = useForum();

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState(true);

  const userVote = userCommentVotes[comment.id] || 0;
  const isSaved = savedCommentIds.includes(comment.id);
  const isAuthor = comment.author?.id === currentUser.id || comment.author?.username === currentUser.username;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addComment(postId, replyText.trim(), comment.id);
    setReplyText('');
    setIsReplying(false);
    setShowReplies(true);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/posts/${postId}#${comment.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Comment link copied!', 'success');
    }
  };

  const handleReport = () => {
    resolveReport(`rep-${Date.now()}`, 'Ignore', comment.content);
    showToast('Comment reported for moderation review.', 'warning');
  };

  return (
    <div className={`comment-card ${depth > 0 ? 'ms-2 ms-md-4 mt-2' : 'mb-3'}`} id={comment.id}>
      {/* Comment Header */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <Link to={`/profile/${comment.author?.id || comment.author?.username}`}>
            <img
              src={comment.author?.avatar}
              alt={comment.author?.name}
              className="rounded-circle"
              style={{ width: '32px', height: '32px', objectFit: 'cover' }}
            />
          </Link>
          <div>
            <Link
              to={`/profile/${comment.author?.id || comment.author?.username}`}
              className="fw-bold text-dark text-decoration-none small hover-primary"
            >
              {comment.author?.name}
            </Link>
            {isAuthor && (
              <span className="badge bg-primary-subtle text-primary ms-1 py-0 px-1" style={{ fontSize: '0.68rem' }}>
                You
              </span>
            )}
            <span className="text-muted small ms-2">• {comment.createdAt}</span>
          </div>
        </div>

        {/* Delete comment if author */}
        {isAuthor && (
          <button
            type="button"
            className="btn btn-sm btn-link text-danger p-0 text-decoration-none small"
            onClick={() => deleteComment(comment.id, postId)}
            title="Delete your comment"
          >
            <i className="bi bi-trash3 me-1"></i> Delete
          </button>
        )}
      </div>

      {/* Comment Body */}
      <div className="text-dark small mb-2 ps-md-4 ms-md-2" style={{ lineHeight: 1.6, whiteSpace: 'pre-line' }}>
        {comment.content}
      </div>

      {/* Comment Actions / Footer */}
      <div className="d-flex flex-wrap align-items-center gap-2 ps-md-4 ms-md-2 pt-1 border-top border-light-subtle">
        {/* Horizontal Upvote / Downvote */}
        <VoteButtons
          itemId={comment.id}
          votes={comment.votes || 0}
          userVote={userVote}
          onVote={voteComment}
          horizontal={true}
          size="sm"
        />

        {/* Reply Trigger */}
        <button
          type="button"
          className="post-action-btn small py-1 px-2"
          onClick={() => setIsReplying(!isReplying)}
        >
          <i className="bi bi-reply"></i>
          <span>Reply</span>
        </button>

        {/* Share */}
        <button
          type="button"
          className="post-action-btn small py-1 px-2"
          onClick={handleShare}
        >
          <i className="bi bi-share"></i>
          <span>Share</span>
        </button>

        {/* Save */}
        <button
          type="button"
          className={`post-action-btn small py-1 px-2 ${isSaved ? 'text-primary' : ''}`}
          onClick={() => toggleSaveComment(comment.id)}
        >
          <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        {/* Report */}
        <button
          type="button"
          className="post-action-btn text-muted small py-1 px-2 ms-auto"
          onClick={handleReport}
          title="Report comment"
        >
          <i className="bi bi-flag"></i>
        </button>

        {/* Collapse / Expand replies if available */}
        {hasReplies && (
          <button
            type="button"
            className="btn btn-sm btn-link text-secondary text-decoration-none small p-0 ms-1"
            onClick={() => setShowReplies(!showReplies)}
          >
            <i className={`bi ${showReplies ? 'bi-chevron-up' : 'bi-chevron-down'} me-1`}></i>
            {showReplies ? 'Hide replies' : `View ${comment.replies.length} replies`}
          </button>
        )}
      </div>

      {/* Reply Input Box */}
      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mt-3 p-3 bg-light rounded-3 border">
          <div className="d-flex align-items-center gap-2 mb-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="rounded-circle"
              style={{ width: '24px', height: '24px', objectFit: 'cover' }}
            />
            <span className="small text-secondary fw-semibold">
              Replying to <span className="text-primary">@{comment.author?.username}</span>
            </span>
          </div>
          <textarea
            className="form-control mb-2"
            rows="2"
            placeholder="Write your thoughtful reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            required
            autoFocus
          ></textarea>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setIsReplying(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary-custom">
              Submit Reply
            </button>
          </div>
        </form>
      )}

      {/* Nested Replies with line gutter */}
      {hasReplies && showReplies && (
        <div className="comment-thread-line mt-2">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
