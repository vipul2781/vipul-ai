// =====================================================
// SHADOW CASE: Detective Academy - Game State Context
// =====================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CASES } from '../data/cases';
import { ACHIEVEMENTS_LIST, RANKS } from '../data/players';

const GameContext = createContext(null);

const DEFAULT_PLAYER = {
  name: "Detective",
  avatar: "🕵️",
  totalPoints: 0,
  xp: 0,
  casesSolved: 0,
  totalHintsUsed: 0,
  contradictionsFound: 0,
  perfectClues: 0,
  noHintCases: 0,
  timedCasesCompleted: 0,
  perfectSolves: 0,
  gameHistory: [],
  unlockedAchievements: [],
  preferences: { sound: true, animations: true, theme: "dark" }
};

export function GameProvider({ children }) {
  const [player, setPlayer] = useState(() => {
    try {
      const saved = localStorage.getItem('shadowcase_player');
      return saved ? JSON.parse(saved) : DEFAULT_PLAYER;
    } catch { return DEFAULT_PLAYER; }
  });

  const [cases, setCases] = useState(() => {
    try {
      const saved = localStorage.getItem('shadowcase_cases');
      if (saved) return JSON.parse(saved);
    } catch {}
    return CASES.map(c => ({ ...c, clues: c.clues.map(cl => ({ ...cl, discovered: false })) }));
  });

  const [notifications, setNotifications] = useState([]);
  const [hasProfile, setHasProfile] = useState(() => !!localStorage.getItem('shadowcase_player'));

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('shadowcase_player', JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem('shadowcase_cases', JSON.stringify(cases));
  }, [cases]);

  // Get current rank
  const getCurrentRank = (points) => {
    const sorted = [...RANKS].sort((a, b) => b.minPoints - a.minPoints);
    return sorted.find(r => points >= r.minPoints) || RANKS[0];
  };

  // Get XP progress to next rank
  const getRankProgress = (points) => {
    const sorted = [...RANKS].sort((a, b) => a.minPoints - b.minPoints);
    const currentIdx = sorted.findIndex(r => r.minPoints > points) - 1;
    const current = sorted[Math.max(0, currentIdx)];
    const next = sorted[currentIdx + 1];
    if (!next) return 100;
    return ((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100;
  };

  // Add points with animation notification
  const addPoints = (amount, reason) => {
    const id = Date.now();
    setPlayer(p => ({ ...p, totalPoints: p.totalPoints + amount, xp: p.xp + amount }));
    setNotifications(n => [...n, { id, amount, reason, type: amount > 0 ? 'gain' : 'loss' }]);
    setTimeout(() => setNotifications(n => n.filter(x => x.id !== id)), 3000);
    checkAchievements();
  };

  // Discover a clue
  const discoverClue = (caseId, clueId) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const alreadyFound = c.clues.find(cl => cl.id === clueId)?.discovered;
      if (alreadyFound) return c;
      return { ...c, clues: c.clues.map(cl => cl.id === clueId ? { ...cl, discovered: true } : cl) };
    }));
    addPoints(50, "Discovered a clue!");
  };

  // Record contradiction found
  const recordContradiction = () => {
    setPlayer(p => ({ ...p, contradictionsFound: p.contradictionsFound + 1 }));
    addPoints(100, "Contradiction identified!");
  };

  // Use a hint
  const applyHint = () => {
    setPlayer(p => ({ ...p, totalHintsUsed: p.totalHintsUsed + 1 }));
    addPoints(-50, "Hint used");
  };

  // Solve a case
  const solveCase = (caseId, isCorrect, isFirstTry, hintsUsed, allCluesFound) => {
    const targetCase = cases.find(c => c.id === caseId);
    if (!targetCase) return;

    let pointsEarned = 0;
    if (isCorrect) {
      pointsEarned += 500;
      if (hintsUsed === 0) { pointsEarned += 150; setPlayer(p => ({ ...p, noHintCases: p.noHintCases + 1 })); }
      if (isFirstTry) setPlayer(p => ({ ...p, perfectSolves: p.perfectSolves + 1 }));
      if (allCluesFound) setPlayer(p => ({ ...p, perfectClues: p.perfectClues + 1 }));

      setPlayer(p => ({ ...p, casesSolved: p.casesSolved + 1,
        gameHistory: [{ caseId, caseTitle: targetCase.title, date: new Date().toLocaleDateString(), result: 'Solved', points: pointsEarned }, ...p.gameHistory].slice(0, 20)
      }));

      // Unlock next case
      setCases(prev => prev.map(c => {
        if (c.id === caseId) return { ...c, status: 'solved' };
        if (c.id === caseId + 1 && c.status === 'locked') return { ...c, status: 'available' };
        return c;
      }));
    } else {
      pointsEarned = -100;
    }
    addPoints(pointsEarned, isCorrect ? "Case solved!" : "Wrong accusation");
    checkAchievements();
    return pointsEarned;
  };

  // Check and unlock achievements
  const checkAchievements = () => {
    setPlayer(p => {
      const newUnlocked = ACHIEVEMENTS_LIST
        .filter(a => !p.unlockedAchievements.includes(a.id) && a.condition({
          casesSolved: p.casesSolved, totalPoints: p.totalPoints,
          contradictionsFound: p.contradictionsFound, perfectClues: p.perfectClues,
          noHintCases: p.noHintCases, timedCasesCompleted: p.timedCasesCompleted,
          perfectSolves: p.perfectSolves
        }))
        .map(a => a.id);

      if (newUnlocked.length > 0) {
        return { ...p, unlockedAchievements: [...p.unlockedAchievements, ...newUnlocked] };
      }
      return p;
    });
  };

  // Initialize player name
  const initPlayer = (name, avatar) => {
    setPlayer({ ...DEFAULT_PLAYER, name, avatar });
    setHasProfile(true);
    localStorage.setItem('shadowcase_player', JSON.stringify({ ...DEFAULT_PLAYER, name, avatar }));
  };

  const updatePreferences = (prefs) => {
    setPlayer(p => ({ ...p, preferences: { ...p.preferences, ...prefs } }));
  };

  const getCase = (id) => cases.find(c => c.id === parseInt(id) || c.slug === id);

  const getCaseProgress = (caseId) => {
    const c = cases.find(x => x.id === caseId);
    if (!c) return 0;
    const discovered = c.clues.filter(cl => cl.discovered).length;
    return Math.round((discovered / c.clues.length) * 100);
  };

  return (
    <GameContext.Provider value={{
      player, cases, notifications, hasProfile,
      getCurrentRank, getRankProgress, addPoints,
      discoverClue, recordContradiction, applyHint, useHint: applyHint,
      solveCase, initPlayer, updatePreferences,
      getCase, getCaseProgress, checkAchievements
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
