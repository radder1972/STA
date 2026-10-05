import React from 'react';

export default function HeroCardFan({ isHovered }) {
  const cards = [
    { color: '#f59e0b', title: 'Verbinding' },
    { color: '#10b981', title: 'Autonomie' },
    { color: '#0ea5e9', title: 'Grenzen' },
    { color: '#8b5cf6', title: 'Expressie' },
    { color: '#f43f5e', title: 'Spontaniteit' }
  ];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '140px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-end',
      marginTop: '1rem',
      marginBottom: '1.5rem',
      perspective: '1000px'
    }}>
      {cards.map((card, idx) => {
        const isCenter = idx === 2;
        // When not hovered, they are stacked closer together
        const baseAngle = (idx - 2) * 12;
        const hoverAngle = (idx - 2) * 20;
        
        const baseOffset = (idx - 2) * 10;
        const hoverOffset = (idx - 2) * 25;
        
        return (
          <div 
            key={idx}
            style={{
              position: 'absolute',
              width: '80px',
              height: '115px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: \`2px solid \${card.color}\`,
              boxShadow: isHovered 
                ? '0 10px 25px rgba(0,0,0,0.1)' 
                : '0 4px 10px rgba(0,0,0,0.05)',
              transformOrigin: 'bottom center',
              transform: isHovered 
                ? \`translateX(\${hoverOffset}px) translateY(\${Math.abs(idx-2) * 5}px) rotate(\${hoverAngle}deg) scale(1.05)\`
                : \`translateX(\${baseOffset}px) translateY(\${Math.abs(idx-2) * 2}px) rotate(\${baseAngle}deg) scale(1)\`,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              zIndex: idx,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '6px',
              background: \`linear-gradient(135deg, white 0%, rgba(255,255,255,0.9) 100%)\`
            }}
          >
            <div style={{ width: '100%', height: '40%', backgroundColor: card.color, borderRadius: '4px', opacity: 0.2 }} />
            <div style={{ width: '80%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', marginTop: '10px' }} />
            <div style={{ width: '60%', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', marginTop: '6px' }} />
          </div>
        );
      })}
    </div>
  );
}
