import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function Navbar() {
  const { player, getCurrentRank } = useGame();
  const rank = getCurrentRank(player.totalPoints);

  return (
    <nav className="sc-navbar navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span>🔍</span>
          <span>SHADOW CASE</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span style={{ color: '#8888a0', fontSize: '1.2rem' }}>☰</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cases">Cases</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/multiplayer">Multiplayer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/achievements">Achievements</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/profile" className="player-badge">
              <span>{player.avatar}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {rank.icon} {player.name}
              </span>
              <span className="pts">{player.totalPoints.toLocaleString()} pts</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
