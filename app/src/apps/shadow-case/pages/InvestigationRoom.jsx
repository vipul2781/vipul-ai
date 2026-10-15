import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { QUESTIONS } from '../data/cases';

/* ====================================================
   MAIN INVESTIGATION ROOM
   Tabs: Overview | Evidence Board | Interrogation | Solve
   ==================================================== */

export default function InvestigationRoom() {
  const { caseId } = useParams();
  const { getCase, discoverClue, recordContradiction, applyHint, solveCase, getCaseProgress } = useGame();

  const caseData = getCase(caseId);
  const [tab, setTab] = useState('overview');
  const [selectedClue, setSelectedClue] = useState(null);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [notes, setNotes] = useState(() => localStorage.getItem(`notes_${caseId}`) || '');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHintConfirm, setShowHintConfirm] = useState(false);
  const [currentHint, setCurrentHint] = useState(null);

  // Interrogation state
  const [askedQuestions, setAskedQuestions] = useState({});
  const [lastAnswer, setLastAnswer] = useState(null);
  const [contradiction, setContradiction] = useState(null);

  // Solve state
  const [accusation, setAccusation] = useState({ culprit: null, motive: null, evidence: [] });
  const [solved, setSolved] = useState(null);

  // Auto-save notes
  useEffect(() => {
    localStorage.setItem(`notes_${caseId}`, notes);
  }, [notes, caseId]);

  if (!caseData) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '3rem' }}>🔍</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', marginTop: '1rem' }}>Case Not Found</h2>
        <Link to="/cases" className="btn-detective mt-3 d-inline-flex">← Back to Cases</Link>
      </div>
    );
  }

  if (caseData.status === 'locked') {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', marginTop: '1rem' }}>Case Locked</h2>
        <p>Solve the previous case to unlock this investigation.</p>
        <Link to="/cases" className="btn-detective mt-3 d-inline-flex">← Back to Cases</Link>
      </div>
    );
  }

  const discoveredClues = caseData.clues.filter(c => c.discovered);
  const progress = getCaseProgress(parseInt(caseId));
  const allCluesFound = discoveredClues.length === caseData.clues.length;

  // Generate locations from unique clue locations
  const locations = [...new Set(caseData.clues.map(c => c.location))];

  // Find a hint for an undiscovered clue
  const getNextHint = () => {
    const undiscovered = caseData.clues.filter(c => !c.discovered);
    if (undiscovered.length === 0) return null;
    return `Look in the "${undiscovered[0].location}" for clue: ${undiscovered[0].title}`;
  };

  const handleHint = () => {
    const hint = getNextHint();
    setCurrentHint(hint);
    setShowHintConfirm(true);
  };

  const confirmHint = () => {
    applyHint();
    setHintsUsed(h => h + 1);
    setShowHintConfirm(false);
  };

  const handleAsk = (questionId) => {
    if (!selectedSuspect) return;
    const response = selectedSuspect.statements[questionId];
    setLastAnswer({ question: questionId, text: response });

    // Check for contradiction
    const contra = caseData.contradictions?.find(c =>
      c.suspectId === selectedSuspect.id && c.question === questionId
    );

    if (contra) {
      const evidenceFound = discoveredClues.some(cl => cl.id === contra.evidence);
      if (evidenceFound) {
        setContradiction(contra.contradiction);
        recordContradiction();
      } else {
        setContradiction(null);
      }
    } else {
      setContradiction(null);
    }

    setAskedQuestions(prev => ({ ...prev, [`${selectedSuspect.id}_${questionId}`]: true }));
  };

  const handleAccuse = () => {
    if (!accusation.culprit) return;
    const correctCulprit = caseData.solution.culprit;
    const isCorrect = accusation.culprit === correctCulprit;
    const firstTry = !solved;
    const result = solveCase(parseInt(caseId), isCorrect, firstTry, hintsUsed, allCluesFound);
    setSolved({ isCorrect, result, solution: caseData.solution });
    setTab('solved-result');
  };

  const toggleAccusationEvidence = (clueId) => {
    setAccusation(prev => ({
      ...prev,
      evidence: prev.evidence.includes(clueId)
        ? prev.evidence.filter(e => e !== clueId)
        : [...prev.evidence, clueId]
    }));
  };

  const TABS = [
    { id: 'overview', label: '📋 Overview' },
    { id: 'evidence', label: `🔍 Evidence (${discoveredClues.length}/${caseData.clues.length})` },
    { id: 'suspects', label: `👥 Suspects (${caseData.suspects.length})` },
    { id: 'interrogation', label: '💬 Interrogation' },
    { id: 'solve', label: '⚖️ Solve Case' }
  ];

  return (
    <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* HEADER */}
      <div className="investigation-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <Link to="/cases" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>← Cases</Link>
            <span style={{ color: 'var(--border-subtle)' }}>|</span>
            <span className="location-tag">📍 {caseData.location}</span>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {caseData.title}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 600 }}>{caseData.incident} — {caseData.date}</p>
            </div>
            <div className="col-lg-4 mt-3 mt-lg-0">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <span>Investigation Progress</span>
                <span style={{ color: 'var(--text-gold)' }}>{progress}%</span>
              </div>
              <div className="sc-progress">
                <div className="sc-progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }} onClick={handleHint}>
                  💡 Get Hint (−50 pts)
                </button>
                <span className={`difficulty-badge diff-${caseData.difficulty.toLowerCase()}`}>{caseData.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HINT CONFIRM */}
      {showHintConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}>
          <div className="sc-card" style={{ maxWidth: 420, width: '90%', border: '1px solid rgba(255,214,10,0.2)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '1rem' }}>💡 Use a Hint?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>This will cost <strong style={{ color: 'var(--accent-red)' }}>50 points</strong>.</p>
            {currentHint && <div className="contradiction-alert" style={{ borderColor: 'rgba(255,214,10,0.3)', color: 'var(--text-gold)', background: 'rgba(255,214,10,0.08)', marginBottom: '1rem' }}>{currentHint}</div>}
            <div className="d-flex gap-2">
              <button className="btn-detective" onClick={confirmHint}>Confirm</button>
              <button className="btn-ghost" onClick={() => setShowHintConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* TABS */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 58, zIndex: 100 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
            {TABS.map(t => (
              <button
                key={t.id}
                style={{
                  padding: '1rem 1.25rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: tab === t.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                  color: tab === t.id ? 'var(--text-gold)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition)'
                }}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="container mt-4">

        {/* ========== OVERVIEW ========== */}
        {tab === 'overview' && (
          <div className="fade-in">
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="sc-card mb-4">
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '1.25rem' }}>📖 Case Background</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{caseData.fullStory}</p>
                </div>
                <div className="sc-card">
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>🎯 Investigation Objectives</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {caseData.objectives.map((o, i) => (
                      <div key={i} className="objective-item">
                        <div className="check" style={{ borderColor: progress >= (i + 1) * 25 ? 'var(--accent-gold)' : 'var(--border-subtle)', background: progress >= (i + 1) * 25 ? 'rgba(255,214,10,0.1)' : 'transparent' }}>
                          {progress >= (i + 1) * 25 ? '✓' : ''}
                        </div>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sc-card mb-4" style={{ border: '1px solid var(--border-red-glow)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-red)', marginBottom: '1rem', fontSize: '0.95rem' }}>📂 Case Details</h4>
                  {[
                    ['Location', caseData.location],
                    ['Date', caseData.date],
                    ['Category', caseData.category],
                    ['Suspects', `${caseData.suspects.length} persons of interest`],
                    ['Clues', `${caseData.clueCount} total evidence items`],
                    ['Reward', `${caseData.reward} points`]
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{k}</span>
                      <span style={{ color: 'var(--text-primary)' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* EXPLORE LOCATIONS */}
                <div className="sc-card">
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.95rem' }}>🗺️ Explore Locations</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>Search each location for hidden clues. Click to explore.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {locations.map(loc => {
                      const locationClues = caseData.clues.filter(cl => cl.location === loc);
                      const foundHere = locationClues.filter(cl => cl.discovered).length;
                      const hasUndiscovered = locationClues.some(cl => !cl.discovered);
                      return (
                        <button
                          key={loc}
                          className="explore-location"
                          onClick={() => {
                            if (hasUndiscovered) {
                              const nextClue = locationClues.find(cl => !cl.discovered);
                              if (nextClue) {
                                discoverClue(parseInt(caseId), nextClue.id);
                                setSelectedClue(nextClue);
                                setTab('evidence');
                              }
                            }
                          }}
                        >
                          <div className="explore-location-icon">
                            {foundHere === locationClues.length ? '✅' : '🔎'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600 }}>{loc}</div>
                            <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                              {foundHere}/{locationClues.length} clues found
                            </div>
                          </div>
                          <div style={{ color: hasUndiscovered ? 'var(--accent-cyan)' : 'var(--text-muted)', fontSize: '0.8rem' }}>
                            {hasUndiscovered ? '→' : '✓'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* NOTEBOOK */}
            <div className="sc-card mt-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0 }}>📓 Investigation Notebook</h3>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Auto-saved</span>
              </div>
              <textarea
                className="notebook-textarea"
                placeholder="Write your investigation notes here... Record observations, theories, and connections between suspects and evidence."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={8}
              />
            </div>
          </div>
        )}

        {/* ========== EVIDENCE ========== */}
        {tab === 'evidence' && (
          <div className="fade-in">
            <div className="row g-4">
              <div className="col-lg-7">
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Evidence Board</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {discoveredClues.length} of {caseData.clues.length} clues discovered. 
                    {discoveredClues.length < caseData.clues.length ? ' Go back to Overview to explore more locations.' : ' All evidence collected!'}
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                  {caseData.clues.map(clue => (
                    <div
                      key={clue.id}
                      className={`clue-card ${clue.discovered ? 'discovered' : 'undiscovered'} ${clue.importance === 'high' ? 'high-importance' : ''}`}
                      onClick={() => clue.discovered && setSelectedClue(clue)}
                    >
                      <div className="clue-icon">{clue.icon}</div>
                      <div className="clue-title">{clue.discovered ? clue.title : '???'}</div>
                      <div className="clue-location">{clue.discovered ? clue.location : 'Undiscovered'}</div>
                      {clue.importance === 'high' && clue.discovered && (
                        <div style={{ marginTop: '0.4rem', fontSize: '0.65rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          ★ Key Evidence
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-5">
                {selectedClue ? (
                  <div className="sc-card fade-in" style={{ border: '1px solid rgba(255,214,10,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Evidence Item</div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', margin: '0.25rem 0' }}>{selectedClue.icon} {selectedClue.title}</h3>
                      </div>
                      <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => setSelectedClue(null)}>✕</button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span style={{ background: 'var(--accent-red-dim)', border: '1px solid var(--border-red-glow)', borderRadius: '4px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}>
                        📍 {selectedClue.location}
                      </span>
                      <span style={{ background: selectedClue.importance === 'high' ? 'rgba(255,214,10,0.1)' : 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '0.15rem 0.5rem', fontSize: '0.72rem', color: selectedClue.importance === 'high' ? 'var(--text-gold)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {selectedClue.importance === 'high' ? '★ Key Evidence' : 'Evidence'}
                      </span>
                    </div>
                    <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Description</div>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{selectedClue.description}</p>
                    </div>
                    <div style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.2)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🔬 Analysis</div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{selectedClue.analysis}</p>
                    </div>
                    {selectedClue.relatedSuspects?.length > 0 && (
                      <div style={{ marginTop: '1rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Related Suspects</div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {selectedClue.relatedSuspects.map(sid => {
                            const s = caseData.suspects.find(x => x.id === sid);
                            return s ? (
                              <span key={sid} style={{ background: 'var(--accent-red-dim)', border: '1px solid var(--border-red-glow)', borderRadius: '20px', padding: '0.2rem 0.6rem', fontSize: '0.78rem', color: 'var(--accent-red)' }}>
                                {s.avatar} {s.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="sc-card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}>Select Evidence</div>
                    <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Click on a discovered clue to view details and analysis.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========== SUSPECTS ========== */}
        {tab === 'suspects' && (
          <div className="fade-in">
            <div className="row g-4">
              {caseData.suspects.map(s => (
                <div key={s.id} className="col-md-4">
                  <div
                    className={`suspect-card ${selectedSuspect?.id === s.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSuspect(prev => prev?.id === s.id ? null : s)}
                  >
                    <span className="suspect-avatar">{s.avatar}</span>
                    <div className="suspect-name">{s.name}</div>
                    <div className="suspect-role">{s.occupation}</div>
                    <hr className="divider" />
                    <div style={{ textAlign: 'left', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', display: 'block' }}>RELATIONSHIP</span>
                        {s.relationship}
                      </div>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', display: 'block' }}>ALIBI</span>
                        {s.alibi}
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', display: 'block' }}>MOTIVE</span>
                        <span style={{ color: 'var(--accent-red)', fontSize: '0.82rem' }}>{s.motive}</span>
                      </div>
                    </div>
                    {selectedSuspect?.id === s.id && (
                      <button className="btn-detective mt-3" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }} onClick={e => { e.stopPropagation(); setTab('interrogation'); }}>
                        💬 Interrogate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== INTERROGATION ========== */}
        {tab === 'interrogation' && (
          <div className="fade-in interrogation-room">
            <div className="row g-0">
              {/* SUSPECT SELECTOR */}
              <div className="col-md-3" style={{ borderRight: '1px solid var(--border-subtle)', padding: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Select Suspect</div>
                {caseData.suspects.map(s => (
                  <div
                    key={s.id}
                    className={`suspect-card mb-2 ${selectedSuspect?.id === s.id ? 'selected' : ''}`}
                    style={{ padding: '0.75rem', cursor: 'pointer' }}
                    onClick={() => { setSelectedSuspect(s); setLastAnswer(null); setContradiction(null); }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{s.avatar}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s.name}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.occupation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* INTERROGATION AREA */}
              <div className="col-md-9">
                {!selectedSuspect ? (
                  <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                    <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)' }}>Select a suspect to interrogate</div>
                  </div>
                ) : (
                  <div>
                    {/* SUSPECT SPOTLIGHT */}
                    <div className="suspect-spotlight">
                      <span style={{ fontSize: '4rem' }}>{selectedSuspect.avatar}</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '0.5rem' }}>{selectedSuspect.name}</h3>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedSuspect.occupation}</div>
                      {lastAnswer && (
                        <div className="dialogue-bubble">
                          {selectedSuspect.statements[lastAnswer.question]}
                        </div>
                      )}
                      {contradiction && (
                        <div className="contradiction-alert mt-3">
                          <strong>⚠️ CONTRADICTION IDENTIFIED:</strong> {contradiction}
                          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'rgba(230,57,70,0.8)' }}>+100 pts earned for spotting inconsistency!</div>
                        </div>
                      )}
                    </div>

                    {/* QUESTIONS */}
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                        Investigation Questions
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {QUESTIONS.map(q => {
                          const key = `${selectedSuspect.id}_${q.id}`;
                          const asked = askedQuestions[key];
                          const isEvidenceQ = q.id === 'evidenceChallenge';
                          return (
                            <button
                              key={q.id}
                              className={`question-btn ${asked ? 'asked' : ''} ${isEvidenceQ ? 'evidence-btn' : ''}`}
                              onClick={() => !asked && handleAsk(q.id)}
                              disabled={asked}
                            >
                              <span style={{ fontSize: '1rem' }}>{asked ? '✓' : isEvidenceQ ? '🔴' : '→'}</span>
                              <span>{q.text}</span>
                              {asked && <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Asked</span>}
                            </button>
                          );
                        })}
                      </div>
                      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        💡 Tip: Present evidence after asking about their alibi. If you've found the right clue, you may catch them in a contradiction!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========== SOLVE CASE ========== */}
        {tab === 'solve' && (
          <div className="fade-in">
            <div className="sc-card mb-4" style={{ border: '1px solid var(--border-red-glow)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>⚖️</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)' }}>Submit Your Accusation</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Identify the culprit, their motive, and the key evidence. Choose carefully — wrong accusations cost 100 points.</p>
            </div>

            <div className="row g-4">
              {/* CULPRIT */}
              <div className="col-lg-4">
                <div className="sc-card h-100">
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>1. Identify the Culprit</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {caseData.suspects.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setAccusation(prev => ({ ...prev, culprit: s.id }))}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.85rem 1rem',
                          background: accusation.culprit === s.id ? 'var(--accent-red-dim)' : 'var(--bg-input)',
                          border: `1px solid ${accusation.culprit === s.id ? 'var(--accent-red)' : 'var(--border-subtle)'}`,
                          borderRadius: 'var(--radius-md)', cursor: 'pointer',
                          color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                          textAlign: 'left', transition: 'var(--transition)'
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{s.avatar}</span>
                        <div>
                          <div style={{ fontWeight: 700 }}>{s.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.occupation}</div>
                        </div>
                        {accusation.culprit === s.id && <span style={{ marginLeft: 'auto', color: 'var(--accent-red)' }}>●</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* MOTIVE */}
              <div className="col-lg-4">
                <div className="sc-card h-100">
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>2. Choose the Motive</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {caseData.suspects.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setAccusation(prev => ({ ...prev, motive: s.motive }))}
                        style={{
                          padding: '0.85rem 1rem', textAlign: 'left',
                          background: accusation.motive === s.motive ? 'rgba(255,214,10,0.08)' : 'var(--bg-input)',
                          border: `1px solid ${accusation.motive === s.motive ? 'rgba(255,214,10,0.3)' : 'var(--border-subtle)'}`,
                          borderRadius: 'var(--radius-md)', cursor: 'pointer',
                          color: accusation.motive === s.motive ? 'var(--text-gold)' : 'var(--text-secondary)',
                          fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                          transition: 'var(--transition)'
                        }}
                      >
                        {s.motive}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* KEY EVIDENCE */}
              <div className="col-lg-4">
                <div className="sc-card h-100">
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1rem' }}>3. Select Key Evidence</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Select the most important clues supporting your case.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {discoveredClues.map(cl => (
                      <button
                        key={cl.id}
                        onClick={() => toggleAccusationEvidence(cl.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          padding: '0.65rem 0.85rem', textAlign: 'left',
                          background: accusation.evidence.includes(cl.id) ? 'rgba(67,97,238,0.1)' : 'var(--bg-input)',
                          border: `1px solid ${accusation.evidence.includes(cl.id) ? 'rgba(67,97,238,0.4)' : 'var(--border-subtle)'}`,
                          borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                          color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                          transition: 'var(--transition)'
                        }}
                      >
                        <span>{cl.icon}</span>
                        <span>{cl.title}</span>
                        {accusation.evidence.includes(cl.id) && <span style={{ marginLeft: 'auto', color: 'var(--accent-blue)' }}>✓</span>}
                      </button>
                    ))}
                    {discoveredClues.length === 0 && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                        No evidence found yet. Explore the crime scene!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              {(!accusation.culprit || !accusation.motive) && (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Please select a culprit and motive to proceed.
                </div>
              )}
              <button
                className="btn-detective"
                onClick={handleAccuse}
                disabled={!accusation.culprit || !accusation.motive}
                style={{ fontSize: '1.05rem', padding: '1rem 3rem', opacity: (!accusation.culprit || !accusation.motive) ? 0.5 : 1, cursor: (!accusation.culprit || !accusation.motive) ? 'not-allowed' : 'pointer' }}
              >
                ⚖️ Submit Accusation
              </button>
              <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                ⚠️ Wrong accusation costs 100 points. Make sure you have enough evidence!
              </div>
            </div>
          </div>
        )}

        {/* ========== RESULT ========== */}
        {tab === 'solved-result' && solved && (
          <div className="fade-in">
            <div className="sc-card text-center" style={{ padding: '3rem', border: `1px solid ${solved.isCorrect ? 'rgba(40,167,69,0.4)' : 'var(--border-red-glow)'}` }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{solved.isCorrect ? '🎉' : '❌'}</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: solved.isCorrect ? '#28a745' : 'var(--accent-red)', marginBottom: '1rem' }}>
                {solved.isCorrect ? 'Case Solved!' : 'Wrong Accusation'}
              </h2>
              <div style={{ fontSize: '2rem', color: 'var(--text-gold)', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
                {solved.result > 0 ? '+' : ''}{solved.result} points
              </div>

              <div className="sc-card text-start mt-3" style={{ background: 'var(--bg-secondary)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '1rem' }}>📋 The Truth Revealed</h4>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '1rem' }}>{solved.solution.explanation}</p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Culprit</span>
                    <div style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-heading)' }}>
                      {caseData.suspects.find(s => s.id === solved.solution.culprit)?.name}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Motive</span>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{solved.solution.motive}</div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3 justify-content-center mt-3 flex-wrap">
                <button className="btn-ghost" onClick={() => { setSolved(null); setTab('overview'); setAccusation({ culprit: null, motive: null, evidence: [] }); }}>↺ Replay</button>
                <Link to="/cases" className="btn-gold">Browse More Cases →</Link>
                <Link to="/dashboard" className="btn-ghost">📊 Dashboard</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
