import React, { useState } from 'react';
import { useForum } from '../context/ForumContext';

const ModeratorTable = ({ items, type = 'post' }) => {
  const { resolveReport } = useForum();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleReviewClick = (item) => {
    setSelectedItem(item);
  };

  const handleModalAction = (action) => {
    if (!selectedItem) return;
    resolveReport(selectedItem.id, action, selectedItem.author || selectedItem.postTitle);
    setSelectedItem(null);
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-5 bg-light rounded-4 border">
        <i className="bi bi-shield-check text-success fs-1 mb-2 d-block"></i>
        <h5 className="fw-bold text-dark">Queue is Clean!</h5>
        <p className="text-muted small mb-0">No active {type} reports pending community moderation.</p>
      </div>
    );
  }

  return (
    <div className="mod-table-container">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-secondary text-uppercase">
              <th scope="col" style={{ minWidth: '220px' }}>
                {type === 'post' ? 'Post Title' : 'Comment Content'}
              </th>
              <th scope="col">Author</th>
              <th scope="col">{type === 'post' ? 'Community' : 'Discussion'}</th>
              <th scope="col">Violation Reason</th>
              <th scope="col" className="text-center">Reports</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '280px' }}>
                    {type === 'post' ? item.postTitle : item.commentContent}
                  </div>
                  <span className="small text-muted">{item.date}</span>
                </td>
                <td>
                  <span className="badge bg-light text-dark border">
                    @{item.author}
                  </span>
                </td>
                <td>
                  <span className="small text-secondary">
                    {type === 'post' ? item.community : item.postTitle}
                  </span>
                </td>
                <td>
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle">
                    {item.reason}
                  </span>
                </td>
                <td className="text-center">
                  <span className="badge bg-warning bg-opacity-10 text-warning-emphasis fw-bold">
                    {item.reportsCount}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 'Resolved'
                        ? 'bg-success bg-opacity-10 text-success border border-success-subtle'
                        : 'bg-warning bg-opacity-10 text-warning border border-warning-subtle'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex align-items-center justify-content-end gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary-custom py-1 px-2"
                      style={{ fontSize: '0.8rem' }}
                      onClick={() => handleReviewClick(item)}
                    >
                      <i className="bi bi-eye me-1"></i> Review
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger py-1 px-2"
                      style={{ fontSize: '0.8rem' }}
                      onClick={() =>
                        resolveReport(item.id, 'Remove', item.postTitle || item.commentContent)
                      }
                      title="Remove Immediately"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-light border py-1 px-2 text-muted"
                      style={{ fontSize: '0.8rem' }}
                      onClick={() =>
                        resolveReport(item.id, 'Ignore', item.postTitle || item.commentContent)
                      }
                      title="Dismiss Report"
                    >
                      <i className="bi bi-check-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title fw-bold text-dark d-flex align-items-center gap-2">
                  <i className="bi bi-shield-exclamation text-danger"></i>
                  <span>Moderation Review: {type === 'post' ? 'Reported Post' : 'Reported Comment'}</span>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3 p-3 bg-light rounded-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-muted">Author Details:</span>
                    <span className="badge bg-secondary">
                      @{selectedItem.author} • Prior reports: {selectedItem.reportsCount}
                    </span>
                  </div>
                  <h6 className="fw-bold mb-1">
                    {type === 'post' ? selectedItem.postTitle : 'Comment Excerpt'}
                  </h6>
                  <p className="text-secondary small mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                    {type === 'post'
                      ? selectedItem.postContent || 'User reported discussion payload.'
                      : selectedItem.commentContent}
                  </p>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Flagged Reason</label>
                    <div className="p-2 border rounded bg-white text-danger fw-semibold small">
                      <i className="bi bi-exclamation-triangle-fill me-1"></i>
                      {selectedItem.reason}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-1">Community Context</label>
                    <div className="p-2 border rounded bg-white small text-secondary">
                      {type === 'post' ? selectedItem.community : selectedItem.postTitle}
                    </div>
                  </div>
                </div>

                <div className="alert alert-warning d-flex align-items-center gap-2 py-2 small mb-0">
                  <i className="bi bi-info-circle-fill"></i>
                  <span>Moderator actions update real-time frontend dummy state and append to the Moderator Audit Log.</span>
                </div>
              </div>

              <div className="modal-footer border-top bg-light rounded-bottom-4 d-flex justify-content-between flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setSelectedItem(null)}
                >
                  Cancel
                </button>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={() => handleModalAction('Approve')}
                  >
                    <i className="bi bi-check-circle me-1"></i> Approve &amp; Dismiss
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-warning text-dark fw-semibold"
                    onClick={() => handleModalAction('Warn User')}
                  >
                    <i className="bi bi-envelope-exclamation me-1"></i> Warn User
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => handleModalAction('Remove')}
                  >
                    <i className="bi bi-trash3 me-1"></i> Remove Content
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-dark"
                    onClick={() => handleModalAction('Ban User')}
                  >
                    <i className="bi bi-person-x me-1"></i> Ban User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeratorTable;
