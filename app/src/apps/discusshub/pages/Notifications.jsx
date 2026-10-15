import React, { useState } from 'react';
import NotificationItem from '../components/NotificationItem';
import { useForum } from '../context/ForumContext';

const Notifications = () => {
  const { notifications, markAllNotificationsAsRead } = useForum();
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredList = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="notifications-page py-5">
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 rounded-pill fw-semibold mb-2">
              Updates &amp; Alerts
            </span>
            <h1 className="h3 fw-bold text-dark mb-1">Notifications</h1>
            <p className="text-secondary small mb-0">
              Stay in the loop with upvotes, replies, mentions, and community milestones.
            </p>
          </div>

          <div className="d-flex gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                className="btn btn-outline-primary-custom btn-sm"
                onClick={markAllNotificationsAsRead}
              >
                <i className="bi bi-check2-all me-1"></i>Mark All as Read ({unreadCount})
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="d-flex gap-2 mb-3">
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
              filter === 'all' ? 'btn-primary-custom' : 'btn-light border'
            }`}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
              filter === 'unread' ? 'btn-primary-custom' : 'btn-light border'
            }`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredList.length > 0 ? (
          <div className="d-flex flex-column">
            {filteredList.map((notif) => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border p-4 shadow-sm">
            <i className="bi bi-bell-slash text-muted fs-1 mb-2 d-block"></i>
            <h5 className="fw-bold text-dark">No notifications to display</h5>
            <p className="text-secondary small mb-0">
              {filter === 'unread'
                ? "You're all caught up! No unread notifications."
                : 'Your notifications feed will show interactions on your posts.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
