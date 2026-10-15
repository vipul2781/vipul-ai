import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Hub.css';

/* ── Project registry ─────────────────────────────── */
const PROJECTS = [
  {
    id: 'discusshub',
    name: 'DiscussHub',
    route: '/discusshub',
    color: 'purple',
    emoji: '💬',
    desc: 'Modern community forum & discussion platform with 12 dedicated pages, threaded comments, voting engine, and moderation tools.',
    tags: ['React 18', 'Bootstrap 5', 'React Router'],
    pages: 12,
    components: 15,
  },
  {
    id: 'nova-store',
    name: 'Nova Store',
    route: '/nova-store',
    color: 'green',
    emoji: '🛍️',
    desc: 'Full-featured e-commerce platform with cart, wishlist, checkout, product catalog, categories, and order management.',
    tags: ['React 18', 'Context API', 'Bootstrap 5'],
    pages: 9,
    components: 10,
  },
  {
    id: 'shadow-case',
    name: 'ShadowCase',
    route: '/shadow-case',
    color: 'red',
    emoji: '🕵️',
    desc: 'Interactive mystery investigation game with case solving, multiplayer, leaderboard, achievements, and player profiles.',
    tags: ['React 18', 'Game Engine', 'LocalStorage'],
    pages: 8,
    components: 4,
  },
  {
    id: 'skillhub',
    name: 'SkillHub',
    route: '/skillhub',
    color: 'orange',
    emoji: '⚡',
    desc: 'Freelance marketplace platform with freelancer profiles, project postings, service listings, messaging, and dashboards.',
    tags: ['React 18', 'React-Toastify', 'Bootstrap 5'],
    pages: 13,
    components: 13,
  },
  {
    id: 'roommate-finder',
    name: 'Roommate Finder',
    route: '/roommate-finder',
    color: 'blue',
    emoji: '🏠',
    desc: 'Startup-grade room & housemate finder with multi-faceted filters, compatibility scores, photo galleries, and a full-featured post-a-room form.',
    tags: ['React 18', 'Vite 5', 'Bootstrap 5'],
    pages: 8,
    components: 11,
  },
];

/* ── Particle Canvas ─────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const COLORS = [
      'rgba(168,85,247,VAL)',
      'rgba(6,182,212,VAL)',
      'rgba(59,130,246,VAL)',
      'rgba(249,115,22,VAL)',
      'rgba(34,197,94,VAL)',
    ];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    function init() {
      resize();
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      particles = Array.from({ length: count }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('VAL', p.alpha);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    const handleResize = () => { cancelAnimationFrame(animId); init(); draw(); };
    window.addEventListener('resize', handleResize);
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hub-particles" />;
}

/* ── Toast ───────────────────────────────────────── */
function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  return { toasts, showToast };
}

/* ── Project Card ────────────────────────────────── */
function ProjectCard({ project, index, onNavigate }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) scale(1.01) perspective(800px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    card.style.transform = '';
    setTimeout(() => { if (card) card.style.transition = ''; }, 500);
  };

  return (
    <article
      ref={cardRef}
      className={`hub-project-card hub-card--${project.color}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id={`card-${project.id}`}
    >
      <div className={`hub-card-glow hub-glow--${project.color}`} />
      <div className={`hub-card-header hub-header--${project.color}`}>
        <div className="hub-card-icon-wrap">
          <span className="hub-card-icon">{project.emoji}</span>
        </div>
        <div className="hub-card-badge">{project.pages} pages</div>
      </div>
      <div className="hub-card-body">
        <h3 className="hub-card-title">{project.name}</h3>
        <p className="hub-card-desc">{project.desc}</p>
        <div className="hub-card-tags">
          {project.tags.map(tag => (
            <span key={tag} className="hub-tag">{tag}</span>
          ))}
        </div>
        <div className="hub-card-stats">
          <span className="hub-stat">📄 {project.pages} pages</span>
          <span className="hub-stat">🧩 {project.components} components</span>
        </div>
        <div className="hub-card-footer">
          <a
            href={project.route}
            className={`hub-launch-btn hub-btn--${project.color}`}
            id={`btn-${project.id}`}
            onClick={() => onNavigate(project.name)}
          >
            <span>Open App</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Hub Page ────────────────────────────────────── */
export default function Hub() {
  const { toasts, showToast } = useToast();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    // Keyboard shortcut: number keys 1-5 navigate to project
    const handler = (e) => {
      if (['1', '2', '3', '4', '5'].includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const p = PROJECTS[+e.key - 1];
        if (p) {
          showToast(`Opening ${p.name}…`, 'info');
          setTimeout(() => { window.location.href = p.route; }, 300);
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showToast]);

  const handleNavigate = (name) => showToast(`Opening ${name}…`, 'info');

  return (
    <div className="hub-root">
      <ParticleCanvas />

      {/* Topbar */}
      <nav className={`hub-topbar${scrolled ? ' hub-topbar--scrolled' : ''}`}>
        <div className="hub-topbar-left">
          <div className="hub-logo">
            <span className="hub-logo-icon">⬡</span>
            <span className="hub-logo-text">Vipul<span className="hub-logo-accent">.ai</span></span>
          </div>
        </div>
        <div className="hub-topbar-right">
          <div className="hub-status-pill">
            <span className="hub-status-dot hub-status-dot--live" />
            <span>5 Apps · Unified</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hub-hero">
        <div className="hub-hero-badge">
          <span className="hub-badge-dot" />
          5 Projects · One Deploy
        </div>
        <h1 className="hub-hero-title">
          Vipul's<br />
          <span className="hub-gradient-text">Project Hub</span>
        </h1>
        <p className="hub-hero-subtitle">
          A premium collection of full-stack React applications.<br />
          All unified into a single deployable folder.
        </p>
        <div className="hub-hero-meta">
          <div className="hub-meta-item"><span>🚀</span><span>5 React Apps</span></div>
          <div className="hub-meta-divider" />
          <div className="hub-meta-item"><span>⚡</span><span>One-Click Deploy</span></div>
          <div className="hub-meta-divider" />
          <div className="hub-meta-item"><span>🎨</span><span>Premium UI</span></div>
          <div className="hub-meta-divider" />
          <div className="hub-meta-item"><span>⌨️</span><span>Press 1–5 to launch</span></div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="hub-projects-section">
        <div className="hub-section-header">
          <h2 className="hub-section-title">Live Projects</h2>
          <p className="hub-section-desc">Click any card to navigate into the full app</p>
        </div>
        <div className="hub-projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onNavigate={handleNavigate} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="hub-footer">
        <div className="hub-footer-inner">
          <div className="hub-footer-logo">
            <span className="hub-logo-icon">⬡</span>
            <span>Vipul<span className="hub-logo-accent">.ai</span></span>
          </div>
          <p className="hub-footer-copy">Built with React · Powered by Vite · Unified v2.0</p>
          <div className="hub-footer-routes">
            {PROJECTS.map(p => (
              <a key={p.id} href={p.route} className="hub-route-pill">{p.name}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Toast container */}
      <div className="hub-toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`hub-toast hub-toast--${t.type}`}>
            <span>{t.type === 'info' ? '🔔' : t.type === 'success' ? '✅' : '⚠️'}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
