import React from 'react';
import SchemaCard from './SchemaCard';
import imgStraffendeOuder from '../assets/images/modes/so.png';
import imgOvergave from '../assets/images/modicategorieen/coping_overgave.png';
import imgKwetsbareKind from '../assets/images/modes/kk.png';
import imgGezondeVolwassene from '../assets/images/modes/gv.png';

export default function HeroTableLayout({ isHovered }) {
  const cards = [
    { type: 'mode', title: 'Straffende Ouder', color: '#ef4444', id: 'm12', src: imgStraffendeOuder, imageStyle: { transform: 'scale(1.1)' }, base: {x: -10, y: 10, r: -8}, hover: {x: -55, y: -45, r: -8} }, 
    { type: 'modicategorie', title: 'Coping: Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' }, base: {x: 10, y: 15, r: 12}, hover: {x: 55, y: -45, r: 8} }, 
    { type: 'mode', title: 'Kwetsbare kind', color: '#f59e0b', id: 'm1', src: imgKwetsbareKind, imageStyle: { transform: 'scale(1.1)' }, base: {x: -5, y: 25, r: -4}, hover: {x: 0, y: -10, r: 0} },    
    { type: 'mode', title: 'Gezonde Volwassene', color: '#10b981', id: 'm14', src: imgGezondeVolwassene, imageStyle: { transform: 'scale(1.1)' }, base: {x: 8, y: 35, r: 6}, hover: {x: 0, y: 55, r: 0} }       
  ];

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem',
      transform: 'translateY(-10px)'
    }}>
      <div style={{
        position: 'absolute', width: '180px', height: '180px', borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.25)',
        transform: isHovered ? 'scale(1)' : 'scale(0.6)', opacity: isHovered ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />

      {cards.map((card, idx) => (
        <div key={idx} style={{
          position: 'absolute', width: '110px', height: '155px',
          transform: isHovered 
            ? `translate(${card.hover.x}px, ${card.hover.y}px) rotate(${card.hover.r}deg) scale(0.52)`
            : `translate(${card.base.x}px, ${card.base.y}px) rotate(${card.base.r}deg) scale(0.6)`,
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`, zIndex: idx
        }}>
          <div style={{
             position: 'relative',
             pointerEvents: 'none', width: '100%', height: '100%', 
             boxShadow: isHovered ? `0 15px 35px ${card.color}60` : '0 10px 20px rgba(16, 185, 129, 0.15)',
             borderRadius: '8px',
             filter: isHovered ? 'none' : 'grayscale(1) sepia(0.8) hue-rotate(100deg) saturate(2) brightness(0.95)',
             transition: 'filter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <SchemaCard 
                id={card.id} type={card.type} title={card.title} color={card.color} src={card.src}
                width="110px" height="155px" flipOnClick={false} zoomOnClick={false} isInteractive={false} imageStyle={card.imageStyle}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
