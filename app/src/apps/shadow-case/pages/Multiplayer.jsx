import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { MULTIPLAYER_CHALLENGES, SAMPLE_PLAYERS } from '../data/players';

const MODES = [
  {
    id: 'speed_interrogation',
    title: 'Speed Interrogation Duel',
    icon: '⚡',
    desc: 'Face off against a rival detective in a 10-question rapid deduction clash.',
    duration: 120,
    difficulty: 'Competitive'
  },
  {
    id: 'evidence_blitz',
    title: 'Forensic Evidence Blitz',
    icon: '🔬',
    desc: 'Race the clock to separate genuine forensic evidence from planted red herrings.',
    duration: 90,
    difficulty: 'High Speed'
  },
  {
    id: 'suspect_showdown',
    title: 'Suspect Showdown',
    icon: '🎭',
    desc: 'Expose who is lying in simultaneous cross-examination duels.',
    duration: 100,
    difficulty: 'Tactical'
  }
];

export default function Multiplayer() {
  const { player, addPoints, getCurrentRank } = useGame();
  const [searchParams] = useSearchParams();
  const challengeTarget = searchParams.get('challenge');

  // Game state
  const [gameState, setGameState] = useState('lobby'); // 'lobby' | 'matching' | 'playing' | 'results'
  const [selectedMode, setSelectedMode] = useState(MODES[0]);
  const [opponent, setOpponent] = useState(() => {
    if (challengeTarget) {
      const found = SAMPLE_PLAYERS.find(p => p.name.toLowerCase() === challengeTarget.toLowerCase());
      if (found) return found;
    }
    return SAMPLE_PLAYERS[0];
  });

  // Duel live match state
  const questions = MULTIPLAYER_CHALLENGES[0].questions;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [streak, setStreak] = useState(0);
  const [duelLog, setDuelLog] = useState([]);
  const [opponentAnswering, setOpponentAnswering] = useState(false);

  const timerRef = useRef(null);
  const opponentTimerRef = useRef(null);
  const finishDuelRef = useRef(null);

  // Matchmaking simulation
  const startMatchmaking = (targetOpponent = opponent) => {
    setOpponent(targetOpponent);
    setGameState('matching');
    setTimeout(() => {
      startDuel();
    }, 1800);
  };

  // Start the live duel
  const startDuel = () => {
    setCurrentQIndex(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setTimeLeft(selectedMode.duration);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setStreak(0);
    setDuelLog([`Duel initiated against ${opponent.name}! First to solve takes the glory.`]);
    setGameState('playing');
  };

  // Match countdown timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishDuelRef.current?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Opponent AI behavior per question
  useEffect(() => {
    if (gameState === 'playing' && currentQIndex < questions.length && !isAnswerChecked) {
      setOpponentAnswering(true);
      // Realistic delay between 3.5s and 6.5s for opponent
      const randomDelay = Math.floor(Math.random() * 3000) + 3500;

      opponentTimerRef.current = setTimeout(() => {
        // Opponent accuracy based on their profile accuracy (e.g. 85-94%)
        const oppAccuracy = opponent.accuracy || 85;
        const oppIsCorrect = Math.random() * 100 <= oppAccuracy;
        const points = oppIsCorrect ? 100 : 0;

        if (oppIsCorrect) {
          setOpponentScore(prev => prev + points);
          setDuelLog(prev => [`${opponent.name} answered correctly (+100 pts)`, ...prev.slice(0, 5)]);
        } else {
          setDuelLog(prev => [`${opponent.name} gave an incorrect answer`, ...prev.slice(0, 5)]);
        }
        setOpponentAnswering(false);
      }, randomDelay);
    }

    return () => clearTimeout(opponentTimerRef.current);
  }, [gameState, currentQIndex, isAnswerChecked, opponent, questions.length]);

  // Handle player answer submission
  const handleSelectAnswer = (option) => {
    if (isAnswerChecked || gameState !== 'playing') return;

    setSelectedAnswer(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentQIndex];
    const isCorrect = option === currentQ.a;

    if (isCorrect) {
      const bonus = streak > 0 ? streak * 25 : 0;
      const totalEarned = 100 + bonus;
      setPlayerScore(prev => prev + totalEarned);
      setStreak(prev => prev + 1);
      setDuelLog(prev => [
        `You answered correctly! (+${totalEarned} pts${bonus > 0 ? ` streak bonus` : ''})`,
        ...prev.slice(0, 5)
      ]);
    } else {
      setStreak(0);
      setDuelLog(prev => [`Incorrect! The correct answer was: "${currentQ.a}"`, ...prev.slice(0, 5)]);
    }

    // Move to next question after short delay
    setTimeout(() => {
      if (currentQIndex + 1 < questions.length) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        finishDuel();
      }
    }, 1400);
  };

  // Finish match & reward points
  const finishDuel = () => {
    clearInterval(timerRef.current);
    clearTimeout(opponentTimerRef.current);
    setGameState('results');

    // Grant points if player won or participated
    const won = playerScore >= opponentScore;
    const reward = won ? 350 : 100;
    addPoints(reward, won ? `Defeated ${opponent.name} in Detective Duel!` : 'Duel participation XP');
  };
  finishDuelRef.current = finishDuel;

  // User rank
  const playerRank = getCurrentRank(player.totalPoints);

  return (
    <div className="page-enter" style={{ padding: '2.5rem 0 4rem' }}>
      <div className="container">
        {/* LOBBY VIEW */}
        {gameState === 'lobby' && (
          <>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="floating-badge mb-3">
                <span>⚔️</span> REAL-TIME MULTIPLAYER DUEL ARENA
              </div>
              <h1 className="section-title mb-2">Detective Duels</h1>
              <p className="section-subtitle mx-auto" style={{ maxWidth: '650px' }}>
                Test your criminal deduction speed head-to-head against rival guild sleuths. 
                Answer forensic questions, identify contradictions, and climb the competitive ladder.
              </p>
            </div>

            {/* QUICK MATCH ACTION BANNER */}
            <div
              className="sc-card mb-5"
              style={{
                background: 'linear-gradient(135deg, rgba(67,97,238,0.12) 0%, rgba(22,22,31,0.95) 100%)',
                border: '1px solid rgba(67,97,238,0.3)'
              }}
            >
              <div className="row align-items-center g-4">
                <div className="col-lg-8">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <span style={{ fontSize: '2rem' }}>⚡</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0 }}>
                        {selectedMode.title}
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                        {selectedMode.difficulty} • {selectedMode.duration} Seconds • 10 Rounds
                      </span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                    {selectedMode.desc}
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <button
                    className="btn-detective"
                    style={{ fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}
                    onClick={() => startMatchmaking()}
                  >
                    ⚔️ Find Match Now
                  </button>
                </div>
              </div>
            </div>

            {/* MODES SELECTION */}
            <div className="mb-5">
              <h3 className="section-title mb-3" style={{ fontSize: '1.4rem' }}>
                Select Arena Mode
              </h3>
              <div className="row g-4">
                {MODES.map((mode) => (
                  <div key={mode.id} className="col-md-4">
                    <div
                      className={`challenge-card h-100 ${selectedMode.id === mode.id ? 'selected' : ''}`}
                      onClick={() => setSelectedMode(mode)}
                      style={{
                        border: selectedMode.id === mode.id
                          ? '2px solid var(--accent-gold)'
                          : '1px solid var(--border-subtle)',
                        background: selectedMode.id === mode.id
                          ? 'linear-gradient(180deg, rgba(255,214,10,0.08) 0%, var(--bg-card) 100%)'
                          : 'var(--bg-card)'
                      }}
                    >
                      <span className="challenge-icon">{mode.icon}</span>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{mode.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                        {mode.desc}
                      </p>
                      <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                        <span>⏱️ {mode.duration}s</span>
                        <span style={{ color: 'var(--accent-cyan)' }}>{mode.difficulty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVE RIVALS TO CHALLENGE */}
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="section-title" style={{ fontSize: '1.4rem' }}>
                  Available Opponents in Lobby
                </h3>
                <Link to="/leaderboard" className="btn-ghost" style={{ fontSize: '0.8rem' }}>
                  View Full Guild Rankings →
                </Link>
              </div>

              <div className="row g-3">
                {SAMPLE_PLAYERS.slice(0, 6).map((rival) => (
                  <div key={rival.id} className="col-md-6 col-lg-4">
                    <div className="sc-card h-100 d-flex flex-column justify-content-between">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div style={{ fontSize: '2.5rem' }}>{rival.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
                            {rival.name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {rival.level} • {rival.accuracy}% Acc
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-gold)' }}>
                          {rival.points.toLocaleString()} pts
                        </span>
                        <button
                          className="btn-outline-detective"
                          style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                          onClick={() => startMatchmaking(rival)}
                        >
                          ⚔️ Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* MATCHMAKING ANIMATION */}
        {gameState === 'matching' && (
          <div className="text-center py-5">
            <div className="loading-spinner mx-auto mb-4" style={{ width: '64px', height: '64px' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
              CALIBRATING SECURE FREQUENCY...
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Connecting to <strong style={{ color: 'var(--text-primary)' }}>{opponent.name}</strong> ({opponent.level})
            </p>
            <div className="sc-card mx-auto mt-4" style={{ maxWidth: '400px', background: 'var(--bg-card)' }}>
              <div className="d-flex justify-content-around align-items-center">
                <div>
                  <div style={{ fontSize: '3rem' }}>{player.avatar}</div>
                  <div style={{ fontWeight: 'bold' }}>{player.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{playerRank.name}</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--accent-red)', fontWeight: 'bold' }}>VS</div>
                <div>
                  <div style={{ fontSize: '3rem' }}>{opponent.avatar}</div>
                  <div style={{ fontWeight: 'bold' }}>{opponent.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{opponent.level}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PLAYING STATE */}
        {gameState === 'playing' && (
          <div>
            {/* SCOREBOARD BAR */}
            <div
              className="sc-card mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(230,57,70,0.1) 0%, rgba(22,22,31,0.95) 50%, rgba(67,97,238,0.1) 100%)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div className="row align-items-center text-center">
                {/* Player side */}
                <div className="col-4">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <span style={{ fontSize: '2rem' }}>{player.avatar}</span>
                    <div className="text-start d-none d-sm-block">
                      <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{player.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>YOU</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-gold)' }}>
                    {playerScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>pts</span>
                  </div>
                  {streak > 1 && (
                    <span style={{ color: '#ff9f1c', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      🔥 {streak}x STREAK (+{streak * 25} bonus)
                    </span>
                  )}
                </div>

                {/* Central Timer */}
                <div className="col-4">
                  <div className={`timer-display ${timeLeft <= 20 ? 'urgent' : ''}`} style={{ fontSize: '2.5rem' }}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ROUND {currentQIndex + 1} / {questions.length}
                  </div>
                </div>

                {/* Opponent side */}
                <div className="col-4">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <div className="text-end d-none d-sm-block">
                      <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{opponent.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RIVAL</div>
                    </div>
                    <span style={{ fontSize: '2rem' }}>{opponent.avatar}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--accent-cyan)' }}>
                    {opponentScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>pts</span>
                  </div>
                  {opponentAnswering && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      ✍️ Answering...
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* QUESTION CARD */}
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="sc-card p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="location-tag">
                      <span>❓</span> DEDUCTION QUESTION #{currentQIndex + 1}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-gold)' }}>
                      +100 Points
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                    {questions[currentQIndex].q}
                  </h3>

                  {/* Options */}
                  <div className="row g-3">
                    {questions[currentQIndex].options.map((option, idx) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectAnswer = option === questions[currentQIndex].a;

                      let btnStyle = {
                        padding: '1.1rem',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-input)'
                      };

                      if (isAnswerChecked) {
                        if (isCorrectAnswer) {
                          btnStyle.border = '2px solid #28a745';
                          btnStyle.background = 'rgba(40, 167, 69, 0.2)';
                        } else if (isSelected && !isCorrectAnswer) {
                          btnStyle.border = '2px solid var(--accent-red)';
                          btnStyle.background = 'rgba(230, 57, 70, 0.2)';
                        }
                      }

                      return (
                        <div key={idx} className="col-12 col-md-6">
                          <button
                            className="question-btn w-100"
                            style={btnStyle}
                            disabled={isAnswerChecked}
                            onClick={() => handleSelectAnswer(option)}
                          >
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-gold)', marginRight: '0.5rem' }}>
                              [{String.fromCharCode(65 + idx)}]
                            </span>
                            <span>{option}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* DUEL TELEMETRY FEED */}
              <div className="col-lg-4">
                <div className="sc-card h-100">
                  <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '1rem' }}>
                    📡 Live Duel Feed
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {duelLog.map((log, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'var(--bg-input)',
                          padding: '0.6rem 0.8rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          color: index === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                          borderLeft: index === 0 ? '3px solid var(--accent-gold)' : '3px solid transparent'
                        }}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {gameState === 'results' && (
          <div className="text-center py-4">
            <div
              className="sc-card mx-auto p-5"
              style={{
                maxWidth: '600px',
                border: playerScore >= opponentScore
                  ? '2px solid var(--accent-gold)'
                  : '2px solid var(--border-subtle)',
                background: playerScore >= opponentScore
                  ? 'linear-gradient(180deg, rgba(255,214,10,0.12) 0%, var(--bg-card) 100%)'
                  : 'var(--bg-card)'
              }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {playerScore > opponentScore ? '🏆' : playerScore === opponentScore ? '🤝' : '💀'}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: playerScore > opponentScore ? 'var(--accent-gold)' : 'var(--text-primary)',
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}
              >
                {playerScore > opponentScore ? 'VICTORY!' : playerScore === opponentScore ? 'STALEMATE!' : 'DEFEATED'}
              </h2>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                {playerScore > opponentScore
                  ? `You outsmarted ${opponent.name} with brilliant deduction speed!`
                  : `A tough interrogation clash. Review case fundamentals and challenge again.`}
              </p>

              {/* Final Scores comparison */}
              <div className="d-flex justify-content-around align-items-center mb-4 p-3" style={{ background: 'var(--bg-input)', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '2rem' }}>{player.avatar}</div>
                  <div style={{ fontWeight: 'bold' }}>{player.name}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-gold)' }}>
                    {playerScore} pts
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-muted)' }}>
                  VS
                </div>
                <div>
                  <div style={{ fontSize: '2rem' }}>{opponent.avatar}</div>
                  <div style={{ fontWeight: 'bold' }}>{opponent.name}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--accent-cyan)' }}>
                    {opponentScore} pts
                  </div>
                </div>
              </div>

              {/* Reward granted notification */}
              <div className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#28a745' }}>
                + {playerScore >= opponentScore ? 350 : 100} XP & Detective Guild Points Added!
              </div>

              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <button className="btn-gold" onClick={() => startDuel()}>
                  🔄 Rematch
                </button>
                <button className="btn-outline-detective" onClick={() => setGameState('lobby')}>
                  🚪 Lobby
                </button>
                <Link to="/leaderboard" className="btn-ghost">
                  🏆 View Leaderboards
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
