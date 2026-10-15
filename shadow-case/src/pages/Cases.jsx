import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const CATEGORIES = ['All', 'Disappearance', 'Theft', 'Murder', 'Suspicious Death', 'Corporate Espionage'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'difficulty-asc', label: 'Difficulty ↑' },
  { value: 'difficulty-desc', label: 'Difficulty ↓' },
  { value: 'reward-asc', label: 'Reward ↑' },
  { value: 'reward-desc', label: 'Reward ↓' }
];
const DIFF_ORDER = { Easy: 1, Medium: 2, Hard: 3, Expert: 4 };

export default function Cases() {
  const { cases, getCaseProgress } = useGame();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [sort, setSort] = useState('default');

  let filtered = cases.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    const matchDiff = difficulty === 'All' || c.difficulty === difficulty;
    return matchSearch && matchCat && matchDiff;
  });

  if (sort === 'difficulty-asc') filtered.sort((a, b) => DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]);
  if (sort === 'difficulty-desc') filtered.sort((a, b) => DIFF_ORDER[b.difficulty] - DIFF_ORDER[a.difficulty]);
  if (sort === 'reward-asc') filtered.sort((a, b) => a.reward - b.reward);
  if (sort === 'reward-desc') filtered.sort((a, b) => b.reward - a.reward);

  const getStatusLabel = (c) => {
    const prog = getCaseProgress(c.id);
    if (c.status === 'solved') return 'solved';
    if (prog > 0) return 'inprogress';
    return c.status;
  };

  const getStatusText = (s) => ({ available: 'Available', inprogress: 'In Progress', solved: 'Solved', locked: 'Locked' }[s] || s);

  return (
    <div className="page-enter" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* HEADER */}
        <div className="mb-5">
          <h1 className="section-title">Case Files</h1>
          <p className="section-subtitle">Browse and filter the complete mystery case library. Select a case to begin your investigation.</p>
        </div>

        {/* FILTERS */}
        <div className="sc-card mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>Search</label>
              <input
                className="sc-input"
                placeholder="Search cases..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>Category</label>
              <select className="sc-select sc-input" value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>Difficulty</label>
              <select className="sc-select sc-input" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>Sort</label>
              <select className="sc-select sc-input" value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button className="btn-ghost" onClick={() => { setSearch(''); setCategory('All'); setDifficulty('All'); setSort('default'); }} style={{ width: '100%', justifyContent: 'center' }}>↺</button>
            </div>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
          </span>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {['available', 'inprogress', 'solved', 'locked'].map(s => (
              <span key={s} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span className={`case-status-badge status-${s}`} style={{ position: 'static', padding: '0.15rem 0.4rem' }}>{getStatusText(s)}</span>
                <span>({cases.filter(c => getStatusLabel(c) === s).length})</span>
              </span>
            ))}
          </div>
        </div>

        {/* CASE GRID */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No cases match your filters</div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try adjusting your search or filters</div>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map(c => {
              const status = getStatusLabel(c);
              const prog = getCaseProgress(c.id);
              return (
                <div key={c.id} className="col-md-6 col-lg-4">
                  <div className={`case-card ${status === 'locked' ? 'locked' : ''}`}>
                    <div className="case-card-img-wrapper">
                      <img src={c.coverImage} alt={c.title} onError={e => { e.target.src = `https://via.placeholder.com/600x180/16161f/555566?text=${encodeURIComponent(c.title)}`; }} />
                      <div className={`case-status-badge status-${status}`}>{getStatusText(status)}</div>
                      {status === 'locked' && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', fontSize: '2.5rem' }}>🔒</div>
                      )}
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
                        <span className="case-meta-item">👥 {c.suspects.length} suspects</span>
                      </div>
                      {prog > 0 && (
                        <div style={{ marginBottom: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>
                            <span>Progress</span><span>{prog}%</span>
                          </div>
                          <div className="sc-progress" style={{ height: 4 }}>
                            <div className="sc-progress-bar" style={{ width: `${prog}%` }} />
                          </div>
                        </div>
                      )}
                      {status === 'locked' ? (
                        <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', cursor: 'not-allowed' }} disabled>
                          🔒 Solve Previous Case to Unlock
                        </button>
                      ) : (
                        <Link to={`/investigate/${c.id}`} className={status === 'solved' ? 'btn-ghost' : 'btn-detective'} style={{ width: '100%', justifyContent: 'center' }}>
                          {status === 'solved' ? '✅ View Case' : prog > 0 ? '▶ Continue Investigation' : '🔍 Investigate'}
                        </Link>
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
