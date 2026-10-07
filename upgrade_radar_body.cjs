const fs = require('fs');
let code = fs.readFileSync('src/components/HeroRadarChart.jsx', 'utf8');

// Replace the base web
const targetBase = `<polygon points="50,10 90,35 90,75 50,100 10,75 10,35" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         <polygon points="50,25 75,42 75,67 50,85 25,67 25,42" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         <polygon points="50,40 60,48 60,60 50,68 40,60 40,48" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         
         <line x1="50" y1="50" x2="50" y2="10" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="35" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="75" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="75" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="35" stroke="#f1f5f9" strokeWidth="1" />`;

const newBase = `<polygon points="50,10 90,35 90,75 50,100 10,75 10,35" fill="rgba(56, 189, 248, 0.15)" stroke="#7dd3fc" strokeWidth="1.5" />
         <polygon points="50,25 75,42 75,67 50,85 25,67 25,42" fill="none" stroke="#bae6fd" strokeWidth="1" />
         <polygon points="50,40 60,48 60,60 50,68 40,60 40,48" fill="none" stroke="#e0f2fe" strokeWidth="1" />
         
         <line x1="50" y1="50" x2="50" y2="10" stroke="#e0f2fe" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="35" stroke="#e0f2fe" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="75" stroke="#e0f2fe" strokeWidth="1" />
         <line x1="50" y1="50" x2="50" y2="100" stroke="#e0f2fe" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="75" stroke="#e0f2fe" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="35" stroke="#e0f2fe" strokeWidth="1" />`;

code = code.replace(targetBase, newBase);

// Enhance data polygon body
code = code.replace('fill="rgba(14, 165, 233, 0.15)"', 'fill="rgba(14, 165, 233, 0.35)"');
code = code.replace('stroke="#0ea5e9"', 'stroke="#0284c7"');
code = code.replace('strokeWidth="2"', 'strokeWidth="2.5"');

// Increase dot size slightly for body
code = code.replace(/r="3.5"/g, 'r="4"');

fs.writeFileSync('src/components/HeroRadarChart.jsx', code);
console.log("Upgraded radar chart body.");
