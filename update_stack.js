const fs = require('fs');
let code = fs.readFileSync('src/components/HeroTableLayout.jsx', 'utf8');

// Update base positions
code = code.replace(/base: \{x: -6, y: 22, r: -15\}/g, "base: {x: -18, y: 28, r: -22}");
code = code.replace(/base: \{x: 8, y: 19, r: 10\}/g, "base: {x: 18, y: 22, r: 25}");
code = code.replace(/base: \{x: -2, y: 16, r: -4\}/g, "base: {x: 0, y: 12, r: 0}");

// Update resting shadow to be stronger so cards don't blend
code = code.replace(/'0 6px 15px rgba\\(0,0,0,0\.15\\)'/g, "'0 4px 15px rgba(0,0,0,0.25), 0 0 2px rgba(0,0,0,0.4)'");

fs.writeFileSync('src/components/HeroTableLayout.jsx', code);
