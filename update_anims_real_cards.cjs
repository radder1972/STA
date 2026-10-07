const fs = require('fs');

const cardFanCode = `import React from 'react';

export default function HeroCardFan({ isHovered }) {
  // Realistic schema therapy cards representations
  const cards = [
    { color: '#f59e0b', cat: 'BEHOEFTE', title: 'Verbinding' },
    { color: '#10b981', cat: 'MODUS', title: 'Gezonde\\nVolwassene' },
    { color: '#0ea5e9', cat: 'SCHEMA', title: 'Minder-\\nwaardigheid' },
    { color: '#8b5cf6', cat: 'COPING', title: 'Vermijding' },
    { color: '#f43f5e', cat: 'MODUS', title: 'Kwetsbare\\nKind' }
  ];

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'flex-end', marginTop: '1rem', marginBottom: '1.5rem', perspective: '1000px'
    }}>
      {cards.map((card, idx) => {
        const baseAngle = (idx - 2) * 12;
        const hoverAngle = (idx - 2) * 20;
        const baseOffset = (idx - 2) * 10;
        const hoverOffset = (idx - 2) * 25;
        
        return (
          <div key={idx} style={{
            position: 'absolute', width: '80px', height: '115px', backgroundColor: 'white',
            borderRadius: '6px', border: \`2px solid \${card.color}\`, overflow: 'hidden',
            boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.12)' : '0 4px 10px rgba(0,0,0,0.05)',
            transformOrigin: 'bottom center',
            transform: isHovered 
              ? \`translateX(\${hoverOffset}px) translateY(\${Math.abs(idx-2) * 5}px) rotate(\${hoverAngle}deg) scale(1.05)\`
              : \`translateX(\${baseOffset}px) translateY(\${Math.abs(idx-2) * 2}px) rotate(\${baseAngle}deg) scale(1)\`,
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: idx, display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ background: card.color, width: '100%', height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: 'white', fontSize: '7px', fontWeight: 'bold', letterSpacing: '0.5px' }}>{card.cat}</span>
            </div>
            <div style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
               <span style={{ color: 'var(--text-main)', fontSize: '9px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>
                 {card.title.split('\\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
               </span>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '4px' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.2 }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`;
fs.writeFileSync('src/components/HeroCardFan.jsx', cardFanCode);

const tableCode = `import React from 'react';

export default function HeroTableLayout({ isHovered }) {
  const cards = [
    { color: '#ef4444', cat: 'MODUS', title: 'Straffende', base: {x: 0, y: 15}, hover: {x: -42, y: -25} }, 
    { color: '#8b5cf6', cat: 'COPING', title: 'Overgave', base: {x: 0, y: 20}, hover: {x: 42, y: -25} }, 
    { color: '#f59e0b', cat: 'MODUS', title: 'Kind', base: {x: 0, y: 25}, hover: {x: 0, y: -5} },    
    { color: '#10b981', cat: 'MODUS', title: 'Volwassene', base: {x: 0, y: 30}, hover: {x: 0, y: 40} }       
  ];

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem'
    }}>
      <div style={{
        position: 'absolute', width: '140px', height: '140px', borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.25)',
        transform: isHovered ? 'scale(1)' : 'scale(0.5)', opacity: isHovered ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />

      {cards.map((card, idx) => (
        <div key={idx} style={{
          position: 'absolute', width: '40px', height: '58px', backgroundColor: 'white',
          borderRadius: '4px', border: \`1px solid \${card.color}\`, overflow: 'hidden',
          boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
          transform: isHovered 
            ? \`translate(\${card.hover.x}px, \${card.hover.y}px) rotate(\${card.hover.x * 0.15}deg)\`
            : \`translate(\${card.base.x}px, \${card.base.y}px) rotate(0deg)\`,
          transition: \`all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) \${idx * 0.05}s\`, zIndex: idx, display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ background: card.color, width: '100%', height: '40%' }}></div>
          <div style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '60%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}`;
fs.writeFileSync('src/components/HeroTableLayout.jsx', tableCode);
console.log("Updated animations to look like real cards.");
