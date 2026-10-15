import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { RANKS } from '../data/players';

const AVATAR_OPTIONS = ['🕵️', '🕵️‍♀️', '🧐', '🦉', '🎭', '🦅', '⚡', '🗡️', '👁️', '🐺', '🖤', '🛡️'];

export default function Profile() {
  const { player, cases, getCurrentRank, getRankProgress, initPlayer, updatePreferences } = useGame();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(player.name);
  const [tempAvatar, setTempAvatar] = useState(player.avatar);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const currentRank = getCurrentRank(player.totalPoints);
  const rankProgress = getRankProgress(player.totalPoints);

  // Compute next rank info
  const sortedRanks = [...RANKS].sort((a, b) => a.minPoints - b.minPoints);
  const currentRankIdx = sortedRanks.findIndex(r => r.name === currentRank.name);
  const nextRank = sortedRanks[currentRankIdx + 1] || null;
  const pointsToNext = nextRank ? Math.max(0, nextRank.minPoints - player.totalPoints) : 0;

  // Total clues discovered across all cases
  const totalCluesDiscovered = cases.reduce((acc, c) => {
    return acc + (c.clues ? c.clues.filter(cl => cl.discovered).length : 0);
  }, 0);

  const totalPossibleClues = cases.reduce((acc, c) => acc + (c.clues ? c.clues.length : 0), 0);

  // Accuracy calculation
  const accuracyRate = player.casesSolved > 0
    ? Math.min(99, Math.round(85 + (player.casesSolved * 2) - (player.totalHintsUsed * 1.5)))
    : 100;

  // Handle profile edit save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    initPlayer(tempName.trim(), tempAvatar);
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  // Handle full progress reset
  const handleResetProgress = () => {
    localStorage.removeItem('shadowcase_player');
    localStorage.removeItem('shadowcase_cases');
    window.location.reload();
  };

  return (
    <div className="page-enter" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* HEADER */}
        <div className="text-center mb-5">
          <div className="floating-badge mb-3">
            <span>🛡️</span> DETECTIVE ACADEMY PERSONNEL DOSSIER
          </div>
          <h1 className="section-title mb-2">Detective Dossier</h1>
          <p className="section-subtitle mx-auto" style={{ maxWidth: '600px' }}>
            Official service records, commendations, case logs, and security clearance credentials.
          </p>
        </div>

        {/* NOTIFICATION NOTICE */}
        {savedNotice && (
          <div
            className="alert alert-success d-flex align-items-center justify-content-between mb-4"
            style={{ background: 'rgba(40, 167, 69, 0.2)', border: '1px solid #28a745', color: '#28a745' }}
          >
            <span>✓ Detective Dossier updated successfully.</span>
            <button className="btn-close" onClick={() => setSavedNotice(false)} />
          </div>
        )}

        {/* DETECTIVE ID BADGE CARD */}
        <div
          className="sc-card mb-5"
          style={{
            background: 'linear-gradient(135deg, rgba(230,57,70,0.08) 0%, rgba(22,22,31,0.95) 50%, rgba(255,214,10,0.05) 100%)',
            border: '1px solid rgba(255,214,10,0.25)',
            position: 'relative'
          }}
        >
          {/* Watermark / Badge Stamp */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              border: `2px solid ${currentRank.color}`,
              color: currentRank.color,
              padding: '0.25rem 0.75rem',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              transform: 'rotate(-4deg)',
              opacity: 0.85
            }}
          >
            VERIFIED {currentRank.name.toUpperCase()}
          </div>

          <div className="row align-items-center g-4">
            {/* Avatar & Edit Trigger */}
            <div className="col-md-3 text-center">
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '24px',
                  background: 'var(--bg-input)',
                  border: '2px solid rgba(255,214,10,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4.5rem',
                  margin: '0 auto 1rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                }}
              >
                {player.avatar}
              </div>

              <button
                className="btn-ghost"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel Editing' : '✏️ Edit Callsign'}
              </button>
            </div>

            {/* Profile Info */}
            <div className="col-md-9">
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="p-3" style={{ background: 'var(--bg-input)', borderRadius: '12px' }}>
                  <h4 style={{ color: 'var(--text-gold)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                    Edit Detective Credentials
                  </h4>

                  <div className="mb-3">
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      CALLSIGN / DETECTIVE NAME:
                    </label>
                    <input
                      type="text"
                      className="sc-input mt-1"
                      value={tempName}
                      maxLength={24}
                      onChange={(e) => setTempName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.5rem' }}>
                      SELECT AVATAR INSIGNIA:
                    </label>
                    <div className="d-flex flex-wrap gap-2">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setTempAvatar(av)}
                          style={{
                            background: tempAvatar === av ? 'var(--accent-gold-dim)' : 'var(--bg-card)',
                            border: tempAvatar === av ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                            borderRadius: '10px',
                            fontSize: '1.8rem',
                            padding: '0.3rem 0.6rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn-detective" style={{ padding: '0.5rem 1.25rem' }}>
                      💾 Save Credentials
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ padding: '0.5rem 1.25rem' }}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                    SPECIAL AGENT DOSSIER #SC-{Math.abs(player.totalPoints * 3 + 104)}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--text-primary)', margin: '0.25rem 0' }}>
                    {player.name}
                  </h2>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span style={{ fontSize: '1.2rem' }}>{currentRank.icon}</span>
                    <span style={{ color: currentRank.color, fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem' }}>
                      {currentRank.name}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                      • Tier Clearance
                    </span>
                  </div>

                  {/* Rank XP Bar */}
                  <div className="mb-2">
                    <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      <span>
                        Promotion Status ({Math.round(rankProgress)}%)
                      </span>
                      <span>
                        {nextRank ? `${pointsToNext.toLocaleString()} pts to ${nextRank.name}` : 'Highest Rank Achieved 👑'}
                      </span>
                    </div>
                    <div className="sc-progress" style={{ height: '8px' }}>
                      <div
                        className="sc-progress-bar"
                        style={{
                          width: `${rankProgress}%`,
                          background: `linear-gradient(90deg, ${currentRank.color}, var(--accent-gold))`
                        }}
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-4 mt-3" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    <span>⭐ Total XP: <strong style={{ color: 'var(--text-gold)' }}>{player.totalPoints.toLocaleString()}</strong></span>
                    <span>🎯 Estimated Accuracy: <strong style={{ color: '#28a745' }}>{accuracyRate}%</strong></span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DETECTIVE SERVICE METRICS */}
        <div className="mb-5">
          <h3 className="section-title mb-4" style={{ fontSize: '1.3rem' }}>
            Career Investigation Telemetry
          </h3>

          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="dashboard-stat">
                <div className="dashboard-stat-icon">📁</div>
                <div>
                  <div className="dashboard-stat-value">{player.casesSolved}</div>
                  <div className="dashboard-stat-label">Cases Solved</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="dashboard-stat">
                <div className="dashboard-stat-icon">💎</div>
                <div>
                  <div className="dashboard-stat-value">{player.perfectSolves || 0}</div>
                  <div className="dashboard-stat-label">First-Try Solves</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="dashboard-stat">
                <div className="dashboard-stat-icon">🎯</div>
                <div>
                  <div className="dashboard-stat-value">{player.contradictionsFound}</div>
                  <div className="dashboard-stat-label">Contradictions</div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="dashboard-stat">
                <div className="dashboard-stat-icon">🔍</div>
                <div>
                  <div className="dashboard-stat-value">{totalCluesDiscovered} / {totalPossibleClues}</div>
                  <div className="dashboard-stat-label">Evidence Found</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT CASE FILES SOLVED */}
        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <div className="sc-card h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', margin: 0 }}>
                  📂 Solved Case Archive
                </h4>
                <Link to="/cases" className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>
                  Browse All Cases
                </Link>
              </div>

              {player.gameHistory && player.gameHistory.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0" style={{ background: 'transparent' }}>
                    <thead>
                      <tr style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        <th style={{ padding: '0.75rem' }}>CASE NAME</th>
                        <th style={{ padding: '0.75rem' }}>DATE COMPLETED</th>
                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>OUTCOME</th>
                        <th style={{ padding: '0.75rem', textAlign: 'right' }}>PTS EARNED</th>
                        <th style={{ padding: '0.75rem', textAlign: 'center' }}>REVIEW</th>
                      </tr>
                    </thead>
                    <tbody>
                      {player.gameHistory.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '0.75rem', fontWeight: 600 }}>{item.caseTitle}</td>
                          <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {item.date}
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                            <span style={{ color: '#28a745', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                              ✓ Solved
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-gold)' }}>
                            +{item.points} pts
                          </td>
                          <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                            <Link to={`/investigate/${item.caseId}`} className="btn-ghost" style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📂</div>
                  <h5 style={{ color: 'var(--text-primary)' }}>No Cases Solved Yet</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    Open your first case file in the investigation bureau to begin compiling your track record.
                  </p>
                  <Link to="/cases" className="btn-detective" style={{ fontSize: '0.85rem' }}>
                    🔍 Start First Case
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ACADEMY PREFERENCES & SETTINGS */}
          <div className="col-lg-4">
            <div className="sc-card h-100">
              <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '1.25rem' }}>
                ⚙️ Academy Preferences
              </h4>

              {/* Sound toggle */}
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Audio FX Simulation</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Investigative clicks & clues audio</div>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={player.preferences?.sound ?? true}
                    onChange={(e) => updatePreferences({ sound: e.target.checked })}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Animations toggle */}
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Cinematic Micro-Animations</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Noir transitions & score pulse effects</div>
                </div>
                <div className="form-check form-switch m-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={player.preferences?.animations ?? true}
                    onChange={(e) => updatePreferences({ animations: e.target.checked })}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="d-grid gap-2 mb-4">
                <Link to="/achievements" className="btn-ghost text-center" style={{ fontSize: '0.85rem' }}>
                  🎖️ View My Achievements
                </Link>
                <Link to="/leaderboard" className="btn-ghost text-center" style={{ fontSize: '0.85rem' }}>
                  🏆 Guild Leaderboard Standing
                </Link>
              </div>

              {/* Reset Data Danger Zone */}
              <div className="pt-3" style={{ borderTop: '1px solid rgba(230,57,70,0.2)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                  ⚠️ DANGER ZONE
                </div>
                {showResetConfirm ? (
                  <div className="p-3" style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid var(--accent-red)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                      Are you sure? This will wipe all solved cases, clues, and career points back to Rookie.
                    </p>
                    <div className="d-flex gap-2">
                      <button
                        className="btn-detective"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                        onClick={handleResetProgress}
                      >
                        Confirm Wipe
                      </button>
                      <button
                        className="btn-ghost"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                        onClick={() => setShowResetConfirm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn-outline-detective w-100"
                    style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                    onClick={() => setShowResetConfirm(true)}
                  >
                    🗑️ Reset Career Progress
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
