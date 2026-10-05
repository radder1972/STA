import React from 'react';

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
          borderRadius: '4px', border: `1px solid ${card.color}`, overflow: 'hidden',
          boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.05)',
          transform: isHovered 
            ? `translate(${card.hover.x}px, ${card.hover.y}px) rotate(${card.hover.x * 0.15}deg)`
            : `translate(${card.base.x}px, ${card.base.y}px) rotate(0deg)`,
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`, zIndex: idx, display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ background: card.color, width: '100%', height: '40%' }}></div>
          <div style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '60%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}