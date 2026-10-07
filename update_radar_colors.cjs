const fs = require('fs');
let code = fs.readFileSync('src/components/HeroRadarChart.jsx', 'utf8');

const targetG = `<g fill="#475569" style={{ transition: 'opacity 0.6s', opacity: isHovered ? 1 : 0 }}>
           <circle cx="50" cy="20" r="3" />
           <circle cx="80" cy="45" r="3" />
           <circle cx="70" cy="80" r="3" />
           <circle cx="50" cy="90" r="3" />
           <circle cx="25" cy="60" r="3" />
           <circle cx="35" cy="30" r="3" />
         </g>`;

const replacementG = `<g style={{ transition: 'opacity 0.6s', opacity: isHovered ? 1 : 0 }}>
           <circle cx="50" cy="20" r="3.5" fill="#f59e0b" />
           <circle cx="80" cy="45" r="3.5" fill="#10b981" />
           <circle cx="70" cy="80" r="3.5" fill="#0ea5e9" />
           <circle cx="50" cy="90" r="3.5" fill="#8b5cf6" />
           <circle cx="25" cy="60" r="3.5" fill="#ef4444" />
           <circle cx="35" cy="30" r="3.5" fill="#f43f5e" />
         </g>`;

code = code.replace(targetG, replacementG);

// Also make the polygon a bit more colorful
code = code.replace('fill="rgba(107, 114, 128, 0.15)"', 'fill="rgba(14, 165, 233, 0.1)"');
code = code.replace('stroke="#6b7280"', 'stroke="#94a3b8"');

fs.writeFileSync('src/components/HeroRadarChart.jsx', code);
console.log("Updated radar colors.");
