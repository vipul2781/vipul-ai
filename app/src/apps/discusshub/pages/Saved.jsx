import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Comment from '../components/Comment';
import { useForum } from '../context/ForumContext';

const Saved = () => {
  const { posts, comments, savedPostIds, savedCommentIds } = useForum();
  const [activeTab, setActiveTab] = useState('posts');

  const savedPosts = posts.filter((p) => savedPostIds.includes(p.id));

  // Find saved comments in flat or nested comments
  const findCommentById = (list, id) => {
    for (const item of list) {
      if (item.id === id) return item;
      if (item.replies && item.replies.length > 0) {
        const found = findCommentById(item.replies, id);
        if (found) return found;
      }
    }
    return null;
  };

  const savedCommentsList = savedCommentIds
    .map((id) => findCommentById(comments, id))
    .filter(Boolean);

  return (
    <div className="saved-page py-5">
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div className="mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
              Bookmarks
            </span>
            <h1 className="h3 fw-bold text-dark mb-1">Saved Content</h1>
            <p className="text-secondary small mb-0">
              Discussions and comments you've bookmarked for later reading. Saved locally in your browser.
            </p>
          </div>

          <Link to="/communities" className="btn btn-sm btn-outline-primary-custom">
            <i className="bi bi-compass me-1"></i>Explore Discussions
          </Link>
        </div>

        {/* Saved Tabs */}
        <div className="card border rounded-4 shadow-sm mb-4 p-2 bg-white">
          <ul className="nav nav-pills custom-nav-pills gap-1">
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link rounded-pill px-4 py-2 fw-bold ${
                  activeTab === 'posts' ? 'active bg-primary text-white' : 'text-secondary'
                }`}
                onClick={() => setActiveTab('posts')}
              >
                <i className="bi bi-bookmark-fill me-1"></i> Saved Discussions ({savedPosts.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link rounded-pill px-4 py-2 fw-bold ${
                  activeTab === 'comments' ? 'active bg-primary text-white' : 'text-secondary'
                }`}
                onClick={() => setActiveTab('comments')}
              >
                <i className="bi bi-chat-quote-fill me-1"></i> Saved Comments ({savedCommentsList.length})
              </button>
            </li>
          </ul>
        </div>

        {/* Tab 1: Saved Posts */}
        {activeTab === 'posts' && (
          <div>
            {savedPosts.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {savedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 border p-4 shadow-sm">
                <i className="bi bi-bookmark-x text-muted fs-1 mb-3 d-block"></i>
                <h4 className="fw-bold text-dark">You haven't saved any discussions yet.</h4>
                <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '440px' }}>
                  Whenever you find an insightful architecture post, interesting question, or useful snippet, click the Save button to access it here.
                </p>
                <Link to="/" className="btn btn-primary-custom px-4 py-2">
                  <i className="bi bi-compass me-1"></i>Explore Discussions
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Comments */}
        {activeTab === 'comments' && (
          <div>
            {savedCommentsList.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {savedCommentsList.map((comment) => (
                  <div key={comment.id} className="card border rounded-4 shadow-sm p-3 bg-white">
                    <Comment
                      comment={comment}
                      postId={comment.postId || 'post-1'}
                      depth={0}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 border p-4 shadow-sm">
                <i className="bi bi-chat-square-text text-muted fs-1 mb-3 d-block"></i>
                <h4 className="fw-bold text-dark">No saved comments</h4>
                <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '440px' }}>
                  Save key answers or clever tips directly from comment threads to refer back to them at any time.
                </p>
                <Link to="/" className="btn btn-primary-custom px-4 py-2">
                  Browse Discussions
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
