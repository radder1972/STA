const fs = require('fs');
let code = fs.readFileSync('src/components/HeroTableLayout.jsx', 'utf8');

// Update base positions to tilt the TOP card noticeably
code = code.replace(/base: \{x: -16, y: 26, r: -20\}/g, "base: {x: -10, y: 24, r: -15}");
code = code.replace(/base: \{x: 16, y: 20, r: 20\}/g, "base: {x: 5, y: 18, r: 5}");
code = code.replace(/base: \{x: 0, y: 12, r: 0\}/g, "base: {x: 8, y: 12, r: 12}"); // Tilted top card

fs.writeFileSync('src/components/HeroTableLayout.jsx', code);
