import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { SAMPLE_PLAYERS, WEEKLY_PLAYERS, RANKS } from '../data/players';

export default function Leaderboard() {
  const { player, getCurrentRank } = useGame();
  const [activeTab, setActiveTab] = useState('allTime'); // 'allTime' | 'weekly'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRank, setSelectedRank] = useState('All');

  // Compute player's dynamic rank and list
  const currentRank = getCurrentRank(player.totalPoints);

  const combinedPlayers = useMemo(() => {
    const baseList = activeTab === 'allTime' ? [...SAMPLE_PLAYERS] : [...WEEKLY_PLAYERS];

    // Check if player already exists or merge
    const playerInList = baseList.find(p => p.name.toLowerCase() === player.name.toLowerCase());
    if (!playerInList) {
      baseList.push({
        id: 'me',
        name: player.name || 'Detective',
        avatar: player.avatar || '🕵️',
        points: player.totalPoints,
        casesSolved: player.casesSolved,
        accuracy: player.casesSolved > 0 ? Math.min(99, Math.round(80 + (player.casesSolved * 2))) : 75,
        winStreak: player.perfectSolves || 0,
        level: currentRank.name,
        isCurrentPlayer: true
      });
    }

    // Sort descending by points
    baseList.sort((a, b) => b.points - a.points);

    // Assign rank numbers
    return baseList.map((item, index) => ({
      ...item,
      calculatedRank: index + 1,
      isUser: item.id === 'me' || item.name.toLowerCase() === player.name.toLowerCase()
    }));
  }, [activeTab, player, currentRank]);

  // Filtered players
  const filteredPlayers = useMemo(() => {
    return combinedPlayers.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRank = selectedRank === 'All' || p.level.toLowerCase().includes(selectedRank.toLowerCase());
      return matchesSearch && matchesRank;
    });
  }, [combinedPlayers, searchTerm, selectedRank]);

  // User's current rank position
  const userRankEntry = combinedPlayers.find(p => p.isUser);
  const top1Points = combinedPlayers[0]?.points || 12000;
  const pointsBehindTop1 = Math.max(0, top1Points - player.totalPoints);

  // Top 3 for podium
  const topThree = combinedPlayers.slice(0, 3);

  return (
    <div className="page-enter" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* HEADER */}
        <div className="text-center mb-5">
          <div className="floating-badge mb-3">
            <span>🏆</span> GLOBAL DETECTIVE GUILD LEADERBOARDS
          </div>
          <h1 className="section-title mb-2">Hall of Fame</h1>
          <p className="section-subtitle mx-auto" style={{ maxWidth: '600px' }}>
            Compete with the world's sharpest sleuths. Solve cases with high accuracy, maintain streaks, 
            and dominate the seasonal rankings.
          </p>
        </div>

        {/* CURRENT USER STATUS BANNER */}
        <div
          className="sc-card mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(255,214,10,0.08) 0%, rgba(22,22,31,0.95) 100%)',
            border: '1px solid rgba(255,214,10,0.3)'
          }}
        >
          <div className="row align-items-center g-3">
            <div className="col-md-7 d-flex align-items-center gap-3">
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'var(--bg-input)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {player.avatar}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                    {player.name}
                  </span>
                  <span
                    style={{
                      background: 'rgba(255,214,10,0.15)',
                      color: 'var(--text-gold)',
                      border: '1px solid rgba(255,214,10,0.3)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '12px'
                    }}
                  >
                    YOU
                  </span>
                  <span style={{ fontSize: '0.8rem', color: currentRank.color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {currentRank.icon} {currentRank.name}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Current Standing: <strong style={{ color: 'var(--text-gold)' }}>#{userRankEntry?.calculatedRank || '-'}</strong> out of {combinedPlayers.length} detectives
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="d-flex justify-content-md-end gap-4 text-center">
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-gold)' }}>
                    {player.totalPoints.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    TOTAL SCORE
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--accent-cyan)' }}>
                    {player.casesSolved}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    CASES SOLVED
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--accent-red)' }}>
                    {pointsBehindTop1 > 0 ? `-${pointsBehindTop1}` : '👑 #1'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    GAP TO #1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PODIUM TOP 3 */}
        <div className="row g-3 mb-5 align-items-end">
          {/* Silver #2 */}
          {topThree[1] && (
            <div className="col-md-4 order-2 order-md-1">
              <div
                className="sc-card text-center"
                style={{
                  border: '1px solid rgba(192, 192, 192, 0.4)',
                  background: 'linear-gradient(180deg, rgba(192,192,192,0.08) 0%, var(--bg-card) 100%)',
                  paddingTop: '2rem'
                }}
              >
                <div style={{ fontSize: '1.8rem', color: '#c0c0c0', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                  🥈 2ND PLACE
                </div>
                <div style={{ fontSize: '3.5rem', margin: '0.5rem 0' }}>{topThree[1].avatar}</div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{topThree[1].name}</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                  {topThree[1].level}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    color: '#c0c0c0',
                    margin: '0.75rem 0'
                  }}
                >
                  {topThree[1].points.toLocaleString()} pts
                </div>
                <div className="d-flex justify-content-center gap-3 text-muted" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  <span>📂 {topThree[1].casesSolved} cases</span>
                  <span>🎯 {topThree[1].accuracy}% acc</span>
                </div>
                <Link
                  to={`/multiplayer?challenge=${topThree[1].name}`}
                  className="btn-outline-detective mt-3"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  ⚔️ Challenge
                </Link>
              </div>
            </div>
          )}

          {/* Gold #1 */}
          {topThree[0] && (
            <div className="col-md-4 order-1 order-md-2">
              <div
                className="sc-card text-center"
                style={{
                  border: '2px solid rgba(255, 214, 10, 0.6)',
                  background: 'linear-gradient(180deg, rgba(255,214,10,0.15) 0%, var(--bg-card) 100%)',
                  boxShadow: '0 0 30px rgba(255, 214, 10, 0.2)',
                  paddingTop: '2.5rem',
                  paddingBottom: '2rem'
                }}
              >
                <div style={{ fontSize: '2.2rem', color: 'var(--accent-gold)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                  👑 GUILD CHAMPION
                </div>
                <div style={{ fontSize: '4.5rem', margin: '0.5rem 0' }}>{topThree[0].avatar}</div>
                <h3 style={{ color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>{topThree[0].name}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                  {topThree[0].level}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    color: 'var(--accent-gold)',
                    margin: '0.75rem 0'
                  }}
                >
                  {topThree[0].points.toLocaleString()} pts
                </div>
                <div className="d-flex justify-content-center gap-3 text-muted" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                  <span>📂 {topThree[0].casesSolved} solved</span>
                  <span>🎯 {topThree[0].accuracy}% acc</span>
                  <span>🔥 {topThree[0].winStreak} streak</span>
                </div>
                <Link
                  to={`/multiplayer?challenge=${topThree[0].name}`}
                  className="btn-gold mt-3"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  ⚔️ Duel Champion
                </Link>
              </div>
            </div>
          )}

          {/* Bronze #3 */}
          {topThree[2] && (
            <div className="col-md-4 order-3">
              <div
                className="sc-card text-center"
                style={{
                  border: '1px solid rgba(205, 127, 50, 0.4)',
                  background: 'linear-gradient(180deg, rgba(205,127,50,0.08) 0%, var(--bg-card) 100%)',
                  paddingTop: '2rem'
                }}
              >
                <div style={{ fontSize: '1.8rem', color: '#cd7f32', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                  🥉 3RD PLACE
                </div>
                <div style={{ fontSize: '3.5rem', margin: '0.5rem 0' }}>{topThree[2].avatar}</div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{topThree[2].name}</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                  {topThree[2].level}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    color: '#cd7f32',
                    margin: '0.75rem 0'
                  }}
                >
                  {topThree[2].points.toLocaleString()} pts
                </div>
                <div className="d-flex justify-content-center gap-3 text-muted" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  <span>📂 {topThree[2].casesSolved} cases</span>
                  <span>🎯 {topThree[2].accuracy}% acc</span>
                </div>
                <Link
                  to={`/multiplayer?challenge=${topThree[2].name}`}
                  className="btn-outline-detective mt-3"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  ⚔️ Challenge
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* CONTROLS: TABS + SEARCH + FILTER */}
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-md-4">
            <div className="sc-tabs mb-0">
              <button
                className={`sc-tab ${activeTab === 'allTime' ? 'active' : ''}`}
                onClick={() => setActiveTab('allTime')}
              >
                All-Time Records
              </button>
              <button
                className={`sc-tab ${activeTab === 'weekly' ? 'active' : ''}`}
                onClick={() => setActiveTab('weekly')}
              >
                Weekly Sprint
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <input
              type="text"
              className="sc-input"
              placeholder="Search detective name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="sc-select w-100"
              value={selectedRank}
              onChange={(e) => setSelectedRank(e.target.value)}
            >
              <option value="All">All Ranks</option>
              {RANKS.map(r => (
                <option key={r.name} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* RANKINGS TABLE */}
        <div className="sc-card p-0" style={{ overflowX: 'auto' }}>
          <table className="table table-dark table-hover mb-0" style={{ background: 'transparent' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', width: '80px', textAlign: 'center' }}>RANK</th>
                <th style={{ padding: '1rem' }}>DETECTIVE</th>
                <th style={{ padding: '1rem' }}>TITLE / RANK</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>ACCURACY</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>STREAK</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>SOLVED</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>POINTS</th>
                <th style={{ padding: '1rem', textAlign: 'center', width: '130px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    No detectives found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPlayers.map((item) => {
                  const isTop1 = item.calculatedRank === 1;
                  const isTop2 = item.calculatedRank === 2;
                  const isTop3 = item.calculatedRank === 3;

                  return (
                    <tr
                      key={item.id}
                      style={{
                        backgroundColor: item.isUser
                          ? 'rgba(255, 214, 10, 0.08)'
                          : isTop1
                          ? 'rgba(255, 214, 10, 0.03)'
                          : 'transparent',
                        borderBottom: '1px solid rgba(255,255,255,0.04)'
                      }}
                    >
                      {/* Rank Number */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                        <span
                          className={`rank-number ${
                            isTop1 ? 'rank-gold' : isTop2 ? 'rank-silver' : isTop3 ? 'rank-bronze' : ''
                          }`}
                          style={{
                            fontWeight: 'bold',
                            fontSize: item.calculatedRank <= 3 ? '1.2rem' : '0.95rem'
                          }}
                        >
                          {isTop1 ? '🥇 1' : isTop2 ? '🥈 2' : isTop3 ? '🥉 3' : `#${item.calculatedRank}`}
                        </span>
                      </td>

                      {/* Detective Name & Avatar */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle' }}>
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: '1.6rem' }}>{item.avatar}</span>
                          <div>
                            <div className="d-flex align-items-center gap-2">
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: item.isUser ? 'var(--text-gold)' : 'var(--text-primary)'
                                }}
                              >
                                {item.name}
                              </span>
                              {item.isUser && (
                                <span
                                  style={{
                                    fontSize: '0.68rem',
                                    padding: '0.1rem 0.4rem',
                                    borderRadius: '4px',
                                    background: 'var(--accent-gold)',
                                    color: '#000',
                                    fontWeight: 700
                                  }}
                                >
                                  YOU
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              ID: #SC-0{item.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Title / Rank */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: item.level.includes('Master')
                              ? 'var(--text-gold)'
                              : item.level.includes('Senior')
                              ? '#b370c9'
                              : 'var(--accent-cyan)'
                          }}
                        >
                          {item.level}
                        </span>
                      </td>

                      {/* Accuracy */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                        <span style={{ color: item.accuracy >= 90 ? '#28a745' : 'var(--text-secondary)' }}>
                          {item.accuracy}%
                        </span>
                      </td>

                      {/* Win streak */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                        {item.winStreak > 0 ? (
                          <span style={{ color: '#ff9f1c', fontWeight: 600 }}>
                            🔥 {item.winStreak}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>-</span>
                        )}
                      </td>

                      {/* Solved Cases */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                        {item.casesSolved}
                      </td>

                      {/* Total Points */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle', textAlign: 'right' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            color: isTop1 ? 'var(--text-gold)' : 'var(--text-primary)'
                          }}
                        >
                          {item.points.toLocaleString()}
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ padding: '1rem', verticalAlign: 'middle', textAlign: 'center' }}>
                        {item.isUser ? (
                          <Link to="/profile" className="btn-ghost" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                            Profile
                          </Link>
                        ) : (
                          <Link
                            to={`/multiplayer?challenge=${item.name}`}
                            className="btn-outline-detective"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                          >
                            ⚔️ Duel
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* LIVE ACTIVITY TICKER */}
        <div className="sc-card mt-4" style={{ background: 'rgba(15,15,22,0.6)', border: '1px solid var(--border-subtle)' }}>
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: '1.2rem', color: 'var(--accent-red)' }}>📡</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              LIVE GUILD TELEMETRY:
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <strong>NightOwl</strong> exposed a contradiction in <em>The Silent Gallery</em> (+100 pts) • <strong>ShadowHunter</strong> maintained a 7-win duel streak! • <strong>GreyPhoenix</strong> joined the Master Detective tier!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
