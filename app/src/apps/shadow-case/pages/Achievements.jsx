import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { ACHIEVEMENTS_LIST } from '../data/players';

const RARITIES = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const STATUS_OPTIONS = ['All', 'Unlocked', 'Locked'];

export default function Achievements() {
  const { player } = useGame();
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const unlockedIds = useMemo(() => player.unlockedAchievements || [], [player.unlockedAchievements]);

  // Progress metrics
  const totalAchievements = ACHIEVEMENTS_LIST.length;
  const unlockedCount = unlockedIds.length;
  const progressPercent = Math.round((unlockedCount / totalAchievements) * 100);

  const totalPossiblePoints = ACHIEVEMENTS_LIST.reduce((sum, a) => sum + a.points, 0);
  const earnedAchievementPoints = ACHIEVEMENTS_LIST
    .filter(a => unlockedIds.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  // Helper to calculate progress toward an achievement
  const getAchievementProgress = (achievement) => {
    const isUnlocked = unlockedIds.includes(achievement.id);
    if (isUnlocked) return { current: 1, max: 1, percent: 100, label: 'Completed' };

    switch (achievement.id) {
      case 'first_case':
        return {
          current: Math.min(1, player.casesSolved),
          max: 1,
          percent: player.casesSolved >= 1 ? 100 : (player.casesSolved / 1) * 100,
          label: `${player.casesSolved} / 1 Cases`
        };
      case 'eagle_eye':
        return {
          current: Math.min(1, player.perfectClues || 0),
          max: 1,
          percent: (player.perfectClues || 0) >= 1 ? 100 : 0,
          label: `${player.perfectClues || 0} / 1 Case with all clues`
        };
      case 'master_interrogator':
        return {
          current: Math.min(5, player.contradictionsFound || 0),
          max: 5,
          percent: Math.min(100, ((player.contradictionsFound || 0) / 5) * 100),
          label: `${player.contradictionsFound || 0} / 5 Contradictions`
        };
      case 'no_hints':
        return {
          current: Math.min(1, player.noHintCases || 0),
          max: 1,
          percent: (player.noHintCases || 0) >= 1 ? 100 : 0,
          label: `${player.noHintCases || 0} / 1 Solved without hints`
        };
      case 'speed_detective':
        return {
          current: Math.min(1, player.timedCasesCompleted || 0),
          max: 1,
          percent: (player.timedCasesCompleted || 0) >= 1 ? 100 : 0,
          label: `${player.timedCasesCompleted || 0} / 1 Timed Challenge`
        };
      case 'perfect_deduction':
        return {
          current: Math.min(1, player.perfectSolves || 0),
          max: 1,
          percent: (player.perfectSolves || 0) >= 1 ? 100 : 0,
          label: `${player.perfectSolves || 0} / 1 Perfect first-try solve`
        };
      case 'seasoned_detective':
        return {
          current: Math.min(5, player.casesSolved),
          max: 5,
          percent: Math.min(100, (player.casesSolved / 5) * 100),
          label: `${player.casesSolved} / 5 Cases`
        };
      case 'master_sleuth':
        return {
          current: Math.min(10000, player.totalPoints),
          max: 10000,
          percent: Math.min(100, (player.totalPoints / 10000) * 100),
          label: `${player.totalPoints.toLocaleString()} / 10,000 pts`
        };
      default:
        return { current: 0, max: 1, percent: 0, label: '0 / 1' };
    }
  };

  // Filter list
  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS_LIST.filter(a => {
      const isUnlocked = unlockedIds.includes(a.id);
      const matchesRarity = selectedRarity === 'All' || a.rarity.toLowerCase() === selectedRarity.toLowerCase();
      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Unlocked' && isUnlocked) ||
        (selectedStatus === 'Locked' && !isUnlocked);
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRarity && matchesStatus && matchesSearch;
    });
  }, [unlockedIds, selectedRarity, selectedStatus, searchQuery]);

  return (
    <div className="page-enter" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* HEADER */}
        <div className="text-center mb-5">
          <div className="floating-badge mb-3">
            <span>🎖️</span> DETECTIVE MERIT COMMENDATIONS
          </div>
          <h1 className="section-title mb-2">Academy Achievements</h1>
          <p className="section-subtitle mx-auto" style={{ maxWidth: '600px' }}>
            Earn badges of honor by exposing contradictions, analyzing forensic evidence, 
            and solving criminal conspiracies without compromise.
          </p>
        </div>

        {/* PROGRESS OVERVIEW HERO */}
        <div
          className="sc-card mb-5"
          style={{
            background: 'linear-gradient(135deg, rgba(255,214,10,0.08) 0%, rgba(22,22,31,0.95) 100%)',
            border: '1px solid rgba(255,214,10,0.25)'
          }}
        >
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-gold)' }}>
                  Overall Detective Mastery
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--text-gold)', fontWeight: 'bold' }}>
                  {unlockedCount} / {totalAchievements} Unlocked ({progressPercent}%)
                </div>
              </div>

              {/* Master Progress Bar */}
              <div className="sc-progress mb-3" style={{ height: '10px' }}>
                <div
                  className="sc-progress-bar"
                  style={{
                    width: `${progressPercent}%`,
                    background: 'linear-gradient(90deg, var(--accent-red), var(--accent-gold))'
                  }}
                />
              </div>

              <div className="d-flex flex-wrap gap-4 text-muted" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                <span>
                  💰 Achievement Points: <strong style={{ color: 'var(--text-gold)' }}>{earnedAchievementPoints.toLocaleString()}</strong> / {totalPossiblePoints.toLocaleString()}
                </span>
                <span>
                  🔒 Remaining Badges: <strong style={{ color: 'var(--accent-red)' }}>{totalAchievements - unlockedCount}</strong>
                </span>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end">
              <Link to="/cases" className="btn-detective">
                🔍 Solve Cases to Unlock
              </Link>
            </div>
          </div>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="sc-card mb-4" style={{ padding: '1.25rem' }}>
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-md-4">
              <input
                type="text"
                className="sc-input"
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Tabs */}
            <div className="col-md-4">
              <div className="sc-tabs mb-0">
                {STATUS_OPTIONS.map(status => (
                  <button
                    key={status}
                    className={`sc-tab ${selectedStatus === status ? 'active' : ''}`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Rarity Select */}
            <div className="col-md-4">
              <select
                className="sc-select w-100"
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
              >
                {RARITIES.map(r => (
                  <option key={r} value={r}>
                    {r === 'All' ? 'All Rarities' : `${r} Rarity`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS GRID */}
        {filteredAchievements.length === 0 ? (
          <div className="sc-card text-center py-5">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h4 style={{ color: 'var(--text-primary)' }}>No achievements found</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              Try adjusting your search query or filters.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredAchievements.map((item) => {
              const isUnlocked = unlockedIds.includes(item.id);
              const progressData = getAchievementProgress(item);

              return (
                <div key={item.id} className="col-md-6 col-lg-3">
                  <div
                    className={`achievement-card h-100 ${isUnlocked ? 'unlocked' : 'locked'}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: isUnlocked
                        ? '1px solid rgba(255, 214, 10, 0.4)'
                        : '1px solid var(--border-subtle)',
                      boxShadow: isUnlocked ? '0 0 15px rgba(255, 214, 10, 0.1)' : 'none'
                    }}
                  >
                    <div>
                      {/* Top Status & Points */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className={`rarity-badge rarity-${item.rarity.toLowerCase()} m-0`}>
                          {item.rarity}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: isUnlocked ? 'var(--text-gold)' : 'var(--text-muted)'
                          }}
                        >
                          +{item.points} pts
                        </span>
                      </div>

                      {/* Icon */}
                      <div
                        className="achievement-icon"
                        style={{
                          transform: isUnlocked ? 'scale(1.1)' : 'grayscale(1)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        {item.icon}
                      </div>

                      {/* Title & Description */}
                      <h3 className="achievement-title" style={{ fontSize: '1rem' }}>
                        {item.title}
                      </h3>
                      <p className="achievement-desc mb-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Progress / Status Bottom */}
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {isUnlocked ? 'STATUS' : 'PROGRESS'}
                        </span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            color: isUnlocked ? '#28a745' : 'var(--text-secondary)',
                            fontWeight: isUnlocked ? 'bold' : 'normal'
                          }}
                        >
                          {progressData.label}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="sc-progress" style={{ height: '5px' }}>
                        <div
                          className="sc-progress-bar"
                          style={{
                            width: `${progressData.percent}%`,
                            background: isUnlocked
                              ? '#28a745'
                              : 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))'
                          }}
                        />
                      </div>

                      {isUnlocked ? (
                        <div
                          style={{
                            marginTop: '0.6rem',
                            fontSize: '0.75rem',
                            color: '#28a745',
                            fontFamily: 'var(--font-mono)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <span>✓</span> UNLOCKED
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: '0.6rem',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <span>🔒</span> LOCKED
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
