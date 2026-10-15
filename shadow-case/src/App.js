import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScoreNotifications from './components/ScoreNotifications';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import InvestigationRoom from './pages/InvestigationRoom';
import Multiplayer from './pages/Multiplayer';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import OnboardingModal from './components/OnboardingModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function AppContent() {
  const { hasProfile } = useGame();
  const [showOnboarding, setShowOnboarding] = useState(!hasProfile);

  return (
    <>
      <ScoreNotifications />
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/investigate/:caseId" element={<InvestigationRoom />} />
        <Route path="/multiplayer" element={<Multiplayer />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <Router>
        <AppContent />
      </Router>
    </GameProvider>
  );
}

export default App;
