import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ACHIEVEMENTS_LIST } from '../data/players';

export default function Dashboard() {
  const { player, cases, getCurrentRank, getRankProgress, getCaseProgress } = useGame();
  const rank = getCurrentRank(player.totalPoints);
  const progress = getRankProgress(player.totalPoints);
  const availableCases = cases.filter(c => c.status === 'available');
  const recentHistory = player.gameHistory?.slice(0, 5) || [];
  const unlockedCount = player.unlockedAchievements?.length || 0;

  const stats = [
    { icon: '⭐', value: player.totalPoints.toLocaleString(), label: 'Total Points' },
    { icon: '📁', value: player.casesSolved, label: 'Cases Solved' },
    { icon: '🔍', value: player.contradictionsFound, label: 'Contradictions' },
    { icon: '🏆', value: unlockedCount, label: 'Achievements' }
  ];

  // Get daily challenge — rotates daily using date as seed
  const today = new Date();
  const dailyCase = cases[(today.getDate()) % cases.length];

  return (
    <div className="page-enter" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* HEADER */}
        <div className="sc-card mb-4" style={{ background: 'linear-gradient(135deg, rgba(230,57,70,0.08) 0%, transparent 50%, rgba(255,214,10,0.04) 100%)', border: '1px solid rgba(255,214,10,0.15)' }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '3.5rem' }}>{player.avatar}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Detective</div>
                  <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', margin: 0 }}>{player.name}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '1rem' }}>{rank.icon}</span>
                    <span style={{ color: rank.color, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>{rank.name}</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>Rank Progress</span>
                  <span style={{ color: 'var(--text-gold)' }}>{Math.round(progress)}%</span>
                </div>
                <div className="sc-progress">
                  <div className="sc-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mt-3 mt-md-0">
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--text-gold)' }}>
                {player.totalPoints.toLocaleString()}
              </div>
              <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Total Points
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="row g-3 mb-4">
          {stats.map(s => (
            <div key={s.label} className="col-6 col-md-3">
              <div className="dashboard-stat">
                <div className="dashboard-stat-icon">{s.icon}</div>
                <div>
                  <div className="dashboard-stat-value">{s.value}</div>
                  <div className="dashboard-stat-label">{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* LEFT COLUMN */}
          <div className="col-lg-8">
            {/* DAILY CHALLENGE */}
            {dailyCase && (
              <div className="sc-card mb-4" style={{ border: '1px solid rgba(67,97,238,0.3)', background: 'linear-gradient(135deg, rgba(67,97,238,0.06) 0%, transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>⚡</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Daily Challenge</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{dailyCase.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{dailyCase.description}</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span className={`difficulty-badge diff-${dailyCase.difficulty.toLowerCase()}`}>{dailyCase.difficulty}</span>
                  <span style={{ color: 'var(--text-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>+{dailyCase.reward} pts</span>
                  <Link to={`/investigate/${dailyCase.id}`} className="btn-gold ms-auto">Play Challenge →</Link>
                </div>
              </div>
            )}

            {/* AVAILABLE CASES */}
            <div className="sc-card mb-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0 }}>Available Cases</h3>
                <Link to="/cases" className="btn-ghost" style={{ fontSize: '0.8rem' }}>View All</Link>
              </div>
              {availableCases.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  🎉 You've unlocked all cases! Check back for new mysteries.
                </div>
              ) : (
                availableCases.slice(0, 3).map(c => {
                  const prog = getCaseProgress(c.id);
                  return (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '1.75rem', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', flexShrink: 0 }}>📁</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{c.title}</div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <span className={`difficulty-badge diff-${c.difficulty.toLowerCase()}`}>{c.difficulty}</span>
                          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>⏱ {c.estimatedTime}</span>
                        </div>
                        {prog > 0 && (
                          <div className="sc-progress mt-2" style={{ height: 4 }}>
                            <div className="sc-progress-bar" style={{ width: `${prog}%` }} />
                          </div>
                        )}
                      </div>
                      <Link to={`/investigate/${c.id}`} className="btn-detective" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        {prog > 0 ? 'Continue' : 'Investigate'}
                      </Link>
                    </div>
                  );
                })
              )}
            </div>

            {/* RECENT HISTORY */}
            <div className="sc-card">
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Recent Activity</h3>
              {recentHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No investigation history yet. <Link to="/cases" style={{ color: 'var(--accent-gold)' }}>Start your first case!</Link>
                </div>
              ) : (
                recentHistory.map((h, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: i < recentHistory.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{h.caseTitle}</div>
                      <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{h.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: h.result === 'Solved' ? '#28a745' : 'var(--accent-red)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{h.result}</div>
                      <div style={{ color: 'var(--text-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>+{h.points} pts</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-4">
            {/* ACHIEVEMENTS */}
            <div className="sc-card mb-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0, fontSize: '1rem' }}>Achievements</h3>
                <Link to="/achievements" className="btn-ghost" style={{ fontSize: '0.75rem' }}>View All</Link>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ACHIEVEMENTS_LIST.slice(0, 6).map(a => {
                  const unlocked = player.unlockedAchievements?.includes(a.id);
                  return (
                    <div key={a.id} title={a.title} style={{
                      width: 52, height: 52, fontSize: '1.6rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: unlocked ? 'rgba(255,214,10,0.1)' : 'var(--bg-input)',
                      border: `1px solid ${unlocked ? 'rgba(255,214,10,0.3)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-sm)',
                      filter: unlocked ? 'none' : 'grayscale(1) opacity(0.4)',
                      cursor: 'default'
                    }}>
                      {a.icon}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {unlockedCount} / {ACHIEVEMENTS_LIST.length} unlocked
              </div>
              <div className="sc-progress mt-2">
                <div className="sc-progress-bar" style={{ width: `${(unlockedCount / ACHIEVEMENTS_LIST.length) * 100}%` }} />
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="sc-card">
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1.25rem', fontSize: '1rem' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to="/cases" className="btn-detective" style={{ justifyContent: 'center' }}>🔍 Explore New Cases</Link>
                <Link to="/multiplayer" className="btn-outline-detective" style={{ justifyContent: 'center' }}>⚡ Quick Multiplayer Match</Link>
                <Link to="/leaderboard" className="btn-ghost" style={{ justifyContent: 'center' }}>🏆 View Leaderboard</Link>
                <Link to="/profile" className="btn-ghost" style={{ justifyContent: 'center' }}>👤 Edit Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
