import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="sc-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="footer-logo">🔍 SHADOW CASE</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Detective Academy — Where every clue tells a story and every detail matters. 
              Sharpen your investigative skills and become the ultimate detective.
            </p>
          </div>
          <div className="col-lg-2 col-6 mb-4">
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Navigation</div>
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/dashboard">Dashboard</Link>
            <Link className="footer-link" to="/cases">Cases</Link>
            <Link className="footer-link" to="/leaderboard">Leaderboard</Link>
          </div>
          <div className="col-lg-2 col-6 mb-4">
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Features</div>
            <Link className="footer-link" to="/multiplayer">Multiplayer</Link>
            <Link className="footer-link" to="/achievements">Achievements</Link>
            <Link className="footer-link" to="/profile">Profile</Link>
          </div>
          <div className="col-lg-4 mb-4">
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Detective Stats</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {[
                { n: '6', l: 'Active Cases' },
                { n: '1.2K', l: 'Detectives' },
                { n: '847', l: 'Solved' }
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-gold)' }}>{s.n}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <p className="footer-copy">
          © 2024 Shadow Case: Detective Academy — A Frontend Mystery Game Platform
        </p>
      </div>
    </footer>
  );
}
