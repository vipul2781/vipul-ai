import React, { useState } from 'react';
import ModeratorTable from '../components/ModeratorTable';
import { useForum } from '../context/ForumContext';

const Moderation = () => {
  const {
    reportedPosts,
    reportedComments,
    bannedUsers,
    modLog,
    unbanUser,
    users
  } = useForum();

  const [activeNav, setActiveNav] = useState('overview');

  const pendingPostsCount = reportedPosts.filter((p) => p.status === 'Pending').length;
  const pendingCommentsCount = reportedComments.filter((c) => c.status === 'Pending').length;
  const totalReportsCount = reportedPosts.length + reportedComments.length;
  const resolvedCount =
    reportedPosts.filter((p) => p.status === 'Resolved').length +
    reportedComments.filter((c) => c.status === 'Resolved').length;

  return (
    <div className="moderation-page py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge bg-warning bg-opacity-10 text-warning-emphasis border border-warning-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
              <i className="bi bi-shield-lock-fill me-1"></i> Staff Desk
            </span>
            <h1 className="h3 fw-bold text-dark mb-1">Community Moderation Dashboard</h1>
            <p className="text-secondary small mb-0">
              Manage reported flags, enforce community rules, resolve spam, and monitor platform trust.
            </p>
          </div>
          <div className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle p-2 px-3 rounded-pill fw-bold">
            <i className="bi bi-exclamation-circle-fill me-1"></i> {pendingPostsCount + pendingCommentsCount} Pending Violations
          </div>
        </div>

        <div className="row g-4">
          {/* Moderation Navigation Sidebar (col-lg-3) */}
          <div className="col-lg-3">
            <div className="card border rounded-4 shadow-sm p-3 bg-white">
              <h6 className="fw-bold small text-muted text-uppercase mb-3 px-2">Navigation</h6>
              <div className="nav flex-column nav-pills gap-1">
                {[
                  { id: 'overview', label: 'Overview', icon: 'bi-speedometer2' },
                  { id: 'reported-posts', label: 'Reported Posts', icon: 'bi-file-earmark-text', badge: pendingPostsCount },
                  { id: 'reported-comments', label: 'Reported Comments', icon: 'bi-chat-left-dots', badge: pendingCommentsCount },
                  { id: 'users', label: 'Community Users', icon: 'bi-people' },
                  { id: 'banned-users', label: 'Banned Users', icon: 'bi-slash-circle', badge: bannedUsers.length },
                  { id: 'community-rules', label: 'Global Rules', icon: 'bi-journal-check' },
                  { id: 'mod-log', label: 'Moderator Log', icon: 'bi-clock-history' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`nav-link text-start rounded-3 d-flex align-items-center justify-content-between py-2 px-3 fw-semibold ${
                      activeNav === item.id ? 'active bg-primary text-white' : 'text-secondary'
                    }`}
                    onClick={() => setActiveNav(item.id)}
                  >
                    <span>
                      <i className={`bi ${item.icon} me-2`}></i>
                      {item.label}
                    </span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`badge rounded-pill ${
                          activeNav === item.id ? 'bg-white text-primary' : 'bg-danger text-white'
                        }`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Moderation Main Display (col-lg-9) */}
          <div className="col-lg-9">
            {/* 1. OVERVIEW */}
            {activeNav === 'overview' && (
              <div>
                {/* Stats Counter Cards */}
                <div className="row g-3 mb-4">
                  <div className="col-sm-6 col-md-3">
                    <div className="stat-box">
                      <div className="h2 fw-extrabold text-primary mb-1">{totalReportsCount + 15}</div>
                      <div className="fw-semibold text-dark small">Total Reports</div>
                      <span className="small text-muted">All-time audit</span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="stat-box">
                      <div className="h2 fw-extrabold text-warning mb-1">{pendingPostsCount + pendingCommentsCount}</div>
                      <div className="fw-semibold text-dark small">Pending Review</div>
                      <span className="small text-danger fw-bold">Requires action</span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="stat-box">
                      <div className="h2 fw-extrabold text-success mb-1">{resolvedCount + 10}</div>
                      <div className="fw-semibold text-dark small">Resolved</div>
                      <span className="small text-success">Cleared by staff</span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="stat-box">
                      <div className="h2 fw-extrabold text-danger mb-1">{bannedUsers.length}</div>
                      <div className="fw-semibold text-dark small">Banned Users</div>
                      <span className="small text-muted">Restricted access</span>
                    </div>
                  </div>
                </div>

                {/* Priority Queue Excerpt */}
                <div className="card border rounded-4 shadow-sm p-4 bg-white mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">High Priority Reported Posts</h5>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-primary text-decoration-none fw-semibold"
                      onClick={() => setActiveNav('reported-posts')}
                    >
                      View All Posts ({reportedPosts.length})
                    </button>
                  </div>
                  <ModeratorTable items={reportedPosts.slice(0, 3)} type="post" />
                </div>

                {/* Priority Comments Excerpt */}
                <div className="card border rounded-4 shadow-sm p-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Flagged Comment Threads</h5>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-primary text-decoration-none fw-semibold"
                      onClick={() => setActiveNav('reported-comments')}
                    >
                      View All Comments ({reportedComments.length})
                    </button>
                  </div>
                  <ModeratorTable items={reportedComments.slice(0, 3)} type="comment" />
                </div>
              </div>
            )}

            {/* 2. REPORTED POSTS */}
            {activeNav === 'reported-posts' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="fw-bold mb-0">Reported Discussions Queue</h5>
                    <span className="small text-muted">
                      Review flagged discussions for hate speech, harassment, spam, or copyright violations.
                    </span>
                  </div>
                </div>
                <ModeratorTable items={reportedPosts} type="post" />
              </div>
            )}

            {/* 3. REPORTED COMMENTS */}
            {activeNav === 'reported-comments' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="fw-bold mb-0">Reported Comments Queue</h5>
                    <span className="small text-muted">
                      Thread violations, personal insults, phishing links, and duplicate spam reports.
                    </span>
                  </div>
                </div>
                <ModeratorTable items={reportedComments} type="comment" />
              </div>
            )}

            {/* 4. USERS */}
            {activeNav === 'users' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <h5 className="fw-bold mb-3">Platform Users Directory</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr className="small text-muted text-uppercase">
                        <th>User</th>
                        <th>Reputation</th>
                        <th>Posts</th>
                        <th>Followers</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="rounded-circle"
                                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                              />
                              <div>
                                <span className="fw-semibold text-dark d-block">{u.name}</span>
                                <span className="small text-muted">@{u.username}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border">{u.reputation}</span>
                          </td>
                          <td>{u.postsCount || 10}</td>
                          <td>{u.followers}</td>
                          <td>
                            <span className="badge bg-success bg-opacity-10 text-success border border-success-subtle">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. BANNED USERS */}
            {activeNav === 'banned-users' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <h5 className="fw-bold mb-3">Banned Accounts</h5>
                {bannedUsers.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr className="small text-muted text-uppercase">
                          <th>Username</th>
                          <th>Infraction Reason</th>
                          <th>Banned At</th>
                          <th>Moderator</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bannedUsers.map((b) => (
                          <tr key={b.id}>
                            <td className="fw-bold text-danger">@{b.username}</td>
                            <td className="small text-secondary">{b.reason}</td>
                            <td className="small text-muted">{b.bannedAt}</td>
                            <td>
                              <span className="badge bg-light text-dark border">{b.bannedBy}</span>
                            </td>
                            <td className="text-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-success"
                                onClick={() => unbanUser(b.id, b.username)}
                              >
                                <i className="bi bi-arrow-counterclockwise me-1"></i>Unban
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4 bg-light rounded-3">
                    <p className="text-muted mb-0">No users currently banned.</p>
                  </div>
                )}
              </div>
            )}

            {/* 6. COMMUNITY RULES */}
            {activeNav === 'community-rules' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <h5 className="fw-bold mb-3">DiscussHub Standard Content Policies</h5>
                <ol className="list-group list-group-numbered mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-start py-3">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">No Harassment or Bullying</div>
                      <span className="small text-secondary">
                        Attacking, doxxing, or repeatedly targeting individuals with intent to intimidate is forbidden.
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start py-3">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">No Spam or Automated Commercial Solicitations</div>
                      <span className="small text-secondary">
                        Affiliate link stuffing, bots, repetitive messaging, and deceptive marketing will trigger instant bans.
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start py-3">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Stay On Topic &amp; Format Technical Content</div>
                      <span className="small text-secondary">
                        Post in the relevant category hub and wrap programming languages within formatted code blocks.
                      </span>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-start py-3">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">No Illegal or Prohibited Material</div>
                      <span className="small text-secondary">
                        Trading illicit wares, pirated binaries, or copyrighted assets is strictly prohibited.
                      </span>
                    </div>
                  </li>
                </ol>
              </div>
            )}

            {/* 7. MODERATOR AUDIT LOG */}
            {activeNav === 'mod-log' && (
              <div className="card border rounded-4 shadow-sm p-4 bg-white">
                <h5 className="fw-bold mb-3">Moderator Action Log</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr className="small text-muted text-uppercase">
                        <th>Action</th>
                        <th>Target Content / User</th>
                        <th>Moderator</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modLog.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <span
                              className={`badge ${
                                log.action.includes('Removed') || log.action.includes('Banned')
                                  ? 'bg-danger bg-opacity-10 text-danger border border-danger-subtle'
                                  : 'bg-primary bg-opacity-10 text-primary border border-primary-subtle'
                              }`}
                            >
                              {log.action}
                            </span>
                          </td>
                          <td className="small fw-semibold text-dark text-truncate" style={{ maxWidth: '260px' }}>
                            {log.target}
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border">{log.moderator}</span>
                          </td>
                          <td className="small text-muted">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderation;
