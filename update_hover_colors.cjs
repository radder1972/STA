const fs = require('fs');
let code = fs.readFileSync('src/components/HeroRadarChart.jsx', 'utf8');

// Update polygon fill and stroke to be colorful on hover
code = code.replace(
  'fill={isHovered ? "rgba(71, 85, 105, 0.35)" : "rgba(148, 163, 184, 0.15)"}',
  'fill={isHovered ? "rgba(14, 165, 233, 0.35)" : "rgba(148, 163, 184, 0.15)"}'
);
code = code.replace(
  'stroke={isHovered ? "#475569" : "#94a3b8"}',
  'stroke={isHovered ? "#0ea5e9" : "#94a3b8"}'
);

// Update circles to be colorful on hover
code = code.replace('<circle cx="50" cy="20" r="4" fill={isHovered ? "#475569" : "#94a3b8"}', '<circle cx="50" cy="20" r="4" fill={isHovered ? "#f59e0b" : "#94a3b8"}');
code = code.replace('<circle cx="80" cy="45" r="4" fill={isHovered ? "#475569" : "#94a3b8"}', '<circle cx="80" cy="45" r="4" fill={isHovered ? "#10b981" : "#94a3b8"}');
code = code.replace('<circle cx="70" cy="80" r="4" fill={isHovered ? "#475569" : "#94a3b8"}', '<circle cx="70" cy="80" r="4" fill={isHovered ? "#0ea5e9" : "#94a3b8"}');
code = code.replace('<circle cx="50" cy="90" r="4" fill={isHovered ? "#475569" : "#94a3b8"}', '<circle cx="50" cy="90" r="4" fill={isHovered ? "#8b5cf6" : "#94a3b8"}');
code = code.replace('<circle cx="25" cy="60" r="4" fill={isHovered ? "#475569" : "#94a3b8"}', '<circle cx="25" cy="60" r="4" fill={isHovered ? "#ef4444" : "#94a3b8"}');
code = code.replace('<circle cx="35" cy="30" r="4" fill={isHovered ? "#475569" : "#94a3b8"}', '<circle cx="35" cy="30" r="4" fill={isHovered ? "#f43f5e" : "#94a3b8"}');

fs.writeFileSync('src/components/HeroRadarChart.jsx', code);
