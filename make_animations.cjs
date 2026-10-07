const fs = require('fs');

// 1. Create HeroRadarChart.jsx
const radarCode = `import React from 'react';

export default function HeroRadarChart({ isHovered }) {
  return (
    <div style={{ 
      width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center',
      marginTop: '1rem', marginBottom: '1.5rem', position: 'relative'
    }}>
       <svg viewBox="0 0 100 100" width="120" height="120" style={{ overflow: 'visible' }}>
         <polygon points="50,10 90,35 90,75 50,100 10,75 10,35" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         <polygon points="50,25 75,42 75,67 50,85 25,67 25,42" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         <polygon points="50,40 60,48 60,60 50,68 40,60 40,48" fill="none" stroke="#e2e8f0" strokeWidth="1" />
         
         <line x1="50" y1="50" x2="50" y2="10" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="35" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="90" y2="75" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="75" stroke="#f1f5f9" strokeWidth="1" />
         <line x1="50" y1="50" x2="10" y2="35" stroke="#f1f5f9" strokeWidth="1" />
         
         <polygon 
           points={isHovered ? "50,20 80,45 70,80 50,90 25,60 35,30" : "50,50 50,50 50,50 50,50 50,50 50,50"} 
           fill="rgba(107, 114, 128, 0.15)" 
           stroke="#6b7280" 
           strokeWidth="2"
           style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
         />
         
         <g fill="#475569" style={{ transition: 'opacity 0.6s', opacity: isHovered ? 1 : 0 }}>
           <circle cx="50" cy="20" r="3" />
           <circle cx="80" cy="45" r="3" />
           <circle cx="70" cy="80" r="3" />
           <circle cx="50" cy="90" r="3" />
           <circle cx="25" cy="60" r="3" />
           <circle cx="35" cy="30" r="3" />
         </g>
       </svg>
    </div>
  );
}`;
fs.writeFileSync('src/components/HeroRadarChart.jsx', radarCode);

// 2. Create HeroTableLayout.jsx
const tableCode = `import React from 'react';

export default function HeroTableLayout({ isHovered }) {
  const cards = [
    { color: '#ef4444', base: {x: 0, y: 15}, hover: {x: -35, y: -25} }, 
    { color: '#8b5cf6', base: {x: 0, y: 20}, hover: {x: 35, y: -25} }, 
    { color: '#f59e0b', base: {x: 0, y: 25}, hover: {x: 0, y: -5} },    
    { color: '#10b981', base: {x: 0, y: 30}, hover: {x: 0, y: 35} }       
  ];

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem'
    }}>
      <div style={{
        position: 'absolute', width: '130px', height: '130px', borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.2)',
        transform: isHovered ? 'scale(1)' : 'scale(0.5)', opacity: isHovered ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />

      {cards.map((card, idx) => (
        <div 
          key={idx}
          style={{
            position: 'absolute',
            width: '40px', height: '58px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: \`2px solid \${card.color}\`,
            boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
            transform: isHovered 
              ? \`translate(\${card.hover.x}px, \${card.hover.y}px) rotate(\${card.hover.x * 0.2}deg)\`
              : \`translate(\${card.base.x}px, \${card.base.y}px) rotate(0deg)\`,
            transition: \`all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) \${idx * 0.05}s\`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
            padding: '4px',
            zIndex: idx
          }}
        >
          <div style={{ width: '100%', height: '18px', backgroundColor: card.color, borderRadius: '2px', opacity: 0.2 }} />
          <div style={{ width: '80%', height: '3px', backgroundColor: '#e2e8f0', borderRadius: '1.5px', marginTop: '5px' }} />
          <div style={{ width: '50%', height: '3px', backgroundColor: '#e2e8f0', borderRadius: '1.5px', marginTop: '3px' }} />
        </div>
      ))}
    </div>
  );
}`;
fs.writeFileSync('src/components/HeroTableLayout.jsx', tableCode);

// 3. Update StartHub.jsx
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

if (!code.includes("import HeroRadarChart")) {
    code = code.replace(
        "import HeroCardFan from './HeroCardFan';",
        "import HeroCardFan from './HeroCardFan';\nimport HeroRadarChart from './HeroRadarChart';\nimport HeroTableLayout from './HeroTableLayout';"
    );
}

// Target 1: Vragenlijsten paragraph
const target1 = `<p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Betrouwbare, digitale afname van de bekende YSQ en SMI-vragenlijsten. Krijg direct inzicht in actieve schema's en modi via een beveiligd, anoniem portal.
          </p>`;

if (code.includes(target1) && !code.includes("<HeroRadarChart")) {
    code = code.replace(target1, `<HeroRadarChart isHovered={hoveredCard === 'test'} />\n          ` + target1);
}

// Target 3: Tafelopstelling paragraph
const target3 = `<p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Zet de kaarten virtueel of fysiek op tafel. Krijg stap-voor-stap ondersteuning bij het doorgronden van de casus, inclusief AI-gestuurd handelingsadvies voor de Gezonde Volwassene.
          </p>`;

if (code.includes(target3) && !code.includes("<HeroTableLayout")) {
    code = code.replace(target3, `<HeroTableLayout isHovered={hoveredCard === 'tafel'} />\n          ` + target3);
}

fs.writeFileSync('src/components/StartHub.jsx', code);
console.log("Successfully added both animations.");
