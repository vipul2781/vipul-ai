import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const STATS = [
  { n: '6', l: 'Active Cases', icon: '📁' },
  { n: '1,247', l: 'Detectives', icon: '🕵️' },
  { n: '847', l: 'Mysteries Solved', icon: '✅' },
  { n: '18', l: 'Challenges', icon: '⚡' }
];

const HOW_TO = [
  { step: '01', title: 'Choose a Case', desc: 'Browse the case library and select a mystery to investigate. Cases range from Easy to Expert difficulty.' },
  { step: '02', title: 'Gather Evidence', desc: 'Explore crime scene locations to discover hidden clues and evidence. Every detail matters.' },
  { step: '03', title: 'Interrogate Suspects', desc: 'Question suspects and use your collected evidence to expose contradictions in their stories.' },
  { step: '04', title: 'Solve the Mystery', desc: 'Submit your accusation identifying the culprit, motive, and key evidence. Earn points and unlock new cases.' }
];

export default function Home() {
  const { cases, player } = useGame();
  const navigate = useNavigate();
  const featuredCases = cases.filter(c => c.status !== 'locked').slice(0, 3);
  const activeCaseId = player.gameHistory?.[0]?.caseId;

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-grid-overlay" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="floating-badge mb-3">
                <span>🔴</span> LIVE — 1,247 Active Detectives
              </div>
              <h1 className="hero-title mb-3">
                Every Clue<br />
                Tells a <span className="highlight">Story.</span><br />
                Every Detail<br />
                <span className="highlight">Matters.</span>
              </h1>
              <p className="hero-subtitle mb-4">
                Become an elite detective. Investigate crimes, interrogate suspects, 
                collect evidence, and solve mysteries in this immersive detective 
                investigation platform.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/cases" className="btn-detective" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>
                  🔍 Start Investigating
                </Link>
                {activeCaseId ? (
                  <button
                    className="btn-outline-detective"
                    onClick={() => navigate(`/investigate/${activeCaseId}`)}
                    style={{ fontSize: '0.95rem', padding: '0.8rem 1.8rem' }}
                  >
                    ▶ Continue Investigation
                  </button>
                ) : (
                  <Link to="/dashboard" className="btn-ghost" style={{ fontSize: '0.95rem', padding: '0.8rem 1.8rem' }}>
                    📊 My Dashboard
                  </Link>
                )}
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="sc-card" style={{ border: '1px solid rgba(255,214,10,0.15)', background: 'rgba(22,22,31,0.8)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-red)', animation: 'pulse-badge 1.5s ease-in-out infinite' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    ACTIVE INVESTIGATION — CASE FILE #SC-001
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-gold)', marginBottom: '0.75rem' }}>
                  The Midnight Mansion
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Reginald Blackwood has vanished from his ancestral estate. 3 suspects. 8 clues. The truth awaits.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                  {['🍷 Study Room', '📜 Library', '🌿 Garden', '🏚️ Cellar'].map(loc => (
                    <div key={loc} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{loc}</div>
                  ))}
                </div>
                <div className="sc-progress mb-1" />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <span>Investigation Progress</span>
                  <span style={{ color: 'var(--text-gold)' }}>0% Complete</span>
                </div>
                <Link to="/investigate/1" className="btn-detective mt-3" style={{ width: '100%', justifyContent: 'center' }}>
                  Open Case File
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="row g-0">
            {STATS.map(s => (
              <div key={s.l} className="col-6 col-md-3">
                <div className="stat-counter" style={{ borderRight: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                  <div className="number">{s.n}</div>
                  <div className="label">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASES */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="section-title">Featured Cases</h2>
              <p className="section-subtitle">Investigate open mysteries. Earn points. Rise through the ranks.</p>
            </div>
            <Link to="/cases" className="btn-ghost">View All →</Link>
          </div>

          <div className="row g-4">
            {featuredCases.map(c => (
              <div key={c.id} className="col-md-4">
                <div className="case-card">
                  <div className="case-card-img-wrapper">
                    <img src={c.coverImage} alt={c.title} onError={e => { e.target.style.display = 'none'; }} />
                    <div className={`case-status-badge status-${c.status}`}>
                      {c.status === 'available' ? 'Open' : c.status === 'solved' ? 'Solved' : 'Active'}
                    </div>
                  </div>
                  <div className="case-card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className={`difficulty-badge diff-${c.difficulty.toLowerCase()}`}>{c.difficulty}</span>
                      <span className="reward-points">+{c.reward} pts</span>
                    </div>
                    <div className="case-card-title">{c.title}</div>
                    <p className="case-card-desc">{c.description}</p>
                    <div className="case-meta">
                      <span className="case-meta-item">⏱ {c.estimatedTime}</span>
                      <span className="case-meta-item">🔍 {c.clueCount} clues</span>
                    </div>
                    <Link to={`/investigate/${c.id}`} className="btn-detective" style={{ width: '100%', justifyContent: 'center' }}>
                      Investigate →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO PLAY */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title" style={{ display: 'block' }}>How It Works</h2>
            <p className="section-subtitle">Four steps to becoming an elite detective</p>
          </div>
          <div className="row g-4">
            {HOW_TO.map(h => (
              <div key={h.step} className="col-md-6 col-lg-3">
                <div className="sc-card text-center">
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'rgba(255,214,10,0.2)', marginBottom: '0.5rem' }}>{h.step}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{h.title}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--text-gold)', marginBottom: '1rem' }}>
              Ready to Crack the Case?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              Join thousands of detectives. Start with a classic case or jump straight into the leaderboard challenge.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/cases" className="btn-detective" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                🔍 Browse All Cases
              </Link>
              <Link to="/leaderboard" className="btn-ghost" style={{ padding: '1rem 2rem' }}>
                🏆 View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
