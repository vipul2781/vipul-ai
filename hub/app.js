/* =====================================================
   VIPUL'S PROJECT HUB — app.js
   Particles · Status checks · Interactions · Toasts
   ===================================================== */

'use strict';

// ─── Project Registry ────────────────────────────────
const PROJECTS = [
  {
    id: 'discusshub',
    name: 'DiscussHub',
    port: 3001,
    color: 'purple',
    emoji: '💬',
  },
  {
    id: 'nova-store',
    name: 'Nova Store',
    port: 3002,
    color: 'green',
    emoji: '🛍️',
  },
  {
    id: 'shadow-case',
    name: 'ShadowCase',
    port: 3003,
    color: 'red',
    emoji: '🕵️',
  },
  {
    id: 'skillhub',
    name: 'SkillHub',
    port: 3004,
    color: 'orange',
    emoji: '⚡',
  },
  {
    id: 'roommate-finder',
    name: 'Roommate Finder',
    port: 3005,
    color: 'blue',
    emoji: '🏠',
  },
];

// ─── Particle Canvas ─────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H, animId;

  const COLORS = [
    'rgba(168,85,247,VAL)',
    'rgba(6,182,212,VAL)',
    'rgba(59,130,246,VAL)',
    'rgba(249,115,22,VAL)',
    'rgba(34,197,94,VAL)',
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    const col = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      color: col,
    };
  }

  function init() {
    resize();
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: count }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace('VAL', p.alpha);
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    // Draw subtle connecting lines
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

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    draw();
  });

  init();
  draw();
})();

// ─── Topbar Scroll Effect ────────────────────────────
(function initTopbar() {
  const bar = document.getElementById('topbar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    bar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
})();

// ─── Toast System ─────────────────────────────────────
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✅', error: '❌', info: '🔔', warning: '⚠️' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

// ─── Status Check ─────────────────────────────────────
const statusCache = {};

async function checkPort(port) {
  if (statusCache[port] === 'online') return true;
  try {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch(`http://localhost:${port}`, {
      mode: 'no-cors',
      signal: ctrl.signal,
    });
    clearTimeout(id);
    // no-cors always returns opaque — if it didn't throw it's live
    statusCache[port] = 'online';
    return true;
  } catch {
    statusCache[port] = 'offline';
    return false;
  }
}

function setProjectStatus(id, state) {
  const el   = document.getElementById(`status-${id}`);
  const dot  = el?.querySelector('.dot');
  const text = el?.querySelector('.status-text');
  if (!dot || !text) return;

  dot.className = `dot ${state}`;
  text.textContent = state.charAt(0).toUpperCase() + state.slice(1);
}

async function refreshAllStatuses() {
  const dot   = document.getElementById('status-dot');
  const label = document.getElementById('status-label');

  if (dot)   dot.className = 'status-dot checking';
  if (label) label.textContent = 'Checking servers…';

  PROJECTS.forEach(p => setProjectStatus(p.id, 'loading'));

  const results = await Promise.all(
    PROJECTS.map(async (p) => {
      const online = await checkPort(p.port);
      setProjectStatus(p.id, online ? 'online' : 'offline');
      return online;
    })
  );

  const onlineCount = results.filter(Boolean).length;
  const total = PROJECTS.length;

  if (dot) {
    dot.className = onlineCount === total
      ? 'status-dot all-online'
      : onlineCount > 0
      ? 'status-dot some-online'
      : 'status-dot';
  }

  if (label) {
    label.textContent = onlineCount === total
      ? `All ${total} projects live`
      : onlineCount === 0
      ? 'All servers offline'
      : `${onlineCount}/${total} servers live`;
  }
}

// ─── Launch Project ───────────────────────────────────
function launchProject(id, port) {
  const card = document.getElementById(`card-${id}`);
  if (card) {
    card.classList.add('launching');
    setTimeout(() => card.classList.remove('launching'), 700);
  }

  const proj = PROJECTS.find(p => p.id === id);
  const url  = `http://localhost:${port}`;

  showToast(`Launching ${proj?.name || id} on port ${port}…`, 'info', 2500);
  setTimeout(() => window.open(url, '_blank', 'noopener'), 350);
}

// ─── Open All ─────────────────────────────────────────
function openAll() {
  showToast('Opening all 5 projects…', 'success', 4000);
  PROJECTS.forEach((p, i) => {
    setTimeout(() => {
      window.open(`http://localhost:${p.port}`, '_blank', 'noopener');
    }, i * 400);
  });
}

// ─── Copy Command ─────────────────────────────────────
function copyCmd(id, btn) {
  const code = document.getElementById(id);
  if (!code) return;
  navigator.clipboard.writeText(code.textContent.trim()).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    showToast('Copied to clipboard!', 'success', 2000);
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;
    }, 2200);
  }).catch(() => showToast('Copy failed — try manually', 'error', 3000));
}

// ─── Keyboard Shortcuts ───────────────────────────────
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + A → Open All
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
    e.preventDefault();
    openAll();
  }
  // Number keys 1-5 → launch project
  if (['1','2','3','4','5'].includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const p = PROJECTS[+e.key - 1];
    if (p) launchProject(p.id, p.port);
  }
});

// ─── Card hover tilt effect ────────────────────────────
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    const tiltX = dy * -6;
    const tiltY = dx *  6;
    card.style.transform = `translateY(-6px) scale(1.01) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

// ─── Auto-refresh status every 30s ────────────────────
refreshAllStatuses();
setInterval(refreshAllStatuses, 30000);

// ─── Staggered card entrance animation ────────────────
(function animateCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + i * 100);
  });
})();

console.log(`
╔══════════════════════════════╗
║   Vipul's Project Hub v1.0   ║
║   Keyboard shortcuts:        ║
║   [1-5] → Launch project     ║
║   Ctrl+Shift+A → Open all    ║
╚══════════════════════════════╝
`);
