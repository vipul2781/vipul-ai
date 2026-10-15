/**
 * Vipul's Project Hub — Express Server
 * Serves the hub static files on port 3000
 */
const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.HUB_PORT || 3000;

// Serve static files from the hub/ directory
app.use(express.static(path.join(__dirname)));

// Fallback: always serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('\n');
  console.log('  ╔═══════════════════════════════════════╗');
  console.log('  ║       Vipul\'s Project Hub             ║');
  console.log('  ╠═══════════════════════════════════════╣');
  console.log(`  ║  🌐  Hub       →  http://localhost:${PORT}  ║`);
  console.log('  ║  💬  DiscussHub→  http://localhost:3001  ║');
  console.log('  ║  🛍️  Nova Store→  http://localhost:3002  ║');
  console.log('  ║  🕵️  ShadowCase→  http://localhost:3003  ║');
  console.log('  ║  ⚡  SkillHub  →  http://localhost:3004  ║');
  console.log('  ║  🏠  Roommate  →  http://localhost:3005  ║');
  console.log('  ╚═══════════════════════════════════════╝');
  console.log('\n');
});
