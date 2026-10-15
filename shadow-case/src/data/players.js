// =====================================================
// SHADOW CASE: Detective Academy - Players Data
// =====================================================

export const SAMPLE_PLAYERS = [
  { id: 1, name: "ShadowHunter", avatar: "🕵️", points: 12450, casesSolved: 24, accuracy: 94, winStreak: 7, level: "Master Detective", rank: 1 },
  { id: 2, name: "NightOwl", avatar: "🦉", points: 11200, casesSolved: 21, accuracy: 91, winStreak: 5, level: "Master Detective", rank: 2 },
  { id: 3, name: "CrimsonBlade", avatar: "🗡️", points: 9800, casesSolved: 19, accuracy: 88, winStreak: 3, level: "Senior Detective", rank: 3 },
  { id: 4, name: "GreyPhoenix", avatar: "🦅", points: 8750, casesSolved: 17, accuracy: 85, winStreak: 4, level: "Senior Detective", rank: 4 },
  { id: 5, name: "IronMask", avatar: "🎭", points: 7600, casesSolved: 15, accuracy: 82, winStreak: 2, level: "Senior Detective", rank: 5 },
  { id: 6, name: "VeilWatcher", avatar: "👁️", points: 6500, casesSolved: 13, accuracy: 79, winStreak: 1, level: "Investigator", rank: 6 },
  { id: 7, name: "BlackRook", avatar: "♟️", points: 5400, casesSolved: 11, accuracy: 76, winStreak: 0, level: "Investigator", rank: 7 },
  { id: 8, name: "GhostTrace", avatar: "👻", points: 4300, casesSolved: 9, accuracy: 73, winStreak: 0, level: "Investigator", rank: 8 },
  { id: 9, name: "StormCipher", avatar: "⚡", points: 3200, casesSolved: 7, accuracy: 70, winStreak: 0, level: "Rookie", rank: 9 },
  { id: 10, name: "DuskRaven", avatar: "🪶", points: 2100, casesSolved: 5, accuracy: 65, winStreak: 0, level: "Rookie", rank: 10 },
];

export const WEEKLY_PLAYERS = [
  { id: 1, name: "CrimsonBlade", avatar: "🗡️", points: 1850, casesSolved: 4, accuracy: 92, winStreak: 3, level: "Senior Detective", rank: 1 },
  { id: 2, name: "ShadowHunter", avatar: "🕵️", points: 1600, casesSolved: 3, accuracy: 95, winStreak: 2, level: "Master Detective", rank: 2 },
  { id: 3, name: "GreyPhoenix", avatar: "🦅", points: 1450, casesSolved: 3, accuracy: 88, winStreak: 1, level: "Senior Detective", rank: 3 },
  { id: 4, name: "VeilWatcher", avatar: "👁️", points: 1200, casesSolved: 2, accuracy: 84, winStreak: 0, level: "Investigator", rank: 4 },
  { id: 5, name: "NightOwl", avatar: "🦉", points: 950, casesSolved: 2, accuracy: 80, winStreak: 0, level: "Master Detective", rank: 5 },
];

export const ACHIEVEMENTS_LIST = [
  {
    id: "first_case",
    title: "First Case Solved",
    description: "Solve your very first mystery case",
    icon: "🏆",
    rarity: "Common",
    points: 100,
    condition: (stats) => stats.casesSolved >= 1
  },
  {
    id: "eagle_eye",
    title: "Eagle Eye",
    description: "Discover every clue in a single case",
    icon: "🦅",
    rarity: "Rare",
    points: 250,
    condition: (stats) => stats.perfectClues >= 1
  },
  {
    id: "master_interrogator",
    title: "Master Interrogator",
    description: "Find 5 important contradictions",
    icon: "🎯",
    rarity: "Rare",
    points: 300,
    condition: (stats) => stats.contradictionsFound >= 5
  },
  {
    id: "no_hints",
    title: "No Hints Needed",
    description: "Solve a case without using any hints",
    icon: "🧠",
    rarity: "Epic",
    points: 400,
    condition: (stats) => stats.noHintCases >= 1
  },
  {
    id: "speed_detective",
    title: "Speed Detective",
    description: "Complete a timed mystery challenge",
    icon: "⚡",
    rarity: "Uncommon",
    points: 200,
    condition: (stats) => stats.timedCasesCompleted >= 1
  },
  {
    id: "perfect_deduction",
    title: "Perfect Deduction",
    description: "Submit a completely correct accusation on first try",
    icon: "💎",
    rarity: "Legendary",
    points: 500,
    condition: (stats) => stats.perfectSolves >= 1
  },
  {
    id: "seasoned_detective",
    title: "Seasoned Detective",
    description: "Solve 5 mystery cases",
    icon: "🔍",
    rarity: "Uncommon",
    points: 200,
    condition: (stats) => stats.casesSolved >= 5
  },
  {
    id: "master_sleuth",
    title: "Master Sleuth",
    description: "Reach 10,000 total points",
    icon: "👑",
    rarity: "Legendary",
    points: 600,
    condition: (stats) => stats.totalPoints >= 10000
  }
];

export const RANKS = [
  { name: "Rookie", minPoints: 0, icon: "🔰", color: "#6c757d" },
  { name: "Investigator", minPoints: 2000, icon: "🔍", color: "#0d6efd" },
  { name: "Senior Detective", minPoints: 5000, icon: "🕵️", color: "#6f42c1" },
  { name: "Master Detective", minPoints: 10000, icon: "👑", color: "#ffc107" }
];

export const MULTIPLAYER_CHALLENGES = [
  {
    id: "mc1",
    title: "Speed Interrogation",
    description: "Answer 10 deduction questions faster than your opponent",
    timeLimit: 120,
    questions: [
      { q: "If a suspect's alibi is confirmed by a co-conspirator, is it reliable?", a: "No", options: ["Yes", "No", "Maybe", "Depends"] },
      { q: "Physical evidence found at a crime scene is called?", a: "Forensic evidence", options: ["Circumstantial evidence", "Forensic evidence", "Testimonial evidence", "Digital evidence"] },
      { q: "A motive is best defined as?", a: "Reason to commit the crime", options: ["Opportunity", "Reason to commit the crime", "Alibi", "Confession"] },
      { q: "Which evidence is most reliable?", a: "Physical forensic evidence", options: ["Eyewitness testimony", "Physical forensic evidence", "Rumor", "Anonymous tip"] },
      { q: "An alibi requires?", a: "Independent confirmation", options: ["Self-reporting", "Independent confirmation", "A witness of any kind", "Written statement only"] },
      { q: "The 'means' in means, motive, and opportunity refers to?", a: "Ability to commit the crime", options: ["Financial means", "Ability to commit the crime", "Transportation", "Access to weapons"] },
      { q: "Circumstantial evidence is?", a: "Indirect evidence requiring inference", options: ["Always conclusive", "Indirect evidence requiring inference", "Eyewitness testimony", "A confession"] },
      { q: "When questioning a suspect, inconsistencies in their story suggest?", a: "Possible deception", options: ["Nothing", "Possible deception", "Nervousness only", "Guilt confirmed"] },
      { q: "Digital evidence like phone records can be?", a: "Both incriminating and exculpatory", options: ["Only incriminating", "Only exculpatory", "Both incriminating and exculpatory", "Inadmissible"] },
      { q: "The most dangerous assumption in detective work is?", a: "That the first suspect is guilty", options: ["Being too methodical", "That the first suspect is guilty", "Collecting too much evidence", "Asking too many questions"] }
    ]
  }
];
