import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const AVATARS = ['🕵️', '🦉', '🗡️', '🦅', '🎭', '👁️', '♟️', '👻', '⚡', '🪶', '🔍', '🧠'];

export default function OnboardingModal({ onClose }) {
  const { initPlayer } = useGame();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🕵️');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!name.trim()) { setError('Please enter a detective name'); return; }
    if (name.trim().length < 2) { setError('Name must be at least 2 characters'); return; }
    initPlayer(name.trim(), avatar);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="sc-card" style={{ maxWidth: 480, width: '100%', border: '1px solid rgba(255,214,10,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔍</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-gold)', marginBottom: '0.5rem' }}>
            Welcome, Detective
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Choose your detective identity to begin your investigation career.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
            Detective Name
          </label>
          <input
            className="sc-input"
            type="text"
            placeholder="Enter your alias..."
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            maxLength={24}
          />
          {error && <div style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{error}</div>}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
            Choose Avatar
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {AVATARS.map(a => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                style={{
                  width: 48, height: 48, fontSize: '1.5rem',
                  background: avatar === a ? 'rgba(255,214,10,0.15)' : 'var(--bg-input)',
                  border: `2px solid ${avatar === a ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-gold" onClick={handleStart} style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem' }}>
          Begin Investigation Career
        </button>
      </div>
    </div>
  );
}
