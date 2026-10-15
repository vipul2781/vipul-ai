import React from 'react';

const VoteButtons = ({
  itemId,
  votes,
  userVote = 0,
  onVote,
  horizontal = false,
  size = 'md'
}) => {
  const handleUpvote = (e) => {
    e.stopPropagation();
    onVote(itemId, 1);
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    onVote(itemId, -1);
  };

  const isUpvoted = userVote === 1;
  const isDownvoted = userVote === -1;

  if (horizontal) {
    return (
      <div className="vote-container-horizontal shadow-sm">
        <button
          type="button"
          className={`vote-btn ${isUpvoted ? 'upvoted' : ''}`}
          onClick={handleUpvote}
          aria-label="Upvote"
          title="Upvote"
        >
          <i className={`bi ${isUpvoted ? 'bi-arrow-up-circle-fill' : 'bi-arrow-up-circle'}`}></i>
        </button>
        <span
          className={`vote-count px-2 ${
            isUpvoted ? 'positive' : isDownvoted ? 'negative' : ''
          }`}
        >
          {votes}
        </span>
        <button
          type="button"
          className={`vote-btn ${isDownvoted ? 'downvoted' : ''}`}
          onClick={handleDownvote}
          aria-label="Downvote"
          title="Downvote"
        >
          <i className={`bi ${isDownvoted ? 'bi-arrow-down-circle-fill' : 'bi-arrow-down-circle'}`}></i>
        </button>
      </div>
    );
  }

  return (
    <div className="vote-container">
      <button
        type="button"
        className={`vote-btn ${isUpvoted ? 'upvoted' : ''}`}
        onClick={handleUpvote}
        aria-label="Upvote"
        title="Upvote"
      >
        <i className={`bi ${isUpvoted ? 'bi-arrow-up-circle-fill' : 'bi-arrow-up-circle'}`}></i>
      </button>

      <span
        className={`vote-count ${
          isUpvoted ? 'positive' : isDownvoted ? 'negative' : ''
        }`}
      >
        {votes}
      </span>

      <button
        type="button"
        className={`vote-btn ${isDownvoted ? 'downvoted' : ''}`}
        onClick={handleDownvote}
        aria-label="Downvote"
        title="Downvote"
      >
        <i className={`bi ${isDownvoted ? 'bi-arrow-down-circle-fill' : 'bi-arrow-down-circle'}`}></i>
      </button>
    </div>
  );
};

export default VoteButtons;
