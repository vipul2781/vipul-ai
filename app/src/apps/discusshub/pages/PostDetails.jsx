import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import VoteButtons from '../components/VoteButtons';
import Tag from '../components/Tag';
import CommentList from '../components/CommentList';
import { useForum } from '../context/ForumContext';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    posts,
    communities,
    users,
    userPostVotes,
    votePost,
    savedPostIds,
    toggleSavePost,
    showToast,
    resolveReport
  } = useForum();

  const [pollVotes, setPollVotes] = useState({});
  const [hasVotedPoll, setHasVotedPoll] = useState(false);

  const post = posts.find((p) => p.id === id) || posts[0];
  const community = communities.find((c) => c.id === post.communityId) || communities[0];
  const author = users.find((u) => u.id === post.author?.id) || {
    name: post.author?.name || 'Community Contributor',
    avatar: post.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    bio: 'Active DiscussHub member and tech enthusiast.',
    reputation: 1420
  };

  const isSaved = savedPostIds.includes(post.id);
  const userVote = userPostVotes[post.id] || 0;

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Discussion link copied to clipboard!', 'success');
    }
  };

  const handleReport = () => {
    resolveReport(`rep-${Date.now()}`, 'Ignore', post.title);
    showToast('Discussion flagged for moderator review.', 'warning');
  };

  const handleVotePoll = (index) => {
    if (hasVotedPoll) return;
    setPollVotes(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + 1
    }));
    setHasVotedPoll(true);
    showToast('Your poll vote has been recorded!', 'success');
  };

  return (
    <div className="post-details-page py-4">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-secondary text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/communities" className="text-secondary text-decoration-none">
                Communities
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/communities/${post.communityId}`}
                className="text-secondary text-decoration-none"
              >
                {post.communityName}
              </Link>
            </li>
            <li className="breadcrumb-item active text-truncate" aria-current="page" style={{ maxWidth: '300px' }}>
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Main Discussion Column (col-lg-8) */}
          <div className="col-lg-8">
            <article className="card border rounded-4 shadow-sm bg-white overflow-hidden mb-4">
              <div className="d-flex flex-column flex-md-row">
                {/* Vertical Voting Sidebar */}
                <div className="d-none d-md-flex">
                  <VoteButtons
                    itemId={post.id}
                    votes={post.votes}
                    userVote={userVote}
                    onVote={votePost}
                    horizontal={false}
                  />
                </div>

                {/* Main Article Body */}
                <div className="p-3 p-md-4 flex-grow-1">
                  {/* Post Header & Author */}
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <Link to={`/communities/${post.communityId}`}>
                        <img
                          src={post.communityIcon}
                          alt={post.communityName}
                          className="rounded-circle"
                          style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/communities/${post.communityId}`}
                          className="fw-bold text-dark text-decoration-none small hover-primary d-block"
                        >
                          {post.communityTag || `r/${post.communityName}`}
                        </Link>
                        <div className="small text-muted" style={{ fontSize: '0.78rem' }}>
                          Posted by{' '}
                          <Link
                            to={`/profile/${post.author?.id || post.author?.username}`}
                            className="text-secondary fw-semibold text-decoration-none"
                          >
                            {post.author?.name}
                          </Link>{' '}
                          • {post.createdAt}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {post.isTrending && (
                        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle rounded-pill">
                          <i className="bi bi-fire me-1"></i>Trending
                        </span>
                      )}
                      <span className="badge bg-light text-secondary border rounded-pill">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h1 className="h3 fw-bold text-dark mb-3" style={{ lineHeight: 1.35 }}>
                    {post.title}
                  </h1>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag, idx) => (
                        <Tag key={idx} name={tag} />
                      ))}
                    </div>
                  )}

                  {/* Post Text Content */}
                  <div
                    className="text-dark mb-4 fs-6"
                    style={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}
                  >
                    {post.content}
                  </div>

                  {/* Optional Code Snippet Block */}
                  {post.codeSnippet && (
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-dark rounded-top-3 border-bottom border-secondary text-secondary small">
                        <span>
                          <i className="bi bi-file-code me-1 text-primary"></i>Source Code Snippet
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-light text-decoration-none p-0 small"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(post.codeSnippet);
                              showToast('Code copied to clipboard!', 'success');
                            }
                          }}
                        >
                          <i className="bi bi-clipboard me-1"></i>Copy
                        </button>
                      </div>
                      <div className="code-box rounded-top-0 py-3 px-3 m-0">
                        <pre className="m-0">
                          <code>{post.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Optional Image */}
                  {post.image && (
                    <div className="mb-4 rounded-3 overflow-hidden shadow-sm">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-100 img-fluid rounded-3"
                        style={{ maxHeight: '480px', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Optional Interactive Poll */}
                  {post.pollData && (
                    <div className="card border rounded-4 p-3 bg-light mb-4 shadow-sm">
                      <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                        <i className="bi bi-bar-chart-fill text-primary"></i>
                        <span>{post.pollData.question}</span>
                      </h6>
                      <div className="d-flex flex-column gap-2">
                        {post.pollData.options.map((opt, idx) => {
                          const baseVotes = opt.votes || 0;
                          const currentOptionVotes = baseVotes + (pollVotes[idx] || 0);
                          const totalVotes = post.pollData.options.reduce(
                            (acc, curr, i) => acc + (curr.votes || 0) + (pollVotes[i] || 0),
                            0
                          );
                          const percentage = totalVotes > 0 ? Math.round((currentOptionVotes / totalVotes) * 100) : 0;

                          return (
                            <div
                              key={idx}
                              className={`p-2 border rounded-3 bg-white position-relative overflow-hidden cursor-pointer ${
                                pollVotes[idx] ? 'border-primary' : ''
                              }`}
                              style={{ cursor: hasVotedPoll ? 'default' : 'pointer' }}
                              onClick={() => handleVotePoll(idx)}
                            >
                              <div
                                className="position-absolute top-0 start-0 bottom-0 bg-primary bg-opacity-10"
                                style={{ width: `${percentage}%`, zIndex: 0 }}
                              ></div>
                              <div className="d-flex justify-content-between align-items-center position-relative px-2">
                                <span className="small fw-semibold text-dark">
                                  {opt.text}
                                </span>
                                <span className="small fw-bold text-primary">
                                  {percentage}% ({currentOptionVotes})
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <span className="small text-muted mt-2 d-block">
                        {hasVotedPoll
                          ? '✓ You have voted in this poll.'
                          : 'Click any option above to cast your vote.'}
                      </span>
                    </div>
                  )}

                  {/* Mobile Horizontal Voting Toolbar */}
                  <div className="d-md-none mb-3">
                    <VoteButtons
                      itemId={post.id}
                      votes={post.votes}
                      userVote={userVote}
                      onVote={votePost}
                      horizontal={true}
                    />
                  </div>

                  {/* Post Actions Bar */}
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-3 border-top">
                    <div className="d-flex align-items-center gap-1 flex-wrap">
                      <a href="#comments" className="post-action-btn">
                        <i className="bi bi-chat-left-text"></i>
                        <span>{post.commentsCount || 0} Comments</span>
                      </a>

                      <button type="button" className="post-action-btn" onClick={handleShare}>
                        <i className="bi bi-share"></i>
                        <span>Share</span>
                      </button>

                      <button
                        type="button"
                        className={`post-action-btn ${isSaved ? 'text-primary' : ''}`}
                        onClick={() => toggleSavePost(post.id)}
                      >
                        <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                        <span>{isSaved ? 'Saved' : 'Save'}</span>
                      </button>

                      <button type="button" className="post-action-btn text-muted" onClick={handleReport}>
                        <i className="bi bi-flag"></i>
                        <span>Report</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-light border"
                      onClick={() => navigate(-1)}
                    >
                      <i className="bi bi-arrow-left me-1"></i> Back
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Threaded Comments Section */}
            <div className="card border rounded-4 shadow-sm bg-white p-3 p-md-4">
              <CommentList postId={post.id} />
            </div>
          </div>

          {/* Right Column: Author & Community Info (col-lg-4) */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              {/* Community Snapshot */}
              <div className="card border rounded-4 p-3 shadow-sm bg-white">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={community.icon}
                    alt={community.name}
                    className="rounded-3"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="fw-bold mb-0">
                      <Link
                        to={`/communities/${community.id}`}
                        className="text-dark text-decoration-none hover-primary"
                      >
                        {community.name}
                      </Link>
                    </h6>
                    <span className="small text-muted">{community.tagline}</span>
                  </div>
                </div>
                <p className="small text-secondary mb-3">{community.description}</p>
                <div className="d-grid">
                  <Link
                    to={`/communities/${community.id}`}
                    className="btn btn-outline-primary-custom btn-sm"
                  >
                    Visit Community
                  </Link>
                </div>
              </div>

              {/* Author Snapshot */}
              <div className="card border rounded-4 p-3 shadow-sm bg-white">
                <h6 className="fw-bold mb-3 text-secondary text-uppercase small tracking-wider">
                  Author Profile
                </h6>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <Link to={`/profile/${author.id || 'author'}`}>
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="rounded-circle"
                      style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                    />
                  </Link>
                  <div>
                    <h6 className="fw-bold mb-0">
                      <Link
                        to={`/profile/${author.id || 'author'}`}
                        className="text-dark text-decoration-none hover-primary"
                      >
                        {author.name}
                      </Link>
                    </h6>
                    <span className="small text-muted">@{author.username || 'author'}</span>
                  </div>
                </div>
                <p className="small text-secondary mb-3">{author.bio}</p>
                <div className="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
                  <span>Reputation:</span>
                  <span className="fw-bold text-dark">{author.reputation || 2400}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
