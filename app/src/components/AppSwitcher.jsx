import React, { useState } from 'react';
import './AppSwitcher.css';

const APPS = [
  { id: 'discusshub', name: 'DiscussHub', route: '/discusshub', emoji: '💬', color: '#8B5CF6' },
  { id: 'nova-store', name: 'Nova Store', route: '/nova-store', emoji: '🛍️', color: '#10B981' },
  { id: 'shadow-case', name: 'ShadowCase', route: '/shadow-case', emoji: '🕵️', color: '#EF4444' },
  { id: 'skillhub', name: 'SkillHub', route: '/skillhub', emoji: '⚡', color: '#F97316' },
  { id: 'roommate-finder', name: 'Roommate Finder', route: '/roommate-finder', emoji: '🏠', color: '#3B82F6' },
];

export default function AppSwitcher({ currentAppId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const current = APPS.find(a => a.id === currentAppId) || { name: 'Vipul AI', emoji: '⬡' };

  if (minimized) {
    return (
      <button
        className="vipul-switcher-floating-icon"
        onClick={() => setMinimized(false)}
        title="Open App Switcher"
        aria-label="Open App Switcher"
      >
        <span className="vipul-switcher-badge-dot" />
        <span className="vipul-switcher-icon-symbol">⬡</span>
      </button>
    );
  }

  return (
    <aside className="vipul-switcher-wrapper" aria-label="Unified Navigation Bar">
      <div className="vipul-switcher-bar">
        {/* Back to Hub Button */}
        <a href="/" className="vipul-switcher-home-btn" title="Back to Project Hub">
          <span className="vipul-switcher-logo-hex">⬡</span>
          <span className="vipul-switcher-home-text">
            <strong>Vipul</strong><span className="vipul-switcher-ai">.ai</span> Hub
          </span>
        </a>

        <div className="vipul-switcher-divider" />

        {/* Current Active App Indicator */}
        <div className="vipul-switcher-current" onClick={() => setIsOpen(!isOpen)}>
          <span className="vipul-switcher-emoji">{current.emoji}</span>
          <span className="vipul-switcher-current-name">{current.name}</span>
          <span className={`vipul-switcher-arrow ${isOpen ? 'open' : ''}`}>▾</span>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="vipul-switcher-dropdown">
            <div className="vipul-switcher-dropdown-header">SWITCH APPLICATION</div>
            {APPS.map((app) => (
              <a
                key={app.id}
                href={app.route}
                className={`vipul-switcher-dropdown-item ${app.id === currentAppId ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="vipul-switcher-item-emoji">{app.emoji}</span>
                <span className="vipul-switcher-item-name">{app.name}</span>
                {app.id === currentAppId && <span className="vipul-switcher-item-badge">Active</span>}
              </a>
            ))}
            <div className="vipul-switcher-dropdown-footer">
              <a href="/" className="vipul-switcher-dropdown-home-link">
                ⬡ Return to Main Hub
              </a>
            </div>
          </div>
        )}

        {/* Direct App Pills for quick switching */}
        <div className="vipul-switcher-pills">
          {APPS.map((app) => (
            <a
              key={app.id}
              href={app.route}
              className={`vipul-switcher-pill ${app.id === currentAppId ? 'active' : ''}`}
              title={`Switch to ${app.name}`}
              style={{
                '--pill-color': app.color,
              }}
            >
              <span>{app.emoji}</span>
              <span className="vipul-switcher-pill-text">{app.name}</span>
            </a>
          ))}
        </div>

        {/* Minimize Button */}
        <button
          className="vipul-switcher-btn-minimize"
          onClick={() => setMinimized(true)}
          title="Minimize toolbar"
          aria-label="Minimize toolbar"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
