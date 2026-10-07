const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

// Optie 1
code = code.replace(
  '<div \n          className="glass-panel" \n          onMouseEnter={() => setHoveredCard(\'test\')}',
  '<div \n          className="glass-panel" \n          onClick={() => window.location.href = \'/test\'}\n          onMouseEnter={() => setHoveredCard(\'test\')}'
);

// Optie 2
code = code.replace(
  '<div \n          className="glass-panel" \n          onMouseEnter={() => setHoveredCard(\'kaarten\')}',
  '<div \n          className="glass-panel" \n          onClick={() => window.location.href = \'/kaarten\'}\n          onMouseEnter={() => setHoveredCard(\'kaarten\')}'
);

// Optie 3
code = code.replace(
  '<div \n          className="glass-panel" \n          onMouseEnter={() => setHoveredCard(\'tafel\')}',
  '<div \n          className="glass-panel" \n          onClick={() => window.location.href = \'/tafel\'}\n          onMouseEnter={() => setHoveredCard(\'tafel\')}'
);

// Add cursor: pointer to glass-panel inline styles
code = code.replace(/cursor: 'default'/g, "cursor: 'pointer'");

fs.writeFileSync('src/components/StartHub.jsx', code);
