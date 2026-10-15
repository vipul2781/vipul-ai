import React from 'react';
import { useGame } from '../context/GameContext';

export default function ScoreNotifications() {
  const { notifications } = useGame();

  return (
    <div className="score-notifications">
      {notifications.map(n => (
        <div key={n.id} className={`score-toast ${n.type}`}>
          <span>{n.type === 'gain' ? '▲' : '▼'}</span>
          <span>{n.type === 'gain' ? '+' : ''}{n.amount} pts</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>— {n.reason}</span>
        </div>
      ))}
    </div>
  );
}
