// Copies the real app file (index.html, at the project root) into www/,
// which is the folder Capacitor packages into the native iOS app.
//
// Why this exists: this project is a single hand-maintained index.html
// file with no build tool (no webpack/vite/etc). Capacitor needs its web
// assets in their own folder (www/) rather than mixed in with the rest of
// the project root (README-style files, GitHub Pages config, etc). Rather
// than editing two copies of index.html by hand and risking them drifting
// out of sync, this script does the copy for you.
//
// Usage: node scripts/sync-web.js
// (Normally you won't run this directly -- use `npm run cap:sync` instead,
// which runs this AND tells Capacitor to pick up the change.)

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const source = path.join(projectRoot, 'index.html');
const destDir = path.join(projectRoot, 'www');
const dest = path.join(destDir, 'index.html');

if (!fs.existsSync(source)) {
  console.error(`Could not find ${source}. Nothing was copied.`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(source, dest);

console.log(`Copied index.html -> www/index.html (${fs.statSync(dest).size} bytes)`);
