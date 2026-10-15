import React from 'react';
import { Link } from 'react-router-dom';
import { useForum } from '../context/ForumContext';

const NotificationItem = ({ notification }) => {
  const { markNotificationAsRead } = useForum();

  return (
    <div
      className={`notification-item p-3 mb-2 rounded-3 border d-flex align-items-center justify-content-between gap-3 ${
        notification.read ? 'bg-white' : 'unread'
      }`}
    >
      <div className="d-flex align-items-center gap-3">
        {/* User avatar or system icon */}
        <div className="position-relative">
          <img
            src={notification.userAvatar}
            alt={notification.userName}
            className="rounded-circle"
            style={{ width: '44px', height: '44px', objectFit: 'cover' }}
          />
          <span
            className={`position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm p-1 d-flex align-items-center justify-content-center ${notification.iconColor}`}
            style={{ width: '22px', height: '22px', fontSize: '0.8rem' }}
          >
            <i className={`bi ${notification.icon}`}></i>
          </span>
        </div>

        {/* Notification details */}
        <div>
          <Link
            to={notification.targetLink}
            onClick={() => markNotificationAsRead(notification.id)}
            className="text-decoration-none text-dark fw-semibold small d-block hover-primary"
          >
            {notification.message}
          </Link>
          <span className="text-muted small" style={{ fontSize: '0.78rem' }}>
            <i className="bi bi-clock me-1"></i>
            {notification.time}
          </span>
        </div>
      </div>

      {/* Status & action */}
      <div className="d-flex align-items-center gap-2">
        {!notification.read && (
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-pill py-1 px-2 small text-primary"
            onClick={() => markNotificationAsRead(notification.id)}
            title="Mark as read"
          >
            <i className="bi bi-check2"></i> Mark read
          </button>
        )}
        <Link
          to={notification.targetLink}
          className="btn btn-sm btn-outline-secondary rounded-pill py-1 px-2 small"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default NotificationItem;
