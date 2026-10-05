import React from 'react';

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
            border: `2px solid ${card.color}`,
            boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
            transform: isHovered 
              ? `translate(${card.hover.x}px, ${card.hover.y}px) rotate(${card.hover.x * 0.2}deg)`
              : `translate(${card.base.x}px, ${card.base.y}px) rotate(0deg)`,
            transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`,
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
}