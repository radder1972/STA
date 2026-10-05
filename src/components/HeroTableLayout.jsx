import React from 'react';

export default function HeroTableLayout({ isHovered }) {
  const cards = [
    { color: '#ef4444', cat: 'MODUS', title: 'Straffende', base: {x: -12, y: 15, r: -8}, hover: {x: -60, y: -35, r: -8} }, 
    { color: '#8b5cf6', cat: 'COPING', title: 'Overgave', base: {x: 12, y: 22, r: 12}, hover: {x: 60, y: -35, r: 8} }, 
    { color: '#f59e0b', cat: 'MODUS', title: 'Kind', base: {x: -6, y: 29, r: -4}, hover: {x: 0, y: -5, r: 0} },    
    { color: '#10b981', cat: 'MODUS', title: 'Volwassene', base: {x: 10, y: 36, r: 6}, hover: {x: 0, y: 45, r: 0} }       
  ];

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem',
      transform: 'translateY(-15px)' // Move it slightly higher as requested
    }}>
      <div style={{
        position: 'absolute', width: '170px', height: '170px', borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.25)',
        transform: isHovered ? 'scale(1)' : 'scale(0.6)', opacity: isHovered ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />

      {cards.map((card, idx) => (
        <div key={idx} style={{
          position: 'absolute', width: '56px', height: '81px', backgroundColor: 'white',
          borderRadius: '5px', border: `1px solid ${card.color}`, overflow: 'hidden',
          boxShadow: isHovered ? `0 10px 25px ${card.color}50` : '0 4px 12px rgba(16, 185, 129, 0.15)',
          transform: isHovered 
            ? `translate(${card.hover.x}px, ${card.hover.y}px) rotate(${card.hover.r}deg)`
            : `translate(${card.base.x}px, ${card.base.y}px) rotate(${card.base.r}deg)`,
          filter: isHovered ? 'none' : 'grayscale(1) sepia(0.4) hue-rotate(100deg) saturate(1.2) brightness(0.98)',
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`, zIndex: idx, display: 'flex', flexDirection: 'column'
        }}>
          <div style={{ background: card.color, width: '100%', height: '40%' }}></div>
          <div style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '60%', height: '4px', background: '#cbd5e1', borderRadius: '2px' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
