import React from 'react';
import SchemaCard from './SchemaCard';
import imgStraffendeOuder from '../assets/images/modes/so.png';
import imgOvergave from '../assets/images/modicategorieen/coping_overgave.png';
import imgKwetsbareKind from '../assets/images/modes/kk.png';
import imgGezondeVolwassene from '../assets/images/modes/gv.png';

export default function HeroTableLayout({ isHovered }) {
  const cards = [
    { type: 'mode', title: 'Straffende Ouder', color: '#ef4444', id: 'm12', src: imgStraffendeOuder, imageStyle: { transform: 'scale(1.1)' }, base: {x: 0, y: 15}, hover: {x: -55, y: -45} }, 
    { type: 'modicategorie', title: 'Coping: Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' }, base: {x: 0, y: 20}, hover: {x: 55, y: -45} }, 
    { type: 'mode', title: 'Kwetsbare kind', color: '#f59e0b', id: 'm1', src: imgKwetsbareKind, imageStyle: { transform: 'scale(1.1)' }, base: {x: 0, y: 25}, hover: {x: 0, y: -10} },    
    { type: 'mode', title: 'Gezonde Volwassene', color: '#10b981', id: 'm14', src: imgGezondeVolwassene, imageStyle: { transform: 'scale(1.1)' }, base: {x: 0, y: 30}, hover: {x: 0, y: 50} }       
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
          position: 'absolute', width: '110px', height: '155px',
          transform: isHovered 
            ? `translate(${card.hover.x}px, ${card.hover.y}px) rotate(${card.hover.x * 0.15}deg) scale(0.45)`
            : `translate(${card.base.x}px, ${card.base.y}px) rotate(0deg) scale(0.35)`,
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`, zIndex: idx
        }}>
          <div style={{
             pointerEvents: 'none', width: '100%', height: '100%', 
             boxShadow: isHovered ? `0 15px 35px ${card.color}60` : '0 6px 15px rgba(0,0,0,0.15)',
             borderRadius: '8px'
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